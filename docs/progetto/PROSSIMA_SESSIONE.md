# EECard — punto di ripresa

Aggiornato il 14 ottobre 2026. Repository: https://github.com/av3rgfx/EECard.

## Consegna corrente: esperienza 0.5

L'utente ha segnalato che la 0.4 era grezza e non comprensibile al primo impatto.
La revisione realizza una piattaforma dimostrativa orientata al lavoro, con
spazio agenzia e personale distinti. La PR #11 è stata verificata integrata
alle 18:40:00 UTC; aggiornato main a `0481bb172b26c548c432e2a6bd234e8d4c1a86ae`
e creato il branch `design/experience-0.5`. Nessun merge dell'assistente.

Leggere [esperienza, scelte e limiti](experience-2026-10-14/README.md),
[verifiche](experience-2026-10-14/VERIFICHE.md) e
[pubblicazione](../design/ANTEPRIME_WEB.md). I riferimenti remoti di questa
consegna vengono riportati nella chiusura dopo la verifica effettiva.

Prima di scegliere il branch di un seguito controllare la PR più recente:
se aperta, riutilizzarla per questa consegna; dopo il merge aggiornare main e
creare un nuovo branch. Non riutilizzare i branch integrati, non effettuare merge.

## Come entrare e provare

`npm ci`, `npm run dev`, aprire `http://localhost:5173/`. La root e
`/#/spazio/overview` mostrano lo spazio applicativo; `/#/prova` conserva i link
già condivisi. Sullo stesso Sites la root apre il prodotto; `/app/` è conservato,
`/desktop/` e `/mobile/` restano anteprime; il selettore è in `/anteprime/`.

1. «Completa la pratica»: dati/persona, documenti, accessi, riepilogo.
2. «Accogli al banco»: tessera di esempio o codice `DEMO-ALFA-01`, conferma
   persona, motivo e casa/contratto. Poi ricerca e apertura del fascicolo.
3. Cercare impianto/documento intorno al 2019, confrontare fonti/versioni,
   mostrare la selezione al cliente e terminare l'incontro.
4. «Vista cliente»: tessera, documenti, case, utenze, richiesta e dichiarazione.
   Tornare all'agenzia per vedere la richiesta e registrare un riscontro parziale.
5. «Strumenti della demo»: scenari, attore, reset, note anonime e registro locale.

Il laboratorio tecnico 0.4 rimane `/#/laboratorio`; le rotte 0.3 sono conservate
come archivio. Non riproporli come ingresso principale della piattaforma.

## Stato, vincoli e limiti

Il modello 0.4 e la chiave `eecard-functional-v4` sono conservati. Le visite e
la vista condivisa non vengono ripristinate alla ricarica. La chiave
`eecard-workspace-v1` aggiunge richieste, stati economici, eventi e fixture card
proprietario; incompatibilità/corruzione produce reset con avviso. Il reset
scenario azzera entrambe le parti dello spazio, non il prototipo 0.3.

C–Legame, nome provvisorio, direzione Materia/Editoriale e font locale conservati.
Permessi per agenzia, attore, rapporto, immobile, contratto, intestazione,
delega, incarico, scopo e tempo. La card non concede dati; proprietario senza
bollette private del conduttore; tecnico solo incarico. Fine rapporto, adesione,
revoca card e titolo autonomo rimangono separati. Evidenza, dichiarazione,
incasso verificato e quietanza restano eventi distinti; il parziale conserva
il residuo. Le due card personali di esempio hanno blocchi distinti.

Tutto avviene con fixture sintetiche nel browser: nessuna sicurezza server,
account reale, invito, pagamento, incasso bancario, NFC/wallet, firma, AI,
telemetria o archivio reale. Il banco continuo è predisposto per Cliente 01 /
Alfa; Beta dispone dei propri documenti e non apre Alfa. Pratica a due parti,
nessuna creazione arbitraria di nuovi contratti/clienti. Non usare dati reali.

## Prossimi passi

Provare la comprensione del nuovo ingresso senza prima spiegare sigle o copione:
cosa pensa di poter fare la persona, quale azione sceglie e dove si blocca.
Poi percorso completo, un diniego e un recupero. Usare BF02 esistente senza
rigenerarlo, annotando nuovo supporto/commit e adattamenti prima della raccolta.
Conservare osservazioni individuali fuori repository e pubblicare solo sintesi
anonime autorizzate. BF16 rimane aperto: il feedback qualitativo dell'utente
non è una prova comparativa con operatori o una misura di risparmio.

Raccogliere osservazioni, ordinare correzioni N11/N12 e riesaminare BF01/BF03/BF17.
Verificare telefoni fisici, Safari/iOS, Android e screen reader: Chromium/axe
non sostituiscono questi controlli. Prezzi, copertura, conservazione, risorse,
responsabilità e architettura operativa restano aperti.
