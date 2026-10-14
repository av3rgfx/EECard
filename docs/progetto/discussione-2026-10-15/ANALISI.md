# Analisi anonima — due audio, appunto e confronto con la 0.5

15 ottobre 2026. Fonte del confronto tecnico: main `24eb129e35675ff8f684bc308b8202cc7735a43a`,
PR #12 integrata il 14 ottobre alle 20:48:12 UTC. Nuovo branch
`feat/studio-audio-incremento-locale`; nessun merge eseguito dall'assistente.
[Inventario e limiti](README.md), [studio](STUDIO_PROGETTUALE.md),
[piano](PIANO_INCREMENTALE.md), [fattibilità bollette](FATTIBILITA_BOLLETTE.md).

Gli audio sono stati elaborati realmente e localmente. Timestamp orientativi;
trascrizioni automatiche private, con voci provvisorie e parole incerte. Le
interpretazioni sotto non correggono silenziosamente cifre o frasi ambigue.
Le digressioni e gli esempi personali non sono riprodotti qui. Ordine degli
alias = ordine degli allegati, non cronologia della conversazione dimostrata.

## Fonti dell'appunto e conferma successiva

APP01 usa una suddivisione stabile per rintracciare l'appunto originale privato:
.1 livelli ed extra; .2 disdetta; .3 report annuale e studio; .4 acquisizione
bollettino; .5 avviso/QR al punto di pagamento e fattibilità pagamento in app.
È una sintesi anonima, non la copia dell'appunto.

USR01: risposta esplicita dell'utente nella sessione: report annuale **sia per
cliente sia per agenzia, con viste separate**. È una decisione di destinazione;
contenuti, metriche, calendario e formato restano da specificare.

## Catalogo dei nuovi candidati

NA = nuovo ID locale; non sostituisce EA01–EA30 né promuove automaticamente RF.
D = decisione esplicita della sessione; P = proposta nel confronto; Q = domanda
aperta; I = interpretazione dell'analisi. «Conferma» nella colonna confronto
significa coerenza con un'idea precedente, non approvazione commerciale.

| ID | Fonte | Natura e contenuto anonimo | Confronto con progetto e demo 0.5 |
| --- | --- | --- | --- |
| NA01 | AUDIO01 00:00–00:32, 02:40–03:38 | P: strumento di gestione collegato al servizio dell'agenzia, rapido e completo | Riprende EA08/EA19/RF08/RF19: fascicolo e banco già locali; completezza ed erogazione reale ancora aperte |
| NA02 | AUDIO02 00:02–00:36, 01:14–01:33; APP01.1 | P: livelli progressivi oppure extra acquistabili separatamente, anche AI | Precisazione di EA05/EA18, RF05/RF18 e offerta clienti. Nessun catalogo/versione/prezzo nel codice 0.5 |
| NA03 | AUDIO01 00:33–01:17; APP01.2 | P forte nel dialogo + indirizzo dell'appunto: disdire facilmente, mantenendo il periodo pagato e fermando il successivo rinnovo, senza preavviso nel primo passaggio | PF03-AC06 e separazione adesione/account/card già progettati. `endMembership` è un comando tecnico nel laboratorio, non un percorso cliente né una disattivazione del rinnovo |
| NA04 | AUDIO01 01:19–02:08 | P condivisa nel passaggio: cambiare livello durante il periodo pagando una differenza; Q: frazione e base del calcolo non univoche | Nuova regola commerciale candidata: mancano preventivo, pro rata e downgrade. Non ricavare un algoritmo da «secondo mese/un dodicesimo» |
| NA05 | AUDIO01 02:47–03:07, 04:36–05:05 | P/I: sostenibilità con quota ricorrente e servizio premium; cifra annuale esemplificativa riconosciuta, non listino | Ripresa EA18/EA19/EA27; non sostituisce le cifre storiche aperte o i servizi preesistenti. Quantità e ricavi nel ragionamento sono scenari, non domanda provata |
| NA06 | AUDIO01 03:07–03:38, 04:58–05:48 | P: assistenza applicativa e intervento fisico/documentale quando necessario; migliorare il prodotto dai problemi ricevuti | RF19/RF24/RF26 e assistenza già previsti; 0.5 ha richiesta/stato locale, nessuna copertura sul posto, personale, SLA o costo approvati |
| NA07 | AUDIO01 03:41–04:35 | P: ambizione multicanale e urgenza di avvio; riferimento a «gennaio dell’anno prossimo» nel controllo medium; anno assoluto non verificato | Conferma visione, non data concordata, budget o piano eseguibile. App/AI/card non diventano disponibili per questa affermazione |
| NA08 | AUDIO01 05:43–06:21 | P: gestione di più immobili e portafogli; esempi personali esclusi | EA20/RF20/PF03 già precisano contesti multipli; 0.5 mostra due case sintetiche, non un gestionale arbitrario multiportafoglio |
| NA09 | AUDIO01 06:27–07:24 | P/Q in tensione: rinnovo ricorrente e possibile termine anticipato per la disdetta, con richiamo colloquiale a una presunta regola | Contraddice NA03 sul preavviso. Nessuna verifica normativa o scelta finale nell'audio: non fissare tre mesi né rendere irrevocabile un rinnovo da questa frase |
| NA10 | AUDIO01 07:38–08:05; APP01.5 | P: bolletta immediata, importo e codice prima dei dettagli | EA21/RF21/PF04 già presenti; 0.5 mostra importo/scadenza e QR facsimile nei dettagli. Rendere più evidente «Mostra avviso» è un'evoluzione UX, non un nuovo sistema di pagamento |
| NA11 | AUDIO01 08:06–08:38; APP01.4 | P: acquisire il bollettino, anche come immagine/ritaglio, e riportare i dati in digitale | RF21/PF04 già richiedono acquisizione e conferma; nuova concretizzazione scanner/foto. 0.5 non legge file né esegue OCR; importi UI sono statici per casa |
| NA12 | AUDIO01 08:09–08:38 | Q: si assume uniformità dei bollettini e si propone un'immagine del codice | Assunzione da correggere nello studio: schemi/canali diversi, qualità, duplicati e rettifiche da gestire. Immagine disponibile non prova correttezza o pagabilità |
| NA13 | APP01.5; AUDIO01 07:38–08:38 come contesto | Richiesta di studio: mostrare avviso al punto di pagamento e capire l'integrazione in piattaforma/app | RF21/PF04/BF10 già aperti; fattibilità condizionata a schema/canale/partner. Non confondere l'appunto col contenuto letterale dell'audio |
| NA14 | AUDIO02 00:30–01:16, 01:23–01:33 | P: chiamata AI all'inquilino dopo la scadenza, distinta da semplice notifica, venduta come extra al proprietario | Nuova rispetto a EA28/RF28/PF06: assistente prima orientato a fonti/bozze; ora comunicazione proattiva verso terzi. Nessuna chiamata, numero, automazione o provider attivati |
| NA15 | APP01.3; USR01 | D sul destinatario, P sui dettagli: report annuale personale e gestionale separati | Nuovo rispetto a EA01–EA30; 0.5 ha riepiloghi/registro sintetici, non un report annuale attendibile. Metriche e copertura dati da specificare |
| NA16 | Richiesta corrente | D: studio, piano, primo intervento locale, riservatezza, verifiche e PR senza merge | Autorizza l'esecuzione circoscritta e reversibile. Non risolve automaticamente catalogo, termini, lancio o servizi reali |

