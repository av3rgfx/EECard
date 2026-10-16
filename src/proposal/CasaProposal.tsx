import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  ArrowLeft,
  Home,
  Wallet,
  Wrench,
  UserRound,
  FileText,
  Plus,
  Check,
  Link2,
} from "lucide-react";
import { BrandSymbol } from "../components/brand";
import { Modal } from "../components/ui";
import { asset } from "../assets";
import { initialState, execute, search, readVersion, DAY } from "../demo/model";
import {
  emptyWorkspace,
  work,
  readSubscription,
  visibleRequests,
  canOperate,
} from "../workspace/service";
import { BillsPanel } from "../workspace/BillsPanel";
import { BillNotice } from "../workspace/BillNotice";
import {
  beginBillImport,
  importBill,
  readBillNotice,
  readBillSource,
  visibleBills,
} from "../workspace/bills";
import { paymentGate, simulatePayment, type PaymentAttempt } from "./payment";
import "../workspace/workspace.css";
import "./proposal.css";

type View =
  | "home"
  | "payments"
  | "assistance"
  | "profile"
  | "documents"
  | "houses"
  | "archive"
  | "bill";
const titles: Record<View, string> = {
  home: "La casa, con te.",
  payments: "Pagamenti, con chiarezza.",
  assistance: "Una mano, quando serve.",
  profile: "Il tuo accesso, il tuo servizio.",
  documents: "I documenti di casa.",
  houses: "Le tue case.",
  archive: "Bollette e originali.",
  bill: "La tua bolletta.",
};
const properties = [
  {
    id: "casa-alfa",
    name: "Casa Luce",
    image: "casa-luminosa.jpg",
    caption: "Unità A01 · In locazione",
  },
  {
    id: "casa-propria",
    name: "Casa Atelier",
    image: "casa-studio.jpg",
    caption: "Unità A02 · Casa propria",
  },
];
const nav = [
  { id: "home", label: "Casa", icon: Home },
  { id: "payments", label: "Pagamenti", icon: Wallet },
  { id: "assistance", label: "Assistenza", icon: Wrench },
  { id: "profile", label: "Profilo", icon: UserRound },
] as const;
function currentView(): View {
  const v = location.hash.split("/")[2] || "home";
  return v in titles ? (v as View) : "home";
}
function client() {
  const s = initialState("reader");
  s.actor = "person-alfa";
  return s;
}
const eur = (c: number) =>
  new Intl.NumberFormat("it-IT", { style: "currency", currency: "EUR" }).format(
    c / 100,
  );
