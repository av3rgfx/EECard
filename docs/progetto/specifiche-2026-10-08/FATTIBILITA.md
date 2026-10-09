# Fattibilità mirata e prove da eseguire

Verifica documentale: **8 ottobre 2026**. Collega EA08–EA14, EA16–EA17,
EA22, EA25, EA28–EA29 del [catalogo della conversazione](../discussione-2026-10-07/ANALISI_CONVERSAZIONE.md).
Questo documento prepara scelte e collaudi; non approva fornitori, acquisti,
account di produzione o inclusioni nel rilascio.

**Esito:** pass nei wallet, recupero al banco, viste su due schermi e ricerca
assistita hanno basi tecniche documentate. La lettura contactless richiede una
catena specifica di pass, configurazione, lettore e software. Una penna sullo
schermo non determina il livello della firma. Non è stata provata nessuna di
queste integrazioni in EECard.

Le etichette usate sotto distinguono **documentato** nelle fonti lette,
**proposta/deduzione** applicata a EECard e **da provare** su un sistema reale.
Tutte le soglie di collaudo sono proposte iniziali, non risultati già ottenuti.

## 1. Base esistente e dipendenza comune

Lo [studio v0.1](../EECard-studio-v0.1.pdf), sezioni 6.3, 8 e 11, prevedeva già
identificativo indipendente dal supporto, operatore autenticato, revoca server,
QR alternativo e sessioni brevi. La nuova discussione precisa wallet e banco;
EA28–EA29 estendono l'AI oltre la precedente segreteria fuori orario.

Nei sorgenti letti, `DigitalCard`/`CardPage` in [pages.tsx](../../../src/pages.tsx)
mostrano una tessera demo; [panels.tsx](../../../src/panels.tsx) blocca e sostituisce
un ID nello stato locale; [data.ts](../../../src/data.ts) conserva `cardId` e
`revokedCards` globali. `FileInput` in [ui.tsx](../../../src/components/ui.tsx)
conserva il solo nome. Non esistono pass emessi, lettori, file server, firma o AI.

**Proposta comune:** identità, credenziali, rapporti e autorizzazioni vengono
verificati dal server per ogni richiesta. Il tap restituisce un identificativo
opaco di credenziale e consente al solo operatore autenticato una ricerca
pertinente. Non autentica il cliente, non concede deleghe, non firma, non paga
e non apre automaticamente file o bollette. Il piano commerciale non modifica
questo confine. Il backend applica anche agenzia, rapporto, periodo e revoca.

Le prove sotto usano persone e fascicoli sintetici. Dati di bolletta, contratti,
documenti d'identità o note interne non entrano nel pass, nel tag o nei log del
lettore. La sostituzione genera una credenziale diversa; il vecchio supporto
resta inutilizzabile anche quando mostra ancora una tessera apparentemente attiva.

## 2. Wallet, contactless e card fisica — EA09, EA13–EA14, EA17

| Risultato | Documentato | Conseguenza proposta per EECard | Ancora da provare/decidere |
| --- | --- | --- | --- |
| Pass visibile in Apple Wallet | Apple descrive pass di adesione, distribuzione e aggiornamenti [W1]; il formato pass prevede identificativi e firma con certificato [W2] | Supporto personale con dati minimi, identificativo opaco e collegamento al servizio autenticato | Account/certificati dell'emittente, distribuzione, aggiornamento e visualizzazione sui dispositivi scelti. Salvare il pass non dimostra il funzionamento NFC |
| Tap Apple Wallet | Apple richiede certificato NFC, terminali/lettori certificati VAS e software compatibile; documenta la modalità **VAS Only** e il riconoscimento separato dal pagamento [W1] | Percorso di riconoscimento senza pagamento; verificare l'intera configurazione col fornitore | Ammissibilità del programma EECard, certificato, modello/firmware del lettore, software e prova iPhone. Non basta la dicitura «NFC» o «accetta Apple Pay» |
| Tap Google Wallet | Smart Tap richiede pass configurati e terminale compatibile [W3]; classe con `enableSmartTap` e `redemptionIssuers`, oggetto con `smartTapRedemptionValue` [W4]; il terminale presenta un Collector ID collegato al Redemption Issuer [W5] | Valore trasmesso opaco, emittente e sedi espliciti; configurare solo gli emittenti autorizzati | Progetto issuer e configurazione merchant, chiavi, classe adatta, collegamento terminale/backend e prova Android. La presenza di un produttore nell'elenco non certifica qualsiasi suo dispositivo |
| Stesso banco per entrambi i wallet | Le fonti descrivono protocolli e configurazioni distinti | Richiedere evidenza per **entrambi** sulla stessa distinta componenti | Nessuna compatibilità combinata osservata; verificare modello, firmware, SDK, licenze, aggiornamenti e disponibilità nel territorio del pilota |
| Card fisica contactless | Nessun chip o protocollo è stato scelto nella fonte EA13 | Identificativo e revoca comuni a tutti i supporti; scegliere il supporto dopo il caso d'uso | Tecnologia, lettore e resistenza alla copia. Un tag URL/UID semplice è trattato come identificatore riproducibile, senza promesse di autenticazione crittografica |

