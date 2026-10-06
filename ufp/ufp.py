#!/usr/bin/env python3
"""CLI offline; nessun connettore ARS, nessun parametro di rete o credenziale."""
import argparse
import json
import os
import sqlite3
import sys
from pathlib import Path
from core import Stop, plan, summary
from simulation import Journal, Simulator, run


def read(path):
    def unique(pairs):
        result = {}
        for k, v in pairs:
            if k in result:
                raise Stop('Chiave JSON duplicata: ' + k)
            result[k] = v
        return result
    return json.loads(Path(path).read_text(encoding='utf-8-sig'), object_pairs_hook=unique)


def save_new(path, data):
    with open(path, 'x', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2, allow_nan=False)
        f.write('\n')


def main(argv=None):
    os.umask(0o077)
    parser = argparse.ArgumentParser(description='UFP V1 locale — preparazione e simulazione, nessuna scrittura ARS')
    sub = parser.add_subparsers(dest='command', required=True)
    p = sub.add_parser('prepare', help='Prepara piano immutabile da ricezione e snapshot ordini')
    p.add_argument('receipt'); p.add_argument('orders'); p.add_argument('--out', required=True)
    p = sub.add_parser('review', help='Mostra riepilogo e anomalie'); p.add_argument('plan')
    p = sub.add_parser('approve', help='Conferma controllo fisico e dati esatti per uso LOCALE')
    p.add_argument('plan'); p.add_argument('--journal', required=True); p.add_argument('--operator', required=True)
    p = sub.add_parser('sim-init', help='Crea gestionale fittizio separato')
    p.add_argument('orders'); p.add_argument('--server', required=True)
    p = sub.add_parser('simulate', help='Esegui/riprendi esclusivamente sul simulatore locale')
    p.add_argument('plan'); p.add_argument('--journal', required=True); p.add_argument('--server', required=True)
    p.add_argument('--fault-op', help='ddt:create, row:L1, ddt:confirm, libero:suspend')
    p.add_argument('--fault', choices=['before', 'after', 'uncertain', 'session', 'screen'])
    p = sub.add_parser('status', help='Stato fittizio ed eventi locali')
    p.add_argument('--journal', required=True); p.add_argument('--server', required=True)
    a = parser.parse_args(argv)
    opened = []
    def db(cls, path):
        value = cls(path); opened.append(value); return value
    try:
        if a.command == 'prepare':
            p = plan(read(a.receipt), read(a.orders)); save_new(a.out, p); print(summary(p))
            return 2 if p['issues'] else 0
        if a.command == 'review':
            p = read(a.plan)
            if plan(p['receipt'], p['orders']) != p:
                raise Stop('Piano modificato: prepararlo di nuovo')
            print(summary(p)); return 2 if p['issues'] else 0
        if a.command == 'approve':
            p = read(a.plan); print(summary(p))
            print('\nConferma solo dopo controllo fisico umano e revisione di TUTTI i dati. Non autorizza scritture ARS.')
            token = input('Scrivi CONFERMO seguito da uno spazio e dall’impronta completa: ')
            if not token.startswith('CONFERMO '):
                raise Stop('Conferma non acquisita')
            db(Journal, a.journal).approve(p, a.operator, token[9:]); print('Conferma locale registrata.')
        elif a.command == 'sim-init':
            db(Simulator, a.server).initialize(read(a.orders)); print('SIMULATORE inizializzato.')
        elif a.command == 'simulate':
            if bool(a.fault) != bool(a.fault_op):
                raise Stop('Specificare insieme --fault e --fault-op')
            p = read(a.plan)
            from simulation import operations
            if a.fault_op and a.fault_op not in dict(operations(p)):
                raise Stop('Operazione guasto sconosciuta')
            print(json.dumps(run(p, db(Journal, a.journal), db(Simulator, a.server), a.fault_op, a.fault), indent=2))
        elif a.command == 'status':
            server = db(Simulator, a.server).get('server')
            journal = db(Journal, a.journal)
            rows = journal.db.execute("SELECT key,value FROM data WHERE key LIKE 'operation:%' ORDER BY key").fetchall()
            print(json.dumps({'mode': 'SIMULATION', 'server': server,
                              'operations': {k: json.loads(v) for k, v in rows}}, ensure_ascii=False, indent=2))
        return 0
    except (Stop, ValueError, KeyError, TypeError, OSError, sqlite3.Error, EOFError):
        # Non stampare eccezioni generiche: possono contenere input aziendale o percorsi riservati.
        exc = sys.exc_info()[1]
        print('ARRESTO: ' + (str(exc) if isinstance(exc, Stop) else 'File/formato/database non valido o occupato. Controllare il percorso e lo schema; nessun retry automatico.'), file=sys.stderr)
        return 2
    finally:
        for value in opened:
            value.close()


if __name__ == '__main__':
    raise SystemExit(main())
