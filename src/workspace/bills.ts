import { active, allowed, DAY, type State } from "../demo/model";

export const billFields = {
  creditor: "Creditore",
  holder: "Intestatario",
  amount: "Importo",
  currency: "Valuta",
  due: "Scadenza",
  period: "Periodo",
  supply: "Fornitura",
  notice: "Identificativo avviso",
} as const;
export type BillField = keyof typeof billFields;
export type BillData = Record<BillField, string>;
export interface BillSource {
  id: string;
  property: string;
  anchor: string;
  label: string;
  revision: number;
  pages: number;
  schema: "avviso dimostrativo" | "senza codice" | "altro formato";
  quality: "leggibile" | "illeggibile";
  code: "facsimile" | "assente" | "illeggibile" | "non supportato";
  debit: "ignota" | "indicata nell’originale";
  payment: "ignoto" | "pagato indicato nell’originale, non verificato";
  original: BillData;
  extracted: BillData;
}
const data = (property: string, patch: Partial<BillData> = {}): BillData => ({
  creditor: "Energia Esempio",
  holder: "Cliente 01",
  amount: property === "casa-alfa" ? "84,00" : "61,00",
  currency: "EUR",
  due: property === "casa-alfa" ? "2026-10-31" : "2026-10-29",
  period: "2026-10",
  supply: property === "casa-alfa" ? "DEMO-LUCE" : "DEMO-ATELIER",
  notice: property === "casa-alfa" ? "DEMO-OTT-LUCE" : "DEMO-OTT-ATELIER",
  ...patch,
});
function source(
  id: string,
  property: string,
  label: string,
  patch: Partial<BillData> = {},
  extra: Partial<BillSource> = {},
): BillSource {
  const original = data(property, patch);
  return {
    id,
    property,
    anchor: property === "casa-alfa" ? "bolletta-alfa" : "bolletta-propria",
    label,
    revision: 1,
    pages: 1,
    schema: "avviso dimostrativo",
    quality: "leggibile",
    code: original.notice ? "facsimile" : "assente",
    debit: "ignota",
    payment: "ignoto",
    original,
    extracted: { ...original },
    ...extra,
  };
}
// Original and proposed extraction are deliberately distinct. These are fixtures, not OCR output.
const sources: BillSource[] = [
  source("luce-ott", "casa-alfa", "Ottobre · già in archivio"),
  source("atelier-ott", "casa-propria", "Ottobre · già in archivio"),
  source(
    "luce-nov",
    "casa-alfa",
    "Novembre · importo da correggere",
    {
      amount: "96,40",
      due: "2026-11-30",
      period: "2026-11",
      notice: "DEMO-NOV-LUCE",
    },
    {
      extracted: data("casa-alfa", {
        amount: "964,00",
        due: "2026-11-30",
        period: "2026-11",
        notice: "DEMO-NOV-LUCE",
      }),
    },
  ),
  source(
    "luce-nov-copia",
    "casa-alfa",
    "Novembre · seconda copia dello stesso avviso",
    {
      amount: "96,40",
      due: "2026-11-30",
      period: "2026-11",
      notice: "DEMO-NOV-LUCE",
    },
  ),
  source(
    "luce-ott-rettifica",
    "casa-alfa",
    "Ottobre · rettifica del fornitore",
    { amount: "79,00" },
    { revision: 2 },
  ),
  source(
    "atelier-nov",
    "casa-propria",
    "Novembre · senza codice, due pagine",
    { amount: "58,20", due: "2026-11-29", period: "2026-11", notice: "" },
    { schema: "senza codice", pages: 2, debit: "indicata nell’originale" },
  ),
  source(
    "luce-set",
    "casa-alfa",
    "Settembre · pagamento indicato, altro formato",
    { amount: "72,10", due: "2026-09-30", period: "2026-09", notice: "" },
    {
      schema: "altro formato",
      code: "non supportato",
      payment: "pagato indicato nell’originale, non verificato",
    },
  ),
  source(
    "luce-dic-codice-illeggibile",
    "casa-alfa",
    "Dicembre · codice illeggibile, testo leggibile",
    {
      amount: "88,30",
      due: "2026-12-31",
      period: "2026-12",
      notice: "DEMO-DIC-LUCE",
    },
    { code: "illeggibile" },
  ),
  source(
    "luce-illeggibile",
    "casa-alfa",
    "Copia illeggibile · prova recupero",
    {},
    { quality: "illeggibile" },
  ),
];
export interface BillRevision {
  number: number;
  sourceId: string;
  sourceRevision: number;
  author: string;
  acquired: string;
  reason: string;
  data: BillData;
  amountCents: number;
  fields: Record<
    BillField,
    {
      source: string;
      page: number;
      confidence: "esempio coerente" | "incerta";
      proposed: string;
      corrected: boolean;
      reviewer: string;
    }
  >;
}
export interface Bill {
  id: string;
  property: string;
  anchor: string;
  agency: "alfa";
  holder: "person-alfa";
  versions: BillRevision[];
}
export interface BillDraft {
  sourceId: string;
  actor: string;
  agency: string;
  property: string;
  expectedVersion: number;
  data: BillData;
}

