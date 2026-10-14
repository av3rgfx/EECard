# Esperienza 0.5 — dal laboratorio al lavoro quotidiano

## Problema osservato

Il 14 ottobre l'utente ha giudicato la demo grezza e non comprensibile al primo
impatto, anche dopo averla letta. È un riscontro umano qualitativo effettivo,
non una prova comparativa BF16 e non una misura di tempi, costi o risparmio.

La schermata 0.4 anteponeva spiegazioni, sigle PF e selettori tecnici al compito.
Il ruolo della shell precedente poteva inoltre indicare «Proprietario» mentre
la demo mostrava lavoro da operatore. Le funzioni erano verificabili ma non
formavano un'interfaccia quotidiana facile da riconoscere.

PR #11 verificata integrata alle 18:40:00 UTC del 14 ottobre. Nuova base main
`0481bb172b26c548c432e2a6bd234e8d4c1a86ae`, branch `design/experience-0.5`.
Nessun merge eseguito dall'assistente. [Verifiche](VERIFICHE.md).

## Come cambia l'esperienza

- **Spazio agenzia:** panoramica del lavoro, pratica da riprendere, documenti
  disponibili e incontro aperto. Il prossimo passo è un'azione evidente.
- **Pratica:** quattro momenti brevi — dati e persone, documenti, accessi,
  riepilogo. Conflitto e mancante vengono risolti sul posto, prima di avanzare.
  Le fonti restano disponibili; la correzione è attribuita e non cancella l'origine.
- **Banco:** presentazione di tessera/codice, persona riconosciuta, conferma,
  motivo e contesto. L'incontro confermato porta al fascicolo; la barra di
  contesto permette sempre di terminarlo.
- **Documenti:** ricerca immediata, categorie e periodo facoltativo. L'apertura
  mostra il facsimile; fonti, controlli e revisioni si approfondiscono in una
  seconda vista. La ricerca globale è distinta dai filtri della libreria.
- **Spazio personale:** tessera dominante, documenti, case propria/locata,
  utenze, affitto e richieste. La stessa storia continua dalla vista agenzia.
- **Affitto:** evidenza, dichiarazione, incasso verificato e quietanza hanno
  azioni e responsabilità differenti. Il parziale mantiene il residuo.
- **Assistenza:** richiesta locale del cliente, consultazione e cambio stato
  dall'operatore autorizzato. Nessun professionista viene contattato; chiusura
  richiesta non certifica esecuzione di un lavoro.
- **Bozza:** template T01 versionato, fonti, mancanti/conflitti e revisione
  umana di esempio. Nessuna AI, firma o registrazione contrattuale.

Gli strumenti di scenario, cambio attore, reset, note e registro locale sono
in un pannello dedicato. L'utente del prodotto non deve imparare PF01/PF02/PF05
prima di usarlo. Il laboratorio 0.4 rimane consultabile a `/#/laboratorio`;
`/#/prova` apre la nuova esperienza, così i vecchi link condivisi funzionano.
Le rotte del prototipo 0.3 restano disponibili come archivio verificabile.

## Scelte visive e di interazione

Conservati C–Legame, naming provvisorio, Manrope locale e direzione Materia /
Editoriale 0.3. La nuova shell rimuove i controlli di ruolo incoerenti. La
panoramica usa fotografia, titoli e una sola prossima attività; liste e processi
restano aperti con separatori. Superficie e profondità sono concentrate sulla
tessera, sui documenti/facsimili e sui dialoghi di decisione.

Un verbo e un oggetto per le azioni principali; avanzamento visibile, prerequisiti
espliciti e possibilità di tornare indietro. Si approfondisce quando serve,
senza presentare tutta la documentazione tecnica nel flusso. I pulsanti non
mostrano successi di servizi reali. I cambi di stato hanno feedback e le
negazioni restano visibili anche nel dialogo in cui avvengono.

Tastiera con focus sul nuovo titolo, dialoghi Base UI con focus confinato,
Escape e ripristino al controllo di partenza. Navigazione mobile in un dialogo;
barre fisse sotto i pannelli, safe area e input a 16 px. Movimento breve sui
cambi di fase, feedback alla pressione e riduzione del movimento. Questi sono
criteri applicati e verifiche automatiche, non una dichiarazione di usabilità
misurata con persone.

Lettura delle skill `apple-design`, `mobile-native`, `emil-design-eng` dal
repository Emil Kowalski, commit `2d228630ba1446365f614a108cb8252f1feda202`.
Applicati gerarchia, riscontro immediato, materiali, controllo dell'utente,
viewport mobile, target tattili e reduced motion. Il dialogo già adattato da
Animate UI/Base UI mantiene licenze e attribuzioni; gli asset fotografici e del
marchio esistenti sono riutilizzati. Nessun redesign di simbolo o wordmark.

## Modello e limiti

Il modello 0.4 rimane la fonte di autorizzazione di pratica, inviti simulati,
card del cliente, banco, documenti e bozze. La nuova lettura/esportazione fuori
visita rivaluta titolo e scopo; la condivisione al cliente richiede ancora
visita aperta, persona confermata e selezione esplicita.

`src/workspace/service.ts` centralizza richieste e registro economico locale:
controlla sessione/servizio, agenzia, immobile/contratto, relazione attiva e
mandato. Il tecnico non riceve queste operazioni generali. La verifica richiede
beneficiario/operatore abilitato e fonte, la quietanza un incasso già verificato.
Il proprietario non riceve le bollette personali del conduttore. Il suo supporto
card è una fixture separata, senza codice utilizzabile nel banco di Cliente 01;
il blocco non modifica la card del cliente.

`eecard-functional-v4` conserva i dati già salvati della demo. Le visite non
sono ripristinate dopo una ricarica. `eecard-workspace-v1` conserva richieste,
quattro stati economici, eventi minimi e fixture card proprietario; stato
incompatibile/corrotto viene ripristinato con avviso. Il reset azzera entrambe
le parti del nuovo spazio usando lo scenario scelto; il prototipo 0.3 rimane
separato. Le note anonime si esportano solo come file locale.

Sono fixture nel browser, non un sistema di autenticazione o isolamento server.
La pratica continua resta a due parti e il banco è predisposto per Cliente 01
in Alfa; Beta ha letture proprie e dinieghi verso Alfa. Non sono gestiti nuovi
contratti arbitrari, acquisizione reale di file, invii, pagamenti, incassi
bancari, account, NFC/wallet, firme, AI o archivi reali. «Funzionante» riguarda
questi percorsi locali, non un prodotto operativo autorizzato.

BF02 non è stato rigenerato. Per la prova usare il kit esistente indicando il
nuovo supporto/commit e gli adattamenti al copione. BF16 rimane aperto: far
provare la nuova interfaccia agli operatori, raccogliere difficoltà e comprensione,
poi motivare le priorità. Dispositivi fisici, screen reader, termini di
conservazione e condizioni operative restano da completare.

## Prova rapida

1. Aprire la piattaforma: la panoramica mostra cosa c'è da fare.
2. «Completa la pratica» → controllare la data → aggiungere il facsimile →
   verificare il rapporto → preparare gli accessi → attivazione di esempio.
3. «Accogli al banco» → tessera di esempio → conferma persona e casa → fascicolo.
4. Cercare un impianto intorno al 2019, confrontare versioni/fonti, mostrare la
   selezione al cliente e terminare l'incontro.
5. «Vista cliente» → tessera, utenze delle due case, richiesta e dichiarazione.
   Tornare all'agenzia per vedere la richiesta o registrare un riscontro parziale.
6. Per dinieghi e reset aprire «Strumenti della demo», senza usare dati reali.
