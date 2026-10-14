import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  ArrowUpRight,
  ArrowRight,
  ArrowLeft,
  Search,
  Plus,
  ChevronDown,
  ChevronRight,
  Check,
  CheckCheck,
  X,
  Home,
  LayoutDashboard,
  FolderOpen,
  Users,
  Building2,
  FileText,
  ContactRound,
  SlidersHorizontal,
  ShieldCheck,
  Link2,
  Download,
  Eye,
  ScanLine,
  UserRound,
  CheckCircle2,
  AlertCircle,
  MoreHorizontal,
  Wrench,
  CalendarDays,
  NotebookPen,
  Plug,
  Menu,
  type LucideIcon,
} from "lucide-react";
import { BrandSymbol } from "../components/brand";
import { Modal } from "../components/ui";
import { asset } from "../assets";
import {
  allowed,
  execute,
  initialState,
  persist,
  readState,
  readVersion,
  search,
  scenarios,
  type Command,
  type Document,
  type Purpose,
  type Scenario,
} from "../demo/model";
import {
  canOperate,
  emptyWorkspace,
  persistWorkspace,
  readWorkspace,
  scope,
  visibleRequests,
  work,
  type WorkCommand,
} from "./service";
import "./workspace.css";
type View =
  | "overview"
  | "practices"
  | "practice"
  | "desk"
  | "documents"
  | "people"
  | "houses"
  | "utilities"
  | "rent"
  | "support"
  | "drafts";
