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
| N01 | Alta · da fare | Revisionare identità e quattro percorsi con l’utente | Feedback registrato per schermata/percorso, decisioni accettate e cambiamenti richiesti distinti |
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
