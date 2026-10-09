# EECard — punto di ripresa

Aggiornato il 9 ottobre 2026 alla ripresa BF16. Repository unica:
https://github.com/av3rgfx/EECard.

Il [prompt riutilizzabile](PROMPT_NUOVA_SESSIONE.md) avvia la prossima sessione
da questo stato. La ripresa non autorizza nuovi servizi o un rilascio operativo.

## Obiettivo e risultato corrente

L'utente ha chiesto di proseguire studio e preparazione dello sviluppo partendo
dalla consegna EA01–EA30, senza rifare l'analisi né attivare servizi reali.
Dopo la consegna delle specifiche, l'utente ha risposto «ok bene procedi» alla
proposta di provare attivazione → banco → recupero storico. È stato preparato il
[kit BF02](prova-agenzia-2026-10-08/README.md): due set equivalenti, materiali
operatore/facilitatore, schede per 48 esecuzioni e strumenti locali di controllo.
R1 è il perimetro della prova; non sono dedotti prezzi o lancio operativo.
Esiti e limiti della revisione simulata sono in
[ESITO_SIMULAZIONE.md](prova-agenzia-2026-10-08/ESITO_SIMULAZIONE.md).

La [ripresa BF16](validazione-bf16-2026-10-09/README.md) aggiunge una
[guida alla raccolta](validazione-bf16-2026-10-09/RACCOLTA.md) e un
[approfondimento preliminare BF03](validazione-bf16-2026-10-09/CONTRATTI_PRELIMINARI.md).
Nei materiali consultati non sono disponibili osservazioni umane: modello
ancora vuoto, nessun risultato BF16 ricavato dai controlli documentali.
Il kit BF02 non è stato rifatto. I contratti restano proposte subordinate al
perimetro BF01 e da riesaminare con BF16, senza backend o servizi reali.

La [specifica incrementale](specifiche-2026-10-08/README.md) contiene:

- [30 requisiti RF collegati agli EA, proposte IF e decisioni aperte DA](specifiche-2026-10-08/REQUISITI_DECISIONI.md).
- [Offerte clienti/agenzie, proposta R1, alternative, backlog BF e prova in agenzia](specifiche-2026-10-08/OFFERTE_RILASCIO.md).
- [Sei percorsi PF con criteri di accettazione](specifiche-2026-10-08/PERCORSI.md): attivazione, banco, casa propria/locata, bolletta, documento storico, bozza contrattuale.
- [Modello logico dei dati e degli accessi](specifiche-2026-10-08/MODELLO_DATI.md).
- [Fattibilità documentata e prove wallet, terminale, firma e AI](specifiche-2026-10-08/FATTIBILITA.md).
- [Verifiche della consegna](specifiche-2026-10-08/VERIFICHE.md).

Le specifiche sono proposte revisionabili. Il primo rilascio raccomandato parte
da fascicolo e continuità al banco per i clienti dell'agenzia; primo pagante,
perimetro commerciale, risorse e tempi non sono approvati. Le alternative B2B e
hardware completo restano concrete opzioni con dipendenze diverse.

## Stato remoto e branch

