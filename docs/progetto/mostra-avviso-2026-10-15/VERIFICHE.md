# IN04 — verifiche

15 ottobre 2026. Prove della demo sintetica, distinte da BF16, telefoni fisici,
lettori/terminali PB04 e autorizzazioni server. [Copione e criteri](README.md).

## Evidenze

| Ambito | Prova osservata | Esito |
| --- | --- | --- |
| AC01–02, fonte/versione | Test modello e UI con rettifica 84 → 79 EUR, storico v1, corrente v2 e originale corrispondente; versione inesistente/campi incoerenti | Coerenza e diniego dei dati incompatibili; storico segnalato, passaggio alla corrente |
| AC03, stesso telefono | Apertura da elenco e dettaglio; testo selezionabile e originale nel dialogo; smoke importazione 96,40 EUR → ricarica → avviso | Funzionante senza scanner, nuova finestra o canale di pagamento |
| AC04–05, recuperi/stati | UI senza codice/domiciliazione/multipagina, altro formato/pagamento indicato/scadenza trascorsa, dicembre codice illeggibile con testo | Messaggi specifici e originale; nessun esito finanziario dedotto. La copia interamente illeggibile resta coperta dai test IN03 |
| AC06/PB03 | Test diretti: intestatario, delegato valido/scaduto/revocato, proprietario, tecnico, operatore, altra agenzia, sessione/account/servizio, scopo/azione/tempo e casa | Zero risultati autorizzati senza titolo, su v1 e v2. Harness React controllato: revoca/cambio casa mentre avviso e originale sono aperti rimuovono i dati |
| AC07, invarianti | Confronto stato modello, bollette e localStorage prima/dopo consultazione, chiusura e versione | Nessuna scrittura in ledger, eventi, rinnovo o card; apertura non dichiara né verifica pagamenti |
| AC08, accessibilità | Axe WCAG A/AA/2.1 a 360/390/1440, avviso e originale aperto; Tab nel dialogo, Enter/Escape e ritorno focus; testo 200%, reduced motion | Zero violazioni rilevate e nessun overflow orizzontale nei controlli. Emulazione Chromium, non certificazione o hardware |
| Regressione completa | `npx playwright test --workers=3 --reporter=list,json` | **94/94**, zero skipped/flaky/unexpected. [Riepilogo](test-summary.json); comprende 11 test IN04, 14 IN03 e regressioni 0.3/0.4/0.5/IN01 |
| Build/artefatti | Helper Sites `build-site.mjs`, poi `portable-preview.mjs`, `build-shareable-previews.mjs` | TypeScript/Vite e artefatti rigenerati. Avviso bundle unico >500 kB noto, ora circa 669 kB JS; non ottimizzato per produzione |
| Smoke autonomo e statico | `node scripts/verify-notice.mjs`, poi stessa prova con `EECARD_NOTICE_URL=http://127.0.0.1:5174/` | Importazione/ricarica, testo/originale 96,40 EUR e chiusura senza mutazioni; zero errori JS e richieste esterne. [Autonomo](portable-check.json), [statico](static-check.json) |
| Formattazione e diff | `npm run format:check`, `git diff --check`; controllo link Markdown e prompt | Passati; prompt sotto 4.000 caratteri |

I tentativi iniziali hanno rilevato selettori test ambigui fra importo del
riepilogo e importo dell'originale nascosto, import CommonJS del test harness e
sovrapposizione della shell al contenitore del harness. Corretti i test: non sono
stati ignorati fallimenti applicativi. Rifinito il focus dopo il passaggio alla
versione corrente prima dell'esecuzione completa finale. IN03: 14 test passati
anche nella prima esecuzione mirata; la suite finale copre il risultato completo.

## Revisione visiva

Ispezionate le catture finali del viewport a [390 px](screenshots/avviso-390.png)
e [1440 px](screenshots/avviso-1440.png); conservata anche quella a
[360 px](screenshots/avviso-360.png). Importo, creditore, stato e rappresentazione
non scansionabile leggibili; il dialogo scorre per raggiungere originale e chiusura.
Le catture iniziali a pagina intera dopo lo scorrimento del dialogo non erano
rappresentative del primo impatto: le catture consegnate riportano il viewport
con dialogo tornato all'inizio. Nessuna prova di luminosità/riflessi o lettura
fisica. Stili/token e dialogo esistenti conservati; nessun redesign generale.

Letti `apple-design` e `mobile-native` dallo snapshot Emil
`e8a175de22ae1e49370fc144c1f3bb9aeedf988d`, già registrato nelle risorse di design.
Applicati gerarchia, controllo, focus, zoom e recupero; non dichiarato verificato
il comportamento iOS/Android in assenza di hardware. Nessuna nuova libreria.

## Riproduzione

```bash
npm ci
npx playwright install chromium
npx playwright test tests/notices.spec.ts --workers=3
npx playwright test --workers=3
npm run preview:shareable
node scripts/verify-notice.mjs
python3 -m http.server 5174 --bind 127.0.0.1 --directory .output/public
# In un altro terminale:
EECARD_NOTICE_URL=http://127.0.0.1:5174/ node scripts/verify-notice.mjs
npm run format:check
git diff --check
```

## Consegna e limiti

PR #14 verificata integrata prima del branch; nuovo branch da main `ad8b928`.
Manifest Sites invariato, identità e accesso pubblico conservati. Esito/versione
online e PR della consegna sono registrati nel
[punto di ripresa](../PROSSIMA_SESSIONE.md) e nel
[registro Sites](../../design/ANTEPRIME_WEB.md), separati dal commit documentale.

Solo dati sintetici; nessun audio, trascrizione integrale, dato personale,
servizio reale, OCR, pagamento, QR autentico o URL operativo. Ricerca/export e
condivisione dei nuovi derivati non implementati, nessuna estensione implicita
dei titoli. Schema 4, BF02 e IN01 invariati. BF16, N02 e PB04 restano aperti;
queste verifiche automatiche non misurano beneficio umano o scansionabilità.

Pubblicazione conclusa: Sites **v10**, `succeeded` alle 12:26:21 UTC del 15 ottobre,
sorgente `a1223ff657a300c47ab8cbb1771a99da8727a707`; stesso sito e accesso
pubblico. [PR #15](https://github.com/av3rgfx/EECard/pull/15) aperta e pronta alla
revisione, senza merge. Controlli applicativi riferiti al codice/artefatti di
questa sorgente; la chiusura successiva modifica solo documentazione e non
comporta una nuova esecuzione della suite o un deploy identico.
