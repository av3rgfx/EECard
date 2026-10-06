# Backlog di continuità EECard

Aggiornato il 6 ottobre 2026. Le priorità seguenti sono una proposta di sequenza, non un impegno di rilascio. Nessun responsabile, costo o data è stato assegnato.

## Completato nella sessione

| ID | Risultato | Evidenza |
| --- | --- | --- |
| D01 | Prototipo desktop/mobile per proprietario, inquilino, agenzia e tecnico | [Percorsi](../design/PERCORSI.md) e codice frontend |
| D02 | Design system, card e adattamenti delle risorse richieste | [Design system](../design/DESIGN_SYSTEM.md), [fonti](../design/FONTI.md) |
| D03 | Browser QA e correzioni per accessibilità, movimento, errori e dati limite | [Verifiche](../design/VERIFICHE.md): 15 test, 24 scansioni aggiuntive |
| D04 | Due anteprime web condivisibili e HTML autonomo | [Anteprime](../design/ANTEPRIME_WEB.md) |
| D05 | Documentazione per proseguire in più sessioni | PRODUCT.md, DESIGN.md, DEVELOPMENT.md e [punto di ripresa](PROSSIMA_SESSIONE.md) |

## Prossime attività proposte

| ID | Priorità proposta / stato | Attività | Criterio di completamento |
| --- | --- | --- | --- |
| N01 | Alta · simbolo scelto, revisione UI richiesta | Revisionare esecuzione visiva e quattro percorsi con l’utente; procedere con V01–V04 | Feedback registrato per schermata/percorso, decisioni accettate e cambiamenti richiesti distinti |
| N02 | Alta · da fare su hardware | Verificare iPhone/Safari, Android/Chrome e screen reader | Dispositivo/browser annotati; tastiera, safe area, zoom, rotazione, focus e annunci controllati; problemi riprodotti e corretti |
| N03 | Alta · in attesa di informazioni | Chiarire quote, primo cliente, zona, beneficio iniziale, copertura e risorse | Risposte con provenienza nel [registro decisioni](../design/DECISIONI.md); nessun numero dedotto dal prototipo |
| N04 | Dopo N01/N03 · da definire | Scegliere il perimetro del primo rilascio operativo | Percorso prioritario, esclusioni esplicite e criteri di accettazione concordati |
| N05 | Dopo N04 · da progettare | Definire architettura, dati e autorizzazioni reali | Contratti e stati per il percorso scelto; deleghe per immobile, revoca e conservazione chiarite |
| N06 | Dopo N05 · da implementare | Realizzare la prima funzionalità operativa completa | UI, server, dati, errori e test integrati secondo il perimetro scelto; demo separata dai dati reali |
| N07 | Quando cambia il frontend | Aggiornare QA, screenshot e anteprime | Report coerenti col commit e deploy verificato sul sito esistente |
| N08 | Con architettura reale · da valutare | Prestazioni, bundle e automatizzazione dei controlli | Misure e scelta motivata; nessuna CI o suddivisione del bundle aggiunta solo per supposizione |

Pagamenti integrati, app negli store, 3D, AI, card fisica e calendario dei consulenti restano questioni aperte: non sono automaticamente esclusi, promessi o pianificati.

## Come aggiornare

Mantenere gli ID stabili; collegare commit/PR e prove quando una voce è completata. Distinguere “da fare”, “in attesa di informazioni” e “completato”. A fine sessione descrivere qui il lavoro residuo concreto, senza lasciare “completato” un controllo invalidato da modifiche successive.

## Evoluzione identità — dalla proposta alla scelta

| ID | Stato | Attività / evidenza |
| --- | --- | --- |
| I01 | Completato | Rilettura contesto, PR #2 integrata, nuovo branch da main |
| I02 | Completato come proposta | Tre direzioni SVG, varianti colore/mono, prove piccole e [guida di studio](../design/LOGO_DIREZIONI.md) |
| I03 | Completato | Correzioni indipendenti: leggibilità, skip link, ricerca/focus, menu Altro, icona tessera; 17 test passati |
| I04 | Scelta simbolo completata; naming aperto | Utente: C Legame, nome ancora da confermare |
| I05 | Completato per il solo simbolo | Master regolare/ottico, varianti, favicon, guida e ZIP; nuova identità integrata in tutta la UI |
| I06 | Completato per l’identità senza nome | Nuova QA, screenshot, anteprime sul sito esistente e PR #3 aggiornata senza merge |

Le anteprime di questa prima tappa mantengono l’identità precedente nel frontend e aggiungono il confronto in `/identita/`; non sono la consegna definitiva del nuovo marchio.

## Residuo dopo C Legame

I01–I06 coprono il lavoro autorizzato sul simbolo e sull’identità visiva. Restano: conferma del nome e solo dopo composizione del wordmark; feedback sui dettagli esecutivi della palette/UI; verifiche hardware N02 e decisioni commerciali N03–N06 già aperte. Non riaprire il confronto A/B/C salvo nuova richiesta dell’utente. Il testo sopra sulla “prima tappa” descrive il checkpoint storico, non lo stato corrente.

## Prossima sessione — qualità grafica e tessera protagonista

| ID | Stato | Attività / criterio |
| --- | --- | --- |
| V00 | Completato, sola analisi | [Revisione](../design/REVISIONE_VISIVA.md), misure home 390/1440, proposte UX/movimento, prompt e punto di ripresa aggiornati; frontend invariato |
| V01 | Priorità confermata · da proporre | Presentare 2–3 esempi ad alta fedeltà, home desktop/mobile con tessera prima, dettaglio card, processo esistente, demo animata e variante ridotta; stessa base dati, area separata dal prodotto |
| V02 | In attesa della presentazione e della scelta | Raccogliere conferma o modifiche dell’utente; nessuna implementazione globale prima della scelta |
| V03 | Dopo V02 · non autorizzato prima della scelta | Integrare la direzione approvata: composizione, materiali, immagini, tipografia, gerarchie e movimento utile; preservare flussi e stati |
| V04 | Dopo V03 | QA pertinente, screenshot e stesso Sites aggiornati; documentare sorgente online, commit remoto e PR senza merge |

La posizione prioritaria della tessera è confermata; Materia e luce, Editoriale e architettura, Luce e profondità sono solo proposte. Il nome resta aperto. V01–V04 sono il prossimo obiettivo, non N03–N06 o un’estensione del perimetro operativo.
