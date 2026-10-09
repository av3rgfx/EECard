# EECard — offerte, primo rilascio e backlog

Specifica di lavoro dell'8 ottobre 2026. Le due offerte, R1, le soglie di prova
e l'ordine di sviluppo sotto sono **proposte da validare**, non un listino,
un impegno commerciale o un'autorizzazione ad attivare servizi. I percorsi
PF01–PF06 e i loro criteri `PFxx-ACxx` sono definiti in [PERCORSI.md](PERCORSI.md);
le regole trasversali sono `PT-ACxx`. Il [modello logico](MODELLO_DATI.md) e i
suoi criteri `MD-ACxx` completano le dipendenze del backlog. Fonti/stati degli
input sono nel [registro RF/IF/DA](REQUISITI_DECISIONI.md); verifiche ufficiali
e prove ancora necessarie sono in [FATTIBILITA.md](FATTIBILITA.md).

La proposta aggiorna lo [studio v0.1](../EECard-studio-v0.1.pdf), in particolare
catalogo, organizzazione del servizio e pilota (capitoli 5, 7, 12–14), usando
[EA01–EA30](../discussione-2026-10-07/ANALISI_CONVERSAZIONE.md). Il precedente
primo rilascio era più ampio: includeva scadenze, assistenza e consulenza. Qui
si propone di dimostrare prima il valore di **un fascicolo che nasce al
contratto e si ritrova al banco, anche quando cambia l'operatore**. La riduzione
è una nuova raccomandazione motivata da EA02–EA04 ed EA08–EA09, non una decisione
già ricevuta né la cancellazione della visione precedente.

## 1. Scheda offerta clienti

**Beneficio proposto:** avere un punto di accesso personale ai documenti e alle
pratiche pertinenti, ricevere un fascicolo iniziale comprensibile e riprenderlo
con l'agenzia senza ricostruire ogni volta la storia. Si propone un'adesione
volontaria: il rifiuto dell'offerta non deve impedire la consegna di documenti
comunque dovuti alle parti. Il soggetto venditore e le condizioni restano da
confermare (EA01–EA07, EA15, EA27).

Non sono due identità separate per la stessa persona: si distinguono capacità
e benefici nei contesti di proprietà, occupazione, contratto, intestazione e
delega. Le due possibili articolazioni commerciali non attribuiscono nuovi
permessi per il solo fatto che una costa di più.

| Voce | Capacità proposta per il proprietario | Capacità proposta per l'inquilino | Limite e decisione aperta |
| --- | --- | --- | --- |
| Fascicolo e contratto | Documenti dei propri immobili e rapporti, elenco mancanti, versioni e storia pertinente | Contratto e documenti condivisi con la propria parte; accesso personale distinto dai coinquilini | Controllo formale distinto da verifica tecnica/giuridica; nessuna certificazione implicita |
| Ritorno al banco | Richiamare la pratica per casa/contratto e riprenderne le attività | Stesso accesso alle sole pratiche pertinenti | Account individuale dell'operatore e controllo del rapporto; la card non è una password universale |
| Casa abitata | Utenze e bollette se intestatario o delegato, anche quando possiede altre case locate | Utenze e bollette della propria intestazione/delega nel periodo corretto | Il proprietario della casa locata non riceve le bollette personali dell'inquilino, né il subentrante quelle del precedente occupante |
| Documenti storici e lavori | Recupero di documenti tecnici e cronologia dei lavori consentiti, con provenienza e attendibilità | Documentazione pertinente all'uso dell'abitazione quando autorizzata | Una dichiarazione di lavoro non diventa un intervento certificato; acquisizione dagli enti non automatica |
| Evidenze economiche, se incluse | Consultazione/verifica dell'incasso da beneficiario o delegato legittimato; quietanza separata | Caricamento prova e dichiarazione con periodo/importo | Non si promettono riscossione, garanzia del canone o pagamento dalla card; quattro eventi distinti e residuo del parziale conservato |
| Servizi umani ulteriori | Possibili consulenze, coordinamento tecnico e pratiche, ciascuno con un catalogo | Possibili richieste e supporto entro il catalogo sottoscritto | La demo e lo studio non fissano disponibilità, capienza, ore incluse, gratuità o interventi 24/7 |

