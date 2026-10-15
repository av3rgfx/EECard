# EECard — punto di ripresa

Aggiornato il 15 ottobre 2026. Repository: https://github.com/av3rgfx/EECard.

## Priorità corrente: riallineare il prodotto prima del prossimo sviluppo

Leggere prima [visione casa e proposta di struttura](visione-casa-2026-10-15/README.md).
Risposte esplicite dell'utente: il motivo d'acquisto è gestire tutto ciò che
riguarda la casa con semplicità — accedere, monitorare, verificare, pagare e
richiedere assistenza per burocrazia, documenti, tecnici, abbonamenti e bollette.
La home deve mostrare card, casa, attenzione immediata e pagamento semplificato.
Home e struttura del prototipo sono giudicate vicine ma ancora non corrispondenti.

C33/C34 registrano queste conferme. P20 propone home per casa/priorità/azioni e
navigazione Casa, Pagamenti, Assistenza, Profilo: **non ancora approvate**.
L’utente ha confermato di proseguire con questo lavoro nella prossima sessione
(C35): concretizzare la mappa dell’esperienza e una proposta navigabile di home
desktop/mobile, con percorsi bolletta e assistenza. Partire dalle risposte già
ricevute; dettagli di menu/layout restano candidati, da valutare prima della
revisione estesa. Non ripetere la sola discussione astratta del prodotto.
Non avviare IN05 automaticamente. Conservare IN01/IN03/IN04, identità e confini
della demo; nessun pagamento o servizio reale autorizzato.

