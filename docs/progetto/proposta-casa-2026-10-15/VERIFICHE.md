# Verifiche della proposta casa

15 ottobre 2026. Controlli effettivamente eseguiti sulla nuova proposta e sulle
funzioni conservate, distinti dalle prove umane ancora mancanti.

| Controllo | Esito |
| --- | --- |
| `npm run build` e `npm run preview:shareable` | TypeScript/Vite, HTML autonomo e sito statico generati; avviso bundle >500 kB, circa 702 kB JS non compressi |
| `npx playwright test --workers=4` | **104/104 passati**, compresi i 94 preesistenti e 10 nuovi della proposta |
| Layout dopo la rifinitura della home mobile | 3/3 test mirati ripetuti a 360/390/1440 px, zero violazioni axe nelle viste esaminate |
| Formattazione dei file modificati, `git diff --check` | Passati |
| HTML autonomo `file://` | Pagamento e assistenza completati a 360/390/1440; zero errori JS, zero richieste esterne, nessun overflow nelle viste misurate |
| Build statica locale | Stessi tre viewport e due percorsi completati; zero errori JS/richieste esterne, screenshot finali rigenerati |

## Copertura nuova

- Gate pagamento: conferma preliminare obbligatoria; permessi, agenzia, sessione,
  servizio, titoli e versione corrente rivalutati; revoca e profili senza delega
  negati; nessuna mutazione dei dati fonte o del ledger.
- Annullo senza tentativo, esito positivo con verifica in attesa, esito ignoto
  senza secondo invio, errore recuperabile. Blocco replay sullo stesso oggetto
  anche dopo rettifica, distinzione fra dichiarazione, evidenza, incasso e quietanza.
- IN04 riusato: apertura avviso, Escape e ritorno del focus; IN03 riusato: rettifica
  84 → 79 e versione corrente riflessa nel pagamento. Le regressioni preesistenti
  verificano anche storico, importazione, persistenza e recuperi della 0.5.
- Richiesta: contesto bolletta, descrizione, riepilogo modificabile, conferma,
  riferimento e prossimo passo; per Casa Atelier salvataggio negato senza titolo.
- Scenari: più case compatte, filtro singolo espanso, pagina immobili espansa,
  nessuna urgenza/assistenza in corso, domiciliazione e pagamento indicato,
  proprietario senza delega; disattivazione rinnovo con comandi IN01 riusati.
- Axe su home, pagamenti, assistenza, profilo e controllo bolletta ai tre viewport.
  Testo al 200% sul controllo bolletta senza overflow; reduced motion emulato.
  Le regressioni precedenti includono layout/tastiera e dialoghi delle aree conservate.

La prima esecuzione mirata aveva 8/9 prove riuscite e un timeout del selettore di
test «Casa», che individuava il link mobile anziché la select; corretto il locator.
La successiva suite completa passa. Non sono stati ignorati fallimenti di prodotto.
Le successive tre ripetizioni mirate sono motivate dalla rifinitura CSS mobile.

## Artefatti

Script ripetibile: `node scripts/verify-proposal.mjs`. Senza variabili apre
l’HTML autonomo; `EECARD_PROPOSAL_URL` seleziona il server statico e
`EECARD_PROPOSAL_QA` la cartella di output. [Rapporto autonomo](portable-report.json),
[rapporto statico](screenshots/report.json).

| Vista | Desktop | Mobile |
| --- | --- | --- |
| Home | [1440](screenshots/home-1440.png) | [390](screenshots/home-390.png), [360](screenshots/home-360.png) |
| Conferma pagamento | [1440](screenshots/conferma-1440.png) | [390](screenshots/conferma-390.png), [360](screenshots/conferma-360.png) |
| Riscontro | [1440](screenshots/esito-1440.png) | [390](screenshots/esito-390.png), [360](screenshots/esito-360.png) |
| Riepilogo assistenza | [1440](screenshots/assistenza-1440.png) | [390](screenshots/assistenza-390.png), [360](screenshots/assistenza-360.png) |

Ispezionati visivamente home desktop/mobile, conferma desktop e riepilogo
assistenza a 360 px. Le catture intere mostrano la barra fissa nella posizione
del viewport iniziale: la navigazione non è inserita nel mezzo del documento.
Lo scorrimento porta il contenuto sopra la barra; il fondo ha spazio dedicato.

## Limiti e residui

Chromium emulato, non iPhone/Android, Safari/WebKit, tastiera software fisica o
VoiceOver/TalkBack. Zero violazioni axe non è una certificazione. Nessuna misura
umana, osservazione BF16 o compatibilità terminale. BF02 non modificato.

La proposta è intenzionalmente in memoria: reload/uscita azzerano richieste,
riscontri e importazioni di questo confronto. La persistenza e il ledger dello
spazio attuale restano invariati. Il percorso di pagamento non verifica un incasso,
non invia nulla e non produce quietanze. Copertura, tariffe e partner non definiti.
Nessun annual report/IN05, servizio reale o nuova analisi delle fonti audio.

Pubblicazione effettiva e sorgente online sono nel [registro Sites](../../design/ANTEPRIME_WEB.md).
Un esito di deploy non costituisce un ulteriore test del browser live.
