# EECard — design system 0.2

Proposta da validare, 6 ottobre 2026. L’identità è propria: il riferimento Revolut riguarda precisione, gerarchia e qualità delle interazioni; nessuna schermata o marca viene copiata.

## Identità scelta e implementazione

Simbolo C — Legame scelto esplicitamente dall’utente il 6 ottobre 2026. Nome del prodotto ancora aperto; nessun wordmark. Il marchio dell’agenzia ƎE non è il marchio del prodotto. [Master, varianti, dimensioni e guida](MARCHIO.md); [archivio delle tre direzioni](LOGO_DIREZIONI.md).

Bruno struttura la navigazione e la tessera; avorio, bianco e sabbia mantengono calme le superfici operative. Albicocca caratterizza il simbolo e gli accenti scelti; la priorità in home usa una sua tinta leggera. Terracotta rende leggibili azioni, link e focus. Verde e rosso restano successi/verifiche ed errori/revoche, sempre con testo. La palette è l’esecuzione del brief visivo, sottoposta a revisione, non una decisione commerciale.

Il master regolare conserva la silhouette scelta. Il master ottico rende più netti steli e aperture a 16–31 px. Fonte unica `src/brand-geometry.json` per React e asset; nessun font nei vettori. Il simbolo principale è sempre pieno; il motivo ampio sulla tessera è un’applicazione decorativa secondaria al 16% di opacità.

Correzioni mantenute dalla prima tappa: metadati/azioni da 12 px, tab bar 11 px, ricerca con target 44×44 e focus restituito, skip link senza cambio rotta, priorità mobile con importo/azione su riga dedicata, Altro con gruppo corrente. Il menu utenze usa la spina e la card una tessera personale.

La fotografia è illustrativa e locale al progetto. Non rappresenta gli indirizzi fittizi del prototipo. La qualità resta leggibile senza animazioni, effetti di puntamento, parallax o 3D.

## Token

Fonte di verità: [src/tokens.css](../../src/tokens.css). Applicazione: [src/styles.css](../../src/styles.css). I token di durata del pannello vengono letti anche dal componente Motion.

| Famiglia | Token / valori | Impiego |
| --- | --- | --- |
| Colori | canvas #faf7f2, surface #ffffff, ink #38271d, muted #68594c | Fondo, contenuto e gerarchia testuale |
| Identità | brand-ink #48280f, brand-accent #ffa15e, surface-soft #f2ece4, brand-soft #f9e5d4 | Navigazione, card e superfici di supporto |
| Azioni / focus | action / focus #93471f | Testo bianco su terracotta 6,64:1 |
| Stato | success #356348, danger #a13232, warning #895a16 | Errori e verifiche in attesa, sempre con testo |
| Spazi | 2, 4, 6, 8, 10, 12, 16, 20, 24, 28, 32, 40, 48, 64 px | Ritmo, distanze, padding; aggiustamenti ottici locali documentati nel CSS |
| Raggi | 12, 20, 24 px | Controlli, contenitori, pannelli |
| Movimento | press 100 ms, fast 160 ms, panel 220 ms, reduced 120 ms | Risposta immediata e continuità spaziale |
| Curve | ease-out (0.23, 1, 0.32, 1), drawer (0.32, 0.72, 0, 1) | Curve dalle skill di Emil, nessun easing inventato |

## Tipografia

Manrope Variable, ospitato localmente, licenza OFL. Scelto per la geometria aperta e il tono familiare; system-ui è fallback. Pesi 450–750, titoli con tracking negativo, corpo con interlinea 1.55–1.9. Dimensioni in rem e titoli fluidi; radice al 100% per rispettare le preferenze di testo. Importi con `Intl.NumberFormat('it-IT')` e cifre tabulari. Nessun importo troncato.

Titoli principali 30–40 px al default, sezioni 16–24, contenuti 12–16. I metadati più piccoli non sono l’unico veicolo di informazioni indispensabili. Focus con anello terracotta visibile, campi da almeno 16 px per evitare lo zoom automatico iOS.

## Componenti

| Componente | Stati e contratto |
| --- | --- |
| Brand | Simbolo Legame autonomo, senza wordmark; nessuna attestazione di registrazione |
| DigitalCard | Attiva demo / bloccata; intestatario completo, identificativo locale, tessera servizi |
| Button | Primario, secondario, testo, pericoloso, disabilitato; feedback alla pressione |
| Badge | Neutro, verifica, successo, revoca; testo oltre al colore |
| PropertyTile | Fotografia con dimensione riservata, nome e indirizzo completi, più parti |
| DocRow | Nome completo anche lungo, metadati, visibilità, stato e dettaglio |
| Modal | Base UI + Animate UI adattato; focus confinato e ripristinato, Escape, pannello mobile scrollabile |
| FileInput | File demo o selezione locale, formato/dimensione verificati, errore leggibile |
| PaymentPanel | Caricato → dichiarato → verificato → quietanza; fonte e autore obbligatori alla verifica |
| TicketPanel | Ricevuta → assegnata → in lavorazione → conclusa → riaperta |
| NotificationBell | Geometria Rare UI, indicatore statico, nome accessibile e azione “segna come letto” |
| Empty / Notice | Vuoto, errore, revoca, dati mancanti e successi espliciti |

## Desktop e smartphone

Desktop: sidebar 232 px, griglia con priorità più larga della card, più immobili affiancati, code operative e documenti con metadati. A 1280 px si riducono spazi e dettagli secondari.

Smartphone: header compatto, prossima azione prima dei numeri, card e contenuti in colonna; immobili come righe con fotografia laterale in home, schede complete nella sezione dedicata. Tab bar con Panoramica/Coda, Documenti, Assistenza, Card, Altro. Il tecnico dispone solo di Incarichi e Altro.

Pannelli con `dvh`, scroll interno, overscroll contenuto, safe area, input 16 px e chiusura esplicita. Nessun gesto obbligatorio. Hover solo con puntatore fine; zoom libero. Non è una PWA installabile né una decisione contro le app native.

## Movimento

Navigazione e cambio dati istantanei. Pannelli occasionali: opacity e transform, percorso reversibile, 220 ms. Tastiera: niente animazione. Movimento ridotto: sola opacità, nessuno spostamento. Nessun loop decorativo. Sonner usa i token di durata e colori di stato EECard; ogni superficie ha un solo proprietario dell’animazione.

Il catalogo interattivo è nella rotta `#/design-system`.

## Contrasti e applicazioni

Bruno/albicocca 6,63:1; bruno/avorio 12,39:1; testo secondario/avorio 6,29:1; bianco/terracotta 6,64:1. Non usare bianco su albicocca (2,00:1) per informazioni funzionali. Il simbolo sulla tessera usa albicocca pieno su bruno. “Tessera servizi” resta visibile a 11 px anche nel widget mobile; titolare 13 px e ID demo 11 px. Blocco con testo e bordo tratteggiato, senza filtrare il colore dell’intera tessera.

Non rinominati gli identificativi demo `EE · …` già salvati: sono riferimenti locali storici, non parte del simbolo o un nuovo wordmark. Nessuna migrazione dello stato richiesta dalla modifica visiva.

## Evoluzione successiva, non ancora implementata

L’utente richiede ora una UI più espressiva e dinamica e la tessera come primo contenuto della home. Questa versione 0.2 descrive l’implementazione corrente; non è stata aggiornata nei token per anticipare una scelta. [Revisione visiva](REVISIONE_VISIVA.md) e [prompt](../progetto/PROMPT_DESIGN.md) definiscono il confronto richiesto: esempi concreti, poi conferma, quindi integrazione e aggiornamento del sistema.
