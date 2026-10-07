# Revisione visiva e direzione della prossima sessione

**Aggiornamento successivo:** l’utente ha scelto Materia e luce con la struttura aperta di Editoriale, senza card contenitore ripetute. Integrazione completata nel frontend0.3. Questo documento conserva la diagnosi iniziale; la scelta e i risultati attuali sono in [DECISIONI.md](DECISIONI.md), [DESIGN_SYSTEM.md](DESIGN_SYSTEM.md) e [VERIFICHE.md](VERIFICHE.md).

6 ottobre 2026. Base esaminata: identità 0.2, commit `7f652e4c3b12a9940aaef7bf5ac8d717061c9b5a`; build online Sites v3 dal commit `d0bcbaecf4a208225fb0788070fc90e90fbf4551`. Questa è un’analisi con proposte, non un redesign implementato o approvato.

## Richiesta confermata

L’utente considera l’esecuzione attuale troppo grezza, semplice, statica e vicina a una bozza. Chiede una qualità grafica sensibilmente superiore, più carattere e dinamismo, usando la UX per dare forma visiva a funzionalità e processi. **La tessera deve essere la prima cosa che si vede entrando.** Prima di modificare il prodotto occorre presentare esempi concreti e attendere conferma o richieste di modifica. Il simbolo C rimane scelto; nome ancora aperto.

## Metodo e limiti

Esaminati screenshot versionati della home desktop/mobile, documenti, affitto, assistenza mobile e tessera mobile; letti `HomePage`, `DigitalCard`, `RentPage`, `TicketPanel`, accesso, componenti di dialogo e token. Misurata nuovamente la home in Chromium emulato, dati demo iniziali e font caricati:

| Viewport | Inizio tessera | Fine tessera | Riepilogo |
| --- | --- | --- | --- |
| 390 × 844 | y 782 px | y 1022 px | y 335–716 px |
| 1440 × 1000 | y 415 px | y 672 px | y 371–738 px |

La tessera mobile non è interamente visibile senza scorrere ed entra nella zona della navigazione inferiore. È una misura di questa configurazione, non una posizione universale. Gli screenshot a pagina intera includono la barra fissa nella posizione del viewport iniziale: non dedurre da quell’immagine che la barra tagli permanentemente i contenuti durante lo scroll.

Questa chiusura non ripete la suite UI o axe e non certifica accessibilità o prestazioni. Le valutazioni di qualità e le frequenze d’uso sotto sono giudizi progettuali/ipotesi, non risultati di ricerca con utenti. Il movimento non è valutabile dagli screenshot: le opportunità derivano dai punti di cambio stato nel codice; il risultato percettivo va provato in browser.

## Diagnosi e migliorie proposte

