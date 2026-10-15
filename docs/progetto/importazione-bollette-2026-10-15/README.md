# IN03 — importazione guidata locale

15 ottobre 2026. Attuazione della richiesta corrente, da main `be4b23e`
dopo la verifica remota della PR #13 integrata il 14 ottobre alle 23:08:00 UTC.
Branch dedicato `feat/in03-importazione-bollette`. Nessun merge o deploy.

Riferimenti: [piano IN01–IN10](../discussione-2026-10-15/PIANO_INCREMENTALE.md),
[studio](../discussione-2026-10-15/STUDIO_PROGETTUALE.md),
[PB01–PB03](../discussione-2026-10-15/FATTIBILITA_BOLLETTE.md),
[verifiche della consegna](VERIFICHE.md).
NA11/NA12 e RF21/RF22/PF04 conservano la propria provenienza: IN03 non approva
condizioni commerciali, schemi reali o un servizio operativo.

## Percorso e copione

Avvio: `npm ci`, `npm run dev`, `http://localhost:5173/#/spazio/overview`.
Da «Strumenti della demo» scegliere «Lettore indisponibile» e ripristinare lo
scenario, poi «Vista cliente» → «Utenze». In alternativa completare la pratica
esistente e aprire lo spazio cliente. La data sintetica resta il 14 ottobre 2026.

1. Casa Luce → **Aggiungi bolletta**. Casa e intestazione sono già esplicite.
2. Scegliere **Novembre · importo da correggere**. L'originale HTML incluso
   riporta 96,40 EUR; la proposta simulata riporta 964,00. Tentare di proseguire:
   il confronto segnala l'importo e impedisce la conferma.
3. Correggere in 96,40, indicare il motivo e scegliere **Rivedi prima di salvare**.
   Desktop: originale e campi affiancati. Telefono: alternare Originale/Dati.
4. Verificare riepilogo e originale; annullare lascia tutto invariato. Confermare
   salva nel browser, senza dichiarare un incasso. Ricaricare e riaprire la bolletta.
5. Ripetere l'importazione, anche scegliendo la seconda copia dello stesso avviso:
   viene indicato il duplicato e si può aprire il documento esistente.
6. Importare **Ottobre · rettifica del fornitore**: motivo, riepilogo 84 → 79 EUR,
   conferma. Resta una sola bolletta di ottobre; il dettaglio consente di scegliere
   versione 1 o 2 con i rispettivi originali, autori, motivi e metadati dei campi.
7. Scegliere la copia illeggibile: nessuna conferma, ritorno alla scelta di una
   copia leggibile. Casa Atelier offre novembre senza codice, due pagine e
   domiciliazione indicata. Settembre di Casa Luce mostra un altro formato e
   pagamento indicato nell'originale, ancora **non verificato**.
8. Cambiare casa/attore durante il percorso: la bozza viene eliminata. Chiudere
   la sessione rimuove anche i contenuti; al rientro si ricomincia. Proprietario
   senza delega, tecnico e altra agenzia non vedono le bollette del cliente.
9. **Ripristina scenario** elimina le importazioni e ripristina le due fixture,
   insieme agli altri dati dimostrativi. Non è una cancellazione server.

Errore di memoria: il comando non annuncia successo, conserva confronto/motivo
e permette di riprovare la conferma. La prova automatica forza un errore quota;
nessun guasto reale del dispositivo è stato misurato.

## Modello e confini

`src/workspace/bills.ts` conserva facsimili sintetici immutabili, proposte di
estrazione distinte, importi in centesimi/EUR e campi leggibili, versioni,
provenienza per campo (pagina, fonte/revisione, confidenza dimostrativa, valore
proposto, correzione e revisore). Gli originali sono HTML generato da fixture,
non PDF scansionati né output OCR. La copia multipagina è interamente leggibile.

L'identità del dovuto usa casa, creditore, fornitura, periodo e avviso della
fonte immutabile: modificare un campo proposto non aggira i duplicati. Un replay
o una seconda copia equivalente non aggiungono bollette/eventi. Una rettifica
con revisione successiva aggiunge una versione allo stesso oggetto; un originale
superato non torna corrente. La revisione attesa blocca conferme su uno stato
in memoria cambiato. Non è un controllo di concorrenza server fra browser.

Il modello autorizza letture, originali e acquisizione per oggetto e scopo:
agenzia, attore, account/sessione/servizio, casa, intestazione/delega e tempo.
I titoli di acquisizione sono tre fixture esplicite legate ai titoli esistenti:
Cliente 01 su Casa Luce e Atelier; Proprietario 02 su Casa Luce con delega
inizialmente scaduta. Un generico diritto di lettura o mandato non concede
importazione. Le prove di delega valida modificano la fixture nel test; non
esiste un servizio di conferimento deleghe. Una revoca del titolo sottostante
nega anche l'acquisizione. Card e fine locazione non spengono titoli autonomi.

`WorkspaceState.bills` è un'estensione compatibile di `eecard-workspace-v1`:
un salvataggio precedente riceve le due fixture; dati incoerenti vengono
rifiutati con ripristino e avviso. Lo schema 4 e i grants non sono migrati.
L'importazione cambia soltanto bollette e relativo evento locale: affitto,
evidenze, dichiarazioni, incassi, quietanze, rinnovo e card restano distinti.

`BillsPanel` legge gli importi della versione, non della casa. Gli originali
iniziali del fascicolo 0.4 restano snapshot storici: il loro dettaglio rimanda
alle Utenze per dati correnti e nuove versioni. Le nuove importazioni e il loro
storico sono consultabili nelle Utenze; non vengono aggiunti alla ricerca globale
0.4 né esportati/condivisi. Questa integrazione futura deve mantenere gli stessi
permessi sui derivati, senza estendere i grants per semplice presenza nell'indice.

## Limiti e seguito

Solo facsimili inclusi; nessun file reale, fotocamera, OCR, QR pagabile, URL esterno,
pagamento, notifica o chiamata. Il confronto automatico dei campi conosce i dati
sintetici e non dimostra qualità OCR o capacità di comprendere documenti reali.
La demo non è autenticazione né autorizzazione server. Conservazione, acquisizione
privata, sicurezza file, gestione multiutente e condizioni operative restano aperte.

IN04 «Mostra avviso» resta il prossimo incremento proposto, poi IN05 con fonti,
periodo, copertura e metriche da definire per i report distinti cliente/agenzia.
BF02 invariato, BF16 aperto. Nessuna nuova analisi audio o modifica a IN01.
Fonti private, trascrizioni integrali e dati personali sono esclusi dalla consegna.
