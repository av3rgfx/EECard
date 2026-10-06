# EECard — punto di ripresa

Sessione conclusa il 6 ottobre 2026. Repository unica: https://github.com/av3rgfx/EECard.

## Stato attuale

Design system e prototipo navigabile ad alta fedeltà desktop/smartphone realizzati. Disponibili dati demo e percorsi proprietario, inquilino, agenzia e tecnico; nessuna operazione reale. Anteprime pubbliche:

- [Desktop](https://eecard-design-preview.uepacio.chatgpt.site/desktop/)
- [Mobile](https://eecard-design-preview.uepacio.chatgpt.site/mobile/)

PR #1 documentale integrata il 6 ottobre. Branch del lavoro: `design/eecard-premium-prototype`, derivato da `main` aggiornato. Consegna nella [PR #2](https://github.com/av3rgfx/EECard/pull/2), non integrata al momento della chiusura. Ricontrollare il suo stato remoto prima di scegliere il branch.

L’utente ha chiesto di salvare e documentare il lavoro per più sessioni e consegnarlo in PR. Non ha chiesto il merge o l’avvio del backend. La chiusura non rende definitive le proposte commerciali o di design.

## Cosa leggere, in ordine

1. [AGENTS.md](../../AGENTS.md): istruzioni persistenti della repository.
2. [PRODUCT.md](../../PRODUCT.md): obiettivo, persone, confini e questioni aperte.
3. [DESIGN.md](../../DESIGN.md): direzione e mappa delle fonti di design.
4. [DEVELOPMENT.md](../../DEVELOPMENT.md): codice, avvio, verifiche e pubblicazione.
5. [BACKLOG.md](BACKLOG.md): completato e prossime attività proposte.
6. [DECISIONI.md](../design/DECISIONI.md): distinguere conferme, proposte, demo e domande aperte.

Per un cambiamento specifico leggere poi i percorsi, il design system e le verifiche collegati. Il [brief originale](PROMPT_DESIGN.md), le [risorse](RISORSE_DESIGN.md) e lo [studio v0.1 di 21 pagine](EECard-studio-v0.1.pdf) restano fonti di contesto. Non ripetere tutta l’analisi senza necessità. Il vecchio handoff pre-design è conservato nella storia Git della PR #1.

## Ripartenza pratica

- Verificare `git status` e aggiornamenti remoti. Se PR #2 è aperta, riprendere il branch di design; se integrata, partire da `main` aggiornato con un nuovo branch per il lavoro richiesto. Non modificare il branch estraneo `feat/ufp-local-foundation`.
- Eseguire `npm ci` e `npm run dev`; aprire `http://localhost:5173`. Non dipendere dai server o dalle copie di skill in `/tmp` della sessione precedente.
- Per riprovare i flussi usare il selettore ruolo e immobile; per azzerare lo stato usare Profilo → Ripristina tutta la demo. I dati sono nel browser, chiave `eecard-demo-v1`.
- Chiedere o incorporare il prossimo obiettivo dell’utente. La sequenza proposta è feedback sui percorsi, prove hardware e chiarimento del primo rilascio; non avviare automaticamente tutte le voci del backlog.

## Evidenze già disponibili

15 test Playwright passati; audit aggiuntivo di 24 schermate senza violazioni axe; build e formattazione passate; 22 screenshot; HTML autonomo collaudato senza rete; quattro combinazioni di viewport collaudate per le anteprime web. Report datati in [VERIFICHE.md](../design/VERIFICHE.md) e [ANTEPRIME_WEB.md](../design/ANTEPRIME_WEB.md).

Non ancora eseguiti: hardware iPhone/Android, Safari/WebKit, VoiceOver/TalkBack e prove con utenti. Nessuna certificazione WCAG o verifica di sicurezza del prodotto operativo. Nessun backend o CI configurati.

## Vincoli da non perdere

Quote 50 €/15 €, periodicità, inclusioni, zona, copertura, primo cliente, budget e perimetro iniziale restano aperti. Non presentare Milano, i canoni e gli slot demo come dati commerciali reali. Pagamenti, app store, 3D e AI non sono né approvati né rinviati per decisione condivisa.

Mantenere distinti caricamento documento, dichiarazione pagamento, verifica incasso e quietanza. La card è una tessera di accesso ai servizi, non una carta bancaria. La condivisione documentale e i permessi sono simulati.

## Pubblicazione e chiusure future

Il sito online è Sites, con identità persistita in `.openai/hosting.json`; non creare una nuova registrazione per aggiornarlo. Ultimo commit frontend pubblicato: `ae371274031ef53c1adcad8d051cc00367dd741d`. I successivi aggiornamenti solo Markdown non modificano questa versione online.

A ogni chiusura aggiornare questo punto di ripresa, il backlog, il [registro sessioni](SESSIONI.md) e i documenti toccati dalle decisioni; salvare sul remoto e creare/aggiornare la PR del lavoro. Non lasciare informazioni necessarie soltanto nella chat.
