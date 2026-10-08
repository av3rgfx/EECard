# EECard - nuove idee e migliorie

Analisi integrativa della conversazione del 7 ottobre 2026.
Preparata l'8 ottobre 2026. Versione di lavoro 0.2.
Repository di riferimento: https://github.com/av3rgfx/EECard.

## 1. Cosa cambia nel progetto

La conversazione amplia EECard da spazio per immobili, documenti e servizi a
**piattaforma che collega cliente, operatore dell'agenzia e punto di servizio
fisico**. Il fascicolo rimane centrale, ma vengono precisati il momento di
vendita della card, l'accesso al banco, l'offerta ad altre agenzie e un assistente
AI che riutilizza i dati per nuove pratiche.

Le novità più nette rispetto ai documenti e al codice esistenti sono il terminale
da banco con due schermi e possibile firma con penna, i pass nei wallet,
la personalizzazione delle card per agenzie partner, la presentazione delle
bollette con QR/importo prioritari, la domotica e la preparazione assistita dei
contratti. Fascicolo storico, card fisica/digitale, due destinatari principali,
tecnici, totem e AI erano già nella visione: qui ricevono precisazioni o nuovi usi.

Sono censiti **30 punti tracciabili, EA01-EA30**. L'etichetta "Fonte" significa
che l'idea è discussa nell'audio, non che sia approvata per il primo rilascio.
Le conseguenze progettuali e la sequenza di lavoro di questo documento sono
proposte dell'analisi. Nessuna nuova funzione è stata implementata.

## 2. Fonti e affidabilità

L'intero file `EECARD-audio.m4a`, durata 28 minuti e 25 secondi, è stato elaborato
localmente con una trascrizione automatica italiana, seguita da controlli mirati
con un secondo modello e da ulteriori controlli su brevi estratti. Gli intervalli
sono orientativi. Il riconoscimento non equivale a una trascrizione umana
certificata; alcune parole, cifre e passaggi sovrapposti restano incerti.

Il confronto riguarda `main` al commit
`4b77c0bd41d733c7a7680ad3d63d9a496424db64`, lo studio v0.1 di 21 pagine,
le istruzioni, i documenti di prodotto/design/sviluppo, i registri di continuità
e i percorsi presenti nel codice. Il contesto verificato è descritto in
[CONTESTO_REPOSITORY.md](CONTESTO_REPOSITORY.md).

La PR #4 risulta integrata il 7 ottobre alle 22:13:57 UTC, cioè l'8 ottobre alle
00:13:57 in Italia. I vecchi riferimenti alla PR aperta sono un checkpoint
superato. La demo rimane un frontend con dati dimostrativi: il merge non la
trasforma in un servizio operativo.

| Etichetta | Significato |
| --- | --- |
| Fonte | Contenuto ricostruibile dalla conversazione; può essere una proposta o un esempio |
| Nuova | Assente dal perimetro esplicito precedente analizzato |
| Precisazione | Aggiunge un comportamento, canale o regola a un'idea già presente |
| Ripresa | Ribadisce un tema precedente, senza una nuova decisione finale |
| Proposta dell'analisi | Conseguenza o soluzione suggerita qui, da discutere |
| Aperto/incerto | Serve una risposta o un riscontro migliore prima di fissare una regola |

Nomi e vicende personali degli esempi non sono riprodotti nei documenti di
progetto pubblicabili. La trascrizione automatica di supporto rimane separata
dai file versionati nella repository pubblica.

## 3. Mappa della conversazione

