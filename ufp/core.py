"""UFP: preparazione deterministica. Nessun accesso di rete."""
import copy
import hashlib
import json
import re
from datetime import date, datetime, timezone
from decimal import Decimal


class Stop(Exception):
    """Arresto controllato; nessun retry implicito."""


def canonical(value):
    return json.dumps(value, ensure_ascii=False, sort_keys=True, separators=(',', ':'), allow_nan=False)


def digest(value):
    return hashlib.sha256(canonical(value).encode()).hexdigest()


def now():
    return datetime.now(timezone.utc).isoformat()


def require(condition, message):
    if not condition:
        raise Stop(message)


def text(value, field):
    require(isinstance(value, str) and value.strip() == value and bool(value)
            and not any(ord(c) < 32 for c in value), f'{field}: testo non vuoto, senza spazi esterni o controlli')
    return value


def number(value, field, zero=False):
    require(isinstance(value, str) and re.fullmatch(r'\d{1,12}(\.\d{1,6})?', value),
            f'{field}: usare stringa decimale con punto, max 12 interi/6 decimali')
    n = Decimal(value)
    require(n >= 0 if zero else n > 0, f'{field}: quantità non valida')
    return n


def dec(value):
    return format(value, 'f')


def quantity(obj, field):
    require(isinstance(obj, dict) and set(obj) == {'value', 'unit'}, f'{field}: richiesti value, unit')
    text(obj['unit'], field + '.unit')
    return number(obj['value'], field)


def fields(obj, required, optional=()):
    require(isinstance(obj, dict), 'Atteso oggetto JSON')
    require(set(required) <= set(obj), 'Campi mancanti: ' + ', '.join(sorted(set(required)-set(obj))))
    require(set(obj) <= set(required) | set(optional), 'Campi sconosciuti: ' + ', '.join(sorted(set(obj)-set(required)-set(optional))))


def order_key(row):
    return tuple(row[k] for k in ('supplier_id', 'order_type', 'order_year', 'order_number', 'row_ref'))


def validate_orders(orders):
    fields(orders, ['source', 'captured_at', 'rows'])
    text(orders['source'], 'source'); text(orders['captured_at'], 'captured_at')
    require(isinstance(orders['rows'], list), 'rows deve essere una lista')
    seen = set()
    for row in orders['rows']:
        fields(row, ['supplier_id', 'order_type', 'order_year', 'order_number', 'row_ref',
                     'supplier_code', 'internal_code', 'unit', 'remaining', 'version'])
        for key, value in row.items():
            if key != 'remaining':
                text(value, key)
        number(row['remaining'], 'remaining', zero=True)
        key = order_key(row)
        require(key not in seen, 'Snapshot: riga ordine duplicata')
        seen.add(key)


def document_key(header):
    # Conserva suffissi. Namespace azienda e data/anno, serie, magazzino espliciti.
    return digest({k: header[k] for k in ('company', 'supplier_id', 'number', 'date', 'series', 'warehouse')})


