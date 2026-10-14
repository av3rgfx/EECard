# Bollette: acquisizione, avviso e pagamento

Studio del 15 ottobre 2026 per APP01.4–APP01.5 e RF21/RF22, PF04, BF10.
Nessun servizio attivato, chiamata di pagamento o documento reale inviato.
Le fonti sotto sono documentazione pubblica consultata; non attestano accordi,
compatibilità del terminale di un esercente o abilitazioni commerciali di EECard.

## Esito della verifica

L'esperienza desiderata è plausibile, ma richiede tre capacità indipendenti:
acquisire e controllare un documento, presentare un avviso autentico utilizzabile
sul canale pertinente, ottenere un esito attendibile dal soggetto che gestisce
il pagamento. Un generico QR creato da EECard non rende pagabile una bolletta.

| Documento/canale | Evidenza verificata | Conseguenza per EECard |
| --- | --- | --- |
| Avviso pagoPA | Il cittadino può usare QR oppure Codice Avviso e codice fiscale dell'ente; sono disponibili canali online e fisici [B1] | Conservare avviso originale e identificativi; prevedere alternativa testuale accessibile sullo stesso telefono |
| Esercente convenzionato | pagoPA elenca anche tabaccherie convenzionate [B2] | Non promettere «qualsiasi bolletta in qualsiasi tabacchi»; lettura dal display e condizioni vanno provate sul terminale effettivo |
| QR pagoPA | Payload strutturato con identificatore, versione, codice avviso, ente e importo in centesimi [B3] | Riconoscere lo schema, controllare coerenza con l'originale; non usare la sola presenza di un quadrato come identificazione |
| Checkout pagoPA | La documentazione del frontend dell'ente creditore descrive carrello, redirect e ritorni successo/annullo/errore/attesa [B4] | Dimostra un percorso tecnico, non che EECard sia ente creditore o possa integrare liberamente avvisi di terzi. Ruolo e accordo da verificare |
| Bollettini postali / altri fornitori | Poste distingue i propri servizi di pagamento e le condizioni applicabili [B5] | Classificare separatamente; QR, Data Matrix, codice a barre, CBILL e istruzioni del fornitore non sono sinonimi né intercambiabili |

**Risposta progettuale:** prima rendere affidabile la consultazione dell'avviso;
poi valutare un passaggio esplicito a un canale ufficiale o partner; integrare
un pagamento solo dopo una prova tecnica e contrattuale circoscritta. Questo
ordine è una raccomandazione, non un rinvio approvato dei pagamenti nel prodotto.

## Acquisizione: scanner, fotocamera, PDF

Proposta di percorso: «Aggiungi bolletta» → scegli casa/intestazione → acquisisci
originale → estrai dati → confronta → salva. OCR e decodifica del codice sono
due operazioni distinte. In demo usare solo facsimili inclusi, senza fotocamera,
file reali o servizio OCR. Non chiamare «scansionato» un form precompilato.

- Classificare formato, pagine, schema avviso e qualità. Tipo non supportato o
  documento senza codice resta archiviabile, ma senza azione di pagamento.
- Mostrare originale e campi uno accanto all'altro su desktop, alternabili sul
  telefono: creditore, intestatario, importo/valuta, scadenza, periodo,
  identificativo fornitura e avviso. Domiciliazione ignota resta ignota.
- Ciascun dato estratto conserva fonte/versione, confidenza e successiva
  correzione attribuita. Un importo incerto non diventa confermato solo perché
  il modello OCR lo restituisce con molte cifre.
- Confrontare possibili duplicati per fonte, avviso, creditore e periodo;
  ripetere l'importazione non crea un secondo dovuto. Una rettifica crea una
  versione collegata, non un pagamento aggiuntivo.
- Non aprire URL trovati nel documento automaticamente. Un QR può contenere
  testo estraneo o un link malevolo; destinazioni e protocolli vanno controllati.
- In produzione: acquisizione privata, scansione file, limiti dimensione/pagine,
  titoli su intestazione e delega, conservazione e cancellazione di originali,
  derivati e cache. Ricerca e anteprime rispettano le stesse autorizzazioni.

## Presentazione al punto di pagamento

Azione proposta «Mostra avviso»: creditore/importo/scadenza, codice originale
leggibile, alternativa testuale e documento completo. La pagina non mostra
note interne, indirizzi o altri dati non necessari; chiudi e torna alla bolletta.
Non alterare colori, proporzioni o area libera del codice per uniformarlo al
marchio. Testare luminosità, riflessi, ingrandimento, display piccolo e terminale
reale; un facsimile grafico non dimostra scansionabilità.

