# Studio progettuale incrementale

15 ottobre 2026. Proposta per evolvere la demo 0.5, non specifica commerciale o
architettura operativa approvata. Provenienza e natura di ciascun input sono
nell'[analisi](ANALISI.md); la conferma dell'utente sui report è distinta dalle
proposte degli audio. Conservare EA/RF/PF e gli studi precedenti, senza rinumerarli.

## Problemi, persone e organizzazione dell'esperienza

Il cliente deve capire cosa riceve, cosa costa, quando finisce e come uscire;
ritrovare avvisi/documenti senza reinserimenti; leggere la storia della casa e
delle spese senza scambiare dati incompleti per totali certificati. L'agenzia
ha un problema diverso: preparare e seguire pratiche, erogare servizi con
responsabilità chiare, verificare qualità e sostenibilità del lavoro.

La 0.5 già separa i due spazi. Conservare tessera dominante e azioni vicine,
contenuti aperti, dettagli progressivi, C–Legame, Manrope e Materia/Editoriale.
Nessun nuovo nome, oro decorativo o redesign globale deriva dai nomi dei livelli.

| Area proposta | Spazio cliente | Spazio agenzia |
| --- | --- | --- |
| Abbonamento e servizi | Stato, periodo, inclusioni, extra, rinnovo e uscita | Catalogo/versioni, adesioni nel mandato, richieste e capacità di erogazione |
| Utenze | Casa/intestazione, avvisi, acquisizione controllata, canale pertinente | Solo assistenza delegata e coda dei casi da verificare; nessun accesso generalizzato |
| Report annuale | Situazione della persona per case consentite, fonti e lacune | Attività e dati gestionali autorizzati della propria agenzia, con aggregazioni pertinenti |
| Fascicolo e assistenza | Documenti, cronologia e prossima azione | Ricerca, revisioni, responsabili, eventi e attività pendenti |

Le aree nuove non devono diventare tre dashboard concorrenti. Home mantiene
una prossima azione; servizi e report si aprono da voci esplicite. Importi e
scadenze restano immediati; tecnicismi, prove e impostazioni di scenario restano
negli strumenti della demo.

## Abbonamento, livelli ed extra

Proposta: catalogo versionato di capacità, separato da `Grant` e credenziale.
Un pacchetto più ricco abilita servizi commerciali, mai i dati di altre persone.
Nomi Silver/Gold/Platino sono esempi da uniformare, non un listino approvato.
Proprietario/inquilino indica un rapporto; livello indica un'offerta: non creare
un «ruolo Gold» né due account per chi occupa e possiede case differenti.

Confrontare le alternative:

| Opzione | Vantaggio | Rischio e scelta proposta |
| --- | --- | --- |
| Pacchetti progressivi | Confronto sintetico e offerta riconoscibile | Inclusioni confuse se crescono troppo: limitarle a differenze reali e verificabili |
| Base più extra singoli | L'utente compra ciò che gli serve | Molte microdecisioni e condizioni; extra devono mostrare prezzo completo e responsabile |
| Pacchetti più extra | Copre bisogni ricorrenti e occasionali | Più complesso da mantenere: candidato da validare con catalogo ridotto, nessun acquisto demo |

Prima dell'acquisto: unità (persona/casa/agenzia), beneficiari, prezzo/valuta/IVA,
periodo, inclusioni/esclusioni, limiti, disponibilità territoriale, rinnovo,
assistenza, condizioni di uscita e versione dell'offerta. In loro assenza mostrare
«da definire» nello studio, non inventare prezzi e non presentare un checkout.
Servizi professionali: ricezione richiesta, preventivo, approvazione, incarico,
esecuzione e riscontro sono distinti. Non promettere interventi illimitati.

