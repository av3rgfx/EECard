# IN03 — verifiche e consegna

15 ottobre 2026. Rapporto della demo locale, distinto dalla validazione umana
BF16 e dalle future prove OCR/terminali/servizi reali.

## Base e ambito

Prima del branch: GitHub CLI ha confermato PR #13 integrata il 14 ottobre
23:08:00 UTC, merge `be4b23ebb869c156713d3da491791b556cafbfec`; elenco PR aperte
vuoto. Fetch e nuovo branch `feat/in03-importazione-bollette` da origin/main.
Letti AGENTS, continuità/prompt, PRODUCT/DESIGN/DEVELOPMENT/BACKLOG e gli elaborati
collegati del 15 ottobre. Nessuna nuova trascrizione, analisi audio o modifica a IN01.

Skill apple-design e mobile-native lette dalla versione
`e8a175de22ae1e49370fc144c1f3bb9aeedf988d` di emilkowalski/skills, già registrata
in RISORSE_DESIGN. Applicati gerarchia, controllo/annullo, feedback immediato,
input leggibili e zoom. Non introdotte nuove dipendenze runtime o animazioni.
Primitive e token della 0.5 conservati; nessuna ridefinizione dell'identità.

## Copertura e risultati

| Requisito | Evidenza attuale | Esito / limite |
| --- | --- | --- |
| PB01: acquisizione, originale e campi | `bills.ts`, `BillsPanel.tsx`; test campi errati/mancanti/importi, conferma e copione UI | Importo 964,00 bloccato fino al confronto con 96,40; origine e proposta distinte, correzione attribuita e motivata |
| PB01: qualità e schemi | Test illeggibile, altro formato, senza codice e due pagine | Copia illeggibile non confermabile; altra copia selezionabile; HTML multipagina/altro formato archiviabili senza pagamento. Non prove su immagini, rotazione, scanner o PDF reali |
| PB02: duplicati | Test replay, doppio click UI e seconda copia con source ID distinto | Una bolletta e un evento; identità derivata dalla fonte immutabile, non dai campi editabili |
| PB02: rettifica e fonte | Test ottobre 84 → 79, riapertura v1/v2, replay originale precedente e revisione attesa errata | Una sola bolletta con versioni collegate; fonte/versione precedente conservata; stato obsoleto in memoria negato |
| PB02: stato economico | Test set senza codice/domiciliazione, settembre scaduto con pagamento indicato; confronto ledger e stato 0.4 prima/dopo | Importazione non crea dichiarazione, verifica, quietanza o pagamento. Data scaduta e indicazione nell'originale non certificano mancato pagamento/incasso |
| PB03: policy | Test diretti su letture, elenco, fonte e comando, anche dopo importazione | Intestatario e delega valida ammessi; delega scaduta/revocata, proprietario, operatore senza delega, tecnico, altra agenzia, account/sessione/servizio e scopo non validi negati |
| PB03: contesto in corsa | Test cambio casa, attore e chiusura/rientro sessione | Originale/bozza non restano visibili; nuovo contesto ricomincia. Revoca/tempo sono verificati anche dal modello, non soltanto da pulsanti nascosti |
| Persistenza/recupero | Test ricarica, reset, workspace precedente, stato incoerente e quota fallita | Successo dopo salvataggio; fallimento conserva i campi e permette retry; vecchio workspace riceve fixture; corrotto ripristinato con avviso |
| Accessibilità/layout | Axe WCAG A/AA/2.1 sul confronto e riepilogo a 360/390/1440 px; testo 200% sul riepilogo; focus, Escape, reduced motion e tab mobile | Zero violazioni rilevate e nessun overflow nei controlli finali. Sono emulazione Chromium e test automatici, non screen reader o telefoni fisici |
| Regressione completa | `npx playwright test --workers=3` | **83/83 passati** in una singola esecuzione, incluse 0.3, 0.4, workspace e IN01 |
| Rifinitura finale | Dopo la suite, rimossi i margini ereditati dei campi IN03; rieseguiti i 14 test dedicati | **14/14 passati**, zero flaky/skipped; [riepilogo estratto dal report Playwright](test-summary.json). La suite completa non è stata riattribuita a questa sola rifinitura CSS |
| Build e portatile | `npm run preview:portable` | TypeScript/Vite e HTML autonomo rigenerati. Avviso Vite sul bundle unico >500 kB, già noto; bundle corrente circa 664 kB, non ottimizzato come produzione |
| Smoke portatile finale | `node scripts/verify-bills-portable.mjs`, ripetuto sul file rigenerato | Importazione e ricarica da file a 390×900, 3 bollette, zero errori JS e richieste HTTP; [risultato](portable-check.json) |
| Formattazione e diff | `npm run format:check`, `git diff --check` | Passati; controllati collegamenti locali e prompt ≤4.000 caratteri |
| Riservatezza | Diff, elenco file e screenshot | Solo fixture, sintesi progettuali e codice; nessun audio, trascrizione integrale o esempio personale. BF02 e file IN01 invariati |

