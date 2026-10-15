# EECard — sviluppo e manutenzione

Aggiornato il 14 ottobre 2026. Repository di riferimento: https://github.com/av3rgfx/EECard. Stack del prototipo: React, TypeScript e Vite; le versioni riproducibili sono in `package-lock.json`.

## Ripresa e avvio

Leggere [AGENTS.md](AGENTS.md), [PROSSIMA_SESSIONE.md](docs/progetto/PROSSIMA_SESSIONE.md)
e il [prompt di ripresa](docs/progetto/PROMPT_NUOVA_SESSIONE.md). La PR #8 è
integrata il 14 ottobre alle 06:49:01 UTC, merge `adacdab`. Il piano demo parte
da quel main aggiornato sul branch `docs/piano-demo-funzionale-2026-10-14`.
Verificare la PR della consegna corrente: se aperta riutilizzarla per lo stesso
lavoro; dopo il merge partire da main aggiornato e da un nuovo branch.
Controllare prima le modifiche locali e non sovrascriverle.

Node.js 22.12+ o 24 LTS:

```bash
npm ci
npm run dev
```

Server locale: `http://localhost:5173`. Non servono variabili segrete o servizi esterni per eseguire il prototipo. I processi e i file in `/tmp` di una sessione non sono prerequisiti della successiva.

## Mappa del codice

| File / cartella | Responsabilità |
| --- | --- |
| `src/App.tsx` | Shell, navigazione hash, ruolo e immobile selezionati, persistenza demo |
| `src/pages.tsx` | Schermate e viste per ruolo |
| `src/panels.tsx` | Percorsi nei dialoghi: documenti, incassi, assistenza, card e altro |
| `src/data.ts` | Tipi, fixture, stato iniziale e scenari limite |
| `src/context.tsx` | Contesto e contratti condivisi del frontend |
| `src/components/ui.tsx` | Primitive e componenti adattati da Animate UI / Rare UI |
| `src/components/brand.tsx` | Simbolo C Legame senza wordmark; geometria condivisa in `brand-geometry.json` |
| `src/tokens.css`, `src/styles.css`, `src/editorial.css` | Token, base responsive e composizione approvata0.3 |
| `src/components/payment-progress.tsx` / `.css` | Indicatore derivato dagli stati Payment esistenti, quattro passaggi, movimento locale |
| `src/assets.ts`, `public/` | Risoluzione asset, fotografie, favicon e PDF demo |
| `tests/prototype.spec.ts` | Percorsi end-to-end e verifiche di accessibilità/layout |
| `scripts/` | Anteprima autonoma, sito condivisibile, audit e screenshot |
| `preview/` | Pagine di presentazione desktop/mobile e selettore |
| `.openai/hosting.json` | Identità Sites e directory statica da pubblicare |

## Stato e navigazione

Dodici rotte hash: `home`, `immobili`, `documenti`, `affitto`, `utenze`, `assistenza`, `consulenze`, `card`, `profilo`, `agenzia`, `accesso`, `design-system`. Esempio: `/#/documenti`.

Chiave localStorage: `eecard-demo-v1`, schema versione 1. I ruoli nello stesso browser condividono lo stato della demo; il selettore ruolo non autentica persone. Per ripristinare usare Profilo → Ripristina tutta la demo. Una futura modifica allo schema deve gestire dati locali precedenti senza rompere l’avvio.

Scenari in Profilo → Laboratorio, oppure `?data=worst#/home`; valori: `demo`, `worst`, `empty`, `one`, `many`, `loading`, `error`, `revoked`, `ended`. Non introdurre documenti o persone reali in questi dati.

## Verifiche appropriate

```bash
npm run build
npx playwright install chromium
npm test -- --workers=4
npm run format:check
```

Playwright avvia o riutilizza il server sulla porta 5173. Audit e screenshot richiedono il server avviato:

```bash
node scripts/audit.mjs
node scripts/screenshots.mjs
```

Per sole modifiche documentali controllare coerenza, collegamenti locali e `git diff --check`; non attribuire a questa attività una nuova esecuzione dei test UI. Per cambiamenti al frontend eseguire i controlli pertinenti e aggiornare [VERIFICHE.md](docs/design/VERIFICHE.md) con risultati realmente osservati. Conservare il report precedente come evidenza datata, non come garanzia permanente.

## Artefatti e pubblicazione

```bash
npm run preview:portable
npm run preview:shareable
```