## Decisioni, accordi nel dialogo e proposte

**Confermato dalla richiesta corrente:** analisi e sviluppo locale reversibile,
fonti private, niente servizi reali e niente merge; report con due viste da USR01.
C–Legame, naming provvisorio, stile editoriale, titoli contestuali e separazione
degli eventi economici restano vincoli precedenti.

**Accordo rilevabile nel dialogo, da trasformare in specifica revisionabile:**
cambio di livello con differenza economica e interesse per la chiamata AI.
Non prova che destinatari, formule, prezzi, erogazione o primo rilascio siano
stati approvati. La facilità di disdetta è ribadita dall'appunto più recente;
il termine di preavviso è una divergenza, non un requisito da nascondere.

**Proposte dell'analisi:** catalogo separato dai permessi; simulare prima il
rinnovo, poi importazione/avviso; report con fonti e copertura; notifiche e AI
come ramo distinto; partner di pagamento solo dopo verifica. Le priorità del
piano non rappresentano un rinvio definitivo di app, hardware, AI o pagamenti.

## Contraddizioni e informazioni mancanti

| Tensione | Conseguenza concreta / trattamento |
| --- | --- |
| Disdetta libera (00:33–01:17) vs termine anticipato (06:27–07:24) | Conservare entrambi i riferimenti. Nella demo esplorare un'uscita semplice senza adottare condizioni legali. Politica operativa ancora da decidere |
| Periodo annuale, esempio mensile e frazione per upgrade | Non introdurre calcolo pro rata o un nuovo listino. Serve definizione univoca del periodo residuo e degli importi già pagati |
| Quota contenuta e promessa di assistenza fisica ampia | Il software non finanzia da solo la copertura: catalogo, territorio, disponibilità e costo operativo devono essere studiati e misurati |
| «Tutti uguali» per i bollettini | La ricerca ufficiale distingue schemi e canali; non progettare riconoscimento universale o generatore universale di QR |
| Ritardo rispetto alla scadenza = mancato pagamento | Falso automatismo: esito sconosciuto, accredito in corso, dichiarazione e contestazione vanno trattati prima di un promemoria; nessuna chiamata automatica su solo calendario |
| Proprietario acquista extra AI rivolto all'inquilino | Pagare un servizio non conferisce diritto di contattare terzi, accedere alle loro bollette o ottenere conversazioni integrali |
| Urgenza di gennaio vs dipendenze non definite | Annotare aspirazione, lettura «gennaio dell’anno prossimo» e assenza di anno assoluto verificato; non promettere un rilascio o inventare una stima |
| Dashboard locale vs annual report | I pochi eventi sintetici non costituiscono un anno di attività. Nessun totale annualizzato o beneficio stimato come risultato osservato |

## Evidenza di codice e base progettuale

- `src/workspace/Experience.tsx`: shell 0.5, azioni personali e agenzia, utenze
  con due importi sintetici e QR non pagabile, documenti, richieste e affitto.
- `src/workspace/service.ts`: richieste, ledger/eventi e persistenza locale;
  dichiarazione, riscontro, quietanza e residuo distinti; nessun catalogo/report.
- `src/demo/model.ts`: policy per attore/agenzia/oggetto/scopo/tempo, versioni e
  comandi distinti `endMembership`, `endRelation`, `revoke`; non c'è rinnovo.
- PRODUCT, DESIGN, DEVELOPMENT, BACKLOG, DECISIONI e `experience-2026-10-14/`:
  comportamento e limiti; confronto nel browser della home 0.5 effettuato.
- EA01–EA30; RF01–RF30, offerte, PF01–PF06, modello logico e fattibilità
  dell'8 ottobre; matrice storico/uscita BF03. Sono specifiche revisionabili,
  non funzionalità operative comprovate dalla demo.

BF02 non viene rigenerato. BF16 resta aperto: opinioni, entusiasmo e urgenza
non sono misure di risparmio o disponibilità a pagare. Nessuna osservazione
comparativa con operatori è stata aggiunta da questi audio.
