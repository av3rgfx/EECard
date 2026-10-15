# EECard — punto di ripresa

Aggiornato il 15 ottobre 2026. Repository: https://github.com/av3rgfx/EECard.

## Consegna corrente: IN03 — importazione guidata locale

Leggere [implementazione e copione](importazione-bollette-2026-10-15/README.md)
e [verifiche](importazione-bollette-2026-10-15/VERIFICHE.md), poi il
[piano IN01–IN10](discussione-2026-10-15/PIANO_INCREMENTALE.md).
Lo [studio audio](discussione-2026-10-15/README.md) e IN01 sono già completati:
non ripetere trascrizione, analisi integrale o gestione del rinnovo.

IN03: spazio Cliente 01 → Utenze → casa → Aggiungi bolletta → facsimile incluso
→ confronto originale/dati → riepilogo e conferma → salvataggio locale.
Importo incerto da correggere, annullo, duplicato anche da seconda copia,
rettifica collegata con storico, permessi per intestazione/delega e recupero
dopo errore di memoria. Nessun OCR, upload, codice pagabile o pagamento reale.

Originali sintetici HTML e dati strutturati in `src/workspace/bills.ts`;
interfaccia in `BillsPanel.tsx`. Persistenza compatibile tramite `bills` nel
workspace v1; vecchi salvataggi ricevono le due fixture, dati incompatibili
producono ripristino con avviso. Schema 4 e grants invariati. Importazioni e
versioni sono consultabili nelle Utenze; l'archivio 0.4 conserva gli originali
iniziali e rimanda alle Utenze. Nuovi documenti non aggiunti alla ricerca globale,
condivisione o esportazione 0.4. Queste estensioni richiederanno policy sui derivati.

## Stato remoto e pubblicazione

PR #13 verificata **integrata** il 14 ottobre 2026 alle 23:08:00 UTC,
merge `be4b23ebb869c156713d3da491791b556cafbfec`. Nessuna PR aperta all'avvio.
Creato da main remoto aggiornato il branch `feat/in03-importazione-bollette`.
Consegna IN03: PR da registrare dopo la creazione. Nessun merge dell'assistente.
Prima del prossimo checkout verificare il remoto: riutilizzare una PR aperta
solo per la stessa consegna; dopo merge partire da main aggiornato e nuovo branch.

Nessun deploy richiesto o eseguito. Online rimane Sites v8, sorgente
`448f3721760ec3289920f092fa919240b50be2d4`:
[piattaforma](https://eecard-design-preview.uepacio.chatgpt.site/).
L'HTML autonomo locale è aggiornato; push e PR non pubblicano il sito.
Conservare identità e accesso di `.openai/hosting.json`.

## Come provare IN03

`npm ci`, `npm run dev`, aprire `http://localhost:5173/`.

1. Strumenti della demo → scenario Lettore indisponibile → Vista cliente → Utenze.
   In alternativa completare la pratica esistente prima di aprire Vista cliente.
2. Casa Luce → Aggiungi bolletta → Novembre, importo da correggere. Confrontare
   proposta 964,00 con originale 96,40, correggere e motivare.
3. Rivedere il riepilogo, confermare, ricaricare. Ripetere con la seconda copia:
   aprire il documento esistente senza creare una nuova bolletta.
4. Importare la rettifica di ottobre: 84 → 79 EUR; aprire lo storico versione 1/2.
5. Provare copia illeggibile, Casa Atelier senza codice e cambio casa/attore.
   Ripristina scenario elimina le importazioni. Il copione completo è nel README.

14 test IN03; suite completa 83/83. Dettagli, rifiniture e controlli finali nel
rapporto, con distinzione fra emulazione Chromium e dispositivi fisici.
Ingressi `/#/spazio/overview` e `/#/prova`; laboratorio 0.4 a `/#/laboratorio`.
Data sintetica fissa 14 ottobre 2026. Nessuna autenticazione/server operativo.

## Prossimo lavoro consigliato

1. Seguire la nuova richiesta corrente. In assenza di altra priorità: **IN04**,
   «Mostra avviso», a partire dai dati/versioni di IN03; originale e alternativa
   testuale, codice assente/illeggibile, stato ignoto/domiciliazione/pagato e
   permessi. Solo facsimili non pagabili; nessuna promessa di lettura a un terminale.
2. IN05: report annuali cliente e agenzia con viste separate, destinatari
   confermati dall'utente (C29/USR01). Definire fonti, periodo, copertura e metriche;
   non annualizzare fixture né aggregare bollette private senza titolo.
3. In parallelo chiarire preavviso, unità/durata, pro rata/downgrade, listino e
   condizioni operative. NA01–NA16 restano candidati, non approvazioni commerciali.
4. IN06/chiamate AI resta studio/anteprima senza invii, numeri o provider reali.
5. N10/BF16: usare BF02 esistente annotando supporto/commit; osservazioni umane
   su comprensione, percorso, diniego e recupero. Note individuali fuori repo;
   sintesi anonime autorizzate. Test automatici non sono misure di beneficio.

BF16 e N02 (telefoni/Safari/Android/screen reader) restano aperti, BF02 intatto.
Restano BF01/BF03/BF17, primo pagante, copertura, risorse, conservazione e
architettura. Nessun rinvio automatico di pagamenti, app, hardware o AI.

Fonti audio e trascrizioni integrali restano private e fuori repository. Percorsi
privati temporanei non sono prerequisiti di ripresa; non inventare riascolti.
Il [prompt corrente](PROMPT_NUOVA_SESSIONE.md) resta entro 4.000 caratteri.
