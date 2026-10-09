# Registro delle decisioni — prodotto e design

Aggiornato il 9 ottobre 2026. Le etichette distinguono richiesta confermata, proposta di design e ipotesi dimostrativa. Nessuna scelta nel prototipo approva il modello commerciale.

**Stato attuale:** dopo i tre esempi separati, l’utente ha scelto tessera/materiali di Materia e luce e struttura delle pagine di Editoriale e architettura. L’ultima richiesta conferma lo stile editoriale attuale e compatta soltanto gli immobili della home quando ne sono visibili più di uno; singolo risultato e pagina immobili restano espansi. Le card non sono vietate in assoluto, ma non è richiesto ripristinarle. Direzione integrata nel frontend 0.3; vedere C14–C18. Le sezioni precedenti conservano la storia delle decisioni, senza riaprire una scelta già ricevuta.

| ID | Stato | Decisione / questione | Conseguenza |
| --- | --- | --- | --- |
| C01 | Confermato dall’utente | Repository av3rgfx/EECard, esperienza desktop e smartphone, qualità premium | PR #3 integrata; confronto e integrazione 0.3 sul nuovo branch design/visual-directions-lab da main aggiornato |
| C02 | Confermato dall’utente | Design system e prototipo frontend navigabile, dati dimostrativi | React frontend; nessun backend, pagamento o messaggio reale |
| C03 | Confermato dal brief | Card come accesso ai servizi, distinta da carta bancaria | Nessun PAN, IBAN, CVV, saldo, circuito bancario o finto checkout |
| C04 | Confermato dal brief | Documento, dichiarazione, verifica, quietanza distinti | Passaggi separati con testo, autore e fonte; incasso parziale mantiene residuo |
| C05 | Confermato dall’utente | Anteprime condivisibili desktop e mobile separate | Due percorsi pubblici sul medesimo sito; sorgenti in EECard |
| C06 | Confermato dall’utente | Chiusura sessione, documentazione persistente e consegna in PR | Punto di ripresa, prodotto/design/sviluppo e backlog aggiornati; nessun merge implicito |
| P01 | Proposta visiva | Bosco, avorio, salvia e lime; Manrope Variable | Identità calma, domestica e precisa; card scura come elemento riconoscibile |
| P02 | Proposta UX | Sidebar desktop, tab bar mobile, pannelli inferiori | Gerarchia mobile diversa: prossima azione prima dei riepiloghi; niente hover obbligatorio |
| P03 | Proposta tecnica del prototipo | Vite + React + TypeScript; Base UI, Motion, Sonner | Stack leggero da avviare e compatibile con i componenti selezionati. Non decide l’architettura di produzione |
| P04 | Proposta UX | Controlli di ruolo espliciti, contesti immobili e destinatari consentiti | L’inquilino non vede le planimetrie patrimoniali; il proprietario non vede le bollette personali; tecnico solo incarichi |
| H01 | Dati dimostrativi | Milano, 3 immobili, persone, date, canoni 950/820 € | Non sono zone coperte, clienti, immobili disponibili o prezzi EECard |
| H02 | Dati dimostrativi | Giulia Rossi comproprietaria di Tortona e inquilina di Brera | Stessa persona, relazioni e permessi diversi per immobile; nessuna delega implicita |
| H03 | Dati dimostrativi | Elena Colombo delegata alla verifica; Marco Ferri/Anna Riva tecnici | Non sono professionisti convenzionati o reperibili realmente |
| H04 | Ipotesi di riferimento | transitions.dev potrebbe essere il dominio inteso | transition.dev restituisce HTTP 503. Nessuna sostituzione tacita, pacchetto inventato o contenuto Pro recuperato |
| H05 | Ipotesi UX | Consultazione della propria documentazione dopo fine rapporto | Regole definitive di conservazione, esportazione e accessi da concordare |
| A01 | Aperto | Quote 50 €/15 €, periodicità, unità, IVA, inclusioni | Nessun listino pubblicato o checkout; i numeri delle fonti non sono interpretati come prezzi mensili/annui |
| A02 | Aperto | Primo cliente, zona, beneficio vendibile, copertura e orari | Nessuna promessa 24/7, SLA, uscita tecnica, gratuità o disponibilità effettiva |
| A03 | Aperto | Budget, persone, tempi, servizio locale / SaaS | Il prototipo non è un preventivo né l’approvazione di un primo rilascio |
| A04 | Aperto | Pagamenti integrati, app negli store, 3D, AI | Né disponibilità né rinvio approvati. Da valutare secondo beneficio, partner, costi e vincoli |
| A05 | Aperto | Card fisica: costi, stampa, consegna, sostituzioni | Si registra soltanto un interesse demo, senza ordine reale |
| A06 | Aperto | Consulenza: platea, durata, inclusioni, competenza e calendario | Slot esplicitamente fittizi; annullamento locale senza inviti esterni |

