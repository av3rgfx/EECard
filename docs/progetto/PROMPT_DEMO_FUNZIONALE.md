/goal
Realizza nel repository https://github.com/av3rgfx/EECard la demo funzionale
0.4, locale, navigabile, ripristinabile e osservabile, con soli dati sintetici.
Deve permettere di provare end-to-end PF01 attivazione → PF02 ritorno al banco
→ PF05 recupero storico e rendere esplorabili PF03, PF04 e PF06. Rispondi in
italiano. Non attivare servizi, account, inviti, pagamenti, firme, NFC/wallet,
AI, telemetria o archivi reali e non effettuare merge.

Prima di lavorare verifica lo stato remoto della consegna indicata in
`docs/progetto/PROSSIMA_SESSIONE.md`; dopo l'integrazione aggiorna `main` e crea
un nuovo branch secondo `AGENTS.md`. Leggi nell'ordine: `AGENTS.md`; in
`docs/progetto/`, `PROSSIMA_SESSIONE.md`, `AVVIO_PROSSIMA_SESSIONE.md`, il piano
`demo-funzionale-2026-10-14/README.md`, `BACKLOG.md`, `specifiche-2026-10-08/`
e `validazione-bf16-2026-10-09/`; poi `PRODUCT.md`, `DESIGN.md`,
`DEVELOPMENT.md` e `docs/design/DECISIONI.md`. Usa il kit BF02 esistente senza
rigenerarlo. Non inventare osservazioni, tempi o costi e non pubblicare dati
personali.

Conserva C–Legame, nome provvisorio e design 0.3. Mantieni i confini esistenti:
permessi per agenzia, rapporto, immobile, contratto, intestazione, delega,
incarico, scopo e tempo; ruolo globale e ID card non bastano. Proprietario
senza accesso alle bollette personali dell'inquilino; tecnico limitato agli
incarichi. Documento caricato, pagamento dichiarato, incasso verificato e
quietanza restano eventi distinti; il parziale conserva il residuo. Fine
rapporto, fine adesione e revoca card restano separate.

Implementa una storia continua:

1. **PF01:** pratica operatore con agenzia, immobile, persone, relazioni
   temporali, contratto, fonti, conflitti e mancanti; correzioni attribuite;
   inviti e attivazione solo simulati, distinguendo account, adesione e card.
2. **PF02:** operatore demo autenticato; card/codice seleziona la persona ma
   richiede conferma, scopo e contesto; mostra sessione e dati minimi; gestisci
   card revocata, lettore/servizio indisponibile, retry e chiusura.
3. **PF05:** ricerca per titolo, tipo, anno o intervallo incerto; mostra fonte,
   contesto, versioni, correzioni, controlli e cronologia lavori; distingui
   lettura, condivisione ed esportazione simulate e applica i titoli validi.

Aggiungi due agenzie sintetiche e dimostra isolamento, dinieghi, fine rapporto
e titoli autonomi ancora validi. Collega PF03 casa propria/locata; PF04 bolletta
con importo, scadenza e QR facsimile senza pagamento; PF06 bozza deterministica
da template con fonti, mancanti, conflitti, versioni e revisione umana. Wallet,
secondo schermo, firma e suggerimenti assistiti devono essere fixture locali
chiaramente etichettate come simulazioni.

Aggiungi una modalità prova con scenari deterministici, avanzamento, reset,
note anonime ed esportazione solo locale. Gestisci esplicitamente migrazione o
reset del localStorage. Centralizza le regole di accesso: non affidarti solo a
elementi UI nascosti.

Verifica percorso completo e reset; permessi ammessi/negati tra due agenzie;
revoca, sessione chiusa, fine rapporto e titolo autonomo; storico/versioni;
retry senza duplicati; persistenza; tastiera, accessibilità, movimento ridotto
e layout 360/390/1280/1440. Esegui build, test, formattazione, audit e screenshot
pertinenti, registrando solo risultati osservati. Aggiorna anteprime e sito
Sites esistente secondo `AGENTS.md`, senza crearne uno nuovo.

Aggiorna README, prodotto, sviluppo, design, decisioni, backlog, continuità e
rapporti. Pubblica il branch e apri una nuova PR verificabile senza merge,
indicando cambiamenti, scenari, test, limiti e anteprima. BF16 resta aperto
finché non esistono osservazioni umane.
