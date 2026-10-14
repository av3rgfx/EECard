# Backlog di continuità EECard

Aggiornato il 14 ottobre 2026 con la strategia demo-prima. Le priorità seguenti sono una proposta di sequenza, non un impegno di rilascio. Nessuna persona, costo o data è stata assegnata; BF propone ruoli responsabili. PR #8 integrata alle 06:49:01 UTC; piano demo da main `adacdab` sul branch `docs/piano-demo-funzionale-2026-10-14`.

## Completato nella sessione

| ID | Risultato | Evidenza |
| --- | --- | --- |
| D01 | Prototipo desktop/mobile per proprietario, inquilino, agenzia e tecnico | [Percorsi](../design/PERCORSI.md) e codice frontend |
| D02 | Design system, card e adattamenti delle risorse richieste | [Design system](../design/DESIGN_SYSTEM.md), [fonti](../design/FONTI.md) |
| D03 | Browser QA e correzioni per accessibilità, movimento, errori e dati limite | [Verifiche](../design/VERIFICHE.md): 15 test, 24 scansioni aggiuntive |
| D04 | Due anteprime web condivisibili e HTML autonomo | [Anteprime](../design/ANTEPRIME_WEB.md) |
| D05 | Documentazione per proseguire in più sessioni | PRODUCT.md, DESIGN.md, DEVELOPMENT.md e [punto di ripresa](PROSSIMA_SESSIONE.md) |

## Prossime attività proposte

| ID | Priorità proposta / stato | Attività | Criterio di completamento |
| --- | --- | --- | --- |
| N01 | Design conservato · specifiche, kit e piano demo preparati | V01–V05 restano completati; RF01–RF30, PF01–PF06, modello, backlog BF, kit BF02 e piano demo 0.4 consegnati | Implementare la demo prima della prova BF16; BF01 commerciale resta aperto |
| N02 | Alta · da fare su hardware | Verificare iPhone/Safari, Android/Chrome e screen reader | Dispositivo/browser annotati; tastiera, safe area, zoom, rotazione, focus e annunci controllati; problemi riprodotti e corretti |
| N03 | Alta · in attesa di informazioni | Chiarire quote, primo cliente, zona, beneficio iniziale, copertura e risorse | Risposte con provenienza nel [registro decisioni](../design/DECISIONI.md); nessun numero dedotto dal prototipo |
| N04 | Dopo N01/N03 · da definire | Scegliere il perimetro del primo rilascio operativo | Percorso prioritario, esclusioni esplicite e criteri di accettazione concordati |
| N05 | Modello e approfondimento BF03 preliminari; aperto dopo N04 | Revisionare i contratti PF01/PF02/PF05 e completare il perimetro tecnico | [Allegato BF03](validazione-bf16-2026-10-09/CONTRATTI_PRELIMINARI.md): matrice azione/oggetto e prove future; nessuna architettura approvata o implementazione |
| N06 | Dopo N05 · da implementare | Realizzare la prima funzionalità operativa completa | UI, server, dati, errori e test integrati secondo il perimetro scelto; demo separata dai dati reali |
| N07 | Quando cambia il frontend | Aggiornare QA, screenshot e anteprime | Report coerenti col commit e deploy verificato sul sito esistente |
| N08 | Con architettura reale · da valutare | Prestazioni, bundle e automatizzazione dei controlli | Misure e scelta motivata; nessuna CI o suddivisione del bundle aggiunta solo per supposizione |
| N09 | Completato come demo locale 0.4 | Realizzare la demo funzionale 0.4 secondo il [piano](demo-funzionale-2026-10-14/README.md) e il [prompt `/goal`](PROMPT_DEMO_FUNZIONALE.md) | PF01 → PF02 → PF05 continuo, due agenzie sintetiche, permessi, storico/versioni, revoche, errori, reset e modalità prova; nessun servizio reale |
| N10 | Dopo N09 · prova umana BF16 | Far provare la demo agli operatori e raccogliere osservazioni anonime prima delle domande di approfondimento | Versione demo, compiti, esiti, blocchi, aiuti e proposte registrati; vuoto non equivale a zero, kit BF02 non rigenerato |
| N11 | Dopo N10 · revisione del perimetro | Ordinare correzioni e aggiunte emerse dalla prova e riesaminare BF01/BF03/BF17 | Decisioni attribuite, problemi separati da preferenze, nessun prezzo o lancio dedotto dalla sola demo |

