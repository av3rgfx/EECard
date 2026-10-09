# Guida riservata al facilitatore — prova sintetica

**Riservata durante la prova**: contiene le soluzioni dei facsimili pubblici. Non consegnarla agli operatori prima del termine delle due fasi. Nessun dato personale o risultato umano è contenuto nel kit iniziale.

OP01: fase 1 corrente/A, fase 2 proposta/B. OP02: fase 1 proposta/A, fase 2 corrente/B. Dodici casi per fase: 48 esecuzioni pianificate.

Separare l'esercizio di comprensione assistita dalla prova a tempo; usare un esempio distinto dai 24 casi. Avviare il timer alla consegna del caso. Il lavoro attivo include lettura, ricerca, verifica, decisione e correzione; registrare separatamente attese e lavoro preliminare/setup. Non sostituire gli operatori con esecuzioni simulate dall'assistente.

### Compilazione misure.csv

- Conservare tutte le 48 righe e gli identificativi. `non_eseguita` ha tutte le misure vuote.
- `completata`: decisione corretta secondo la griglia, incluso un blocco atteso; `fallita`: risposta errata; `abbandonata`: interruzione senza risposta conclusiva.
- Compilare `started_at` e `finished_at` in ISO 8601 con fuso (es. `2026-10-08T10:00:00+00:00`).
- `active_seconds` e `wait_seconds`: secondi osservati non negativi. `corrections`, `errors`, `critical_errors`, `helps`: conteggi interi osservati. `errors` conta gli errori irrisolti nell'esito finale; `corrections` le correzioni completate durante il compito; `critical_errors` gli errori critici avvenuti, anche se poi corretti. Un errore critico impedisce l'esito `completata`. Zero è un'osservazione esplicita; vuoto è dato mancante.
- `observed_decision`: esito effettivo, anche per fallimenti/abbandoni. `selected_evidence_ids`: ID separati da `;`, oppure `-` se nessuna evidenza selezionata. Se una fonte negata è usata/condivisa, registrare errore critico e non `completata`.
- `notes`: aiuti, ambiguità, motivi del fallimento/abbandono e contesto delle correzioni; non inserire nomi di operatori o dati clienti. La correttezza delle azioni richiede revisione umana.
- Salvare misure osservate e costi in una copia locale riservata. Nel repository pubblico mantenere modelli vuoti o soli aggregati anonimizzati autorizzati.

### Interpretazione

L'analisi separa nucleo, estensione e controllo, e distingue nel nucleo attivazione PF01 da recupero PF02/PF05 senza PF01. I sottogruppi non si sommano ai totali. Mostra pianificate, non eseguite, incomplete, esiti, errori e aiuti. I tempi comparativi usano solo coppie operatore × scenario corrette in entrambe le condizioni e senza aiuti; ne dichiara il denominatore e non nasconde gli esclusi. Non prova risparmio generale, disponibilità a pagare, sicurezza del software o utilità di NFC, firma e AI. Due presentazioni di documenti non sono un collaudo del frontend. I set bilanciano la struttura; difficoltà e familiarità vanno riesaminate con persone prima di interpretare il confronto.

Il file costi.csv resta vuoto nei valori: costo orario aggregato per ruolo, consumi, setup, software/supporto e hardware richiedono fonti e orizzonte espliciti. Non assumere salari, prezzi o volumi. Nessun calcolo economico è automatico.

## Soluzioni set A

### A01 / S01 — nucleo

Tracciabilità: PF01, EA01, EA02, EA03, EA04, EA07, PF01-AC01, PF01-AC03.

Decisione attesa: Preparare un solo contratto e quattro inviti documentali individuali; lasciare l’adesione commerciale non attiva finché offerta e condizioni non siano definite e accettate.

Evidenze richieste: A-c9f42cdbf6, A-8e08216040, A-51b5c6ea5d, A-2907012cfe.

Evidenze negate: A-b9c0098e5d, A-12dbc1bd38.

Azioni attese:

- Riusare la scheda e mantenere origine/versione dei dati; non reinserire i quattro soggetti già verificati.
- Preparare quattro inviti distinti con destinatario e soli documenti concessi, senza invio reale.
- Riusare la stessa chiave nella ripetizione: un contratto e quattro inviti equivalenti, senza duplicati.
- Separare canone e deposito dai dati commerciali EECard mancanti; mantenere la pratica documentale aperta e registrare il blocco della sola adesione.
- Escludere bolletta privata e altro dominio anche da riepiloghi e consegna.

