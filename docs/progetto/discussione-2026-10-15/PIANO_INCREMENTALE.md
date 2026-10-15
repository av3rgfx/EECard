# Piano incrementale e criteri di accettazione

15 ottobre 2026. Sequenza proposta per la demo e percorso condizionato verso
produzione. Nessuna stima di giorni, budget, prestazioni o risparmi. Le priorità
indicano valore e dipendenze, non approvazione commerciale delle idee.

## Sequenza proposta

| ID / priorità | Risultato e motivo | Copertura | Dipendenze | Accettazione osservabile / verifiche | Stato |
| --- | --- | --- | --- | --- | --- |
| IN01 · P0 | Gestione rinnovo cliente, semplice e reversibile: rende concreta una richiesta chiara dell'appunto senza inventare listino o partner | NA03/NA09; PF03-AC06 | Adesione sintetica esistente; politica demo dichiarata distinta da termini reali | Criteri IN01-AC sotto; modello, UI, persistenza e accessibilità | Primo incremento della sessione |
| IN02 · P1 | Catalogo di capacità/livelli/extra e confronto del cambio; rende visibili inclusioni e limiti prima delle cifre | NA02/NA04/NA05/NA06; RF05/RF18 | Referente catalogo; unità/beneficiari, periodo, condizioni e formula da decidere | Nessun piano concede grants; prezzi ignoti non diventano zero; upgrade/downgrade con preventivo esplicito, annullo e stato in attesa; se regole mancanti nessun calcolo definitivo | Proposto |
| IN03 · P1 | Acquisizione guidata di bolletta da facsimile: originale, campi da confermare, duplicato e rettifica | NA11/NA12; RF21/RF22/PF04 | Metadati strutturati per bolletta, azione di acquisizione e titoli dedicati; dati UI derivati dall'oggetto | PB01–PB03 su sintetici; errore di importo blocca conferma, doppio import non duplica dovuto, rettifica conserva fonte, cambio casa/attore non espone dati | Implementato localmente: [IN03](../importazione-bollette-2026-10-15/README.md); OCR reale separato |
| IN04 · P1 | «Mostra avviso» e alternativa sullo stesso telefono: trovare subito quanto serve al canale fisico | NA10/NA13; PF04 | IN03 per dati verificati; elenco schemi/canali e fonti | Importo/creditore/scadenza/originale coerenti; assenza QR gestita; facsimile non pagabile; apertura non cambia ledger; PB03, layout/tastiera e poi PB04 reale autorizzato | Implementato nella demo: [IN04](../mostra-avviso-2026-10-15/README.md); PB04 fisico ancora aperto |
| IN05 · P1 | Report annuali con viste cliente/agenzia, copertura e fonti: rendere utile la storia senza falsi totali | NA15, USR01; RF07/RF22/RF26 | Definizione periodo/metriche; eventi con date/importi/valuta/allocazioni e titoli; IN03 utile alle utenze ma non blocca una prima sezione documentale | RC01–RC06 sotto, set con dati parziali, duplicati, storni, più case/agenzie e revoca durante export | Proposto; destinatari confermati |
| IN06 · P2 | Anteprima promemoria e confronto voce/notifica, senza invio | NA14; RF28 esteso | Dovuti affidabili, regole destinatario/canale, consenso o altro titolo pertinente verificato, stop/escalation e contenuto approvato | Stato ignoto/dichiarato/contestato sopprime automazione; zero contatti; proprietario pagante non amplia titoli; registro di sola simulazione | Proposto, nessun provider |
| IN07 · P2 | Coda supporto e incarichi per erogazione, distinti da problemi software | NA06/NA08; RF19/RF26 | Catalogo/copertura/risorse, BF17; 0.5 richieste come base | Nessun incarico senza ambito e responsabile; tecnico vede solo assegnato; conclusione richiesta non certifica lavoro; metriche con denominatore | Proposto |
| IN08 · P0 prima di produzione | Riesame BF01/BF03/BF17 e fondazioni operative | Tutti | Scelta perimetro, responsabilità, catalogo e dati; osservazioni BF16 | Contratti API, autorizzazioni server per oggetto, isolamento, file privati, retention/export, audit, concorrenza e idempotenza verificati; demo separata | Aperto |
| IN09 · Condizionato al beneficio scelto | Prova limitata integrazione bollette/partner | NA13; BF10 | IN03/IN04/IN08, partner e ruolo approvati, sandbox autorizzata | PB05: timeout, doppio invio, callback/replay, esito ignoto, già pagato e riconciliazione; nessuna deduzione dell'incasso da redirect | Solo studio, nessuna sandbox attivata |
| IN10 · Trasversale | Prova umana e revisione priorità | BF16/N10/N11 | Versione dimostrabile e BF02 esistente | Comprensione al primo impatto, percorso completo, diniego e recupero; note individuali fuori repo; dati mancanti non sostituiti da esiti AI | Aperto |

