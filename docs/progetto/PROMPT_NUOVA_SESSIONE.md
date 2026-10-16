Riprendiamo EECard. Rispondi in italiano. Repository: https://github.com/av3rgfx/EECard.

Leggi AGENTS.md, docs/progetto/PROSSIMA_SESSIONE.md, PRODUCT.md, DESIGN.md, DEVELOPMENT.md e docs/progetto/BACKLOG.md. Leggi soprattutto docs/progetto/proposta-casa-2026-10-15/README.md e VERIFICHE.md, insieme a docs/progetto/visione-casa-2026-10-15/README.md.

È stata realizzata una proposta navigabile a /#/casa/home: card, casa, attenzione immediata, percorso bolletta con pagamento simulato completo e assistenza. Lo spazio attuale /#/spazio/overview (anche /#/prova) conserva agenzia e funzioni precedenti e collega la proposta. Casa/Pagamenti/Assistenza/Profilo restano candidati, non approvati nei dettagli.

Il prossimo lavoro parte dal nuovo riscontro dell’utente sulla proposta: valuta gerarchia iniziale, documenti, chiarezza di verifica/pagamento, assistenza e ritorno alla casa. Non ripetere l’analisi del prodotto o delle fonti già ricevute; non interpretare pubblicazione o test come approvazione. Prima di una revisione estesa ricava il perimetro dal feedback corrente. Non avviare IN05 automaticamente.

Conserva C–Legame, naming provvisorio e Materia/Editoriale. La tessera è accesso ai servizi, non carta bancaria. Una sola casa visibile resta espansa; più case visibili compatte; Vedi immobili sempre espanso. Agenzia e tecnico mantengono i loro spazi operativi senza tessera personale.

La proposta è isolata in memoria e si azzera al reload o uscendo verso lo spazio attuale: non migra il localStorage 0.4/0.5. Riusa IN01 (rinnovo), IN03 (importazione/versioni) e IN04 (avviso/originale); non rifarli. Il pagamento è centrale ma qui resta simulato: positivo non è incasso verificato, esito ignoto blocca retry, errore senza disposizione permette recupero. Rettifica non cancella un tentativo incerto. Mantieni permessi per oggetto/casa, versioni, dichiarazione, evidenza, incasso e quietanza distinti. La fixture richieste copre Casa Luce; non estendere automaticamente titoli a Casa Atelier.

Prima del branch verifica sul remoto la PR #17, aperta alla chiusura del 16 ottobre. Le #15/#16 sono integrate; il lavoro della proposta è su feat/proposta-casa, da main 7319587. Riusa una PR aperta solo per la stessa consegna; dopo merge riparti dal main aggiornato con nuovo branch. Nessun merge dell’assistente.

Solo dati sintetici: nessun pagamento, QR autentico, OCR, account, notifica, chiamata, firma o hardware reale. Prezzi, canali/partner, copertura e condizioni restano aperti. Fonti private fuori repository. BF02 invariato; BF16 e prove fisiche aperti.

Verifica ogni modifica pertinente distinguendo automazione/emulazione dalle osservazioni umane. La consegna precedente ha 104 test passati, tre controlli layout ripetuti dopo rifinitura mobile e smoke autonomo/statico dei percorsi: non dichiararli rieseguiti se non lo sono. Sites v11 è pubblicata dal 16 ottobre, sorgente 73d6e53. Per il commit completo e la continuità leggere PROSSIMA_SESSIONE e docs/design/ANTEPRIME_WEB.md. Pubblica le modifiche verificate sullo stesso Sites, preservando identità/accesso, senza nuova conferma. Aggiorna continuità, backlog, sessioni e prompt entro 4.000 caratteri; salva sul remoto e prepara la PR pertinente senza merge.
