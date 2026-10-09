# EECard — modello logico proposto

Versione di lavoro dell'8 ottobre 2026. È una specifica concettuale per
[PF01–PF06](PERCORSI.md), non uno schema database, una scelta di provider o
un'architettura approvata. I vincoli già ricevuti sono conservati; entità,
cardinalità e transizioni aggiunte sono proposte da validare.

Fonti: [EA01–EA30](../discussione-2026-10-07/ANALISI_CONVERSAZIONE.md),
[studio v0.1](../EECard-studio-v0.1.pdf) §6 e §11,
[PRODUCT.md](../../../PRODUCT.md). Il nome EECard resta provvisorio.

## 1. Il cambiamento necessario rispetto al prototipo

| Evidenza nei sorgenti | Conseguenza per il prodotto operativo |
| --- | --- |
| `DemoState.role` e `property`, `cardId` e `blocked` globali; `payments: Record<string, Payment>` in [data.ts](../../../src/data.ts) | Occorrono identità reali, rapporti temporali, credenziali individuali, contratti e dovuti per periodo; non migrare queste fixture come anagrafiche |
| `roleHouses` limita l'inquilino alla casa demo `p1`; stato persistito nel browser in [App.tsx](../../../src/App.tsx) | Contesto selezionato e permesso sono distinti; il server decide quali oggetti appartengono alla sessione autenticata |
| `Doc` ha metadati sintetici; `Share` usa destinatario e durata come stringhe; `FileInput` conserva il nome in [ui.tsx](../../../src/components/ui.tsx) | File privati, versioni, destinatari identificati e scadenze effettive; un nome file non è un documento acquisito |
| `PaymentPanel` in [panels.tsx](../../../src/panels.tsx) espone fasi, fonte/autore e residuo per un solo record | Preservare quei significati con entità distinte e più pagamenti/periodi, evitando un unico stato che perde gli eventi precedenti |
| `UtilitiesPage` in [pages.tsx](../../../src/pages.tsx) dipende dal ruolo inquilino; ticket con eventi testuali | Modellare intestazione/delega e lavoro storico indipendentemente da ruolo globale e ticket |

Nessun componente attuale dimostra autenticazione server, isolamento fra agenzie,
archivio privato, wallet/NFC, firma o AI. Il modello non trasforma queste
assenze in integrazioni già disponibili.

## 2. Confini e convenzioni

Un'**agenzia** è l'organizzazione che gestisce un proprio dominio di lavoro
(tenant). Qui “tenant” indica l'isolamento organizzativo, non l'inquilino.
Una sede appartiene a un'agenzia; il marchio comune non federerà automaticamente
i fascicoli. Un cliente può avere rapporti con più agenzie, ciascuno esplicito.

Una **persona** è il soggetto rappresentato nei rapporti; un **account** è
l'identità che accede; un **profilo cliente dell'agenzia** raccoglie i dati di
quel rapporto; un'**adesione** regola benefici commerciali; una **credenziale** è
il mezzo revocabile di presentazione. Un account non equivale a una card e il
pagante non acquisisce automaticamente documenti di tutti i beneficiari.

Proposta prudente: identità di accesso riutilizzabile dalla stessa persona, ma
profili, verifiche e fascicoli isolati per agenzia. Nessuna deduplicazione fra
agenzie rivela che una persona sia cliente altrove. La scelta tecnica fra
registri fisicamente separati o isolamento nello stesso archivio resta aperta.

Convenzioni trasversali proposte:

- Identificativi opachi, stabili e non significativi per gli utenti; nessun
  codice fiscale, indirizzo, nome o numero di contratto codificato nella card.
  Ogni riferimento interno include un ambito organizzativo coerente.
- Per relazioni: `valido_dal`, `valido_al` e stato; per modifiche:
  `registrato_il`, autore e motivo. Una rettifica registrata oggi può riguardare
  un evento passato: tempo del fatto e tempo della registrazione sono distinti.
