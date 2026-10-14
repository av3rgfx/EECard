import { active, allowed, DAY, type State } from "../demo/model";
export const scope = {
  agency: "alfa",
  property: "casa-alfa",
  contract: "contratto-alfa",
};
export interface Request {
  id: string;
  agency: string;
  property: string;
  author: string;
  subject: string;
  detail: string;
  status: "Ricevuta" | "In lavorazione" | "Conclusa";
}
export interface Ledger {
  evidence: boolean;
  declared: number;
  verified: number;
  source: string;
  receipt: boolean;
}
export interface WorkspaceState {
  version: 1;
  renewalCancelled: boolean;
  ownerCardBlocked: boolean;
  notice: string;
  events: {
    sequence: number;
    actor: string;
    agency: string;
    action: string;
    outcome: string;
  }[];
  requests: Request[];
  ledger: Ledger;
}
export function emptyWorkspace(): WorkspaceState {
  return {
    version: 1,
    renewalCancelled: false,
    ownerCardBlocked: false,
    notice: "",
    events: [],
    requests: [],
    ledger: {
      evidence: false,
      declared: 0,
      verified: 0,
      source: "",
      receipt: false,
    },
  };
}
export function readWorkspace(): WorkspaceState {
  try {
    const s = JSON.parse(localStorage.getItem("eecard-workspace-v1") || "null");
    if (
      s?.version === 1 &&
      (!("renewalCancelled" in s) || typeof s.renewalCancelled === "boolean") &&
      Array.isArray(s.requests) &&
      (!("events" in s) || Array.isArray(s.events)) &&
      (!("ownerCardBlocked" in s) || typeof s.ownerCardBlocked === "boolean") &&
      s.ledger &&
      typeof s.ledger.verified === "number" &&
      typeof s.ledger.evidence === "boolean" &&
      typeof s.ledger.receipt === "boolean" &&
      typeof s.ledger.source === "string" &&
      Number.isFinite(s.ledger.declared) &&
      Number.isFinite(s.ledger.verified) &&
      s.ledger.verified >= 0 &&
      s.ledger.verified <= 900 &&
      s.requests.every(
        (r: Request) =>
          typeof r.id === "string" &&
          typeof r.subject === "string" &&
          typeof r.detail === "string" &&
          typeof r.agency === "string" &&
          typeof r.author === "string",
      )
    )
      return { ...emptyWorkspace(), ...s };
    if (s)
      return {
        ...emptyWorkspace(),
        notice:
          "Attività locali ripristinate: lo stato salvato era incompatibile.",
      };
  } catch {
    return {
      ...emptyWorkspace(),
      notice: "Attività locali ripristinate: la memoria non è leggibile.",
    };
  }
  return emptyWorkspace();
}
export function persistWorkspace(s: WorkspaceState) {
  try {
    localStorage.setItem("eecard-workspace-v1", JSON.stringify(s));
    return true;
  } catch {
    return false;
  }
}
// Requests and financial events have specific titles: a global role or card never suffices.
export function canOperate(s: State) {
  return (
    s.operatorAuthenticated &&
    s.serviceAvailable &&
    !s.relationEnded &&
    s.agency === "alfa" &&
    s.grants.some(
      (g) =>
        g.actor === s.actor &&
        g.agency === s.agency &&
        g.property === scope.property &&
        g.contract === scope.contract &&
        active(g) &&
        ["mandato", "rapporto"].includes(g.basis),
    ) &&
    (s.actor !== "person-alfa" || s.practice.account)
  );
}
export type WorkCommand =
  | { type: "cancelRenewal" }
  | { type: "blockOwnerCard" }
  | { type: "request"; subject: string; detail: string }
  | { type: "work"; id: string }
  | { type: "evidence" }
  | { type: "declare"; amount: number }
  | { type: "verify"; amount: number; source: string }
  | { type: "receipt" };