**Cambio livello:** confronto corrente/proposto, capacità aggiunte o perse,
data di efficacia e preventivo esplicito prima della conferma. Il dialogo propone
un conguaglio, ma mescola mesi e frazioni: non implementare una formula da quella
frase. Decidere pro rata giornaliero/mensile, ancoraggio del periodo, arrotondamenti,
IVA, downgrade, rimborsi/crediti, extra già avviati e rinnovo disattivato. Conservare
preventivo/versione fino alla conferma; se cambiano condizioni, riconfermare.
Pagamento fallito non abilita il nuovo livello; esito ignoto resta in attesa.

## Disdetta semplice e comprensibile

Distinguere **disattivare il prossimo rinnovo**, **cessare immediatamente il
servizio**, **recesso/rimborso**, **chiudere l'account**, **bloccare la tessera**
e **terminare la locazione**. Non usarli come etichette intercambiabili.

Percorso proposto: «Gestisci abbonamento» → periodo e stato → «Disattiva rinnovo»
→ riepilogo conseguenze e data → conferma → riscontro conservato. Nessun motivo
obbligatorio, telefonata o passaggio commerciale che ostacoli la disdetta.
La proposta dell'audio mantiene il periodo già pagato e ferma il rinnovo;
regole di recesso, rimborso e condizioni legali restano da definire a parte.
Il successivo passaggio sul preavviso contraddice il primo: non viene adottato.
L’appunto corrente sostiene la facilità di disdetta; la demo prova quella UX
senza trasformarla in condizioni commerciali definitive.

Stati logici separati: adesione proposta/attiva/sospesa/terminata; rinnovo
attivo/disattivato; richiesta inviata/acquisita/fallita; periodo pagato con
inizio incluso e fine esclusa. Mostrare «disdetta acquisita» solo dopo
persistenza riuscita. In assenza di salvataggio, indicare l'errore e consentire
retry senza duplicare l'evento. Nessuna fee o data è dedotta dalla card.

L'uscita non cancella contratto, dovuti, dichiarazioni, quietanze o titoli
autonomi. I documenti conservati non implicano accesso perpetuo. Alla data di
fine, rivalutare i diritti commerciali separatamente dagli altri titoli;
politica di consultazione, esportazione e conservazione da approvare per
categoria. Riferimento: `validazione-bf16-2026-10-09/STORICO_USCITA.md`.

Primo intervento candidato: simulare solo la disattivazione del rinnovo nel
profilo del cliente demo, con una data di fine esplicitamente sintetica, annullo
prima della conferma e ripristino dallo strumento scenario. Non creare acquisti,
richieste al fornitore o un motore di addebito. Condizioni del prodotto restano
aperte; la simulazione non deve chiamare `endRelation`, revocare card o titoli.

## Report annuali: due viste confermate dall'utente

La risposta nella sessione conferma **entrambi, con viste separate**. Non è ancora
definito il contenuto finale né se «anno» significa solare, contrattuale o periodo
personalizzato. Proposta iniziale: anno solare selezionabile, con periodo di
copertura effettivo sempre visibile e indicatore «dati parziali» quando necessario.
Non generare ora un report reale da fixture che coprono soltanto pochi eventi.

| Aspetto | Report cliente | Report agenzia |
| --- | --- | --- |
| Domanda | Cosa è successo nelle mie case e cosa manca? | Quale lavoro è stato gestito e dove si accumulano problemi? |
| Sezioni candidate | Immobili/rapporti, documenti e scadenze, lavori documentati/dichiarati, spese e pagamenti distinti, attività aperte | Pratiche e stato, richieste ricevute/concluse, documenti mancanti, adesioni/rinnovi, qualità dei dati e capacità operativa |
| Denaro | Dovuti, dichiarato, verificato, residuo, evidenze e quietanze su righe distinte | Quote proprie e movimenti gestiti distinti; canoni dei clienti non sono ricavi EECard |
| Fonti | Ogni importo/evento rimanda a oggetto/versione e data | Denominatore, filtri, definizione metrica, fonte e ultimo aggiornamento |
| Accessi | Solo oggetti autorizzati: bollette dell'inquilino assenti dal report del proprietario senza delega | Agenzia/mandato/scopo; aggregare non autorizza automaticamente dati privati |
| Output | Vista leggibile/stampabile e, successivamente, esportazione esplicita | Vista gestionale separata, export distinto e accesso per funzione |

