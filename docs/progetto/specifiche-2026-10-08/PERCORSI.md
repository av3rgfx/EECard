# EECard — percorsi funzionali proposti

Versione di lavoro dell'8 ottobre 2026. Questo documento specifica comportamenti
da revisionare, non funzioni disponibili o un rilascio approvato. Conserva le
regole già ricevute su riservatezza, permessi e significato dei pagamenti. Gli
ID PF e AC sono stabili per collegare requisiti, backlog e prove future.

Fonti: [catalogo EA01–EA30](../discussione-2026-10-07/ANALISI_CONVERSAZIONE.md),
[studio v0.1](../EECard-studio-v0.1.pdf), §6, §8 e §11;
[regole di prodotto](../../../PRODUCT.md). Le transizioni aggiunte qui sono
**proposte di specifica**. Restano aperti offerta e prezzi, primo rilascio,
destinatari dei due schermi, tipo di firma e significato di Jarvis.

## Base comune e differenza dalla demo

La proposta di lavoro privilegia continuità del fascicolo, attivazione assistita
e recupero al banco. Gli altri percorsi sono specificati per poter scegliere il
perimetro consapevolmente: descriverli non li assegna automaticamente al primo
rilascio. QR/codice e ricerca assistita sono alternative da validare alla lettura
contactless, non sostituzioni approvate.

| Percorso | Fonte EA | Evidenza attuale e cambiamento necessario |
| --- | --- | --- |
| PF01 Attivazione al contratto | EA01–EA07, EA15, EA27 | `AccessPage` in [pages.tsx](../../../src/pages.tsx) verifica il codice pubblico demo e cambia ruolo; occorrono identità, rapporti, adesione e inviti reali distinti |
| PF02 Ritorno al banco | EA08–EA14, EA16–EA17 | Blocco/sostituzione in [panels.tsx](../../../src/panels.tsx) sono locali; mancano ricerca cliente, lettore e sessione banco |
| PF03 Casa propria/locata | EA20, EA22–EA23 | `UtilitiesPage` in [pages.tsx](../../../src/pages.tsx) è riservata all'inquilino; servono relazioni e intestazioni temporali per persona/casa |
| PF04 Bolletta | EA07, EA20–EA22 | Due fixture nella stessa pagina; `PaymentPanel` distingue eventi dell'affitto ma non modella una bolletta o pagamento reale |
| PF05 Documento storico e lavori | EA04, EA24–EA26 | `DocumentsPage` cerca il titolo; `DocumentPanel` simula destinatari/revoca; `FileInput` in [ui.tsx](../../../src/components/ui.tsx) conserva solo il nome del file |
| PF06 Bozza contrattuale | EA03, EA12, EA28–EA29 | Nessun modello di contratto/bozza/AI nei [tipi demo](../../../src/data.ts); occorrono fonti, template, revisioni e attribuzione |

Per ogni operazione valgono sessione personale autenticata, agenzia e contesto
espliciti, autorizzazione server sull'oggetto e sul file, esito persistito prima
di confermare il successo e audit attribuito. L'acquisto di un pacchetto non
attribuisce un mandato né amplia i documenti leggibili. I dati di un'altra
agenzia non compaiono in ricerca, suggerimenti, esportazioni o risposte AI.

## PF01 — attivazione al contratto

