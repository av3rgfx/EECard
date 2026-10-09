# Contratti semantici preliminari — PF01 → PF02 → PF05

9 ottobre 2026. Approfondimento documentale **BF03, da revisionare**. Specifica
precondizioni, risultati e negazioni utili alla futura progettazione dei servizi;
non definisce endpoint, OpenAPI, schema database o provider. Non realizza servizi
e non chiude BF03. BF01 resta necessario per l'ambito operativo; BF16 deve
ancora fornire osservazioni umane per correggere processo e priorità. R1 rimane
il perimetro della prova, non un rilascio commerciale approvato.

Questo allegato applica i [percorsi e criteri PF/PT](../specifiche-2026-10-08/PERCORSI.md)
e il [modello con criteri MD](../specifiche-2026-10-08/MODELLO_DATI.md), che restano
i riferimenti principali. Riusa gli ID esistenti senza introdurre una seconda
numerazione di requisiti. Le formulazioni aggiuntive sono **proposte**, da
riportare nei riferimenti principali solo dopo revisione. Il [backlog BF](../specifiche-2026-10-08/OFFERTE_RILASCIO.md)
conserva dipendenze e criteri di completamento; nessuna prova qui descritta
risulta eseguita su un backend.

## Base letta e confine della proposta

Sono stati riletti studio v0.1 §§3, 6, 8, 11–13 dalla [copia DOCX](../EECard-studio-v0.1.docx),
[EA01–EA30](../discussione-2026-10-07/ANALISI_CONVERSAZIONE.md), specifiche e kit.
Lo studio proponeva già relazioni temporali, revoca, versioni immutabili e
isolamento; tempi, budget e dimensione del pilota restano ipotesi storiche.
Le distinzioni attuali fra permesso di consultazione e consegna, credenziale
revocata e ricerca assistita sono precisate nel [rapporto del kit](../prova-agenzia-2026-10-08/ESITO_SIMULAZIONE.md).

La rilettura dei sorgenti conferma il confine: [data.ts](../../../src/data.ts)
ha ruolo e card globali; [App.tsx](../../../src/App.tsx) filtra le case e persiste
nel browser; [pages.tsx](../../../src/pages.tsx) simula accesso e ricerca;
[panels.tsx](../../../src/panels.tsx) conserva i quattro significati finanziari
ma non un registro server. Questi dati dimostrativi non sono anagrafiche da
migrare. Non si modifica il frontend né il kit BF02.

Ambito: EA03–EA04/EA15/EA27 per attivazione, EA08–EA09/EA13/EA16 per banco,
EA24–EA26 per storico. EA20/EA22 vincolano ogni lettura; EA07 vincola gli stati
economici. Wallet, firma, AI e secondo schermo mantengono le condizioni in
[FATTIBILITA.md](../specifiche-2026-10-08/FATTIBILITA.md); non diventano
dipendenze artificiali del recupero assistito con server disponibile.

## Regole comuni a comandi e letture

Un **comando** chiede una transizione attribuita; una **lettura** restituisce
una vista consentita e non attiva adesioni, grants o incassi. Registrare l'audit
di una lettura non la trasforma in approvazione del documento.

| Elemento semantico | Contenuto minimo proposto e vincolo |
| --- | --- |
| Contesto verificato | Account personale, agenzia corrente, eventuale rappresentanza/delega, scopo e sessione personale valida dell'attore; per operazioni svolte dall'agenzia, sessione operatore; al banco anche sessione visita. L'attore proviene dalla sessione verificata, non da un ruolo dichiarato dal chiamante |
| Oggetto e azione | Riferimenti coerenti a pratica, unità, contratto, soggetto, documento/versione e azione richiesta. Ogni collegamento va ricontrollato nello stesso dominio; conoscere un ID non concede accesso |
| Titolo e tempo | Rapporto, mandato, assegnazione o grant esplicito per quell'azione, contenuto e periodo; validità e revoca valutate al momento della richiesta. La card aiuta a individuare il contesto, non sostituisce il titolo |
| Precondizione di modifica | Versione attesa dell'oggetto modificabile, dati con fonte e chiave di ripetizione dell'operazione. Due comandi concorrenti non scelgono silenziosamente l'ultimo arrivato |
| Risultato del comando | Riferimento all'operazione, stato effettivamente registrato, revisione risultante e prossima azione consentita. `Ricevuto/in attesa` è distinto da `completato`; invito preparato non significa inviato né accettato |
| Risultato della lettura | Solo campi ammessi, versione e provenienza, stato e data del riscontro. Conteggi, suggerimenti, anteprime e indice di esportazione rispettano lo stesso perimetro dei contenuti |
| Negazione e recupero | Sessione assente/scaduta, accesso non disponibile, precondizione incompleta, conflitto di versione o esito temporaneamente ignoto sono esiti diversi. Per oggetti estranei la risposta non conferma esistenza, titolo, intestatario o altra agenzia |
| Evidenza di controllo | Attore, agenzia, azione, oggetto/versione, istante, esito e motivo pertinente secondo PT-AC03. Audit consultabile solo con titolo; niente token, contenuti integrali o recapiti inutili nei log |

