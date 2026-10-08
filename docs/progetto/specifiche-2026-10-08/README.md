# EECard — specifiche funzionali incrementali

8 ottobre 2026. Elaborato di progettazione per revisione, non offerta pubblica
né approvazione di un rilascio operativo. Aggiorna lo [studio v0.1](../EECard-studio-v0.1.pdf)
senza modificarlo e usa il [catalogo EA01–EA30](../discussione-2026-10-07/ANALISI_CONVERSAZIONE.md)
come fonte: non ripete l'analisi della registrazione.

## Punto di partenza verificato

La [PR #5](https://github.com/av3rgfx/EECard/pull/5) è integrata il
2026-10-08 alle 19:32:22 UTC. Base letta e clonata: `main`
`a8e0ca7a0641685462ac209c1570ef421631c121`. Nuovo branch:
`docs/specifiche-funzionali-2026-10-08`. Nessun merge eseguito in questa sessione.

Il progetto dispone di studio, design 0.3 e prototipo React/TypeScript/Vite.
Non dispone di account, autorizzazioni server, archivio o integrazioni operative.
La demo rappresenta gli stati; non può essere semplicemente popolata con clienti
reali per diventare il primo rilascio.

Lo studio aveva già previsto relazioni temporali, fascicolo, tecnici, canali
fisici, card digitale e AI. La nuova progettazione precisa i punti che cambiano
il comportamento: attivazione nel contesto del contratto; recupero del fascicolo
da un altro operatore; utenze legate all'intestatario e non al ruolo globale;
ricerca storica; riuso verificabile dei dati nelle bozze. Wallet, terminale,
firma e assistente richiedono prove dedicate, non soltanto nuove schermate.

## Elaborati da leggere

| Documento | Risultato revisionabile |
| --- | --- |
| [REQUISITI_DECISIONI.md](REQUISITI_DECISIONI.md) | 30 requisiti collegati agli EA, differenze dalla base, vincoli, ipotesi e decisioni aperte |
| [OFFERTE_RILASCIO.md](OFFERTE_RILASCIO.md) | Offerte clienti/agenzie senza prezzi, proposta R1 e alternative, backlog BF e prova in agenzia |
| [PERCORSI.md](PERCORSI.md) | Sei percorsi PF con stati, autorizzazioni, errori e criteri di accettazione |
| [MODELLO_DATI.md](MODELLO_DATI.md) | Entità, relazioni, temporalità, isolamento e invarianti del modello logico |
| [FATTIBILITA.md](FATTIBILITA.md) | Fonti primarie e prove da eseguire per wallet/contactless, terminale, firma e AI |
| [VERIFICHE.md](VERIFICHE.md) | Base, controlli effettivi, limiti e consegna remota |

## Cambiamenti necessari e ordine proposto

1. Rendere esplicita l'offerta e il soggetto responsabile di ciascuna prestazione.
   Adesione, account, rapporto con la casa e credenziale card sono oggetti diversi.
2. Specificare un fascicolo che resti utilizzabile al cambio di operatore, con
   provenienza dei dati, versioni, permessi e attività pendenti. Il lettore è un
   ingresso al percorso, non un'autorizzazione a leggere documenti.
3. Preparare identità, relazioni temporali, isolamento fra agenzie e archivio
   privato prima di rendere operativo il percorso. Le fixture restano separate.
4. Validare il beneficio con casi sintetici e misure prima/dopo, poi scegliere
   quale alternativa di rilascio finanziare e quali integrazioni rendere essenziali.

**Raccomandazione provvisoria:** partire dal fascicolo e dalla continuità al banco
per i clienti dell'agenzia iniziale, predisponendo i confini fra agenzie.
È un'ipotesi per progettare, non la scelta del primo pagante o un rinvio approvato
di B2B, wallet, firma, AI, pagamenti, app o 3D. Alternative e condizioni di cambio
sono descritte nell'offerta. Nessun prezzo, budget o termine viene dedotto.

## Decisioni conservate e limiti delle fonti

Nome EECard provvisorio, simbolo C–Legame e direzione visiva 0.3 conservati.
Bianco/rosso è uno spunto da confrontare, non un redesign approvato.
Il proprietario non accede automaticamente alle bollette dell'inquilino.
Documento caricato, dichiarazione, verifica dell'incasso e quietanza restano
distinti; una quietanza parziale non azzera il residuo.

Questa ripresa legge i documenti della consegna e lo studio, non riascolta
l'audio originale, che non è allegato alla sessione. Nessuna cifra ambigua viene
risolta: i 600 euro annui riguardano clienti già gestiti, non il listino EECard.
Non sono pubblicati audio, trascrizione integrale, dati personali o documenti
reali. Non sono attivati servizi né aggiornate le anteprime.

La prossima attività concreta è la revisione del beneficio R1 e una prova guidata
PF01 → PF02 → PF05 con due operatori e fascicoli sintetici, secondo il protocollo
in OFFERTE_RILASCIO. Le risposte su Jarvis, schermi e firma modificano soltanto i
rami dipendenti; le specifiche del fascicolo possono avanzare indipendentemente.