**Componenti da quotare separatamente, senza importi:**

| Componente | Contenuto proposto | Variabili da definire prima di una vendita |
| --- | --- | --- |
| Servizio dell'agenzia | Attivazione assistita, verifica dei collegamenti, riordino iniziale e successiva gestione del fascicolo | Chi eroga, volume iniziale, aggiornamenti inclusi, prestazioni a richiesta, orari e referente/sostituto |
| Software e adesione | Account, benefici del pacchetto e accessi consentiti; credenziale digitale gestibile | Unità persona/immobile/contratto, durata, rinnovo, IVA, recesso, accessi delle altre parti, limiti di archivio e uscita/esportazione |
| Setup e migrazione | Acquisizione dei dati già raccolti e controllo dei duplicati | Fonti disponibili, qualità, numero di file, costo una tantum o incluso; nessuna API del gestionale presunta |
| Card e confezione | Supporto fisico, eventuale cartellina, consegna e sostituzione | Inclusione al banco o scelta facoltativa, emittente, produzione, attivazione, ritiro/spedizione, smarrimento e resi |
| Hardware | Uso del punto di servizio dell'agenzia, se offerto | Il cliente non acquista implicitamente un terminale; effetti del costo hardware sul pacchetto da esplicitare |
| Supporto | Recupero accesso, correzione relazioni, aiuto all'uso e reclami | Distinguere assistenza al software e gestione dell'immobile; canali, copertura, responsabilità ed eventuali extra |

**Canali proposti.** Al contratto: riepilogo separato della quota EECard, dei
costi di mediazione, del deposito e delle somme della locazione; revisione dei
dati disponibili, inviti individuali e consegna pertinente (PF01). Online:
registrazione e credenziale nello stato previsto dalla verifica, senza accesso
anticipato ai file; associazione a un'agenzia/rapporto da verificare e ordine
fisico eventuale, con costo totale esplicito prima della conferma (EA15). Il
canale online è specificato ma non assunto indispensabile a R1.

**Clienti già gestiti.** Prima di qualsiasi migrazione confrontare il servizio
attuale con quello proposto: prestazioni conservate, aggiunte, eventuali
variazioni e consenso necessario. I **600 euro annui** riguardano alcuni
clienti preesistenti: non sono il prezzo EECard, un ricavo attribuibile al nuovo
software o un aumento già autorizzato. I 50/15 euro precedenti e le cifre
ambigue della conversazione restano irrisolti; non usarli in simulazioni di
vendita. Nessun cliente viene convertito o addebitato da questo documento.

## 2. Scheda offerta agenzie

**Beneficio proposto:** un processo ripetibile per attivare e ritrovare
fascicoli, mantenere continuità fra operatori e consegnare al cliente una vista
coerente, con marchio dell'agenzia e brand del sistema nei supporti concordati
(EA16–EA19). Il vantaggio economico va dimostrato con lavoro risparmiato e costo
totale di erogazione; la disponibilità a comprare un sistema pronto discussa
nell'audio non è domanda pagante già verificata.

