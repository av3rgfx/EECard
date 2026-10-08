# Prompt da incollare in una nuova sessione

Prosegui lo studio, la progettazione e la preparazione dello sviluppo di EECard,
partendo dal lavoro esistente e dalla nuova conversazione dei fondatori del
7 ottobre 2026. Rispondi in italiano. Mi serve un aggiornamento incrementale,
con scelte e risultati concreti per continuare lo sviluppo del prodotto.

Repository unica: https://github.com/av3rgfx/EECard.
Il passaggio di consegne dell'8 ottobre si trova in
`docs/progetto/discussione-2026-10-07/`, nel branch
`docs/discussione-2026-10-07` o nella [PR #5](https://github.com/av3rgfx/EECard/pull/5),
se non è ancora in main.
Verifica lo stato remoto prima di scegliere il branch di lavoro. La base letta
per questa analisi era main al commit
`4b77c0bd41d733c7a7680ad3d63d9a496424db64`.

Ti fornisco il rapporto PDF/Markdown, il contesto della repository e, se
disponibili, la trascrizione automatica e l'audio originale. Il rapporto
`ANALISI_CONVERSAZIONE.md` contiene tutti i punti EA01-EA30 con intervalli audio,
confronto con il progetto precedente, conseguenze e questioni aperte.
Se il pacchetto ZIP non è direttamente leggibile, estrailo per leggere i file.
Se audio o file non sono accessibili, dichiaralo con precisione e continua
usando le fonti disponibili: non inventare il contenuto mancante.

## Lettura iniziale obbligatoria

1. Leggi `AGENTS.md` e `docs/progetto/PROSSIMA_SESSIONE.md`.
2. Leggi `PRODUCT.md`, `DESIGN.md`, `DEVELOPMENT.md`,
   `docs/progetto/BACKLOG.md`, `docs/design/DECISIONI.md`.
3. Leggi i nuovi `ANALISI_CONVERSAZIONE.md`, `CONTESTO_REPOSITORY.md` e il
   README nella cartella della discussione del 7 ottobre.
4. Consulta lo studio v0.1 in `docs/progetto/EECard-studio-v0.1.pdf` per i temi
   interessati e il codice dei percorsi che intendi progettare o modificare.
5. Per design consulta `DESIGN_SYSTEM.md`, `MARCHIO.md` e i rapporti esistenti;
   per una nuova pubblicazione leggi il manifest e le istruzioni di hosting.

Non assumere che i vecchi documenti dicano lo stato remoto attuale: la PR #4,
che alcuni riferimenti descrivevano aperta, è stata integrata. Il merge non
significa che il prodotto sia operativo o che la demo online sia stata
nuovamente pubblicata.

## Contesto da conservare

EECard è ancora un nome provvisorio. Il simbolo C - Legame è stato scelto;
Legame non è il nome approvato del prodotto. La 0.3 usa tessera/materiali di
Materia e luce, struttura aperta di Editoriale e architettura, bruno,
albicocca e avorio. Tessera prima nella home personale; agenzia e tecnico
mantengono le loro aree operative. Gli immobili sono compatti solo nella
home quando quelli visibili nel contesto corrente sono più di uno; una casa
singola e la pagina immobili restano espanse.

Il repository contiene un prototipo React/TypeScript/Vite con dati demo e
stato nel browser. Non ha backend, account reali, archivio server, pagamenti,
lettori NFC, wallet, firma, domotica o AI operativi. Non trasformare le fixture
e i filtri di presentazione in un modello di produzione per inerzia.

Documento caricato, pagamento dichiarato, incasso verificato e quietanza
sono distinti. I parziali mantengono il residuo. Permessi e deleghe dipendono
dalle relazioni con immobili, contratti, intestazioni e incarichi. La card
identifica l'accesso ai servizi; non è una carta bancaria.

## Nuove direzioni da integrare nello studio

- Proporre/attivare il servizio in agenzia al momento del contratto, riutilizzando
  i dati già raccolti e consegnando un fascicolo pertinente alle parti.
- Differenziare le offerte proprietario/inquilino e la consegna fisica,
  mantenendo pacchetto commerciale e autorizzazioni separati.
- Recuperare rapidamente il fascicolo del cliente dal lettore al banco,
  anche dopo mesi e quando cambia il personale.
- Valutare un mini terminale riconoscibile: supporto prototipabile in stampa
  3D, lettore, due schermi, riepilogo e possibile firma con penna.
- Card contactless, pass Apple Wallet/Google Wallet, registrazione online,
  digitale subito e fisica spedita con un costo aggiuntivo.
- Vendere struttura e funzionamento ad altre agenzie; card personalizzate
  con brand del sistema presente; compenso per design/setup e modello B2B
  da chiarire, con valore anche nel tempo risparmiato.
- Funzioni domestiche per il proprietario nella propria abitazione, senza
  accesso alle bollette personali del suo inquilino.
- Bollette con QR e importo prioritari e dettagli progressivi; domotica come
  possibile integrazione da specificare.
- Fascicolo utile anche alla compravendita: documenti tecnici/edilizi storici,
  ricerca rapida e cronologia dei lavori.
- Migrazione di clienti già gestiti; assistente AI con contesto del fascicolo
  e preparazione di bozze contrattuali riutilizzando dati verificati.
- Spunto di grafica molto tecnologica, fondo bianco e rosso: confrontarlo
  con la direzione 0.3; non cancellare automaticamente scelte già ricevute.

Tutti i punti del rapporto EA01-EA30 devono essere coperti o esplicitamente
registrati come da valutare. Non presentare come inediti i temi già presenti
nello studio precedente. Distinguere novità, precisazione, ripresa e tensione.

## Incertezze da trattare esplicitamente

- Quote, unità, periodicità, IVA e inclusioni non sono concordate. I precedenti
  50/15 euro non sono un listino. Il riferimento a 23:17 circa è instabile
  fra 65 euro e 60-50 euro; non sceglierne una versione per deduzione.
- Il riferimento a 600 euro l'anno riguarda alcuni clienti già gestiti
  nell'esempio e non il prezzo EECard. Un possibile aumento è poco chiaro:
  serve confermare servizio precedente e proposta di migrazione.
- I destinatari esatti dei due schermi e il tipo/valore della firma sono aperti.
- Wallet e lettura NFC sono due risultati diversi. Apple VAS e Google Smart
  Tap hanno requisiti specifici di pass e terminale: verifica le fonti ufficiali
  aggiornate prima di promettere compatibilità o scegliere componenti.
- Le esperienze locali su documenti comunali e attese 30/60 giorni non sono
  regole generali e non dimostrano un'API per acquisirli automaticamente.
- Jarvis è citato colloquialmente: chiarisci se è un progetto esistente da
  integrare, un nome esplorativo o un nuovo modulo; non approvare un naming.
- Il rosso è riconoscibile nello spunto visivo, la tonalità precisa è incerta.
  Proponi un esempio circoscritto se serve cambiare la direzione.
- Non sono fissati primo rilascio, budget, team, territorio o copertura.
  Non assumere rinvii già concordati per pagamenti, app, 3D, AI o totem.

## Lavoro che ti chiedo di svolgere

Prima restituisci una sintesi del punto di partenza e dei cambiamenti realmente
necessari. Poi prepara:

1. Un registro incrementale di requisiti e decisioni, con ID EA collegati,
   fonte, stato e differenza rispetto al repository.
2. Due schede di offerta, clienti e agenzie, separando servizio, software,
   personalizzazione, hardware e costi da confermare. Non inventare listini.
3. Percorsi completi per attivazione al contratto, ritorno al banco, casa
   propria/locata, bolletta, documento storico e bozza contratto: attori,
   dati, autorizzazioni, stati, errori e criteri di accettazione.
4. Una proposta di primo rilascio con alternative e dipendenze, motivata dal
   beneficio acquistato. Le esclusioni devono essere esplicite e proposte,
   non presentate come decisioni dei fondatori.
5. Un modello logico di persone, agenzie, immobili, contratti, documenti,
   lavori, adesioni/card e dispositivi, proporzionato al perimetro scelto.
6. Una verifica di fattibilità mirata per wallet/lettori/firma e compiti AI,
   con fonti primarie, prove necessarie e limiti realmente osservati.
7. Un confronto visivo limitato se la nuova palette richiede una scelta,
   preservando simbolo, qualità, accessibilità e flussi già approvati.
8. Un backlog ordinato, con dipendenze e criteri osservabili, e una proposta
   di prova con l'agenzia che misuri tempo risparmiato e costo operativo.

Fai poche domande prioritarie se mancano informazioni che cambiano una scelta
concreta. Continua intanto il lavoro indipendente da quelle risposte e usa
ipotesi chiaramente etichettate. Per numeri o parole ambigue usa audio e
conferme, senza trattare la trascrizione automatica come prova definitiva.

Inizia da studio e specifiche. Non avviare un prodotto di produzione o servizi
reali sulla sola base di queste idee discusse. Per eventuali interventi richiesti
e chiaramente autorizzati nella sessione, procedi fino a un risultato concreto,
verificato e revisionabile, conservando il lavoro esistente.

## Conservazione e chiusura

Lavora nella repository EECard. Aggiorna punto di ripresa, backlog, sessioni e
registri pertinenti; conserva lo studio v0.1 come base storica. Usa il branch
corretto e una sola PR per la stessa consegna; dopo un merge parti da main
aggiornato e da un nuovo branch. Non integrare in main senza una richiesta.

Conserva i documenti di progetto nella repository, senza pubblicare audio,
trascrizioni integrali, dati di clienti o documenti reali. Per sole modifiche
documentali controlla coerenza, link e diff; non dichiarare nuovi test UI.
Se cambia il frontend, svolgi le verifiche pertinenti. Se viene richiesta una
pubblicazione, riutilizza il medesimo sito e registra il commit davvero online.

Concludi con cosa è stato deciso, cosa resta proposto/aperto, file e PR, verifiche
eseguite e prossime azioni concrete. Non confondere repository, prototipo,
design, implementazione operativa e servizio realmente disponibile.
