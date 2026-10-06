"""Solo simulazione: database del gestionale fittizio separato dal registro locale.
Le garanzie transazionali qui implementate NON sono attribuite ad ARS.
"""
import copy
import json
import sqlite3
from pathlib import Path
from core import Stop, canonical, digest, now, require, verify_plan, order_key, number, dec


class Database:
    def __init__(self, path):
        self.path = Path(path).resolve()
        self.db = sqlite3.connect(self.path, timeout=1)
        self.db.execute('PRAGMA synchronous=FULL')
        self.db.execute('CREATE TABLE IF NOT EXISTS data (key TEXT PRIMARY KEY, value TEXT NOT NULL)')
        self.db.commit()

    def get(self, key, default=None):
        row = self.db.execute('SELECT value FROM data WHERE key=?', (key,)).fetchone()
        return json.loads(row[0]) if row else default

    def set(self, key, value):
        with self.db:
            self.db.execute('INSERT OR REPLACE INTO data VALUES (?,?)', (key, canonical(value)))

    def close(self):
        self.db.close()


class Journal(Database):
    def __init__(self, path):
        super().__init__(path)
        self.db.execute('CREATE TABLE IF NOT EXISTS events (id INTEGER PRIMARY KEY, document_key TEXT, operation TEXT, state TEXT, plan TEXT, at TEXT, evidence_id TEXT)')
        self.db.commit()

    def approve(self, p, operator, token):
        from core import text
        verify_plan(p); text(operator, 'operatore')
        require(token == p['digest'], 'Impronta non corrispondente: rileggere il riepilogo')
        self.set('approval:' + token, {'digest': token, 'operator': operator, 'at': now()})

    def event(self, p, op, state, evidence=None):
        with self.db:
            self.db.execute('INSERT INTO events(document_key,operation,state,plan,at,evidence_id) VALUES (?,?,?,?,?,?)',
                            (p['document_key'], op, state, p['digest'], now(), evidence.get('id') if evidence else None))
        self.set('operation:' + p['document_key'] + ':' + op,
                 {'state': state, 'plan': p['digest'], 'at': now(), 'evidence': evidence})

    def operation(self, p, op):
        return self.get('operation:' + p['document_key'] + ':' + op)


class Simulator(Database):
    def initialize(self, orders):
        from core import validate_orders
        validate_orders(orders)
        require(self.get('server') is None, 'Simulatore già inizializzato: non sovrascritto')
        self.set('server', {'mode': 'SIMULATION', 'orders': orders, 'documents': {}, 'lists': {},
                            'unknown': [], 'health': 'ok', 'writes': 0})

    def read(self):
        s = self.get('server')
        require(s is not None and s['mode'] == 'SIMULATION', 'Inizializzare il simulatore')
        require(s['health'] == 'ok', 'Sessione scaduta o schermata inattesa: ripristinare accesso, poi rileggere; nessuna scrittura')
        return s

    def inspect(self, p, op, payload):
        s = self.read()
        if op in s['unknown']:
            return 'UNKNOWN', None
        doc = s['documents'].get(p['document_key'])
        if doc is None:
            return 'ABSENT', None
        require(doc['plan'] == p['digest'], 'Documento già presente con dati/piano diversi: riconciliazione manuale, non ricreare')
        if op == 'ddt:create':
            actual = doc['header']
            evidence = {'id': doc['id'], 'status': doc['status'], 'payload': actual}
        elif op.startswith('row:'):
            actual = doc['rows'].get(op[4:])
            if actual is None:
                return 'ABSENT', None
            evidence = {'id': actual['id'], 'status': 'SAVED', 'payload': actual['payload']}
        elif op == 'ddt:confirm':
            if doc['status'] != 'CONFIRMED':
                return 'ABSENT', None
            evidence = {'id': doc['id'], 'status': doc['status'], 'payload': doc['final']}
        else:
            item = s['lists'].get(p['document_key'])
            if item is None:
                return 'ABSENT', None
            require(item['status'] == 'SUSPENDED', 'Lista presente in stato inatteso: riconciliazione manuale')
            evidence = {'id': item['id'], 'status': item['status'], 'payload': item['payload']}
        require(evidence['payload'] == payload, 'Esito diverso dai dati approvati: riconciliazione manuale')
        return 'PRESENT', evidence

    def check_current(self, p):
        s = self.read()
        doc = s['documents'].get(p['document_key'])
        if doc:
            require(doc['plan'] == p['digest'], 'DDT esistente diverso: riconciliazione manuale')
            known = {m['line_id']: m for m in p['matches']}
            require(set(doc['rows']) <= set(known), 'DDT contiene righe aggiuntive: riconciliazione manuale')
            for lid, saved in doc['rows'].items():
                require(saved['payload'] == row_payload(p, known[lid]), 'Riga già salvata alterata: riconciliazione manuale')
        current = {order_key(r): r for r in s['orders']['rows']}
        for baseline in {order_key(m['order']): m['order'] for m in p['matches']}.values():
            key = order_key(baseline)
            expected = copy.deepcopy(baseline)
            consumed = sum((number(m['record']['value'], 'record') for m in p['matches']
                            if order_key(m['order']) == key and doc and m['line_id'] in doc['rows']), start=0)
            expected['remaining'] = dec(number(baseline['remaining'], 'remaining', zero=True) - consumed)
            actual = copy.deepcopy(current.get(key))
            require(actual is not None, 'Riga ordine scomparsa: fermarsi e riconfermare')
            actual['remaining'] = dec(number(actual['remaining'], 'remaining', zero=True))
            require(actual == expected, 'Dati ordine o residui cambiati: fermarsi, rileggere e riconfermare; se DDT iniziato riconciliare manualmente')

    def mutate(self, p, op, payload, fault=None):
        # Transazione SOLO del simulatore; precondizioni e scritture sotto lock.
        self.db.execute('BEGIN IMMEDIATE')
        try:
            self.check_current(p)
            status, _ = self.inspect(p, op, payload)
            require(status == 'ABSENT', 'Operazione non sicuramente assente: nessuna ripetizione')
            s = self.read()
            if fault == 'before':
                raise Stop('Interruzione simulata PRIMA del salvataggio; rileggere alla ripresa')
            if fault == 'session':
                s['health'] = 'expired'
            elif fault == 'screen':
                s['health'] = 'unexpected'
            else:
                key = p['document_key']
                if op == 'ddt:create':
                    s['documents'][key] = {'id': 'SIM-DDT-' + str(len(s['documents'])+1), 'plan': p['digest'],
                                           'header': payload, 'rows': {}, 'status': 'DRAFT'}
                elif op.startswith('row:'):
                    doc = s['documents'][key]
                    require(doc['status'] == 'DRAFT', 'DDT non modificabile')
                    m = next(m for m in p['matches'] if m['line_id'] == op[4:])
                    r = next(r for r in s['orders']['rows'] if order_key(r) == order_key(m['order']))
                    r['remaining'] = dec(number(r['remaining'], 'remaining', zero=True) - number(m['record']['value'], 'record'))
                    doc['rows'][op[4:]] = {'id': doc['id'] + '-R' + str(len(doc['rows'])+1), 'payload': payload}
                elif op == 'ddt:confirm':
                    doc = s['documents'][key]
                    require(set(doc['rows']) == {m['line_id'] for m in p['matches']}, 'DDT incompleto')
                    doc['status'] = 'CONFIRMED'; doc['final'] = payload
                elif op == 'libero:suspend':
                    require(s['documents'][key]['status'] == 'CONFIRMED', 'DDT non confermato')
                    s['lists'][key] = {'id': 'SIM-LIST-' + str(len(s['lists'])+1), 'status': 'SUSPENDED', 'payload': payload}
                else:
                    raise Stop('Operazione sconosciuta')
                s['writes'] += 1
                if fault == 'uncertain':
                    s['unknown'].append(op)
            self.db.execute('INSERT OR REPLACE INTO data VALUES (?,?)', ('server', canonical(s)))
            self.db.commit()
        except BaseException:
            self.db.rollback()
            raise
        if fault in ('after', 'uncertain', 'session', 'screen'):
            raise Stop('Interruzione simulata: esito da rileggere, non assumere fallimento')