Non chiamare il report bilancio, dichiarazione fiscale, certificazione o misura
di risparmio. Non sommare dichiarato e verificato dello stesso movimento.
Importi in centesimi/valuta e allocazioni al dovuto; evitare duplicati e gestire
storni/rettifiche. Un dato mancante non vale zero; zero richiede copertura completa.
I tassi richiedono numeratore, denominatore e periodo comparabili. Nessun grafico
di crescita o beneficio se manca un confronto osservato.

Percorso: scegli report personale/agenzia → anno e contesto → riepilogo, copertura
e attività da completare → dettaglio delle fonti → export se autorizzato.
Stati: nessun periodo disponibile, parziale, pronto, in aggiornamento, errore,
permesso revocato. Filtri e snapshot dichiarati; nuove rettifiche producono una
versione successiva. Ricontrollare autorizzazioni prima di esportare. Una copia
già scaricata non può essere revocata dal dispositivo del destinatario.

## Bollette: flusso completo proposto

Lo [studio di fattibilità](FATTIBILITA_BOLLETTE.md) distingue acquisizione,
avviso e pagamento, alternative e prove PB01–PB05. Nella 0.5 esistono due
facsimili con importo e QR non pagabile; mancano importazione, OCR, stato
strutturato del dovuto e integrazione. I riepiloghi UI sono in parte codificati
per casa: prima di aggiungere bollette vanno derivati dall'oggetto/versione.

«Aggiungi bolletta» deve iniziare dalla casa e dall'intestazione autorizzate;
proporre riconoscimento senza accettare automaticamente i campi. Conferma dati,
originale e possibili duplicati precedono il salvataggio. Un file illeggibile
resta un errore recuperabile, non una bolletta pronta da pagare. Dettaglio con
creditore/importo/scadenza, stato noto o ignoto, fonte e azione pertinente.

«Mostra avviso» serve al canale fisico; sullo stesso telefono servono codice
copiabile e canale ufficiale verificato. L'esito esterno non è deducibile dalla
chiusura della pagina, dal click o dall'immagine del QR. Un'eventuale ricevuta
del gestore non va rietichettata quietanza emessa dall'agenzia.

## Promemoria e chiamate AI: ramo distinto

NA14 propone un agente che chiami l'inquilino dopo la scadenza. È un nuovo
caso rispetto alla ricerca/bozza assistita di RF28/RF29. Non basta collegare
un modello vocale: servono stato del dovuto affidabile, titolo del mittente,
recapito verificato, preferenze del destinatario, canali/orari/frequenze,
contenuto approvato, gestione di risposte ed escalation, ruoli e conservazione.
La disponibilità legale del canale e gli obblighi informativi vanno verificati
per questo caso prima di una futura attivazione. Nessuna chiamata qui.

Proposta: stesso motore di promemoria deterministico per messaggio, notifica o
voce; AI solo eventuale interfaccia, non fonte dello stato economico. Nel
prototipo mostrare al cliente e all'operatore l'anteprima del testo e il motivo
per cui sarebbe eleggibile o sospeso, senza invii né numeri reali.

| Situazione | Comportamento proposto |
| --- | --- |
| Dovuto scaduto, fonte affidabile, canale abilitato | Preparare promemoria neutro con importo/periodo e possibilità di segnalare errore; conferma prima dell'eventuale invio operativo |
| Pagamento dichiarato, incasso in verifica o esito ignoto | Sospendere l'automatismo e chiedere verifica; non accusare il destinatario di insolvenza |
| Contestazione, rapporto/delega cessati, recapito incerto | Nessun contatto; revisione del caso e aggiornamento dei dati autorizzati |
| Nessuna risposta o rifiuto del canale | Nessuna ripetizione illimitata; regola esplicita, opt-out e alternativa umana |
| Chiamata interrotta o ritorno duplicato | Stato ignoto/terminato distinto da consegnato, idempotenza; non registrare come incasso |