## Confine del prototipo

Lo stato è salvato in localStorage e condiviso fra i ruoli della stessa demo nel medesimo browser. Il cambio di ruolo è uno strumento di presentazione, non un sistema di autenticazione. Il codice di invito 123456 è pubblico e dimostrativo. I file selezionati non vengono letti o inviati: se ne conserva solo il nome. Non utilizzare dati personali reali.

La condivisione aggiorna i permessi simulati e mostra durata/revoca; non genera URL pubblici, invia email o applica una scadenza server. Le quietanze sono facsimili senza valore. Il blocco revoca l’identificativo locale, la sostituzione ne genera uno nuovo senza riutilizzare il precedente.

La verifica di un documento è formale e attribuita all’operatore demo: non certifica validità giuridica, urbanistica o tecnica. Caricamenti malware, deduplicazione, pagamenti multipli e allocazioni su più rate richiedono backend e regole successive. Il prototipo rende visibile un incasso parziale/eccedente, senza simulare riconciliazioni bancarie automatiche.

## Aggiornamento — identità autonoma, prima tappa

| ID | Stato | Decisione / questione | Conseguenza |
| --- | --- | --- | --- |
| C07 | Confermato dall’utente | EECard provvisorio; ƎE appartiene all’agenzia Enrico Erca | Prodotto con marchio autonomo e utilizzabile da altre agenzie |
| C08 | Confermato dall’utente, completato | Presentare 2–3 direzioni, attendere scelta prima della finalizzazione | Tre simboli presentati; poi C scelto esplicitamente |
| C09 | Confermato dall’utente | Il riferimento orienta colore e geometria, non approva scritte o nomi | “quey” non adottato; chiedere il nome prima del marchio testuale |
| P05 | Proposta visiva | A Soglia / B Casa accolta / C Legame; albicocca e bruno | [Confronto e motivazioni](LOGO_DIREZIONI.md); A consigliata, non selezionata |
| P06 | Proposta tipografica | Manrope locale come famiglia geometrica simile | Neo Geometric suggerito ma distribuzione/licenza non identificata |
| A07 | Parzialmente risolto | C Legame scelto; nome ancora da confermare | Simbolo finalizzato e integrato; wordmark in attesa del nome |

P01 descrive la base storica, sostituita dall’identità 0.2; non è la palette corrente. Nessun nuovo prezzo, servizio o ambito operativo introdotto.

## Scelta e finalizzazione del simbolo

| ID | Stato | Decisione / questione | Conseguenza |
| --- | --- | --- | --- |
| C10 | Confermato esplicitamente dall’utente | «Scelgo il logo C Legame. Il nome rimane ancora da confermare» | C finalizzato; “Legame” non diventa il nome del prodotto |
| P07 | Esecuzione di design da revisionare | Palette albicocca/bruno, avorio, terracotta accessibile, Manrope locale | Implementata nelle schermate, nei pannelli, nella tessera e nelle anteprime |
| P08 | Esecuzione di design | Master regolare e ottico 16–31 px, quattro colori, favicon SVG/PNG | [Guida e asset](MARCHIO.md); nessuna composizione con nome |