| Componente | Contenuto proposto | Unità e costi aperti | Responsabilità proposta da confermare |
| --- | --- | --- | --- |
| Servizio e processo | Procedura di attivazione, coda operativa, ricerca al banco, formazione e modello di consegna | Per agenzia/sede o progetto; quantità di formazione e affiancamento | Agenzia gestisce il rapporto e valida i fascicoli; fornitore prepara strumenti e formazione |
| Software | Ambiente organizzativo isolato, utenti nominativi, ruoli, archivio e tracciamento | Canone e base di calcolo: agenzia, sede, operatore, fascicolo attivo o combinazione; archiviazione e limiti | Fornitore gestisce il servizio tecnico; agenzia nomina operatori e controlla i propri incarichi |
| Setup | Configurazione, importazione assistita, regole locali ammesse, verifica iniziale | Una tantum, volume/qualità della migrazione e attività extra | Dati e diritti verificati dall'agenzia; trasformazione e controllo tecnico attribuiti |
| Personalizzazione | Card e materiali con identità partner e marchio del sistema; configurazioni consentite | Compenso per design/setup, revisioni incluse, minimi di produzione, diritti d'uso | Agenzia fornisce asset utilizzabili; prodotto definisce spazi e regole comuni |
| Card fisiche/digitali | Emissione, consegna, blocco, sostituzione e registro credenziali | Produzione per unità/lotto, confezione, spedizione, riemissione, costi eventuali dei programmi wallet | Emittente, fornitore, resi e servizio in sedi diverse da stabilire |
| Hardware | Eventuale lettore, terminale, schermi e supporto fisico | Vendita/noleggio, installazione, manutenzione, sostituzioni, connettività, gestione remota | Sede custodisce; fornitore concordato assiste; componenti solo dopo prova compatibile |
| Supporto | Supporto applicazione e procedure di incidente/esportazione; eventuale supporto operativo aggiuntivo | Canali, orari, livelli di servizio, utenti formati, uso eccedente | Supporto software distinto dalla gestione dei clienti e dagli adempimenti professionali |

Proprietà dei dati, titolarità/responsabilità del trattamento, subfornitori,
portabilità e condizioni di cessazione vanno definite nel contratto pertinente.
Non si assume che un'agenzia possa vedere l'archivio di un'altra, usare la card
del partner ovunque o far svolgere alla piattaforma i propri adempimenti.
L'amministratore agenzia non diventa amministratore dei dati di tutto il sistema.

Il nome EECard resta provvisorio; C–Legame e direzione 0.3 restano la base.
Personalizzazione partner non equivale a copie indipendenti del software né a
un redesign bianco/rosso approvato (EA17/EA30). Un ambito limitato di varianti
va definito prima di stimare il costo di manutenzione.

## 3. Primo rilascio raccomandato e alternative

**Ipotesi R1/IF01 — fascicolo e continuità al banco con un'agenzia pilota.** Il primo
beneficio da provare è recuperare la pratica corretta rapidamente, anche con
un operatore che non conosce il cliente. Per il cliente: minore ripetizione di
informazioni e accesso ai documenti; per l'agenzia: minore tempo di ricerca e
preparazione. Il primo pagante e la disponibilità a pagare non sono dedotti
da questo beneficio. L'esperimento con un'agenzia è una raccomandazione, non
la scelta già approvata di lanciare prima B2C o di rimandare B2B.

| Capacità | Perimetro R1 proposto | Dipendenza e criterio di uscita |
| --- | --- | --- |
| Fondazioni | Identità, organizzazioni, relazioni/deleghe temporali, permessi su oggetti/file, audit e credenziali revocabili | Il cambio contesto non amplia diritti; test negativi anche tra due agenzie sintetiche, pur con un solo pilota |
| PF01 — attivazione al contratto | Riuso assistito dei dati, revisione umana, deduplicazione, inviti personali, rapporto verificato, adesione distinta dalle somme della locazione | Catalogo e regole di accesso definiti; nessuna attivazione a pagamento senza condizioni e metodo di incasso scelti |
| PF02 — ritorno al banco | Ricerca assistita e richiamo da credenziale; operatore nominativo, selezione del contesto e ripresa della pratica | Un riferimento card non espone file; ricerca controllata utilizzabile senza tessera/lettore con server disponibile; in indisponibilità del servizio la consultazione resta sospesa; minimo hardware deciso dopo la prova |
| PF03 — casa propria/locata | Selettore di contesto basato sui rapporti, capacità domestiche proprie quando verificate | Permessi per intestazione/delega/periodo; bollette dell'inquilino non incluse nella vista proprietario |
| PF05 — documento storico | Metadati, anno anche incerto, provenienza/versioni, ricerca titolo/tipo/periodo e storia lavori con evidenze | Nessun OCR o accesso comunale automatico necessario alla promessa iniziale; distinguere dati dichiarati da verificati |
| Consegna e continuità | Lista mancanti, accessi/condivisioni limitati, revoca, esportazione pertinente e gestione del cambio rapporto | Regole di conservazione e uscita risolte prima dei dati reali; card bloccata o servizio cessato non cancellano gli obblighi documentali |

