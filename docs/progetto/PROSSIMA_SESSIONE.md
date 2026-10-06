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

Non chiedere nuovamente quale simbolo scegliere: C è confermato. Attendere il nome prima di comporre il marchio testuale. Raccogliere eventuale feedback su questa esecuzione visiva; proseguire entro la richiesta dell’utente senza avviare automaticamente backlog backend, pagamenti o nuove funzioni.

Leggere AGENTS.md, PRODUCT.md, DESIGN.md, DEVELOPMENT.md, [MARCHIO.md](../design/MARCHIO.md), [DESIGN_SYSTEM.md](../design/DESIGN_SYSTEM.md), [DECISIONI.md](../design/DECISIONI.md), [BACKLOG.md](BACKLOG.md). `LOGO_DIREZIONI.md` e `/identita/` sono lo storico delle tre proposte, non una scelta ancora aperta.

`npm ci`, `npm run dev`. Per asset: `node scripts/build-brand-assets.mjs` (Chromium Playwright e Python 3), poi `npm run preview:shareable`. Server statico 5174 e `node scripts/verify-brand.mjs` per guida/download/anteprime. Non dipendere da file temporanei o processi di sessioni precedenti.

## Pubblicazione e limiti

[Desktop](https://eecard-design-preview.uepacio.chatgpt.site/desktop/) · [Mobile](https://eecard-design-preview.uepacio.chatgpt.site/mobile/) · [Guida e asset](https://eecard-design-preview.uepacio.chatgpt.site/marchio/). Stesso sito e pubblico precedenti; project ID in `.openai/hosting.json`. Versione realmente online in [ANTEPRIME_WEB.md](../design/ANTEPRIME_WEB.md); push GitHub e deploy sono distinti.

Nessun backend o servizio reale. Test solo Chromium emulato: iPhone/Android fisici, Safari/WebKit, VoiceOver/TalkBack, prove con utenti e stampa della tessera ancora da verificare. Restano aperti modello commerciale, perimetro operativo, prezzi, budget e integrazioni.