**Revoca e indisponibilità, proposta:** il server è autorevole. Il pass può
essere ancora visibile sul telefono dopo il blocco; l'accesso viene negato
comunque. A banco disconnesso non si ricavano permessi da un pass memorizzato.
Con server disponibile, ricerca assistita con operatore autenticato e verifica
della persona, o QR, mantengono il percorso accessibile a chi non ha un telefono
compatibile. Se il server è irraggiungibile la consultazione privata resta sospesa.
Anche il QR è un identificatore, non una delega. Non si promette che NFC web,
tag fisico, Apple VAS e Google Smart Tap siano intercambiabili.

Per partner diversi separare marchi, emittenti e sedi abilitate (EA16–EA17):
il riconoscimento della credenziale in una sede non dà accesso ai fascicoli di
un'altra agenzia. Eventuale utilizzo fra sedi richiede rapporti e permessi
espliciti, oltre alla compatibilità del lettore.

## 3. Terminale a due schermi — EA08–EA12

**Documentato:** la specifica W3C Window Management descrive informazioni e
posizionamento su più schermi, con permesso `window-management`; la versione
consultata è un **Working Draft**, non una garanzia di supporto uniforme [T1].
Non è stata verificata una configurazione hardware o browser per EECard.

**Proposta:** definire prima due viste logiche, `operativa` e `condivisa`, poi
assegnarle ai destinatari chiariti dall'utente. Restano aperti chi guarda il
secondo schermo, chi può toccarlo e quali documenti debba poter leggere. Finché
manca questa risposta non si fissa disposizione fisica né si include la firma.

La vista condivisa riceve solo il riepilogo/file selezionato per quella
sessione e autorizzato al suo destinatario. Non duplica il desktop
dell'operatore: niente coda generale, ricerca anagrafica, notifiche, note
interne, altre schede del browser o credenziali operative. Associazione al
dispositivo gestito, durata e revoca sono server; «Termina incontro», cambio
cliente, logout e perdita di sessione la riportano allo stato neutro.
L'operatore vede quale contenuto sta condividendo e può interromperlo.

| Configurazione da confrontare | Beneficio | Prova decisiva |
| --- | --- | --- |
| Un computer con due display in modalità estesa e due viste dedicate | Postazione unica, cablaggio contenuto | Riavvio, disconnessione display, focus/touch e cambio risoluzione non spostano la vista operativa sul lato condiviso |
| Postazione operatore e secondo dispositivo gestito | Sessioni e superfici separate; possibile touch/penna dedicati | Associazione temporanea, autorizzazioni, latenza e disconnessione non lasciano aperto il fascicolo precedente |

La stampa 3D riguarda il supporto fisico (EA10): prima un banco di prova con
componenti standard, poi ingombri, ventilazione, cavi, leggibilità, uso seduto,
raggiungibilità e assistenza. Nessun acquisto, certificazione elettrica o
compatibilità della penna deriva dalla fattibilità della vista web.

## 4. Firma: documento e processo prima della penna — EA12, EA29

**Documentato:** eIDAS definisce firma elettronica, avanzata e qualificata
(art. 3). Non si possono negare effetti/prova alla firma per il solo fatto di
essere elettronica o non qualificata; la qualificata ha effetti equivalenti
alla firma autografa (art. 25). L'avanzata richiede collegamento univoco e
identificazione del firmatario, controllo dei dati di firma ed evidenza delle
modifiche successive (art. 26) [F1]. Il CAD art. 21 distingue inoltre forme
richieste per categorie di atti: il livello non si sceglie soltanto per
comodità d'interfaccia [F2].