PF03 è una regola trasversale da implementare anche se il catalogo iniziale
non vende gestione utenze: evitare di fissare il ruolo globale della demo nel
nuovo prodotto. PF04 (bolletta) e PF06 (bozza contrattuale) hanno specifiche e
casi di prova completi; **si propone di non includerne subito l'intera
automazione operativa**. Prima si dimostra il beneficio dei dati e del
fascicolo corretti. Il confronto può farle entrare in R1 prima dello sviluppo.

| Funzione della visione | Trattamento proposto in R1 | Quando anticiparla e cosa cambia |
| --- | --- | --- |
| PF04 — bolletta | Prova del riepilogo e della riservatezza con avvisi sintetici; archiviazione manuale se scelta nel catalogo | Se pagare/gestire bollette è il beneficio acquistato: chiarire avvisi/canali, introdurre il partner adeguato e ricalcolare costi/dipendenze |
| PF06 — bozza contratto e AI | Prova su modelli e dati sintetici, prima compilazione deterministica; AI confrontata separatamente | Se il tempo di preparazione contratti è il valore prioritario: template/versioni, revisore competente e valutazione dei risultati entrano nel rilascio |
| Wallet/contactless | Verifica di fattibilità e prova separata dal percorso di ricerca al banco | Se il gesto di appoggio è indispensabile alla vendita: compatibilità pass/lettore, revoca e alternativa accessibile diventano condizioni di R1 |
| Terminale a due schermi e firma | Simulazione della vista condivisa e prova componenti dopo chiarimento destinatari/atti | Se si vende il banco completo: gestione dispositivo, separazione schermi e processo di firma scelto precedono il rilascio |
| Quota EECard | Registrazione separata di adesione e stato economico; metodo reale da scegliere | Un lancio a pagamento richiede flusso di quota, condizioni, rinnovi/rimborsi pertinenti; un incasso gestito esternamente deve essere attribuito e verificato |
| Pagamenti canoni/bollette | Proposta di non movimentare denaro nel nucleo fascicolo/banco | Se la promessa è «paga qui»: includere partner, beneficiari, esiti asincroni, storni e riconciliazione prima di vendere quella promessa |
| App negli store | Web responsive come ipotesi iniziale, distribuzione non ancora scelta | Anticipare un canale nativo se requisito di piattaforma/uso osservato; costo e compatibilità da verificare, non dedotti dal wallet |
| 3D dell'immobile | Nessun editor nel nucleo proposto; test di valore separato | Anticipare se sostiene una prestazione acquistata; fornitore, input, costi e verifica tecnica dedicati. Distinto dal supporto hardware stampato in 3D |
| Assistenza, consulenza, domotica | Cataloghi/casi d'uso da delimitare; non promessi come servizio operativo incluso | Entrano se prioritari con copertura, responsabile, sostituto/capienza, autorizzazioni e costo di erogazione noti |

Queste sono esclusioni **dalla raccomandazione attuale**, tutte modificabili
prima di fissare il perimetro. Non sono rinvii concordati dai fondatori.

