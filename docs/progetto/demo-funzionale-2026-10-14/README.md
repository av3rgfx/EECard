# EECard — piano della demo funzionale 0.4

Aggiornato il 14 ottobre 2026. Questo piano applica la decisione di costruire
prima una demo funzionante e usare la sua prova per precisare bisogni, priorità
e perimetro. Non autorizza un prodotto operativo, un pilota con dati reali o
l'attivazione di servizi esterni.

## Decisione e risultato atteso

La prossima prova non parte da un'intervista astratta. Parte da una demo locale,
navigabile e ripristinabile che mostri una storia completa con dati sintetici:

1. l'agenzia prepara e attiva una pratica collegando persone, rapporti, immobile,
   documenti e una credenziale dimostrativa;
2. la persona torna al banco e l'operatore apre una sessione circoscritta allo
   scopo e al contesto autorizzati;
3. operatore e persona recuperano un documento storico, verificano provenienza,
   versioni e stato, quindi chiudono la sessione.

Questa sequenza rende concretamente valutabili PF01, PF02 e PF05. PF03, PF04 e
PF06 compaiono come estensioni dimostrative collegate allo stesso fascicolo, per
far emergere cosa serve aggiungere senza attribuire loro servizi reali.

## Stato studiato

Il frontend 0.3 offre già dodici aree, quattro viste di ruolo, dati demo,
localStorage, scenari limite e percorsi per documenti, affitto, utenze,
assistenza, card e invito. Il design scelto è già integrato. I test esistenti
coprono i principali comportamenti locali, gli errori recuperabili,
l'accessibilità e alcuni confini di ruolo.

La base attuale è adatta a una presentazione ampia, ma non ancora alla prova
del beneficio fascicolo → banco → storico:

- l'attivazione mostra soprattutto l'accettazione di un invito e non il lavoro
  dell'operatore su una pratica esistente;
- il ritorno al banco non dispone di una sessione guidata con persona, scopo,
  immobile, rapporto e chiusura espliciti;
- la ricerca documentale non rende abbastanza visibili anno incerto,
  provenienza, versioni, controllo formale e cronologia dei lavori;
- il ruolo globale è utile alla presentazione, ma non rappresenta da solo le
  relazioni diverse della stessa persona su immobili e periodi differenti;
- gli stati limite esistono, ma non sono riuniti in un copione di prova con
  compiti, ripristino e raccolta delle osservazioni.

Le specifiche, i contratti preliminari BF03 e la matrice storico/uscita
forniscono già le regole da tradurre nella demo. Il kit BF02 resta disponibile e
non va rigenerato. BF16 resta aperto perché non sono presenti misure umane.

## Perimetro della demo 0.4

### Nucleo obbligatorio

**Pratica di attivazione PF01.** L'operatore parte da dati sintetici già
disponibili, controlla fonti e conflitti, collega le parti con periodi e titoli,
segnala i documenti mancanti e produce inviti simulati individuali. Account,
adesione e credenziale restano oggetti distinti.

**Sessione al banco PF02.** Un operatore già autenticato avvia una sessione
dimostrativa; la presentazione di card o codice seleziona una persona ma non la
autentica da sola. La demo richiede conferma della persona, scopo e contesto,
limita i dati mostrati, gestisce credenziale revocata, lettore indisponibile ed
errore recuperabile, poi registra la chiusura della sessione.

**Recupero storico PF05.** La ricerca accetta titolo, tipo, anno o intervallo
incerto. Il risultato espone fonte, immobile/rapporto pertinente, versioni,
correzioni, controllo formale o specialistico e cronologia dei lavori. Lettura,
condivisione ed esportazione sono simulazioni distinte e rispettano il titolo
ancora valido anche dopo la fine di un altro rapporto.

**Confini verificabili.** Due agenzie sintetiche consentono di mostrare
l'isolamento. Proprietario, inquilino, agenzia e tecnico vedono solo ciò che
deriva da rapporto, delega o incarico. Il proprietario non acquisisce le
bollette personali dell'inquilino. Fine rapporto, fine adesione e revoca della
card producono conseguenze separate.

### Estensioni dimostrative

- **PF03:** passaggio fra casa propria e casa locata con intestazioni e deleghe
  visibili nel contesto selezionato.
- **PF04:** riepilogo di una bolletta sintetica con creditore, importo, scadenza
  e codice/QR facsimile; nessun pagamento o collegamento bancario.
- **PF06:** bozza deterministica da template con fonti, campi mancanti,
  conflitti e revisione umana. Eventuali suggerimenti “assistiti” sono fixture
  locali, attribuite e disattivabili; non chiamano un modello esterno.
- **Schermo cliente:** anteprima locale e simulata dei dati minimi condivisi
  durante la sessione. Destinatari e hardware restano questioni aperte.