P1 può essere riordinata dopo il riscontro umano: report, bolletta e catalogo
hanno rami indipendenti. Non attendere un provider di pagamento per verificare
comprensione e acquisizione. Non attivare chiamate AI per provare un testo.
Se pagamenti o voce diventano il beneficio indispensabile, le loro dipendenze
entrano nel percorso critico invece di essere considerate rinviate per default.

## IN01 — perimetro di questa consegna

Cliente 01 vede l'abbonamento di esempio dalla home personale, separato dalla
gestione tessera. Periodo e data odierna sono fixture visibili; rinnovo
inizialmente attivo come scenario, nessun addebito. Può aprire il riepilogo,
annullare o disattivare il rinnovo, leggere conferma e ritrovarla ricaricando.
La conferma richiede il salvataggio locale riuscito. Reset scenario ripristina
lo stato; non aggiungere un pulsante che simuli un acquisto/riattivazione reale.

Non implementa cessazione automatica a fine periodo, prezzi, fatturazione,
pro rata, recesso, rimborsi o notifiche. La data di fine non viene copiata dal
contratto di affitto. La regola dimostrativa non risolve la divergenza NA09.

| Criterio | Risultato richiesto |
| --- | --- |
| IN01-AC01 | Solo titolare dell'adesione sintetica, account pronto, agenzia corretta e sessione/servizio disponibili possono leggere e modificare il rinnovo; proprietario, tecnico e altra agenzia negati anche chiamando il modello |
| IN01-AC02 | Il primo click mostra data e conseguenze; annullo/Escape lascia tutto invariato. Nessuna motivazione obbligatoria o contatto esterno |
| IN01-AC03 | Conferma cambia soltanto preferenza di rinnovo e evento locale; non termina adesione, account o locazione, non revoca card/grants e non modifica ledger o documenti |
| IN01-AC04 | Ricarica conserva lo stato, vecchio workspace v1 senza il nuovo campo riceve il default, valore incompatibile produce reset con avviso; reset scenario ripristina il rinnovo |
| IN01-AC05 | Doppia conferma non crea due eventi; salvataggio fallito non annuncia disdetta acquisita e consente retry |
| IN01-AC06 | Fine rapporto e card bloccata non impediscono da sole la gestione dell'adesione ancora attiva; adesione già terminata o periodo finito non consente nuova disattivazione |
| IN01-AC07 | Tastiera, focus/Escape, 360/390/1440 px, testo 200% e reduced motion senza overflow; controlli automatici distinti da dispositivi fisici |

Reversibilità tecnica: campo opzionale compatibile in workspace v1; nessuna
migrazione del modello 0.4 o del prototipo 0.3, nessuna nuova dipendenza runtime.
Rimuovendo questa UI/comando i dati precedenti restano leggibili; ripristino della
demo dal pannello. Nessuna pubblicazione di fonti grezze in branch, PR o screenshot.

## Report — criteri per IN05

- RC01: cliente e agenzia hanno ingressi, titoli e insiemi dati separati; un
  proprietario senza delega non legge bollette personali tramite report/export.
- RC02: anno, intervallo effettivamente coperto, data generazione e lacune
  visibili; vuoto distinto da zero e dato parziale mai annualizzato.
- RC03: ogni totale si ricostruisce dalle righe fonte/versione; dichiarato,
  verificato e residuo distinti, senza doppio conteggio delle evidenze.
- RC04: storno, rettifica, duplicato e più valute non producono totali fuorvianti;
  nessun canone del cliente viene presentato come ricavo dell'agenzia.
- RC05: revoca e cambio contesto rivalutati prima di ogni lettura/export;
  condivisione esplicita non estesa automaticamente alle nuove versioni.
- RC06: stampa/esportazione leggibile, fonti consultabili, stati parziale/vuoto/
  errore accessibili; nessuna certificazione fiscale o beneficio inventato.

## Decisioni necessarie e responsabilità proposte

Il referente di prodotto decide catalogo, primo pagante e valore prioritario;
il referente operativo precisa copertura, professionisti e capacità; chi cura
condizioni e privacy verifica uscita, rinnovi e comunicazioni; referente tecnico
e partner verificano schemi e pagamenti. Sono funzioni da assegnare, non persone
già incaricate. Mancano disponibilità, budget e date: nessuna stima qui.

Domande residue: livelli cumulativi o extra indipendenti? Quale unità/periodo?
Quale politica definitiva di rinnovo e fine servizio? Quale pro rata e downgrade?
Quali metriche/anno nei due report? Quali avvisi e territori? Chi può richiedere
contatti verso l'inquilino e con quali preferenze? Nessuna domanda blocca IN01
come simulazione locale esplicitamente limitata.
