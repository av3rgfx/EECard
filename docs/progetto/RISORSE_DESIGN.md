# EECard — direzione e risorse per il design

Verifica: 6 ottobre 2026. Questo documento prepara la prossima sessione; non è
un'implementazione né una scelta definitiva dello stack di produzione.

## Richieste confermate e proposte operative

**Confermato dall'utente:** repository `av3rgfx/EECard`, piattaforma desktop e mobile,
qualità percepita molto premium, riferimento Revolut, uso delle risorse Animate UI,
Rare UI, `transition.dev` e delle skill pertinenti di Emil Kowalski, in particolare
`apple-design` e `mobile-native`.

**Proposta per il design:** interfaccia calma e precisa, gerarchie forti, tipografia
leggibile, spaziature regolari, superfici neutre, un accento riconoscibile e profondità
discreta. La card digitale è un elemento distintivo; scadenze e richieste da gestire
restano immediatamente leggibili. Materiali, raggi e ombre devono appartenere allo
stesso sistema. Una qualità paragonabile a Revolut non richiede copiarne schermate,
marchi, testi o palette, né trasformare EECard in un'interfaccia bancaria.

**Da validare visivamente:** palette, carattere, densità, stile della card, tema
principale e navigazione. Non fissarli come decisioni dei fondatori prima del design.
Il livello premium deve essere riconoscibile anche con movimento ridotto e senza
effetti decorativi. Evitare che sfocature, animazioni ripetute o decorazioni ostacolino
documenti, importi e azioni quotidiane.

## Componenti e transizioni

