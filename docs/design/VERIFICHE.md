# Verifiche del prototipo EECard

## Verifica corrente — riepilogo immobili in home, 6 ottobre 2026

Intervento circoscritto alla densità della lista nella home: vista compatta quando il contesto contiene più di una casa. Con una sola casa e nella pagina «Vedi immobili» resta la vista espansa. Nessun cambiamento a permessi, azioni, animazioni o dati.

- Build TypeScript/Vite e formattazione passate; avviso noto sul bundle unico invariato.
- **6 test pertinenti passati in 15,6 s**: quattro layout/axe a 360, 390, 1280 e 1440 px, stress/dati limite/testo al 200%, tessera iniziale e ruoli. Non ripetuta la suite completa di 19 percorsi, eseguita nell’integrazione precedente.
- Verifica visiva desktop/mobile: righe aperte con foto laterale e metadati completi. Foto di 132 px nella lista multipla; vista espansa conservata nella pagina immobili e con una casa selezionata.
- Corretto il titolo lungo nella riga compatta a 320 px/testo 200%: andava oltre la colonna di 22 px. Wrapping mirato, nessun troncamento; verifica ripetuta dopo il fix.
- Anteprime statiche nelle quattro configurazioni desktop/mobile e HTML autonomo offline: [report mirato](verifiche-home-compatta.json).
- Screenshot aggiornati della home proprietario a 1440, 1280, 390 e 360 px; aggiunta la pagina immobili a 1440 e 390 px. Screenshot dei flussi non modificati conservati.

Test in Chromium emulato; nessuna nuova prova fisica, Safari/WebKit o screen reader. I rapporti sotto conservano i controlli dell’integrazione precedente, senza attribuirli nuovamente a questa correzione.


## Integrazione Materia con pagine editoriali — verifica precedente, 6 ottobre 2026

Scelta esplicita integrata sul branch `design/visual-directions-lab`. I risultati sotto precedono la pubblicazione e riguardano il frontend dimostrativo in Chromium153/Playwright1.63, Node24.19. I rapporti successivi in questo documento conservano lo storico delle tappe precedenti.

| Controllo corrente | Risultato |
| --- | --- |
| Build e formattazione | TypeScript/Vite e Prettier passati; bundle532.25KB,167.89KB gzip, avviso dimensionale Vite conservato |
| Suite E2E finale | **19 test passati,26.9s**; 18 esistenti più regressione priorità tessera/ruoli |
| Audit aggiuntivo finale | **24 scansioni,0 violazioni** WCAG A/AA rilevate da axe; [JSON](audit-accessibilita.json) |
| Home owner/tenant390×844 | Tessera y252–472.67px; accesso gestione termina530.67px, sopra tabbar773px |
| Home owner/tenant360×780 | Tessera y270–486px; gestione termina544px, sopra tabbar709px |
| Ruoli | Agenzia: home operativa, nessuna tessera o intestazione Alessandro in Card; tecnico limitato alle rotte previste |
| Pagamento parziale | Dichiarazione400€, verifica distinta e quietanza400€; residuo550€ su950€ resta visibile e rata ancora da seguire |
| Movimento | Nessun mount, marker160ms pointer, keyboard0, reduced120ms solo opacity; interruzione/retarget e focus verificati in browser |
| Stress | Home/affitto/card, demo/worst/revoked,320px con testo200%: nessun overflow pagina dopo correzioni; nessun taglio del contenuto operativo |
| Anteprime statiche | Desktop1440; mobile da1440,390,360; nessun overflow o erroreJS. Guida3viewport e10download validi; HTML offline senza richieste esterne |
| Evidenze | 22 screenshot rigenerati; [report movimento](verifiche-materia-movimento.json), [video del processo reale demo](materia-processo.webm), [report anteprime](verifiche-legame.json) |

### Correzioni emerse da break-ui + fix

