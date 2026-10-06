# EECard — punto di ripresa

Aggiornato il 6 ottobre 2026. Repository unica https://github.com/av3rgfx/EECard.

## Stato corrente — Materia con pagine editoriali

L’utente ha scelto **1 · Materia e luce**, chiedendo esplicitamente la struttura aperta di Editoriale: contenuti a tutta larghezza utile, senza contenitori-card ripetuti. Ultima precisazione: lo stile aperto attuale è confermato; rendere più compatti gli immobili **solo nella home e solo quando le case visibili sono più di una**. Con una sola casa, anche selezionata dal filtro, e nella pagina «Vedi immobili» mantenere la vista espansa. Non ripristinare le card contenitore. La scelta autorizza l’integrazione prevista nel brief. Non riproporre il confronto come ancora da approvare.

La PR #3 è stata integrata il 6 ottobre alle 11:44:41 UTC. Il lavoro corrente parte da main `ed3a473164b2965168a11a538a6a0b21e6fb7844`, branch `design/visual-directions-lab`, [PR #4](https://github.com/av3rgfx/EECard/pull/4) aperta e pronta alla revisione, senza merge. Prima della prossima modifica verificare la PR associata al branch: riusare se aperta, partire da main aggiornato se integrata. Nessun merge richiesto.

Consegnati e conservati [i tre esempi isolati](../design/esplorazioni/README.md), ora archivio del confronto. Integrata nel prodotto la combinazione scelta:

- Tessera bruna materica, C Legame invariato, primo elemento sostanziale della home; stato e gestione nello stesso gruppo. Nessuna tessera inventata per agenzia/tecnico.
- Pagine aperte su avorio: liste, separatori e gerarchia tipografica. Home con più case: riepiloghi compatti con foto laterale. Una casa in home e pagina immobili: fotografia ampia sopra il testo. Il dialogo mantiene una superficie propria.
- Affitto con percorso visivo condiviso fra pagina e dialogo, fase corrente, distinzione documento/dichiarazione/verifica/quietanza. Movimento solo sul marcatore cambiato; tastiera immediata, reduced motion con dissolvenza120ms.
- Dati, permessi, residui, persistenza, licenze e flussi demo conservati. Nome ancora aperto: Legame è il titolo del concept, non un nome approvato.

## Verifiche e anteprime

Ultima correzione della home: 6 test mirati layout/axe/stress/home passati, casi multiplo/singolo/filtro/inquilino/vuoto verificati, quattro anteprime e HTML offline collaudati. Titolo lungo corretto a 320 px/testo 200%. La precedente integrazione aveva superato 19 E2E e 24 audit aggiuntivi: suite completa non ripetuta per questa modifica circoscritta. Home verificata a390×844 e360×780: tessera, stato e gestione prima della navigazione inferiore. Incasso parziale400€ su950€: residuo550€ mantenuto anche dopo quietanza. Dettagli e limiti in [VERIFICHE.md](../design/VERIFICHE.md).

[Desktop](https://eecard-design-preview.uepacio.chatgpt.site/desktop/) · [Mobile](https://eecard-design-preview.uepacio.chatgpt.site/mobile/) · [Guida/asset](https://eecard-design-preview.uepacio.chatgpt.site/marchio/). Identità e pubblico del sito invariati; versione effettivamente online e commit sorgente in [ANTEPRIME_WEB.md](../design/ANTEPRIME_WEB.md). Online: Sites **v5**, deploy riuscito alle 14:18:39 UTC dal commit `65ac9e092c17d9113d85106fa3d04fbb9770cab5`. La chiusura documentale successiva non cambia la build. Push GitHub e deploy Sites sono operazioni distinte.

## Ripresa operativa

Leggere AGENTS.md, PRODUCT.md, DESIGN.md, DEVELOPMENT.md, [DESIGN_SYSTEM.md](../design/DESIGN_SYSTEM.md), [MARCHIO.md](../design/MARCHIO.md), [DECISIONI.md](../design/DECISIONI.md) e [BACKLOG.md](BACKLOG.md). Il prompt precedente e la revisione conservano il brief storico; prevale la scelta esplicita registrata qui.

`npm ci`, `npm run dev`. Verifiche: `npm test -- --workers=4`, `node scripts/audit.mjs`. Anteprime: `npm run preview:shareable`; server statico5174 e `node scripts/verify-brand.mjs`. Non dipendere dai processi o file temporanei della sessione precedente.

## Lavoro aperto

Raccogliere feedback sul risultato integrato. Non avviare backend, servizi o nuove funzioni senza una richiesta. Restano aperti naming, modello commerciale, perimetro operativo, prezzi, budget e integrazioni. Nessuna ipotesi dello studio è diventata una promessa del prototipo.

Test Chromium emulati: iPhone/Android fisici, Safari/WebKit, VoiceOver/TalkBack, prove con utenti e stampa della tessera ancora da verificare.
