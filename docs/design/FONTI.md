# Fonti, skill e attribuzioni

Consultazione: 6 ottobre 2026. Nessun catalogo completo è stato installato nel frontend. Le copie di lavoro dei repository delle risorse erano esterne al progetto; il prodotto conserva solo gli adattamenti necessari e le licenze.

## Base documentale

- PR [#1](https://github.com/av3rgfx/EECard/pull/1), risultata MERGED il 6 ottobre 2026 alle 08:48:11 UTC. Branch di design creato da `main` aggiornato, non dal branch di handoff ormai integrato.
- `AGENTS.md`, `PROSSIMA_SESSIONE.md`, `RISORSE_DESIGN.md`, `PROMPT_DESIGN.md` letti prima dell’implementazione.
- `EECard-studio-v0.1.pdf`, 21 pagine, letto integralmente tramite estrazione testuale. Usato come studio preliminare, senza trasformare raccomandazioni e ipotesi in decisioni approvate.

## Componenti realmente applicati

| Schermata / componente | Fonte e versione | Adattamenti EECard / licenza |
| --- | --- | --- |
| Dialoghi documento, assistenza, bonifico, card e menu mobile | [Animate UI Base Dialog](https://animate-ui.com/docs/components/base/dialog), commit `efeb96ffd7a3b7a4868667e4ac3c346620fb3044`; sorgenti `registry/components/base/dialog` e `registry/primitives/base/dialog` | Composizione Base UI + Motion e presenza in portal. Ridotto a un wrapper controllato, passaggio a `@base-ui/react`, CSS a token. Rimossi flip 3D, blur animato e scala 0.8. Scala 0.97→1 desktop, translateY 24→0 mobile, riduzione movimento, chiusura/focus. MIT + Commons Clause, [licenza integrale](LICENSE-Animate-UI.txt) |
| Campanella notifiche nell’header | [Rare UI Notification Bell](https://rareui.com/components/notificationbell), commit `b4de46efe4eb2613e22bb8134b482ed4e0c7736a`; `components/ui/notification-bell.tsx` | Riutilizzati silhouette SVG e geometria proporzionale del badge. Rimosse oscillazioni, contatori rotanti e `scale(0)`: la navigazione quotidiana richiede un segnale immediato. Pulsante nativo, nome accessibile, stato letto, colori EECard. MIT + Commons Clause + Attribution, [licenza integrale](LICENSE-Rare-UI.txt). Credito visibile nel footer e README |
| Feedback e notifiche di esito | Sonner 2.0.8 | Palette EECard, durata di transizione 220 ms, stato leggibile, testo italiano, riduzione movimento |
| Primitive accessibili | Base UI 1.8.0 | Gestione focus, Escape, isolamento del contenuto dietro al dialogo e ripristino focus |
| Iconografia | Lucide React 0.468.0 | Tratto coerente 1.7–2 px, icone decorative non sostituiscono etichette |
| Tipografia | @fontsource-variable/manrope 5.3.0 | Font locale, ottimizzazione ottica e dimensioni rem. [Licenza OFL](LICENSE-Manrope.txt) |

Le licenze Animate UI e Rare UI consentono l’uso nel prodotto, con restrizioni sulla redistribuzione dei componenti come catalogo o pacchetto autonomo. Questo repository contiene il prototipo EECard, non una libreria concorrente.

## transition.dev: verifica e limite

`https://transition.dev` restituisce ancora HTTP **503**. Nessuna API, skill o dipendenza di quel dominio è stata inventata o installata.

`https://transitions.dev/` è un sito distinto, accessibile. Sono state consultate la presentazione, `skill.html` e `terms.html` (termini aggiornati luglio 2026). Usato solo come confronto dei pattern di transizione, non come sostituzione confermata del dominio indicato. Il modello di licenza separa strumenti MIT e ricette con propri termini. Nessun contenuto Pro o raccolta di ricette copiato; la realizzazione del movimento deriva dalle skill lette di Emil e dall’adattamento Animate UI.

## Skill applicate

Fonte: [emilkowalski/skills](https://github.com/emilkowalski/skills/tree/e8a175de22ae1e49370fc144c1f3bb9aeedf988d/skills), commit `e8a175de22ae1e49370fc144c1f3bb9aeedf988d`. I sette SKILL.md sono stati recuperati e letti, non considerati implicitamente installati.

| Skill | Applicazione concreta |
| --- | --- |
| apple-design — prioritaria | Feedback alla pressione, gerarchie di peso/dimensione/interlinea, contenuti stabili, materiali limitati alla navigazione, controllo dell’utente e identità della card |
| mobile-native — prioritaria | viewport-fit, interactive-widget, dvh, safe area, input 16 px, hover per capacità, touch-action, zoom libero, scroll interno e distinzione emulazione/hardware |
| emil-design-eng | Componenti coerenti, attenzione ai dettagli, revisione visiva desktop/mobile e tabella prima/dopo |
| pick-ui-library | Verificata assenza di stack; scelti Base UI, Motion e Sonner nei compiti appropriati, mantenendo le risorse esplicitamente richieste |
| animate + RECIPES.md | Gate frequenza/scopo, pannelli occasionali, press feedback, percorso simmetrico, niente animazione sulla navigazione quotidiana |
| review-animations + STANDARDS.md | Audit su trasformazioni, durate, input tastiera, interruzione, riduzione movimento e animazioni eliminate; esito in VERIFICHE.md |
| break-ui + fix + CATALOG.md | Fixture plausibili, URL persistente, casi vuoto/uno/1.284, nomi lunghi, importi estremi, testo 200%, correzione card e contrasto |

Non applicate `prototype`, `animate-expo` o `write-swift`: non servivano varianti di un singolo componente o un’implementazione nativa. La skill cloud-environment-runtime è stata usata per accesso all’ambiente, verifica di rete e credenziali.

## Fotografie e asset

Fotografie illustrative scaricate da Unsplash, conservate localmente per evitare dipendenze di rete nella demo:

- `casa-salone.jpg`: https://images.unsplash.com/photo-1600210492486-724fe5c67fb0
- `casa-luminosa.jpg`: https://images.unsplash.com/photo-1600607687939-ce8a6c25118c
- `casa-studio.jpg`: https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3

Riferimento licenza: https://unsplash.com/license. Non sono fotografie degli indirizzi demo. Marchio, card concentrica e motivo grafico delle consulenze sono originali CSS. Il PDF in `public/documento-demo.pdf` è un facsimile locale generato per la demo, senza valore giuridico.

## Versioni riproducibili

Il lockfile è la fonte esatta: React/React DOM 19.3.0, Vite 7.3.7, TypeScript 5.9.3, Motion 12.43.0, Playwright 1.63.0, axe-core/playwright 4.13.0, Base UI 1.8.0, Sonner 2.0.8. Usare `npm ci` per riprodurre l’ambiente.
