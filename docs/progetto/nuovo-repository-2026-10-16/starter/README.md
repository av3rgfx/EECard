# Una piattaforma per prendersi cura della casa

Pacchetto di avvio autonomo — 16 ottobre 2026. Nome di lavoro: EECard, da confermare.
Obiettivo: costruire da zero un prodotto web operativo, con un contesto pulito.
Questo pacchetto contiene un brief e asset, **non un'applicazione già funzionante**.

## Come iniziare

1. Crea un nuovo repository vuoto con il nome che preferisci. Il nome tecnico del repository non approva il marchio del prodotto.
2. Copia **il contenuto** di questa cartella nella radice, compresi `.gitignore`, `AGENTS.md` e `CLAUDE.md`. Se usi lo ZIP, estrailo direttamente nella radice. Non clonare il vecchio progetto sopra questi file.
3. Apri il nuovo repository nell'ambiente di sviluppo con Claude e incolla [PROMPT_AVVIO.md](PROMPT_AVVIO.md). Il prompt è testo normale, senza comandi specifici di un altro agente.
4. La prima sessione deve produrre uno studio mirato, una proposta UX/UI navigabile e una scelta tecnica motivata. Prima di estendere tutte le aree, raccogli il riscontro sulla home e sui percorsi pagamento e assistenza.
5. Prosegui per incrementi completi, aggiornando [stato](docs/STATO.md) e [decisioni](docs/DECISIONI.md). Configura repository remoto e ambienti con i dati effettivi, senza ereditare quelli del prototipo.

## Lettura essenziale

| File | Serve per |
| --- | --- |
| [PRODUCT.md](docs/PRODUCT.md) | Visione, persone, servizio e capacità desiderate |
| [UX_UI.md](docs/UX_UI.md) | Qualità visiva, gerarchia, percorsi e ricerca progettuale |
| [REQUISITI.md](docs/REQUISITI.md) | Regole del dominio e prove di accettazione |
| [DELIVERY.md](docs/DELIVERY.md) | Studio, architettura, incrementi e criteri di rilascio |
| [DECISIONI.md](docs/DECISIONI.md) | Conferme, proposte e informazioni ancora mancanti |
| [STATO.md](docs/STATO.md) | Stato iniziale e continuità delle nuove sessioni |
| [Asset](assets/README.md) | Simbolo approvato, font e condizioni d'uso |

Non è necessario accedere ad alcun vecchio repository. Sono deliberatamente esclusi codice demo, dati persistiti, audio, trascrizioni, clienti, credenziali, provider, cronologia Git e identità di hosting. I test eseguiti sui vecchi prototipi non qualificano questo nuovo prodotto.

Il riferimento opzionale alla vecchia proposta è https://eecard-design-preview.uepacio.chatgpt.site/#/casa/home : serve solo per comprendere una precedente esplorazione. Menu e layout non sono approvati e non vanno copiati per inerzia. Il nuovo progetto deve funzionare e poter essere sviluppato anche senza aprire questo link.

Non è imposto uno stack. La produzione richiede scelte e verifiche esplicite su pagamenti, accessi, dati e organizzazione del servizio. Nessun prezzo, contratto, copertura o data di lancio è definito da questo pacchetto.