- Home a320px/testo200%: il vecchio display flex mobile e le colonne min-content delle azioni allargavano la pagina a415px. Griglia esplicita, minmax(0,1fr), min-width0 e testo a capo mantengono la colonna a320px.
- Affitto a320px/testo200%: importi lunghi e parola finale del titolo superavano la colonna. Wrapping senza riduzione del font: il contenuto cresce in altezza.
- Gestione tessera a320px/testo200%: badge e titolo sulla stessa riga allargavano la pagina. Intestazione flessibile su più righe.
- Richiamo consulenza al200%: titolo poteva essere tagliato dal contenitore; corretta la rottura delle parole. Questa ultima correzione locale è verificata dal controllo stress mirato dopo la suite completa.
- Il controllo anteprime ha rilevato servizio tessera10px: riportato a11px, con etichette titolare/stato10px e intestatario14–18px. Controllo ripetuto e passato.

Gli importi non scorrono con un contatore; la tessera e il logo non ruotano, non seguono il puntatore e non hanno loop. L’animazione rende riconoscibile una fase realmente cambiata. La riproduzione del video è una registrazione della demo, non un servizio o pagamento reale.

Limiti: test emulati, nessuna certificazione WCAG, prova hardware, Safari/WebKit, screen reader o ricerca con utenti. Le misure geometriche riguardano dati standard/font caricati; con zoom e nomi lunghi è previsto scorrimento verticale. Licenze, dati e condizioni commerciali invariati.

## Storico iniziale


6 ottobre 2026. Branch `design/eecard-premium-prototype`. Ambiente Linux, Node 24.19.0, Chromium 153 via Playwright 1.63.0. Questa verifica riguarda il frontend dimostrativo, non la sicurezza o l’erogazione del servizio in produzione.

## Risultato

| Controllo | Esito osservato |
| --- | --- |
| `npm run build` | Passato: TypeScript strict, nessuna variabile locale inutilizzata, build Vite |
| `npm run format:check` | Passato |
| `git diff --check` | Passato |
| `npm test -- --workers=4` | **15 test passati**, 28,2 s nell’ultima esecuzione completa |
| Layout / axe nei test | 11 schermate × 360, 390, 1280, 1440 px, nessuna violazione WCAG A/AA rilevata da axe; nessun errore JavaScript e nessun overflow orizzontale della pagina |
| Audit aggiuntivo | 12 schermate × 390 e 1440 px, inclusa coda agenzia: **24 scansioni, 0 violazioni**; dati in [audit-accessibilita.json](audit-accessibilita.json) |
| Dialogo mobile | Consultazione/condivisione a 390 px, altezza ridotta a 450 px, invio raggiungibile tramite scroll; axe senza violazioni |
| Anteprima portatile | Aperta da `file://` in Chromium; navigazione, apertura dialogo e blocco card riusciti, zero errori JS e zero richieste HTTP esterne |
| Screenshot | 22 schermate salvate in [screenshots](screenshots), riproducibili con `node scripts/screenshots.mjs` |

L’audit automatico non equivale a certificazione WCAG. Mancano prove con persone, screen reader e hardware fisico. Il bundle JS è circa 527 KB (166 KB gzip): Vite emette il relativo avviso dimensionale. È mantenuto unico per l’anteprima autonoma; per il prodotto operativo va valutato il caricamento per area insieme all’architettura reale.

## Percorsi verificati

1. Documento: apertura, destinatario autorizzato, durata, condivisione, revoca; planimetria patrimoniale non presente nel ruolo inquilino.
2. Bonifico: allegato demo → documento caricato → dichiarazione → nessuna verifica consentita all’inquilino → cambio ad agenzia → fonte richiesta → verifica → quietanza separata. Stato conservato al reload.
3. Assistenza: titolo/descrizione/contatto/allegato → errore simulato senza perdita dei campi → nuovo invio → numero pratica → assegnazione agenzia → accettazione tecnico → conclusione. Accesso tecnico alla pagina affitti respinto dalla vista demo.
4. Card: conferma blocco, persistenza, sostituzione con nuovo ID, vecchio ID ancora revocato.
5. Accesso: invito scaduto, OTP errato, OTP demo valido e attivazione dell’inquilino.
6. File non ammesso: rifiuto e stato di pagamento invariato.
7. Incasso parziale: 400 € verificati su 950 € lasciano 550 € residui, senza chiudere la rata.
8. Controllo formale documento: azione dell’agenzia, nuovo stato distinto dalla certificazione professionale.
9. Tastiera: apertura con Enter, otto Tab consecutivi confinati nel dialogo, Escape e ritorno al controllo iniziale.
10. Reduced motion: dialogo senza trasformazione. Revoca: nessun documento visibile. Fine contratto: nuove operazioni disabilitate. Errore: riprova ripristina la vista.