Pagamenti integrati, app negli store, 3D, AI, card fisica e calendario dei consulenti restano questioni aperte: non sono automaticamente esclusi, promessi o pianificati.

## Come aggiornare

Mantenere gli ID stabili; collegare commit/PR e prove quando una voce è completata. Distinguere “da fare”, “in attesa di informazioni” e “completato”. A fine sessione descrivere qui il lavoro residuo concreto, senza lasciare “completato” un controllo invalidato da modifiche successive.

## Evoluzione identità — dalla proposta alla scelta

| ID | Stato | Attività / evidenza |
| --- | --- | --- |
| I01 | Completato | Rilettura contesto, PR #2 integrata, nuovo branch da main |
| I02 | Completato come proposta | Tre direzioni SVG, varianti colore/mono, prove piccole e [guida di studio](../design/LOGO_DIREZIONI.md) |
| I03 | Completato | Correzioni indipendenti: leggibilità, skip link, ricerca/focus, menu Altro, icona tessera; 17 test passati |
| I04 | Scelta simbolo completata; naming aperto | Utente: C Legame, nome ancora da confermare |
| I05 | Completato per il solo simbolo | Master regolare/ottico, varianti, favicon, guida e ZIP; nuova identità integrata in tutta la UI |
| I06 | Completato per l’identità senza nome | Nuova QA, screenshot, anteprime sul sito esistente e PR #3 aggiornata senza merge |

Le anteprime di questa prima tappa mantengono l’identità precedente nel frontend e aggiungono il confronto in `/identita/`; non sono la consegna definitiva del nuovo marchio.

## Residuo dopo C Legame

I01–I06 coprono il lavoro autorizzato sul simbolo e sull’identità visiva. Restano: conferma del nome e solo dopo composizione del wordmark; feedback sui dettagli esecutivi della palette/UI; verifiche hardware N02 e decisioni commerciali N03–N06 già aperte. Non riaprire il confronto A/B/C salvo nuova richiesta dell’utente. Il testo sopra sulla “prima tappa” descrive il checkpoint storico, non lo stato corrente.

## Prossima sessione — qualità grafica e tessera protagonista

| ID | Stato | Attività / criterio |
| --- | --- | --- |
| V00 | Completato, sola analisi | [Revisione](../design/REVISIONE_VISIVA.md), misure home 390/1440, proposte UX/movimento, prompt e punto di ripresa aggiornati; frontend invariato |
| V01 | Completato come proposta · 6 ottobre | Presentare 2–3 esempi ad alta fedeltà, home desktop/mobile con tessera prima, dettaglio card, processo esistente, demo animata e variante ridotta; stessa base dati, area separata dal prodotto |
| V02 | Completato · scelta esplicita | Raccogliere conferma o modifiche dell’utente; nessuna implementazione globale prima della scelta |
| V03 | Completato · Materia + composizione Editoriale | Integrare la direzione approvata: composizione, materiali, immagini, tipografia, gerarchie e movimento utile; preservare flussi e stati |
| V04 | Completato · Sites v4, PR #4 senza merge | QA pertinente, screenshot e stesso Sites aggiornati; documentare sorgente online, commit remoto e PR senza merge |

La posizione prioritaria della tessera è confermata. L’utente ha scelto Materia e luce con pagine aperte come Editoriale. Il nome resta aperto. V01–V04 sono completati; la correzione successiva V05 è registrata sotto. N03–N06 restano fuori dal lavoro di design concluso.

## Confronto ad alta fedeltà consegnato

V01: [tre direzioni interattive isolate](../design/esplorazioni/README.md), ciascuna con home 1440/390, dettaglio tessera, affitto, movimento, stato critico e reduced motion. 27 combinazioni axe senza violazioni, controlli keyboard/errore/residuo/blocco e HTML offline passati. Scelta successiva ricevuta: **Materia e luce con contenuti editoriali senza card ripetute**. V02 completato; integrazione autorizzata ed eseguita. PR #3 integrata, nuovo branch `design/visual-directions-lab`. Prodotto integrato; stato del deploy e remoto nei registri di chiusura.