| Intervallo | Contenuto progettuale | Punti |
| --- | --- | --- |
| 00:00-02:28 | Terminologia, due profili, vendita/attivazione al contratto, dati già disponibili | EA01-EA03, EA05 |
| 03:16-06:16 | Fascicolo delle parti, consegna, copie, differenze fisiche, quota separata dagli altri importi | EA04-EA07 |
| 06:16-09:33 | Lettore al banco, struttura fisica, recupero fascicolo e continuità quando cambia il personale | EA08-EA10 |
| 10:38-12:08 | Due schermi, pagina cliente dell'operatore, riepilogo e possibile firma | EA09-EA12 |
| 12:08-13:18 | Chip/contactless, wallet, registrazione online e spedizione fisica a pagamento | EA13-EA15 |
| 13:18-14:43 | Offerta ad altre agenzie e funzioni domestiche disponibili anche al proprietario | EA16, EA19-EA20 |
| 14:43-16:25 | QR e importo della bolletta, riservatezza, domotica, card personalizzate dei partner | EA17-EA18, EA21-EA23 |
| 16:25-20:26 | Prezzo B2B, tempo risparmiato, disponibilità a comprare un sistema pronto; digressioni personali | EA18-EA20 |
| 20:28-23:16 | Compravendita, documenti tecnici/edilizi, ricerca storica e cronologia lavori | EA24-EA26 |
| 23:17-24:18 | Cifre non tutte stabili, clienti già gestiti e paganti annualmente, migrazione al nuovo servizio | EA27; questioni economiche |
| 24:18-25:27 | Assistente chiamato colloquialmente Jarvis, contesto personale e preparazione di contratti | EA28-EA29 |
| 26:14-26:27 | Grafica molto tecnologica, fondo bianco e rosso con tonalità da confermare | EA30 |
| 26:27-28:25 | Chiusura e digressioni: nessun ulteriore requisito utilizzabile con affidabilità | Nessuna aggiunta |

Le pause e le digressioni non sono trasformate in funzionalità. I passaggi sui
concorrenti esprimono una percezione del settore, non una ricerca di mercato.

## 4. Catalogo delle idee e delle migliorie

### A. Offerta, attivazione e consegna

#### EA01 - Chiarire cosa si intende per card

**Fonte 00:00-01:08. Ripresa/precisazione.** Il dialogo distingue la card del
servizio da altri usi della parola tessera e ribadisce proprietario/inquilino.
Nel progetto era già una tessera di accesso, distinta da una carta bancaria.
**Da progettare:** un lessico unico per adesione, account, profilo, credenziale
digitale e supporto fisico. La conversazione non definisce due account separati
per la stessa persona e non approva un nome definitivo del prodotto.

#### EA02 - Proporre e incassare il servizio al momento del contratto

**Fonte 00:13-00:25, 01:47-02:14. Precisazione.** La card viene proposta in
agenzia insieme alla pratica, con una quota aggiuntiva rispetto a mediazione
e altri costi. Il precedente invito assistito diventa un preciso punto di
distribuzione commerciale. **Da decidere:** quota, volontarietà, unità, durata,
inclusioni, soggetto venditore e pagamento. Non è stabilito che ogni contratto
imponga automaticamente l'acquisto di EECard.

#### EA03 - Alimentare il fascicolo con i dati già raccolti dall'agenzia

**Fonte 02:14-02:28, 03:16-04:52. Precisazione.** Al contratto l'agenzia possiede
già persone, immobile e documenti: questi diventano il punto di partenza del
fascicolo. **Proposta dell'analisi:** un'attivazione assistita con controllo dei
dati, collegamento alle parti e inviti personali, evitando il reinserimento.
Importazione dal gestionale e modalità di acquisizione non sono ancora scelte;
non emerge un'API già disponibile presso il software dell'agenzia.

#### EA04 - Un fascicolo coerente per agenzia, proprietario e inquilino

**Fonte 03:48-05:04. Precisazione.** Si citano contratto, APE, documenti delle
parti, utenze/bollette, visure o documenti amministrativi, ricevute e deposito;
nell'esempio le copie sono distribuite ai tre soggetti. **Da progettare:** un
fascicolo comune con viste e consegne pertinenti. Tre destinatari non richiedono
tre archivi scollegati. I nomi esatti delle visure sono poco chiari; la lista
non va adottata come elenco legale universale di documenti obbligatori.

#### EA05 - Differenziare l'offerta proprietario e inquilino

**Fonte 00:54-01:22, 05:07-05:48. Ripresa/precisazione.** Due profili sono già
previsti; la card del proprietario è descritta come più ricca e più costosa.
L'espressione riconosciuta come "stile admin" non definisce privilegi software.
**Da decidere:** benefici, prezzi e varianti, mantenendo separati pacchetto
commerciale e permessi. Un proprietario non diventa amministratore dell'agenzia
né può leggere tutti i clienti per il solo possesso della card superiore.

