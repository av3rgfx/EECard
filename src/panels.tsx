import { asset } from "./assets";
import { useState, useRef, type FormEvent } from "react";
import {
  ArrowRight,
  Check,
  Download,
  FileText,
  ShieldCheck,
  CreditCard,
  Wrench,
  CalendarDays,
  Building2,
  MessageCircle,
  Settings2,
  LogIn,
  LayoutDashboard,
  Share2,
  ArrowUpRight,
} from "lucide-react";
import { toast } from "sonner";
import { useApp } from "./context";
import {
  Modal,
  Button,
  Badge,
  Notice,
  FileInput,
  Empty,
  IconBox,
} from "./components/ui";
import {
  initialState,
  money,
  paymentLabel,
  type Ticket,
  type Route,
} from "./data";
export function Panels() {
  const { panel: currentPanel, close, go, state, setState } = useApp();
  const retained = useRef(currentPanel);
  if (currentPanel) retained.current = currentPanel;
  const panel = currentPanel || retained.current;
  if (!panel) return null;
  const config: Record<string, [string, string]> = {
    document: [
      "Le informazioni giuste.",
      "Consulta la versione dimostrativa e gestisci la condivisione.",
    ],
    property: [
      "Il tuo immobile",
      "Persone, rapporto e documenti collegati a questa casa.",
    ],
    payment: [
      "Il percorso del bonifico",
      "Prova, dichiarazione, verifica e quietanza sono passaggi distinti.",
    ],
    "ticket-new": [
      "Come possiamo aiutarti?",
      "La richiesta è simulata. Non prenota un intervento né autorizza spese.",
    ],
    ticket: [
      "Segui la richiesta",
      "Uno storico condiviso, dal primo messaggio alla conclusione.",
    ],
    block: [
      "Bloccare questa card?",
      "La credenziale demo verrà revocata. I documenti restano accessibili dal tuo account.",
    ],
    replace: [
      "Una nuova EECard",
      "Il vecchio identificativo resterà revocato anche dopo la sostituzione.",
    ],
    physical: [
      "La tua card, anche fisica.",
      "Esplora la richiesta: costi, consegna e disponibilità devono essere confermati.",
    ],
    booking: [
      "Troviamo un momento.",
      "Gli orari sono esclusivamente dimostrativi, senza disponibilità reale.",
    ],
    notifications: [
      "I tuoi aggiornamenti",
      "Solo comunicazioni della demo. Nessun messaggio è stato inviato.",
    ],
    more: ["Il tuo spazio EECard", "Tutte le sezioni, a portata di mano."],
    privacy: [
      "Sicurezza e privacy",
      "I dati del prototipo sono fittizi e restano nel browser.",
    ],
    service: [
      "Stato del servizio",
      "Il servizio commerciale non è attivo nella demo.",
    ],
    reset: [
      "Ripristinare la demo?",
      "Verranno rimosse le modifiche locali a card, prove, richieste e condivisioni.",
    ],
    utility: [
      "La bolletta, nel dettaglio",
      "Documento e stato del pagamento restano distinti.",
    ],
    "design-demo": [
      "Una superficie, un compito.",
      "Dialogo Animate UI adattato al sistema EECard.",
    ],
    "revoked-help": [
      "Il tuo collegamento è terminato",
      "Contatta il referente per chiarire i permessi prima di richiedere un nuovo accesso.",
    ],
  };
  const [title, description] = config[panel.kind] || [
    "Dettaglio",
    "Contenuto dimostrativo.",
  ];
  let content: React.ReactNode = null;
  if (panel.kind === "document") content = <DocumentPanel id={panel.id!} />;
  if (panel.kind === "property") content = <PropertyPanel id={panel.id!} />;
  if (panel.kind === "payment") content = <PaymentPanel id={panel.id!} />;
  if (panel.kind === "ticket-new") content = <TicketForm />;
  if (panel.kind === "ticket") content = <TicketPanel id={panel.id!} />;
  if (panel.kind === "block")
    content = (
      <>
        <Notice>
          Blocco definitivo dell’identificativo {state.cardId} in questa demo.
          Potrai richiedere una card sostitutiva.
        </Notice>
        <div className="button-row">
          <Button
            variant="danger"
            onClick={() => {
              setState((s) => ({
                ...s,
                blocked: true,
                revokedCards: [...new Set([...s.revokedCards, s.cardId])],
              }));
              close();
              toast.success("Card bloccata. Credenziale demo revocata.");
            }}
          >
            Conferma blocco
          </Button>
          <Button variant="secondary" onClick={close}>
            Annulla
          </Button>
        </div>
      </>
    );
  if (panel.kind === "replace")
    content = (
      <>
        <p>
          La sostituzione crea un nuovo identificativo, distinto da{" "}
          {state.cardId}. Nessun costo o invio reale.
        </p>
        <Button
          onClick={() => {
            setState((s) => ({
              ...s,
              blocked: false,
              cardId: `EE · ${2048 + s.revokedCards.length}`,
              physical: "Sostituzione da confermare",
            }));
            close();
            toast.success(
              "Nuova card demo generata. La precedente resta revocata.",
            );
          }}
          disabled={!state.blocked}
        >
          Genera card sostitutiva demo
        </Button>
      </>
    );
  if (panel.kind === "physical") content = <PhysicalForm />;
  if (panel.kind === "booking") content = <BookingForm />;
  if (panel.kind === "notifications")
    content = (
      <>
        <button className="notification-row" onClick={() => go("affitto")}>
          <IconBox icon={CalendarDays} />
          <span>
            <strong>Il tuo affitto di ottobre</strong>
            <small>Scadenza 10 ottobre · dati dimostrativi</small>
          </span>
          <ArrowUpRight size={18} />
        </button>
        <button className="notification-row" onClick={() => go("assistenza")}>
          <IconBox icon={Wrench} />
          <span>
            <strong>Segui le tue richieste</strong>
            <small>Consulta assegnazione e avanzamento</small>
          </span>
          <ArrowUpRight size={18} />
        </button>
        <Button
          variant="secondary"
          onClick={() => {
            setState((s) => ({ ...s, notificationsRead: true }));
            toast.success("Notifiche segnate come lette");
            close();
          }}
        >
          Segna tutto come letto
        </Button>
      </>
    );
  if (panel.kind === "more")
    content = (
      <div className="more-menu">
        {(
          [
            ["immobili", "I tuoi immobili", Building2],
            ["affitto", "Affitto e scadenze", CalendarDays],
            ["utenze", "Utenze", CreditCard],
            ["consulenze", "Consulenze", MessageCircle],
            ["profilo", "Profilo e servizio", Settings2],
            ["accesso", "Accesso e invito", LogIn],
            ...(state.role === "agenzia"
              ? [["agenzia", "Coda operativa", LayoutDashboard]]
              : []),
          ] as [Route, string, typeof Building2][]
        )
          .filter(
            ([r]) =>
              state.role !== "tecnico" || ["profilo", "accesso"].includes(r),
          )
          .map(([r, l, Icon]) => (
            <button key={r} onClick={() => go(r)}>
              <Icon size={21} />
              {l}
              <ArrowUpRight size={18} />
            </button>
          ))}
      </div>
    );
  if (panel.kind === "privacy")
    content = (
      <>
        <ShieldCheck size={32} />
        <h3>Un prototipo, nessun account reale.</h3>
        <p>
          I file non vengono caricati su un server: viene conservato soltanto il
          nome. Non usare documenti personali. Il selettore di ruolo simula i
          permessi, senza autenticazione di produzione.
        </p>
        <p>
          In produzione sono necessari controlli server per oggetto, scansione
          dei file, MFA per operatori e revoca delle credenziali.
        </p>
        <Button
          variant="secondary"
          onClick={() =>
            downloadText(
              "eecard-esportazione-demo.txt",
              JSON.stringify(state, null, 2),
            )
          }
        >
          Esporta i dati dimostrativi <Download size={17} />
        </Button>
      </>
    );
  if (panel.kind === "service")
    content = (
      <>
        <Badge tone="warning">Offerta da confermare</Badge>
        <p>
          Non ci sono quote, rinnovi o fatture attive. Il prezzo completo e le
          condizioni dovranno essere approvati prima di una sottoscrizione
          reale.
        </p>
        <h3>Fine servizio e fine locazione</h3>
        <p>
          La disdetta EECard non risolve il contratto di affitto. Le regole di
          conservazione dei documenti pertinenti restano da definire.
        </p>
        <Button
          variant="secondary"
          onClick={() => {
            close();
            go("profilo");
          }}
        >
          Torna al profilo
        </Button>
      </>
    );
  if (panel.kind === "reset")
    content = (
      <Button
        variant="danger"
        onClick={() => {
          setState(initialState());
          close();
          go("home");
          toast.success("Dati demo ripristinati");
        }}
      >
        Ripristina dati iniziali
      </Button>
    );
  if (panel.kind === "utility")
    content = (
      <>
        <Badge>Archiviata · pagamento non verificato</Badge>
        <h3>{panel.id}</h3>
        <p>
          Intestataria: Sofia Bianchi
          <br />
          Immobile: Casa Tortona
          <br />
          Periodo: {panel.id === "Acqua"
            ? "luglio–settembre"
            : "settembre"}{" "}
          2026
          <br />
          Importo demo: {panel.id === "Acqua" ? "32,60 €" : "68,40 €"}
        </p>
        <Notice>
          Nessuna integrazione con fornitori o pagamenti attiva in questa demo.
          Non è possibile confermare il saldo da un semplice caricamento.
        </Notice>
        <a
          className="button secondary"
          href={asset("documento-demo.pdf")}
          download
        >
          Scarica documento demo
          <Download size={17} />
        </a>
      </>
    );
  if (panel.kind === "design-demo")
    content = (
      <>
        <p>
          Focus confinato, chiusura con Escape, ripristino del focus e pannello
          inferiore su mobile. Transizione di 220 ms, senza movimento se
          richiesto dalle preferenze di sistema.
        </p>
        <Button onClick={close}>
          Ho capito <Check size={17} />
        </Button>
      </>
    );
  if (panel.kind === "revoked-help")
    content = (
      <>
        <p>Referente dimostrativo: Elena Colombo, agenzia EECard.</p>
        <Notice>
          Non è presente un recapito operativo verificato. Questo pannello non
          invia una richiesta reale.
        </Notice>
        <Button
          variant="secondary"
          onClick={() => {
            close();
            go("profilo");
          }}
        >
          Apri il profilo demo
        </Button>
      </>
    );
  return (
    <Modal
      open={!!currentPanel}
      onClose={close}
      title={title}
      description={description}
    >
      {content}
    </Modal>
  );
}
function downloadText(name: string, text: string) {
  const url = URL.createObjectURL(
    new Blob([text], { type: "text/plain;charset=utf-8" }),
  );
  const a = document.createElement("a");
  a.href = url;
  a.download = name;
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
function PropertyPanel({ id }: { id: string }) {
  const { houses, go, setState, scenario } = useApp();
  const p = houses.find((p) => p.id === id);
  if (!p)
    return (
      <Empty
        title="Immobile non disponibile"
        description="Il contesto selezionato non contiene questa casa."
      />
    );
  return (
    <>
      <img
        className="detail-photo"
        src={asset(`images/${p.image}`)}
        alt={`Immagine illustrativa di ${p.name}`}
      />
      <div className="section-title">
        <h3>{p.name}</h3>
        <Badge tone="success">{p.status}</Badge>
      </div>
      <p>
        {p.address} · {p.area} m² · {p.rooms} locali
      </p>
      <div className="detail-grid">
        <div>
          <span className="eyebrow">PROPRIETARI</span>
          {p.owners.map((n) => (
            <p key={n}>{n}</p>
          ))}
          {p.owners.length > 1 && (
            <small>Comproprietà · nessuna delega implicita</small>
          )}
        </div>
        <div>
          <span className="eyebrow">INQUILINI</span>
          {p.tenants.length ? (
            p.tenants.map((n) => <p key={n}>{n}</p>)
          ) : (
            <p>Nessun rapporto attivo</p>
          )}
        </div>
      </div>
      <div className="contract-summary">
        <FileText size={21} />
        <div>
          <strong>
            {p.tenants.length
              ? "Contratto di locazione abitativa"
              : "Contratto non presente"}
          </strong>
          <p>
            {p.tenants.length
              ? `Rapporto dimostrativo · ${id === "p1" ? "01 settembre 2026 — 31 agosto 2030" : "01 luglio 2026 — 30 giugno 2030"}`
              : "Le scadenze saranno disponibili dopo la verifica del rapporto."}
          </p>
          <Badge tone={scenario === "ended" ? "warning" : "neutral"}>
            {scenario === "ended"
              ? "Concluso il 30 settembre 2026"
              : p.tenants.length
                ? "Attivo · demo"
                : "Non locato"}
          </Badge>
        </div>
      </div>
      <Button
        onClick={() => {
          setState((s) => ({ ...s, property: id }));
          go("documenti");
        }}
      >
        Apri il fascicolo
        <ArrowRight size={17} />
      </Button>
    </>
  );
}
function DocumentPanel({ id }: { id: string }) {
  const { docs, state, setState, activeHouses, scenario } = useApp();
  const doc = docs.find((d) => d.id === id);
  const [share, setShare] = useState(false);
  const [recipient, setRecipient] = useState("");
  const [duration, setDuration] = useState("7 giorni");
  if (
    !doc ||
    !activeHouses.some((p) => p.id === doc.property) ||
    (state.role === "inquilino" && doc.visibility === "Solo proprietari")
  )
    return (
      <Empty
        title="Documento non accessibile"
        description="Questo documento non rientra nei permessi del contesto attuale."
      />
    );
  const p = activeHouses.find((p) => p.id === doc.property)!;
  const recipients =
    doc.visibility === "Solo proprietari"
      ? [...p.owners, "Elena Colombo · Agenzia"]
      : [...p.owners, ...p.tenants, "Elena Colombo · Agenzia"];
  const shares = state.shares.filter((s) => s.doc === id);
  function submit(e: FormEvent) {
    e.preventDefault();
    setState((s) => ({
      ...s,
      shares: [
        ...s.shares.filter((x) => !(x.doc === id && x.recipient === recipient)),
        { doc: id, recipient, duration, active: true },
      ],
    }));
    toast.success("Condivisione demo attivata per il destinatario");
    setShare(false);
  }
  return (
    <>
      <div className="document-preview">
        <span className="preview-watermark">FACSIMILE · DEMO</span>
        <div className="preview-logo">EECard / FASCICOLO</div>
        <h3>{doc.name}</h3>
        <p>
          {p.name}
          <br />
          {p.address}
        </p>
        <div className="fake-lines" aria-hidden="true">
          <i />
          <i />
          <i />
          <i />
        </div>
        <p className="preview-disclaimer">
          Anteprima illustrativa. Nessun valore contrattuale o certificativo.
        </p>
      </div>
      <div className="document-detail-meta">
        <Badge tone={doc.status === "Controllato" ? "success" : "neutral"}>
          {doc.status}
        </Badge>
        <span>Versione 1 · {doc.date}</span>
      </div>
      <p>
        <strong>Visibilità:</strong> {doc.visibility}
        <br />
        <strong>Provenienza:</strong> agenzia demo · {doc.size}
      </p>
      <small>
        “Controllato” indica un controllo formale, non una certificazione legale
        o tecnica.
      </small>
      {state.role === "agenzia" && doc.status !== "Controllato" && (
        <div className="button-row">
          <Button
            variant="secondary"
            disabled={scenario === "ended"}
            onClick={() => {
              setState((s) => ({
                ...s,
                reviewedDocuments: [...new Set([...s.reviewedDocuments, id])],
              }));
              toast.success(
                "Controllo formale registrato da Elena Colombo · demo",
              );
            }}
          >
            Segna controllo formale demo
          </Button>
        </div>
      )}
      <div className="button-row">
        <a
          className="button secondary"
          href={asset("documento-demo.pdf")}
          download
        >
          Scarica facsimile <Download size={16} />
        </a>
        <Button
          onClick={() => setShare((v) => !v)}
          disabled={scenario === "ended"}
        >
          Condividi <Share2 size={16} />
        </Button>
      </div>
      {share && (
        <form className="inset-form" onSubmit={submit}>
          <h3>Condividi con una persona autorizzata</h3>
          <label>
            Destinatario
            <select
              required
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
            >
              <option value="">Seleziona una persona</option>
              {recipients.map((n) => (
                <option key={n}>{n}</option>
              ))}
            </select>
          </label>
          <label>
            Durata della condivisione
            <select
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
            >
              <option>24 ore</option>
              <option>7 giorni</option>
              <option>30 giorni</option>
            </select>
          </label>
          <Notice>
            Accesso in sola lettura. Il destinatario deve autenticarsi. Non
            viene creato un link pubblico né inviata una notifica reale.
          </Notice>
          <Button type="submit">Conferma condivisione demo</Button>
        </form>
      )}
      {shares.length > 0 && (
        <div className="shares">
          <h3>Condivisioni</h3>
          {shares.map((s) => (
            <div className="share-row" key={s.recipient}>
              <span>
                <strong>{s.recipient}</strong>
                <small>
                  Sola lettura · {s.duration} ·{" "}
                  {s.active ? "Attiva" : "Revocata"}
                </small>
              </span>
              {s.active && (
                <button
                  className="text-button danger-text"
                  onClick={() => {
                    setState((st) => ({
                      ...st,
                      shares: st.shares.map((x) =>
                        x.doc === id && x.recipient === s.recipient
                          ? { ...x, active: false }
                          : x,
                      ),
                    }));
                    toast.success("Condivisione revocata nella demo");
                  }}
                >
                  Revoca
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </>
  );
}
function PaymentPanel({ id }: { id: string }) {
  const { state, setState, houses, scenario } = useApp();
  const p = houses.find((p) => p.id === id);
  const pay = state.payments[id] || { status: "pending" };
  const [file, setFile] = useState("");
  const [amount, setAmount] = useState(String(p?.rent || 0));
  const [date, setDate] = useState("2026-10-06");
  const [source, setSource] = useState("");
  const [error, setError] = useState("");
  if (!p)
    return (
      <Empty
        title="Scadenza non disponibile"
        description="Seleziona un immobile attivo."
      />
    );
  const capable = state.role === "proprietario" || state.role === "agenzia";
  const ended = scenario === "ended";
  function upload(e: FormEvent) {
    e.preventDefault();
    if (!file) {
      setError("Scegli un file o usa l’allegato dimostrativo.");
      return;
    }
    setState((s) => ({
      ...s,
      payments: { ...s.payments, [id]: { status: "uploaded", file } },
    }));
    setError("");
    toast.success("Documento caricato. Pagamento non ancora dichiarato.");
  }
  function declare(e: FormEvent) {
    e.preventDefault();
    const value = Number(amount.replace(",", "."));
    if (!Number.isFinite(value) || value <= 0 || value > 9999999) {
      setError(
        "Indica un importo valido maggiore di zero, fino a 9.999.999 €.",
      );
      return;
    }
    setState((s) => ({
      ...s,
      payments: {
        ...s.payments,
        [id]: { ...pay, status: "declared", amount: value, date },
      },
    }));
    setError("");
    toast.success("Pagamento dichiarato. Incasso da verificare.");
  }
  function verify(e: FormEvent) {
    e.preventDefault();
    if (source.trim().length < 8) {
      setError("Descrivi la fonte dell’accredito con almeno 8 caratteri.");
      return;
    }
    setState((s) => ({
      ...s,
      payments: {
        ...s.payments,
        [id]: {
          ...pay,
          status: "verified",
          source: source.trim(),
          author:
            state.role === "agenzia"
              ? "Elena Colombo · delega demo"
              : "Alessandro Rossi · beneficiario demo",
        },
      },
    }));
    setError("");
    toast.success(
      "Incasso verificato nella demo. Nessuna quietanza ancora emessa.",
    );
  }
  return (
    <>
      <div className="payment-summary">
        <span>{p.name} · Ottobre 2026</span>
        <strong>{money(p.rent)}</strong>
        <Badge
          tone={
            ["verified", "receipt"].includes(pay.status) ? "success" : "warning"
          }
        >
          {paymentLabel[pay.status]}
        </Badge>
      </div>
      {pay.file && (
        <div className="attached-file">
          <FileText size={21} />
          <span>{pay.file}</span>
          <Badge>Allegato demo</Badge>
        </div>
      )}
      {pay.status === "pending" && (
        <form onSubmit={upload}>
          <FileInput
            onFile={setFile}
            label="Prova di bonifico"
            required
            demoName="bonifico-ottobre-demo.pdf"
          />
          <Button type="submit" disabled={ended}>
            Carica prova demo
          </Button>
        </form>
      )}
      {pay.status === "uploaded" && (
        <form onSubmit={declare}>
          <Notice>
            Il documento è presente. Completa la dichiarazione per inviarla alla
            verifica del beneficiario.
          </Notice>
          <label>
            Importo dichiarato (€)
            <input
              inputMode="decimal"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
              maxLength={12}
            />
          </label>
          <label>
            Data del bonifico
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              min="2026-01-01"
              max="2026-10-06"
              required
            />
          </label>
          <Button type="submit" disabled={ended}>
            Dichiara pagamento
          </Button>
        </form>
      )}
      {pay.status === "declared" && (
        <>
          <div className="detail-grid">
            <p>
              <strong>Importo dichiarato</strong>
              <br />
              {money(pay.amount || 0)}
            </p>
            <p>
              <strong>Data dichiarata</strong>
              <br />
              {pay.date}
            </p>
          </div>
          {capable ? (
            <form onSubmit={verify}>
              <Notice>
                Verifica l’accredito con una fonte distinta dalla sola
                contabile. Operatore:{" "}
                {state.role === "agenzia"
                  ? "Elena Colombo, delega demo"
                  : "Alessandro Rossi, beneficiario demo"}
                .
              </Notice>
              <label>
                Fonte di verifica dell’accredito
                <textarea
                  value={source}
                  onChange={(e) => setSource(e.target.value)}
                  placeholder="Es. estratto conto dimostrativo, movimento DEMO-104"
                  required
                  minLength={8}
                  maxLength={500}
                />
              </label>
              <Button type="submit" disabled={ended}>
                Conferma incasso verificato
              </Button>
            </form>
          ) : (
            <Notice>
              In attesa del beneficiario o dell’agenzia delegata. Puoi cambiare
              ruolo dal selettore demo per proseguire. L’inquilino non può
              verificare l’incasso.
            </Notice>
          )}
        </>
      )}
      {["verified", "receipt"].includes(pay.status) && (
        <>
          <div className="verification-block">
            <ShieldCheck size={25} />
            <div>
              <h3>Incasso verificato · simulazione</h3>
              <p>
                {money(pay.amount || p.rent)} · {pay.date}
                <br />
                Fonte: {pay.source}
                <br />
                Autore: {pay.author}
              </p>
            </div>
          </div>
          {pay.amount !== undefined && pay.amount !== p.rent && (
            <Notice>
              {pay.amount < p.rent
                ? `Incasso parziale: residuo ${money(p.rent - pay.amount)}. La rata non è saldata.`
                : `Eccedenza ${money(pay.amount - p.rent)}: allocazione da chiarire.`}
            </Notice>
          )}
          {pay.status === "verified" ? (
            capable ? (
              <>
                <p>
                  La quietanza è un passaggio separato. In questo prototipo
                  verrà creato soltanto un facsimile dell’importo verificato.
                </p>
                <Button
                  variant="secondary"
                  disabled={ended}
                  onClick={() => {
                    setState((s) => ({
                      ...s,
                      payments: {
                        ...s.payments,
                        [id]: { ...pay, status: "receipt" },
                      },
                    }));
                    toast.success(
                      "Quietanza dimostrativa creata separatamente",
                    );
                  }}
                >
                  Genera quietanza demo
                </Button>
              </>
            ) : (
              <Notice>Quietanza non ancora rilasciata dal beneficiario.</Notice>
            )
          ) : (
            <>
              <Badge tone="success">
                Quietanza demo · Q-DEMO-{id.toUpperCase()}
              </Badge>
              <p>
                Emittente demo: {pay.author}. Importo:{" "}
                {money(pay.amount || p.rent)}. Nessun valore fiscale o
                liberatorio.
              </p>
              <Button
                variant="secondary"
                onClick={() =>
                  downloadText(
                    "quietanza-FACSIMILE.txt",
                    `FACSIMILE DIMOSTRATIVO — NESSUN VALORE LEGALE\nQuietanza Q-DEMO-${id.toUpperCase()}\n${p.name} — ottobre 2026\nImporto verificato: ${money(pay.amount || p.rent)}\nEmittente demo: ${pay.author}\nFonte demo: ${pay.source}`,
                  )
                }
              >
                Scarica facsimile quietanza <Download size={16} />
              </Button>
            </>
          )}
        </>
      )}
      {error && <Notice error>{error}</Notice>}
    </>
  );
}
function TicketForm() {
  const { activeHouses, state, setState, close } = useApp();
  const [property, setProperty] = useState(activeHouses[0]?.id || "");
  const [category, setCategory] = useState("Idraulica");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [contact, setContact] = useState(
    state.role === "inquilino"
      ? "sofia.bianchi@example.com"
      : "alessandro.rossi@example.com",
  );
  const [attachment, setAttachment] = useState("");
  const [failed, setFailed] = useState(false);
  const [error, setError] = useState("");
  function submit(e: FormEvent) {
    e.preventDefault();
    if (failed) {
      setError(
        "Invio non riuscito nella simulazione. I campi sono conservati: disattiva l’errore e riprova.",
      );
      return;
    }
    if (title.trim().length < 5 || description.trim().length < 12) {
      setError(
        "Aggiungi un titolo di almeno 5 caratteri e una descrizione di almeno 12 caratteri.",
      );
      return;
    }
    const id = `EE-${1043 + state.tickets.filter((t) => t.id !== "EE-1042").length}`;
    const t: Ticket = {
      id,
      property,
      title: title.trim(),
      description: description.trim(),
      category,
      contact,
      attachment,
      status: "Ricevuta",
      events: ["Richiesta ricevuta nella demo · 6 ott"],
    };
    setState((s) => ({
      ...s,
      tickets: [t, ...s.tickets],
      notificationsRead: false,
    }));
    close();
    toast.success(
      `Richiesta ${id} ricevuta. Prossimo passo: valutazione dell’agenzia.`,
    );
  }
  return (
    <form onSubmit={submit}>
      <label>
        Immobile
        <select
          value={property}
          onChange={(e) => setProperty(e.target.value)}
          required
        >
          {activeHouses.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
        </select>
      </label>
      <label>
        Categoria
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option>Idraulica</option>
          <option>Impianto elettrico</option>
          <option>Riscaldamento</option>
          <option>Altro</option>
        </select>
      </label>
      <label>
        In poche parole
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Es. Perdita dal rubinetto in cucina"
          required
          minLength={5}
          maxLength={120}
        />
      </label>
      <label>
        Descrivi il problema
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Dove si presenta? Da quando?"
          required
          minLength={12}
          maxLength={2000}
        />
      </label>
      <label>
        Email per aggiornamenti
        <input
          type="email"
          required
          value={contact}
          onChange={(e) => setContact(e.target.value)}
          maxLength={254}
          autoComplete="email"
        />
      </label>
      <FileInput
        onFile={setAttachment}
        label="Foto o documento · facoltativo"
        demoName="foto-guasto-demo.jpg"
      />
      <Notice>
        Disponibilità, zona e tempi di risposta sono da confermare. Per un
        pericolo immediato contatta i servizi di emergenza o il gestore
        competente.
      </Notice>
      <label className="checkbox-label">
        <input
          type="checkbox"
          checked={failed}
          onChange={(e) => setFailed(e.target.checked)}
        />
        Simula errore di invio (solo demo)
      </label>
      {error && <Notice error>{error}</Notice>}
      <Button type="submit">
        Invia richiesta demo
        <ArrowRight size={17} />
      </Button>
    </form>
  );
}
function TicketPanel({ id }: { id: string }) {
  const { state, setState, houses, scenario } = useApp();
  const t = state.tickets.find((t) => t.id === id);
  const [technician, setTechnician] = useState("Marco Ferri · Idraulico");
  if (
    !t ||
    (state.role === "tecnico" && t.technician !== "Marco Ferri · Idraulico")
  )
    return (
      <Empty
        title="Incarico non accessibile"
        description="Il tecnico accede solo alle richieste assegnate."
      />
    );
  const agency = state.role === "agenzia";
  const tech = state.role === "tecnico";
  const ended = scenario === "ended";
  function change(status: Ticket["status"], event: string, assigned?: string) {
    setState((s) => ({
      ...s,
      tickets: s.tickets.map((x) =>
        x.id === id
          ? {
              ...x,
              status,
              technician:
                status === "Ricevuta" ? undefined : assigned || x.technician,
              events: [...x.events, event],
            }
          : x,
      ),
    }));
    toast.success(event);
  }
  return (
    <>
      <div className="section-title">
        <span className="eyebrow">
          {t.id} · {t.category}
        </span>
        <Badge tone={t.status === "Conclusa" ? "success" : "warning"}>
          {t.status}
        </Badge>
      </div>
      <h3>{t.title}</h3>
      <p>
        {houses.find((p) => p.id === t.property)?.name} ·{" "}
        {houses.find((p) => p.id === t.property)?.address}
      </p>
      <p className="ticket-description">{t.description}</p>
      <p>
        <strong>Contatto:</strong> {t.contact}
        <br />
        <strong>Assegnatario:</strong>{" "}
        {t.technician || "Da assegnare · referente Elena Colombo"}
      </p>
      {t.attachment && (
        <div className="attached-file">
          <FileText size={20} />
          <span>{t.attachment}</span>
          <Badge>Allegato demo</Badge>
        </div>
      )}
      <ol className="timeline">
        {t.events.map((e, i) => (
          <li key={`${i}-${e}`}>
            <span>
              <Check size={12} />
            </span>
            {e}
          </li>
        ))}
      </ol>
      {agency && t.status === "Ricevuta" && (
        <div className="inset-form">
          <label>
            Assegna a un tecnico demo
            <select
              value={technician}
              onChange={(e) => setTechnician(e.target.value)}
            >
              <option>Marco Ferri · Idraulico</option>
              <option>Anna Riva · Elettricista</option>
            </select>
          </label>
          <p>
            L’assegnazione non conferma la disponibilità. Prossimo passo:
            accettazione dell’incarico.
          </p>
          <Button
            disabled={ended}
            onClick={() =>
              change(
                "Assegnata",
                `Assegnata da Elena Colombo a ${technician} · 6 ott`,
                technician,
              )
            }
          >
            Assegna incarico demo
          </Button>
        </div>
      )}
      {(agency || tech) && t.status === "Assegnata" && (
        <Button
          disabled={ended}
          onClick={() =>
            change(
              "In lavorazione",
              `Incarico accettato da ${t.technician} · 6 ott`,
            )
          }
        >
          Simula accettazione del tecnico
        </Button>
      )}
      {(agency || tech) && t.status === "In lavorazione" && (
        <>
          <Notice>
            Il percorso dimostrativo non prevede un preventivo economico.
            Qualsiasi spesa reale richiede autorizzazione separata.
          </Notice>
          <Button
            disabled={ended}
            onClick={() =>
              change(
                "Conclusa",
                `Intervento demo concluso · rapporto di ${t.technician} · 6 ott`,
              )
            }
          >
            Concludi intervento demo
          </Button>
        </>
      )}
      {t.status === "Conclusa" && !tech && (
        <Button
          variant="secondary"
          disabled={ended}
          onClick={() =>
            change(
              "Ricevuta",
              "Pratica riaperta · nuova valutazione richiesta · 6 ott",
            )
          }
        >
          Riapri richiesta
        </Button>
      )}
      <p className="privacy-note">
        {t.status === "Ricevuta"
          ? "Prossimo passo: valutazione e assegnazione dell’agenzia."
          : t.status === "Assegnata"
            ? "Prossimo passo: il tecnico deve accettare l’incarico."
            : t.status === "In lavorazione"
              ? "Prossimo passo: aggiornamento dell’intervento e rapporto del tecnico."
              : "Pratica conclusa. Puoi riaprirla se il problema persiste."}
      </p>
    </>
  );
}
function PhysicalForm() {
  const { state, setState, close } = useApp();
  const [method, setMethod] = useState("Ritiro in agenzia");
  const [address, setAddress] = useState("");
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setState((s) => ({
          ...s,
          physical: `Interesse registrato · ${method.toLowerCase()}`,
        }));
        close();
        toast.success(
          "Interesse registrato nella demo. Nessun ordine o spedizione reale.",
        );
      }}
    >
      <Badge>{state.physical}</Badge>
      <label>
        Preferenza di consegna
        <select value={method} onChange={(e) => setMethod(e.target.value)}>
          <option>Ritiro in agenzia</option>
          <option>Spedizione</option>
        </select>
      </label>
      {method === "Spedizione" && (
        <label>
          Indirizzo dimostrativo
          <input
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
            minLength={10}
            maxLength={240}
            placeholder="Via, numero, CAP e città"
          />
        </label>
      )}
      <Notice>
        Questa azione registra un interesse. Costo, tempi e modalità effettive
        saranno mostrati prima di qualsiasi conferma d’ordine.
      </Notice>
      <Button type="submit">Registra interesse demo</Button>
    </form>
  );
}
function BookingForm() {
  const { state, setState, close, activeHouses } = useApp();
  const [slot, setSlot] = useState("");
  const [topic, setTopic] = useState("Gestione della locazione");
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setState((s) => ({
          ...s,
          booking: `${slot} · ${topic} · ${activeHouses[0]?.name || "Immobile da definire"}`,
        }));
        close();
        toast.success("Appuntamento dimostrativo riservato");
      }}
    >
      <label>
        Tema della consulenza
        <select value={topic} onChange={(e) => setTopic(e.target.value)}>
          <option>Gestione della locazione</option>
          <option>Documenti dell’immobile</option>
          <option>Valorizzazione della casa</option>
        </select>
      </label>
      <fieldset className="slot-options">
        <legend>Seleziona un orario demo</legend>
        {[
          "8 ottobre 2026 · 10:00",
          "8 ottobre 2026 · 15:30",
          "9 ottobre 2026 · 11:00",
        ].map((s) => (
          <label key={s}>
            <input
              type="radio"
              name="slot"
              value={s}
              required
              checked={s === slot}
              onChange={() => setSlot(s)}
            />
            <CalendarDays size={17} />
            {s}
          </label>
        ))}
      </fieldset>
      <Notice>
        Nessun appuntamento reale viene creato. Durata, inclusioni e platea del
        servizio devono essere confermate.
      </Notice>
      <Button type="submit" disabled={!!state.booking}>
        Conferma appuntamento demo
      </Button>
    </form>
  );
}