PR #15 **integrata dall'utente** il 15 ottobre 2026 alle 19:57:17 UTC,
merge `7c4e5034bf68ed9154d9601b6edd038a840c5962`, verificato sul remoto.
Il branch documentale `docs/visione-casa-2026-10-15` deriva dalla consegna IN04
`7446fc8`, ora presente in main. La [PR #16](https://github.com/av3rgfx/EECard/pull/16)
è aperta per riallineamento e chiusura, con base aggiornata a **main**. Il diff
contiene solo Markdown, senza duplicare IN04; nessun rebase o merge necessario.

Prima della prossima implementazione verificare la #16: se integrata, ripartire
dal main aggiornato con nuovo branch dedicato; se ancora aperta, usare una base
che includa questa continuità e mantenere distinta la consegna applicativa.
Nessun merge dell'assistente.

Sites verificato v10 e pubblico, asset locali identici al commit online.
Nessuna modifica frontend o nuovo deploy in questa consegna documentale.

## Ultima consegna applicativa: IN04 — Mostra avviso

Leggere [implementazione/copione](mostra-avviso-2026-10-15/README.md) e
[verifiche](mostra-avviso-2026-10-15/VERIFICHE.md), poi il
[piano IN01–IN10](discussione-2026-10-15/PIANO_INCREMENTALE.md).
IN01, IN03 e studio audio sono già conclusi: non ripeterli.

Utenze → Mostra avviso apre il riepilogo della versione corrente; dal dettaglio
apre quella selezionata. Importo/creditore/scadenza, riferimento testuale sullo
stesso telefono e originale completo. Rettifica 84 → 79 EUR, storico superato
esplicito e passaggio alla corrente. Codice assente/illeggibile/formato non
supportato con recupero; ignoto, domiciliazione e pagamento indicato distinti.
Facsimili testuali non scansionabili/non pagabili, nessun canale operativo.

`readBillNotice` rivaluta permessi e fonte/versione a ogni lettura. Dialogo
esistente con Escape/focus; revoca/cambio contesto rimuovono dati non autorizzati.
Nessuna scrittura economica o evento dalla consultazione. Schema 4 e workspace
v1 invariati; nuove bollette/versioni restano nelle Utenze, ricerca/export e
condivisione globale non estesi. L'archivio 0.4 resta uno snapshot iniziale.

## Remoto e pubblicazione

PR #14 verificata **integrata** il 15 ottobre 2026 alle 06:36:01 UTC,
merge `ad8b928c7d6cff1a8797225fe1de92716225e735`. Nuovo branch
`feat/in04-mostra-avviso` da origin/main aggiornato.
[PR #15](https://github.com/av3rgfx/EECard/pull/15) **integrata dall’utente**
il 15 ottobre alle 19:57:17 UTC, merge `7c4e503`. Nessun merge dell’assistente.

Sites **v10 pubblicata**, `succeeded` il 15 ottobre 2026 alle **12:26:21 UTC**,
sorgente `a1223ff657a300c47ab8cbb1771a99da8727a707`, presente su GitHub e nel
repository sorgente Sites. Comprende IN01/IN03/IN04.
[Stesso sito](https://eecard-design-preview.uepacio.chatgpt.site/),
[registro Sites](../design/ANTEPRIME_WEB.md). Manifest e accesso pubblico invariati.
La chiusura successiva aggiorna solo documenti: gli asset corrispondono alla v10,
non serve un deploy identico. Non confondere il nuovo HEAD documentale con il
commit effettivamente online.

Regola permanente: pubblicare gli aggiornamenti verificati del prototipo sullo
stesso Sites a ogni sessione, senza una nuova conferma. Push GitHub e deploy
sono distinti; annotare versione/commit online. Solo documenti con asset già
allineati non richiedono deploy identico. Prima del branch verificare sempre
la PR: riuso solo se aperta per la stessa consegna, dopo merge nuovo branch da
main aggiornato. Non integrare in main senza richiesta.

## Come provare e verifiche

Avvio locale: `npm ci`, `npm run dev`. Ingresso `/#/spazio/overview`;
`/#/prova` equivalente, `/#/laboratorio` conserva la 0.4.
Strumenti della demo → Lettore indisponibile → Vista cliente → Utenze.

- Casa Luce → Mostra avviso; originale completo, testo e chiusura/Escape.
- Importare rettifica ottobre, poi aprire avvisi v1/v2 dal dettaglio.
- Importare dicembre con codice illeggibile; settembre con pagamento indicato;
  Casa Atelier novembre senza codice/domiciliazione/due pagine.
- Ripristina scenario elimina importazioni e ripristina fixture. Dati sintetici
  con data fissa 14 ottobre 2026, nessuna autenticazione/server operativo.

**94/94 test**, inclusi 11 IN04; axe/layout/tastiera a 360/390/1440 e testo 200%,
build, HTML autonomo, smoke autonomo/statico senza errori JS o richieste esterne.
Screenshot e limiti nel rapporto. Nessuna prova fisica, umana BF16 o terminale.

## Prossimo lavoro proposto

1. **N19: riallineamento prodotto/home**, secondo C33/C34 e il documento sopra.
   Descrizione preparata; proposta di home e percorsi da discutere/concretizzare
   prima di continuare lo sviluppo. **IN05** rimane successivo: report cliente e
   agenzia separati (C29/USR01), con fonti, periodo, copertura e metriche da definire.
2. Chiarire preavviso, unità/durata, pro rata/downgrade, listino e condizioni.
   NA01–NA16 sono candidati, non approvazioni commerciali.
3. IN06/chiamate AI resta studio/anteprima senza invii o provider reali.
4. BF16/N10: kit BF02 esistente, supporto/commit annotati, osservazioni umane su
   comprensione, percorso, diniego e recupero. Nessuna misura AI sostitutiva.
5. N02/PB04: telefoni fisici, screen reader e terminali richiedono prove dedicate;
   per terminali solo avvisi di prova e autorizzazione specifica.

BF02 intatto, BF16/N02/BF01/BF03/BF17 aperti. Prezzi, primo pagante, copertura,
risorse, conservazione e architettura non risolti. Nessun rinvio automatico di
pagamenti, app, hardware o AI. Fonti audio e trascrizioni integrali restano
private e fuori repository; nessun riascolto nuovo attribuito alla sessione.
[Prompt corrente](PROMPT_NUOVA_SESSIONE.md) entro 4.000 caratteri.