#### EA06 - Consegnare cartellina e card fisica riconoscibili

**Fonte 02:04-02:14, 05:07-05:35. Precisazione.** Si immagina una cartellina
dedicata e un colore diverso per il proprietario; il rosso è un esempio.
**Da progettare:** confezione, supporto, destinatario e consegna al banco.
La variante fisica non cambia automaticamente la palette approvata dell'app.
Va conciliata la consegna in agenzia con la successiva proposta di card fisica
facoltativa e spedita a pagamento per chi si registra online.

#### EA07 - Distinguere quota del servizio e somme della locazione

**Fonte 04:36-04:46, 05:44-06:14. Ripresa/precisazione.** Ricevute, deposito
tra le parti e quota gestita dall'agenzia compaiono nello stesso episodio, ma
sono trattati separatamente. **Proposta dell'analisi:** importi e attestazioni
con causale, soggetto e finalità distinti. L'esempio del deposito di due mesi
non è una regola da fissare per tutti i contratti. Nessun flusso di incasso
intermediato del canone è approvato dalla conversazione.

### B. Banco dell'agenzia, lettore e terminale

#### EA08 - Ritrovare il cliente anche dopo mesi e con personale diverso

**Fonte 07:34-08:11, 08:29-09:19. Precisazione.** Il caso concreto è una persona
che torna dopo circa un anno e mezzo per la registrazione del vecchio contratto:
la nuova segreteria deve trovarla senza dipendere dalla memoria del fondatore.
**Da progettare:** ricerca e riepilogo del fascicolo per operatori autorizzati.
Il beneficio da validare è continuità e tempo risparmiato; non una gestione
umana illimitata o gratuita dell'immobile.

#### EA09 - Aprire il fascicolo dal lettore di card in agenzia

**Fonte 06:16-06:36, 08:29-09:33, 10:54-11:16. Precisazione.** Il lettore non è
solo un'idea per totem futuri: serve al banco per richiamare la pagina del
cliente e lavorare sulla pratica. **Proposta dell'analisi:** la card identifica
il contesto, mentre l'operatore usa il proprio account e i permessi pertinenti.
Dispositivo, protocollo, gestione di card revocate e alternativa alla card
devono essere definiti prima di scegliere l'hardware.

#### EA10 - Un terminale piccolo e riconoscibile, prototipabile in 3D

**Fonte 06:56-07:16, 09:16-09:33, 10:38-10:59. Nuova forma d'uso.** È proposto
un supporto da banco, ispirato a un dispositivo POS, con computer/schermo e
lettore integrato; la struttura potrebbe essere stampata in 3D e marchiata.
È descritto come mini totem e passaggio verso il canale fisico. **Da decidere:**
scopo, ingombro, collocazione, componenti e costo. Questa stampa 3D riguarda
il supporto hardware, non la rappresentazione tridimensionale dell'immobile.

#### EA11 - Due schermi e un riepilogo visibile durante il servizio

**Fonte 07:01-07:16, 10:38-11:26. Nuova.** La struttura ha uno schermo operativo
e un secondo schermo che mostra riepilogo e file consultati, per rendere il
servizio comprensibile alla persona al banco. L'esempio cambia il riferimento
fra segreteria e cliente: **i destinatari esatti delle due viste restano aperti**.
Proposta dell'analisi: condividere una vista apposita con soli dati pertinenti,
separata da note interne, code generali e altre pratiche dell'operatore.

#### EA12 - Usare lo schermo anche per la firma con penna

**Fonte 11:26-11:44. Nuova funzione proposta.** Lo schermo è immaginato come
interattivo, con una penna per firmare. **Da definire:** documenti interessati,
identificazione, processo, conservazione e tipo di firma richiesto, con la
verifica professionale pertinente. Una semplice superficie per disegnare la
firma non è una specifica completa del servizio. Nessun fornitore di firma
o valore del documento è stato scelto.

### C. Card, contactless, wallet e registrazione online

#### EA13 - Preferire il gesto di appoggio alla sola inserzione

