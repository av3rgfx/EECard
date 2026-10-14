# EECard — punto di ripresa

Aggiornato il 15 ottobre 2026. Repository: https://github.com/av3rgfx/EECard.

## Consegna corrente: studio dei due audio e primo incremento locale

Leggere [inventario/limiti](discussione-2026-10-15/README.md),
[analisi NA01–NA16](discussione-2026-10-15/ANALISI.md),
[studio progettuale](discussione-2026-10-15/STUDIO_PROGETTUALE.md),
[piano incrementale](discussione-2026-10-15/PIANO_INCREMENTALE.md),
[fattibilità bollette](discussione-2026-10-15/FATTIBILITA_BOLLETTE.md) e
[verifiche](discussione-2026-10-15/VERIFICHE.md).

I due allegati sono ora stati elaborati localmente; le trascrizioni automatiche
integrali di lavoro, con timestamp, voci provvisorie e incertezze, restano fuori
repository. Non ripubblicarle. Per riascolti futuri serviranno le fonti private:
non assumere che i percorsi temporanei o i modelli ASR sopravvivano alla sessione.
Non dedurre identità dei parlanti né cronologia dai nomi dei file.

Emersi: livelli/extra, upgrade con conguaglio ancora ambiguo, disdetta,
supporto sul posto, scansione bollettini, avviso/QR e chiamate AI proattive.
Contraddizione esplicita sul preavviso di disdetta: nessuna regola legale o
commerciale adottata. L'utente ha confermato annual report **cliente e agenzia,
con viste separate** (C29/USR01); contenuti, periodo e metriche da definire.

IN01 aggiunge «Gestisci abbonamento» nella home di Cliente 01. Periodo autonomo
sintetico, riepilogo e disattivazione del rinnovo dopo conferma. Salvataggio
locale verificato prima del successo; annullo e reset; nessun prezzo, addebito,
cessazione programmata, perdita dei documenti, fine locazione o revoca card.
Campo compatibile `renewalCancelled` nel workspace v1; modello demo schema 4
conservato. È una prova di UX, non approvazione delle condizioni del servizio.

## Stato remoto e pubblicazione

PR #12 verificata integrata il 14 ottobre alle 20:48:12 UTC; main di partenza
`24eb129e35675ff8f684bc308b8202cc7735a43a`.
Branch corrente `feat/studio-audio-incremento-locale`;
[PR #13](https://github.com/av3rgfx/EECard/pull/13) aperta, pronta alla revisione,
implementazione al commit `3ce9a6b3e4f1fb8f3f22dc6e03ad35f526b7ed43`.
La chiusura successiva aggiorna solo riferimenti documentali. Nessun merge.
Prima del prossimo checkout controllare il remoto: riutilizzare la PR aperta
solo per la stessa consegna; dopo merge ripartire dal main aggiornato.

Nessun deploy richiesto o eseguito per questo incremento locale. Online rimane
l'esperienza 0.5, Sites v8 da `448f3721760ec3289920f092fa919240b50be2d4`:
[piattaforma](https://eecard-design-preview.uepacio.chatgpt.site/).
GitHub/PR e HTML locale non equivalgono ad aggiornamento del sito. Conservare
identità e accesso di `.openai/hosting.json` per un eventuale seguito autorizzato.

## Come provare il nuovo intervento

`npm ci`, `npm run dev`, aprire `http://localhost:5173/`.

1. Completare la pratica e aprire «Vista cliente», oppure usare «Strumenti della
   demo» → scenario «Lettore indisponibile» → «Ripristina scenario» → vista cliente.
2. Home personale → «Gestisci abbonamento»: periodo illustrativo e rinnovo.
3. «Disattiva rinnovo» → tornare al riepilogo oppure confermare la simulazione.
4. Ricaricare: la scelta rimane nel browser. Documenti, affitto e tessera restano
   distinti. «Ripristina scenario» ripristina anche il rinnovo dimostrativo.

`/#/spazio/overview` e `/#/prova` restano ingressi; `/#/laboratorio` conserva la
0.4 tecnica, le rotte 0.3 sono archivio. La demo usa data fissa 14 ottobre 2026.
La gestione rinnovo riguarda solo l'adesione sintetica Cliente 01, non quella del
proprietario o un catalogo generale. Nessuna autenticazione/server reale.

## Prossimo lavoro consigliato

1. In assenza di nuove priorità, implementare **IN03**: importazione guidata di
   una bolletta da facsimile sintetico incluso, confronto originale/dati,
   conferma, duplicato/rettifica, permessi e recuperi. Usare criteri e dipendenze
   del piano; nessun OCR, upload o pagamento reale. Questo è il prossimo
   intervento consigliato, non una nuova decisione commerciale dell'utente.
2. Dopo IN03, affrontare IN04 (mostrare l'avviso), poi IN05 (report cliente e
   agenzia separati). Per i report definire fonti, periodo, copertura e metriche:
   le due viste non autorizzano aggregazioni di dati privati fuori titolo.
3. In parallelo, chiarire preavviso, durata/unità, pro rata/downgrade e catalogo;
   rivedere i passaggi privati incerti prima di fissare condizioni. Questi dubbi
   non bloccano l'importazione locale di un facsimile.
4. Le chiamate AI restano IN06, solo anteprime senza invii finché non sono
   definiti stato del dovuto, destinatario, titolo, preferenze e responsabilità.
5. Prova umana N10/BF16: usare BF02 esistente, annotare nuovo supporto/commit,
   osservare comprensione al primo impatto, percorso completo, diniego e recupero.
   Note individuali fuori repo; sintesi anonime autorizzate. Non ricreare il kit.

BF16 resta aperto; discussione e test automatici non sono osservazioni comparative
o risparmio misurato. Restano N02 (telefoni fisici/Safari/Android/screen reader),
BF01/BF03/BF17, prezzi, primo pagante, risorse, conservazione e architettura reale.
Le proposte non rinviano automaticamente pagamenti, app, hardware o AI dal primo
rilascio: se essenziali al beneficio, le dipendenze vanno affrontate esplicitamente.

## Chiusura richiesta e avvio successivo

Confermata sul remoto la PR #13 aperta; riutilizzata per questa chiusura della
stessa consegna. Aggiornati priorità consigliate, backlog, registro sessioni e
[prompt da incollare](PROMPT_NUOVA_SESSIONE.md). IN03 non è stato avviato in questa
chiusura: il prossimo prompt ne richiede l'implementazione locale. Solo modifiche
documentali, senza ripetere test applicativi, attivare servizi o pubblicare il sito.
