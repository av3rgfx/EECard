# Registro delle sessioni EECard

Questo registro conserva i risultati e le decisioni utili alla continuità. Stato operativo corrente in [PROSSIMA_SESSIONE.md](PROSSIMA_SESSIONE.md); attività residue in [BACKLOG.md](BACKLOG.md).

## 6 ottobre 2026 — studio e handoff documentale

[PR #1](https://github.com/av3rgfx/EECard/pull/1) integrata alle 08:48:11 UTC. Studio preliminare v0.1 PDF/DOCX, istruzioni della repository, risorse e brief di design. La documentazione non approvava prezzi, copertura o architettura di produzione.

## 6 ottobre 2026 — design e prototipo

Branch `design/eecard-premium-prototype`, creato dal main aggiornato dopo PR #1. Commit iniziale del prototipo sul remoto: `7621eb7128902a773b584154fd6dcb904976d1c7`.

Consegnati frontend React/TypeScript, identità EECard, design system, 12 rotte, percorsi per quattro ruoli, stati limite, anteprima autonoma e 22 screenshot. Applicate le sette skill Emil richieste e gli adattamenti Animate UI/Rare UI. Ambiguità `transition.dev`/`transitions.dev` e licenze documentate in [FONTI.md](../design/FONTI.md).

Verifiche: build e formattazione passate, 15 test Playwright passati, 24 scansioni axe aggiuntive senza violazioni; correzioni di contrasto, dialoghi, card con nomi lunghi e gestione dell’incasso parziale. Limiti hardware e prodotto reale documentati. Aperta [PR #2](https://github.com/av3rgfx/EECard/pull/2) in bozza.

## 6 ottobre 2026 — anteprime condivisibili

Richiesta dell’utente: link separati desktop e mobile. Commit pubblicato: `ae371274031ef53c1adcad8d051cc00367dd741d`.

Pubblicazione Sites completata con successo, accesso pubblico via link. Desktop ampio e mobile 390 px da computer; su smartphone apertura diretta a larghezza piena. Quattro combinazioni di viewport verificate con navigazione riuscita e zero errori JavaScript. [Link e rigenerazione](../design/ANTEPRIME_WEB.md).

GitHub Pages non attivato per limiti dell’integrazione; il branch temporaneo di pubblicazione è stato rimosso. Sorgenti e documentazione restano in EECard. Nessun deploy automatico configurato.

## 6 ottobre 2026 — chiusura e continuità

Richiesta dell’utente: salvare tutto, aggiornare i Markdown, aggiungere documenti prodotto/design utili alle sessioni successive e consegnare una PR.

Aggiunti PRODUCT.md, DESIGN.md, DEVELOPMENT.md, backlog e questo registro; riscritti il punto di ripresa e le istruzioni stale di AGENTS.md. README, decisioni e registro della versione online allineati. La PR #2 viene riutilizzata per la stessa consegna e resa pronta alla revisione; nessun merge richiesto.

Questa chiusura modifica solo documentazione: controllati collegamenti locali e diff; test frontend e deployment non ripetuti. La versione online resta il commit precedente sopra indicato. Non sono state prese nuove decisioni commerciali, di design finale o architettura di produzione.

## 6 ottobre 2026 — evoluzione identità, confronto e correzioni indipendenti

PR #2 verificata integrata; branch `design/visual-identity-evolution` creato da main aggiornato. Nuovo contesto confermato: ƎE è il marchio dell’agenzia Enrico Erca, EECard provvisorio, prodotto autonomo per altre agenzie; nessun nome confermato.

Preparati A Soglia, B Casa accolta, C Legame: 12 SVG di studio, colori/monocromia e prove 16/24/32 px, guida, contrasti, tavole e pagina confronto. Chiesta la scelta e il nome prima della finalizzazione. La nuova identità non è stata applicata per silenzio-assenso.

Corrette leggibilità, gerarchia mobile, skip link che cambiava rotta, ricerca/focus, indicatore Altro, icona tessera e scansione Vite dell’HTML generato. Skill Emil recuperate e applicate; licenze conservate. Build e formattazione passate, 17 test passati, 24 scansioni axe senza violazioni; 3 viewport per confronto logo senza overflow/violazioni. Nessuna prova fisica.

Documenti di prodotto/design/sviluppo, decisioni, backlog e punto di ripresa aggiornati. Questa prima tappa è reviewable; asset definitivi, favicon e nuova palette globale restano dipendenti dalla scelta dell’utente. Pubblicazione sul sito esistente e PR registrate in ANTEPRIME_WEB.md e nel punto di ripresa.

Prima tappa salvata sul remoto nella [PR #3](https://github.com/av3rgfx/EECard/pull/3), aperta e non in bozza; nessun merge. Sites versione 2 pubblicata con successo dal commit `6b0f0312070308c9561fe2b448fc19edec816d60`. Il trasporto GitHub push ha restituito 401: usata l’API Git autenticata per caricare blob/albero e ricreare il medesimo commit (SHA verificato), poi creare il branch e la PR. La successiva chiusura è solo documentale, senza nuovo deploy o ripetizione dei test UI.

## 6 ottobre 2026 — C Legame scelto, simbolo finalizzato e integrazione

L’utente sceglie «il logo C Legame» e conferma che «il nome rimane ancora da confermare». Riutilizzati branch e PR #3 ancora aperta. Finalizzato il solo simbolo: regolare e ottico, quattro colori, favicon e guida/ZIP; fonte comune per React e SVG. “Legame” non è adottato come nome del prodotto.

Integrati simbolo, palette albicocca/bruno/avorio/terracotta, superfici, card, navigazione, componenti e design system. Manrope locale mantenuto; logo precedente EE rimosso dalla UI. Stati operativi e flussi preservati. Tutti i test della nuova identità passati (18), 24 scansioni axe senza violazioni; guida, download e anteprime statiche verificati. Microtesto e margini interni card corretti dopo controllo visivo; nessuna nuova animazione. Nessuna prova hardware dichiarata.

Aggiornati screenshot e documentazione corrente; confronto iniziale conservato come archivio. Anteprime aggiornate sullo stesso sito, identità e accesso conservati; commit pubblicato e versione registrati in ANTEPRIME_WEB.md. PR #3 aggiornata, senza merge. Il naming resta l’unica decisione necessaria per il futuro marchio testuale.

Consegna pubblicata: Sites **v3**, stato `succeeded` alle 11:21:23 UTC, sorgente `d0bcbaecf4a208225fb0788070fc90e90fbf4551`. Lo stesso commit è sul branch GitHub della PR #3; il successivo commit documentale registra la consegna. Nessun test UI ripetuto per questa sola registrazione.

## 6 ottobre 2026 — chiusura, critica visiva e preparazione della prossima iterazione

L’utente richiede una qualità grafica più elevata e dinamica, soluzioni UX visive per i processi e tessera subito protagonista all’accesso. Impone esempi concreti prima di modificare il prodotto, seguiti dalla sua conferma o richiesta di modifiche. Registrati C11–C13; le tre direzioni P09 restano proposte.

Esaminati screenshot esistenti e codice; misurata la home in Chromium a 390×844 e 1440×1000. La tessera mobile inizia a y 782 px: non è interamente visibile al primo accesso. Analisi e proposte in REVISIONE_VISIVA.md, skill Emil find-animation-opportunities letta e applicata in sola analisi. Aggiornati prompt, punto di ripresa, backlog, decisioni e documenti di orientamento, correggendo anche riferimenti obsoleti a PR #2 e monogramma.

Nessuna modifica al frontend, agli asset o alle anteprime; nessuna nuova esecuzione della suite UI/axe. Controllati diff e collegamenti Markdown. Sites resta v3 dal commit d0bcbaecf4a208225fb0788070fc90e90fbf4551. Riutilizzata la PR #3 aperta per la medesima consegna, con commit documentale sul remoto; nessun merge. Prossimo passo: esempi ad alta fedeltà e scelta, non redesign automatico.

## 6 ottobre 2026 — tre direzioni concrete prima dell’integrazione

Verificata PR #3 integrata alle 11:44:41 UTC, clone aggiornato di main `ed3a473`, nuovo branch `design/visual-directions-lab`. Riletti documenti richiesti e recuperate skill Emil dallo snapshot ufficiale `e8a175de22ae1e49370fc144c1f3bb9aeedf988d`. Misurata la home originale a 390: tessera y782,20–1022,20 px.

Realizzato `design-lab/`, senza modifiche al frontend corrente: tre composizioni Materia e luce / Editoriale e architettura / Luce e profondità. Stessi dati e simbolo, home desktop/mobile, dettaglio tessera, blocco e sostituzione, nome lungo, processo affitto con quattro eventi, attori espliciti, fonte obbligatoria, errore/riprova, parziale/residuo e quietanza. Demo animata interruptible, controllo manuale e preferenza OS reduced motion. Raccomandata Materia e luce, scelta non ancora ricevuta.

Typecheck/build del laboratorio, 27 combinazioni axe senza violazioni, controlli geometrici e interazioni, 18 screenshot e anteprima HTML autonoma offline. Corrette leggibilità, layout 320/testo200%, focus e retarget del movimento. [Consegna, skill e limiti](../design/esplorazioni/README.md). Chromium emulato, nessuna prova fisica. Suite del prodotto non ripetuta perché invariato.

Attesa della scelta richiesta dall’utente: nessuna integrazione, pubblicazione Sites, push remoto o PR anticipati. Sites resta v3. Il lavoro è salvato nel checkout condiviso; la consegna interattiva è un HTML autonomo apribile nel browser.


## 6 ottobre 2026 — scelta Materia e pagine aperte, integrazione

L’utente sceglie l’opzione1 Materia, rifiutando l’eccesso di card contenitore e indicando la composizione di Editoriale nello screenshot del processo. Questo soddisfa il gate esplicito degli esempi e autorizza la fase successiva già richiesta. Branch corrente `design/visual-directions-lab`, dopo PR #3 integrata; nessun merge eseguito.

Integrate home con tessera prima nel DOM, materiali bruni, gerarchia e immagini più ampie; sezioni e liste aperte in tutte le aree. Affitto con componente condivisa derivata dai cinque stati esistenti, fase e prossima azione, focus dopo sostituzione del form; movimento locale160ms, reduced120ms opacity, tastiera0. L’agenzia non vede più la tessera personale del proprietario via Home/Card; tecnico e altri permessi conservati. Nessuna modifica a fixture/persistenza, prezzi, servizi o licenze.

Verifiche browser, screenshot, HTML e anteprime rigenerati; test e correzioni zoom in VERIFICHE.md, motion in verifiche-materia-movimento.json. Documentazione corrente aggiornata e confronto preliminare conservato come archivio. Pubblicazione sul medesimo Sites e salvataggio remoto/PR registrati nella chiusura sotto.

Chiusura verificata: 19 E2E passati in 26,9 s, 24 scansioni axe senza violazioni, 9 casi a 320 px/testo 200% senza overflow dopo fix; build/format, 22 screenshot, quattro anteprime statiche e HTML offline verificati. Sites v4 `succeeded` alle 13:48:10 UTC dal commit `eea7a954c36607baffdbac82797466cdb329e435`. [PR #4](https://github.com/av3rgfx/EECard/pull/4) aperta e pronta alla revisione, senza merge. Sorgente GitHub salvata via API Git poiché il trasporto diretto non disponeva di credenziali; verificata identità dell’albero e allineato il clone al commit remoto. Il commit successivo registra soltanto questa chiusura, senza nuovi test frontend o deploy.


## 6 ottobre 2026 — immobili più compatti solo nella home multipla

L’utente prima precisa che le card sono accettabili per oggetti come gli immobili, poi conferma di preferire la nuova esecuzione aperta. La richiesta finale è ridurre lo spazio occupato dalle case **solo in home quando sono più di una**, mantenendo una casa singola e la pagina «Vedi immobili» espanse. Nessun ripristino delle card è stato applicato.

PR #4 verificata aperta: riutilizzati branch e PR esistenti. Implementato modificatore CSS locale alla home, derivato dagli immobili visibili nel contesto attuale. Fotografia laterale di dimensione contenuta, titolo/indirizzo/metadati completi; pagina immobili e funzioni invariate. Documentazione e screenshot aggiornati; esito dei controlli mirati e della pubblicazione nei rispettivi rapporti. Nessuna nuova animazione o modifica ai flussi di pagamento.

Controlli mirati: 6 test layout/axe/stress/home passati (15,6 s), più verifica browser di lista multipla, singola, filtro, ruolo inquilino, stato vuoto, pagina immobili e dettaglio. Corretto un titolo lungo a 320 px/testo 200%; il controllo mirato successivo passa senza overflow. Quattro anteprime statiche e HTML offline collaudati; build e formattazione passate. Nessuna ripetizione dei test dei flussi operativi invariati.

Pubblicazione confermata: Sites **v5**, `succeeded` alle 14:18:39 UTC, sorgente `65ac9e092c17d9113d85106fa3d04fbb9770cab5`. Stesso sito e pubblico, PR #4 aggiornata senza merge. Il successivo commit documentale registra il deploy e lascia invariata la build; nessuna nuova esecuzione dei test per la sola registrazione.


## 6 ottobre 2026 — chiusura della sessione e consegna PR

L’utente conclude la sessione e chiede di salvare tutto, aggiornare i Markdown e preparare una PR. Verificati checkout pulito e corrispondenza con il remoto; la PR #4 risulta già aperta, non in bozza e pronta alla revisione. Riutilizzata per la stessa consegna, senza creare duplicati e senza merge.

Allineati punto di ripresa e backlog alla conclusione: rimosse le istruzioni obsolete di procedere con V01–V04, già completati. Decisioni, design system, rapporti, screenshot e artefatti risultano già aggiornati alle ultime richieste. Nessuna nuova modifica al prodotto; controlli documentali e diff, senza ripetere test frontend o pubblicazione. Sites resta v5 dal commit `65ac9e092c17d9113d85106fa3d04fbb9770cab5`.

## 8 ottobre 2026 - analisi della nuova conversazione dei fondatori

Richiesta: analizzare l'intera registrazione del 7 ottobre, leggere il repository,
schematizzare tutte le idee nuove/migliorie e preparare file e prompt per una
nuova sessione di studio/progettazione/sviluppo.

Verificati main `4b77c0bd41d733c7a7680ad3d63d9a496424db64` e PR #4 integrata il
7 ottobre alle 22:13:57 UTC. Nuovo branch `docs/discussione-2026-10-07`.
Letti istruzioni, studio v0.1 completo, documenti di progetto/design/sviluppo,
registri, percorsi e sorgenti pertinenti. Registrazione 28:25 elaborata con
trascrizione automatica locale integrale e controlli mirati con un secondo
modello; cifre e parole non stabili mantenute come incertezze.

Preparati [catalogo EA01-EA30, contesto e prompt](discussione-2026-10-07/README.md).
Nuovi input principali: attivazione al contratto, banco con lettore/due schermi
e firma proposta, wallet, partner con card personalizzate, funzioni domestiche
del proprietario, bollette QR/importo, domotica, fascicolo storico, lavori,
clienti già gestiti, AI con contesto e bozze contrattuali, spunto bianco/rosso.
Verificate fonti ufficiali Apple/Google per la distinzione pass/lettura NFC;
nessun componente scelto o prova hardware eseguita.

Allineati prodotto, design, sviluppo, decisioni, backlog e punto di ripresa.
Studio v0.1 conservato, naming/perimetro/prezzi aperti, scelte visive 0.3
conservate. Audio e trascrizione integrale non pubblicati nella repository.
Consegna documentale nella [PR #5](https://github.com/av3rgfx/EECard/pull/5),
aperta e non in bozza, con 14 file Markdown sul nuovo branch e senza merge;
nessuna modifica
a frontend, dati, asset o sito. Verifiche documentali e degli artefatti di
consegna; nessun nuovo test UI o deploy. Sites v5 resta l'ultima versione
documentata dal commit sopra indicato.

Chiusura: collegamenti locali e diff verificati, tutti i 30 ID presenti nel
rapporto; PDF di 10 pagine controllato visivamente. Il pacchetto per la nuova
sessione comprende analisi, contesto, prompt e trascrizione automatica separata.
Il salvataggio remoto è verificato confrontando l'albero Git con i file locali.


## 8 ottobre 2026 — ripresa funzionale e preparazione dello sviluppo

Richiesta: partire dalla consegna EA01–EA30, aggiornare requisiti e decisioni,
definire offerte senza prezzi, sei percorsi, rilascio motivato, dati, backlog e
fattibilità mirata. Risposta e documentazione in italiano; nessun servizio reale.

Verificato remoto prima del branch: PR #5 integrata alle 19:32:22 UTC, main
`a8e0ca7a0641685462ac209c1570ef421631c121`. Creato
`docs/specifiche-funzionali-2026-10-08`. Letti istruzioni, intera consegna del
7 ottobre, documenti correnti, sezioni pertinenti dello studio e sorgenti.
Nessun riascolto dell'audio, non allegato a questa sessione.

Prodotti [specifiche incrementali](specifiche-2026-10-08/README.md): registro
RF01–RF30/EA, proposte IF e decisioni DA, offerte clienti e agenzie, percorsi
PF01–PF06 con criteri, modello logico, proposta R1 con alternative e backlog
BF01–BF18. R1 raccomanda fascicolo/attivazione/continuità al banco, senza
attribuire ai fondatori la scelta del primo pagante o le esclusioni proposte.

Ricerca mirata su fonti primarie per wallet/contactless, terminale, firma e AI;
protocolli FT01–FT08, senza integrazioni o collaudi effettivi. Il contenuto AgID
non accessibile (403) è indicato come non verificato; i livelli di firma sono
riportati dalle norme consultate. Non scelti hardware, firma o provider.

Poste due domande raggruppate su beneficio e Jarvis/schermi/atti; nessuna risposta
registrata durante la preparazione. Le ipotesi non diventano conferme. Prezzi,
quote, 600 euro riferiti a clienti già gestiti e cifre ambigue conservati aperti;
C–Legame e 0.3 invariati. EA30 ha un confronto di criteri, nessun redesign.

Aggiornati AGENTS, README, prodotto, design, sviluppo, decisioni, backlog e
punto di ripresa. Studio v0.1 e fonte EA conservati; solo Markdown modificati.
Verifiche e consegna remota in
[VERIFICHE.md](specifiche-2026-10-08/VERIFICHE.md). Nessun test UI, prova fisica,
servizio o deploy attribuito a questa sessione; Sites v5 resta l'ultima
pubblicazione documentata. Nessun merge eseguito.


Chiusura remota della ripresa: [PR #6](https://github.com/av3rgfx/EECard/pull/6)
aperta e non in bozza, senza merge; commit elaborati
`7d43ae82e9f91b13f13dfc0aaea9a92a641ceb0c` verificato sul remoto. Controllati
16 Markdown, 171 collegamenti locali/ancore, 30 RF/EA, 6 PF, 54 criteri AC,
18 BF senza cicli espliciti e 8 FT; diff pulito e fonti/sorgenti invariati.
Revisione indipendente applicata: storico legittimo distinto da permessi
operativi scaduti, identificazione banco inizialmente non confermata e
visualizzazione documento distinta dalla persistenza nella sessione schermo.
Il commit di chiusura aggiorna solo metadati e collegamenti della consegna.

## 8 ottobre 2026 — kit della prova in agenzia

L'utente risponde «ok bene procedi» alla proposta di prova guidata del nucleo
attivazione → banco → recupero storico. Verificata PR #6 ancora aperta e base
remota `dc1a536`, riutilizzati branch e PR secondo AGENTS; nessun merge.

Preparato [kit BF02](prova-agenzia-2026-10-08/README.md): due set da dodici casi,
144 evidenze sintetiche, quattro pacchetti per operatori, chiave facilitatore,
modelli per 48 esecuzioni e cinque categorie di costo. Aggiunti strumenti
Python locali di validazione, generazione senza sovrascrittura e analisi con
separazione di dati mancanti, fallimenti, aiuti e sottogruppi di percorso.

Revisione simulata con due letture AI separate e controllo indipendente degli
strumenti. Corretti indizi involontari in ordine/titoli, ambito della copia
in S05 e referente in S11; chiarita la sequenza online/offline in S06.
Rilettura mirata dei casi B modificati. Dettagli, limiti e comandi in
[ESITO_SIMULAZIONE.md](prova-agenzia-2026-10-08/ESITO_SIMULAZIONE.md).
Le letture AI non sono prove con operatori: nessun tempo o risparmio inventato.

Validazione di 24 casi/dodici coppie e 18 test dello strumento passati. Modelli
con 48 righe `non_eseguita`, nessuna osservazione e nessun costo; generazione
deterministica verificata. Aggiornati continuità, decisioni, prodotto, sviluppo
e backlog. BF02 preparato, BF16 aperto. R1 è il perimetro della prova;
prezzi, primo pagante, hardware, firma e Jarvis restano aperti.

Nessuna modifica a frontend, fixture, asset o hosting; nessun nuovo test UI,
deploy o integrazione. Prossimo risultato: osservazioni reali del protocollo
con due operatori e facilitatore, senza dati personali nella repository.

Chiusura dei controlli della continuazione rispetto a `dc1a536`: 26 file,
19 Markdown e 285 collegamenti locali/ancore validi; diff senza errori.
Ricontrollati anche 30 RF/EA, sei PF, 54 criteri, 18 BF senza cicli e otto FT.
PR #6 ancora aperta, non in bozza, verificata prima del salvataggio remoto.
Commit del kit `bb2222c352fff0c69b6c4a8f63f5684cfa9ade01` salvato e verificato
uguale sul branch remoto e sulla PR. Nessun merge o deploy; la chiusura
successiva contiene soltanto questi metadati.

## 9 ottobre 2026 — chiusura e prompt della prossima sessione

L'utente conclude la sessione e chiede salvataggio, aggiornamento Markdown,
prompt per la ripresa e PR. Verificato remoto prima del branch: PR #6 integrata
il 9 ottobre alle 08:18:43 UTC, main `3532eab28cb76009979b1ebdca1022095cccf146`.
Checkout pulito; creato da origin/main `docs/chiusura-sessione-2026-10-09`.
Nessun merge eseguito dall'assistente.

Preparato [prompt corrente](PROMPT_NUOVA_SESSIONE.md); aggiornati AGENTS,
README, sviluppo, decisioni, backlog e punto di ripresa allo stato integrato.
I registri dell'8 ottobre restano checkpoint storici. Il prompt distingue
analisi di eventuali osservazioni effettive e preparazione della raccolta
quando mancano: BF02 consegnato, BF16 aperto, BF03 non approvato implicitamente.
Conservati vincoli, decisioni aperte e direzione visiva.

Solo Markdown: nessuna modifica a frontend, dati del kit, strumenti, asset
o hosting. Nessun nuovo test UI, test del kit o deploy; i 18 test del kit
passati l'8 ottobre non sono attribuiti a questa chiusura.

Controllati otto Markdown modificati/nuovi e 96 collegamenti locali/ancore;
`git diff --check` senza errori. Revisione indipendente della continuità:
allineato l'ordine di lettura fra prompt e punto di ripresa. Dati, strumenti
e sorgenti restano identici al main di partenza.

Consegna nella [PR #7](https://github.com/av3rgfx/EECard/pull/7), creata aperta
e non in bozza, da main `3532eab`. Commit degli elaborati `84c876e`, salvato
sul remoto; il commit successivo aggiunge i riferimenti della PR. Nessun merge.

## 9 ottobre 2026 — ripresa BF16, raccolta e contratti preliminari

Richiesta: verificare la consegna precedente, ripartire da attivazione → banco
→ recupero storico senza rifare BF02; analizzare eventuali osservazioni reali,
altrimenti guidare la raccolta e avanzare negli approfondimenti documentali.
Verificata PR #7 integrata alle 23:19:16 UTC prima del checkout. Main clonato
al merge `c77dfd482e683baeeb0ec825ac5d5755c56fa1bb`, albero pulito; creato
`docs/bf16-raccolta-2026-10-09`. Nessun merge eseguito dall'assistente.

[Rapporto](validazione-bf16-2026-10-09/README.md),
[guida per il facilitatore](validazione-bf16-2026-10-09/RACCOLTA.md) e
[contratti preliminari BF03](validazione-bf16-2026-10-09/CONTRATTI_PRELIMINARI.md).
La guida usa copie dei materiali esistenti fuori repository e precisa raccolte
parziali, separazione percorsi e limiti dello strumento. L'allegato BF03 dettaglia
precondizioni/esiti, matrice azione–oggetto, revoca, retry, versioni e prove future
su due agenzie sintetiche; non approva architettura o perimetro operativo.

Nessuna osservazione umana disponibile nei materiali consultati: modello
con 48 `non_eseguita` e costi vuoti; nessun commento/review nelle PR #6/#7,
nessuna issue presente o allegato alla sessione. Chiesto lo stato della raccolta,
nessuna risposta utilizzabile come misura alla consegna. Non si conclude che
prove non siano state svolte altrove. BF16 rimane aperto; BF03 resta proposta
subordinata a BF01 per l'ambito operativo e da revisionare coi riscontri BF16.

Aggiornati AGENTS, README, sviluppo, decisioni, backlog, punto di ripresa e
prompt. Conservate DA aperte, identità 0.3 e invarianti di accesso e pagamenti.
Nessun nuovo prezzo, responsabile assegnato, tempo stimato o servizio attivato.

Controlli nuovi: lettura CLI/sorgente, `validate` del kit esistente e `analyze`
sul modello (48 pianificate, 0 osservate, nessuna misura stimabile). I 18 test
Python dell'8 ottobre restano storici e non sono rieseguiti. Nessuna rigenerazione
di BF02, nuovo test UI/build/audit, collaudo hardware, firma, AI o deploy.
Solo Markdown: sorgenti, kit, strumenti, specifiche, studio PDF/DOCX, fonti EA,
prodotto/design e hosting invariati rispetto a main `c77dfd4`. Sites v5 rimane
l'ultima pubblicazione documentata, sorgente `65ac9e0`; live non ricollaudato.

Controllati 11 Markdown e 142 collegamenti locali/ancore validi; riferimenti
PF/PT/MD risolti e `git diff --check` pulito. Revisione indipendente applicata:
separata la sessione personale dell'attore dalla sessione operatore, richiesta
solo per operazioni d'agenzia; precisato che lo storico del precedente
intestatario è negato senza titolo specifico, preservando le deleghe valide.

Consegna nella [PR #8](https://github.com/av3rgfx/EECard/pull/8), aperta e
non in bozza, base main e branch `docs/bf16-raccolta-2026-10-09`.
Commit elaborati `7cff9ff34fc3e619edf1187af6bdf4728c04aff1`, verificato uguale
al branch remoto e all'HEAD della PR. Il successivo commit aggiunge soltanto
riferimenti remoti a rapporto, punto di ripresa, prompt e registro. Nessun merge.

## 9 ottobre 2026 — proseguimento della raccolta e politica storico/uscita

L'utente risponde «procedi». PR #8 verificata aperta, non in bozza, HEAD
`f01356437923cc569e5f8ac12b689eb66b7a6c3c`; checkout pulito e allineato al remoto,
main ancora `c77dfd4`. Riutilizzati branch e PR, nessun merge. Nessun nuovo
commento/review nella PR o issue con osservazioni; chiesti processo corrente
anonimo e disponibilità dei due operatori/facilitatore, senza risposta
utilizzabile alla consegna. Il seguito non sostituisce la prova umana BF16.

Predisposte fuori repository sette copie dei materiali BF02 già pronti,
separate per operatore/fase e facilitatore, con istruzioni locali di avvio e
manifest SHA-256 riferito al checkout `f013564`. Nessun set o pacchetto
rigenerato. Verificate identità byte per byte e hash; una sola copia del
pacchetto previsto per ogni cartella operatore/fase, chiave e CSV solo al
facilitatore. `analyze` sul CSV esterno: 48 pianificate, 0 osservate; cinque
categorie di costo identiche al modello vuoto. Nessun tempo inventato.

Precisato in [RACCOLTA](validazione-bf16-2026-10-09/RACCOLTA.md) l'avvio
contiguo S01–S04 della fase 1 per entrambi, poi S05–S12 e fase 2. I primi
quattro casi comprendono PF01/PF02/PF05: non serve anticipare S10. Nessun
confronto appaiato o conclusione BF16 dopo la sola prima fase. Restano da
definire con i partecipanti metodo corrente, supporto, limite e soglie.

Aggiunto [STORICO_USCITA](validazione-bf16-2026-10-09/STORICO_USCITA.md) come
approfondimento P13/BF03: matrice categoria/evento, conservazione distinta
da lettura e consegna, titoli autonomi ancora validi, revoca/correzione e
copie già consegnate. Nessun termine legale, titolare privacy o responsabile
assegnato. BF03/BF17 restano aperti; le osservazioni BF16 non definiscono
da sole le condizioni operative. Aggiornati sviluppo e continuità.

In questo seguito non ripetuti `validate`, test Python o test frontend:
kit, strumenti, sorgenti, specifiche principali, fonti storiche e hosting
restano invariati. Controlli pertinenti: copie e analisi della copia vuota,
coerenza e link dei Markdown, diff e revisione indipendente. Nessun servizio,
invito, pagamento, firma, dato cliente reale o deploy.

Verificati 9 Markdown del seguito e 120 collegamenti locali/ancore; il totale
della PR rispetto a main è 12 Markdown e 156 collegamenti. `git diff --check`
pulito, criteri richiamati presenti e percorsi invariati confermati. Revisione
indipendente applicata: il cambio agenzia non autorizza da solo i vecchi link,
ma non vieta un canale di consegna esplicitamente autorizzato; il criterio di
diniego dopo fine titolo esclude anche la presenza di altro titolo autonomo valido.

Salvato il seguito al commit `dd74a2282c21f9e36806b2389f05d917f28c5d87`,
verificato uguale su checkout, branch remoto e PR #8 aperta, non in bozza.
Titolo e descrizione della stessa PR aggiornati al perimetro completo;
il commit successivo registra soltanto questi riferimenti. Nessun merge.
Le copie locali esterne sono di preparazione, non artefatti pubblicati nella PR;
le istruzioni persistenti restano nel repository.

## 14 ottobre 2026 — strategia demo-prima e piano 0.4

La PR #8 è stata verificata integrata alle 06:49:01 UTC, merge `adacdab`.
Aggiornato main e creato il nuovo branch
`docs/piano-demo-funzionale-2026-10-14`, senza riutilizzare il branch integrato
e senza eseguire merge.

L'utente cambia esplicitamente l'ordine del lavoro: prima una demo funzionante e
il più completa possibile, poi la prova e le domande guidate da ciò che manca,
serve o può essere aggiunto. Registrata C24. La scelta non approva R1 come
rilascio, prezzi, servizi, hardware o architettura di produzione.

Lo studio del frontend rileva una base 0.3 ampia e curata, ma una storia
PF01/PF02/PF05 ancora frammentata. Preparato il
[piano della demo 0.4](demo-funzionale-2026-10-14/README.md): pratica operatore,
sessione al banco, ricerca storica, due agenzie sintetiche, permessi per
relazione, dinieghi/errori e modalità prova locale. PF03/PF04/PF06 restano
estensioni sintetiche; card, wallet, schermo cliente, firma e AI sono soltanto
simulazioni dichiarate.

Creato il [prompt obiettivo](PROMPT_DEMO_FUNZIONALE.md), con prima riga `/goal`,
per implementare e verificare la demo mantenendo C–Legame, design 0.3, privacy,
separazione dei quattro eventi economici e assenza di servizi reali. BF02 resta
invariato. BF16 rimane aperto e sarà ripreso dopo la demo con osservazioni umane,
senza inventare misure.

Aggiornati AGENTS, README, prodotto, sviluppo, backlog, decisioni, punto di
ripresa e prompt breve della prossima sessione. Questa consegna è solo
documentale: nessuna modifica al frontend, rigenerazione del kit, prova umana,
attivazione di servizi o pubblicazione Sites.

Elaborati salvati al commit
`68d0519c2983589a8dfb96df7ebed50e065de0ca` e pubblicati sul branch remoto.
Aperta la [PR #9](https://github.com/av3rgfx/EECard/pull/9), non in bozza, base
main, titolo “Progetta la demo funzionale 0.4 e prepara il prompt /goal”.
Controlli: diff pulito, prima riga `/goal` e 137 collegamenti locali validi.
Nessun test UI/build o deploy perché la modifica è esclusivamente documentale.
Il commit successivo registra soltanto questi riferimenti; nessun merge.

Su richiesta dell'utente è stata aggiunta una
[procedura di avvio](AVVIO_PROSSIMA_SESSIONE.md): integrare la PR #9, aprire una
nuova sessione e incollare l'intero prompt a partire da `/goal`. Precisato che
la futura implementazione deve partire da main aggiornato su un branch distinto
e terminare con una nuova PR; la PR #9 resta la consegna documentale del piano.

## 14 ottobre 2026 — prompt `/goal` entro 4.000 caratteri

L'utente segnala il limite massimo di 4.000 caratteri per il prompt obiettivo.
Verificata la PR #9 integrata alle 10:33:11 UTC, merge `46c7315`; aggiornato main
e creato `docs/prompt-goal-4000-2026-10-14`, senza riutilizzare il branch del
piano e senza merge.

Il prompt precedente misurava 8.267 caratteri; il nuovo ne misura 3.719, con 281
di margine. È stato riformulato come launcher
operativo: conserva obiettivo, vincoli, percorso PF01/PF02/PF05, estensioni,
permessi, verifiche e consegna, mentre rimanda al piano e alle specifiche già
integrate per il dettaglio. Aggiornate le istruzioni di avvio e la continuità;
frontend, kit BF02, prove umane e Sites restano invariati.

Elaborati salvati al commit
`e586f3bddabaab4ee9c989d3b068d1351ffcc523` e pubblicati sul branch remoto.
Aperta la [PR #10](https://github.com/av3rgfx/EECard/pull/10), non in bozza e
mergeable, con base main. Il commit successivo registra soltanto questi
riferimenti; nessun merge.

## 14 ottobre 2026 — implementazione demo funzionale 0.4

Verificata PR #10 integrata alle 10:51:34 UTC, aggiornato main `3b28e0a`,
creato `feat/demo-funzionale-0.4`. Letti AGENTS, continuità, piano, backlog,
specifiche, BF16 e documenti prodotto/design/sviluppo. Nessun merge.

Implementati percorso continuo, policy e fixture di due agenzie, scenari,
reset, persistenza versionata, registro locale, note e PF03/PF04/PF06.
Kit BF02 invariato, nessuna osservazione umana aggiunta, BF16 aperto.
Esiti e limiti nel [rapporto](demo-funzionale-2026-10-14/VERIFICHE.md).

Sorgente demo `7adeb69ca74cc17105580c17eab90c05f02efb76` salvata sul branch
remoto e sul repository sorgente Sites. [PR #11](https://github.com/av3rgfx/EECard/pull/11)
aperta, non in bozza, base main `3b28e0a`, nessun merge. Sites v6 riuscita
alle 11:17:47 UTC; byte di `/app/` identici alla build del commit.
La chiusura documentale successiva non richiede deploy e non altera i sorgenti
0.4 verificati. Report: 41 test passati, ulteriori 22 test demo dopo guard memoria,
28+24 viste senza violazioni axe, 22 screenshot, build statica/offline,
formattazione e audit npm. BF02 invariato, BF16 aperto.

## 14 ottobre 2026 — revisione dell'esperienza 0.5

L'utente ha segnalato scarsa chiarezza e qualità percepita della demo. PR #11
verificata integrata alle 18:40:00 UTC; main aggiornato `0481bb1`, nuovo branch
`design/experience-0.5`. Nessun merge eseguito dall'assistente.

Nuova esperienza operativa e personale, quattro passi di pratica, banco,
archivio, utenze, affitto, richieste e bozze. Strumenti tecnici in un pannello,
root pubblica diretta al prodotto, vecchi link compatibili. Conservati C–Legame,
0.3, policy, titoli autonomi e quattro significati economici.
[Rapporto](experience-2026-10-14/VERIFICHE.md); BF02 invariato e BF16 aperto.

Consegna nella [PR #12](https://github.com/av3rgfx/EECard/pull/12), aperta e non
in bozza senza merge. Sorgente iniziale `8f1f39f`, rifinitura contesti/indicazioni
di avanzamento `448f3721760ec3289920f092fa919240b50be2d4`. Sites v8 riuscita
alle 20:01:30 UTC; root e `/app/` confrontati identici alla build di questa
sorgente. Il commit successivo è la sola registrazione della chiusura.
61 test passati, 60 viste audit senza anomalie, 52 screenshot; HTML autonomo,
root statica e vecchio ingresso provati. Build/formattazione/audit npm riusciti.
Nessuna misura umana comparativa aggiunta, BF02 invariato e BF16 aperto.

## 14 ottobre 2026 — chiusura e preparazione analisi audio

Richiesta dell'utente: nella prossima sessione trascrivere due audio e analizzare
un appunto del confronto col collega, aggiornare lo studio progettuale e creare
un piano di sviluppo per nuove funzioni/scelte. Preparati prompt `/goal`, piano
di lavoro, istruzioni di avvio e continuità. Fonti non ancora allegate, nessuna
trascrizione o decisione ricavata ora. Materiali integrali fuori repository;
nel progetto solo sintesi anonime e riferimenti verificabili.

PR #12 verificata aperta, riutilizzata per la chiusura della stessa consegna
secondo AGENTS.md, senza merge. Modifiche esclusivamente documentali: nessun
nuovo deploy o test applicativo; gli esiti 0.5 precedenti rimangono storici.
Controlli della chiusura: prompt inferiore a 4.000 caratteri, collegamenti locali
dei documenti modificati e diff senza errori di whitespace.

## 15 ottobre 2026 — due audio, studio e gestione rinnovo locale

Ripresa dalla PR #12 verificata integrata (main `24eb129`), nuovo branch
`feat/studio-audio-incremento-locale`. Elaborati realmente i due allegati in
locale: due passaggi completi, controlli mirati e diarizzazione provvisoria;
trascrizioni con timestamp, incertezze e lacune consegnate privatamente. Nessuna
fonte grezza, appunto originale o vicenda personale nella repository.

[Analisi NA01–NA16 e studio](discussione-2026-10-15/README.md): livelli/extra,
conguaglio ambiguo, divergenza sul preavviso, supporto fisico, bollettini e
chiamate AI proattive. L'utente conferma report annuali cliente/agenzia con viste
separate. Piano IN01–IN10 con dipendenze e accettazione; ricerca ufficiale sui
canali bollette, senza attivare integrazioni o assumere un provider.

IN01: «Gestisci abbonamento» per Cliente 01, disattivazione rinnovo dimostrativa,
conferma/annullo, stato persistente solo dopo salvataggio riuscito, retry e reset.
Conservati periodo sintetico, card, locazione, documenti, grants e ledger separati.
Nessun prezzo, addebito, comunicazione esterna o cessazione programmata.

[Verifiche](discussione-2026-10-15/VERIFICHE.md): nuovo controllo zoom ha rilevato
e fatto correggere overflow; suite 66/69, tre timeout ripetuti separatamente
3/3; build/anteprima portatile, formattazione e screenshot desktop/mobile.
Tutti i 69 controlli coperti, senza presentare la prima suite come interamente
verde. Audio e test CPU eseguiti nello stesso ambiente; prove fisiche restano aperte.

Aggiornati prodotto, design, sviluppo, decisioni, backlog, istruzioni, prompt
entro 4.000 caratteri e punto di ripresa. Nessun deploy: online resta la 0.5
Sites v8 da `448f372`. BF02 intatto, BF16 aperto. Consegna nella [PR #13](https://github.com/av3rgfx/EECard/pull/13), aperta e pronta
alla revisione, senza merge. Implementazione `3ce9a6b`; chiusura successiva solo
documentale, senza nuovi test o deploy.

## Chiusura della sessione audio — preparazione della ripresa

Su richiesta dell'utente, ricontrollata la PR #13: ancora aperta, nessun merge.
Riutilizzata per la chiusura della medesima consegna secondo AGENTS.md. Resa
esplicita la sequenza consigliata IN03 → IN04 → IN05; i due destinatari dei report
restano confermati, metriche e condizioni commerciali rimangono da definire.
Aggiornati punto di ripresa, backlog e prompt `/goal`, che richiede di implementare
IN03 senza ripetere l'analisi audio o la gestione rinnovo IN01.

Modifiche esclusivamente documentali. Controllati limite di 4.000 caratteri del
prompt, riferimenti locali e whitespace; nessuna nuova esecuzione dei test
applicativi, nessun servizio reale o deploy. Gli esiti precedenti restano nel
rapporto di verifica della consegna, con i relativi limiti.

## 15 ottobre 2026 — IN03, importazione guidata delle bollette

Ripresa della richiesta esplicita IN03. PR #13 verificata integrata il 14 ottobre
alle 23:08 UTC, main `be4b23e`; nessuna PR aperta. Nuovo branch
`feat/in03-importazione-bollette`. Nessuna ripetizione di audio/studio o IN01.

Implementati originali HTML sintetici e dati strutturati, confronto/correzione,
riepilogo e conferma dopo salvataggio, duplicati anche da seconda copia,
rettifica e storico, policy di acquisizione legate a intestazione/delega,
annullo e recupero. Workspace v1 compatibile; schema 4 e grants invariati.
Documenti importati consultabili nelle Utenze; archivio originale 0.4 conservato.

[Copione](importazione-bollette-2026-10-15/README.md) e
[verifiche](importazione-bollette-2026-10-15/VERIFICHE.md): suite 83/83 passata;
14/14 test mirati dopo la rifinitura degli spazi dei campi, build/HTML autonomo,
smoke portatile senza errori JS o rete, axe/layout/focus, screenshot e formattazione.
Corretti contrasto mobile, etichette e overflow trovati nei tentativi iniziali.
Controlli emulati, non prove umane o su telefono fisico.

Aggiornati prodotto/design/sviluppo/decisioni, piano IN03, backlog, istruzioni,
continuità e prompt entro 4.000 caratteri. Prossimo consigliato IN04, poi IN05
con due viste e fonti/metriche da definire. BF02 invariato, BF16 aperto.
Nessun servizio reale, deploy o merge. Online rimane Sites v8 da `448f372`.
[PR #14](https://github.com/av3rgfx/EECard/pull/14) aperta, pronta alla revisione,
base main. Codice/artefatti `50461b8`; seguito di chiusura solo documentale,
senza nuovi test applicativi. Nessun merge.

## 15 ottobre 2026 — pubblicazione richiesta e chiusura IN03

L'utente chiede di aggiornare Sites ora e a ogni sessione, così da controllare
il prototipo a distanza. Registrata la regola permanente in AGENTS, sviluppo,
C31, backlog e prompt di ripresa (3.356 caratteri). La richiesta supera il limite
locale del deploy precedente; conservati dati sintetici, sito e accesso pubblico.

PR #14 verificata aperta e riutilizzata per la stessa consegna. Sorgenti aperti
e pubblicati tramite helper della skill Sites; build TypeScript/Vite, HTML
autonomo e sito condivisibile rigenerati. HTML autonomo identico al precedente;
nessuna modifica applicativa o nuova esecuzione della suite UI. Rimane l'avviso
Vite sul bundle >500 kB. Commit sorgente salvato su GitHub e Sites prima del deploy:
`44ffb53f60d68e636a475e405b7e71e1129dfada`. Sites v9, `succeeded` alle
06:24:44 UTC, comprende IN01 e IN03. [Dettagli](../design/ANTEPRIME_WEB.md).

Aggiornati continuità, rapporto, backlog e registri; verificati whitespace,
collegamenti e limite prompt. Chiusura successiva solo documentale, distinta
dal commit online. Prossimo IN04, poi IN05; BF02 invariato, BF16 aperto.
Nessun servizio reale, nuova feature o merge.

## 15 ottobre 2026 — IN04 Mostra avviso

Verificata PR #14 integrata alle 06:36:01 UTC, merge `ad8b928`; nuovo branch
`feat/in04-mostra-avviso` da origin/main aggiornato. Letti continuità, documenti
prodotto/design/sviluppo, IN03 e piano/studio bollette; nessuna ripetizione di
IN01, analisi audio o kit BF02. Skill Sites e indicazioni pertinenti di
apple-design/mobile-native allo snapshot Emil già registrato.

Implementati avviso corrente/storico, originale condiviso e alternativa testuale
sullo stesso telefono, codice assente/illeggibile/formato non supportato, stati
ignoto/domiciliazione/pagamento indicato e versioni superate. Lettura derivata
con permessi e coerenza rivalutati; nessuna mutazione di ledger o eventi.
Facsimili testuali non scansionabili/non pagabili, nessun servizio reale.

Verifiche finali: 94/94 test (11 nuovi IN04), zero skipped/flaky; axe, layout,
tastiera, testo 200% e reduced motion a 360/390/1440, build e HTML autonomo,
smoke autonomo/statico senza errori JS o richieste esterne. Screenshot ispezionati,
formattazione e controlli documentali. [Rapporto](mostra-avviso-2026-10-15/VERIFICHE.md).
Non sono prove fisiche o umane: N02/PB04/BF16 restano aperti. Bundle unico circa
669 kB JS, avviso Vite noto. Nessuna dipendenza nuova o migrazione.

Aggiornati prodotto/design/sviluppo, AGENTS, C32/P19, piano, backlog, continuità
e prompt entro 4.000 caratteri. Prossimo proposto IN05 con fonti/copertura/metriche
per le due viste. Pubblicazione e PR registrate a chiusura dopo l'esito remoto.

Esito di chiusura: dopo l'interruzione verificato il processo Sites già concluso,
senza riavvio. Sorgente `a1223ff657a300c47ab8cbb1771a99da8727a707` su GitHub
e Sites; **v10 pubblicata**, `succeeded` il 15 ottobre alle 12:26:21 UTC,
identità/accesso pubblico invariati. [PR #15](https://github.com/av3rgfx/EECard/pull/15)
aperta e non in bozza, base main, nessun merge. Registri finali aggiornati con
versione/deployment; commit di chiusura solo documentale, senza nuovo deploy.

## 15 ottobre 2026 — riallineamento della visione dopo IN04

L'utente chiede di chiarire il prodotto prima di continuare, poi precisa tre
punti: gestione semplice della casa e dei bisogni collegati con pagamento e
assistenza; home con card/casa/attenzione immediata e pagamento bollette facile;
insoddisfazione per home e struttura complessiva. Registrate conferme C33/C34,
proposta P20 e [descrizione aggiornata](visione-casa-2026-10-15/README.md).
IN05 non è più il prossimo incremento automatico; priorità N19 di riallineamento.

Aggiornati PRODUCT, DESIGN, AGENTS, decisioni, backlog, continuità e prompt.
Home/menu candidati restano da valutare. Nessuna nuova schermata, integrazione
o modifica di identità; IN01/IN03/IN04 si conservano. PR #15 verificata aperta,
nuovo branch documentale `docs/visione-casa-2026-10-15` da `7446fc8`, PR dipendente
con base sul branch IN04 per separare il diff. Nessun merge.

Sites verificato v10 e pubblico, asset locali uguali alla sorgente online
`a1223ff`; niente deploy identico. Verificati link, whitespace, limite prompt e
diff solo Markdown. Non ripetuti test applicativi né aggiornati gli screenshot:
le 94 prove precedenti non validano una home nuova. BF02 invariato, BF16 aperto.

Consegna nella [PR #16](https://github.com/av3rgfx/EECard/pull/16), aperta
senza merge, base `feat/in04-mostra-avviso`. Proposta da valutare, frontend invariato.

## Chiusura richiesta — prossima sessione di revisione casa/home

L'utente conferma il seguito nella prossima sessione e chiede Markdown, prompt
e PR. PR #15 e #16 verificate ancora aperte; riutilizzata #16 per la stessa
consegna documentale, base `feat/in04-mostra-avviso`. Nessun merge. Registrato
C35 e precisato il prossimo risultato: mappa dell'esperienza, home navigabile
desktop/mobile e percorsi bolletta/assistenza, da valutare prima della revisione
estesa. La navigazione candidata non diventa una scelta grafica definitiva.

Aggiornati continuità, backlog, visione, registro decisioni e prompt sotto 4.000
caratteri. Verificati collegamenti, whitespace e assenza di modifiche applicative.
Sites resta v10 pubblico, sorgente `a1223ff`; asset allineati, nessun deploy
identico o test applicativo ripetuto. IN05 non avviato, BF02 intatto, BF16 aperto.

## Dopo il merge utente della PR #15

Verificato sul remoto il merge della #15 del 15 ottobre alle 19:57:17 UTC,
commit `7c4e5034bf68ed9154d9601b6edd038a840c5962`. Aggiornata la base della
PR #16 dal branch IN04 a **main**. Il commit precedente `7446fc8` è antenato
di main: diff solo Markdown, nessuna duplicazione applicativa, rebase o merge
necessario. Aggiornati ripresa, prompt, backlog e riferimenti della consegna.
Verificati link, prompt entro 4.000 caratteri e whitespace; nessun test
applicativo ripetuto o deploy, sorgenti e asset invariati. PR #16 lasciata aperta
per il merge dell'utente; nessun merge effettuato dall'assistente.

## 15 ottobre 2026 — proposta navigabile casa e bisogni

Verificate sul remoto PR #15 e #16 entrambe integrate dall’utente, la seconda
alle 19:59:34 UTC (`7319587`). Nuovo branch `feat/proposta-casa` dal main aggiornato.
Letti visione e continuità; applicate Sites, apple-design e mobile-native senza
nuova analisi delle fonti. Nessun merge effettuato dall’assistente.

Realizzati mappa e ingresso separato `/#/casa/home`, home desktop/mobile, pagamento
simulato completo e richiesta di assistenza. Quattro aree candidate; card/casa/
priorità e azioni dirette. Riutilizzati IN01/IN03/IN04; sessione isolata in memoria,
nessun cambiamento al ledger o alla persistenza precedente. Spazio agenzia conservato.
[Copione](proposta-casa-2026-10-15/README.md), [verifiche](proposta-casa-2026-10-15/VERIFICHE.md).

104/104 test passati; dopo rifinitura mobile ripetuti 3 controlli layout/axe;
build/HTML autonomo/statico e smoke dei due percorsi a 360/390/1440 senza errori JS
o richieste esterne. Screenshot finali e limiti documentati. BF02 intatto, BF16
aperto, IN05 non avviato. Aggiornati prodotto/design/sviluppo, registro decisioni,
backlog, istruzioni, continuità e prompt. PR #17 aperta; la pubblicazione è stata completata nella ripresa del 16 ottobre sotto.


## 16 ottobre 2026 — ripresa e chiusura della pubblicazione

Ripresa dal checkpoint senza rifare implementazione o verifiche. PR #17 verificata
aperta su `feat/proposta-casa`, commit `73d6e53`. Sites v11 già salvata con archivio
e sorgente corrispondenti, nessun deployment precedente: pubblicata la stessa
versione, `succeeded` alle 06:38:11 UTC, con identità e accesso pubblico invariati.
[Proposta online](https://eecard-design-preview.uepacio.chatgpt.site/#/casa/home),
[PR #17](https://github.com/av3rgfx/EECard/pull/17),
[registro](../design/ANTEPRIME_WEB.md). Nessun merge.

Chiusura solo documentale: continuità, backlog, prompt e registri allineati;
controllati link locali, limite di 4.000 caratteri e whitespace. I 104 test e gli
smoke restano quelli eseguiti il 15 ottobre, non ripetuti o attribuiti alla ripresa.
Asset identici alla sorgente online, nessun ulteriore deploy duplicato. BF02
invariato, BF16 aperto, IN05 non avviato. Attendere il feedback sulla proposta.


## 16 ottobre 2026 — chiusura esplicita e prompt per la valutazione

Dopo la sintesi di differenze, residui e prossimo passo, l’utente richiede la
chiusura, i Markdown di ripresa, il prompt e la PR. PR #17 ricontrollata **aperta**
e riutilizzata per la stessa consegna. Nessun feedback puntuale o approvazione
di menu/layout attribuito al semplice accordo di chiusura.

Aggiornati PROSSIMA_SESSIONE, BACKLOG e prompt: partire dalle osservazioni
sulla proposta o guidare la breve prova home → bolletta → assistenza; definire
poi una revisione mirata, senza IN05 automatico. Sites confermato v11/pubblico,
versione legata al deployment già riuscito e alla sorgente `73d6e53`. Confronto
Git dei sorgenti/asset con il commit online senza differenze: nessun deploy
identico e nessun test applicativo ripetuto. Controllati link locali, whitespace
e prompt entro 4.000 caratteri. BF02 invariato, BF16 aperto; nessun merge.


## 16 ottobre 2026 — preparazione del nuovo repository e avvio con Claude

L'utente richiede un nuovo contesto pulito per costruire il prodotto reale da zero e autorizza la preparazione di tutto il materiale di avvio. PR #17 verificata aperta; creata consegna distinta su `docs/nuovo-prodotto-2026-10-16`, basata sul branch della #17 per conservare continuità, senza merge.

Preparato [pacchetto autonomo](nuovo-repository-2026-10-16/README.md): prodotto e servizio, UX/UI, invarianti e accettazione, fasi di consegna, decisioni, stato iniziale, AGENTS/CLAUDE, simbolo e font con licenza. Prompt di avvio 3.835 caratteri; prompt di continuità 3.921. Archivio con 28 file, senza codice demo, dati personali, credenziali, metadati Git o identità di hosting. Nuovo repository remoto non creato: nome/destinazione e visibilità da indicare nell'ambiente di avvio.

Controllati link interni, autonomia dei percorsi, contenuto ZIP identico ai sorgenti, manifest SHA-256, asset identici agli originali, limite prompt e whitespace. Nessun test applicativo ripetuto. Sites verificato nativamente attivo/v11/pubblico; diff sorgenti/asset rispetto a `73d6e53` vuoto, nessun deploy duplicato. Aggiornati continuità, prodotto, design, sviluppo, decisioni, backlog e prompt.

Prossimo passo: copiare il pacchetto nella radice del nuovo repository e usare il prompt. Prima studio mirato e proposta UX/UI navigabile, poi incrementi end-to-end verso il prodotto reale; niente rinnovo automatico della cronologia del vecchio prototipo. IN05 non avviato, BF02 intatto, BF16 aperto.
