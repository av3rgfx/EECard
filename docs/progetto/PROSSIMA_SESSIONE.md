# EECard - punto di ripresa

Aggiornato l'8 ottobre 2026. Repository unica https://github.com/av3rgfx/EECard.

## Obiettivo corrente

L'utente ha fornito la registrazione della nuova conversazione dei fondatori del
7 ottobre (28:25) e ha chiesto analisi completa, confronto con il repository,
schema delle idee/migliorie, file e prompt per continuare studio e progettazione.

La consegna è [discussione-2026-10-07/](discussione-2026-10-07/README.md):

- [Analisi EA01-EA30](discussione-2026-10-07/ANALISI_CONVERSAZIONE.md): intervalli,
  differenze dalla base, implicazioni, questioni aperte e sequenza proposta.
- [Contesto verificato](discussione-2026-10-07/CONTESTO_REPOSITORY.md): snapshot,
  codice, decisioni già ricevute e confini del prototipo.
- [Prompt completo](discussione-2026-10-07/PROMPT_NUOVA_SESSIONE.md): da usare
  insieme ai documenti e, se serve il riascolto, all'audio originale.

La trascrizione è automatica e i passaggi ambigui non sono risolti per deduzione.
La repository pubblica contiene sintesi anonime, non audio o trascrizione integrale.

## Stato remoto e continuità

La PR #4 è integrata il 7 ottobre alle 22:13:57 UTC (8 ottobre alle 00:13:57 in
Italia). Base analizzata: main `4b77c0bd41d733c7a7680ad3d63d9a496424db64`.
La nuova analisi documentale parte da quella base sul branch
`docs/discussione-2026-10-07`, con la relativa PR senza merge implicito.
Controllare il remoto: riusare la PR se aperta; dopo merge partire da main
aggiornato e da un nuovo branch. I riferimenti precedenti a PR #4 aperta sono
checkpoint storici.

## Principali nuovi input

Attivazione al contratto e riuso dei dati; fascicolo recuperabile dal lettore al
banco anche con personale diverso; mini terminale con due schermi e possibile
firma con penna; wallet/contactless; iscrizione online e spedizione fisica a
pagamento; offerta per altre agenzie con card personalizzate e brand del sistema.

Funzioni domestiche anche per il proprietario nella propria casa, preservando
la riservatezza delle bollette dell'inquilino; QR/importo prioritari in bolletta;
domotica esplorativa; documenti tecnici/edilizi storici e cronologia lavori;
migrazione di clienti già gestiti; assistente con contesto e bozze contrattuali.

Spunto molto tecnologico con fondo bianco/rosso, da chiarire rispetto alla 0.3.
Nessuna di queste idee è stata trasformata automaticamente in una funzione,
un listino o un perimetro del primo rilascio. Tutti i punti hanno ID nel rapporto.

## Decisioni da conservare

EECard provvisorio; C - Legame scelto, nome ancora aperto. Direzione 0.3:
tessera/materiali di Materia e luce, pagine aperte di Editoriale e architettura,
bruno/albicocca/avorio. Tessera prima nella home personale, aree operative per
agenzia/tecnico. Immobili compatti solo in home con più risultati effettivamente
visibili; una sola casa e pagina immobili sempre espanse.

Documento caricato, dichiarazione, incasso verificato e quietanza distinti.
Il parziale mantiene il residuo. Card di accesso, non bancaria. Permessi per
relazione/immobile/contratto/incarico; proprietario senza accesso automatico alle
bollette personali dell'inquilino. Le fixture e i filtri della demo non sono
autenticazione, autorizzazioni o archivio di produzione.

## Questioni aperte e prossime azioni

Leggere AGENTS.md, PRODUCT.md, DESIGN.md, DEVELOPMENT.md, BACKLOG.md,
DECISIONI.md e i tre documenti della nuova analisi. Riprendere da S02-S08:
chiarire beneficio/primo pagante, offerte e quote; proporre perimetro, percorsi,
dati e criteri; valutare dipendenze wallet/lettore/firma/AI e variante visiva.

I precedenti 50/15 euro non sono un listino. A 23:17 circa il nuovo audio è
instabile fra 65 e 60-50 euro; i 600 euro annui si riferiscono ad alcuni clienti
già gestiti, non al prezzo EECard. Jarvis potrebbe riferirsi a un progetto o
assistente da chiarire. Budget, territorio, risorse, copertura, primo rilascio e
ordine locale/B2B rimangono aperti. Non assumere rinvii approvati per pagamenti,
app, 3D, AI o totem. Le prove wallet da fonti ufficiali non sono prove hardware.

Lo studio v0.1 resta intatto. Non ripetere tutta l'analisi di mercato e il design
senza una ragione. Prima di codice operativo definire il comportamento richiesto;
procedere sugli interventi effettivamente richiesti e autorizzati nella sessione.

## Prototipo, verifiche e anteprime

Il frontend rimane React/TypeScript/Vite, dati demo e localStorage, senza backend,
account reali, caricamento server, pagamenti, NFC/wallet, firma, domotica o AI.
Per avvio e test pertinenti seguire DEVELOPMENT.md. La richiesta corrente non
ha modificato frontend, asset, fixture, design system o screenshot.

Ultima versione pubblicata documentata: Sites v5, 6 ottobre alle 14:18:39 UTC,
sorgente `65ac9e092c17d9113d85106fa3d04fbb9770cab5`. [Desktop](https://eecard-design-preview.uepacio.chatgpt.site/desktop/)
- [Mobile](https://eecard-design-preview.uepacio.chatgpt.site/mobile/).
Questa consegna non esegue un deploy e non verifica di nuovo il sito live.

I controlli della precedente modifica UI erano 6 test mirati, casi home e quattro
anteprime/HTML; la precedente integrazione aveva 19 E2E e 24 audit aggiuntivi.
Sono evidenze datate in VERIFICHE.md, non test ripetuti in questa sessione.
Prove fisiche iPhone/Android, Safari/WebKit e screen reader restano aperte.

Chiusura documentale: verificare coerenza, collegamenti e diff, artefatti del
passaggio e stato del salvataggio remoto. Non attribuire nuovi test frontend
alla sola analisi. Registro delle sessioni e backlog conservano la storia.
