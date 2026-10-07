import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { createRoot } from "react-dom/client";
import {
  Home,
  ContactRound,
  FileText,
  Building2,
  Check,
  LockKeyhole,
  ShieldCheck,
  Play,
  Pause,
  RotateCcw,
  CircleAlert,
  Layers,
  Eye,
  X,
  Maximize2,
} from "lucide-react";
import "@fontsource-variable/manrope";
import "../src/tokens.css";
import { BrandSymbol } from "../src/components/brand";
import { properties, initialState } from "../src/data";
import salone from "../public/images/casa-salone.jpg";
import luminosa from "../public/images/casa-luminosa.jpg";
import studio from "../public/images/casa-studio.jpg";
import { Materia } from "./Materia";
import { Editoriale } from "./Editoriale";
import { Profondita } from "./Profondita";
import "./styles.css";
import "./picker.css";

type View = "home" | "card" | "affitto";
const directions = [
  {
    short: "Materia",
    title: "Materia e luce",
    thesis: "Un oggetto personale, uno spazio operativo preciso.",
    benefit:
      "La tessera è un oggetto riconoscibile e tangibile. La prossima azione vive accanto, senza contendersi l’attenzione.",
    cost: "Più equilibrata che teatrale: la sorpresa viene dai materiali e dai dettagli, non dalla scena.",
    number: "01",
  },
  {
    short: "Editoriale",
    title: "Editoriale e architettura",
    thesis: "Il ritmo di una rivista, la chiarezza di un fascicolo.",
    benefit:
      "Tipografia, fotografia e composizione asimmetrica danno al prodotto un carattere immobiliare più evidente.",
    cost: "Richiede più spazio verticale. Sul telefono la tipografia si riduce per lasciare subito visibile la tessera.",
    number: "02",
  },
  {
    short: "Profondità",
    title: "Luce e profondità",
    thesis: "La tessera emerge dalla luce; il lavoro resta chiaro.",
    benefit:
      "Un ingresso più scenografico, con una superficie scura concentrata sull’identità e piani chiari per operare.",
    cost: "Il salto tra scena scura e contenuti chiari è più marcato. Da valutare sul telefono nell’uso quotidiano.",
    number: "03",
  },
];
const phases = [
  {
    label: "Documento",
    title: "Il file è presente.",
    detail: "Una contabile allegata non conferma un pagamento.",
    actor: "Sofia Bianchi",
    role: "Inquilina",
    evidence: "bonifico-ottobre-demo.pdf",
    action: "Dichiara il pagamento demo",
  },
  {
    label: "Dichiarazione",
    title: "Dichiarato. Da verificare.",
    detail:
      "L’inquilina ha dichiarato 400,00 €. L’accredito deve essere verificato dal beneficiario o dall’agenzia delegata.",
    actor: "Sofia Bianchi",
    role: "Inquilina",
    evidence: "400,00 € · 06 ottobre 2026",
    action: "Mostra la vista del beneficiario",
  },
  {
    label: "Verifica",
    title: "Ricevuti 400,00 €.",
    detail:
      "Incasso parziale verificato. La rata resta aperta: mancano 550,00 €. La quietanza è un passaggio separato.",
    actor: "Alessandro Rossi",
    role: "Beneficiario",
    evidence: "Movimento parziale dimostrativo 001",
    action: "Genera quietanza demo",
  },
  {
    label: "Quietanza",
    title: "Una quietanza, distinta.",
    detail:
      "Facsimile relativo ai soli 400,00 € ricevuti. Restano 550,00 € da ricevere. Nessun valore fiscale o liberatorio.",
    actor: "Alessandro Rossi",
    role: "Beneficiario",
    evidence: "Q-DEMO-P1 · 400,00 €",
    action: "Ricomincia il percorso",
  },
];
const money = (n: number) =>
  new Intl.NumberFormat("it-IT", { style: "currency", currency: "EUR" }).format(
    n,
  );