| Priorità | Evidenza attuale | Conseguenza | Proposta da mostrare |
| --- | --- | --- | --- |
| 1 | `HomePage`, `src/pages.tsx:150`: saluto, statistiche e priorità precedono la tessera; desktop la pone a destra | L’oggetto distintivo sembra un modulo secondario | Tessera come primo contenuto dominante della home dopo l’accesso; intestazione compatta e prossima azione adiacente/sotto. Nessuno splash che ritardi l’uso |
| 2 | Home, affitto e assistenza ripetono superfici bianche, bordi sottili e raggi simili | Poco ritmo e poca differenza fra oggetto personale, contenuto e azione | Gerarchia di superfici: tessera materica, area di lavoro chiara, accenti mirati, sezioni editoriali e liste compatte; più contrasto di scala e composizione |
| 3 | `DigitalCard`, `src/pages.tsx:68`: gradiente, grana e simbolo grande già presenti | La base è coerente, ma la tessera manca di una lavorazione distintiva dei materiali | Confrontare finitura opaca, bordo illuminato e rilievo del simbolo; controllare luce, ombra di contatto, microtipografia e spazio negativo. Nome e stato restano leggibili |
| 4 | Affitto: quattro marcatori piccoli, spiegazioni in un blocco separato | Il processo è corretto ma richiede di collegare testi distanti | Sequenza visiva con fase corrente, autore competente e prossima azione nello stesso gruppo; espandere il dettaglio quando serve. Residuo sempre esplicito per incasso parziale |
| 5 | Assistenza: lista con badge, dettaglio con eventi | Il percorso di presa in carico è meno evidente del titolo della richiesta | Timeline più leggibile con eventi già disponibili, responsabile e passaggio successivo. Non trasformare assegnazione in promessa di disponibilità o tempi |
| 6 | Documenti: file con icona PDF uniforme e metadati minuti | Riconoscimento affidato soprattutto alla lettura di righe simili | Gerarchia tipo documento → immobile → stato e permessi; copertine tipografiche originali per categoria, senza inventare anteprime del contenuto. Conservare ricerca e vista compatta |
| 7 | Fotografie immobili e riquadri promozionali poco coordinati alla tessera | Il prodotto appare composto da moduli comuni | Art direction coerente per ritaglio, luminosità e rapporto immagine/testo; dettagli grafici derivati da C, senza alterare il master. Illustrazioni utili negli stati vuoti, senza sommergere le schermate operative |
| 8 | Dialoghi e pressione hanno già feedback; cambi di fase e nuovi eventi sono immediati | Il movimento esiste, ma raramente racconta il processo | Continuità visiva nei cambi di stato e feedback localizzato, con ricette sotto. Valutare statico e animato fianco a fianco |

La qualità attuale è più forte nella coerenza e nella semantica che nella composizione e nell’art direction. Aggiungere animazioni da solo non risolve questa distanza. La direzione consigliata combina tessera protagonista, materiali curati, gerarchie più coraggiose e una rappresentazione dei processi meno testuale.

## Tre esempi da realizzare prima dell’integrazione

Sono tre trattamenti della stessa identità e degli stessi contenuti, non tre nuovi marchi. Le descrizioni seguenti non sostituiscono i mockup e le demo animate richiesti per la prossima sessione.

| Direzione | Esempio concreto | Beneficio e attenzione |
| --- | --- | --- |
| A — Materia e luce (consigliata per partire) | Tessera bruna opaca in primo piano, simbolo albicocca con rilievo sottile, luce radente e ombra di contatto; accanto una sola prossima azione. Mobile con tessera completa sopra i riepiloghi | Maggiore qualità dell’oggetto e riconoscibilità; evitare riflessi sopra i testi e somiglianze bancarie |
| B — Editoriale e architettura | Tessera protagonista su avorio, composizione asimmetrica desktop, tipografia più espressiva, fotografie con tagli coerenti, fascicoli e timeline disegnati appositamente | Identità immobiliare più forte e ritmo visivo; evitare titoli che spingano azioni e tessera fuori dal primo viewport |
| C — Luce e profondità | Area iniziale scura limitata alla tessera, luce albicocca e piani sovrapposti; transizione breve fra riepilogo e dettaglio, spazi operativi chiari | Maggiore impatto e dinamismo; valutare contrasto, costo di rendering e sobrietà delle aree documentali |

Mostrare per ciascuna: home 1440 e 390 px con gli stessi dati, particolare della tessera, un processo (affitto o assistenza) e una breve demo del movimento. Presentare anche versione a movimento ridotto e stato critico (errore, bloccata o nome lungo). Nessun redesign globale prima della scelta; esempi in area separata dalla demo corrente. Si può scegliere una direzione o una combinazione esplicita.

## Opportunità di movimento

