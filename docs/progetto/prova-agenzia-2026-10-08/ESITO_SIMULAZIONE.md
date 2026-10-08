# Esito della preparazione e della revisione simulata

8 ottobre 2026. Seguito autorizzato della consegna funzionale con «ok bene
procedi». PR #6 verificata ancora aperta prima del lavoro; stesso branch
`docs/specifiche-funzionali-2026-10-08`, base della continuazione `dc1a536`.
Nessun merge. La [PR #6](https://github.com/av3rgfx/EECard/pull/6) raccoglie
specifiche e kit; il suo HEAD indica il checkpoint remoto corrente.

## Risultato disponibile

[BF02](../specifiche-2026-10-08/OFFERTE_RILASCIO.md) ha un kit eseguibile:
due set di dodici casi equivalenti per struttura, 144 evidenze sintetiche,
quattro pacchetti operatore, chiave del facilitatore e modelli per misure/costi.
Ogni set contiene nove casi nucleo, due estensioni e un controllo; 47 evidenze
ammesse e 25 negate. Sono pianificate 48 esecuzioni, tutte `non_eseguita`.
L'equivalenza di difficoltà richiede ancora verifica con persone.

I riferimenti ai PF, agli EA e ai criteri di accettazione sono nei JSON e
nella [chiave del facilitatore](materiali/facilitatore.md). Il protocollo
mantiene separati nucleo, estensioni e controllo dei significati finanziari.
Le differenze tra condizione corrente e proposta sono documentali: l'indice
aggiunto non è un'interfaccia EECard implementata. Il metodo corrente reale
dell'agenzia non è stato osservato.

## Revisione svolta e correzioni

Due assistenti AI hanno letto separatamente i dodici casi A e B dai soli
pacchetti operatore della prima generazione, senza la chiave o i JSON dei
risultati attesi. Un'altra revisione ha controllato generatore, analizzatore
e protocollo. Il confronto delle selezioni ha trovato riferimenti esistenti
e nessuna fonte negata selezionata nei 24 elaborati iniziali.

Questo dato **non è una percentuale di successo del prodotto**: i pacchetti
iniziali contenevano indizi involontari nell'ordine e nei titoli delle fonti.
Gli assistenti non sono operatori dell'agenzia e non è stato svolto un
esperimento cieco valido. La revisione è servita a correggere il materiale.

| Punto | Osservazione | Correzione nella versione consegnata |
| --- | --- | --- |
| Tutti i casi | Suffisso nei titoli delle fonti negate e ordine sistematico ammessi/negati suggerivano la soluzione | Eliminato il suffisso, ordine misto deterministico con permutazioni equivalenti A/B; conservati i fatti necessari per motivare i permessi |
| S05 · PF02 | Il mandato consentiva lettura, mentre il cliente chiedeva una copia | Esplicitati consultazione ammessa, consegna/esportazione senza delega bloccata e raccolta della delega come prossimo passo |
| S06 · PF02 | L'elenco delle fonti consultabili poteva essere interpretato come permesso offline | Distinte fase con server disponibile e fase senza nuove letture; nel protocollo gli ID selezionati riguardano la prima fase |
| S11 · PF06 | Il revisore era identificato, il referente per i dati mancanti no | Assegnato nel caso sintetico un referente identificato che raccoglie conferma dalle parti; nessun potere di inventare o decidere unilateralmente le condizioni |
| S09/S12 | Importi A/B identici favorivano la ripetizione della risposta | Variati gli importi B mantenendo lo stesso tipo di compito: bolletta 96 EUR; dovuto 120, verificato 50, residuo 70. A resta 88 EUR e 100/40/60. Sono valori fittizi, non prezzi |
| Scheda di misura | Vuoto, zero osservato, errore corretto e fallimento dovevano restare distinguibili | Controlli su campi mancanti, numeri, durata, esiti e fonti; errori critici conservati anche dopo correzione; fallimenti esclusi dai tempi appaiati ma mantenuti nei conteggi |

Una rilettura mirata del pacchetto finale B05/B09/B11/B12 ha riconosciuto i
nuovi limiti di copia, il referente e gli importi corretti senza rilevare
contraddizioni residue nei quattro casi. È una revisione successiva a feedback,
non una nuova prova indipendente. Canone mancante, date in conflitto, anno
storico incerto e condizioni commerciali assenti rimangono blocchi intenzionali.

## Controlli riproducibili

Dalla radice della repository:

```bash
python3 -B scripts/prova-agenzia.py validate
python3 -B scripts/test-prova-agenzia.py
python3 -B scripts/prova-agenzia.py prepare --output /tmp/eecard-prova-nuova
python3 -B scripts/prova-agenzia.py analyze --measurements /tmp/eecard-prova-nuova/misure.csv
```

La destinazione di `prepare` deve essere nuova. Risultati verificati:

- Validazione: 24 casi, dodici coppie A/B, riferimenti EA/PF/criteri esistenti,
  144 ID evidenza unici e nessuna fonte di un'altra agenzia marcata ammessa.
  È coerenza dei dati di prova, non autorizzazione software.
- **18 test passati**: inclusi isolamento strutturale, pianificazione,
  mancata sovrascrittura, vuoti/zeri, righe mancanti, fallimenti/abbandoni,
  errori critici, durata, aiuti e separazione attivazione/recupero.
- Sette file generati riproducibili dai JSON; pacchetti operatore privi di
  campi soluzione/visibilità della chiave. I fatti sui mandati restano leggibili.
- Modello: 48 righe senza osservazioni, cinque categorie di costo senza valori.
  Analisi: «Nessuna misura osservata. Successo, tempi, risparmio e costi non
  stimabili.» Nessuna osservazione AI inserita nei CSV.

Controllo finale della continuazione rispetto a `dc1a536`: 26 file, di cui
19 Markdown, 285 collegamenti locali/ancore validi e `git diff --check` senza
errori. Ricontrollata la tracciabilità esistente: 30 RF/EA, sei PF, 54 criteri,
18 BF senza cicli espliciti e otto FT. Frontend, fixture del prototipo, asset e hosting
invariati. Nessun nuovo test UI, deploy, servizio, prova hardware o firma.
Gli otto collaudi FT restano da eseguire.

## Decisione e passo successivo

Il kit rende concreta la prova di fascicolo e continuità al banco; non chiude
BF16 e non conferma le soglie proposte di tempo, costo o completamento.
Non dimostra disponibilità a pagare, sicurezza del backend o idempotenza reale.
Non sono disponibili misure umane, costi dell'agenzia o esiti commerciali.

Prossima attività: un facilitatore e due operatori reali eseguono il
[protocollo](PROTOCOLLO.md) su copie esterne al repository. Prima osservano il
processo corrente e registrano eventuali adattamenti; poi raccolgono risposte,
aiuti, errori e tempi. Si analizzano separatamente recupero e attivazione,
compreso il lavoro necessario a preparare i fascicoli. In seguito si motivano
correzioni e contratti di servizio BF03.

Restano aperti primo pagante, prezzi/inclusioni, risorse, Jarvis, destinatari
dei due schermi e tipo di firma. EECard provvisorio, C–Legame e direzione 0.3
rimangono le scelte di riferimento. Nessun audio, trascrizione integrale o
dato personale è necessario per usare il kit.