const photos = [salone, luminosa, studio];
const initial = initialState();
const getParam = (key: string) => new URLSearchParams(location.search).get(key);
const defaultVariant = Math.max(
  0,
  Math.min(2, (Number(getParam("v")) || 1) - 1),
);
const defaultView = ["home", "card", "affitto"].includes(getParam("view") || "")
  ? (getParam("view") as View)
  : "home";

function Button({
  children,
  onClick,
  kind = "",
  ...props
}: {
  children: ReactNode;
  onClick?: () => void;
  kind?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={`button ${kind}`} onClick={onClick} {...props}>
      {children}
    </button>
  );
}
function Badge({ blocked = false }: { blocked?: boolean }) {
  return (
    <span className={`badge ${blocked ? "blocked" : ""}`}>
      {blocked ? <LockKeyhole size={13} /> : <Check size={13} />}{" "}
      {blocked ? "Bloccata · demo" : "Attiva · demo"}
    </span>
  );
}
function Card({
  blocked,
  longName,
  replaced = false,
}: {
  blocked: boolean;
  longName: boolean;
  replaced?: boolean;
}) {
  return (
    <div
      className={`service-card ${blocked ? "is-blocked" : ""}`}
      aria-label={`Tessera servizi ${blocked ? "bloccata" : "attiva"}, ${replaced ? "EE · 2049" : initial.cardId}`}
    >
      <div className="card-top">
        <span>Tessera servizi</span>
        <BrandSymbol className="card-logo" />
      </div>
      <BrandSymbol className="card-watermark" />
      <div className="card-body">
        <span className="card-label">Il tuo spazio, connesso.</span>
        <span className="card-mark" aria-hidden="true">
          C / 01
        </span>
      </div>
      <div className="card-bottom">
        <div>
          <span className="card-label">Intestatario</span>
          <strong>
            {longName
              ? "Aleksandra Wiśniewska-Kowalczyk"
              : properties[0].owners[0]}
          </strong>
        </div>
        <span className="card-id">
          {replaced ? "EE · 2049" : initial.cardId}
        </span>
      </div>
      {blocked && (
        <div className="card-blocked-label">
          <LockKeyhole size={14} /> Identificativo revocato
        </div>
      )}
    </div>
  );
}
function App() {
  const [variant, setVariant] = useState(defaultVariant);
  const [view, setView] = useState<View>(defaultView);
  const [critical, setCritical] = useState(getParam("state") === "critical");
  const [longName, setLongName] = useState(false);
  const [replaced, setReplaced] = useState(false);
  const [reduced, setReduced] = useState(getParam("motion") === "reduce");
  const [systemReduced, setSystemReduced] = useState(
    matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  const [phone, setPhone] = useState(false);
  const [showNotes, setShowNotes] = useState(false);
  const [phase, setPhase] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [error, setError] = useState(false);
  const [verify, setVerify] = useState(false);
  const [source, setSource] = useState("");
  const [sourceError, setSourceError] = useState(false);
  const [inputMode, setInputMode] = useState("pointer");
  const [pulse, setPulse] = useState(0);
  const mainRef = useRef<HTMLElement>(null);
  const phaseRef = useRef<HTMLDivElement>(null);
  const sourceRef = useRef<HTMLInputElement>(null);
  const pickerRef = useRef<HTMLElement>(null);
  const transitionAnimation = useRef<Animation | null>(null);
  const noMotion = reduced || systemReduced;
  const blocked = critical && !replaced;
  const direction = directions[variant];
  const actor =
    view === "affitto" && !verify ? phases[phase].actor : "Alessandro Rossi";
  const actorRole =
    view === "affitto"
      ? verify
        ? "Beneficiario"
        : phases[phase].role
      : "Proprietario";
  const Composition = [Materia, Editoriale, Profondita][variant];
  useEffect(() => {
    const media = matchMedia("(prefers-reduced-motion: reduce)");
    const cb = () => setSystemReduced(media.matches);
    media.addEventListener("change", cb);
    return () => media.removeEventListener("change", cb);
  }, []);
  useEffect(() => {
    const p = new URLSearchParams(location.search);
    p.set("v", String(variant + 1));
    p.set("view", view);
    critical ? p.set("state", "critical") : p.delete("state");
    reduced ? p.set("motion", "reduce") : p.delete("motion");
    try {
      history.replaceState(null, "", `${location.pathname}?${p}`);
    } catch {
      /* file previews can restrict History */
    }
  }, [variant, view, critical, reduced]);
  useEffect(() => {
    if (!playing) return;
    if (phase === 3) {
      setPlaying(false);
      return;
    }
    const t = setTimeout(() => {
      setVerify(false);
      setPhase((x) => x + 1);
      setPulse((x) => x + 1);
    }, 2400);
    return () => clearTimeout(t);
  }, [playing, phase]);
  useEffect(() => {
    if (noMotion) setPlaying(false);
  }, [noMotion]);
  useEffect(() => {
    if (verify) sourceRef.current?.focus();
  }, [verify]);
  useEffect(() => () => transitionAnimation.current?.cancel(), []);
  useEffect(() => {
    const key = (e: KeyboardEvent) => {
      setInputMode("keyboard");
      if (
        /^(INPUT|TEXTAREA|SELECT)$/.test((e.target as HTMLElement).tagName) ||
        (e.target as HTMLElement).isContentEditable ||
        e.metaKey ||
        e.ctrlKey ||
        e.altKey
      )
        return;
      const n = Number(e.key);
      if (n >= 1 && n <= 3) {
        changeVariant(n - 1);
      } else if (e.key === "ArrowRight") {
        changeVariant((variant + 1) % 3);
      } else if (e.key === "ArrowLeft") {
        changeVariant((variant + 2) % 3);
      } else if (e.key.toLowerCase() === "r") {
        replay();
      } else if (e.key === "Escape") {
        setShowNotes(false);
        setPlaying(false);
      }
    };
    const pointer = () => setInputMode("pointer");
    document.addEventListener("keydown", key);
    document.addEventListener("pointerdown", pointer);
    return () => {
      document.removeEventListener("keydown", key);
      document.removeEventListener("pointerdown", pointer);
    };
  }, [variant, noMotion]);
  useLayoutEffect(() => {
    const move = () => {
      const nav = pickerRef.current;
      const item = nav?.querySelector<HTMLElement>("[data-active]");
      const highlight = nav?.querySelector<HTMLElement>(
        ".proto-picker-highlight",
      );
      if (item && highlight) {
        highlight.style.width = `${item.offsetWidth}px`;
        highlight.style.transform = `translateX(${item.offsetLeft}px)`;
      }
    };
    move();
    const frame = requestAnimationFrame(() =>
      pickerRef.current?.setAttribute("data-ready", ""),
    );
    window.addEventListener("resize", move);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", move);
    };
  }, [variant]);
  useEffect(() => {
    const running = transitionAnimation.current?.playState === "running";
    const presentation =
      running && phaseRef.current ? getComputedStyle(phaseRef.current) : null;
    const start = presentation
      ? { opacity: presentation.opacity, transform: presentation.transform }
      : { opacity: 0.5, transform: "translateY(6px)" };
    transitionAnimation.current?.cancel();
    if (!phaseRef.current || inputMode === "keyboard" || pulse === 0) return;
    const node = phaseRef.current;
    transitionAnimation.current = node.animate(
      noMotion
        ? [{ opacity: 0.65 }, { opacity: 1 }]
        : [start, { opacity: 1, transform: "translateY(0px)" }],
      {
        duration: noMotion ? 120 : 160,
        easing: "cubic-bezier(0.23, 1, 0.32, 1)",
      },
    );
  }, [phase, pulse, noMotion]);
  function changeVariant(n: number) {
    setVariant(n);
    setPlaying(false);
    setError(false);
    setVerify(false);
    setPhase(0);
    setReplaced(false);
    setPulse(0);
    requestAnimationFrame(() =>
      mainRef.current?.focus({ preventScroll: true }),
    );
  }
  function navigate(next: View) {
    setView(next);
    setPlaying(false);
    setShowNotes(false);
    requestAnimationFrame(() => {
      mainRef.current?.focus({ preventScroll: true });
      window.scrollTo({ top: 0, behavior: "instant" });
      document.querySelector(".preview-frame")?.scrollTo(0, 0);
    });
  }
  function replay() {
    setView("affitto");
    setPhase(0);
    setError(false);
    setVerify(false);
    setSource("");
    setPulse((x) => x + 1);
    setPlaying(!noMotion);
    requestAnimationFrame(() =>
      mainRef.current?.focus({ preventScroll: true }),
    );
  }
  function jumpPhase(n: number) {
    setPlaying(false);
    setVerify(false);
    setError(false);
    setPhase(n);
    setPulse((x) => x + 1);
  }
  function nextPhase() {
    setPlaying(false);
    if (phase === 1) {
      setVerify(true);
      setSourceError(false);
      return;
    }
    if (phase === 3) {
      jumpPhase(0);
      return;
    }
    jumpPhase(phase + 1);
  }
  function confirmVerification() {
    if (!source.trim()) {
      setSourceError(true);
      return;
    }
    setVerify(false);
    setPhase(2);
    setPulse((x) => x + 1);
    requestAnimationFrame(() =>
      phaseRef.current?.focus({ preventScroll: true }),
    );
  }
  const cardBlock = (
    <>
      <div className="section-eyebrow">
        <span>La tua tessera</span>
        <Badge blocked={blocked} />
      </div>
      <Card blocked={blocked} longName={longName} replaced={replaced} />
      <div className="card-caption">
        <span>Accesso ai servizi</span>
        <button className="text-link" onClick={() => navigate("card")}>
          Gestisci tessera
        </button>
      </div>
      {blocked && (
        <div className="critical-inline">
          <LockKeyhole size={16} />
          <span>EE · 2048 è revocato. Apri la gestione per sostituirlo.</span>
        </div>
      )}
    </>
  );
  const welcome = (
    <div className="welcome">
      <span className="eyebrow">Martedì 6 ottobre 2026</span>
      <h1>
        Il tuo spazio,
        <br />
        <span>Alessandro.</span>
      </h1>
      <div className="welcome-meta">
        <span>Proprietario</span>
        <span>3 immobili</span>
      </div>
    </div>
  );
  const action = (
    <section className="next-action">
      <div className="action-top">
        <span className="eyebrow">Da seguire</span>
        <span className="due-tag">10 ottobre</span>
      </div>
      <div className="action-content">
        <div>
          <h2>Affitto di ottobre</h2>
          <p>Casa Tortona</p>
        </div>
        <strong>{money(950)}</strong>
      </div>
      <div
        className="mini-progress"
        role="img"
        aria-label="Documento, dichiarazione, verifica e quietanza ancora da completare"
      >
        <span />
        <span />
        <span />
        <span />
      </div>
      <div className="action-bottom">
        <span>Una rata da aggiornare</span>
        <Button onClick={() => navigate("affitto")}>Segui il percorso</Button>
      </div>
    </section>
  );
  const homes = (
    <section className="properties">
      <div className="section-heading">
        <div>
          <span className="eyebrow">I tuoi immobili</span>
          <h2>Le tue relazioni, a casa.</h2>
        </div>
        <span className="section-count">03</span>
      </div>
      <div className="property-grid">
        {properties.map((property, i) => (
          <article className="property" key={property.id}>
            <div className="property-photo">
              <img
                src={photos[i]}
                alt="Fotografia illustrativa, non dell’indirizzo demo"
              />
              <span className="property-status">{property.status}</span>
            </div>
            <div className="property-copy">
              <span className="property-index">0{i + 1}</span>
              <div>
                <h3>{property.name}</h3>
                <p>{property.address}</p>
                <span className="property-meta">
                  {property.area} m² <span>·</span> {property.rooms} locali
                </span>
              </div>
            </div>
          </article>
        ))}
      </div>
      <div className="property-footer">
        <span>Fotografie illustrative · dati dimostrativi</span>
        <span>1 richiesta di assistenza in lavorazione</span>
      </div>
    </section>
  );
  const navItems: [View, typeof Home, string][] = [
    ["home", Home, "Panoramica"],
    ["card", ContactRound, "Tessera"],
    ["affitto", FileText, "Affitto"],
  ];
  return (
    <div
      className={`lab ${noMotion ? "reduced" : ""} ${inputMode === "keyboard" ? "keyboard" : ""}`}
    >
      <a
        href="#content"
        className="skip-link"
        onClick={(e) => {
          e.preventDefault();
          mainRef.current?.focus();
        }}
      >
        Vai al contenuto
      </a>
      <div className="lab-toolbar">
        <div className="lab-id">
          <Layers size={16} />
          <span>
            Studio di design <b> / {direction.number}</b>
          </span>
        </div>
        <div className="lab-tools">
          <button
            onClick={() => setPhone(!phone)}
            aria-pressed={phone}
            className="desktop-only"
          >
            <Maximize2 size={14} />
            {phone ? "Vista libera" : "Mobile 390"}
          </button>
          <label>
            <input
              type="checkbox"
              checked={critical}
              onChange={(e) => {
                setCritical(e.target.checked);
                setReplaced(false);
              }}
            />
            Stato critico
          </label>
          <label>
            <input
              type="checkbox"
              checked={reduced || systemReduced}
              disabled={systemReduced}
              onChange={(e) => setReduced(e.target.checked)}
            />
            Movimento ridotto{systemReduced ? " · sistema" : ""}
          </label>
          <button
            onClick={() => setShowNotes(!showNotes)}
            aria-expanded={showNotes}
            aria-label="Le differenze tra le direzioni"
          >
            <Eye size={15} />
            <span className="notes-label">Le differenze</span>
          </button>
        </div>
      </div>
      <div className={`preview-frame ${phone ? "phone-frame" : ""}`}>
        <div className={`product direction-${variant + 1}`} key={variant}>
          <header className="app-header">
            <div
              className="brand-icon"
              role="img"
              aria-label="Simbolo C Legame, nome prodotto da confermare"
            >
              <BrandSymbol />
            </div>
            <span className="header-label">Il tuo spazio</span>
            <nav aria-label="Viste del prototipo" className="app-nav">
              {navItems.map(([target, Icon, label]) => (
                <button
                  key={target}
                  onClick={() => navigate(target)}
                  aria-current={view === target ? "page" : undefined}
                >
                  <Icon size={19} />
                  <span>{label}</span>
                </button>
              ))}
            </nav>
            <div className="profile">
              <span>
                {actor}
                <small>{actorRole} · demo</small>
              </span>
              <span className="avatar">
                {actor
                  .split(" ")
                  .map((x) => x[0])
                  .join("")}
              </span>
            </div>
          </header>
          <main
            id="content"
            className={`main view-${view}`}
            ref={mainRef}
            tabIndex={-1}
          >
            {view === "home" && (
              <Composition
                card={cardBlock}
                welcome={welcome}
                action={action}
                properties={homes}
              />
            )}
            {view === "card" && (
              <>
                <div className="page-heading">
                  <div>
                    <span className="eyebrow">Tessera servizi</span>
                    <h1>
                      Una chiave per
                      <br />
                      <span>il tuo spazio.</span>
                    </h1>
                  </div>
                  <Button kind="quiet" onClick={() => navigate("home")}>
                    Torna alla panoramica
                  </Button>
                </div>
                <div className="detail-grid">
                  <section className="card-stage detail-stage">
                    {cardBlock}
                    <label className="stress-control">
                      <input
                        type="checkbox"
                        checked={longName}
                        onChange={(e) => setLongName(e.target.checked)}
                      />
                      Prova un nome lungo
                    </label>
                  </section>
                  <section className="card-details">
                    <span className="eyebrow">La tua credenziale</span>
                    <h2>
                      {blocked
                        ? "Questa tessera è bloccata."
                        : "Il tuo accesso è attivo."}
                    </h2>
                    <p>
                      {blocked
                        ? "L’identificativo è revocato e non può essere riutilizzato. La sostituzione crea una tessera con un nuovo identificativo."
                        : "La tessera rende riconoscibile il tuo accesso ai servizi. Non è una carta bancaria."}
                    </p>
                    <dl>
                      <div>
                        <dt>Intestatario</dt>
                        <dd>
                          {longName
                            ? "Aleksandra Wiśniewska-Kowalczyk"
                            : "Alessandro Rossi"}
                        </dd>
                      </div>
                      <div>
                        <dt>Identificativo</dt>
                        <dd>{replaced ? "EE · 2049" : "EE · 2048"}</dd>
                      </div>
                      <div>
                        <dt>Stato</dt>
                        <dd>{blocked ? "Revocato" : "Attivo · demo"}</dd>
                      </div>
                    </dl>
                    {blocked ? (
                      <Button onClick={() => setReplaced(true)}>
                        Sostituisci tessera demo
                      </Button>
                    ) : (
                      <div className="access-note">
                        <ShieldCheck size={22} />
                        <span>
                          I permessi dipendono dalla tua relazione con ciascun
                          immobile.
                        </span>
                      </div>
                    )}
                    {replaced && (
                      <div className="success-note" role="status">
                        <Check size={18} />
                        <span>
                          Nuovo identificativo EE · 2049 attivo. Il precedente
                          EE · 2048 resta revocato.
                        </span>
                      </div>
                    )}
                    <div className="detail-footnote">
                      Simulazione locale. Nessuna tessera reale emessa.
                    </div>
                  </section>
                </div>
              </>
            )}
            {view === "affitto" && (
              <>
                <div className="page-heading">
                  <div>
                    <span className="eyebrow">Casa Tortona · Ottobre 2026</span>
                    <h1>
                      Ogni passaggio,
                      <br />
                      <span>al suo posto.</span>
                    </h1>
                  </div>
                  <div className="rent-overview">
                    <span>Canone · scadenza 10 ottobre</span>
                    <strong>{money(950)}</strong>
                    <span>Via Tortona 24, Milano</span>
                  </div>
                </div>
                <div className="demo-transport">
                  <div>
                    <span className="demo-dot" />
                    <b>Demo del processo</b>
                    <span className="transport-caption">
                      {" "}
                      Quattro eventi distinti, attori diversi.
                    </span>
                  </div>
                  <div>
                    <Button
                      kind="quiet"
                      onClick={() => (playing ? setPlaying(false) : replay())}
                    >
                      {playing ? <Pause size={15} /> : <Play size={15} />}{" "}
                      {playing
                        ? "Pausa"
                        : noMotion
                          ? "Ricomincia"
                          : "Riproduci"}
                    </Button>
                    <Button
                      kind="icon"
                      aria-label="Ripristina il processo"
                      onClick={() => jumpPhase(0)}
                    >
                      <RotateCcw size={17} />
                    </Button>
                  </div>
                </div>
                <div className="process-layout">
                  <ol className="process-steps" aria-label="Fasi dell’affitto">
                    {phases.map((s, i) => (
                      <li
                        key={s.label}
                        className={`${i === phase ? "current" : ""} ${i < phase ? "complete" : ""}`}
                      >
                        <button
                          aria-current={i === phase ? "step" : undefined}
                          onClick={() => jumpPhase(i)}
                        >
                          <span className="step-circle">
                            {i < phase ? (
                              <Check size={19} />
                            ) : (
                              String(i + 1).padStart(2, "0")
                            )}
                          </span>
                          <span>
                            <b>{s.label}</b>
                            <small>
                              {i === 0
                                ? "Il file"
                                : i === 1
                                  ? "La dichiarazione"
                                  : i === 2
                                    ? "L’accredito"
                                    : "Il documento finale"}
                            </small>
                          </span>
                        </button>
                      </li>
                    ))}
                  </ol>
                  <div className="process-body">
                    <section
                      className="phase-panel"
                      ref={phaseRef}
                      tabIndex={-1}
                    >
                      <div className="phase-top">
                        <span className="actor-avatar">
                          {(verify ? "Alessandro Rossi" : phases[phase].actor)
                            .split(" ")
                            .map((x) => x[0])
                            .join("")}
                        </span>
                        <div>
                          <span className="eyebrow">
                            {verify
                              ? "Vista beneficiario"
                              : `Vista ${phases[phase].role.toLowerCase()}`}{" "}
                            · demo
                          </span>
                          <strong>
                            {verify ? "Alessandro Rossi" : phases[phase].actor}
                          </strong>
                        </div>
                        <span className="phase-number">0{phase + 1} / 04</span>
                      </div>
                      <div className="phase-content" aria-live="polite">
                        <span className="phase-icon">
                          {phase < 2 ? (
                            <FileText size={27} />
                          ) : phase === 2 ? (
                            <ShieldCheck size={27} />
                          ) : (
                            <Check size={27} />
                          )}
                        </span>
                        <h2>
                          {verify
                            ? "Verifica l’accredito."
                            : phases[phase].title}
                        </h2>
                        <p>
                          {verify
                            ? "Serve una fonte del beneficiario, distinta dalla contabile allegata dall’inquilina."
                            : phases[phase].detail}
                        </p>
                        <div className="evidence">
                          <span>
                            {phase === 0
                              ? "Documento allegato"
                              : phase === 1
                                ? "Importo e data dichiarati"
                                : phase === 2
                                  ? "Fonte e autore della verifica"
                                  : "Quietanza demo"}
                          </span>
                          <strong>
                            {phase === 2 && source
                              ? source
                              : phases[phase].evidence}
                          </strong>
                          {phase === 2 && (
                            <small>Alessandro Rossi · beneficiario demo</small>
                          )}
                        </div>
                      </div>
                      {verify ? (
                        <form
                          className="verification-form"
                          onSubmit={(e) => {
                            e.preventDefault();
                            confirmVerification();
                          }}
                        >
                          <label htmlFor="source">Fonte della verifica</label>
                          <input
                            ref={sourceRef}
                            id="source"
                            value={source}
                            onChange={(e) => {
                              setSource(e.target.value);
                              setSourceError(false);
                            }}
                            placeholder="Riferimento del movimento"
                            aria-invalid={sourceError}
                            aria-describedby={
                              sourceError ? "source-error" : undefined
                            }
                          />
                          <button
                            type="button"
                            className="text-link"
                            onClick={() => {
                              setSource("Movimento parziale dimostrativo 001");
                              setSourceError(false);
                            }}
                          >
                            Usa la fonte demo esistente
                          </button>
                          {sourceError && (
                            <p
                              className="error-message"
                              id="source-error"
                              role="alert"
                            >
                              Inserisci una fonte prima di confermare. Nessun
                              incasso è stato verificato.
                            </p>
                          )}
                          <Button type="submit">
                            Conferma 400,00 € ricevuti
                          </Button>
                        </form>
                      ) : (
                        <div className="phase-actions">
                          {error ? (
                            <div className="error-message" role="alert">
                              <CircleAlert size={18} />
                              <div>
                                <strong>Dichiarazione non salvata.</strong>
                                <p>
                                  Il file e i dati sono conservati. Puoi
                                  riprovare.
                                </p>
                                <Button
                                  onClick={() => {
                                    setError(false);
                                    jumpPhase(1);
                                  }}
                                >
                                  Riprova
                                </Button>
                              </div>
                            </div>
                          ) : (
                            <Button onClick={nextPhase}>
                              {phases[phase].action}
                            </Button>
                          )}
                          {phase === 0 && !error && (
                            <button
                              className="text-link"
                              onClick={() => {
                                setPlaying(false);
                                setError(true);
                              }}
                            >
                              Prova errore di invio
                            </button>
                          )}
                        </div>
                      )}
                    </section>
                    <aside className="rent-ledger">
                      <div className="ledger-heading">
                        <Building2 size={20} />
                        <span>Casa Tortona</span>
                      </div>
                      <span className="eyebrow">Situazione della rata</span>
                      <div className="ledger-amount">
                        <strong>{money(phase >= 2 ? 400 : 0)}</strong>
                        <span>incasso verificato</span>
                      </div>
                      <div
                        className="amount-track"
                        role="img"
                        aria-label={
                          phase >= 2
                            ? "400 euro verificati su 950, residuo 550 euro"
                            : "Nessun importo ancora verificato"
                        }
                      >
                        <span
                          style={{
                            transform: `scaleX(${phase >= 2 ? 400 / 950 : 0})`,
                          }}
                        />
                      </div>
                      <dl>
                        <div>
                          <dt>Canone</dt>
                          <dd>{money(950)}</dd>
                        </div>
                        <div>
                          <dt>{phase >= 2 ? "Residuo" : "Da verificare"}</dt>
                          <dd>{money(phase >= 2 ? 550 : 950)}</dd>
                        </div>
                        <div>
                          <dt>Quietanza</dt>
                          <dd>
                            {phase === 3
                              ? "Rilasciata · demo"
                              : "Non rilasciata"}
                          </dd>
                        </div>
                      </dl>
                      <div className="ledger-status">
                        <CircleAlert size={16} />
                        {phase >= 2
                          ? "Rata ancora aperta"
                          : "Verifica da completare"}
                      </div>
                      <p>
                        Il documento allegato, la dichiarazione, l’incasso e la
                        quietanza restano eventi separati.
                      </p>
                    </aside>
                  </div>
                </div>
              </>
            )}
            <footer className="app-footer">
              <span>
                EECard · nome provvisorio · esplorazione {direction.number}
              </span>
              <span>
                Dati e operazioni dimostrativi · nessuna modifica alla demo
                attuale
              </span>
            </footer>
          </main>
        </div>
      </div>
      {showNotes && (
        <aside className="design-notes" aria-label="Confronto delle direzioni">
          <button
            className="notes-close"
            onClick={() => setShowNotes(false)}
            aria-label="Chiudi il confronto"
          >
            <X size={20} />
          </button>
          <span className="eyebrow">Tre esecuzioni, un’identità</span>
          <h2>{direction.title}</h2>
          <p className="notes-thesis">{direction.thesis}</p>
          <h3>Beneficio UX</h3>
          <p>{direction.benefit}</p>
          <h3>Compromesso</h3>
          <p>{direction.cost}</p>
          <div className="recommendation">
            <b>Consiglio: Materia e luce.</b>
            <p>
              Fa emergere la tessera con più carattere, mantiene leggibile la
              prossima azione e si adatta bene all’uso frequente. L’impostazione
              editoriale può arricchire gli immobili dopo una tua scelta
              esplicita.
            </p>
          </div>
          <p className="notes-foot">
            Simbolo C conservato. “Legame” non è il nome del prodotto. Nessuna
            direzione è stata integrata.
          </p>
        </aside>
      )}
      <nav
        className="proto-picker"
        aria-label="Prototype variants"
        ref={pickerRef}
      >
        <span className="proto-picker-highlight" aria-hidden="true" />
        {directions.map((d, i) => (
          <button
            key={d.short}
            className="proto-picker-item"
            data-active={variant === i ? "" : undefined}
            aria-current={variant === i ? "true" : undefined}
            onClick={() => changeVariant(i)}
          >
            {d.short}
          </button>
        ))}
        <span className="proto-picker-divider" aria-hidden="true" />
        <button
          className="proto-picker-item proto-picker-replay"
          aria-label="Replay animation (R)"
          onClick={replay}
        >
          ↻
        </button>
      </nav>
    </div>
  );
}
createRoot(document.getElementById("root")!).render(<App />);
