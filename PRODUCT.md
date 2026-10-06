# EECard — prodotto

Aggiornato il 6 ottobre 2026. Questo documento orienta il lavoro di prodotto nelle sessioni successive; non costituisce un’offerta commerciale né una specifica di produzione approvata.

## Identità e origine

EECard è un nome provvisorio. ƎE è sigla e logo dell’agenzia Enrico Erca, dalla cui collaborazione nasce l’idea. Il prodotto deve avere un marchio autonomo, utilizzabile anche da altre agenzie. Questo conferma una direzione di identità e compatibilità, non definisce il primo cliente pagante o la copertura operativa. Nessun nome esplorato, incluso quello nel riferimento visivo, è approvato.

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

## Prossimo passo proposto

Raccogliere feedback sui quattro percorsi principali con proprietario, inquilino e agenzia; identificare il beneficio iniziale da offrire e risolvere il perimetro commerciale. Solo dopo definire una prima funzionalità operativa completa con criteri di accettazione. Non sono assegnati tempi, budget o responsabili non concordati.

Riferimenti: [studio v0.1](docs/progetto/EECard-studio-v0.1.pdf), [brief](docs/progetto/PROMPT_DESIGN.md), [backlog](docs/progetto/BACKLOG.md), [ripresa](docs/progetto/PROSSIMA_SESSIONE.md).