## break-ui + fix

Fonte dati: [src/data.ts](../../src/data.ts). Selettore in Profilo → Laboratorio; parametro persistente `?data=worst`, `empty`, `one`, `many`, `loading`, `error`, `revoked`, `ended`. È parte del prototipo, da rimuovere dall’interfaccia operativa.

| Dato / fonte | Tipo / limite | Caso usato |
| --- | --- | --- |
| Property.name/address, owners/tenants | Stringhe fixture, nessun contratto backend | Aleksandra Wiśniewska-Kowalczyk, indirizzo esteso con scala/interno, 王秀英, Jo, più parti |
| Doc.name/category/size/date/visibility/status | Fixture, nessun limite backend | Nome PDF lungo senza spazi, metadato dimensione mancante, visibilità e stati diversi |
| Property.rent / Payment.amount | Numero; input demo >0 e ≤9.999.999 | 12.345,67 €, zero su non locato, 400 € parziali, formato italiano |
| Collezioni case/documenti | Array; documenti paginati a 10 | 0, 1, 1.284 documenti; pagina 2 e conteggio locale |
| Ticket.title/description/contact | Input: 120 / 2.000 / 254 caratteri | Titolo e descrizione validati, email demo, dati conservati dopo errore |
| Allegato | PDF/JPG/PNG ≤5 MB; solo nome salvato | File demo accettato, eseguibile rifiutato |
| Card.name/id/status | Fixture/stringa e stato locale | Nome lungo, bloccata, sostituita e precedenti revocate |
| Immagine | Asset locale, dimensione riservata | object-fit, fallback grafico in codice; nessun avatar remoto |
| Ambiente | Larghezza minima testata 320 px | 360/390/1280/1440, testo radice al 200% effettivo, viewport ridotto |

| # | Severità | Campo / caso | Problema osservato | Correzione |
| --- | --- | --- | --- | --- |
| 1 | Broken | Card, nome lungo in colonna tablet | Intestatario sovrapposto al messaggio; min-height con aspect-ratio poteva allargare la card a testo 200% | Contenuto card in flusso flex, width/max-width 100%, altezza minima in rem e nome completo. [styles.css](../../src/styles.css) |
| 2 | Broken | Contrasto dei metadati | Alcuni testi secondari, stati, footer e dettagli PDF sotto 4,5:1 | Colori scuriti e fondo esplicito dei toast. [styles.css](../../src/styles.css) |
| 3 | Fragile | Corpo testuale | Dimensioni in px non rispettavano l’aumento della dimensione di testo | Rem e root 100%; verifica con override 200% e viewport 720 px, non solo emulazione del deviceScaleFactor |
| 4 | Fragile | Rata con importo parziale | Verifica generica avrebbe tolto la rata dalle priorità | Residuo esplicito e rata ancora da seguire. [pages.tsx](../../src/pages.tsx), [panels.tsx](../../src/panels.tsx) |

Scelte applicate nel perimetro autorizzato: nomi e indirizzi vanno a capo, non vengono troncati; importi non si accorciano; lista estesa paginata; metadati mancanti dichiarati. Non sono rimaste decisioni bloccanti da sottoporre all’utente per queste correzioni.

Hanno retto: stringhe lunghe dei documenti con `overflow-wrap`, icone con dimensione riservata, liste vuote, singolare/plurale, numeri locali, azioni della tab bar e permessi di ruolo dimostrativi. Dark mode e layout RTL non sono varianti supportate in questa proposta; il testo internazionale resta leggibile. Non è stato eseguito un test di carico backend.

## review-animations ed emil-design-eng