| Livello/percorso | Cosa non si può dedurre dalla penna | Preparazione necessaria |
| --- | --- | --- |
| Firma elettronica, spesso detta semplice | Un tratto grafico non documenta da solo identità, volontà e integrità dell'atto; non è automaticamente equivalente all'autografa | Evidenza dell'atto e dell'accettazione, attribuzione e valutazione rispetto al documento specifico |
| Firma elettronica avanzata (FEA) | Non basta un canvas né la raccolta di pressione/velocità | Processo verificato rispetto ai requisiti e alle regole applicabili, identificazione, controllo, integrità ed evidenze; eventuale biometria solo se necessaria e adeguatamente disciplinata |
| Firma elettronica qualificata (FEQ) | Il dispositivo da banco non rende qualificata una firma | Certificato qualificato, dispositivo/processo idoneo e prestatore pertinente; verifica esito e documento risultante |

**Decisione ancora necessaria:** quali atti (adesione EECard, verbale, mandato,
contratto o altro), firmatari, livello richiesto, processo in presenza/remoto,
responsabile della verifica e conservazione. La pagina AgID individuata non
è stata leggibile in questa sessione (HTTP 403, [F3]); il quadro sopra poggia
sulle norme consultate, non su una presunta convalida AgID di EECard. Il
processo concreto e le regole tecniche applicabili vanno verificati prima
della scelta del fornitore.

**Proposta indipendente dal livello:** bozza revisionata → versione approvata
e resa immutabile → richiesta di firma → firma in corso → verifica dell'esito
→ documento firmato verificato/errore/rifiuto/scadenza. Collegare firmatari,
ordine quando necessario, hash/versione, identificativo del processo,
evidenze ed esito. Una modifica del testo invalida l'approvazione precedente
e richiede una nuova versione. Un semplice ritorno del browser non completa
la firma. La firma non esegue registrazioni contrattuali o incassi.

## 5. Assistente e bozze controllate — EA22, EA25, EA28–EA29

**Documentato:** esistono strumenti con ricerca semantica/testuale su file,
filtri di metadati e riferimenti ai file nella risposta [A1]. Questo rende
plausibile un assistente che recupera fonti del fascicolo; non certifica
correttezza, completezza o separazione dei dati. La documentazione del
fornitore distingue uso per addestramento, log e stato applicativo: per
l'API consultata niente addestramento salvo adesione esplicita, ma log
normalmente fino a 30 giorni con eccezioni e archivi persistenti fino a
cancellazione; Zero Data Retention richiede condizioni e non copre ogni
funzione, tra cui i vector store [A2]. Non è stato scelto quel fornitore.

**Proposta:** iniziare con ricerca/riepilogo per l'operatore e compilazione
di un modello contrattuale controllato. È un'ipotesi per limitare il primo
esperimento, non una decisione sul destinatario finale. Jarvis resta da
chiarire: progetto preesistente, nome esplorativo o nuovo modulo; nessuna
integrazione viene data per disponibile.

1. La richiesta esplicita agenzia, persona, immobile/contratto e scopo. Il
   server ricava le fonti consentite dall'utente autenticato; il modello
   non sceglie i propri permessi. Verifica prima del recupero e prima
   della consegna, anche se i permessi cambiano durante la generazione.
2. Gli indici conservano ID documento, versione, provenienza e riferimenti
   utili alla citazione. Revoca/cancellazione vale anche per OCR, frammenti,
   indici, cache e risposte salvate; un indice non ancora aggiornato non
   consente al server di restituire una fonte revocata.
3. Ogni affermazione documentale mostra fonte/versione e posizione quando
   disponibile. In mancanza di prova l'assistente segnala «non presente»;
   se due versioni confliggono, espone il conflitto. Un dato estratto da
   OCR resta distinto da un dato verificato dall'operatore.
4. Per la bozza si seleziona un template aggiornato con responsabile e
   versione. Anagrafiche, importi e date vengono dai dati verificati con
   mappatura campo/fonte. Nessuna cifra, parte, clausola necessaria o data
   mancante viene risolta per deduzione. I campi mancanti restano bloccanti
   per l'approvazione; suggerimenti testuali sono separati dai dati certi.
5. La bozza è marcata come tale, attribuita e revisionabile; il revisore
   controlla differenze, fonti e campi mancanti. AI e template non firmano,
   inviano, registrano contratti, verificano incassi o rilasciano quietanze.
   L'approvazione umana è uno stato applicativo, separato dalla firma.