I controlli di autorizzazione precedono qualsiasi contenuto dell'esito, anche
quando si recupera un comando precedente. La disponibilità commerciale abilita
una funzione entro i permessi esistenti: non concede documenti altrui e non
deve impedire impropriamente la consegna di quelli dovuti.

## PF01 — preparare e attivare il contesto personale

| Operazione semantica | Precondizioni e risultato proposto | Negazione/recupero e criterio esistente |
| --- | --- | --- |
| Leggere la pratica per preparare l'attivazione | Operatore con appartenenza, mandato e assegnazione pertinenti; restituisce parti/unità, origine dei campi, verifiche, mancanti e candidati duplicati nel solo dominio autorizzato | Omonimia non risolta: nessun collegamento automatico; niente ricerca di identità in altre agenzie. PF01-AC04/AC07, MD-AC01 |
| Registrare una corrispondenza o rettifica dei dati | Potere di modifica e versione attesa; conserva sorgente, scelta motivata e autore. Le possibili corrispondenze non sono persone già verificate | Conflitto concorrente o di identità: revisione attribuita, senza fusione o sovrascrittura. PF01-AC04, MD-AC06 |
| Registrare la verifica del rapporto | Referente competente, fonte ed esito per soggetto, unità/ambito, contratto, azioni e periodo. Verifica di recapito separata | Mancanza/contestazione del titolo lascia il collegamento in verifica; non espone file. PF01-AC02, MD-AC02 |
| Predisporre, revocare o riemettere un invito individuale | Facoltà esplicita di invitare; soggetto verificato e destinazione pertinente. La riemissione conserva il soggetto e invalida il precedente invito | Invito scaduto/revocato non abilita accessi. Un errore di invio si recupera sullo stesso processo senza ricreare account o adesione. PF01-AC01/AC05, PT-AC02 |
| Collegare l'account al rapporto | Invito valido, verifica dell'accesso personale e corrispondenza del soggetto; account già esistente riutilizzato senza fondere profili di agenzie diverse | Il possesso del recapito o della card non basta. Ogni comproprietario/conduttore ha accesso personale e titolo proprio. PF01-AC01/AC02, MD-AC01/AC02 |
| Registrare adesione e abilitazione commerciale | Offerta/versione, venditore, condizioni, aderente, pagante e beneficiari definiti; accettazione attribuita; eventuali requisiti economici verificati distintamente | **Dipende da BF01:** condizioni e metodo di incasso restano aperti. Rifiuto conserva la pratica; allegato o esito ignoto non attivano la quota. PF01-AC03/AC06 |
| Leggere il riepilogo di attivazione e consegna | Stato distinto di rapporto, invito, adesione, credenziale e documenti pertinenti a ciascun destinatario; mancanti espliciti | Un riepilogo pronto non invia inviti, pubblica file o emette supporti. Nessuna consegna indiscriminata di documenti d'identità alle parti. PF01-AC01/AC02 |

La tabella non impone una transazione unica per tutta l'attivazione: più passi
possono essere incompleti senza perdere la pratica. Ogni effetto confermato
deve essere riconciliabile; eventuali operazioni asincrone future mantengono
riferimento ed esito proprio. Non viene simulata un'adesione commerciale
completata quando mancano le decisioni BF01.

## PF02 — ritrovare il contesto e chiudere la visita

