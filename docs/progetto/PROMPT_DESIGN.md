# Prompt per avviare la sessione di design

Copia il blocco seguente nella nuova sessione, collegata alla repository EECard.
Se la PR di documentazione non è ancora integrata, il prompt indica il branch
dal quale recuperare lo studio e il contesto.

```text
Lavora sempre nella repository https://github.com/av3rgfx/EECard.
Voglio iniziare il design della piattaforma EECard per desktop e mobile.

Agisci come product designer e design engineer senior. L'obiettivo di questa
sessione è un design molto premium e un prototipo frontend navigabile ad alta
fedeltà, con dati dimostrativi e interazioni verificabili.

1. RECUPERA IL CONTESTO
Leggi AGENTS.md, docs/progetto/PROSSIMA_SESSIONE.md,
docs/progetto/RISORSE_DESIGN.md e integralmente lo studio
docs/progetto/EECard-studio-v0.1.pdf; è disponibile anche la copia DOCX.
Se questi file non sono su main, recupera docs/eecard-design-handoff.
Lavora su un nuovo branch dedicato al design, preservando modifiche esistenti e
lavori estranei. Non ripetere l'intera analisi: usa lo studio come base preliminare
e distingui decisioni confermate, proposte e ipotesi ancora aperte.

EECard collega proprietari, inquilini e agenzia tramite servizi per la casa,
documenti, locazioni, scadenze, assistenza e una card fisica/digitale.
Prezzi, inclusioni, primo cliente pagante e copertura operativa sono ancora aperti.
Non inventare una periodicità per i 50 € / 15 € e non promettere assistenza 24/7.
Le ipotesi non bloccanti vanno annotate e rese facili da modificare.

2. USA QUESTE RISORSE
Consulta e usa nei punti pertinenti Animate UI (https://animate-ui.com),
Rare UI (https://rareui.com) e il riferimento indicato come transition.dev.
Per quest'ultimo leggi la verifica in RISORSE_DESIGN.md: transitions.dev, al plurale,
è un possibile riferimento da distinguere esplicitamente da quello originale.
Se l'ambiguità persiste, segnala l'ipotesi e continua con le risorse verificate.

Recupera e leggi le skill da
https://github.com/emilkowalski/skills/tree/main/skills.
Applica soprattutto apple-design e mobile-native, insieme a emil-design-eng,
pick-ui-library, animate, review-animations e break-ui nella modalità + fix.
Leggi anche i file di supporto quando il compito lo richiede. Valuta le altre skill
solo per esigenze concrete; prototype serve all'esplorazione di varianti di un
elemento, non è un passaggio obbligatorio. Non dichiarare usate skill non lette.

Verifica lo stack esistente prima di scegliere strumenti. Se la parte EECard è
vuota, proponi brevemente uno stack frontend semplice e compatibile con le risorse
richieste, poi procedi. Integra i componenti in un solo sistema di token e registra
fonti, versioni, licenze e adattamenti. Usa i componenti necessari, senza installare
interi cataloghi. Non sostituire automaticamente le librerie che ho richiesto.

3. DIREZIONE VISIVA
Voglio una qualità percepita paragonabile a Revolut, con un'identità propria per
EECard: tipografia curata, gerarchie chiare, spaziature precise, superfici eleganti,
profondità discreta e una card digitale riconoscibile. Scegli una palette coerente
e motivala brevemente. Progetta un prodotto quotidiano, affidabile e piacevole.
La qualità deve restare evidente senza animazioni decorative. Cura feedback,
stati interattivi e transizioni utili, rapide e interrompibili.

Desktop: navigazione chiara, panoramica di più immobili e spazio per documenti e
attività operative. Mobile: navigazione pensata per il pollice, priorità nette,
azioni raggiungibili, pannelli adatti al touch, safe area e tastiera gestite bene.
Progetta entrambe le esperienze: quella mobile deve avere una propria gerarchia.
apple-design e mobile-native non implicano la scelta di un'app nativa negli store.

4. SCHERMATE E PERCORSI
Definisci prima mappa delle schermate, navigazione e componenti, poi realizza:
- accesso, invito e attivazione simulati;
- home di proprietario e inquilino, cambio ruolo e selezione immobile;
- card digitale, richiesta della fisica, blocco e sostituzione simulati;
- immobili, contratti, documenti e condivisione con permessi visibili;
- affitto, scadenze, prove di pagamento e bollette;
- richiesta di assistenza con allegati, avanzamento e dettaglio intervento;
- prenotazione della consulenza, notifiche e profilo/servizio;
- pannello agenzia con richieste, documenti da verificare e assegnazione ai tecnici.

Rendi completi almeno questi percorsi dimostrativi: consultare/condividere un
documento; inviare una prova di bonifico e verificarla dal ruolo competente;
aprire una richiesta di assistenza e gestirla dall'agenzia; bloccare una card.
Le altre schermate devono avere contenuti e comportamenti coerenti con il loro
stato. Ogni controllo visibile deve funzionare o spiegare perché non è disponibile.

Prevedi più immobili, comproprietari, più inquilini e persone con ruoli diversi.
Mostra caricamento, vuoto, successo, errore, accesso revocato e fine contratto.
Usa testi in italiano e dati realistici ma fittizi. Mantieni separati documento
caricato, pagamento dichiarato, incasso verificato e quietanza rilasciata.
La card dà accesso ai servizi: non rappresentarla come carta bancaria attiva.
Mantieni pagamenti, app negli store, 3D e AI tra le questioni da valutare nello
studio: questo prototipo non deve far apparire approvata né la loro esclusione
né la loro disponibilità reale. Annotale nel registro delle decisioni.

5. METODO E CONSEGNA
Inizia con una breve restituzione del contesto, del perimetro e della direzione
visiva proposta, poi procedi con il design e il prototipo. Fai solo domande che
cambiano davvero il lavoro e continua sulle parti indipendenti dalle risposte.
Questa fase usa dati e servizi simulati; backend e pagamenti reali appartengono
all'implementazione successiva. Rendi riconoscibile l'ambiente dimostrativo.

Consegna nella repository: design system con token e componenti, prototipo
navigabile desktop/mobile, mappa dei percorsi, registro delle ipotesi, fonti dei
componenti e istruzioni di avvio. Fornisci un'anteprima apribile e schermate delle
viste principali, se l'ambiente lo consente.

Verifica il risultato a 360/390 px e 1280/1440 px, tastiera, focus, contrasto,
zoom, movimento ridotto, nomi lunghi, dati mancanti e casi di errore. Correggi i
difetti riscontrati e riesamina il risultato con review-animations e break-ui.
Esegui i controlli del progetto e verifica i percorsi nel browser. Distingui le
prove effettuate in emulazione da quelle che richiedono un telefono reale.

Concludi indicando cosa è pronto, come provarlo e quali decisioni restano aperte.
```
