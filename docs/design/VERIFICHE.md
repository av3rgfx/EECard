# Verifiche del prototipo EECard

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
| 1 | Broken | Card, nome lungo in colonna tablet | Intestatario sovrapposto al messaggio; min-height con aspect-ratio poteva allargare la card a testo 200% | Contenuto card in flusso flex, width/max-width 100%, altezza minima in rem e nome completo. [styles.css](../../src/styles.css:3952) |
| 2 | Broken | Contrasto dei metadati | Alcuni testi secondari, stati, footer e dettagli PDF sotto 4,5:1 | Colori scuriti e fondo esplicito dei toast. [styles.css](../../src/styles.css:3751) |
| 3 | Fragile | Corpo testuale | Dimensioni in px non rispettavano l’aumento della dimensione di testo | Rem e root 100%; verifica con override 200% e viewport 720 px, non solo emulazione del deviceScaleFactor |
| 4 | Fragile | Rata con importo parziale | Verifica generica avrebbe tolto la rata dalle priorità | Residuo esplicito e rata ancora da seguire. [pages.tsx](../../src/pages.tsx:156), [panels.tsx](../../src/panels.tsx:640) |

Scelte applicate nel perimetro autorizzato: nomi e indirizzi vanno a capo, non vengono troncati; importi non si accorciano; lista estesa paginata; metadati mancanti dichiarati. Non sono rimaste decisioni bloccanti da sottoporre all’utente per queste correzioni.

Hanno retto: stringhe lunghe dei documenti con `overflow-wrap`, icone con dimensione riservata, liste vuote, singolare/plurale, numeri locali, azioni della tab bar e permessi di ruolo dimostrativi. Dark mode e layout RTL non sono varianti supportate in questa proposta; il testo internazionale resta leggibile. Non è stato eseguito un test di carico backend.

## review-animations ed emil-design-eng

| Before | After | Why |
| --- | --- | --- |
| Target Motion `transform: none` da `scale(0.97)` interpolato a `scale(0)` nella prima implementazione | Target esplicito `scale(1)` o `translateY(0px)` | Il primo test browser ha rilevato il dialogo invisibile. Corretto e verificato nei percorsi. [ui.tsx](../../src/components/ui.tsx:128) |
| Sorgente Animate UI: flip prospettico, scala 0.8, blur | Scala 0.97 e opacity desktop; traslazione 24 px e opacity mobile, 220 ms | Superficie operativa calma, senza effetti di scena; un solo proprietario della transizione |
| Sorgente Rare UI: oscillazione, cifre rotanti e badge da scala 0 | Segnale statico con geometria originale | Navigazione ad alta frequenza: segnalare le notifiche non richiede movimento. [ui.tsx](../../src/components/ui.tsx:233) |
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
