# Storico, conservazione e uscita — approfondimento BF03

9 ottobre 2026. Proposta documentale revisionabile, limitata al punto aperto di
[CONTRATTI_PRELIMINARI.md](CONTRATTI_PRELIMINARI.md): accessi dopo cambi di rapporto,
conservazione e consegna. **BF03 e BF17 restano aperti**; BF01 determina l'ambito
operativo e BF16 deve ancora fornire osservazioni umane. Nessun servizio,
trattamento di dati reali o cambiamento dei permessi viene eseguito qui.

Fonti rilette: [MODELLO_DATI.md](../specifiche-2026-10-08/MODELLO_DATI.md) §§9–10,
[PERCORSI.md](../specifiche-2026-10-08/PERCORSI.md) PF03/PF05 e allegato BF03.
Si applicano EA04/EA07/EA16/EA20/EA22/EA24–EA26, MD-AC01/AC03–AC05/AC07,
PF03-AC03/AC05/AC06, PF05-AC02/AC04/AC06/AC07 e PT-AC03/PT-AC05. Le specifiche
restano i riferimenti principali; non si aggiungono requisiti numerati o nuove
affermazioni normative. Durate, ruoli privacy e responsabilità sono da definire.

## Tre decisioni separate per ogni oggetto

**Conservare** significa mantenere un oggetto per categoria e scopo secondo una
regola da approvare. **Rendere accessibile** richiede un titolo efficace per
destinatario, oggetto, azione e periodo. **Consegnare/esportare** richiede inoltre
la facoltà pertinente e un destinatario verificato: la sola consultazione non
la attribuisce. Un file conservato può dunque non essere consultabile da una
parte; un'autorizzazione di lettura non decide per quanto tempo conservarlo.

“Documento storico” descrive anche un documento antico usato in un rapporto
attivo: non equivale a “accesso dopo fine rapporto”. La politica post-rapporto
ancora aperta **non sospende accessi già verificati e tuttora validi**. A fine
rapporto cessano solo i poteri che dipendono dal titolo terminato; eventuali
titoli autonomi ancora efficaci si valutano separatamente. Nessun nuovo grant
storico deriva automaticamente dall'esistenza del file o da una card attiva.

**Proposta tecnica prudente:** descrivere separatamente motivo/regola di
conservazione e grants di accesso, con stato e versione della regola applicata.
Un termine non ancora definito rimane “da decidere”, non “illimitato” né zero.
Questo stato non autorizza una conservazione reale indefinita: la decisione
pertinente deve precedere il trattamento operativo previsto da BF17.

## Matrice per categoria ed evento — da revisionare

“Ammesso” è sempre condizionato al titolo verificato e alla politica applicabile.
Le indicazioni di storico/consegna sono proposte, non grants concessi oggi.

| Categoria | Evento | Azioni ammesse a quelle condizioni | Azioni negate | Titolo da verificare | Informazione ancora mancante |
| --- | --- | --- | --- | --- | --- |
| Contratto personale e allegati pertinenti | Fine locazione/subentro | Consultazione limitata dell'ex parte su versioni proprie con grant storico; consegna della selezione se specificamente autorizzata | Operazioni sul rapporto successivo; accesso del subentrante ai documenti personali precedenti; rinnovo tacito dei poteri cessati | Parte riferita al contratto e grant storico distinto; rappresentanza valida quando pertinente | Categorie/versioni spettanti a ciascuna parte, azioni e periodo dello storico, regola di conservazione |
| Contratto personale | Fine adesione EECard | Accessi fondati su titoli autonomi ancora efficaci; gestione della consegna pertinente secondo condizioni da definire | Equiparare disdetta a cessazione locazione, cancellazione del contratto o rifiuto indiscriminato dei documenti dovuti | Titolo sul documento separato dai diritti commerciali; facoltà di consegna | Canale di continuità, condizioni di uscita e accesso dopo adesione, modalità di verifica del richiedente |
| Documenti tecnici dell'immobile e storia lavori | Cambio proprietario | Selezione per categoria e titolo; copia derivata oscurata, verificata e collegata alla fonte quando necessaria | Eredità dell'intero fascicolo personale; condivisione automatica di costi, recapiti o allegati del precedente proprietario | Nuova titolarità verificata e pertinenza del singolo documento; eventuale delega | Quali categorie consegnare, quali parti oscurare, chi verifica la selezione e per quale scopo conservarla |
| Bollette e documenti della fornitura | Fine locazione, subentro o voltura | Letture basate sull'intestazione/delega pertinente; eventuale storico del precedente intestatario con titolo distinto e verificato | Accesso del proprietario o nuovo occupante per la sola relazione con la casa; voltura dedotta dal subentro; divisione automatica dei conguagli | Intestazione e periodo del documento, delega valida; eventuale grant storico | Politica sullo storico delle intestazioni cessate, trattamento dei documenti a cavallo, conservazione per categoria |
| Incassi, evidenze e quietanze | Fine locazione o fine mandato | Consultazione dei fatti pertinenti con titolo; rettifica da soggetto abilitato secondo processo distinto; consegna delle versioni autorizzate | Azzerare residui per chiusura, fondere dichiarazione/incasso/quietanza, far ereditare i dati al nuovo inquilino o i poteri al vecchio operatore | Rapporto/beneficiario/delega pertinenti all'azione; facoltà specifica di rettifica o emissione | Ambiti residui per saldi/controversie, responsabile competente da individuare, regole di conservazione/consegna |
| Audit di accessi e modifiche | Fine mandato o uscita di un operatore | Consultazione limitata a scopo e autorizzazione propri; eventuale estratto minimo con destinatario e facoltà verificati | Accesso permanente dell'ex operatore; log completo incluso nel fascicolo del cliente; contenuti privati o token copiati nel registro | Titolo specifico di controllo, distinto da quello operativo o commerciale | Soggetti abilitati, campi consultabili, scopi e tempi del registro, procedura per richieste di estratti |
| Tutte le categorie, selezionate separatamente | Cambio agenzia/fine mandato | Consegna esplicita di versioni ammesse; acquisizione nella nuova agenzia con provenienza e titolo propri | Fusione degli archivi; riutilizzo dei link della precedente in forza del solo nuovo mandato, senza titolo esplicito di consegna/accesso; mandato scaduto usato per esportare tutto | Facoltà di esportazione nell'agenzia origine e titolo di acquisizione/destinatario nella nuova | Canale, contenuti, controllo della consegna e referente da individuare; trattamento delle copie residue |
| Tutte le categorie interessate | Revoca della condivisione o delega | Accesso solo se esiste un altro titolo autonomo verificato; conservazione valutata separatamente | Nuova lettura tramite link/cache/grant revocato; cancellazione dichiarata delle copie già ricevute | Provenienza del singolo grant, efficacia della revoca e titoli indipendenti | Processo di riesame degli accessi derivati e gestione delle precedenti consegne |

