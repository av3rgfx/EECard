# BF16 — raccolta delle osservazioni

9 ottobre 2026. Guida per il facilitatore, da usare con il
[protocollo BF02 esistente](../prova-agenzia-2026-10-08/PROTOCOLLO.md).
**BF16 resta aperto:** nessuna osservazione reale disponibile nei materiali
consultati; questo non dimostra che una prova non sia stata svolta altrove.
La raccolta riguarda una simulazione documentale, senza servizi reali.

## Materiale e versione

Usare i [materiali già pronti](../prova-agenzia-2026-10-08/README.md): kit
del commit `bb2222c352fff0c69b6c4a8f63f5684cfa9ade01`, set A/B con
`schema_version: 1` e data di riferimento `2026-10-08`. La revisione del kit
è descritta in [ESITO_SIMULAZIONE.md](../prova-agenzia-2026-10-08/ESITO_SIMULAZIONE.md).
La versione dello schema non identifica da sola la revisione dei materiali:
registrare anche commit, data della raccolta ed eventuali adattamenti.

Il controllo del 9 ottobre sul modello esistente rileva 48 righe
`non_eseguita`, nessuna osservazione e cinque categorie di costo senza valori.
Sono stati letti sorgente e guida CLI ed eseguiti `validate` e `analyze` sul
modello: «Nessuna misura osservata. Successo, tempi, risparmio e costi non
stimabili». Non è una prova con operatori; BF02 non è stato rigenerato.

## Prima di iniziare

1. Individuare un facilitatore, OP01 che conosce il lavoro dell'agenzia e OP02
   che non ha preparato questi fascicoli. Annotare separatamente chi li ha
   preparati. Usare gli identificativi OP, senza nomi nel materiale condiviso.
2. Copiare i sette file già presenti in `prova-agenzia-2026-10-08/materiali/`
   in una nuova cartella riservata **fuori repository**, senza sovrascrivere
   raccolte esistenti. Non eseguire `prepare`: i pacchetti e i modelli sono
   già disponibili. Compilare soltanto la copia esterna dei CSV.
3. Descrivere il processo corrente effettivo prima di attribuirgli risultati:
   strumenti usati, ricerca, passaggi di consegna e lavoro preliminare. La
   condizione «corrente» del kit è simulata. Registrare prima della prova
   eventuali differenze/adattamenti, supporto e ricerca consentita uguali fra
   condizioni, limite per caso e soglie del protocollo; non modificarli dopo
   aver visto i tempi.
4. Fare l'esercitazione fuori campione del protocollo e annotare formazione,
   preparazione/importazione e manutenzione dell'indice separatamente dai
   tempi dei compiti. L'esercitazione non entra nelle 48 righe.

Conservare JSON e chiave presso il facilitatore. Consegnare a ciascun operatore
**solo il proprio pacchetto della fase in corso**, senza soluzioni o risultati
altrui. Non usare assistenti AI come sostituti di OP01/OP02.

| Operatore | Fase 1 | Fase 2 |
| --- | --- | --- |
| OP01 | `OP01_FASE1_corrente_A.md` | `OP01_FASE2_proposta_B.md` |
| OP02 | `OP02_FASE1_proposta_A.md` | `OP02_FASE2_corrente_B.md` |

Conservare le due fasi e l'ordine dei casi nei pacchetti, un caso alla volta;
annotare pause e interferenze, senza scambio di soluzioni. Le fasi di
somministrazione restano distinte dai percorsi da valutare:

| Lettura del beneficio | Scenari | Separazione nel resoconto |
| --- | --- | --- |
| Attivazione PF01 | S01–S02 | Riuso/reinserimento e lavoro ricorrente, con preparazione a parte |
| Ritorno al banco PF02 | S03–S06 | Ricerca, cambio operatore e recupero assistito; S03–S04 verificano anche PF05 |
| Recupero storico PF05 dedicato | S10 | Fonte, versione e data del documento; non sommarlo due volte ai casi condivisi con PF02 |
| Contesti PF03 | S07–S08 | Separati dal beneficio principale; S08 verifica anche PF04/PF05 |
| Estensioni e controllo | S09, S11, S12 | PF04, PF06 e significati finanziari separati; nessun ampliamento implicito di R1 |

