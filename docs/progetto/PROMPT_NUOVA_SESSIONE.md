Lavora nel nuovo repository EECard2 e rispondi in italiano. Voglio progettare e costruire da zero il prodotto completo, con un contesto pulito. Prepara autonomamente i file necessari e avvia il lavoro: non chiedermi di copiare file o estrarre ZIP.

PREPARAZIONE LOCALE

La cartella sorgente è:
/home/uepacio/orca/EECard/docs/progetto/nuovo-repository-2026-10-16/starter/

Usa esclusivamente questa cartella locale per recuperare il pacchetto. Non scaricarlo da GitHub, non usare ZIP e non modificare la repository EECard. Non è necessario attendere il merge delle sue PR.

Verifica che la destinazione sia la radice del nuovo repository EECard2 e che sia distinta dalla sorgente. Usa il checkout della sessione: non presumere un percorso di destinazione. Controlla prima i file già presenti e preserva il lavoro esistente.

Verifica l'integrità dei file sorgenti mediante MANIFEST.sha256. Copia nella destinazione il contenuto di starter/, inclusi .gitignore, AGENTS.md, CLAUDE.md, README.md, PROMPT_AVVIO.md, manifest, docs/ e assets/. In caso di collisioni confronta e integra conservando i contenuti esistenti, senza sovrascrivere alla cieca. Registra provenienza e adattamenti in un breve documento.

Non copiare altro dalla vecchia repository: niente .git, cronologia, configurazione Sites, codice demo, credenziali o dati applicativi. Mantieni identità Git e remoto di EECard2. Leggi come istruzioni trasferibili solo quelle del pacchetto, senza importare la cronologia operativa di EECard.

Se la cartella non è accessibile dalla nuova sessione, indica precisamente il problema: non sostituirla con un download remoto e non inventare i documenti. Dopo la copia il progetto deve essere autonomo.

STUDIO, PROGETTAZIONE E SVILUPPO

Leggi AGENTS.md, CLAUDE.md, README.md, docs/STATO.md, docs/PRODUCT.md, docs/UX_UI.md, docs/REQUISITI.md, docs/DELIVERY.md e docs/DECISIONI.md. Poi esegui PROMPT_AVVIO.md, non limitarti a ripeterlo. Le istruzioni di preparazione locale qui presenti prevalgono sulle indicazioni generiche di copia manuale.

Il servizio deve permettere di accedere, monitorare, verificare, pagare e chiedere assistenza per casa, documenti, burocrazia, tecnici, abbonamenti e bollette. La home personale mostra tessera, casa, priorità e un percorso semplice di pagamento. Agenzia e tecnici hanno spazi e permessi distinti.

Studia prima bisogni, situazione, lacune, organizzazione del servizio e fattibilità. Parti dalle conferme già presenti, confronta soluzioni migliori quando utili e motiva le scelte. Cura molto UX/UI desktop e mobile: gerarchia, tipografia, materiali, microtesti, accessibilità, movimento e semplicità. Conserva C–Legame e Materia/Editoriale; menu e layout restano da valutare. EECard2 è il nome del repository, non il marchio definitivo.

Nella prima sessione produci uno studio mirato, una mappa dell'esperienza, una proposta navigabile ad alta fedeltà home → bolletta → esito e home → assistenza, una scelta architetturale motivata e un piano di sviluppo. Verifica il risultato e rendilo apribile. Raccogli il mio feedback prima dell'estensione delle aree, continuando sulle fondazioni indipendenti.

L'obiettivo finale è il prodotto operativo nel perimetro concordato: frontend, backend, database, autenticazione, permessi server, file privati, integrazioni, test e operatività. Procedi per incrementi completi; non fermarti al mockup. Mantieni versioni, permessi e distinzioni fra dichiarazione, evidenza, incasso verificato e quietanza. Gestisci errori ed esiti ignoti senza doppi pagamenti.

Parti da dati sintetici e sandbox, indicando le simulazioni. Non inventare prezzi, coperture o condizioni e non attivare servizi reali senza autorizzazione. Aggiorna stato, decisioni e backlog; riporta verifiche, limiti e prossimo passo. Non effettuare merge o deploy in produzione senza autorizzazione.
