# EECard — punto di ripresa

Aggiornato il 6 ottobre 2026. Repository unica: https://github.com/av3rgfx/EECard.

## Obiettivo attivo e stato

Evolvere l’identità del prodotto esistente. **EECard è provvisorio; ƎE appartiene all’agenzia Enrico Erca.** Il prodotto deve diventare autonomo e utilizzabile da altre agenzie. Nessun nome esplorato, incluso “quey” nell’immagine di riferimento, è approvato. L’utente suggerisce Neo Geometric o simili.

PR #2 integrata il 6 ottobre alle 09:56:10 UTC, merge `0c7bd42b52200fff654b48f169c69c4bbde08679`. Lavoro sul nuovo branch `design/visual-identity-evolution`, da main aggiornato. Nessun merge della nuova evoluzione richiesto.

**Siamo alla scelta del simbolo**, non alla finalizzazione. Tre direzioni pronte: A Soglia (consigliata), B Casa accolta, C Legame. Le etichette descrivono i concept e non sono nomi del prodotto. Domande poste in chat: quale direzione sviluppare e quale nome usare, oppure lasciare il solo simbolo. Nessuna risposta ricevuta al momento di questo punto di ripresa; non assumere silenzio-assenso.

## Cosa è pronto

- [Confronto, ragionamento e guida dei file di studio](../design/LOGO_DIREZIONI.md). 12 SVG colore/mono, tavole desktop/mobile e confronto a 16/24/32 px. Palette albicocca/bruno ricostruita visivamente con varianti accessibili; Manrope locale come base geometrica.
- Correzioni indipendenti nel prototipo: leggibilità dei metadati, gerarchie della priorità mobile, salto al contenuto, ricerca/focus, menu Altro e icona di tessera personale. Percorsi e semantica documento/dichiarazione/verifica/quietanza conservati.
- 17 test passati; audit aggiuntivo 24 schermate senza violazioni; tavola 320/390/1240 px senza overflow o violazioni; screenshot e HTML autonomo aggiornati. [Verifiche](../design/VERIFICHE.md).
- Design system documentato distinguendo base ancora implementata e proposte da scegliere. Nuovo simbolo non applicato al frontend e favicon precedente conservata.

## Ripresa dopo la risposta

1. Leggere AGENTS.md, PRODUCT.md, DESIGN.md, DEVELOPMENT.md, [LOGO_DIREZIONI.md](../design/LOGO_DIREZIONI.md), [decisioni](../design/DECISIONI.md) e [backlog](BACKLOG.md).
2. Verificare stato remoto della PR di questo branch: riusarla se aperta; dopo eventuale merge, partire da main aggiornato su un nuovo branch. Non modificare `feat/ufp-local-foundation`.
3. Incorporare la scelta effettiva dell’utente. Finalizzare solo il simbolo se il naming resta aperto; nessun wordmark senza nome confermato.
4. Rifinire geometria/ottica piccola, produrre asset finali e favicon; integrare palette, tipografia, card, superfici, navigazione e componenti senza nuove funzioni.
5. Verificare nuovamente browser, contrasti, focus, movimento ridotto, errori e contenuti lunghi; aggiornare screenshot, medesimo sito Sites, documentazione e PR senza merge.

`npm ci`, `npm run dev`; demo su localhost:5173. Confronto locale `/docs/design/identita/`. `npm run preview:shareable` rigenera le anteprime e `/identita/`. I file temporanei e le copie skill esterne non sono prerequisiti persistenti. Recuperare le skill richieste dal riferimento documentato in FONTI.md.

## Anteprime e limiti

Stesso sito: [Desktop](https://eecard-design-preview.uepacio.chatgpt.site/desktop/) · [Mobile](https://eecard-design-preview.uepacio.chatgpt.site/mobile/). Identità persistita in `.openai/hosting.json`; non creare una nuova registrazione. Versione effettivamente pubblicata e pagina confronto in [ANTEPRIME_WEB.md](../design/ANTEPRIME_WEB.md). Push GitHub e deploy sono operazioni distinte.

Nessun backend, account, pagamento, email, upload server o servizio reale. Prezzi, inclusioni, copertura, budget, primo rilascio e integrazioni restano aperti. Test eseguiti in Chromium emulato: iPhone/Android fisici, Safari/WebKit, screen reader e prove con utenti non eseguiti. Non dichiarare completa l’identità prima della scelta e dell’integrazione finale.