## Avvio della prima fase

Dopo la descrizione del metodo corrente e l'esercitazione fuori campione,
si può iniziare con **S01–S04 della fase 1 per entrambi gli operatori**:
otto esecuzioni della pianificazione esistente. S01–S02 riguardano PF01;
S03–S04 includono già ritorno al banco e recupero storico PF02/PF05.
Questa è una prima tranche contigua, non una nuova prova ridotta o una misura
già raccolta. Il facilitatore presenta un caso alla volta dal pacchetto assegnato.

Proseguire poi con S05–S12 della stessa fase, quindi con la fase 2 prevista
per ciascun operatore. S10 resta il caso dedicato al documento storico: non
anticiparlo saltando i casi intermedi e non passare subito alla fase 2 per
creare coppie più comode. Registrare pause e interruzioni. Dopo la sola fase 1
non ci sono ancora coppie complete dello stesso operatore per confrontare
le condizioni. Le altre righe restano `non_eseguita` fino a osservazione effettiva.

Prima di cronometrare servono facilitatore e due operatori reali nelle condizioni
del protocollo, metodo corrente descritto, supporto e ricerca comuni, limite
per caso e soglie registrate preventivamente. L'assenza di costi o prezzi non
impedisce di osservare i compiti: il risultato economico resta non calcolabile.
Se chi conduce usa questa conversazione, la tiene fuori vista degli operatori
insieme alla chiave; si condividono soltanto i materiali della fase in corso.

Nel proseguimento del 9 ottobre sono state predisposte fuori repository sette
copie identiche dei materiali, separate per destinatario/fase, con un manifest
dei digest SHA-256 iniziali. È una preparazione tecnica: nessun operatore,
cronometro o raccolta è stato avviato. Il percorso locale è comunicato nella
consegna della sessione; può non sopravvivere a un cambio ambiente. Le copie
compilate vanno conservate nel luogo riservato concordato, senza dipendere da
quel percorso o sovrascrivere raccolte precedenti. Per ricreare una copia vuota
in un altro ambiente basta copiare i sette materiali: non rigenerare il kit.

## Durante la raccolta, anche se parziale

Leggere l'istruzione del protocollo; cronometrare dalla consegna del compito
alla dichiarazione dell'esito o al limite. Registrare la risposta prima di
valutarla con la chiave. Annotare lavoro attivo, attese, aiuti, correzioni,
fonti selezionate e motivi di fallimento/abbandono. Un blocco previsto può
essere corretto; una soluzione suggerita dal facilitatore richiede aiuto
registrato. Le ambiguità del kit restano osservazioni da revisionare.

Nel CSV preservare intestazioni, identificativi e **tutte le 48 righe**.
`non_eseguita` conserva i campi osservativi vuoti; zero significa zero
effettivamente osservato. Per una risposta errata usare `fallita`, per una
interruzione `abbandonata`; non cancellare la riga o chiamarla non eseguita.
`completata` significa corretta, anche se assistita: `helps` registra gli
aiuti. `errors` conta gli errori finali, `critical_errors` anche quelli critici
poi corretti; un errore critico impedisce `completata`.

Usare timestamp ISO 8601 con fuso e secondi osservati; attivo + attesa non
superano la durata salvo un secondo di arrotondamento. Separare gli ID delle
evidenze con `;`; `-` significa nessuna evidenza selezionata, vuoto significa
dato mancante. La compilazione completa è nel protocollo e nella guida del
facilitatore, da non consegnare agli operatori.

