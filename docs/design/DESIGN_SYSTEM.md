# EECard — design system 0.3

6 ottobre 2026. Direzione scelta esplicitamente dall’utente dopo il confronto: tessera e materiali di **Materia e luce**, struttura di **Editoriale e architettura**, processi aperti a tutta larghezza. L’ultima richiesta mantiene lo stile corrente e compatta soltanto gli immobili della home quando ne sono visibili più di uno. Questo documento descrive l’implementazione del frontend; verifiche e versione pubblicata sono registrate in [VERIFICHE.md](VERIFICHE.md) e [ANTEPRIME_WEB.md](ANTEPRIME_WEB.md). Il riferimento Revolut riguarda precisione e qualità, senza copiarne schermate o marca.

## Identità scelta e implementazione

Simbolo C — Legame scelto esplicitamente dall’utente il 6 ottobre 2026. Nome del prodotto ancora aperto; nessun wordmark. Il marchio dell’agenzia ƎE non è il marchio del prodotto. [Master, varianti, dimensioni e guida](MARCHIO.md); [archivio delle tre direzioni](LOGO_DIREZIONI.md).

Bruno struttura tessera e azioni primarie; avorio caldo sostiene le pagine aperte, mentre albicocca caratterizza il simbolo e gli accenti. Link e focus restano terracotta. Verde e rosso indicano successi/verifiche ed errori/revoche, sempre con testo. La scelta riguarda il design, senza approvare condizioni commerciali.

Il master regolare conserva la silhouette scelta. Il master ottico rende più netti steli e aperture a 16–31 px. Fonte unica `src/brand-geometry.json` per React e asset; nessun font nei vettori. Il simbolo principale è sempre pieno. La tessera usa una sua ripetizione ampia e statica come motivo secondario; luce, grana e ombre agiscono sulla superficie senza ridisegnare il master.

Correzioni mantenute dalla prima tappa: metadati/azioni da 12 px, tab bar 11 px, ricerca con target 44×44 e focus restituito, skip link senza cambio rotta, priorità mobile con importo/azione su riga dedicata, Altro con gruppo corrente. Il menu utenze usa la spina e la card una tessera personale.

La fotografia è illustrativa e locale al progetto. Non rappresenta gli indirizzi fittizi del prototipo. La qualità resta leggibile senza animazioni, effetti di puntamento, parallax o 3D.

## Token

Base: [src/tokens.css](../../src/tokens.css). Applicazione: [src/styles.css](../../src/styles.css), poi [src/editorial.css](../../src/editorial.css), che applica la composizione 0.3. `--canvas` e `--border` sono definiti nella fonte unica `tokens.css`, senza una seconda palette indipendente. Dialoghi e indicatore di fase leggono gli stessi token di durata e curva.

| Famiglia | Token / valori | Impiego |
| --- | --- | --- |
| Colori | canvas #f9f6f0, surface #ffffff, ink #38271d, muted #68594c | Fondo, oggetti e gerarchia testuale |
| Identità | brand-ink #48280f, brand-accent #ffa15e, surface-soft #f2ece4, brand-soft #f9e5d4 | Navigazione, card e superfici di supporto |
| Azioni / focus | primarie brand-ink #48280f; action / focus #93471f | Pulsanti primari bruni, link e focus terracotta |
| Separatori | border #dcd3c7; brand-ink #48280f | Righe sottili fra contenuti, accento bruno all’inizio delle sezioni |
| Stato | success #356348, danger #a13232, warning #895a16 | Errori e verifiche in attesa, sempre con testo |
| Spazi | 2, 4, 6, 8, 10, 12, 16, 20, 24, 28, 32, 40, 48, 64 px | Ritmo, distanze, padding; aggiustamenti ottici locali documentati nel CSS |
| Raggi applicati | tessera 22 px / 19 px mobile, pulsanti 6 px, fotografie 3 px | Oggetti e controlli distinti dalle sezioni aperte; dialoghi conservano i raggi esistenti |
| Movimento | press 100 ms, fast 160 ms, panel 220 ms, reduced 120 ms | Pressione, fase affitto e dialoghi; nessun ingresso obbligatorio della tessera |
| Curve | ease-out (0.23, 1, 0.32, 1), drawer (0.32, 0.72, 0, 1) | Curve dalle skill di Emil, nessun easing inventato |

