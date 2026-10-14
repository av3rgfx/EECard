# Demo funzionale 0.4 — implementazione locale

14 ottobre 2026. Base verificata: PR #10 integrata alle 10:51:34 UTC,
main `3b28e0a8f57a9dcae0bae987a65393a12bfeaef6`. Nuovo branch
`feat/demo-funzionale-0.4`; nessun merge effettuato dall'assistente.

## Risultato

`/#/prova` aggiunge la storia PF01 → PF02 → PF05 nella shell 0.3, con
avanzamento, sette scenari deterministici, reset e note anonime scaricabili
solo nel browser. C–Legame, palette e composizione editoriale sono conservati.
Il ruolo della shell 0.3 e il selettore «Attore e agenzia demo» del percorso
sono strumenti di simulazione distinti, non autenticazione reale.

PF01 espone parti, contratto, periodi, importi sintetici separati dalle quote,
fonti A/B, conflitto e mancante. Correzione e aggiunta del facsimile precedono
la verifica; due inviti individuali precedono l'attivazione simulata. Account,
adesione e credenziale mantengono stati distinti. Le fonti pregresse sono
attribuite a Operatore Alfa 01; al banco opera Operatore Alfa 02.

PF02 richiede codice/card locale, conferma della persona, scopo e contesto.
La visita è circoscritta e chiudibile. Revoca, cambio attore, logout e retry del
servizio riportano la postazione a stato neutro. Lettore indisponibile permette
codice o verifica assistita; servizio indisponibile nega nuove letture.
La verifica assistita non riattiva la card. Nessun wallet/pass/NFC reale.

PF05 filtra titolo, tipo e sovrapposizione di intervalli, mostrando precisione
originale distinta dall'acquisizione. Conserva versioni, correzioni, autore,
controllo formale e specialistico. La cronologia distingue documentato,
pianificato e segnalazione chiusa senza intervento. Lettura, condivisione alla
persona confermata ed esportazione locale hanno controlli distinti. La vista
cliente è una selezione locale, non la duplicazione del desktop.

PF03/PF04 confrontano le utenze delle due case, proprietario e tecnico, con
intestazione/delega e QR facsimile barrato, creditore/importo/scadenza senza
pagamento. PF06 genera versioni deterministiche T01 con fonti, mancanti,
conflitti, revisione umana e fixture di suggerimenti disattivabile. Firma è
sempre «non firmata»; nessuna procedura operativa viene eseguita.

## Policy e temporalità

`src/demo/model.ts` centralizza `titleAllows`, `allowed`, `search`,
`readVersion` ed `execute`. I controlli non sono soltanto elementi UI nascosti:
anche ID diretti, ricerca/conteggi, consegne e comandi valutano agenzia,
attore, immobile, contratto, azione, scopo, fonte del titolo, validità e revoca.
Il banco richiede anche visita aperta e titolo di lettura del destinatario.
Gli operatori non ereditano le bollette private dal mandato immobiliare.
Il tecnico legge solo la relazione assegnata per scopo lavori.

La data della fixture è il 14/10/2026. Gli intervalli ISO di date civili UTC
hanno inizio incluso e fine esclusa; non sono termini legali di conservazione.
Il registro usa sequenze e data sintetica di efficacia/registrazione, non
misurazioni del tempo degli operatori. Fine rapporto rimuove soltanto i titoli
che ne dipendono; titolo tecnico autonomo e intestazioni hanno propri periodi.
Fine adesione e revoca card non terminano il rapporto né cancellano documenti.
Una revoca del titolo autonomo nega il recupero successivo.

Le chiavi di ripetizione dei comandi sono vincolate ad agenzia, attore e tipo.
Un retry restituisce l'esito già registrato, rivalutando prima il permesso;
non duplica inviti, attivazioni o revisioni. Le correzioni pubblicate mantengono
le versioni precedenti. Si tratta di comandi locali sincroni, non di garanzie
su transazioni o concorrenza server.

Beta ha un mandato e un documento propri leggibili nel suo contesto; non
risolve il codice Alfa né modifica la sua pratica. Il percorso continuo di
attivazione/banco è predisposto per Alfa. I test verificano letture ammesse e
negate nei due domini, anche tramite ID diretto.

## Memoria, reset ed esportazioni

Schema 4, chiave `eecard-functional-v4`: conserva pratica, grant/versioni,
bozze, scenario, avanzamento, registro e note. Non conserva visite o selezioni
condivise: alla ricarica serve nuova verifica. Lo schema viene controllato;
stati incompatibili o corrotti sono ripristinati con messaggio esplicito.
`eecard-demo-v1` viene rilevato ma non importato, ed è mantenuto per il prototipo
0.3. «Ripristina scenario» azzera soltanto lo stato 0.4 usando la fixture scelta.
Memoria non disponibile produce un avviso; il lavoro continua in memoria.

Note e facsimili vengono scaricati con Blob locale, senza invii. Il registro
non contiene testo integrale dei documenti o token; le note sono vuote nei
sorgenti. Nessuna telemetria, account reale, invito esterno, pagamento, firma,
AI, archivio reale o servizio operativo. Il sito statico distribuisce solo
codice e dati sintetici della demo autorizzata.

## Limiti da conservare nella prova

Il browser contiene tutte le fixture sintetiche: questi controlli dimostrano
regole applicative, non isolamento o sicurezza server. Non usare dati reali.
La demo continua ha due parti e non sostituisce tutti i casi del kit BF02;
non realizza omonimia, importazione di archivi, emissione/sostituzione reale
wallet, firme o riconciliazione bancaria. L'affitto 0.3 resta disponibile con
quattro eventi distinti e residuo; PF04 aggiunge solo un riepilogo sintetico.

I test Chromium/axe non sono prove su dispositivi fisici o con screen reader.
Safari/iPhone, Android e osservazioni umane rimangono da raccogliere. Template,
conservazione e titoli post-rapporto richiedono decisioni prima di un prodotto
operativo. BF03/BF17 e le decisioni commerciali restano aperti; BF16 richiede
osservazioni umane e non è chiuso dalla demo. [Copione](COPIONE.md).
