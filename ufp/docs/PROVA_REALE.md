# Procedura della prima prova reale — non ancora autorizzabile

La scheda `scheda/Scheda_UFP_da_compilare.xlsx` raccoglie le risposte. Il programma non importa automaticamente il foglio: i dati confermati saranno riportati nei JSON, con confronto del riepilogo prima dell'approvazione. Non completare campi ignoti per far passare i controlli.

## Caso limitato da rendere concreto

Scegliere un **nuovo** arrivo con bolla completa, un fornitore, un ordine e inizialmente una riga senza discordanza di codici o unità commerciali. Quantità fisica confermata e non superiore al residuo. Un solo operatore e nessun altro che lavori quel DDT durante la prova. Gli esempi pubblici sono anonimizzati; i DDT storici reali non vanno ricreati.

Prima di chiedere autorizzazione devono essere compilati questi valori:

| Dato | Valore da fornire/verificare |
|---|---|
| Ambiente, azienda, accesso e versione | DA VERIFICARE |
| Nuovo fornitore, ID e numero/data DDT completi | DA COMPILARE |
| Tipo, anno, numero ordine e identificativo stabile riga | DA LEGGERE NEL GESTIONALE |
| Codice fornitore e codice interno riconciliati | DA VERIFICARE |
| Bolla / fisico / da registrare: quantità e UM | DA COMPILARE DOPO CONTROLLO UMANO |
| Residuo prima / atteso dopo | DA LEGGERE E CALCOLARE |
| Magazzino, ubicazione e testata obbligatoria | DA VERIFICARE |
| Ricerca DDT e liste esistenti, esito e timestamp | DA ESEGUIRE IN SOLA LETTURA |
| Impronta piano, operatore e data conferma | DA GENERARE |
| Metodo d'integrazione nativo o browser validato | NON DISPONIBILE |
| Identificazione dell'esito di ogni salvataggio, timeout e duplicati | DA VALIDARE |
| Risultato sul palmare e significato operativo | DA CHIARIRE |
| Responsabile per riconciliazione e correzioni | DA INDICARE |

Non si sta chiedendo autorizzazione generica ora: mancano il caso reale e un connettore verificato. L'autorizzazione sarà chiesta dall'assistente dopo aver presentato i valori definitivi, la sequenza di modifiche e le evidenze disponibili. Deve riguardare proprio quel piano e quell'ambiente; modifiche successive richiedono nuova revisione e autorizzazione pertinente.

## Verifica tecnica prima delle scritture

1. Verificare con il referente se una funzione nativa o integrazione documentata copre effettivamente ricezione, righe ordine, quantità parziali, DDT, Libero, ricerca dei già presenti e ripresa. Non contattato automaticamente.
2. Se serve browser, autorizzazione all'uso e ispezione della pagina in sola lettura: frame, ruoli/etichette, identificazione univoca delle righe, paginazione, messaggi, sessione scaduta, conferme e lettura esiti. Nessun selettore fittizio derivato dalle sole etichette del video.
3. Individuare gli effettivi confini di salvataggio: riga, bozza, DDT, lista e Sospendi. Il simulatore non prova atomicità, né letture affidabili dell'assenza. Espandere il registro per tutte le azioni persistenti reali prima dell'esecuzione.
4. Bloccare il connettore quando mancano evidenze o identificazione stabile. Un collegamento in sola scrittura non è sufficiente. Il programma attuale non ha il connettore reale: installarlo non abilita scritture.

## Operazioni che compariranno nella richiesta di autorizzazione

- Creare/riprendere solo il DDT individuato, con testata approvata.
- Caricare solo le righe approvate nelle quantità/UM indicate, verificando esito e residui dopo ciascun effettivo salvataggio.
- Rileggere tutte le pagine del DDT e confermarlo; annotare ID e stato effettivi.
- Dal DDT verificato, cercare eventuali liste esistenti e svolgere separatamente Libero fino a Sospendi.
- Rileggere ID lista, stato, righe e quantità. Verifica manuale sul palmare separata, se prevista e chiarita.

## Criteri di successo

Un solo DDT pertinente e una sola lista pertinente; ordine e riga corretti; tutti e soli gli articoli accettati; quantità/UM esatte; magazzino e ubicazione corretti; residui coerenti, altre righe invariate; ID/stati riletti, non dedotti da clic. Per il risultato completo sul palmare: riscontro effettivo di lista, codici e quantità/UM sul dispositivo, con verificatore e data/ora. Se manca, registrare esplicitamente NON VERIFICATO: non dichiarare completato quel risultato.

## Arresto e ripresa

- Timeout o risposta persa: annotare ultima azione, ID disponibili e piano; fermare tutte le ulteriori scritture. Rileggere nel gestionale prima di decidere se ripetere.
- Esito presente ed esatto: riprendere dopo l'azione verificata. Esito assente: ripetere solo se l'assenza è dimostrata dalla lettura completa affidabile e i dati sono ancora quelli approvati. Esito ignoto: riconciliazione manuale, nessun retry.
- Sessione scaduta/schermata inattesa: riaprire accesso ordinario autorizzato, rileggere documenti/righe e confrontare piano. Non riavviare una sequenza di clic.
- Codice errato o anagrafica cambiata: ufficio; conservare ID del sospeso e letture. Nuovo piano/conferma prima di eventuali nuove scritture. V1 blocca modifiche a documenti già iniziati sotto un altro piano: correzione assistita da progettare sul caso effettivo.
- DDT verificato e Libero fallito: cercare prima liste/prelievi già salvati, riprendere solo il secondo passaggio. Non ricreare il DDT.
- Correzione o duplicato: operatore autorizzato applica la procedura aziendale verificata. Nessun annullamento automatico presunto. Non provocare guasti in produzione; le prove di interruzione reale richiedono ambiente e modalità concordati.
