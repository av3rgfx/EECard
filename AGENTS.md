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

La conversazione del 7 ottobre è analizzata in
`docs/progetto/discussione-2026-10-07/ANALISI_CONVERSAZIONE.md` (30 punti EA01-EA30),
con contesto verificato e prompt. Leggere questi file per proseguire il nuovo
studio. Sono input e proposte, non approvazioni automatiche del primo rilascio.
La PR #4 risulta integrata: verificata l'8 ottobre; i checkpoint che la descrivono
aperta sono storici. Dopo il merge ripartire dal main aggiornato.

La PR #5 è integrata l'8 ottobre alle 19:32:22 UTC. La ripresa funzionale è in
`docs/progetto/specifiche-2026-10-08/`: leggere README, requisiti/decisioni,
offerte/rilascio, percorsi, modello dati, fattibilità e verifiche per proseguire.
Le specifiche sono revisionabili: R1 e le alternative non sono ancora un
perimetro commerciale approvato. Il branch corrente va sempre verificato sul
remoto secondo la regola di continuità sotto.

Il passo successivo autorizzato è preparato in
`docs/progetto/prova-agenzia-2026-10-08/`: protocollo, set sintetici, materiali
e rapporto della revisione simulata. Gli strumenti Python locali generano
modelli vuoti: non sostituire le misure umane con esiti AI. BF16 resta aperto.

La PR #6 (specifiche e kit) è integrata il 9 ottobre 2026 alle 08:18:43 UTC;
la PR #7 (chiusura e prompt) alle 23:19:16 UTC. La ripresa BF16 parte da main
`c77dfd482e683baeeb0ec825ac5d5755c56fa1bb` sul nuovo branch
`docs/bf16-raccolta-2026-10-09`. Non riutilizzare il branch della PR #7 integrata.
Leggere `docs/progetto/validazione-bf16-2026-10-09/README.md`: raccolta sul kit
esistente e approfondimento preliminare BF03, senza misure umane disponibili
nei materiali consultati né approvazione operativa. Il prompt corrente è
`docs/progetto/PROMPT_NUOVA_SESSIONE.md`; stato della consegna e attività
residue sono in PROSSIMA_SESSIONE. Verificare sempre il remoto prima del checkout.

La PR #8 è integrata il 14 ottobre 2026 alle 06:49:01 UTC, merge `adacdab`.
La richiesta successiva cambia l'ordine della validazione: realizzare prima una
demo funzionale 0.4, poi usarla con gli operatori per far emergere lacune e
priorità. Piano e perimetro sono in
`docs/progetto/demo-funzionale-2026-10-14/README.md`; il prompt di
implementazione parte con `/goal` in
`docs/progetto/PROMPT_DEMO_FUNZIONALE.md`. BF02 non va rifatto e BF16 resta
aperto finché non esistono osservazioni umane. Questa decisione non approva
servizi reali, prezzi, lancio, hardware o architettura di produzione.
La PR #9 del piano è integrata il 14 ottobre 2026 alle 10:33:11 UTC, merge
`46c7315`. Il prompt `/goal` deve rimanere entro 4.000 caratteri complessivi:
conservare i dettagli nel piano e nelle specifiche collegate, senza duplicarli
nel testo da incollare. Verificare sempre la consegna corrente sul remoto prima
di scegliere il branch dell'implementazione.
La riduzione del prompt è consegnata nella PR #10 sul branch
`docs/prompt-goal-4000-2026-10-14`; se aperta, riutilizzarla solo per questa
consegna documentale. Dopo il merge partire dal main aggiornato per la demo.

Non pubblicare l'audio, la trascrizione integrale o i dati personali degli esempi
nella repository pubblica. I documenti del nuovo studio usano sintesi anonime.
Il riferimento ai clienti già gestiti a 600 euro annui non è un listino EECard;
le cifre della card restano instabili. Jarvis e lo spunto bianco/rosso sono da
chiarire: non cambiano automaticamente naming e identità 0.3 già scelti.

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

## Demo funzionale 0.4 — consegna del 14 ottobre

Il nuovo ingresso è `/#/prova`, con modello e policy locali in `src/demo/`.
Leggere implementazione, copione e rapporto in `docs/progetto/demo-funzionale-2026-10-14/`.
Schema 4 distinto dal prototipo 0.3; visite al banco non persistite. BF02 non
rigenerato, BF16 ancora aperto. Per branch/PR e commit online usare il punto di
ripresa aggiornato; non riavviare il piano già implementato o attivare servizi reali.

## Esperienza 0.5 — revisione dopo il feedback

Il punto d'ingresso pubblico è ora lo spazio applicativo `/#/spazio/overview`.
`/#/prova` apre la medesima esperienza; il precedente pannello tecnico 0.4 è
conservato a `/#/laboratorio`. Leggere `docs/progetto/experience-2026-10-14/` e
la continuità per stato remoto e pubblicazione. Conservare la distinzione tra
spazio agenzia e personale, i dettagli progressivi e i controlli tecnici separati
dal lavoro quotidiano. I vincoli su dati sintetici, servizi reali e merge restano.

## Prossima sessione — audio e appunto

La richiesta di chiusura del 14 ottobre prepara due nuovi audio e un appunto,
non ancora allegati. Priorità corrente: trascrizione privata, analisi anonima,
studio progettuale, piano incrementale e primo intervento locale chiaro. Leggere
`docs/progetto/PIANO_ANALISI_AUDIO.md` e usare il prompt corrente
`docs/progetto/PROMPT_NUOVA_SESSIONE.md`, entro 4.000 caratteri. Non rieseguire
il vecchio prompt di implementazione 0.4. BF16 resta aperto; nessuna fonte grezza
o trascrizione integrale nella repository pubblica.

## Studio audio e rinnovo locale — 15 ottobre 2026

Le fonti preparate nella sezione precedente sono ora state elaborate. Leggere
`docs/progetto/discussione-2026-10-15/` e il punto di ripresa aggiornato.
NA01–NA16 sono proposte/candidati con provenienza; annual report cliente e agenzia
con viste separate è conferma esplicita dell'utente. Preavviso, pro rata,
listino, chiamate AI e condizioni operative restano aperti.
IN01 è la gestione locale del rinnovo per Cliente 01: non rifarla né trasformarla
in cessazione di rapporto/card. Trascrizioni e fonti restano private. Nessun
servizio reale, nessun merge, BF02 invariato, BF16 aperto. Controllare il remoto
prima del prossimo branch; il prompt corrente resta entro 4.000 caratteri.

## Importazione bollette IN03 — 15 ottobre 2026

IN03 è implementato nella demo locale: leggere
`docs/progetto/importazione-bollette-2026-10-15/README.md` e VERIFICHE.md.
Utenze → Aggiungi bolletta: originali HTML sintetici, dati confrontabili,
conferma, duplicati/rettifiche e titoli dedicati. Le nuove versioni stanno nel
workspace v1, schema 4 invariato; ricerca/export globale non estesi. Non rifare
IN03 o IN01. Il seguito consigliato è IN04, poi IN05; prevale la nuova richiesta.
Per PR/branch e commit online leggere PROSSIMA_SESSIONE e verificare il remoto.
Nessun servizio reale, deploy implicito o merge. BF02 intatto, BF16 aperto.