Le bollette personali dell'inquilino restano escluse da richieste del
proprietario prive di delega, anche se la casa è la stessa. Nessuna risposta
può rivelare l'esistenza o il titolo di file non autorizzati. Un documento
caricato può contenere istruzioni malevole: i suoi contenuti restano fonti,
non comandi per cambiare permessi o attivare strumenti. La documentazione
primaria conferma il rischio di prompt injection ed esfiltrazione [A3];
la difesa concreta richiede autorizzazioni applicative e prove, non solo un
prompt. Il prototipo di prova non dispone di strumenti di invio o modifica.

Prima di dati reali: definire finalità, ruoli, accordi col fornitore,
localizzazione, conservazione/cancellazione anche dei derivati e accesso ai
log. Sono scelte richieste dal caso d'uso, coerenti con minimizzazione,
limitazione della conservazione e protezione fin dalla progettazione [P1].
Misurare anche costo per richiesta, indicizzazione, latenza e tempo di
revisione: l'esistenza dell'API non dimostra convenienza.

## 6. Registro delle prove — nessuna ancora eseguita

Prima di ogni prova registrare versione software, hardware/firmware quando
pertinente, dataset sintetico, attore e risultato atteso. Conservare rapporto
pass/fail e riproduzione degli errori. Le soglie sotto sono obiettivi proposti
per un esperimento limitato, non certificazioni o promesse commerciali.

| ID / EA | Prova e dipendenze | Criterio pass/fail proposto |
| --- | --- | --- |
| FT01 — EA09, EA13–EA14 | Pass visibile su almeno un iPhone e un Android dichiarati; emittente/certificati e ambiente di prova disponibili | Installazione, identificativo e aggiornamento corretti su entrambi; duplicato/sostituzione distinguibili. Solo questo risultato non supera FT02 |
| FT02 — EA09, EA13–EA14 | Lettura VAS Only e Smart Tap sul modello/firmware scelto; FT01, accordi/configurazioni e backend di prova | Almeno 19 letture corrette su 20 per ogni configurazione dichiarata, nessun fascicolo errato, nessuna richiesta di pagamento; fallback assistito riuscito. Se una piattaforma fallisce, compatibilità limitata e dichiarata |
| FT03 — EA09, EA13, EA16, EA22 | Revoca, ID copiato/vecchio, operatore disconnesso, agenzia diversa, rapporto scaduto, backend irraggiungibile; autorizzazioni reali di prova | Zero file/dati restituiti fuori permesso in tutti i casi. Credenziale revocata rifiutata dalla prima richiesta successiva alla revoca server; visualizzazione wallet obsoleta irrilevante. Qualsiasi fuga blocca la prova |
| FT04 — EA10–EA11 | Confronto dei due assetti di schermi; destinatari chiariti, viste e sessioni separate | Nei casi cambio cliente, logout, display staccato, riavvio e permesso browser negato non compare la vista operativa sul lato condiviso. Fine sessione svuota il contenuto; perdita di collegamento lo nasconde entro 5 secondi, soglia da convalidare |
| FT05 — EA10–EA12 | Banco con componenti standard e persone rappresentative; FT04, uso touch/penna deciso | Da seduti e in piedi si raggiungono azioni e si legge il documento; tastiera/zoom non bloccano il flusso; nessuna confusione fra conferma e firma. Ingombri, cablaggio e manutenzione documentati prima del supporto 3D |
| FT06 — EA12, EA29 | Processo di firma su atto sintetico; scelta documento/livello validata, provider di prova e revisore competenti | Versione firmata coincide con quella approvata; modifica successiva rilevabile; rifiuto, timeout, doppio callback e ripresa non producono un falso «firmato». Evidenze esportabili e verifica indipendente pertinente al livello scelto |
| FT07 — EA22, EA25, EA28 | Almeno 30 quesiti con risposte attese: fonti corrette/mancanti, OCR errato, versioni conflittuali, altra agenzia, bollette private, revoca in corso e istruzioni malevole | Zero divulgazioni o azioni non autorizzate; tutte le citazioni risolvono fonti consentite; almeno 90% risposte valutate corrette dal revisore. Un errore di accesso blocca sempre; risultati sotto soglia richiedono revisione prima del pilota |
| FT08 — EA29 | Dieci bozze sintetiche con template validato, campi completi/mancanti/conflittuali e nuova versione dati | 100% parti/importi/date ricondotti a dati verificati; nessun completamento inventato; ogni caso mancante resta non approvabile; modifica dati invalida l'approvazione. Confrontare tempo totale di preparazione **e revisione** con compilazione manuale |