| Alternativa | Vantaggio da verificare | Dipendenze aggiuntive rispetto a R1 | Evidenza che la rende preferibile |
| --- | --- | --- | --- |
| B2B da subito | Il partner compra un processo pronto e finanzia l'adozione | Configurazione multiagenzia, isolamento verificato, formazione, migrazione, supporto, contratto/uscita e costi per partner | Un'agenzia esterna conferma catalogo e valore, con un referente e un impegno economico verificabile; il processo resta sostenibile senza assistenza continua dei fondatori |
| Banco hardware da subito | Esperienza fisica riconoscibile e recupero tramite avvicinamento | Componenti compatibili, destinatari schermi, gestione dispositivo, privacy ambientale, manutenzione; firma se effettivamente richiesta | La prova comparativa dimostra un miglioramento utile rispetto a ricerca/codice, e il beneficio è indispensabile per chi acquista |
| Bozza contrattuale come funzione iniziale | Ridurre tempo di preparazione ripetitiva | Modelli autorizzati, campi/versioni, revisione professionale, gestione contraddizioni e valutazione AI se usata | Il tempo risparmiato supera quello di controllo/correzione e gli errori critici sono intercettati; l'agenzia identifica questo come beneficio principale |

## 4. Prova proposta con l'agenzia

La prossima prova è **una simulazione comparativa**, precedente al pilota con
dati reali. Non usare dati di clienti nel repository, nel prototipo pubblicato
o nei report. Preparare solo persone «Persona A/B», immobili «Immobile 01/02»
e file sintetici marcati come tali, senza recapiti reali, IBAN o QR pagabili.
Non è stata eseguita in questa sessione. La simulazione verifica comprensione
e processo, non l'isolamento di un backend inesistente: i risultati sui permessi
devono poi essere ripetuti su API e file dell'implementazione prima di BF17.

Campione proposto: due operatori, uno abituato al fascicolo e uno che lo vede
per la prima volta; un terzo osservatore registra tempi ed errori. Per ogni
operatore, dodici scenari in modalità di lavoro corrente simulata e dodici
scenari equivalenti nel percorso proposto: **48 esecuzioni complessive**.
Usare due set equivalenti e invertire l'ordine per limitare l'apprendimento;
la prova non misura un risparmio statistico sull'intera attività dell'agenzia.
Separare prova assistita di comprensione e prova a tempo senza suggerimenti.

| Scenari sintetici | Percorso e risultato da osservare |
| --- | --- |
| 1. Nuovo contratto con due parti; 2. persona già presente/omonimia | PF01: riuso corretto, nessun duplicato o accesso alla persona sbagliata, mancanti espliciti |
| 3. Ritorno dopo un intervallo lungo; 4. operatore nuovo e più case | PF02: trovare rapporto/documento giusto e capire prossima azione senza memoria personale |
| 5. Card smarrita/revocata; 6. dispositivo non disponibile | PF02: recupero assistito senza riattivare credenziale o eludere verifica; attesa/errore comprensibili |
| 7. Proprietario nella propria casa e locatore altrove; 8. cambio inquilino | PF03/PF04: dati corretti per periodo; nessuna bolletta altrui raggiungibile |
| 9. Bolletta con QR illeggibile/domiciliazione | PF04: identificare importo, creditore, scadenza e prossimo passo senza dichiararla pagata |
| 10. Documento storico con anno incerto/due versioni | PF05: trovare versione pertinente e distinguere provenienza, anno noto/incerto e verifica |
| 11. Bozza con campo mancante o contraddittorio | PF06: fermare l'approvazione, mostrare origine dei dati e sottoporre a revisione; nessuna firma/invio |
| 12. Prova pagamento parziale con allegato | Controllo trasversale: documento, dichiarazione, incasso e quietanza distinti; residuo ancora visibile |

I casi PF04/PF06 restano prove di estensioni e non gonfiano i risultati del
nucleo R1. Documentare per ogni caso setup, istruzione, risultato atteso,
inizio/fine, lavoro attivo, attesa, aiuti, errori, correzioni e motivi di
abbandono. Confrontare il risultato corretto, non soltanto il tempo del clic.

