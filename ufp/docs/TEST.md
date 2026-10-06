# Test locali della V1

Rieseguiti sulla copia pubblica anonimizzata il 6 ottobre 2026: 31 test passati. Workflow GitHub predisposto per Linux e Windows; il successo Windows non è attestato dal test locale Linux.

Eseguiti il 5 ottobre 2026 su Linux, Python 3.12.14, con standard library. Comando:

```console
python -m unittest discover -s tests -v
```

**Risultato finale: 31 test passati**, inclusi sottocasi per otto combinazioni di interruzione prima/dopo i quattro punti di salvataggio. Output integrale: `test-results.txt`. Durante l'aggiunta della cronologia eventi è stato rilevato e corretto un numero errato di parametri SQL; la suite finale è stata rieseguita integralmente con esito OK.

| Requisito | Prova ed esito |
|---|---|
| Caricamento ordinario | 6 NR su residuo 10: resta 4; un DDT e una lista sospesa. PASS |
| Consegna completa | 10 su 10: residuo zero. PASS |
| Consegne parziali successive | Due DDT distinti, 6 + 4 sul medesimo ordine; residuo finale zero. PASS |
| Codice ripetuto | Stesso articolo su due ordini: due righe distinte. Stesso ordine con due righe candidate: blocco senza row_ref. PASS |
| Codice discordante | Codice fornitore diverso: blocco, nessuna correzione per somiglianza. PASS |
| Conversioni | 0.072 TO ×1000 = 72.000 KG esatti; fattore errato o approvatore mancante bloccati. PASS |
| Unità commerciali | Fornitore demo Coppia/NR storico: blocco. PASS |
| Bolla/fisico diversi | Bolla 6, fisico 4: richiede motivo, registra 4. PASS |
| Residui | Eccesso cumulativo di due righe sulla stessa riga ordine: blocco. Snapshot cambiato: arresto prima delle scritture. PASS |
| Duplicati | Ripetizione con registro locale nuovo: rilettura del sistema fittizio, nessuna nuova scrittura. Documento presente con piano diverso: blocco. PASS |
| Interruzioni | Prima/dopo creazione DDT, riga, conferma e Libero; chiusura e riapertura DB e ripresa: quattro sole scritture in totale. PASS |
| DDT incompleto | Due righe, arresto dopo la prima: ripresa della seconda senza ricaricare la prima. PASS |
| Esito ignoto | Ripetuti tentativi non riscrivono; ripresa solo dopo ripristino della leggibilità dell'evidenza lato simulatore. PASS |
| Libero fallito | DDT già confermato: ripresa di Libero, residui invariati e nessun secondo DDT. PASS |
| Registro insufficiente | Stato locale verificato ma lista assente nel simulatore: riconciliazione, non ricreazione automatica. PASS |
| Sessione/schermata | Stati expired/unexpected: nessuna scrittura. PASS |
| Dati approvati | Assenza conferma, token errato, piano alterato, dati modificati senza nuova approvazione: blocco. PASS |
| Persistenza | Cronologia conserva tentativo e verifica; lock locale blocca esecuzione concorrente. PASS |
| CLI completa | Prepare → approve interattivo → sim-init → simulate → replay in processi separati. PASS |
| Input | Non finiti, negativi, zero, virgole, numeri JSON, troppi decimali, duplicazione line_id, campi ignoti, documento incompleto e ordine assente: blocco. PASS |
| Confine reale | Oggetto backend diverso da Simulator rifiutato; palmare rimane NOT_VERIFIED. PASS |

La scheda Excel è stata riaperta con un lettore XLSX e controllata: 6 fogli, 92 domande/istruzioni, celle testuali per codici/quantità/date, nessuna macro o formula. Nessuna prova d'interazione con Excel sulla postazione UFP. La scheda è raccolta di informazioni, non un importatore automatico.

Questi test provano la logica e la persistenza locale **nel modello simulato**. Non dimostrano selettori ARS, transazioni reali, identificativi affidabili, completezza delle ricerche reali, protezione dai duplicati del server, compatibilità Windows della postazione, correzioni dell'ufficio o disponibilità sul palmare. Non sono state fatte misurazioni del tempo del processo reale.