| Operazione semantica | Precondizioni e risultato proposto | Negazione/recupero e criterio esistente |
| --- | --- | --- |
| Aprire la sessione banco | Operatore nominativo autenticato, agenzia/sede; dispositivo abilitato quando pertinente. Nuova visita inizialmente senza cliente né contenuto precedente | Sessione o dispositivo revocati impediscono la consultazione. PF02-AC05, MD-AC08 |
| Presentare la credenziale o cercare in modo assistito | Credenziale opaca risolta nel dominio ammesso, oppure ricerca minima autorizzata; restituisce candidati pertinenti per la verifica dell'operatore | Card non autentica cliente/operatore e non apre file. Revocata o ignota: esito non rivelatore, possibile verifica assistita distinta; nessuna riattivazione. PF02-AC02/AC03 |
| Confermare persona, scopo e rapporto | Verifica della corrispondenza secondo procedura da definire; selezione esplicita tra case/contratti ammessi | Non scegliere automaticamente il contratto più recente. Storico consentito non riapre operazioni concluse. PF02-AC01, MD-AC03 |
| Leggere il riepilogo e riprendere la pratica | Permesso rivalutato su rapporto e singolo documento; stato, provenienza/versione, mancanti e prossimo passo autorizzato | Il nuovo operatore deve avere mandato/assegnazione propri. Non eredita la sessione né la memoria del collega. PF02-AC01/AC02 |
| Chiudere o sospendere la visita | Registra esito pertinente e chiusura; invalida il contesto della visita e l'eventuale vista condivisa, elimina temporanei previsti | Cambio cliente, blocco operatore o perdita di permesso impongono nuova verifica; nessuna nuova lettura privata offline. PF02-AC05/AC06, PT-AC05 |

La chiusura della visita non revoca indistintamente altri rapporti o l'account
personale del cliente. Il blocco card riguarda quella credenziale; una verifica
di compromissione può richiedere revoca attribuita delle sessioni pertinenti.
La ricerca senza lettore richiede comunque il server: indisponibilità del
lettore e indisponibilità del servizio sono due condizioni diverse.

Se il secondo schermo verrà incluso dopo DA03, riceverà una selezione esplicita
autorizzata sia all'operatore sia al destinatario, con sessione separata. I
contratti sopra non assegnano destinatari, tempi di inattività, hardware o firma.

## PF05 — cercare, consultare e consegnare una versione

| Operazione semantica | Precondizioni e risultato proposto | Negazione/recupero e criterio esistente |
| --- | --- | --- |
| Cercare per titolo/tipo/data e contesto | Ambito autorizzato; risultati, conteggi e suggerimenti già limitati. Data originale, precisione e acquisizione restano distinte | Anno ignoto non diventa anno di upload; nessuna fuga da titolo/snippet/conteggio. Regola di inclusione degli anni incerti nel filtro da provare in BF16. PF05-AC01/AC06, MD-AC04 |
| Leggere metadati o contenuto della versione | Verifica corrente del titolo e del file/derivato richiesto; mostra provenienza, stato, controlli e versione esatta | Un risultato elencato prima della revoca non autorizza l'apertura dopo. Vecchio riferimento mostra versione superata solo se ancora consultabile. PF05-AC02/AC04, PT-AC05 |
| Registrare o pubblicare una nuova versione | Facoltà di acquisire/pubblicare, fonte e oggetto corretto, file leggibile e controlli tecnici previsti; versione precedente conservata | File rifiutato resta non pubblicato. Correzione di versione pubblicata genera nuova versione collegata; conflitto non risolto con cancellazione tacita. PF05-AC02/AC03, MD-AC04/AC06 |
| Correggere l'associazione a immobile/rapporto | Operatore competente; ritira gli accessi errati e l'indicizzazione, registra motivo e collegamento corretto con nuovi controlli | Nessun grant ereditato dal vecchio oggetto. Le esposizioni già avvenute richiedono valutazione separata, non spariscono dall'audit. PF05-AC07 |
| Condividere o esportare una selezione | Titolo distinto per consegna/condivisione, destinatario identificato, versioni esplicite e durata; indice con provenienza, autorizzazione rivalutata alla consegna | Consultazione non implica facoltà di consegnare. Revoca/scadenza blocca nuovi recuperi, non cancella copie già ricevute. Nuove versioni non entrano automaticamente nella condivisione. PF05-AC04/AC06 |
| Leggere cronologia lavori e relativi allegati | Permessi valutati separatamente su lavoro e allegati; data precisa/incerta, stato pianificato/eseguito ed evidenza dichiarata/documentata distinguibili | Ticket concluso non certifica esecuzione; lavoro condivisibile non espone costi, recapiti e documenti privati. PF05-AC05, MD-AC07 |

