# EECard — prodotto

Aggiornato l'8 ottobre 2026. Questo documento orienta il lavoro di prodotto nelle sessioni successive; non costituisce un’offerta commerciale né una specifica di produzione approvata.

## Identità e origine

EECard è un nome provvisorio. ƎE è sigla e logo dell’agenzia Enrico Erca, dalla cui collaborazione nasce l’idea. Il prodotto deve avere un marchio autonomo, utilizzabile anche da altre agenzie. Questo conferma una direzione di identità e compatibilità, non definisce il primo cliente pagante o la copertura operativa. Nessun nome esplorato, incluso quello nel riferimento visivo, è approvato. L’utente ha scelto il simbolo C — Legame, ora finalizzato e integrato; “Legame” non è il nome del prodotto.

## Obiettivo e stato

EECard propone uno spazio per gestire le relazioni legate a un immobile: documenti, locazione, evidenze di pagamento, assistenza e accesso ai servizi. La card rende riconoscibile l’accesso a questo spazio; non è una carta bancaria.

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
