# EECard — punto di ripresa

Aggiornato il 14 ottobre 2026. Repository unica: https://github.com/av3rgfx/EECard.

## Consegna corrente

Implementata la demo funzionale locale 0.4 sul branch `feat/demo-funzionale-0.4`.
Prima del lavoro verificata PR #10 integrata alle 10:51:34 UTC, merge
`3b28e0a8f57a9dcae0bae987a65393a12bfeaef6`; main aggiornato e nuovo branch.
Nessun merge effettuato dall'assistente. I riferimenti di salvataggio e
pubblicazione effettivi vengono registrati nel rapporto di chiusura.

Leggere [implementazione e limiti](demo-funzionale-2026-10-14/IMPLEMENTAZIONE.md),
[verifiche](demo-funzionale-2026-10-14/VERIFICHE.md) e
[copione](demo-funzionale-2026-10-14/COPIONE.md). Ingresso locale `/#/prova`:
PF01 → PF02 → PF05, PF03/PF04/PF06, due agenzie sintetiche, scenari, reset,
registro e note anonime locali. Il prototipo/design 0.3 è conservato.

Prima di riprendere verificare la PR più recente sul remoto: se aperta,
riutilizzarla per questa consegna; dopo il merge partire da main aggiornato e
nuovo branch dedicato. Non riutilizzare i branch documentali integrati.
Non integrare in main senza richiesta esplicita.

## Come provare

`npm ci`, `npm run dev`, aprire `http://localhost:5173/#/prova`. Il codice
sintetico al banco è `DEMO-ALFA-01`. Preparare prima la pratica o scegliere un
caso predisposto; confermare persona, scopo e contesto prima della consultazione.
Visite e vista condivisa non sono ripristinate alla ricarica.
«Ripristina scenario» azzera lo stato 0.4, incluse note e versioni aggiunte;
schema 0.3 rilevato e conservato separatamente senza importazione.

## Vincoli e limiti

C–Legame, nome provvisorio e direzione 0.3 conservati. Policy locali per agenzia,
attore, rapporto, immobile, contratto, intestazione, delega, incarico, scopo e
periodo. Card e ruolo globale non bastano. Proprietario senza bollette private
del conduttore; tecnico solo incarico. Fine rapporto, adesione e revoca card
separate; titoli autonomi valutati indipendentemente.

Documento caricato, pagamento dichiarato, incasso verificato e quietanza
restano distinti; residuo parziale conservato nel percorso 0.3 e nell'esempio
100/40/60. Inviti, adesione, wallet, firma, schermo cliente e suggerimenti sono
simulazioni/fixture. Nessun servizio o archivio reale, telemetria, pagamento,
AI, dato personale o merge autorizzato da questa demo.

Il percorso continuo è predisposto per Alfa; Beta ha un proprio documento
leggibile e non apre Alfa. La pratica ha due parti e non riproduce tutti i casi
BF02. Il browser contiene le fixture: nessuna sicurezza server dimostrata.
Hardware, screen reader, condizioni commerciali, conservazione e responsabilità
restano aperti. Il template è solo un facsimile deterministico.

## Prossima attività concreta

Far provare la demo con dati sintetici secondo il copione. Usare il kit BF02
esistente senza rigenerarlo, annotare supporto/commit e adattamenti, raccogliere
compiti, blocchi, aiuti e riscontri anonimi reali fuori repository. La modalità
note non sostituisce il registro comparativo. BF16 rimane aperto finché non
esistono osservazioni umane; non dedurre risparmio, prezzi o lancio dai test.
Successivamente ordinare correzioni/priorità N11 e riesaminare BF01/BF03/BF17.

## Verifiche osservate

41 test passati, build e formattazione riuscite, audit npm senza vulnerabilità,
28 viste demo e 24 scansioni 0.3 senza violazioni axe, screenshot alle larghezze
360/390/1280/1440. [Rapporto](demo-funzionale-2026-10-14/VERIFICHE.md).
Nessuna misura umana o collaudo hardware. Anteprima autonoma e stesso Sites
sono aggiornati nella consegna di implementazione: usare il registro sotto e
[ANTEPRIME_WEB](../design/ANTEPRIME_WEB.md) per lo stato effettivamente online.

## Riferimenti remoti verificati di chiusura

[PR #11](https://github.com/av3rgfx/EECard/pull/11), aperta e non in bozza,
branch `feat/demo-funzionale-0.4`, base main `3b28e0a`.
Sorgente demo pubblicata: `7adeb69ca74cc17105580c17eab90c05f02efb76`;
Sites v6 `succeeded` alle 11:17:47 UTC.
[Anteprima](https://eecard-design-preview.uepacio.chatgpt.site/app/#/prova),
HTML live confrontato identico alla build locale.
Il commit documentale successivo registra soltanto questi riferimenti: non
cambia gli asset online. Nessun merge; HEAD corrente consultabile nella PR.
