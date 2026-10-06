# Legame — simbolo e guida d’uso 1.0

Simbolo C scelto esplicitamente dall’utente il 6 ottobre 2026. “Legame” descrive il concept: non è il nome del prodotto. Il naming resta da confermare; nessun wordmark o composizione con nome fa parte di questa consegna. EECard rimane solo l’identificativo provvisorio del progetto.

## Significato e forma

Due elementi aperti intrecciati rappresentano le relazioni tra persone, immobili e servizi. La silhouette regolare conserva la direzione C scelta; non contiene lettere ƎE o riferimenti bancari. La variante ottica piccola semplifica i raccordi e allinea steli e aperture a moduli da 6 unità (1 px a 16 px). Non ruotare, specchiare, distorcere o unire i due elementi.

## File

- `legame-regular-{bruno,bianco,nero,albicocca}.svg`: master regolare per dimensioni da 32 px, stampa e applicazioni principali.
- `legame-small-{bruno,bianco,nero,albicocca}.svg`: master ottico per 16–31 px. A 16 px apertura centrale 2 px e steli 2 px. A 24 px la forma rimane più netta del ridimensionamento del master regolare.
- `favicon.svg`: master piccolo bruno su contenitore albicocca con raggio 24/96.
- `favicon-16.png`, `favicon-32.png`, `favicon-180.png`, `favicon-512.png`: raster a scala 1×, icona browser / touch / app. PNG 180 usato anche come apple-touch-icon; non implica una PWA o app negli store.

Tutti i vettori sono SVG a pieni, viewBox 96×96, senza font, filtri, immagini collegate o dipendenze esterne. I due master provengono da `src/brand-geometry.json`; React e il generatore leggono la stessa sorgente. Rigenerare con `node scripts/build-brand-assets.mjs` (dipendenze del progetto e Chromium Playwright installati).

## Colore e sfondi

| Variante | Fondo |
| --- | --- |
| Bruno #48280F | Bianco, avorio #FAF7F2 o albicocca #FFA15E |
| Albicocca #FFA15E | Bruno #48280F |
| Bianco #FFFFFF | Bruno o nero |
| Nero #000000 | Bianco; stampa monocromatica |

Non applicare gradienti, ombre, contorni o trasparenza al simbolo identificativo. Un suo ingrandimento al 16% di opacità è ammesso come motivo decorativo sulla tessera, sempre accompagnato dal simbolo pieno e senza sostituirlo. Non usare su fotografie prive di una superficie uniforme dietro al segno.

## Dimensione e area di rispetto

Minimo digitale: 16×16 px del viewBox, solo master piccolo. Consigliati 24 px per icone e 36–44 px nelle intestazioni; 32 px e oltre per il master regolare. Mantenere almeno 12 unità di spazio libero dal contorno effettivo del segno su ciascun lato (1/8 del viewBox), anche se il file contiene margini minori. Il contenitore favicon è un’eccezione ottica intenzionale. L’ingombro del simbolo regolare è x=12…84, y=6…90.

Il test a monitor non prova la qualità di stampa. Per card fisiche scegliere dimensioni dopo una prova sul materiale e con lo stampatore: nessuna misura minima di stampa è dichiarata validata.

## Sistema visivo

Avorio #FAF7F2 per il fondo; superfici bianche o sabbia #F2ECE4; testo #38271D e secondario #68594C. Bruno per struttura e tessera; albicocca per il simbolo e accenti selettivi. Terracotta #93471F per le azioni con testo bianco. Verde #356348 resta successo/verifica, rosso #A13232 errore/revoca; sempre accompagnati da testo.

Contrasti calcolati: bruno/albicocca 6,63:1; bruno/avorio 12,39:1; secondario/avorio 6,29:1; bianco/terracotta 6,64:1. Bianco/albicocca 2,00:1: non valido per testi funzionali. I rapporti non sono una certificazione di accessibilità dell’intero prodotto.

Manrope Variable locale (OFL) mantiene la continuità e la geometria suggerita dall’utente. Non è Neo Geometric e non viene presentato come tale. Nessun font incorporato nei vettori del simbolo. Un futuro font del nome richiede nome e famiglia/licenza identificati.

## Stato

Simbolo scelto e finalizzato, UI integrata; palette e dettagli esecutivi costituiscono l’implementazione di design sottoposta a revisione nella PR #3. Nome non approvato e wordmark non realizzato. La card resta tessera di accesso ai servizi. Nessuna promessa di servizi, prezzo o copertura deriva dal marchio. Geometrie originali per il progetto; non svolta ricerca di anteriorità del marchio.
