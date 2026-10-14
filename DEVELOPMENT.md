# EECard — sviluppo e manutenzione

Aggiornato il 9 ottobre 2026. Repository di riferimento: https://github.com/av3rgfx/EECard. Stack del prototipo: React, TypeScript e Vite; le versioni riproducibili sono in `package-lock.json`.

## Ripresa e avvio

Leggere [AGENTS.md](AGENTS.md), [PROSSIMA_SESSIONE.md](docs/progetto/PROSSIMA_SESSIONE.md)
e il [prompt di ripresa](docs/progetto/PROMPT_NUOVA_SESSIONE.md). La PR #6 con
specifiche e kit è integrata il 9 ottobre alle 08:18:43 UTC; la PR #7 di chiusura
alle 23:19:16 UTC. La ripresa BF16 parte da main
`c77dfd482e683baeeb0ec825ac5d5755c56fa1bb` sul nuovo branch
`docs/bf16-raccolta-2026-10-09`. Verificare la PR della consegna corrente:
se aperta riutilizzarla; dopo merge partire da main aggiornato e nuovo branch.
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
