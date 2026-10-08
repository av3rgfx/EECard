# EECard — guida al design

Aggiornato l'8 ottobre 2026. Direzione 0.3 scelta esplicitamente dopo il confronto ad alta fedeltà: tessera e materiali di **Materia e luce**, struttura delle pagine di **Editoriale e architettura**, processi aperti a tutta larghezza. L’ultima scelta visiva esplicita dell'utente conferma questo stile e rende più compatti solo gli immobili della home quando ne sono visibili più di uno. La direzione è integrata nel frontend; verifiche e versione effettivamente online sono registrate nei rapporti dedicati.

## Identità attuale

L’utente ha scelto **C — Legame**: due elementi aperti intrecciati, simbolo autonomo dall’agenzia ƎE/Enrico Erca. Il nome del prodotto rimane da confermare; “Legame” identifica il concept, non un naming approvato. Il frontend usa il solo simbolo, mentre EECard resta una dicitura provvisoria nel footer e nei metadati.

Bruno, albicocca e avorio caldo; azioni primarie brune, link e focus terracotta; Manrope Variable locale, come famiglia geometrica coerente con il suggerimento Neo Geometric o simili. La tessera scura usa grana fine, luce radente, bordo e ombra di contatto, con il simbolo pieno riconoscibile e un motivo decorativo statico. Stati successo, errore e verifica restano semanticamente distinti. La precedente proposta bosco/lime e il monogramma EE sono superati.