def plan(receipt, orders):
    validate_orders(orders)
    fields(receipt, ['schema', 'header', 'lines'])
    require(receipt['schema'] == 1, 'Schema non supportato')
    h = receipt['header']
    fields(h, ['company', 'supplier_id', 'supplier_name', 'number', 'date', 'series', 'warehouse',
               'location', 'complete', 'source'], ['packages', 'carrier'])
    for key in ('company', 'supplier_id', 'supplier_name', 'number', 'date', 'series', 'warehouse', 'location', 'source'):
        text(h[key], key)
    try:
        require(date.fromisoformat(h['date']).isoformat() == h['date'], 'Data ISO YYYY-MM-DD richiesta')
    except ValueError:
        raise Stop('Data bolla non valida') from None
    require(type(h['complete']) is bool, 'complete deve essere booleano')
    for key in ('packages', 'carrier'):
        if key in h:
            text(h[key], key)
    require(isinstance(receipt['lines'], list) and receipt['lines'], 'Inserire almeno una riga')
    issues = [] if h['complete'] else [{'line': '*', 'reason': 'Documento incompleto: verificare tutte le pagine'}]
    matches, seen, used = [], set(), {}
    for line in receipt['lines']:
        lid = line.get('line_id', '?') if isinstance(line, dict) else '?'
        try:
            fields(line, ['line_id', 'order_type', 'order_year', 'order_number', 'supplier_code',
                          'internal_code', 'document', 'physical', 'source'],
                   ['row_ref', 'conversion', 'difference_reason'])
            for key in ('line_id', 'order_type', 'order_year', 'order_number', 'supplier_code', 'internal_code', 'source'):
                text(line[key], key)
            require(lid not in seen, 'line_id duplicato')
            seen.add(lid)
            if 'row_ref' in line:
                text(line['row_ref'], 'row_ref')
            paper = quantity(line['document'], 'document')
            physical = quantity(line['physical'], 'physical')
            candidates = [r for r in orders['rows'] if r['supplier_id'] == h['supplier_id']
                          and all(r[k] == line[k] for k in ('order_type', 'order_year', 'order_number', 'internal_code'))
                          and ('row_ref' not in line or r['row_ref'] == line['row_ref'])]
            require(candidates, 'Nessuna riga ordine esatta: controllare ordine, anno, tipo, riga e codice interno')
            require(len(candidates) == 1, 'Abbinamento ambiguo: specificare row_ref verificato; candidati ' + ', '.join(r['row_ref'] for r in candidates))
            row = candidates[0]
            require(row['supplier_code'] == line['supplier_code'], 'Codice fornitore discordante: verifica ufficio; nessuna correzione automatica')
            unit = row['unit']
            conv = line.get('conversion')
            # Prima versione: sola conversione dimensionale TO->KG. Equivalenze commerciali bloccate.
            units = {line['document']['unit'], line['physical']['unit'], unit}
            if len(units) > 1:
                require(units <= {'TO', 'KG'} and unit == 'KG', 'Unità non equivalenti nella V1: verificare anagrafica, nessuna conversione automatica')
                fields(conv, ['from', 'to', 'factor', 'approved_by', 'evidence'])
                require((conv['from'], conv['to'], conv['factor']) == ('TO', 'KG', '1000'), 'Conversione ammessa: TO -> KG, fattore esatto 1000')
                text(conv['approved_by'], 'conversion.approved_by'); text(conv['evidence'], 'conversion.evidence')
            else:
                require(conv is None, 'Conversione superflua: rimuoverla e ricontrollare')
            def convert(q, n):
                return n * 1000 if q['unit'] == 'TO' and unit == 'KG' else n
            recorded = convert(line['physical'], physical)
            paper_target = convert(line['document'], paper)
            if recorded != paper_target:
                text(line.get('difference_reason'), 'difference_reason (differenza bolla/fisico)')
            if unit in ('NR', 'PZ'):
                require(recorded == recorded.to_integral_value(), 'Quantità frazionaria non ammessa per NR/PZ')
            key = order_key(row)
            used[key] = used.get(key, Decimal(0)) + recorded
            require(used[key] <= number(row['remaining'], 'remaining', zero=True), 'Quantità cumulativa superiore al residuo della riga ordine')
            matches.append({'line_id': lid, 'order': copy.deepcopy(row), 'supplier_code': line['supplier_code'],
                            'internal_code': line['internal_code'], 'document': copy.deepcopy(line['document']),
                            'physical': copy.deepcopy(line['physical']), 'record': {'value': dec(recorded), 'unit': unit},
                            'conversion': copy.deepcopy(conv), 'difference_reason': line.get('difference_reason'),
                            'source': line['source']})
        except Stop as exc:
            issues.append({'line': lid, 'reason': str(exc)})
    result = {'schema': 1, 'receipt': copy.deepcopy(receipt), 'orders': copy.deepcopy(orders),
              'document_key': document_key(h), 'matches': matches, 'issues': issues}
    result['digest'] = digest(result)
    return result


def verify_plan(p):
    require(plan(p['receipt'], p['orders']) == p, 'Piano modificato/non valido: preparare e confermare di nuovo')
    require(not p['issues'], 'Piano bloccato: risolvere tutte le anomalie e riconfermare')


def summary(p):
    h = p['receipt']['header']
    out = ['UFP — RIEPILOGO LOCALE (nessuna scrittura ARS)',
           f"Fornitore: {h['supplier_name']} [{h['supplier_id']}] — DDT {h['number']} del {h['date']}",
           f"Azienda {h['company']} | serie {h['series']} | magazzino {h['warehouse']} | ubicazione {h['location']}",
           f"Colli: {h.get('packages', 'DA CHIARIRE')} | Vettore: {h.get('carrier', 'DA CHIARIRE')}",
           'Fonte: ' + h['source'],
           'Documento completo: ' + str(h['complete']),
           'Snapshot ordini: ' + p['orders']['source'] + ' | ' + p['orders']['captured_at']]
    for m in p['matches']:
        r = m['order']
        out += [f"Riga {m['line_id']}: {r['order_type']}/{r['order_year']}/{r['order_number']} / riga {r['row_ref']}",
                f"  Fornitore {m['supplier_code']} -> interno {m['internal_code']}; residuo letto {r['remaining']} {r['unit']}"]
        out += ['  ' + ' | '.join(f"{label}: {m[k]['value']} {m[k]['unit']}" for k, label in [('document','Bolla'),('physical','Fisico'),('record','Da registrare')])]
        if m['conversion']:
            out += ['  Conversione esplicita: ' + canonical(m['conversion'])]
        if m['difference_reason']:
            out += ['  Differenza: ' + m['difference_reason']]
        out += ['  Fonte riga: ' + m['source']]
    out += [f"BLOCCO {i['line']}: {i['reason']}" for i in p['issues']]
    out += ['Esito: ' + ('BLOCCATO — nessuna riga verrà eseguita' if p['issues'] else 'PRONTO PER CONFERMA LOCALE'),
            'Impronta dati esatti: ' + p['digest'], 'Palmare: NON VERIFICATO']
    return '\n'.join(out)
