# Anteprime web condivisibili

**Ultima versione pubblicata documentata: Sites v5**, home con più immobili compatta, pubblicata il 6 ottobre 2026 alle 14:18:39 UTC dal commit `65ac9e092c17d9113d85106fa3d04fbb9770cab5`. [PR #4](https://github.com/av3rgfx/EECard/pull/4) integrata il 7 ottobre alle 22:13:57 UTC, stato verificato l'8 ottobre. L'analisi documentale della nuova conversazione non modifica la build e non esegue un nuovo deploy. Le versioni precedenti sotto sono lo storico.

Il sito ospita lo stesso prototipo dimostrativo in due viste separate:

- Desktop: https://eecard-design-preview.uepacio.chatgpt.site/desktop/
- Mobile: https://eecard-design-preview.uepacio.chatgpt.site/mobile/
- Selettore: https://eecard-design-preview.uepacio.chatgpt.site/

Accesso pubblico tramite link, senza account. I meta `noindex` chiedono ai motori di ricerca di non indicizzare le pagine; non costituiscono un controllo di accesso. Il sito contiene solo gli asset dimostrativi del prototipo, senza documentazione di progetto o segreti.

## Comportamento

La vista desktop mantiene una larghezza minima di 1280 px e occupa lo spazio disponibile. Su schermi stretti è possibile scorrere orizzontalmente oppure aprire il link mobile.

Da computer la vista mobile contiene un viewport di 390 px, navigabile. Su smartphone fino a 600 px apre direttamente il prototipo a larghezza piena: safe area, tastiera e altezza dinamica restano gestite dalla pagina, senza una cornice annidata. Le due viste condividono i dati demo salvati nello stesso browser; i visitatori hanno ciascuno il proprio stato locale. Profilo → Ripristina tutta la demo azzera le simulazioni.

## Rigenerazione

```bash
npm ci
npm run preview:shareable
python -m http.server 5174 --directory .output/public
```

Aprire `http://localhost:5174/desktop/` oppure `http://localhost:5174/mobile/`.

Il comando rigenera la build, l’anteprima autonoma e le pagine statiche in `.output/public/`. I template sono in `preview/`, il generatore è `scripts/build-shareable-previews.mjs`. `.openai/hosting.json` conserva l’identità Sites e la directory di pubblicazione; riutilizzare il medesimo sito per gli aggiornamenti. Il sorgente di riferimento rimane la repository EECard; Sites conserva una copia del commit utilizzato per pubblicare. Non è configurata una pubblicazione automatica a ogni push GitHub.

GitHub Pages non è stato attivato: l’integrazione GitHub disponibile non autorizza l’API Pages. L’hosting utilizza Sites.

## Verifiche

Smoke test Chromium delle due pagine: desktop 1440×1000; vista mobile da desktop 1440×1000; smartphone 390×844 e 360×780. Verificati il viewport interno, l’assenza di overflow nel prototipo, la navigazione alla card e l’assenza di errori JavaScript. Restano validi i limiti delle [verifiche del prototipo](VERIFICHE.md), in particolare i test su dispositivi fisici ancora da eseguire.


## Versione online alla chiusura della sessione

Pubblicazione confermata riuscita il 6 ottobre 2026, alle 09:43:46 UTC.

- Commit sorgente pubblicato: `ae371274031ef53c1adcad8d051cc00367dd741d`.
- Project ID: `appgprj_6ac4c220882c8191be87c1b262306614` (già nel manifest).
- Versione Sites: 1, `appgprj_6ac4c220882c8191be87c1b262306614~appgver_30e0c7801d408191b2e2c922da3eede0`.
- Deployment riuscito: `appgdep_6ac4c2c10b2c8191a4fd0881090d1e80`.

Le modifiche Markdown di chiusura sono successive al deploy e non cambiano gli asset pubblicati. Il branch temporaneo `gh-pages` è stato rimosso dopo il tentativo non riuscito di attivazione di Pages. Per i prossimi aggiornamenti usare la stessa identità Sites e registrare qui la nuova versione verificata.

## Evoluzione identità — prima tappa

Il generatore include anche `/identita/`: confronto A/B/C con prove colore, mono e 16/24/32 px. È una pagina di revisione separata; il frontend conserva il marchio e la palette precedenti finché l’utente non sceglie il simbolo. Non è la consegna del marchio definitivo.

Anteprime desktop/mobile rigenerate con le correzioni indipendenti. Verifica Chromium delle quattro combinazioni precedenti ripetuta: navigazione alla card, nessun overflow ed errore JavaScript. HTML autonomo senza richieste esterne e dialogo documento funzionante. [Report della sessione](verifiche-anteprime-identita.json). Versione di pubblicazione aggiornata sotto dopo la conferma Sites.

### Pubblicazione verificata della tappa di confronto

Sites versione **2**, riuscita il 6 ottobre 2026 alle 10:57:26 UTC. Accesso pubblico e identità del sito conservati.

- [Confronto dei simboli](https://eecard-design-preview.uepacio.chatgpt.site/identita/)
- [Desktop aggiornato](https://eecard-design-preview.uepacio.chatgpt.site/desktop/)
- [Mobile aggiornato](https://eecard-design-preview.uepacio.chatgpt.site/mobile/)
- Commit sorgente pubblicato: `6b0f0312070308c9561fe2b448fc19edec816d60`.
- Versione: `appgprj_6ac4c220882c8191be87c1b262306614~appgver_3d5268f933f08191aac4cbdce8403b96`.
- Deployment: `appgdep_6ac4d40564708191b7cf24ea9db4e513`, stato `succeeded` verificato tramite Sites.

La documentazione di chiusura successiva non cambia gli asset online. I controlli browser sono stati svolti sulla medesima build statica locale; la riuscita della pubblicazione è confermata dal servizio Sites, senza attribuirle nuove prove hardware.

## Identità 0.2 — C Legame

Simbolo scelto e integrato, nome ancora aperto. Le anteprime desktop/mobile e il selettore usano palette calda e favicon nuova. `/marchio/` ospita guida, varianti e download; `/brand/legame-assets.zip` contiene 8 SVG, favicon SVG/PNG e guida. `/identita/` rimane archivio del confronto, con esito C indicato.

18 test del prototipo passati, 24 audit aggiuntivi senza violazioni, guida su 320/390/1240 px e dieci download verificati. Le quattro combinazioni delle anteprime statiche e l’HTML autonomo sono stati collaudati sulla build locale corrispondente. [Report](verifiche-legame.json). La versione precedente v2 resta lo storico della prima tappa; il deploy verificato dell’identità 0.2 viene registrato sotto.

### Pubblicazione verificata di Legame

Sites versione **3**, riuscita il 6 ottobre 2026 alle 11:21:23 UTC. Identità, titolo, indirizzo e accesso pubblico del sito conservati.

- [Guida e asset](https://eecard-design-preview.uepacio.chatgpt.site/marchio/) · [ZIP](https://eecard-design-preview.uepacio.chatgpt.site/brand/legame-assets.zip).
- [Desktop](https://eecard-design-preview.uepacio.chatgpt.site/desktop/) · [Mobile](https://eecard-design-preview.uepacio.chatgpt.site/mobile/).
- Commit sorgente pubblicato: `d0bcbaecf4a208225fb0788070fc90e90fbf4551`.
- Versione: `appgprj_6ac4c220882c8191be87c1b262306614~appgver_bfc421a9d1bc8191bbe3dd7295f8e742`.
- Deployment: `appgdep_6ac4d9a3152c8191b8a214f0136bcee3`, stato `succeeded` confermato da Sites.

La chiusura documentale successiva non modifica la build pubblicata. Test browser svolti sulla stessa build locale; nessuna prova su hardware fisico aggiunta dal deploy.


## Pubblicazione verificata — Materia e pagine editoriali

Sites versione **4**, `succeeded` il 6 ottobre 2026 alle 13:48:10 UTC. Stesso sito, titolo, indirizzo e accesso pubblico.

- [Mobile](https://eecard-design-preview.uepacio.chatgpt.site/mobile/) · [Desktop](https://eecard-design-preview.uepacio.chatgpt.site/desktop/).
- Commit sorgente pubblicato: `eea7a954c36607baffdbac82797466cdb329e435`, presente anche su GitHub.
- Versione: `appgprj_6ac4c220882c8191be87c1b262306614~appgver_54d6e42dc73881919702220ebb90293c`.
- Deployment: `appgdep_6ac4fc0a65c081918d5c2a0704ae2971`, stato finale restituito dal servizio Sites.
- Archivio statico SHA256: `7f7e435e0e96b0b239260a3283a67558adc8d396d412516538a713deeaad2533`; build rigenerata dal commit esatto, working tree invariato.

La conferma di deploy proviene da Sites; i controlli browser sono sulla build locale corrispondente, non prove hardware. La guida e gli asset del simbolo sono invariati. Gli esempi `design-lab/` rimangono nell’archivio della repository, separati dalla demo pubblicata.

Il commit documentale di chiusura successivo registra PR/deploy e non cambia gli asset online; nessun nuovo deploy necessario. Il push GitHub diretto era privo di credenziali: blob/albero/commit caricati tramite l’integrazione GitHub, albero identico verificato e clone allineato al commit remoto. Il push della stessa sorgente su Sites è stato confermato prima di salvare/pubblicare la versione.


## Pubblicazione verificata — home compatta con più immobili

Sites versione **5**, `succeeded` il 6 ottobre 2026 alle 14:18:39 UTC. Stesso sito, indirizzo e accesso pubblico; stile editoriale conservato. Home compatta solo con più case visibili; una casa singola e pagina immobili sempre espanse.

- Commit sorgente pubblicato: `65ac9e092c17d9113d85106fa3d04fbb9770cab5`, presente su GitHub e sul repository sorgente Sites.
- Versione: `appgprj_6ac4c220882c8191be87c1b262306614~appgver_0f2a052585248191943aa8cffb6a1a60`.
- Deployment: `appgdep_6ac5032f6b648191bdc985136457a3d7`, esito finale restituito da Sites.
- Archivio statico SHA256: `4fee73b98f1da6dc2b400578db7ca9f1e0917208230302987c67e929f4a0a2ee`, build rigenerata dal commit esatto senza differenze nel working tree.

[Mobile](https://eecard-design-preview.uepacio.chatgpt.site/mobile/) · [Desktop](https://eecard-design-preview.uepacio.chatgpt.site/desktop/) · [Report mirato](verifiche-home-compatta.json). La chiusura documentale successiva non cambia gli asset pubblicati e non richiede un nuovo deploy. I controlli browser sono stati eseguiti sulla corrispondente build locale.

## Demo funzionale 0.4 — pubblicazione verificata

Sites **v6**, stato `succeeded` restituito il 14 ottobre 2026 alle
11:17:47 UTC. Conservati project ID, indirizzo e accesso pubblico; nessun
nuovo sito, invito o cambiamento di pubblico.

- [Prova il percorso](https://eecard-design-preview.uepacio.chatgpt.site/app/#/prova)
  · [Desktop](https://eecard-design-preview.uepacio.chatgpt.site/desktop/)
  · [Mobile](https://eecard-design-preview.uepacio.chatgpt.site/mobile/).
- Sorgente effettivamente online: `7adeb69ca74cc17105580c17eab90c05f02efb76`,
  salvata su GitHub e repository sorgente Sites prima del salvataggio versione.
- Versione: `appgprj_6ac4c220882c8191be87c1b262306614~appgver_e355fe4380008191ba353807cb7fce5f`.
- Deployment: `appgdep_6acf64ca7cb881919fbb2b119e520fd6`.
- Archivio locale gzip SHA256:
  `782b2e1e410fb4148e10865c3512e1006426481a51ae925d1abccdcd44986c49`;
  archivio normalizzato conservato da Sites:
  `8169277aadb66769668788308efb70876f6609ee9be4181be3128225db9d4b52`.
- Build rigenerata dal commit esatto, albero invariato. Recuperato `/app/` via
  HTTPS dopo il deploy: 1.360.444 byte, identico alla build locale, SHA256
  `7d50fc72a7402924d2fb029125cea8e75ed1330af45d63dfdf04f4f7158655ee`.

[Verifiche e limiti](../progetto/demo-funzionale-2026-10-14/VERIFICHE.md).
Il percorso completo è stato verificato sulle build statica e autonoma locali;
il riscontro live sopra è un confronto dei byte serviti, non un ulteriore
collaudo browser/hardware. [PR #11](https://github.com/av3rgfx/EECard/pull/11)
aperta senza merge. Il commit documentale di chiusura successivo non modifica
gli asset pubblicati e non richiede un nuovo deploy.


## Esperienza applicativa 0.5 — Sites v8

Pubblicazione `succeeded` il 14 ottobre 2026 alle 20:01:30 UTC, stesso sito e
accesso pubblico. La root apre direttamente la piattaforma; `/app/#/prova`
conserva i link già condivisi. Il selettore è in `/anteprime/`; desktop/mobile
e guida del marchio rimangono disponibili.

- [Piattaforma](https://eecard-design-preview.uepacio.chatgpt.site/).
- Sorgente online: `448f3721760ec3289920f092fa919240b50be2d4`, presente su
  GitHub e sul repository sorgente Sites prima del salvataggio versione.
- Versione: `appgprj_6ac4c220882c8191be87c1b262306614~appgver_222e1e7ea5188191baa2a0dc8792f618`.
- Deployment: `appgdep_6acfdf8827ac819199a43403ab6816b8`.
- Archivio locale gzip SHA256: `253c6f9ff7621581cb27f3abd3dade867b7ea519ea3a0a9518d6cfd23cf58e91`.
  Archivio normalizzato Sites: `acb51dc2c73f8036fe445239c55dbfdaf3740c2cf7d4b94f9d0e1bcb4e268999`.
- Recupero HTTPS dopo il deploy: root e `/app/` identici byte per byte alla build.
  Root: 1,482,219 byte, SHA256 `fbf2bba42e6fc2f597ad4e297766785328d6e428fdc42f804af65194904c7b1d`.
  App: 1,482,220 byte, SHA256 `1335db8c742fb6b512a63ce671131dbd60f26ad0e6c6e47b21baa7f5fae68b1a`.

La v8 comprende la rifinitura dei riepiloghi e delle intestazioni per il contesto
Beta; sostituisce la v7 iniziale della stessa revisione. I controlli browser sono
sulle build locali; il controllo live sopra è un confronto dei file serviti.
[Rapporto](../progetto/experience-2026-10-14/VERIFICHE.md) e
[PR #12](https://github.com/av3rgfx/EECard/pull/12), aperta senza merge.
Il commit documentale di chiusura non modifica gli asset online.

## 15 ottobre 2026 — solo anteprima locale del rinnovo

Rigenerato `docs/design/anteprima.html` per IN01 (gestione rinnovo Cliente 01),
con smoke locale senza richieste HTTP esterne. [Verifiche e screenshot](../progetto/discussione-2026-10-15/VERIFICHE.md).
Nessun deploy in questa sessione: il sito pubblico conserva Sites v8 e il commit
`448f3721760ec3289920f092fa919240b50be2d4`. Il nuovo branch/PR non identifica
una nuova sorgente online; manifest, identità e accesso Sites invariati.
