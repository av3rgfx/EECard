import { useEffect, useRef, useState } from "react";
import { ArrowRight, Check, ShieldCheck } from "lucide-react";
import { Button, Notice, Badge } from "../components/ui";
import {
  agencies,
  actors,
  allowed,
  execute,
  initialState,
  persist,
  readState,
  readVersion,
  scenarios,
  search,
  titleAllows,
  type Command,
  type Purpose,
  type Scenario,
  type State,
  type Version,
} from "./model";
import "./demo.css";
const stages = [
  {
    id: "practice",
    label: "01 · Attivazione",
    task: "Controlla le fonti, correggi la data, aggiungi il mancante, verifica il rapporto e prepara gli inviti simulati.",
  },
  {
    id: "desk",
    label: "02 · Ritorno al banco",
    task: "Presenta card o codice, conferma la persona e scegli scopo e contesto.",
  },
  {
    id: "history",
    label: "05 · Recupero storico",
    task: "Cerca una relazione tecnica tra il 2018 e il 2020, confronta le versioni, prova la condivisione e chiudi la visita.",
  },
  {
    id: "extensions",
    label: "03 / 04 / 06 · Esplora",
    task: "Confronta casa propria e locata, bolletta facsimile e bozza da template.",
  },
] as const;
function download(name: string, data: unknown) {
  const url = URL.createObjectURL(
    new Blob([JSON.stringify(data, null, 2)], { type: "application/json" }),
  );
  const a = document.createElement("a");
  a.href = url;
  a.download = name;
  a.click();
  URL.revokeObjectURL(url);
}
export function DemoPage() {
  const [s, set] = useState(readState);
  const [message, setMessage] = useState(
    "Tutti i nomi, gli oggetti e gli eventi sono sintetici. Nessun servizio reale.",
  );
  const [failed, setFailed] = useState(false);
  const [storageFailed, setStorageFailed] = useState(false);
  const [code, setCode] = useState("DEMO-ALFA-01");
  const [confirmed, confirm] = useState(false);
  const [purpose, setPurpose] = useState<Purpose>("storico");
  const [context, setContext] = useState("");
  const [query, setQuery] = useState({ title: "", type: "", from: "", to: "" });
  const [selection, select] = useState<{ id: string; number: number } | null>(
    null,
  );
  const [inspection, setInspection] = useState<{
    id: string;
    number: number;
  } | null>(null);
  const [recipient, setRecipient] = useState("");
  const [viewActor, setViewActor] = useState("person-alfa");
  const [house, setHouse] = useState("casa-propria");
  const [suggestions, setSuggestions] = useState(false);
  const heading = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    setStorageFailed(!persist(s));
  }, [s]);
  function run(c: Command) {
    const r = execute(s, c);
    set(r.state);
    setMessage(r.message);
    setFailed(!r.ok);
    if (
      [
        "present",
        "close",
        "logout",
        "switch",
        "revoke",
        "retryService",
      ].includes(c.type)
    ) {
      select(null);
      confirm(false);
      setRecipient("");
      setInspection(null);
    }
    if (c.type === "inspect" && r.ok)
      setInspection({ id: c.id, number: c.version });
    if (c.type === "document" && r.ok && r.version) {
      if (c.action === "read") select({ id: c.id, number: c.version });
      if (c.action === "export")
        download("eecard-facsimile-simulato.json", {
          synthetic: true,
          simulation: "Esportazione locale autorizzata",
          document: c.id,
          version: r.version,
        });
    }
  }
  function go(step: State["step"]) {
    set((v) => ({ ...v, step }));
    select(null);
    setTimeout(() => heading.current?.focus(), 0);
  }
  function reset(scenario: Scenario = s.scenario) {
    set(initialState(scenario));
    setInspection(null);
    select(null);
    confirm(false);
    setContext("");
    setRecipient("");
    setQuery({ title: "", type: "", from: "", to: "" });
    setMessage("Scenario ripristinato: note e avanzamento cancellati.");
    setFailed(false);
  }
  const step = stages.find((v) => v.id === s.step)!;
  const authorizedPractice = allowed(s, "prepare", {
    agency: "alfa",
    property: "casa-alfa",
    contract: "contratto-alfa",
  });
  const agencyArchive = search(s, {}, { purpose: "attivazione" }).filter(
    (d) => d.agency === s.agency,
  );
  const inspectedVersion = inspection
    ? readVersion(s, inspection.id, inspection.number, {
        purpose: "attivazione",
      })
    : null;
  const results = search(s, query, { desk: true });
  const selectedDoc = selection
    ? s.documents.find((d) => d.id === selection.id)
    : undefined;
  const selectedVersion = selection
    ? readVersion(s, selection.id, selection.number, { desk: true })
    : null;
  const shared = s.session?.shared;
  const sharedVersion =
    shared && s.session?.status === "open"
      ? readVersion(s, shared.document, shared.version, { desk: true })
      : null;
  const clientDocs = search(
    s,
    {},
    { actor: viewActor, purpose: "utenze", property: house },
  );
  const technical = search(
    s,
    {},
    {
      actor: viewActor,
      purpose: viewActor === "tech-alfa" ? "lavori" : "storico",
      property: "casa-alfa",
    },
  );
  const lastDraft = s.draft.at(-1);
  return (
    <div className="functional-demo">
      <header className="demo-hero">
        <span className="eyebrow">DEMO FUNZIONALE 0.4 · LOCALE</span>
        <h1>
          Una pratica. Un ritorno.
          <br />
          Una storia da ritrovare.
        </h1>
        <p>
          Prova il percorso completo con due agenzie sintetiche. Tutte le azioni
          restano in questo browser.
        </p>
        <div className="demo-identity">
          <ShieldCheck size={20} aria-hidden="true" />
          <span>
            {agencies.find((a) => a.id === s.agency)?.name} ·{" "}
            {actors.find((a) => a.id === s.actor)?.name}
            <br />
            <strong>
              {s.operatorAuthenticated
                ? "Sessione demo autenticata (simulazione)"
                : "Sessione demo chiusa"}
            </strong>
          </span>
        </div>
      </header>
      <section className="demo-controls" aria-label="Modalità prova">
        <label>
          Scenario deterministico
          <select
            value={s.scenario}
            onChange={(e) => reset(e.target.value as Scenario)}
          >
            {Object.entries(scenarios).map(([v, l]) => (
              <option value={v} key={v}>
                {l}
              </option>
            ))}
          </select>
        </label>
        <label>
          Attore e agenzia demo
          <select
            value={s.actor}
            onChange={(e) => {
              const a = actors.find((a) => a.id === e.target.value)!;
              run({ type: "switch", actor: a.id, agency: a.agency });
            }}
          >
            {actors.map((a) => (
              <option key={a.id} value={a.id}>
                {a.name} · {a.agency}
              </option>
            ))}
          </select>
        </label>
        <Button variant="secondary" onClick={() => reset()}>
          Ripristina scenario
        </Button>
        <Button
          variant="ghost"
          onClick={() =>
            run({ type: s.operatorAuthenticated ? "logout" : "login" })
          }
        >
          {s.operatorAuthenticated ? "Chiudi sessione demo" : "Accedi demo"}
        </Button>
      </section>
      <p className="demo-storage">{s.storageNotice}</p>
      {storageFailed && (
        <Notice error>
          Memoria locale indisponibile: la prova continua in memoria e non verrà
          conservata alla ricarica.
        </Notice>
      )}
      <nav className="demo-stages" aria-label="Avanzamento della prova">
        {stages.map((v) => (
          <button
            key={v.id}
            aria-current={s.step === v.id ? "step" : undefined}
            onClick={() => go(v.id)}
          >
            {v.label}
            {s.completed.includes(
              v.id === "practice" ? "PF01" : v.id === "desk" ? "PF02" : "PF05",
            ) &&
              v.id !== "extensions" && <Check size={16} aria-hidden="true" />}
          </button>
        ))}
      </nav>
      <div
        className={`demo-outcome ${failed ? "denied" : ""}`}
        role="status"
        aria-live="polite"
      >
        {message}
      </div>
      {!s.serviceAvailable && (
        <div className="demo-actions">
          <Notice error>
            Servizio indisponibile: nessuna consultazione privata. Il retry
            riapre una postazione vuota.
          </Notice>
          <Button onClick={() => run({ type: "retryService" })}>
            Riprova servizio demo
          </Button>
        </div>
      )}
      <section className="demo-phase" aria-labelledby="demo-phase-title">
        <div className="demo-phase-heading">
          <div>
            <span className="eyebrow">IL COMPITO</span>
            <h2 id="demo-phase-title" ref={heading} tabIndex={-1}>
              {step.label}
            </h2>
            <p>{step.task}</p>
          </div>
          <span className="demo-progress">
            {s.completed.filter((x) => x.startsWith("PF")).length}/3 momenti
            completati
          </span>
        </div>
        {s.step === "practice" && (
          <>
            {!authorizedPractice ? (
              <>
                <Notice error>
                  Pratica non disponibile nel contesto corrente. Il ruolo
                  globale non concede accesso.
                </Notice>
                <h3>Archivio del contesto corrente</h3>
                <p>
                  {agencyArchive.length} documenti autorizzati nel mandato
                  corrente.
                </p>
                {agencyArchive.map((d) => (
                  <div className="demo-data-row" key={d.id}>
                    <div>
                      <strong>{d.title}</strong>
                      <p>
                        {d.property} · fonte: {d.versions[0].source}
                      </p>
                    </div>
                    <Button
                      variant="secondary"
                      onClick={() =>
                        run({ type: "inspect", id: d.id, version: 1 })
                      }
                    >
                      Leggi facsimile del contesto
                    </Button>
                  </div>
                ))}
                {inspectedVersion && (
                  <article className="demo-document">
                    <VersionInfo version={inspectedVersion} />
                    <p>{inspectedVersion.text}</p>
                  </article>
                )}
              </>
            ) : (
              <>
                <div className="demo-facts">
                  <div>
                    <small>Agenzia / immobile</small>
                    <strong>Alfa · Casa Alfa 01</strong>
                    <span>Unità sintetica A01 · nessun indirizzo reale</span>
                  </div>
                  <div>
                    <small>Persone e relazioni temporali</small>
                    <strong>
                      Persona Alfa 01 · conduttore
                      <br />
                      Proprietario Alfa 02 · locatore
                    </strong>
                    <span>
                      Contratto Alfa · dal 01/10/2026 al 01/10/2027 (fine
                      esclusa)
                    </span>
                  </div>
                  <div>
                    <small>Contratto e importi sintetici</small>
                    <strong>Canone 900 € · deposito 1.800 €</strong>
                    <span>Quota EECard non definita, nessun pagamento.</span>
                  </div>
                </div>
                <h3>Fonti, conflitti e mancanti</h3>
                <div className="demo-data-row">
                  <div>
                    <strong>Data inizio del rapporto</strong>
                    <p>
                      Fonte A: facsimile contratto v1, 01/10/2026. Fonte B:
                      appunto sintetico, 02/10/2026. Le fonti restano entrambe
                      visibili.
                    </p>
                    {s.practice.corrected && (
                      <p className="demo-ok">
                        Correzione: 01/10/2026, fonte A ·{" "}
                        {actors.find((a) => a.id === s.actor)?.name} · evento
                        locale attribuito.
                      </p>
                    )}
                  </div>
                  <Button
                    variant="secondary"
                    onClick={() => run({ type: "correct", key: "data-inizio" })}
                  >
                    {s.practice.corrected
                      ? "Riprova correzione"
                      : "Conferma fonte A"}
                  </Button>
                </div>
                <div className="demo-data-row">
                  <div>
                    <strong>Allegato di verifica del rapporto</strong>
                    <p>
                      {s.practice.supplied
                        ? "Facsimile sintetico collegato · fonte: fixture locale, non un upload."
                        : "Mancante · nessun dato dedotto automaticamente."}
                    </p>
                  </div>
                  <Button
                    variant="secondary"
                    onClick={() => run({ type: "supply", key: "allegato" })}
                  >
                    Aggiungi facsimile locale
                  </Button>
                </div>
                <div className="demo-actions">
                  <Button
                    onClick={() => run({ type: "verify", key: "rapporto" })}
                  >
                    Verifica rapporto simulato
                  </Button>
                  <Button
                    variant="secondary"
                    onClick={() => run({ type: "invite", key: "inviti" })}
                  >
                    Prepara inviti simulati
                  </Button>
                  <Button
                    onClick={() =>
                      run({ type: "activate", key: "attivazione" })
                    }
                  >
                    Simula accettazione e attivazione
                  </Button>
                </div>
                <div className="demo-facts">
                  <div>
                    <small>Account</small>
                    <strong>
                      {s.practice.account
                        ? "Collegato (simulato)"
                        : "Non collegato"}
                    </strong>
                  </div>
                  <div>
                    <small>Adesione</small>
                    <strong>{s.practice.membership}</strong>
                    <span>Nessuna adesione commerciale reale</span>
                  </div>
                  <div>
                    <small>Credenziale card</small>
                    <strong>{s.practice.card}</strong>
                    <span>Supporto separato dai titoli di accesso</span>
                  </div>
                </div>
                <p>
                  Inviti individuali preparati: {s.practice.invitations.length}.{" "}
                  {s.practice.invitations
                    .map((x) => actors.find((a) => a.id === x)?.name)
                    .join(" · ")}{" "}
                  Nessun recapito o invio esterno.
                </p>
                <Button variant="secondary" onClick={() => go("desk")}>
                  Continua al banco <ArrowRight size={16} />
                </Button>
              </>
            )}
          </>
        )}
        {s.step === "desk" && (
          <>
            <Notice>
              Card, wallet e codice sono fixture locali: selezionano una
              persona, non concedono documenti e non autenticano il cliente.
            </Notice>
            <div className="demo-form">
              <label>
                Card / codice demo
                <input
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  autoComplete="off"
                />
              </label>
              <div className="demo-actions">
                <Button
                  onClick={() =>
                    run({ type: "present", channel: "card", code })
                  }
                >
                  Presenta card simulata
                </Button>
                <Button
                  variant="secondary"
                  onClick={() =>
                    run({ type: "present", channel: "code", code })
                  }
                >
                  Usa codice demo
                </Button>
                <Button
                  variant="secondary"
                  onClick={() =>
                    run({ type: "present", channel: "manual", code })
                  }
                >
                  Verifica assistita simulata
                </Button>
              </div>
            </div>
            {!s.readerAvailable && (
              <div className="demo-actions">
                <Notice error>
                  Lettore indisponibile; il servizio può restare disponibile.
                  Nessun dispositivo collegato.
                </Notice>
                <Button
                  variant="secondary"
                  onClick={() => run({ type: "retryReader" })}
                >
                  Riprova lettore demo
                </Button>
              </div>
            )}
            {s.session?.candidate && (
              <>
                <p>
                  <strong>Persona selezionata: Persona Alfa 01</strong> · codice
                  sintetico. Nessun documento prima della conferma.
                </p>
                <div className="demo-form">
                  <label className="demo-check">
                    <input
                      type="checkbox"
                      checked={confirmed}
                      onChange={(e) => confirm(e.target.checked)}
                    />
                    Confermo la corrispondenza della persona (simulazione)
                  </label>
                  <label>
                    Scopo della visita
                    <select
                      value={purpose}
                      onChange={(e) => setPurpose(e.target.value as Purpose)}
                    >
                      <option value="storico">Recupero storico</option>
                      <option value="attivazione">Attivazione</option>
                      <option value="lavori">Cronologia lavori</option>
                    </select>
                  </label>
                  <label>
                    Contesto immobile / contratto
                    <select
                      value={context}
                      onChange={(e) => setContext(e.target.value)}
                    >
                      <option value="">Seleziona il contesto</option>
                      <option value="alfa">
                        Casa Alfa 01 · Contratto Alfa
                      </option>
                    </select>
                  </label>
                </div>
                <div className="demo-actions">
                  <Button
                    onClick={() =>
                      run({
                        type: "open",
                        confirmed,
                        purpose,
                        property: context ? "casa-alfa" : "",
                        contract: context ? "contratto-alfa" : "",
                      })
                    }
                  >
                    Apri visita circoscritta
                  </Button>
                  {s.session.status === "open" && (
                    <Button variant="secondary" onClick={() => go("history")}>
                      Cerca nello storico <ArrowRight size={16} />
                    </Button>
                  )}
                </div>
              </>
            )}
            <Session s={s} />
            <div className="demo-actions">
              <Button
                variant="secondary"
                onClick={() => run({ type: "close" })}
              >
                Chiudi visita
              </Button>
              <Button
                variant="ghost"
                onClick={() => run({ type: "revoke", key: "card" })}
              >
                Revoca solo la card
              </Button>
            </div>
          </>
        )}
        {s.step === "history" && (
          <>
            <Session s={s} />
            {s.session?.status !== "open" ? (
              <Notice error>
                Visita chiusa o non confermata. Nessun risultato: torna al banco
                per aprire una nuova visita.
              </Notice>
            ) : (
              <>
                <div className="demo-form demo-search">
                  <label>
                    Titolo
                    <input
                      type="search"
                      value={query.title}
                      onChange={(e) =>
                        setQuery({ ...query, title: e.target.value })
                      }
                    />
                  </label>
                  <label>
                    Tipo
                    <select
                      value={query.type}
                      onChange={(e) =>
                        setQuery({ ...query, type: e.target.value })
                      }
                    >
                      <option value="">Tutti i tipi autorizzati</option>
                      <option value="tecnico">Tecnico</option>
                      <option value="contratto">Contratto</option>
                      <option value="bolletta">Bolletta</option>
                    </select>
                  </label>
                  <label>
                    Anno da
                    <input
                      inputMode="numeric"
                      value={query.from}
                      onChange={(e) =>
                        setQuery({ ...query, from: e.target.value })
                      }
                      placeholder="2018"
                    />
                  </label>
                  <label>
                    Anno a
                    <input
                      inputMode="numeric"
                      value={query.to}
                      onChange={(e) =>
                        setQuery({ ...query, to: e.target.value })
                      }
                      placeholder="2020"
                    />
                  </label>
                </div>
                <p>
                  Le date incerte sono incluse se gli intervalli si
                  sovrappongono. La data originale è distinta dall'acquisizione.
                </p>
                <p role="status">
                  {results.length} risultati autorizzati
                  {query.from &&
                  query.to &&
                  Number(query.from) > Number(query.to)
                    ? " · intervallo non valido"
                    : ""}
                </p>
                {results.map((d) => (
                  <div className="demo-data-row" key={d.id}>
                    <div>
                      <strong>{d.title}</strong>
                      <p>
                        {d.type} · {d.precision} · Casa Alfa 01 / Contratto Alfa
                      </p>
                      <span>Fonte: {d.versions.at(-1)?.source}</span>
                    </div>
                    <Button
                      variant="secondary"
                      onClick={() =>
                        run({
                          type: "document",
                          action: "read",
                          id: d.id,
                          version: d.versions.at(-1)!.number,
                        })
                      }
                    >
                      Leggi {d.type}
                    </Button>
                  </div>
                ))}
                {selectedDoc && selectedVersion && (
                  <article className="demo-document">
                    <div className="demo-phase-heading">
                      <h3>{selectedDoc.title}</h3>
                      <Badge>FACSIMILE · LETTURA SIMULATA</Badge>
                    </div>
                    <label>
                      Versione
                      <select
                        aria-label="Versione"
                        value={selectedVersion.number}
                        onChange={(e) =>
                          run({
                            type: "document",
                            action: "read",
                            id: selectedDoc.id,
                            version: Number(e.target.value),
                          })
                        }
                      >
                        {selectedDoc.versions.map((v) => (
                          <option key={v.number} value={v.number}>
                            v{v.number}
                            {v.number === selectedDoc.versions.at(-1)?.number
                              ? " · corrente"
                              : " · superata"}
                          </option>
                        ))}
                      </select>
                    </label>
                    <VersionInfo version={selectedVersion} />
                    <p className="demo-facsimile">{selectedVersion.text}</p>
                    <label>
                      Destinatario della condivisione
                      <select
                        value={recipient}
                        onChange={(e) => setRecipient(e.target.value)}
                      >
                        <option value="">Seleziona destinatario</option>
                        <option value="person-alfa">
                          Persona Alfa 01 · cliente confermato
                        </option>
                        <option value="owner-alfa">
                          Proprietario Alfa 02 · verifica richiesta
                        </option>
                      </select>
                    </label>
                    <div className="demo-actions">
                      <Button
                        variant="secondary"
                        onClick={() =>
                          run({
                            type: "document",
                            action: "share",
                            id: selectedDoc.id,
                            version: selectedVersion.number,
                            recipient,
                          })
                        }
                      >
                        Condividi sul riepilogo simulato
                      </Button>
                      <Button
                        variant="secondary"
                        onClick={() =>
                          run({
                            type: "document",
                            action: "export",
                            id: selectedDoc.id,
                            version: selectedVersion.number,
                          })
                        }
                      >
                        Esporta facsimile locale
                      </Button>
                    </div>
                    <p>
                      Lettura, condivisione ed esportazione sono azioni
                      distinte. La condivisione vale per questa visita e questa
                      versione.
                    </p>
                  </article>
                )}
                <h3>Cronologia lavori sintetica</h3>
                {results.some((d) => d.id === "tecnico-alfa") ? (
                  <ol className="demo-timeline">
                    <li>
                      2018–2020 · intervento impianto · documentato da relazione
                      facsimile v2 · esecutore Squadra Esempio. Data incerta
                      preservata.
                    </li>
                    <li>
                      2026 · verifica manutenzione · pianificata, non eseguita
                      né certificata.
                    </li>
                    <li>
                      2026 · segnalazione chiusa senza intervento · non equivale
                      a lavoro concluso.
                    </li>
                  </ol>
                ) : (
                  <p>Cronologia non disponibile per il titolo corrente.</p>
                )}
              </>
            )}
            <div className="demo-actions">
              <Button onClick={() => run({ type: "close" })}>
                Chiudi visita e riepilogo
              </Button>
              <Button variant="secondary" onClick={() => go("desk")}>
                Torna al banco
              </Button>
              <Button variant="secondary" onClick={() => go("extensions")}>
                Esplora PF03 / PF04 / PF06
              </Button>
            </div>
          </>
        )}
        {s.step === "extensions" && (
          <>
            <h3>PF03 · Casa propria e casa locata</h3>
            <p>
              Vista personale simulata: intestazione, delega, rapporto e
              incarico hanno ambiti diversi. Il selettore non conferisce titoli.
            </p>
            <div className="demo-form">
              <label>
                Destinatario da esplorare
                <select
                  value={viewActor}
                  onChange={(e) => setViewActor(e.target.value)}
                >
                  <option value="person-alfa">
                    Persona Alfa 01 · propria / locata
                  </option>
                  <option value="owner-alfa">Proprietario Alfa 02</option>
                  <option value="tech-alfa">Tecnico Alfa 03</option>
                </select>
              </label>
              <label>
                Casa
                <select
                  aria-label="Casa"
                  value={house}
                  onChange={(e) => setHouse(e.target.value)}
                >
                  <option value="casa-propria">Casa propria A02</option>
                  <option value="casa-alfa">Casa locata A01</option>
                </select>
              </label>
            </div>
            <p>
              Titoli efficaci per utenze:{" "}
              {s.grants
                .filter(
                  (g) =>
                    g.actor === viewActor &&
                    g.property === house &&
                    g.purposes.includes("utenze") &&
                    titleAllows(
                      s,
                      viewActor,
                      "read",
                      s.documents.find((d) => d.id === g.document)!,
                      "utenze",
                    ),
                )
                .map((g) => g.basis)
                .join(" · ") || "nessuno"}
              . Delega proprietario: scaduta il 01/10/2026.
            </p>
            <h3>PF04 · Bolletta senza pagamento</h3>
            {clientDocs.length ? (
              clientDocs.map((d) => (
                <article key={d.id} className="demo-bill">
                  <div>
                    <Badge>FACSIMILE · NESSUN PAGAMENTO</Badge>
                    <h4>{d.title}</h4>
                    <p>{d.versions[0].text}</p>
                    <p>
                      Fonte: fixture locale · intestatario Persona Alfa 01 ·
                      versione 1.
                    </p>
                    <code>CODICE FACSIMILE NON PAGABILE</code>
                  </div>
                  <svg
                    viewBox="0 0 100 100"
                    role="img"
                    aria-label="QR facsimile non scansionabile e non pagabile"
                  >
                    <rect width="100" height="100" fill="white" />
                    <path
                      d="M8 8h26v26H8zM66 8h26v26H66zM8 66h26v26H8zM48 42h12v12H48zM70 60h10v22H70z"
                      fill="#382a24"
                    />
                    <path d="M0 50h100" stroke="#a0442d" strokeWidth="10" />
                    <text
                      x="50"
                      y="54"
                      fontSize="9"
                      textAnchor="middle"
                      fill="white"
                    >
                      FACSIMILE
                    </text>
                  </svg>
                </article>
              ))
            ) : (
              <Notice>
                Accesso negato: nessuna bolletta disponibile per questo titolo,
                casa e periodo.
              </Notice>
            )}
            <p>
              Documento caricato ≠ pagamento dichiarato ≠ incasso verificato ≠
              quietanza. Esempio sintetico: dovuto 100 €, dichiarato 100 €,
              verificato 40 €, quietanzato 40 €, residuo 60 €. Nessun importo
              viene pagato.
            </p>
            <h3>Titoli autonomi e incarichi</h3>
            <p>
              Documenti leggibili da{" "}
              {actors.find((a) => a.id === viewActor)?.name}:{" "}
              {technical.map((d) => d.title).join(" · ") || "nessuno"}. Il
              tecnico ha solo l'allegato dell'incarico.
            </p>
            {authorizedPractice && (
              <>
                <div className="demo-actions">
                  <Button
                    variant="secondary"
                    onClick={() =>
                      run({ type: "endRelation", key: "fine-rapporto" })
                    }
                  >
                    Simula fine rapporto
                  </Button>
                  <Button
                    variant="secondary"
                    onClick={() =>
                      run({ type: "endMembership", key: "fine-adesione" })
                    }
                  >
                    Simula fine adesione
                  </Button>
                  <Button
                    variant="secondary"
                    onClick={() => run({ type: "revoke", key: "revoca" })}
                  >
                    Revoca solo la card
                  </Button>
                  <Button
                    variant="secondary"
                    onClick={() =>
                      run({ type: "revokeTitle", id: "storico-autonomo" })
                    }
                  >
                    Revoca titolo storico autonomo
                  </Button>
                </div>
                <p>
                  Rapporto: {s.relationEnded ? "concluso" : "attivo"} ·
                  adesione: {s.practice.membership} · card: {s.practice.card}.
                  Il titolo autonomo tecnico resta valido finché non revocato.
                </p>
                <h3>PF06 · Bozza deterministica</h3>
                <p>
                  Template T01 v1 · fonti sintetiche controllabili · nessun
                  modello AI. Revisione umana demo separata dalla firma.
                </p>
                <div className="demo-actions">
                  <Button
                    onClick={() =>
                      run({
                        type: "generate",
                        key: `bozza-${s.draft.length + 1}`,
                      })
                    }
                  >
                    Genera nuova versione da template
                  </Button>
                  <Button
                    variant="secondary"
                    onClick={() =>
                      run({
                        type: "review",
                        key: `revisione-${lastDraft?.version}`,
                      })
                    }
                  >
                    Registra revisione umana simulata
                  </Button>
                  <Button
                    variant="secondary"
                    onClick={() =>
                      run({
                        type: "newVersion",
                        key: `documento-${s.documents.find((d) => d.id === "tecnico-alfa")?.versions.length}`,
                      })
                    }
                  >
                    Aggiungi versione tecnica facsimile
                  </Button>
                </div>
                {lastDraft && (
                  <article className="demo-document">
                    <h4>
                      BOZZA v{lastDraft.version} · {lastDraft.template}
                    </h4>
                    <p>{lastDraft.text}</p>
                    <p>Fonti: {lastDraft.sources.join(" · ")}</p>
                    <p>
                      Mancanti: {lastDraft.missing.join(" · ") || "nessuno"} ·
                      conflitti: {lastDraft.conflicts.join(" · ") || "nessuno"}
                    </p>
                    <p>
                      Revisione:{" "}
                      {lastDraft.reviewed &&
                      lastDraft.sourceRevision === s.practice.revision
                        ? "revisionata da operatore demo, non firmata"
                        : "da revisionare"}{" "}
                      · versioni conservate: {s.draft.length}.
                    </p>
                  </article>
                )}
                <label className="demo-check">
                  <input
                    type="checkbox"
                    checked={suggestions}
                    onChange={(e) => setSuggestions(e.target.checked)}
                  />
                  Mostra suggerimenti assistiti (fixture locale)
                </label>
                {suggestions && (
                  <Notice>
                    Suggerimento statico T01: confrontare data inizio con fonte
                    A, controllare i campi mancanti. Non è un output AI.
                  </Notice>
                )}
                <p>
                  Firma: fixture «non firmata». Nessuna penna, procedura di
                  firma o registrazione attivata. Wallet: rappresentazione
                  locale della card, senza pass o NFC.
                </p>
              </>
            )}
          </>
        )}
      </section>
      <section className="demo-shared" aria-label="Secondo schermo simulato">
        <span className="eyebrow">
          RIEPILOGO CLIENTE · SECONDO SCHERMO LOCALE SIMULATO
        </span>
        {sharedVersion && shared ? (
          <>
            <h3>Persona Alfa 01 · recupero autorizzato</h3>
            <p>
              Versione {shared.version} · {sharedVersion.text}
            </p>
          </>
        ) : (
          <p>Schermo neutro. Nessun contenuto condiviso.</p>
        )}
      </section>
      <section className="demo-observations">
        <h2>La prova resta tua</h2>
        <p>
          Scrivi solo note anonime su compiti, blocchi, aiuti e informazioni
          mancanti. Nessuna telemetria, invio o misura automatica di tempi e
          costi. BF16 resta aperto.
        </p>
        <label>
          Note anonime della prova
          <textarea
            value={s.notes}
            onChange={(e) => set((v) => ({ ...v, notes: e.target.value }))}
            rows={4}
            placeholder="Non inserire nomi, recapiti o dati reali."
          />
        </label>
        <div className="demo-actions">
          <Button
            variant="secondary"
            onClick={() =>
              download("eecard-prova-locale.json", {
                demo: "0.4",
                scenario: s.scenario,
                completed: s.completed,
                notes: s.notes,
                observations: "note locali, non validate",
                synthetic: true,
              })
            }
          >
            Esporta note solo in locale
          </Button>
          <Button
            variant="ghost"
            onClick={() => set((v) => ({ ...v, notes: "" }))}
          >
            Cancella note
          </Button>
        </div>
        <details>
          <summary>
            Registro locale di azioni ed esiti (
            {s.events.filter((e) => e.agency === s.agency).length})
          </summary>
          <ol className="demo-timeline">
            {s.events
              .filter((e) => e.agency === s.agency)
              .map((e) => (
                <li key={e.sequence}>
                  {e.sequence} · {e.actor} · {e.action} · {e.object} ·{" "}
                  {e.outcome} · efficacia {e.effective} / registrazione{" "}
                  {e.registered}
                </li>
              ))}
          </ol>
        </details>
      </section>
    </div>
  );
}
function Session({ s }: { s: State }) {
  return (
    <div className="demo-session">
      <strong>
        Visita:{" "}
        {s.session?.status === "open"
          ? "aperta"
          : s.session?.status === "selected"
            ? "persona da confermare"
            : "postazione neutra / visita chiusa"}
      </strong>
      {s.session?.status === "open" && (
        <p>
          Persona Alfa 01 · {s.session.purpose} · Casa Alfa 01 / Contratto Alfa
          · {s.session.id}. Operatore {s.actor}. Nessun recapito o documento
          privato nel riepilogo.
        </p>
      )}
    </div>
  );
}
function VersionInfo({ version: v }: { version: Version }) {
  return (
    <dl className="demo-version">
      <dt>Fonte e acquisizione</dt>
      <dd>
        {v.source} · {v.acquired}
      </dd>
      <dt>Correzione e autore</dt>
      <dd>
        {v.correction} · {v.author}
      </dd>
      <dt>Controllo formale</dt>
      <dd>{v.formal}</dd>
      <dt>Controllo specialistico</dt>
      <dd>{v.specialist}</dd>
    </dl>
  );
}