Il primo rigenera `docs/design/anteprima.html`; il secondo rigenera anche `.output/public/` con `/desktop/`, `/mobile/`, `/app/` e selettore. `dist/`, `.output/`, `node_modules/` e report temporanei non vanno committati. Anteprima autonoma, screenshot e report documentati sono invece artefatti di consegna versionati.

Seguire [ANTEPRIME_WEB.md](docs/design/ANTEPRIME_WEB.md) e la skill Sites hosting per pubblicare un aggiornamento del sito esistente. Riutilizzare il project ID nel manifest; non creare un sito sostitutivo. Salvare/deployare il commit esatto e confermare il successo prima di dichiarare online l’aggiornamento. Le credenziali temporanee di pubblicazione non vanno salvate nel repository. Il push GitHub non pubblica automaticamente il sito.

Dal 15 ottobre 2026 aggiornare Sites a ogni sessione che modifica il prototipo,
come richiesto dall'utente per seguirlo a distanza; non attendere un nuovo consenso.
Conservare sito e pubblico. In una sessione solo documentale verificare e annotare
l'allineamento senza ripubblicare asset identici. Eventuali blocchi vanno esplicitati.

Una modifica esclusivamente alla documentazione non cambia la demo online: registrare il commit effettivamente pubblicato separatamente dal nuovo HEAD della repository.

## Limiti e futura implementazione

Nessun backend, database, autenticazione reale, upload server, email o integrazione bancaria. Il file selezionato conserva soltanto il nome; gli accessi sono controlli di presentazione. Prima di portare una funzione in produzione occorre definire contratti API, permessi per relazione/immobile, transizioni di stato, tracciamento degli eventi e gestione dei dati con le regole approvate. Non fissare in questa consegna provider, architettura o scadenze.

Il bundle unico genera un avviso Vite di circa 527 KB: è funzionale all’anteprima autonoma. Valutare il caricamento per area nel contesto dell’architettura futura. Nessuna CI di test o deploy automatico è stata configurata.

## Chiusura di ogni sessione

Aggiornare punto di ripresa, backlog e registro sessioni; modificare prodotto/design/decisioni se cambia il loro contenuto. Annotare verifiche eseguite e limiti, commit remoto e versione online quando pertinente. Salvare le modifiche sul branch corretto e creare o aggiornare una sola PR per lo stesso lavoro. Non integrare in `main` senza una richiesta che includa il merge.

## Evoluzione dell’identità — prima tappa (storico)

Branch `design/visual-identity-evolution`, da main dopo merge PR #2. Studi SVG e tavola in `docs/design/identita/`, copiati in `/identita/` dal generatore delle anteprime. Il confronto iniziale è ora archivio; simbolo C e favicon attuali sono descritti nella sezione identità 0.2 sotto.

Il salto al contenuto deve mettere a fuoco `main` senza alterare l’hash usato dal router. La ricerca ripristina il focus quando si cancella il testo; Base UI rende inerti i controlli sottostanti al dialogo. Due test di regressione coprono questi comportamenti e il menu mobile. Vite esegue la scansione delle dipendenze solo da `index.html`, escludendo l’HTML autonomo generato che produceva un errore di risoluzione all’avvio.

## Identità 0.2 — simbolo scelto e sorgente unica

`src/brand-geometry.json` contiene master regolare/piccolo; `BrandSymbol` rende la geometria inline senza dipendere da asset remoti. `src/tokens.css` espone ruoli `brand-ink`, `brand-accent`, `brand-soft`, `action`, `focus`, `surface-soft`, `success`: rimossi forest/lime/sage. Il nome resta aperto e il componente Brand non contiene un wordmark.

`node scripts/build-brand-assets.mjs` genera 8 SVG, favicon SVG/PNG, guida e ZIP in `public/brand/`; richiede Chromium Playwright e Python 3 per impacchettare lo ZIP. I vettori non contengono font. `docs/design/MARCHIO.md` è la guida sorgente; `docs/design/marchio/` è la guida web, pubblicata in `/marchio/`. L’archivio `/identita/` resta consultabile come storico.

`npm run preview:shareable` copia guida e asset sul sito; l’HTML portatile incorpora la favicon come data URL. Con server statico sulla porta 5174, `node scripts/verify-brand.mjs` verifica guida, download, quattro combinazioni desktop/mobile e funzionamento offline, aggiornando `verifiche-legame.json` e due screenshot guida. La geometria e gli asset distribuiti devono essere aggiornati insieme.


