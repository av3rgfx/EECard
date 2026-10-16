# Regole del dominio e accettazione

Questi vincoli preservano il significato delle operazioni. Il modello tecnico definitivo deve essere motivato, non copiato da una demo.

## Entità da distinguere

Identità/account; organizzazione/agenzia; casa; relazione persona-casa con validità; mandato/delega/autorizzazione; adesione e periodo; preferenza di rinnovo; tessera/credenziale; servizio e versione dell'offerta; documento e versione; bolletta/dovuto e rettifica; tentativo di pagamento; dichiarazione; evidenza; verifica dell'incasso e allocazione; quietanza; richiesta; preventivo; incarico; appuntamento; evento di audit; report e fonti.

È un modello concettuale iniziale, non l'obbligo di creare una tabella per ogni voce. Il progetto dell'accesso e degli stati deve precedere le operazioni che modificano denaro o visibilità.

## Invarianti

| ID | Regola | Esempio di prova necessaria |
| --- | --- | --- |
| R01 | Autorizzazione sul server per azione, oggetto, agenzia, relazione e validità; negazione predefinita | URL diretto/API di un'altra agenzia negati, anche se si altera l'ID nel client |
| R02 | Ruolo, tessera e pacchetto commerciale non conferiscono dati altrui | Proprietario senza delega non vede bollette dell'inquilino, neppure in ricerca, download, report o export |
| R03 | Delega/condivisione con destinatario, durata e revoca; verifica al momento dell'azione | Revoca fra apertura dettaglio e conferma/download impedisce l'azione; nessuna vecchia sessione aggira il controllo |
| R04 | Originali conservati secondo la policy, versioni tracciate e rettifiche esplicite | Duplicato non crea nuovo dovuto; correzione rende superata la versione precedente e impedisce di pagarla |
| R05 | Estratto, dichiarato, evidenza, incasso verificato e quietanza sono distinti | Upload o clic «ho pagato» non saldano il dovuto e non producono quietanza |
| R06 | Denaro con unità/valuta e arrotondamenti espliciti; residui e storni | Pagamento parziale lascia residuo; rettifica non duplica conteggi né cancella la storia |
| R07 | Pagamento idempotente e riconciliabile con la fonte autorevole | Doppio clic, due dispositivi, timeout, riavvio e callback duplicata non generano due operazioni |
| R08 | Esito ignoto non autorizza un nuovo tentativo potenzialmente duplicato | Dopo timeout interrogare/riconciliare il tentativo; una nuova versione della bolletta non aggira il vincolo |
| R09 | Canale e condizioni reali verificati prima di addebitare | Importo/costi o versione cambiati dopo il riepilogo richiedono un nuovo controllo; redirect e callback non autenticata non provano successo |
| R10 | Stati di servizio separati e persistiti | Richiesta ricevuta solo dopo salvataggio; assegnazione, preventivo accettato, esecuzione e chiusura sono eventi distinti |
| R11 | Rinnovo, adesione, account, card e locazione indipendenti | Disattivare rinnovo non termina automaticamente locazione, accessi autonomi o card; errore di salvataggio non mostra successo |
| R12 | Blocco e sostituzione tessera non riattivano la vecchia credenziale | Vecchio identificativo rifiutato; presentare la card non permette impersonificazione |
| R13 | Fonti, autore, data e motivo delle verifiche rintracciabili | Un operatore autorizzato può ricostruire correzioni e conferme senza sovrascrivere silenziosamente eventi |
| R14 | Dati derivati soggetti ai medesimi permessi e limiti | Ricerca, notifiche, miniature, AI, statistiche e export non rivelano dati non consultabili nell'originale |
| R15 | Report distinti e copertura esplicita | Dato assente non diventa zero; dichiarazione e incasso dello stesso pagamento non si sommano |
| R16 | Fine rapporto non è cancellazione indiscriminata o accesso perpetuo | Rivalutare titoli indipendenti, conservazione e possibilità di esportare per categoria e scopo |

## Requisiti tecnici da progettare e verificare

- Autenticazione e recupero account affidabili, sessioni sicure, permessi operatore per funzione. Valutare autenticazione rafforzata per ruoli/azioni sensibili.
- Database persistente, migrazioni riproducibili, vincoli transazionali, controllo concorrenza e isolamento delle organizzazioni. File privati, validazione di tipo/dimensione/contenuto e download autorizzati.
- Segreti lato server, protezione delle operazioni web pertinenti, validazione degli input, limiti antiabuso, log minimizzati e audit consultabile solo da autorizzati.
- Operazioni esterne con identificativi correlabili, autenticità degli eventi, idempotenza, gestione di ordine/duplicati, riconciliazione e recupero manuale controllato. Nessuna raccolta diretta di dati carta se evitabile attraverso il provider appropriato.
- Localizzazione italiana iniziale, fuso e formato data espliciti, importi non calcolati con errori di precisione. Regole di scadenza commerciali ancora da definire.
- Ambienti sviluppo/test/produzione distinti, seed esclusivamente sintetici, backup e prova di ripristino, monitoraggio degli errori e procedure di rilascio/ritorno alla versione precedente.

Queste sono esigenze di progetto, non attestazioni normative. La valutazione privacy, le responsabilità, la conservazione, i termini dei servizi e l'ammissibilità del modello di pagamento vanno verificate sul caso concreto con fonti aggiornate e responsabili competenti.

## Scenari minimi end-to-end

Nuovo cliente attivato e casa assegnata; una/più case e filtro; recupero documento/versione; importazione corretta/duplicata/rettificata/illeggibile; bolletta pagabile/ignota/domiciliata/indicata pagata; pagamento riuscito/fallito/ignoto con ricarica e riconciliazione; assistenza dal cliente alla presa in carico dell'agenzia e all'incarico limitato; disattivazione rinnovo con esito persistito; revoca durante un percorso; isolamento fra due agenzie e fra due clienti; errore di rete e ripresa senza perdere dati.

I test devono verificare il comportamento osservabile e le violazioni plausibili, non solo rispecchiare funzioni interne. Per ogni requisito realizzato, collegare test, ambiente, risultato ed eventuale limite.