| Risorsa | Verifica e natura | Uso proposto in EECard |
| --- | --- | --- |
| [Animate UI](https://animate-ui.com/docs) | Documentazione accessibile. Distribuzione di componenti React personalizzabili, con Tailwind e Motion, tramite registry compatibile con shadcn. | Base per controlli, dialoghi, menu e pannelli; selezionare una famiglia di primitive coerente con il progetto. |
| [Rare UI](https://www.rareui.com/llms.txt) | Catalogo e sorgenti disponibili; componenti React/TypeScript con Tailwind e, secondo il componente, Motion e altre dipendenze. | Dettagli selezionati: campanella notifiche, input OTP o interazione sul fascicolo. Verificare accessibilità e adattare movimento e stile. |
| `https://transition.dev` | Il dominio indicato dall'utente non è risultato accessibile; una richiesta HTTP ha restituito 503. Non sono state verificate API o installazione di questo dominio. | Conservare il riferimento originale, senza inventare pacchetti. |
| [Transitions.dev](https://transitions.dev/) | Risorsa distinta, al plurale, accessibile. Raccolta di ricette CSS/React e skill per il movimento delle interfacce. È un possibile riferimento inteso dall'utente, non una correzione confermata. | Candidato per transizioni di menu, pannelli e feedback di stato. Finché non confermato, registrare esplicitamente l'ipotesi ed evitare una sostituzione silenziosa. |

Riferimenti operativi verificati:

- Animate UI: [componenti](https://animate-ui.com/docs/components),
  [accordion Base UI](https://animate-ui.com/docs/components/base/accordion),
  [button](https://animate-ui.com/docs/components/buttons/button).
- Rare UI: [sorgenti](https://github.com/swamimalode07/rare-ui),
  [OTP input](https://rareui.com/components/otpinput),
  [notification bell](https://rareui.com/components/notificationbell).
- Transitions.dev: [skill e installazione](https://transitions.dev/skill.html),
  [termini e licenza](https://transitions.dev/terms.html). Le ricette hanno condizioni
  diverse dagli strumenti CLI; la presenza di una licenza MIT sugli strumenti non
  rende automaticamente MIT tutte le ricette. Sono disponibili contenuti gratuiti
  e contenuti Pro: il prototipo può partire da quelli gratuiti.

Usare realmente le risorse richieste nei punti pertinenti, con una breve mappa
«schermata/componente → fonte → adattamenti». Leggere prima documentazione, sorgenti
e licenze dei componenti scelti. Importare solo ciò che serve e conservare le
attribuzioni richieste. Non installare un catalogo intero per averlo a disposizione.
Se un componente non regge i requisiti di accessibilità o lo stack esistente,
documentare il motivo e la soluzione adottata.

Un solo sistema di token deve governare font, colori, spaziature, raggi, ombre,
stati e movimento. Le librerie forniscono componenti da integrare in questo sistema.
Non animare due volte la stessa superficie con librerie diverse. La scelta di una
famiglia di primitive riduce incoerenze senza vietare singole dipendenze motivate.

## Skill di Emil Kowalski

Sono stati letti i `SKILL.md` delle skill elencate sotto. Sorgente:
[emilkowalski/skills](https://github.com/emilkowalski/skills/tree/main/skills).
Il commit di riferimento osservato durante la verifica è
`e8a175de22ae1e49370fc144c1f3bb9aeedf988d`:
[snapshot](https://github.com/emilkowalski/skills/tree/e8a175de22ae1e49370fc144c1f3bb9aeedf988d/skills).
Le skill non sono state installate o copiate nella repository EECard. Nella sessione
di design recuperarle, leggere i file e i relativi riferimenti quando necessari,
registrando la versione effettivamente usata.

| Skill | Applicazione proposta |
| --- | --- |
| [apple-design](https://github.com/emilkowalski/skills/blob/main/skills/apple-design/SKILL.md) | Prioritaria: gerarchie, tipografia, materiali, risposta immediata, continuità delle interazioni e controllo dell'utente. È orientata anche al web. |
| [mobile-native](https://github.com/emilkowalski/skills/blob/main/skills/mobile-native/SKILL.md) | Prioritaria: viewport mobile, safe area, tastiera, touch, scorrimento e zoom. Riguarda il web su telefono; non implica Swift o React Native. |
| [emil-design-eng](https://github.com/emilkowalski/skills/blob/main/skills/emil-design-eng/SKILL.md) | Coerenza dei componenti, qualità dei dettagli e revisione visiva. |
| [pick-ui-library](https://github.com/emilkowalski/skills/blob/main/skills/pick-ui-library/SKILL.md) | Selezione mirata delle dipendenze mancanti, dopo aver verificato quelle esistenti; le risorse richieste dall'utente restano prioritarie. |
| [animate](https://github.com/emilkowalski/skills/blob/main/skills/animate/SKILL.md) | Realizzare solo le animazioni con una funzione chiara, integrate con movimento ridotto e input diversi. |
| [review-animations](https://github.com/emilkowalski/skills/blob/main/skills/review-animations/SKILL.md) | Revisione conclusiva di frequenza, durata, interruzione, prestazioni e accessibilità delle animazioni. |
| [break-ui](https://github.com/emilkowalski/skills/blob/main/skills/break-ui/SKILL.md) | Verifica con nomi e indirizzi lunghi, più immobili, dati mancanti, liste vuote e importi realistici. Usare la modalità `+ fix` per correggere i difetti entro il perimetro autorizzato. |

Skill considerate, da usare solo quando il relativo compito esiste:

- [prototype](https://github.com/emilkowalski/skills/blob/main/skills/prototype/SKILL.md)
  serve a confrontare varianti distinte di un singolo elemento, con selettore.
  Non è necessaria per realizzare ogni prototipo. Il suo flusso prevede la scelta
  dell'utente prima dell'integrazione: usarla se si vuole esplorare, per esempio,
  più versioni della card, senza trasformarla in un passaggio obbligatorio.
- [find-animation-opportunities](https://github.com/emilkowalski/skills/blob/main/skills/find-animation-opportunities/SKILL.md)
  propone opportunità di movimento su un'interfaccia esistente; non le implementa.
- [improve-animations](https://github.com/emilkowalski/skills/blob/main/skills/improve-animations/SKILL.md)
  è un audit con piani di intervento; non sostituisce la costruzione del prototipo.

`animate-expo` e `write-swift` non sono selezionate per il prototipo web. Valutarle
solo se una decisione successiva richiederà rispettivamente Expo/React Native o
Swift. Il progetto di app negli store rimane aperto.

## Risultato atteso e verifica

La prossima sessione deve produrre un prototipo frontend navigabile con dati
dimostrativi, design system e percorsi desktop/mobile coerenti. L'ambiente di demo
deve dichiarare la simulazione; non deve eseguire pagamenti, emettere documenti
validi, attivare card reali o esporre documenti personali.

Verificare navigazione e azioni principali, interfaccia a 360/390 px e 1280/1440 px,
assenza di scorrimento orizzontale accidentale, tastiera, focus, contrasto, zoom,
stati di errore e movimento ridotto. Su mobile curare safe area, tastiera aperta,
input leggibili e pulsanti raggiungibili. Le verifiche in emulazione non provano
il comportamento su dispositivi fisici: riportare esattamente ciò che è stato
controllato e lasciare un elenco breve per la prova su iPhone e Android.

Le questioni commerciali e operative rimaste aperte sono in
[PROSSIMA_SESSIONE.md](PROSSIMA_SESSIONE.md). Il prototipo può avanzare con ipotesi
esplicite; non deve assegnare una periodicità ai 50 € / 15 € o promettere coperture
e tempi di intervento non concordati.