Per `consultazione` si intende il contenuto autorizzato necessario alla vista;
la consegna/esportazione a un destinatario è un'azione ulteriore. La distinzione
non promette che sia impossibile fotografare o copiare quanto legittimamente
visualizzato. Ogni richiesta tecnica a file, anteprima o derivato resta soggetta
ai controlli server; nessun percorso pubblico permanente può aggirarli.

## Matrice azione–oggetto: casi ammessi e negati

“Ammesso” significa che **tutte** le precondizioni del caso sono state
verificate. Un ruolo, un mandato generico o una card attiva da soli non bastano.
La matrice usa MD-AC01–AC03/AC07–AC08 e PT-AC01/PT-AC05.

| Attore e oggetto | Caso ammesso | Caso negato e motivo |
| --- | --- | --- |
| Operatore, pratica PF01 | Preparare/leggere nel mandato e nell'assegnazione che comprendono quelle azioni | Operatore della stessa agenzia senza assegnazione/titolo: ruolo organizzativo insufficiente |
| Operatore, invito PF01 | Predisporre o revocare invito per la parte verificata con facoltà di invitare | Solo lettura del fascicolo: non autorizza creare account/grants né invitare altre parti |
| Cliente, documenti PF01 | Consultare versioni pertinenti dopo verifica dell'account, del rapporto e del titolo | Recapito verificato, card `in verifica` o acquisto pacchetto: non danno accesso anticipato |
| Operatore, fascicolo PF02 | Ritrovare un fascicolo autorizzato, anche se creato dal collega | Card valida con mandato assente, altra unità o altra agenzia: nessun contenuto né conferma di esistenza |
| Operatore, copia richiesta al banco | Consegnare la versione se mandato e destinatario consentono consegna/esportazione | Mandato di sola consultazione: richiesta di copia sospesa e titolo da acquisire, come nel kit S05 |
| Proprietario, contratto/documento tecnico PF05 | Versione pertinente al proprio titolo e priva di dati ulteriori non condivisibili | Bolletta personale dell'inquilino o documenti di altri comproprietari senza titolo: stessa casa e pacchetto superiore non bastano |
| Intestatario/delegato, bolletta | Documento e periodo della propria intestazione o delega valida | Delega scaduta/revocata o bolletta del precedente intestatario senza titolo specifico; il subentro non trasferisce lo storico |
| Ex inquilino, contratto concluso | Sola lettura dei propri documenti inclusi in un grant storico esplicito, se la politica futura lo consente | Nuove operazioni derivanti dal rapporto cessato, contenuti del successore o storico senza titolo |
| Tecnico, lavoro e allegati | Documenti necessari all'incarico valido e all'azione concessa | Ricerca generale di contratti, affitti o bollette; fine incarico senza grant residuo |
| Amministratore/supporto, contenuti | Solo specifico titolo operativo o eccezionale motivato, limitato e tracciato | Privilegio di amministrare ruoli/sistema interpretato come consultazione universale |

L'accesso negato deve restare tale da ricerca, URL/ID diretto, contenuto del
file, esportazione, indice e futuri processi automatici. La presenza di un
documento nell'archivio immobiliare non lo rende comune a tutte le parti.

## Invarianti temporali, revoca, ripetizione e versioni

