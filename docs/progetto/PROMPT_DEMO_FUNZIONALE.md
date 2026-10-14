/goal
Trasforma il prototipo EECard esistente in una demo funzionale 0.4, locale,
navigabile, ripristinabile e osservabile, che permetta di provare end-to-end
l'attivazione PF01, il ritorno al banco PF02 e il recupero storico PF05 con dati
interamente sintetici. Rendi esplorabili anche PF03, PF04 e PF06 come estensioni
coerenti dello stesso fascicolo. Conserva il design 0.3, i confini di accesso e
gli stati già validati. Non attivare servizi, account, inviti, pagamenti, firme,
NFC/wallet, AI o archivi reali.

## Contesto obbligatorio

Lavora nella repository https://github.com/av3rgfx/EECard e rispondi in italiano.
Prima di scegliere il branch, verifica la PR più recente indicata in
`docs/progetto/PROSSIMA_SESSIONE.md`: se è aperta e riguarda questa stessa
implementazione, riusala; se è integrata, aggiorna `main` e crea un nuovo branch
dedicato secondo `AGENTS.md`. Non effettuare merge.

Leggi, nell'ordine:

1. `AGENTS.md`, `docs/progetto/PROSSIMA_SESSIONE.md` e
   `docs/progetto/demo-funzionale-2026-10-14/README.md`;
2. `PRODUCT.md`, `DESIGN.md`, `DEVELOPMENT.md`,
   `docs/progetto/BACKLOG.md` e `docs/design/DECISIONI.md`;
3. tutti i file in `docs/progetto/specifiche-2026-10-08/`;
4. `README.md`, `PROTOCOLLO.md` ed `ESITO_SIMULAZIONE.md` del kit BF02;
5. tutti i file in `docs/progetto/validazione-bf16-2026-10-09/`.

Il kit BF02 è pronto: non rigenerarlo. Non inventare osservazioni, tempi o
costi. Se durante il lavoro compaiono dati di una prova reale, conservali fuori
dalla repository pubblica e registra qui soltanto una sintesi anonima e i
limiti. Le specifiche restano revisionabili; la demo serve a produrre domande
più concrete, non ad approvare automaticamente R1 o il modello commerciale.

## Risultato da consegnare

Realizza un ingresso evidente “Prova il percorso” e una storia continua con i
seguenti tre momenti. Deve essere possibile cambiare vista senza perdere il
contesto e ripartire in modo deterministico.

### 1. Preparazione e attivazione — PF01

- Mostra all'operatore una pratica sintetica già esistente con agenzia,
  immobile, persone, rapporti, contratto, fonti e documenti.
- Permetti di controllare e correggere dati, rendendo visibili provenienza,
  conflitti e campi/documenti mancanti.
- Collega le parti con ruolo, titolo e intervallo di validità; la stessa persona
  può essere proprietaria in un contesto e inquilina in un altro.
- Simula inviti individuali e attivazione, distinguendo account, adesione e
  credenziale. Non inviare email o messaggi.
- Registra nel solo stato demo attore, azione, oggetto ed esito.

### 2. Ritorno al banco — PF02

- Parti da un operatore d'agenzia già autenticato nella simulazione.
- Simula la presentazione di card o codice: seleziona una persona, ma richiedi
  verifica della persona, scopo e contesto prima di mostrare il fascicolo.
- Mostra sempre agenzia, operatore, persona, immobile/rapporto, scopo e stato
  della sessione. Lo schermo cliente, se presente, è una preview locale dei soli
  dati necessari ed è etichettato come ipotesi.
- Gestisci almeno percorso riuscito, credenziale revocata, lettore non
  disponibile, servizio temporaneamente indisponibile, retry e chiusura.
- La chiusura rimuove l'accesso di sessione; non elimina titoli autonomi e non
  riattiva credenziali revocate.

### 3. Recupero storico — PF05

- Cerca per titolo, tipo, anno o intervallo quando la data è incerta.
- Mostra provenienza, contesto, versioni, correzioni, controllo formale,
  eventuale controllo specialistico e cronologia dei lavori.
- Distingui visualizzazione, condivisione ed esportazione simulate.
- Applica i titoli validi alla data e allo scopo: un documento antico non
  implica un rapporto ancora attivo; la fine di un rapporto non annulla un
  diverso titolo autonomo ancora valido.

## Estensioni da rendere esplorabili

- PF03: casa propria e casa locata con intestazioni/deleghe e bollette private.
- PF04: bolletta sintetica con creditore, importo, scadenza e QR/codice facsimile;
  non eseguire pagamenti.