[Asset e guida d’uso del simbolo](docs/design/MARCHIO.md) · [Guida web](https://eecard-design-preview.uepacio.chatgpt.site/marchio/) · [Archivio delle proposte](docs/design/LOGO_DIREZIONI.md).

La tessera è il primo contenuto dominante della home di proprietario e inquilino, prima del saluto e dei riepiloghi, con stato e accesso alla gestione. Desktop: oggetto a sinistra, contesto e prossima azione affiancati; smartphone: tessera intera, gestione e poi contenuti in colonna. L’agenzia apre la coda operativa e non riceve una tessera personale; il tecnico mantiene i soli incarichi. I dialoghi diventano superfici inferiori scrollabili; input, safe area e tastiera restano da verificare su hardware reale.

Documenti, affitti, richieste, immobili e impostazioni occupano la colonna utile della pagina. Fotografie, numeri, titoli e separatori costruiscono la gerarchia, senza cornici ripetute intorno a ogni gruppo. Tessera, dialoghi, campi e facsimili mantengono una superficie quando serve a riconoscere un oggetto o un controllo.

Le card sono ammesse come rappresentazione di oggetti consultabili; la regola riguarda soprattutto azioni, form e fasi operative, che non vanno racchiusi in contenitori annidati. L’utente ha confermato lo stile editoriale degli immobili: non è richiesto ripristinare schede bianche. In home, più immobili visibili diventano riepiloghi compatti con immagine ridotta a sinistra e testo a fianco, senza aggiungere fondi o cornici; un solo immobile resta espanso. La condizione segue il contesto filtrato, anche per l’inquilino. La pagina “Vedi immobili” mantiene sempre la presentazione espansa.

## Fonti di verità

| Argomento | Documento o sorgente |
| --- | --- |
| Token, componenti, tipografia e movimento | [DESIGN_SYSTEM.md](docs/design/DESIGN_SYSTEM.md), [tokens.css](src/tokens.css) |
| Layout e stile applicato | [styles.css](src/styles.css), [editorial.css](src/editorial.css), caricato per ultimo |
| Sequenza visuale dell’affitto | [payment-progress.tsx](src/components/payment-progress.tsx), [payment-progress.css](src/components/payment-progress.css) |
| Flussi, ruoli e stati | [PERCORSI.md](docs/design/PERCORSI.md) |
| Conferme, proposte e ipotesi | [DECISIONI.md](docs/design/DECISIONI.md) |
| Riferimenti, skill e licenze | [FONTI.md](docs/design/FONTI.md) |
| Risultati e limiti delle verifiche | [VERIFICHE.md](docs/design/VERIFICHE.md) |
| Anteprime condivisibili | [ANTEPRIME_WEB.md](docs/design/ANTEPRIME_WEB.md) |
| Schermate del frontend | [screenshots](docs/design/screenshots) |
| Confronto originale delle tre direzioni | [Laboratorio](docs/design/esplorazioni/README.md), separato dal prodotto |

Il catalogo interattivo è disponibile nella rotta `#/design-system` del prototipo. Per modificare uno stato o componente, partire dal codice esistente e dai token senza creare un secondo sistema parallelo.

## Criteri per le prossime modifiche

- Preservare nomi e importi leggibili, gerarchie chiare, focus visibile e azioni raggiungibili senza hover o gesti obbligatori.
- Per form e percorsi nuovi considerare vuoto, caricamento, errore con recupero, conferma e permessi pertinenti; non aggiungere funzionalità fuori richiesta.
- Conservare movimento ridotto, navigazione immediata e animazioni brevi solo dove aiutano a comprendere l’azione. Indicatore di fase affitto a 160 ms, dialoghi a 220 ms; nessuna trasformazione con reduced motion, tastiera senza animazione.
- Verificare desktop e smartphone, contenuti lunghi, testo al 200%, tastiera e dialoghi prima di aggiornare screenshot e anteprime.
- Distinguere verifiche automatiche, emulazione e prove fisiche. Zero violazioni axe non equivale a certificazione di accessibilità.

Le skill Emil già applicate sono `apple-design`, `mobile-native`, `emil-design-eng`, `pick-ui-library`, `animate`, `review-animations`, `break-ui + fix`. Fonti e commit sono registrati in FONTI.md; le copie temporanee della sessione non sono un’installazione persistente. Recuperare e leggere le skill pertinenti quando servono.

Animate UI e Rare UI sono adattati nei componenti esistenti, con attribuzioni e licenze conservate. `transition.dev` ha risposto 503 durante la verifica del 6 ottobre; `transitions.dev` resta un riferimento distinto e ipotetico, non una sostituzione confermata.

## Validazione ancora aperta

Feedback sull’identità e sulla comprensione dei flussi; iPhone/Safari e Android/Chrome fisici; VoiceOver/TalkBack; tastiera, zoom, rotazione e continuità del movimento sul dispositivo. Dark mode e RTL non sono varianti attualmente implementate. Il backlog non assegna automaticamente queste estensioni al primo rilascio.

## Scelta applicata e confini

La richiesta di esempi prima dell’integrazione è stata soddisfatta dal laboratorio: tre proposte con gli stessi dati, home desktop/mobile, dettaglio tessera e affitto, stato critico e movimento ridotto. La successiva scelta combina Materia ed Editoriale e aggiunge il vincolo di evitare contenitori ripetuti, poi precisato per i processi operativi. La richiesta finale conserva lo stile corrente e modifica soltanto la densità degli immobili nella home con più risultati visibili. [Revisione iniziale](docs/design/REVISIONE_VISIVA.md) e [prompt del confronto](docs/progetto/PROMPT_DESIGN.md) restano riferimenti storici, non un nuovo blocco all’integrazione autorizzata.

L’affitto presenta quattro passaggi leggibili, fase attuale e spiegazione accanto alle azioni esistenti. `PaymentProgress` rappresenta lo stato: i marcatori non sono comandi per avanzare. Documento caricato, dichiarazione, verifica con autore/fonte e quietanza restano distinti. L’importo e il residuo si aggiornano subito; il solo indicatore della nuova fase riceve un breve feedback. Dopo il cambio di stato nel pannello, il focus raggiunge il titolo della nuova fase.

La scelta approva la direzione visiva e la sua integrazione; non conferma nome, prezzi, coperture, nuovi servizi o autorizzazioni di produzione. Il design system 0.3 descrive l’esecuzione corrente. La pubblicazione sullo stesso sito e la PR senza merge sono autorizzate; per esito e commit online consultare [ANTEPRIME_WEB.md](docs/design/ANTEPRIME_WEB.md).

## Nuovi input dell'audio - analisi dell'8 ottobre

[EA11, EA17, EA20-EA21 ed EA30](docs/progetto/discussione-2026-10-07/ANALISI_CONVERSAZIONE.md)
propongono riepilogo sul secondo schermo, card dei partner personalizzate,
funzioni domestiche anche per il proprietario, bollette con QR/importo subito
visibili e uno stile molto tecnologico con fondo bianco e rosso. La tonalità
del rosso è poco chiara; lo spunto non approva una sostituzione della palette.

Per la prossima progettazione mostrare, quando pertinente, una variante
circoscritta accanto alla 0.3 e chiarire se riguarda tutto il prodotto, il
terminale o le varianti partner. Conservare simbolo, naming aperto, flussi,
semantica della tessera, accessibilità e composizione già scelti finché non
arriva una nuova scelta applicabile. Questa sessione non modifica frontend,
design system, screenshot o anteprime e non ripete i relativi controlli.