const pages: Record<View, string> = {
  overview: "Panoramica",
  practices: "Pratiche",
  practice: "Pratica di locazione",
  desk: "Accogli al banco",
  documents: "Documenti",
  people: "Persone",
  houses: "Immobili",
  utilities: "Utenze",
  rent: "Affitto e scadenze",
  support: "Assistenza",
  drafts: "Bozze contrattuali",
};
const labels: Record<string, string> = {
  "op-alfa": "Operatore 02",
  "op-beta": "Operatore Beta",
  "person-alfa": "Cliente 01",
  "owner-alfa": "Proprietario 02",
  "tech-alfa": "Tecnico 03",
};
const houses = [
  {
    id: "casa-alfa",
    name: "Casa Luce",
    caption: "Unità A01 · in locazione",
    image: "casa-luminosa.jpg",
  },
  {
    id: "casa-propria",
    name: "Casa Atelier",
    caption: "Unità A02 · casa propria",
    image: "casa-studio.jpg",
  },
];
function getView(): View {
  const key = location.hash.split("/")[2] || "overview";
  return key in pages ? (key as View) : "overview";
}
function saveFile(name: string, value: unknown) {
  const url = URL.createObjectURL(
    new Blob([JSON.stringify(value, null, 2)], { type: "application/json" }),
  );
  const a = document.createElement("a");
  a.href = url;
  a.download = name;
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 0);
}
function Action({
  children,
  onClick,
  secondary = false,
  quiet = false,
  disabled = false,
  type = "button",
  className = "",
}: {
  children: ReactNode;
  onClick?: () => void;
  secondary?: boolean;
  quiet?: boolean;
  disabled?: boolean;
  type?: "button" | "submit";
  className?: string;
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`ws-btn ${quiet ? "ws-quiet" : secondary ? "ws-secondary" : "ws-primary"} ${className}`}
    >
      {children}
    </button>
  );
}
function Status({
  children,
  tone = "neutral",
}: {
  children: ReactNode;
  tone?: string;
}) {
  return (
    <span className={`ws-status ${tone}`}>
      <i />
      {children}
    </span>
  );
}
function Glyph({ icon: Icon, tone = "" }: { icon: LucideIcon; tone?: string }) {
  return (
    <span className={`ws-glyph ${tone}`}>
      <Icon size={20} strokeWidth={1.6} aria-hidden="true" />
    </span>
  );
}
function Empty({
  title,
  children,
  action,
  onClick,
}: {
  title: string;
  children: ReactNode;
  action?: string;
  onClick?: () => void;
}) {
  return (
    <div className="ws-empty">
      <FolderOpen size={30} strokeWidth={1.2} aria-hidden="true" />
      <h3>{title}</h3>
      <p>{children}</p>
      {action && (
        <Action secondary onClick={onClick}>
          {action}
          <ArrowRight size={16} />
        </Action>
      )}
    </div>
  );
}
export function Experience() {
  const [s, set] = useState(readState),
    [u, setU] = useState(readWorkspace),
    [view, setView] = useState<View>(getView);
  const [modal, setModal] = useState<string | null>(null),
    [menu, setMenu] = useState(false),
    [tools, setTools] = useState(false);
  const [feedback, setFeedback] = useState<{
      text: string;
      ok: boolean;
    } | null>(null),
    [storageFailed, setStorageFailed] = useState(false);
  const [step, setStep] = useState(() =>
    s.practice.account
      ? 4
      : s.practice.invitations.length
        ? 3
        : s.practice.verified
          ? 3
          : s.practice.corrected
            ? 2
            : 1,
  );
  const [globalQuery, setGlobalQuery] = useState("");
  const [query, setQuery] = useState(""),
    [docType, setDocType] = useState(""),
    [from, setFrom] = useState(""),
    [to, setTo] = useState(""),
    [filterOpen, setFilterOpen] = useState(false);
  const [selection, select] = useState<{ id: string; number: number } | null>(
      null,
    ),
    [sourceTab, setSourceTab] = useState(false),
    [sharing, setSharing] = useState(false),
    [recipient, setRecipient] = useState("");
  const [code, setCode] = useState(""),
    [confirmed, confirm] = useState(false),
    [purpose, setPurpose] = useState<Purpose>("storico"),
    [context, setContext] = useState("");
  const [house, setHouse] = useState("casa-alfa"),
    [subject, setSubject] = useState(""),
    [detail, setDetail] = useState(""),
    [amount, setAmount] = useState(""),
    [source, setSource] = useState(""),
    [showCode, setShowCode] = useState(false);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const operator = s.actor.startsWith("op-"),
    technician = s.actor === "tech-alfa";
  const personal = !operator;
  const cardState =
    s.actor === "owner-alfa"
      ? u.ownerCardBlocked
        ? "revocata"
        : "attiva"
      : s.practice.card;
  const accountReady = s.actor === "owner-alfa" || s.practice.account;
  const ready = s.practice.account,
    hasVisit = s.session?.status === "open";
  const canPrepare = allowed(s, "prepare", scope);
  const openRequests = visibleRequests(s, u);
  const availableDocs = search(
    s,
    { title: query, type: docType, from, to },
    {
      purpose: operator
        ? hasVisit
          ? s.session!.purpose
          : "attivazione"
        : technician
          ? "lavori"
          : docType === "bolletta"
            ? "utenze"
            : "storico",
      ...(hasVisit ? { desk: true } : {}),
    },
  );
  const globalDocs = [
    ...search(
      s,
      { title: globalQuery },
      {
        purpose: technician
          ? "lavori"
          : hasVisit
            ? s.session!.purpose
            : "storico",
        ...(hasVisit ? { desk: true } : {}),
      },
    ),
    ...search(
      s,
      { title: globalQuery, type: "bolletta" },
      { purpose: "utenze", ...(hasVisit ? { desk: true } : {}) },
    ),
  ].filter(
    (doc, index, all) => all.findIndex((d) => d.id === doc.id) === index,
  );
  const d = selection
    ? s.documents.find((d) => d.id === selection.id)
    : undefined;
  const documentPurpose: Purpose =
    d?.type === "bolletta" ? "utenze" : technician ? "lavori" : "storico";
  const version = selection
    ? hasVisit
      ? readVersion(s, selection.id, selection.number, { desk: true })
      : readVersion(s, selection.id, selection.number, {
          purpose: documentPurpose,
        })
    : null;
  const shared = s.session?.shared;
  const sharedV = shared
    ? readVersion(s, shared.document, shared.version, { desk: true })
    : null;
  const draft = s.draft.at(-1);
  useEffect(() => {
    const listener = () => {
      setView(getView());
      setModal(null);
      select(null);
      setMenu(false);
      window.scrollTo(0, 0);
      setTimeout(() => titleRef.current?.focus(), 0);
    };
    addEventListener("hashchange", listener);
    return () => removeEventListener("hashchange", listener);
  }, []);
  useEffect(() => {
    setStorageFailed(!persist(s) || !persistWorkspace(u));
  }, [s, u]);
  useEffect(() => {
    document.title = `${pages[view]} · Il tuo spazio casa`;
  }, [view]);
  function go(v: View) {
    if (v === view) {
      setModal(null);
      setMenu(false);
      titleRef.current?.focus();
    } else location.hash = `/spazio/${v}`;
  }
  function run(c: Command) {
    const r = execute(s, c);
    set(r.state);
    setFeedback({
      text: r.ok
        ? (
            {
              correct:
                "Data del contratto confermata. La correzione è attribuita all’operatore.",
              supply: "Documento di esempio collegato al fascicolo.",
              verify:
                "Rapporto verificato: puoi preparare gli accessi personali.",
              invite:
                "Accessi preparati per le due parti, senza inviare messaggi.",
              activate:
                "Accesso di esempio attivato. Account, adesione e tessera restano distinti.",
              switch:
                "Stai esplorando un altro spazio. La visita precedente è chiusa.",
              generate:
                "Bozza compilata. Controlla le fonti e gli eventuali mancanti.",
              review:
                "Revisione registrata sulla versione corrente. La bozza non è firmata.",
            } as Record<string, string>
          )[c.type] || r.message
        : r.message,
      ok: r.ok,
    });
    if (
      [
        "switch",
        "logout",
        "close",
        "revoke",
        "retryService",
        "blockOwnCard",
      ].includes(c.type)
    ) {
      select(null);
      confirm(false);
      setRecipient("");
      setShowCode(false);
    }
    if (
      r.ok &&
      r.version &&
      (c.type === "document" || c.type === "file") &&
      c.action === "export"
    )
      saveFile("documento-facsimile.json", {
        synthetic: true,
        document: c.id,
        version: r.version,
      });
    return r;
  }
  function workAction(c: WorkCommand) {
    const r = work(s, u, c);
    setU(r.state);
    setFeedback({ text: r.message, ok: r.ok });
    if (r.ok) setModal(null);
    return r;
  }
  function switchActor(actor: string) {
    const agency = actor === "op-beta" ? "beta" : "alfa";
    run({ type: "switch", actor, agency });
    if (!hasVisit) setFeedback(null);
    setQuery("");
    setDocType("");
    setFrom("");
    setTo("");
    setTools(false);
    setMenu(false);
    setModal(null);
    go("overview");
  }
  function reset(scenario: Scenario) {
    set(initialState(scenario));
    setU(emptyWorkspace());
    setStep(scenario === "success" || scenario === "incomplete" ? 1 : 4);
    setModal(null);
    select(null);
    setTools(false);
    setFeedback({
      text: "Ambiente di prova ripristinato. Nessuna operazione reale eseguita.",
      ok: true,
    });
    go("overview");
  }
  function openDocument(doc: Document) {
    const number = doc.versions.at(-1)!.number;
    const r = run(
      hasVisit
        ? { type: "document", action: "read", id: doc.id, version: number }
        : {
            type: "file",
            action: "read",
            id: doc.id,
            version: number,
            purpose:
              doc.type === "bolletta"
                ? "utenze"
                : technician
                  ? "lavori"
                  : "storico",
          },
    );
    if (r.ok) {
      select({ id: doc.id, number });
      setSourceTab(false);
      setSharing(false);
      setRecipient("");
      setModal("document");
    }
  }
  function header(
    eyebrow: string,
    title: string,
    subtitle: string,
    action?: ReactNode,
  ) {
    return (
      <header className="ws-heading">
        <div>
          <span className="ws-eyebrow">{eyebrow}</span>
          <h1 ref={titleRef} tabIndex={-1}>
            {title}
          </h1>
          <p>{subtitle}</p>
        </div>
        {action}
      </header>
    );
  }
  function docRow(doc: Document) {
    return (
      <button
        className="ws-document-row"
        key={doc.id}
        onClick={() => openDocument(doc)}
      >
        <Glyph icon={FileText} tone={doc.type === "tecnico" ? "peach" : ""} />
        <span className="ws-row-main">
          <strong>
            {doc.title
              .replace(" · facsimile", "")
              .replace(" · relazione storica", "")}
          </strong>
          <small>
            {doc.property === "casa-alfa"
              ? "Casa Luce"
              : doc.property === "casa-propria"
                ? "Casa Atelier"
                : "Contesto Beta"}{" "}
            ·{" "}
            {doc.type === "tecnico"
              ? "2018–2020 · data da precisare"
              : doc.precision}
          </small>
        </span>
        <span className="ws-doc-meta">
          v{doc.versions.at(-1)!.number}
          <small>
            {doc.type === "tecnico" ? "Fonte controllabile" : "Facsimile"}
          </small>
        </span>
        <ArrowUpRight size={18} aria-hidden="true" />
      </button>
    );
  }
  function card(compact = false) {
    return (
      <div className={`ws-card ${compact ? "compact" : ""}`}>
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
          <span>
            {accountReady
              ? cardState === "revocata"
                ? "Tessera bloccata"
                : "Tessera servizi"
              : "In attesa di attivazione"}
          </span>
          <Link2 size={17} />
        </div>
      </div>
    );
  }
  const nav: { id: View; label: string; icon: LucideIcon }[] = operator
    ? [
        { id: "overview", label: "Panoramica", icon: LayoutDashboard },
        { id: "practices", label: "Pratiche", icon: FolderOpen },
        { id: "people", label: "Persone", icon: Users },
        { id: "documents", label: "Documenti", icon: FileText },
        { id: "houses", label: "Immobili", icon: Building2 },
        { id: "rent", label: "Affitti e incassi", icon: CalendarDays },
        { id: "support", label: "Richieste", icon: Wrench },
        { id: "drafts", label: "Bozze contrattuali", icon: NotebookPen },
      ]
    : technician
      ? [
          { id: "overview", label: "Il mio incarico", icon: Wrench },
          { id: "documents", label: "Allegati", icon: FileText },
        ]
      : [
          { id: "overview", label: "Il mio spazio", icon: Home },
          { id: "documents", label: "Documenti", icon: FileText },
          { id: "houses", label: "Le mie case", icon: Building2 },
          { id: "utilities", label: "Utenze", icon: Plug },
          { id: "rent", label: "Affitto", icon: CalendarDays },
          { id: "support", label: "Assistenza", icon: Wrench },
        ];
  return (
    <div className="workspace-app">
      <a
        className="ws-skip"
        href="#workspace-main"
        onClick={(e) => {
          e.preventDefault();
          document.getElementById("workspace-main")?.focus();
        }}
      >
        Vai al contenuto
      </a>
      <aside
        className={`ws-sidebar ${menu ? "is-open" : ""}`}
        aria-label="Spazio di lavoro"
      >
        <a
          className="ws-brand"
          href="#/spazio/overview"
          aria-label="Torna alla panoramica"
        >
          <BrandSymbol />
          <span>
            {operator
              ? "Spazio agenzia"
              : technician
                ? "Spazio tecnico"
                : "Il tuo spazio"}
            <small>
              {operator
                ? `AGENZIA ${s.agency.toUpperCase()}`
                : "CASA, PERSONE, DOCUMENTI"}
            </small>
          </span>
        </a>
        <button
          className="ws-mobile-close"
          onClick={() => setMenu(false)}
          aria-label="Chiudi menu"
        >
          <X />
        </button>
        <div className="ws-side-label">
          {operator ? "IL TUO LAVORO" : "A PORTATA DI MANO"}
        </div>
        <nav aria-label="Navigazione della piattaforma">
          {nav.map(({ id, label, icon: Icon }) => (
            <a
              key={id}
              href={`#/spazio/${id}`}
              aria-current={
                view === id || (view === "practice" && id === "practices")
                  ? "page"
                  : undefined
              }
            >
              <Icon size={19} strokeWidth={1.6} />
              <span>{label}</span>
              {id === "practices" && !ready && <b>1</b>}
              {id === "support" && openRequests.length > 0 && (
                <b>{openRequests.length}</b>
              )}
            </a>
          ))}
        </nav>
        {operator && (
          <div className="ws-bank-shortcut">
            <ScanLine size={24} strokeWidth={1.4} />
            <strong>È arrivato un cliente?</strong>
            <p>
              Ritrova la persona.
              <br />
              Riparti dal suo fascicolo.
            </p>
            <Action secondary onClick={() => go("desk")}>
              Accogli al banco
              <ArrowUpRight size={16} />
            </Action>
          </div>
        )}
        <div className="ws-side-bottom">
          <button onClick={() => setTools(true)}>
            <SlidersHorizontal size={17} />
            Strumenti della demo
          </button>
          <button className="ws-account" onClick={() => setModal("workspace")}>
            <span className="ws-avatar">
              {operator ? "O2" : technician ? "T3" : "C1"}
            </span>
            <span>
              <strong>{labels[s.actor]}</strong>
              <small>
                {operator
                  ? "Operatore autorizzato"
                  : technician
                    ? "Incarico assegnato"
                    : "Accesso personale"}
              </small>
            </span>
            <ChevronDown size={15} />
          </button>
        </div>
      </aside>
      {menu && (
        <button
          className="ws-mobile-scrim"
          aria-label="Chiudi navigazione"
          onClick={() => setMenu(false)}
        />
      )}
      <div className="ws-main-shell">
        <header className="ws-topbar">
          <button
            className="ws-menu-button"
            aria-label="Apri navigazione"
            onClick={() => setModal("navigation")}
          >
            <Menu size={22} />
          </button>
          <div className="ws-breadcrumb">
            {operator
              ? `Agenzia ${s.agency === "alfa" ? "Alfa" : "Beta"}`
              : "Il tuo spazio"}
            <span>/</span>
            <strong>{pages[view]}</strong>
          </div>
          <div className="ws-top-actions">
            <button
              className="ws-search-trigger"
              onClick={() => setModal("search")}
              aria-label="Cerca nella piattaforma"
            >
              <Search size={17} />
              <span>Cerca una persona o un documento</span>
              <kbd>⌕</kbd>
            </button>
            <span className="ws-demo-label">
              <i />
              Dati sintetici
            </span>
            <button
              className="ws-view-switch"
              onClick={() => switchActor(operator ? "person-alfa" : "op-alfa")}
            >
              {operator ? "Vista cliente" : "Vista agenzia"}
              <ArrowUpRight size={14} />
            </button>
          </div>
        </header>
        {hasVisit && (
          <div className="ws-visit-bar">
            <span>
              <i />
              <strong>Incontro con Cliente 01</strong> · Casa Luce ·{" "}
              {s.session?.purpose === "lavori"
                ? "lavori"
                : "recupero documenti"}
            </span>
            <button
              onClick={() => {
                run({ type: "close" });
                setModal(null);
                go("desk");
              }}
            >
              Termina incontro
              <X size={14} />
            </button>
          </div>
        )}
        <main id="workspace-main" tabIndex={-1}>
          {u.notice && (
            <div className="ws-feedback warning" role="status">
              {u.notice}
            </div>
          )}
          {storageFailed && (
            <div className="ws-feedback warning" role="alert">
              La memoria del browser non è disponibile. Le modifiche dureranno
              solo fino alla chiusura.
            </div>
          )}
          {feedback && (
            <div
              className={`ws-feedback ${feedback.ok ? "" : "warning"}`}
              role="status"
            >
              <span>
                {feedback.ok ? (
                  <CheckCircle2 size={17} />
                ) : (
                  <AlertCircle size={17} />
                )}{" "}
                {feedback.text}
              </span>
              <button
                aria-label="Nascondi messaggio"
                onClick={() => setFeedback(null)}
              >
                <X size={15} />
              </button>
            </div>
          )}
          {!s.operatorAuthenticated ? (
            <>
              <Empty
                title="Il tuo spazio è chiuso"
                action="Rientra nella demo"
                onClick={() => run({ type: "login" })}
              >
                Per continuare, riapri la sessione dimostrativa. Il riepilogo
                del cliente è stato svuotato.
              </Empty>
            </>
          ) : (
            <>
              {!s.serviceAvailable && (
                <div className="ws-unavailable">
                  <AlertCircle />
                  <div>
                    <h2>Il servizio non è disponibile</h2>
                    <p>
                      La consultazione è sospesa. Non mostriamo copie private
                      fuori sessione.
                    </p>
                  </div>
                  <Action
                    secondary
                    onClick={() => run({ type: "retryService" })}
                  >
                    Riprova
                  </Action>
                </div>
              )}
              {view === "overview" && operator && (
                <>
                  {header(
                    `BUON LAVORO, ${labels[s.actor].toUpperCase()}`,
                    "La giornata, sotto controllo.",
                    "Pratiche, persone e documenti: tutto il lavoro dell’agenzia, nello stesso spazio.",
                    <Action onClick={() => go("desk")}>
                      <ScanLine size={18} />
                      Accogli un cliente
                    </Action>,
                  )}
                  <div className="ws-metrics">
                    <div>
                      <span>Pratiche da completare</span>
                      <strong>
                        {s.agency === "alfa" && !ready ? "01" : "00"}
                        <small>
                          {ready
                            ? "Accesso personale predisposto"
                            : "Una nuova relazione da preparare"}
                        </small>
                      </strong>
                    </div>
                    <div>
                      <span>Documenti nel tuo contesto</span>
                      <strong>
                        {search(s, {}, { purpose: "attivazione" })
                          .length.toString()
                          .padStart(2, "0")}
                        <small>Fonti e versioni sempre rintracciabili</small>
                      </strong>
                    </div>
                    <div>
                      <span>Incontri aperti</span>
                      <strong>
                        {hasVisit ? "01" : "00"}
                        <small>
                          {hasVisit
                            ? "Cliente 01 · Casa Luce"
                            : "La postazione è pronta ad accogliere"}
                        </small>
                      </strong>
                    </div>
                  </div>
                  <section className="ws-dashboard-feature">
                    <div className="ws-feature-copy">
                      <span className="ws-eyebrow">
                        {ready
                          ? "UNA STORIA CHE CONTINUA"
                          : "LA PROSSIMA COSA DA FARE"}
                      </span>
                      <Status tone={ready ? "green" : "amber"}>
                        {s.agency === "beta"
                          ? "Contesto isolato"
                          : ready
                            ? "Pratica pronta"
                            : "Da completare"}
                      </Status>
                      <h2>
                        {s.agency === "beta"
                          ? "Il tuo archivio.\nNel suo contesto."
                          : ready
                            ? "Il cliente torna.\nTu sai già da dove ripartire."
                            : "Una casa, due persone.\nMetti tutto in relazione."}
                      </h2>
                      <p>
                        {s.agency === "beta"
                          ? "Questo spazio contiene solo i documenti affidati all’agenzia Beta."
                          : ready
                            ? "Una tessera o un codice aiutano a ritrovare la persona. Conferma il contesto e apri solo il fascicolo pertinente."
                            : "Prepara la locazione di Casa Luce: controlla le parti, completa i documenti e dai a ognuno il proprio accesso."}
                      </p>
                      <Action
                        onClick={() =>
                          go(
                            s.agency === "beta"
                              ? "documents"
                              : ready
                                ? "desk"
                                : "practice",
                          )
                        }
                      >
                        {s.agency === "beta"
                          ? "Apri i documenti"
                          : ready
                            ? "Apri un incontro"
                            : "Completa la pratica"}
                        <ArrowRight size={17} />
                      </Action>
                      <span className="ws-feature-foot">
                        <ShieldCheck size={15} />
                        {ready
                          ? "L’accesso segue il rapporto, non la tessera."
                          : "Un solo contratto. Accessi personali distinti."}
                      </span>
                    </div>
                    <div className="ws-feature-visual">
                      <img
                        src={asset("images/casa-luminosa.jpg")}
                        alt="Interno luminoso della casa di esempio"
                      />
                      <div className="ws-photo-label">
                        <span>IL FASCICOLO</span>
                        <strong>
                          {s.agency === "beta" ? "Contesto Beta" : "Casa Luce"}
                        </strong>
                        <small>
                          {s.agency === "beta"
                            ? "Unità B01 · mandato Beta"
                            : "Unità A01 · locazione"}
                        </small>
                      </div>
                      <div className="ws-photo-counter">
                        <FolderOpen size={18} />
                        <span>
                          Persone, contratto
                          <br />
                          <strong>e una storia condivisa.</strong>
                        </span>
                      </div>
                    </div>
                  </section>
                  <div className="ws-dashboard-lower">
                    <section>
                      <div className="ws-section-head">
                        <h2>
                          {ready ? "Il fascicolo è pronto" : "Da riprendere"}
                        </h2>
                        <button onClick={() => go("practices")}>
                          Tutte le pratiche
                          <ArrowUpRight size={15} />
                        </button>
                      </div>
                      {s.agency === "alfa" ? (
                        <button
                          className="ws-practice-row"
                          onClick={() => go("practice")}
                        >
                          <img src={asset("images/casa-luminosa.jpg")} alt="" />
                          <span>
                            <small>LOCAZIONE · CASA LUCE</small>
                            <strong>Cliente 01 e Proprietario 02</strong>
                            <span>
                              {ready
                                ? "Controlli completati · accessi predisposti"
                                : !s.practice.corrected
                                  ? "Una data da chiarire · controlla le fonti"
                                  : !s.practice.supplied
                                    ? "Un allegato da aggiungere al fascicolo"
                                    : !s.practice.verified
                                      ? "Dati completi · verifica il rapporto"
                                      : !s.practice.invitations.length
                                        ? "Accessi personali da preparare"
                                        : "Accessi predisposti · attivazione da confermare"}
                            </span>
                          </span>
                          <ChevronRight size={20} />
                        </button>
                      ) : (
                        <p>
                          Nessuna pratica da completare nel mandato corrente.
                        </p>
                      )}
                    </section>
                    <section>
                      <div className="ws-section-head">
                        <h2>Accesso rapido</h2>
                      </div>
                      <button
                        className="ws-quick-row"
                        onClick={() => go("documents")}
                      >
                        <Glyph icon={Search} />
                        <span>
                          <strong>Ritrova un documento</strong>
                          <small>Per titolo, tipo o periodo</small>
                        </span>
                        <ArrowUpRight size={18} />
                      </button>
                      <button
                        className="ws-quick-row"
                        onClick={() => go("drafts")}
                      >
                        <Glyph icon={NotebookPen} />
                        <span>
                          <strong>Prepara una bozza</strong>
                          <small>Dai dati verificati della pratica</small>
                        </span>
                        <ArrowUpRight size={18} />
                      </button>
                    </section>
                  </div>
                </>
              )}
              {view === "overview" && personal && !technician && (
                <>
                  <section className="ws-personal-hero">
                    <div>
                      <div className="ws-card-head">
                        <span className="ws-eyebrow">
                          LA TUA TESSERA SERVIZI
                        </span>
                        <Status
                          tone={
                            accountReady && cardState === "attiva"
                              ? "green"
                              : "amber"
                          }
                        >
                          {accountReady
                            ? cardState === "attiva"
                              ? "Attiva"
                              : "Bloccata"
                            : "Da attivare"}
                        </Status>
                      </div>
                      {card()}
                      <button
                        className="ws-card-manage"
                        onClick={() => setModal("card")}
                      >
                        Gestisci tessera
                        <ArrowUpRight size={16} />
                      </button>
                    </div>
                    <div className="ws-personal-intro">
                      <span className="ws-eyebrow">
                        BENVENUTO NEL TUO SPAZIO
                      </span>
                      <h1 ref={titleRef} tabIndex={-1}>
                        La tua casa.
                        <br />
                        Tutto il suo mondo.
                      </h1>
                      <p>
                        Contratti, documenti, scadenze e richieste. Un unico
                        posto per quello che riguarda casa, con l’agenzia al tuo
                        fianco.
                      </p>
                      <Action onClick={() => go("documents")}>
                        Apri i tuoi documenti
                        <ArrowRight size={17} />
                      </Action>
                      <span className="ws-feature-foot">
                        <ShieldCheck size={15} />
                        Vedi solo ciò che ti riguarda.
                      </span>
                    </div>
                  </section>
                  {!accountReady && (
                    <div className="ws-next-step">
                      <Glyph icon={ContactRound} tone="peach" />
                      <span>
                        <strong>Il tuo accesso è ancora da preparare.</strong>
                        <small>
                          L’agenzia deve completare la pratica. Puoi provarlo
                          passando alla vista agenzia.
                        </small>
                      </span>
                      <Action
                        secondary
                        onClick={() => {
                          switchActor("op-alfa");
                          go("practice");
                        }}
                      >
                        Vai alla pratica
                      </Action>
                    </div>
                  )}
                  <div className="ws-section-head">
                    <h2>Le tue case</h2>
                    <button onClick={() => go("houses")}>
                      Vedi immobili
                      <ArrowUpRight size={15} />
                    </button>
                  </div>
                  <div
                    className={`ws-house-list ${houses.filter((h) => search(s, {}, { purpose: h.id === "casa-propria" ? "utenze" : "storico", property: h.id }).length > 0).length > 1 ? "compact" : "single"}`}
                  >
                    {houses
                      .filter(
                        (h) =>
                          search(
                            s,
                            {},
                            {
                              purpose:
                                h.id === "casa-propria" ? "utenze" : "storico",
                              property: h.id,
                            },
                          ).length > 0,
                      )
                      .map((h) => (
                        <button
                          key={h.id}
                          onClick={() => {
                            setHouse(h.id);
                            go("houses");
                          }}
                          className="ws-house-row"
                        >
                          <img src={asset(`images/${h.image}`)} alt="" />
                          <span>
                            <small>{h.caption}</small>
                            <strong>{h.name}</strong>
                            <span>
                              {h.id === "casa-propria"
                                ? "Le utenze della tua casa"
                                : "Il tuo contratto e i documenti condivisi"}
                            </span>
                          </span>
                          <ArrowUpRight size={19} />
                        </button>
                      ))}
                  </div>
                  <div className="ws-personal-shortcuts">
                    <button onClick={() => go("utilities")}>
                      <Plug />
                      <strong>Le tue utenze</strong>
                      <span>Importi e scadenze, subito chiari.</span>
                      <ArrowUpRight />
                    </button>
                    <button onClick={() => go("support")}>
                      <Wrench />
                      <strong>Serve una mano?</strong>
                      <span>Una richiesta, un riferimento.</span>
                      <ArrowUpRight />
                    </button>
                  </div>
                </>
              )}
              {view === "overview" && technician && (
                <>
                  {header(
                    "IL TUO INCARICO",
                    "Solo quello che ti serve.",
                    "I documenti pertinenti all’incarico, senza accesso generale al fascicolo.",
                  )}
                  <div className="ws-section-head">
                    <h2>Casa Luce · verifica impianto</h2>
                    <Status>Incarico dimostrativo</Status>
                  </div>
                  {search(s, {}, { purpose: "lavori" }).map(docRow)}
                </>
              )}
              {view === "practices" && (
                <>
                  {header(
                    "RELAZIONI DA SEGUIRE",
                    "Le tue pratiche.",
                    "Ogni casa, le persone giuste e il prossimo passo da fare.",
                  )}
                  <div className="ws-list-caption">
                    <span>Pratica</span>
                    <span>Stato</span>
                  </div>
                  {canPrepare ? (
                    <button
                      className="ws-practice-row"
                      onClick={() => go("practice")}
                    >
                      <img src={asset("images/casa-luminosa.jpg")} alt="" />
                      <span>
                        <small>LOCAZIONE · CASA LUCE</small>
                        <strong>Cliente 01 e Proprietario 02</strong>
                        <span>
                          Contratto A01 · 1 ottobre 2026 — 1 ottobre 2027
                        </span>
                      </span>
                      <Status tone={ready ? "green" : "amber"}>
                        {ready ? "Pronta" : "Da completare"}
                      </Status>
                      <ChevronRight size={18} />
                    </button>
                  ) : (
                    <Empty title="Nessuna pratica disponibile">
                      Le pratiche seguono il mandato dell’agenzia e i tuoi
                      titoli.
                    </Empty>
                  )}
                </>
              )}
              {view === "practice" && (
                <>
                  {header(
                    canPrepare
                      ? "LOCAZIONE · CASA LUCE"
                      : "PRATICA DI LOCAZIONE",
                    "Un buon inizio, per tutti.",
                    "Prepara il fascicolo e l’accesso personale delle parti. Ogni passaggio mantiene una fonte verificabile.",
                  )}{" "}
                  {!canPrepare ? (
                    <Empty title="Pratica non disponibile">
                      Il contesto corrente non consente di modificare questa
                      pratica.
                    </Empty>
                  ) : (
                    <>
                      <div className="ws-wizard">
                        <nav aria-label="Passaggi della pratica">
                          {[
                            "Dati e persone",
                            "Documenti",
                            "Accessi personali",
                            "Riepilogo",
                          ].map((text, i) => (
                            <button
                              key={text}
                              onClick={() => setStep(i + 1)}
                              aria-current={step === i + 1 ? "step" : undefined}
                              disabled={
                                i > 0 &&
                                (!s.practice.corrected ||
                                  (i > 1 && !s.practice.verified) ||
                                  (i > 2 && !s.practice.invitations.length))
                              }
                            >
                              <span>
                                {step > i + 1 ? <Check size={15} /> : i + 1}
                              </span>
                              {text}
                            </button>
                          ))}
                        </nav>
                        <div className="ws-wizard-content" key={step}>
                          {step === 1 && (
                            <>
                              <div className="ws-wizard-heading">
                                <span>PASSAGGIO 1 DI 4</span>
                                <h2>Prima, le persone e la casa.</h2>
                                <p>
                                  I dati provengono dalla pratica di esempio.
                                  Controllali prima di preparare gli accessi.
                                </p>
                              </div>
                              <div className="ws-party-grid">
                                <div>
                                  <span className="ws-avatar large">P2</span>
                                  <div>
                                    <small>PROPRIETARIO</small>
                                    <strong>Proprietario 02</strong>
                                    <span>
                                      Parte del contratto · account distinto
                                    </span>
                                  </div>
                                  <CheckCircle2 size={18} />
                                </div>
                                <div>
                                  <span className="ws-avatar large peach">
                                    C1
                                  </span>
                                  <div>
                                    <small>CONDUTTORE</small>
                                    <strong>Cliente 01</strong>
                                    <span>
                                      Parte del contratto · account distinto
                                    </span>
                                  </div>
                                  <CheckCircle2 size={18} />
                                </div>
                              </div>
                              <div className="ws-property-strip">
                                <img
                                  src={asset("images/casa-luminosa.jpg")}
                                  alt="Casa Luce, immobile di esempio"
                                />
                                <span>
                                  <small>IMMOBILE / CONTRATTO</small>
                                  <strong>Casa Luce · Unità A01</strong>
                                  <span>Locazione · contratto A01</span>
                                </span>
                              </div>
                              <div className="ws-form-grid">
                                <div className="ws-field-read">
                                  <span>Inizio del rapporto</span>
                                  <strong>1 ottobre 2026</strong>
                                  {s.practice.corrected ? (
                                    <Status tone="green">
                                      Fonte confermata
                                    </Status>
                                  ) : (
                                    <button
                                      className="ws-inline-warning"
                                      onClick={() => setModal("date")}
                                    >
                                      <AlertCircle size={16} />
                                      Due date diverse nelle fonti
                                      <ChevronRight size={15} />
                                    </button>
                                  )}
                                </div>
                                <div className="ws-field-read">
                                  <span>Fine del rapporto</span>
                                  <strong>1 ottobre 2027</strong>
                                  <small>
                                    Fine esclusa · periodo sintetico
                                  </small>
                                </div>
                                <div className="ws-field-read">
                                  <span>Canone mensile</span>
                                  <strong>900,00 €</strong>
                                  <small>
                                    Importo del contratto di esempio
                                  </small>
                                </div>
                                <div className="ws-field-read">
                                  <span>Deposito</span>
                                  <strong>1.800,00 €</strong>
                                  <small>Separato da canone e adesione</small>
                                </div>
                              </div>
                              <div className="ws-wizard-footer">
                                <span>
                                  <ShieldCheck size={15} />
                                  Nessun dato viene inviato.
                                </span>
                                <Action
                                  onClick={() =>
                                    s.practice.corrected
                                      ? setStep(2)
                                      : setModal("date")
                                  }
                                >
                                  {s.practice.corrected
                                    ? "Continua ai documenti"
                                    : "Controlla la data"}
                                  <ArrowRight size={17} />
                                </Action>
                              </div>
                            </>
                          )}
                          {step === 2 && (
                            <>
                              <div className="ws-wizard-heading">
                                <span>PASSAGGIO 2 DI 4</span>
                                <h2>Un fascicolo che parte in ordine.</h2>
                                <p>
                                  Il contratto è presente. Manca il documento
                                  che conferma il rapporto tra le parti.
                                </p>
                              </div>
                              <div className="ws-checklist-item">
                                <Glyph icon={FileText} />
                                <div>
                                  <strong>Contratto di locazione</strong>
                                  <span>
                                    Facsimile · versione 1 · fonte: pratica Alfa
                                  </span>
                                </div>
                                <Status tone="green">Presente</Status>
                              </div>
                              <div className="ws-checklist-item">
                                <Glyph
                                  icon={s.practice.supplied ? CheckCheck : Plus}
                                  tone="peach"
                                />
                                <div>
                                  <strong>Verifica del rapporto</strong>
                                  <span>
                                    {s.practice.supplied
                                      ? "Facsimile collegato dalla raccolta locale"
                                      : "Da aggiungere prima di verificare la pratica"}
                                  </span>
                                </div>
                                {s.practice.supplied ? (
                                  <Status tone="green">Presente</Status>
                                ) : (
                                  <Action
                                    secondary
                                    onClick={() => setModal("attachment")}
                                  >
                                    Aggiungi documento
                                  </Action>
                                )}
                              </div>
                              <div className="ws-slim-note">
                                <Link2 size={18} />
                                <p>
                                  I file mantengono fonte e versione. Un
                                  controllo formale non è una certificazione
                                  tecnica o giuridica.
                                </p>
                              </div>
                              <div className="ws-wizard-footer">
                                <Action quiet onClick={() => setStep(1)}>
                                  <ArrowLeft size={16} />
                                  Indietro
                                </Action>
                                <Action
                                  disabled={!s.practice.supplied}
                                  onClick={() => {
                                    const r = run({
                                      type: "verify",
                                      key: "workspace-verify",
                                    });
                                    if (r.ok) setStep(3);
                                  }}
                                >
                                  Verifica e continua
                                  <ArrowRight size={16} />
                                </Action>
                              </div>
                            </>
                          )}
                          {step === 3 && (
                            <>
                              <div className="ws-wizard-heading">
                                <span>PASSAGGIO 3 DI 4</span>
                                <h2>Ognuno entra nel proprio spazio.</h2>
                                <p>
                                  Due accessi personali, uno per ogni parte. Il
                                  contratto è condiviso; i documenti privati
                                  restano separati.
                                </p>
                              </div>
                              {["Proprietario 02", "Cliente 01"].map(
                                (name, i) => (
                                  <div className="ws-access-person" key={name}>
                                    <span
                                      className={`ws-avatar large ${i ? "peach" : ""}`}
                                    >
                                      {i ? "C1" : "P2"}
                                    </span>
                                    <div>
                                      <strong>{name}</strong>
                                      <span>
                                        {i
                                          ? "Contratto e documenti pertinenti al conduttore"
                                          : "Contratto e documenti pertinenti al proprietario"}
                                      </span>
                                    </div>
                                    <Status
                                      tone={
                                        s.practice.invitations.length
                                          ? "green"
                                          : "neutral"
                                      }
                                    >
                                      {s.practice.invitations.length
                                        ? "Preparato"
                                        : "Da preparare"}
                                    </Status>
                                  </div>
                                ),
                              )}
                              <div className="ws-slim-note">
                                <ShieldCheck size={18} />
                                <p>
                                  Prepari gli inviti di esempio, senza inviare
                                  messaggi. Nessuna bolletta personale viene
                                  condivisa con il proprietario.
                                </p>
                              </div>
                              <div className="ws-wizard-footer">
                                <Action quiet onClick={() => setStep(2)}>
                                  <ArrowLeft size={16} />
                                  Indietro
                                </Action>
                                <Action
                                  onClick={() => {
                                    const r = run({
                                      type: "invite",
                                      key: "workspace-invite",
                                    });
                                    if (r.ok) setStep(4);
                                  }}
                                >
                                  Prepara gli accessi
                                  <ArrowRight size={16} />
                                </Action>
                              </div>
                            </>
                          )}
                          {step === 4 && (
                            <>
                              <div
                                className={`ws-wizard-heading ${ready ? "complete" : ""}`}
                              >
                                <span>
                                  {ready ? (
                                    <CheckCircle2 size={30} />
                                  ) : (
                                    "PASSAGGIO 4 DI 4"
                                  )}
                                </span>
                                <h2>
                                  {ready
                                    ? "La pratica è pronta."
                                    : "Tutto pronto per il primo accesso."}
                                </h2>
                                <p>
                                  {ready
                                    ? "Ora le persone hanno un riferimento. Al prossimo incontro, l’agenzia ritroverà il fascicolo senza ricominciare."
                                    : "Conferma l’attivazione dimostrativa di Cliente 01. L’account personale, l’adesione al servizio e la tessera sono tre cose distinte."}
                                </p>
                              </div>
                              <div className="ws-activation-summary">
                                <div>
                                  <Glyph icon={UserRound} />
                                  <span>
                                    <strong>Account personale</strong>
                                    <small>
                                      {ready
                                        ? "Collegato alla persona"
                                        : "Da collegare"}
                                    </small>
                                  </span>
                                  <Check size={17} />
                                </div>
                                <div>
                                  <Glyph icon={Link2} />
                                  <span>
                                    <strong>Adesione al servizio</strong>
                                    <small>
                                      {ready
                                        ? s.practice.membership
                                        : "Solo dimostrativa · nessuna quota commerciale"}
                                    </small>
                                  </span>
                                  <Check size={17} />
                                </div>
                                <div>
                                  <Glyph icon={ContactRound} />
                                  <span>
                                    <strong>Tessera servizi</strong>
                                    <small>
                                      {ready
                                        ? s.practice.card
                                        : "Da predisporre · non concede documenti da sola"}
                                    </small>
                                  </span>
                                  <Check size={17} />
                                </div>
                              </div>
                              <div className="ws-wizard-footer">
                                <Action
                                  secondary
                                  onClick={() =>
                                    go(ready ? "documents" : "practices")
                                  }
                                >
                                  {ready
                                    ? "Apri il fascicolo"
                                    : "Salva e torna alle pratiche"}
                                </Action>
                                <Action
                                  onClick={() => {
                                    if (ready) go("desk");
                                    else
                                      run({
                                        type: "activate",
                                        key: "workspace-activate",
                                      });
                                  }}
                                >
                                  {ready
                                    ? "Accogli al banco"
                                    : "Attiva accesso di esempio"}
                                  <ArrowRight size={17} />
                                </Action>
                              </div>
                              {ready && (
                                <button
                                  className="ws-text-link"
                                  onClick={() => switchActor("person-alfa")}
                                >
                                  Guarda cosa vede il cliente
                                  <ArrowUpRight size={15} />
                                </button>
                              )}
                            </>
                          )}
                        </div>
                      </div>
                    </>
                  )}
                </>
              )}
              {view === "desk" && (
                <>
                  {header(
                    "LA PERSONA PRIMA DEL DOCUMENTO",
                    "Bentornato, ripartiamo da qui.",
                    "Ritrova chi hai di fronte, conferma il motivo della visita e apri il fascicolo giusto.",
                  )}
                  <div className="ws-desk-grid">
                    <section className="ws-desk-main">
                      {!s.session?.candidate && !hasVisit ? (
                        <>
                          <div className="ws-scan-illustration">
                            <div>
                              <ContactRound size={46} strokeWidth={1.1} />
                              <span className="ws-scan-line" />
                            </div>
                            <ScanLine size={22} />
                          </div>
                          <h2>Chi è arrivato in agenzia?</h2>
                          <p>
                            Usa la tessera di esempio oppure cerca con il
                            codice. La presentazione seleziona una persona: la
                            conferma viene dopo.
                          </p>
                          <Action
                            disabled={!operator}
                            onClick={() =>
                              run({
                                type: "present",
                                channel: "card",
                                code: "DEMO-ALFA-01",
                              })
                            }
                          >
                            <ContactRound size={18} />
                            Presenta tessera di esempio
                          </Action>
                          <div className="ws-divider-label">
                            <span>oppure usa un codice</span>
                          </div>
                          <form
                            onSubmit={(e) => {
                              e.preventDefault();
                              run({ type: "present", channel: "code", code });
                            }}
                          >
                            <label>
                              Codice della persona
                              <div className="ws-input-action">
                                <input
                                  value={code}
                                  onChange={(e) => setCode(e.target.value)}
                                  placeholder="DEMO-ALFA-01"
                                  autoComplete="off"
                                />
                                <Action secondary type="submit">
                                  Cerca
                                  <ArrowRight size={16} />
                                </Action>
                              </div>
                            </label>
                          </form>
                          {!ready && s.agency === "alfa" && (
                            <p className="ws-small">
                              L’accesso non è ancora attivo.{" "}
                              <button onClick={() => go("practice")}>
                                Completa prima la pratica.
                              </button>
                            </p>
                          )}
                          {(!s.readerAvailable ||
                            s.practice.card === "revocata") && (
                            <div className="ws-desk-recovery">
                              <p>
                                {s.practice.card === "revocata"
                                  ? "La tessera è bloccata. Puoi fare una verifica assistita, senza riattivarla."
                                  : "Il lettore non è disponibile. Usa il codice o la verifica assistita."}
                              </p>
                              <Action
                                secondary
                                onClick={() =>
                                  run({
                                    type: "present",
                                    channel: "manual",
                                    code: code || "DEMO-ALFA-01",
                                  })
                                }
                              >
                                Verifica assistita di esempio
                              </Action>
                              {!s.readerAvailable && (
                                <Action
                                  quiet
                                  onClick={() => run({ type: "retryReader" })}
                                >
                                  Riprova lettore
                                </Action>
                              )}
                            </div>
                          )}
                        </>
                      ) : hasVisit ? (
                        <>
                          <div className="ws-desk-ready">
                            <CheckCircle2 size={44} strokeWidth={1.2} />
                            <h2>Il contesto è confermato.</h2>
                            <p>
                              Cliente 01 · Casa Luce
                              <br />
                              Scopo: recupero documenti. La visita è aperta.
                            </p>
                            <Action onClick={() => go("documents")}>
                              Cerca nel fascicolo
                              <ArrowRight size={17} />
                            </Action>
                            <Action
                              quiet
                              onClick={() => run({ type: "close" })}
                            >
                              Termina incontro
                            </Action>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="ws-found-person">
                            <span className="ws-avatar extra">C1</span>
                            <Status tone="green">Persona trovata</Status>
                            <h2>Cliente 01</h2>
                            <p>Conduttore · Casa Luce</p>
                          </div>
                          <label className="ws-checkbox">
                            <input
                              type="checkbox"
                              checked={confirmed}
                              onChange={(e) => confirm(e.target.checked)}
                            />
                            Ho verificato la persona presente
                          </label>
                          <div className="ws-field-stack">
                            <label>
                              Motivo della visita
                              <select
                                value={purpose}
                                onChange={(e) =>
                                  setPurpose(e.target.value as Purpose)
                                }
                              >
                                <option value="storico">
                                  Ritrovare un documento
                                </option>
                                <option value="lavori">
                                  Consultare la storia dei lavori
                                </option>
                                <option value="attivazione">
                                  Riprendere l’attivazione
                                </option>
                              </select>
                            </label>
                            <label>
                              Casa e contratto
                              <select
                                aria-label="Casa e contratto"
                                value={context}
                                onChange={(e) => setContext(e.target.value)}
                              >
                                <option value="">Scegli il contesto</option>
                                <option value="alfa">
                                  Casa Luce · contratto di locazione A01
                                </option>
                              </select>
                            </label>
                          </div>
                          <Action
                            disabled={!confirmed || !context}
                            onClick={() => {
                              const r = run({
                                type: "open",
                                confirmed,
                                purpose,
                                property: "casa-alfa",
                                contract: "contratto-alfa",
                              });
                              if (r.ok) go("documents");
                            }}
                          >
                            Conferma e apri il fascicolo
                            <ArrowRight size={17} />
                          </Action>
                          <Action
                            quiet
                            onClick={() => {
                              run({ type: "close" });
                              confirm(false);
                            }}
                          >
                            Cambia persona
                          </Action>
                        </>
                      )}
                    </section>
                    <aside className="ws-desk-explanation">
                      <span className="ws-eyebrow">UN INCONTRO, TRE PASSI</span>
                      {[
                        {
                          icon: ContactRound,
                          title: "Ritrova la persona",
                          body: "La tessera è un punto di partenza, non una chiave universale.",
                        },
                        {
                          icon: ShieldCheck,
                          title: "Conferma il contesto",
                          body: "Persona, scopo e casa stabiliscono quali informazioni servono.",
                        },
                        {
                          icon: FolderOpen,
                          title: "Riprendi la sua storia",
                          body: "Documenti, versioni e fonti, anche se la pratica l’ha seguita un collega.",
                        },
                      ].map(({ icon: Icon, title, body }, i) => (
                        <div key={title}>
                          <span>{i + 1}</span>
                          <div>
                            <Icon size={20} strokeWidth={1.4} />
                            <strong>{title}</strong>
                            <p>{body}</p>
                          </div>
                        </div>
                      ))}
                      <small>
                        Postazione dimostrativa. Nessun lettore o NFC reale.
                      </small>
                    </aside>
                  </div>
                </>
              )}
              {view === "documents" && (
                <>
                  {header(
                    hasVisit
                      ? "FASCICOLO · CLIENTE 01"
                      : "IL TUO ARCHIVIO AUTORIZZATO",
                    "Ritrova quello che conta.",
                    "Un documento, la sua fonte, la sua storia. Anche se ricordi soltanto un anno.",
                  )}
                  <div className="ws-library-toolbar">
                    <label className="ws-library-search">
                      <Search size={20} />
                      <span className="sr-only">Cerca documenti</span>
                      <input
                        type="search"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Cerca un contratto, un impianto, un documento…"
                      />
                    </label>
                    <Action
                      secondary
                      onClick={() => setFilterOpen(!filterOpen)}
                    >
                      <SlidersHorizontal size={17} />
                      Periodo
                      {(from || to) && <span className="ws-filter-dot" />}
                    </Action>
                  </div>
                  {filterOpen && (
                    <div className="ws-period-filter">
                      <label>
                        Anno da
                        <input
                          inputMode="numeric"
                          value={from}
                          onChange={(e) => setFrom(e.target.value)}
                          placeholder="2018"
                        />
                      </label>
                      <span>—</span>
                      <label>
                        Anno a
                        <input
                          inputMode="numeric"
                          value={to}
                          onChange={(e) => setTo(e.target.value)}
                          placeholder="2020"
                        />
                      </label>
                      <p>
                        Per le date incerte includiamo i documenti con un
                        periodo sovrapposto.
                      </p>
                    </div>
                  )}
                  <div
                    className="ws-library-tabs"
                    role="group"
                    aria-label="Tipo di documento"
                  >
                    {[
                      ["", "Tutti"],
                      ["contratto", "Contratti"],
                      ["tecnico", "Tecnici"],
                      ["bolletta", "Utenze"],
                    ].map(([v, label]) => (
                      <button
                        key={v}
                        aria-pressed={docType === v}
                        onClick={() => setDocType(v)}
                      >
                        {label}
                      </button>
                    ))}
                    <span>{availableDocs.length} documenti</span>
                  </div>
                  {availableDocs.length ? (
                    availableDocs.map(docRow)
                  ) : (
                    <Empty title="Nessun documento in questo contesto">
                      Prova a cambiare ricerca o periodo. I documenti non
                      autorizzati non compaiono nei risultati.
                    </Empty>
                  )}
                  {hasVisit && (
                    <section className="ws-client-screen">
                      <div>
                        <span className="ws-eyebrow">
                          RIEPILOGO CLIENTE · SCHERMO LOCALE SIMULATO
                        </span>
                        <h2>
                          {sharedV
                            ? "Una selezione condivisa, con cura."
                            : "Scegli tu cosa mostrare."}
                        </h2>
                        <p>
                          {sharedV
                            ? sharedV.text
                            : "Apri un documento e scegli “Mostra al cliente”. Qui comparirà soltanto quella versione, per questa visita."}
                        </p>
                      </div>
                      <Eye size={30} strokeWidth={1.2} />
                    </section>
                  )}
                  {availableDocs.some((d) => d.id === "tecnico-alfa") && (
                    <section className="ws-work-history">
                      <div className="ws-section-head">
                        <h2>La storia di Casa Luce</h2>
                        <Status>Fonti sintetiche</Status>
                      </div>
                      <div className="ws-history-line">
                        <span>2018–2020</span>
                        <i />
                        <div>
                          <strong>Intervento sull’impianto elettrico</strong>
                          <p>
                            Relazione documentata da facsimile · data originale
                            incerta. Controllo specialistico non effettuato.
                          </p>
                        </div>
                      </div>
                      <div className="ws-history-line">
                        <span>2026</span>
                        <i />
                        <div>
                          <strong>Verifica di manutenzione</strong>
                          <p>
                            Pianificata, non eseguita. Una segnalazione chiusa
                            senza intervento non diventa un lavoro concluso.
                          </p>
                        </div>
                      </div>
                    </section>
                  )}
                </>
              )}
              {view === "people" && (
                <>
                  {header(
                    "PERSONE, NON SOLTANTO ANAGRAFICHE",
                    "Il rapporto fa la differenza.",
                    "Ogni persona ha il proprio accesso e un legame preciso con la casa.",
                  )}{" "}
                  {canPrepare ? (
                    ["Cliente 01", "Proprietario 02"].map((name, i) => (
                      <button
                        className="ws-person-row"
                        key={name}
                        onClick={() => setModal(i ? "owner" : "person")}
                      >
                        <span className={`ws-avatar large ${i ? "" : "peach"}`}>
                          {i ? "P2" : "C1"}
                        </span>
                        <span>
                          <strong>{name}</strong>
                          <small>
                            {i ? "Proprietario" : "Conduttore"} · Casa Luce ·
                            contratto A01
                          </small>
                        </span>
                        <Status tone={ready ? "green" : "amber"}>
                          {ready ? "Accesso predisposto" : "In preparazione"}
                        </Status>
                        <ArrowUpRight size={18} />
                      </button>
                    ))
                  ) : (
                    <Empty title="Persone non disponibili">
                      Il ruolo globale non autorizza a consultare anagrafiche di
                      altre agenzie.
                    </Empty>
                  )}
                </>
              )}
              {view === "houses" && (
                <>
                  {header(
                    personal
                      ? "LE CASE CHE TI RIGUARDANO"
                      : "IMMOBILI NEL TUO MANDATO",
                    "Una casa, tutte le sue relazioni.",
                    "Il contesto tiene insieme persone, documenti e attività, senza confondere i rispettivi accessi.",
                  )}
                  <div className="ws-house-list expanded">
                    {houses
                      .filter((h) =>
                        operator
                          ? search(
                              s,
                              {},
                              { purpose: "attivazione", property: h.id },
                            ).length > 0
                          : search(
                              s,
                              {},
                              {
                                purpose:
                                  h.id === "casa-propria"
                                    ? "utenze"
                                    : "storico",
                                property: h.id,
                              },
                            ).length > 0,
                      )
                      .map((h) => (
                        <section className="ws-house-expanded" key={h.id}>
                          <img
                            src={asset(`images/${h.image}`)}
                            alt={`Interno di esempio di ${h.name}`}
                          />
                          <div>
                            <span className="ws-eyebrow">{h.caption}</span>
                            <h2>{h.name}</h2>
                            <p>
                              {h.id === "casa-alfa"
                                ? "Cliente 01 · conduttore / Proprietario 02 · locatore"
                                : "Cliente 01 · utenza intestata nella casa propria"}
                            </p>
                            <div className="ws-house-actions">
                              <Action
                                secondary
                                onClick={() => {
                                  setQuery("");
                                  setDocType("");
                                  go("documents");
                                }}
                              >
                                Documenti
                                <ArrowUpRight size={16} />
                              </Action>
                              {personal && (
                                <Action
                                  quiet
                                  onClick={() => {
                                    setHouse(h.id);
                                    go("utilities");
                                  }}
                                >
                                  Utenze
                                  <ArrowRight size={15} />
                                </Action>
                              )}
                            </div>
                            <details>
                              <summary>Relazioni e titoli di accesso</summary>
                              <p>
                                {h.id === "casa-alfa"
                                  ? s.relationEnded
                                    ? "Rapporto concluso: restano solo gli eventuali titoli autonomi validi."
                                    : "Locazione dal 1 ottobre 2026 al 1 ottobre 2027 (fine esclusa). Fonte: contratto facsimile."
                                  : "Intestazione utenza: Cliente 01. Scopo e periodo determinano i documenti leggibili."}{" "}
                                Proprietà e occupazione non trasferiscono le
                                bollette personali di altri.
                              </p>
                            </details>
                          </div>
                        </section>
                      ))}
                  </div>
                </>
              )}
              {view === "utilities" && (
                <>
                  {header(
                    "IMPORTI E SCADENZE, SENZA CONFUSIONE",
                    "Le utenze della tua casa.",
                    "Solo le bollette della tua intestazione o di una delega valida. Qui non si eseguono pagamenti.",
                  )}
                  <div
                    className="ws-choice-pills"
                    aria-label="Casa delle utenze"
                  >
                    {houses.map((h) => (
                      <button
                        key={h.id}
                        aria-pressed={house === h.id}
                        onClick={() => setHouse(h.id)}
                      >
                        {h.name}
                        <small>
                          {h.id === "casa-propria"
                            ? "Casa propria"
                            : "Casa locata"}
                        </small>
                      </button>
                    ))}
                  </div>
                  {search(
                    s,
                    { type: "bolletta" },
                    { purpose: "utenze", property: house },
                  ).map((doc) => (
                    <section className="ws-bill" key={doc.id}>
                      <div>
                        <span className="ws-eyebrow">
                          ENERGIA · OTTOBRE 2026
                        </span>
                        <h2>Energia Esempio</h2>
                        <p>
                          {house === "casa-propria"
                            ? "Casa Atelier"
                            : "Casa Luce"}{" "}
                          · intestatario Cliente 01
                        </p>
                        <Status tone="amber">Incasso non verificato</Status>
                      </div>
                      <div className="ws-bill-amount">
                        <span>Importo del facsimile</span>
                        <strong>
                          {house === "casa-propria" ? "61" : "84"},00 €
                        </strong>
                        <small>
                          Scadenza {house === "casa-propria" ? "29" : "31"}{" "}
                          ottobre 2026
                        </small>
                      </div>
                      <div className="ws-bill-footer">
                        <Action secondary onClick={() => openDocument(doc)}>
                          Apri bolletta
                          <ArrowUpRight size={16} />
                        </Action>
                        <span>
                          <ShieldCheck size={15} />
                          Nessun pagamento disponibile
                        </span>
                      </div>
                      <details>
                        <summary>Codice e QR di esempio</summary>
                        <div className="ws-qr">
                          <svg
                            role="img"
                            aria-label="QR facsimile non pagabile"
                            viewBox="0 0 100 100"
                          >
                            <path
                              fill="currentColor"
                              d="M5 5h30v30H5zM65 5h30v30H65zM5 65h30v30H5zM50 46h12v14H50zM72 65h10v20H72z"
                            />
                            <path
                              stroke="#a0442d"
                              strokeWidth="12"
                              d="M0 50h100"
                            />
                            <text
                              x="50"
                              y="53"
                              fontSize="8"
                              textAnchor="middle"
                              fill="white"
                            >
                              FACSIMILE
                            </text>
                          </svg>
                          <p>
                            Codice dimostrativo non utilizzabile. Visualizzare o
                            scansionare una bolletta non significa pagarla.
                          </p>
                        </div>
                      </details>
                    </section>
                  ))}
                  {!search(
                    s,
                    { type: "bolletta" },
                    { purpose: "utenze", property: house },
                  ).length && (
                    <Empty title="Nessuna bolletta disponibile">
                      La casa selezionata non concede accesso alle bollette
                      private di un’altra persona.
                    </Empty>
                  )}
                </>
              )}
              {view === "rent" && (
                <>
                  {header(
                    canOperate(s)
                      ? "CASA LUCE · CONTRATTO A01"
                      : "AFFITTO E SCADENZE",
                    "Un importo, uno stato chiaro.",
                    "Evidenza, dichiarazione, riscontro e quietanza restano passaggi distinti. Nessun denaro viene movimentato.",
                  )}{" "}
                  {!canOperate(s) ? (
                    <Empty title="Operazioni sul rapporto non disponibili">
                      Il rapporto è concluso o manca un titolo valido. Gli
                      eventuali documenti storici restano nei propri accessi.
                    </Empty>
                  ) : (
                    <>
                      <div className="ws-rent-summary">
                        <div>
                          <span>Canone di ottobre · esempio</span>
                          <strong>900,00 €</strong>
                          <small>
                            Dovuto al proprietario · nessuna quota EECard
                            inclusa
                          </small>
                        </div>
                        <div>
                          <span>Incasso verificato</span>
                          <strong>
                            {u.ledger.verified.toFixed(2).replace(".", ",")} €
                          </strong>
                          <small>
                            {u.ledger.source || "Nessuna fonte registrata"}
                          </small>
                        </div>
                        <div>
                          <span>Residuo</span>
                          <strong>
                            {(900 - u.ledger.verified)
                              .toFixed(2)
                              .replace(".", ",")}{" "}
                            €
                          </strong>
                          <Status
                            tone={u.ledger.verified === 900 ? "green" : "amber"}
                          >
                            {u.ledger.verified === 900
                              ? "Coperto"
                              : u.ledger.verified
                                ? "Parziale"
                                : "Da verificare"}
                          </Status>
                        </div>
                      </div>
                      <ol className="ws-payment-flow">
                        {[
                          {
                            title: "Documento collegato",
                            value: u.ledger.evidence
                              ? "Facsimile presente"
                              : "Nessuna evidenza",
                            done: u.ledger.evidence,
                            action:
                              s.actor === "person-alfa" ? (
                                <Action
                                  secondary
                                  onClick={() =>
                                    workAction({ type: "evidence" })
                                  }
                                >
                                  Collega evidenza di esempio
                                </Action>
                              ) : null,
                          },
                          {
                            title: "Pagamento dichiarato",
                            value: u.ledger.declared
                              ? `${u.ledger.declared} € dichiarati dal conduttore`
                              : "In attesa della dichiarazione",
                            done: u.ledger.declared > 0,
                            action:
                              s.actor === "person-alfa" ? (
                                <Action
                                  secondary
                                  onClick={() => {
                                    setAmount("");
                                    setModal("declare");
                                  }}
                                >
                                  Dichiara un pagamento
                                </Action>
                              ) : null,
                          },
                          {
                            title: "Incasso verificato",
                            value: u.ledger.verified
                              ? `${u.ledger.verified} € · ${u.ledger.source}`
                              : "Un’evidenza non conferma l’incasso",
                            done: u.ledger.verified > 0,
                            action:
                              operator || s.actor === "owner-alfa" ? (
                                <Action
                                  secondary
                                  onClick={() => {
                                    setAmount("");
                                    setSource("");
                                    setModal("verify");
                                  }}
                                >
                                  Registra riscontro di esempio
                                </Action>
                              ) : null,
                          },
                          {
                            title: "Quietanza",
                            value: u.ledger.receipt
                              ? "Facsimile preparato per il solo importo verificato"
                              : "Documento separato dal riscontro",
                            done: u.ledger.receipt,
                            action:
                              operator || s.actor === "owner-alfa" ? (
                                <Action
                                  secondary
                                  disabled={!u.ledger.verified}
                                  onClick={() =>
                                    workAction({ type: "receipt" })
                                  }
                                >
                                  Prepara quietanza facsimile
                                </Action>
                              ) : null,
                          },
                        ].map((a, i) => (
                          <li key={a.title}>
                            <span className={a.done ? "done" : ""}>
                              {a.done ? <Check size={16} /> : i + 1}
                            </span>
                            <div>
                              <strong>{a.title}</strong>
                              <p>{a.value}</p>
                              {a.action}
                            </div>
                          </li>
                        ))}
                      </ol>
                      <p className="ws-small">
                        Una quietanza parziale non azzera il residuo. La
                        verifica è un evento sintetico attribuito alla sessione
                        corrente.
                      </p>
                    </>
                  )}
                </>
              )}
              {view === "support" && (
                <>
                  {header(
                    "UNA RICHIESTA, UN RIFERIMENTO",
                    "Prendiamoci cura di casa.",
                    "Descrivi un problema e segui la richiesta nel tempo. L’apertura non autorizza spese o interventi.",
                    <Action
                      disabled={!canOperate(s)}
                      onClick={() => {
                        setSubject("");
                        setDetail("");
                        setModal("request");
                      }}
                    >
                      <Plus size={17} />
                      Nuova richiesta
                    </Action>,
                  )}
                  {openRequests.length ? (
                    openRequests.map((r) => (
                      <div className="ws-support-row" key={r.id}>
                        <Glyph icon={Wrench} />
                        <div>
                          <strong>{r.subject}</strong>
                          <p>{r.detail}</p>
                          <small>
                            Casa Luce · {r.id} · {labels[r.author]}
                          </small>
                        </div>
                        <Status
                          tone={r.status === "Conclusa" ? "green" : "amber"}
                        >
                          {r.status}
                        </Status>
                        {canPrepare && r.status !== "Conclusa" && (
                          <Action
                            secondary
                            onClick={() =>
                              workAction({ type: "work", id: r.id })
                            }
                          >
                            {r.status === "Ricevuta"
                              ? "Prendi in carico"
                              : "Chiudi richiesta"}
                          </Action>
                        )}
                      </div>
                    ))
                  ) : (
                    <Empty
                      title="Nessuna richiesta aperta"
                      action={
                        canOperate(s) ? "Descrivi il problema" : undefined
                      }
                      onClick={() => setModal("request")}
                    >
                      {canOperate(s)
                        ? "Quando serve una mano, parti da qui. La richiesta rimane locale e nessun tecnico viene contattato."
                        : "Serve un rapporto attivo per aprire una nuova richiesta."}
                    </Empty>
                  )}
                </>
              )}
              {view === "drafts" && (
                <>
                  {header(
                    "DAL FASCICOLO ALLA PRIMA STESURA",
                    "Una bozza, con le sue fonti.",
                    "Compila un template con i dati della pratica. I mancanti restano visibili e la revisione rimane umana.",
                  )}{" "}
                  {!canPrepare ? (
                    <Empty title="Modello non disponibile">
                      La compilazione richiede un mandato sul contratto e sulla
                      pratica.
                    </Empty>
                  ) : (
                    <div className="ws-draft-layout">
                      <section>
                        <div className="ws-template">
                          <span className="ws-template-icon">
                            <NotebookPen size={28} />
                          </span>
                          <div>
                            <span className="ws-eyebrow">
                              TEMPLATE T01 · VERSIONE 1
                            </span>
                            <h2>Locazione abitativa</h2>
                            <p>
                              Modello sintetico per Casa Luce.
                              <br />
                              Nessun valore legale, firma o registrazione.
                            </p>
                          </div>
                          <Action
                            onClick={() =>
                              run({
                                type: "generate",
                                key: `workspace-draft-${s.draft.length + 1}`,
                              })
                            }
                          >
                            {draft
                              ? "Crea nuova versione"
                              : "Compila dai dati della pratica"}
                            <ArrowRight size={16} />
                          </Action>
                        </div>
                        {draft && (
                          <article className="ws-draft-paper">
                            <span className="ws-paper-kicker">
                              BOZZA · VERSIONE {draft.version}
                            </span>
                            <h2>Locazione abitativa</h2>
                            <p>{draft.text}</p>
                            <hr />
                            <h3>Fonti della compilazione</h3>
                            {draft.sources.map((source) => (
                              <p className="ws-source-line" key={source}>
                                <Link2 size={14} />
                                {source}
                              </p>
                            ))}
                            <p className="ws-small">
                              Le versioni precedenti rimangono conservate:{" "}
                              {s.draft.length}. Nessun suggerimento generato da
                              AI.
                            </p>
                          </article>
                        )}
                      </section>
                      <aside className="ws-review-panel">
                        <h3>Prima di considerarla pronta</h3>
                        <div>
                          <span>Dati mancanti</span>
                          <strong>
                            {draft?.missing.length ??
                              (!s.practice.supplied ? 1 : 0)}
                          </strong>
                        </div>
                        <div>
                          <span>Conflitti nelle fonti</span>
                          <strong>
                            {draft?.conflicts.length ??
                              (!s.practice.corrected ? 1 : 0)}
                          </strong>
                        </div>
                        {draft?.missing.map((v) => (
                          <p className="ws-inline-error" key={v}>
                            {v}
                          </p>
                        ))}
                        {draft?.conflicts.map((v) => (
                          <p className="ws-inline-error" key={v}>
                            {v}
                          </p>
                        ))}
                        <p>
                          {draft?.reviewed &&
                          draft.sourceRevision === s.practice.revision
                            ? "Revisionata dall’operatore demo. Non firmata."
                            : "Il revisore controlla dati e fonti, senza completare ciò che manca per deduzione."}
                        </p>
                        <Action
                          secondary
                          disabled={
                            !draft ||
                            !!draft.missing.length ||
                            !!draft.conflicts.length ||
                            draft.sourceRevision !== s.practice.revision
                          }
                          onClick={() =>
                            run({
                              type: "review",
                              key: `workspace-review-${draft?.version}`,
                            })
                          }
                        >
                          Registra revisione di esempio
                        </Action>
                        <span className="ws-review-signature">
                          <ShieldCheck size={15} />
                          Firma: non eseguita
                        </span>
                      </aside>
                    </div>
                  )}
                </>
              )}
            </>
          )}
          <footer className="ws-footer">
            <span>EECard · nome provvisorio</span>
            <span>Ambiente locale dimostrativo · nessuna operazione reale</span>
            <button onClick={() => setTools(true)}>
              Strumenti della prova
              <SlidersHorizontal size={13} />
            </button>
          </footer>
        </main>
      </div>
      <nav className="ws-mobile-nav" aria-label="Navigazione rapida">
        {[
          {
            id: "overview",
            icon: Home,
            label: operator ? "Panoramica" : "Il mio spazio",
          },
          {
            id: operator ? "practices" : "documents",
            icon: operator ? FolderOpen : FileText,
            label: operator ? "Pratiche" : "Documenti",
          },
          {
            id: operator ? "desk" : "support",
            icon: operator ? ScanLine : Wrench,
            label: operator ? "Al banco" : "Assistenza",
          },
        ].map(({ id, icon: Icon, label }) => (
          <a
            key={id}
            href={`#/spazio/${id}`}
            aria-current={view === id ? "page" : undefined}
          >
            <Icon size={21} strokeWidth={1.6} />
            <span>{label}</span>
          </a>
        ))}
        <button onClick={() => setModal("navigation")} aria-expanded={menu}>
          <MoreHorizontal size={22} />
          <span>Altro</span>
        </button>
      </nav>
      <Modal
        open={!!modal || tools}
        onClose={() => {
          setModal(null);
          setTools(false);
        }}
        title={
          tools
            ? "Strumenti della prova"
            : modal === "navigation"
              ? "Il tuo spazio"
              : modal === "date"
                ? "Quale data confermiamo?"
                : modal === "attachment"
                  ? "Completa il fascicolo"
                  : modal === "document"
                    ? d?.title.replace(" · facsimile", "") || "Documento"
                    : modal === "workspace"
                      ? "Scegli lo spazio da esplorare"
                      : modal === "block-card"
                        ? "Blocca la tessera"
                        : modal === "card"
                          ? "La tua tessera servizi"
                          : modal === "search"
                            ? "Cosa vuoi ritrovare?"
                            : modal === "request"
                              ? "Una nuova richiesta"
                              : modal === "declare"
                                ? "Dichiara un pagamento"
                                : modal === "verify"
                                  ? "Registra un riscontro"
                                  : modal === "owner"
                                    ? "Proprietario 02"
                                    : "Cliente 01"
        }
        description={
          tools
            ? "Scenari sintetici, reset e note anonime. Questi controlli non fanno parte del lavoro quotidiano."
            : modal === "document"
              ? "Facsimile locale. Lettura, consegna ed esportazione sono azioni distinte."
              : "Tutti i dati e le operazioni di questo ambiente sono dimostrativi."
        }
      >
        <div className="ws-modal-content">
          {feedback && !feedback.ok && (
            <div className="ws-feedback warning" role="alert">
              {feedback.text}
            </div>
          )}
          {modal === "navigation" && (
            <nav
              className="ws-workspace-choices"
              aria-label="Menu della piattaforma"
            >
              {nav.map(({ id, label, icon: Icon }) => (
                <button key={id} onClick={() => go(id)}>
                  <Glyph icon={Icon} />
                  <span>
                    <strong>{label}</strong>
                  </span>
                  <ArrowRight size={16} />
                </button>
              ))}
              <button
                onClick={() => {
                  setModal(null);
                  setTools(true);
                }}
              >
                <Glyph icon={SlidersHorizontal} />
                <span>
                  <strong>Strumenti della demo</strong>
                </span>
                <ArrowRight size={16} />
              </button>
            </nav>
          )}
          {tools && (
            <>
              <label>
                Scenario della prova
                <select
                  value={s.scenario}
                  onChange={(e) => reset(e.target.value as Scenario)}
                >
                  {Object.entries(scenarios).map(([v, label]) => (
                    <option key={v} value={v}>
                      {label}
                    </option>
                  ))}
                </select>
              </label>
              <label>
                Attore e contesto
                <select
                  value={s.actor}
                  onChange={(e) => switchActor(e.target.value)}
                >
                  {Object.entries(labels).map(([v, label]) => (
                    <option key={v} value={v}>
                      {label} · {v === "op-beta" ? "Beta" : "Alfa"}
                    </option>
                  ))}
                </select>
              </label>
              <p className="ws-small">
                {s.storageNotice} Le visite richiedono una nuova conferma alla
                ricarica. Le note sono vuote nei sorgenti e rimangono in questo
                browser.
              </p>
              <div className="ws-modal-actions">
                <Action secondary onClick={() => reset(s.scenario)}>
                  Ripristina scenario
                </Action>
                <Action
                  quiet
                  onClick={() => {
                    run({ type: s.operatorAuthenticated ? "logout" : "login" });
                    setTools(false);
                  }}
                >
                  {s.operatorAuthenticated
                    ? "Chiudi sessione"
                    : "Rientra nella demo"}
                </Action>
              </div>
              <details>
                <summary>Note e registro locale</summary>
                <label>
                  Note anonime
                  <textarea
                    rows={4}
                    value={s.notes}
                    onChange={(e) =>
                      set((v) => ({ ...v, notes: e.target.value }))
                    }
                    placeholder="Non inserire nomi, recapiti o documenti reali."
                  />
                </label>
                <Action
                  secondary
                  onClick={() =>
                    saveFile("prova-anonima-locale.json", {
                      synthetic: true,
                      scenario: s.scenario,
                      notes: s.notes,
                      completed: s.completed,
                    })
                  }
                >
                  Esporta note locali
                  <Download size={15} />
                </Action>
                <ol className="ws-audit">
                  {s.events
                    .filter((e) => e.agency === s.agency)
                    .map((e) => (
                      <li key={e.sequence}>
                        {e.sequence} · {labels[e.actor]} · {e.action} ·{" "}
                        {e.object} · {e.outcome}
                      </li>
                    ))}
                  {u.events
                    .filter((e) => e.agency === s.agency)
                    .map((e) => (
                      <li key={`work-${e.sequence}`}>
                        Attività {e.sequence} · {labels[e.actor]} · {e.action} ·{" "}
                        {e.outcome}
                      </li>
                    ))}
                </ol>
              </details>
              <details>
                <summary>Eventi indipendenti</summary>
                <p>
                  Rapporto: {s.relationEnded ? "concluso" : "attivo"} ·
                  adesione: {s.practice.membership} · card: {s.practice.card}.
                </p>
                <div className="ws-modal-actions">
                  <Action
                    secondary
                    onClick={() =>
                      run({ type: "endRelation", key: "workspace-end" })
                    }
                  >
                    Termina rapporto di esempio
                  </Action>
                  <Action
                    secondary
                    onClick={() =>
                      run({
                        type: "endMembership",
                        key: "workspace-membership",
                      })
                    }
                  >
                    Termina adesione di esempio
                  </Action>
                  <Action
                    secondary
                    onClick={() =>
                      run({ type: "revokeTitle", id: "storico-autonomo" })
                    }
                  >
                    Revoca titolo autonomo
                  </Action>
                </div>
              </details>
              <a className="ws-text-link" href="#/laboratorio">
                Apri il laboratorio tecnico 0.4
                <ArrowUpRight size={14} />
              </a>
            </>
          )}
          {modal === "workspace" && (
            <div className="ws-workspace-choices">
              {[
                {
                  actor: "op-alfa",
                  icon: Building2,
                  title: "Spazio agenzia",
                  body: "Prepara pratiche, accogli le persone e ritrova i fascicoli.",
                },
                {
                  actor: "person-alfa",
                  icon: ContactRound,
                  title: "Spazio personale",
                  body: "La tessera, i documenti e le richieste che riguardano casa.",
                },
                {
                  actor: "owner-alfa",
                  icon: Home,
                  title: "Vista proprietario",
                  body: "Il rapporto di locazione, senza le bollette private dell’inquilino.",
                },
                {
                  actor: "tech-alfa",
                  icon: Wrench,
                  title: "Vista tecnico",
                  body: "Solo l’incarico e gli allegati autorizzati.",
                },
              ].map(({ actor, icon: Icon, title, body }) => (
                <button key={actor} onClick={() => switchActor(actor)}>
                  <Glyph icon={Icon} />
                  <span>
                    <strong>{title}</strong>
                    <small>{body}</small>
                  </span>
                  <ArrowRight size={18} />
                </button>
              ))}
            </div>
          )}
          {modal === "date" && (
            <>
              <p>
                Il contratto e l’appunto indicano due giorni diversi. Conferma
                la fonte pertinente: non scegliamo automaticamente il dato più
                recente.
              </p>
              <div className="ws-source-comparison">
                <div>
                  <Status tone="green">Fonte A · contratto v1</Status>
                  <strong>1 ottobre 2026</strong>
                  <span>Facsimile contrattuale acquisito nella pratica</span>
                </div>
                <div>
                  <Status tone="amber">Fonte B · appunto</Status>
                  <strong>2 ottobre 2026</strong>
                  <span>
                    Appunto sintetico: da correggere, non da cancellare
                  </span>
                </div>
              </div>
              <Action
                onClick={() => {
                  const r = run({ type: "correct", key: "workspace-date" });
                  if (r.ok) setModal(null);
                }}
              >
                Conferma la data del contratto
                <Check size={17} />
              </Action>
              <p className="ws-small">
                La correzione viene attribuita a {labels[s.actor]}. Entrambe le
                fonti rimangono nella storia della pratica.
              </p>
            </>
          )}
          {modal === "attachment" && (
            <>
              <div className="ws-upload-fixture">
                <FileText size={35} strokeWidth={1.2} />
                <h3>Verifica del rapporto</h3>
                <p>
                  Collega il facsimile già disponibile nella raccolta sintetica.
                  Non viene caricato alcun file personale.
                </p>
                <span>
                  verifica-rapporto-esempio · fonte locale · versione 1
                </span>
              </div>
              <Action
                onClick={() => {
                  const r = run({
                    type: "supply",
                    key: "workspace-attachment",
                  });
                  if (r.ok) setModal(null);
                }}
              >
                Collega documento di esempio
                <Plus size={17} />
              </Action>
            </>
          )}
          {modal === "document" &&
            (!d || !version ? (
              <Empty title="Il documento non è più disponibile">
                Il permesso è cambiato. Non manteniamo la copia aperta dopo la
                revoca.
              </Empty>
            ) : (
              <>
                <div className="ws-document-tools">
                  <div className="ws-segmented">
                    <button
                      aria-pressed={!sourceTab}
                      onClick={() => setSourceTab(false)}
                    >
                      Documento
                    </button>
                    <button
                      aria-pressed={sourceTab}
                      onClick={() => setSourceTab(true)}
                    >
                      Fonti e revisioni
                    </button>
                  </div>
                  <label>
                    Versione
                    <select
                      aria-label="Versione del documento"
                      value={selection?.number}
                      onChange={(e) => {
                        const number = Number(e.target.value);
                        const r = run(
                          hasVisit
                            ? {
                                type: "document",
                                action: "read",
                                id: d.id,
                                version: number,
                              }
                            : {
                                type: "file",
                                action: "read",
                                id: d.id,
                                version: number,
                                purpose: documentPurpose,
                              },
                        );
                        if (r.ok) select({ id: d.id, number });
                      }}
                    >
                      {d.versions.map((v) => (
                        <option key={v.number} value={v.number}>
                          v{v.number} ·{" "}
                          {v.number === d.versions.at(-1)!.number
                            ? "corrente"
                            : "precedente"}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>
                {sourceTab ? (
                  <div className="ws-sources">
                    <div>
                      <span>Provenienza</span>
                      <strong>{version.source}</strong>
                      <small>
                        Acquisito il {version.acquired}, da {version.author}
                      </small>
                    </div>
                    <div>
                      <span>Data originale</span>
                      <strong>{d.precision}</strong>
                      <small>
                        L’acquisizione non modifica la data del documento.
                      </small>
                    </div>
                    <div>
                      <span>Correzione di questa versione</span>
                      <strong>{version.correction}</strong>
                    </div>
                    <div>
                      <span>Controllo formale</span>
                      <strong>{version.formal}</strong>
                      <small>{version.specialist}</small>
                    </div>
                  </div>
                ) : (
                  <article className="ws-paper">
                    <div className="ws-paper-top">
                      <BrandSymbol />
                      <span>
                        FASCICOLO CASA
                        <br />
                        FACSIMILE DIMOSTRATIVO
                      </span>
                    </div>
                    <span className="ws-paper-kicker">
                      {d.type.toUpperCase()} · VERSIONE {version.number}
                    </span>
                    <h2>{d.title.replace(" · facsimile", "")}</h2>
                    <p>{version.text}</p>
                    <div className="ws-paper-lines" aria-hidden="true">
                      <span />
                      <span />
                      <span />
                      <span />
                    </div>
                    <div className="ws-paper-bottom">
                      <span>
                        {d.property === "casa-alfa"
                          ? "Casa Luce · unità A01"
                          : d.property === "casa-propria"
                            ? "Casa Atelier · unità A02"
                            : "Contesto Beta"}
                      </span>
                      <span>1 / 1</span>
                    </div>
                  </article>
                )}
                <div className="ws-modal-actions">
                  {operator && hasVisit && (
                    <Action onClick={() => setSharing(!sharing)}>
                      <Eye size={16} />
                      Mostra al cliente
                    </Action>
                  )}
                  <Action
                    secondary
                    disabled={
                      !(hasVisit
                        ? allowed(s, "export", d, { desk: true })
                        : allowed(s, "export", d, { purpose: documentPurpose }))
                    }
                    onClick={() =>
                      run(
                        hasVisit
                          ? {
                              type: "document",
                              action: "export",
                              id: d.id,
                              version: version.number,
                            }
                          : {
                              type: "file",
                              action: "export",
                              id: d.id,
                              version: version.number,
                              purpose: documentPurpose,
                            },
                      )
                    }
                  >
                    <Download size={16} />
                    Esporta facsimile
                  </Action>
                </div>
                {sharing && (
                  <div className="ws-share-confirm">
                    <label>
                      Destinatario del riepilogo
                      <select
                        value={recipient}
                        onChange={(e) => setRecipient(e.target.value)}
                      >
                        <option value="">Scegli la persona confermata</option>
                        <option value="person-alfa">
                          Cliente 01 · presente all’incontro
                        </option>
                      </select>
                    </label>
                    <p>
                      Solo questa versione comparirà nel riepilogo locale, fino
                      alla chiusura della visita.
                    </p>
                    <Action
                      disabled={!recipient}
                      onClick={() => {
                        const r = run({
                          type: "document",
                          action: "share",
                          id: d.id,
                          version: version.number,
                          recipient,
                        });
                        if (r.ok) {
                          setModal(null);
                          setSharing(false);
                        }
                      }}
                    >
                      Conferma selezione
                      <Check size={16} />
                    </Action>
                  </div>
                )}
                <p className="ws-small">
                  {operator && !hasVisit
                    ? "Per mostrare un documento al cliente apri un incontro e conferma persona, scopo e contesto."
                    : "La lettura non concede automaticamente condivisione o esportazione."}
                </p>
              </>
            ))}
          {modal === "card" && (
            <>
              {card(true)}
              <div className="ws-card-details">
                <Status tone={cardState === "attiva" ? "green" : "amber"}>
                  {cardState === "attiva"
                    ? "Attiva"
                    : cardState === "revocata"
                      ? "Bloccata"
                      : "Da predisporre"}
                </Status>
                <p>
                  La tessera aiuta l’agenzia a ritrovarti. I documenti dipendono
                  dai tuoi rapporti e permessi, anche se la tessera viene
                  bloccata.
                </p>
                <div className="ws-modal-actions">
                  <Action secondary onClick={() => setShowCode(!showCode)}>
                    {showCode ? "Nascondi codice" : "Mostra codice di esempio"}
                    <ContactRound size={17} />
                  </Action>
                  <Action
                    quiet
                    disabled={
                      !accountReady ||
                      cardState === "revocata" ||
                      !["person-alfa", "owner-alfa"].includes(s.actor)
                    }
                    onClick={() => setModal("block-card")}
                  >
                    Blocca tessera
                  </Action>
                </div>
                {showCode && (
                  <code className="ws-display-code">
                    {s.actor === "owner-alfa"
                      ? "PROPRIETARIO · ANTEPRIMA LOCALE"
                      : "DEMO-ALFA-01"}
                  </code>
                )}
                <details>
                  <summary>Anteprima wallet simulata</summary>
                  <p>
                    Questa tessera è una rappresentazione locale. Nessun pass,
                    NFC o wallet è attivato.
                  </p>
                </details>
              </div>
            </>
          )}
          {modal === "block-card" && (
            <>
              <p>
                La tessera non potrà più essere usata per selezionarti al banco.
                Il rapporto, l’account e i documenti autorizzati rimangono
                separati.
              </p>
              <Action
                onClick={() => {
                  const r =
                    s.actor === "owner-alfa"
                      ? workAction({ type: "blockOwnerCard" })
                      : run({ type: "blockOwnCard" });
                  if (r.ok) setModal("card");
                }}
              >
                Conferma blocco della tessera
              </Action>
            </>
          )}
          {modal === "search" && (
            <>
              <label className="ws-library-search">
                <Search size={20} />
                <span className="sr-only">Ricerca rapida</span>
                <input
                  type="search"
                  value={globalQuery}
                  onChange={(e) => setGlobalQuery(e.target.value)}
                  placeholder="Un nome, un contratto, un impianto…"
                  autoFocus
                />
              </label>
              {canPrepare &&
                (!globalQuery ||
                  "cliente 01".includes(globalQuery.toLowerCase())) && (
                  <button
                    className="ws-search-result"
                    onClick={() => setModal("person")}
                  >
                    <Glyph icon={UserRound} />
                    <span>
                      <strong>Cliente 01</strong>
                      <small>Conduttore · Casa Luce</small>
                    </span>
                    <ArrowRight size={16} />
                  </button>
                )}
              {globalDocs.map(docRow)}
              {!globalDocs.length && (
                <p className="ws-small">
                  Nessun documento corrispondente nel tuo contesto.
                </p>
              )}
            </>
          )}
          {(modal === "person" || modal === "owner") && (
            <>
              <div className="ws-person-detail">
                <span className="ws-avatar extra">
                  {modal === "person" ? "C1" : "P2"}
                </span>
                <Status tone={ready ? "green" : "amber"}>
                  {ready ? "Accesso predisposto" : "Accesso in preparazione"}
                </Status>
              </div>
              <div className="ws-sources">
                <div>
                  <span>Rapporto</span>
                  <strong>
                    {modal === "person" ? "Conduttore" : "Proprietario"} · Casa
                    Luce
                  </strong>
                  <small>
                    Dal 1 ottobre 2026 al 1 ottobre 2027 · contratto A01
                  </small>
                </div>
                <div>
                  <span>Accesso</span>
                  <strong>Contratto e documenti pertinenti</strong>
                  <small>
                    Documenti personali e bollette altrui restano esclusi.
                  </small>
                </div>
              </div>
              <Action onClick={() => go("practice")}>
                Apri pratica
                <ArrowRight size={16} />
              </Action>
            </>
          )}
          {modal === "request" && (
            <form
              className="ws-field-stack"
              onSubmit={(e) => {
                e.preventDefault();
                workAction({ type: "request", subject, detail });
              }}
            >
              <label>
                Casa
                <input readOnly value="Casa Luce · Unità A01" />
              </label>
              <label>
                Qual è il problema?
                <input
                  required
                  maxLength={100}
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="Es. Il rubinetto perde"
                />
              </label>
              <label>
                Descrivilo brevemente
                <textarea
                  required
                  rows={4}
                  maxLength={1000}
                  value={detail}
                  onChange={(e) => setDetail(e.target.value)}
                  placeholder="Usa soltanto informazioni di esempio, senza dati personali."
                />
              </label>
              <p className="ws-small">
                La richiesta viene salvata localmente. Nessun messaggio,
                incarico o intervento viene inviato.
              </p>
              <Action type="submit">
                Salva richiesta di esempio
                <ArrowRight size={16} />
              </Action>
            </form>
          )}
          {(modal === "declare" || modal === "verify") && (
            <form
              className="ws-field-stack"
              onSubmit={(e) => {
                e.preventDefault();
                const value = Number(amount.replace(",", "."));
                workAction(
                  modal === "declare"
                    ? { type: "declare", amount: value }
                    : { type: "verify", amount: value, source },
                );
              }}
            >
              <label>
                {modal === "declare"
                  ? "Importo dichiarato (€)"
                  : "Importo verificato (€)"}
                <input
                  required
                  inputMode="decimal"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="Es. 400,00"
                />
              </label>
              {modal === "verify" && (
                <label>
                  Fonte del riscontro sintetico
                  <input
                    required
                    value={source}
                    onChange={(e) => setSource(e.target.value)}
                    placeholder="Es. Registro di cassa facsimile"
                  />
                </label>
              )}
              <p className="ws-small">
                Nessun pagamento viene eseguito. Il documento, la dichiarazione,
                l’incasso verificato e la quietanza rimangono distinti.
              </p>
              <Action type="submit">
                Registra evento di esempio
                <Check size={16} />
              </Action>
            </form>
          )}
        </div>
      </Modal>
    </div>
  );
}
