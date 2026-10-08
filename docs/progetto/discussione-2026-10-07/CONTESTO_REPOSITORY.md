# EECard - contesto verificato per la nuova sessione

Verifica: 8 ottobre 2026. Repository: https://github.com/av3rgfx/EECard.
Snapshot analizzato: `main` al commit `4b77c0bd41d733c7a7680ad3d63d9a496424db64`.
Questo documento descrive il punto di partenza precedente agli aggiornamenti
derivati dalla conversazione del 7 ottobre. Non sostituisce le successive decisioni.

## Stato reale del progetto

- È disponibile un prototipo frontend navigabile per desktop e smartphone,
  costruito con React, TypeScript e Vite. Il codice e i dati sono dimostrativi.
- Sono presenti quattro contesti: proprietario, inquilino, agenzia, tecnico.
- Le dodici rotte comprendono home, immobili, documenti, affitto, utenze,
  assistenza, consulenze, card, profilo, agenzia, accesso e design system.
- Non esistono backend, database, autenticazione reale, archivio file sul server,
  pagamenti, invio email, calendario esterno o ordini di card effettivi.
- Lo studio preliminare v0.1, di 21 pagine, è conservato in PDF e DOCX in
  `docs/progetto/`. Contiene analisi e ipotesi, non una specifica finale approvata.
- La PR #4 è integrata: merge verificato il 7 ottobre 2026 alle 22:13:57 UTC
  (8 ottobre alle 00:13:57 in Italia). I precedenti documenti che la descrivono
  aperta conservano un checkpoint ormai superato.
- I documenti registrano Sites v5 e sorgente online
  `65ac9e092c17d9113d85106fa3d04fbb9770cab5`. È l'ultima pubblicazione
  documentata; questa analisi non ha rieseguito il deploy o il collaudo online.

## Decisioni visive già ricevute

Il nome EECard è provvisorio. Il simbolo C - Legame è scelto e integrato;
Legame è il titolo del concept, non un nome di prodotto approvato. Il marchio
deve essere autonomo dall'agenzia Enrico Erca e utilizzabile da altre agenzie.

La direzione 0.3 combina tessera e materiali di Materia e luce con pagine aperte
di Editoriale e architettura: bruno, albicocca, avorio caldo e Manrope locale.
La tessera personale precede saluto e riepiloghi nella home di proprietario e
inquilino. Agenzia e tecnico mantengono le rispettive viste operative.

Gli immobili sono compatti solo nella home quando il contesto corrente ne
mostra più di uno (`activeHouses.length > 1`). Una sola casa, anche dopo un
filtro, e la pagina immobili mantengono la vista espansa. Non riproporre la
scelta delle tre direzioni o il confronto dei simboli senza una nuova richiesta.

## Percorsi dimostrativi già esistenti

| Area | Funzionamento presente | Limite concreto |
| --- | --- | --- |
| Documenti | Ricerca, categorie, anteprima, destinatari consentiti, durata e revoca | File e scadenza non sono applicati da un server; la condivisione non invia email |
| Affitto | Prova caricata, dichiarazione, fonte/autore di verifica, quietanza distinta, residuo del parziale | Nessun pagamento o riscontro bancario reale; un solo record demo per immobile, non un libro dei movimenti mensili |
| Utenze | Due bollette illustrative per l'inquilino | Nessuna integrazione fornitori, archivio reale, pagamento o voltura |
| Assistenza | Creazione richiesta, errore/riprova, assegnazione, accettazione, conclusione, riapertura | Nessun centralino, professionista contattato, preventivo economico o appuntamento reale |
| Consulenze | Tema, slot e annullamento locale | Una stringa demo; nessuna capacità di calendario o beneficio annuale effettivo |
| Card | Identificativo, blocco, sostituzione e precedente ID revocato; interesse per supporto fisico | Nessuna emissione, lettura NFC, autenticazione con tessera o consegna |
| Accesso | Invito e codice demo pubblico `123456` | Non autentica persone né verifica la proprietà |
| Agenzia e tecnico | Coda per verifiche/incarichi e vista dei soli lavori assegnati | Filtri di presentazione, non autorizzazioni di produzione |

## Regole di significato da conservare

1. Documento caricato, pagamento dichiarato, incasso verificato e quietanza
   rilasciata sono eventi distinti. Una contabile non dimostra da sola l'accredito.
