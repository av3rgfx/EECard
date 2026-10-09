# EECard — kit della prova in agenzia

8 ottobre 2026. Avanzamento autorizzato dall'utente con «ok bene procedi» dopo
la proposta di provare attivazione → ritorno al banco → recupero storico.
Si usa R1 come perimetro della prova, senza dedurne listino, lancio operativo,
destinatari degli schermi o integrazioni approvate.

Il kit rende eseguibile **BF02** e prepara **BF16** del
[backlog](../specifiche-2026-10-08/OFFERTE_RILASCIO.md). È una simulazione
documentale guidata: non è il frontend EECard e non contiene un server che
autorizza davvero gli accessi. Il facilitatore applica le regole degli scenari;
una risposta corretta non dimostra sicurezza software o velocità del prodotto.

## Materiale e avvio

| Risorsa | Uso |
| --- | --- |
| [PROTOCOLLO.md](PROTOCOLLO.md) | Preparazione, assegnazione dei due operatori, istruzioni, misure e regole di decisione |
| [SET_A.json](SET_A.json) e [SET_B.json](SET_B.json) | Due set equivalenti di dodici casi: dati sintetici, evidenze e risultati attesi per chi prepara la prova |
| [materiali/](materiali/) | Pacchetti operatore, chiave del facilitatore e modelli CSV generati dai set |
| [ESITO_SIMULAZIONE.md](ESITO_SIMULAZIONE.md) | Revisione simulata del kit, verifiche tecniche e limiti; distinta dalle misure degli operatori reali |
| [Strumento locale](../../../scripts/prova-agenzia.py) | Controllo, generazione dei materiali e analisi delle misure; Python standard, senza servizi |

Dalla radice della repository:

```bash
python3 scripts/prova-agenzia.py validate
python3 scripts/prova-agenzia.py prepare --output /tmp/eecard-prova
python3 scripts/prova-agenzia.py analyze --measurements /tmp/eecard-prova/misure.csv
```

Lavorare su una copia esterna al repository per le osservazioni raccolte.
Conservare qui solo modelli vuoti, dati sintetici ed esiti anonimi autorizzati.
La generazione non modifica il prototipo, non invia inviti e non attiva adesioni.
Il protocollo indica quali file dare all'operatore: i JSON contengono le risposte
attese e non devono essere consultati durante la prova.

La cartella di uscita deve essere nuova: lo strumento rifiuta di sovrascrivere
i materiali e le eventuali osservazioni. Con il modello vuoto l'analisi riporta
«Nessuna misura osservata», senza percentuali di successo o tempi inventati.

Pacchetti già generati per l'uso immediato:

- OP01: [fase 1 corrente/A](materiali/OP01_FASE1_corrente_A.md), poi
  [fase 2 proposta/B](materiali/OP01_FASE2_proposta_B.md).
- OP02: [fase 1 proposta/A](materiali/OP02_FASE1_proposta_A.md), poi
  [fase 2 corrente/B](materiali/OP02_FASE2_corrente_B.md).
- Solo facilitatore: [chiave e compilazione](materiali/facilitatore.md),
  [misure vuote](materiali/misure.csv), [costi vuoti](materiali/costi.csv).

## Beneficio sottoposto alla prova

**Ipotesi:** una pratica con dati attribuiti, un fascicolo con indice e una
prossima azione esplicita consentono a un operatore diverso dall'autore di
ritrovare il documento pertinente senza ricostruire il rapporto da memoria.
Il cliente ripete meno informazioni; l'agenzia impiega meno lavoro totale,
includendo preparazione e correzioni.

Si confrontano due presentazioni documentali degli stessi tipi di informazioni:
materiali da ricomporre e fascicolo organizzato. Il metodo corrente effettivo
dell'agenzia deve essere osservato prima di attribuire il risultato al suo
lavoro reale. Il test non presume che oggi l'agenzia lavori in modo disordinato.

Il nucleo comprende PF01, PF02, PF05 e i controlli contestuali PF03. Bolletta
e bozza contrattuale sono prove di estensione; il parziale è un controllo di
significato. I loro risultati restano separati e non ampliano il rilascio.

## Stato e confini

Il kit e la revisione simulata sono preparazione verificabile. La prova con
due operatori reali, le misure di tempo/costo e la disponibilità a pagare non
sono eseguite dall'assistente. Nessun tempo plausibile viene scritto al posto
di un'osservazione. Le soglie nel protocollo sono proposte, non risultati.

Prezzi, primo pagante e condizioni restano aperti; 600 euro annui è un
riferimento al servizio preesistente, non un listino. Nome provvisorio,
C–Legame e 0.3 restano invariati. Tutti i documenti di prova sono sintetici,
senza nomi di clienti, recapiti, indirizzi, IBAN, QR pagabili o firme reali.
Non è stato effettuato un deploy o un merge.