- **Credenziale fisica/wallet:** sola rappresentazione della presentazione e
  degli esiti; nessun NFC, pass wallet o lettore reale.

## Struttura consigliata

La demo conserva il design 0.3 e aggiunge un ingresso chiaro “Prova il percorso”.
Una barra di avanzamento collega i tre momenti senza trasformarli in una
procedura irreversibile. In ogni momento devono essere visibili il ruolo attivo,
la persona, il contesto, lo scopo e se si tratta di una simulazione.

Lo stato locale evolve oltre il solo ruolo globale e comprende almeno:
agenzie, persone, relazioni con validità, immobili, contratti, documenti e
versioni, provenienze, credenziali e revoche, sessioni al banco, concessioni
temporanee ed eventi di audit dimostrativi. La demo deve migrare o scartare in
modo esplicito lo schema locale precedente e offrire un ripristino affidabile.

Gli scenari iniziali devono essere deterministici:

| Scenario | Cosa permette di osservare |
| --- | --- |
| Percorso riuscito | PF01 → PF02 → PF05 senza salti e con chiusura sessione |
| Dati incompleti | Campi/documenti mancanti, conflitto e correzione attribuita |
| Credenziale revocata | Diniego, verifica alternativa simulata e nessuna riattivazione implicita |
| Rapporto concluso | Titoli cessati distinti da eventuali titoli autonomi ancora validi |
| Agenzia diversa | Nessuna lettura trasversale del fascicolo |
| Servizio/lettore indisponibile | Errore spiegato, retry o percorso manuale dimostrativo |

## Modalità di prova e apprendimento

La demo include una modalità guidata locale con scenario, compiti, stato del
passaggio, ripristino e campo note. Le note devono essere anonime, esportabili
come file locale e vuote in repository. Nessuna telemetria o invio esterno.

Il facilitatore usa prima il percorso riuscito, poi almeno uno scenario di
diniego o recupero. Osserva senza suggerire la soluzione finché la persona non
si blocca e registra:

- esito del compito e punto di arresto;
- passaggi inattesi, ritorni e aiuti richiesti;
- parole o stati non compresi;
- informazioni mancanti o mostrate senza necessità;
- aspettative emerse su card, storico, schermo cliente ed estensioni;
- proposta dell'operatore su cosa eliminare, cambiare o aggiungere.

Le misure umane restano vuote finché la prova non avviene. Dopo la demo, BF16
può riusare il protocollo e i materiali già pronti adattando soltanto il
supporto osservato e registrando la versione della demo. Il confronto col metodo
corrente rimane necessario per affermare un risparmio; il test di comprensione
da solo non lo dimostra.

## Sequenza dei prossimi passi

1. Implementare il modello demo e i fixture isolati di due agenzie.
2. Costruire il percorso guidato PF01 → PF02 → PF05 con esito riuscito.
3. Aggiungere dinieghi, revoca, fine rapporto, errore e retry; verificarne i
   permessi anche fuori dall'interfaccia visibile.
4. Collegare PF03, PF04 e PF06 come estensioni sintetiche, preservando i confini
   e indicando sempre cosa è simulato.
5. Integrare modalità prova, reset, note locali e copione del facilitatore.
6. Eseguire build, test end-to-end, accessibilità, layout mobile/desktop e
   controlli sui casi ammessi/negati; aggiornare screenshot e rapporti.
7. Pubblicare un aggiornamento sul sito Sites esistente soltanto nel lavoro di
   implementazione autorizzato e registrare il commit effettivamente online.
8. Far provare la demo agli operatori, analizzare osservazioni reali e usare gli
   esiti per scegliere il perimetro successivo. Non trasformare preferenze
   isolate in prezzo, lancio o requisito definitivo.

## Criteri di completamento

La demo 0.4 è pronta da testare quando una persona che non conosce il codice può
completare i tre momenti principali usando soli dati sintetici; ogni azione
indica attore, oggetto ed esito; i casi negati non rivelano dati; reset e retry
funzionano; mobile e desktop restano usabili; servizi reali non sono necessari;
test e limiti sono documentati sul commit consegnato.

Il prompt eseguibile per realizzare questa consegna è
[PROMPT_DEMO_FUNZIONALE.md](../PROMPT_DEMO_FUNZIONALE.md). Il testo da
incollare resta intenzionalmente entro 4.000 caratteri e rimanda a questo piano
per i dettagli, evitando duplicazioni.

## Implementazione consegnata

Il piano è ora eseguito nel perimetro locale 0.4: [implementazione e limiti](IMPLEMENTAZIONE.md),
[copione per la prova](COPIONE.md), [verifiche osservate](VERIFICHE.md).
Gli obiettivi e i criteri sopra descrivono il piano originario; questi rapporti
indicano ciò che è disponibile. BF02 invariato; BF16 aperto.