2. Un incasso parziale conserva il residuo anche dopo la quietanza dell'importo
   effettivamente verificato.
3. La tessera identifica l'accesso ai servizi: non è una carta bancaria.
4. I permessi dipendono dalla relazione con immobile, contratto e incarico.
   Il proprietario non acquisisce automaticamente le bollette dell'inquilino;
   il tecnico non consulta tutto il fascicolo.
5. Controllo formale di un documento e verifica specialistica restano diversi.
6. Segnalare un guasto non autorizza una spesa; assegnare un tecnico non
   conferma che abbia accettato o che sia disponibile.
7. Le condivisioni prevedono destinatario, durata e revoca; la card sostitutiva
   non riattiva il precedente identificativo.
8. Fine contratto, revoca del rapporto e disdetta del servizio sono eventi
   differenti, da progettare per dati, accessi e continuità.

## Cosa insegna il codice alla progettazione successiva

`src/data.ts` contiene fixture e uno `DemoState` salvato con la chiave
`eecard-demo-v1`. Il selettore ruolo cambia la presentazione nello stesso browser:
non ci sono account distinti né un utente corrente con identità verificata.
Le fixture elencano più proprietari e inquilini, ma `App.tsx` usa contesti
semplificati, inclusa una casa fissa per il ruolo inquilino.

`FileInput` valida formato/dimensione e comunica il solo nome del file. I
pagamenti sono un `Record` indicizzato per immobile; gli eventi dei ticket
sono stringhe. Blocco, ID card e prenotazione fanno parte dello stato demo
globale. Queste strutture mostrano i flussi e non devono diventare, per
inerzia, il modello dati del prodotto reale.

Per progettare una funzione operativa occorrono quindi relazioni personali e
temporali, contratti e periodi, file e versioni, eventi attribuiti, autorizzazioni
server e dati persistenti. La scelta di provider, framework e distribuzione
mobile rimane successiva alla definizione dei comportamenti richiesti.

## Temi già presenti prima della nuova conversazione

Lo studio v0.1 include già fascicolo documentale, tecnici di fiducia e memoria
interventi, consulenza annuale, piano immobiliare/investimento, utenze, prove
di bonifico, card fisica/digitale, segreteria fuori orario anche AI, 3D, altri
operatori/agenzie e predisposizione per futuri totem. Riprenderli nella nuova
conversazione può precisarne la forma o la priorità: non li rende tutti idee
inedite. La distinzione fra studio, documenti correnti e codice è necessaria.

Quote 50/15 euro, unità e periodicità, primo cliente pagante, territorio,
portafoglio pilota, budget, responsabilità e copertura non erano risolti.
PWA, pagamenti esterni iniziali e rinvio di 3D/AI erano proposte dello studio,
non scelte già confermate dai fondatori.

## Fonti lette

| Fonte | Utilità |
| --- | --- |
| `AGENTS.md`, `docs/progetto/PROSSIMA_SESSIONE.md` | Istruzioni, continuità e checkpoint |
| `README.md`, `PRODUCT.md`, `DESIGN.md`, `DEVELOPMENT.md` | Stato, prodotto, design e sviluppo |
| `docs/progetto/EECard-studio-v0.1.pdf` | Base funzionale e ipotesi precedenti |
| `docs/progetto/BACKLOG.md`, `SESSIONI.md` | Priorità e storia del lavoro |
| `docs/design/DECISIONI.md`, `DESIGN_SYSTEM.md`, `PERCORSI.md` | Scelte e percorsi |
| `docs/design/ANTEPRIME_WEB.md` | Ultima pubblicazione documentata |
| `src/App.tsx`, `src/data.ts`, `src/context.tsx` | Stato, fixture, navigazione e filtri |
| `src/pages.tsx`, `src/panels.tsx`, `src/components/ui.tsx` | Percorsi e simulazioni concrete |
| `tests/prototype.spec.ts`, `package.json` | Copertura delle verifiche e stack |
| GitHub: branch `main` e PR #4 | Commit analizzato e merge verificato |

Snapshot: https://github.com/av3rgfx/EECard/tree/4b77c0bd41d733c7a7680ad3d63d9a496424db64
PR integrata: https://github.com/av3rgfx/EECard/pull/4