La classificazione non basta: un documento tecnico può contenere dati personali
e una quietanza può essere allegata al contratto. L'oggetto conserva categoria,
versione e collegamenti; la consegna controlla anche il contenuto concreto.
Lavoro dichiarato/documentato e controllo formale/specialistico restano distinti.

## Revoca, correzione e consegna

1. **Registrare l'evento.** Separare data di efficacia e registrazione, con
   autore, fonte e oggetti/grants coinvolti. Fine locazione, fine mandato,
   fine adesione, voltura e revoca card mantengono eventi propri. Estremi dei
   periodi e fuso sono da specificare; nessuna durata viene ricavata dalle fixture.
2. **Applicare l'effetto pertinente.** Rivalutare sessioni, ricerca, conteggi,
   file, derivati e consegne pendenti; il collegamento rimasto aperto non
   prolunga un permesso. La revoca card non termina il contratto o titoli
   autonomi: blocca quella credenziale e gli eventuali contesti coinvolti.
3. **Correggere senza riaprire automaticamente.** Allegato alla casa errata:
   ritirare gli accessi errati, correggere con audit e verificare i grants sul
   nuovo oggetto. Una rettifica della data di cessazione non ripristina da sola
   tutti i grants precedenti; serve riesame attribuito del titolo. La versione
   pubblicata resta tracciata: immutabilità non significa conservazione eterna.
4. **Preparare la consegna.** Proposta: indice delle sole versioni ammesse con
   provenienza, stato, destinatario e scopo; distinguere originale e derivato
   oscurato. Ricontrollare il titolo alla consegna, anche se richiesta o
   preparazione precedono la revoca. Indice e nomi file non rivelano esclusi.
5. **Registrare l'esito.** Preparato, consegnato, interrotto ed esito ignoto
   rimangono distinguibili. Un timeout richiede riconciliazione dello stesso
   tentativo, senza presumere consegna riuscita o crearne una seconda. Le copie
   già consegnate e i byte già ricevuti non si cancellano con una revoca server;
   eventuali comunicazioni/rettifiche successive richiedono un processo definito.

I quattro eventi restano documento caricato, pagamento dichiarato, incasso
verificato e quietanza rilasciata. Cambiare rapporto o conservazione non cambia
il loro significato e non azzera il residuo di un parziale (MD-AC05).

## Scheda decisionale minima prima dell'uso operativo

Per ciascuna categoria e scopo, completare una decisione versionata con:

- oggetti/versioni coperti e motivo della conservazione; criterio di inizio,
  termine o riesame, da stabilire senza adottare scadenze legali presunte;
- destinatari, azioni, titolo e validità dello storico, distinguendo leggere,
  consegnare e correggere; soggetto competente da individuare, non assegnato qui;
- evento di uscita e continuità, canale di consegna, derivati da oscurare e
  trattamento di indice, cache, esportazioni temporanee e copie già consegnate;
- esito previsto a fine conservazione e trattamento delle copie tecniche,
  inclusi backup/ripristino, da progettare e verificare senza promettere
  cancellazioni istantanee o ricreare accessi già revocati.

La chiusura di un rapporto non riscrive retroattivamente i fatti registrati
né autorizza a mantenerne dettagli personali senza limite. Anche il registro
ha una propria regola da definire, distinta da quella del documento originario.

## Verifica futura e limiti della consegna

Integrare i criteri già predisposti nell'allegato BF03 con quattro confronti:
titolo attivo su documento antico conservato; grant operativo cessato senza
grant storico né altro titolo autonomo valido; grant storico esplicito valido;
stesso file richiesto da nuova
agenzia o nuovo occupante senza titolo. Attesi: consultazione nel primo e terzo
caso, diniego negli altri; consegna sempre valutata separatamente. Ripetere
dopo revoca, correzione e ripristino di una copia tecnica, senza esporre file
o metadati estranei (MD-AC01/AC03/AC07, PF05-AC04/AC06, PT-AC05).

Sono casi futuri sintetici, non prove eseguite né modifiche al kit BF02.
Le osservazioni BF16 possono precisare documenti cercati, errori e difficoltà
di consegna; non fissano da sole termini o responsabilità. BF03 richiede ancora
revisione del perimetro e delle politiche; BF17 richiede condizioni operative
e controlli dell'implementazione. Nessuna nuova misura umana è prodotta qui.
