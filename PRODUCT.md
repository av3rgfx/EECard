# EECard — prodotto

Aggiornato il 15 ottobre 2026 dopo il chiarimento diretto della visione. Questo documento orienta il lavoro di prodotto nelle sessioni successive; non costituisce un’offerta commerciale né una specifica di produzione approvata.

## Identità e origine

EECard è un nome provvisorio. ƎE è sigla e logo dell’agenzia Enrico Erca, dalla cui collaborazione nasce l’idea. Il prodotto deve avere un marchio autonomo, utilizzabile anche da altre agenzie. Questo conferma una direzione di identità e compatibilità, non definisce il primo cliente pagante o la copertura operativa. Nessun nome esplorato, incluso quello nel riferimento visivo, è approvato. L’utente ha scelto il simbolo C — Legame, ora finalizzato e integrato; “Legame” non è il nome del prodotto.

## Obiettivo e stato

EECard è una piattaforma di servizi per gestire la casa e ciò che la riguarda
nel modo più semplice e intuitivo possibile: accedere alle informazioni,
monitorare, verificare, pagare e richiedere assistenza per burocrazia, documenti,
tecnici, abbonamenti e bollette. Questa motivazione d'acquisto è confermata
direttamente dall'utente il 15 ottobre; catalogo, copertura e condizioni operative
non sono ancora definiti.

La home deve mostrare card, casa, ciò che richiede attenzione subito e un percorso
semplificato per pagare le bollette. Il pagamento fa parte del valore desiderato;
la sola consultazione dell'avviso IN04 non lo realizza. L'agenzia organizza il
servizio e i professionisti intervengono nei rispettivi ambiti. La card identifica
l'accesso al servizio e non è una carta bancaria.

L'utente giudica ancora non corretti home e struttura complessiva del prototipo.
La priorità corrente è riallineare l'esperienza prima di IN05. La
[descrizione aggiornata e struttura candidata](docs/progetto/visione-casa-2026-10-15/README.md)
distinguono le conferme dell'utente dalle proposte di navigazione/home.

La [proposta navigabile del 15 ottobre](docs/progetto/proposta-casa-2026-10-15/README.md)
è ora disponibile a `/#/casa/home`: card/casa/priorità, pagamento simulato completo
e richiesta di assistenza. Usa una sessione isolata, riusa IN01/IN03/IN04 e conserva
lo spazio operativo attuale. Menu e layout restano da valutare; non è una revisione
estesa già approvata e non avvia IN05.

È stato realizzato un prototipo frontend navigabile desktop e smartphone, con design system e dati demo. Il prodotto operativo, il modello commerciale e il perimetro del primo rilascio restano da definire. La richiesta di chiudere la sessione e salvare il lavoro non equivale all’approvazione finale di tutte le proposte.

## Persone e contesti rappresentati

| Persona | Compito nel prototipo | Confine da mantenere |
| --- | --- | --- |
| Proprietario | Seguire immobili, documenti, scadenze, evidenze e richieste | Non accede automaticamente alle bollette personali dell’inquilino |
| Inquilino | Consultare i documenti pertinenti, dichiarare un pagamento, chiedere assistenza | Una dichiarazione non certifica un incasso |
| Agenzia | Gestire code, controlli formali, verifiche e incarichi | Account operativo distinto; nessuna impersonificazione dei clienti |
| Tecnico | Accettare e concludere un incarico assegnato | Nessun accesso generale ad affitti o fascicolo immobiliare |

Una persona può avere relazioni diverse su immobili differenti; il ruolo non è una proprietà globale sufficiente a determinare tutti i permessi. Comproprietari, più inquilini e contesto selezionato sono rappresentati nei dati demo. Le regole attuali sono simulazioni nel browser, non autorizzazioni server.

## Regole semantiche del brief