## Tipografia

Manrope Variable, ospitato localmente, licenza OFL. Scelto per la geometria aperta e il tono familiare; system-ui è fallback. Titoli editoriali con peso 550 e tracking negativo; tessera e cifre usano pesi più leggeri. Dimensioni in rem e titoli fluidi; radice al 100% per rispettare le preferenze di testo. Importi con `Intl.NumberFormat('it-IT')` e cifre tabulari, senza animare le cifre.

Titoli pagina fluidi 36–60 px al default, home 32–49,6 px desktop e 34 px mobile; sezioni e processo hanno scale dedicate. Corpo pagina 14–16 px, metadati più contenuti. I microtesti non sono l’unico veicolo di informazioni indispensabili. Focus con anello terracotta, campi da almeno 16 px per evitare lo zoom automatico iOS.

## Composizione e materiali

Le sezioni occupano la larghezza utile della pagina, con margini responsive. Gerarchia affidata a spazio, scala tipografica, fotografie e separatori. Le card non sono vietate per oggetti consultabili; azioni, form e passaggi operativi restano aperti, senza contenitori annidati. Documenti, attività e code restano liste compatte. Per gli immobili è confermato lo stile editoriale, senza ripristino di schede con fondo e cornice.

La home applica `.home-properties-compact` soltanto quando `activeHouses.length > 1`: immagine da 96×132 px a sinistra, testo a fianco e metadati che possono andare a capo; la griglia affianca i riepiloghi quando c’è spazio. I contenuti lunghi aumentano l’altezza senza troncamento. Con un solo immobile visibile la presentazione resta espansa, con foto a tutta colonna sopra il testo. Il conteggio segue il filtro e il ruolo correnti. La pagina “Vedi immobili” resta sempre espansa, indipendentemente dal numero di risultati; nessuna modifica allo stato vuoto.

La tessera mantiene il volume di un oggetto: fondo bruno con luce radente, grana fine, bordo luminoso e ombra di contatto. Testo, identificativo e stato restano immobili e leggibili. Dialoghi, campi, upload e facsimili conservano una superficie quando utile alla funzione. Gli avvisi usano un accento laterale e testo esplicito.

## Componenti

| Componente | Stati e contratto |
| --- | --- |
| Brand | Simbolo Legame autonomo, senza wordmark; nessuna attestazione di registrazione |
| DigitalCard | Attiva demo / bloccata; primo oggetto della home personale, intestatario completo, identificativo locale, tessera servizi |
| Button | Primario, secondario, testo, pericoloso, disabilitato; feedback alla pressione |
| Badge | Neutro, verifica, successo, revoca; testo oltre al colore |
| PropertyTile | Nome e indirizzo completi, più parti; riepilogo compatto solo nella home con più immobili visibili, presentazione espansa con un solo risultato e nella pagina immobili |
| DocRow | Nome completo anche lungo, metadati, visibilità, stato e dettaglio |
| Modal | Base UI + Animate UI adattato; focus confinato e ripristinato, Escape, pannello mobile scrollabile |
| FileInput | File demo o selezione locale, formato/dimensione verificati, errore leggibile |
| PaymentPanel | Caricato → dichiarato → verificato → quietanza; fonte e autore obbligatori alla verifica |
| PaymentProgress | Sequenza dei quattro passaggi e fase attuale, condivisa tra pagina affitto e pannello; marcatori informativi, nessun salto di stato |
| TicketPanel | Ricevuta → assegnata → in lavorazione → conclusa → riaperta |
| NotificationBell | Geometria Rare UI, indicatore statico, nome accessibile e azione “segna come letto” |
| Empty / Notice | Vuoto, errore, revoca, dati mancanti e successi espliciti |