**Fonte 12:08-12:40. Precisazione più forte.** Si parla di chip e contactless,
con card appoggiata al lettore sia al banco sia nei totem. È esplicitato che
la card non serve a pagare. **Da progettare:** esperienza comune fra supporto
fisico e telefono, identificazione, revoca e autorizzazione. Il termine chip
non seleziona uno standard, un chip sicuro o un produttore; l'obiettivo di
esperienza non prova la compatibilità di qualunque lettore NFC.

#### EA14 - Rendere la card disponibile in Apple Wallet e Google Wallet

**Fonte 12:40-13:11. Nuova specificazione.** La card digitale è pensata sul
telefono, richiamabile rapidamente e usabile al lettore; nell'audio vengono
usati i nomi Apple Pay/Google Pay. **Proposta dell'analisi:** progettare un
pass di adesione nei wallet, distinto dai pagamenti. Separare due risultati:
salvare/mostrare il pass e presentarlo via NFC al lettore. Il secondo richiede
le verifiche di piattaforma e terminale indicate nella sezione 6.

#### EA15 - Registrazione online, digitale subito, fisica a pagamento

**Fonte 12:45-13:18. Precisazione commerciale.** Anche chi non passa dall'agenzia
può registrarsi online, ottenere la card digitale e richiedere la fisica
spedita con un costo aggiuntivo. **Da decidere:** a quale agenzia si collega,
come si verifica il rapporto con l'immobile e quando si abilita il fascicolo.
L'immediatezza della card digitale non autorizza a esporre documenti prima
dei controlli. Prezzo, spedizione e ordine effettivo non sono definiti.

### D. Altre agenzie e modello commerciale

#### EA16 - Vendere il sistema come servizio ad altre agenzie

**Fonte 13:18-14:21, 15:51-16:14. Precisazione della visione SaaS.** L'agenzia
iniziale usa il proprio servizio; altre realtà, anche in zone non gestite,
possono comprare struttura e funzionamento già pronti. La compatibilità con
altre agenzie era prevista; qui diventa una proposta commerciale esplicita.
**Da progettare:** offerta B2B, autonomia operativa, dati separati, assistenza
e responsabilità. Ordine di lancio locale/B2B non viene concordato.

#### EA17 - Card dei partner personalizzate con marchio del sistema visibile

**Fonte 13:22-13:51, 16:05-16:25. Nuova precisazione di identità.** Ogni partner
ha la propria card e il proprio stile, mantenendo il brand del sistema da un
lato. Questo indica una possibile personalizzazione con due marchi, non una
rinuncia al marchio autonomo già scelto. **Da decidere:** emittente, marchi,
varianti, diritti d'uso e utilizzo presso sedi diverse. EECard e Jarvis non
diventano nomi definitivi; il simbolo Legame non è riaperto da questa analisi.

#### EA18 - Separare prezzo della personalizzazione e valore del servizio

**Fonte 16:05-16:48, 17:28-18:44. Nuova proposta economica.** Si discute un
prezzo personalizzato e un compenso per il design; il dialogo non converge
sull'eventuale costo per ogni card. Il valore viene confrontato anche con il
tempo che l'agenzia impiegherebbe a costruire il sistema da sola. **Da decidere:**
attivazione/design, software ricorrente, supporto, card e hardware. I "dieci
giorni" sono un esempio di confronto, non una stima di sviluppo EECard.

#### EA19 - Offrire qualcosa di pronto e trasformare altri operatori in partner

**Fonte 13:57-14:17, 17:28-18:44, 19:19-20:14. Precisazione strategica.** Emerge
l'intenzione di vendere un processo già utilizzabile, riducendo lo sforzo
tecnico del partner e favorendo collaborazione anziché semplice imitazione.
**Interpretazione:** facilità di attivazione e valore dimostrato contano nella
proposta B2B. Le affermazioni sulla domanda e sui comportamenti delle agenzie
sono opinioni del dialogo: vanno validate, non usate come vendite previste.

### E. Vita della casa, bollette e domotica

#### EA20 - Funzioni domestiche anche per il proprietario

**Fonte 14:23-14:43, 15:21-15:35, 20:20-20:26. Precisazione con impatto sul codice.**
Il proprietario deve poter usare almeno le funzioni domestiche dell'inquilino
per la casa in cui vive, oltre a gestire gli immobili locati. Si menzionano viste
selezionabili. La demo attuale limita Utenze al ruolo inquilino: va progettata
una capacità legata a casa/intestazione e non alla sola etichetta globale.
Una persona unica può avere più contesti; restano aperti diritti commerciali
e criteri di selezione, senza duplicare automaticamente gli account.

