# Avvio della sessione di implementazione della demo 0.4

Questa pagina contiene i passaggi operativi per iniziare senza ricostruire il
contesto.

## Prima della nuova sessione

1. Revisionare e integrare la
   [PR #9](https://github.com/av3rgfx/EECard/pull/9). La PR contiene il piano,
   il prompt e la continuità, ma non il codice della demo.
2. Aprire una nuova sessione di lavoro sul repository
   https://github.com/av3rgfx/EECard.
3. Incollare **l'intero contenuto** di
   [PROMPT_DEMO_FUNZIONALE.md](PROMPT_DEMO_FUNZIONALE.md), a partire dalla
   prima riga `/goal`. Non basta incollare la sola parola `/goal`.

Non serve allegare nuovamente documenti, ricreare BF02 o rispondere prima alle
questioni commerciali aperte. Il prompt indica già ordine di lettura, vincoli,
perimetro, verifiche e consegna.

## Cosa farà la nuova sessione

La nuova sessione dovrà:

1. verificare che la PR #9 sia integrata e aggiornare `main`;
2. creare un nuovo branch dedicato all'implementazione della demo 0.4;
3. realizzare PF01 → PF02 → PF05 e le estensioni sintetiche previste;
4. eseguire i test pertinenti e aggiornare report, screenshot e anteprime;
5. aggiornare i file Markdown di prodotto, sviluppo, decisioni e continuità;
6. pubblicare il branch e aprire una nuova PR di implementazione, senza merge.

La nuova PR è distinta dalla PR #9: la prima consegna il piano, la successiva
consegnerà codice, test, artefatti e documentazione coerenti col commit della
demo. Se la PR #9 risultasse ancora aperta, non riutilizzare il suo branch
documentale per il codice: verificarne prima lo stato e seguire `AGENTS.md`.

## Esito atteso

Al termine deve esistere una demo locale e condivisibile con dati sintetici,
una PR verificabile e un copione pronto per la successiva prova con operatori.
BF16 resterà aperto finché quella prova non produrrà osservazioni umane.
