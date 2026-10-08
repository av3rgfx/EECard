# Verifiche e consegna

8 ottobre 2026. Ambito esclusivamente documentale. Questo rapporto distingue
controlli svolti e prove future: i criteri PF/MD/BF/FT sono specifiche, non
test di prodotto già superati.

## Base e fonti

- Stato remoto PR #5 letto prima di scegliere il branch: integrata alle
  19:32:22 UTC, merge `a8e0ca7a0641685462ac209c1570ef421631c121`.
- Clone di main allo stesso commit, checkout inizialmente pulito; nuovo branch
  `docs/specifiche-funzionali-2026-10-08`.
- Letti AGENTS e PROSSIMA_SESSIONE; tutti i file della consegna del 7 ottobre;
  PRODUCT, DESIGN, DEVELOPMENT, BACKLOG e DECISIONI; studio v0.1 nelle sezioni
  pertinenti e sorgenti dei percorsi. Nessun riascolto della registrazione,
  non allegata alla sessione.
- Fonti primarie e limiti di accesso sono elencati in [FATTIBILITA.md](FATTIBILITA.md).
  AgID ha risposto 403; il suo contenuto non è presentato come verificato.

## Controlli documentali

Il controllo locale usa la differenza rispetto a `a8e0ca7` e include i nuovi
file non ancora tracciati. Verifica che le risorse modificate siano Markdown,
che i collegamenti relativi e le ancore Markdown puntino a destinazioni presenti,
che gli ID siano univoci e che il grafo delle dipendenze BF non contenga cicli.
`git diff --check` controlla il diff; i nuovi file sono controllati anche per
spazi a fine riga prima dell'aggiunta all'indice.

Esito locale: **16 file Markdown** modificati/nuovi, **171 collegamenti locali**
controllati senza destinazioni o ancore mancanti, **30 coppie RF/EA** complete
ed univoche, **6 percorsi PF**, **54 criteri AC** di percorso/trasversali/modello,
**18 voci BF** con riferimenti risolti e nessun ciclo nelle dipendenze esplicite,
**8 protocolli FT**. Nessuno spazio finale; `git diff --check` superato.

La revisione incrociata verifica requisiti/offerte/percorsi/modello/backlog:
conservati permessi e riservatezza, stati finanziari distinti, revoca e accesso
storico. Precisato BF04 per negare operazioni del rapporto concluso e accessi
storici privi di titolo, senza vietare lo storico legittimo previsto da PF03.
Precisato che il recupero assistito senza lettore richiede il server disponibile.
Nel modello, SessioneBanco ammette inizialmente un cliente non confermato per
registrare anche letture ignote/rifiutate; MD-AC10 distingue la visualizzazione
autorizzata di un documento dal divieto di conservarne copie nella sessione
schermo. Revisione indipendente completata e queste precisazioni applicate.

Verificato con `git diff --name-only a8e0ca7 -- src public tests scripts .openai
package.json package-lock.json docs/progetto/EECard-studio-v0.1.pdf
docs/progetto/EECard-studio-v0.1.docx docs/progetto/discussione-2026-10-07`
che sorgenti, risorse e fonti storiche considerate non cambiano.

I conteggi sono del controllo locale del contenuto; l'identità con il remoto
viene verificata dopo il salvataggio. I comandi non richiedono build o servizi.

## Salvataggio remoto

Branch di consegna: `docs/specifiche-funzionali-2026-10-08`, base `main`.
[PR #6](https://github.com/av3rgfx/EECard/pull/6) aperta, non in bozza, senza merge.
Commit degli elaborati `7d43ae82e9f91b13f13dfc0aaea9a92a641ceb0c`, salvato
con push e riscontrato come HEAD remoto della PR. Il successivo commit
registra soltanto questa chiusura e i collegamenti alla PR; non modifica il
prodotto o le specifiche funzionali. L'HEAD finale è consultabile nella PR.

Per riprodurre il controllo del salvataggio, dopo `git fetch origin` confrontare
`git rev-parse HEAD` e
`git rev-parse origin/docs/specifiche-funzionali-2026-10-08`, verificare
`git status --short` vuoto e `git diff --check a8e0ca7..HEAD` senza errori.
La base remota main resta distinta dal branch della consegna.

## Confini delle verifiche

Non sono eseguiti nuovi test UI, build, audit di accessibilità, collaudi fisici,
prove NFC, firme, caricamenti su AI o chiamate a servizi operativi. Nessun nuovo
backend, schema database, provider, ordine o servizio è attivato. La verifica
delle fonti non dimostra l'idoneità hardware o giuridica del processo EECard.

Studio PDF/DOCX v0.1 e cartella della discussione conservati; nessuna modifica
a sorgenti, fixture, asset, screenshot o manifest hosting. Nessun audio,
trascrizione integrale, dato personale o documento reale aggiunto. Gli esempi
e i protocolli nuovi usano scenari e importi sintetici, distinti dai prezzi.

Nessun deploy. L'ultima pubblicazione documentata resta Sites v5, sorgente
`65ac9e092c17d9113d85106fa3d04fbb9770cab5`; il sito live non è ricollaudato qui.
Nessun merge effettuato. La proposta R1, le offerte e le soglie di prova restano
da revisionare; il silenzio sulle domande non è una conferma.