| Metrica | Soglia iniziale **proposta**, da concordare | Regola di interpretazione |
| --- | --- | --- |
| Tempo di recupero corretto PF02/PF05 | Mediana almeno 30% inferiore al metodo corrente simulato | Pubblicare anche valori assoluti, massimi e casi falliti; non rimuovere dal campione le ricerche non riuscite |
| Attivazione PF01 | Nessun reinserimento dei dati già verificati salvo correzione esplicita; tempo attivo non superiore alla base | Contare separatamente preparazione/migrazione iniziale e attivazione ricorrente; il risparmio al banco non deve nascondere lavoro precedente |
| Completamento | Almeno 90% dei compiti ammessi completati correttamente senza aiuto; tutti i blocchi di sicurezza corretti | Con un campione piccolo riportare numeratore/denominatore, non solo percentuali; un blocco atteso è successo, non fallimento |
| Riservatezza e stati | Zero accessi non autorizzati e zero falsi «pagato/verificato/firmato» nei casi | Una violazione impedisce di proseguire con utenti/dati reali finché corretta e verificata |
| Continuità fra operatori | Operatore nuovo completa tutte le ricerche autorizzate, senza intervento dell'autore del fascicolo | Se serve conoscenza non registrata, annotare quale dato/processo manca |
| Costo operativo ricorrente | Costo misurato per pratica almeno non superiore alla base e tendenza coerente col tempo risparmiato | Setup e componenti a consumo sono separati; costo inferiore non dimostra margine senza prezzo e volumi confermati |
| Hardware/AI opzionali | Vantaggio osservabile sullo stesso compito senza regressioni di sicurezza o aumento del lavoro totale | Confronto specifico dopo prova componenti; nessuna soglia finanziaria inventata |

Calcoli da compilare con valori osservati, senza tariffe ipotizzate:

- `tempo netto risparmiato = tempo attivo prima − tempo attivo dopo`, includendo ricerca, verifica e correzione;
- `costo operativo per caso = Σ(minuti per ruolo × costo pieno orario del ruolo / 60) + consumi direttamente attribuibili`;
- `costo totale per periodo = costi operativi + software/archivio/supporto + quota di setup e hardware su un orizzonte esplicito`;
- `beneficio economico = costo prima − costo dopo`, a parità di risultato e volume; la capacità liberata non è automaticamente ricavo;
- margine e recupero dell'investimento si calcolano solo quando prezzo, volumi, costi dei fornitori e orizzonte sono confermati.

L'agenzia può fornire costi aggregati riservati in uno spazio appropriato: nel
repository conservare metodo, esiti anonimi e intervalli autorizzati, senza
retribuzioni personali. Un pilota operativo successivo richiede catalogo,
perimetro, condizioni e verifiche di produzione: il vecchio campione di
20–30 immobili e le durate dello studio v0.1 restano ipotesi storiche, non
dimensionamento o calendario già assegnato a questo R1.

## 5. Backlog eseguibile e dipendenze

La tabella seguente è il backlog di implementazione proposto. Nel successivo
proseguimento autorizzato è stato preparato il [kit BF02](../prova-agenzia-2026-10-08/README.md);
BF16 resta da svolgere con operatori reali. Gli altri stati operativi restano
aperti: le specifiche non dichiarano realizzati server o prove. «Responsabile»
indica il ruolo suggerito, senza assegnare persone o date. Prima di sviluppo
operativo fissare il perimetro; intanto BF01/BF02 e gli approfondimenti tecnici
indipendenti possono avanzare con dati sintetici e ipotesi esplicite.