Se il codice è assente o illeggibile: aprire l'originale o indicare il canale
alternativo previsto. Se risulta un addebito automatico o un pagamento già
rilevato, mostrare l'avviso prima di una seconda disposizione. Se lo stato è
ignoto, non presentarlo come «da pagare» con certezza. La ricevuta esterna va
acquisita come evidenza; non cambia da sola lo stato in «incasso verificato».

## Alternative al pagamento incorporato

| Alternativa | Valore / limite | Prerequisito e prova |
| --- | --- | --- |
| Archivio e avviso da mostrare | Riduce ricerca e reinserimento; EECard non conosce automaticamente l'esito | Avvisi autentici, uso autorizzato e prova di leggibilità sul canale scelto |
| Passaggio al canale ufficiale | Pagamento sullo stesso telefono; cambio di contesto esplicito | URL verificato, informazioni trasferite minime, ripresa anche senza ritorno. Il ritorno browser non prova l'incasso |
| Integrazione con partner | Percorso più continuo e potenziale esito riconciliabile | Copertura precisa di avvisi, ruolo contrattuale/regolamentare, API e ambiente di prova, costi/commissioni, assistenza e responsabilità |
| Gestione diretta dei fondi | Cambia sostanzialmente il servizio e le responsabilità | Nessuna approvazione. Richiede studio specialistico e autorizzazioni pertinenti prima di progettare un'operatività |

Non è sufficiente aggiungere un checkout per vendere l'abbonamento EECard:
incassare la propria quota e pagare una bolletta verso un creditore terzo sono
casi differenti. Il modello non sceglie provider né assume che EECard sia un
prestatore di servizi di pagamento. Verifica specialistica del ruolo e accordi
sono condizioni prima di una futura attivazione, non un servizio svolto qui.

Stati futuri: `preparata → in attesa → riuscita / fallita / annullata / esito
ignoto`. Conservare chiave idempotente e riferimento partner; un timeout non
abilita automaticamente un secondo tentativo. Callback autenticati, replay e
notifiche duplicate non duplicano movimenti; riconciliare importo, valuta,
creditore e dovuto prima di registrare il riscontro. Conservare i quattro
oggetti distinti: dichiarazione, evidenza, verifica, quietanza dell'emittente.

## Prove di fattibilità proposte, non eseguite

| ID | Set / prerequisito | Criterio osservabile |
| --- | --- | --- |
| PB01 | Facsimili per ciascuno schema scelto; foto nitida/sfocata/ruotata, PDF multipagina | Ogni campo obbligatorio errato o assente richiede correzione; originale sempre consultabile; nessuna falsa conferma automatica |
| PB02 | Duplicato, avviso rettificato, domiciliazione, pagato, scaduto | Nessun secondo dovuto dal duplicato; rettifica collegata; stato ignoto distinto; nessun pagamento generato dall'importazione |
| PB03 | Intestatario, delegato valido/scaduto, proprietario senza delega, tecnico, altra agenzia | Zero divulgazioni in elenco, dettagli, codice, export e derivati, compreso cambio attore durante il flusso |
| PB04 | Terminali concordati e telefoni dichiarati, soli avvisi di prova autorizzati | Codice letto correttamente e confronto dei dati prima della disposizione; esiti registrati per dispositivo, senza generalizzare a tutti gli esercenti |
| PB05 | Partner e sandbox autorizzati in una futura sessione | Successo, rifiuto, annullo, timeout, replay e doppio click riconciliati senza doppi incassi; nessun test su denaro reale |

## Fonti primarie consultate il 15 ottobre 2026

- B1: [pagoPA — Pagare con pagoPA](https://assistenza.pagopa.gov.it/hc/it/articles/31958790454417-Pagare-con-pagoPA).
- B2: [pagoPA — Dove pagare](https://www.pagopa.gov.it/it/cittadini/dove-pagare/).
- B3: [DevPortal — Codice QR, guida avvisi 3.5.1](https://www.developer.pagopa.it/it/pago-pa/guides/avviso-pagamento/3.5.1/allegato-2/specifiche-tecniche/dati-per-il-pagamento/codice-qr).
- B4: [DevPortal — Integrazione touch point dell'EC con Checkout, SANP 3.12.0](https://developer.pagopa.it/it/pago-pa/guides/sanp/3.12.0/ente-creditore/modalita-dintegrazione/integrazione-touch-point-dellec-con-checkout).
- B5: [Poste Italiane — Paga online](https://www.poste.it/paga-online).

Fonti lette, nessuna API operativa invocata. L'esistenza di una specifica non
stabilisce disponibilità per EECard, costo, copertura o beneficio economico.
