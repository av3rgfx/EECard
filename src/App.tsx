import { Brand } from "./components/brand";
import { useEffect, useState } from "react";
import {
  Home,
  Building2,
  Files,
  CalendarDays,
  Plug,
  Wrench,
  MessageCircle,
  CreditCard,
  Settings2,
  ChevronDown,
  ArrowUpRight,
  Menu,
  LayoutDashboard,
  type LucideIcon,
} from "lucide-react";
import { Toaster, toast } from "sonner";
import { Context, type Panel } from "./context";
import {
  readState,
  fixtureProperties,
  fixtureDocuments,
  roleLabel,
  scenarioLabels,
  type Route,
  type Scenario,
  type Role,
} from "./data";
import { NotificationBell, Empty, Button, Notice } from "./components/ui";
import {
  HomePage,
  PropertiesPage,
  DocumentsPage,
  RentPage,
  UtilitiesPage,
  AssistancePage,
  ConsultationPage,
  CardPage,
  ProfilePage,
  AgencyPage,
  AccessPage,
  DesignSystemPage,
} from "./pages";
import { Panels } from "./panels";
const navigation: { id: Route; label: string; icon: LucideIcon }[] = [
  { id: "home", label: "Panoramica", icon: Home },
  { id: "immobili", label: "I tuoi immobili", icon: Building2 },
  { id: "documenti", label: "Documenti", icon: Files },
  { id: "affitto", label: "Affitto e scadenze", icon: CalendarDays },
  { id: "utenze", label: "Utenze", icon: Plug },
  { id: "assistenza", label: "Assistenza", icon: Wrench },
  { id: "consulenze", label: "Consulenze", icon: MessageCircle },
  { id: "card", label: "La tua EECard", icon: CreditCard },
];
const titles: Record<Route, string> = {
  home: "Panoramica",
  immobili: "I tuoi immobili",
  documenti: "Documenti",
  affitto: "Affitto e scadenze",
  utenze: "Utenze",
  assistenza: "Assistenza",
  consulenze: "Consulenze",
  card: "La tua EECard",
  profilo: "Profilo e servizio",
  agenzia: "Spazio agenzia",
  accesso: "Benvenuto in EECard",
  "design-system": "Design system",
};
function getRoute(): Route {
  const key = location.hash.replace("#/", "") || "home";
  return key in titles ? (key as Route) : "home";
}
export default function App() {
  const [state, setState] = useState(readState);
  const [route, setRoute] = useState<Route>(getRoute);
  const [panel, setPanel] = useState<Panel>(null);
  const [scenario, setScenarioValue] = useState<Scenario>(() => {
    const s = new URLSearchParams(location.search).get("data");
    return s && s in scenarioLabels ? (s as Scenario) : "demo";
  });
  const houses = fixtureProperties(scenario),
    docs = fixtureDocuments(scenario).map((d) =>
      state.reviewedDocuments.includes(d.id)
        ? { ...d, status: "Controllato" }
        : d,
    );
  const roleHouses =
    state.role === "inquilino" ? houses.filter((p) => p.id === "p1") : houses;
  const activeHouses =
    state.property === "all"
      ? roleHouses
      : roleHouses.filter((p) => p.id === state.property);
  useEffect(() => {
    try {
      localStorage.setItem("eecard-demo-v1", JSON.stringify(state));
    } catch {
      toast.error(
        "Memoria locale non disponibile. La demo continua senza salvataggio.",
      );
    }
  }, [state]);
  useEffect(() => {
    const handler = () => {
      setRoute(getRoute());
      setPanel(null);
      window.scrollTo(0, 0);
    };
    window.addEventListener("hashchange", handler);
    return () => window.removeEventListener("hashchange", handler);
  }, []);
  useEffect(() => {
    document.title = `${titles[route]} · EECard`;
  }, [route]);
  function go(r: Route) {
    setPanel(null);
    if (route === r) return;
    location.hash = `/${r}`;
  }
  function setScenario(s: Scenario) {
    setScenarioValue(s);
    const url = new URL(location.href);
    if (s === "demo") url.searchParams.delete("data");
    else url.searchParams.set("data", s);
    history.replaceState(null, "", url);
  }
  function changeRole(role: Role) {
    setState((s) => ({
      ...s,
      role,
      property: role === "inquilino" ? "p1" : "all",
    }));
    go(
      role === "agenzia"
        ? "agenzia"
        : role === "tecnico"
          ? "assistenza"
          : "home",
    );
  }
  const restricted =
    state.role === "tecnico" &&
    !["assistenza", "profilo", "accesso"].includes(route);
  const operational = [
    "immobili",
    "documenti",
    "affitto",
    "utenze",
    "assistenza",
    "consulenze",
    "agenzia",
    "home",
    "card",
  ].includes(route);
  const pages: Record<Route, React.ReactNode> = {
    home: <HomePage />,
    immobili: <PropertiesPage />,
    documenti: <DocumentsPage />,
    affitto: <RentPage />,
    utenze: <UtilitiesPage />,
    assistenza: <AssistancePage />,
    consulenze: <ConsultationPage />,
    card: <CardPage />,
    profilo: <ProfilePage />,
    agenzia: <AgencyPage />,
    accesso: <AccessPage />,
    "design-system": <DesignSystemPage />,
  };
  const navItems =
    state.role === "tecnico"
      ? navigation.filter((n) => n.id === "assistenza")
      : navigation;
  return (
    <Context.Provider
      value={{
        state,
        setState,
        route,
        go,
        scenario,
        setScenario,
        houses,
        docs,
        activeHouses,
        panel,
        open: (kind, id) => setPanel({ kind, id }),
        close: () => setPanel(null),
      }}
    >
      <a className="skip-link" href="#main-content">
        Vai al contenuto
      </a>
      <div className="app-shell">
        <aside className="sidebar">
          <a
            className="brand-link"
            href="#/home"
            aria-label="EECard, panoramica"
          >
            <Brand />
          </a>
          <span className="sidebar-kicker">IL TUO SPAZIO CASA</span>
          <nav aria-label="Navigazione principale">
            {state.role === "agenzia" && (
              <a
                href="#/agenzia"
                aria-current={route === "agenzia" ? "page" : undefined}
              >
                <LayoutDashboard size={19} />
                Coda operativa
                <span className="nav-count">
                  {state.tickets.filter((t) => t.status !== "Conclusa").length}
                </span>
              </a>
            )}
            {navItems.map(({ id, label, icon: Icon }) => (
              <a
                key={id}
                href={`#/${id}`}
                aria-current={route === id ? "page" : undefined}
              >
                <Icon size={19} strokeWidth={1.7} />
                {label}
              </a>
            ))}
          </nav>
          <div className="sidebar-bottom">
            <div className="support-mini">
              <span className="support-orbit">
                <MessageCircle size={20} />
              </span>
              <strong>Una casa. Un riferimento.</strong>
              <p>Le tue richieste, sempre nello stesso posto.</p>
              <button className="text-button" onClick={() => go("assistenza")}>
                Vai all’assistenza <ArrowUpRight size={16} />
              </button>
            </div>
            <a
              className={`settings-link ${route === "profilo" ? "selected" : ""}`}
              href="#/profilo"
            >
              <Settings2 size={19} />
              Profilo e servizio
            </a>
            <button className="account" onClick={() => go("profilo")}>
              <span className="avatar">
                {state.role === "agenzia"
                  ? "EC"
                  : state.role === "inquilino"
                    ? "SB"
                    : state.role === "tecnico"
                      ? "MF"
                      : "AR"}
              </span>
              <span>
                <strong>
                  {state.role === "agenzia"
                    ? "Elena Colombo"
                    : state.role === "inquilino"
                      ? "Sofia Bianchi"
                      : state.role === "tecnico"
                        ? "Marco Ferri"
                        : "Alessandro Rossi"}
                </strong>
                <small>{roleLabel[state.role]}</small>
              </span>
              <ChevronDown size={15} />
            </button>
          </div>
        </aside>
        <div className="workspace">
          <header className="topbar">
            <a
              className="mobile-brand"
              href="#/home"
              aria-label="EECard, panoramica"
            >
              <Brand />
            </a>
            <div className="breadcrumb">
              Il tuo spazio <span>/</span>
              <strong>{titles[route]}</strong>
            </div>
            <div className="top-actions">
              <span className="demo-pill">
                <span />
                DEMO
              </span>
              <label className="role-picker">
                <span className="sr-only">Ruolo demo</span>
                <select
                  aria-label="Ruolo demo"
                  value={state.role}
                  onChange={(e) => changeRole(e.target.value as Role)}
                >
                  {Object.entries(roleLabel).map(([v, l]) => (
                    <option key={v} value={v}>
                      {l}
                    </option>
                  ))}
                </select>
                <ChevronDown size={14} />
              </label>
              <NotificationBell
                count={state.notificationsRead ? 0 : 2}
                onClick={() => setPanel({ kind: "notifications" })}
              />
            </div>
          </header>
          <main id="main-content" tabIndex={-1}>
            <div className="demo-context">
              <span>
                <span className="tiny-dot" />
                Prototipo interattivo · dati e operazioni simulati
              </span>
              <button onClick={() => go("accesso")}>
                Prova l’accesso <ArrowUpRight size={13} />
              </button>
            </div>
            {scenario !== "demo" && (
              <div className="scenario-banner">
                <span>
                  Scenario: <strong>{scenarioLabels[scenario]}</strong>
                </span>
                <button onClick={() => setScenario("demo")}>
                  Torna ai dati demo
                </button>
              </div>
            )}
            {!["accesso", "design-system"].includes(route) &&
              state.role !== "tecnico" && (
                <div className="context-row">
                  <label className="property-picker">
                    <Building2 size={17} />
                    <span className="sr-only">Immobile</span>
                    <select
                      aria-label="Immobile"
                      value={state.property}
                      onChange={(e) => {
                        setState((s) => ({ ...s, property: e.target.value }));
                        setPanel(null);
                      }}
                    >
                      {state.role !== "inquilino" && (
                        <option value="all">Tutti gli immobili</option>
                      )}
                      {roleHouses.map((p) => (
                        <option key={p.id} value={p.id}>
                          {p.name}
                        </option>
                      ))}
                    </select>
                    <ChevronDown size={14} />
                  </label>
                  <span className="date-label">Martedì 6 ottobre 2026</span>
                </div>
              )}
            {scenario === "ended" && operational && (
              <Notice>
                Contratto concluso il 30 settembre 2026. Puoi consultare i
                documenti pertinenti al rapporto terminato. Le nuove operazioni
                sono disabilitate.
              </Notice>
            )}
            {restricted ? (
              <Empty
                title="Questo spazio non fa parte dell’incarico"
                description="Il tecnico vede solo le richieste assegnate e i relativi allegati."
                action="Vai ai tuoi incarichi"
                onClick={() => go("assistenza")}
              />
            ) : scenario === "revoked" && operational ? (
              <Empty
                title="Accesso revocato"
                description="Il collegamento a questo immobile non è più attivo. Nessun documento è visibile in questo contesto."
                action="Contatta il referente demo"
                onClick={() => setPanel({ kind: "revoked-help" })}
              />
            ) : scenario === "error" && operational ? (
              <Empty
                title="Non riusciamo a caricare i dati"
                description="Le tue modifiche sono conservate. Riprova per continuare."
                action="Riprova"
                onClick={() => setScenario("demo")}
              />
            ) : scenario === "loading" && operational ? (
              <div
                role="status"
                aria-label="Caricamento in corso"
                className="loading-state"
              >
                <h1>Prepariamo il tuo spazio</h1>
                <div className="skeleton wide" />
                <div className="skeleton-grid">
                  <div className="skeleton" />
                  <div className="skeleton" />
                </div>
                <p>Caricamento dimostrativo in corso.</p>
                <Button variant="secondary" onClick={() => setScenario("demo")}>
                  Completa il caricamento demo
                </Button>
              </div>
            ) : (
              pages[route]
            )}
          </main>
          <footer className="page-footer">
            <span>EECard · La casa, connessa.</span>
            <a href="#/design-system">Design system</a>
            <span>
              Componenti{" "}
              <a href="https://rareui.com" target="_blank" rel="noreferrer">
                Rare UI
              </a>{" "}
              e{" "}
              <a href="https://animate-ui.com" target="_blank" rel="noreferrer">
                Animate UI
              </a>
            </span>
          </footer>
        </div>
        <nav className="bottom-nav" aria-label="Navigazione mobile">
          {(state.role === "tecnico"
            ? [{ id: "assistenza", label: "Incarichi", icon: Wrench }]
            : [
                {
                  id: state.role === "agenzia" ? "agenzia" : "home",
                  label: state.role === "agenzia" ? "Coda" : "Panoramica",
                  icon: Home,
                },
                { id: "documenti", label: "Documenti", icon: Files },
                { id: "assistenza", label: "Assistenza", icon: Wrench },
                { id: "card", label: "Card", icon: CreditCard },
              ]
          ).map(({ id, label, icon: Icon }) => (
            <a
              key={id}
              href={`#/${id}`}
              aria-current={route === id ? "page" : undefined}
            >
              <Icon size={21} strokeWidth={1.7} />
              <span>{label}</span>
            </a>
          ))}
          <button
            onClick={() => setPanel({ kind: "more" })}
            aria-label="Altro, apri menu"
          >
            <Menu size={21} />
            <span>Altro</span>
          </button>
        </nav>
      </div>
      <Panels />
      <Toaster position="top-center" richColors closeButton duration={4000} />
    </Context.Provider>
  );
}