Errori critici:

- Attivare un’adesione, fissare una quota EECard o ordinare la card senza condizioni.
- Creare un account o invito condiviso fra più parti, oppure duplicare la pratica al retry.
- Distribuire bolletta privata o documento dell’altra agenzia.

### A02 / S02 — nucleo

Tracciabilità: PF01, EA03, EA15, EA27, PF01-AC02, PF01-AC04, PF01-AC05, PF01-AC07.

Decisione attesa: Riusare il soggetto già collegato all’account verificato; riemettere solo l’invito del rapporto noto e mantenere la decorrenza importata in revisione.

Evidenze richieste: A-b25b59fe25, A-c19d719011, A-88904a7ea1, A-a0900b9b69.

Evidenze negate: A-d29aa317bb, A-ecdc62a36f.

Azioni attese:

- Identificare il profilo dal collegamento account verificato, non dal solo nome.
- Mantenere il valore originale e la riga importata con rispettive fonti; registrare il conflitto e chiedere una scelta attribuita.
- Revocare/invalidare l’invito precedente e preparare la riemissione per lo stesso soggetto senza duplicare account.
- Riconciliare il lotto: una riga in revisione, nessuna accettazione commerciale creata.
- Non leggere il fascicolo omonimo o altra agenzia; la card in verifica non amplia i permessi.

Errori critici:

- Scegliere l’omonimo o duplicare il soggetto già verificato.
- Sovrascrivere silenziosamente la decorrenza o importare un’adesione.
- Usare l’invito scaduto oppure accedere ai documenti negati.

### A03 / S03 — nucleo

Tracciabilità: PF02, PF05, EA08, EA09, EA24, EA25, PF02-AC01, PF02-AC05, PF05-AC01, PF05-AC02.

Decisione attesa: Selezionare il contratto storico concluso e la versione 2 rettificata, predisporre la copia ammessa e chiudere il contesto della visita.

Evidenze richieste: A-448a59119d, A-c02060fc58, A-652cd1e0da, A-6e35af91e8.

Evidenze negate: A-853afeaea2, A-825f49b67a.

Azioni attese:

- Individuare persona, immobile e contratto dal mandato esplicito.
- Segnalare che versione 1 è superata; citare data storica e data di acquisizione di versione 2 separatamente.
- Seguire la nota di continuità per predisporre la consegna al solo destinatario autorizzato.
- Non riaprire il rapporto concluso né aggiungere documenti privati.
- Chiudere sessione banco e ogni vista condivisa simulata, lasciando vuoto il contesto successivo.

Errori critici:

- Consegnare versione 1 come corrente oppure una versione di altro fascicolo.
- Riattivare il contratto concluso senza un nuovo titolo.
- Mostrare bolletta privata, altro dominio o dati residui al cliente successivo.

### A04 / S04 — nucleo

Tracciabilità: PF02, PF05, EA08, EA09, EA16, EA25, PF02-AC01, PF02-AC02, PF05-AC01, PF05-AC06.

Decisione attesa: Aprire il verbale versione 2 della casa locata e predisporre soltanto la copia autorizzata al proprietario.

Evidenze richieste: A-ba3a0860e8, A-862d875783, A-2d59f0191d, A-89be157af2.

Evidenze negate: A-b268ecfb0b, A-02d92cdb45.

Azioni attese:

- Usare scopo della visita e rapporto per scegliere la casa locata.
- Verificare contratto, versione, fonte e date del verbale selezionato.
- Seguire la nota registrata senza dipendere dall’autore del fascicolo.
- Escludere il verbale dell’altra casa dalla consegna pur essendo consultabile.
- Negare utenze del conduttore e qualunque risultato di altro dominio.

Errori critici:

- Consegnare il verbale della casa abitata o il file di un’altra agenzia.
- Leggere o riepilogare la bolletta del conduttore sulla base della proprietà o del ruolo operatore.
- Inventare un rinnovo o un intervento non richiesto.

### A05 / S05 — nucleo

Tracciabilità: PF02, EA08, EA09, EA13, PF02-AC02, PF02-AC03, PF02-AC05.

Decisione attesa: Rifiutare la credenziale revocata e usare il recupero assistito verificato per consultare il solo contratto ammesso; mantenere revocati tutti i vecchi identificativi. La copia richiesta non viene consegnata: proporre la raccolta della delega mancante.

