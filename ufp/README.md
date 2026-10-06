# UFP — preparatore locale e simulazione V1

Prima versione funzionante offline. **Non scrive nel gestionale ARS**: il collegamento reale non è implementato né verificato. È disponibile un simulatore separato per provare caricamento, errori e ripresa.

## Parti da qui

Apri **[Scheda_UFP_da_compilare.xlsx](scheda/Scheda_UFP_da_compilare.xlsx)** in Excel o LibreOffice. Compila le celle gialle, una domanda per campo. Puoi scrivere **DA VERIFICARE**. Duplica il foglio “Riga 1” per ogni riga ricevuta; non basta il codice articolo per identificarla. Non inserire password. Questa è una scheda vuota pubblica; tutti gli esempi sono anonimizzati.

La scheda contiene Postazione, Testata, Riga 1, Riepilogo e Prova reale, più istruzioni. Le versioni CSV nella stessa cartella si aprono anche come testo. La scheda è per raccolta/revisione: **non viene importata automaticamente**. Dopo il completamento si trascrivono i dati nei due JSON vuoti in `examples`, si controlla il riepilogo e si conferma. I campi non noti non vanno sostituiti con valori fittizi.

## Installazione minima

Python **3.10 o successivo**, nessun pacchetto da installare. Estrarre tutto il progetto in una cartella locale riservata. Aprire il terminale in quella cartella. Su Windows usare `py -3` al posto di `python` se necessario. Test eseguiti qui su Linux/Python 3.12.14; esecuzione sulla postazione Windows ancora da verificare.

## Esempio funzionante, solo dati simulati

```console
python ufp.py prepare examples/ricezione-simulata.json examples/ordini-simulati.json --out piano.json
python ufp.py review piano.json
python ufp.py approve piano.json --journal registro.sqlite --operator OPERATORE_TEST
```

L'ultimo comando mostra il riepilogo. Per questo esempio didattico, digita `CONFERMO ` seguito dall'impronta completa stampata. Con dati reali questa dichiarazione richiede il controllo fisico umano e la revisione dei dati. **Non autorizza una scrittura ARS.**

```console
python ufp.py sim-init examples/ordini-simulati.json --server simulatore.sqlite
python ufp.py simulate piano.json --journal registro.sqlite --server simulatore.sqlite
python ufp.py status --journal registro.sqlite --server simulatore.sqlite
```

Esito atteso: 6 NR registrati sulla sola riga simulata, residuo 4 NR, un DDT e una lista SUSPENDED. Palmare NOT_VERIFIED. Ripetere `simulate` non deve aumentare le scritture; legge gli esiti nel database fittizio. Non inizializzare di nuovo il medesimo simulatore: `sim-init` rifiuta di sovrascriverlo.

## Provare una ripresa

Prima della prima esecuzione su un nuovo simulatore, usa:

```console
python ufp.py simulate piano.json --journal registro.sqlite --server simulatore.sqlite --fault-op libero:suspend --fault after
```

Il comando si arresta **dopo** il salvataggio fittizio della lista. Rilancia senza i due parametri di guasto: rileva la lista esistente, verifica i dati e non la duplica. Se l'operazione era già verificata, il guasto non viene iniettato: usa un nuovo caso di test. Altri punti: `ddt:create`, `row:L1`, `ddt:confirm`; guasti `before`, `after`, `uncertain`, `session`, `screen`.

`uncertain` rende il risultato illeggibile nel simulatore e mantiene il blocco anche ai tentativi successivi. Non c'è un comando per azzerare il registro o dichiarare arbitrariamente fallimento. Le prove automatiche ripristinano la leggibilità del sistema fittizio per verificare la ripresa. In un caso reale la riconciliazione richiederà una lettura/manuale con il referente e il futuro connettore: non basta cancellare una riga SQLite.

Conserva `piano.json`, `registro.sqlite` e `simulatore.sqlite`; quest'ultimo rappresenta esclusivamente lo stato fittizio. Il file `.lock.sqlite` serve alla mutua esclusione locale: non rimuoverlo mentre un processo gira. Nessun lock del gestionale reale è dimostrato.

## Dati da compilare

`examples/ricezione-da-compilare.json` e `examples/ordini-da-verificare.json` sono vuoti e intenzionalmente non eseguibili. Tutti i campi elencati nei modelli sono obbligatori, eccetto:

- `header.packages` e `header.carrier`: facoltativi per il preparatore; le regole e l'obbligatorietà reale devono essere chiarite prima del collegamento.
- `line.row_ref`: omettibile nella ricezione solo se l'abbinamento nello snapshot è univoco; obbligatorio e verificato nello snapshot.
- `difference_reason`: da aggiungere se fisico e bolla differiscono dopo conversione.
- `conversion`: da aggiungere solo per TO→KG. Esempio completo in `conversione-simulata.json`, con approvatore e fonte della regola.

Non inserire la quantità da registrare nel file: viene calcolata. Le quantità sono stringhe come `"0.072"`, mai numeri JSON o `"0,072"`; codici, anno, numero e riga restano stringhe, conservando zeri e suffissi. I campi non previsti sono rifiutati. Le righe non ricevute non vanno eseguite; annotale nella scheda. Descrizioni e risposte di contesto della scheda non vengono usate per abbinare automaticamente.

Lo snapshot ordini è una trascrizione/esportazione verificata, con fonte e ora: **nessuna lettura automatica ARS è implementata**. `row_ref` e `version` non devono essere inventati. Se non sono disponibili, l'integrazione reale resta da progettare. Non usare `SIM-*` con dati aziendali.

Ogni modifica richiede `prepare --out nuovo-piano.json` e una nuova conferma. Il programma non sovrascrive piani già esistenti. Un DDT iniziato sotto un altro piano viene bloccato e richiede riconciliazione: non aggirare il blocco cambiando numero documento.

## Test e dettagli

```console
python -m unittest discover -s tests -v
```

- [Risultati dei test](docs/TEST.md) e [output esecuzione](docs/test-results.txt).
- [Progetto, evidenze, fonti, schema e limiti](docs/PROGETTO.md).
- [Procedura e criteri della futura prova reale](docs/PROVA_REALE.md).

Il caso `unita-commerciale-bloccata.json` dimostra intenzionalmente il blocco Coppia/NR. Non attesta un conteggio fisico e non va ricaricato. Gli altri esempi sono scenari sintetici derivati dalle problematiche dei materiali. La simulazione verifica la logica, non la compatibilità ARS né il palmare. Nessun risparmio di tempo è stato misurato.