La prima esecuzione UI era bloccata da Chromium mancante: installato il browser
richiesto da Playwright. Le prove iniziali hanno poi rilevato contrasto del tab
mobile, etichette accessibili comprendenti anche gli aiuti e overflow al 200%.
Corrette le cause; corretti anche selettori di test troppo generici su testo
ripetuto e schermata di sessione chiusa. Gli esiti iniziali non sono dichiarati
verdi. `npm ci` ha completato l'installazione e riportato zero vulnerabilità
nel proprio audit; non eseguito un ulteriore audit separato.

## Revisione visiva e artefatti

Ispezionate le catture finali del confronto e della conferma a 390 e 1440 px:
[confronto mobile](screenshots/bolletta-compare-390.png),
[confronto desktop](screenshots/bolletta-compare-1440.png),
[conferma mobile](screenshots/bolletta-confirm-390.png),
[conferma desktop](screenshots/bolletta-confirm-1440.png).
Sono catture a pagina intera: le barre fisse occupano la posizione del viewport
al momento della cattura. Non rappresentano una prova fisica della tastiera mobile.

L'[HTML autonomo](../../design/anteprima.html) è aggiornato alla consegna.
Codice, metadati, confronto e dati consultabili sono locali. Non esistono nuovi
export/condivisioni dei documenti importati: il vincolo PB03 su tali derivati
resta da riapplicare quando verranno introdotti, senza attribuire ai test
l'esercizio di un percorso inesistente.

Comandi riproducibili:

```bash
npm ci
npx playwright install chromium
npx playwright test tests/bills.spec.ts --workers=2
npx playwright test --workers=3
npm run preview:portable
node scripts/verify-bills-portable.mjs
npm run format:check
git diff --check
```

## Limiti e stato della consegna

Nessun OCR, PDF/foto reali, file personale, pagamento, QR autentico, URL operativo,
notifica, telefonata o attivazione. Nessuna prova Safari/iOS, Android, hardware,
screen reader o BF16. N02/BF16 e fondazioni operative BF01/BF03/BF17 rimangono
aperti. La data è fissa, i titoli sono fixture nel browser; nessuna autenticazione,
concorrenza multiutente, conservazione o sicurezza server è dimostrata.

La consegna iniziale era locale. La successiva richiesta dell’utente autorizza
il deploy: Sites v9 pubblicata come registrato sotto. `.openai/hosting.json` invariato.
[PR #14](https://github.com/av3rgfx/EECard/pull/14) creata e verificata aperta,
non in bozza, base main, branch `feat/in03-importazione-bollette`. Codice e
artefatti al commit `50461b8205aeedddea195d7e5dc73fbc95807f76`. Il commit di
chiusura aggiunge soltanto i riferimenti remoti: non gli sono attribuiti nuovi
test applicativi. Nessun merge dell'assistente.

## Pubblicazione successiva richiesta dall'utente

15 ottobre, Sites v9 da `44ffb53f60d68e636a475e405b7e71e1129dfada`,
`succeeded` alle 06:24:44 UTC sul sito esistente,
accesso pubblico conservato. [Registro completo](../../design/ANTEPRIME_WEB.md).
Build TypeScript/Vite, HTML portatile e `.output/public` rigenerati; nessuna
differenza dell'HTML portatile dal commit già verificato. Avviso Vite sul
bundle >500 kB invariato. Non ripetuti test UI o prove fisiche; il deploy nativo
verifica la pubblicazione, non costituisce una prova umana BF16.
Controllati diff, link documentali e prompt entro 4.000 caratteri.
PR #14 aggiornata per includere pubblicazione e regola permanente C31.