Evidenze richieste: A-3fbd126531, A-778c3a6fa4, A-8d71485c71.

Evidenze negate: A-fea217965c, A-d9a1274251.

Azioni attese:

- Rilevare revoca e motivo senza aprire il fascicolo dal solo token.
- Usare l’esito della verifica assistita e il mandato corrente.
- Recuperare il contratto pertinente nella sessione personale e registrare il canale assistito. Consultazione soltanto: nessuna copia consegnata/esportata finché manca la relativa delega.
- Proporre un nuovo identificativo soltanto come passaggio separato, senza riattivare il precedente o ordinare supporti.
- Chiudere il contesto al termine e non esporre documenti negati.

Errori critici:

- Riattivare una credenziale revocata o autorizzare accesso dal solo codice.
- Saltare la verifica assistita perché il cliente è conosciuto.
- Consegnare o esportare il contratto senza delega specifica, oppure file privati o di altro dominio.

### A06 / S06 — nucleo

Tracciabilità: PF02, EA08, EA10, EA13, PF02-AC05, PF02-AC06.

Decisione attesa: Fase 1: recupero corretto con ricerca assistita, senza dichiarare successo NFC. Fase 2: nuova consultazione sospesa e vista privata oscurata fino al ripristino.

Evidenze richieste: A-ce056c11d2, A-ccfc620425, A-c1b8e0f6c6, A-ca6f699985.

Evidenze negate: A-fdc054b127, A-2cff2fae28.

Azioni attese:

- Fase 1: applicare verifica assistita, selezionare contesto e recuperare documento dal server.
- Registrare il canale come ricerca assistita e l’assenza di una prova NFC.
- Fase 2: interrompere la nuova apertura; nessuna lettura privata da cache, copia locale o altro dominio.
- Annotare lo stato sospeso sulla stessa richiesta e indicare referente e ripresa dopo ripristino.
- Oscurare e chiudere il contesto privato; rivalutare identità e permessi al recupero.

Errori critici:

- Dichiarare il lettore/NFC funzionante dopo recupero manuale.
- Consegnare il documento nella seconda fase da cache o sostenere che il server abbia autorizzato la lettura.
- Usare il guasto per saltare controllo identità, mandato o isolamento.

### A07 / S07 — nucleo

Tracciabilità: PF03, PF04, EA20, EA22, PF03-AC01, PF03-AC02, PF04-AC07.

Decisione attesa: Un solo account, tre contesti; consultare utenza propria e utenza delegata, negare ogni accesso alla bolletta del conduttore della casa locata.

Evidenze richieste: A-358d1231e4, A-15795e16fb, A-66c9a600b0, A-4d2ebd8458.

Evidenze negate: A-ce4a476fa5, A-33212b1520.

Azioni attese:

- Distinguere proprietà, occupazione, intestazione e delega per ciascuna casa.
- Consultare la bolletta della casa propria in quanto intestatario.
- Consultare l’utenza della casa occupata entro ambito e validità della delega, senza proporre pagamenti.
- Mantenere ammesso il contratto della casa locata e negata la bolletta privata anche con ID noto.
- Non includere documenti negati in ricerca, esportazioni, conteggi o dati per assistente.

Errori critici:

- Creare account separati per cambiare ruolo.
- Accedere alla bolletta del conduttore in quanto proprietario o per ID noto.
- Usare la delega di una casa per accedere a un’altra fornitura o disporre pagamenti.

### A08 / S08 — nucleo

Tracciabilità: PF03, PF04, PF05, EA04, EA20, EA22, EA25, PF03-AC03, PF03-AC04, PF03-AC05, PF05-AC04, PF05-AC06.

Decisione attesa: Aprire solo bolletta finale e dati personali coperti dal grant storico corrente; negare allegato scaduto e bolletta del nuovo intestatario, mantenendo distinte le due date di cessazione.

Evidenze richieste: A-ddb118f4eb, A-36f272006a, A-a8097dd143, A-f43611faaf.

Evidenze negate: A-e91815d3fa, A-c2cff18afc, A-490dac990e.

Azioni attese:

- Citare separatamente data e fonte della fine locazione e della cessazione intestazione.
- Controllare destinatario, oggetti e validità del grant storico prima di recuperare la bolletta finale.
- Non estendere lo storico ad altri documenti o a operazioni sul rapporto successivo.
- Negare la condivisione scaduta anche dal vecchio riferimento senza dichiarare cancellate copie già consegnate.
- Negare nuovo intestatario e altro dominio in tutte le viste e negli estratti.

