# EECard — guida al design

Aggiornato il 6 ottobre 2026. Identità 0.2 implementata e condivisibile; l’utente richiede ora un salto di qualità visiva. Il simbolo è scelto, l’esecuzione dell’interfaccia resta da evolvere.

## Identità attuale

L’utente ha scelto **C — Legame**: due elementi aperti intrecciati, simbolo autonomo dall’agenzia ƎE/Enrico Erca. Il nome del prodotto rimane da confermare; “Legame” identifica il concept, non un naming approvato. Il frontend usa il solo simbolo, mentre EECard resta una dicitura provvisoria nel footer e nei metadati.

Bruno, albicocca e avorio caldo; terracotta accessibile per le azioni; Manrope Variable locale, come famiglia geometrica coerente con il suggerimento Neo Geometric o simili. La tessera scura riprende il simbolo in un motivo ampio e statico; niente PAN, circuito o estetica bancaria. Stati successo, errore e verifica restano semanticamente distinti. La precedente proposta bosco/lime e il monogramma EE sono superati.

[Asset e guida d’uso del simbolo](docs/design/MARCHIO.md) · [Guida web](https://eecard-design-preview.uepacio.chatgpt.site/marchio/) · [Archivio delle proposte](docs/design/LOGO_DIREZIONI.md).

Desktop e smartphone hanno gerarchie dedicate: sidebar e informazioni affiancate sul desktop, prossima azione e navigazione inferiore sul telefono. I pannelli diventano superfici inferiori scrollabili; input, safe area e tastiera vanno verificati su hardware reale.

## Fonti di verità

| Argomento | Documento o sorgente |
| --- | --- |
| Token, componenti, tipografia e movimento | [DESIGN_SYSTEM.md](docs/design/DESIGN_SYSTEM.md), [tokens.css](src/tokens.css) |
| Layout e stile applicato | [styles.css](src/styles.css) |
| Flussi, ruoli e stati | [PERCORSI.md](docs/design/PERCORSI.md) |
| Conferme, proposte e ipotesi | [DECISIONI.md](docs/design/DECISIONI.md) |
| Riferimenti, skill e licenze | [FONTI.md](docs/design/FONTI.md) |
| Risultati e limiti delle verifiche | [VERIFICHE.md](docs/design/VERIFICHE.md) |
| Anteprime condivisibili | [ANTEPRIME_WEB.md](docs/design/ANTEPRIME_WEB.md) |
| Galleria di 22 schermate | [screenshots](docs/design/screenshots) |

Il catalogo interattivo è disponibile nella rotta `#/design-system` del prototipo. Per modificare uno stato o componente, partire dal codice esistente e dai token senza creare un secondo sistema parallelo.

## Criteri per le prossime modifiche

- Preservare nomi e importi leggibili, gerarchie chiare, focus visibile e azioni raggiungibili senza hover o gesti obbligatori.
- Per form e percorsi nuovi considerare vuoto, caricamento, errore con recupero, conferma e permessi pertinenti; non aggiungere funzionalità fuori richiesta.
- Conservare movimento ridotto, navigazione immediata e animazioni brevi solo dove aiutano a comprendere l’azione. Dialoghi a 220 ms, nessuna trasformazione con reduced motion, tastiera senza animazione.
- Verificare desktop e smartphone, contenuti lunghi, testo al 200%, tastiera e dialoghi prima di aggiornare screenshot e anteprime.
- Distinguere verifiche automatiche, emulazione e prove fisiche. Zero violazioni axe non equivale a certificazione di accessibilità.

Le skill Emil già applicate sono `apple-design`, `mobile-native`, `emil-design-eng`, `pick-ui-library`, `animate`, `review-animations`, `break-ui + fix`. Fonti e commit sono registrati in FONTI.md; le copie temporanee della sessione non sono un’installazione persistente. Recuperare e leggere le skill pertinenti quando servono.

Animate UI e Rare UI sono adattati nei componenti esistenti, con attribuzioni e licenze conservate. `transition.dev` ha risposto 503 durante la verifica del 6 ottobre; `transitions.dev` resta un riferimento distinto e ipotetico, non una sostituzione confermata.

## Validazione ancora aperta

Feedback sull’identità e sulla comprensione dei flussi; iPhone/Safari e Android/Chrome fisici; VoiceOver/TalkBack; tastiera, zoom, rotazione e continuità del movimento sul dispositivo. Dark mode e RTL non sono varianti attualmente implementate. Il backlog non assegna automaticamente queste estensioni al primo rilascio.

## Prossima evoluzione richiesta — esempi prima dell’integrazione

L’utente giudica la UI troppo grezza, semplice e statica. Richiede più qualità grafica, carattere, dinamismo e soluzioni visive per funzionalità e processi. La tessera deve diventare il primo contenuto dominante all’ingresso nella home; oggi su mobile segue il riepilogo. Questa priorità sostituisce la precedente proposta che poneva la prossima azione prima della tessera.

[Revisione e proposte](docs/design/REVISIONE_VISIVA.md): lavorare su materiali della card, composizione, gerarchia delle superfici, art direction e visualizzazione dei processi. Presentare 2–3 esempi concreti desktop/mobile con movimento e attendere la conferma dell’utente prima di modificare il prodotto. Nessun trattamento visivo proposto è già approvato. La maggiore espressività deve conservare accessibilità, lettura dei dati e rapidità; può concentrarsi sui momenti adatti senza imporre animazioni a ogni operazione.

Il design system 0.2 documenta ciò che esiste, non il risultato del prossimo redesign. [Prompt di ripresa](docs/progetto/PROMPT_DESIGN.md).
