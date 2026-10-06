# Identità autonoma — proposte da scegliere

6 ottobre 2026. Branch `design/visual-identity-evolution`, da `main` aggiornato dopo il merge della PR #2 (`0c7bd42b52200fff654b48f169c69c4bbde08679`). Questa è la prima tappa della richiesta: confronto dei simboli e correzioni indipendenti. Nessun logo è stato scelto o finalizzato.

## Contesto confermato

EECard è un nome provvisorio. ƎE identifica l’agenzia immobiliare Enrico Erca, dalla cui collaborazione nasce l’idea; il prodotto deve avere un marchio autonomo e poter essere usato da altre agenzie. Nessuno dei nomi esplorati in conversazione è approvato. Anche “quey” nell’immagine allegata è solo parte del riferimento, non un nome confermato. Chiarire il nome prima di comporre il marchio testuale; è possibile finalizzare il solo simbolo se il naming resta aperto.

## Lettura del riferimento e del prototipo

Da conservare: albicocca caldo, bruno profondo, geometria piena e morbida, relazione tra casa e servizio. Da reinterpretare: mano e dettagli interni diventano pochi pieni/vuoti che reggano una favicon; proporzioni e silhouette devono appartenere al prodotto. La scritta del riferimento e la sigla ƎE non vengono riprodotte nelle proposte.

Il prototipo mantiene architettura responsive, percorsi, card di accesso, componenti Base UI/Animate UI/Rare UI e font Manrope locale. Il bosco/lime e il vecchio segno restano visibili finché non arriva la scelta: sono la proposta precedente, non l’identità approvata.

## Tre direzioni

[Confronto navigabile](identita/index.html) · [Tavola desktop](identita/confronto.png) · [Tavola mobile](identita/confronto-mobile.png).

| Direzione | Motivazione | Compromesso |
| --- | --- | --- |
| A — Soglia, consigliata | Casa compatta con porta in negativo: accesso ai servizi, pochi dettagli, leggibile in piccolo | Metafora familiare e meno distintiva rispetto a un segno astratto; proporzioni da rifinire dopo la scelta |
| B — Casa accolta | Casa sospesa in un gesto di accoglienza; più vicina a casa/mano del riferimento senza riprenderne il disegno | Più narrativa; a 16 px il dettaglio della porta è meno netto di A |
| C — Legame | Due elementi aperti connessi: persone e relazioni, indipendenza da un’agenzia | Richiamo immobiliare indiretto; può ricordare una maglia o un collegamento |

“Soglia”, “Casa accolta” e “Legame” descrivono i concept: **non sono proposte di nome del prodotto**. Geometrie SVG originali costruite per questo studio, senza certificazione di esclusività del marchio. Non sono state svolte ricerche di anteriorità.

## Palette proposta e contrasto

I colori sono una ricostruzione visiva dell’immagine mostrata in chat, non un campionamento colorimetrico del file originale. La proposta numerica si potrà confermare nel confronto.

| Ruolo proposto | Valore | Impiego / contrasto WCAG calcolato |
| --- | --- | --- |
| Albicocca | `#FFA15E` | Accento del marchio, superfici selettive; bruno sopra: 6,63:1 |
| Bruno | `#48280F` | Simbolo, testo forte, card scura; su avorio: 12,39:1 |
| Avorio caldo | `#FAF7F2` | Fondo operativo calmo |
| Terracotta scuro | `#93471F` | Azioni, link, focus; su avorio 6,22:1, bianco sopra 6,64:1 |
| Testo secondario | `#68594C` | Su avorio 6,29:1 |

Bianco su albicocca è 2,00:1: non usarlo per testi, né per icone funzionali senza un’alternativa contrastante. Stati errore/verifica/successo conservano semantica propria e testo esplicito. Non trasformare tutto l’interfaccia in arancione e non far coincidere accento del brand e stato di allerta.

## Tipografia proposta

L’utente suggerisce Neo Geometric o simili. Il nome da solo non identifica con certezza una specifica famiglia/distribuzione o licenza. Manrope Variable, già locale e OFL, è la base geometrica del confronto e rimane nel frontend: forme aperte, numeri tabulari, buona continuità con il prototipo. Nessun font commerciale non verificato aggiunto. Un eventuale font alternativo va valutato su nome confermato, leggibilità e licenza.

## Uso dei file di studio

In `identita/` ci sono 12 SVG: per ogni direzione bruno, nero, bianco e albicocca, viewBox 96×96, fondo trasparente. Utilizzabili per revisione e importabili in un editor vettoriale; **non sono ancora gli asset finali del prodotto**.

- Conservare proporzioni, pieni/vuoti e colori delle varianti; nessun effetto, contorno o ombra sul simbolo.
- Fondo chiaro: bruno o nero. Fondo scuro: bianco o albicocca. Fondo albicocca: bruno.
- Per lo studio mantenere almeno 12 unità del viewBox di spazio libero intorno all’ingombro del segno. Minimo proposto 24 px per UI; 16 px è una prova favicon, da rifinire otticamente dopo la scelta.
- Le prove 16/24/32 px sono dimensioni CSS reali nella pagina, non ingrandimenti. Uno screenshot ridimensionato dalla chat non sostituisce quella vista.
- Manrope redistribuito con la sua licenza OFL in `identita/LICENSE-Manrope.txt`; attribuzioni dei componenti del prototipo conservate.

## Passo successivo vincolato alla scelta dell’utente

Scegliere A/B/C o richiedere una modifica precisa; confermare il nome oppure lasciare il solo simbolo. Poi rifinire geometria e variante ottica piccola, produrre favicon e asset finali chiaro/scuro/monocromatico, integrare identità e palette nel design system, nella card, nella navigazione e nei componenti. Ripetere le verifiche sul risultato definitivo e aggiornare la stessa PR e lo stesso sito Sites. Nessuna finalizzazione per silenzio-assenso.