#### EA21 - Bollette: QR e importo subito, dettagli da esplorare

**Fonte 14:43-15:21. Nuova proposta UX.** Aprendo la fornitura, la parte essenziale
è il QR della bolletta con importo; chi vuole approfondire legge consumi e
specifiche. **Proposta dell'analisi:** un riepilogo con identificativo del
creditore, scadenza, stato e azione pertinente; poi dettagli progressivi.
Mostrare un QR non esegue né verifica un pagamento. Tipi di avviso, fonti,
scansione e azione dallo stesso telefono richiedono un percorso concreto.

#### EA22 - Le bollette dell'inquilino restano private

**Fonte 15:21-15:35. Ripresa esplicita.** Le funzioni domestiche del proprietario
non includono le bollette personali del proprio inquilino. È coerente con la
regola già registrata. **Da conservare:** intestatario, periodo, immobile e
delega definiscono l'accesso; il piano più ricco non amplia automaticamente
la visibilità sui documenti altrui. Cambio occupante e cambio intestazione
restano eventi da gestire separatamente.

#### EA23 - Collegare domotica e applicazione

**Fonte 15:35-15:50. Nuova, esplorativa.** È proposta l'adozione di domotica in
casa con collegamento all'applicazione, vicino al tema delle bollette.
**Da chiarire:** visualizzazione di consumi/stato, controllo dispositivi o
entrambi; tecnologie, partner, chi autorizza e costo. Non viene selezionato
uno standard né un dispositivo. Proposta dell'analisi: partire dal caso d'uso
utile e dai permessi fra occupante, proprietario e agenzia, poi valutare l'integrazione.

### F. Fascicolo completo e storia dell'immobile

#### EA24 - Rendere il fascicolo utile anche alla compravendita

**Fonte 20:28-22:11, 22:19-22:57. Ripresa con catalogo più concreto.** Si citano
relazione tecnica, confronti con gli archivi comunali, abitabilità/agibilità,
condoni e permessi edilizi. È un ampliamento della lista documentale e della
memoria della casa, già prevista nello studio. **Da progettare:** categorie,
provenienza, anno, versioni e stato. Il racconto locale di attese 30/60 giorni
non è una regola generale né prova di accesso automatico ai sistemi comunali.

#### EA25 - Ritrovare rapidamente anche un documento storico

**Fonte 22:23-22:37. Precisazione.** L'esempio è cercare una parte del nome e
trovare un documento di abitabilità con un anno storico. La demo cerca già
nel titolo, ma non ha un archivio reale o ricerca per contenuto/anno.
**Proposta dell'analisi:** metadati coerenti, ricerca per titolo/tipo e filtri
temporali; valutare OCR e ricerca nel contenuto solo dopo aver chiarito i file
del pilota. Il 1980 citato è un esempio, non un requisito o un dato da importare.

#### EA26 - Una cronologia dei lavori del proprietario

**Fonte 23:01-23:16. Precisazione di un tema già presente nello studio.** Il
proprietario deve vedere quali lavori sono stati eseguiti nel tempo, con anni
e riferimenti. **Da progettare:** interventi conclusi, date, esecutori e documenti
collegati, distinguendo fatto documentato, dichiarazione e lavoro pianificato.
La timeline delle richieste di assistenza della demo non copre già tutta la
storia tecnica dell'immobile o interventi svolti prima di EECard.

### G. Clienti esistenti, AI e nuovo spunto visivo

#### EA27 - Convertire anche clienti già gestiti e paganti annualmente

**Fonte 23:38-24:18. Nuova precisazione di distribuzione.** Viene descritto un
gruppo di clienti già gestiti; per alcuni è riconoscibile un pagamento attuale
di 600 euro l'anno. Non è indicato come listino EECard. Si ragiona sul presentar
loro il nuovo servizio e sull'inflazione; il passaggio relativo all'aumento è
meno stabile. **Interpretazione:** mostrare un beneficio concreto oltre alla
plastica della card. Segmento, servizio precedente e nuova quota vanno confermati.

