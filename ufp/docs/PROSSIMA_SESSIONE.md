# Prossima sessione: design desktop e mobile

## Punto di partenza

Leggere README, PROGETTO.md, PROVA_REALE.md e il codice. È disponibile una CLI Python offline con validazione, conferma dei dati esatti, registro e simulatore; 31 test locali passati. Gli esempi pubblici sono anonimizzati e la scheda è vuota. Non esiste ancora una UI desktop/mobile, un connettore ARS o una verifica sul palmare.

Destinazione indicata: computer di magazzino con Python installabile. OS attuale, ambiente di prova, permessi browser automation e referente/API non sono ancora noti. L'utente fornirà più avanti dati e regole operative nella scheda.

Lo studio privato è stato letto integralmente e quattro foto riesaminate. I cinque video non sono stati rivisti durante lo sviluppo per limiti di trasferimento. Il precedente studio dichiara campionamento di fotogrammi e sequenze critiche, non visione continua integrale. Materiali originali e link Drive restano privati: chiederli al proprietario quando pertinenti. Non dichiararli visionati se non lo sono.

## Obiettivo

Avviare progettazione e sviluppo del design della piattaforma desktop e mobile. Partire dai flussi operativi e consegnare un prototipo locale navigabile con dati sintetici e stati dichiarati, oltre alle istruzioni per aprirlo. Non fermarsi a un altro rapporto generale.

Verificare la struttura corrente della repository e riusare il nucleo esistente. Se la PR non è unita, ripartire dal branch `feat/ufp-local-foundation`; non presumere che sia già su main. Scegliere la soluzione più semplice; una UI web responsive locale è una candidata da motivare, non una decisione già approvata o una richiesta di usare Sites.

Chiarire presto il ruolo del mobile: controllo fisico, consultazione o entrambi. Il nuovo mobile non coincide automaticamente con il palmare gestionale. Procedere intanto con flussi comuni e desktop, dichiarando le ipotesi reversibili.

## Flussi da rappresentare

- Elenco ricezioni, stato e ripresa.
- Testata DDT e righe con quantità bolla, fisico confermato e da registrare separate.
- Abbinamento a ordini/righe precise, residui, articoli ripetuti e anomalie bloccanti.
- Riepilogo comprensibile e conferma legata ai dati; modifiche invalidano la conferma.
- Stati separati del caricamento DDT e del passaggio Libero/Sospendi.
- Interruzioni, esito incerto e riconciliazione manuale, senza ripetere il caricamento iniziale.
- Palmare non verificato fino a controllo effettivo sul dispositivo.

## Vincoli invariati

Controllo fisico umano. Nessuna correzione per somiglianza/AI, conversione implicita o abbinamento per solo articolo. Nessuna API/import/identità stabile inventata. Prima di scrivere nel gestionale reale: presentare caso concreto, dati esatti, modifiche e controlli, quindi attendere autorizzazione esplicita. Nessun annullamento automatico presunto. Niente credenziali, bolle o dati riservati nel repository pubblico; niente invio a servizi esterni non autorizzato.

## Consegna attesa

Schermate desktop/mobile coerenti, prototipo locale navigabile, stati ordinari e di errore, verifica su entrambe le dimensioni, test pertinenti e istruzioni. Distinguere funzionante, simulato e non verificato. Conservare il nucleo e i controlli esistenti senza mascherarne i limiti.
