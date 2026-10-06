# EECard — design system 0.1

Proposta da validare, 6 ottobre 2026. L’identità è propria: il riferimento Revolut riguarda precisione, gerarchia e qualità delle interazioni; nessuna schermata o marca viene copiata.

## Identità

Il verde bosco dà stabilità alla navigazione e alla tessera; avorio e salvia mantengono leggere le superfici operative; il lime vive soprattutto nell’illustrazione della card. L’elemento grafico è una successione di forme concentriche, un richiamo alla casa come spazio di relazioni. Nessun simbolo bancario o indicazione di marchio registrato.

La fotografia è illustrativa e locale al progetto. Non rappresenta gli indirizzi fittizi del prototipo. La qualità resta leggibile senza animazioni, effetti di puntamento, parallax o 3D.

## Token

Fonte di verità: [src/tokens.css](../../src/tokens.css). Applicazione: [src/styles.css](../../src/styles.css). I token di durata del pannello vengono letti anche dal componente Motion.

| Famiglia | Token / valori | Impiego |
| --- | --- | --- |
| Colori | canvas #f7f8f4, surface #ffffff, ink #1d2925, muted #58664f | Fondo, contenuto e gerarchia testuale |
| Identità | forest #173f35, lime #d5ef8e, sage #e8eee5 | Navigazione, card e superfici di supporto |
| Stato | danger #a13232, warning #895a16 | Errori e verifiche in attesa, sempre con testo |
| Spazi | 2, 4, 6, 8, 10, 12, 16, 20, 24, 28, 32, 40, 48, 64 px | Ritmo, distanze, padding; aggiustamenti ottici locali documentati nel CSS |
| Raggi | 12, 20, 24 px | Controlli, contenitori, pannelli |
| Movimento | press 100 ms, fast 160 ms, panel 220 ms, reduced 120 ms | Risposta immediata e continuità spaziale |
| Curve | ease-out (0.23, 1, 0.32, 1), drawer (0.32, 0.72, 0, 1) | Curve dalle skill di Emil, nessun easing inventato |

## Tipografia

Manrope Variable, ospitato localmente, licenza OFL. Scelto per la geometria aperta e il tono familiare; system-ui è fallback. Pesi 450–750, titoli con tracking negativo, corpo con interlinea 1.55–1.9. Dimensioni in rem e titoli fluidi; radice al 100% per rispettare le preferenze di testo. Importi con `Intl.NumberFormat('it-IT')` e cifre tabulari. Nessun importo troncato.

Titoli principali 30–40 px al default, sezioni 16–24, contenuti 12–16. I metadati più piccoli non sono l’unico veicolo di informazioni indispensabili. Focus con anello verde visibile, campi da almeno 16 px per evitare lo zoom automatico iOS.

## Componenti

| Componente | Stati e contratto |
| --- | --- |
| Brand | Marchio tipografico e monogramma originali; nessuna attestazione di registrazione |
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
