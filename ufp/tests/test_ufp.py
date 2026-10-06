import copy
import json
import sqlite3
import subprocess
import sys
import tempfile
import unittest
from pathlib import Path
from core import Stop, plan, summary
from simulation import Journal, Simulator, run

ROOT = Path(__file__).resolve().parents[1]

class LogicTests(unittest.TestCase):
    def setUp(self):
        self.receipt=json.loads((ROOT/'examples/ricezione-simulata.json').read_text())
        self.orders=json.loads((ROOT/'examples/ordini-simulati.json').read_text())
        self.temp=tempfile.TemporaryDirectory()
        self.addCleanup(self.temp.cleanup)
        self.j=Journal(Path(self.temp.name)/'journal.db')
        self.s=Simulator(Path(self.temp.name)/'server.db')
        self.addCleanup(self.j.close);self.addCleanup(self.s.close)

    def setup_run(self):
        p=plan(self.receipt,self.orders)
        self.j.approve(p,'TEST',p['digest']);self.s.initialize(self.orders)
        return p

    def test_ordinary_and_partial(self):
        p=self.setup_run(); result=run(p,self.j,self.s)
        state=self.s.read()
        self.assertEqual(state['orders']['rows'][0]['remaining'],'4')
        self.assertEqual(len(state['documents']),1);self.assertEqual(len(state['lists']),1)
        self.assertEqual(result['handheld'],'NOT_VERIFIED')
        self.assertEqual(next(iter(state['lists'].values()))['status'],'SUSPENDED')

    def test_full_delivery(self):
        self.receipt['lines'][0]['document']['value']='10';self.receipt['lines'][0]['physical']['value']='10'
        run(self.setup_run(),self.j,self.s)
        self.assertEqual(self.s.read()['orders']['rows'][0]['remaining'],'0')

    def test_repeated_article_different_orders(self):
        second=copy.deepcopy(self.orders['rows'][0]);second['order_number']='SIM-OTHER';self.orders['rows'].append(second)
        line=copy.deepcopy(self.receipt['lines'][0]);line.update(line_id='L2',order_number='SIM-OTHER');self.receipt['lines'].append(line)
        p=self.setup_run();run(p,self.j,self.s)
        self.assertEqual([r['remaining'] for r in self.s.read()['orders']['rows']],['4','4'])
        self.assertEqual(len(next(iter(self.s.read()['documents'].values()))['rows']),2)

    def test_repeated_article_same_order_ambiguous(self):
        row=copy.deepcopy(self.orders['rows'][0]);row['row_ref']='SIM-R2';self.orders['rows'].append(row)
        del self.receipt['lines'][0]['row_ref']
        p=plan(self.receipt,self.orders)
        self.assertIn('ambiguo',p['issues'][0]['reason'])
        with self.assertRaises(Stop):self.j.approve(p,'TEST',p['digest'])

    def test_missing_row_ref_unique(self):
        del self.receipt['lines'][0]['row_ref']
        self.assertEqual(plan(self.receipt,self.orders)['matches'][0]['order']['row_ref'],'SIM-R1')

    def test_discordant_supplier_code(self):
        self.receipt['lines'][0]['supplier_code']='ART-DEMO-002'
        self.assertIn('discordante',plan(self.receipt,self.orders)['issues'][0]['reason'])

    def test_conversion_exact(self):
        self.receipt=json.loads((ROOT/'examples/conversione-simulata.json').read_text())
        self.orders=json.loads((ROOT/'examples/ordini-conversione-simulati.json').read_text())
        p=self.setup_run();self.assertEqual(p['matches'][0]['record'],{'value':'72.000','unit':'KG'})
        run(p,self.j,self.s);self.assertEqual(self.s.read()['orders']['rows'][0]['remaining'],'28.000')

    def test_conversion_wrong_or_unapproved(self):
        self.receipt=json.loads((ROOT/'examples/conversione-simulata.json').read_text())
        self.orders=json.loads((ROOT/'examples/ordini-conversione-simulati.json').read_text())
        for field,value in [('factor','100'),('approved_by','')]:
            with self.subTest(field=field):
                r=copy.deepcopy(self.receipt);r['lines'][0]['conversion'][field]=value
                self.assertTrue(plan(r,self.orders)['issues'])

    def test_historical_hafele_unit_block(self):
        r=json.loads((ROOT/'examples/unita-commerciale-bloccata.json').read_text())
        self.assertIn('Unità non equivalenti',plan(r,self.orders)['issues'][0]['reason'])

    def test_document_differs_physical(self):
        self.receipt['lines'][0]['physical']['value']='4'
        self.assertTrue(plan(self.receipt,self.orders)['issues'])
        self.receipt['lines'][0]['difference_reason']='Due pezzi mancanti, accettati solo quattro'
        p=self.setup_run();run(p,self.j,self.s)
        self.assertEqual(self.s.read()['orders']['rows'][0]['remaining'],'6')
        self.assertIn('Bolla: 6 NR | Fisico: 4 NR | Da registrare: 4 NR',summary(p))

    def test_cumulative_overdelivery(self):
        l=copy.deepcopy(self.receipt['lines'][0]);l['line_id']='L2';self.receipt['lines'].append(l)
        self.assertIn('cumulativa',plan(self.receipt,self.orders)['issues'][0]['reason'])

    def test_partial_documents_successive(self):
        p=self.setup_run();run(p,self.j,self.s)
        r=copy.deepcopy(self.receipt);r['header']['number']='SIM-002'
        r['lines'][0]['document']['value']='4';r['lines'][0]['physical']['value']='4'
        p2=plan(r,self.s.read()['orders']);self.j.approve(p2,'TEST',p2['digest']);run(p2,self.j,self.s)
        self.assertEqual(len(self.s.read()['documents']),2)
        self.assertEqual(self.s.read()['orders']['rows'][0]['remaining'],'0')

    def test_duplicate_document_from_new_journal(self):
        p=self.setup_run();run(p,self.j,self.s);writes=self.s.read()['writes']
        fresh=Journal(Path(self.temp.name)/'new.db');self.addCleanup(fresh.close)
        fresh.approve(p,'TEST',p['digest']);run(p,fresh,self.s)
        self.assertEqual(self.s.read()['writes'],writes)

    def test_duplicate_document_changed_payload(self):
        p=self.setup_run();run(p,self.j,self.s)
        self.receipt['lines'][0]['document']['value']='2';self.receipt['lines'][0]['physical']['value']='2'
        new=plan(self.receipt,self.s.read()['orders']);self.j.approve(new,'TEST',new['digest'])
        with self.assertRaises(Stop):run(new,self.j,self.s)
        self.assertEqual(len(self.s.read()['documents']),1)

    def test_interruptions_before_after_every_operation(self):
        for op in ('ddt:create','row:L1','ddt:confirm','libero:suspend'):
            for fault in ('before','after'):
                with self.subTest(op=op,fault=fault), tempfile.TemporaryDirectory() as d:
                    s=Simulator(Path(d)/'s');j=Journal(Path(d)/'j')
                    try:
                        p=plan(self.receipt,self.orders);s.initialize(self.orders);j.approve(p,'TEST',p['digest'])
                        with self.assertRaises(Stop):run(p,j,s,op,fault)
                        # Vera riapertura delle connessioni e rilettura durevole.
                        s.close();j.close();s=Simulator(Path(d)/'s');j=Journal(Path(d)/'j')
                        run(p,j,s)
                        self.assertEqual(s.read()['writes'],4)
                        self.assertEqual(s.read()['orders']['rows'][0]['remaining'],'4')
                    finally:s.close();j.close()

    def test_uncertain_blocks_until_server_evidence(self):
        p=self.setup_run()
        with self.assertRaises(Stop):run(p,self.j,self.s,'row:L1','uncertain')
        n=self.s.read()['writes']
        for _ in range(2):
            with self.assertRaisesRegex(Stop,'riconciliazione manuale'):run(p,self.j,self.s)
        self.assertEqual(self.s.read()['writes'],n)
        # Solo test: ripristino della leggibilità lato sistema, nessun override del journal.
        state=self.s.read();state['unknown']=[];self.s.set('server',state)
        run(p,self.j,self.s);self.assertEqual(self.s.read()['writes'],4)

    def test_libero_failure_no_repeated_initial_load(self):
        p=self.setup_run()
        with self.assertRaises(Stop):run(p,self.j,self.s,'libero:suspend','before')
        state=self.s.read();self.assertEqual(state['writes'],3)
        self.assertEqual(next(iter(state['documents'].values()))['status'],'CONFIRMED')
        run(p,self.j,self.s)
        self.assertEqual(self.s.read()['writes'],4)
        self.assertEqual(self.s.read()['orders']['rows'][0]['remaining'],'4')

    def test_changed_orders_stop_before_write(self):
        p=self.setup_run();s=self.s.read();s['orders']['rows'][0]['remaining']='9';self.s.set('server',s)
        with self.assertRaisesRegex(Stop,'cambiati'):run(p,self.j,self.s)
        self.assertEqual(self.s.read()['writes'],0)

    def test_session_and_unexpected_screen(self):
        for health in ('expired','unexpected'):
            p=plan(self.receipt,self.orders)
            if self.s.get('server') is None:self.s.initialize(self.orders)
            self.j.approve(p,'TEST',p['digest'])
            s=self.s.get('server');s['health']=health;self.s.set('server',s)
            with self.assertRaisesRegex(Stop,'Sessione scaduta'):run(p,self.j,self.s)
            self.assertEqual(self.s.get('server')['writes'],0)

    def test_tampering_and_reconfirmation(self):
        p=self.setup_run();changed=copy.deepcopy(p);changed['matches'][0]['record']['value']='8'
        with self.assertRaisesRegex(Stop,'modificato'):run(changed,self.j,self.s)
        self.receipt['lines'][0]['physical']['value']='4';self.receipt['lines'][0]['difference_reason']='Mancanti'
        new=plan(self.receipt,self.orders)
        with self.assertRaisesRegex(Stop,'conferma'):run(new,self.j,self.s)
        self.assertEqual(self.s.read()['writes'],0)

    def test_no_local_only_proof(self):
        p=self.setup_run();run(p,self.j,self.s)
        s=self.s.read();s['lists']={};self.s.set('server',s)
        with self.assertRaisesRegex(Stop,'registro dice verificato'):run(p,self.j,self.s)
        self.assertEqual(self.s.read()['writes'],4)

    def test_extra_remote_line_blocks(self):
        p=self.setup_run();run(p,self.j,self.s)
        s=self.s.read();doc=next(iter(s['documents'].values()));doc['rows']['EXTRA']=copy.deepcopy(doc['rows']['L1']);self.s.set('server',s)
        with self.assertRaisesRegex(Stop,'aggiuntive'):run(p,self.j,self.s)

    def test_partial_ddt_row_crash_multiple_rows(self):
        l=copy.deepcopy(self.receipt['lines'][0]);l['line_id']='L2';l['physical']['value']='2';l['document']['value']='2';self.receipt['lines'].append(l)
        p=self.setup_run()
        with self.assertRaises(Stop):run(p,self.j,self.s,'row:L1','after')
        run(p,self.j,self.s)
        self.assertEqual(self.s.read()['orders']['rows'][0]['remaining'],'2')
        self.assertEqual(self.s.read()['writes'],5)

    def test_input_invalid_quantities(self):
        for value in ('NaN','Infinity','-1','0','1,5','1e3',1,True,'1.1234567'):
            with self.subTest(value=value):
                r=copy.deepcopy(self.receipt);r['lines'][0]['physical']['value']=value
                self.assertTrue(plan(r,self.orders)['issues'])

    def test_document_incomplete_and_missing_order(self):
        self.receipt['header']['complete']=False
        self.receipt['lines'][0]['order_number']='UNKNOWN'
        self.assertEqual(len(plan(self.receipt,self.orders)['issues']),2)

    def test_duplicate_ids_and_unknown_fields(self):
        self.receipt['lines'].append(copy.deepcopy(self.receipt['lines'][0]))
        self.assertTrue(plan(self.receipt,self.orders)['issues'])
        self.receipt['credentials']='forbidden'
        with self.assertRaises(Stop):plan(self.receipt,self.orders)

    def test_lock_prevents_concurrent_execution(self):
        p=self.setup_run()
        lock=sqlite3.connect(str(self.j.path)+'.lock.sqlite');lock.execute('BEGIN EXCLUSIVE')
        try:
            with self.assertRaises(sqlite3.OperationalError):run(p,self.j,self.s)
        finally:lock.rollback();lock.close()
        self.assertEqual(self.s.read()['writes'],0)

    def test_approval_required_and_wrong_token(self):
        p=plan(self.receipt,self.orders);self.s.initialize(self.orders)
        with self.assertRaises(Stop):run(p,self.j,self.s)
        with self.assertRaises(Stop):self.j.approve(p,'TEST','wrong')
        self.assertEqual(self.s.read()['writes'],0)

    def test_audit_preserves_attempt_and_verified(self):
        p=self.setup_run();run(p,self.j,self.s)
        states=[r[0] for r in self.j.db.execute("SELECT state FROM events WHERE operation='row:L1' ORDER BY id")]
        self.assertEqual(states,['ATTEMPTED','VERIFIED'])

    def test_non_simulator_rejected(self):
        p=self.setup_run()
        with self.assertRaisesRegex(Stop,'esclusivamente Simulator'):run(p,self.j,object())
        self.assertEqual(self.s.read()['writes'],0)

    def test_cli_end_to_end_and_replay(self):
        d=Path(self.temp.name);pfile=d/'plan.json'
        def cli(*args,input=None):
            return subprocess.run([sys.executable,str(ROOT/'ufp.py'),*map(str,args)],input=input,capture_output=True,text=True,cwd=ROOT)
        res=cli('prepare',ROOT/'examples/ricezione-simulata.json',ROOT/'examples/ordini-simulati.json','--out',pfile)
        self.assertEqual(res.returncode,0,res.stderr)
        digest=json.loads(pfile.read_text())['digest']
        self.assertEqual(cli('approve',pfile,'--journal',d/'cli-j','--operator','TEST',input='CONFERMO '+digest+'\n').returncode,0)
        self.assertEqual(cli('sim-init',ROOT/'examples/ordini-simulati.json','--server',d/'cli-s').returncode,0)
        for _ in range(2):
            res=cli('simulate',pfile,'--journal',d/'cli-j','--server',d/'cli-s');self.assertEqual(res.returncode,0,res.stderr)
        self.assertEqual(json.loads(res.stdout)['handheld'],'NOT_VERIFIED')

if __name__=='__main__':unittest.main()
