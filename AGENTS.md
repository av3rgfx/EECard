# EECard — contesto di lavoro

## Repository di riferimento

L'utente ha chiesto il 6 ottobre 2026 di lavorare sempre in questa repository:
https://github.com/av3rgfx/EECard

Conservare qui gli elaborati e il lavoro del progetto EECard. Rispettare eventuali
istruzioni più recenti dell'utente e non modificare attività estranee al progetto.

## Stato e ripresa

Leggere `docs/progetto/PROSSIMA_SESSIONE.md` prima di riprendere.
Leggere poi `PRODUCT.md`, `DESIGN.md`, `DEVELOPMENT.md` e
`docs/progetto/BACKLOG.md`. Per interventi di design consultare anche
`docs/progetto/PROMPT_DESIGN.md` e `docs/progetto/RISORSE_DESIGN.md`.
Lo studio preliminare completo è in `docs/progetto/EECard-studio-v0.1.pdf`,
con una copia modificabile DOCX. Non è ancora una specifica finale approvata.

Il design desktop/mobile e il prototipo navigabile sono stati realizzati e le
anteprime sono pubblicate. Il prossimo obiettivo va ricavato dalla richiesta
corrente dell’utente e dal punto di ripresa, senza ricominciare il design da zero. Distinguere progetto funzionale, design dell'interfaccia, prototipo e
implementazione del prodotto. Le ipotesi dello studio non sono decisioni confermate.

Non trattare come risolti i prezzi, il segmento iniziale, il perimetro del primo
rilascio, la copertura operativa e il budget. Non dare per concordato il rinvio di
pagamenti, app negli store, 3D o AI. Non ripetere tutta l'analisi senza una ragione:
partire dallo studio e aggiornarlo con le risposte dell'utente.

## Direzione di design richiesta

L'utente richiede un design molto premium, con Revolut come riferimento di qualità,
per desktop e mobile. Mantenere un'identità EECard riconoscibile e la semantica di
servizio immobiliare: la tessera di accesso non diventa una carta bancaria.

Risorse richieste: Animate UI, Rare UI, `transition.dev` e le skill pertinenti di
https://github.com/emilkowalski/skills/tree/main/skills, soprattutto `apple-design`
e `mobile-native`. Consultare `RISORSE_DESIGN.md` per i riferimenti verificati,
la selezione delle skill e l'ambiguità tra `transition.dev` e `transitions.dev`.
Leggere le skill prima di applicarle; non considerarle già installate.

Il codice attuale è un prototipo di design con dati dimostrativi.
Le scelte visive e i percorsi simulati non approvano automaticamente prezzi,
servizi, integrazioni di pagamento o architettura del prodotto in produzione.


## Continuità tra sessioni

Aggiornare a fine sessione `docs/progetto/PROSSIMA_SESSIONE.md`, `BACKLOG.md` e
`SESSIONI.md` nella stessa cartella. Allineare prodotto, design, sviluppo e registro
decisioni quando cambiano i rispettivi contenuti. Distinguere controlli eseguiti,
limiti e attività proposte; non dichiarare ripetuti test rimasti invariati.

Prima di scegliere un branch controllare lo stato remoto della PR del lavoro.
Riutilizzare la PR aperta per la stessa consegna; dopo il merge partire da main
aggiornato e da un nuovo branch dedicato. Non integrare in main senza richiesta.

Le anteprime condivisibili appartengono al sito identificato da
`.openai/hosting.json`: conservarne l’identità e usare Sites per gli aggiornamenti.
Il push GitHub non equivale a pubblicazione; registrare il commit effettivamente
online. Le modifiche solo documentali non richiedono un nuovo deploy.
