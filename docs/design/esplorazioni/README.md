# Archivio — tre direzioni confrontate

6 ottobre 2026 · archivio degli esempi preliminari. **Scelta ricevuta: Materia e luce con pagine aperte come Editoriale**, senza contenitori-card ripetuti. La combinazione è integrata nel prodotto; gli esempi sotto conservano il confronto originale. Simbolo C Legame invariato; il nome resta da confermare. PR #3 verificata integrata il 6 ottobre alle 11:44:41 UTC. Nuovo branch `design/visual-directions-lab` da main `ed3a473164b2965168a11a538a6a0b21e6fb7844`.

## Aprire e provare

[Anteprima interattiva autonoma](anteprima.html): scaricare e aprire nel browser. Funziona anche offline, con font e immagini inclusi. Il laboratorio locale è sulla porta 5175; non c’è un inoltro browser condivisibile nell’ambiente di questa sessione. Questo HTML conserva la revisione preliminare; le anteprime del prodotto integrato sono sul medesimo Sites, come registrato in [ANTEPRIME_WEB.md](../ANTEPRIME_WEB.md).

Il selettore inferiore cambia direzione; `1`, `2`, `3` e le frecce fanno lo stesso. `R` o il pulsante ↻ apre la demo dell’affitto. Su desktop **Mobile 390** mostra un viewport reale a 390 px, senza ridimensionare artificialmente l’interfaccia. Su telefono il layout occupa la larghezza disponibile.

Ogni direzione include:

- **Panoramica:** tessera come primo contenuto dominante, stato e gestione, prossima azione e gli stessi tre immobili.
- **Tessera:** dettaglio, nome lungo, stato critico bloccato e sostituzione simulata. Il vecchio identificativo resta revocato.
- **Affitto:** quattro eventi selezionabili e demo animata con pausa; errore/riprova, passaggio esplicito tra attori, fonte obbligatoria, incasso parziale e quietanza separata.
- **Movimento ridotto:** selettore esplicito più preferenza del sistema; niente spostamenti o riproduzione automatica. I passaggi manuali restano accessibili.

**Le differenze** apre beneficio, compromesso e raccomandazione. Il selettore di fasi è uno strumento del confronto, non una nuova autorizzazione operativa.

## Confronto

| Direzione | Scelta visiva e UX | Compromesso |
| --- | --- | --- |
| **1 · Materia e luce — consigliata** | Tessera bruna opaca, grana fine, luce radente e ombra di contatto. Oggetto a sinistra e azione affiancata. Il processo usa una sequenza orizzontale e un riepilogo stabile. | Meno scenografica di Profondità; la qualità vive nella precisione dei materiali e nel ritmo. |
| **2 · Editoriale e architettura** | Tessera albicocca, tipografia più espressiva, bordi netti, griglia asimmetrica e fotografie da fascicolo. Il processo ha un indice verticale desktop. | La composizione richiede più spazio e la prossima azione scende sotto la tessera. Sul telefono va controllata la lunghezza dei testi. |
| **3 · Luce e profondità** | Tessera al centro della scena scura, contesto personale a sinistra, prossima azione su un piano chiaro a destra. Il processo distingue la sequenza scura dal lavoro su carta chiara. | Contrasto tra scene più forte; è la proposta più teatrale e richiede verifica percettiva su telefono nell’uso frequente. |

Consiglio **Materia e luce**: rispetta la priorità dell’oggetto personale, mantiene vicina l’azione e regge bene l’uso quotidiano. La combinazione con la composizione editoriale è stata successivamente scelta esplicitamente dall’utente.

## Critica del punto di partenza

Browser Chromium, home originale a 390×844: tessera y **782,20–1022,20 px**, quindi quasi interamente fuori dal primo viewport. Le superfici uniformi davano peso simile a tessera, priorità e moduli; il processo richiedeva di collegare spiegazioni distanti. Nel laboratorio la tessera arriva intorno a y **240–245 px** e termina intorno a **454–458 px**, prima di saluto e riepiloghi. Le misure includono la barra del laboratorio, che non farà parte del prodotto.

[Confronto mobile](confronto-mobile.png) · [Video delle tre demo animate](demo-movimento.webm) · [Home desktop/mobile e viste di dettaglio](screenshots.json) · [Screenshot](screenshots).

## Dati e confini conservati

Alessandro Rossi, tessera `EE · 2048`, Casa Tortona / Via Tortona 24, Milano, Casa Brera e Studio Navigli derivano dalle fixture esistenti. Canone Tortona 950 €, scadenza 10 ottobre, importo parziale 400 € e residuo 550 € derivano dal caso già presente nei test. La fonte dimostrativa è `Movimento parziale dimostrativo 001`; quietanza `Q-DEMO-P1`, facsimile dei soli 400 €.

Caricamento/dichiarazione: Sofia Bianchi, inquilina. Verifica/quietanza: Alessandro Rossi, beneficiario demo. Attore e ruolo sono espliciti anche nell’intestazione. Nessuna tessera inventata per agenzia o tecnico; nessun backend, prezzo commerciale, disponibilità, copertura, circuito bancario o nuovo servizio. Il laboratorio non scrive nella persistenza della demo attuale. Le foto sono illustrative, non fotografie degli indirizzi dimostrativi.

## Skill e movimento

