# EECard — punto di ripresa

Aggiornato il 6 ottobre 2026. Repository unica https://github.com/av3rgfx/EECard.

## Stato corrente

L’utente ha scelto **C — Legame** e ha lasciato il nome da confermare. Il simbolo è finalizzato e integrato nel prototipo esistente, con identità albicocca/bruno/avorio e terracotta per azioni accessibili. “Legame” è il titolo del concept, non il nome del prodotto. EECard resta provvisorio; ƎE appartiene all’agenzia Enrico Erca. Nessun wordmark realizzato.

Branch `design/visual-identity-evolution`, da main aggiornato dopo merge PR #2. [PR #3](https://github.com/av3rgfx/EECard/pull/3) riutilizzata e pronta alla revisione, senza merge. Controllarne lo stato remoto prima di scegliere il branch in una nuova sessione.

## Consegnato

- [Guida marchio](../design/MARCHIO.md): master regolare e ottico, 8 SVG colore/mono, favicon SVG + PNG 16/32/180/512, ZIP e pagina `/marchio/` con download. Fonte unica `src/brand-geometry.json`.
- Palette semantica e simbolo su navigazione, tessera, superfici, componenti e design system 0.2. Manrope locale mantenuto come geometrico simile al suggerimento; Neo Geometric non è stato identificato/licenziato.
- Correzioni della prima tappa conservate: leggibilità, skip link, focus ricerca, orientamento Altro, gerarchie mobile. Iconografia di tessera/utenze coerente; microtesto della card reso più leggibile.
- Build/format passati; 18 test E2E, audit aggiuntivo 24 schermate senza violazioni; guida 320/390/1240 senza overflow/violazioni; download verificati; anteprime e HTML autonomo collaudati. [Report aggiornato](../design/VERIFICHE.md), 22 screenshot frontend e 2 guide.
- Prezzi, coperture e disponibilità non inventati; documento/dichiarazione/verifica/quietanza e percorsi demo conservati.

## Prossimo lavoro

**Nuova priorità confermata dall’utente:** elevare nettamente la qualità grafica, percepita oggi come grezza, semplice e poco dinamica. **La tessera deve essere la prima cosa visibile entrando nella home.** Prima di modificare il prodotto presentare 2–3 esempi concreti e attendere conferma o richieste di modifica. Questa chiusura ha aggiornato solo documentazione e analisi: il redesign non è implementato.

Partire dalla [revisione visiva](../design/REVISIONE_VISIVA.md) e dal [prompt pronto da copiare](PROMPT_DESIGN.md). Proposte da confrontare: Materia e luce, Editoriale e architettura, Luce e profondità. Nessuna scelta approvata. Preparare home desktop/mobile, dettaglio tessera e un processo esistente con demo animata, stato critico e reduced motion, in un’area separata dal prodotto attuale; non bastano descrizioni o moodboard.

Non chiedere nuovamente quale simbolo scegliere: C è confermato. Il nome rimane aperto. Non avviare backend, pagamenti o nuove funzioni. Dopo la conferma integrare, verificare e pubblicare sul medesimo sito. Per agenzia/tecnico preservare i ruoli esistenti senza inventare una tessera personale.

Leggere AGENTS.md, PRODUCT.md, DESIGN.md, DEVELOPMENT.md, [MARCHIO.md](../design/MARCHIO.md), [DESIGN_SYSTEM.md](../design/DESIGN_SYSTEM.md), [DECISIONI.md](../design/DECISIONI.md), [BACKLOG.md](BACKLOG.md). `LOGO_DIREZIONI.md` e `/identita/` sono lo storico delle tre proposte, non una scelta ancora aperta.

`npm ci`, `npm run dev`. Per asset: `node scripts/build-brand-assets.mjs` (Chromium Playwright e Python 3), poi `npm run preview:shareable`. Server statico 5174 e `node scripts/verify-brand.mjs` per guida/download/anteprime. Non dipendere da file temporanei o processi di sessioni precedenti.

## Pubblicazione e limiti

[Desktop](https://eecard-design-preview.uepacio.chatgpt.site/desktop/) · [Mobile](https://eecard-design-preview.uepacio.chatgpt.site/mobile/) · [Guida e asset](https://eecard-design-preview.uepacio.chatgpt.site/marchio/). Stesso sito e pubblico precedenti; project ID in `.openai/hosting.json`. Versione realmente online in [ANTEPRIME_WEB.md](../design/ANTEPRIME_WEB.md); push GitHub e deploy sono distinti.

Online: Sites **v3**, deploy riuscito il 6 ottobre 2026 alle 11:21:23 UTC dal commit `d0bcbaecf4a208225fb0788070fc90e90fbf4551`. Il commit di chiusura successivo aggiorna solo documentazione, senza nuovo deploy.

Nessun backend o servizio reale. Test solo Chromium emulato: iPhone/Android fisici, Safari/WebKit, VoiceOver/TalkBack, prove con utenti e stampa della tessera ancora da verificare. Restano aperti modello commerciale, perimetro operativo, prezzi, budget e integrazioni.