#### EA28 - Assistente AI con contesto del cliente e del fascicolo

**Fonte 24:18-24:49, 25:16-25:27. Nuova estensione dell'AI.** Si immagina una
schermata personale e un assistente, chiamato colloquialmente Jarvis, che usa
i dati digitalizzati. La precedente AI era soprattutto segreteria fuori orario.
**Da definire:** compiti, fonti consentite, destinatario cliente/operatore,
azioni ammesse e relazione con un eventuale progetto Jarvis preesistente.
Il nome citato non approva il naming del prodotto o dell'assistente.

#### EA29 - Preparare nuovi contratti riutilizzando anagrafiche e dati

**Fonte 24:49-25:03. Nuova.** Un proprietario già presente e un nuovo inquilino
dovrebbero consentire una preparazione molto più rapida del contratto.
**Proposta dell'analisi:** selezione delle parti verificate, immobile, dati e
modello aggiornato; bozza attribuita e revisionabile; controllo umano prima
di approvazione, firma o invio. Template, campi, regole e soggetto responsabile
non sono specificati. Generare una bozza non equivale a stipulare il contratto.

#### EA30 - Una possibile direzione grafica più tecnologica, bianca e rossa

**Fonte 26:14-26:27. Nuovo spunto, in tensione con la 0.3.** Si richiede una
grafica molto tecnologica e si menzionano fondo bianco e rosso; la tonalità,
riconosciuta in modo incerto come porpora, va confermata. La direzione già
scelta dall'utente è bruno/albicocca/avorio con struttura editoriale.
**Proposta dell'analisi:** presentare una variante circoscritta e il confronto
con la versione corrente prima di cambiare l'identità. Nessun colore esatto,
nuovo simbolo o redesign globale è approvato dalla sola registrazione.

## 5. Decisioni aperte e punti da chiarire

| Tema | Cosa emerge | Cosa serve decidere |
| --- | --- | --- |
| Quote clienti | Proprietario più ricco/costoso; acquisto al contratto; nessun nuovo listino univoco | Unità, periodicità, IVA, inclusioni, volontarietà, più immobili/parti |
| Cifre nell'audio | A 23:17 circa, primo riconoscimento 65 euro e controlli 60-50 euro: dato instabile | Riascolto/conferma della cifra e del suo oggetto; non scegliere un numero per deduzione |
| Clienti esistenti | 600 euro annui riconoscibili per alcuni clienti già gestiti, non per EECard | Servizio coperto, unità, numerosità e proposta di migrazione; possibile aumento citato ma poco chiaro |
| Card fisica | Consegna con la pratica in agenzia; extra spedito per iscritti online | Inclusa o facoltativa per canale, emittente, costi, attivazione e sostituzione |
| Partner | Design personalizzato, brand del sistema presente, servizio pronto | Setup, licenza, card, supporto, hardware, diritti di marca e territorio |
| Due schermi | Vista operatore e riepilogo sull'altro lato | Chi vede cosa, nota interna vs dato condiviso, uso da parte del cliente |
| Firma | Penna e schermo interattivo | Quali atti, tipo di firma, identificazione, provider e conservazione |
| Wallet/contactless | Esperienza desiderata di avvicinamento | Pass, autorizzazioni e lettori compatibili; alternativa se un dispositivo non è supportato |
| Utenze proprie | Anche il proprietario gestisce la casa in cui vive | Modello di occupazione/intestazione, deleghe e diritti del pacchetto |
| Documenti tecnici | Più categorie e recupero storico | Chi li acquisisce, chi li aggiorna/verifica e cosa resta mancante |
| AI/Jarvis | Contesto personale e bozza contratti | Eventuale progetto esistente, compiti, dati, modelli, revisione e costi |
| Nuovo stile | Bianco e rosso, qualità tecnologica | Sostituzione, variante o stile del solo terminale/partner; tonalità e confronto |

I 50/15 euro delle fonti precedenti restano anch'essi senza unità/periodicità
confermate. I nuovi riferimenti economici non risolvono automaticamente quei
punti. Non risultano definiti budget, team, date, copertura, primo cliente pagante
o perimetro del primo rilascio. App negli store, pagamenti, 3D e AI non sono
automaticamente esclusi o rinviati.

