# EECard — sviluppo e manutenzione

Aggiornato il 6 ottobre 2026. Repository di riferimento: https://github.com/av3rgfx/EECard. Stack del prototipo: React, TypeScript e Vite; le versioni riproducibili sono in `package-lock.json`.

## Ripresa e avvio

Leggere [AGENTS.md](AGENTS.md) e [PROSSIMA_SESSIONE.md](docs/progetto/PROSSIMA_SESSIONE.md). Verificare lo stato remoto della PR #2: se aperta, riprendere `design/eecard-premium-prototype`; se integrata, aggiornare `main` e creare un branch dedicato al nuovo obiettivo. Controllare prima le modifiche locali e non sovrascriverle.

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
| `src/components/brand.tsx` | Marchio e monogramma EECard |
| `src/tokens.css`, `src/styles.css` | Token e layout responsive |
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

## Evoluzione dell’identità — prima tappa

Branch `design/visual-identity-evolution`, da main dopo merge PR #2. Studi SVG e tavola in `docs/design/identita/`, copiati in `/identita/` dal generatore delle anteprime. `LOGO_DIREZIONI.md` distingue studio e asset finali: la favicon attuale resta valida finché non viene scelto il simbolo.

Il salto al contenuto deve mettere a fuoco `main` senza alterare l’hash usato dal router. La ricerca ripristina il focus quando si cancella il testo; Base UI rende inerti i controlli sottostanti al dialogo. Due test di regressione coprono questi comportamenti e il menu mobile. Vite esegue la scansione delle dipendenze solo da `index.html`, escludendo l’HTML autonomo generato che produceva un errore di risoluzione all’avvio.
