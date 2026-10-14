# Verifiche osservate della demo 0.4

14 ottobre 2026. Base `3b28e0a`, branch `feat/demo-funzionale-0.4`.
Nessun risultato automatico è un'osservazione umana BF16.

## Controlli eseguiti

| Comando / controllo | Risultato osservato |
| --- | --- |
| `npm ci` | Installazione dal lockfile riuscita |
| `npm run build` | TypeScript e Vite riusciti; avviso per bundle unico oltre 500 kB |
| `npx playwright test --workers=2` | 41 test passati: 13 modello, 9 UI demo, 19 regressioni prototipo |
| `npm run preview:shareable` | Build, HTML autonomo da 1,30 MB e anteprime statiche rigenerati |
| `node scripts/verify-static-demo.mjs` | PF01 → PF02 → PF05 e chiusura riusciti su build statica HTTP e file autonomo, senza errori JS o richieste esterne |
| `npm run format:check` | Tutti i file coperti usano Prettier |
| `npm audit --json` | 0 vulnerabilità riportate |
| `node scripts/verify-demo.mjs` | 28 viste Chromium: zero violazioni axe WCAG A/AA/2.1 AA, overflow, errori JS o richieste HTTP esterne al supporto locale |
| `node scripts/audit.mjs` | 24 scansioni del prototipo 0.3, zero violazioni |
| `git diff --check` | Nessun errore nel diff |
| Confronto kit BF02 con base | Nessuna modifica o rigenerazione |

L'installazione Chromium è stata necessaria in questo ambiente. I primi
controlli hanno trovato errori TypeScript e selettori esatti non stabili per
versione/casa e icone di completamento; corretti con guard di tipi, etichette
esplicite e icona decorativa. Un'esecuzione sovrapposta di Playwright ha prodotto
errori di artefatti/chiusura del server: la verifica finale è stata eseguita
separatamente. Lo script axe ha richiesto un contesto browser esplicito; la
correzione è inclusa nel sorgente. I risultati nella tabella sono quelli
successivi alle correzioni, non l'esito dei tentativi iniziali.

## Copertura

Il modello verifica preparazione/attivazione, precondizioni, retry senza
inviti duplicati, card distinta dall'autorizzazione, conferma e chiusura,
agenzie A/B su ricerca e ID diretti, bollette private, intestazione/delega
scaduta o revocata, incarico tecnico e scopo, revoca card con verifica assistita,
fine rapporto/adesione e titolo autonomo, mandato di sola lettura senza
esportazione, destinatario non confermato, date incerte/versioni conservate,
servizio/lettore indisponibili, logout, bozza incompleta/revisione e invalidazione,
reset dello schema e ripetizione dopo revoca del mandato.

Il browser verifica l'intero PF01 → PF02 → PF05, cambio versione, condivisione,
download facsimile, reset delle note/avanzamento, ricarica con nuova conferma,
scenari limite, lettura Beta nel proprio mandato, casa propria/locata,
proprietario escluso dalle bollette, bozza e titolo autonomo, tastiera,
memoria locale indisponibile, movimento ridotto e layout 360/390/1280/1440.
I test 0.3 includono anche incasso parziale/residuo, quietanza distinta,
dialoghi/focus, stress a 320 px e testo al 200%.

L'audit aggiuntivo osserva PF01/PF02/PF05/estensioni alle quattro larghezze e
sei scenari limite a 390/1440. [JSON](../../design/verifiche-demo-0.4.json).
[Screenshot](../../design/screenshots/demo-0.4): 22 schermate, comprensive di
card revocata, agenzia diversa e servizio indisponibile. Ispezionate anche le
viste di pratica desktop e storico mobile. Gli screenshot documentano il
contenuto sintetico, non operatori o sessioni reali.

Dopo il controllo finale sulla gestione di localStorage interamente indisponibile,
i 22 test di modello/UI 0.4 sono stati ripetuti e passati; le 19 regressioni 0.3
erano già passate e il relativo codice non è cambiato. Controllati 15 Markdown
e 206 collegamenti locali senza destinazioni mancanti.

[Rapporto build statica/offline](../../design/verifiche-statiche-demo-0.4.json).

## Riproduzione

```bash
npm ci
npx playwright install chromium
npm run build
npm test -- --workers=2
npm run format:check
npm audit
npm run dev
# In un altro terminale:
node scripts/verify-demo.mjs
node scripts/audit.mjs
npm run preview:shareable
python3 -m http.server 5175 --directory .output/public
# In un altro terminale:
node scripts/verify-static-demo.mjs
```

Per la build statica, servire `.output/public` e verificare `/app/#/prova`.
Stato remoto, versione Sites e controlli statici sono registrati nella chiusura
sotto dopo la loro esecuzione. Non sono dedotti dal solo push.

## Limiti

Browser Chromium emulato e axe, senza dispositivi fisici, screen reader,
lettori NFC, server o test di sicurezza di produzione. Zero violazioni axe non
è una certificazione. La demo contiene tutte le fixture nel browser;
le regole centralizzate non rendono localStorage un archivio privato.
Nessun test di tempi/costi degli operatori, nessuna prova comparativa umana,
nessuna firma, pagamento, servizio AI o account reale. BF16 rimane aperto.
[Limiti funzionali](IMPLEMENTAZIONE.md), [copione / riuso BF02](COPIONE.md).
