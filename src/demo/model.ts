// Synthetic, local policy laboratory. This module never calls a remote service.
export const SCHEMA = 4;
export const STORAGE = "eecard-functional-v4";
export const DAY = "2026-10-14";
export type Action =
  "read" | "share" | "export" | "prepare" | "invite" | "draft";
export type Purpose = "storico" | "attivazione" | "utenze" | "lavori";
export type Scenario =
  | "success"
  | "incomplete"
  | "revoked"
  | "ended"
  | "other"
  | "reader"
  | "service";
export const scenarios: Record<Scenario, string> = {
  success: "Percorso riuscito",
  incomplete: "Mancanti e conflitti",
  revoked: "Card revocata",
  ended: "Rapporto concluso",
  other: "Agenzia diversa",
  reader: "Lettore indisponibile",
  service: "Servizio indisponibile",
};
export interface Scope {
  agency: string;
  property: string;
  contract?: string;
  person?: string;
}
export interface Grant extends Scope {
  id: string;
  actor: string;
  actions: Action[];
  purposes: Purpose[];
  from: string;
  until?: string;
  revoked?: boolean;
  basis:
    | "mandato"
    | "rapporto"
    | "intestazione"
    | "delega"
    | "incarico"
    | "autonomo";
  document?: string;
}
export interface Version {
  number: number;
  source: string;
  acquired: string;
  author: string;
  correction: string;
  formal: string;
  specialist: string;
  text: string;
}
export interface Document extends Scope {
  id: string;
  title: string;
  type: string;
  from: number;
  to: number;
  precision: string;
  privateFor?: string;
  versions: Version[];
}
export interface Event {
  sequence: number;
  actor: string;
  agency: string;
  action: string;
  object: string;
  outcome: string;
  registered: string;
  effective: string;
}
export interface State {
  schema: 4;
  scenario: Scenario;
  step: "practice" | "desk" | "history" | "extensions";
  agency: string;
  actor: string;
  operatorAuthenticated: boolean;
  practice: {
    corrected: boolean;
    supplied: boolean;
    verified: boolean;
    invitations: string[];
    account: boolean;
    membership: "proposta" | "attiva simulata" | "terminata";
    card: "non emessa" | "attiva" | "revocata";
    revision: number;
  };
  relationEnded: boolean;
  readerAvailable: boolean;
  serviceAvailable: boolean;
  session: {
    id: string;
    candidate?: string;
    person?: string;
    purpose?: Purpose;
    property?: string;
    contract?: string;
    status: "ready" | "selected" | "open" | "closed";
    shared?: { document: string; version: number; recipient: string };
  } | null;
  grants: Grant[];
  documents: Document[];
  events: Event[];
  operations: Record<string, string>;
  draft: {
    version: number;
    template: string;
    sourceRevision: number;
    text: string;
    sources: string[];
    missing: string[];
    conflicts: string[];
    reviewed: boolean;
  }[];
  notes: string;
  completed: string[];
  storageNotice: string;
}
export const agencies = [
  { id: "alfa", name: "Agenzia Alfa · sintetica" },
  { id: "beta", name: "Agenzia Beta · sintetica" },
];
export const actors = [
  { id: "op-alfa", name: "Operatore Alfa 02", agency: "alfa" },
  { id: "op-beta", name: "Operatore Beta 02", agency: "beta" },
  { id: "person-alfa", name: "Persona Alfa 01", agency: "alfa" },
  { id: "owner-alfa", name: "Proprietario Alfa 02", agency: "alfa" },
  { id: "tech-alfa", name: "Tecnico Alfa 03", agency: "alfa" },
];
const scope = {
  agency: "alfa",
  property: "casa-alfa",
  contract: "contratto-alfa",
};
const version = (
  number: number,
  correction: string,
  text: string,
): Version => ({
  number,
  source:
    number === 1
      ? "Archivio sintetico acquisito da Operatore Alfa 01"
      : "Rettifica sintetica · confronto con facsimile",
  acquired: number === 1 ? "2026-10-01" : "2026-10-08",
  author: "Operatore Alfa 01",
  correction,
  formal:
    number === 1
      ? "Da controllare"
      : "Leggibilità controllata · operatore demo",
  specialist: "Non effettuato: nessuna certificazione tecnica",
  text,
});
export function initialState(scenario: Scenario = "success"): State {
  const documents: Document[] = [
    {
      ...scope,
      id: "contratto-alfa",
      title: "Contratto di locazione · facsimile",
      type: "contratto",
      from: 2026,
      to: 2026,
      precision: "anno noto",
      versions: [
        version(
          1,
          "Nessuna",
          "Locazione sintetica · canone 900 EUR, deposito 1800 EUR. Nessuna quota EECard definita.",
        ),
      ],
    },
    {
      ...scope,
      id: "tecnico-alfa",
      title: "Impianto elettrico · relazione storica",
      type: "tecnico",
      from: 2018,
      to: 2020,
      precision: "intervallo incerto 2018–2020",
      versions: [
        version(
          1,
          "Data originale non accertata",
          "Relazione sintetica: anno stimato 2019. Fonte da confrontare.",
        ),
        version(
          2,
          "L'anno 2019 non è confermato: mantenuto intervallo 2018–2020",
          "Relazione sintetica rettificata. Lavoro documentato da facsimile, senza attestazione di conformità.",
        ),
      ],
    },
    {
      ...scope,
      id: "bolletta-alfa",
      title: "Energia · bolletta privata facsimile",
      type: "bolletta",
      from: 2026,
      to: 2026,
      precision: "ottobre 2026",
      privateFor: "person-alfa",
      versions: [
        version(
          1,
          "Nessuna",
          "Creditore Energia Esempio · 84 EUR · scadenza 31 ottobre 2026. QR facsimile non utilizzabile per pagare.",
        ),
      ],
    },
    {
      agency: "alfa",
      property: "casa-propria",
      id: "bolletta-propria",
      title: "Energia · casa propria facsimile",
      type: "bolletta",
      from: 2026,
      to: 2026,
      precision: "ottobre 2026",
      privateFor: "person-alfa",
      versions: [
        version(
          1,
          "Nessuna",
          "Creditore Energia Esempio · 61 EUR · scadenza 29 ottobre 2026.",
        ),
      ],
    },
    {
      agency: "beta",
      property: "casa-beta",
      contract: "contratto-beta",
      id: "contratto-beta",
      title: "Contratto di locazione · facsimile",
      type: "contratto",
      from: 2026,
      to: 2026,
      precision: "anno noto",
      versions: [
        {
          ...version(
            1,
            "Nessuna",
            "Contratto sintetico Beta. Archivio isolato.",
          ),
          source: "Archivio sintetico Beta",
          author: "Operatore Beta 01",
        },
      ],
    },
  ];
  const grant = (
    id: string,
    actor: string,
    basis: Grant["basis"],
    actions: Action[],
    document?: string,
  ): Grant => ({
    ...scope,
    id,
    actor,
    basis,
    actions,
    purposes: ["attivazione", "storico", "lavori"],
    from: "2026-01-01",
    until: "2027-01-01",
    document,
  });
  const grants: Grant[] = [
    grant("mandato-alfa", "op-alfa", "mandato", [
      "read",
      "share",
      "export",
      "prepare",
      "invite",
      "draft",
    ]),
    {
      ...grant("mandato-beta", "op-beta", "mandato", [
        "read",
        "prepare",
        "invite",
        "draft",
      ]),
      agency: "beta",
      property: "casa-beta",
      contract: "contratto-beta",
    },
    grant(
      "locazione",
      "person-alfa",
      "rapporto",
      ["read", "export"],
      "contratto-alfa",
    ),
    grant(
      "storico-autonomo",
      "person-alfa",
      "autonomo",
      ["read"],
      "tecnico-alfa",
    ),
    grant("proprieta", "owner-alfa", "rapporto", ["read", "export"]),
    {
      ...grant("incarico", "tech-alfa", "incarico", ["read"], "tecnico-alfa"),
      purposes: ["lavori"],
    },
    {
      ...grant(
        "intestazione",
        "person-alfa",
        "intestazione",
        ["read", "export"],
        "bolletta-alfa",
      ),
      purposes: ["utenze"],
    },
    {
      ...grant(
        "utenza-propria",
        "person-alfa",
        "intestazione",
        ["read"],
        "bolletta-propria",
      ),
      property: "casa-propria",
      contract: undefined,
      purposes: ["utenze"],
    },
    {
      ...grant(
        "delega-scaduta",
        "owner-alfa",
        "delega",
        ["read"],
        "bolletta-alfa",
      ),
      purposes: ["utenze"],
      until: "2026-10-01",
    },
  ];
  const preactivated = !["success", "incomplete"].includes(scenario);
  return {
    schema: SCHEMA,
    scenario,
    step: "practice",
    agency: scenario === "other" ? "beta" : "alfa",
    actor: scenario === "other" ? "op-beta" : "op-alfa",
    operatorAuthenticated: true,
    practice: {
      corrected: preactivated,
      supplied: preactivated,
      verified: preactivated,
      invitations: preactivated ? ["owner-alfa", "person-alfa"] : [],
      account: preactivated,
      membership: preactivated ? "attiva simulata" : "proposta",
      card:
        scenario === "revoked"
          ? "revocata"
          : preactivated
            ? "attiva"
            : "non emessa",
      revision: 1,
    },
    relationEnded: scenario === "ended",
    readerAvailable: scenario !== "reader",
    serviceAvailable: scenario !== "service",
    session: null,
    grants,
    documents,
    events: [],
    operations: {},
    draft: [],
    notes: "",
    completed: [],
    storageNotice: "Schema locale 0.4 · soli dati sintetici",
  };
}
export function active(g: Grant, now = DAY) {
  return !g.revoked && g.from <= now && (!g.until || now < g.until);
}
// Date civili ISO, UTC: inizio incluso, fine esclusa. These are fixture intervals, not legal retention periods.
export function titleAllows(
  s: State,
  actor: string,
  action: Action,
  object: Scope & { id?: string; privateFor?: string },
  purpose: Purpose,
): boolean {
  if (
    object.agency !== s.agency ||
    !actors.some((a) => a.id === actor && a.agency === s.agency)
  )
    return false;
  return s.grants.some((g) => {
    if (
      g.actor !== actor ||
      g.agency !== object.agency ||
      g.property !== object.property ||
      (g.contract && g.contract !== object.contract) ||
      (g.document && g.document !== object.id) ||
      !g.actions.includes(action) ||
      !g.purposes.includes(purpose) ||
      !active(g)
    )
      return false;
    if (
      s.relationEnded &&
      g.basis === "rapporto" &&
      g.contract === "contratto-alfa"
    )
      return false;
    if (actor === "person-alfa" && !s.practice.account) return false;
    if (
      object.privateFor &&
      actor !== object.privateFor &&
      g.basis !== "delega"
    )
      return false;
    return true;
  });
}
export interface Request {
  actor?: string;
  purpose?: Purpose;
  property?: string;
  contract?: string;
  desk?: boolean;
}
export function allowed(
  s: State,
  action: Action,
  object: Scope & { id?: string; privateFor?: string },
  r: Request = {},
): boolean {
  if (!s.serviceAvailable || !s.operatorAuthenticated) return false;
  const actor = r.actor ?? s.actor,
    purpose = r.purpose ?? s.session?.purpose ?? "attivazione";
  if (r.desk) {
    const visit = s.session;
    if (
      !visit ||
      visit.status !== "open" ||
      !visit.person ||
      visit.property !== object.property ||
      visit.contract !== object.contract ||
      visit.purpose !== purpose
    )
      return false;
    if (!titleAllows(s, visit.person, "read", object, purpose)) return false;
  }
  if (
    (r.property && r.property !== object.property) ||
    (r.contract && r.contract !== object.contract)
  )
    return false;
  return titleAllows(s, actor, action, object, purpose);
}
export interface Search {
  title?: string;
  type?: string;
  from?: string;
  to?: string;
}
export function search(
  s: State,
  query: Search = {},
  request: Request = {},
): Document[] {
  const lo = query.from ? Number(query.from) : -Infinity,
    hi = query.to ? Number(query.to) : Infinity;
  if (Number.isNaN(lo) || Number.isNaN(hi) || lo > hi) return [];
  return s.documents.filter(
    (d) =>
      allowed(s, "read", d, request) &&
      (!query.title ||
        d.title
          .toLocaleLowerCase("it")
          .includes(query.title.toLocaleLowerCase("it"))) &&
      (!query.type || d.type === query.type) &&
      d.to >= lo &&
      d.from <= hi,
  );
}
export function readVersion(
  s: State,
  id: string,
  number: number,
  request: Request = {},
): Version | null {
  const d = s.documents.find((d) => d.id === id);
  return d && allowed(s, "read", d, request)
    ? (d.versions.find((v) => v.number === number) ?? null)
    : null;
}
export type Command =
  | {
      type: "file";
      id: string;
      version: number;
      action: "read" | "export";
      purpose: Purpose;
    }
  | { type: "blockOwnCard" }
  | { type: "inspect"; id: string; version: number }
  | {
      type:
        | "correct"
        | "supply"
        | "verify"
        | "invite"
        | "activate"
        | "revoke"
        | "endRelation"
        | "endMembership"
        | "newVersion"
        | "generate"
        | "review";
      key: string;
    }
  | { type: "present"; channel: "card" | "code" | "manual"; code: string }
  | {
      type: "open";
      confirmed: boolean;
      purpose: Purpose;
      property: string;
      contract: string;
    }
  | {
      type: "document";
      action: "read" | "share" | "export";
      id: string;
      version: number;
      recipient?: string;
    }
  | { type: "close" | "retryService" | "retryReader" | "logout" | "login" }
  | { type: "switch"; actor: string; agency: string }
  | { type: "revokeTitle"; id: string };