Alternative: notifica in piattaforma (più semplice, può non essere vista),
promemoria umano assistito (controllabile, costo operativo), chiamata AI (più
invasiva e complessa). L'audio preferisce la capacità di chiamare; lo studio
non la sostituisce tacitamente con notifiche. Il confronto va validato con
persone interessate e responsabilità chiare. Una chiamata non può minacciare,
negoziare condizioni, certificare debiti o modificare il conto autonomamente.
Non includere registrazione integrale come default; log minimi ed eventuali
registrazioni hanno finalità, accessi e termini propri.

## Erogazione fisica e apprendimento dal supporto

NA06 richiede un servizio reale oltre al software: separare supporto all'uso,
acquisizione documentale e intervento tecnico. Per ogni servizio dichiarare
responsabile, territorio, requisiti, canale, disponibilità, preventivo e criteri
di chiusura; gli extra a pagamento non garantiscono personale disponibile.
La 0.5 ha solo richiesta ricevuta/in lavorazione/conclusa. Un incremento futuro
può aggiungere categoria e assegnazione sintetiche, senza contattare tecnici.

Proposta di ciclo: richiesta → classificazione del problema → eventuale incarico
→ esito documentato → problema UX riproducibile → correzione verificata. Separare
bug, bisogno di formazione, mancanza di dati e problema nell'immobile. Il numero
di chiamate evitate è una metrica da osservare con denominatore, non un risparmio
che si può dedurre dalla chiusura di un ticket o dall'opinione nell'audio.

## Dati, confini e impatto tecnico

Estendere il modello logico già proposto, senza migrare fixture a produzione.

| Oggetto | Campi/relazioni proposti | Invariante |
| --- | --- | --- |
| OffertaVersione / capacità / extra | Venditore, ambito, unità, inclusioni, prezzo/periodo e condizioni approvati | Offerta commerciale separata dai grants; versione accettata conservata |
| Adesione / Periodo / PreferenzaRinnovo | Aderente, beneficiari, agenzia, offerta, intervallo, fonte pagamento, richiesta con autore/data | Disdetta acquisita non termina subito il periodo già valido |
| PreventivoCambio | Origine/destinazione, data, regola pro rata/versione, componenti e totale, scadenza | Nessun livello nuovo senza condizioni accettate e requisiti soddisfatti |
| AcquisizioneBolletta / CampoEstratto | Originale/versione, schema, campo/fonte/confidenza, revisore, correzione e conflitti | Estratto non equivale a verificato; duplicato non crea nuovo dovuto |
| Report / Snapshot / RigaFonte | Destinatario, contesto, periodo, copertura, schema/versione, fonti e generato il | Permessi anche sui derivati; dati mancanti conservati come mancanti |

Produzione: autenticazione, isolamento agenzie, autorizzazioni applicate server,
versioni/operazioni idempotenti, file privati, audit minimo, retention per categoria,
monitoraggio e supporto. Nessun nuovo stack scelto in questa sessione. La demo
mantiene fixture, reset e dati locali; conti, provider e modelli AI sono assenti.

## Verifiche UX e questioni residue

Riutilizzare componenti e dialoghi accessibili della 0.5: etichette concrete,
focus e ritorno al controllo iniziale, Escape prima della conferma, stato
annunciato, touch e tastiera, testo al 200%, 360–1440 px, reduced motion.
Le skill apple-design/mobile-native informano gerarchia, feedback e controllo;
nessun gesto o nuova animazione è necessario al rinnovo. Prove fisiche Safari,
Android e screen reader restano distinte dall'emulazione Chromium.

Prima del prodotto operativo: catalogo e livelli, soggetto venditore, primo
pagante, periodo e fuso, pro rata e downgrade, recesso/rimborsi, accesso storico,
ambito dei due report, schemi bollette supportati, partner e capacità del servizio.
BF16 resta aperto: usare BF02 invariato, annotando il nuovo supporto prima della
raccolta. Nessuna discussione o test automatico sostituisce osservazioni umane.
