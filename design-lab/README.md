# Tre direzioni visive — area di studio isolata

6 ottobre 2026. PR #3 integrata, nuova base `main` a `ed3a473`. Branch `design/visual-directions-lab`. Nessuna proposta approvata o importata dal prodotto.

- `npx vite --config design-lab/vite.config.ts`: laboratorio locale sulla porta 5175.
- `node scripts/build-design-lab.mjs`: typecheck, build isolata e HTML autonomo con immagini/font/licenze incorporati. Non modifica `.output/public` né l’anteprima del prodotto.
- `node scripts/capture-design-lab.mjs`: 18 screenshot, con laboratorio avviato.
- [Confronto, verifiche e istruzioni](../docs/design/esplorazioni/README.md).

I tre file Materia/Editoriale/Profondita compongono la home con lo stesso contenuto. main.tsx contiene il banco di prova e i percorsi dimostrativi; styles.css esplora le tre direzioni usando i token esistenti. I dati degli immobili e l’ID iniziale sono importati dalle fixture, il simbolo dalla sorgente condivisa. Nessuna scrittura in localStorage: lo stato della demo corrente rimane separato.

Il picker deriva dalla skill `prototype`, snapshot Emil `e8a175de22ae1e49370fc144c1f3bb9aeedf988d`, con licenza inclusa. `picker.css` conserva il CSS di riferimento; gli override esterni correggono solo contrasto, safe area, tastiera e riduzione movimento. La transizione width del picker è l’eccezione esplicita della skill, non un pattern da trasferire nel prodotto.