**Risultato:** riutilizzare i dati della pratica per dare a ciascuna parte il
proprio accesso e una consegna pertinente, senza duplicare fascicoli e account.
Fonti: [EA01–EA07](../discussione-2026-10-07/ANALISI_CONVERSAZIONE.md#a-offerta-attivazione-e-consegna),
[EA15](../discussione-2026-10-07/ANALISI_CONVERSAZIONE.md#ea15---registrazione-online-digitale-subito-fisica-a-pagamento)
e [EA27](../discussione-2026-10-07/ANALISI_CONVERSAZIONE.md#ea27---convertire-anche-clienti-già-gestiti-e-paganti-annualmente).

**Attori e prerequisiti.** Operatore autorizzato dell'agenzia; ciascuna parte o
delegato verificato; referente che risolve contestazioni sul rapporto.
Servono una pratica con origine nota, immobile/unità, parti e ambito del
contratto. La verifica del recapito prova il controllo del recapito, non la
proprietà né il mandato. Prima di un'attivazione commerciale occorre un'offerta
con inclusioni, unità, durata, soggetto venditore e condizioni approvate: questi
dati non sono ancora disponibili e non sono dedotti da cifre storiche.

**Dati minimi e autorizzazioni.** Agenzia/sede; persona e recapito verificato;
immobile/unità; contratto/pratica e parti con ruolo, date e fonte del rapporto;
documenti con provenienza e versione; offerta/versione, soggetto aderente e
beneficiari; accettazione attribuita; inviti individuali; credenziali separate.
L'operatore può preparare la pratica solo nel proprio mandato. La facoltà di
invitare o condividere è esplicita; non basta poter vedere un file. Documenti
d'identità e recapiti non vengono consegnati indistintamente alle tre parti.

**Sequenza proposta.**

1. Aprire la pratica autorizzata e riutilizzare dati raccolti dall'agenzia;
   mostrare provenienza, campi mancanti e possibili duplicati. Un conflitto non
   viene risolto scegliendo automaticamente il record più recente.
2. Confermare immobile, ambito e parti. Registrare esito e autore della verifica
   del rapporto; creare accessi distinti per comproprietari e conduttori.
3. Presentare l'offerta EECard separata da canone, deposito, mediazione e altre
   somme. Accettazione del contratto di locazione e adesione al servizio sono
   eventi differenti. Rifiutare l'offerta non elimina la pratica preesistente.
4. Registrare l'adesione e il suo stato economico secondo il metodo che verrà
   approvato. Se la quota condiziona l'attivazione, un esito ignoto resta in
   attesa: un documento caricato non conferma l'incasso.
5. Inviare un invito individuale con scadenza; la persona verifica il recapito,
   accede al proprio account e vede il riepilogo del rapporto da confermare.
   Un account già esistente si collega al nuovo contesto, senza duplicarlo.
6. Abilitare i diritti solo quando i requisiti di identità, rapporto e adesione
   risultano soddisfatti. Creare credenziale digitale personale; la consegna
   del fascicolo elenca i documenti effettivamente disponibili a ogni parte.
7. Se prevista, consegnare la card fisica o registrare l'ordine separato. Il
   supporto fisico viene attivato dopo verifica di ricezione/ritiro; la sua
   mancanza non prova che l'account o il fascicolo siano inattivi.

**Stati distinti.** Pratica `da completare → verificabile → rapporto verificato`
oppure `contestata`; invito `preparato → inviato → accettato` oppure
`scaduto/revocato`; adesione `proposta → accettata → in attesa dei requisiti →
attiva → sospesa/terminata`; credenziale `emessa → attiva → revocata/scaduta`.
Un errore di invio non annulla l'adesione e una fine locazione non chiude da sola
l'account. Le date commerciali definitive restano da stabilire.

**Varianti da progettare con lo stesso nucleo.**

- **Online, EA15:** selezione dell'agenzia o richiesta di collegamento; recapito
  verificato; card digitale eventualmente visibile come `in verifica`, senza
  documenti privati prima del rapporto verificato. L'identità visiva della card
  non deve far credere che tutti i servizi siano già attivi. Fisica facoltativa:
  costo completo, recapito e condizioni prima dell'ordine; `richiesta →
  confermata → produzione → spedita/pronta al ritiro → consegnata → attiva`, con
  stati `annullata/consegna fallita` e sostituzione tracciata. Nessun fornitore,
  spedizione o importo sono approvati da questa specifica.
- **Clienti già gestiti, EA27:** inventario e prova di importazione in area
  separata; deduplicazione con revisione; rapporto vecchio/nuovo servizio e
  condizioni espliciti; invito individuale; riconciliazione dei conteggi prima
  di abilitare gli accessi. Non attribuire retroattivamente accettazioni, quote
  EECard o verifiche documentali. Conservare origine e data di acquisizione;
  l'anno del documento può precedere di molto la migrazione.

**Errori e recupero.** Invito scaduto/recapito errato: revocare e riemettere senza
ricreare la persona. Omonimia o rapporto contestato: sospendere il collegamento
interessato, revisione umana, nessun dato esposto. Salvataggio/interruzione rete:
ripresa della stessa pratica e chiave dell'operazione per evitare duplicati.
Importazione parziale: elenco record accettati/scartati e riavvio solo degli
scarti; nessuna sovrascrittura silenziosa. Card smarrita in consegna: revoca
della sola credenziale interessata e nuovo identificativo.

| Criterio | Accettazione osservabile proposta |
| --- | --- |
| PF01-AC01 | Una pratica con due proprietari e due conduttori produce quattro inviti personali e un solo contratto; ripetere la richiesta non duplica adesioni o inviti attivi equivalenti |
| PF01-AC02 | Recapito verificato e card `in verifica`, senza rapporto autorizzato, non permettono elenco, anteprima, download o ricerca di documenti privati |
| PF01-AC03 | L'operatore distingue nel riepilogo quota EECard, deposito e canone; il rifiuto EECard mantiene separata la pratica di locazione |
| PF01-AC04 | Ogni campo importato conserva origine; i conflitti richiedono una scelta attribuita e non cambiano la sorgente precedente in silenzio |
| PF01-AC05 | Invito scaduto/revocato non abilita accesso; una riemissione invalida il precedente e mantiene lo stesso soggetto |
| PF01-AC06 | Il cliente online riceve uno stato coerente prima e dopo la verifica; l'ordine fisico non si crea se condizioni/costo/consegna non sono confermati |
| PF01-AC07 | Una migrazione di prova produce conteggi e scarti riconciliabili, nessuna accettazione commerciale inventata e nessuna commistione fra agenzie |

## PF02 — ritorno al banco

**Risultato:** un nuovo operatore autorizzato ritrova il fascicolo utile e la
pratica storica senza dipendere dalla memoria di chi ha acquisito il cliente.
Fonti: [EA08–EA12](../discussione-2026-10-07/ANALISI_CONVERSAZIONE.md#b-banco-dellagenzia-lettore-e-terminale),
[EA13–EA14](../discussione-2026-10-07/ANALISI_CONVERSAZIONE.md#c-card-contactless-wallet-e-registrazione-online)
e EA16–EA17. La prova del beneficio può iniziare con ricerca assistita; lettura
wallet e destinatari dei due schermi sono ancora da validare.

**Attori e prerequisiti.** Cliente; operatore con propria sessione; sede e
dispositivo registrati se si usa un terminale. L'operatore ha un mandato valido
sul fascicolo. Presentare una card identifica un possibile contesto: non
autentica l'operatore né concede accesso universale al portatore.

**Dati e permessi.** Identificativo opaco revocabile, emittente/agenzia, stato e
persona collegata; sessione dell'operatore; sessione banco; scopo della visita;
immobile/contratto scelti; documenti e revisioni consultati; eventi di apertura
e chiusura. La ricerca manuale usa un insieme minimo di dati e restituisce solo
i fascicoli autorizzati; l'accesso interagenzia richiede un accordo/grant
specifico futuro, non è implicito nel marchio comune.

**Sequenza proposta.**

1. Operatore accede col proprio account e seleziona sede. La postazione vuota
   non mostra l'ultimo cliente; al blocco della sessione si oscura la vista.
2. Cliente presenta supporto fisico, pass supportato o codice. Il server risolve
   identificativo e stato; l'operatore verifica la corrispondenza della persona
   secondo il processo concordato. In alternativa cerca il cliente con una
   procedura assistita, senza usare dati noti come prova sufficiente d'identità.
3. Selezionare scopo, immobile e contratto. Un vecchio contratto può essere
   consultabile come storico, ma non riapre le autorizzazioni operative chiuse.
4. Mostrare riepilogo pertinente, documenti disponibili/mancanti, versione e
   provenienza; l'operatore esegue solo azioni consentite e attribuite a sé.
5. Se si prova un secondo schermo, condividere esplicitamente una vista
   limitata. **Ipotesi di prototipo:** schermo operativo all'agenzia e riepilogo
   al cliente; destinatari reali da confermare prima dell'hardware. Nessuna
   duplicazione completa del desktop. Nessuna firma effettiva in questo flusso
   finché documento e tipo di firma non sono decisi.
6. Registrare esito della visita, chiudere sessione banco e vista condivisa.
   Rimuovere file temporanei/cache sensibili sulla postazione; la visita
   successiva parte da uno stato vuoto.

**Stati.** `postazione pronta → identificazione da verificare → contesto
confermato → consultazione → chiusa`; varianti `credenziale rifiutata`,
`permessi insufficienti`, `sospesa per rete/sessione`. Vista condivisa
`non abbinata → abbinata → contenuto selezionato → oscurata/chiusa`, con scadenza
indipendente. Durata massima e inattività sono parametri da misurare nel pilota,
non numeri concordati.

**Errori e recupero.** Card assente, illeggibile, revocata o telefono scarico:
passare a verifica/ricerca assistita, senza riattivare la vecchia credenziale.
Omonimi: distinguere in ambiente operatore e confermare prima del documento.
Rete assente: nessun accesso privato offline sul banco; stato chiaro e referente
umano. Disconnessione schermo: oscurare la vista, nuovo abbinamento esplicito.
Cambio cliente o perdita di permessi: chiusura immediata del contesto; una
finestra rimasta aperta non conserva il diritto al download.

| Criterio | Accettazione osservabile proposta |
| --- | --- |
| PF02-AC01 | Un operatore autorizzato diverso dall'autore della pratica ritrova il contratto storico corretto e ne legge fonte/versione; tempi e tentativi sono misurati |
| PF02-AC02 | Una card valida presentata a un operatore senza mandato non espone documenti; la ricerca in un'altra agenzia non rivela l'esistenza del fascicolo |
| PF02-AC03 | Card revocata e identificativo precedente a una sostituzione sono rifiutati; il canale assistito verifica il cliente senza riattivarli |
| PF02-AC04 | Il secondo schermo mostra solo gli elementi selezionati e autorizzati per quel destinatario, senza note interne, code generali, altri tab o altre persone |
| PF02-AC05 | Chiusura, timeout, blocco dell'operatore e cambio cliente oscurano entrambi i contesti pertinenti e invalidano il successivo recupero dei file |
| PF02-AC06 | Senza lettore compatibile la prova conclude il recupero con alternativa assistita; l'esito non viene registrato come prova NFC riuscita |

## PF03 — casa propria e casa locata

**Risultato:** la stessa persona usa servizi domestici per la propria casa e
gestisce immobili locati, con viste determinate dai rapporti reali. Fonti:
[EA20](../discussione-2026-10-07/ANALISI_CONVERSAZIONE.md#ea20---funzioni-domestiche-anche-per-il-proprietario),
[EA22](../discussione-2026-10-07/ANALISI_CONVERSAZIONE.md#ea22---le-bollette-dellinquilino-restano-private)
e EA23; studio v0.1 §6.2, §6.9–6.10.

**Attori e prerequisiti.** Persona autenticata con una o più relazioni
verificate; eventuale delegato; operatore abilitato a correggere i rapporti.
Proprietà, occupazione, parte contrattuale e intestazione della fornitura sono
relazioni distinte. Abitare una casa o esserne proprietario non prova da solo
che tutte le utenze siano intestate alla persona.

**Dati e autorizzazioni.** Persona, agenzia, immobile/unità; titolarità e
occupazione con date; contratto/parti; fornitura/intestazione; delega con
oggetto, azioni e validità. La capacità `consulta proprie bollette` dipende
dall'intestazione o delega pertinente, non dal ruolo globale `inquilino`.
Il piano commerciale abilita una funzione entro quei permessi, mai al di fuori.

**Sequenza proposta.**

1. Selezionare casa e contesto; mostrare la relazione attiva e, separatamente,
   eventuali archivi dei rapporti conclusi. Non creare un secondo account quando
   un proprietario è anche inquilino altrove.
2. Nella casa propria mostrare utenze intestate alla persona o esplicitamente
   delegate. Nella casa locata mostrare documenti/locazione autorizzati e solo
   le utenze per cui esiste un titolo specifico; una bolletta del conduttore
   resta privata anche se l'immobile è lo stesso.
3. Associare nuova fornitura come `rapporto da verificare`; controllare soggetto
   e periodo prima di esporre bollette. Correggere il collegamento con audit.
4. Alla fine della locazione distinguere data di cessazione contrattuale, uscita
   effettiva, chiusura delle deleghe e voltura/cessazione della fornitura. Un
   evento non esegue automaticamente gli altri presso un fornitore esterno.
5. Terminare alla data pertinente i diritti operativi sul vecchio rapporto;
   aprire nuovi rapporti/intestazioni solo dopo verifica. L'ex inquilino può
   avere uno storico personale limitato, soggetto a regole di conservazione ed
   esportazione ancora da approvare; il nuovo inquilino non lo eredita.
6. Una nuova proprietà non trasferisce automaticamente dati privati del vecchio
   proprietario/intestatario. Valutare per categoria quali documenti tecnici
   dell'immobile possono essere consegnati, quali richiedono oscuramenti e con
   quale titolo; conservare separati i documenti personali.

**Stati.** Relazione `richiesta → verificata → futura/attiva → conclusa`, con
`contestata/revocata`; intestazione `da verificare → attiva → cessazione
richiesta → cessata` solo con evidenza dell'evento. Il contesto di consultazione
può essere `attivo` o `storico limitato`; quest'ultimo non permette nuove
operazioni sul rapporto successivo.

**Errori e recupero.** Periodi sovrapposti: revisione dell'ambito (ad esempio
stanza/unità) senza assumere un errore universale. Bolletta a cavallo della
voltura: mantenere documento originale e destinatario effettivo, eventuale
rettifica separata; non ripartire automaticamente responsabilità o importi.
Delega scaduta: negare nuovo accesso e proporre rinnovo verificato. Rapporto
errato: revocare i grants derivati e rivalutare link, indici e sessioni già
aperti, mantenendo la cronologia della correzione.

| Criterio | Accettazione osservabile proposta |
| --- | --- |
| PF03-AC01 | Un unico account proprietario della casa A, locatore di B e inquilino di C vede tre contesti corretti e le sole bollette di cui è intestatario/delegato |
| PF03-AC02 | Il proprietario di B non legge né trova tramite ricerca, esportazione o AI la bolletta personale del conduttore; il rifiuto vale anche con URL/ID noto |
| PF03-AC03 | A fine locazione il nuovo conduttore non riceve bollette, prove, note o documenti personali del precedente; gli accessi storici eventualmente concessi restano separati |
| PF03-AC04 | Cessazione locazione e cambio intestazione hanno date/evidenze distinte; nessuna schermata annuncia una voltura eseguita dal solo cambio di relazione |
| PF03-AC05 | Una delega scaduta/revocata non autorizza un file già elencato in precedenza; rinnovo e correzione sono attribuiti e verificabili |
| PF03-AC06 | Cambio proprietario e disdetta EECard non cancellano automaticamente contratto, saldi o dati storici; applicano soltanto la politica approvata per l'evento |

## PF04 — consultazione della bolletta e stato del pagamento

**Risultato:** riconoscere subito importo, creditore, scadenza e azione utile,
con QR se disponibile e dettagli consultabili. Fonti:
[EA21–EA22](../discussione-2026-10-07/ANALISI_CONVERSAZIONE.md#ea21---bollette-qr-e-importo-subito-dettagli-da-esplorare),
EA07; studio v0.1 §6.5–6.6. Pagare dentro EECard o presso un partner resta una
scelta aperta, distinta dalla consultazione del documento.

**Attori e prerequisiti.** Intestatario o delegato; operatore solo se incaricato;
eventuale gestore/partner autorizzato come fonte di esiti. Fornitura e
intestazione corrette; documento disponibile; fonte, periodo e metadati
verificati prima di proporre un'azione di pagamento.

**Dati e autorizzazioni.** Originale/versione, intestatario, fornitore/creditore,
fornitura, periodo fatturato, numero avviso, importo/valuta, scadenza,
domiciliazione nota o ignota, dati QR con origine; dichiarazioni, evidenze e
riscontri separati. La lettura di un QR non è un permesso di pagamento o di
consultazione. Le estrazioni automatiche restano da confermare.

**Sequenza proposta.**

1. Caricare/acquisire da fonte autorizzata, controllare file e associare
   intestazione; segnalare possibile duplicato senza eliminarlo automaticamente.
2. Confermare dati essenziali confrontandoli con l'originale. Una lettura OCR/QR
   incoerente o incompleta porta a `da controllare`, non a importo affidabile.
3. Aprire riepilogo con importo, creditore, scadenza, stato descritto e QR
   proveniente dall'avviso; distinguere dati confermati da quelli mancanti.
   Dettagli progressivi includono consumi, periodo e originale.
4. Sullo stesso telefono offrire, se supportati, copia del codice avviso o
   collegamento al canale ufficiale verificato; non obbligare a fotografare lo
   schermo. Senza canale supportato mostrare documento/istruzioni e limite,
   senza pulsante che simuli un pagamento riuscito.
5. Prima di un'eventuale disposizione verificare se risulta già pagata o
   domiciliata, beneficiario, costo e stato corrente. Con pagamento esterno
   l'utente può dichiarare il pagamento e allegare prova; l'incasso resta da
   verificare presso una fonte pertinente.
6. Registrare esito verificato solo con fonte, autore/processo, importo e data.
   Una ricevuta del partner e una quietanza del creditore hanno tipo/emittente
   espliciti; EECard non genera una quietanza propria per un incasso che non è
   legittimato ad attestare. Un parziale conserva il residuo.

**Stati separati.** Documento `acquisito → in controllo → disponibile`, poi
`sostituito/annullato`; dichiarazione `assente → presentata → contestata/rettificata`;
riscontro `non disponibile → pendente → verificato` oppure `fallito/annullato`;
quietanza `non rilasciata → rilasciata → rettificata`, ove applicabile. `Archiviata`
indica collocazione del documento, non saldo. Un'integrazione potrebbe avere
stato `esito ignoto`: non equivale a fallimento ripetibile.

**Errori e recupero.** QR assente/illeggibile: codice e originale, nessuna
ricostruzione inventata. Avviso rettificato: legare la nuova versione e avvertire
sulla vecchia. Timeout pagamento: recuperare l'esito col riferimento della
stessa operazione prima di consentire un'altra disposizione. Fornitore non
supportato: nessuna promessa universale. Importo parziale/eccedente: allocazione
esplicita; conguaglio e nota di credito non sovrascrivono lo storico.

| Criterio | Accettazione osservabile proposta |
| --- | --- |
| PF04-AC01 | Riepilogo leggibile presenta creditore, importo/valuta, scadenza, stato e QR quando presente; sullo stesso telefono esiste un'alternativa usabile al QR |
| PF04-AC02 | Importo/creditore estratti in conflitto con l'originale impediscono l'azione economica finché il dato non è confermato e attribuito |
| PF04-AC03 | Caricare una prova non crea una dichiarazione; dichiarare non verifica un incasso; verificarlo non rilascia automaticamente una quietanza |
| PF04-AC04 | Con dovuto 100 unità monetarie e incasso verificato 40, il residuo resta 60 anche dopo quietanza per 40; i numeri sono dati di test, non prezzi |
| PF04-AC05 | Scansione/importazione ripetuta segnala il possibile duplicato; timeout mantiene la stessa operazione in stato ignoto senza nuovo addebito automatico |
| PF04-AC06 | Bolletta annullata, domiciliata o già saldata non propone indiscriminatamente un nuovo pagamento; fonte e data dello stato sono consultabili |
| PF04-AC07 | L'esito di un pagamento resta privato all'intestatario e ai delegati pertinenti; proprietà dell'immobile e card superiore non ampliano tale accesso |

## PF05 — documento storico e cronologia dei lavori

**Risultato:** trovare un documento pertinente per nome/tipo/anno e capire
origine, versione, verifiche e rapporto con la storia dell'immobile. Fonti:
[EA24–EA26](../discussione-2026-10-07/ANALISI_CONVERSAZIONE.md#f-fascicolo-completo-e-storia-dellimmobile),
EA04; studio v0.1 §6.4 e §11.

**Attori e prerequisiti.** Proprietario/delegato; operatore incaricato;
professionista per la propria verifica specialistica; tecnico limitato
all'incarico. Servono immobile/unità identificati e titolo a conservare/condividere
il documento. La lista di documenti tecnici non costituisce un elenco legale
universale né promette acquisizione automatica dagli archivi comunali.

**Dati e autorizzazioni.** Titolo, tipo, anno/data del documento con precisione
nota o ignota, data di acquisizione distinta, ente/autore, provenienza,
riferimento pratica, immobile/contratto, versione, file originale, eventuale
scadenza, controlli formali/specialistici attribuiti, destinatari. Per lavori:
ambito, date anche approssimate, esecutore, stato di esecuzione, fonte della
notizia e documenti collegati. Condividere un lavoro non condivide tutti i suoi
allegati personali o economici.

**Sequenza proposta.**

1. Acquisire file in area privata; controlli tecnici di sicurezza e leggibilità.
   Impostare metadati, origine e oggetto; anno sconosciuto rimane sconosciuto.
2. Separare controllo formale dalla verifica specialistica. Pubblicare la
   versione con destinatari espliciti; originali/versioni pubblicate restano
   immutabili, le correzioni producono una nuova versione collegata.
3. Cercare per titolo parziale e categoria, filtrare per anno/intervallo,
   immobile e stato. Ricerca, conteggi e suggerimenti rispettano gli stessi
   permessi del download. OCR/contenuto sono estensioni da provare sui file del
   pilota, non una dipendenza per la ricerca dei metadati.
4. Aprire risultato con data e provenienza; distinguere copia disponibile,
   documento mancante, superato, scaduto o non verificato. Non dedurre conformità
   urbanistica o completezza del fascicolo dalla presenza del file.
5. Collegare a un lavoro storico, dichiarato o documentato, oppure a un
   intervento della piattaforma. Un ticket concluso non prova da solo che il
   lavoro sia stato eseguito e certificato; pianificazione e fatto sono separati.
6. Condividere solo versione e destinatario autorizzati, con durata e revoca;
   consegnare/esportare una selezione accompagnata da indice e provenienza.

**Stati.** File `in acquisizione → in controllo → disponibile/rifiutato`;
versione `bozza → pubblicata → sostituita/ritirata`; controllo `non eseguito →
formale` e verifiche specialistiche indipendenti; lavoro `pianificato →
in corso → concluso/annullato`, con evidenza `dichiarato/documentato` separata.
Scadenza e validità specialistica non sono intercambiabili con questi stati.

**Errori e recupero.** File corrotto/illeggibile: conservare la segnalazione e
richiedere sostituzione senza pubblicazione. Documento nella casa sbagliata:
ritirare accessi e indicizzazione, correggere con audit, verificare esposizioni
precedenti. Versioni in conflitto: entrambe con origine, scelta motivata della
versione corrente; nessuna cancellazione silenziosa. Anno incerto: intervallo
o valore ignoto visibile. Mancanza documento: richiesta di acquisizione, senza
scadenze promesse sulla base degli esempi locali 30/60 giorni.

| Criterio | Accettazione osservabile proposta |
| --- | --- |
| PF05-AC01 | Un titolo parziale con filtro anno/tipo restituisce la versione autorizzata corretta, distinguendo data storica e data di caricamento |
| PF05-AC02 | File sostituito conserva origine e cronologia; aprendo un vecchio riferimento si vede che è superato, entro i permessi ancora validi |
| PF05-AC03 | Controllo formale non produce etichetta di conformità tecnica/legale; ogni verifica specialistica indica autore, ambito, data ed evidenza |
| PF05-AC04 | Una condivisione scaduta/revocata impedisce nuove letture dal server, anche con link precedente; un download già consegnato non viene dichiarato cancellato dal dispositivo del destinatario |
| PF05-AC05 | Un lavoro storico senza documenti appare come dichiarato, con data precisa/approssimata esplicita; un lavoro pianificato non compare come eseguito |
| PF05-AC06 | Documenti non autorizzati non compaiono in conteggi, anteprime, OCR, ricerca, esportazioni o dati inviati all'assistente |
| PF05-AC07 | Allegato alla casa errata viene ritirato e corretto con evento attribuito; nessun grant del nuovo oggetto viene ereditato per errore dal precedente |

## PF06 — preparazione di una bozza contrattuale

**Risultato:** riutilizzare anagrafiche e dati verificati per una bozza
revisionabile con fonti riconoscibili. Fonti:
[EA28–EA29](../discussione-2026-10-07/ANALISI_CONVERSAZIONE.md#g-clienti-esistenti-ai-e-nuovo-spunto-visivo),
EA03 ed EA12. Jarvis, tipo di firma e responsabilità del modello restano aperti.
È possibile provare la compilazione guidata senza AI prima di confrontarne il
beneficio; nessuna integrazione esistente è presunta.

**Attori e prerequisiti.** Operatore con permesso di predisporre la pratica;
persona competente incaricata della revisione; parti autorizzate alla versione
condivisa. Servono template con autore/versione/ambito approvati per la prova,
immobile, parti e fonti autorizzate; dati economici e clausole mancanti devono
essere forniti esplicitamente. Generare una bozza non stipula un contratto.

**Dati e autorizzazioni.** Template/versione; elenco campi obbligatori; fonti
puntuali e data della verifica; snapshot dei dati selezionati; input dell'autore;
revisioni/differenze; output e relativo autore o processo; revisore/esito;
destinatari e audit. L'assistente riceve solo fonti consentite per l'utente e la
finalità, senza accesso all'intero archivio o alle bollette dell'inquilino.

**Sequenza proposta.**

1. Selezionare immobile, tipo di pratica, modello/versione e parti, comprese
   quelle nuove da verificare. Riusare il proprietario esistente non assegna
   permessi al nuovo conduttore prima della verifica.
2. Mostrare mappatura campo→fonte con data; segnalare dati mancanti, in conflitto
   o non aggiornati. Le cifre aperte EECard non entrano nel contratto per
   deduzione; canone, deposito e altre condizioni vengono confermati nella
   pratica, non presi da fixture o da un contratto diverso.
3. Compilare la bozza da template; se sperimentata, l'AI propone testo/campi
   distinti dai dati verificati e cita le fonti disponibili. Nessuna fonte
   sufficiente significa `dato mancante`, non un valore plausibile inventato.
4. Salvare versione con etichetta `bozza non approvata`, snapshot delle fonti,
   data e responsabile; il revisore confronta campi, clausole e fonti. Eventuali
   suggerimenti AI si accettano o rifiutano singolarmente con attribuzione.
5. Il revisore può chiedere modifiche o dichiarare la versione pronta per la
   successiva procedura. Una modifica a contenuto, modello o dati dopo tale
   passaggio invalida l'esito per la nuova versione e richiede nuova revisione.
6. Condivisione, firma, stipula e registrazione sono passaggi separati, ciascuno
   con propri prerequisiti. La presente prova si ferma alla bozza revisionata;
   nessun invio alle parti, firma o registrazione viene eseguito dall'assistente.

**Stati.** `preparazione → dati incompleti/pronti → bozza generata → in revisione
→ da correggere/pronta per il processo successivo → superata/archiviata`.
Gli esiti dell'eventuale generazione AI (`richiesta/in corso/riuscita/fallita`)
non cambiano autonomamente lo stato legale del contratto.

**Errori e recupero.** Modello vecchio o non adatto: selezione valida o revisione
umana, nessuna sostituzione tacita. Dati cambiati dopo la generazione: avviso di
obsolescenza e confronto delle differenze. Timeout AI: riprendere da input
salvati senza duplicare versioni definitive; compilazione manuale resta
possibile. Istruzioni malevole in un documento: trattarle come contenuto della
fonte, senza eseguire comandi, ampliare permessi o cambiare obiettivo. Revoca
fonte/mandato: interrompere nuovo recupero e ricalcolare la consultabilità della
bozza derivata, senza presumere che una copia AI sia sempre condivisibile.

| Criterio | Accettazione osservabile proposta |
| --- | --- |
| PF06-AC01 | Ogni dato precompilato rinvia alla fonte/versione selezionata; dati assenti o conflittuali rimangono evidenziati e impediscono la marcatura come pronta |
| PF06-AC02 | Output generato è sempre una bozza con modello/versione, data e attribuzione; nessuna generazione invia, firma, stipula o registra un contratto |
| PF06-AC03 | Un revisore vede le modifiche e può correggere/rifiutare il contenuto; un cambiamento successivo richiede nuova revisione della versione |
| PF06-AC04 | Documento contenente istruzioni di ignorare i permessi non altera il comportamento; fonti di altra agenzia o dell'inquilino non autorizzate non raggiungono il modello |
| PF06-AC05 | Con servizio AI non disponibile la pratica e gli input sono recuperabili e il percorso manuale resta utilizzabile |
| PF06-AC06 | Cambio o revoca del rapporto impedisce nuove letture delle fonti e della bozza quando il diritto non sussiste più; le decisioni di conservazione restano distinte |

## Criteri trasversali e prova successiva

| Criterio | Accettazione osservabile proposta |
| --- | --- |
| PT-AC01 | La stessa azione non autorizzata fallisce da pagina, URL diretto, API, download, ricerca, esportazione e contesto AI; l'interfaccia non è l'unico controllo |
| PT-AC02 | Errore rete o doppio invio non producono doppia adesione, ordine, pagamento o versione pubblicata; stato e modalità di ripresa sono comprensibili |
| PT-AC03 | Ogni transizione sensibile conserva attore, agenzia, oggetto/versione, istante, motivo/esito; i log non contengono copie di documenti privati o token |
| PT-AC04 | Tutti i percorsi hanno vuoto, caricamento, negato, errore recuperabile e conferma; sono percorribili con tastiera e testo ingrandito, senza dipendere da colore o QR |
| PT-AC05 | Scadenza/revoca di rapporto, delega o credenziale è applicata al nuovo accesso server e alle sessioni pertinenti; una cache non prolunga il permesso |

Prima dello sviluppo operativo: usare casi sintetici per PF01, PF02, PF03 e
PF05, includendo omonimi, cambio operatore, ex inquilino, card revocata e altra
agenzia. Registrare esito, tempo, interventi manuali e ambiguità; completare
poi la politica di accesso storico/conservazione e la matrice delle prove.
I criteri di questo documento **non sono ancora stati eseguiti**: la sessione
produce specifiche, senza nuovi test UI, hardware, firme o servizi reali.

Modello a supporto: [MODELLO_DATI.md](MODELLO_DATI.md).