Recuperato dal repository ufficiale lo snapshot Emil `e8a175de22ae1e49370fc144c1f3bb9aeedf988d`; letti e applicati [apple-design](https://github.com/emilkowalski/skills/blob/e8a175de22ae1e49370fc144c1f3bb9aeedf988d/skills/apple-design/SKILL.md), [mobile-native](https://github.com/emilkowalski/skills/blob/e8a175de22ae1e49370fc144c1f3bb9aeedf988d/skills/mobile-native/SKILL.md), [emil-design-eng](https://github.com/emilkowalski/skills/blob/e8a175de22ae1e49370fc144c1f3bb9aeedf988d/skills/emil-design-eng/SKILL.md), [prototype](https://github.com/emilkowalski/skills/blob/e8a175de22ae1e49370fc144c1f3bb9aeedf988d/skills/prototype/SKILL.md), find-animation-opportunities, animate e review-animations, inclusi PICKER, ricetta press e standard pertinenti. `break-ui + fix` è stato applicato nell’integrazione successiva; i controlli qui documentati riguardano gli esempi preliminari.

| Posizione | Scopo / frequenza | Ricetta e comportamento |
| --- | --- | --- |
| Nuovo evento affitto | Indicazione di stato, occasionale | WAAPI, opacity .5→1 e translateY 6→0, 160 ms, ease-out (0.23,1,0.32,1); retarget dalla presentazione in caso di tap ravvicinati |
| Quota incasso verificato | Evidenziare l’importo verificato, occasionale | Barra scaleX 0→400/950, 220 ms, token ease-out; importi/testi aggiornati subito |
| Pressione | Feedback immediato | scale .97, 100 ms; nessuna trasformazione con tastiera o reduced motion |
| Demo guidata | Spiegazione, solo avvio esplicito | Avanzamento fra eventi ogni 2,4 s, pausa e interruzione immediata; finisce sulla quietanza, nessun loop |

Navigazione quotidiana, cambio variante, cifre, fotografie e tessera non hanno animazioni di ingresso obbligatorie. Nessun parallax, inseguimento del puntatore o bagliore in loop. Con movimento ridotto il processo usa solo opacity 120 ms; niente autoplay. Materiali e gerarchia restano leggibili da fermi.

Licenze Manrope/OFL, React, Lucide e picker sono incorporate nell’HTML autonomo. Animate UI e Rare UI non sono nuovi adattamenti di questo laboratorio; le licenze e attribuzioni del prodotto esistente restano intatte. Foto locali e fonti Unsplash in [FONTI.md](../FONTI.md). `transition.dev` e `transitions.dev` restano distinti; nessun nuovo contenuto o pacchetto recuperato da quei domini.

## Verifica eseguita

[Rapporto completo](verifiche.json) · [Verifica offline](verifica-offline.json).

- TypeScript strict e build Vite del laboratorio passati. Avviso bundle unico ~857 KB perché incorpora le fotografie per l’uso offline; nessuna modifica al bundle del prodotto.
- **27 combinazioni axe:** 18 viste desktop/mobile + 9 stati critici, incasso verificato e confronto; zero violazioni rilevate.
- **34 osservazioni d’interazione:** comprese 18 verifiche geometriche a 320/360/390 px con testo normale e al 200%. Ulteriore controllo di tutte le 9 combinazioni vista/direzione a 320 px con testo 200% senza overflow.
- Focus dopo cambio variante, apertura verifica, Enter nel form, risultato; tastiera senza movimento. Errore recuperabile, fonte obbligatoria, parziale/residuo, quietanza e identificativo precedente revocato verificati.
- Retarget osservato durante una seconda azione dopo 55 ms; demo automatica termina senza movimento residuo. Movimento ridotto manuale e OS rispettato.
- HTML autonomo aperto offline da file, tre direzioni e navigazione tessera funzionanti, immagini/font caricati, nessuna richiesta HTTP e nessun errore JavaScript.

| Before | After | Why |
| --- | --- | --- |
| Alcuni metadati/picker insufficientemente contrastati | Contrasto corretto sulle tre superfici | Lettura coerente anche nella scena scura |
| Campi/focus del percorso potevano perdere continuità | Form nativo, Enter e focus esplicito | Verifica completabile da tastiera |
| Nomi e importi estremi forzavano la larghezza a 320 px | Wrapping, colonne minmax e dimensioni intrinseche | Testo completo anche al 200% |
| Secondo tap riavviava l’animazione dalla posizione iniziale | Retarget dal fotogramma corrente | Continuità durante input ravvicinati |

**Verdetto movimento: Approve per gli esempi isolati nelle condizioni emulabili.** Non è approvazione della direzione da parte dell’utente.

Limiti: Chromium emulato, non hardware iPhone/Android, Safari/WebKit o screen reader. Il 200% riguarda il testo, non una prova di zoom browser o tastiera fisica. Nessuna certificazione WCAG o misura GPU hardware. La suite del prodotto esistente non è stata rieseguita: i suoi file sorgenti sono invariati.

## Punto di arresto richiesto

Attendere scelta o richiesta di modifiche. Nessuna integrazione nel frontend, nessun aggiornamento del sito Sites, nessun push/PR anticipato rispetto alla scelta. Dopo la conferma: integrare la direzione concordata, verificare i percorsi del prodotto, aggiornare sistema/screenshot/documenti, pubblicare sullo stesso project ID, salvare sul remoto e preparare una PR senza merge.