## Direzione0.3 — Materia e composizione editoriale

`HomePage` pone la tessera prima nel DOM per proprietario/inquilino. `App` esclude home personale e tessera dal menu agenzia; home mostra la coda e CardPage gestisce l’URL diretto. Il guard tecnico resta invariato. Nessuna migrazione del localStorage o modifica delle fixture.

`editorial.css`, importato dopo la base, appiattisce selettori specifici: niente reset globale di section/div o dialoghi. Token colore restano in `tokens.css`. `PaymentProgress` legge Payment senza azioni di salto fase: marker160ms, reduced120ms opacity, tastiera0, cancellazione/retarget WAAPI. Il PaymentPanel porta il focus al titolo della nuova fase quando il form precedente viene sostituito.

`design-lab/` e `docs/design/esplorazioni/` conservano gli esempi richiesti come archivio di progetto; non sono importati dal frontend né pubblicati nel sito operativo. I loro controlli di confronto non diventano permessi del prodotto. Script di rigenerazione dedicati `build-design-lab.mjs` e `capture-design-lab.mjs`.


### Densità contestuale degli immobili in home

`HomePage` applica `home-properties-compact` alla sola lista quando `activeHouses.length > 1`: conta gli immobili effettivamente visibili nel ruolo/filtro corrente. Il componente `PropertyTile` e l’apertura del dettaglio sono condivisi e invariati. `PropertiesPage` non riceve il modificatore e mantiene foto ampie. Nessuna nuova preferenza persistita, animazione o modifica delle fixture. Lo script screenshot include ora anche la rotta `immobili`.

## Preparazione dello sviluppo — specifiche dell'8 ottobre

La [consegna funzionale](docs/progetto/specifiche-2026-10-08/README.md) contiene
il [modello logico](docs/progetto/specifiche-2026-10-08/MODELLO_DATI.md), i
[percorsi PF01–PF06](docs/progetto/specifiche-2026-10-08/PERCORSI.md) e il
[backlog BF con dipendenze](docs/progetto/specifiche-2026-10-08/OFFERTE_RILASCIO.md).
È una proposta implementabile dopo la scelta del perimetro; non introduce schema
fisico, provider o architettura di produzione già approvati.

Differenze necessarie dalle fixture: identità e agenzie separate, relazioni
personali con validità temporale, contratti e periodi, documenti/versioni privati,
intestazioni delle utenze, dichiarazioni/verifiche/quietanze e allocazioni distinte,
credenziali personali revocabili e audit attribuito. L'ID card non concede accesso.
La ricerca, gli indici AI e il secondo schermo seguono le stesse autorizzazioni
server dei documenti. Una sostituzione card non riattiva quella revocata.

Prima attività tecnica proposta dopo la revisione del beneficio: trasformare il
percorso PF01 → PF02 → PF05 in contratti di comando/lettura e prove di accesso
con due agenzie sintetiche, includendo revoca, retry, versioni e fine rapporto.
La prova di servizio descritta nell'offerta può precedere questa implementazione.
Non migrare dati reali dentro localStorage e non considerare il cambio di ruolo
un sistema di autenticazione. Conservare una demo indipendente.

Wallet/pass, contactless, due schermi, firma e AI hanno un registro di fonti e
prove in [FATTIBILITA.md](docs/progetto/specifiche-2026-10-08/FATTIBILITA.md).
La documentazione di piattaforma non dimostra compatibilità hardware o validità
di un processo di firma EECard. Jarvis e i destinatari degli schermi sono aperti.

La prima consegna delle specifiche modificava solo Markdown: controlli documentali in
[VERIFICHE.md](docs/progetto/specifiche-2026-10-08/VERIFICHE.md). Nessun nuovo test
UI, migrazione, backend o deploy; studio v0.1 e sorgenti del prototipo invariati.


## Kit locale della prova in agenzia

[BF02](docs/progetto/prova-agenzia-2026-10-08/README.md) usa due set JSON isolati
dalle fixture dell'app, pacchetti Markdown e modelli CSV. Lo strumento
`scripts/prova-agenzia.py` usa solo Python standard; non invia dati o chiama
servizi. `validate` controlla coerenza e riferimenti; `prepare --output DIR`
genera copie per la prova; `analyze --measurements FILE` riepiloga misure
osservate senza trasformare dati mancanti in zero. I test mirati si eseguono con
`python3 scripts/test-prova-agenzia.py`.