Se la sessione si interrompe, conservare quanto raccolto e lasciare le altre
righe non eseguite. Se manca un campo di un'esecuzione osservata, lasciarlo
vuoto e spiegare il motivo: l'analizzatore la segnala incompleta. Non ricavare
tempi dalla memoria né cambiare uno stato per superare un errore del programma.
Correzioni dei materiali e ripetizioni richiedono versione e registrazione
separate: conservare la prima osservazione, senza sostituirla con il tentativo
successivo o unire versioni differenti nello stesso confronto.

## Analisi e limiti dello strumento

Dalla radice della repository, dopo aver sostituito il percorso esemplificativo
con quello della copia privata:

```bash
python3 -B scripts/prova-agenzia.py validate
python3 -B scripts/prova-agenzia.py analyze --measurements /percorso/privato/sessione-bf16/misure.csv
```

Un errore strutturale interrompe l'analisi: verificare la fonte e ripristinare
solo intestazioni/identificativi o dati effettivamente documentabili. Non
inventare i valori mancanti. Se sono stati adattati i set, conservare i set
corrispondenti e usare `--data-dir` con la loro cartella; far verificare prima
la compatibilità con schema, pianificazione e specifiche del kit.

Il [sorgente](../../../scripts/prova-agenzia.py) impone questi limiti:

- I conteggi degli esiti dichiarati includono le righe incomplete; «corrette
  senza aiuto» richiede invece misure complete. Pubblicare sempre osservate,
  pianificate, incomplete e non eseguite, oltre a numeratore/denominatore.
- Le mediane appaiate usano solo coppie dello stesso operatore e scenario
  corrette, complete e senza aiuti in entrambe le condizioni. Esclusioni,
  fallimenti, abbandoni e aiuti restano nel resoconto. Non estendere il
  risultato del sottocampione a tutta l'attività.
- Il recupero automatico unisce PF02/PF05 e comprende S03–S06, S08 e S10;
  non produce un confronto autonomo per PF02, PF05 o singolo operatore.
  Integrare il resoconto per scenario e percorso, dichiarando le sovrapposizioni;
  mantenere PF01 separato. Non sommare sottogruppi e nucleo.
- Non valuta semanticamente le risposte, non verifica il reinserimento di
  PF01, non decide le soglie e non legge `costi.csv`. Aiuti/attese, lavoro
  iniziale e costi richiedono revisione umana e fonti esplicite. Un costo
  assente è non calcolabile; non è zero. Nessun margine senza prezzi/volumi.

Con soli dati parziali si può descrivere la copertura e proporre correzioni;
non dichiarare raggiunte le soglie generali o chiuso BF16. Il confronto non
misura disponibilità a pagare, sicurezza server o prestazioni del frontend.

## Consegna anonima utile alla ripresa

Conservare risposte originali, misure individuali, costi e corrispondenze OP
fuori repository. Per la prossima analisi condividere una sintesi anonima con:

- commit/versione del kit, data, metodo corrente osservato, supporto, ordine,
  preparazione dei fascicoli, limite e adattamenti;
- scenari svolti per OP/fase/condizione, copertura e mancanti motivati;
- conteggi e tempi per percorso con denominatori, coppie escluse e motivo,
  fallimenti, aiuti, errori critici e ambiguità conservati;
- lavoro preliminare e costi aggregati documentati, oppure «non disponibili»;
- correzioni proposte collegate a EA/PF/BF e questioni ancora aperte.

Nel repository entrano soltanto esiti anonimi autorizzati, verificati anche
per evitare dettagli indirettamente identificanti. Nessun audio, trascrizione,
documento cliente, retribuzione individuale o CSV osservato. L'output automatico
va revisionato prima della condivisione. La prima decisione dopo i dati sarà
motivare se proseguire, correggere il flusso o cambiare beneficio da provare;
BF03 e il perimetro operativo restano proposte con le proprie dipendenze.
