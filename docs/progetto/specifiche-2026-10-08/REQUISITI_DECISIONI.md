# Registro incrementale di requisiti e decisioni

8 ottobre 2026. Fonte principale: [analisi della conversazione](../discussione-2026-10-07/ANALISI_CONVERSAZIONE.md),
che conserva timestamp e significato di EA01–EA30. Base del confronto:
`main` `a8e0ca7`, [studio v0.1](../EECard-studio-v0.1.pdf), documenti correnti e
sorgenti indicati sotto. La richiesta attuale autorizza specifiche e consegna,
non l'attivazione di servizi o l'approvazione automatica delle proposte.

## Come leggere il registro

**V** = vincolo già confermato e da conservare; **P** = proposta funzionale
revisionabile; **A** = decisione o prova aperta. Una riga P/A è specificata qui,
ma non approvata per il primo rilascio. La colonna origine riprende il catalogo:
N nuova, P precisazione, R ripresa, T tensione con una scelta già ricevuta.
RF identifica il requisito; EA resta il collegamento stabile alla fonte.

| ID / fonte EA | Origine | Differenza concreta dalla base | Requisito incrementale e stato | Specifica / verifica |
| --- | --- | --- | --- | --- |
| RF01 · EA01 | R/P | Il selettore di ruolo demo non rappresenta un'identità | V: tessera servizi, non bancaria; P: distinguere persona, account, adesione e credenziale | MODELLO_DATI; PF01/PF02 |
| RF02 · EA02 | P | L'invito demo non prevede offerta e attivazione commerciale | P: proposta facoltativa nella pratica contrattuale con condizioni esplicite; A: venditore, quota, durata, unità e incasso | Offerta clienti; PF01 |
| RF03 · EA03 | P | Dati precompilati solo da fixture, nessuna importazione | P: riuso assistito con origine, deduplica e verifica delle parti; nessuna API del gestionale presunta | PF01/PF06; modello relazioni |
| RF04 · EA04 | P | Metadati file e visibilità simulati | P: fascicolo coerente con versioni e viste per destinatario; elenco documenti richiesti contestuale, non lista legale universale | PF01/PF05 |
| RF05 · EA05 | R/P | Ruolo e presentazione demo non sono pacchetto commerciale | P: benefici proprietario/inquilino distinti; V: pacchetto superiore non attribuisce privilegi sugli altri | Scheda clienti; PF03 |
| RF06 · EA06 | P | Solo interesse per card fisica, nessun ordine | P: consegna con cartellina o spedizione; A: inclusione per canale, varianti, costi e responsabilità | PF01; scheda clienti |
| RF07 · EA07 | R/P | Un Payment per immobile, nessun libro dei movimenti | V: quota, canone, deposito e prestazioni separati; allegato/dichiarazione/verifica/quietanza distinti | MODELLO_DATI; PF04 |
| RF08 · EA08 | P | Coda agenzia demo, nessuna ricerca cliente persistente | P: altro operatore autorizzato recupera documenti e attività con fonte/stato senza memoria personale | PF02/PF05; prova agenzia |
| RF09 · EA09 | P | Nessun lettore o sessione banco | P: presentazione card richiama il contesto, con verifica operatore e permessi; card revocata rifiutata | PF02; FATTIBILITA |
| RF10 · EA10 | N forma d'uso | Mini terminale non progettato | P: prova su componenti da banco prima dell'involucro 3D; A: ingombro, modello, costo, gestione | FATTIBILITA; alternativa hardware |
| RF11 · EA11 | N | Nessuna vista condivisa al banco | P: schermo di riepilogo con dati selezionati e sessione breve; A: destinatari e interazione esatti | PF02; FATTIBILITA |
| RF12 · EA12 | N | Firma assente | A: atti e valore richiesto; P: revisione, identificazione, consenso alla firma e documento immutabile con prove di processo | PF06; FATTIBILITA |
| RF13 · EA13 | P | ID locale demo, nessun chip/protocollo | P: credenziale revocabile indipendente dal supporto; A: protocollo e lettore, nessuna equiparazione NFC = autenticazione | PF02; prove contactless |
| RF14 · EA14 | N | Pass Apple/Google assenti | P: emissione pass e lettura al banco sono risultati separati; A: programmi, terminale e dispositivi effettivi | FATTIBILITA |
| RF15 · EA15 | P | Accesso con codice demo pubblico | P: iscrizione online con stato in attesa; niente fascicolo prima del rapporto verificato; fisica ordinabile solo con condizioni definite | PF01, variante online |
| RF16 · EA16 | P | Una demo, nessuna organizzazione isolata | P: offerta B2B distinta dal servizio al cliente; isolamento progettato dall'inizio; A: ordine di lancio | Offerta agenzie; MODELLO_DATI |
| RF17 · EA17 | N/P | Simbolo autonomo già scelto, nessuna configurazione partner | P: card con marchio del sistema e del partner, senza trasformare il partner in proprietario dei dati di altri; A: emittente e uso fra sedi | Offerta agenzie; confronto EA30 |
| RF18 · EA18 | N economica | Nessun listino validato | P: distinguere setup/design, software, supporto, card, hardware e prestazioni; A: unità/prezzi/IVA | Scheda agenzie; nessuna cifra inferita |
| RF19 · EA19 | P | Visione SaaS già nello studio, domanda non provata | P: processo adottabile con onboarding e supporto; misurare sforzo risparmiato e responsabilità del partner | Alternativa B2B; prova agenzia |
| RF20 · EA20 | P | UtilitiesPage esclude ogni ruolo diverso da inquilino | P: utenze della casa propria abilitate dall'intestazione/delega valida, non da etichetta globale | PF03; MODELLO_DATI |
| RF21 · EA21 | N UX | Due bollette statiche, nessun QR o percorso sullo stesso telefono | P: importo, creditore, scadenza e QR se presente, dettagli progressivi e alternativa accessibile; V: vedere/scansionare non paga | PF04 |
| RF22 · EA22 | R esplicita | Riservatezza già prevista, simulata nel frontend | V: bolletta personale privata; P: autorizzazioni su intestazione/periodo, anche dopo cambio occupante | PF03/PF04; prove negative |
| RF23 · EA23 | N esplorativa | Nessuna domotica | A: monitoraggio o controllo, dispositivi, titolare e revoca; P: esplorazione separata senza comandi reali | Opzioni di rilascio; backlog |
| RF24 · EA24 | R/P | Fascicolo già nello studio, categorie tecniche limitate nella demo | P: categorie storiche con fonte e stato, utile anche a compravendita; nessuna certificazione urbanistica automatica | PF05 |
| RF25 · EA25 | P | Ricerca titolo in fixture, niente anno/archivio persistente | P: titolo/tipo/anno e versioni; OCR solo se necessario dai file della prova e sempre controllabile | PF05; MODELLO_DATI |
| RF26 · EA26 | P | Eventi ticket testuali, nessuna storia tecnica pregressa | P: lavori pianificati, dichiarati e documentati separati, date ed esecutore attribuiti, documenti collegati | PF05; MODELLO_DATI |
| RF27 · EA27 | N distribuzione | Nessuna migrazione di clienti reali | P: inventario, corrispondenze, revisione ed adesione esplicita; A: servizio precedente e nuova proposta; V: 600 euro non è prezzo EECard | PF01, variante migrazione; offerta |
| RF28 · EA28 | N estensione | AI precedente soprattutto segreteria, codice privo di AI | P: ricerca e sintesi solo su fonti autorizzate e citabili; A: Jarvis, destinatario, provider e costi | FATTIBILITA; PF06 |
| RF29 · EA29 | N | Nessun modello/versione di contratto né generatore | P: precompilazione da dati confermati, lacune evidenti, revisione umana e nuova versione dopo modifiche | PF06; MODELLO_DATI |
| RF30 · EA30 | N/T | Direzione 0.3 già scelta | V: conservare C–Legame, composizione e 0.3; A: ambito bianco/rosso e tonalità; P: confronto limitato prima di un eventuale cambiamento | Confronto sotto; DESIGN.md |

