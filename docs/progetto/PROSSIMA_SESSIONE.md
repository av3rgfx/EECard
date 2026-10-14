# EECard — punto di ripresa

Aggiornato il 14 ottobre 2026. Repository unica:
https://github.com/av3rgfx/EECard.

## Obiettivo corrente

L'utente ha scelto un metodo demo-prima: costruire una demo funzionante e il
più completa possibile, farla provare e usare il riscontro concreto per capire
cosa manca, cosa serve e cosa aggiungere. Le domande di approfondimento seguono
la prova della demo, salvo quelle che bloccano materialmente l'implementazione.

Il risultato progettato è la demo 0.4 descritta nel
[piano](demo-funzionale-2026-10-14/README.md). Il prompt eseguibile parte con
`/goal` ed è in [PROMPT_DEMO_FUNZIONALE.md](PROMPT_DEMO_FUNZIONALE.md). I tre
passaggi richiesti all'utente sono riepilogati in
[AVVIO_PROSSIMA_SESSIONE.md](AVVIO_PROSSIMA_SESSIONE.md).

## Stato remoto e branch

La [PR #8](https://github.com/av3rgfx/EECard/pull/8) è stata integrata il
14 ottobre 2026 alle 06:49:01 UTC, merge
`adacdab4fa41d85de670e4e5b952fe1b3ea1d24d`. Il piano demo parte da quel main
aggiornato sul branch `docs/piano-demo-funzionale-2026-10-14`. Nessun merge è
stato eseguito dall'assistente.

La consegna corrente è nella
[PR #9](https://github.com/av3rgfx/EECard/pull/9), aperta e non in bozza, con
base `main` e lo stesso branch. Il commit degli elaborati è
`68d0519c2983589a8dfb96df7ebed50e065de0ca`; il commit successivo registra i
riferimenti remoti. Nessun merge.

Prima di riprendere verificare la consegna più recente sul remoto. Se la PR è
aperta e il lavoro riguarda il medesimo piano, riutilizzarla; dopo il merge
aggiornare main e creare un nuovo branch dedicato all'implementazione. Non
riutilizzare i branch delle PR #7/#8 integrate e non effettuare merge senza una
richiesta esplicita.

## Cosa è stato studiato e deciso

Il frontend 0.3 è una base visiva ampia e funzionante: dodici rotte, quattro
ruoli dimostrativi, localStorage, scenari limite, documenti, affitto, utenze,
assistenza, card e invito. Mancano però un unico percorso osservabile e alcuni
oggetti necessari a testare il beneficio principale:

- preparazione operatore di una pratica con parti, fonti, conflitti e mancanti;
- sessione al banco con persona, scopo, contesto, dinieghi e chiusura;
- ricerca storica con date incerte, provenienza, versioni e lavori;
- permessi derivati da relazioni e periodi, con due agenzie isolate;
- modalità prova con compiti, scenari deterministici, reset e note locali.

La demo 0.4 deve quindi unire PF01 attivazione → PF02 ritorno al banco → PF05
recupero storico. PF03 casa propria/locata, PF04 bolletta e PF06 bozza
contrattuale diventano estensioni sintetiche esplorabili. Wallet, contactless,
secondo schermo, firma e assistenza AI restano rappresentazioni locali
esplicitamente simulate.

“Il più completa possibile” descrive la completezza del percorso dimostrativo:
stati riusciti, dinieghi, errori, retry e confini. Non autorizza un backend o
servizi reali e non trasforma la demo in architettura di produzione.

## Vincoli conservati

- EECard resta provvisorio; C–Legame è il simbolo scelto, non il nome.
- Direzione 0.3 invariata: Materia e luce per tessera/materiali, composizione
  Editoriale, bruno/albicocca/avorio. Nessun nuovo redesign.
- La tessera domina la home personale; agenzia e tecnico mantengono coda e
  incarichi senza tessera personale.
- I permessi dipendono da agenzia, rapporto, immobile, contratto,
  intestazione, delega, incarico, scopo e tempo. Il proprietario non vede le
  bollette personali dell'inquilino.
- Documento caricato, pagamento dichiarato, incasso verificato e quietanza
  sono eventi distinti; il parziale conserva il residuo.
- Fine rapporto, fine adesione e revoca card sono eventi diversi. Una card
  seleziona una persona, ma non concede accesso da sola.
- Prezzi, primo pagante, inclusioni, territorio, copertura, risorse, tempi,
  conservazione, responsabilità, schermi, firma, Jarvis e hardware restano
  aperti. I 600 euro annui riguardano clienti già gestiti, non EECard.
- Nessun dato personale, audio, trascrizione integrale o documento reale nella
  repository pubblica.

## BF02 e BF16

Il kit BF02 è pronto e non va rifatto. La ripresa precedente ha trovato 48 casi
pianificati e zero osservati nel modello disponibile; questo non esclude che
possano esistere raccolte esterne. Non inventare misure, tempi o costi.

BF16 resta aperto. Con la nuova sequenza, la prova umana avviene dopo la demo
0.4 e registra la versione esatta del supporto usato. Il kit può essere
riutilizzato e adattato soltanto per indicare il supporto osservato. La prova di
comprensione della demo non dimostra da sola risparmio, disponibilità a pagare,
sicurezza server o fattibilità hardware.

## Ordine di lettura

1. `AGENTS.md` e questo file.
2. [Piano demo 0.4](demo-funzionale-2026-10-14/README.md) e
   [prompt `/goal`](PROMPT_DEMO_FUNZIONALE.md).
3. `PRODUCT.md`, `DESIGN.md`, `DEVELOPMENT.md`, [BACKLOG.md](BACKLOG.md) e
   [registro decisioni](../design/DECISIONI.md).
4. Tutti gli elaborati in `specifiche-2026-10-08/`.
5. README, protocollo ed esito del kit `prova-agenzia-2026-10-08/` e tutti gli
   approfondimenti in `validazione-bf16-2026-10-09/`.
6. Fonti EA01–EA30 e studio v0.1 quando una scelta richiede la provenienza.

## Prossima attività concreta

Integrare prima la PR #9, aprire una nuova sessione e incollare l'intero
[PROMPT_DEMO_FUNZIONALE.md](PROMPT_DEMO_FUNZIONALE.md), inclusa la riga
iniziale `/goal`. La nuova sessione aggiorna main e crea un branch distinto per
implementare la demo 0.4. Procedere prima con modello e fixture di due agenzie, quindi percorso
riuscito PF01 → PF02 → PF05, dinieghi/errori, estensioni PF03/PF04/PF06 e
modalità prova. Eseguire i controlli realmente pertinenti, aggiornare artefatti e
continuità, pubblicare sul sito Sites esistente solo nel lavoro di
implementazione e creare una PR senza merge.

Dopo la demo, farla provare con dati sintetici, raccogliere osservazioni anonime
e aggiornare le priorità. Conservare BF16 aperto fino a quando esistono dati
umani completi e verificabili.

## Verifiche di questa consegna

La consegna corrente modifica soltanto documentazione: piano, prompt e
continuità. Non implementa il frontend 0.4, non rigenera BF02, non esegue prove
umane e non pubblica una nuova anteprima. Registrare qui commit, PR e controlli
documentali effettivi dopo la loro esecuzione.

Controlli eseguiti: `git diff --check`, prima riga del prompt uguale a `/goal`
e 132 collegamenti locali risolti. Nessun test UI/build, audit, screenshot o
deploy: il frontend e Sites sono invariati.