P01 e l’implementazione bosco/lime sono superati. P05 resta lo storico del confronto; la scelta C sostituisce la raccomandazione iniziale A.

## Chiusura — nuova priorità di qualità visiva

| ID | Stato | Decisione / questione | Conseguenza |
| --- | --- | --- | --- |
| C11 | Confermato dall’utente, implementato nella 0.3 | «La card deve essere la prima cosa che vedi quando accedi» | Tessera prima di saluto/riepiloghi nella home personale, con stato e gestione. Supera P02 nell’ordine tessera/riepilogo; agenzia e tecnico mantengono gli spazi operativi |
| C12 | Confermato dall’utente | Grafica più accattivante, ricca, dinamica e animata; UX come soluzione visiva dei processi | Nuovo obiettivo della prossima sessione, non approvazione dell’esecuzione attuale |
| C13 | Confermato dall’utente, completato | Esempi prima delle modifiche, poi conferma o richieste di modifica | Tre esempi separati realizzati; successiva scelta esplicita ricevuta, registrata in C14–C15 |
| P09 | Confronto storico, risolto da C14–C15 | Materia e luce / Editoriale e architettura / Luce e profondità | Tre esecuzioni ad alta fedeltà; l’utente sceglie una combinazione di Materia ed Editoriale, senza selezionare Profondità |
| P10 | Proposte UX/movimento | Processo affitto con fase/autore/azione, timeline assistenza, documenti più riconoscibili | Solo rappresentazioni di funzioni esistenti; ricette in REVISIONE_VISIVA.md da valutare negli esempi |

La chiusura precedente aggiornava solo documentazione, revisione e PR #3, lasciando allora frontend e Sites v3 invariati. Nome ancora aperto; simbolo C confermato.

## Confronto concreto — passaggio completato

P09 dispone di [tre esecuzioni interattive](esplorazioni/README.md), realizzate separatamente in `design-lab/`: stessi dati, home desktop/mobile, tessera, processo affitto, demo animata, stato critico e movimento ridotto. La raccomandazione iniziale era Materia e luce. L’utente ha poi espresso la scelta combinata seguente, soddisfacendo C13. La PR #3 è integrata; laboratorio e integrazione partono da main su un nuovo branch.

## Scelta esplicita e integrazione 0.3

| ID | Stato | Decisione / questione | Conseguenza |
| --- | --- | --- | --- |
| C14 | Confermato esplicitamente dall’utente | Tessera e materiali di Materia e luce + struttura delle pagine di Editoriale e architettura | Tessera bruna materica, composizione editoriale, tipografia e fotografie integrate nel frontend 0.3 |
| C15 | Confermato esplicitamente dall’utente | Evitare contenitori a scheda ripetuti; contenuti a tutta larghezza come nel riferimento di processo fornito | Liste e sezioni sulla pagina, separate da spazio e righe; volume riservato agli oggetti e controlli che lo richiedono |
| C16 | Autorizzato dall’utente dopo la scelta | Integrare, verificare nel browser, aggiornare documentazione e anteprime sullo stesso sito Sites, salvare sul remoto e preparare la PR senza merge | Nessun nuovo consenso richiesto per completare questi passaggi; registrare esiti e commit online nei rapporti, senza considerarli conclusi per la sola autorizzazione |
| P11 | Esecuzione della direzione approvata | Indicatore condiviso dei quattro passaggi affitto, testo della fase e feedback locale | Stati esistenti invariati; marcatori non interattivi, importi immediati, fonte/autore, residuo e quietanza separata conservati |

`src/editorial.css` applica la composizione 0.3; i token esistenti governano colori semantici e movimento. Agenzia e tecnico non acquisiscono una tessera personale. Le scelte non confermano naming, prezzi, servizi, copertura, integrazioni o autorizzazioni server. Verifiche effettive in [VERIFICHE.md](VERIFICHE.md), pubblicazione e commit realmente online in [ANTEPRIME_WEB.md](ANTEPRIME_WEB.md).

## Precisazione successiva — densità della home

