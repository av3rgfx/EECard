# Registro delle decisioni — design 0.1

6 ottobre 2026. Le etichette distinguono richiesta confermata, proposta di design e ipotesi dimostrativa. Nessuna scelta nel prototipo approva il modello commerciale.

| ID | Stato | Decisione / questione | Conseguenza |
| --- | --- | --- | --- |
| C01 | Confermato dall’utente | Repository av3rgfx/EECard, esperienza desktop e smartphone, qualità premium | Tutto il lavoro è sul branch design/eecard-premium-prototype, derivato da main dopo merge PR #1 |
| C02 | Confermato dall’utente | Design system e prototipo frontend navigabile, dati dimostrativi | React frontend; nessun backend, pagamento o messaggio reale |
| C03 | Confermato dal brief | Card come accesso ai servizi, distinta da carta bancaria | Nessun PAN, IBAN, CVV, saldo, circuito bancario o finto checkout |
| C04 | Confermato dal brief | Documento, dichiarazione, verifica, quietanza distinti | Passaggi separati con testo, autore e fonte; incasso parziale mantiene residuo |
| C05 | Confermato dall’utente | Anteprime condivisibili desktop e mobile separate | Due percorsi pubblici sul medesimo sito; sorgenti in EECard |
| C06 | Confermato dall’utente | Chiusura sessione, documentazione persistente e consegna in PR | Punto di ripresa, prodotto/design/sviluppo e backlog aggiornati; nessun merge implicito |
| P01 | Proposta visiva | Bosco, avorio, salvia e lime; Manrope Variable | Identità calma, domestica e precisa; card scura come elemento riconoscibile |
| P02 | Proposta UX | Sidebar desktop, tab bar mobile, pannelli inferiori | Gerarchia mobile diversa: prossima azione prima dei riepiloghi; niente hover obbligatorio |
| P03 | Proposta tecnica del prototipo | Vite + React + TypeScript; Base UI, Motion, Sonner | Stack leggero da avviare e compatibile con i componenti selezionati. Non decide l’architettura di produzione |
| P04 | Proposta UX | Controlli di ruolo espliciti, contesti immobili e destinatari consentiti | L’inquilino non vede le planimetrie patrimoniali; il proprietario non vede le bollette personali; tecnico solo incarichi |
| H01 | Dati dimostrativi | Milano, 3 immobili, persone, date, canoni 950/820 € | Non sono zone coperte, clienti, immobili disponibili o prezzi EECard |
| H02 | Dati dimostrativi | Giulia Rossi comproprietaria di Tortona e inquilina di Brera | Stessa persona, relazioni e permessi diversi per immobile; nessuna delega implicita |
| H03 | Dati dimostrativi | Elena Colombo delegata alla verifica; Marco Ferri/Anna Riva tecnici | Non sono professionisti convenzionati o reperibili realmente |
| H04 | Ipotesi di riferimento | transitions.dev potrebbe essere il dominio inteso | transition.dev restituisce HTTP 503. Nessuna sostituzione tacita, pacchetto inventato o contenuto Pro recuperato |
| H05 | Ipotesi UX | Consultazione della propria documentazione dopo fine rapporto | Regole definitive di conservazione, esportazione e accessi da concordare |
| A01 | Aperto | Quote 50 €/15 €, periodicità, unità, IVA, inclusioni | Nessun listino pubblicato o checkout; i numeri delle fonti non sono interpretati come prezzi mensili/annui |
| A02 | Aperto | Primo cliente, zona, beneficio vendibile, copertura e orari | Nessuna promessa 24/7, SLA, uscita tecnica, gratuità o disponibilità effettiva |
| A03 | Aperto | Budget, persone, tempi, servizio locale / SaaS | Il prototipo non è un preventivo né l’approvazione di un primo rilascio |
| A04 | Aperto | Pagamenti integrati, app negli store, 3D, AI | Né disponibilità né rinvio approvati. Da valutare secondo beneficio, partner, costi e vincoli |
| A05 | Aperto | Card fisica: costi, stampa, consegna, sostituzioni | Si registra soltanto un interesse demo, senza ordine reale |
| A06 | Aperto | Consulenza: platea, durata, inclusioni, competenza e calendario | Slot esplicitamente fittizi; annullamento locale senza inviti esterni |

## Confine del prototipo

Lo stato è salvato in localStorage e condiviso fra i ruoli della stessa demo nel medesimo browser. Il cambio di ruolo è uno strumento di presentazione, non un sistema di autenticazione. Il codice di invito 123456 è pubblico e dimostrativo. I file selezionati non vengono letti o inviati: se ne conserva solo il nome. Non utilizzare dati personali reali.

La condivisione aggiorna i permessi simulati e mostra durata/revoca; non genera URL pubblici, invia email o applica una scadenza server. Le quietanze sono facsimili senza valore. Il blocco revoca l’identificativo locale, la sostituzione ne genera uno nuovo senza riutilizzare il precedente.

La verifica di un documento è formale e attribuita all’operatore demo: non certifica validità giuridica, urbanistica o tecnica. Caricamenti malware, deduplicazione, pagamenti multipli e allocazioni su più rate richiedono backend e regole successive. Il prototipo rende visibile un incasso parziale/eccedente, senza simulare riconciliazioni bancarie automatiche.
