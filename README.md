# EECard

Fondazione locale UFP per preparazione delle ricezioni di magazzino e simulazione controllata del caricamento. Il codice è in [`ufp/`](ufp/README.md).

- [Istruzioni e avvio](ufp/README.md)
- [Scheda guidata vuota](ufp/scheda/Scheda_UFP_da_compilare.xlsx)
- [Architettura, evidenze e limiti](ufp/docs/PROGETTO.md)
- [Test locali](ufp/docs/TEST.md)
- [Passaggio al design desktop e mobile](ufp/docs/PROSSIMA_SESSIONE.md)

Questa repository pubblica contiene esempi anonimizzati, non documenti aziendali originali. Il connettore ARS non è implementato: tutte le operazioni di caricamento sono simulate. Nessuna disponibilità sul palmare è stata verificata.

Richiede Python 3.10+ senza dipendenze esterne:

```console
cd ufp
python -m unittest discover -s tests -v
```
