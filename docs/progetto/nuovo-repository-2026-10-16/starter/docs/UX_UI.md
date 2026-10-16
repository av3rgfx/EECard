# Studio UX/UI e direzione visiva

## Risultato atteso

Un'interfaccia premium, bella, calma e facile da usare anche per chi ha poca familiarità digitale. La qualità di Revolut è un riferimento di cura, fluidità e chiarezza, non un invito a copiarne schermate o a sembrare una banca. Progettare desktop e telefono insieme: il mobile non è un desktop ristretto.

## Base confermata da conservare

- Simbolo **C–Legame** negli asset. EECard è provvisorio; Legame è il concept, non il nome; ƎE è il marchio dell'agenzia, non del prodotto. Nessun nuovo wordmark senza scelta esplicita.
- **Materia e luce** per tessera e materiali: volume misurato, luce radente, grana fine, bordo e ombra di contatto. Simbolo leggibile e fermo.
- **Editoriale e architettura** per pagine: composizione a tutta larghezza utile, tipografia, spazio, immagini e separatori. Evitare contenitori a scheda ripetuti o annidati attorno a form e passaggi. Le card possono rappresentare oggetti consultabili; gli immobili mantengono presentazione editoriale.
- Base cromatica: avorio caldo, bruno, albicocca; Manrope locale. Colori puntuali e regole del simbolo in [assets/README.md](../assets/README.md). Non sostituire la palette per uniformarsi a un template.
- Tessera primo contenuto dominante della home personale, con stato e gestione vicini; attenzione e pagamento facilmente raggiungibili. Agenzia con coda operativa e tecnico con incarichi, senza tessera personale inventata.
- In home: una sola casa **visibile** espansa; più case visibili compatte, senza schede immobili. Dopo un filtro a una sola casa torna la vista espansa. Pagina elenco immobili sempre espansa.

## Libertà progettuale

Menu, gerarchie di dettaglio e collocazione delle funzioni non sono approvati. Casa / Pagamenti / Assistenza / Profilo è solo un'ipotesi. Confrontala con un'alternativa se migliora reperibilità e numero di passaggi. Non nascondere documenti o richieste frequenti per rispettare quattro voci a tutti i costi. Il modello dati dell'agenzia non deve diventare il menu del cliente.

Per cambiare una scelta confermata, presenta il problema osservabile e una proposta concreta da valutare. Non serve riaprire tutto il marchio per correggere la navigazione. I dettagli non confermati possono essere riprogettati motivando la scelta.

## Studio iniziale richiesto

1. Ricostruisci i compiti principali, le persone, i contesti e il servizio effettivo dai brief. Distingui fatti, ipotesi e domande; non presentare personas immaginate come ricerca con utenti.
2. Esamina pochi riferimenti pertinenti su fonti attuali: servizi per la casa, pagamenti, assistenza, prodotti di alta qualità. Registra cosa è utile e cosa non si adatta. Niente raccolta di screenshot senza conseguenze progettuali.
3. Disegna mappa dell'esperienza e architettura informativa cliente/agenzia/tecnico; confronta solo le alternative che cambiano davvero la semplicità.
4. Realizza home desktop/mobile e percorsi bolletta/assistenza navigabili ad alta fedeltà. Mostra stati normali e difficili, non solo una schermata ideale.
5. Verifica, raccogli un riscontro mirato e aggiorna la proposta prima di estenderla. In assenza di feedback, documenta le decisioni in attesa e continua su fondazioni indipendenti.

## Percorsi centrali

**Bolletta:** priorità o azione in home → casa/creditore/importo/scadenza/stato e originale → eventuale verifica → canale supportato e costo totale → riepilogo e conferma → esito e riferimento consultabile → ritorno al contesto. Prevedere pagamento indicato, domiciliazione, versione superata, permesso revocato, errore, annullo ed esito ignoto. Non usare «Paga» per aprire soltanto un PDF. Non mostrare «pagato» dal semplice ritorno di un redirect.

**Assistenza:** casa o oggetto già selezionato → bisogno descritto in parole semplici → dati indispensabili → riepilogo modificabile → conferma ricevuta dal server → riferimento, stato e prossimo passo → presa in carico nell'agenzia. Indicare i limiti di disponibilità. Una richiesta ricevuta non è un intervento prenotato o concluso.

**Documento:** ricerca o accesso dalla casa → versione pertinente con fonte e data → consultazione originale → azione autorizzata, condivisione o richiesta di aiuto → riscontro. Non perdere casa e contesto durante il percorso.

## Qualità verificabile

Interfaccia a 360, 390, 768 e 1440 px; nessun overflow accidentale. Gerarchia leggibile con testi lunghi, molte case, liste vuote, dati mancanti e caricamento. Tutti i controlli azionabili, senza pulsanti ornamentali. Errori vicini ai campi e valori conservati dopo un errore. Conferme proporzionate alle conseguenze.

Tastiera, focus visibile, ritorno del focus, etichette, annunci di stato, contrasto, testo al 200%, touch comodo, safe area, tastiera virtuale e movimento ridotto. Navigazione indietro e link diretti coerenti. Animazioni brevi e interrompibili: niente attese artificiali per vedere importi o azioni. Il livello premium deve reggere anche senza animazione.

Prova separatamente browser emulati, dispositivi fisici e screen reader; non attribuire a uno ciò che prova un altro. I test automatici di accessibilità non sostituiscono revisione manuale e prova con persone.

## Risorse richieste da consultare quando progetti

- Animate UI: https://animate-ui.com/docs
- Rare UI: https://www.rareui.com/llms.txt
- Skill di Emil Kowalski: https://github.com/emilkowalski/skills/tree/main/skills ; soprattutto `apple-design` e `mobile-native`.
- Riferimento originale: https://transition.dev ; non confonderlo automaticamente con https://transitions.dev . Verifica disponibilità, pertinenza e condizioni; documenta l'eventuale alternativa.

Questi sono riferimenti da verificare nella nuova sessione, non dipendenze installate. Leggi skill, sorgenti e licenze prima dell'uso; conserva attribuzioni e versione. Se una risorsa non è disponibile o adatta, motiva un'alternativa. Seleziona componenti utili, con un unico sistema di token e primitive coerenti, senza copiare interi cataloghi.