- Per documenti storici: data/anno/intervallo, precisione e origine della data;
  l'anno ignoto non diventa l'anno dell'upload. Per audit: istante univoco e fuso
  di visualizzazione esplicito; per contratti: date civili secondo il contesto.
- Importi a precisione fissa con valuta; nessun importo monetario a virgola
  mobile. Durata, unità di prezzo e periodicità sono dati commerciali da
  approvare, non valori ereditati da audio o fixture.
- Transizioni attribuite, richieste ripetibili senza duplicati e controllo
  della versione attesa per evitare sovrascritture concorrenti.
- Cancellazione, rettifica e conservazione hanno regole per categoria e scopo.
  Non applicare una conservazione universale illimitata, né cancellare tutto
  alla fine della locazione. Termini e responsabilità rimangono aperti.

## 3. Persone, agenzie e rapporti immobiliari

Fonti: EA03–EA05, EA16, EA19–EA20, EA22, EA27. Percorsi PF01, PF03, PF06.

| Entità logica | Dati essenziali e relazioni |
| --- | --- |
| Agenzia | Identità organizzativa, stato, configurazione del servizio; 1 agenzia ha 0..N sedi, profili cliente, mandati e fascicoli |
| Sede | 1 agenzia, recapiti operativi, stato; 1 sede ha 0..N dispositivi, senza diventare proprietaria dei fascicoli |
| Account | Identità di accesso, recapiti verificati, stato, fattori/sessioni; 1 persona può non avere ancora account e avere poi un account personale nella proposta iniziale; mai account condiviso fra parti |
| Soggetto | Persona fisica oppure organizzazione rappresentata; dati minimi nel dominio autorizzato; una società opera tramite persone con deleghe, non tramite un account prestato |
| Profilo cliente | 1 agenzia e 1 soggetto locale; collegamento all'account soltanto dopo verifica; origine dei dati e recapiti del rapporto. Stesso account può collegarsi a più profili, senza unirne i documenti |
| Appartenenza operatore | Relazione N:M account–agenzia con ruolo operativo, ambito, stato e validità; privilegi di amministrazione non implicano lettura indistinta di ogni contenuto |
| Immobile / unità | Immobile 1:N unità (almeno un'unità quando usata nei percorsi); identificazione locale, indirizzo e riferimenti disponibili; la prima persona che lo inserisce non ne diventa proprietaria |
| Titolarità | Relazione N:M soggetto–unità con tipo, quota se nota, validità, fonte e verifica; comproprietà non è delega a rappresentare gli altri |
| Occupazione | Relazione N:M soggetto–unità/ambito con periodo, titolo e fonte; può derivare da contratto oppure uso proprio verificato; distinta dalla titolarità e dalla fornitura |
| Mandato di agenzia | Agenzia, soggetto conferente, unità/contratto o pratica, azioni consentite, date, fonte e stato; assegnazioni operative ne restringono l'ambito |
| Delega | Delegante, delegato, oggetti/ambito, azioni, validità, prova e stato; delegante deve possedere il diritto delegato e la facoltà di delegarlo |
| Verifica del rapporto | Oggetto verificato, tipo di controllo, esito, fonte, autore competente, data ed eventuale scadenza; recapito verificato non basta a confermare proprietà o rappresentanza |

Il modello deve supportare più proprietari e conduttori senza dedurne quote o
responsabilità economiche. Un contratto può avere più unità/ambiti (ad esempio
pertinenze); una sovrapposizione temporale si valuta sull'ambito, non si vieta
indiscriminatamente. La variante per locazione di stanza richiede esplicita
delimitazione, se inclusa nel pilota.

## 4. Contratto, fascicolo e documenti

Fonti: EA03–EA04, EA24–EA26, EA29. Percorsi PF01, PF02, PF05, PF06.

| Entità logica | Relazioni e vincoli |
| --- | --- |
| Pratica | 1 agenzia, scopo, responsabile, stato; collega soggetti, immobili, documenti e 0..N contratti senza sostituirli |
| Contratto | 1 agenzia di gestione nell'ambito isolato, tipo, date, stato ed eventi; N:M unità tramite AmbitoContratto; N:M soggetti tramite ParteContrattuale |
| ParteContrattuale | 1 contratto e 1 soggetto, ruolo, validità, rappresentante/delega se pertinente; subentro crea un nuovo intervallo, non riscrive il precedente |
| EventoContrattuale | 1 contratto, tipo (stipula dichiarata/documentata, decorrenza, subentro, cessazione, rettifica), data del fatto, registrazione, autore e documenti; prova archiviata non equivale ad adempimento eseguito dal software |
| Fascicolo | Vista organizzata di oggetti/documenti consentiti per unità, contratto o pratica; non tre copie incoerenti per agenzia/proprietario/inquilino e non un grant totale implicito |
| Documento | Identità del documento, categoria, oggetto principale e collegamenti pertinenti; 1 documento ha 1..N versioni; l'associazione a un immobile non rende il file pubblico a tutte le sue parti |
| VersioneDocumento | 1 documento, numero/versione, data originale e precisione, origine/autore/ente, data acquisizione, stato, eventuale scadenza, file originale e riferimento alla versione sostituita; pubblicazione immutabile |
| FilePrivato | Riferimento storage, digest di integrità, tipo/dimensione rilevati, stato di scansione/leggibilità e acquisizione; download autorizzato server, senza percorso pubblico permanente |
| DerivatoDocumento | 1 versione origine; tipo (anteprima, OCR, estratto oscurato), versione del processo e stato; stessi vincoli di accesso o restrizioni maggiori, mai permessi più ampi automatici |
| ControlloDocumento | 1 versione, autore, ambito, tipo formale/specialistico, esito, data e fonte; possono esistere più controlli di competenze diverse senza un singolo booleano “valido” |
| CondivisioneDocumento | Versione o insieme esplicito di versioni, destinatario identificato, azioni, scadenza, autore e revoca; eventuale accesso alle versioni future richiede regola esplicita |
| LottoAcquisizione | Agenzia, fonte, responsabile, data, stato e conteggi; 1 lotto ha N record di importazione con esito, corrispondenza e conflitti; utile a migrazione EA27 e importazioni manuali |

Proposta: i collegamenti documento–contratto/unità/lavoro sono molti-a-molti
tramite riferimenti tipizzati, ma ogni collegamento viene controllato nel suo
dominio. Non duplicare il file per ogni vista. Una versione che contiene dati
non condivisibili richiede una versione derivata oscurata e verificata oppure
una selezione diversa, non un'etichetta di ruolo più permissiva.

Un file di un'altra agenzia eventualmente consegnato dal cliente si acquisisce
con la sua provenienza nel nuovo ambito e con un titolo pertinente; questo non
apre l'archivio dell'agenzia precedente. La possibilità di collegare archivi
fra agenzie è una decisione futura, non una scorciatoia tecnica del modello.

## 5. Utenze, bollette e storia dei lavori

Fonti: EA20–EA26. Percorsi PF03–PF05.

| Entità logica | Relazioni e vincoli |
| --- | --- |
| Fornitura | 1 unità/ambito, tipo e identificativo esterno se disponibile, fornitore, stato; 1 fornitura ha N intestazioni nel tempo |
| Intestazione | Fornitura, uno o più soggetti intestatari espliciti, periodo, stato e fonte; collega deleghe specifiche. Cambio occupante non determina automaticamente una voltura |
| Bolletta | 1 intestazione (o caso contestato da risolvere), creditore, riferimento esterno, periodo fatturato, importo/valuta, scadenza, eventuale domiciliazione, documento/versione originale; più bollette per intestazione |
| DatiAvviso | 1 bolletta, payload/codice del QR proveniente dal documento o canale autorizzato, versione, fonte, esito estrazione e conferma; nessuna fiducia automatica in URL o dati estratti |
| EventoBolletta | Emissione, rettifica, annullamento o altra informazione, autore/fonte/data; collegamento fra originale e rettifica, senza sovrascrittura dei fatti |
| Lavoro | 1 unità/ambito, descrizione, date/precisione, stato pianificato/in corso/concluso/annullato, evidenza dichiarata/documentata, esecutore e provenienza; 0..N documenti e 0..N incarichi collegati |
| RichiestaAssistenza | Segnalante, unità, contatto pertinente, descrizione e stato; la ricezione non autorizza spesa o intervento |
| Incarico | 1 richiesta o lavoro, tecnico, ambito, stato assegnato/accettato/rifiutato/concluso, date e accessi ai soli dati necessari |
| ApprovazioneSpesa | Richiesta/lavoro, preventivo/versione, soggetto competente, importo/limiti, esito e data; variazioni non ereditano automaticamente l'approvazione precedente |

Il lavoro storico può esistere senza un ticket EECard. Il ticket concluso può
avere esito “nessun lavoro”: non creare automaticamente un intervento eseguito.
Contatti del tecnico, costi e documenti personali restano soggetti ai grants
pertinenti anche quando una timeline tecnica dell'immobile è condivisibile.

EA23 domotica rimane esplorativa: il modello non introduce un controllo remoto
né un catalogo dispositivi domestici definitivo. Se il caso d'uso sarà scelto,
aggiungere installazione, titolare, autorizzazioni di lettura/comando ed eventi;
non riusare i dispositivi di banco come se fossero impianti della casa.

## 6. Dovuti, dichiarazioni, verifiche e quietanze

Fonti: EA07, EA21–EA22; studio v0.1 §6.5–6.6. Invarianti già confermate:
documento caricato ≠ dichiarazione ≠ incasso verificato ≠ quietanza.

| Entità logica | Relazioni e vincoli |
| --- | --- |
| Dovuto | Origine tipizzata: contratto/rata, bolletta, quota servizio o altro oggetto approvato; debitore, creditore, causale, periodo, scadenza, importo/valuta. Origini e beneficiari rimangono separati |
| DichiarazionePagamento | Autore, importo/valuta/data dichiarati, beneficiario indicato, stato e 0..N evidenze; può riferirsi a più dovuti con ripartizione dichiarata ancora da verificare |
| EvidenzaPagamento | Collegamento a versioneDocumento o fonte esterna, autore e acquisizione; prova caricata può precedere la dichiarazione; non certifica accredito |
| MovimentoIncasso | Importo/valuta, beneficiario, data, fonte esterna/manuale, riferimento univoco se presente; registrazione dell'evento osservato, non bilancio monetario della card |
| VerificaIncasso | Movimento/dichiarazioni esaminate, fonte pertinente, autore/processo legittimato, esito, data e ambito/importo verificato; un utente che dichiara non si autoverifica senza titolo come beneficiario/delegato |
| AllocazioneIncasso | Relazione N:M movimento verificato–dovuto, importo/valuta e attribuzione; più versamenti possono coprire una rata e un versamento più rate |
| Quietanza | Emittente e titolo/delega, versione del documento, riferimento/data; righe con importi e allocazioni verificate attestate. Non nasce automaticamente dalla dichiarazione né sostituisce il movimento |
| RettificaFinanziaria | Storno, rimborso, rettifica o contestazione con autore, data, fonte e oggetto originario; effetto contabile esplicito e documento correttivo se necessario |
| OperazionePartner, condizionata | Chiave dell'operazione, partner/riferimento, scopo, beneficiario, stato richiesto/pendente/esito ignoto/riuscito/fallito; eventi duplicati non creano nuovi incassi |

Regole proposte:

1. `residuo = dovuto rettificato − allocazioni verificate efficaci`. Dichiarazioni,
   file e quietanze non riducono il residuo. Non confondere residuo con importo
   complessivo delle prove caricate.
2. Non allocare oltre il credito disponibile del movimento o oltre il dovuto
   senza una regola esplicita. Conservare l'eccedenza non allocata; non azzerarla,
   distribuirla su altri periodi o trasformarla in saldo card automaticamente.
3. La quietanza può attestare solo importi verificati per quell'emittente;
   riferimenti e controlli impediscono duplicazioni accidentali dello stesso
   importo. Riemissione/rettifica mantiene il documento originario e la catena.
4. Un parziale resta tale anche se quietanzato; un rimborso/storno può riaprire
   il residuo secondo il suo effetto effettivo. Una contestazione segnala disputa
   senza riscrivere arbitrariamente gli importi.
5. Affitto, deposito, quota EECard, mediazione e bollette hanno causali,
   beneficiari e oggetti distinti. Nessun incasso intermediato da EECard è
   approvato. Per bollette la ricevuta del partner e la quietanza del creditore
   restano documenti diversi con emittente riconoscibile.

Esempio sintetico per la verifica del modello: dovuto 100, dichiarazione 100,
incasso verificato 40, allocazione 40, quietanza 40 → residuo 60. Un successivo
incasso 70 può allocare 60 e lasciare 10 da chiarire; l'esempio non contiene
prezzi EECard. Eventuali commissioni hanno voce/fonte separata, senza mutare
silenziosamente la somma dovuta al beneficiario.

## 7. Adesioni, card e banco

Fonti: EA01–EA02, EA05–EA06, EA08–EA19, EA27. Percorsi PF01–PF02.

| Entità logica | Relazioni e vincoli |
| --- | --- |
| Offerta / VersioneOfferta | Venditore, unità, durata, inclusioni, esclusioni, condizioni e importi quando approvati; nessun valore precompilato dalle cifre instabili |
| Adesione | 1 versioneOfferta, soggetto aderente, pagante, agenzia erogatrice/emittente da definire, ambito e stato; N beneficiari personali tramite BeneficiarioAdesione |
| AccettazioneAdesione | Versione delle condizioni, soggetto/rappresentante, azione, data, evidenza; modifica sostanziale dell'offerta non riscrive l'accettazione originale |
| DirittoCommerciale | Adesione, funzione/quantità se prevista, ambito e validità; abilita disponibilità commerciale entro permessi già posseduti |
| Credenziale | Persona/beneficiario, adesione emittente, supporto fisico/digitale/wallet, identificativo opaco, stato, validità, emessa/sostituita da; più credenziali per persona ammesse, ciascuna revocabile |
| IstanzaPassWallet, condizionata | 1 credenziale, piattaforma, riferimento pass, stato emissione/aggiornamento/revoca e capacità verificate; pass memorizzato e NFC funzionante sono risultati separati |
| OrdineSupporto | Beneficiario, tipo, emittente, variante autorizzata, costo/condizioni quando definiti, consegna e stato; dati di spedizione separati dal fascicolo, minimizzati verso il fornitore |
| ConfigurazionePartner | Agenzia, varianti di marchio/card e versioni autorizzate; mantiene marchio del sistema e limiti d'uso da definire, senza cambiare i permessi |
| DispositivoBanco | 1 sede, identità tecnica, capacità, software, stato registrato/attivo/sospeso/revocato, ultimo controllo; lettore e schermi descritti come componenti, non presunta compatibilità NFC |
| SessioneOperatore | Account, agenzia/sede, livello di autenticazione, dispositivo e validità; la card del cliente non la sostituisce |
| SessioneBanco | 1 sessioneOperatore, contesto cliente inizialmente assente e poi confermato, scopo, oggetti selezionati, apertura/chiusura; ammette identificazioni ignote/rifiutate senza attribuirle a un cliente; un cambio cliente chiude il contesto precedente |
| PresentazioneCredenziale | SessioneBanco, credenziale/risultato della risoluzione, canale e data, esito; non contiene dati personali in chiaro nel token e non concede privilegi |
| SessioneSchermo | 1 sessioneBanco, destinatario/ruolo verificato, dispositivo abbinato, scadenza, stato e selezione condivisa; distinta dalla sessione operatore e priva di token per il fascicolo completo |

La cessazione dell'adesione disabilita i diritti commerciali secondo le
condizioni future; la revoca di una card invalida quella credenziale. Né l'una
né l'altra cancellano il rapporto contrattuale o annullano dati storici.
Smarrimento con sospetto compromissione può richiedere revoca delle sessioni
pertinenti oltre alla card: decisione attribuita, senza blocco indistinto di
ogni relazione della persona.

La sessione schermo è un'entità **condizionata** alla scelta dei due destinatari
e della modalità d'uso. La proposta di riepilogo per il cliente richiede dati
consentiti sia all'operatore sia al destinatario per quello scopo, condivisi
esplicitamente. La vista non è la cattura dello schermo operativo. Durata,
inattività e gestione delle disconnessioni devono essere definite e provate.

## 8. Bozze, AI, firma e audit

Fonti: EA12, EA28–EA29. Percorso PF06. Entità condizionate all'inclusione della
funzione, senza presupporre un'integrazione Jarvis.

| Entità logica | Relazioni e vincoli |
| --- | --- |
| ModelloContrattuale / VersioneModello | Autore/responsabile, ambito d'uso, data/stato approvazione, campi richiesti e regole; aggiornamento produce nuova versione |
| BozzaContrattuale | Pratica, parti/unità selezionate, modello/versione, autore; 1 bozza ha N revisioni, nessuna delle quali costituisce da sola contratto stipulato |
| RevisioneBozza | Snapshot dei dati, testo e fonti per campo/versione, stato e autore umano/processo; immutabile dopo invio alla revisione; modifiche generano altra revisione |
| EsitoRevisione | 1 revisioneBozza, revisore competente, esito/motivazione/data; validità limitata alla versione controllata |
| RichiestaAI, condizionata | Utente/agenzia/scopo, compito consentito, configurazione/versione del processo, stato ed esito; nessun privilegio maggiore di chi la richiede |
| FonteAI / OutputAI | Elenco degli oggetti/versioni effettivamente ammessi, estratti minimi e riferimenti, output e limiti; ACL e conservazione si applicano anche a riassunti, indici e risposte salvate |
| AzionePropostaAI | Tipo, oggetto, proposta e responsabile della revisione; nello scopo attuale non esegue invii, firme, verifiche di incasso o modifiche dei permessi |
| ProceduraFirma, condizionata | Documento/versione esatta, parti e poteri, tipo di firma da scegliere, identificazione, evidenze, provider/processo e stato; disegno con penna non è automaticamente procedura completata |
| EventoAudit | Agenzia, attore umano/processo attribuibile, azione, oggetto/versione, istante, esito e motivo pertinente; riferimenti alle evidenze, non copia integrale di documenti, password o token |

Le fonti recuperate dall'AI sono dati non fidati come istruzioni: il loro
contenuto non può cambiare policy o concedere strumenti. La ricerca applica
permessi prima del recupero e prima della consegna; un indice condiviso
senza filtro verificabile non soddisfa l'isolamento. Una fonte revocata o
rettificata richiede invalidazione degli accessi e riesame di output derivati,
senza assumere che un riassunto abbia perduto i dati personali della fonte.

L'audit registra anche negazioni significative, variazioni di grants,
pubblicazioni/condivisioni, verifiche finanziarie, sostituzioni card e chiusure
di sessione banco. Accesso al registro e conservazione sono limitati per scopo.
Se servono input AI integrali per una prova, usare dati sintetici; politica,
responsabilità e tempi per dati reali devono precederne il trattamento.

## 9. Autorizzazioni applicate dal server

Il modello logico comprende **GrantAccesso**: destinatario account/soggetto
rappresentato, agenzia, oggetto o ambito controllato, azioni, provenienza del
diritto (rapporto/mandato/delega/condivisione), validità, stato e revoca. Può
essere materializzato o calcolato; la scelta tecnica resta aperta. Non è
sufficiente aggiungere `agency_id` e filtrare l'interfaccia.

Per ogni richiesta, incluse ricerca, conteggio, file, esportazione e recupero
AI, verificare nell'ordine:

1. Sessione valida e identità/agenzia correnti; eventuale delega a rappresentare
   un altro soggetto valida per l'azione richiesta.
2. Coerenza dell'agenzia fra oggetto, riferimenti e sessione; nessuna traversata
   verso l'agenzia B tramite un allegato dell'agenzia A.
3. Rapporto o grant attivo, azione e scopo consentiti, validità temporale e
   compatibilità col contenuto specifico. Negazione predefinita se manca titolo.
4. Condizioni commerciali quando pertinenti alla funzione, senza usarle per
   concedere visibilità aggiuntiva o impedire impropriamente documenti dovuti.
5. Stato dell'oggetto/versione e precondizioni della transizione; audit
   pertinente e risposta senza rivelare l'esistenza di contenuti estranei.

| Soggetto | Titolo possibile | Limite necessario |
| --- | --- | --- |
| Proprietario | Titolarità, parte contrattuale o delega specifica | Proprietà non concede bollette personali del conduttore o potere di agire per ogni comproprietario |
| Inquilino / ex inquilino | Parte/occupazione e grants al proprio storico | Nuovo rapporto e bollette altrui esclusi; storico eventuale in sola consultazione secondo regole approvate |
| Intestatario utenza | Intestazione nel periodo e documento pertinente | Identità di immobile non fonde intestazioni successive |
| Operatore | Appartenenza, mandato, funzioni e assegnazione | Non impersona il cliente e non eredita tutti i fascicoli dal ruolo agenzia |
| Tecnico | Incarico accettato/valido con ambito documentale | Nessuna ricerca generale nei contratti, affitti o bollette |
| Supporto piattaforma | Accesso minimo; eventuale autorizzazione eccezionale tracciata | Nessun diritto permanente ai contenuti di tutte le agenzie |
| AI / processo automatico | Permessi del richiedente e compito limitato | Nessun ampliamento da prompt, documento o credenziale del processo |
| Schermo condiviso | Sessione banco valida, destinatario e selezione esplicita | Non riceve note interne, coda generale o credenziali dell'operatore |

La revoca deve valere anche per i file: controllare l'accesso a ogni recupero,
oppure scegliere una modalità equivalente la cui revoca sia effettivamente
applicabile. Un URL firmato che resta utilizzabile fino alla propria scadenza
non dimostra revoca immediata e va trattato come limite da risolvere nella
progettazione tecnica. Una copia già scaricata non può essere dichiarata
cancellata dal dispositivo del destinatario.

## 10. Eventi temporali che non vanno fusi

| Evento | Effetto proposto e controlli da conservare |
| --- | --- |
| Fine locazione | Termina i poteri operativi derivati da quel rapporto alla data corretta; saldi, controversie e documenti pertinenti restano nei propri stati; eventuale grant storico separato |
| Uscita/subentro occupante | Nuovo intervallo e verifica; non trasferisce documenti personali né esegue una voltura |
| Voltura/cambio intestatario | Chiude/apre intestazioni con evidenza; vecchie bollette restano riferite al vecchio soggetto; conguagli a cavallo non generano condivisioni automatiche |
| Cambio proprietario | Nuova titolarità; revisione per categoria dei documenti tecnici da consegnare e dei dati da oscurare; nessuna eredità automatica di bollette, account o adesione privata |
| Fine mandato / cambio agenzia | Termina i grants del mandato; eventuale esportazione/acquisizione nella nuova agenzia esplicita e tracciata, senza fusione degli archivi |
| Disdetta EECard | Efficacia su diritti/credenziali secondo condizioni; diversa da fine locazione e politica di conservazione; prevedere consegna/esportazione dei dati pertinenti |
| Revoca card | Invalida quell'identificativo e le presentazioni successive; sostituzione emette nuovo ID, senza ripristinare il precedente |
| Revoca condivisione | Impedisce nuovi accessi e ricalcola contesti derivati; non riscrive la cronologia né cancella copie già consegnate |

Non sono ancora decisi durate di conservazione, accesso dello storico dopo
uscita, responsabilità sui dati e tempi di esportazione. Per progettare la
prima prova si propone di distinguere tecnicamente accesso attivo e storico
limitato; abilitare lo storico con dati reali richiede una politica esplicita.

## 11. Invarianti verificabili e ordine di definizione

| Criterio | Controllo da includere nella futura specifica tecnica |
| --- | --- |
| MD-AC01 | Ogni relazione e riferimento a file appartiene all'agenzia corretta; una richiesta valida in A non legge oggetti, conteggi, indici o output AI di B |
| MD-AC02 | Stesso account con tre relazioni immobiliari riceve capacità differenti senza duplicare persona e senza un ruolo globale che prevalga sui grants |
| MD-AC03 | Fine rapporto, delega scaduta e revoca aggiornano sessioni, ricerca e download; grants storici e commerciali sono valutati separatamente |
| MD-AC04 | Un documento storico conserva data originale/precisione, acquisizione, provenienza e tutte le versioni pubblicate senza sovrascrittura |
| MD-AC05 | Più versamenti e più rate producono allocazioni coerenti; dichiarazione e quietanza non alterano il residuo; eccedenze e rettifiche restano visibili |
| MD-AC06 | Ripetizione di importazione, ordine o esito partner non duplica persone, documenti pubblicati, adesioni o incassi; conflitti concorrenti richiedono risoluzione attribuita |
| MD-AC07 | Una nuova intestazione/proprietà non eredita documenti privati del precedente soggetto; un lavoro dichiarato non diventa documentato dal solo stato ticket |
| MD-AC08 | Credenziale revocata non risolve un accesso valido e nuova card non riattiva la vecchia; dispositivo revocato e sessione schermo chiusa non ricevono dati |
| MD-AC09 | Bozza/AI conserva fonti e versione del modello; modifica dopo revisione richiede altro esito; nessun automatismo la promuove a contratto firmato |
| MD-AC10 | Log, token card e record/cache persistenti della sessione schermo non conservano copie integrali di documenti né privilegi più ampi del contesto; la vista può mostrare una versione completa selezionata e autorizzata, senza conservarla dopo la chiusura |

Ordine proposto: prima confini agenzia/account/relazioni e politica dei grants;
poi contratto e file/versioni; quindi adesione/credenziali e sessione banco.
Bollette richiedono intestazioni; cronologia richiede provenienza; dati
finanziari richiedono dovuti/verifiche/allocazioni; AI e firma richiedono bozze,
revisioni e autorizzazioni già dimostrate. Il backlog può scegliere rami
diversi, mantenendo queste dipendenze.

Questi controlli sono criteri progettati, **non test eseguiti**. Restano da
selezionare strategia di autenticazione e recupero, architettura di isolamento,
archivio privato, revoca dei file, recupero da guasto, policy di conservazione e
contratti delle integrazioni. Non sono definiti database, DDL, servizi esterni,
tempi o costi; lo [studio v0.1](../EECard-studio-v0.1.pdf) resta intatto come base
storica delle proposte.