const date = (d: string) =>
  new Date(`${d}T12:00:00`).toLocaleDateString("it-IT", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
function Button({
  children,
  onClick,
  secondary = false,
  disabled = false,
  type = "button",
}: {
  children: ReactNode;
  onClick?: () => void;
  secondary?: boolean;
  disabled?: boolean;
  type?: "button" | "submit";
}) {
  return (
    <button
      type={type}
      className={`ws-btn ${secondary ? "ws-secondary" : "ws-primary"}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export function CasaProposal() {
  // Isolated rehearsal, intentionally in memory. Never overwrites the operational demo.
  const [s, setS] = useState(client),
    [u, setU] = useState(emptyWorkspace);
  const [view, setView] = useState<View>(currentView),
    [filter, setFilter] = useState("casa-alfa");
  const [scenario, setScenario] = useState("one"),
    [tools, setTools] = useState(false);
  const [bill, setBill] = useState({
    property: "casa-alfa",
    id: "bolletta-alfa",
    number: 1,
  });
  const [phase, setPhase] = useState<"review" | "confirm" | "result">("review");
  const [checked, setChecked] = useState(false),
    [outcome, setOutcome] = useState<PaymentAttempt["outcome"]>("accepted");
  const [selectedAttempt, setSelectedAttempt] = useState<PaymentAttempt | null>(
    null,
  );
  const [attempts, setAttempts] = useState<PaymentAttempt[]>([]),
    [error, setError] = useState("");
  const [notice, setNotice] = useState<{ id: string; number: number } | null>(
    null,
  );
  const [modal, setModal] = useState<"renewal" | "card" | "map" | null>(null);
  const [confirmRenewal, setConfirmRenewal] = useState(false);
  const [requestStep, setRequestStep] = useState<
    "list" | "write" | "review" | "done"
  >("list");
  const [category, setCategory] = useState("Tecnico"),
    [detail, setDetail] = useState("");
  const [requestContext, setRequestContext] = useState("");
  const [doc, setDoc] = useState<string | null>(null);
  const heading = useRef<HTMLHeadingElement>(null);
  const available = properties.filter(
    (h) =>
      search(
        s,
        {},
        {
          purpose: h.id === "casa-propria" ? "utenze" : "storico",
          property: h.id,
        },
      ).length > 0,
  );
  const activeHouses = available.filter(
    (h) => filter === "all" || filter === h.id,
  );
  const currentHouse = properties.find((h) => h.id === filter) || properties[0];
  const bills = activeHouses.flatMap((h) => visibleBills(s, u.bills, h.id));
  const requests = visibleRequests(s, u);
  const subscription = readSubscription(s, u);
  const n =
    view === "bill"
      ? readBillNotice(s, u.bills, bill.property, bill.id, bill.number)
      : null;
  const gate = paymentGate(
    s,
    u.bills,
    bill.property,
    bill.id,
    bill.number,
    attempts,
  );
  const attempt =
    selectedAttempt ||
    attempts
      .filter(
        (a) =>
          a.bill === bill.id &&
          a.property === bill.property &&
          a.actor === s.actor &&
          a.agency === s.agency,
      )
      .at(-1);
  const readDoc = doc
    ? readVersion(
        s,
        doc,
        s.documents.find((d) => d.id === doc)?.versions.at(-1)?.number || 1,
        { purpose: "storico" },
      )
    : null;
  useEffect(() => {
    const listener = () => {
      setView(currentView());
      setNotice(null);
      setModal(null);
      setDoc(null);
      setError("");
      window.scrollTo(0, 0);
    };
    addEventListener("hashchange", listener);
    return () => removeEventListener("hashchange", listener);
  }, []);
  useEffect(() => {
    document.title = `${titles[view]} · Proposta EECard`;
    heading.current?.focus();
  }, [view, phase, requestStep]);
  function go(v: View) {
    if (v === view) {
      heading.current?.focus();
      window.scrollTo(0, 0);
    } else location.hash = `/casa/${v}`;
  }
  function openBill(id: string, property: string) {
    const r = readBillNotice(s, u.bills, property, id);
    if (!r) return;
    setFilter(property);
    setSelectedAttempt(null);
    setBill({ id, property, number: r.currentNumber });
    setPhase("review");
    setChecked(false);
    setError("");
    go("bill");
  }
  function help(context = "") {
    setRequestContext(context);
    setCategory(context ? "Bolletta" : "Tecnico");
    setDetail("");
    setRequestStep("write");
    go("assistance");
  }
  function reset(name: string) {
    const next = client(),
      workspace = emptyWorkspace();
    if (name === "denied") next.actor = "owner-alfa";
    if (name === "debit" || name === "paid" || name === "revised") {
      const sourceId =
        name === "debit"
          ? "atelier-nov"
          : name === "paid"
            ? "luce-set"
            : "luce-ott-rettifica";
      const property = name === "debit" ? "casa-propria" : "casa-alfa";
      const draft = beginBillImport(next, workspace.bills, property, sourceId)!;
      draft.data = readBillSource(next, property, sourceId)!.original;
      workspace.bills = importBill(
        next,
        workspace.bills,
        property,
        draft,
        true,
        "Scenario di confronto sintetico",
      ).bills;
    }
    if (name === "calm")
      workspace.requests = [
        {
          id: "richiesta-1",
          agency: "alfa",
          property: "casa-alfa",
          author: "person-alfa",
          subject: "Tecnico · controllo rubinetto",
          detail:
            "Esempio: foto già esaminata. In attesa di una proposta di appuntamento.",
          status: "In lavorazione",
        },
      ];
    setS(next);
    setU(workspace);
    setAttempts([]);
    setSelectedAttempt(null);
    setScenario(name);
    setFilter(
      name === "many" ? "all" : name === "debit" ? "casa-propria" : "casa-alfa",
    );
    setRequestStep("list");
    setDoc(null);
    setNotice(null);
    setModal(null);
    setPhase("review");
    setChecked(false);
    setError("");
    go("home");
  }
  function card() {
    return (
      <div>
        <div className="cp-card-label">
          <span>LA TUA TESSERA SERVIZI</span>
          <span>
            {(
              s.actor === "owner-alfa"
                ? u.ownerCardBlocked
                : s.practice.card === "revocata"
            )
              ? "Bloccata"
              : "Attiva · demo"}
          </span>
        </div>
        <div className="ws-card">
          <div className="ws-card-top">
            <span>IL TUO SPAZIO CASA</span>
            <BrandSymbol />
          </div>
          <BrandSymbol className="ws-card-watermark" />
          <div className="ws-card-bottom">
            <span>
              <small>ACCESSO PERSONALE</small>
              <strong>
                {s.actor === "owner-alfa" ? "Proprietario 02" : "Cliente 01"}
              </strong>
            </span>
            <span className="ws-card-id">
              {s.actor === "owner-alfa" ? "•• 0012" : "•• 0021"}
            </span>
          </div>
          <div className="ws-card-caption">
            <span>Tessera di accesso ai servizi</span>
            <Link2 size={17} />
          </div>
        </div>
        <button className="cp-text-link" onClick={() => setModal("card")}>
          Gestisci tessera <ArrowUpRight size={16} />
        </button>
      </div>
    );
  }
  const billStatus = (b: (typeof bills)[number]) => {
    const r = readBillNotice(s, u.bills, b.property, b.id);
    return !r
      ? "Non disponibile"
      : attempts.some((a) => a.bill === b.id && a.outcome !== "failed")
        ? "Tentativo da verificare"
        : r.source.payment !== "ignoto"
          ? "Pagamento indicato · non verificato"
          : r.source.debit !== "ignota"
            ? "Domiciliazione indicata"
            : "Stato da verificare";
  };
  function billRow(b: (typeof bills)[number], priority = false) {
    const v = b.versions.at(-1)!;
    return (
      <div className={`cp-row ${priority ? "cp-priority" : ""}`} key={b.id}>
        <span className="cp-row-icon">
          <Wallet size={22} />
        </span>
        <div className="cp-row-copy">
          <small>
            {properties.find((h) => h.id === b.property)?.name} ·{" "}
            {v.data.period}
          </small>
          <h3>
            {priority ? "Controlla la bolletta della luce" : v.data.creditor}
          </h3>
          <p>
            {billStatus(b)} · Scadenza {date(v.data.due)}
          </p>
        </div>
        <strong className="cp-amount">{eur(v.amountCents)}</strong>
        <Button onClick={() => openBill(b.id, b.property)}>
          Verifica e paga <ArrowRight size={16} />
        </Button>
      </div>
    );
  }
  function houses(expanded = false) {
    return (
      <div
        className={`cp-houses ${!expanded && activeHouses.length > 1 ? "compact" : "expanded"}`}
      >
        {activeHouses.map((h) => (
          <article key={h.id}>
            <img
              src={asset(`images/${h.image}`)}
              alt={`Interno illustrativo di ${h.name}`}
            />
            <div>
              <small>{h.caption}</small>
              <h3>{h.name}</h3>
              <p>
                {h.id === "casa-alfa"
                  ? "Documenti, richieste e utenze della tua casa."
                  : "Utenze intestate a te. Altri servizi da definire."}
              </p>
              <button
                className="cp-text-link"
                onClick={() => {
                  setFilter(h.id);
                  go("documents");
                }}
              >
                Esplora la casa <ArrowUpRight size={16} />
              </button>
            </div>
          </article>
        ))}
      </div>
    );
  }
  return (
    <div className="workspace-app casa-proposal">
      <a
        className="ws-skip"
        href="#proposal-main"
        onClick={(e) => {
          e.preventDefault();
          heading.current?.focus();
        }}
      >
        Salta al contenuto
      </a>
      <aside className="cp-sidebar">
        <a className="cp-brand" href="#/casa/home" aria-label="Casa · proposta">
          <BrandSymbol />
          <span>
            Il tuo
            <br />
            <strong>spazio casa</strong>
          </span>
        </a>
        <nav aria-label="Navigazione personale">
          {nav.map(({ id, label, icon: Icon }) => (
            <a
              key={id}
              href={`#/casa/${id}`}
              aria-current={
                view === id ||
                (id === "payments" && ["bill", "archive"].includes(view)) ||
                (id === "home" && ["documents", "houses"].includes(view))
                  ? "page"
                  : undefined
              }
            >
              <Icon size={21} />
              <span>{label}</span>
            </a>
          ))}
        </nav>
        <div className="cp-sidebar-foot">
          <span>PROPOSTA DA VALUTARE</span>
          <button onClick={() => setModal("map")}>
            Mappa dell’esperienza <ArrowUpRight size={15} />
          </button>
          <a href="#/spazio/overview">
            Apri spazio attuale / agenzia <ArrowUpRight size={15} />
          </a>
          <small>EECard · nome provvisorio</small>
        </div>
      </aside>
      <div className="cp-body">
        <header className="cp-top">
          <a href="#/casa/home" className="cp-mobile-brand" aria-label="Casa">
            <BrandSymbol />
          </a>
          <span>
            Spazio personale{" "}
            <span className="cp-top-muted">
              / {nav.find((i) => i.id === view)?.label || "La tua casa"}
            </span>
          </span>
          <button onClick={() => setTools(!tools)} aria-expanded={tools}>
            Proposta · simulazione
          </button>
        </header>
        {tools && (
          <section className="cp-tools">
            <strong>Esplora la proposta</strong>
            <p>
              Dati sintetici, nessun servizio reale. Le modifiche restano in
              questa visita e si azzerano ricaricando. Lo spazio attuale
              conserva i suoi dati.
            </p>
            <label>
              Scenario di confronto
              <select value={scenario} onChange={(e) => reset(e.target.value)}>
                <option value="one">Una casa · una priorità</option>
                <option value="many">Più case</option>
                <option value="calm">
                  Nessuna urgenza · assistenza in corso
                </option>
                <option value="debit">Domiciliazione indicata</option>
                <option value="paid">Pagamento indicato</option>
                <option value="revised">Bolletta rettificata</option>
                <option value="denied">
                  Proprietario senza delega bollette
                </option>
              </select>
            </label>
            <button className="cp-text-link" onClick={() => setModal("map")}>
              Leggi la mappa candidata
            </button>
            <a href="#/spazio/overview">
              Apri lo spazio attuale e la vista agenzia
            </a>
          </section>
        )}
        <main id="proposal-main" className="cp-main">
          <div className="cp-context">
            <span>CLIENTE DI ESEMPIO · {date(DAY)}</span>
            {available.length > 1 && scenario === "many" ? (
              <label className="cp-house-select">
                Casa
                <select
                  value={filter}
                  onChange={(e) => {
                    setFilter(e.target.value);
                    setNotice(null);
                    setDoc(null);
                    setPhase("review");
                    setChecked(false);
                    setError("");
                    if (["bill", "archive", "assistance"].includes(view)) {
                      setRequestStep("list");
                      go("home");
                    }
                  }}
                >
                  <option value="all">Tutte le case</option>
                  {available.map((h) => (
                    <option key={h.id} value={h.id}>
                      {h.name}
                    </option>
                  ))}
                </select>
              </label>
            ) : (
              <span>{currentHouse.name}</span>
            )}
          </div>
          {view !== "home" && (
            <button
              className="cp-back"
              onClick={() => {
                setError("");
                go(view === "bill" || view === "archive" ? "payments" : "home");
              }}
            >
              <ArrowLeft size={16} />{" "}
              {view === "bill" || view === "archive"
                ? "Torna ai pagamenti"
                : "Torna a casa"}
            </button>
          )}
          {view === "home" ? (
            <>
              <section className="cp-hero">
                {card()}
                <div className="cp-welcome">
                  <span className="ws-eyebrow">MENO PENSIERI, PIÙ CASA</span>
                  <h1 ref={heading} tabIndex={-1}>
                    La casa, <br />
                    con te.
                  </h1>
                  <p>
                    Quello che serve sapere. <br />E una mano per fare il
                    prossimo passo.
                  </p>
                  <div className="cp-actions">
                    <Button onClick={() => go("payments")}>
                      Paga una bolletta <ArrowRight size={17} />
                    </Button>
                    <button className="cp-text-link" onClick={() => help()}>
                      Chiedi assistenza <ArrowUpRight size={16} />
                    </button>
                  </div>
                </div>
              </section>
              <section className="cp-section">
                <div className="cp-section-title">
                  <h2>Da guardare adesso</h2>
                  <span>
                    {scenario === "calm"
                      ? "Nessuna urgenza segnalata"
                      : "Il prossimo passo"}
                  </span>
                </div>
                {scenario === "calm" ? (
                  <div className="cp-calm">
                    <Check size={24} />
                    <div>
                      <h3>Oggi non ci sono azioni urgenti.</h3>
                      <p>
                        La richiesta per il rubinetto è in lavorazione. Le
                        bollette restano consultabili: il loro pagamento non è
                        verificato.
                      </p>
                      <button
                        className="cp-text-link"
                        onClick={() => go("assistance")}
                      >
                        Segui la richiesta <ArrowRight size={16} />
                      </button>
                    </div>
                  </div>
                ) : bills.length ? (
                  billRow(bills[0], true)
                ) : (
                  <p>
                    Nessuna bolletta accessibile nel contesto corrente. Le
                    bollette personali di altri restano riservate.
                  </p>
                )}
              </section>
              <section className="cp-section">
                <div className="cp-section-title">
                  <h2>
                    {activeHouses.length > 1 ? "Le tue case" : "La tua casa"}
                  </h2>
                  <button className="cp-text-link" onClick={() => go("houses")}>
                    Vedi immobili <ArrowUpRight size={16} />
                  </button>
                </div>
                {houses()}
              </section>
              <section className="cp-section cp-control">
                <div>
                  <span className="ws-eyebrow">TUTTO AL SUO POSTO</span>
                  <h2>La casa sotto controllo.</h2>
                  <p>
                    Documenti, bisogni e servizi, con il loro prossimo passo.
                  </p>
                </div>
                <div className="cp-link-list">
                  <button onClick={() => go("documents")}>
                    <FileText size={22} />
                    <span>
                      <strong>Trova un documento</strong>
                      <small>Contratto e documenti disponibili</small>
                    </span>
                    <ArrowUpRight size={18} />
                  </button>
                  <button onClick={() => go("assistance")}>
                    <Wrench size={22} />
                    <span>
                      <strong>Segui le richieste</strong>
                      <small>
                        {requests.length
                          ? `${requests.length} richiesta · ${requests.at(-1)!.status}`
                          : "Nessuna richiesta aperta"}
                      </small>
                    </span>
                    <ArrowUpRight size={18} />
                  </button>
                  <button
                    onClick={() => {
                      setCategory("Abbonamento domestico");
                      setRequestContext("");
                      setDetail("");
                      setRequestStep("write");
                      go("assistance");
                    }}
                  >
                    <Link2 size={22} />
                    <span>
                      <strong>Servizi e abbonamenti di casa</strong>
                      <small>
                        Chiedi aiuto per una fornitura · catalogo da definire
                      </small>
                    </span>
                    <ArrowUpRight size={18} />
                  </button>
                </div>
              </section>
              <section className="cp-section">
                <h2>Attività recenti</h2>
                {attempts.length ? (
                  <p>
                    Hai esplorato {attempts.length} tentativo di pagamento
                    simulato.{" "}
                    <button
                      className="cp-text-link"
                      onClick={() => go("payments")}
                    >
                      Rivedi i riscontri
                    </button>
                  </p>
                ) : (
                  <p>
                    Nessun nuovo riscontro in questa visita. Documenti e
                    originali sono disponibili nei rispettivi archivi.
                  </p>
                )}
              </section>
            </>
          ) : (
            <header className="cp-heading">
              <span className="ws-eyebrow">IL TUO SPAZIO CASA</span>
              <h1 ref={heading} tabIndex={-1}>
                {titles[view]}
              </h1>
            </header>
          )}
          {error && (
            <p className="bill-error" role="alert">
              {error}
            </p>
          )}
          {view === "payments" && (
            <>
              <p className="cp-lead">
                Controlla lo stato, scegli come procedere, ritrova l’esito. Qui
                ogni pagamento è una simulazione.
              </p>
              <div className="cp-section-title">
                <h2>Bollette da consultare</h2>
                <button
                  className="cp-text-link"
                  onClick={() => {
                    if (filter === "all") setFilter("casa-alfa");
                    go("archive");
                  }}
                >
                  <Plus size={18} /> Aggiungi / apri bollette
                </button>
              </div>
              {bills.length ? (
                bills.map((b) => billRow(b))
              ) : (
                <p>
                  Nessuna bolletta accessibile. Serve un’intestazione o una
                  delega valida.
                </p>
              )}
              <section className="cp-section">
                <h2>Riscontri di questa visita</h2>
                {attempts.filter(
                  (a) =>
                    a.actor === s.actor &&
                    readBillNotice(s, u.bills, a.property, a.bill, a.version),
                ).length ? (
                  attempts
                    .filter(
                      (a) =>
                        a.actor === s.actor &&
                        readBillNotice(
                          s,
                          u.bills,
                          a.property,
                          a.bill,
                          a.version,
                        ),
                    )
                    .map((a, i) => (
                      <button
                        className="cp-history"
                        key={i}
                        onClick={() => {
                          setSelectedAttempt(a);
                          setFilter(a.property);
                          setBill({
                            property: a.property,
                            id: a.bill,
                            number: a.version,
                          });
                          setPhase("result");
                          go("bill");
                        }}
                      >
                        <span>
                          SIM-{i + 1} ·{" "}
                          {properties.find((h) => h.id === a.property)?.name} ·
                          v{a.version}
                          <strong>
                            {a.outcome === "accepted"
                              ? "Esito positivo simulato · da verificare"
                              : a.outcome === "unknown"
                                ? "Esito ignoto · non ripetere"
                                : "Tentativo non riuscito"}
                          </strong>
                        </span>
                        <ArrowUpRight size={18} />
                      </button>
                    ))
                ) : (
                  <p>
                    Non hai ancora simulato un pagamento. Nessuna ricevuta o
                    quietanza disponibile.
                  </p>
                )}
              </section>
            </>
          )}
          {view === "archive" && (
            <BillsPanel
              key={`${s.actor}:${filter}:${s.serviceAvailable}`}
              state={s}
              bills={u.bills}
              property={filter === "all" ? "casa-alfa" : filter}
              save={(draft, reason) => {
                const result = importBill(
                  s,
                  u.bills,
                  filter === "all" ? "casa-alfa" : filter,
                  draft,
                  true,
                  reason,
                );
                if (result.ok && result.changed)
                  setU({ ...u, bills: result.bills });
                return result;
              }}
            />
          )}
          {view === "bill" &&
            (!n ? (
              <div className="cp-section">
                <h2>Bolletta non disponibile</h2>
                <p>Il titolo o la versione non permettono la lettura.</p>
                <Button onClick={() => go("payments")}>
                  Torna ai pagamenti
                </Button>
              </div>
            ) : (
              <>
                <ol className="cp-steps" aria-label="Percorso bolletta">
                  {["Controlla", "Conferma", "Esito"].map((text, i) => (
                    <li
                      key={text}
                      aria-current={
                        (phase === "review"
                          ? 0
                          : phase === "confirm"
                            ? 1
                            : 2) === i
                          ? "step"
                          : undefined
                      }
                    >
                      <span>{i + 1}</span>
                      {text}
                    </li>
                  ))}
                </ol>
                <section className="cp-bill-summary">
                  <div>
                    <span className="ws-eyebrow">
                      {properties.find((h) => h.id === bill.property)?.name} ·
                      VERSIONE {n.version.number}
                      {n.superseded ? " SUPERATA" : " CORRENTE"}
                    </span>
                    <h2>{n.version.data.creditor}</h2>
                    <p>
                      {n.version.data.period} · {n.version.data.supply}
                    </p>
                    <button
                      className="cp-text-link"
                      onClick={() =>
                        setNotice({ id: bill.id, number: bill.number })
                      }
                    >
                      Mostra avviso e originale <ArrowUpRight size={16} />
                    </button>
                  </div>
                  <div>
                    <strong>{eur(n.version.amountCents)}</strong>
                    <p>Scadenza {date(n.version.data.due)}</p>
                  </div>
                </section>
                {phase === "review" && (
                  <section className="cp-flow">
                    <h2>Prima, controlliamo lo stato.</h2>
                    <p className="cp-explanation">
                      {n.source.payment !== "ignoto"
                        ? "Pagamento indicato nell’originale, non verificato."
                        : n.source.debit !== "ignota"
                          ? "Domiciliazione indicata nell’originale."
                          : "Non sappiamo se questa bolletta sia ancora da pagare."}{" "}
                      Aprire l’avviso non conferma l’incasso.
                    </p>
                    {gate ? (
                      <div className="cp-notice">
                        <strong>{gate}</strong>
                        {n.superseded && (
                          <button
                            className="cp-text-link"
                            onClick={() => openBill(bill.id, bill.property)}
                          >
                            Apri la versione corrente
                          </button>
                        )}
                        <Button
                          secondary
                          onClick={() =>
                            help(
                              `${n.version.data.creditor} · ${n.version.data.period} · v${bill.number} · ${properties.find((h) => h.id === bill.property)?.name}`,
                            )
                          }
                        >
                          Chiedi una verifica
                        </Button>
                        {attempt && (
                          <button
                            className="cp-text-link"
                            onClick={() => setPhase("result")}
                          >
                            Rivedi il riscontro simulato
                          </button>
                        )}
                      </div>
                    ) : (
                      <>
                        <label className="cp-check">
                          <input
                            type="checkbox"
                            checked={checked}
                            onChange={(e) => setChecked(e.target.checked)}
                          />
                          <span>
                            Nel caso di prova, ho controllato: nessun pagamento
                            o addebito già disposto.
                            <small>
                              È una dichiarazione per la simulazione, non una
                              verifica dell’incasso.
                            </small>
                          </span>
                        </label>
                        <div className="cp-actions">
                          <Button
                            disabled={!checked}
                            onClick={() => {
                              const denied = paymentGate(
                                s,
                                u.bills,
                                bill.property,
                                bill.id,
                                bill.number,
                                attempts,
                              );
                              if (denied) setError(denied);
                              else setPhase("confirm");
                            }}
                          >
                            Continua al pagamento simulato{" "}
                            <ArrowRight size={16} />
                          </Button>
                          <Button
                            secondary
                            onClick={() =>
                              help(
                                `${n.version.data.creditor} · ${n.version.data.period} · v${bill.number} · ${properties.find((h) => h.id === bill.property)?.name}`,
                              )
                            }
                          >
                            Non sono sicuro, chiedi aiuto
                          </Button>
                        </div>
                      </>
                    )}
                  </section>
                )}
                {phase === "confirm" && (
                  <section className="cp-flow">
                    <h2>Rivedi, poi conferma.</h2>
                    <dl className="cp-facts">
                      <div>
                        <dt>Canale della proposta</dt>
                        <dd>Simulatore locale · nessun partner collegato</dd>
                      </div>
                      <div>
                        <dt>Metodo di prova</dt>
                        <dd>
                          Metodo dimostrativo · nessun dato bancario richiesto
                        </dd>
                      </div>
                      <div>
                        <dt>Importo bolletta</dt>
                        <dd>{eur(n.version.amountCents)}</dd>
                      </div>
                      <div>
                        <dt>Commissioni reali</dt>
                        <dd>Da definire, non incluse in questa prova</dd>
                      </div>
                      <div>
                        <dt>Addebito reale</dt>
                        <dd>Nessuno</dd>
                      </div>
                    </dl>
                    <p>
                      Nel prodotto operativo qui serviranno canali disponibili,
                      costo totale e condizioni prima della conferma. Nessun
                      metodo è già approvato.
                    </p>
                    <details className="cp-outcome">
                      <summary>Esplora un esito della simulazione</summary>
                      <label>
                        Esito da mostrare
                        <select
                          value={outcome}
                          onChange={(e) =>
                            setOutcome(
                              e.target.value as PaymentAttempt["outcome"],
                            )
                          }
                        >
                          <option value="accepted">
                            Positivo, in attesa di verifica
                          </option>
                          <option value="unknown">
                            Esito ignoto / interruzione
                          </option>
                          <option value="failed">
                            Errore senza disposizione
                          </option>
                        </select>
                      </label>
                    </details>
                    <div className="cp-actions">
                      <Button
                        onClick={() => {
                          const result = simulatePayment(
                            s,
                            u.bills,
                            bill.property,
                            bill.id,
                            bill.number,
                            attempts,
                            checked,
                            outcome,
                          );
                          if (result.error) setError(result.error);
                          else {
                            setAttempts(result.attempts);
                            setSelectedAttempt(result.attempts.at(-1)!);
                            setPhase("result");
                          }
                        }}
                      >
                        Conferma simulazione · {eur(n.version.amountCents)}
                      </Button>
                      <Button
                        secondary
                        onClick={() => {
                          setPhase("review");
                          setChecked(false);
                        }}
                      >
                        Annulla
                      </Button>
                    </div>
                  </section>
                )}
                {phase === "result" && (
                  <section className="cp-flow" role="status">
                    <span className="ws-eyebrow">
                      RISCONTRO DIMOSTRATIVO · NESSUN ADDEBITO
                    </span>
                    <h2>
                      {attempt?.outcome === "accepted"
                        ? "Passaggio completato. Verifica in attesa."
                        : attempt?.outcome === "unknown"
                          ? "L’esito non è ancora noto."
                          : "Il tentativo non è riuscito."}
                    </h2>
                    <p>
                      {attempt?.outcome === "accepted"
                        ? "Il simulatore ha restituito un esito positivo. Non è un incasso verificato e non è una quietanza."
                        : attempt?.outcome === "unknown"
                          ? "Un’interruzione può lasciare l’esito incerto. Non ripetere il pagamento: chiedi prima una verifica."
                          : "In questo scenario non è stata disposta alcuna operazione. Puoi ricontrollare e riprovare."}
                    </p>
                    <dl className="cp-facts">
                      <div>
                        <dt>Dichiarazione</dt>
                        <dd>
                          Controllo preliminare indicato dall’utente nella prova
                        </dd>
                      </div>
                      <div>
                        <dt>Evidenza</dt>
                        <dd>
                          Solo riscontro del simulatore, nessuna prova reale
                        </dd>
                      </div>
                      <div>
                        <dt>Incasso verificato</dt>
                        <dd>Non disponibile</dd>
                      </div>
                      <div>
                        <dt>Quietanza</dt>
                        <dd>Non emessa</dd>
                      </div>
                    </dl>
                    <p>
                      Puoi ritrovare il riscontro nei Pagamenti durante questa
                      visita. Ricaricare azzera la proposta.
                    </p>
                    <div className="cp-actions">
                      <Button onClick={() => go("payments")}>
                        Torna ai pagamenti
                      </Button>
                      {attempt?.outcome === "failed" ? (
                        <Button
                          secondary
                          onClick={() => {
                            setPhase("review");
                            setChecked(false);
                          }}
                        >
                          Ricontrolla e riprova
                        </Button>
                      ) : (
                        <Button
                          secondary
                          onClick={() =>
                            help(
                              `${n.version.data.creditor} · ${n.version.data.period} · v${bill.number} · esito da verificare`,
                            )
                          }
                        >
                          Chiedi una verifica
                        </Button>
                      )}
                    </div>
                  </section>
                )}
              </>
            ))}
          {view === "houses" && houses(true)}
          {view === "documents" && (
            <>
              <p className="cp-lead">
                I documenti pertinenti alla casa selezionata, con la loro
                versione. Le bollette aggiornate sono nell’archivio Pagamenti.
              </p>
              {activeHouses
                .flatMap((h) =>
                  search(s, {}, { purpose: "storico", property: h.id }),
                )
                .filter((d) => d.type !== "bolletta")
                .map((d) => (
                  <button
                    className="cp-history"
                    key={d.id}
                    onClick={() => setDoc(d.id)}
                  >
                    <FileText size={22} />
                    <span>
                      <strong>{d.title}</strong>Versione{" "}
                      {d.versions.at(-1)!.number} ·{" "}
                      {properties.find((h) => h.id === d.property)?.name}
                    </span>
                    <ArrowUpRight size={18} />
                  </button>
                ))}
              <button className="cp-text-link" onClick={() => go("payments")}>
                Apri bollette e originali <ArrowRight size={16} />
              </button>
              <Button
                secondary
                onClick={() => {
                  help();
                  setCategory("Documento o burocrazia");
                }}
              >
                Richiedi un documento
              </Button>
            </>
          )}
          {view === "assistance" && (
            <>
              {requestStep === "list" && (
                <>
                  <p className="cp-lead">
                    Un documento da trovare, una pratica da capire, un problema
                    da risolvere. Parti dal bisogno.
                  </p>
                  <Button onClick={() => help()}>
                    <Plus size={18} /> Chiedi assistenza
                  </Button>
                  <section className="cp-section">
                    <h2>Le tue richieste</h2>
                    {requests.length ? (
                      requests.map((r) => (
                        <article className="cp-request" key={r.id}>
                          <span className="ws-status">{r.status}</span>
                          <h3>{r.subject}</h3>
                          <p>{r.detail}</p>
                          <small>
                            Casa Luce · {r.id} · richiesta di esempio
                          </small>
                          <dl className="cp-facts">
                            <div>
                              <dt>Referente</dt>
                              <dd>
                                {r.status === "In lavorazione"
                                  ? "Agenzia Alfa · esempio di presa in carico"
                                  : "Da assegnare"}
                              </dd>
                            </div>
                            <div>
                              <dt>Prossimo passo</dt>
                              <dd>
                                {r.status === "In lavorazione"
                                  ? "Attendi una proposta di appuntamento. Nessuna data confermata."
                                  : "L’agenzia valuterà ambito e condizioni. Nessun tempo promesso."}
                              </dd>
                            </div>
                          </dl>
                        </article>
                      ))
                    ) : (
                      <p>Nessuna richiesta aperta in questa visita.</p>
                    )}
                  </section>
                </>
              )}
              {(requestStep === "write" || requestStep === "review") && (
                <form
                  className="cp-flow ws-field-stack"
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (requestStep === "write") {
                      if (detail.trim().length < 10) {
                        setError(
                          "Descrivi il bisogno con almeno 10 caratteri.",
                        );
                        return;
                      }
                      setError("");
                      setRequestStep("review");
                    } else {
                      if (filter === "casa-propria" || !canOperate(s)) {
                        setError(
                          "Non è disponibile un titolo per aprire questa richiesta su questa casa.",
                        );
                        return;
                      }
                      const result = work(s, u, {
                        type: "request",
                        subject: `${category}${requestContext ? ` · ${requestContext}` : ""}`,
                        detail,
                      });
                      if (!result.ok) setError(result.message);
                      else {
                        setU(result.state);
                        setRequestStep("done");
                      }
                    }
                  }}
                >
                  <h2>
                    {requestStep === "write"
                      ? "Di cosa hai bisogno?"
                      : "Controlla la richiesta."}
                  </h2>
                  <p>
                    <strong>
                      {filter === "casa-propria" ? "Casa Atelier" : "Casa Luce"}
                    </strong>{" "}
                    · Nessun intervento o costo viene autorizzato.
                  </p>
                  {filter === "all" && (
                    <p>
                      Questa richiesta riguarda Casa Luce. Cambia casa dalla
                      selezione in alto prima di iniziare se il bisogno riguarda
                      un altro immobile.
                    </p>
                  )}
                  {requestContext && (
                    <p className="cp-notice">
                      Bolletta collegata: {requestContext}
                    </p>
                  )}
                  {requestStep === "write" ? (
                    <>
                      <label>
                        Tipo di aiuto
                        <select
                          value={category}
                          onChange={(e) => setCategory(e.target.value)}
                        >
                          <option>Tecnico</option>
                          <option>Documento o burocrazia</option>
                          <option>Bolletta</option>
                          <option>Abbonamento domestico</option>
                        </select>
                      </label>
                      <label>
                        Raccontaci cosa serve
                        <textarea
                          required
                          minLength={10}
                          maxLength={1000}
                          rows={4}
                          value={detail}
                          onChange={(e) => setDetail(e.target.value)}
                          placeholder="Es. Il rubinetto della cucina perde. Vorrei capire come intervenire. Usa solo dati di esempio."
                        />
                      </label>
                    </>
                  ) : (
                    <dl className="cp-facts">
                      <div>
                        <dt>Bisogno</dt>
                        <dd>{category}</dd>
                      </div>
                      <div>
                        <dt>Descrizione</dt>
                        <dd>{detail}</dd>
                      </div>
                      <div>
                        <dt>Costi e disponibilità</dt>
                        <dd>Da concordare prima di un eventuale incarico</dd>
                      </div>
                    </dl>
                  )}
                  {filter === "casa-propria" && (
                    <p role="status">
                      Per Casa Atelier la demo dispone del solo titolo utenze.
                      Il percorso di assistenza è esplorabile su Casa Luce;
                      nessun diritto viene esteso automaticamente.
                    </p>
                  )}
                  <p className="ws-small">
                    Richiesta solo dimostrativa, conservata durante questa
                    visita. Nessuna notifica o chiamata viene inviata.
                  </p>
                  <div className="cp-actions">
                    <Button
                      type="submit"
                      disabled={!canOperate(s) || filter === "casa-propria"}
                    >
                      {requestStep === "write"
                        ? "Rivedi la richiesta"
                        : "Conferma richiesta di esempio"}{" "}
                      <ArrowRight size={16} />
                    </Button>
                    <Button
                      secondary
                      onClick={() => {
                        setError("");
                        setRequestStep(
                          requestStep === "review" ? "write" : "list",
                        );
                      }}
                    >
                      {requestStep === "review" ? "Modifica" : "Annulla"}
                    </Button>
                  </div>
                </form>
              )}
              {requestStep === "done" && (
                <section className="cp-flow" role="status">
                  <Check size={30} />
                  <h2>La tua richiesta ha un riferimento.</h2>
                  <p>
                    {requests.at(-1)?.id} · Ricevuta nella simulazione. Nessun
                    professionista è stato contattato.
                  </p>
                  <p>
                    Prossimo passo: valutazione dell’agenzia, referente e
                    condizioni da confermare. Puoi seguirla qui durante questa
                    visita.
                  </p>
                  <Button onClick={() => setRequestStep("list")}>
                    Segui la richiesta
                  </Button>
                </section>
              )}
            </>
          )}
          {view === "profile" && (
            <div className="cp-profile">
              {card()}
              <section>
                <h2>Adesione al servizio</h2>
                <p>
                  È distinta dagli abbonamenti domestici e dallo stato della
                  tessera.
                </p>
                {subscription ? (
                  <>
                    <p>
                      Rinnovo {u.renewalCancelled ? "disattivato" : "attivo"} ·
                      periodo di esempio fino al {date(subscription.until)}.
                    </p>
                    <Button
                      secondary
                      onClick={() => {
                        setConfirmRenewal(false);
                        setModal("renewal");
                      }}
                    >
                      Gestisci abbonamento
                    </Button>
                  </>
                ) : (
                  <p>Adesione non disponibile per questo profilo.</p>
                )}
              </section>
            </div>
          )}
          <footer className="cp-footer">
            Proposta navigabile · dati sintetici · nessun servizio reale ·
            modifiche fino al ricaricamento{" "}
            <button onClick={() => setModal("map")}>
              Mappa e confini della proposta
            </button>
          </footer>
        </main>
      </div>
      <BillNotice
        state={s}
        bills={u.bills}
        property={bill.property}
        selection={notice}
        onClose={() => setNotice(null)}
        onCurrent={(number) => setNotice(notice && { ...notice, number })}
      />
      <Modal
        open={!!doc}
        onClose={() => setDoc(null)}
        title="Documento di esempio"
        description="Fonte sintetica, non un documento valido."
      >
        <div className="ws-modal-content">
          {readDoc ? (
            <>
              <h3>{s.documents.find((d) => d.id === doc)?.title}</h3>
              <pre className="cp-document">{readDoc.text}</pre>
            </>
          ) : (
            <p>Documento non disponibile per questo contesto.</p>
          )}
        </div>
      </Modal>
      <Modal
        open={!!modal}
        onClose={() => setModal(null)}
        title={
          modal === "card"
            ? "La tua tessera"
            : modal === "renewal"
              ? "Abbonamento al servizio"
              : "Mappa dell’esperienza · candidata"
        }
        description="Proposta da valutare. Nessuna operazione reale."
      >
        <div className="ws-modal-content cp-modal">
          {modal === "card" && (
            <>
              {card()}
              <p>
                La tessera rappresenta l’accesso ai servizi. Non è un mezzo di
                pagamento e non estende i tuoi permessi.
              </p>
              <Button
                secondary
                disabled={
                  s.actor === "owner-alfa"
                    ? u.ownerCardBlocked
                    : s.practice.card === "revocata"
                }
                onClick={() =>
                  s.actor === "owner-alfa"
                    ? setU(work(s, u, { type: "blockOwnerCard" }).state)
                    : setS(execute(s, { type: "blockOwnCard" }).state)
                }
              >
                Blocca tessera nella prova
              </Button>
              <p>
                Il blocco non termina l’adesione o la relazione con la casa.
              </p>
            </>
          )}
          {modal === "renewal" && subscription && (
            <>
              <h3>Il tuo abbonamento di esempio</h3>
              <p>
                Rinnovo {u.renewalCancelled ? "disattivato" : "attivo"}.
                Periodo: {date(subscription.from)} — {date(subscription.until)}.
              </p>
              <p>
                Disattivare il rinnovo non blocca tessera, documenti o rapporto
                in corso. Nessun addebito reale. Preavviso, prezzi e pro rata
                restano da definire.
              </p>
              {!u.renewalCancelled &&
                (confirmRenewal ? (
                  <>
                    <p>
                      Confermi la disattivazione del rinnovo nella proposta?
                    </p>
                    <Button
                      onClick={() => {
                        const result = work(s, u, { type: "cancelRenewal" });
                        if (result.ok) {
                          setU(result.state);
                          setConfirmRenewal(false);
                        }
                      }}
                    >
                      Conferma disattivazione
                    </Button>
                    <Button secondary onClick={() => setConfirmRenewal(false)}>
                      Mantieni rinnovo
                    </Button>
                  </>
                ) : (
                  <Button secondary onClick={() => setConfirmRenewal(true)}>
                    Disattiva rinnovo
                  </Button>
                ))}
              {u.renewalCancelled && (
                <p role="status">
                  Rinnovo disattivato in questa visita di prova.
                </p>
              )}
            </>
          )}
          {modal === "map" && (
            <>
              <p>
                Una proposta di organizzazione, da valutare prima della
                revisione estesa. Identità C–Legame e Materia/Editoriale
                conservate.
              </p>
              <dl className="cp-facts">
                <div>
                  <dt>Casa</dt>
                  <dd>
                    Card → casa → attenzione → documenti e richieste. Una casa
                    resta espansa; più case diventano righe compatte.
                  </dd>
                </div>
                <div>
                  <dt>Pagamenti</dt>
                  <dd>
                    Verifica stato → originale/versione → conferma simulata →
                    riscontro. IN03 e IN04 riutilizzati.
                  </dd>
                </div>
                <div>
                  <dt>Assistenza</dt>
                  <dd>
                    Bisogno → descrizione → riepilogo → riferimento → stato e
                    prossimo passo.
                  </dd>
                </div>
                <div>
                  <dt>Profilo</dt>
                  <dd>
                    Tessera e adesione al servizio, con rinnovo IN01 distinto
                    dalle forniture di casa.
                  </dd>
                </div>
                <div>
                  <dt>Agenzia</dt>
                  <dd>
                    Spazio operativo attuale separato; nessuna tessera personale
                    attribuita all’operatore.
                  </dd>
                </div>
              </dl>
              <p>
                Questa proposta usa una sessione isolata. Ricaricando si azzera;
                gli archivi e i dati della demo attuale non cambiano. Nessun
                IN05, servizio o pagamento reale.
              </p>
              <a href="#/spazio/overview">
                Confronta lo spazio attuale / agenzia
              </a>
            </>
          )}
        </div>
      </Modal>
    </div>
  );
}
