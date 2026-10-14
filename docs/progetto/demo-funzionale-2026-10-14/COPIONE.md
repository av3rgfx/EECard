# Prova locale della demo 0.4

Supporto: `/#/prova`. Dati sintetici; nessuna osservazione umana è registrata
in questa consegna. Il facilitatore annota il commit effettivamente usato e il
browser/dispositivo della prova. Non raccogliere nomi, recapiti o documenti reali.

## Percorso da proporre senza suggerire i comandi

1. Scegliere «Percorso riuscito» e preparare la pratica: confrontare le fonti
   della data, collegare il facsimile mancante, verificare il rapporto, preparare
   gli inviti personali e simulare accettazione/attivazione. Spiegare cosa cambia
   per account, adesione e card; nessuna condizione commerciale è approvata.
2. Al banco usare `DEMO-ALFA-01`, confermare la persona e selezionare scopo
   «Recupero storico» e contesto Casa Alfa 01 / Contratto Alfa. La card seleziona
   una persona; prima della conferma non compare alcun documento.
3. Cercare il documento tecnico ricordato intorno al 2019. Filtrare per tipo o
   per intervallo 2018–2020, confrontare v1/v2, individuare origine, acquisizione,
   correzione e controlli. Provare lettura, condivisione alla persona confermata
   e download locale distinti. Chiudere la visita; il riepilogo torna neutro.
4. Scegliere almeno un caso di diniego/recupero: card revocata, agenzia diversa,
   lettore indisponibile oppure servizio indisponibile. La verifica assistita
   non riattiva una card; il retry servizio richiede una nuova conferma.
5. Nelle estensioni confrontare casa propria/locata e destinatari. Proprietario
   e tecnico non ricevono la bolletta privata. Con «Rapporto concluso», il titolo
   autonomo sul documento tecnico e l'intestazione rimangono valutati separatamente.
   Revocare poi il titolo autonomo e verificare il diniego.
6. Generare una bozza T01 e registrare una revisione umana simulata; nello
   scenario incompleto provare il blocco per mancanti/conflitti. Nessuna firma.
7. Scrivere note anonime ed esportarle localmente. Ripristinare lo scenario:
   note, avanzamento, audit, versioni aggiunte e transizioni vengono azzerati.

Annotare compito, esito osservato, arresti, aiuti, ritorni, parole non comprese
ed esigenze emerse. Non ricavare tempi o costi dagli eventi sintetici del registro.
Le note libere non sostituiscono il registro comparativo BF16.

## Riutilizzo di BF02

Il [kit esistente](../prova-agenzia-2026-10-08/README.md), set A/B, pacchetti e CSV
rimangono invariati. Usare il suo [protocollo](../prova-agenzia-2026-10-08/PROTOCOLLO.md)
e la [guida alla raccolta](../validazione-bf16-2026-10-09/RACCOLTA.md) per la
successiva prova umana; conservare osservazioni individuali fuori repository.
Non rigenerare i set. Annotare che il supporto proposto è ora la demo 0.4 e
registrare gli eventuali adattamenti prima della raccolta.

| Casi del kit | Comportamento esplorabile nella demo | Limite |
| --- | --- | --- |
| S01–S02 | Pratica, fonti, correzioni, inviti e retry | La pratica demo ha due parti; non riproduce quattro parti/omonimia del kit |
| S03–S04 | Operatore diverso dall'autore delle fonti, contesto e storico | I dati della demo sono un esempio continuo, non i set controbilanciati A/B |
| S05–S06 | Revoca, verifica assistita, lettore/servizio e retry | Nessun lettore, server o prova NFC |
| S07–S08 | Casa propria/locata, intestazioni e titolo autonomo | Intervalli e titoli sono fixture; nessuna politica legale approvata |
| S09–S10 | Bolletta facsimile, ricerca incerta e versioni | QR deliberatamente non pagabile, nessuna domiciliazione reale |
| S11 | Template, fonti, mancanti, conflitti e revisione | Nessuna AI o firma; il template non è un modello contrattuale legale |
| S12 | Esempio 100/40/60 nelle estensioni; percorso affitto 0.3 ancora disponibile | Nessun pagamento o riconciliazione bancaria |

Non registrare i test automatici come esecuzioni del kit. BF16 rimane aperto;
comprensione del flusso e preferenze non dimostrano risparmio o disponibilità a pagare.
