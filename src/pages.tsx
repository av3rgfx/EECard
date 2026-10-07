import { asset } from "./assets";
import {
  PaymentProgress,
  paymentPhaseNarrative,
} from "./components/payment-progress";
import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Plus,
  FileText,
  Wrench,
  CalendarDays,
  ContactRound,
  ShieldCheck,
  LockKeyhole,
  KeyRound,
  Check,
  Search,
  ChevronRight,
  ArrowDownLeft,
  CircleCheck,
  Droplets,
  Zap,
  Users,
  MessageCircle,
  X,
} from "lucide-react";
import { toast } from "sonner";
import { useApp } from "./context";
import {
  Badge,
  Button,
  Empty,
  IconBox,
  Notice,
  SectionTitle,
} from "./components/ui";
import {
  money,
  paymentLabel,
  roleLabel,
  scenarioLabels,
  type Property,
  type Scenario,
  type Doc,
} from "./data";
import { Brand, BrandSymbol } from "./components/brand";

export function PageHeading({
  eyebrow,
  title,
  description,
  action,
}: {
  eyebrow: string;
  title: string;
  description: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="page-heading">
      <div>
        <span className="eyebrow">{eyebrow}</span>
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
      {action}
    </div>
  );
}
export function DigitalCard({ compact = false }: { compact?: boolean }) {
  const { state, scenario } = useApp();
  return (
    <div
      className={`digital-card ${compact ? "compact" : ""} ${state.blocked ? "blocked" : ""}`}
      aria-label={`Tessera servizi, ${state.blocked ? "bloccata" : "attiva nella demo"}`}
    >
      <div className="card-grain" />
      <div className="card-top">
        <Brand />
        <span className="card-service">TESSERA SERVIZI</span>
      </div>
      <div className="card-art" aria-hidden="true">
        <BrandSymbol />
      </div>
      <div className="card-copy">
        <span>Il tuo spazio casa.</span>
      </div>
      <div className="card-bottom">
        <div>
          <small>TITOLARE</small>
          <strong>
            {scenario === "worst"
              ? "Aleksandra Wiśniewska-Kowalczyk"
              : state.role === "inquilino"
                ? "Sofia Bianchi"
                : "Alessandro Rossi"}
          </strong>
        </div>
        <span className="card-id">
          {state.cardId}
          <span>{state.blocked ? "BLOCCATA" : "DEMO"}</span>
        </span>
      </div>
    </div>
  );
}
function PropertyTile({ property: p }: { property: Property }) {
  const { open } = useApp();
  return (
    <button className="property-tile" onClick={() => open("property", p.id)}>
      <div className="property-image">
        <img
          src={asset(`images/${p.image}`)}
          alt={`Immagine illustrativa di ${p.name}`}
          width="600"
          height="400"
          loading="lazy"
          onError={(e) => {
            e.currentTarget.style.visibility = "hidden";
          }}
        />
        <Badge tone={p.status === "Locato" ? "light" : "neutral"}>
          {p.status}
        </Badge>
        <span className="property-arrow">
          <ArrowUpRight size={18} />
        </span>
      </div>
      <div className="property-text">
        <h3>{p.name}</h3>
        <p>{p.address}</p>
        <div className="property-meta">
          <span>
            {p.area} m² <span>·</span> {p.rooms} locali
          </span>
          <span>
            {p.tenants.length
              ? p.tenants.length === 1
                ? "1 inquilino"
                : `${p.tenants.length} inquilini`
              : "Nessun inquilino"}
          </span>
        </div>
      </div>
    </button>
  );
}
export function HomePage() {
  const { state, go, open, activeHouses, scenario } = useApp();
  const tenant = state.role === "inquilino";
  const pending = activeHouses.filter(
    (p) =>
      p.rent > 0 &&
      (!["verified", "receipt"].includes(
        state.payments[p.id]?.status || "pending",
      ) ||
        (state.payments[p.id]?.amount ?? p.rent) < p.rent),
  );
  const tickets = state.tickets.filter(
    (t) =>
      activeHouses.some((p) => p.id === t.property) && t.status !== "Conclusa",
  );
  const first = pending[0];
  return (
    <>
      <div className="dashboard-top">
        <section className="card-widget">
          <div className="section-title">
            <h2>La tua tessera</h2>
            <Badge tone={state.blocked ? "danger" : "success"}>
              {state.blocked ? "Bloccata" : "Attiva · demo"}
            </Badge>
          </div>
          <DigitalCard compact />
          <button className="card-manage" onClick={() => go("card")}>
            <span>Gestisci tessera</span>
            <ArrowUpRight size={18} />
          </button>
        </section>
        <section className="overview-panel">
          <PageHeading
            eyebrow="BENVENUTO NEL TUO SPAZIO"
            title={
              tenant
                ? "Bentornata, Sofia."
                : scenario === "worst"
                  ? "Bentornata, Aleksandra."
                  : "Bentornato, Alessandro."
            }
            description={
              tenant
                ? "La tua casa, tutto a portata di mano."
                : "Prenditi cura di casa. Al resto, diamo un posto."
            }
          />

          <div className="section-title">
            <h2>Uno sguardo a oggi</h2>
            <span className="subtle">Ottobre 2026</span>
          </div>
          <div className="priority-card">
            <span className="priority-icon">
              <CalendarDays size={24} strokeWidth={1.5} />
            </span>
            <div>
              <span className="eyebrow">LA PROSSIMA COSA DA FARE</span>
              <h3>
                {first
                  ? tenant
                    ? "Il tuo affitto di ottobre"
                    : "Un affitto da aggiornare"
                  : "Tutto al suo posto"}
              </h3>
              <p>
                {first
                  ? `${first.name} · Scadenza 10 ottobre`
                  : "Nessuna scadenza da verificare negli immobili selezionati."}
              </p>
            </div>
            {first && (
              <div className="priority-amount">
                <strong>{money(first.rent)}</strong>
                <button className="text-button" onClick={() => go("affitto")}>
                  {tenant ? "Aggiungi prova" : "Vedi scadenza"}
                  <ArrowRight size={16} />
                </button>
              </div>
            )}
          </div>
          <div className="summary-stats">
            <div>
              <span>{tenant ? "La tua casa" : "I tuoi immobili"}</span>
              <strong>{activeHouses.length.toString().padStart(2, "0")}</strong>
              <small>
                {tenant
                  ? "Un unico spazio condiviso"
                  : "Il tuo portafoglio, connesso"}
              </small>
            </div>
            <div>
              <span>Affitti da verificare</span>
              <strong>
                {pending.length.toString().padStart(2, "0")}
                <i className="stat-dot amber" />
              </strong>
              <small>
                {pending.length
                  ? "Un aggiornamento da seguire"
                  : "Tutto aggiornato"}
              </small>
            </div>
            <div>
              <span>Richieste aperte</span>
              <strong>
                {tickets.length.toString().padStart(2, "0")}
                <i className="stat-dot green" />
              </strong>
              <small>
                {tickets.length
                  ? "Segui ogni passaggio"
                  : "Nessuna richiesta in corso"}
              </small>
            </div>
          </div>
          <div className="quick-actions">
            <button onClick={() => go("documenti")}>
              <FilesIcon />
              <span>I tuoi documenti</span>
              <ArrowUpRight size={17} />
            </button>
            <button
              onClick={() => open("ticket-new")}
              disabled={scenario === "ended" || !activeHouses.length}
            >
              <Wrench size={20} />
              <span>Chiedi assistenza</span>
              <Plus size={17} />
            </button>
          </div>
        </section>
      </div>
      <section className="properties-section">
        <SectionTitle
          title={
            tenant ? "Il tuo spazio, ogni giorno" : "Le tue case, in ordine"
          }
          action="Vedi immobili"
          onClick={() => go("immobili")}
        />
        {activeHouses.length ? (
          <div
            className={`property-grid${activeHouses.length > 1 ? " home-properties-compact" : ""}`}
          >
            {activeHouses.map((p) => (
              <PropertyTile key={p.id} property={p} />
            ))}
          </div>
        ) : (
          <Empty
            title="Qui inizia il tuo spazio casa"
            description="Quando l’agenzia confermerà il collegamento, troverai qui i tuoi immobili."
            action="Come funziona l’invito"
            onClick={() => go("accesso")}
          />
        )}
      </section>
      <div className="dashboard-bottom">
        <section>
          <SectionTitle
            title="Da seguire"
            action="Tutte le attività"
            onClick={() => go("assistenza")}
          />
          <div className="activity-list">
            {tickets.length ? (
              tickets.map((t) => (
                <button
                  className="activity-row"
                  key={t.id}
                  onClick={() => open("ticket", t.id)}
                >
                  <IconBox icon={Wrench} tone="sage" />
                  <span>
                    <strong>{t.title}</strong>
                    <small>
                      {activeHouses.find((p) => p.id === t.property)?.name} ·{" "}
                      {t.id}
                    </small>
                  </span>
                  <Badge tone="success">{t.status}</Badge>
                  <ChevronRight size={17} />
                </button>
              ))
            ) : (
              <p className="muted padded">Non ci sono attività da seguire.</p>
            )}
            <button className="activity-row" onClick={() => go("documenti")}>
              <IconBox icon={FileText} />
              <span>
                <strong>Il fascicolo della tua casa</strong>
                <small>Contratti, certificati e documenti condivisi</small>
              </span>
              <ChevronRight size={17} />
            </button>
          </div>
        </section>
        <section className="consultation-teaser">
          <div className="teaser-art" aria-hidden="true">
            <span />
            <span />
            <span />
          </div>
          <span className="eyebrow">UNO SGUARDO AL FUTURO</span>
          <h2>
            Ogni casa ha
            <br />
            un prossimo capitolo.
          </h2>
          <p>Metti a fuoco le tue idee con una consulenza immobiliare.</p>
          <button className="text-button" onClick={() => go("consulenze")}>
            Esplora la consulenza <ArrowUpRight size={17} />
          </button>
        </section>
      </div>
    </>
  );
}
function FilesIcon() {
  return <FileText size={20} strokeWidth={1.7} />;
}
export function PropertiesPage() {
  const { activeHouses, go } = useApp();
  return (
    <>
      <PageHeading
        eyebrow="IL TUO PATRIMONIO QUOTIDIANO"
        title="Le tue case."
        description="Persone, contratti e documenti. Tutto parte da qui."
      />
      {activeHouses.length ? (
        <div className="property-grid full">
          {activeHouses.map((p) => (
            <PropertyTile property={p} key={p.id} />
          ))}
        </div>
      ) : (
        <Empty
          title="Nessun immobile collegato"
          description="I collegamenti vengono verificati dall’agenzia prima di mostrare il fascicolo."
          action="Prova un invito"
          onClick={() => go("accesso")}
        />
      )}
      <div className="info-strip">
        <ShieldCheck size={22} />
        <div>
          <strong>Ogni persona, il suo accesso.</strong>
          <p>
            Proprietari, comproprietari e inquilini hanno permessi distinti. La
            demo include una comproprietà e contratti con più inquilini. Giulia
            Rossi è comproprietaria di Casa Tortona e inquilina di Casa Brera.
          </p>
        </div>
      </div>
    </>
  );
}
export function DocRow({ doc: d }: { doc: Doc }) {
  const { open } = useApp();
  return (
    <button className="document-row" onClick={() => open("document", d.id)}>
      <span className="pdf-icon">
        <FileText size={21} />
        <small>PDF</small>
      </span>
      <span className="document-name">
        <strong>{d.name}</strong>
        <small>
          {d.category} · {d.size} · {d.date}
        </small>
      </span>
      <span className="document-permission">
        <Users size={14} />
        {d.visibility}
      </span>
      <Badge tone={d.status === "Controllato" ? "success" : "neutral"}>
        {d.status}
      </Badge>
      <ChevronRight size={17} />
    </button>
  );
}
export function DocumentsPage() {
  const { state, docs, activeHouses, scenario } = useApp();
  const [search, setSearch] = useState("");
  const searchInput = useRef<HTMLInputElement>(null);
  const [category, setCategory] = useState("Tutti");
  const [page, setPage] = useState(0);
  useEffect(() => setPage(0), [search, category, scenario, state.property]);
  const visible = docs.filter(
    (d) =>
      activeHouses.some((p) => p.id === d.property) &&
      (state.role !== "inquilino" || d.visibility !== "Solo proprietari") &&
      (category === "Tutti" || d.category === category) &&
      d.name.toLocaleLowerCase("it").includes(search.toLocaleLowerCase("it")),
  );
  return (
    <>
      <PageHeading
        eyebrow="IL FASCICOLO DIGITALE"
        title="Tutto al suo posto."
        description="Trova il documento giusto, condividilo con le persone giuste."
      />
      <div className="document-tools">
        <div className="search-field">
          <Search size={19} />
          <input
            aria-label="Cerca documenti"
            ref={searchInput}
            placeholder="Cerca un documento…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {search && (
            <button
              aria-label="Cancella ricerca"
              onClick={() => {
                setSearch("");
                searchInput.current?.focus();
              }}
            >
              <X size={16} />
            </button>
          )}
        </div>
        <span
          className="muted"
          role="status"
          aria-live="polite"
          aria-atomic="true"
        >
          {visible.length.toLocaleString("it-IT")}{" "}
          {visible.length === 1 ? "documento" : "documenti"}
        </span>
      </div>
      <div className="filter-tabs" aria-label="Categoria documenti">
        {["Tutti", "Contratti", "Certificati", "Immobile"].map((c) => (
          <button
            key={c}
            aria-pressed={c === category}
            onClick={() => setCategory(c)}
          >
            {c}
          </button>
        ))}
      </div>
      <div className="document-list">
        {visible.length ? (
          visible
            .slice(page * 10, page * 10 + 10)
            .map((d) => <DocRow doc={d} key={d.id} />)
        ) : (
          <Empty
            title="Nessun documento trovato"
            description={
              search
                ? "Prova un altro nome o rimuovi i filtri."
                : "I documenti autorizzati compariranno qui dopo il caricamento da parte dell’agenzia."
            }
            action={
              search || category !== "Tutti" ? "Rimuovi filtri" : undefined
            }
            onClick={() => {
              setSearch("");
              setCategory("Tutti");
            }}
          />
        )}
      </div>
      {visible.length > 10 && (
        <div className="pagination">
          <Button
            variant="secondary"
            disabled={page === 0}
            onClick={() => setPage((p) => p - 1)}
          >
            Precedenti
          </Button>
          <span>
            Pagina {page + 1} di {Math.ceil(visible.length / 10)}
          </span>
          <Button
            variant="secondary"
            disabled={(page + 1) * 10 >= visible.length}
            onClick={() => setPage((p) => p + 1)}
          >
            Successivi
          </Button>
        </div>
      )}
      <p className="privacy-note">
        <LockKeyhole size={14} />
        Vedi solo i documenti previsti per il ruolo{" "}
        {roleLabel[state.role].toLowerCase()}.
      </p>
    </>
  );
}
export function RentPage() {
  const { state, activeHouses, open, scenario } = useApp();
  const rented = activeHouses.filter((p) => p.rent > 0);
  return (
    <>
      <PageHeading
        eyebrow="LA LOCAZIONE, CON CHIAREZZA"
        title="Ogni scadenza, chiara."
        description="Una prova di bonifico è il primo passo. L’incasso viene verificato separatamente."
      />
      <div className="rent-grid">
        {rented.map((p) => {
          const payment = state.payments[p.id] || { status: "pending" };
          const done = ["verified", "receipt"].includes(payment.status);
          return (
            <section className="rent-card" key={p.id}>
              <div className="rent-ledger">
                <div className="section-title">
                  <span className="eyebrow">OTTOBRE 2026</span>
                  <Badge tone={done ? "success" : "warning"}>
                    {done &&
                    payment.amount !== undefined &&
                    payment.amount < p.rent
                      ? "Incasso parziale verificato"
                      : paymentLabel[payment.status]}
                  </Badge>
                </div>
                <h2>{p.name}</h2>
                <p>{p.address}</p>
                <div className="rent-amount">{money(p.rent)}</div>
                <div className="rent-meta">
                  <span>Canone dimostrativo</span>
                  <strong>10 ottobre 2026</strong>
                </div>
              </div>
              <div className="rent-process">
                <PaymentProgress payment={payment} />
                <div className="rent-phase">
                  <h3>{paymentPhaseNarrative(payment.status).title}.</h3>
                  <p>{paymentPhaseNarrative(payment.status).detail}</p>
                </div>
                {done &&
                  payment.amount !== undefined &&
                  payment.amount < p.rent && (
                    <Notice>
                      Residuo da ricevere: {money(p.rent - payment.amount)}. La
                      rata non è saldata.
                    </Notice>
                  )}
                {payment.source && (
                  <p className="verification-note">
                    Fonte: {payment.source}
                    <br />
                    Verificato da {payment.author}
                  </p>
                )}
                <Button
                  variant={done ? "secondary" : "primary"}
                  onClick={() => open("payment", p.id)}
                  disabled={scenario === "ended"}
                >
                  {payment.status === "pending"
                    ? "Aggiungi prova di bonifico"
                    : payment.status === "uploaded"
                      ? "Completa dichiarazione"
                      : payment.status === "declared" &&
                          state.role !== "inquilino"
                        ? "Verifica incasso"
                        : "Vedi dettaglio"}
                  <ArrowUpRight size={17} />
                </Button>
              </div>
            </section>
          );
        })}
      </div>
      {!rented.length && (
        <Empty
          title="Nessun canone in questo contesto"
          description="Seleziona un immobile con una locazione attiva per vedere le scadenze."
        />
      )}
      <section className="panel-section">
        <SectionTitle title="Leggere gli stati" />
        <div className="explanation-grid">
          {[
            [
              "Documento caricato",
              "Il file è stato allegato. Nessuna conferma di pagamento.",
            ],
            [
              "Pagamento dichiarato",
              "L’inquilino indica importo e data. L’accredito è da verificare.",
            ],
            [
              "Incasso verificato",
              "Il beneficiario o il delegato registra fonte, importo e autore.",
            ],
            [
              "Quietanza rilasciata",
              "Un evento distinto, attribuito al soggetto legittimato.",
            ],
          ].map(([t, d]) => (
            <div key={t}>
              <h3>{t}</h3>
              <p>{d}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
export function UtilitiesPage() {
  const { state, open, activeHouses } = useApp();
  return (
    <>
      <PageHeading
        eyebrow="LE FORNITURE DI CASA"
        title="Utenze, senza confusione."
        description="Intestatari, periodi e bollette restano collegati alla persona corretta."
      />
      {state.role !== "inquilino" ? (
        <Empty
          title="Le bollette personali restano personali"
          description="Questo ruolo non ha una delega sulle utenze dell’inquilino. Puoi esplorare i dati dimostrativi passando al ruolo Inquilino."
        />
      ) : !activeHouses.length ? (
        <Empty
          title="Nessuna fornitura collegata"
          description="Le utenze compariranno quando il rapporto con l’immobile è confermato."
        />
      ) : (
        <div className="utilities-grid">
          {[
            {
              name: "Energia elettrica",
              icon: Zap,
              amount: 68.4,
              date: "18 ottobre",
              period: "Settembre 2026",
              status: "Da verificare",
            },
            {
              name: "Acqua",
              icon: Droplets,
              amount: 32.6,
              date: "25 ottobre",
              period: "Luglio–settembre 2026",
              status: "Archiviata",
            },
          ].map((u) => (
            <section className="utility-card" key={u.name}>
              <IconBox icon={u.icon} tone="sage" />
              <h2>{u.name}</h2>
              <p>Casa Tortona · Sofia Bianchi</p>
              <strong className="utility-amount">{money(u.amount)}</strong>
              <p>
                {u.period} · scadenza {u.date}
              </p>
              <Badge>{u.status}</Badge>
              <Button
                variant="secondary"
                onClick={() => open("utility", u.name)}
              >
                Dettaglio bolletta <ArrowUpRight size={16} />
              </Button>
            </section>
          ))}
        </div>
      )}
      <Notice>
        Fornitori e importi sono dimostrativi. Copertura dei pagamenti,
        commissioni e integrazioni restano da definire.
      </Notice>
    </>
  );
}
export function AssistancePage() {
  const { state, activeHouses, open, scenario } = useApp();
  const technician = state.role === "tecnico";
  const tickets = state.tickets.filter((t) =>
    technician
      ? t.technician === "Marco Ferri · Idraulico"
      : activeHouses.some((p) => p.id === t.property),
  );
  return (
    <>
      <PageHeading
        eyebrow={technician ? "IL TUO INCARICO" : "UN PUNTO DI RIFERIMENTO"}
        title={
          technician ? "Il lavoro da seguire." : "Ci racconti cosa succede?"
        }
        description={
          technician
            ? "Solo le pratiche assegnate a Marco Ferri. Nessun accesso al fascicolo generale."
            : "Apri una richiesta e segui ogni passaggio insieme all’agenzia."
        }
        action={
          !technician && (
            <Button
              onClick={() => open("ticket-new")}
              disabled={scenario === "ended" || !activeHouses.length}
            >
              <Plus size={18} />
              Nuova richiesta
            </Button>
          )
        }
      />
      <div className="assistance-layout">
        <section className="ticket-list">
          {tickets.length ? (
            tickets.map((t) => (
              <button
                className="ticket-row"
                key={t.id}
                onClick={() => open("ticket", t.id)}
              >
                <div>
                  <span className="eyebrow">
                    {t.id} · {t.category}
                  </span>
                  <Badge tone={t.status === "Conclusa" ? "success" : "warning"}>
                    {t.status}
                  </Badge>
                </div>
                <h2>{t.title}</h2>
                <p>
                  {activeHouses.find((p) => p.id === t.property)?.name ||
                    "Casa Tortona"}{" "}
                  · {t.technician || "In attesa di assegnazione"}
                </p>
                <div className="ticket-bottom">
                  <span>{t.events.at(-1)}</span>
                  <ArrowUpRight size={20} />
                </div>
              </button>
            ))
          ) : (
            <Empty
              title="Nessuna richiesta in corso"
              description={
                technician
                  ? "Quando riceverai un incarico comparirà qui."
                  : "Le tue richieste e i relativi aggiornamenti saranno raccolti qui."
              }
            />
          )}
        </section>
        <aside className="assistance-note">
          <IconBox icon={MessageCircle} tone="sage" />
          <h2>
            Dal primo messaggio,
            <br />
            al prossimo passo.
          </h2>
          <p>
            Ogni richiesta ha un riferimento e uno storico condiviso. Una
            segnalazione non autorizza spese.
          </p>
          <div className="divider" />
          <h3>Prima di inviare</h3>
          <p>
            Descrivi il problema e aggiungi una foto, se utile. Orari, zone e
            disponibilità del servizio sono da confermare.
          </p>
          <small>
            Per un pericolo immediato, contatta i servizi di emergenza o il
            gestore competente. Non attendere una risposta dalla demo.
          </small>
        </aside>
      </div>
    </>
  );
}
export function ConsultationPage() {
  const { state, setState, open, scenario } = useApp();
  return (
    <>
      <PageHeading
        eyebrow="NUOVE PROSPETTIVE"
        title="Il prossimo capitolo di casa."
        description="Uno spazio per le domande, i progetti e le decisioni importanti."
      />
      <div className="consultation-layout">
        <div className="consultation-photo">
          <img
            src={asset("images/casa-luminosa.jpg")}
            alt="Ambiente domestico luminoso, immagine illustrativa"
          />
          <div>
            <span className="eyebrow">CONSULENZA IMMOBILIARE</span>
            <h2>
              Le idee migliori
              <br />
              partono da una
              <br />
              conversazione.
            </h2>
          </div>
        </div>
        <section className="consultation-details">
          <Badge tone="sage">Percorso dimostrativo</Badge>
          <h2>Parliamo del tuo immobile.</h2>
          <p>
            Gestione della locazione, documenti e possibilità di valorizzazione:
            scegli il tema e prepara le tue domande.
          </p>
          <ul className="check-list">
            <li>
              <Check size={18} />
              Un quesito, un obiettivo chiaro
            </li>
            <li>
              <Check size={18} />
              Documenti condivisi solo se pertinenti
            </li>
            <li>
              <Check size={18} />
              Riepilogo e prossimi passi
            </li>
          </ul>
          <Notice>
            Platee, inclusioni, durata e disponibilità reali sono da confermare.
            Gli appuntamenti proposti qui sono simulati.
          </Notice>
          {state.booking ? (
            <div className="booking-confirm">
              <CircleCheck size={25} />
              <h3>Appuntamento demo riservato</h3>
              <p>{state.booking}</p>
              <Button
                variant="secondary"
                onClick={() => {
                  setState((s) => ({ ...s, booking: "" }));
                  toast.success("Appuntamento demo annullato");
                }}
              >
                Annulla appuntamento demo
              </Button>
            </div>
          ) : (
            <Button
              onClick={() => open("booking")}
              disabled={scenario === "ended"}
            >
              Scegli un appuntamento demo
              <ArrowRight size={17} />
            </Button>
          )}
        </section>
      </div>
    </>
  );
}
export function CardPage() {
  const { state, open, scenario, go } = useApp();
  if (state.role === "agenzia")
    return (
      <Empty
        title="Il tuo spazio è operativo"
        description="La tessera personale è riservata a proprietari e inquilini. Come agenzia, gestisci le attività dalla coda operativa."
        action="Apri la coda operativa"
        onClick={() => go("agenzia")}
      />
    );
  return (
    <>
      <PageHeading
        eyebrow="PERSONALE. RICONOSCIBILE. TUA."
        title="La chiave del tuo spazio."
        description="La tua tessera identifica l’accesso ai servizi per la casa."
      />
      <div className="card-page-grid">
        <div>
          <DigitalCard />
          <div className="card-caption">
            <ShieldCheck size={17} />
            {state.blocked
              ? "Credenziale revocata nella demo"
              : "Tessera di accesso · nessun saldo o circuito bancario"}
          </div>
        </div>
        <section className="card-controls">
          <div className="section-title">
            <h2>Gestisci la card</h2>
            <Badge tone={state.blocked ? "danger" : "success"}>
              {state.blocked ? "Bloccata" : "Attiva · demo"}
            </Badge>
          </div>
          <p>
            Identificativo {state.cardId}. Le azioni sono simulate e non
            attivano credenziali reali.
          </p>
          <button
            className="setting-row"
            disabled={state.blocked || scenario === "ended"}
            onClick={() => open("block")}
          >
            <IconBox icon={LockKeyhole} />
            <span>
              <strong>
                {state.blocked ? "Card bloccata" : "Blocca la card"}
              </strong>
              <small>
                {state.blocked
                  ? "Questa credenziale non può essere riutilizzata"
                  : "In caso di smarrimento o accesso sospetto"}
              </small>
            </span>
            <ChevronRight size={17} />
          </button>
          <button
            className="setting-row"
            onClick={() => open("physical")}
            disabled={scenario === "ended"}
          >
            <IconBox icon={ContactRound} />
            <span>
              <strong>Richiedi la card fisica</strong>
              <small>{state.physical}</small>
            </span>
            <ChevronRight size={17} />
          </button>
          <button
            className="setting-row"
            onClick={() => open("replace")}
            disabled={!state.blocked || scenario === "ended"}
          >
            <IconBox icon={KeyRound} />
            <span>
              <strong>Sostituisci la card</strong>
              <small>
                {state.blocked
                  ? "Genera un nuovo identificativo demo"
                  : "Disponibile dopo il blocco della card"}
              </small>
            </span>
            <ChevronRight size={17} />
          </button>
          {state.revokedCards.length > 0 && (
            <p className="privacy-note">
              Credenziali precedenti revocate: {state.revokedCards.join(", ")}
            </p>
          )}
        </section>
      </div>
      <Notice>
        La card non consente pagamenti e non dà accesso ai documenti senza
        autenticazione. Costi e tempi della versione fisica sono da definire.
      </Notice>
    </>
  );
}
export function AgencyPage() {
  const { state, activeHouses, open, go, docs } = useApp();
  const [tab, setTab] = useState("Richieste");
  if (state.role !== "agenzia")
    return (
      <Empty
        title="Spazio riservato all’agenzia"
        description="Usa il selettore Ruolo demo per esplorare la coda operativa come operatore."
      />
    );
  const tickets = state.tickets.filter((t) =>
    activeHouses.some((p) => p.id === t.property),
  );
  const pending = activeHouses.filter(
    (p) => state.payments[p.id]?.status === "declared",
  );
  const toReview = docs.filter(
    (d) =>
      d.status !== "Controllato" &&
      activeHouses.some((p) => p.id === d.property),
  );
  return (
    <>
      <PageHeading
        eyebrow="SPAZIO AGENZIA · ELENA COLOMBO"
        title="Il lavoro, con una direzione."
        description="Un’unica coda per richieste, evidenze e documenti da controllare."
      />
      <div className="agency-stats">
        <div>
          <span>Richieste aperte</span>
          <strong>
            {tickets.filter((t) => t.status !== "Conclusa").length}
          </strong>
        </div>
        <div>
          <span>Incassi da verificare</span>
          <strong>{pending.length}</strong>
        </div>
        <div>
          <span>Documenti da controllare</span>
          <strong>{toReview.length}</strong>
        </div>
      </div>
      <div className="filter-tabs">
        {["Richieste", "Incassi", "Documenti"].map((t) => (
          <button key={t} aria-pressed={tab === t} onClick={() => setTab(t)}>
            {t}
          </button>
        ))}
      </div>
      <section className="agency-queue">
        {tab === "Richieste" ? (
          tickets.length ? (
            tickets.map((t) => (
              <button
                key={t.id}
                className="agency-row"
                onClick={() => open("ticket", t.id)}
              >
                <IconBox icon={Wrench} />
                <span>
                  <strong>{t.title}</strong>
                  <small>
                    {t.id} ·{" "}
                    {activeHouses.find((p) => p.id === t.property)?.name}
                  </small>
                </span>
                <span className="muted">{t.technician || "Da assegnare"}</span>
                <Badge tone="warning">{t.status}</Badge>
                <ArrowUpRight size={18} />
              </button>
            ))
          ) : (
            <Empty
              title="La coda è vuota"
              description="Le nuove richieste compariranno qui."
            />
          )
        ) : tab === "Incassi" ? (
          pending.length ? (
            pending.map((p) => (
              <button
                key={p.id}
                className="agency-row"
                onClick={() => open("payment", p.id)}
              >
                <IconBox icon={ArrowDownLeft} />
                <span>
                  <strong>{p.name} · Ottobre</strong>
                  <small>{state.payments[p.id].file}</small>
                </span>
                <strong>{money(state.payments[p.id].amount || p.rent)}</strong>
                <Badge tone="warning">Da verificare</Badge>
                <ArrowUpRight size={18} />
              </button>
            ))
          ) : (
            <Empty
              title="Nessuna dichiarazione da verificare"
              description="Passa al ruolo Inquilino e dichiara un bonifico per esplorare la verifica."
              action="Vai alle scadenze"
              onClick={() => go("affitto")}
            />
          )
        ) : (
          toReview.map((d) => <DocRow key={d.id} doc={d} />)
        )}
      </section>
      <div className="info-strip">
        <ShieldCheck size={22} />
        <div>
          <strong>Permessi espliciti, azioni attribuite.</strong>
          <p>
            Elena Colombo è l’operatore dimostrativo con delega alla verifica.
            Il tecnico vede solo gli incarichi assegnati. Le autorizzazioni
            server appartengono all’implementazione successiva.
          </p>
        </div>
      </div>
    </>
  );
}
export function ProfilePage() {
  const { state, scenario, setScenario, go, open } = useApp();
  const [email, setEmail] = useState("alessandro.rossi@example.com");
  const [saved, setSaved] = useState(false);
  return (
    <>
      <PageHeading
        eyebrow="IL TUO ACCOUNT"
        title="Uno spazio che ti somiglia."
        description="Preferenze, servizio e strumenti per esplorare il prototipo."
      />
      <div className="profile-grid">
        <section className="profile-panel">
          <h2>Profilo dimostrativo</h2>
          <label>
            Nome
            <input
              value={
                scenario === "worst"
                  ? "Aleksandra Wiśniewska-Kowalczyk"
                  : state.role === "inquilino"
                    ? "Sofia Bianchi"
                    : state.role === "agenzia"
                      ? "Elena Colombo"
                      : state.role === "tecnico"
                        ? "Marco Ferri"
                        : "Alessandro Rossi"
              }
              readOnly
            />
          </label>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSaved(true);
              toast.success("Preferenza salvata per questa schermata demo");
            }}
          >
            <label>
              Email di contatto
              <input
                type="email"
                required
                maxLength={254}
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setSaved(false);
                }}
                autoComplete="email"
              />
            </label>
            <Button type="submit" variant="secondary">
              {saved ? "Preferenza aggiornata" : "Salva preferenza demo"}
            </Button>
          </form>
          <button className="setting-row" onClick={() => open("privacy")}>
            <ShieldCheck size={20} />
            <span>Sicurezza e privacy</span>
            <ChevronRight size={17} />
          </button>
          <button className="setting-row" onClick={() => go("accesso")}>
            <KeyRound size={20} />
            <span>Prova accesso e attivazione</span>
            <ChevronRight size={17} />
          </button>
        </section>
        <section className="profile-panel">
          <h2>Il servizio</h2>
          <Badge tone="warning">Condizioni da definire</Badge>
          <p>
            Quote, periodicità, IVA, inclusioni, copertura territoriale e
            assistenza fuori orario non sono ancora confermate.
          </p>
          <p>
            Questa demo non sottoscrive un abbonamento e non effettua addebiti.
          </p>
          <Button variant="secondary" onClick={() => open("service")}>
            Esplora stato del servizio
          </Button>
          <div className="divider" />
          <h3>Decisioni ancora aperte</h3>
          <p>
            Pagamenti integrati, app negli store, 3D e AI restano da valutare.
            La loro presenza o esclusione dal primo rilascio non è approvata.
          </p>
        </section>
      </div>
      <section className="prototype-lab">
        <div>
          <span className="eyebrow">SOLO PROTOTIPO</span>
          <h2>Laboratorio degli stati</h2>
          <p>
            Cambia i dati per verificare il design nelle condizioni meno ideali.
            Il selettore resta nell’URL.
          </p>
        </div>
        <div className="scenario-options">
          {Object.entries(scenarioLabels).map(([v, l]) => (
            <button
              key={v}
              aria-pressed={scenario === v}
              onClick={() => setScenario(v as Scenario)}
            >
              {l}
            </button>
          ))}
        </div>
        <div className="button-row">
          <Button variant="secondary" onClick={() => go("home")}>
            Vedi lo scenario <ArrowRight size={16} />
          </Button>
          <Button variant="ghost" onClick={() => open("reset")}>
            Ripristina tutta la demo
          </Button>
        </div>
      </section>
    </>
  );
}
export function AccessPage() {
  const { setState, go } = useApp();
  const [step, setStep] = useState(0);
  const [email, setEmail] = useState("sofia.bianchi@example.com");
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  return (
    <div className="access-layout">
      <div className="access-visual">
        <DigitalCard />
        <h1>
          La casa, connessa.
          <br />A partire da te.
        </h1>
        <p>
          Un accesso personale per ritrovare documenti, richieste e persone.
        </p>
      </div>
      <section className="access-form">
        <Badge tone="sage">Attivazione simulata</Badge>
        <h2>
          {
            [
              "Il tuo spazio ti aspetta.",
              "Un ultimo controllo.",
              "Il tuo invito è pronto.",
            ][step]
          }
        </h2>
        <p>
          {
            [
              "Usa un invito dell’agenzia per collegare il tuo account alla casa.",
              "Nessun messaggio viene inviato. Il codice dimostrativo è 123456.",
              "Invito dimostrativo per Sofia Bianchi, inquilina di Casa Tortona.",
            ][step]
          }
        </p>
        {step === 0 && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setError("");
              setStep(1);
            }}
          >
            <label>
              Email
              <input
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                maxLength={254}
              />
            </label>
            <Button type="submit">
              Continua con l’invito
              <ArrowRight size={18} />
            </Button>
            <button
              type="button"
              className="text-button"
              onClick={() =>
                setError(
                  "Questo invito è scaduto. Richiedi un nuovo invito all’agenzia; nessun documento è stato esposto.",
                )
              }
            >
              Simula invito scaduto
            </button>
          </form>
        )}
        {step === 1 && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (code !== "123456") {
                setError("Il codice non corrisponde. Nella demo usa 123456.");
                return;
              }
              setError("");
              setStep(2);
            }}
          >
            <label>
              Codice di verifica
              <input
                inputMode="numeric"
                autoComplete="one-time-code"
                pattern="[0-9]{6}"
                maxLength={6}
                required
                value={code}
                onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
                className="otp-input"
                aria-describedby="code-help"
              />
            </label>
            <small id="code-help">Codice demo: 123456</small>
            <Button type="submit">Verifica codice</Button>
            <button
              type="button"
              className="text-button"
              onClick={() => {
                setStep(0);
                setError("");
              }}
            >
              Cambia email
            </button>
          </form>
        )}
        {step === 2 && (
          <>
            <div className="invite-summary">
              <ShieldCheck size={24} />
              <strong>Rapporto verificato · simulazione</strong>
              <p>
                Casa Tortona · Via Tortona 24
                <br />
                Ruolo: Inquilino
                <br />
                Visibilità: contratto, documenti pertinenti e proprie richieste.
              </p>
            </div>
            <Notice>
              Condizioni e prezzo del servizio saranno presentati quando
              definiti. Questa attivazione abilita soltanto la demo.
            </Notice>
            <Button
              onClick={() => {
                setState((s) => ({ ...s, role: "inquilino", property: "p1" }));
                go("home");
                toast.success("Benvenuta nel tuo spazio dimostrativo");
              }}
            >
              Entra nella demo <ArrowRight size={18} />
            </Button>
          </>
        )}
        {error && <Notice error>{error}</Notice>}
        <button className="text-button" onClick={() => go("home")}>
          Torna alla panoramica demo
        </button>
      </section>
    </div>
  );
}
export function DesignSystemPage() {
  const { open } = useApp();
  return (
    <>
      <PageHeading
        eyebrow="IDENTITÀ · DESIGN SYSTEM 0.3"
        title="Calma, per le cose importanti."
        description="Simbolo Legame scelto. Un’identità autonoma per i servizi della casa; nome del prodotto ancora da confermare."
      />
      <section
        className="brand-specimen"
        aria-label="Simbolo Legame e varianti"
      >
        <div>
          <BrandSymbol />
          <small>Bruno su albicocca</small>
        </div>
        <div>
          <BrandSymbol />
          <small>Chiaro su bruno</small>
        </div>
        <div>
          <span className="brand-small-proofs">
            {[16, 24, 32].map((size) => (
              <BrandSymbol key={size} small className={`symbol-${size}`} />
            ))}
          </span>
          <small>Variante ottica · 16 / 24 / 32 px</small>
        </div>
      </section>
      <div className="palette">
        {[
          ["Bruno", "#48280f"],
          ["Terracotta", "#93471f"],
          ["Albicocca", "#ffa15e"],
          ["Avorio", "#f9f6f0"],
          ["Testo", "#38271d"],
        ].map(([name, color]) => (
          <div key={name}>
            <span style={{ background: color }} />
            <strong>{name}</strong>
            <small>{color}</small>
          </div>
        ))}
      </div>
      <section className="panel-section">
        <span className="eyebrow">TIPOGRAFIA · MANROPE VARIABLE</span>
        <h1 className="type-display">La casa, connessa.</h1>
        <h2>Gerarchie chiare, spazi per respirare.</h2>
        <p>
          Corpo 14–16 px, titoli 24–60 px, scala fluida e cifre tabulari per
          importi. Il carattere è servito localmente.
        </p>
        <div className="button-row">
          <Button onClick={() => open("design-demo")}>
            Azione primaria <ArrowRight size={17} />
          </Button>
          <Button variant="secondary" onClick={() => open("design-demo")}>
            Secondaria
          </Button>
          <Button disabled>Non disponibile</Button>
        </div>
        <div className="button-row">
          <Badge tone="success">Incasso verificato</Badge>
          <Badge tone="warning">Da verificare</Badge>
          <Badge tone="danger">Accesso revocato</Badge>
          <Badge>Documento caricato</Badge>
        </div>
      </section>
      <div className="design-specs">
        <section>
          <h2>Superfici</h2>
          <p>
            Tessera materica su avorio. Contenuti aperti, fotografie a tutta
            colonna e separatori editoriali. Volume riservato alla tessera e ai
            dialoghi; azioni brune, link terracotta e simbolo albicocca.
          </p>
        </section>
        <section>
          <h2>Movimento</h2>
          <p>
            Pressione 100 ms, fase affitto 160 ms, pannelli 220 ms. Solo
            transform e opacity. Tastiera istantanea, movimento ridotto senza
            traslazione.
          </p>
        </section>
        <section>
          <h2>Accessibilità</h2>
          <p>
            Focus visibile, controlli 44 px, stato con testo, zoom libero, input
            da 16 px, safe area e pannelli scrollabili.
          </p>
        </section>
      </div>
    </>
  );
}
