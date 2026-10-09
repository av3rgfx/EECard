# Prompt per riprendere EECard

Preparato il 9 ottobre 2026. Copiare il testo sotto nella prossima sessione.
Questo è il prompt corrente; quello in `discussione-2026-10-07/` documenta
la precedente ripresa dalla conversazione EA01–EA30.

---

Riprendiamo EECard dal lavoro esistente. Rispondi in italiano.

Repository unica: https://github.com/av3rgfx/EECard.
La PR #6 con specifiche e kit della prova risultava integrata il 9 ottobre
2026 alle 08:18:43 UTC, in main `3532eab`. La successiva chiusura documentale
è sul branch `docs/chiusura-sessione-2026-10-09`, nella PR #7:
https://github.com/av3rgfx/EECard/pull/7. Lo stato è riepilogato in
`docs/progetto/PROSSIMA_SESSIONE.md` e va verificato sul remoto.

Verifica prima lo stato remoto. Se la PR della chiusura è aperta, leggi anche
i suoi documenti e riutilizzala per la stessa consegna; se è integrata, parti
dal main aggiornato e scegli il branch secondo AGENTS.md. Non riutilizzare
il vecchio branch della PR #6 perché un rapporto storico la descrive aperta.
Non effettuare merge senza mia richiesta.

Leggi nell'ordine:

1. `AGENTS.md` e `docs/progetto/PROSSIMA_SESSIONE.md`.
2. `PRODUCT.md`, `DESIGN.md`, `DEVELOPMENT.md`, `docs/progetto/BACKLOG.md`
   e `docs/design/DECISIONI.md`.
3. Tutti gli elaborati in `docs/progetto/specifiche-2026-10-08/`: requisiti
   e decisioni, offerte/rilascio, percorsi, modello dati, fattibilità, verifiche.
4. README, PROTOCOLLO ed ESITO_SIMULAZIONE in
   `docs/progetto/prova-agenzia-2026-10-08/`; poi set, materiali e strumenti
   pertinenti al lavoro. Le chiavi non devono essere mostrate agli operatori.
5. Usa `docs/progetto/discussione-2026-10-07/` per provenienza EA01–EA30 e
   timestamp; consulta studio v0.1 e sorgenti pertinenti prima di modificare
   un percorso. Non ripetere l'intera analisi già completata.

Il lavoro disponibile comprende 30 requisiti RF/EA, sei percorsi PF, offerte
senza prezzi, proposta R1 con alternative, modello logico, backlog BF01–BF18
e otto prove FT. Il kit BF02 è già preparato: due set di dodici scenari,
144 evidenze sintetiche, pacchetti operatore/facilitatore e 48 esecuzioni
pianificate. I modelli di misure e costi sono vuoti. I 18 test dello strumento
sono passati l'8 ottobre; non presentarli come rieseguiti senza averli eseguiti.

Riparti dalla validazione di attivazione → ritorno al banco → recupero storico.
BF16 richiede due operatori reali e un facilitatore; la revisione AI del kit
non misura tempi, risparmio, disponibilità a pagare o sicurezza del backend.
La condizione corrente del kit è simulata: osserva il processo effettivo
dell'agenzia prima di attribuirgli risultati.

- Se sono disponibili osservazioni reali, controlla completezza e versione
  del kit, analizzale senza trasformare vuoti in zero e conserva fallimenti,
  aiuti ed esclusioni. Separa attivazione, recupero ed estensioni. Registra
  conclusioni, limiti e correzioni proposte con gli ID EA/PF/BF pertinenti.
- Se non ci sono osservazioni, mantieni BF16 aperto e guida la raccolta sul
  protocollo già pronto. Non ricreare i set e non inventare misure. Continua
  gli approfondimenti documentali indipendenti previsti dal backlog, indicando
  le dipendenze: BF03 e il perimetro operativo non sono approvati dalla chiusura.

Conserva EECard come nome provvisorio, C–Legame e direzione visiva 0.3.
Bianco/rosso è uno spunto da confrontare, non un redesign approvato. R1 è il
perimetro della prova e una proposta di rilascio, non un lancio commerciale
approvato. Prezzi, primo pagante, inclusioni, risorse e copertura restano aperti;
i 600 euro annui riguardano clienti già gestiti, non il listino EECard. Non
risolvere cifre ambigue per deduzione. Jarvis, destinatari dei due schermi e
tipo di firma richiedono chiarimenti solo quando bloccano una scelta concreta.

Il codice è un prototipo con dati demo. Preserva i permessi per rapporto e
le bollette private dell'inquilino; documento caricato, pagamento dichiarato,
incasso verificato e quietanza restano eventi distinti. Un parziale conserva
il residuo. Non attivare servizi, ordini, inviti, pagamenti o firme reali.

Fai poche domande solo se cambiano una decisione concreta e prosegui intanto
le attività indipendenti, dichiarando le ipotesi. Conserva osservazioni e costi
individuali fuori repository; non pubblicare audio, trascrizione integrale,
dati personali o documenti reali.

Aggiorna i documenti di continuità e prepara una consegna verificabile nel
repository, distinguendo controlli nuovi e storici. Concludi con risultati,
decisioni aperte, file, verifiche, PR e prossima attività concreta.