- PF06: bozza deterministica da template con fonti, campi mancanti, conflitti,
  versioni e revisione umana. Se rappresenti suggerimenti assistiti, usa fixture
  locali attribuite, disattivabili e senza chiamate a modelli esterni.
- Card fisica, wallet, contactless, firma e secondo schermo sono simulazioni
  visive; non scegliere provider o hardware e non dichiararli compatibili.

## Dati e autorizzazioni della demo

Estendi il modello locale con almeno due agenzie sintetiche e con persone,
relazioni temporali, immobili, contratti, documenti/versioni, provenienze,
credenziali/revoche, sessioni al banco, concessioni temporanee ed eventi demo.
Gestisci esplicitamente la migrazione o il reset del localStorage precedente.

I permessi dipendono da agenzia, rapporto, immobile, contratto, intestazione,
delega, incarico, scopo e tempo; il ruolo globale e l'ID della card non bastano.
Dimostra anche i dinieghi: isolamento fra agenzie, bollette personali
dell'inquilino, tecnico senza incarico, rapporto concluso e card revocata. Le
regole devono essere centralizzate e coperte da test, non affidate soltanto a
elementi nascosti nell'interfaccia.

Conserva le regole esistenti: documento caricato, pagamento dichiarato, incasso
verificato e quietanza sono eventi distinti; un parziale mantiene il residuo;
fine rapporto, fine adesione e revoca card sono eventi diversi. La card è una
chiave di accesso ai servizi, non una carta bancaria.

## Esperienza e modalità di prova

Mantieni C–Legame, nome EECard provvisorio e direzione 0.3: Materia e luce per
tessera/materiali, composizione aperta Editoriale, bruno/albicocca/avorio.
Non riprogettare il marchio. Proprietario/inquilino conservano la tessera
dominante; agenzia e tecnico mantengono rispettivamente coda e incarichi.

La demo deve funzionare su desktop e smartphone, da tastiera, con focus visibile,
movimento ridotto, errori comprensibili e azioni di recupero. Evita contenitori
annidati e mantieni i contenuti operativi leggibili a tutta larghezza.

Aggiungi una modalità prova locale con:

- selezione di scenari deterministici;
- compiti e avanzamento PF01 → PF02 → PF05;
- reset affidabile allo scenario iniziale;
- campo note anonime ed esportazione locale, senza telemetria né invio;
- indicazione costante “demo con dati sintetici” e distinzione chiara fra
  funzione simulata e servizio reale.

Non precompilare risultati di osservazione. Non copiare nel codice risposte,
tempi o costi del kit BF02.

## Verifica richiesta

Aggiorna o aggiungi test significativi per:

- percorso completo PF01 → PF02 → PF05 e ripristino;
- isolamento tra due agenzie e casi ammessi/negati per relazione;
- card revocata, fine rapporto, sessione chiusa e titolo autonomo valido;
- ricerca con anno incerto, versioni e provenienza;
- errori/retry senza duplicare eventi;
- accessibilità, tastiera, movimento ridotto e layout 360/390/1280/1440 px;
- persistenza/migrazione dello stato locale e assenza di chiamate a servizi
  esterni durante i flussi simulati.

Esegui build, test, formattazione, audit e screenshot pertinenti. Aggiorna i
rapporti con risultati realmente osservati e conserva separati i controlli
storici. Rigenera le anteprime versionate se il frontend cambia. Aggiorna il
sito Sites esistente solo seguendo `AGENTS.md` e `docs/design/ANTEPRIME_WEB.md`;
non creare un sito nuovo e registra il commit effettivamente pubblicato.

## Consegna e continuità

Aggiorna `README.md`, `PRODUCT.md`, `DEVELOPMENT.md`, i documenti di design
pertinenti, `docs/progetto/BACKLOG.md`, `PROSSIMA_SESSIONE.md`, `SESSIONI.md` e
il registro decisioni. Distingui sempre implementazione dimostrativa,
validazione con persone e requisiti di produzione.

Salva sul branch corretto, pubblica il branch remoto e crea o aggiorna una sola
PR verificabile, senza merge. Nella PR descrivi il caso prima/dopo, gli scenari,
i confini, i test eseguiti e i limiti. Concludi indicando file principali,
verifiche, URL della PR, eventuale anteprima aggiornata e prossima prova concreta
con operatori, senza dichiarare BF16 concluso in assenza di osservazioni reali.
