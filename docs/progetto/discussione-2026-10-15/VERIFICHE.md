# Verifiche e consegna — 15 ottobre 2026

## Base e fonti

PR #12 letta via GitHub CLI prima del checkout: integrata il 14 ottobre alle
20:48:12 UTC, merge `24eb129e35675ff8f684bc308b8202cc7735a43a`; nessuna PR aperta
per questa consegna. Clone pulito e branch nuovo
`feat/studio-audio-incremento-locale`. Nessun merge dell'assistente.

Letti AGENTS, continuità/prompt/piano audio, PRODUCT, DESIGN, DEVELOPMENT,
BACKLOG, DECISIONI, analisi EA01–EA30, specifiche RF/PF/modello/offerte/fattibilità,
esperienza 0.5 e codice dei modelli/interfaccia. Consultate le fonti primarie
elencate in FATTIBILITA_BOLLETTE. Nessuna API di pagamento o chiamata AI.

ffprobe: AAC mono 48 kHz; durate 542,997 s e 100,885 s. Entrambi elaborati
integralmente con Whisper large-v3-turbo e small locali, più medium su AUDIO01
00:00–00:28, 02:10–02:44, 03:57–04:36, 05:50–06:29, 08:38–09:03 e AUDIO02
00:00–00:16, 00:49–01:07, 01:33–01:41. Il controllo può produrre timestamp
approssimativi ai bordi: non è allineamento umano. Diarizzazione locale con
due cluster provvisori; tutti i parlanti restano indicati come incerti.
Trascrizioni private Markdown/SRT e inventario con corrispondenze/digest fuori
repository. Nessun audio o appunto originale inviato a servizi esterni.

Primo avvio ASR fermato da incompatibilità della libreria audio: corretto
nell'ambiente privato e ripetuta l'elaborazione completa. Nessuna dipendenza
ASR aggiunta al progetto. Il tentativo di diarizzazione automatica senza numero
di voci produceva cluster instabili; non è stato presentato come risultato
valido. I limiti del tentativo a due voci sono espliciti nella consegna privata.

## Implementazione IN01

- `service.ts`: lettura autorizzata dell'adesione sintetica e comando idempotente
  `cancelRenewal`, distinto da operazioni sul rapporto/tessera. Workspace v1
  retrocompatibile tramite default del nuovo campo, tipo errato segnalato.
- `Experience.tsx`: ingresso personale, periodo, riepilogo/conferma/annullo,
  focus e stato annunciato. Il successo segue il salvataggio; errore recuperabile.
- `workspace.css`: righe di riepilogo e pulsante contenuto anche col testo al 200%.
- `tests/subscription.spec.ts`: otto controlli di modello/UI, negativi,
  idempotenza, compatibilità, persistenza fallita, reset, tastiera/axe/layout.

Nessuna modifica a BF02, schema 4, prototipo 0.3, grants, ledger, marchio o
integrazioni. Il modello di rinnovo è una sola fixture Cliente 01. Non c'è
cessazione programmata: la data della demo resta fissa e il periodo è illustrativo.

## Controlli eseguiti ed esito osservato

| Controllo | Esito |
| --- | --- |
| Nuovi test mirati | Prima esecuzione: 7/8, trovato overflow del pulsante desktop con testo 200%; corretto. Tutti gli 8 passati nella successiva suite |
| Suite completa, 69 test | 66 passati; 3 timeout nei controlli axe/layout del prototipo 0.3 mentre erano attive elaborazioni audio CPU. Nessuna asserzione funzionale fallita in quei tre casi |
| Ripetizione separata dei 3 timeout, un worker | 3/3 passati (390/1280/1440 px). Tutti i 69 controlli risultano quindi superati tra suite e ripetizione, non in un'unica esecuzione verde |
| Accessibilità nuova UI | Axe WCAG A/AA/2.1: zero violazioni nei tre viewport 360/390/1440; focus/annunci, Escape, annullo e ritorno al controllo; movimento ridotto |
| Testo al 200% | Nessun overflow pagina/dialogo nei tre viewport dopo la correzione; controllo dimensionale desktop 758 px contenuto / 758 px scroll |
| Revisione visiva | Screenshot 390/1440 della conferma ispezionati; confronto iniziale con home 0.5 nel browser |
| Build TypeScript/Vite e anteprima autonoma | Completate; resta avviso del bundle unico oltre 500 kB, già noto. Nessun nuovo runtime package |
| Smoke HTML autonomo | Percorso rinnovo riuscito da file locale; zero errori JavaScript e richieste HTTP esterne |
| Formattazione | `npm run format:check` passata |
| Diff e documenti | `git diff --check`, collegamenti locali degli elaborati e limite 4.000 caratteri del prompt controllati prima del commit |
| Riservatezza | Diff e nuovi file verificati: niente audio, trascrizione integrale, nomi originali o appunto grezzo; screenshot solo fixture. Pattern audio/trascrizioni private aggiunti a `.gitignore` |

Comandi riproducibili:

```bash
npm ci
npx playwright install chromium
npx playwright test tests/subscription.spec.ts --workers=2
npm test -- --workers=3
npx playwright test tests/prototype.spec.ts --grep 'layout (390|1280|1440),' --workers=1
npm run preview:portable
npm run format:check
git diff --check
```

Gli screenshot sono [mobile](screenshots/rinnovo-390.png) e
[desktop](screenshots/rinnovo-1440.png). L'[HTML autonomo](../../design/anteprima.html)
è rigenerato per il nuovo codice. Il tentativo preliminare di cattura tramite
selettore scenario è stato interrotto da un timeout; le catture consegnate sono
state ripetute con fixture iniziale e movimento ridotto. Non rappresentano dati reali.

## Limiti e continuità

Nessuna prova umana BF16, dispositivo fisico, Safari/iOS, Android o screen reader.
Nessuna trascrizione certificata o identificazione certa delle voci. Nessun
risparmio, disponibilità a pagare, copertura o qualità OCR misurati. N02 e BF16
restano aperti, BF02 non rigenerato. Non eseguito nuovo audit npm: la verifica
precedente non è riportata come controllo ripetuto qui.

Nessun deploy: il sito conserva Sites v8, sorgente online
`448f3721760ec3289920f092fa919240b50be2d4`. La richiesta corrente è uno studio
con primo intervento locale e PR, non aggiornamento implicito del servizio pubblico.
La PR registra codice/documentazione; l'HTML portatile è locale, senza hosting.

Il branch e il collegamento della PR vengono registrati qui dopo la creazione.
Nessun merge e nessun servizio reale autorizzati da questa consegna.
