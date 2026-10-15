# EECard — punto di ripresa

Aggiornato il 15 ottobre 2026. Repository: https://github.com/av3rgfx/EECard.

## Consegna corrente: IN04 — Mostra avviso

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
`feat/in04-mostra-avviso` da origin/main aggiornato. Pubblicazione e PR IN04 in
preparazione; aggiornare questa sezione dopo l'esito remoto. Nessun merge.

Ultima versione online prima di IN04: Sites v9, sorgente
`44ffb53f60d68e636a475e405b7e71e1129dfada` (IN01/IN03).
[Stesso sito](https://eecard-design-preview.uepacio.chatgpt.site/),
[registro Sites](../design/ANTEPRIME_WEB.md). Manifest e pubblico invariati.

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

1. Seguire la nuova richiesta dell'utente; IN04 è completato come demo. In assenza
   di diversa priorità, **IN05**: report annuali cliente e agenzia con viste
   separate, destinatari confermati C29/USR01. Definire fonti, periodo, copertura
   e metriche; non annualizzare fixture né aggregare bollette private senza titolo.
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