## 6. Verifica tecnica mirata: wallet e lettori

**Fatti da fonti ufficiali consultate l'8 ottobre 2026.** Apple descrive pass di
adesione contactless e richiede un certificato NFC, terminali/lettori certificati
per VAS e software compatibile [W1]. Google Smart Tap richiede pass configurati
e terminali che supportino il protocollo, con la relativa integrazione [W2].

**Inferenza per EECard:** salvare una card digitale nel wallet e usarla sul
lettore sono due attività diverse. La seconda non si ottiene scegliendo un
generico lettore NFC. La stampa 3D del supporto non risolve la compatibilità
elettronica. Prima di un acquisto servono una prova con i dispositivi effettivi,
una scelta di credenziale e la verifica di emissione/lettura/revoca.

Non è stata eseguita una verifica di fornitore o un prototipo hardware; non
sono stimati costi dei programmi, approvazioni o disponibilità per EECard.
Un QR o un codice inseribile può essere un'alternativa da valutare, non un
rinvio già concordato del contactless. La tessera identifica la relazione;
autorizzazioni e accesso ai documenti devono restare nel sistema.

## 7. Impatto sulla progettazione funzionale e sui dati

Le strutture attuali dimostrano i percorsi, ma non sono sufficienti a rendere
operative le nuove idee. Questa mappa è una **proposta dell'analisi**, non uno
schema database approvato o una richiesta di cambiare subito lo stack.

| Ambito | Punto di partenza | Evoluzione da specificare | Idee |
| --- | --- | --- | --- |
| Identità e relazioni | Ruolo selezionato, fixture con più parti | Persona, agenzia, appartenenza, proprietà, occupazione, mandato e date | EA03, EA16, EA20, EA22 |
| Adesione e card | ID/blocco globali della demo | Adesione e diritti distinti da credenziali personali fisiche/digitali revocabili | EA01-EA02, EA05, EA13-EA15 |
| Banco e dispositivi | Nessun lettore o terminale | Sede, dispositivo registrato, sessione operatore, presentazione cliente e riepilogo condiviso | EA08-EA12 |
| Documenti | Metadati e solo nome del file | Archivio privato, versioni, origine, anno, categoria e condivisioni applicate | EA04, EA24-EA25 |
| Contratti | Copia demo e prova di un canone | Parti, periodo, modello/versione, bozza, revisioni, approvazione e firma | EA03, EA07, EA12, EA29 |
| Utenze | Due esempi per l'inquilino | Intestazione nel tempo, bolletta, identificativi, stato e percorso pagamento pertinente | EA20-EA22 |
| Storia tecnica | Ticket con eventi testuali | Lavoro/intervento con date, esecutore e documenti, anche precedente alla piattaforma | EA24, EA26 |
| Offerta partner | Una sola demo | Organizzazione separata, configurazione controllata, marca emittente, contratto B2B | EA16-EA19 |
| Domotica | Assente | Caso d'uso, dispositivi/autorizzazioni e integrazioni selezionate | EA23 |
| Assistente | Assente | Dati consentiti, fonti, bozza attribuita, controllo umano e registro delle azioni | EA28-EA29 |

Conservare anche le regole già valide: prova caricata, dichiarazione, verifica
dell'incasso e quietanza sono distinte; i parziali mantengono il residuo;
le bollette personali non diventano condivise per effetto del ruolo proprietario;
il tecnico vede solo l'incarico pertinente. I permessi del frontend non sono
autorizzazioni server.

## 8. Sequenza di lavoro proposta per la prossima sessione

