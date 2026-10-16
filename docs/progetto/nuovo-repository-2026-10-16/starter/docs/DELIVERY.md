# Dallo studio al prodotto operativo

## Fase 1 — studio mirato e proposta concreta

Leggere il pacchetto, ispezionare il repository realmente presente, elencare lacune decisive e assunzioni reversibili. Confrontare alternative UX e tecniche solo quando cambiano semplicità, costo, rischio o capacità. Per servizi e provider usare fonti ufficiali attuali: la fattibilità del pagamento di bollette dipende dal tipo di avviso, creditore, canale, paese e rapporto contrattuale, non dalla presenza di un pulsante checkout.

Produrre una mappa cliente/agenzia/tecnico, un flusso di erogazione del servizio, proposta desktop/mobile navigabile e breve registro delle scelte. Home → bolletta → esito e home → assistenza → presa in carico devono essere osservabili. In questa fase le parti simulate sono evidenti e i dati sintetici. Presentare la proposta per feedback prima di estendere l'intera UI; nel frattempo avanzare su lavoro indipendente.

Lo studio non deve diventare un ciclo infinito: riusa le conferme, chiedi poche risposte decisive e consegna un risultato valutabile nella prima sessione. Non dichiarare validazione umana senza osservazioni raccolte.

## Fase 2 — fondazioni reali

Proporre lo stack più semplice che sostenga accessi server, dati relazionali/versionati, file privati, transazioni, pagamenti asincroni, test e manutenzione. Motivare scelta e alternative con costo, portabilità, competenze richieste e limiti. Nessun obbligo di riusare il frontend o l'hosting precedenti; non adottare microservizi o un framework per abitudine.

Realizzare configurazione riproducibile, autenticazione, isolamento organizzazioni, autorizzazione, schema/migrazioni, file, audit, gestione errori, pipeline di controllo e ambienti. Separare adattatori sandbox e reali; un adattatore finto non prova un'integrazione. Documentare `.env.example` senza segreti e istruzioni di avvio testabili da un checkout pulito.

## Fase 3 — incrementi completi

Ordine iniziale proposto, da confermare con dipendenze e riscontro:

| Incremento | Risultato osservabile |
| --- | --- |
| Accesso e casa | Cliente autenticato vede solo case/dati autorizzati; agenzia gestisce relazioni e titoli |
| Home e fascicolo | Priorità derivate da dati reali, originali/versioni, ricerca e recupero accessibili |
| Bolletta e pagamento | Acquisizione → verifica → canale supportato → conferma → esito persistente/riconciliato; integrazione sandbox verificata prima del live |
| Assistenza e operatività | Richiesta persistita → coda agenzia → assegnazione → aggiornamenti → esito, con accesso tecnico limitato |
| Adesione e card | Stato e rinnovo, blocco/sostituzione, condizioni versionate; eventuali acquisti solo con offerta definita |
| Estensioni del rilascio | Canoni, altre pratiche, comunicazioni e report distinti secondo il perimetro scelto |

Ogni incremento include UI, server, persistenza, permessi, errori, test e documentazione operativa. Non costruire tutte le schermate vuote rimandando le funzioni reali. Non dichiarare «completo» ciò che è un mock o dipende ancora da un fornitore.

Per integrazioni bloccate, consegnare interfaccia tecnica, sandbox se disponibile, test dei contratti e lista esatta dei prerequisiti. Continuare le parti indipendenti; non aggirare il blocco inventando risultati reali.

## Fase 4 — readiness e rilascio

Il primo rilascio deve avere un perimetro esplicito. «Pronto all'uso» significa pronto per quel perimetro e per gli utenti indicati, non per ogni funzione futura.

- Flussi concordati completi e persistenti, senza pulsanti inerti o simulazioni nascoste; UI desktop/mobile verificata anche negli errori.
- Controlli automatici e manuali pertinenti con evidenze; permessi negativi, isolamento, versioni, concorrenza, pagamento e recuperi verificati.
- Prova con persone dei compiti principali e, separatamente, controllo sui dispositivi reali previsti. Nessuna misura di risparmio o facilità inventata.
- Provider, credenziali, tipi di bollette supportati, costi, responsabilità e riconciliazione effettivamente disponibili; eventuale test live solo con autorizzazione specifica.
- Catalogo e condizioni, privacy/conservazione, responsabili di supporto e professionisti, copertura e gestione dei casi problematici definiti per ciò che viene offerto.
- Backup/ripristino provati; deploy, rollback, monitoraggio e assistenza operativa documentati. Verifica dell'ambiente effettivamente pubblicato e del commit rilasciato.

Tenere un registro per capacità con stati **progettata / simulata / implementata / verificata in sandbox / attiva in produzione**, risultato della verifica e blocchi. Le verifiche sandbox non dimostrano disponibilità commerciale o conformità complessiva.

## Documenti vivi del nuovo repository

Creare durante il lavoro: studio e architettura, mappa/percorsi, backlog con dipendenze e criteri, modello dati/accessi, report di verifica, runbook e registro rilasci. Aggiornare [STATO.md](STATO.md) a fine sessione con prossimo passo concreto e [DECISIONI.md](DECISIONI.md) quando cambia una scelta. Non duplicare tutta la storia nei prompt successivi.