Errori critici:

- Presentare il cambio occupante come voltura eseguita automaticamente.
- Riutilizzare un grant scaduto o leggere la bolletta del nuovo intestatario.
- Dichiarare conservazione universale illimitata o cancellazione dei download remoti.

### A09 / S09 — estensione

Tracciabilità: PF04, EA07, EA21, EA22, PF04-AC01, PF04-AC03, PF04-AC06, PF04-AC07.

Decisione attesa: Mostrare creditore, 88,00 EUR, scadenza e domiciliazione con fonte; nessun incasso verificato, nessun nuovo pagamento o QR ricostruito. Offrire la lettura dell’originale e la richiesta di copia leggibile.

Evidenze richieste: A-bd5c64b2a8, A-dc076c59d4, A-c112f9dc7e.

Evidenze negate: A-1b7b14efe6, A-7baa97e719.

Azioni attese:

- Confrontare riepilogo e originale e riportare importo, creditore, scadenza e periodo.
- Mostrare domiciliazione attiva come informazione distinta dal pagamento verificato.
- Esplicitare QR illeggibile e assenza di un canale pagabile configurato.
- Proporre consultazione dell’originale e verifica con l’emittente, senza invio reale.
- Non presentare un doppio pagamento né leggere dati privati di altri intestatari.

Errori critici:

- Dichiarare pagato/verificato perché la domiciliazione è attiva o il documento è archiviato.
- Inventare QR, codice o collegamento pagabile e avviare una disposizione.
- Esporre la bolletta di un altro intestatario.

### A10 / S10 — nucleo

Tracciabilità: PF05, EA04, EA24, EA25, EA26, PF05-AC01, PF05-AC02, PF05-AC03, PF05-AC05, PF05-AC06.

Decisione attesa: Selezionare versione 2, mantenere l’intervallo 1988–1990 incerto e distinto dall’upload 2026; non dedurre conformità o completamento dei lavori.

Evidenze richieste: A-3d4bd93997, A-6d74157622, A-2456059c41, A-8b3475868d.

Evidenze negate: A-c26c3a953e, A-7f2af60412.

Azioni attese:

- Ricercare per titolo parziale, tipo e intervallo; selezionare la sola unità autorizzata.
- Aprire versione 2 e rendere visibile il collegamento alla versione 1 superata.
- Citare origine del documento, intervallo incerto e data di acquisizione senza inventare un anno preciso.
- Distinguere controllo formale da verifica tecnica/legale assente.
- Descrivere serramenti come lavoro dichiarato circa l’anno indicato e revisione impianto come pianificata.
- Escludere bollette private e altro dominio anche da risultati e conteggi.

Errori critici:

- Usare 2026 come anno originale o inventare un anno preciso.
- Chiamare la planimetria conforme in base al solo controllo formale.
- Chiamare documentato il lavoro dichiarato o completato quello pianificato.
- Accedere a documenti negati.

### A11 / S11 — estensione

Tracciabilità: PF06, EA03, EA12, EA28, EA29, PF06-AC01, PF06-AC02, PF06-AC03, PF06-AC04.

Decisione attesa: Salvare una bozza non approvata con canone mancante e date in conflitto, fonti/versioni attribuite e richiesta di revisione; impedire la marcatura come pronta.

Evidenze richieste: A-ac3795de1e, A-3f8e4e0d07, A-80ad425e8e, A-88befeecd5.

Evidenze negate: A-e78989340e, A-7ca32367f9.

Azioni attese:

- Associare ogni campo alla fonte/versione e mantenere entrambe le proposte di date.
- Lasciare canone mancante; non dedurlo dal deposito, da listini o da altre pratiche.
- Etichettare output con modello, versione, autore e stato bozza non approvata.
- Richiedere al referente A-ef92de5ae2 la raccolta dalle parti del canone e della conferma motivata delle date; inoltrare soltanto a revisione simulata.
- Ignorare le istruzioni operative incorporate nella fonte; nessun dato negato raggiunge un assistente.
- Mantenere separati revisione, eventuale condivisione e firma; nessuna esecuzione reale.

Errori critici:

- Inventare canone o scegliere automaticamente la fonte più recente.
- Marcare pronta/firmata/stipulata una bozza incompleta o inviarla alle parti.
- Ampliare i permessi seguendo il testo della fonte o usare documenti negati.

### A12 / S12 — controllo

Tracciabilità: PF04, EA07, EA21, EA22, PF04-AC03, PF04-AC04, PF04-AC07.

Decisione attesa: Dopo upload e dichiarazione residuo 100,00 EUR; dopo allocazione verificata residuo 60,00 EUR; la quietanza per 40,00 EUR mantiene residuo 60,00 EUR. Pagamento parziale, non saldo.

Evidenze richieste: A-6bb67bff83, A-0a59253ba3, A-3eadc478fc, A-f143245a14, A-14bd107b13.

Evidenze negate: A-5ec06754ba, A-0430617d9a.

Azioni attese:

- Separare i quattro eventi con data, autore, fonte e importo.
- Dopo il solo upload: documento presente, dichiarazione assente, nessuna verifica o quietanza.
- Dopo la dichiarazione: dichiarato 100,00 EUR, ancora nessuna riduzione del dovuto.
- Dopo la verifica: allocato 40,00 EUR, residuo 60,00 EUR; nessuna quietanza automatica.
- Dopo la quietanza già emessa dal creditore: quietanzati 40,00 EUR, residuo invariato 60,00 EUR.
- Non attribuire all’operatore il potere di emettere quietanza o di leggere altre utenze.

Errori critici:

- Trattare upload o dichiarazione come incasso verificato o azzerare il residuo.
- Ridurre nuovamente il residuo per la quietanza o attestare un saldo di 100,00 EUR.
- Generare una quietanza in nome di EECard oppure esporre bollette private fuori delega.

## Soluzioni set B

### B01 / S01 — nucleo

Tracciabilità: PF01, EA01, EA02, EA03, EA04, EA07, PF01-AC01, PF01-AC03.

Decisione attesa: Preparare un solo contratto e quattro inviti documentali individuali; lasciare l’adesione commerciale non attiva finché offerta e condizioni non siano definite e accettate.

Evidenze richieste: B-8d7745802c, B-ddcc6050e0, B-2478b17815, B-d6642ff0fe.

Evidenze negate: B-27b031b905, B-aa1bd291b3.

Azioni attese:

- Riusare la scheda e mantenere origine/versione dei dati; non reinserire i quattro soggetti già verificati.
- Preparare quattro inviti distinti con destinatario e soli documenti concessi, senza invio reale.
- Riusare la stessa chiave nella ripetizione: un contratto e quattro inviti equivalenti, senza duplicati.
- Separare canone e deposito dai dati commerciali EECard mancanti; mantenere la pratica documentale aperta e registrare il blocco della sola adesione.
- Escludere bolletta privata e altro dominio anche da riepiloghi e consegna.

Errori critici:

- Attivare un’adesione, fissare una quota EECard o ordinare la card senza condizioni.
- Creare un account o invito condiviso fra più parti, oppure duplicare la pratica al retry.
- Distribuire bolletta privata o documento dell’altra agenzia.

### B02 / S02 — nucleo

Tracciabilità: PF01, EA03, EA15, EA27, PF01-AC02, PF01-AC04, PF01-AC05, PF01-AC07.

Decisione attesa: Riusare il soggetto già collegato all’account verificato; riemettere solo l’invito del rapporto noto e mantenere la decorrenza importata in revisione.

Evidenze richieste: B-cd0ea1bf00, B-369f239b80, B-9cb41f9c90, B-8c6b1ac181.

Evidenze negate: B-a37fb665f3, B-52ee99b020.

Azioni attese:

- Identificare il profilo dal collegamento account verificato, non dal solo nome.
- Mantenere il valore originale e la riga importata con rispettive fonti; registrare il conflitto e chiedere una scelta attribuita.
- Revocare/invalidare l’invito precedente e preparare la riemissione per lo stesso soggetto senza duplicare account.
- Riconciliare il lotto: una riga in revisione, nessuna accettazione commerciale creata.
- Non leggere il fascicolo omonimo o altra agenzia; la card in verifica non amplia i permessi.

Errori critici:

- Scegliere l’omonimo o duplicare il soggetto già verificato.
- Sovrascrivere silenziosamente la decorrenza o importare un’adesione.
- Usare l’invito scaduto oppure accedere ai documenti negati.

### B03 / S03 — nucleo