| Before | After | Why |
| --- | --- | --- |
| Target Motion `transform: none` da `scale(0.97)` interpolato a `scale(0)` nella prima implementazione | Target esplicito `scale(1)` o `translateY(0px)` | Il primo test browser ha rilevato il dialogo invisibile. Corretto e verificato nei percorsi. [ui.tsx](../../src/components/ui.tsx) |
| Sorgente Animate UI: flip prospettico, scala 0.8, blur | Scala 0.97 e opacity desktop; traslazione 24 px e opacity mobile, 220 ms | Superficie operativa calma, senza effetti di scena; un solo proprietario della transizione |
| Sorgente Rare UI: oscillazione, cifre rotanti e badge da scala 0 | Segnale statico con geometria originale | Navigazione ad alta frequenza: segnalare le notifiche non richiede movimento. [ui.tsx](../../src/components/ui.tsx) |
| Colori di navigazione interpolati durante il cambio pagina | Navigazione immediata | Evita stati transitori con contrasto insufficiente e latenza nelle azioni frequenti |
| Chiusura parent immediata nella prima bozza | Contenuto conservato durante l’uscita di AnimatePresence | Uscita lungo lo stesso percorso d’ingresso e focus ripristinato |
| Dimensioni piccole e contrasto debole in alcuni metadati | Testo più leggibile e palette secondaria scurita | La qualità del prodotto deve restare evidente a riposo e con movimento ridotto |

**Verdetto: Approve per il prototipo e le condizioni testate.** Nessuna animazione decorativa continua, `transition: all`, `scale(0)` applicato, spostamento con riduzione movimento o animazione sulle azioni da tastiera. Pannelli a 220 ms; pressione a 100 ms; nessuna animazione di layout su elenchi o dati. Le transizioni usano transform/opacity; hover cromatico limitato a puntatore fine. Non sono state misurate prestazioni GPU su telefoni o frame rate di dispositivi reali.

## Prove ancora necessarie su hardware

- iPhone / Safari: notch e home indicator, tastiera email/numerica, scroll del pannello aperto, zoom e rotazione.
- Android / Chrome: `interactive-widget`, tastiera aperta, ritorno dal selettore file, overscroll e pulsanti vicini alla barra di sistema.
- VoiceOver/TalkBack e navigazione da tastiera con lettore di schermo: nomi dei controlli, ordine del focus, errori e annunci dei toast.
- Prove di comprensione con proprietari, inquilini e operatori; sentire sul dispositivo reale velocità e continuità delle interazioni.

Nessuno di questi controlli hardware è dichiarato eseguito. La viewport 390×450 è una verifica di spazio disponibile, non una prova della tastiera fisica del telefono.

## 6 ottobre 2026 — evoluzione identità, prima tappa

Branch `design/visual-identity-evolution`. Chromium 153 / Playwright 1.63.0, Node 24.19.0 su Linux. L’identità nuova è ancora in studio: nessun simbolo scelto.

| Controllo | Esito |
| --- | --- |
| Build TypeScript/Vite, format:check | Passati; resta l’avviso bundle unico ~528 KB, già documentato |
| Test Playwright | **17 passati**, ultima esecuzione 19,9 s: 15 percorsi precedenti + 2 regressioni |
| Responsive e axe nei test | 11 schermate × 360/390/1280/1440 px; nessun overflow o violazione rilevati |
| Audit aggiuntivo | 24 scansioni, 0 violazioni: [report aggiornato](audit-accessibilita.json) |
| Stress | 320 px, dati lunghi, 0/1/1.284 documenti, testo al 200%, errori, revoca/fine rapporto passati |
| Tastiera e focus | Salto al contenuto senza cambiare rotta; ricerca dopo cancellazione; dialogo confinato, Escape e ritorno al controllo passati |
| Logo in studio | A/B/C su colore e in monocromia, 16/24/32 px; A più leggibile, B perde definizione della piccola porta. Nessun wordmark finalizzato |
| Tavola dei simboli | 320/390/1240 px, zero overflow e zero violazioni axe: [report](identita/verifiche.json) |
| Screenshot | 22 schermate frontend rigenerate + 2 tavole simboli |

