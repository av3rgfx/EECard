"""Rigenera SOLO esempi didattici, mai dati di produzione."""
import copy
import json
from pathlib import Path
ROOT = Path(__file__).parent

def save(name, obj):
    (ROOT / name).write_text(json.dumps(obj, ensure_ascii=False, indent=2)+'\n', encoding='utf-8')

orders = {'source': 'SIMULATO: ordini e ID inventati, non estratti da ARS', 'captured_at': '2026-10-05T00:00:00+00:00', 'rows': [
    {'supplier_id': 'SIM-SUPPLIER', 'order_type': 'OF', 'order_year': '2026', 'order_number': 'SIM-ORDER-001',
     'row_ref': 'SIM-R1', 'supplier_code': 'ART-DEMO-001', 'internal_code': 'INT-DEMO-001', 'unit': 'NR', 'remaining': '10', 'version': 'SIM-V1'}]}
receipt = {'schema': 1, 'header': {'company': 'SIM-COMPANY', 'supplier_id': 'SIM-SUPPLIER', 'supplier_name': 'Fornitore demo — ESEMPIO SIMULATO',
    'number': 'SIM-001', 'date': '2026-10-05', 'series': 'DDTFO', 'warehouse': '000', 'location': 'CHECK',
    'complete': True, 'source': 'Scenario didattico ispirato allo studio Fornitore demo; NON è il DDT storico', 'packages': '1', 'carrier': 'SIMULATO'},
    'lines': [{'line_id': 'L1', 'order_type': 'OF', 'order_year': '2026', 'order_number': 'SIM-ORDER-001', 'row_ref': 'SIM-R1',
               'supplier_code': 'ART-DEMO-001', 'internal_code': 'INT-DEMO-001', 'document': {'value': '6', 'unit': 'NR'},
               'physical': {'value': '6', 'unit': 'NR'}, 'source': 'DATI SINTETICI: conteggio fisico e NR non osservati sulla foto'}]}
save('ordini-simulati.json', orders); save('ricezione-simulata.json', receipt)
historical = copy.deepcopy(receipt)
historical['header'].update(number='DEMO-UNIT-001', date='2026-10-02', source='FONTE-PRIVATA-A.HEIC e studio V2; solo riferimento storico, NON ricaricare', carrier='DA VERIFICARE')
historical['lines'][0]['document']['unit'] = 'Coppia'
historical['lines'][0]['physical']['unit'] = 'Coppia'
historical['lines'][0]['source'] = 'FONTE-PRIVATA-A: 6 Coppia; fisico qui ipotizzato SOLO per dimostrare il blocco UM; non è conferma umana'
save('unita-commerciale-bloccata.json', historical)
pessin = copy.deepcopy(receipt)
pessin['header'].update(supplier_name='Fornitore metalli demo — ESEMPIO SIMULATO', source='Scenario su quantità 0.072 TO da FONTE-PRIVATA-B; ordini/codici/controllo fisico sono simulati')
pessin['lines'][0].update(document={'value':'0.072','unit':'TO'},physical={'value':'0.072','unit':'TO'},
 conversion={'from':'TO','to':'KG','factor':'1000','approved_by':'OPERATORE SIMULATO','evidence':'Regola didattica, da approvare per uso reale'})
pessinorders=copy.deepcopy(orders);pessinorders['rows'][0].update(unit='KG',remaining='100')
save('conversione-simulata.json',pessin);save('ordini-conversione-simulati.json',pessinorders)
# Modelli vuoti: volutamente non eseguibili finché non compilati e verificati.
template=copy.deepcopy(receipt)
for k in template['header']:
 template['header'][k] = False if k=='complete' else ''
line=template['lines'][0]
for k in line:
 line[k] = {'value':'','unit':''} if k in ('physical','document') else ''
save('ricezione-da-compilare.json', template)
order_template=copy.deepcopy(orders)
order_template['source']='';order_template['captured_at']=''
order_template['rows']=[{k:'' for k in orders['rows'][0]}]
save('ordini-da-verificare.json',order_template)