Le evidenze di autorizzazione nei casi sono materiale per una simulazione umana,
non policy applicate da un server. I risultati del kit non sostituiscono PT-AC01,
MD-AC01 o gli altri criteri di sicurezza. Frontend, localStorage e pubblicazione
Sites non cambiano. Osservazioni e costi effettivi si raccolgono fuori repository;
qui restano modelli non eseguiti e dati sintetici. Rapporto della nuova attività:
[ESITO_SIMULAZIONE.md](docs/progetto/prova-agenzia-2026-10-08/ESITO_SIMULAZIONE.md).

## Approfondimento preliminare BF03 — ripresa BF16

I [contratti preliminari](docs/progetto/validazione-bf16-2026-10-09/CONTRATTI_PRELIMINARI.md)
traducono PF01/PF02/PF05 in precondizioni, letture/comandi, casi ammessi/negati
e prove future su due agenzie sintetiche. Sono un allegato revisionabile alle
specifiche: BF03 resta aperto, dipendente da BF01 per l'ambito operativo e
da riesaminare con le osservazioni BF16. Nessuna API o autorizzazione server
è implementata; provider, conservazione e modalità di verifica restano da scegliere.

La [guida alla raccolta](docs/progetto/validazione-bf16-2026-10-09/RACCOLTA.md)
usa copie dei materiali già pronti, distingue le analisi automatiche da quelle
manuali e conserva i denominatori nelle prove parziali. Il kit BF02, i suoi
modelli e strumenti restano invariati. Controlli nuovi e storici sono distinti
nel [rapporto della ripresa](docs/progetto/validazione-bf16-2026-10-09/README.md).

L'[allegato storico/uscita](docs/progetto/validazione-bf16-2026-10-09/STORICO_USCITA.md)
specifica come revisionare conservazione, titoli di lettura e consegna per
categoria/evento. Include revoca, correzione, copie consegnate e ripristino
come verifiche future. Nessun termine legale, ruolo privacy o provider è
scelto; la fine di un titolo non revoca titoli autonomi ancora efficaci.
Le copie esterne predisposte per la raccolta sono byte-identiche al kit;
cartelle per ruolo/fase e manifest servono alla distribuzione e alla provenienza,
non sono autorizzazioni server. Non dipendere dal percorso temporaneo della sessione.

## Prossima implementazione — demo funzionale 0.4

La decisione del 14 ottobre anticipa una demo completa alle interviste di
chiarimento. Il [piano tecnico-funzionale](docs/progetto/demo-funzionale-2026-10-14/README.md)
e il [prompt `/goal`](docs/progetto/PROMPT_DEMO_FUNZIONALE.md) sono il punto di
partenza dell'implementazione. La priorità è una storia continua PF01 → PF02 →
PF05, con due agenzie sintetiche, relazioni temporali, documenti/versioni,
provenienze, credenziali revocabili, sessioni al banco e controlli di accesso
centralizzati. PF03/PF04/PF06 devono restare estensioni locali esplicitamente
simulate.

L'evoluzione del localStorage richiede una nuova versione di schema e un reset o
una migrazione espliciti. La modalità prova deve offrire scenari deterministici,
reset e note esportate solo in locale. Non aggiungere dipendenze da backend,
email, pagamenti, lettori, wallet, firme o modelli AI. I controlli di permesso
non possono dipendere soltanto dalla visibilità dei componenti: coprire casi
ammessi e negati con test. BF02 resta invariato e BF16 non è chiuso dal solo
completamento del frontend.

## Demo 0.4 disponibile

Tredicesima rotta `/#/prova`: `src/demo/model.ts` contiene fixture, policy,
comandi, ricerca/versioni e schema; `src/demo/DemoPage.tsx` presenta i compiti;
`src/demo/demo.css` adatta la composizione esistente.

Chiave `eecard-functional-v4`, schema 4: validazione/reset espliciti; schema
0.3 non importato e mantenuto per la demo precedente. Visite e condivisioni
non sono persistite. Il registro usa date/sequenze sintetiche, non misure umane.
Le regole sono applicate da letture e comandi del modello; non sono ACL server.