| Aspetto | Comportamento da conservare/provare | Riferimenti |
| --- | --- | --- |
| Due tempi distinti | Data del fatto/validità e istante di registrazione restano separati. Rettificare oggi una cessazione passata non riscrive l'audit né presenta come mai avvenuto un accesso precedente | MD-AC03/AC04, PT-AC03 |
| Efficacia del titolo | Testare prima, al limite e dopo l'efficacia configurata. Estremi inclusivi/esclusivi, conversione delle date civili e fuso devono essere definiti prima dell'implementazione; nessuna durata commerciale viene inventata | MD-AC03, PT-AC05 |
| Revoca durante una lettura | Rivalutare il titolo prima della restituzione, anche se ricerca o esportazione erano iniziate prima. Negare nuovi recuperi dopo revoca; invalidare contesti/cache pertinenti. Non promettere il ritiro dei byte già consegnati | PF05-AC04/AC06, PT-AC05 |
| Card sostituita | Vecchio ID definitivamente revocato, nuovo ID distinto; la nuova credenziale non riattiva quella vecchia e non amplia i grants. Il contenuto visibile su un pass obsoleto non è fonte di permesso | PF02-AC03, MD-AC08 |
| Stesso comando ripetuto | Proposta: chiave vincolata ad agenzia, attore e tipo di operazione, con identità dell'intento/payload. Stessa chiave e stessa intenzione recuperano lo stesso risultato persistito; richiesta modificata con la stessa chiave è conflitto | MD-AC06, PT-AC02 |
| Esito ignoto e concorrenza | Timeout non significa fallimento. Cercare l'esito della stessa operazione prima di crearne una nuova; invii simultanei producono un solo effetto. Una versione attesa superata richiede rilettura e scelta attribuita, senza ritentare ciecamente | MD-AC06, PT-AC02 |
| Ripetizione dopo revoca | Il registro della richiesta non conferisce accesso: rivalutare i permessi prima di restituire il risultato. Non rieseguire un comando già registrato; non restituirne dati ormai negati. Durata del registro e ripresa da altro operatore sono da definire | MD-AC03/AC06, PT-AC05 |
| Versione pubblicata | Contenuto, provenienza e controlli restano riferiti alla versione esatta. Nuova pubblicazione non eredita tacitamente condivisioni o verifiche specialistiche; una correzione mantiene la catena | PF05-AC02/AC03, MD-AC04 |
| Fine rapporto, adesione e mandato | Ogni evento ha efficacia propria. Cessa il potere operativo derivato dal titolo terminato; storico eventuale usa grant separato. Nessuna cancellazione automatica di saldi, controversie o documenti dovuti; esportazione conserva il controllo del destinatario | PF03-AC03/AC06, MD-AC03/AC07 |
| Quattro eventi economici | Documento caricato, pagamento dichiarato, incasso verificato e quietanza sono distinti. Solo allocazioni verificate efficaci riducono il residuo; una quietanza parziale non lo azzera. Quota, canone, deposito e bollette restano separati | EA07, PF04-AC03/AC04, MD-AC05 |

## Criteri futuri con due agenzie sintetiche

Preparazione documentale per BF03/BF04/BF05/BF07/BF09: **non è un nuovo kit
BF02, una sua esecuzione o un risultato BF16**. I nomi Agenzia Alfa e Agenzia
Beta indicano due domini sintetici e non i set A/B controbilanciati del kit.
In ciascun dominio prevedere operatori nominativi, pratiche con titoli simili,
un contratto attivo e uno concluso, una card revocata e una nuova, documento
storico con due versioni, bolletta privata e delega scaduta. Uno stesso account
può essere cliente delle due agenzie con profili/grants indipendenti; nessuna
identità o evidenza reale è necessaria.

