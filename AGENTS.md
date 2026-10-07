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

## Identità del prodotto (richiesta del 6 ottobre 2026)

EECard è provvisorio. ƎE è il marchio dell’agenzia Enrico Erca, non il marchio definitivo del prodotto. Nessun naming esplorato o presente nelle immagini di riferimento è approvato. L’utente ha scelto C — Legame il 6 ottobre 2026; il simbolo è ora finalizzato e integrato. Leggere `docs/design/MARCHIO.md` e il design system 0.3. Il nome resta da confermare: non realizzare un wordmark finché non arriva una scelta esplicita. “Legame” è il titolo del concept, non il nome del prodotto.

## Direzione visiva approvata — 6 ottobre 2026

Il confronto richiesto è stato realizzato in `design-lab/`, con tre direzioni, home desktop/mobile, dettaglio tessera, processo affitto, demo animata, stato critico e movimento ridotto. L’utente ha poi scelto esplicitamente **tessera e materiali di Materia e luce + struttura delle pagine di Editoriale e architettura**, chiedendo contenuti a tutta larghezza e niente contenitori a scheda ripetuti. La conferma autorizza l’integrazione: non chiedere nuovamente di scegliere fra le tre proposte.

Precisazione successiva: le card non sono vietate in assoluto per oggetti consultabili, mentre azioni, form e passaggi operativi restano aperti, senza contenitori annidati. **La scelta finale mantiene lo stile editoriale attuale, senza ripristinare card immobili.** Compattare soltanto gli immobili nella home quando quelli visibili nel contesto corrente sono più di uno (`activeHouses.length > 1`); con un solo immobile visibile, anche dopo filtro o nel ruolo inquilino, conservare la presentazione espansa. La pagina raggiunta da “Vedi immobili” rimane sempre espansa. Non usare il totale degli immobili del profilo per decidere la densità della home.

La tessera è il primo contenuto dominante della home di proprietario e inquilino, con stato e gestione vicini. L’agenzia mantiene la coda operativa, il tecnico i soli incarichi: non attribuire loro una tessera personale. Le pagine usano composizione, tipografia, fotografie e separatori; volume e materiali caratterizzano soprattutto tessera e dialoghi. Movimento breve per chiarire i cambi di fase, senza ritardare importi, contenuti o azioni.

L’esecuzione 0.3 è in `src/editorial.css`, applicata dopo gli stili esistenti; i token di base e movimento restano in `src/tokens.css`. Il percorso visuale dell’affitto è una vista degli stati esistenti, senza scorciatoie per saltare verifiche. Preservare permessi, residui, quietanza separata, blocco e sostituzione, recupero dagli errori, licenze e dati demo. Consultare `DESIGN.md`, `docs/design/DESIGN_SYSTEM.md` e `docs/design/DECISIONI.md` per lo stato corrente; `REVISIONE_VISIVA.md` e il prompt precedente documentano l’origine del confronto. Simbolo e naming non sono riaperti dalla scelta visiva.

L’utente ha autorizzato verifica, aggiornamento delle anteprime sul medesimo sito Sites, salvataggio remoto e preparazione della PR senza merge. Lo stato effettivo di verifiche e pubblicazione va letto nei relativi rapporti e nel punto di ripresa, senza dedurlo dalla sola implementazione.
