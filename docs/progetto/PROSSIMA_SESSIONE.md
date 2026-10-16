# EECard — punto di ripresa

Aggiornato il 16 ottobre 2026, dopo la ripresa della pubblicazione interrotta. Repository: https://github.com/av3rgfx/EECard.

## Priorità: valutare la proposta casa prima dell’integrazione estesa

Leggere [proposta navigabile, mappa e copione](proposta-casa-2026-10-15/README.md)
e [verifiche](proposta-casa-2026-10-15/VERIFICHE.md), poi la
[visione confermata](visione-casa-2026-10-15/README.md). Le risposte C33/C34 sono
acquisite: gestire casa e bisogni collegati con semplicità, accedere, monitorare,
verificare, pagare e richiedere assistenza. Non ripetere l’analisi delle fonti.

La proposta è implementata a **`/#/casa/home`**, con home desktop/mobile, card,
casa, attenzione, pagamento simulato e assistenza. Casa/Pagamenti/Assistenza/Profilo
restano navigazione candidata; non inferire approvazione dai test o dalla pubblicazione.
Lo spazio attuale `/#/spazio/overview` e `/#/prova` resta separato e offre un link
alla proposta; mantiene l’agenzia operativa, i tecnici e le funzioni precedenti.

La proposta usa dati sintetici in una sessione **isolata in memoria**, azzerata
ricaricando o uscendo verso lo spazio attuale. Non modifica localStorage 0.4/0.5,
archivi, ledger o rinnovo della demo precedente. Nessuna migrazione di produzione.
Riusati policy/comandi IN01, BillsPanel IN03 e BillNotice IN04: non rifarli.

## Come valutarla

[Apri la proposta](https://eecard-design-preview.uepacio.chatgpt.site/#/casa/home).

1. Home: tessera, azione «Paga una bolletta», priorità con stato ignoto, casa,
   documenti e richieste. Confrontare gerarchia e raggiungibilità desktop/mobile.
2. «Verifica e paga»: originale IN04, controllo preliminare, conferma simulata,
   riscontro. «Esplora un esito» permette positivo, ignoto ed errore. Incasso e
   quietanza restano assenti; esito ignoto blocca la ripetizione del tentativo.
3. Pagamenti → Aggiungi / apri bollette: importazione/rettifica IN03, 84 → 79,
   versioni e originali; niente duplicato del dovuto o aggiramento del replay.
4. «Chiedi assistenza» o richiesta di verifica dalla bolletta: descrizione,
   riepilogo modificabile, riferimento, stato e prossimo passo. Nessun invio.
   Casa Atelier non riceve un titolo richieste inesistente: limite esplicito.
5. «Proposta · simulazione» apre scenari: una/più case, nessuna urgenza con
   richiesta in corso, domiciliazione, pagamento indicato, rettifica, diniego.
   Con filtro singolo la casa torna espansa; Vedi immobili è sempre espanso.
6. Profilo → Gestisci abbonamento riusa IN01; non è fine rapporto/card.

Il prossimo lavoro dipende dal feedback dell’utente su mappa/home/percorsi,
poi dall’eventuale autorizzazione a integrarli. **Non avviare IN05 automaticamente**.
C–Legame, naming provvisorio e Materia/Editoriale conservati. P20/P21 candidati.

## Remoto e pubblicazione

PR #15 verificata integrata alle 19:57:17 UTC, merge `7c4e503`.
PR #16 verificata integrata alle 19:59:34 UTC, merge
`731958709e6ea5ed133112e523f7747672c9fcdc`. Nuovo branch **`feat/proposta-casa`**
da `origin/main` aggiornato che contiene la continuità. Nessun merge dell’assistente.
[PR #17](https://github.com/av3rgfx/EECard/pull/17) **aperta**, verificata alla
ripresa del 16 ottobre; base main, branch `feat/proposta-casa`. Nessun merge.

**Sites v11 pubblicata**, esito nativo `succeeded` il 16 ottobre 2026 alle
**06:38:11 UTC** (08:38:11 Europe/Rome). Sorgente effettivamente online:
`73d6e53ed1876ab113d2a50521061552e1583a5e`, presente su GitHub e nel repository
sorgente Sites. Stesso project ID, URL e accesso pubblico conservati.
La v11 era già salvata prima dell’interruzione: alla ripresa verificato che non
avesse deployment, poi pubblicata senza creare una nuova versione.
[Registro Sites](../design/ANTEPRIME_WEB.md). Il commit documentale di chiusura
aggiorna soltanto Markdown: non cambia gli asset e non richiede deploy identico.

Prima di scegliere un prossimo branch verificare la PR sul remoto. Riutilizzarla
solo per la stessa consegna se aperta; dopo merge ripartire da main aggiornato
su branch dedicato. Nessun merge senza richiesta. Aggiornare Sites per modifiche
verificate; sessioni solo documentali verificano l’allineamento senza deploy identico.

## Verifiche eseguite e confini

**104/104 test** passati, inclusi 10 nuovi; dopo la rifinitura mobile ripetuti
3 controlli di layout/axe a 360/390/1440. Build/HTML autonomo/statico generati;
smoke dei due percorsi ai tre viewport senza errori JS o richieste esterne.
Formattazione mirata e whitespace passati. Alla ripresa del 16 ottobre non
sono stati ripetuti test applicativi o build: sorgenti e artefatti invariati. Screenshot, copertura e limiti nel
rapporto. Avviso Vite bundle >500 kB conservato (~702 kB JS non compresso).

Nessuna osservazione umana sostitutiva: **BF02 invariato, BF16 aperto**.
N02/PB04 fisico e BF01/BF03/BF17 restano aperti. Non risolti prezzi, primo pagante,
copertura, budget, conservazione, partner/costi di pagamento o architettura.
Nessun pagamento, notifica, account, OCR, QR autentico, chiamata o hardware reale.
Fonti audio, trascrizioni integrali e dati personali restano privati fuori repo.
[Prompt corrente](PROMPT_NUOVA_SESSIONE.md), entro 4.000 caratteri.
