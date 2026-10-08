# EECard — punto di ripresa

Aggiornato l'8 ottobre 2026 dopo la ripresa funzionale. Repository unica:
https://github.com/av3rgfx/EECard.

## Obiettivo e risultato corrente

L'utente ha chiesto di proseguire studio e preparazione dello sviluppo partendo
dalla consegna EA01–EA30, senza rifare l'analisi né attivare servizi reali.
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

La [PR #5](https://github.com/av3rgfx/EECard/pull/5) è integrata l'8 ottobre 2026
alle 19:32:22 UTC. Base verificata: main
`a8e0ca7a0641685462ac209c1570ef421631c121`. Questa ripresa usa il nuovo branch
`docs/specifiche-funzionali-2026-10-08`. Nessun merge eseguito nella sessione.
Per PR e salvataggio effettivo consultare il rapporto di verifica della consegna.

Prima di riprendere controllare il remoto: se la PR di questa consegna è ancora
aperta, riutilizzarla; dopo il merge partire dal main aggiornato e da un nuovo
branch. I riferimenti a PR #4/#5 aperte nei registri storici descrivono checkpoint
superati e non devono guidare il checkout.

## Ordine di lettura

1. AGENTS.md e questo file.
2. [Cartella della conversazione](discussione-2026-10-07/README.md), inclusi analisi,
   contesto e PROMPT_NUOVA_SESSIONE.md, per origine e timestamp degli EA.
3. PRODUCT.md, DESIGN.md, DEVELOPMENT.md, [BACKLOG.md](BACKLOG.md) e
   [DECISIONI.md](../design/DECISIONI.md).
4. Nuove specifiche sopra; studio v0.1 §§3, 6, 8, 11–13 e sorgenti pertinenti
   prima di progettare o implementare ulteriori cambiamenti.

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
Jarvis, destinatari degli schermi e documenti da firmare. Nessuna risposta è
registrata in questa consegna: IF01 e IF04 restano ipotesi, non assensi impliciti.
Prima di una nuova sessione verificare eventuali risposte successive dell'utente.

Quote, unità, IVA e inclusioni restano aperte. I 600 euro annui riguardano alcuni
clienti già gestiti; 50/15 e le cifre instabili del nuovo audio non sono listini.
Territorio, volume, team, budget, copertura e responsabilità devono essere definiti
per il lancio. Nessun rinvio di pagamenti, app, 3D, AI o totem è già approvato.

**Prossima attività:** revisionare il beneficio R1 e organizzare la prova
PF01 → PF02 → PF05 con due operatori e fascicoli sintetici. Usare scenari,
misure prima/dopo e costo operativo descritti in OFFERTE_RILASCIO; registrare
l'esito senza confonderlo con vendite o disponibilità a pagare. Dopo la scelta,
tradurre il percorso in contratti API e prove di autorizzazione con due agenzie
sintetiche, prima di dati reali o integrazioni operative.

## Prototipo, verifiche e anteprime

Frontend React/TypeScript/Vite, fixture e localStorage; nessun backend, account,
archivio server, pagamento, NFC/wallet, firma, domotica o AI operativo.
Questa sessione modifica solo documentazione. Verifiche: coerenza, tracciabilità,
link locali, diff e identità del salvataggio remoto nel rapporto di consegna.
Nessun nuovo test UI, collaudo hardware o deploy.

Ultima versione pubblicata documentata: Sites v5, 6 ottobre alle 14:18:39 UTC,
sorgente `65ac9e092c17d9113d85106fa3d04fbb9770cab5`.
[Desktop](https://eecard-design-preview.uepacio.chatgpt.site/desktop/) ·
[Mobile](https://eecard-design-preview.uepacio.chatgpt.site/mobile/).
La versione live non è stata ricollaudata in questa ripresa. Le prove frontend
precedenti restano datate in VERIFICHE.md del design; non sono state rieseguite.

Non pubblicare audio, trascrizione integrale, dati personali o documenti reali.