- Documento caricato, pagamento dichiarato, incasso verificato e quietanza rilasciata sono eventi distinti. La verifica richiede fonte e autore; l’incasso parziale mantiene il residuo.
- La condivisione ha destinatario, durata e revoca espliciti. La verifica formale di un file non certifica validità giuridica o tecnica.
- Il blocco card revoca un identificativo; la sostituzione ne genera uno nuovo senza riattivare il precedente.
- Richiesta ricevuta, assegnazione, lavorazione e conclusione dell’assistenza restano distinguibili.
- Revoca dell’accesso e fine contratto richiedono stati dedicati. Le regole definitive di archivio, conservazione ed esportazione sono aperte.

I percorsi dettagliati e le schermate si trovano in [PERCORSI.md](docs/design/PERCORSI.md).

## Cosa è incluso nella demo

Accesso tramite invito e codice pubblico `123456`; panoramiche per ruolo; più immobili; documenti e condivisioni simulate; affitto e prove di bonifico; utenze; assistenza; consulenze con slot fittizi; card digitale e interesse per card fisica; profilo, notifiche e laboratorio degli stati limite.

Nessun account reale, pagamento, email, upload server, prenotazione o ordine viene eseguito. Importi dei canoni, nomi, indirizzi, operatori e disponibilità sono esempi. Non rappresentano clienti, professionisti convenzionati o copertura commerciale di EECard.

## Decisioni ancora necessarie

| Questione | Informazione necessaria prima di impegnare il prodotto |
| --- | --- |
| Quote e inclusioni | Periodicità, unità, IVA e servizi compresi; i 50 €/15 € nelle fonti non sono un listino confermato |
| Primo cliente | Clienti dell’agenzia, altre agenzie o entrambi; beneficio indispensabile da validare |
| Operatività | Zona, portafoglio del pilota, orari, disponibilità professionisti e gestione fuori orario |
| Fattibilità | Budget, persone, tempi e responsabilità effettive |
| Card fisica e consulenze | Erogazione, costi, destinatari, consegna, sostituzione e calendari |
| Piattaforme e integrazioni | Pagamenti, app negli store, 3D e AI: nessuna disponibilità o rinvio già approvati |
| Dati e accessi | Deleghe, ruoli per immobile, revoca, conservazione e modello di autorizzazione reale |

Il registro dettagliato con ID e provenienza è [DECISIONI.md](docs/design/DECISIONI.md): aggiornare lì lo stato quando arriva una risposta verificabile, poi allineare questa sintesi. Non promuovere una proposta a “confermata” per il solo fatto che appare nel prototipo.

## Design completato e conservato

Evoluzione della qualità visiva e della UX del prototipo: confronto ad alta fedeltà consegnato e scelta esplicita ricevuta. Integrati tessera e materiali di Materia e luce con pagine aperte come Editoriale. La tessera personale precede saluto e riepiloghi per proprietario/inquilino; agenzia e tecnico mantengono il proprio contesto operativo. La home usa riepiloghi compatti degli immobili quando ne sono visibili più di uno; con una sola casa e nella pagina immobili la vista resta espansa. Il percorso affitto rende visibili gli stati esistenti, senza aggiungere funzionalità o disponibilità di servizi. Decisioni e verifiche in [DESIGN.md](DESIGN.md).

## Specifiche funzionali incrementali — 8 ottobre

La [consegna funzionale](docs/progetto/specifiche-2026-10-08/README.md) aggiorna
lo studio a partire dagli EA01–EA30, senza ripetere l'analisi della registrazione.
Contiene requisiti tracciati, due schede di offerta, sei percorsi con criteri,
modello logico, alternative di rilascio, backlog con dipendenze e prove tecniche.
Sono specifiche per revisione; il frontend resta dimostrativo.

La proposta R1 privilegia attivazione al contratto, fascicolo e continuità al banco
per i clienti dell'agenzia iniziale, con isolamento fra agenzie fin dall'inizio.
Il primo pagante non è ancora scelto: lancio B2B o terminale completo richiedono
le dipendenze descritte in [OFFERTE_RILASCIO.md](docs/progetto/specifiche-2026-10-08/OFFERTE_RILASCIO.md).
Le esclusioni da R1 sono proposte motivate, non rinvii approvati di app,
pagamenti, 3D, AI o totem. Nessun prezzo o ricavo è assunto.

