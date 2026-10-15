# IN04 — Mostra avviso

15 ottobre 2026. Incremento della demo, successivo a IN01 e IN03 già consegnati.
PR #14 verificata integrata alle 06:36:01 UTC, merge
`ad8b928c7d6cff1a8797225fe1de92716225e735`; branch nuovo
`feat/in04-mostra-avviso` da origin/main. Nessun merge dell'assistente.

Riferimenti: [piano IN04](../discussione-2026-10-15/PIANO_INCREMENTALE.md),
[studio bollette e PB03/PB04](../discussione-2026-10-15/FATTIBILITA_BOLLETTE.md),
[IN03](../importazione-bollette-2026-10-15/README.md), [verifiche](VERIFICHE.md),
[pubblicazione](../../design/ANTEPRIME_WEB.md).

## Percorso per la prova

Aprire lo [stesso prototipo](https://eecard-design-preview.uepacio.chatgpt.site/).
Strumenti della demo → scenario Lettore indisponibile → Vista cliente → Utenze.
È possibile anche completare la pratica della demo prima di aprire Vista cliente.
La data sintetica resta il 14 ottobre 2026.

1. Casa Luce → **Mostra avviso**. Importo 84 EUR, creditore e scadenza sono
   immediati; stato pagamento ignoto. Riferimenti testuali selezionabili sullo
   stesso telefono; **Apri originale completo** mantiene il contesto.
2. **Chiudi avviso**, croce o Escape tornano al pulsante di origine. Aprendo dal
   dettaglio si resta sulla bolletta e sulla versione selezionata. Nessun evento,
   dichiarazione, incasso, quietanza, residuo o altro dato è modificato.
3. Aggiungi bolletta → rettifica ottobre → motivo → confronto/conferma. L'avviso
   corrente mostra 79 EUR. Apri bolletta → versione 1 → Mostra avviso: 84 EUR,
   avvertimento **Versione superata**, originale della revisione 1. **Mostra
   versione corrente** passa a 79 EUR e all'originale della rettifica, con focus
   sul creditore; la scelta storica nel dettaglio non viene sovrascritta.
4. Importare **Dicembre · codice illeggibile, testo leggibile**: 88,30 EUR,
   riferimento `DEMO-DIC-LUCE`. Il codice non viene ricostruito; restano testo e
   originale, con spiegazione del recupero. È diverso dalla copia interamente
   illeggibile di IN03, che resta non importabile.
5. Casa Atelier → importare novembre senza codice, due pagine: avviso **Codice
   assente**, domiciliazione indicata, invito a verificare l'addebito. Aprire
   l'originale e leggere anche pagina 2.
6. Casa Luce → importare settembre, altro formato: **Pagamento indicato, non
   verificato**, formato non supportato per il codice e scadenza trascorsa.
   Nessuna deduzione di morosità o di incasso verificato.
7. Proprietario senza delega valida, tecnico, operatore senza titolo e altra
   agenzia non accedono all'avviso. Cambio casa/attore/sessione usa il contesto
   nuovo; una revoca durante la lettura rimuove testo e originale. Il diniego
   permette di chiudere e ripartire dalle utenze disponibili.

Non portare questi facsimili a un terminale: la rappresentazione del codice è
un riquadro testuale con identificativo DEMO, marcato **non scansionabile e non
pagabile**, condiviso dall'originale HTML e dall'avviso. Non è un QR ricodificato,
un payload pagoPA o una promessa di compatibilità con esercenti. La demo non
contiene canali/URL operativi. Nessun file reale, scanner, OCR o integrazione.

## Implementazione e criteri

`readBillNotice` in `bills.ts` risolve oggetto, versione e fonte a ogni lettura:
controlli di agenzia, attore, casa, titolo, scopo, tempo e disponibilità del
modello esistente, poi coerenza di tutti i campi e dell'importo in centesimi.
Nessun permesso dedotto da ruolo commerciale o card. Il risultato non è
persistito e non scrive nel ledger o nel registro eventi.

`BillNotice.tsx` riusa il dialogo Base UI/Motion esistente, con sfondo inerte,
Escape, ritorno focus e movimento ridotto. `BillOriginal.tsx` estrae senza
riscrivere il flusso IN03 il componente originale condiviso; `NoticeCode.tsx`
rende la medesima rappresentazione testuale in originale e avviso. Il riepilogo
non espone autore della correzione, motivo, intestatario o fornitura; il documento
completo si apre con un'azione esplicita e conserva i titoli della bolletta.

| Criterio | Risultato osservabile |
| --- | --- |
| IN04-AC01 | Elenco apre l'ultima versione; dettaglio apre quella selezionata; importo, creditore, scadenza e fonte coincidono |
| IN04-AC02 | Rettifica non cancella lo storico: avviso superato esplicito e passaggio alla versione corrente |
| IN04-AC03 | Originale leggibile e riferimenti testuali nello stesso dialogo/telefono, senza scanner o URL operativo |
| IN04-AC04 | Codice assente, illeggibile e formato non supportato hanno testo e recupero; documento interamente illeggibile resta bloccato in IN03 |
| IN04-AC05 | Stato ignoto, domiciliazione, pagamento indicato e data trascorsa restano distinti da esiti verificati |
| IN04-AC06 | PB03 applicato anche ai derivati e alle versioni; revoca o cambio contesto non lasciano contenuti privi di titolo |
| IN04-AC07 | Aprire/chiudere e cambiare versione non modifica dati economici, eventi, card o rinnovo |
| IN04-AC08 | Tastiera, focus, Escape, 360/390/1440 px, testo ingrandito e reduced motion verificati; limiti fisici dichiarati |

Nessuna nuova dipendenza o migrazione: `code` appartiene alle fixture sorgenti,
non al workspace salvato. Le versioni IN03 precedenti restano valide. Schema 4,
workspace v1, ricerca globale, esportazione e condivisione conservano i confini
precedenti; queste ultime non includono nuovi derivati. Nessuna nuova analisi
privata o modifica a IN01/BF02. BF16 e N02 restano aperti, PB04 richiede una
futura prova autorizzata con telefoni/terminali e avvisi di test pertinenti.

Prossimo incremento proposto: IN05, report cliente e agenzia separati, dopo la
definizione esplicita di fonti, copertura, periodo e metriche; non annualizzare
le poche fixture né aggregare bollette private senza titolo.