### emil-design-eng / break-ui + fix

| Before | After | Why |
| --- | --- | --- |
| Skip link da Documenti cambiava hash in `#main-content`, poi mostrava Panoramica | Focus diretto a `main`, hash e filtri preservati (`src/App.tsx`) | Il router usa l’hash; saltare la navigazione non deve cambiare pagina |
| Cancellazione ricerca 32×40 px, focus perso quando il pulsante spariva | 44×44 px, ref all’input e focus ripristinato; conteggio annunciato (`src/pages.tsx`, `src/styles.css`) | Target touch più agevole e continuità della ricerca |
| Metadati di scadenze/indirizzi a 9–11 px; etichette riepilogo disallineavano i valori dopo l’aumento | Metadati/azioni 12 px, riserva di due righe per etichette e importo/azione su riga dedicata mobile | Leggibilità senza troncare i dati o ridurre il font per farli stare |
| Nessun riferimento attivo nelle sezioni aperte da Altro | Gruppo corrente e stato aperto espliciti (`src/App.tsx`) | Orientamento mobile |
| Icona card con banda bancaria | Tessera personale (Lucide ContactRound) | Coerenza con tessera di accesso ai servizi |
| Vite scandiva l’HTML autonomo generato e segnalava dipendenza non risolta | Scansione limitata all’entry `index.html` | Avvio del progetto riproducibile |

I dati stress già esistenti sono stati riutilizzati al loro confine originale (`src/data.ts`); non aggiunti nuovi scenari funzionali. Nomi, importi completi, liste vuote/estese e permessi demo continuano a reggere. Dark mode e RTL non introdotti.

### review-animations

| Before | After | Why |
| --- | --- | --- |
| Navigazione immediata e pannelli occasionali 220 ms, 120 ms di sola opacità in reduced motion | Conservati; nessun nuovo movimento sul confronto logo o sulla navigazione | Il gate animate non giustifica animazioni decorative o frequenti |

**Approve per il perimetro modificato e le condizioni emulabili.** Nessuna modifica al motore Motion o ai percorsi di ingresso/uscita; controlli tastiera senza transizione, focus confinato e movimento ridotto verificati dai test. Nessuna misurazione GPU o prova tattile hardware dichiarata.

Il primo test del menu ha erroneamente cercato il pulsante nello scope accessibile mentre Base UI lo rendeva correttamente inerte dietro al dialogo. Corretto il selettore del test; nessun indebolimento del confinamento del focus.

Prove iPhone/Android fisici, Safari/WebKit, VoiceOver/TalkBack e comprensione con utenti ancora necessarie. Zero violazioni axe non è una certificazione WCAG.

Anteprime statiche aggiornate: desktop 1440 px, cornice mobile 390 px da desktop, smartphone emulati 390 e 360 px; navigazione alla card riuscita, zero errori JavaScript e nessun overflow nel prototipo. HTML autonomo aperto da file con documento/dialogo funzionante e zero richieste HTTP esterne. [Risultati](verifiche-anteprime-identita.json).

## 6 ottobre 2026 — Legame integrato, identità 0.2

C scelto dall’utente; nome ancora aperto. Chromium 153 / Playwright 1.63.0 su Linux, Node 24.19.0. Il report precedente resta storico: qui i controlli ripetuti sulla nuova palette e sul simbolo integrato.

