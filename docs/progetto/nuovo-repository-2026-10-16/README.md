# Avvio autonomo del nuovo prodotto — 16 ottobre 2026

L'utente sceglie di preparare un nuovo repository per il prodotto reale e una nuova sessione con Claude, senza dipendere dal codice o dalla cronologia di EECard. Questa consegna prepara il materiale trasferibile; **non crea ancora un repository remoto e non implementa il nuovo prodotto**.

## Consegna da usare

- [Pacchetto ZIP](avvio-prodotto.zip): estrarre il contenuto nella radice del nuovo repository vuoto, inclusi i file nascosti.
- [Cartella pronta da copiare](starter/README.md): stessi contenuti dello ZIP, leggibili qui e autonomi dopo la copia.
- [Prompt da incollare](starter/PROMPT_AVVIO.md): 3.835 caratteri, testo normale compatibile con l'avvio di una sessione con Claude.
- [Manifest SHA-256](starter/MANIFEST.sha256): integrità dei file trasferiti, escluso il manifest stesso.

Creare il repository con il nome scelto dall'utente, copiarvi il pacchetto e aprirlo nella nuova sessione. Nome tecnico, visibilità, account, hosting e provider non sono scelti da questa consegna. Non trasferire `.git`, `.openai/hosting.json`, `.env`, codice demo, fixture, fonti private o vecchi registri. Nessuna dipendenza dal checkout precedente o da strumenti in `/tmp`.

Il pacchetto include prodotto/servizio, studio UX/UI, invarianti e accettazione, percorso di sviluppo, decisioni aperte, punto di partenza, AGENTS/CLAUDE e asset selezionati. Riutilizza gli apprendimenti di rinnovo, acquisizione/versioni e consultazione avviso; **non impone di riusare IN01/IN03/IN04 come codice** nel nuovo prodotto. La richiesta corrente consente codice nuovo. Report dopo il percorso centrale; IN05 non avviato nel prototipo.

## Provenienza e limiti

Sintesi da PRODUCT, DESIGN, DEVELOPMENT, visione-casa del 15 ottobre, proposta-casa, studio progettuale del 15 ottobre, specifiche e registro decisioni. Scelte confermate separate da proposte. Le fonti originali restano nell'archivio EECard, ma non sono necessarie nel nuovo repository.

Il simbolo C–Legame e Manrope sono copiati dai file esistenti, con licenza del font inclusa e guida autonoma. Nessuna fotografia o libreria di componenti trasferita. Nessuna nuova licenza assegnata al marchio/progetto. Risorse UX esterne elencate come riferimenti da verificare nella nuova sessione, non come dipendenze installate o rivalidate oggi.

La proposta precedente resta online sul medesimo Sites, v11/pubblico, sorgente `73d6e53ed1876ab113d2a50521061552e1583a5e`. Verifica nativa del sito e confronto dei sorgenti/asset senza modifiche; nessun deploy identico. I test del vecchio prototipo restano evidenze precedenti e non si trasferiscono al nuovo prodotto.

## Verifica e riproduzione

Eseguire `python docs/progetto/nuovo-repository-2026-10-16/package.py` dalla repository: ricrea manifest e ZIP dai soli file di `starter/`, controlla link Markdown locali, riferimenti autonomi, limite del prompt e contenuto dell'archivio. Il controllo non esegue test applicativi, non contatta servizi e non certifica licenze o sicurezza della futura piattaforma.

Consegna documentale separata dal prototipo, su `docs/nuovo-prodotto-2026-10-16`, basata sulla continuità della PR #17 ancora aperta. PR dedicata con base `feat/proposta-casa` per mostrare solo il nuovo pacchetto e gli aggiornamenti di continuità. Dopo l'integrazione della #17, riallineare la base senza perdere questa consegna; nessun merge effettuato qui.

BF02 invariato, BF16 e prove fisiche aperti. Il nuovo avvio non trasforma prove automatiche in osservazioni umane o decisioni commerciali.

Salvato sul remoto nella [PR #18](https://github.com/av3rgfx/EECard/pull/18), aperta senza merge, con base `feat/proposta-casa`.
