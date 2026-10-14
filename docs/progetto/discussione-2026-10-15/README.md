# Due audio, appunto e sviluppo incrementale

Consegna del 15 ottobre 2026, successiva alla 0.5. Le fonti sono state ricevute
e trattate: i precedenti documenti di preparazione che le indicano mancanti
sono storici. Lo studio integra EA01–EA30 e le specifiche dell'8 ottobre.

| Elaborato pubblico | Contenuto |
| --- | --- |
| [ANALISI.md](ANALISI.md) | NA01–NA16, riferimenti ad alias/timestamp, decisioni/proposte/dubbi/contraddizioni e confronto col codice |
| [STUDIO_PROGETTUALE.md](STUDIO_PROGETTUALE.md) | Utenti, alternative, UX, dati, permessi, stati/errori, report separati e servizi |
| [FATTIBILITA_BOLLETTE.md](FATTIBILITA_BOLLETTE.md) | Schemi/canali, acquisizione, QR, alternative di pagamento e fonti ufficiali |
| [PIANO_INCREMENTALE.md](PIANO_INCREMENTALE.md) | IN01–IN10, priorità, dipendenze, accettazione e verifiche |
| [VERIFICHE.md](VERIFICHE.md) | Attività eseguite, primo incremento, limiti e consegna remota |

## Inventario anonimo

| Alias | Ordine ricevuto / tipo | Durata verificata | Stato |
| --- | --- | --- | --- |
| AUDIO01 | Primo allegato, M4A/AAC, mono, 48 kHz | 542,997 s — 09:02,997 | Intero file elaborato; bozza integrale privata con lacune segnalate |
| AUDIO02 | Secondo allegato, M4A/AAC, mono, 48 kHz | 100,885 s — 01:40,885 | Intero file elaborato; bozza integrale privata con lacune segnalate |
| APP01 | Appunto testuale fornito nel messaggio | Non applicabile | Cinque riferimenti tematici stabili nell'analisi; originale fuori repository |
| USR01 | Chiarimento testuale successivo | Non applicabile | L'utente conferma due report annuali, cliente e agenzia, con viste separate |

Gli alias seguono gli allegati: l'ordine cronologico dei due audio non è
verificato. Nomi originali, corrispondenze, digest e trascrizioni sono nella
consegna privata, non in Git. Nessun esempio personale è importato nelle fixture.

## Metodo e limiti

Lettura locale con ffprobe; trascrizione italiana locale con faster-whisper
large-v3-turbo, secondo passaggio completo Whisper small e controlli mirati
Whisper medium. Timestamp dei segmenti/parole e confronto fra riconoscimenti;
nessun servizio di trascrizione esterno. I modelli sono stati scaricati, mentre
fonti e risultati sono rimasti nell'ambiente di lavoro privato.

Diarizzazione automatica locale sperimentata con sherpa-onnx, segmentazione
pyannote 3.0 e modelli di embedding. Le voci A/B sono **provvisorie e incerte**:
la separazione automatica non è una verifica umana, può unire due persone o
separare la stessa voce. Non attribuire identità; A di un file non è
necessariamente A dell'altro. Dove la separazione è ambigua compare `?` o
sovrapposizione. Il numero di cluster usato per il tentativo a due voci deriva
dal contesto del confronto, non certifica l'assenza di altre voci.

La consegna privata mantiene il testo riconosciuto, segnala parole/passaggi
incerti e intervalli senza testo affidabile, compresi apertura e coda. Un file
interamente elaborato **non** implica che ogni parola sia riconoscibile.
Le lacune non vengono riempite con il contenuto dell'appunto. Le chiusure
riconosciute come formule standard o «sottotitoli» sono possibili allucinazioni
ASR, non nuovi contenuti o decisioni. Non è stata eseguita una revisione umana
parola per parola né una certificazione dei parlanti.

Passaggi sensibili: AUDIO01 00:00–00:25 (parole e digressione), 00:46–00:54
(anni nell'esempio), 01:36–02:08 (conguaglio), 02:15–02:40 (nessun testo
utilizzabile), 03:54–04:35 (urgenza/data poco chiare), 05:50–06:27 (parlato
meno affidabile ed esempi privati), 06:27–07:24 (preavviso non verificato),
08:39–09:03 (coda); AUDIO02 apertura 00:00–00:16 e coda 01:33–01:41.
Riferimenti nell'analisi arrotondati; per termini definitivi occorre riascolto
umano dei soli punti controversi, senza rifare l'intero studio.

## Primo incremento e confini

IN01 rende percorribile «Gestisci abbonamento» dalla home di Cliente 01 con
periodo sintetico, disattivazione rinnovo, conferma e salvataggio locale verificato.
La divergenza sul preavviso resta aperta. Nessun listino, servizio reale,
cessazione programmata, pagamento, telefonata AI o notifica è stato attivato.
Le nuove idee non sono tutte requisiti approvati per il primo rilascio.

BF02 invariato, BF16 aperto. La prova automatica verifica il codice, non la
comprensione delle persone o la sostenibilità economica. Sorgenti grezze,
trascrizioni e osservazioni individuali non entrano nella repository pubblica.