`tests/demo-model.spec.ts` verifica permessi e transizioni senza UI;
`tests/demo-ui.spec.ts` verifica percorso, reset, tastiera, persistenza e layout.
Con server avviato, `node scripts/verify-demo.mjs` genera audit e screenshot 0.4.
Per una build statica impostare `EECARD_DEMO_URL` al suo `app/#/prova`.
[Dettagli e limiti](docs/progetto/demo-funzionale-2026-10-14/IMPLEMENTAZIONE.md),
[verifiche osservate](docs/progetto/demo-funzionale-2026-10-14/VERIFICHE.md).

## Interfaccia operativa 0.5

`src/workspace/Experience.tsx` e `workspace.css` presentano il prodotto.
`src/workspace/service.ts` centralizza richieste, registro economico e fixture
card proprietario, con titoli locali e persistenza `eecard-workspace-v1`.
Le letture/esportazioni della libreria e del profilo personale usano i comandi
centralizzati del modello 0.4 (`file`); la condivisione al banco conserva le
precondizioni di visita/persona/scopo. Il blocco personale della card non
termina il rapporto. Nessun server, servizio o integrazione reale aggiunto.

Ingresso `/#/spazio/overview`, con pagine hash per pratiche, pratica, banco,
documenti, persone, immobili, utenze, affitto, assistenza e bozze. `/#/prova`
è compatibile con i link precedenti e apre il nuovo spazio; il laboratorio
tecnico 0.4 è ora `/#/laboratorio`. Le rotte 0.3 sono conservate.

La root Sites serve direttamente l'app; il selettore anteprime è `/anteprime/`,
con `/desktop/`, `/mobile/`, `/app/` conservati. L'HTML autonomo incorpora il
medesimo codice. `workspace-qa.mjs` e `workspace-static-qa.mjs` verificano le
nuove viste; i rapporti storici non sono attribuiti alla 0.5.
[Dettagli](docs/progetto/experience-2026-10-14/README.md).

## Incremento locale rinnovo — 15 ottobre

`readSubscription` in `src/workspace/service.ts` autorizza il titolare sintetico
Cliente 01 per agenzia/account/sessione/servizio; il rinnovo non dipende dalla
locazione o dalla card. `cancelRenewal` è idempotente e cambia soltanto il nuovo
booleano `renewalCancelled` e l'evento locale. Il periodo è una fixture autonoma,
non ricavata dalla locazione. Nessun motore di rinnovo, addebito o cessazione
programmata: la demo usa ancora `DAY` fisso al 14 ottobre 2026.

Il workspace v1 accetta salvataggi precedenti senza il campo nuovo (default
false), mentre un tipo incompatibile produce reset con avviso. La UI salva
prima di confermare il successo; memoria indisponibile lascia la scelta
invariata e permette retry. Reset scenario ripristina il rinnovo.
`tests/subscription.spec.ts` copre modello, persistenza, dinieghi, recupero,
focus, layout/axe e testo ingrandito. Nessuna dipendenza runtime aggiunta.

[Studio e piano](docs/progetto/discussione-2026-10-15/README.md),
[verifiche osservate](docs/progetto/discussione-2026-10-15/VERIFICHE.md).
Le trascrizioni e gli strumenti ASR sono esterni alla repository; non sono
prerequisiti per eseguire l'app. Nessun deploy: online rimane la 0.5 già registrata.

## IN03 — bollette strutturate e acquisizione guidata

`src/workspace/bills.ts`: fixture originali/proposte, policy di lettura/acquisizione,
validazione, identità del dovuto, idempotenza e revisioni immutabili attribuite.
`BillsPanel.tsx`: percorso in tre passi, dettaglio/storico, errori, annullo e
invalidazione della bozza al cambio contesto/sessione/servizio. `service.ts`
aggiunge `bills` compatibile al workspace v1; schema 4 e grants restano invariati.
La conferma in Experience persiste prima di aggiornare lo stato o annunciare
successo. Non è un sistema di concorrenza multiutente o di autorizzazioni server.

`tests/bills.spec.ts` copre PB01–PB03 su sintetici, persistenza, permessi,
recuperi e UX; `scripts/verify-bills-portable.mjs` prova l'HTML autonomo dopo
`npm run preview:portable`, senza server o richieste HTTP. I documenti nuovi
restano nell'archivio Utenze, distinto dalla ricerca/export dello schema 4;
i dettagli dei facsimili iniziali rimandano alle versioni correnti nelle Utenze.
[Implementazione/copione](docs/progetto/importazione-bollette-2026-10-15/README.md)
e [verifiche](docs/progetto/importazione-bollette-2026-10-15/VERIFICHE.md).