| Passo | Risultato concreto | Dipendenze/criterio |
| --- | --- | --- |
| 1. Validare il nuovo brief | Risposte ai punti della sezione 5, con origine e stato | Distinguere una richiesta dei fondatori da un esempio o una proposta dell'analisi |
| 2. Separare le offerte | Schede cliente e agenzia: inclusioni, unità e responsabilità | Quote ancora aperte; identificare il beneficio per il primo pagante |
| 3. Specificare i percorsi prioritari | Attivazione al contratto, ritorno al banco, casa propria/locata, archivio e bozza contratto | Attori, dati, stati, errori e criteri osservabili; scelta del primo rilascio esplicita |
| 4. Provare wallet/lettore/firma | Matrice di compatibilità e prova limitata sui componenti scelti | Non acquistare sulla sola somiglianza con un POS; definire il valore della firma |
| 5. Confrontare lo spunto visivo | Esempio circoscritto bianco/rosso accanto alla 0.3 | Il risultato deve conservare flussi, simbolo e accessibilità; nuova direzione da scegliere |
| 6. Definire un primo percorso operativo | Specifica di dati, autorizzazioni, file e tracciabilità per il perimetro scelto | Architettura proporzionata, senza promuovere le fixture a modello di produzione |
| 7. Validare con l'agenzia | Casi reali pertinenti, tempo prima/dopo, comprensione e costo operativo | Separare dati/prove demo da servizio reale; misurare il valore e le risorse |

Questa sequenza non assegna date o responsabili e non mette automaticamente
domotica, AI, wallet, firma, app o totem fuori dal primo rilascio. Se una funzione
è indispensabile al beneficio scelto, il perimetro va adattato alle sue dipendenze.

### Domande prioritarie da portare nella nuova sessione

1. Vendiamo prima ai clienti dell'agenzia, alle altre agenzie o a entrambi?
   Qual è il beneficio indispensabile per il primo pagante?
2. Quanto costa ciascuna offerta, per quale unità e periodo, e cosa include?
   Come si collegano il servizio attuale da 600 euro annui e le cifre meno chiare?
3. Per il primo rilascio serve già il terminale, la lettura wallet e la firma,
   oppure quale combinazione mantiene davvero la promessa scelta?
4. Quali sono zona, portafoglio, budget, persone e responsabilità operative?
5. Il nuovo stile bianco/rosso sostituisce la 0.3 o riguarda una variante?
   Jarvis è un assistente già esistente da integrare o un nuovo modulo?

## 9. Materiale per riprendere e limiti della consegna

Per una nuova sessione usare il prompt in [PROMPT_NUOVA_SESSIONE.md](PROMPT_NUOVA_SESSIONE.md),
questo rapporto e [CONTESTO_REPOSITORY.md](CONTESTO_REPOSITORY.md). Il prompt
ordina la lettura della repository aggiornata e richiede uno studio incrementale,
non un nuovo progetto da zero. La trascrizione automatica è un supporto per
ritrovare i passaggi: per cifre, parole ambigue o dettagli controversi prevalgono
il riascolto e una conferma dei fondatori.

Questa consegna riguarda analisi e documentazione. Non sono stati modificati
frontend, dati demo, marchio, servizi o anteprime. Non sono stati eseguiti nuovi
test UI, prove fisiche, integrazioni wallet/firma o deploy. I rapporti precedenti
restano evidenze datate, non controlli ripetuti in questa sessione.

### Riferimenti

- [R1] Repository e commit analizzato:
  https://github.com/av3rgfx/EECard/tree/4b77c0bd41d733c7a7680ad3d63d9a496424db64
- [R2] Stato remoto della PR #4: https://github.com/av3rgfx/EECard/pull/4
- [R3] Studio precedente: `docs/progetto/EECard-studio-v0.1.pdf` e relativa copia DOCX.
- [R4] Documenti e sorgenti letti: elenco completo in `CONTESTO_REPOSITORY.md`.
- [A1] File audio allegato `EECARD-audio.m4a`, SHA-256:
  `67690f38e60114242d14280dfb9e80813558da22e30605b56b1cb59bac3b0d77`.
- [A2] Trascrizione integrale automatica: Whisper large-v3-turbo in locale;
  controlli Whisper medium su 05:07-06:15, 10:38-12:42, 16:00-16:49,
  22:54-25:06 e 26:10-26:32; ulteriori brevi controlli turbo su cifre e colore.
- [W1] Apple, pass di adesione e requisiti contactless:
  https://developer.apple.com/wallet/loyalty-passes/
- [W2] Google, Smart Tap e terminali compatibili:
  https://developers.google.com/wallet/smart-tap/introduction/overview

Lo studio v0.1 rimane intatto. Questa versione integra la nuova conversazione;
non convalida automaticamente le precedenti ipotesi economiche, normative o
tecniche e non ripete la ricerca di mercato del documento precedente.