| ID | Stato | Decisione / questione | Conseguenza |
| --- | --- | --- | --- |
| C17 | Precisato esplicitamente dall’utente | Le card sono ammesse per oggetti consultabili; azioni, form e passaggi operativi non richiedono contenitori annidati | Precisa C15 e supera una sua interpretazione come divieto generale delle card; non introduce nuovi pagamenti o processi |
| C18 | Ultima scelta esplicita dell’utente, implementata | Mantenere lo stile editoriale attuale; rendere più compatti solo gli immobili della home quando ne sono visibili più di uno | Nessun ripristino di card immobili. `.home-properties-compact` dipende da `activeHouses.length > 1`; immagine ridotta a sinistra, testo a fianco, nessun nuovo fondo o cornice. Un solo risultato visibile e pagina “Vedi immobili” restano espansi |

C18 sostituisce l’ipotesi intermedia di ripristinare le schede immobili. Il conteggio riguarda i risultati del contesto corrente, dopo ruolo e filtro, non tutti gli immobili presenti nei dati. Tessera iniziale, flussi, permessi, dati demo e stati operativi restano invariati. La registrazione dell’implementazione non dichiara un nuovo deploy: l’esito della pubblicazione resta in ANTEPRIME_WEB.md.

## Conversazione del 7 ottobre - nuovi input analizzati l'8 ottobre

| ID | Stato | Contenuto / conseguenza |
| --- | --- | --- |
| C19 | Richiesta esplicita dell'utente | Analizzare audio completo e repository, schematizzare nuove idee/migliorie e preparare file/prompt per una nuova sessione. Autorizza analisi e documentazione, non l'implementazione automatica di tutte le idee |
| EA01-EA30 | Fonti discusse, con novità/precisazioni/riprese | [Catalogo integrativo](../progetto/discussione-2026-10-07/ANALISI_CONVERSAZIONE.md): intervalli, differenze, proposte e punti aperti. Non promuovere il catalogo a specifica approvata |
| A08 | Aperto | Quote clienti e offerta partner: prezzo/unità/periodo/inclusioni. Importo a 23:17 instabile; 600 euro annui riferiti ad alcuni clienti già gestiti, non a EECard |
| A09 | Aperto | Terminale al banco, destinatari dei due schermi, wallet/contactless, tipo di firma e compatibilità; nessun componente/provider scelto |
| A10 | Aperto | Domotica, assistente Jarvis e bozze contrattuali: scopo, dati, responsabilità, dipendenze e eventuale progetto preesistente |
| A11 | Nuovo spunto da chiarire | Bianco/rosso molto tecnologico nell'audio; tonalità e ambito aperti. Non sostituisce automaticamente C10/C14-C18 né il design system 0.3 |

Il nuovo input sulle funzioni domestiche del proprietario conserva la
riservatezza delle bollette dell'inquilino (EA20/EA22). Il marchio di sistema
insieme alla card personalizzata dei partner è una proposta da definire, senza
un naming approvato o una nuova scelta del simbolo. I 30/60 giorni riferiti a
documenti comunali e i dieci giorni nel confronto B2B sono esempi del dialogo,
non regole generali o stime di sviluppo.


## Ripresa funzionale dell'8 ottobre — specifiche per revisione

| ID | Stato | Contenuto / conseguenza |
| --- | --- | --- |
| C20 | Richiesta esplicita dell'utente | Proseguire specifiche e preparazione dello sviluppo, offerte senza prezzi, sei percorsi, primo rilascio proposto, dati, backlog e fattibilità. Autorizza consegna verificabile nel repository, non attivazioni operative o merge |
| C21 | Vincoli ribaditi dall'utente | Conservare naming provvisorio, C–Legame, 0.3, riservatezza e quattro significati dei pagamenti; cifre ambigue, Jarvis, schermi e firma aperti |
| RF01–RF30 | Specificati, stato V/P/A per riga | [Registro con collegamento EA](../progetto/specifiche-2026-10-08/REQUISITI_DECISIONI.md). Copertura documentale non equivale ad approvazione o implementazione |
| IF01–IF06 | Proposte e vincoli distinti nel registro | R1 centrato sul fascicolo/banco, identità e adesione separate, card come selettore, schermo condiviso circoscritto e bozze revisionabili; nessuna scelta hardware/provider |
| DA01–DA07 | Aperte | Primo beneficio, condizioni commerciali, destinatari schermi, documenti/tipo firma, Jarvis, risorse e ambito EA30; non risolte per deduzione |