| ID | Risultato eseguibile | Dipende da | Responsabile proposto | Criterio di accettazione osservabile | Collegamenti |
| --- | --- | --- | --- | --- | --- |
| BF01 | Registrare scelta del primo beneficio, pagante e catalogo minimo | Risposte prioritarie; schede sopra | Prodotto + responsabile agenzia | Versione attribuita con inclusioni/esclusioni, costi separati, unità/durata aperte o confermate, copertura e criteri di scelta R1/alternativa; nessun prezzo dedotto | EA02, EA05, EA16–EA19, EA27 |
| BF02 | Preparare i due set sintetici e scheda di misura prima/dopo | PF01–PF06; non richiede il listino | Analisi + operatore agenzia | Dodici scenari equivalenti per set, risultati attesi, registro tempi/errori/costi e istruzioni ripetibili; assenza di dati personali e QR reali | EA03, EA08, EA19–EA22, EA25, EA29 |
| BF03 | Tradurre modello logico e matrice permessi in contratti di servizio | Modello e percorsi; BF01 per ambito operativo | Architettura + sicurezza | Identità/organizzazioni/relazioni/periodi espliciti; matrice azione–oggetto con casi ammessi/negati, revoca e uscita; nessun ruolo globale o ID card sufficiente | EA01, EA03–EA04, EA16, EA20, EA22 |
| BF04 | Realizzare fondazione identità e isolamento in ambiente di test | BF03 e scelta architettura | Sviluppo backend + sicurezza | Test API/file negano altra agenzia, altro immobile, operazioni sul rapporto concluso, storico privo di titolo e delega scaduta; operatori nominativi, sessioni/revoca e audit attribuiti; fixture separate | PF01–PF06 |
| BF05 | Realizzare archivio privato, versioni e condivisioni | BF04 | Backend + gestione documentale | File non pubblico, scansione/quarantena, metadati/provenienza/versione, errore recuperabile; revoca/scadenza applicate dal server; nessun duplicato da retry | EA04, EA24–EA25; PF05 |
| BF06 | Realizzare attivazione e importazione assistita | BF04/BF05; BF01 per condizioni | Full stack + operatore agenzia | PF01: persona già presente non duplicata, conflitto in revisione, inviti individuali, diritti solo dopo verifica; quota distinta e nessun documento dovuto bloccato impropriamente | EA01–EA07, EA15, EA27; PF01 |
| BF07 | Realizzare ciclo credenziale e ritorno al banco | BF04/BF06 | Full stack + operatore agenzia | PF02: operatore autonomo dal cliente, selezione corretta, ricerca alternativa controllata, revoca immediata e nuova credenziale; vecchia mai riattivata; nessun file dal solo codice | EA08–EA09, EA13; PF02 |
| BF08 | Realizzare capacità contestuali casa/utenza | BF03/BF04 | Backend + UX | Stessa persona usa casa propria e locata senza duplicare account; verifica server di intestazione/delega/periodo; subentro non espone bollette precedenti | EA20/EA22; PF03 |
| BF09 | Realizzare ricerca storica e cronologia lavori | BF05/BF08 | Full stack + referente documentale | PF05: ricerca titolo/tipo/periodo, anno incerto ammesso e distinguibile, versioni/provenienza visibili; lavoro pianificato, dichiarato e documentato distinti | EA24–EA26; PF05 |
| BF10 | Collaudare bolletta e definire canale di azione | BF05/BF08; BF01 se inclusa operativamente | Prodotto + UX + integrazioni | PF04: creditore/importo/scadenza prima dei dettagli; QR assente/illeggibile e stesso telefono gestiti; niente pagamento verificato da apertura, upload o dichiarazione; partner richiesto solo se scelto | EA20–EA22; PF04 |
| BF11 | Provare pass wallet, credenziale fisica e lettori candidati | BF03/BF07 per integrazione; scelta componenti per prova fisica | Integrazioni + hardware | Rapporto separa pass salvato e NFC letto; prove sulle combinazioni effettive, revoca/replay/errori e alternativa; costi e autorizzazioni incerti espliciti | EA13–EA15; PF02 |
| BF12 | Provare terminale e separazione delle viste | BF07; destinatari dei due schermi chiariti; BF11 se NFC richiesto | UX + hardware + sicurezza | Secondo schermo mostra solo riepilogo ammesso, si svuota a chiusura/disconnessione e non replica note/code; prova visibilità fisica, accessibilità e recupero | EA10–EA11; PF02 |
| BF13 | Selezionare processo firma e provarlo in ambiente di test | Atti/tipo/valore chiariti; BF05; BF12 se usa terminale | Referente professionale + integrazioni | Documento/versione e firmatario identificati, rifiuto/interruzione gestiti, esito verificabile e conservazione definita; tratto della penna mai chiamato automaticamente firma qualificata | EA12/EA29; PF06 |
| BF14 | Provare compilazione della bozza e valutare assistente | BF05/BF06; template autorizzato e chiarimento Jarvis per eventuale integrazione | Prodotto + referente contratti + AI | PF06: campi con origine, mancanti/conflitti bloccanti, confronto con compilazione senza AI, revisione registrata; zero invii/firme autonomi o recuperi fuori permesso | EA28–EA29; PF06 |
| BF15 | Definire e verificare adattamenti partner | BF01/BF03; BF04/BF07 per pilota B2B | Prodotto B2B + design + sicurezza | Setup/software/design/card/hardware/supporto separati; brand di sistema conservato, due organizzazioni isolate, esportazione e assistenza provate; personalizzazione entro ambiti definiti | EA16–EA19/EA30 |
| BF16 | Eseguire prova comparativa e aggiornare la raccomandazione | BF02; prototipo dei percorsi scelti; BF11–BF14 solo per varianti testate | Ricerca UX + responsabile agenzia | Esecuzioni e denominatori registrati, tempi corretti/abbandoni inclusi, costo totale distinto da ricavo; decisione motivata proseguire/correggere/cambiare perimetro | Tutti i PF nel perimetro |
| BF17 | Chiudere condizioni per un pilota operativo | BF01/BF16 e implementazioni del perimetro scelto | Responsabile prodotto + operativo + sicurezza | Catalogo e condizioni effettivi, ruoli dati/fornitori, supporto, fine rapporto/esportazione, audit, backup/ripristino e incidenti verificati; nessun difetto critico di accesso aperto | EA04, EA07, EA16, EA22, EA27 |
| BF18 | Avviare pilota solo dopo decisione esplicita di produzione | BF17; autorizzazione e risorse per servizi/dati reali | Responsabile del pilota | Ambiente distinto dalla demo; campione/periodo/costo massimo concordati, accessi individuali, monitoraggio e criterio di arresto/ripristino; esiti aggregati senza dati personali in repository | R1 o alternativa scelta |