## Desktop e smartphone

Desktop: sidebar 232 px, tessera a sinistra come primo contenuto della home, saluto e prossima azione accanto; riepiloghi e azioni appartengono alla pagina aperta. Più immobili visibili in home usano riepiloghi compatti affiancabili, con immagini ridotte; singolo risultato e pagina immobili conservano la vista espansa. Documenti e code sfruttano tutta la colonna utile. Ogni affitto è una sezione aperta: dati della rata a sinistra, sequenza e azione a destra.

Smartphone: dopo header e contesto compatto, tessera intera con stato e gestione; poi saluto, prossima azione, numeri e contenuti. Nella home con più immobili visibili, righe editoriali con immagine a sinistra e testo a fianco; un solo risultato e pagina immobili restano espansi, con foto sopra il testo. Tab bar proprietario/inquilino: Panoramica, Documenti, Assistenza, Card, Altro. Agenzia: Coda, Documenti, Assistenza, Altro; accesso diretto a Home mostra la coda, Card spiega il contesto operativo senza tessera personale. Il tecnico dispone solo di Incarichi e Altro; le altre rotte operative restano riservate.

Pannelli con `dvh`, scroll interno, overscroll contenuto, safe area, input 16 px e chiusura esplicita. Nessun gesto obbligatorio. Hover solo con puntatore fine; zoom libero. Non è una PWA installabile né una decisione contro le app native.

## Movimento

Navigazione e cambio dati istantanei. Pannelli occasionali: opacity e transform, percorso reversibile, 220 ms. La sequenza affitto anima solo l’indicatore della nuova fase con opacity e scale .96→1, 160 ms; l’apertura di un pagamento non rianima lo storico. Nel pannello il titolo della fase riceve focus dopo un cambio di stato.

Tastiera: niente animazione; un evento keydown interrompe anche il movimento dell’indicatore già in corso. Movimento ridotto: sola opacità, massimo 120 ms per questo feedback; un cambio della preferenza OS interrompe la trasformazione corrente. Importi, fonte, autore e residuo rimangono immediati. Nessun loop decorativo, inclinazione al puntatore o autoplay nel prodotto. Sonner usa i token esistenti; ogni superficie ha un solo proprietario dell’animazione.

Il catalogo interattivo è nella rotta `#/design-system`.

## Contrasti e applicazioni

Rapporti calcolati per i colori pieni: bruno/albicocca 6,63:1; bruno/avorio 0.3 12,28:1; testo secondario/avorio 6,24:1; bianco/bruno 13,24:1; bianco/terracotta 6,64:1. Bianco/albicocca 2,00:1 non è adatto a testi funzionali. Questi rapporti non sostituiscono la verifica dei gradienti o dell’interfaccia completa. Il simbolo identificativo sulla tessera usa albicocca pieno; blocco con testo e bordo tratteggiato, senza filtrare il colore dell’intera tessera.

Non rinominati gli identificativi demo `EE · …` già salvati: sono riferimenti locali storici, non parte del simbolo o un nuovo wordmark. Nessuna migrazione dello stato richiesta dalla modifica visiva.

## Continuità e limiti

Il [laboratorio delle tre direzioni](esplorazioni/README.md) conserva il confronto precedente alla scelta. Picker, controlli di riproduzione e selezione libera delle fasi appartengono a quell’area dimostrativa; non autorizzano azioni nel prodotto. L’implementazione 0.3 conserva la macchina di stato, i dati e la persistenza esistenti. Un incasso parziale rimane aperto anche dopo la quietanza dei soli importi verificati.

La scelta non conferma il nome, prezzi, coperture, servizi, autorizzazioni server o architettura di produzione. Prove su iPhone/Android fisici, Safari/WebKit e tecnologie assistive restano distinte dai controlli Chromium emulati. Per controlli effettivamente eseguiti e limiti consultare [VERIFICHE.md](VERIFICHE.md); per il commit realmente online consultare [ANTEPRIME_WEB.md](ANTEPRIME_WEB.md).