PR #5 verificata integrata alle 19:32:22 UTC; nuovo branch documentale da main
`a8e0ca7`. [Elaborati](../progetto/specifiche-2026-10-08/README.md),
[backlog dipendenze](../progetto/specifiche-2026-10-08/OFFERTE_RILASCIO.md) e
[prove tecniche](../progetto/specifiche-2026-10-08/FATTIBILITA.md).
C10/C14–C18 restano la direzione visiva: il confronto di criteri EA30 non è una
nuova tavola visiva né una scelta dell'utente. Nessuna modifica al prototipo.


## Proseguimento — preparazione della prova

| ID | Stato | Contenuto / conseguenza |
| --- | --- | --- |
| C22 | Autorizzazione dell'utente: «ok bene procedi» | Avanzare sulla prova proposta di attivazione, banco e recupero storico; preparati kit BF02 e revisione simulata. R1 è il perimetro di lavoro della prova; prezzi, primo pagante, Jarvis, schermi e firma non sono risolti da questa risposta |
| P12 | Esecuzione progettuale della prova | Due set equivalenti di dodici casi, due operatori controbilanciati, facilitatore, modelli di misura vuoti; verifica AI separata dalle osservazioni umane e dai test server |

[Kit](../progetto/prova-agenzia-2026-10-08/README.md) e
[rapporto](../progetto/prova-agenzia-2026-10-08/ESITO_SIMULAZIONE.md).
All'8 ottobre la PR #6 era aperta e veniva aggiornata. Verificata integrata
il 9 ottobre alle 08:18:43 UTC; la chiusura della sessione non aggiunge decisioni
di prodotto o cambi visivi. Il merge non equivale a validazione della prova BF16.

## Ripresa BF16 del 9 ottobre — ambito autorizzato e stato

| ID | Stato | Contenuto / conseguenza |
| --- | --- | --- |
| C23 | Richiesta esplicita dell'utente | Verificare PR #7, seguire il prompt corrente, ripartire da BF16 senza rifare BF02, analizzare osservazioni disponibili o guidarne la raccolta e proseguire gli approfondimenti documentali indipendenti; consegna nel repository, nessun servizio reale o merge |
| P13 | Proposta tecnica preliminare, non approvazione BF03 | [Contratti PF01/PF02/PF05](../progetto/validazione-bf16-2026-10-09/CONTRATTI_PRELIMINARI.md), matrice permessi, [storico/uscita](../progetto/validazione-bf16-2026-10-09/STORICO_USCITA.md) e prove future da revisionare con BF01 e riscontri BF16; nessuna API o scelta di provider implementata |

[Rapporto della ripresa](../progetto/validazione-bf16-2026-10-09/README.md):
PR #7 integrata alle 23:19:16 UTC, main `c77dfd4`, nuovo branch dedicato.
Nessuna osservazione reale disponibile nei materiali consultati; la richiesta
di indicarne lo stato non riceve qui una risposta utilizzabile come misura.
BF16 resta aperto. DA01–DA07 e A01–A11 conservano i rispettivi stati; C23
non risolve prezzi, pagante, risorse, Jarvis, schermi o firma. Identità, direzione
0.3, riservatezza, quattro eventi economici e residuo parziale restano invariati.

Il successivo «procedi» prosegue C23 sulla stessa PR #8. Le copie esterne
pronte e l'approfondimento di P13 non forniscono osservazioni umane, non
assegnano termini di conservazione o responsabilità e non chiudono BF03/BF16.
La distinzione conservazione/accesso/consegna approfondisce i vincoli esistenti;
nessun nuovo permesso reale o modifica alla direzione 0.3.