Sequenza critica del nucleo proposto: **BF01 → BF03 → BF04 → BF05 → BF06 →
BF07**, con BF08/BF09 per i contesti e il fascicolo storico, poi BF16/BF17.
BF02 prepara subito la prova; BF11–BF15 sono rami condizionati. Se una di
queste capacità diventa indispensabile alla promessa, il suo ramo entra nella
sequenza critica: nessuna scadenza o stima dello studio precedente si trasferisce
automaticamente al nuovo perimetro. Pagamenti, app, 3D, assistenza e domotica
richiedono voci di sviluppo proprie solo dopo la scelta del relativo risultato.

## 6. Risposte che cambiano una scelta concreta

Le domande seguenti sono un ordine di approfondimento, non una richiesta di
rispondere a tutto prima di continuare la progettazione.

1. **Primo acquisto e beneficio indispensabile:** clienti dell'agenzia,
   agenzia stessa o partner esterno; recupero fascicolo, bollette, contratto o
   banco completo? La risposta cambia R1, PF prioritari e dipendenze BF11–BF15.
2. **Banco e firma:** chi guarda/tocca ciascuno schermo e quali atti devono
   essere firmati, con quale valore richiesto? La risposta cambia vista
   condivisa, componente hardware e processo di firma; nel frattempo resta
   valido il recupero assistito con account operatore.
3. **Jarvis:** progetto esistente da integrare, riferimento informale o nuovo
   modulo? La risposta cambia lo studio di integrazione; la specifica di bozza
   con campi, fonti e revisione umana può avanzare comunque.

Prima della vendita servono inoltre listino/unità/periodo/IVA, servizi inclusi,
venditore, migrazione dei clienti già gestiti, territorio, copertura, budget e
risorse. L'assenza di questi dati non blocca i set sintetici, la matrice permessi
o i contratti funzionali; impedisce di dichiarare una proposta pronta alla
vendita, assegnare un margine o attivare un servizio reale.