Tracciabilità: PF02, PF05, EA08, EA09, EA24, EA25, PF02-AC01, PF02-AC05, PF05-AC01, PF05-AC02.

Decisione attesa: Selezionare il contratto storico concluso e la versione 2 rettificata, predisporre la copia ammessa e chiudere il contesto della visita.

Evidenze richieste: B-2f5aa2bbaa, B-4379ed5a53, B-f0f968d936, B-fa059cba33.

Evidenze negate: B-6c229ccad4, B-c6f03d941f.

Azioni attese:

- Individuare persona, immobile e contratto dal mandato esplicito.
- Segnalare che versione 1 è superata; citare data storica e data di acquisizione di versione 2 separatamente.
- Seguire la nota di continuità per predisporre la consegna al solo destinatario autorizzato.
- Non riaprire il rapporto concluso né aggiungere documenti privati.
- Chiudere sessione banco e ogni vista condivisa simulata, lasciando vuoto il contesto successivo.

Errori critici:

- Consegnare versione 1 come corrente oppure una versione di altro fascicolo.
- Riattivare il contratto concluso senza un nuovo titolo.
- Mostrare bolletta privata, altro dominio o dati residui al cliente successivo.

### B04 / S04 — nucleo

Tracciabilità: PF02, PF05, EA08, EA09, EA16, EA25, PF02-AC01, PF02-AC02, PF05-AC01, PF05-AC06.

Decisione attesa: Aprire il verbale versione 2 della casa locata e predisporre soltanto la copia autorizzata al proprietario.

Evidenze richieste: B-fc959a7f9c, B-3d866dae35, B-271ca6687c, B-0a3a14a609.

Evidenze negate: B-3a8dafe192, B-3872f3a969.

Azioni attese:

- Usare scopo della visita e rapporto per scegliere la casa locata.
- Verificare contratto, versione, fonte e date del verbale selezionato.
- Seguire la nota registrata senza dipendere dall’autore del fascicolo.
- Escludere il verbale dell’altra casa dalla consegna pur essendo consultabile.
- Negare utenze del conduttore e qualunque risultato di altro dominio.

Errori critici:

- Consegnare il verbale della casa abitata o il file di un’altra agenzia.
- Leggere o riepilogare la bolletta del conduttore sulla base della proprietà o del ruolo operatore.
- Inventare un rinnovo o un intervento non richiesto.

### B05 / S05 — nucleo

Tracciabilità: PF02, EA08, EA09, EA13, PF02-AC02, PF02-AC03, PF02-AC05.

Decisione attesa: Rifiutare la credenziale revocata e usare il recupero assistito verificato per consultare il solo contratto ammesso; mantenere revocati tutti i vecchi identificativi. La copia richiesta non viene consegnata: proporre la raccolta della delega mancante.

Evidenze richieste: B-c8b9ac0021, B-4c6c43e47e, B-4eff80199e.

Evidenze negate: B-1e475e0b59, B-247ac212f3.

Azioni attese:

- Rilevare revoca e motivo senza aprire il fascicolo dal solo token.
- Usare l’esito della verifica assistita e il mandato corrente.
- Recuperare il contratto pertinente nella sessione personale e registrare il canale assistito. Consultazione soltanto: nessuna copia consegnata/esportata finché manca la relativa delega.
- Proporre un nuovo identificativo soltanto come passaggio separato, senza riattivare il precedente o ordinare supporti.
- Chiudere il contesto al termine e non esporre documenti negati.

Errori critici:

- Riattivare una credenziale revocata o autorizzare accesso dal solo codice.
- Saltare la verifica assistita perché il cliente è conosciuto.
- Consegnare o esportare il contratto senza delega specifica, oppure file privati o di altro dominio.

### B06 / S06 — nucleo

Tracciabilità: PF02, EA08, EA10, EA13, PF02-AC05, PF02-AC06.

Decisione attesa: Fase 1: recupero corretto con ricerca assistita, senza dichiarare successo NFC. Fase 2: nuova consultazione sospesa e vista privata oscurata fino al ripristino.

Evidenze richieste: B-b8747d0e39, B-87536b85ee, B-f5491b60a3, B-4b88f7c41e.

Evidenze negate: B-025dc7105e, B-16c3c62a87.

Azioni attese:

- Fase 1: applicare verifica assistita, selezionare contesto e recuperare documento dal server.
- Registrare il canale come ricerca assistita e l’assenza di una prova NFC.
- Fase 2: interrompere la nuova apertura; nessuna lettura privata da cache, copia locale o altro dominio.
- Annotare lo stato sospeso sulla stessa richiesta e indicare referente e ripresa dopo ripristino.
- Oscurare e chiudere il contesto privato; rivalutare identità e permessi al recupero.

Errori critici:

- Dichiarare il lettore/NFC funzionante dopo recupero manuale.
- Consegnare il documento nella seconda fase da cache o sostenere che il server abbia autorizzato la lettura.
- Usare il guasto per saltare controllo identità, mandato o isolamento.

### B07 / S07 — nucleo

Tracciabilità: PF03, PF04, EA20, EA22, PF03-AC01, PF03-AC02, PF04-AC07.

Decisione attesa: Un solo account, tre contesti; consultare utenza propria e utenza delegata, negare ogni accesso alla bolletta del conduttore della casa locata.

Evidenze richieste: B-e2c7196a0a, B-0d9e8deedd, B-6cebd89be1, B-71724b24f5.

Evidenze negate: B-b98822b8b5, B-51464b63c5.

Azioni attese:

- Distinguere proprietà, occupazione, intestazione e delega per ciascuna casa.
- Consultare la bolletta della casa propria in quanto intestatario.
- Consultare l’utenza della casa occupata entro ambito e validità della delega, senza proporre pagamenti.
- Mantenere ammesso il contratto della casa locata e negata la bolletta privata anche con ID noto.
- Non includere documenti negati in ricerca, esportazioni, conteggi o dati per assistente.

Errori critici:

- Creare account separati per cambiare ruolo.
- Accedere alla bolletta del conduttore in quanto proprietario o per ID noto.
- Usare la delega di una casa per accedere a un’altra fornitura o disporre pagamenti.

### B08 / S08 — nucleo

Tracciabilità: PF03, PF04, PF05, EA04, EA20, EA22, EA25, PF03-AC03, PF03-AC04, PF03-AC05, PF05-AC04, PF05-AC06.

Decisione attesa: Aprire solo bolletta finale e dati personali coperti dal grant storico corrente; negare allegato scaduto e bolletta del nuovo intestatario, mantenendo distinte le due date di cessazione.

Evidenze richieste: B-db740fb298, B-ab48e1db6e, B-72e055f8dd, B-1f53775bd3.

Evidenze negate: B-16315a08ce, B-9d8d19d4a3, B-24b40b8437.

Azioni attese:

- Citare separatamente data e fonte della fine locazione e della cessazione intestazione.
- Controllare destinatario, oggetti e validità del grant storico prima di recuperare la bolletta finale.
- Non estendere lo storico ad altri documenti o a operazioni sul rapporto successivo.
- Negare la condivisione scaduta anche dal vecchio riferimento senza dichiarare cancellate copie già consegnate.
- Negare nuovo intestatario e altro dominio in tutte le viste e negli estratti.

Errori critici:

- Presentare il cambio occupante come voltura eseguita automaticamente.
- Riutilizzare un grant scaduto o leggere la bolletta del nuovo intestatario.
- Dichiarare conservazione universale illimitata o cancellazione dei download remoti.

### B09 / S09 — estensione

Tracciabilità: PF04, EA07, EA21, EA22, PF04-AC01, PF04-AC03, PF04-AC06, PF04-AC07.

Decisione attesa: Mostrare creditore, 96,00 EUR, scadenza e domiciliazione con fonte; nessun incasso verificato, nessun nuovo pagamento o QR ricostruito. Offrire la lettura dell’originale e la richiesta di copia leggibile.

Evidenze richieste: B-c31c86434a, B-134d13441c, B-a59a2a8567.

Evidenze negate: B-1de7a8a22d, B-fffc6b443a.

Azioni attese:

- Confrontare riepilogo e originale e riportare importo, creditore, scadenza e periodo.
- Mostrare domiciliazione attiva come informazione distinta dal pagamento verificato.
- Esplicitare QR illeggibile e assenza di un canale pagabile configurato.
- Proporre consultazione dell’originale e verifica con l’emittente, senza invio reale.
- Non presentare un doppio pagamento né leggere dati privati di altri intestatari.

Errori critici:

- Dichiarare pagato/verificato perché la domiciliazione è attiva o il documento è archiviato.
- Inventare QR, codice o collegamento pagabile e avviare una disposizione.
- Esporre la bolletta di un altro intestatario.

