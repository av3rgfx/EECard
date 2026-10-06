# Anteprime web condivisibili

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
