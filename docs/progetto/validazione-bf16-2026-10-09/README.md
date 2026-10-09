# EECard — ripresa BF16 e preparazione della raccolta

9 ottobre 2026. **BF16 resta aperto:** nei materiali disponibili non sono
presenti osservazioni umane da analizzare. Il kit BF02 è già pronto ed è
conservato integralmente; la ripresa aggiunge una guida alla raccolta e un
approfondimento preliminare BF03 indipendente dalle misure mancanti.

| Elaborato | Risultato e limite |
| --- | --- |
| [RACCOLTA.md](RACCOLTA.md) | Passaggi per il facilitatore, copie esterne, dati parziali, lettura dei risultati e limiti dell'analizzatore; usa il protocollo esistente |
| [CONTRATTI_PRELIMINARI.md](CONTRATTI_PRELIMINARI.md) | Comandi/letture PF01/PF02/PF05, matrice ammesso/negato e criteri futuri; proposta revisionabile, BF03 non completato |
| [Kit BF02](../prova-agenzia-2026-10-08/README.md) | Set A/B, materiali e modelli già consegnati; nessuna rigenerazione o nuova simulazione AI |
| [Specifiche](../specifiche-2026-10-08/README.md) | Fonte di requisiti EA/RF, percorsi PF, modello MD, dipendenze BF e decisioni DA; questo allegato non le sostituisce |

## Stato remoto e provenienza