La [PR #7](https://github.com/av3rgfx/EECard/pull/7), chiusura documentale,
è **integrata il 9 ottobre 2026 alle 23:19:16 UTC**. Main verificato e clonato:
`c77dfd482e683baeeb0ec825ac5d5755c56fa1bb`. Da questa base pulita è stato
creato `docs/bf16-raccolta-2026-10-09` per raccolta BF16 e approfondimenti
indipendenti. Il vecchio branch `docs/chiusura-sessione-2026-10-09` non è
riutilizzato. Nessun merge eseguito dall'assistente.
Consegna corrente nella [PR #8](https://github.com/av3rgfx/EECard/pull/8),
aperta e non in bozza. Elaborati al commit `7cff9ff`, verificato sul remoto;
il successivo commit registra i riferimenti della PR. Controlli nel
[rapporto BF16](validazione-bf16-2026-10-09/README.md). Verificare lo stato
della PR prima di riprendere, riutilizzandola se aperta per la stessa consegna.

La [PR #6](https://github.com/av3rgfx/EECard/pull/6), specifiche e kit,
era già integrata il 9 ottobre alle 08:18:43 UTC in `3532eab`.
Checkpoint della chiusura PR #7: elaborati `84c876e`, HEAD `f53eb12`,
merge `c77dfd4`. Questi riferimenti documentano la provenienza.

Checkpoint conservati: specifiche `7d43ae8`, kit `bb2222c`, metadati finali
`ca848e0` (ultimo HEAD della PR #6). La PR #5 era già integrata l'8 ottobre
alle 19:32:22 UTC. I rapporti datati dell'8 ottobre che descrivono PR #6 aperta
sono evidenze storiche, non istruzioni per riutilizzare oggi il vecchio branch.

Prima di riprendere controllare il remoto: se la PR di questa consegna è ancora
aperta, riutilizzarla; dopo il merge partire dal main aggiornato e da un nuovo
branch. I riferimenti a PR #4/#5/#6 aperte nei registri storici descrivono checkpoint
superati e non devono guidare il checkout.

## Ordine di lettura

1. AGENTS.md e questo file.
2. PRODUCT.md, DESIGN.md, DEVELOPMENT.md, [BACKLOG.md](BACKLOG.md) e
   [DECISIONI.md](../design/DECISIONI.md).
3. Tutti gli elaborati delle specifiche funzionali elencati sopra.
4. Kit BF02: README, PROTOCOLLO ed ESITO_SIMULAZIONE; set e chiave solo per la
   preparazione del facilitatore, senza mostrarli agli operatori della prova.
5. Ripresa BF16: [rapporto](validazione-bf16-2026-10-09/README.md),
   [raccolta](validazione-bf16-2026-10-09/RACCOLTA.md) e
   [contratti preliminari](validazione-bf16-2026-10-09/CONTRATTI_PRELIMINARI.md).
6. [Cartella della conversazione](discussione-2026-10-07/README.md) per origine
   e timestamp degli EA; studio v0.1 §§3, 6, 8, 11–13 e sorgenti pertinenti
   prima di progettare o implementare ulteriori cambiamenti. Il prompt in
   quella cartella è storico; quello corrente è collegato in apertura.

La registrazione non è stata riascoltata in questa ripresa: non era allegata.
Sono state usate le sintesi della consegna, senza risolvere cifre o parole ambigue.
Lo studio v0.1 PDF/DOCX e l'analisi originaria restano intatti come fonti storiche.

## Decisioni da conservare

EECard provvisorio; C–Legame è il simbolo scelto, non il nome del prodotto.
Direzione 0.3: tessera/materiali di Materia e luce, composizione aperta di Editoriale
e architettura, bruno/albicocca/avorio. Tessera dominante nella home personale;
agenzia con coda operativa e tecnico con incarichi. Compattare gli immobili solo
in home con più risultati effettivamente visibili; singolo risultato e pagina
immobili espansi. EA30 confronta criteri per bianco/rosso, non cambia palette.

Documento caricato, pagamento dichiarato, incasso verificato e quietanza sono
eventi distinti; il parziale mantiene il residuo. Permessi per rapporto, immobile,
contratto, intestazione, delega e incarico. Piano commerciale e card non danno
accesso alle bollette dell'inquilino. Fine rapporto, fine adesione e revoca card
sono eventi separati. Nessun account universale “proprietario amministratore”.

## Decisioni aperte e prossima attività concreta

Sono state poste due domande raggruppate: beneficio/primo pagante; natura di
Jarvis, destinatari degli schermi e documenti da firmare. La prima consegna
non registrava risposte: IF01 e IF04 erano ipotesi, non assensi impliciti.
Il successivo «ok bene procedi» autorizza l'avanzamento della prova proposta.
Non specifica primo pagante, prezzi, schermi, firma o Jarvis: questi dettagli
restano aperti; non occorre richiederli per eseguire i casi indipendenti.

Quote, unità, IVA e inclusioni restano aperte. I 600 euro annui riguardano alcuni
clienti già gestiti; 50/15 e le cifre instabili del nuovo audio non sono listini.
Territorio, volume, team, budget, copertura e responsabilità devono essere definiti
per il lancio. Nessun rinvio di pagamenti, app, 3D, AI o totem è già approvato.

**Prossima attività:** il facilitatore osserva e descrive il processo corrente
reale, registra versione del kit, supporto, ordine, limite per caso e soglie
proposte concordate prima delle misure. Usa la [guida](validazione-bf16-2026-10-09/RACCOLTA.md)
e il [protocollo esistente](prova-agenzia-2026-10-08/PROTOCOLLO.md) con OP01,
OP02 e copie dei materiali già pronti fuori repository. Ripartire da
attivazione PF01, ritorno PF02 e recupero storico PF05 mantenendo assegnazioni
e ordine registrati; una raccolta limitata a questi percorsi è parziale
rispetto alle 48 esecuzioni del protocollo. Non mostrare chiavi/JSON agli operatori.

Se arrivano osservazioni, verificare commit/versione, eventuali adattamenti e
completezza prima dell'analisi. Conservare risposte, fallimenti, aiuti,
abbandoni ed esclusioni; vuoto non equivale a zero. Lasciare tutte le 48 righe
pianificate nelle copie CSV, con `non_eseguita` per i casi non osservati.
L'analizzatore descrive i dati ma non calcola costi né separa PF02 da PF05:
la guida indica le verifiche manuali e il contenuto della sintesi anonima.
Non pubblicare risposte grezze o costi individuali nel repository.

Il controllo di questa ripresa trova 48 pianificate e 0 osservate nel modello;
non è una prova che l'agenzia non abbia raccolto dati altrove. Nessuna risposta
con osservazioni è disponibile nella sessione alla consegna. BF16 resta aperto:
non sono stimabili tempi umani, risparmi, costi o disponibilità a pagare.
La revisione AI non dimostra autorizzazioni server.

L'[allegato BF03](validazione-bf16-2026-10-09/CONTRATTI_PRELIMINARI.md) permette
una revisione documentale indipendente di azioni, oggetti, permessi, revoche,
retry e versioni. Non chiude BF03: l'ambito operativo dipende da BF01,
le correzioni di processo dai riscontri BF16; storico/conservazione, verifica
delle persone e scelte tecniche richiedono definizioni esplicite. Prima dei
dati reali servono comunque implementazioni e condizioni operative verificate.
Le decisioni su listino/hardware non bloccano la simulazione documentale.

## Prototipo, verifiche e anteprime

Frontend React/TypeScript/Vite, fixture e localStorage; nessun backend, account,
archivio server, pagamento, NFC/wallet, firma, domotica o AI operativo.
Le specifiche iniziali modificavano solo Markdown. Il kit successivo aggiunge
dati sintetici JSON, pacchetti Markdown, modelli CSV e strumenti Python locali
con verifiche mirate. Non cambia il frontend: nessun nuovo test UI, collaudo
hardware o deploy. Per risultati effettivi leggere ESITO_SIMULAZIONE del kit.

Ultima versione pubblicata documentata: Sites v5, 6 ottobre alle 14:18:39 UTC,
sorgente `65ac9e092c17d9113d85106fa3d04fbb9770cab5`.
[Desktop](https://eecard-design-preview.uepacio.chatgpt.site/desktop/) ·
[Mobile](https://eecard-design-preview.uepacio.chatgpt.site/mobile/).
La versione live non è stata ricollaudata in questa ripresa. Le prove frontend
precedenti restano datate in VERIFICHE.md del design; non sono state rieseguite.

Non pubblicare audio, trascrizione integrale, dati personali o documenti reali.

## Verifiche della ripresa

Questa ripresa modifica solo Markdown. Eseguiti controllo strutturale `validate`
e analisi del modello vuoto; nessuna rigenerazione del kit o misura umana.
I 18 test del kit passati l'8 ottobre e le verifiche frontend precedenti restano
storici: non sono stati rieseguiti. Collegamenti, coerenza, diff e consegna remota
sono nel [rapporto BF16](validazione-bf16-2026-10-09/README.md) e nel
[registro di sessione](SESSIONI.md).