Skill applicata in sola analisi: [find-animation-opportunities](https://github.com/emilkowalski/skills/blob/e8a175de22ae1e49370fc144c1f3bb9aeedf988d/skills/find-animation-opportunities/SKILL.md). Stack già presente: Motion, Base UI, Sonner. Estendere i token di `src/tokens.css`, senza un secondo sistema. Frequenze da verificare con utenti.

| # | Posizione e comportamento attuale | Scopo | Frequenza ipotizzata | Ricetta proposta e beneficio |
| --- | --- | --- | --- | --- |
| 1 | `src/pages.tsx:581`, indicatori affitto; stato cambia senza passaggio locale | Indicazione di stato | Occasionale, dopo una dichiarazione/verifica | Nuovo marcatore: opacity 0→1 e scale .96→1, 160 ms, `--ease-out` (0.23, 1, 0.32, 1). Testo/autore/importo aggiornati subito. Rende individuabile la fase cambiata; nessuna animazione su tutto il totale |
| 2 | `src/panels.tsx:1106`, evento aggiunto alla timeline | Evitare un cambio brusco | Occasionale, dopo azione sul ticket | Solo nuovo evento: opacity 0→1, translateY 6→0 px, 160 ms, `--ease-out`. Conservare scroll e ordine cronologico. Permette di riconoscere l’esito vicino alla richiesta |
| 3 | `src/pages.tsx:1301`, `1337`, `1377`, fasi invito sostituite | Continuità spaziale e indicazione di stato | Rara, attivazione | Nuovo contenuto opacity 0→1, translateX 8→0 px, 220 ms, `--ease-out`; segno invertito tornando indietro. Vecchio pannello non interattivo; nessuna attesa prima dell’input. Spiega il passaggio di fase |

Per tutte: input da tastiera immediato; reduced motion senza trasformazioni, al massimo dissolvenza 120 ms secondo token corrente; niente ritardi sulle azioni, annunci accessibili indipendenti dal movimento. Animare solo opacity/transform e interrompere correttamente al cambio rapido. Le ricette sono proposte da provare, non prestazioni già misurate.

**Candidati scartati in questa analisi:** navigazione quotidiana e ricerca (frequenza/input: non introdurre attese); cifre degli affitti che scorrono (funzione: l’importo va letto subito); rotazione/inseguimento del puntatore sulla tessera in uso (funzione: muove dati e non serve al touch); luce che pulsa senza fine (scopo/frequenza: distrae senza indicare uno stato). La finitura grafica può restare ricca anche da ferma. Un’eventuale presentazione più scenografica va mostrata separatamente e approvata, non attivata a ogni accesso.

Il maggiore beneficio del movimento è evidenziare un cambiamento reale di fase. Per la prossima sessione tradurre la ricetta scelta in un piano con `improve-animations`, oppure implementarla dopo l’approvazione e verificarla con `review-animations`. La pressione dei pulsanti e i dialoghi hanno già animazioni: non presentarli come mancanti né duplicare i gestori.

## Criteri per approvare gli esempi

- La tessera è il primo contenuto dominante entrando nella home, interamente visibile a 390×844 e 1440×1000 con dati standard, insieme a stato e accesso alla gestione. Controllare anche 360×780; con zoom/testi lunghi preferire scroll alla compressione del testo. Nessuno splash o scroll automatico.
- La prossima azione resta facile da trovare; tessera bloccata e accesso revocato non sono rappresentati come attivi. La card personale riguarda i ruoli che già la possiedono; agenzia/tecnico mantengono identità e permessi distinti. Mostrare l’eventuale estensione a quei ruoli come questione da decidere, non inventare una tessera operativa.
- Il confronto include gli stessi dati e compiti, dettaglio a dimensione reale, stato normale/errore e variante reduced motion. L’utente può giudicare qualità grafica, comprensione e velocità separatamente.
- Nessun cambio di logo/nome, prezzo, copertura, servizio o modello di stato introdotto per rendere più convincente una schermata. File, dichiarazione, verifica e quietanza rimangono distinti.
- Dopo scelta: controlli browser, tastiera/focus, contrasto, zoom, performance delle animazioni, movimento ridotto e regressioni dei percorsi; test emulati separati dalle prove fisiche. Pubblicare sul medesimo Sites e consegnare PR senza merge.

Punto di ripresa: [PROSSIMA_SESSIONE.md](../progetto/PROSSIMA_SESSIONE.md). Prompt operativo: [PROMPT_DESIGN.md](../progetto/PROMPT_DESIGN.md).
