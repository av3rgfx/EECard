# EECard — architettura del prototipo

Proposta di design, 6 ottobre 2026. Base: studio v0.1 completo (21 pagine), PR #1 integrata in main. Non è una specifica di produzione approvata.

## Mappa e gerarchia

| Area | Desktop | Smartphone | Componenti |
| --- | --- | --- | --- |
| Panoramica proprietario | Priorità, più immobili, card laterale | Prossima azione, card compatta, casa selezionata | Card EECard, riepilogo, attività |
| Panoramica inquilino | Casa, scadenza affitto, richieste | Affitto e assistenza immediati | Azioni rapide, timeline |
| Immobili | Griglia e dettaglio con parti/contratto | Schede impilate, selettore casa | Property card, badge relazione |
| Documenti | Ricerca, categorie, righe con permessi | Ricerca e righe verticali | File row, anteprima, condivisione |
| Affitto e utenze | Scadenze e storico | Rata prioritaria, dettagli progressivi | Importo, progressione evidenze |
| Assistenza | Lista, dettaglio, assegnazione | Nuova richiesta e pannello dal basso | Form, allegati, timeline |
| Consulenze | Contesto e slot dimostrativi | Selezione sequenziale | Form, riepilogo, annullamento |
| Card | Tessera e gestione | Tessera a piena larghezza, azioni sotto | Blocco, richiesta fisica, sostituzione |
| Agenzia | Coda trasversale, verifica e incarichi | Pratiche una alla volta | Code filtrate, controlli attribuiti |
| Accesso | Invito → codice demo → verifica rapporto | Stesso percorso in colonna | Form e conferma simulata |
| Profilo | Contatti, servizio, preferenze, laboratorio | Menu Altro e impostazioni | Scenari, reset, crediti |

Navigazione desktop persistente a sinistra. Smartphone: tab Panoramica, Documenti, Assistenza, Card, Altro. Le funzioni secondarie sono nel menu Altro. Cambio ruolo e immobile sempre espliciti; una persona può avere contesti diversi. Tecnico: vista limitata all'incarico assegnato, senza affitti o fascicolo generale.

## Percorsi end-to-end

1. Documenti → cerca → apri → leggi anteprima dimostrativa → scegli destinatario autorizzato e durata → condividi → revoca.
2. Inquilino → Affitto → allega prova demo → documento caricato → dichiara importo/data → pagamento dichiarato → Proprietario/Agenzia → fonte accredito → incasso verificato → quietanza demo distinta.
3. Assistenza → categoria, descrizione, recapito e allegato facoltativo → ricezione con numero → Agenzia → assegna tecnico → incarico accettato → intervento concluso → possibilità di riaprire.
4. Card → blocca → conferma → vecchia credenziale revocata → richiedi sostituzione → nuova credenziale dimostrativa; nessun circuito di pagamento.

## Wireframe responsive di riferimento

Desktop: sidebar 232 px | contenuto flessibile (titolo / priorità + card / immobili / attività). A 1280 px il contenuto riduce colonne senza comprimere i controlli. Mobile: header / contesto / titolo / priorità / card / azioni / immobili / attività / tab bar con safe area. I dialoghi diventano pannelli inferiori scrollabili, con chiusura esplicita e focus confinato.

## Stati

Laboratorio demo nel Profilo: dati normali, nomi lunghi, vuoto, un elemento, 1.284 documenti paginati, caricamento, errore, accesso revocato, fine contratto. Le simulazioni di errore conservano i dati; riprova ripristina la vista. Revoca impedisce l'accesso al contenuto; fine rapporto espone soltanto un archivio dimostrativo pertinente, senza nuove azioni operative.
