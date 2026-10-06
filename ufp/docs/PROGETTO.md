# UFP — fondazione locale e confini della verifica

## Implementato

Python standard library, CLI offline, validazione e abbinamenti esatti, separazione quantità bolla/fisico/da registrare, conversione esplicita TO→KG, riepilogo con impronta, approvazione locale, registro SQLite, simulatore persistente separato e ripresa per singola operazione.

Il controllo fisico resta umano. La conferma copre i dati esatti e lo snapshot: modifiche richiedono nuovo piano e conferma. Una riga ambigua o discordante blocca il documento. L'approvazione locale non è autenticazione forte e non autorizza scritture reali.

## Simulato e non verificato

Il solo backend eseguibile è Simulator. DDT, righe salvate, conferma DDT, Libero/Sospendi, identificativi e residui sono simulati. Nessun connettore ARS, API o selettore browser è implementato. Nessuna scrittura o prova sul gestionale reale; palmare NON VERIFICATO. La creazione della lista Libero è atomica solo nel modello simulato: i suoi passaggi persistenti reali restano da accertare.

Il registro conserva ATTEMPTED prima della scrittura e VERIFIED dopo rilettura; UNKNOWN richiede riconciliazione manuale. Ogni ripresa rilegge il simulatore anche se il registro riporta successo. Il futuro connettore dovrà distinguere assenza dimostrata da ricerca incompleta, timeout, sessione scaduta e schermata inattesa. Un clic non è una prova di salvataggio.

## Regole e limiti della V1

Identità documento: azienda, fornitore, numero integrale, data, serie, magazzino. Identità ordine: fornitore, tipo, anno, numero e riferimento stabile riga. Il riferimento nella ricezione può mancare solo se lo snapshot fornisce una corrispondenza univoca; non si inventano ID reali. Codice fornitore e interno devono essere esatti. Le quantità di più righe sulla stessa riga ordine vengono sommate prima del controllo residuo.

Consegne parziali su documenti diversi sono ammesse. Un documento già iniziato con piano diverso richiede riconciliazione manuale, senza aggiunte automatiche. Non modificare numero o registro per aggirare un blocco. Un registro locale non garantisce unicità nel gestionale reale.

Quantità positive in stringhe decimali col punto, massimo 12 cifre intere e 6 decimali. NR/PZ interi. Zero ricevuto: non caricare la riga, annotarla nella scheda. Differenza bolla/fisico: motivo obbligatorio. TO→KG ×1000 con approvatore e fonte espliciti; aritmetica Decimal. Equivalenze commerciali come Coppia/NR bloccate, senza conversioni implicite.

## Provenienza e privacy

Lo studio fornito è stato letto integralmente; quattro foto pertinenti sono state riesaminate. I cinque video sono stati inventariati ma non riesaminati in questa sessione a causa dei limiti di trasferimento. Lo studio precedente riporta fotogrammi distribuiti nei video e sequenze critiche: non equivale a dichiarare una visione integrale continua. Lo studio, il link Drive e le fonti aziendali originali sono conservati nella consegna privata, non pubblicati in questa repository pubblica. Per consultarli in una sessione successiva occorre richiederli al proprietario.

I comandi Nuovo DDT, Libero e Sospendi sono riportati dallo studio; il significato del passaggio sul palmare resta da chiarire. Gli esempi pubblici sono anonimizzati: codici, ordini, riferimenti fonte, quantità fisicamente confermate e identificativi simulati non sono evidenze aziendali reali.

Destinazione riferita dall'utente: computer di magazzino con Python installabile. OS attuale, ambiente di prova, referente, permessi browser, interfacce native, campi obbligatori, identificazione delle righe e lettura degli esiti devono ancora essere verificati.

## Scelta tecnica e fonti ufficiali

Verificare prima le funzioni native o integrazioni documentate. Le pagine Altaquota descrivono selezione ordini/righe nel DDT, ma non attestano un tracciato/API utilizzabile nell'installazione corrente. Non ne deduciamo che non esistano API. Nessun contatto automatico al fornitore.

CLI-Anything genera CLI soprattutto dai sorgenti e non offre una compatibilità ARS verificata. Jev riceve testo per decisioni strutturate e non è necessario per la V1. Non sono stati integrati OCR, AI o servizi cloud. Se serve browser, Playwright è candidato: ruoli/etichette, elementi univoci e controlli di stato; non coordinate. Nessun selettore inventato dai video.

Fonti consultate il 5 ottobre 2026:

- https://www.aquota.net/prodotti/ars-logistica/
- https://www.aquota.net/landing/ars-logistica-software-gestione-magazzino/
- https://github.com/HKUDS/CLI-Anything
- https://typesafe.ai
- https://docs.typesafe.ai/models
- https://playwright.dev/python/docs/locators
- https://playwright.dev/python/docs/actionability

## Dati e ripresa

Nessun client di rete, credenziale o telemetria nel programma. Database e piani contengono dati operativi: usare cartella locale riservata e protezioni IT. SQLite non è cifrato; umask 077 vale su POSIX, permessi Windows da configurare. Nessun backup con il programma in esecuzione; non cancellare stati per forzare il caricamento. Il lock locale non protegge da altri operatori nel gestionale.

Non sono presunti annullamento automatico o garanzie server di esecuzione una sola volta. Nessuna misura o promessa di risparmio. Vedere PROVA_REALE.md per criteri di arresto, riconciliazione e autorizzazione sul caso concreto.