Rimandi: [percorsi](PERCORSI.md), [modello](MODELLO_DATI.md),
[offerte/rilascio/backlog](OFFERTE_RILASCIO.md), [fattibilità](FATTIBILITA.md).
I criteri PF e BF traducono il registro in verifiche: la presenza di un ID non
è evidenza di implementazione o di collaudo.

## Scelte di progetto proposte per rendere le specifiche utilizzabili

| ID | Stato e origine | Scelta e conseguenza | Cosa la può cambiare |
| --- | --- | --- | --- |
| IF01 | P, derivata da EA02–EA04, EA08 e studio §3 | Raccomandare una prima versione centrata sul fascicolo e sulla continuità in agenzia; predisporre separazione B2B | Primo pagante e beneficio indispensabile diversi |
| IF02 | P, EA01/EA05/EA20/EA22, studio §11 | Una persona può avere più contesti; adesione abilita servizi, autorizzazione abilita dati e azioni | Modello di deleghe validato; nessuna offerta può derogare alla riservatezza |
| IF03 | P, EA09/EA13–EA14, studio §8 | Card/QR/tap selezionano un contesto; accesso subordinato a sessione e permessi server | Protocollo hardware, mantenendo la separazione identificazione/autorizzazione |
| IF04 | P, EA11 | Ipotizzare schermo operatore più riepilogo cliente con invio esplicito dei soli dati pertinenti | Conferma dei destinatari; nessuna duplicazione automatica del desktop |
| IF05 | P, EA28–EA29 | Bozza iniziale da modello versionato e campi verificati; AI suggerisce con fonti, revisore decide | Modelli, responsabilità, ruolo di Jarvis e necessità AI fin dal primo rilascio |
| IF06 | V, richiesta attuale | Conservare studio v0.1, naming provvisorio, C–Legame, 0.3 e semantica dei pagamenti | Solo nuova scelta esplicita per naming/visivo; le distinzioni semantiche restano necessarie |