| Preparazione e tentativo futuro | Risultato da verificare sui servizi futuri | Criteri già definiti |
| --- | --- | --- |
| Operatore Alfa cerca titolo/ID noto di Beta o associa alla pratica Alfa un allegato Beta | Nessun contenuto, conteggio o conferma di esistenza; collegamento rifiutato. Ripetere invertendo le agenzie | MD-AC01, PF02-AC02, PT-AC01 |
| Stesso account cliente passa dal profilo Alfa a Beta senza grant sul documento richiesto | Nessuna fusione di profili, deduplicazione rivelatrice o trasferimento implicito dei file | MD-AC01/AC02, PF01-AC07 |
| Doppio invio e timeout dopo persistenza di collegamento/invito/pubblicazione; poi richiesta modificata con la stessa chiave | Un solo effetto e risultato riconciliabile; payload diverso in conflitto. Ripetere il recupero dopo revoca senza esporre il risultato privato | MD-AC06, PT-AC02/PT-AC05 |
| Due operatori modificano la stessa pratica dalla medesima versione | Una modifica non sovrascrive silenziosamente l'altra; esito di conflitto e risoluzione con autore/fonte | PF01-AC04, PT-AC03 |
| Presentazione di card vecchia, poi recupero assistito con operatore autorizzato e server disponibile | Card rifiutata; recupero distinto possibile dopo verifica. Stesso tentativo senza server non apre file locali | PF02-AC03/AC06, MD-AC08 |
| Versione trovata prima della scadenza della delega e aperta dopo; esportazione in corso mentre il grant è revocato | Nessuna nuova consegna dopo perdita del titolo; risultato e file soggetti agli stessi controlli. Ripetere su anteprima e vecchio collegamento | MD-AC03, PF05-AC04, PT-AC05 |
| Subentro con stesso immobile; ricerca della bolletta precedente da nuovo inquilino e da proprietario | Entrambi negati senza titolo specifico; l'ex intestatario consulta solo l'eventuale storico autorizzato. Nessun accesso implicito da piano commerciale | PF03-AC02/AC03, MD-AC07 |
| Documento con anno ignoto/intervallo e due versioni; filtro anno, vecchio riferimento, nuova condivisione | Precisione/origine leggibili, versione giusta secondo regola concordata; nessuna sostituzione dell'anno con acquisizione o esposizione della nuova versione non condivisa | PF05-AC01/AC02/AC04, MD-AC04 |
| Fine locazione, disdetta adesione e revoca card in tre eventi separati | Effetti distinti e attribuiti; nessun ritorno ai poteri operativi con una card nuova. Storico soltanto secondo grant/politica espliciti | PF03-AC06, MD-AC03/AC08 |
| Dovuto sintetico 100, dichiarazione 100, verificato/allocato 40 e quietanza 40 | Residuo 60; file o quietanza non producono altra allocazione. Nessuna operazione monetaria eseguita | PF04-AC03/AC04, MD-AC05 |

Ogni futura esecuzione dovrà registrare configurazione/commit, fixture, attore,
titolo e periodo, tentativo, atteso/osservato ed evidenza minimizzata. Un
controllo a tavolino può trovare contraddizioni; solo il collaudo di servizi e
file realizzati può dimostrare le negazioni software. Qui non sono riportati
percentuali, tempi, costi o esiti inventati.

## Cosa deve cambiare con osservazioni o decisioni

| Input ancora necessario | Revisione concreta dell'allegato | Dipendenza conservata |
| --- | --- | --- |
| Osservazioni BF16 su PF01: campi reinseriti, omonimie, aiuti, preparazione e mancanti | Minimo informativo, ordine delle verifiche e gestione conflitti; l'efficacia della procedura non è dedotta dalla tabella | BF02 già pronto; BF16 aperto |
| Osservazioni BF16 su PF02: cambio operatore, più rapporti, card assente e richiesta di copia | Procedura di verifica della persona, disambiguazione e distinzione consultazione/consegna; durata sessioni da valutare | BF16; BF07 dipende da BF04/BF06 |
| Osservazioni BF16 su PF05: anno incerto, due versioni e provenienza | Regola esplicita per filtri incerti, informazioni necessarie alla scelta corretta e correzioni del fascicolo | BF16; BF09 dipende da BF05/BF08 |
| Primo beneficio/pagante, catalogo, condizioni e responsabilità | Operazioni da includere, requisiti dell'adesione e soggetti competenti; nessun listino o calendario ricavato dalle fonti storiche | BF01, DA01/DA02/DA06 |
| Politica approvata per storico, conservazione, consegna/uscita e fine mandato | Oggetti/azioni/periodi dei grants storici, responsabile della concessione e termini; fino ad allora nessuna apertura reale per ex rapporti | BF03 e condizioni BF17 |
| Progettazione tecnica e prove di autorizzazione | Strategia di revoca dei file, atomicità dei retry, conservazione del registro operazioni, autenticazione/recupero, estremi temporali e invalidazione cache | BF03 prima di BF04/BF05; nessun provider scelto |

BF03 potrà essere valutato rispetto al proprio criterio quando ambito operativo,
matrice e politiche mancanti saranno revisionati con i responsabili pertinenti.
BF16 non è surrogato da questi contratti: le osservazioni possono cambiarne
sequenza e priorità. BF17/BF18 conservano tutte le condizioni per un eventuale
pilota; questa consegna non autorizza servizi, inviti, pagamenti o firme reali.