export function work(s: State, previous: WorkspaceState, c: WorkCommand) {
  const next = structuredClone(previous);
  const record = (outcome: string) => {
    next.events.push({
      sequence: next.events.length + 1,
      actor: s.actor,
      agency: s.agency,
      action: c.type,
      outcome,
    });
  };
  const fail = (message: string) => {
    record("negato");
    return { ok: false, message, state: next };
  };
  if (c.type === "cancelRenewal") {
    const subscription = readSubscription(s, previous);
    if (!subscription || !subscription.active)
      return fail("Abbonamento non disponibile per questa operazione.");
    if (previous.renewalCancelled)
      return {
        ok: true,
        message: "Rinnovo già disattivato nella demo.",
        state: next,
      };
    next.renewalCancelled = true;
    record("ammesso");
    return {
      ok: true,
      message:
        "Rinnovo disattivato nella demo. Il periodo di esempio resta attivo.",
      state: next,
    };
  }
  if (c.type === "blockOwnerCard") {
    if (
      s.actor !== "owner-alfa" ||
      s.agency !== "alfa" ||
      !s.operatorAuthenticated ||
      !s.serviceAvailable
    )
      return fail("Tessera non disponibile.");
    next.ownerCardBlocked = true;
    record("ammesso");
    return {
      ok: true,
      message:
        "La tessera del proprietario è bloccata. Quella del cliente non è cambiata.",
      state: next,
    };
  }
  if (!canOperate(s))
    return fail(
      "Questa operazione richiede un rapporto attivo e un titolo valido.",
    );
  if (c.type === "request") {
    if (!c.subject.trim() || !c.detail.trim())
      return fail("Indica il problema e una breve descrizione.");
    record("ammesso");
    next.requests.push({
      id: `richiesta-${next.requests.length + 1}`,
      agency: s.agency,
      property: scope.property,
      author: s.actor,
      subject: c.subject.trim(),
      detail: c.detail.trim(),
      status: "Ricevuta",
    });
    return {
      ok: true,
      message:
        "Richiesta salvata nel browser. Nessun tecnico è stato contattato.",
      state: next,
    };
  }
  if (c.type === "work") {
    if (!allowed(s, "prepare", scope))
      return fail(
        "Solo l’operatore con mandato può aggiornare questa richiesta.",
      );
    const request = next.requests.find(
      (r) =>
        r.id === c.id && r.agency === s.agency && r.property === scope.property,
    );
    if (!request) return fail("Richiesta non disponibile.");
    record("ammesso");
    request.status =
      request.status === "Ricevuta" ? "In lavorazione" : "Conclusa";
    return {
      ok: true,
      message:
        "Stato della richiesta aggiornato localmente. Non certifica un lavoro eseguito.",
      state: next,
    };
  }
  const l = next.ledger;
  if (c.type === "evidence") {
    if (s.actor !== "person-alfa")
      return fail("Solo il conduttore può aggiungere questa evidenza.");
    l.evidence = true;
  }
  if (c.type === "declare") {
    if (
      s.actor !== "person-alfa" ||
      !Number.isFinite(c.amount) ||
      c.amount <= 0 ||
      c.amount > 900
    )
      return fail("Inserisci un importo dichiarato tra 0,01 e 900 €.");
    l.declared = c.amount;
  }
  if (c.type === "verify") {
    if (!allowed(s, "prepare", scope) && s.actor !== "owner-alfa")
      return fail("Occorre il titolo del beneficiario o del suo operatore.");
    if (
      !Number.isFinite(c.amount) ||
      c.amount <= 0 ||
      c.amount > 900 ||
      !c.source.trim()
    )
      return fail(
        "Inserisci un importo verificato valido e la fonte del riscontro.",
      );
    l.verified = c.amount;
    l.source = c.source.trim();
    l.receipt = false;
  }
  if (c.type === "receipt") {
    if (
      (!allowed(s, "prepare", scope) && s.actor !== "owner-alfa") ||
      l.verified <= 0
    )
      return fail(
        "La quietanza richiede un incasso verificato dal soggetto abilitato.",
      );
    l.receipt = true;
  }
  record("ammesso");
  return {
    ok: true,
    message:
      c.type === "evidence"
        ? "Facsimile collegato. Non dimostra un incasso."
        : c.type === "declare"
          ? "Dichiarazione registrata. L’incasso resta da verificare."
          : c.type === "verify"
            ? "Riscontro sintetico registrato. Il residuo è aggiornato."
            : "Quietanza facsimile preparata. Il residuo rimane invariato.",
    state: next,
  };
}
// A named synthetic membership, not a right inherited from property ownership,
// card status or the lease. These dates are independent demonstration fixtures.
export function readSubscription(s: State, u: WorkspaceState, today = DAY) {
  if (
    s.actor !== "person-alfa" ||
    s.agency !== "alfa" ||
    !s.practice.account ||
    !s.operatorAuthenticated ||
    !s.serviceAvailable
  )
    return null;
  const from = "2026-01-01",
    until = "2027-01-01";
  return {
    from,
    until,
    today,
    active:
      s.practice.membership === "attiva simulata" &&
      today >= from &&
      today < until,
    renewalCancelled: u.renewalCancelled,
  };
}
export function visibleRequests(s: State, u: WorkspaceState) {
  return canOperate(s)
    ? u.requests.filter(
        (r) =>
          r.agency === s.agency &&
          r.property === scope.property &&
          (s.actor !== "person-alfa" || r.author === s.actor),
      )
    : [];
}