| Controllo | Esito osservato |
| --- | --- |
| Build e formattazione | Passate; avviso Vite sul bundle unico ~529 KB ancora presente |
| Suite funzionale e accessibilità | **18 test passati** nell’ultima esecuzione completa, incluso il nuovo controllo dei margini interni della tessera |
| Margini tessera | A 320/390/900/1440 px intestatario lungo e ID restano dentro il padding e non si sovrappongono |
| Audit aggiuntivo | 24 scansioni / 12 schermate a 390 e 1440 px, 0 violazioni |
| Responsive e stress | Suite con 360/390/1280/1440, stress 320, nomi lunghi, vuoti/1/1.284, testo 200% passata |
| Semantica dei percorsi | Documento/dichiarazione/verifica/quietanza separati, incasso parziale, blocco/sostituzione, errori e permessi demo passati |
| Guida marchio | 320/390/1240 px: nessun overflow, errore JS o violazione axe; tutti i 10 collegamenti download rispondono 200 |
| Logo e favicon | Regolare/piccolo, chiaro/scuro/mono, prove 16/24/32 px osservate; favicon SVG e PNG 16/32/180/512 generati dalla stessa geometria |
| Anteprime statiche | Desktop 1440, mobile da desktop con viewport 390, smartphone emulati 390/360; logo presente, nessun overflow/errore JS, navigazione card riuscita |
| Card piccola | “Tessera servizi” visibile a 11 px, titolare 13 px, ID 11 px; corretto vecchio override a 5 px |
| HTML autonomo | Favicon incorporata, documento/dialogo funzionanti, zero richieste HTTP esterne |
| Screenshot | 22 schermate frontend aggiornate + 2 guide marchio; archivio del confronto preservato come storico |

Report riproducibile: [verifiche-legame.json](verifiche-legame.json), script `scripts/verify-brand.mjs` con build statica su localhost:5174. [Audit aggiornato](audit-accessibilita.json). [Guida desktop](marchio/guide-1240.png) e [mobile](marchio/guide-390.png).

### Revisione emil-design-eng / review-animations / break-ui + fix

| Before | After | Why |
| --- | --- | --- |
| Monogramma EE e nome dentro il segno | Simbolo scelto Legame, autonomo, senza wordmark | Il nome resta da confermare e il prodotto si distingue dall’agenzia |
| Bosco/lime e colori verdi di supporto | Token semantici albicocca/bruno/avorio/terracotta; successi ancora verdi | Identità calda coerente senza confondere accento e stati |
| Motivo concentrico sulla tessera | Legame grande, statico e a basso contrasto dietro al simbolo pieno | Coerenza del marchio senza movimento o metafora bancaria |
| Offset del vecchio footer assoluto spostavano l’ID verso il bordo nella pagina Card | `inset: auto` sul footer in flusso e test dei margini interni | Allineamento e leggibilità anche con nomi lunghi |
| Override mobile riduceva Tessera servizi a 5 px | 11 px in tutte le viste, microtesto titolare/ID aumentato | Leggibilità della natura della card |
| Intera card bloccata desaturata | Testo esplicito, bordo tratteggiato e motivo neutro, senza filtro sull’intera card | Stato leggibile senza alterare tutti i contrasti |
| Navigazione istantanea e pannelli 220 ms | Conservati; nessun movimento nuovo sul logo o sulla guida | Il gate animate esclude animazione decorativa frequente |

**Approve per il movimento nel perimetro verificato.** Tastiera/focus e reduced motion passati; nessuna nuova animazione, loop, parallax o transizione di layout introdotta. Contrasti principali: bruno/albicocca 6,63:1, testo secondario/avorio 6,29:1, bianco/terracotta 6,64:1. Non usato bianco sull’albicocca per testo funzionale (2,00:1).

Limiti invariati: emulazione Chromium non sostituisce iPhone/Android fisici, Safari/WebKit, VoiceOver/TalkBack o prove con persone. Nessuna certificazione WCAG, misura FPS/GPU hardware o prova di stampa fisica dichiarata.

## Chiusura documentale e misura della gerarchia — 6 ottobre 2026

Non ripetuti build, suite E2E e audit axe: frontend invariato. Riesaminati screenshot già versionati; nuova osservazione Chromium della home con dati demo iniziali e font caricati, viewport 390×844 e 1440×1000. Rettangoli della tessera rispettivamente y 782–1022 e y 415–672 px. È una misura di layout a supporto della revisione, non una nuova validazione completa. Nessuna prova fisica. Dettagli e limiti in [REVISIONE_VISIVA.md](REVISIONE_VISIVA.md).

Per i soli documenti: controllo dei collegamenti locali e `git diff --check`. Nessun nuovo deploy; online resta Sites v3.
