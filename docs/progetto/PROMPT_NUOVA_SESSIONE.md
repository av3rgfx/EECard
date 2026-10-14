# Prompt per riprendere EECard

Aggiornato il 14 ottobre 2026. Per la prossima implementazione usare il prompt
obiettivo completo in [PROMPT_DEMO_FUNZIONALE.md](PROMPT_DEMO_FUNZIONALE.md),
che inizia con `/goal`. Le istruzioni pratiche sono in
[AVVIO_PROSSIMA_SESSIONE.md](AVVIO_PROSSIMA_SESSIONE.md).

---

Riprendiamo EECard dal lavoro esistente. Rispondi in italiano.

Repository unica: https://github.com/av3rgfx/EECard. Il piano è nella PR #9:
integrala prima di iniziare questa implementazione. Verifica comunque lo stato
remoto, aggiorna main e crea un nuovo branch dedicato secondo `AGENTS.md`.
Non riutilizzare il branch documentale della PR #9 e non effettuare merge.

Leggi `AGENTS.md`, `docs/progetto/PROSSIMA_SESSIONE.md` e
`docs/progetto/demo-funzionale-2026-10-14/README.md`, poi esegui integralmente
`docs/progetto/PROMPT_DEMO_FUNZIONALE.md`.

Il metodo deciso è demo-prima: implementa una demo 0.4 osservabile di PF01 →
PF02 → PF05 e usa in seguito la prova concreta per far emergere lacune e
priorità. Il kit BF02 è già pronto: non rifarlo. BF16 resta aperto finché non
arrivano osservazioni umane. Non inventare misure e non attivare servizi reali.

Conserva decisioni, confini di accesso e questioni aperte; aggiorna la
continuità e prepara una PR verificabile senza merge.