def row_payload(p, m):
    return {'order': list(order_key(m['order'])), 'supplier_code': m['supplier_code'],
            'internal_code': m['internal_code'], 'quantity': m['record'],
            'warehouse': p['receipt']['header']['warehouse'], 'location': p['receipt']['header']['location']}


def operations(p):
    rows = {m['line_id']: row_payload(p, m) for m in p['matches']}
    yield 'ddt:create', p['receipt']['header']
    for lid, payload in rows.items():
        yield 'row:' + lid, payload
    yield 'ddt:confirm', {'header': p['receipt']['header'], 'rows': rows}
    yield 'libero:suspend', {'document_key': p['document_key'], 'rows': rows, 'status': 'SUSPENDED'}


def run(p, journal, server, fault_op=None, fault=None):
    require(type(server) is Simulator, 'Questa versione accetta esclusivamente Simulator; adattatore ARS non implementato')
    require(journal.path != server.path, 'Registro e simulatore devono essere database separati')
    verify_plan(p)
    require(journal.get('approval:' + p['digest']) is not None, 'Manca conferma dei dati esatti')
    # Una sola esecuzione per registro. Un crash non lascia un lock su file da rimuovere.
    # Lock in DB dedicato: gli eventi restano durevoli prima delle azioni.
    mutex = sqlite3.connect(str(journal.path) + '.lock.sqlite', timeout=1)
    try:
        mutex.execute('BEGIN EXCLUSIVE')
        for op, payload in operations(p):
            try:
                server.check_current(p)
                status, evidence = server.inspect(p, op, payload)
                previous = journal.operation(p, op)
                if status == 'UNKNOWN':
                    journal.event(p, op, 'MANUAL_RECONCILIATION')
                    raise Stop('Esito incerto nel simulatore: riconciliazione manuale; operazione non ripetuta')
                if status == 'PRESENT':
                    journal.event(p, op, 'VERIFIED', evidence)
                    continue
                require(not previous or previous['state'] != 'VERIFIED', 'Il registro dice verificato ma il sistema non lo conferma: riconciliazione manuale')
                journal.event(p, op, 'ATTEMPTED')  # durevole PRIMA della possibile scrittura
                server.mutate(p, op, payload, fault if fault_op == op else None)
                status, evidence = server.inspect(p, op, payload)
                require(status == 'PRESENT', 'Scrittura senza prova leggibile: riconciliazione manuale')
                journal.event(p, op, 'VERIFIED', evidence)
            except Stop:
                # Conservare intent/evidenza senza memorizzare contenuti sensibili dell'eccezione.
                raise
        return {'mode': 'SIMULATION', 'ddt': journal.operation(p, 'ddt:confirm')['evidence']['id'],
                'list': journal.operation(p, 'libero:suspend')['evidence']['id'],
                'state': 'LIBERO_SUSPENDED_VERIFIED_IN_SIMULATOR', 'handheld': 'NOT_VERIFIED'}
    finally:
        mutex.rollback(); mutex.close()