Queste proposte non assegnano fornitori, persone, tariffe, SLA o date. La scelta
del database o del framework server non serve per revisionare i comportamenti.

## Decisioni aperte ordinate per effetto concreto

| ID | Risposta necessaria | Effetto della risposta | Lavoro indipendente |
| --- | --- | --- | --- |
| DA01 | Clienti della prima agenzia, partner o esperienza hardware come primo beneficio acquistato? | Seleziona R1 o una delle alternative; modifica dipendenze critiche | PF01/PF03/PF05 e modello autorizzazioni |
| DA02 | Chi vende/eroga, quale unità/durata/inclusione e fiscalità per le due offerte? | Permette condizioni, adesioni economiche e test della disponibilità a pagare | Schede senza prezzi, strumenti di misura costi |
| DA03 | Quali destinatari e compiti per i due schermi? | Determina superficie condivisa, dispositivi e requisiti d'interazione | Recupero al banco su una postazione, isolamento e revoca |
| DA04 | Quali documenti si firmano, da quali parti, con quale efficacia richiesta? | Determina processo, identificazione, provider e conservazione | Bozza/versioni/revisione senza firma |
| DA05 | Jarvis esiste già? Quale destinatario e quali compiti deve svolgere? | Determina integrazione o nuovo modulo, accessi e costo | Contratto delle fonti autorizzate, precompilazione e valutazione AI |
| DA06 | Territorio, volume, team, budget e responsabilità operative? | Consente piano finanziabile e copertura dichiarabile | Protocollo sintetico e metriche senza scadenze commerciali |
| DA07 | Bianco/rosso per intero prodotto, solo banco o partner? Quale tonalità? | Eventuale campione visivo da confrontare, poi scelta esplicita | Conservazione della 0.3 e specifiche funzionali |

Nella sessione sono state poste due domande raggruppate: beneficio iniziale;
Jarvis/destinatari schermi/documenti da firmare. In assenza di risposte,
IF01 e IF04 restano ipotesi e DA01/DA03/DA04/DA05 restano aperte. Nessuna
scelta è desunta dal silenzio. Prezzi e cifre ambigue non sono un ostacolo alla
progettazione delle offerte, ma impediscono di presentarle come listino.

## Confronto circoscritto dello spunto bianco/rosso (EA30)

È un confronto di criteri, non una nuova tavola visiva né un test utente.
Non è necessario decidere la palette per preparare dati, flussi e primo rilascio.

| Dimensione | 0.3 conservata | Ipotesi bianco/rosso da provare |
| --- | --- | --- |
| Identità | C–Legame, bruno/albicocca/avorio, Manrope | Stesso simbolo e tipografia, nessun wordmark nuovo |
| Composizione | Tessera dominante, pagine editoriali aperte | Stessa geometria e gerarchia per isolare l'effetto del colore |
| Ambito | Interfaccia attuale scelta dall'utente | Un solo riepilogo banco o variante partner, solo dopo chiarimento dell'ambito |
| Leggibilità | Token e ruoli semantici già documentati | Misurare contrasto testo/focus; evitare che il rosso di marca sia l'unico segnale di errore |
| Valutazione | Riferimento da mantenere | Stessi contenuti: importo, stato, revoca e documento; desktop/mobile, zoom e movimento ridotto |
| Esito necessario | Nessuna modifica richiesta ora | Scelta esplicita prima di sostituire token o applicare un redesign |

Non viene scelta una tonalità per deduzione dalla registrazione. La stampa
fisica di una card rossa (EA06) e il doppio marchio partner (EA17) non implicano
un cambio della palette dell'app.

## Riscontri nel codice e nello studio

- [App.tsx](../../../src/App.tsx): `roleHouses` fissa la casa dell'inquilino;
  stato condiviso e persistito nel browser. Non è un account multi-contesto reale.
- [pages.tsx](../../../src/pages.tsx): `UtilitiesPage` ammette solo inquilino;
  `DocumentsPage` cerca in fixture; `AccessPage` simula l'invito.
- [data.ts](../../../src/data.ts): `payments: Record<string, Payment>` per immobile,
  `cardId` globale, `Ticket.events` testuali; nessun periodo contabile o audit server.
- [panels.tsx](../../../src/panels.tsx): `PaymentPanel` conserva già i quattro
  significati; `DocumentPanel` applica filtri demo. Non sostituire queste
  distinzioni con un booleano “pagato” o “documento valido”.
- [ui.tsx](../../../src/components/ui.tsx): `FileInput` trasmette il nome del file,
  non i contenuti a un archivio privato.
- Studio v0.1 §§3, 6, 8, 11–13: offerte, ciclo documentale, revoca, dati e pilota
  erano proposte. I tempi/costi e la roadmap di quello studio non sono un
  preventivo aggiornato per R1 e non vengono riproposti come impegni.