L'offerta clienti distingue benefici per proprietario e inquilino, account,
adesione e card; l'offerta agenzie separa software, servizio locale, setup/design,
supporto e hardware. Il proprietario nella propria casa può avere le funzioni
domestiche in base all'intestazione/delega; non acquisisce le bollette del suo
inquilino. L'acquisto del pacchetto non assegna autorizzazioni sui dati altrui.

I [percorsi PF01–PF06](docs/progetto/specifiche-2026-10-08/PERCORSI.md) definiscono
attivazione, ritorno al banco, casa propria/locata, bolletta, documento storico e
bozza contrattuale. Card presentata, bolletta visualizzata e bozza generata non
sono rispettivamente autenticazione, pagamento o contratto stipulato.

I 600 euro annui riguardano alcuni clienti già gestiti, non il listino EECard;
le cifre ambigue restano aperte. Jarvis, destinatari dei due schermi e tipo di
firma richiedono chiarimenti. Fonti ufficiali e protocolli di prova sono in
[FATTIBILITA.md](docs/progetto/specifiche-2026-10-08/FATTIBILITA.md): nessun test
hardware o integrazione è stato eseguito.

EA30 resta un confronto circoscritto di criteri con la 0.3; simbolo, palette e
frontend non cambiano. Le proposte IF e le decisioni aperte DA sono nel
[registro incrementale](docs/progetto/specifiche-2026-10-08/REQUISITI_DECISIONI.md).

## Prossima validazione proposta

Revisionare il beneficio R1 e svolgere la prova PF01 → PF02 → PF05 con due
operatori e fascicoli sintetici: misurare tempo di preparazione, recupero,
correzioni e costo operativo. Soglie, scenari e limiti sono nell'offerta.
Un test del flusso non dimostra disponibilità a pagare; la prova commerciale
richiede condizioni e prezzo espliciti, ancora da definire.

Riferimenti: [studio v0.1](docs/progetto/EECard-studio-v0.1.pdf),
[EA01–EA30](docs/progetto/discussione-2026-10-07/ANALISI_CONVERSAZIONE.md),
[backlog](docs/progetto/BACKLOG.md), [ripresa](docs/progetto/PROSSIMA_SESSIONE.md).


## Prova del beneficio — avanzamento autorizzato

Il successivo «ok bene procedi» avvia la preparazione della prova raccomandata.
Il [kit BF02](docs/progetto/prova-agenzia-2026-10-08/README.md) rende disponibili
due set sintetici, istruzioni e schede di misura. Confronta la ricostruzione
della pratica con un fascicolo organizzato; non attribuisce all'agenzia un modo
di lavorare non osservato. La revisione simulata verifica la coerenza del kit,
mentre benefici di tempo/costo e disponibilità a pagare restano da misurare.

## Strategia demo-prima — 14 ottobre 2026

L'utente ha scelto di costruire una demo funzionante prima delle interviste di
chiarimento. La demo 0.4 deve rendere concreta la sequenza PF01 attivazione →
PF02 ritorno al banco → PF05 recupero storico, così operatori e portatori di
interesse possono indicare su un caso osservabile cosa manca, cosa serve e cosa
eliminare o aggiungere. PF03, PF04 e PF06 sono estensioni sintetiche dello stesso
fascicolo, non servizi attivati.

Il [piano](docs/progetto/demo-funzionale-2026-10-14/README.md) definisce il
perimetro e il [prompt `/goal`](docs/progetto/PROMPT_DEMO_FUNZIONALE.md) guida
l'implementazione. Questa scelta ordina il lavoro di apprendimento; non risolve
prezzi, primo pagante, copertura, responsabilità, conservazione, destinatari
degli schermi, firma, Jarvis o hardware. BF16 resta aperto finché la demo non
viene provata da persone reali e le osservazioni non sono raccolte senza dati
personali nella repository.

## Demo 0.4 implementata — 14 ottobre