export interface Result {
  state: State;
  ok: boolean;
  message: string;
  version?: Version;
}
export function execute(previous: State, c: Command): Result {
  const s = structuredClone(previous);
  const finish = (ok: boolean, message: string, version?: Version): Result => {
    // Do not disclose foreign object identifiers in the local operator audit.
    s.events.push({
      sequence: s.events.length + 1,
      actor: previous.actor,
      agency: previous.agency,
      action: c.type === "document" || c.type === "file" ? c.action : c.type,
      object:
        (c.type === "document" || c.type === "file") &&
        s.documents.some((d) => d.id === c.id && d.agency === s.agency)
          ? c.id
          : "contesto-demo",
      outcome: ok ? "ammesso" : "negato",
      registered: `${DAY} · evento locale ${s.events.length + 1}`,
      effective: DAY,
    });
    return { state: s, ok, message, version };
  };
  if (c.type === "switch") {
    if (!actors.some((a) => a.id === c.actor && a.agency === c.agency))
      return finish(false, "Contesto non disponibile.");
    s.actor = c.actor;
    s.agency = c.agency;
    s.session = null;
    s.operatorAuthenticated = true;
    return finish(true, "Contesto cambiato: la visita precedente è chiusa.");
  }
  if (c.type === "logout") {
    s.operatorAuthenticated = false;
    s.session = null;
    return finish(true, "Sessione demo chiusa. Nessun contenuto condiviso.");
  }
  if (c.type === "login") {
    s.operatorAuthenticated = true;
    s.session = null;
    return finish(true, "Accesso demo simulato; nuova postazione vuota.");
  }
  if (!s.operatorAuthenticated)
    return finish(false, "Sessione demo chiusa: accedi di nuovo.");
  if (c.type === "close") {
    if (s.session) s.session = { id: s.session.id, status: "closed" };
    s.completed = [...new Set([...s.completed, "chiusura"])];
    return finish(true, "Visita chiusa. Riepilogo e documento rimossi.");
  }
  if (c.type === "retryService") {
    s.serviceAvailable = true;
    s.session = null;
    return finish(
      true,
      "Servizio demo ripristinato. Conferma di nuovo la persona.",
    );
  }
  if (!s.serviceAvailable) {
    s.session = null;
    return finish(
      false,
      "Servizio indisponibile: consultazione sospesa, nessun dato privato offline. Riprova.",
    );
  }
  if (c.type === "retryReader") {
    s.readerAvailable = true;
    return finish(true, "Lettore demo ripristinato; nessuna prova NFC.");
  }
  if (c.type === "present") {
    s.session = null;
    if (!s.actor.startsWith("op-"))
      return finish(false, "Occorre un operatore demo con mandato.");
    if (c.channel === "card" && !s.readerAvailable)
      return finish(
        false,
        "Lettore indisponibile. Usa il codice o la verifica assistita simulata.",
      );
    if (s.agency !== "alfa" || !allowed(s, "read", scope))
      return finish(false, "Persona o contesto non disponibili.");
    if (!s.practice.account || c.code !== "DEMO-ALFA-01")
      return finish(false, "Persona o contesto non disponibili.");
    if (c.channel !== "manual" && s.practice.card !== "attiva")
      return finish(
        false,
        "Credenziale non utilizzabile. Possibile verifica assistita, senza riattivare la card.",
      );
    s.session = {
      id: `visita-${s.events.length + 1}`,
      candidate: "person-alfa",
      status: "selected",
    };
    return finish(
      true,
      "Persona selezionata. Conferma corrispondenza, scopo e contesto prima di leggere.",
    );
  }
  if (c.type === "open") {
    if (
      !s.session?.candidate ||
      !c.confirmed ||
      c.property !== "casa-alfa" ||
      c.contract !== "contratto-alfa" ||
      !titleAllows(s, s.actor, "read", scope, c.purpose)
    )
      return finish(
        false,
        "Conferma, scopo e contesto autorizzato sono necessari.",
      );
    s.session = {
      ...s.session,
      person: s.session.candidate,
      purpose: c.purpose,
      property: c.property,
      contract: c.contract,
      status: "open",
    };
    s.completed = [...new Set([...s.completed, "PF02"])];
    return finish(
      true,
      "Visita aperta: solo dati minimi e documenti autorizzati.",
    );
  }
  if (c.type === "file") {
    const d = s.documents.find((d) => d.id === c.id);
    if (!d || !allowed(s, c.action, d, { purpose: c.purpose }))
      return finish(false, "Documento o azione non disponibili.");
    const v = readVersion(s, c.id, c.version, { purpose: c.purpose });
    if (!v) return finish(false, "Versione non disponibile.");
    return finish(
      true,
      c.action === "read"
        ? "Documento aperto nel contesto autorizzato."
        : "Facsimile esportato solo in locale.",
      v,
    );
  }
  if (c.type === "blockOwnCard") {
    if (s.actor !== "person-alfa" || s.agency !== "alfa" || !s.practice.account)
      return finish(false, "Credenziale non disponibile.");
    s.practice.card = "revocata";
    s.session = null;
    return finish(
      true,
      "Tessera bloccata. Il rapporto e i tuoi documenti non sono cancellati.",
    );
  }
  if (c.type === "inspect") {
    const v = readVersion(s, c.id, c.version, { purpose: "attivazione" });
    if (!v)
      return finish(false, "Documento non disponibile nel mandato corrente.");
    return finish(
      true,
      "Lettura sintetica nel mandato dell'agenzia corrente.",
      v,
    );
  }
  if (c.type === "document") {
    const d = s.documents.find((d) => d.id === c.id),
      request = { desk: true };
    if (!d || !allowed(s, c.action, d, request))
      return finish(
        false,
        "Documento o azione non disponibili per questo titolo.",
      );
    const v = readVersion(s, c.id, c.version, request);
    if (!v) return finish(false, "Versione non disponibile.");
    if (c.action === "share") {
      if (
        !c.recipient ||
        c.recipient !== s.session?.person ||
        !titleAllows(s, c.recipient, "read", d, s.session!.purpose!)
      )
        return finish(false, "Destinatario non autorizzato.");
      s.session!.shared = {
        document: d.id,
        version: v.number,
        recipient: c.recipient,
      };
    }
    s.completed = [...new Set([...s.completed, "PF05"])];
    return finish(
      true,
      c.action === "read"
        ? "Lettura simulata autorizzata."
        : c.action === "share"
          ? "Condivisione simulata sul riepilogo locale."
          : "Esportazione simulata autorizzata: facsimile locale, nessun invio.",
      v,
    );
  }
  if (!allowed(s, "prepare", scope))
    return finish(false, "Operazione non disponibile nel mandato corrente.");
  if (c.type === "revokeTitle") {
    const g = s.grants.find((g) => g.id === c.id && g.agency === s.agency);
    if (!g) return finish(false, "Titolo non disponibile.");
    g.revoked = true;
    if (s.session) s.session.shared = undefined;
    return finish(
      true,
      "Titolo revocato; i nuovi recuperi vengono rivalutati.",
    );
  }
  if (!("key" in c)) return finish(false, "Operazione non disponibile.");
  const opKey = `${s.agency}:${s.actor}:${c.type}:${c.key}`;
  if (s.operations[opKey])
    return finish(true, "Operazione già registrata: nessun duplicato.");
  const p = s.practice;
  switch (c.type) {
    case "correct":
      p.corrected = true;
      p.revision++;
      break;
    case "supply":
      p.supplied = true;
      p.revision++;
      break;
    case "verify":
      if (!p.corrected || !p.supplied)
        return finish(
          false,
          "Risolvere conflitto e mancante prima della verifica.",
        );
      p.verified = true;
      break;
    case "invite":
      if (!p.verified || !allowed(s, "invite", scope))
        return finish(
          false,
          "Rapporto verificato e facoltà di invitare necessari.",
        );
      p.invitations = ["owner-alfa", "person-alfa"];
      break;
    case "activate":
      if (p.invitations.length !== 2 || !p.verified)
        return finish(
          false,
          "Preparare prima gli inviti individuali simulati.",
        );
      p.account = true;
      p.membership = "attiva simulata";
      if (p.card !== "revocata") p.card = "attiva";
      s.completed = [...new Set([...s.completed, "PF01"])];
      break;
    case "revoke":
      p.card = "revocata";
      s.session = null;
      break;
    case "endRelation":
      s.relationEnded = true;
      if (s.session) s.session.shared = undefined;
      break;
    case "endMembership":
      p.membership = "terminata";
      break;
    case "newVersion": {
      const d = s.documents.find((d) => d.id === "tecnico-alfa")!;
      d.versions.push(
        version(
          d.versions.length + 1,
          "Nuova rettifica attribuita a Operatore Alfa 02",
          "Facsimile aggiornato: cronologia preservata, controllo specialistico non effettuato.",
        ),
      );
      break;
    }
    case "generate": {
      if (!allowed(s, "draft", scope))
        return finish(false, "Titolo di compilazione necessario.");
      s.draft.push({
        version: s.draft.length + 1,
        template: "Locazione sintetica T01 v1",
        sourceRevision: p.revision,
        text: "BOZZA FACSIMILE — Casa Alfa 01; Persona Alfa 01 conduttore; Proprietario Alfa 02 locatore; canone 900 EUR; deposito 1800 EUR. Non firmata e non registrata.",
        sources: [
          "Pratica sintetica Alfa · revisione " + p.revision,
          "Contratto facsimile · v1",
          "Template T01 · v1",
        ],
        missing: p.supplied ? [] : ["Allegato sintetico di verifica"],
        conflicts: p.corrected
          ? []
          : ["Data inizio: fonte A 01/10/2026, fonte B 02/10/2026"],
        reviewed: false,
      });
      break;
    }
    case "review": {
      const d = s.draft.at(-1);
      if (
        !d ||
        d.missing.length ||
        d.conflicts.length ||
        d.sourceRevision !== p.revision
      )
        return finish(
          false,
          "Revisione bloccata: fonti cambiate, mancanti o conflitti.",
        );
      d.reviewed = true;
      break;
    }
  }
  s.operations[opKey] = c.type;
  return finish(
    true,
    `${c.type === "correct" ? "Correzione attribuita: fonte A confermata; fonte B conservata" : c.type === "activate" ? "Account collegato, adesione demo e card distinti. Attivazione soltanto simulata" : "Operazione locale registrata"}.`,
  );
}
function validState(s: State): boolean {
  const fixture = initialState(s.scenario);
  return (
    ["practice", "desk", "history", "extensions"].includes(s.step) &&
    typeof s.operatorAuthenticated === "boolean" &&
    typeof s.serviceAvailable === "boolean" &&
    typeof s.readerAvailable === "boolean" &&
    typeof s.relationEnded === "boolean" &&
    typeof s.practice.corrected === "boolean" &&
    typeof s.practice.supplied === "boolean" &&
    typeof s.practice.verified === "boolean" &&
    typeof s.practice.account === "boolean" &&
    Number.isInteger(s.practice.revision) &&
    Array.isArray(s.practice.invitations) &&
    ["proposta", "attiva simulata", "terminata"].includes(
      s.practice.membership,
    ) &&
    ["non emessa", "attiva", "revocata"].includes(s.practice.card) &&
    Array.isArray(s.completed) &&
    s.grants.length === fixture.grants.length &&
    s.grants.every(
      (g) =>
        fixture.grants.some(
          (f) =>
            f.id === g.id &&
            f.actor === g.actor &&
            f.agency === g.agency &&
            f.property === g.property &&
            f.basis === g.basis,
        ) &&
        Array.isArray(g.actions) &&
        Array.isArray(g.purposes) &&
        typeof g.from === "string",
    ) &&
    s.documents.length === fixture.documents.length &&
    s.documents.every(
      (d) =>
        fixture.documents.some(
          (f) =>
            f.id === d.id && f.agency === d.agency && f.property === d.property,
        ) &&
        Array.isArray(d.versions) &&
        d.versions.length > 0 &&
        d.versions.every(
          (v) =>
            Number.isInteger(v.number) &&
            typeof v.text === "string" &&
            typeof v.source === "string",
        ),
    ) &&
    s.events.every(
      (e) =>
        typeof e.actor === "string" &&
        typeof e.agency === "string" &&
        typeof e.action === "string",
    ) &&
    s.draft.every(
      (d) =>
        Number.isInteger(d.version) &&
        typeof d.text === "string" &&
        Array.isArray(d.sources) &&
        Array.isArray(d.missing) &&
        Array.isArray(d.conflicts),
    )
  );
}
export function readState(
  storage?: Pick<Storage, "getItem" | "removeItem">,
): State {
  try {
    const local = storage ?? localStorage;
    const raw = local.getItem(STORAGE);
    if (raw) {
      const s = JSON.parse(raw) as State;
      // Validate structural shape against the deterministic fixture; reject stale or corrupt state.
      if (
        s.schema === SCHEMA &&
        s.scenario in scenarios &&
        Array.isArray(s.grants) &&
        Array.isArray(s.documents) &&
        Array.isArray(s.events) &&
        Array.isArray(s.draft) &&
        typeof s.notes === "string" &&
        s.practice &&
        s.operations &&
        validState(s) &&
        actors.some((a) => a.id === s.actor && a.agency === s.agency)
      ) {
        // Bank visits are not restored: new visit verification is required after reload.
        return {
          ...s,
          session: null,
          storageNotice:
            "Stato 0.4 ripristinato; la visita al banco va confermata di nuovo.",
        };
      }
      local.removeItem(STORAGE);
      return {
        ...initialState(),
        storageNotice:
          "Stato locale incompatibile: reset esplicito ai soli dati sintetici 0.4.",
      };
    }
    if (local.getItem("eecard-demo-v1"))
      return {
        ...initialState(),
        storageNotice:
          "Schema 0.3 rilevato: non importato. La demo 0.4 parte da fixture sintetiche; il prototipo 0.3 è conservato.",
      };
  } catch {
    return {
      ...initialState(),
      storageNotice:
        "Memoria locale non leggibile: ripristino delle fixture 0.4.",
    };
  }
  return initialState();
}
export function persist(s: State): boolean {
  try {
    localStorage.setItem(STORAGE, JSON.stringify({ ...s, session: null }));
    return true;
  } catch {
    return false;
  }
}
