# Esperienza 0.5 — rapporto di verifica

14 ottobre 2026. Base main `0481bb1`, branch `design/experience-0.5`.
Gli esiti della 0.4 rimangono evidenze storiche dei rispettivi commit.

## Controlli

Risultati osservati sul contenuto di questa consegna:

| Controllo | Esito |
| --- | --- |
| TypeScript + Vite | Build riuscita; avviso per bundle unico oltre 500 kB |
| Playwright, 2 worker | 61 test passati: 41 regressioni 0.3/0.4, 6 modello workspace, 14 UI workspace |
| Formattazione | `npm run format:check` riuscito |
| Audit dipendenze | 0 vulnerabilità riportate da `npm audit --json` |
| Audit workspace | 60 viste a 360/390/1280/1440 px: 0 violazioni axe WCAG A/AA/2.1 AA, overflow, immagini mancanti, errori JS e richieste esterne al supporto locale |
| Screenshot | 52 schermate dei percorsi e dei casi negati; ispezionate panoramica agenzia desktop e personale mobile |
| Anteprime | HTML autonomo da 1,41 MB e build condivisibile rigenerati |
| Build statica e offline | Percorso pratica → banco → documento → chiusura → spazio cliente riuscito sulla root statica, su `/app/#/prova` e nel file autonomo; nessun errore JS o richiesta esterna |
| BF02 | Nessun cambiamento o rigenerazione del kit esistente |

Script e test sono versionati per riprodurre i controlli:

```bash
npm ci
npm run build
npm test -- --workers=2
npm run format:check
npm audit
npm run dev
# In un altro terminale:
node scripts/workspace-qa.mjs
npm run preview:shareable
python3 -m http.server 5175 --directory .output/public
# In un altro terminale:
node scripts/workspace-static-qa.mjs
```

`tests/workspace-model.spec.ts` verifica lettura/esportazione per titolo,
bollette private, richieste per rapporto e agenzia, sessione/servizio/fine
rapporto, importi non validi, verifica senza fonte, quattro eventi economici,
residuo parziale e card personali distinte.

`tests/workspace-ui.spec.ts` verifica gli ingressi pubblici, il percorso completo
in quattro passi, il banco con conferma, storico/versioni/fonti, condivisione e
chiusura, utenze propria/locata, proprietario escluso, richiesta ritrovata
dall'agenzia e persistenza, dichiarazione/verifica/quietanza parziale, revoca e
recupero, reset, ricerca globale indipendente dai filtri, layout, tastiera e
movimento ridotto. Aggiunto un percorso completo a 360 px, oltre al dialogo di
navigazione mobile con Tab/Escape e ritorno del focus.

Le regressioni 0.3 e i test del modello/laboratorio 0.4 rimangono nella suite;
il loro ingresso tecnico è stato aggiornato a `/#/laboratorio`. Il link pubblico
`/#/prova` ora apre il nuovo prodotto. Gli script storici sono adattati alla
rotta di archivio, senza riscrivere i loro rapporti precedenti.

## Correzioni emerse

- Contrasto dei metadati e dei sottotitoli dei selettori utenze migliorato;
  l'opacità dei testi secondari non deve ridurre il contrasto effettivo.
- Sidebar scrollabile quando l'altezza disponibile non contiene tutti i comandi.
- Pannelli sopra entrambe le barre fisse: il percorso mobile aveva trovato
  un pulsante coperto dalla navigazione inferiore.
- Etichetta esplicita del selettore casa/contratto e ricerca globale separata
  dai filtri della libreria.
- Stato delle richieste corretto dopo l'aggiunta degli eventi al registro;
  ricarica dei test predisposta senza reinizializzare lo stato persistito.
- Riepiloghi e intestazioni Beta circoscritti al proprio contesto, oltre ai
  controlli sul recupero dei documenti; aggiunta una regressione specifica.
- Guard TypeScript/import e passaggio dalla shell legacy corretti prima della
  build finale. I primi tentativi falliti non sono conteggiati come successi.

## Evidenze e limiti

[Audit e layout](../../design/verifiche-experience-0.5.json),
[build statica / HTML autonomo](../../design/verifiche-statiche-experience-0.5.json),
[screenshot](../../design/screenshots/experience-0.5).

Chromium emulato, axe e verifiche del modello locale. Nessuna prova su hardware
fisico, screen reader, Safari/iOS o Android reali. Nessun test di sicurezza
server: le fixture sono nel bundle. Nessuna misura comparativa di tempi/costi,
telemetria o osservazione BF16 inventata. Il riscontro qualitativo dell'utente
che ha richiesto questa revisione è distinto da una prova con operatori.

La build conserva un bundle unico oltre la soglia di avviso Vite di 500 kB,
anche per mantenere l'anteprima HTML autonoma; non è una scelta di architettura
per produzione. BF02 invariato, BF16 aperto. Stato remoto e pubblicazione sono
registrati solo dopo il riscontro effettivo del servizio Sites.