// Dedicated acquisition titles, tied to existing object-level titles. Revocation,
// scope, purpose and time of the parent title are rechecked for every operation.
const acquisitionTitles = [
  {
    parent: "intestazione",
    actor: "person-alfa",
    property: "casa-alfa",
    anchor: "bolletta-alfa",
  },
  {
    parent: "utenza-propria",
    actor: "person-alfa",
    property: "casa-propria",
    anchor: "bolletta-propria",
  },
  {
    parent: "delega-scaduta",
    actor: "owner-alfa",
    property: "casa-alfa",
    anchor: "bolletta-alfa",
  },
];
export function canImportBill(s: State, property: string) {
  return acquisitionTitles.some((t) => {
    const g = s.grants.find((g) => g.id === t.parent);
    const doc = s.documents.find((d) => d.id === t.anchor);
    return (
      t.actor === s.actor &&
      t.property === property &&
      g &&
      doc &&
      g.actor === s.actor &&
      g.agency === "alfa" &&
      g.property === property &&
      g.document === t.anchor &&
      g.actions.includes("read") &&
      g.purposes.includes("utenze") &&
      (!g.contract || g.contract === doc.contract) &&
      ["intestazione", "delega"].includes(g.basis) &&
      active(g) &&
      allowed(s, "read", doc, { purpose: "utenze", property })
    );
  });
}
function canReadBill(
  s: State,
  b: Pick<Bill, "anchor" | "property" | "agency" | "holder">,
) {
  const doc = s.documents.find((d) => d.id === b.anchor);
  return (
    b.agency === s.agency &&
    b.holder === "person-alfa" &&
    doc &&
    doc.property === b.property &&
    allowed(s, "read", doc, { purpose: "utenze", property: b.property })
  );
}
export function availableBillSources(s: State, property: string) {
  return canImportBill(s, property)
    ? structuredClone(sources.filter((f) => f.property === property))
    : [];
}
export function readBillSource(s: State, property: string, id: string) {
  const f = sources.find((f) => f.id === id && f.property === property);
  return f && canReadBill(s, { ...f, agency: "alfa", holder: "person-alfa" })
    ? structuredClone(f)
    : null;
}
export function visibleBills(s: State, bills: Bill[], property: string) {
  return structuredClone(
    bills.filter((b) => b.property === property && canReadBill(s, b)),
  );
}
export function readBill(
  s: State,
  bills: Bill[],
  property: string,
  id: string,
) {
  return visibleBills(s, bills, property).find((b) => b.id === id) ?? null;
}
export function money(value: string) {
  return typeof value === "string" &&
    /^\d{1,7}(?:[,.]\d{2})?$/.test(value.trim())
    ? Math.round(Number(value.replace(",", ".")) * 100)
    : NaN;
}
function identity(f: BillSource) {
  const d = f.original;
  // Immutable source identity cannot be bypassed by editing a proposed field.
  return [
    f.property,
    d.creditor.toLocaleLowerCase("it"),
    d.supply,
    d.period,
    d.notice,
  ].join("|");
}
function makeRevision(
  f: BillSource,
  number: number,
  author: string,
  reason: string,
): BillRevision {
  return {
    number,
    sourceId: f.id,
    sourceRevision: f.revision,
    author,
    acquired: DAY,
    reason,
    data: { ...f.original },
    amountCents: money(f.original.amount),
    fields: Object.fromEntries(
      (Object.keys(billFields) as BillField[]).map((key) => [
        key,
        {
          source: f.id,
          page: f.pages === 2 && ["supply", "notice"].includes(key) ? 2 : 1,
          confidence:
            f.original[key] === f.extracted[key]
              ? "esempio coerente"
              : "incerta",
          proposed: f.extracted[key],
          corrected: f.original[key] !== f.extracted[key],
          reviewer: author,
        },
      ]),
    ) as BillRevision["fields"],
  };
}
export function initialBills(): Bill[] {
  return sources.slice(0, 2).map((f) => ({
    id: f.anchor,
    property: f.property,
    anchor: f.anchor,
    agency: "alfa",
    holder: "person-alfa",
    versions: [makeRevision(f, 1, "fixture", "Facsimile iniziale")],
  }));
}
function matchBill(bills: Bill[], f: BillSource) {
  return bills.find((b) =>
    b.versions.some((v) => {
      const original = sources.find((s) => s.id === v.sourceId);
      return original && identity(original) === identity(f);
    }),
  );
}
export function beginBillImport(
  s: State,
  bills: Bill[],
  property: string,
  sourceId: string,
): BillDraft | null {
  const f = availableBillSources(s, property).find((f) => f.id === sourceId);
  return f
    ? {
        sourceId,
        actor: s.actor,
        agency: s.agency,
        property,
        expectedVersion: matchBill(bills, f)?.versions.length ?? 0,
        data: { ...f.extracted },
      }
    : null;
}
export function checkBillDraft(
  s: State,
  bills: Bill[],
  property: string,
  draft: BillDraft,
) {
  if (
    draft.actor !== s.actor ||
    draft.agency !== s.agency ||
    draft.property !== property ||
    !canImportBill(s, property)
  )
    return {
      kind: "denied" as const,
      message:
        "Il contesto o il titolo è cambiato. Chiudi e riparti dalle utenze autorizzate.",
    };
  const f = readBillSource(s, property, draft.sourceId);
  if (!f || f.quality === "illeggibile")
    return {
      kind: "error" as const,
      message:
        "Facsimile illeggibile. Scegli una copia leggibile; nessun dato è stato importato.",
    };
  const invalid = (Object.keys(billFields) as BillField[]).filter((key) =>
    key === "amount"
      ? !Number.isFinite(money(draft.data[key])) ||
        money(draft.data[key]) <= 0 ||
        money(draft.data[key]) !== money(f.original[key])
      : draft.data[key]?.trim() !== f.original[key],
  );
  if (invalid.length)
    return {
      kind: "error" as const,
      message: `Controlla con l’originale: ${invalid.map((k) => billFields[k]).join(", ")}.`,
      invalid,
    };
  const existing = matchBill(bills, f);
  if (
    existing?.versions.some(
      (v) =>
        v.sourceId === f.id ||
        (v.sourceRevision === f.revision &&
          (Object.keys(billFields) as BillField[]).every(
            (k) => v.data[k] === f.original[k],
          )),
    )
  )
    return {
      kind: "duplicate" as const,
      message:
        "Questo originale è già in archivio. Nessuna nuova bolletta da creare.",
      existing,
    };
  if ((existing?.versions.length ?? 0) !== draft.expectedVersion)
    return {
      kind: "error" as const,
      message:
        "L’archivio è cambiato. Riapri il facsimile e ricontrolla l’ultima versione.",
    };
  if (existing && f.revision <= existing.versions.at(-1)!.sourceRevision)
    return {
      kind: "error" as const,
      message:
        "Possibile duplicato dello stesso periodo. Controlla il documento già presente; non è una nuova rettifica.",
    };
  return {
    kind: existing ? ("correction" as const) : ("new" as const),
    message: existing
      ? "La rettifica sostituisce i dati correnti. L’originale precedente rimane nello storico."
      : "Dati confrontati con il facsimile. Conferma per aggiungerli alle utenze.",
    existing,
  };
}
export function importBill(
  s: State,
  bills: Bill[],
  property: string,
  draft: BillDraft,
  confirmed: boolean,
  reason: string,
) {
  const check = checkBillDraft(s, bills, property, draft);
  const fail = (message: string) => ({
    ok: false,
    changed: false,
    message,
    bills,
  });
  if (check.kind === "denied" || check.kind === "error")
    return fail(check.message);
  if (!confirmed)
    return fail("Confronta l’originale e conferma i dati prima di salvare.");
  if (check.kind === "duplicate")
    return {
      ok: true,
      changed: false,
      message: check.message,
      bills,
      id: check.existing.id,
    };
  const f = readBillSource(s, property, draft.sourceId)!;
  if (
    (check.kind === "correction" ||
      Object.keys(billFields).some(
        (k) => f.extracted[k as BillField] !== f.original[k as BillField],
      )) &&
    !reason.trim()
  )
    return fail(
      "Indica il motivo della correzione, per conservarlo nello storico.",
    );
  const next = structuredClone(bills);
  let b = next.find((b) => b.id === check.existing?.id);
  if (!b) {
    b = {
      id: `import-${f.id}`,
      property,
      anchor: f.anchor,
      agency: "alfa",
      holder: "person-alfa",
      versions: [],
    };
    next.push(b);
  }
  b.versions.push(
    makeRevision(
      f,
      b.versions.length + 1,
      s.actor,
      reason.trim() || "Confronto con il facsimile",
    ),
  );
  return {
    ok: true,
    changed: true,
    message:
      check.kind === "correction"
        ? "Rettifica salvata. La versione precedente è conservata."
        : "Bolletta salvata nel browser. Incasso non verificato.",
    bills: next,
    id: b.id,
  };
}
// Workspace v1 accepts older saves without bills; malformed or inconsistent versions fail closed.
export function validBills(value: unknown): value is Bill[] {
  if (!Array.isArray(value) || value.length < 2) return false;
  const ids = new Set<string>(),
    identities = new Set<string>();
  return (
    value.every((b: Bill) => {
      if (
        !b ||
        typeof b.id !== "string" ||
        ids.has(b.id) ||
        b.agency !== "alfa" ||
        b.holder !== "person-alfa" ||
        !Array.isArray(b.versions) ||
        !b.versions.length
      )
        return false;
      ids.add(b.id);
      let prior = 0,
        key = "";
      const sourceIds = new Set<string>();
      const ok = b.versions.every((v, i) => {
        const f = sources.find((f) => f.id === v?.sourceId);
        if (
          !f ||
          f.quality !== "leggibile" ||
          f.property !== b.property ||
          f.anchor !== b.anchor ||
          v.number !== i + 1 ||
          v.sourceRevision !== f.revision ||
          f.revision <= prior ||
          sourceIds.has(f.id) ||
          typeof v.author !== "string" ||
          typeof v.reason !== "string" ||
          v.acquired !== DAY ||
          v.amountCents !== money(f.original.amount) ||
          !v.data ||
          !v.fields
        )
          return false;
        if (key && key !== identity(f)) return false;
        key = identity(f);
        prior = f.revision;
        sourceIds.add(f.id);
        const canonical = makeRevision(f, i + 1, v.author, v.reason);
        return (Object.keys(billFields) as BillField[]).every(
          (k) =>
            v.data[k] === f.original[k] &&
            JSON.stringify(v.fields[k]) === JSON.stringify(canonical.fields[k]),
        );
      });
      if (identities.has(key)) return false;
      identities.add(key);
      return ok;
    }) && ["bolletta-alfa", "bolletta-propria"].every((id) => ids.has(id))
  );
}

// A notice is a read-only derivative. Resolve both object and immutable source
// on every read, including historical versions; never authorize from a cached UI.
export function readBillNotice(
  s: State,
  bills: Bill[],
  property: string,
  id: string,
  number?: number,
) {
  const bill = readBill(s, bills, property, id);
  if (!bill) return null;
  const latest = bill.versions.at(-1);
  const version =
    number === undefined
      ? latest
      : bill.versions.find((v) => v.number === number);
  if (!version || !latest) return null;
  const source = readBillSource(s, property, version.sourceId);
  if (
    !source ||
    source.quality !== "leggibile" ||
    source.anchor !== bill.anchor ||
    source.revision !== version.sourceRevision ||
    version.amountCents !== money(source.original.amount) ||
    (Object.keys(billFields) as BillField[]).some(
      (k) => version.data[k] !== source.original[k],
    )
  )
    return null;
  return {
    version,
    source,
    currentNumber: latest.number,
    superseded: version.number !== latest.number,
    pastDue: version.data.due < DAY,
  };
}