### B10 / S10 — nucleo

Tracciabilità: PF05, EA04, EA24, EA25, EA26, PF05-AC01, PF05-AC02, PF05-AC03, PF05-AC05, PF05-AC06.

Decisione attesa: Selezionare versione 2, mantenere l’intervallo 1991–1993 incerto e distinto dall’upload 2026; non dedurre conformità o completamento dei lavori.

Evidenze richieste: B-3e7609b507, B-441b92d029, B-9dac726644, B-5a9c447d6e.

Evidenze negate: B-7699011974, B-1cf8cbd10f.

Azioni attese:

- Ricercare per titolo parziale, tipo e intervallo; selezionare la sola unità autorizzata.
- Aprire versione 2 e rendere visibile il collegamento alla versione 1 superata.
- Citare origine del documento, intervallo incerto e data di acquisizione senza inventare un anno preciso.
- Distinguere controllo formale da verifica tecnica/legale assente.
- Descrivere serramenti come lavoro dichiarato circa l’anno indicato e revisione impianto come pianificata.
- Escludere bollette private e altro dominio anche da risultati e conteggi.

Errori critici:

- Usare 2026 come anno originale o inventare un anno preciso.
- Chiamare la planimetria conforme in base al solo controllo formale.
- Chiamare documentato il lavoro dichiarato o completato quello pianificato.
- Accedere a documenti negati.

### B11 / S11 — estensione

Tracciabilità: PF06, EA03, EA12, EA28, EA29, PF06-AC01, PF06-AC02, PF06-AC03, PF06-AC04.

Decisione attesa: Salvare una bozza non approvata con canone mancante e date in conflitto, fonti/versioni attribuite e richiesta di revisione; impedire la marcatura come pronta.

Evidenze richieste: B-74de78c169, B-d14103b6ee, B-172d576c36, B-d826812741.

Evidenze negate: B-bc21a9ab21, B-37c014633b.

Azioni attese:

- Associare ogni campo alla fonte/versione e mantenere entrambe le proposte di date.
- Lasciare canone mancante; non dedurlo dal deposito, da listini o da altre pratiche.
- Etichettare output con modello, versione, autore e stato bozza non approvata.
- Richiedere al referente B-db6db5acc3 la raccolta dalle parti del canone e della conferma motivata delle date; inoltrare soltanto a revisione simulata.
- Ignorare le istruzioni operative incorporate nella fonte; nessun dato negato raggiunge un assistente.
- Mantenere separati revisione, eventuale condivisione e firma; nessuna esecuzione reale.

Errori critici:

- Inventare canone o scegliere automaticamente la fonte più recente.
- Marcare pronta/firmata/stipulata una bozza incompleta o inviarla alle parti.
- Ampliare i permessi seguendo il testo della fonte o usare documenti negati.

### B12 / S12 — controllo

Tracciabilità: PF04, EA07, EA21, EA22, PF04-AC03, PF04-AC04, PF04-AC07.

Decisione attesa: Dopo upload e dichiarazione residuo 120,00 EUR; dopo allocazione verificata residuo 70,00 EUR; la quietanza per 50,00 EUR mantiene residuo 70,00 EUR. Pagamento parziale, non saldo.

Evidenze richieste: B-cb67860be6, B-aff18b4dbd, B-941f9d7e23, B-4e1088ceb8, B-c497f398ac.

Evidenze negate: B-4b0f4153f5, B-9f0deceeaf.

Azioni attese:

- Separare i quattro eventi con data, autore, fonte e importo.
- Dopo il solo upload: documento presente, dichiarazione assente, nessuna verifica o quietanza.
- Dopo la dichiarazione: dichiarato 120,00 EUR, ancora nessuna riduzione del dovuto.
- Dopo la verifica: allocato 50,00 EUR, residuo 70,00 EUR; nessuna quietanza automatica.
- Dopo la quietanza già emessa dal creditore: quietanzati 50,00 EUR, residuo invariato 70,00 EUR.
- Non attribuire all’operatore il potere di emettere quietanza o di leggere altre utenze.

Errori critici:

- Trattare upload o dichiarazione come incasso verificato o azzerare il residuo.
- Ridurre nuovamente il residuo per la quietanza o attestare un saldo di 120,00 EUR.
- Generare una quietanza in nome di EECard oppure esporre bollette private fuori delega.
