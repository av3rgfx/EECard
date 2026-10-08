# Protocollo della prova guidata

8 ottobre 2026. Deriva da [OFFERTE_RILASCIO §4](../specifiche-2026-10-08/OFFERTE_RILASCIO.md#4-prova-proposta-con-lagenzia)
e dai [percorsi PF](../specifiche-2026-10-08/PERCORSI.md). Le scelte sotto rendono
eseguibile la prova autorizzata; non definiscono condizioni commerciali.

## 1. Preparazione

Un facilitatore prepara le copie dei materiali e registra gli esiti. OP01 è
un operatore che conosce il modo di lavorare dell'agenzia; OP02 un operatore
che non ha preparato questi fascicoli. Sono etichette della prova, distinte
dagli attori fittizi descritti nei casi. Non scegliere nomi di persone reali
come identificativi nel report condiviso.

Prima delle esecuzioni:

1. Eseguire `validate`, generare una copia con `prepare` e controllare che la
   scheda osservazioni riporti tutte le righe `non_eseguita`, senza tempi/esiti.
2. Leggere i risultati attesi solo come facilitatore. Consegnare agli operatori
   esclusivamente il relativo pacchetto, non i JSON né la chiave delle risposte.
3. Stabilire luogo, supporto (carta o visualizzatore Markdown), dimensioni del
   testo e modalità di ricerca; mantenerli uguali fra le condizioni. Il test
   non confronta un motore di ricerca automatico con una persona senza strumenti.
4. Descrivere separatamente il metodo corrente effettivo. La condizione
   «corrente» del kit è una simulazione documentale, non una rilevazione già
   fatta sull'agenzia. Se il suo processo è diverso, adattare il confronto e
   registrare versione e modifiche prima di raccogliere i tempi.
5. Stabilire un limite massimo per caso uguale fra condizioni e annotarlo.
   Non eliminare a posteriori i casi lenti o falliti. Concordare prima le
   soglie proposte sotto e il significato dei costi aggregati da raccogliere.
6. Fare un'esercitazione fuori campione: immobile fittizio X, documento X1,
   mandato valido, richiesta di indicare fonte e versione. Nessuna misura
   dell'esercitazione entra nelle 48 esecuzioni.

L'eventuale tempo speso a imparare il kit è preparazione, da annotare
separatamente; non è tempo di attivazione di un immobile. Per confrontare
familiarità e passaggio di consegne, registrare chi ha preparato i materiali.

## 2. Assegnazione e separazione delle condizioni

| Partecipante | Prima fase | Seconda fase |
| --- | --- | --- |
| OP01 | 12 casi del set A, condizione corrente simulata | 12 casi equivalenti del set B, condizione proposta |
| OP02 | 12 casi del set A, condizione proposta | 12 casi equivalenti del set B, condizione corrente simulata |

Totale: 2 operatori × 2 condizioni × 12 casi = **48 esecuzioni**.
Non condividere soluzioni fra operatori o fra fasi. Pausa e condizioni ambientali
sono annotate, senza promettere che il controbilanciamento elimini ogni effetto
di apprendimento. I set cambiano riferimenti, anni e importi di test, conservando
struttura, difficoltà prevista, regole e numero di evidenze pertinenti/negate.

L'operatore riceve le stesse tipologie di fatti nelle due condizioni. Nella
corrente simulata li ricompone dai materiali; nella proposta usa l'indice del
fascicolo. Le etichette della chiave («ammessa», «negata», risultato atteso)
non sono suggerimenti da mostrare. Le informazioni che fondano i permessi
devono invece essere leggibili: attore, mandato, destinatario, date e scopo.

I pacchetti sono pubblici e sintetici. Mostrare le evidenze a chi ragiona sul
caso non significa concedergli accesso a dati reali: l'operatore deve decidere
quali contenuti il prodotto potrebbe consegnare all'attore della storia.
Nessun selettore del kit applica autorizzazioni di produzione.

## 3. Istruzione da leggere a ogni operatore

«Stai lavorando su esempi interamente fittizi. Per ciascun caso indica quale
pratica e quali documenti useresti, quali azioni sono consentite e dove ti
fermeresti. Motiva con i fatti del fascicolo, includendo fonte, versione e
periodo quando pertinenti. Non inventare dati mancanti o condizioni commerciali.
Puoi dire che non hai informazioni sufficienti. Non devi davvero inviare,
pagare, firmare o attivare nulla.»

Il facilitatore mostra un caso alla volta, avvia la misura dopo che è stato
consegnato il compito e la termina quando l'operatore dichiara l'esito o scade
il limite. Interventi del facilitatore, attese e correzioni sono annotati.
Non leggere la soluzione per far terminare un caso e poi chiamarlo autonomo.

Per PF01 l'esito è una proposta di stato e consegna: dati già verificati
riutilizzati, inviti individuali predisposti, adesione economica non attivata
se offerta/condizioni sono assenti. Per PF02 è la selezione motivata della
pratica e della prossima azione; la card non sostituisce la verifica della
persona. Per PF05 è il documento/versione trovato, con attendibilità della
data e limiti del controllo formale.

## 4. Casi e valutazione

| Coppia | Scopo | Gruppo da analizzare |
| --- | --- | --- |
| S01 | Nuova pratica, più parti, adesione separata | Nucleo PF01 |
| S02 | Persona già presente e omonimia | Nucleo PF01 |
| S03 | Ritorno con contratto storico | Nucleo PF02 |
| S04 | Nuovo operatore e più immobili | Nucleo PF02 |
| S05 | Card revocata e recupero assistito | Nucleo PF02 |
| S06 | Lettore indisponibile, poi server indisponibile | Nucleo PF02 |
| S07 | Casa propria e casa locata, utenze private | Nucleo PF03 |
| S08 | Subentro e storico legittimo del precedente rapporto | Nucleo PF03 |
| S09 | Bolletta: QR illeggibile e domiciliazione | Estensione PF04 |
| S10 | Documento storico, anno incerto e versioni | Nucleo PF05 |
| S11 | Bozza con dati mancanti/in conflitto | Estensione PF06 |
| S12 | Allegato, dichiarazione, incasso parziale e quietanza | Controllo trasversale |

Il facilitatore confronta la risposta con le azioni e gli errori critici nella
chiave. Registra la risposta prima di valutarla. Un blocco previsto (es. nessun
file con server indisponibile) è un esito corretto, non un abbandono.
Un'azione non prevista dalla chiave ma sostenuta dalle specifiche va annotata
come ambiguità del kit, senza decidere arbitrariamente che l'operatore sbaglia.

Valutazione dell'esecuzione:

- **Corretta:** tutti i fatti indispensabili riconosciuti, prossima azione
  coerente e nessun errore critico; indicare separatamente se ha richiesto aiuto.
- **Errata:** conclusione o azione sbagliata; conservare risposta e correzione.
- **Abbandonata:** l'operatore non conclude o raggiunge il limite; registrare
  motivo e tempo osservato, senza rimuoverla dal denominatore.
- **Incompleta:** misura o osservazione essenziale assente; non trasformarla
  in zero né in successo. Raccogliere il dato mancante o dichiarare il limite.

Sono critici: divulgare una bolletta o un fascicolo non autorizzato; riattivare
la card revocata per aggirare la verifica; considerare upload o dichiarazione
un incasso; azzerare un residuo dopo quietanza parziale; presentare una bozza
come firmata; attivare commercialmente in assenza di condizioni.

## 5. Tempi, costi e decisione

Compilare soltanto osservazioni effettive: tempo attivo, attesa, aiuti,
correzioni, esito e motivo. Il tempo attivo include la correzione prima di
concludere. Annotare separatamente riordino/importazione iniziale, formazione
e manutenzione dell'indice; non nasconderli nel confronto dei soli tempi di
ricerca. Non ricavare minuti dai tempi di generazione di un assistente AI.

Nel CSV `completata` significa risposta corretta secondo il facilitatore,
`fallita` risposta errata, `abbandonata` interruzione, `non_eseguita` nessuna
osservazione. Una riga con stato eseguito e campi essenziali mancanti viene
riportata come incompleta e non alimenta il confronto dei tempi. `errors`
conta errori rimasti nell'esito finale; `corrections` le correzioni durante il
compito; `critical_errors` gli errori critici anche se successivamente corretti.
Un errore critico impedisce lo stato `completata`. La selezione di una fonte
negata come utilizzabile è un errore critico, non un semplice aiuto.

`started_at`/`finished_at` usano ISO 8601 con fuso; `active_seconds` e
`wait_seconds` sono secondi osservati e non possono superare insieme la durata
registrata, salvo un secondo di tolleranza per arrotondamenti. `helps` conta
aiuti esterni. In `selected_evidence_ids` usare ID separati da `;`, oppure `-`
se non è stata selezionata alcuna evidenza. Per S06 la risposta descrive le due
fasi; l'elenco degli ID riguarda le fonti usate nella fase con server disponibile,
non autorizza a riaprirle offline.

I costi richiedono minuti per ruolo e costo pieno orario aggregato fornito
dall'agenzia, più consumi documentati. Mancanza del costo significa **non
calcolabile**, non zero. Conservare retribuzioni e dettagli personali fuori
dal repository. Non compilare margini o recupero dell'investimento finché
prezzo, volumi e costi dei fornitori non sono confermati.

Soglie iniziali proposte, da registrare prima della prova:

| Dimensione | Criterio | Limite |
| --- | --- | --- |
| Recupero PF02/PF05 | Mediana del tempo attivo almeno 30% inferiore | Pubblicare anche tempi assoluti, massimo, fallimenti e dimensione del campione; non dimostra risparmio su tutta l'attività |
| Attivazione PF01 | Nessun reinserimento ingiustificato e tempo attivo non superiore | Preparazione e migrazione conteggiate a parte |
| Completamento | Almeno 90% di compiti corretti senza aiuto | Riportare numeratore/denominatore e blocchi attesi; niente esclusione dei fallimenti |
| Riservatezza e significati | Zero errori critici | Anche un solo errore richiede analisi del flusso prima di una prova con dati reali |
| Continuità | OP02 conclude tutte le ricerche ammesse senza l'autore dei fascicoli | Se manca un fatto nella consegna, correggere il materiale e distinguere la ripetizione |
| Costo | Non superiore alla base a parità di risultato | Una simulazione documentale non dimostra margine commerciale o costo futuro del software |

Calcolare confronti separati per gruppo e per percorso. I tempi di coppie con
esiti corretti in entrambe le condizioni possono essere confrontati, ma i casi
esclusi da quel confronto devono restare nel riepilogo di fallimenti e copertura.
Non dichiarare raggiunta una soglia generale soltanto su un sottoinsieme di
casi facili. L'analisi automatica è un riepilogo, la decisione resta motivata.

Esiti possibili: mantenere R1 come ipotesi di lavoro; correggere dati/indice/
sequenza; scegliere un altro beneficio da provare. La disponibilità a pagare
richiede una prova commerciale separata con condizioni esplicite.

## 6. Consegna dei risultati

Conservare versione del kit, identificativi OP, ordine, supporto utilizzato,
scenari eseguiti, risposte, misure mancanti, ambiguità e modifiche. Nel repository
pubblicare solo esiti anonimi autorizzati. Il modello CSV resta vuoto nel kit;
non sovrascriverlo con osservazioni o costi individuali.

La revisione con assistenti AI viene registrata separatamente in
[ESITO_SIMULAZIONE.md](ESITO_SIMULAZIONE.md): può individuare dati mancanti o
contraddizioni, non sostituire OP01/OP02, convalidare il backend o provare le
soglie di tempo/costo. Gli otto collaudi FT di hardware/firma/AI rimangono aperti.
