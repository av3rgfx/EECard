# Passaggio alla sessione di design EECard

Aggiornato il 6 ottobre 2026.

## Richiesta dell'utente

Nella prossima sessione iniziare il design della piattaforma per desktop e mobile.
Usare sempre la repository https://github.com/av3rgfx/EECard.

La direzione richiesta è molto premium, con Revolut come riferimento di qualità.
Usare Animate UI, Rare UI, il riferimento `transition.dev` da verificare e le skill
pertinenti di Emil Kowalski, dando priorità a `apple-design` e `mobile-native`.
Il prompt completo è in [PROMPT_DESIGN.md](PROMPT_DESIGN.md); fonti, selezione e
modalità d'uso sono in [RISORSE_DESIGN.md](RISORSE_DESIGN.md).

## Lavoro già completato

Lo studio v0.1, di 21 pagine, comprende:

- analisi del PDF e trascrizioni automatiche dell'intera registrazione di 24:18,
  con verifiche aggiuntive, timestamp orientativi e passaggi incerti segnalati;
- proposta di valore, confronto tra modelli commerciali e ricerca sui concorrenti;
- catalogo dei servizi, priorità proposte e alternative per la prima versione;
- percorsi di proprietari, inquilini, agenzia e tecnici, con errori ed eccezioni;
- card fisica e digitale, pagamenti, canali e predisposizione dei futuri totem;
- scenari economici esplicitamente ipotetici e organizzazione operativa;
- schermate, moduli, entità, relazioni, permessi e requisiti di sicurezza;
- pilota, roadmap, criticità e criteri di accettazione.

File: `EECard-studio-v0.1.pdf` e `EECard-studio-v0.1.docx` in questa cartella.
Questi documenti sono copie dello studio consegnato nella conversazione.
Audio originale e trascrizioni grezze non sono copiati nella repository.

## Cosa non è ancora definitivo

La progettazione è preliminare: le raccomandazioni non sono state approvate come
specifica vincolante. Non sono ancora stati realizzati design visuale, wireframe,
prototipo navigabile o codice del prodotto EECard in questa attività.

Cinque temi restano aperti, in attesa delle risposte dei fondatori:

1. Periodicità, unità, IVA e inclusioni delle quote. Il PDF indica 50 € e 15 €;
   alcuni passaggi audio sono incerti e non risolvono il listino.
2. Zona dell'agenzia e portafoglio realmente coinvolgibile nel pilota.
3. Primo cliente pagante: clienti dell'agenzia, altre agenzie o entrambi.
4. Beneficio indispensabile per vendere il primo rilascio.
5. Budget, persone, tempo e copertura dell'assistenza fuori orario.

La proposta di servizio dell'agenzia prima dell'espansione SaaS e la preferenza
iniziale per una PWA sono raccomandazioni, non decisioni confermate.

## Obiettivo proposto per il lavoro di design

1. Riprendere lo studio, incorporare eventuali risposte e rendere visibili le
   ipotesi ancora aperte senza rifare l'intera analisi.
2. Definire architettura dell'informazione e navigazione desktop/mobile per
   proprietario, inquilino e pannello agenzia; accesso tecnico limitato agli incarichi.
3. Disegnare i percorsi principali e i wireframe responsive.
4. Definire linguaggio visivo e componenti riutilizzabili, poi schermate dettagliate
   e prototipo navigabile secondo il perimetro richiesto dall'utente.
5. Includere stati vuoti, caricamento, errore, dati mancanti, verifica e revoca;
   verificare accessibilità, comprensione e adattamento ai diversi dispositivi.

Schermate di partenza: accesso/attivazione, home e card, immobili e contratti,
documenti, affitto e prove di pagamento, utenze, assistenza, consulenze,
abbonamento/profilo, coda operativa dell'agenzia.

Distinzione essenziale da mantenere nell'interfaccia: documento caricato,
pagamento dichiarato, incasso verificato e quietanza rilasciata sono eventi diversi.
La card identifica l'accesso ai servizi e non è automaticamente uno strumento
di pagamento. Desktop e mobile non implicano già la scelta di app native negli store.

## Stato del passaggio di consegne

Il branch di consegna è `docs/eecard-design-handoff`, con destinazione `main`.
Se la PR non è ancora integrata, recuperare questo branch e leggere qui i documenti
prima di creare il branch dedicato al design. Se è già integrata, partire da `main`
aggiornato. Non assumere che il contesto della chat precedente sia disponibile.

Questa consegna aggiunge lo studio, le istruzioni, le risorse e il prompt di avvio;
non installa componenti o skill e non avvia l'implementazione del prodotto.
Il branch remoto preesistente `feat/ufp-local-foundation` riguarda altro lavoro:
non è stato modificato.
