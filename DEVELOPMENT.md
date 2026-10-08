# EECard — sviluppo e manutenzione

Aggiornato l'8 ottobre 2026. Repository di riferimento: https://github.com/av3rgfx/EECard. Stack del prototipo: React, TypeScript e Vite; le versioni riproducibili sono in `package-lock.json`.

## Ripresa e avvio

Leggere [AGENTS.md](AGENTS.md) e [PROSSIMA_SESSIONE.md](docs/progetto/PROSSIMA_SESSIONE.md). PR #4 integrata il 7 ottobre alle 22:13:57 UTC, main `4b77c0bd41d733c7a7680ad3d63d9a496424db64`. L'analisi della nuova conversazione parte da quella base sul branch documentale `docs/discussione-2026-10-07`. Verificare la PR del branch corrente: se aperta riutilizzarla; dopo merge partire da main aggiornato e nuovo branch. Controllare prima le modifiche locali e non sovrascriverle.

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

## Nuovo studio funzionale - 8 ottobre

[EA01-EA30](docs/progetto/discussione-2026-10-07/ANALISI_CONVERSAZIONE.md) sono input
per la progettazione, non modifiche al codice. La mappa logica proposta nel
rapporto considera persone/agenzie, relazioni temporali, adesioni e credenziali,
file/versioni, contratti e bozze, dispositivi, lavori e assistente.

Il ruolo selezionato e il record di pagamento per immobile della demo non
modellano account verificati o tutti i periodi della locazione. Il solo nome
del file non è un archivio. Lettore, wallet, firma e AI sono assenti: prima di
renderli operativi vanno definiti risultati, permessi, dipendenze e criteri.
Le verifiche ufficiali mirate sui wallet non equivalgono a una prova hardware.
Non è stato scelto un backend, un provider o uno standard NFC.

La consegna è documentale: verificare collegamenti, coerenza, integrità dei file
e diff. Frontend, dati, asset e sito restano invariati; non attribuire nuovi test
UI o un deploy a questo aggiornamento.