La rotta `/#/prova` rende percorribile PF01 → PF02 → PF05 con Alfa/Beta sintetiche,
fonti e correzioni, sessione al banco, storico/versioni e titoli distinti.
PF03/PF04/PF06 sono estensioni locali; inviti, account, adesione e card restano
simulati. Condivisione ed esportazione richiedono azioni proprie. Fine rapporto,
fine adesione e revoca card restano separate; i titoli autonomi si rivalutano.

[Implementazione](docs/progetto/demo-funzionale-2026-10-14/IMPLEMENTAZIONE.md) e
[copione](docs/progetto/demo-funzionale-2026-10-14/COPIONE.md) descrivono ciò che
è effettivamente disponibile e i limiti. La prova umana BF16 è il prossimo passo;
BF02 non è rigenerato. Nessuna misura di risparmio, costo o domanda è disponibile.

## Revisione dell'esperienza 0.5

Il feedback dell'utente rileva che la pagina 0.4 era grezza e poco comprensibile
al primo impatto. La 0.5 porta il lavoro in primo piano: panoramica agenzia,
pratica in quattro passi, banco, ricerca documenti e spazio personale con
tessera dominante. Affitto, utenze, richieste e bozze sono navigabili nello
stesso contesto locale. I controlli di prova sono in un pannello dedicato.

[Esperienza e scelte UX](docs/progetto/experience-2026-10-14/README.md),
[verifiche e limiti](docs/progetto/experience-2026-10-14/VERIFICHE.md).
Nessun servizio reale: è una demo applicativa, non l'approvazione del prodotto
operativo. BF16 rimane aperto e BF02 non è rigenerato.

## Nuovi audio e appunto — studio del 15 ottobre

L'[analisi NA01–NA16](docs/progetto/discussione-2026-10-15/ANALISI.md) precisa
livelli/extra, cambio con conguaglio, disdetta, supporto fisico, acquisizione
bollette e chiamate AI. Le proposte restano revisionabili: preavviso e pro rata
sono contraddittori o incompleti. Nessun listino, copertura o data di lancio.
L'utente conferma report annuale cliente e agenzia **con viste separate**;
contenuto, periodo, fonti e metriche proposti nello
[studio](docs/progetto/discussione-2026-10-15/STUDIO_PROGETTUALE.md).

Primo incremento locale IN01: Cliente 01 gestisce il rinnovo dimostrativo dalla
home personale. Conferma dopo riepilogo, salvataggio verificato, periodo
sintetico conservato; non termina locazione/adesione né revoca card o documenti.
È una prova della UX di uscita, non la definizione di condizioni commerciali.
[Sequenza e accettazione](docs/progetto/discussione-2026-10-15/PIANO_INCREMENTALE.md).
Fonti grezze e trascrizioni restano private. Nessun servizio reale; BF16 aperto.

## IN03 — acquisizione locale delle bollette

Implementato il [percorso da facsimile](docs/progetto/importazione-bollette-2026-10-15/README.md)
nelle Utenze: confronto originale/campi, conferma prima del salvataggio,
duplicato, seconda copia, rettifica con storico e recuperi. Importi e scadenze
seguono la versione della bolletta. Intestazione/delega e titoli di acquisizione
sono distinti da ruolo, mandato, livello commerciale e card.
Le fonti sono facsimili HTML inclusi, non OCR o file reali. Nessun pagamento,
incasso verificato o quietanza generati. IN04 e IN05 restano incrementi successivi,
BF16 aperto. Lo studio audio e IN01 non sono ripetuti.

## IN04 — avviso consultabile

Implementato [Mostra avviso](docs/progetto/mostra-avviso-2026-10-15/README.md)
dall'elenco Utenze e dal dettaglio/versione. Importo, creditore, scadenza,
originale completo e riferimenti testuali sullo stesso telefono; recuperi per
codice assente/illeggibile e formato non supportato. Stato ignoto, domiciliazione
e pagamento indicato non certificano il dovuto o un incasso. Versione superata
esplicita e passaggio alla corrente; consultazione senza modifiche economiche.
Solo facsimili testuali non scansionabili/non pagabili, nessun canale operativo.
IN01/IN03 conservati; prossimo proposto IN05, BF16 ancora aperto.