Verificata prima del checkout la [PR #7](https://github.com/av3rgfx/EECard/pull/7):
integrata il **9 ottobre alle 23:19:16 UTC**, merge
`c77dfd482e683baeeb0ec825ac5d5755c56fa1bb`. Main clonato allo stesso commit,
albero pulito; nuovo branch `docs/bf16-raccolta-2026-10-09` secondo AGENTS.md.
La PR #6 era già integrata alle 08:18:43 UTC. I vecchi branch non sono riutilizzati.
Nessun merge eseguito dall'assistente.

Versione funzionale del kit: `bb2222c352fff0c69b6c4a8f63f5684cfa9ade01`;
`ca848e0` aggiorna soltanto il rapporto della sua consegna remota. I set hanno
schema 1: per una raccolta registrare anche commit, supporto e adattamenti,
non solo il numero di schema. Le specifiche derivano dal checkpoint `7d43ae8`.

Letti AGENTS, continuità e prompt corrente; prodotto, design, sviluppo,
backlog e decisioni; tutti gli elaborati funzionali, protocollo e rapporto
BF02, sorgente dello strumento e materiali pertinenti. Per l'approfondimento
BF03 consultati lo studio v0.1 §§3, 6, 8, 11–13 tramite DOCX, la provenienza
EA e i sorgenti pertinenti. Audio non allegato né riascoltato; PDF/DOCX e
sintesi storiche restano intatti. Le fonti web di FATTIBILITA non sono state
ricontrollate: mantengono data e limiti dell'8 ottobre.

## Osservazioni effettivamente disponibili

Ricognizione del 9 ottobre, sul main `c77dfd4` e nella sessione corrente:

| Fonte verificata | Evidenza disponibile | Conseguenza |
| --- | --- | --- |
| Modello `materiali/misure.csv` | 48 esecuzioni pianificate, tutte `non_eseguita`, nessuna osservazione | Nessun tempo, successo, risparmio o soglia BF16 calcolabile |
| Modello `materiali/costi.csv` | Cinque categorie senza valori | Costo non calcolabile; vuoto non significa zero |
| Repository, PR #6/#7 e issue | Solo kit e revisione simulata; nessun commento/review nelle due PR, nessuna issue presente al controllo | Nessuna osservazione umana trovata in queste fonti; non equivale ad assenza di prove svolte altrove |
| Materiali della sessione | Nessun allegato o sintesi di osservazioni; chiesto lo stato della raccolta, senza risposta utilizzabile alla consegna | Proseguire la guida e gli approfondimenti indipendenti, senza assumere risposte o misure |

L'analizzatore riporta: «Nessuna misura osservata. Successo, tempi, risparmio
e costi non stimabili». È un controllo sul modello, non una prova umana e
non una valutazione negativa del beneficio. Non esistono qui fallimenti o
successi reali da attribuire agli operatori.

R1 rimane ipotesi e perimetro della simulazione documentale. Non sono validate
la disponibilità a pagare, la difficoltà equivalente dei due set, le prestazioni
del frontend, le autorizzazioni server o la compatibilità hardware.

## Approfondimento indipendente e decisioni aperte

L'allegato BF03 rende revisionabili i confini di attivazione, contesto banco
e storico: quali dati richiedere, quali esiti restituire e quali casi negare.
Le prove descritte sono future; non sono eseguite da un backend inesistente.
BF03 dipende ancora da BF01 per l'ambito operativo e deve essere rivisto alla
luce di BF16. Verifica delle persone, accesso storico, conservazione, risorse
e condizioni richiedono definizioni esplicite prima di dati reali.

EECard provvisorio, C–Legame e direzione 0.3 conservati. Prezzi, primo pagante,
inclusioni, risorse e copertura restano aperti; 600 euro annui riguarda clienti
già gestiti. Jarvis, destinatari schermi e tipo di firma restano DA aperte:
non impediscono questa analisi documentale e non sono risolti per deduzione.
Nessun rinvio di pagamenti, app, 3D, AI o totem è approvato qui.

Permessi per rapporto/agenzia/oggetto, bollette private, revoca, fine rapporto
e fine adesione restano distinti. Upload, dichiarazione, verifica di incasso
e quietanza non si fondono; un parziale mantiene il residuo.

## Verifiche di questa ripresa

Comandi eseguiti dalla radice della repository:

```bash
python3 -B scripts/prova-agenzia.py --help
python3 -B scripts/prova-agenzia.py analyze --help
python3 -B scripts/prova-agenzia.py validate
python3 -B scripts/prova-agenzia.py analyze --measurements docs/progetto/prova-agenzia-2026-10-08/materiali/misure.csv
```

`validate` verifica la struttura del kit esistente; `analyze` rileva 48
pianificate e 0 osservate. Lettura del sorgente: le coppie temporali richiedono
esiti completi, corretti e senza aiuto in entrambe le condizioni; PF02/PF05
sono accorpati e i costi non vengono letti. La guida esplicita il controllo
manuale per percorso, operatore, aiuti/esclusioni e costi.

La consegna modifica **11 Markdown**, con **142 collegamenti locali/ancore**
controllati senza destinazioni mancanti e `git diff --check` pulito. Verificati
anche i riferimenti ai criteri PF/PT/MD e l'assenza di modifiche ai file del kit,
alle specifiche e ai sorgenti. Dettagli nel [registro di sessione](../SESSIONI.md).
La revisione indipendente ha distinto sessione personale e sessione operatore
nelle regole comuni e precisato il diniego dello storico altrui senza titolo
specifico: non è negata una delega esplicita valida. Queste precisazioni sono
applicate nell'allegato, senza alterare le specifiche principali.

Controlli riproducibili dopo il checkout della consegna:

```bash
git diff --check c77dfd482e683baeeb0ec825ac5d5755c56fa1bb..HEAD
git diff --name-only c77dfd482e683baeeb0ec825ac5d5755c56fa1bb..HEAD
git diff --exit-code c77dfd482e683baeeb0ec825ac5d5755c56fa1bb..HEAD -- src public tests scripts .openai package.json package-lock.json docs/progetto/prova-agenzia-2026-10-08 docs/progetto/specifiche-2026-10-08 docs/progetto/discussione-2026-10-07 docs/progetto/EECard-studio-v0.1.pdf docs/progetto/EECard-studio-v0.1.docx PRODUCT.md DESIGN.md
```

I 18 test Python passati l'8 ottobre restano storici: non sono rieseguiti.
Nessun nuovo test UI, build, audit, collaudo hardware/firma/AI o deploy. Non
sono generati nuovi set, pacchetti, CSV compilati o misure. Nessun servizio,
invito, ordine, pagamento, firma o dato cliente reale attivato/pubblicato.
L'ultima versione online documentata resta Sites v5, sorgente
`65ac9e092c17d9113d85106fa3d04fbb9770cab5`; live non ricollaudato.

## Prossima azione e consegna

Il facilitatore osserva il metodo corrente, registra le condizioni e usa i
pacchetti BF02 con due operatori secondo [RACCOLTA.md](RACCOLTA.md). Risposte e
costi individuali restano fuori repository. Alla disponibilità di evidenze,
controllare versione/copertura, analizzare separatamente PF01/PF02/PF05,
conservare fallimenti e mancanti, poi motivare correzioni e revisione BF03.
Una raccolta parziale non chiude BF16 o le sue soglie generali.

Consegna nella [PR #8](https://github.com/av3rgfx/EECard/pull/8), verificata
aperta e non in bozza, base main `c77dfd4`, branch
`docs/bf16-raccolta-2026-10-09`. Commit degli elaborati
`7cff9ff34fc3e619edf1187af6bdf4728c04aff1`, verificato uguale sul remoto e come
HEAD della PR. Il successivo commit registra soltanto questi riferimenti;
l'HEAD finale è consultabile nella PR. Nessun merge.
Dopo `git fetch origin`, confrontare `git rev-parse HEAD` con
`git rev-parse origin/docs/bf16-raccolta-2026-10-09` e verificare che
`git status --short` sia vuoto.
Per riprendere seguire [PROSSIMA_SESSIONE](../PROSSIMA_SESSIONE.md) e il
[prompt corrente](../PROMPT_NUOVA_SESSIONE.md), verificando prima lo stato remoto.
