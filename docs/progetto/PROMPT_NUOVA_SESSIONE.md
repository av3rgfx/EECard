Da usare nel NUOVO repository, dopo avervi estratto avvio-prodotto.zip nella radice.

Voglio costruire da zero una piattaforma web reale per gestire casa e bisogni collegati, con un'interfaccia molto curata, bella e semplice. Lavora in questo nuovo repository, rispondi in italiano e usa il pacchetto presente come contesto autonomo. Non occorre accedere al vecchio progetto né copiarne il codice.

Leggi AGENTS.md, README.md, docs/STATO.md, docs/PRODUCT.md, docs/UX_UI.md, docs/REQUISITI.md, docs/DELIVERY.md e docs/DECISIONI.md. Gli asset approvati sono in assets/. Il nome EECard è provvisorio; C–Legame è il simbolo, non il nome. Conserva Materia e luce per tessera/materiali ed Editoriale e architettura per le pagine. Menu e layout precedenti non sono approvati.

Il servizio deve permettere di accedere, monitorare, verificare, pagare e chiedere assistenza per casa, documenti, burocrazia, tecnici, abbonamenti e bollette. La home personale deve rendere immediati tessera, casa, ciò che richiede attenzione e pagamento. Il pagamento è centrale: mostrare l'avviso non basta. Agenzia e tecnici hanno spazi e permessi propri. La piattaforma deve sostenere anche l'erogazione concreta del servizio.

Prima di implementare estesamente, studia la situazione: bisogni, percorsi, lacune, fattibilità dei pagamenti, organizzazione del servizio, dati e vincoli. Parti dalle conferme già presenti. Cerca soluzioni migliori dove servono, usando fonti ufficiali aggiornate per provider e tecnologie. Separa fatti, ipotesi e scelte. Fai solo le domande che cambiano davvero il lavoro immediato e continua sulle parti indipendenti.

Dedica particolare cura allo studio UX/UI: architettura informativa, gerarchie, tipografia, materiali, spazi, microtesti, movimento utile, accessibilità e mobile. Consulta le risorse indicate in UX_UI.md prima di usarle. Evita una dashboard generica e un insieme di schermate decorative. Confronta alternative significative e motivane una.

Nella prima sessione consegna uno studio sintetico, una mappa cliente/agenzia/tecnico, una proposta navigabile ad alta fedeltà desktop/mobile con home → bolletta → esito e home → assistenza → presa in carico, e una scelta architetturale motivata. Mostra anche errori, dati mancanti e stati incerti. Usa dati sintetici e indica le simulazioni. Rendi la proposta avviabile e verificata; raccogli il mio feedback prima di estendere tutte le aree, proseguendo nel frattempo sulle fondazioni indipendenti.

L'obiettivo successivo è il prodotto operativo completo nel perimetro di rilascio esplicito: frontend, backend, database, autenticazione, autorizzazioni server, file privati, integrazioni, test e gestione operativa. Procedi per incrementi end-to-end secondo DELIVERY.md, senza fermarti al mockup. Non scegliere lo stack per abitudine: motiva semplicità, affidabilità, costi e manutenzione.

Preserva isolamento tra agenzie, permessi per oggetto/relazione/periodo, originali e versioni. Distingui dichiarazione, evidenza, incasso verificato e quietanza. Gestisci duplicati, rettifiche, residui, revoche, errori ed esiti ignoti senza doppi pagamenti. Non inventare prezzi, coperture, condizioni o disponibilità di servizi.

Sviluppa e verifica in locale/sandbox. Non attivare transazioni, comunicazioni o servizi reali senza istruzioni esplicite. Se mancano provider o credenziali, documenta i prerequisiti e continua ciò che è indipendente; non chiamare reale una simulazione. Verifica UI desktop/mobile, flussi, accessi negativi, persistenza e recuperi. Registra controlli eseguiti e limiti, senza confondere test automatici e prove umane.

Aggiorna stato, decisioni e backlog a ogni sessione. Indica cosa è progettato, simulato, implementato, verificato in sandbox o attivo. Concludi con risultato apribile, istruzioni di avvio, verifiche, questioni decisive e prossimo passo concreto. Non effettuare merge o deploy in produzione senza autorizzazione.