**Sequenza proposta:** definire autorizzazioni e dati, validare FT03, poi
parallelizzare FT01–FT02, FT04–FT05 e FT07–FT08. FT06 dipende dalla scelta
degli atti e del livello; FT04 dalla risposta sui destinatari. La ricerca
assistita e un fascicolo accessibile senza lettore permettono di misurare
EA08 prima di impegnarsi sull'hardware. Se il gesto contactless è il
beneficio commerciale indispensabile, FT01–FT03 diventano condizione del
rilascio: il suo eventuale rinvio non è già approvato.

## 7. Fonti primarie e limiti della verifica

Consultate via HTTPS l'**8 ottobre 2026**, leggendo il contenuto delle pagine,
non soltanto il titolo. HTTP 200 salvo il limite AgID indicato. Il codice del
progetto e lo studio sono stati letti; non sono stati eseguiti collaudi
hardware, chiamate a API di prodotto, firme, caricamenti AI o test UI.

| ID | Fonte e fatto verificato |
| --- | --- |
| W1 | [Apple — Loyalty and membership passes](https://developer.apple.com/wallet/loyalty-passes/): distribuzione pass, certificato NFC, VAS, terminali e software, VAS Only e riconoscimento separato dal pagamento |
| W2 | [Apple — Pass Design and Creation, archivio](https://developer.apple.com/library/archive/documentation/UserExperience/Conceptual/PassKit_PG/Creating.html): struttura, identificativi e firma del pass. Fonte tecnica archiviata; non prova da sola requisiti correnti di abilitazione commerciale |
| W3 | [Google — Smart Tap overview](https://developers.google.com/wallet/smart-tap/introduction/overview): pass, terminali compatibili e trasmissione al sistema |
| W4 | [Google — Pass configuration](https://developers.google.com/wallet/smart-tap/introduction/pass-configuration): campi di classe e oggetto, prerequisiti issuer/merchant |
| W5 | [Google — Communication flow](https://developers.google.com/wallet/smart-tap/introduction/communication-flow): Collector ID, Redemption Issuer e corrispondenza dei pass |
| T1 | [W3C — Window Management](https://www.w3.org/TR/window-management/): Working Draft dell'8 settembre 2026, permessi, API e cambi dei display; nessun collaudo di compatibilità |
| F1 | [EUR-Lex — eIDAS, testo consolidato al 18 ottobre 2024](https://eur-lex.europa.eu/legal-content/IT/TXT/?uri=CELEX:02014R0910-20241018): art. 3, 25–26. Quadro dei livelli; non valutazione dell'idoneità di un atto EECard |
| F2 | [Normattiva — CAD, art. 21](https://www.normattiva.it/uri-res/N2Ls?urn:nir:stato:decreto.legislativo:2005-03-07;82~art21): forme differenziate per categorie di atti. L'interfaccia riportava ultimo aggiornamento dell'atto 20 aprile 2026 |
| F3 | [AgID — Firma elettronica qualificata](https://www.agid.gov.it/it/piattaforme/firma-elettronica-qualificata): accesso HTTP 403; **contenuto non verificato**, da recuperare insieme alle regole tecniche applicabili nella scelta del processo |
| A1 | [OpenAI — File search](https://developers.openai.com/api/docs/guides/tools-file-search): ricerca semantica/testuale, filtri e citazioni. Esempio di capacità disponibile, non scelta del provider |
| A2 | [OpenAI — Data controls](https://developers.openai.com/api/docs/guides/your-data): addestramento, log, persistenza e limiti ZDR distinti; nessuna configurazione EECard verificata |
| A3 | [OpenAI — Safety in building agents](https://developers.openai.com/api/docs/guides/agent-builder-safety): rischi di istruzioni da fonti non fidate e perdita di dati. Usata per il rischio, senza raccomandare Agent Builder o altro prodotto |
| P1 | [EUR-Lex — GDPR](https://eur-lex.europa.eu/legal-content/IT/TXT/?uri=CELEX:32016R0679): artt. 5 e 25, minimizzazione, conservazione e protezione dei dati fin dalla progettazione |

La documentazione attesta capacità e requisiti generali. Ammissione ai programmi,
costi/licenze, supporto in Italia, configurazioni, affidabilità con i dati del
pilota e adeguatezza del processo di firma restano da dimostrare. Le prove
proposte non sostituiscono accordi operativi o la verifica degli atti scelti.