## Integrazione della scelta

V03: tessera prima in home, sezioni aperte per tutte le aree, fotografie a tutta colonna, affitto leggibile in quattro passaggi reali, focus del nuovo passaggio e movimento localizzato. Corretto il collegamento agenzia alla tessera personale del proprietario: home operativa, nessuna tessera nel menu o via URL diretto. Nessuna nuova funzionalità o variazione del modello dati.

V04: 18 test esistenti e regressione home/ruoli, audit24, screenshot e build delle anteprime rigenerati. [Verifiche](../design/VERIFICHE.md) e [pubblicazione](../design/ANTEPRIME_WEB.md). Residuo: feedback utente sul risultato integrato, hardware N02, naming e decisioni commerciali già aperte.

Pubblicazione confermata: Sites v4 da `eea7a954c36607baffdbac82797466cdb329e435`; [PR #4](https://github.com/av3rgfx/EECard/pull/4) pronta alla revisione. Nessun merge.


## Precisazione successiva — densità della home

| ID | Stato | Attività / evidenza |
| --- | --- | --- |
| V05 | Completato · Sites v5, stessa PR #4 senza merge | Stile aperto confermato. Immobili compatti solo in home quando il contesto visibile ne contiene più di uno; una sola casa e pagina «Vedi immobili» mantengono la vista espansa. Nessun ripristino delle card |

Il primo chiarimento ammetteva le card per gli oggetti del prodotto; la richiesta successiva conferma però la preferenza per la versione aperta. Prevale quest’ultima scelta. I flussi operativi restano invariati; il riferimento al pagamento di una bolletta è un esempio di presentazione, non autorizza un nuovo flusso di pagamento.

V05 pubblicato dal commit `65ac9e092c17d9113d85106fa3d04fbb9770cab5`; controlli mirati in [VERIFICHE.md](../design/VERIFICHE.md), sorgente e deployment in [ANTEPRIME_WEB.md](../design/ANTEPRIME_WEB.md).

Checkpoint del 6 ottobre: sessione allora conclusa con PR #4 pronta alla revisione,
senza merge eseguito dall'assistente. Il remoto è stato verificato l'8 ottobre:
PR #4 integrata. Il nuovo obiettivo è l'analisi della conversazione e lo studio
incrementale registrati sotto.

## Conversazione del 7 ottobre - studio incrementale

Fonti e conseguenze: [EA01-EA30](discussione-2026-10-07/ANALISI_CONVERSAZIONE.md).
Le righe seguenti organizzano il lavoro proposto, non approvano funzioni o date.

| ID | Stato | Attività | Criterio di completamento |
| --- | --- | --- | --- |
| S01 | Analisi completata | Confronto audio completo/repository, catalogo, contesto e prompt | 30 punti con intervalli, distinzione novità/riprese, cifre incerte e regole conservate |
| S02 | Da chiarire · prima delle specifiche finali | Beneficio, primo pagante, quote, unità, periodicità, copertura e risorse | Risposte attribuite; distinguere 600 euro annui dei clienti già gestiti dal listino EECard |
| S03 | Specifiche preparate; condizioni aperte | Definire offerte clienti/agenzie e card personalizzate | Inclusioni, setup/design, software, supporto, card e hardware distinti; nessun ricavo previsto senza evidenza |
| S04 | PF01/PF02 specificati; da collaudare | Specificare attivazione al contratto e ritorno al banco | Parti, dati, permessi, card revocata, operatore e riepilogo del secondo schermo definiti |
| S05 | Fonti verificate; FT01–FT06 da eseguire | Verificare wallet/contactless, terminale e firma | Componenti compatibili e prove effettive; pass salvato distinto da lettura NFC; tipo di firma deciso |
| S06 | PF03–PF05 e modello proposti | Estendere modello domestico/fascicolo e cronologia lavori | Casa propria e locata, bollette private, metadati storici e provenienza; domotica delimitata per caso d'uso |
| S07 | PF06 specificato; Jarvis aperto, FT07–FT08 da eseguire | Specificare assistente e bozze contrattuali | Eventuale progetto esistente, dati consentiti, template/versioni, controllo umano e responsabilità |
| S08 | Confronto di criteri; ambito/tonalità aperti | Valutare bianco/rosso tecnologico rispetto alla 0.3 | Esempio circoscritto, tonalità e ambito chiariti; nessun cambio automatico di simbolo/palette |

N03-N06 restano aperti. La prossima sessione deve usare la nuova analisi senza
rifare da zero il design concluso o trasformare le ipotesi dello studio v0.1 in
decisioni. Nessun nuovo test UI o deploy è attribuito alla consegna documentale.


## Consegna funzionale dell'8 ottobre e residuo eseguibile

[Indice della specifica](specifiche-2026-10-08/README.md). Completati come
elaborati: RF01–RF30 tracciati agli EA, due offerte senza prezzi, sei percorsi PF
con criteri, modello logico e otto protocolli tecnici FT. Il registro distingue
vincoli, proposte IF e decisioni DA. Nessuna voce di implementazione BF è data
per completata dalla sola scrittura della specifica.

Il [backlog BF01–BF18](specifiche-2026-10-08/OFFERTE_RILASCIO.md) è la sequenza
operativa proposta con dipendenze, ruoli e criteri osservabili. Mantiene gli
ID N/S storici senza crearne una versione concorrente.

| Ordine proposto | Attività concreta | Dipendenza / risultato verificabile |
| --- | --- | --- |
| Preparazione disponibile | BF01 beneficio per la prova e BF02 kit sintetico | Beneficio fascicolo/banco adottato per l'esercizio; due set e schede consegnati. Primo pagante e scelta commerciale ancora aperti |
| Dopo revisione perimetro | BF03 contratti di servizio e matrice permessi | PF e modello tradotti in azioni/oggetti con casi ammessi e negati; nessun dato reale |
| Fondazioni e nucleo R1 | BF04–BF09 identità, archivio, attivazione, banco, contesti e ricerca | Prove server tra agenzie, revoca, storico, fine rapporto e retry; non basta un filtro UI |
| Rami condizionati | BF10 bolletta, BF11 wallet, BF12 terminale, BF13 firma, BF14 bozza/AI, BF15 partner | Entrano nella sequenza critica se essenziali al beneficio; schermi, atti, Jarvis e costi aperti |
| Validazione | BF16 prova comparativa, BF17 condizioni operative | Misure reali della prova e nessun difetto critico; catalogo/copertura/risorse espliciti |
| Solo dopo scelta di lancio | BF18 pilota operativo | Servizi e dati reali autorizzati, ambiente separato e responsabili definiti |

Prossimo risultato richiesto: prova guidata PF01 → PF02 → PF05 con due operatori,
misure prima/dopo e fascicoli sintetici; il protocollo estende poi il confronto
ai casi PF03/PF04/PF06. Una prova di comprensione non sostituisce test server,
collaudo hardware o validazione di disponibilità a pagare. Nessun rinvio di
pagamenti, app, 3D, AI o totem è registrato come scelta dei fondatori.


## Proseguimento autorizzato — kit della prova BF02

L'utente ha risposto «ok bene procedi» alla proposta di prova guidata.
[Kit e protocollo](prova-agenzia-2026-10-08/README.md): set A/B con dodici scenari
equivalenti, materiali per due operatori e facilitatore, schema di 48 esecuzioni,
misure/costi vuoti e strumenti locali. [Esito della revisione simulata](prova-agenzia-2026-10-08/ESITO_SIMULAZIONE.md).

- BF02: preparazione consegnata, controlli nel rapporto del kit.
- BF01: beneficio fascicolo/banco adottato per la prova; scelta commerciale del
  primo pagante, catalogo, prezzo e risorse ancora da completare.
- BF16: preparato, misure con operatori reali ancora da raccogliere. La revisione
  con assistenti AI non equivale alla prova comparativa e non chiude le soglie.
- BF03–BF15/BF17–BF18: stati operativi invariati; nessun backend, hardware o
  lancio è realizzato dalla generazione dei materiali.

Il prossimo risultato è un registro osservato della prova, con risposte,
fallimenti, tempi e costi mancanti dichiarati, senza dati personali nella PR.

## Chiusura del 9 ottobre e istruzioni di ripresa

La PR #6 è integrata. [Prompt della prossima sessione](PROMPT_NUOVA_SESSIONE.md)
e [stato corrente](PROSSIMA_SESSIONE.md) evitano di ripetere la preparazione già
conclusa. BF02 resta consegnato, BF16 attende operatori e osservazioni effettive.
BF03 non è approvato o completato dalla chiusura: contratti di servizio e matrice
permessi vanno preparati secondo le dipendenze del backlog, come proposte.
In assenza di misure non inventare una prova né ricreare i set: guidare la
raccolta e proseguire solo approfondimenti documentali indipendenti.

## Ripresa BF16 del 9 ottobre — raccolta e contratti preliminari

[Rapporto e verifiche](validazione-bf16-2026-10-09/README.md). PR #7 verificata
integrata prima del checkout; nuovo branch da main, nessun merge. Nei materiali
consultati non ci sono osservazioni reali: il modello resta a 48 righe
`non_eseguita`. Non si deduce che l'agenzia non abbia svolto attività altrove.

| Voce | Avanzamento documentale | Prossima evidenza necessaria |
| --- | --- | --- |
| BF02 | Kit consegnato, riutilizzato senza rigenerare set o materiali | Nessuna nuova preparazione integrale richiesta |
| BF16 | [Guida alla raccolta](validazione-bf16-2026-10-09/RACCOLTA.md), controllo del modello e limiti dell'analizzatore; resta aperto | Processo corrente osservato, versione/condizioni della prova, risposte e misure dei due operatori; separare PF01, PF02, PF05 ed estensioni |
| BF03 | [Approfondimento preliminare](validazione-bf16-2026-10-09/CONTRATTI_PRELIMINARI.md) di comandi/letture, permessi e prove future, con [matrice storico/uscita](validazione-bf16-2026-10-09/STORICO_USCITA.md); resta aperto | Revisione BF01 per l'ambito operativo, riscontri BF16 e politica di accesso storico/conservazione; successiva scelta tecnica |
| BF01/BF17/BF18 | Stati invariati: beneficio per la prova distinto da primo pagante e lancio | Catalogo, condizioni, risorse, implementazioni verificate e autorizzazione esplicita del pilota |

BF04–BF15 non sono implementati da questi documenti. Il primo passo umano è
osservare e descrivere il metodo corrente con il facilitatore, poi raccogliere
i casi del protocollo senza cambiare a posteriori assegnazioni, soglie o
denominatori. Una prova parziale resta tale; gli esiti AI non riempiono i vuoti.

Il successivo «procedi» prosegue sulla PR #8 aperta, da `f013564`: predisposte
sette copie esterne dei materiali, identiche e distinte per destinatario/fase.
La guida propone S01–S04 della fase 1 come avvio contiguo, poi S05–S12 e fase 2;
nessuna nuova prova ridotta o esecuzione umana. Metodo corrente e disponibilità
di due operatori/facilitatore restano da raccogliere. BF16 è aperto.

L'allegato storico/uscita distingue conservare, leggere e consegnare per
categoria/evento, preservando i titoli autonomi ancora validi. BF03/BF17
attendono politica e condizioni esplicite: nessuna durata legale o responsabilità
è assegnata dalla matrice. Kit, frontend e servizi restano invariati.

## Consegna demo 0.4 — 14 ottobre 2026

N09 completato nel perimetro della demo: percorso PF01 → PF02 → PF05, due
agenzie sintetiche, policy centralizzata, dinieghi, errori, versioni, modalità
prova, reset e note locali; PF03/PF04/PF06 esplorabili.
[Implementazione](demo-funzionale-2026-10-14/IMPLEMENTAZIONE.md),
[verifiche](demo-funzionale-2026-10-14/VERIFICHE.md),
[copione](demo-funzionale-2026-10-14/COPIONE.md).

N10/BF16 resta aperto: usare il kit BF02 invariato con supporto/versione demo
annotati, raccogliendo osservazioni anonime reali. N11 segue quei riscontri.
N02 resta aperto per hardware/screen reader. N05/BF03 e condizioni BF17 non
sono completati da policy nel browser. Nessun servizio operativo o merge.

N07 aggiornato per questa consegna: screenshot, HTML autonomo e stesso Sites v6
dal commit `7adeb69`; [PR #11](https://github.com/av3rgfx/EECard/pull/11)
aperta senza merge. N09 non chiude BF04–BF15 operativi: policy nel browser,
fixture e facsimili restano separati da servizi e dati reali.

## Revisione 0.5 dopo il feedback dell'utente

N12: realizzata la revisione dell'esperienza — home orientata al lavoro, pratica
guidata, banco, archivio e spazio personale. Richieste, affitto, utenze e bozze
restano operazioni locali con policy centralizzate.
[Scelte](experience-2026-10-14/README.md) e [verifiche](experience-2026-10-14/VERIFICHE.md).

N10/BF16 resta aperto: verificare con persone reali se scopo e prossima azione
sono comprensibili senza leggere un copione, poi provare percorso completo e
casi negati usando BF02 invariato. N02 hardware/screen reader e questioni
commerciali/operative rimangono aperti. Il giudizio dell'utente sulla 0.4 è
feedback qualitativo, non una misura comparativa.

N12 consegnato nella [PR #12](https://github.com/av3rgfx/EECard/pull/12),
Sites v8 da `448f372`. Verificati 61 test e 60 viste; nessun merge. N10/BF16 e
N02 restano aperti. Nessuna approvazione di servizi operativi o sicurezza server.

## Ripresa richiesta — due audio e appunto (14 ottobre 2026)

- N13 — Da fare: ricevere e verificare due audio e appunto; trascrizione integrale
  privata con timestamp e controllo copertura. Fonti non ancora disponibili.
- N14 — Da fare, dipende da N13: analisi anonima tracciabile, confronto col progetto
  e codice 0.5, studio UX/funzionale/tecnico e piano incrementale con criteri di
  accettazione. Separare decisioni, proposte e dubbi; nessun requisito inventato.
- N15 — Da fare, dipende da N14: primo incremento locale chiaro e reversibile,
  verifiche pertinenti e PR senza merge. Integrazioni reali escluse dal mandato.

[Piano e limiti](PIANO_ANALISI_AUDIO.md). BF02 invariato, BF16 aperto.

## Esito audio/appunto e IN01 — 15 ottobre 2026

La preparazione N13–N15 sopra è storica. Stato corrente:

| ID | Stato corrente | Risultato / residuo |
| --- | --- | --- |
| N13 | Elaborazione locale completa, revisione umana aperta | Due trascrizioni automatiche private con timestamp, voci provvisorie, lacune e controlli; passaggi incerti non promossi a fatti |
| N14 | Studio consegnato | [NA01–NA16, UX, dati, alternative, fattibilità e piano](discussione-2026-10-15/README.md); annual report con due viste confermato, termini/pro rata aperti |
| N15 | Primo incremento locale IN01 | Gestione rinnovo di esempio, persistenza verificata, annullo/reset e dinieghi; [verifiche](discussione-2026-10-15/VERIFICHE.md). Nessun servizio reale |
| N16 | Proposto, prossimo incremento | IN03 acquisizione da facsimile e IN04 avviso; metadati strutturati, originale/conferma, duplicati e permessi prima dell'OCR/pagamento |
| N17 | Destinatari confermati, sviluppo proposto | IN05 report annuali cliente/agenzia separati; definire periodo, fonti, copertura e metriche; nessun totale da dati mancanti |
| N18 | Studio, nessuna attivazione | IN06 promemoria/chiamate AI: stato affidabile del dovuto, destinatari/canali/titoli e responsabilità; anteprima sintetica prima di integrazioni |

N10/BF16 e N02 restano aperti. BF02 intatto; IN01 non chiude BF03/BF17 o le
condizioni di uscita commerciale. N07 aggiornato con verifica e anteprima locale;
il sito pubblico resta alla 0.5 già registrata. Priorità/dipendenze/accettazione
sono nel [piano IN01–IN10](discussione-2026-10-15/PIANO_INCREMENTALE.md).
