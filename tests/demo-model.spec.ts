import { test, expect } from "@playwright/test";
import {
  initialState,
  execute,
  search,
  readVersion,
  allowed,
  readState,
  titleAllows,
  active,
  type State,
  type Command,
} from "../src/demo/model";
function apply(s: State, c: Command) {
  const r = execute(s, c);
  expect(r.ok, r.message).toBe(true);
  return r.state;
}
function activated() {
  let s = initialState();
  for (const type of [
    "correct",
    "supply",
    "verify",
    "invite",
    "activate",
  ] as const)
    s = apply(s, { type, key: type });
  return s;
}
function visit(s = activated()) {
  s = apply(s, { type: "present", channel: "code", code: "DEMO-ALFA-01" });
  return apply(s, {
    type: "open",
    confirmed: true,
    purpose: "storico",
    property: "casa-alfa",
    contract: "contratto-alfa",
  });
}
const alfa = {
  agency: "alfa",
  property: "casa-alfa",
  contract: "contratto-alfa",
};
test("PF01 precondizioni, inviti individuali e retry senza duplicati", () => {
  let s = initialState();
  expect(execute(s, { type: "activate", key: "activation" }).ok).toBe(false);
  expect(execute(s, { type: "verify", key: "v" }).ok).toBe(false);
  s = activated();
  const revision = s.practice.revision;
  s = apply(s, { type: "invite", key: "invite" });
  s = apply(s, { type: "correct", key: "correct" });
  expect(s.practice.invitations).toEqual(["owner-alfa", "person-alfa"]);
  expect(s.practice.revision).toBe(revision);
  expect(s.practice.account).toBe(true);
  expect(s.practice.membership).toBe("attiva simulata");
  expect(s.practice.card).toBe("attiva");
});
test("card seleziona, conferma e contesto obbligatori; chiusura nega ID diretto", () => {
  let s = activated();
  s = apply(s, { type: "present", channel: "card", code: "DEMO-ALFA-01" });
  expect(search(s, {}, { desk: true })).toEqual([]);
  expect(
    execute(s, {
      type: "open",
      confirmed: false,
      purpose: "storico",
      property: "casa-alfa",
      contract: "contratto-alfa",
    }).ok,
  ).toBe(false);
  s = visit(s);
  expect(search(s, {}, { desk: true })).toHaveLength(2);
  s = apply(s, { type: "close" });
  expect(readVersion(s, "contratto-alfa", 1, { desk: true })).toBeNull();
  expect(
    execute(s, {
      type: "document",
      action: "export",
      id: "tecnico-alfa",
      version: 2,
    }).ok,
  ).toBe(false);
  expect(s.session?.person).toBeUndefined();
});
test("isolamento A/B su ricerca, file, conteggi e comandi in entrambe le direzioni", () => {
  let s = activated();
  expect(readVersion(s, "contratto-beta", 1)).toBeNull();
  expect(search(s, { title: "locazione" })).toHaveLength(1);
  s = apply(s, { type: "switch", actor: "op-beta", agency: "beta" });
  expect(search(s)).toHaveLength(1);
  expect(
    execute(s, { type: "inspect", id: "contratto-beta", version: 1 }).ok,
  ).toBe(true);
  expect(
    execute(s, { type: "inspect", id: "contratto-alfa", version: 1 }).ok,
  ).toBe(false);
  expect(readVersion(s, "contratto-alfa", 1)).toBeNull();
  expect(execute(s, { type: "invite", key: "invite" }).ok).toBe(false);
  expect(
    execute(s, { type: "present", channel: "code", code: "DEMO-ALFA-01" }).ok,
  ).toBe(false);
  expect(allowed(s, "read", alfa)).toBe(false);
});
test("proprietario non legge bollette; intestatario e delega temporale", () => {
  const s = activated();
  const bill = s.documents.find((d) => d.id === "bolletta-alfa")!;
  expect(titleAllows(s, "owner-alfa", "read", bill, "utenze")).toBe(false);
  expect(titleAllows(s, "person-alfa", "read", bill, "utenze")).toBe(true);
  s.grants.find((g) => g.id === "delega-scaduta")!.until = "2027-01-01";
  expect(titleAllows(s, "owner-alfa", "read", bill, "utenze")).toBe(true);
  s.grants.find((g) => g.id === "delega-scaduta")!.revoked = true;
  expect(titleAllows(s, "owner-alfa", "read", bill, "utenze")).toBe(false);
  expect(
    active({ ...s.grants[0], from: "2026-10-14", until: "2026-10-15" }),
  ).toBe(true);
  expect(active({ ...s.grants[0], until: "2026-10-14" })).toBe(false);
});
test("tecnico solo allegato incarico, revoca e scopo", () => {
  const s = activated();
  expect(
    search(s, {}, { actor: "tech-alfa", purpose: "lavori" }).map((d) => d.id),
  ).toEqual(["tecnico-alfa"]);
  expect(
    search(s, {}, { actor: "tech-alfa", purpose: "storico" }),
  ).toHaveLength(0);
  s.grants.find((g) => g.id === "incarico")!.revoked = true;
  expect(search(s, {}, { actor: "tech-alfa", purpose: "lavori" })).toHaveLength(
    0,
  );
});
test("revoca card distinta da rapporto, adesione e canale assistito", () => {
  let s = visit();
  s = apply(s, { type: "revoke", key: "rev" });
  expect(s.session).toBeNull();
  expect(s.relationEnded).toBe(false);
  expect(s.practice.membership).toBe("attiva simulata");
  expect(
    execute(s, { type: "present", channel: "card", code: "DEMO-ALFA-01" }).ok,
  ).toBe(false);
  s = apply(s, { type: "present", channel: "manual", code: "DEMO-ALFA-01" });
  expect(s.practice.card).toBe("revocata");
});
test("fine rapporto conserva titolo autonomo e intestazione; revoca nega nuovi recuperi", () => {
  let s = visit();
  s = apply(s, { type: "endRelation", key: "end" });
  expect(search(s, {}, { desk: true }).map((d) => d.id)).toEqual([
    "tecnico-alfa",
  ]);
  expect(
    search(s, {}, { actor: "person-alfa", purpose: "utenze" }),
  ).toHaveLength(2);
  s = apply(s, { type: "endMembership", key: "membership" });
  expect(search(s, {}, { desk: true })).toHaveLength(1);
  expect(s.practice.card).toBe("attiva");
  s = apply(s, { type: "revokeTitle", id: "storico-autonomo" });
  expect(readVersion(s, "tecnico-alfa", 2, { desk: true })).toBeNull();
});
test("mandato di sola lettura non permette consegna, destinatario non confermato negato", () => {
  let s = visit();
  expect(
    execute(s, {
      type: "document",
      action: "share",
      id: "tecnico-alfa",
      version: 2,
      recipient: "owner-alfa",
    }).ok,
  ).toBe(false);
  s.grants[0].actions = ["read"];
  expect(
    execute(s, {
      type: "document",
      action: "read",
      id: "tecnico-alfa",
      version: 2,
    }).ok,
  ).toBe(true);
  expect(
    execute(s, {
      type: "document",
      action: "export",
      id: "tecnico-alfa",
      version: 2,
    }).ok,
  ).toBe(false);
});
test("ricerca intervallo incerto e versioni immutabili", () => {
  let s = visit();
  expect(
    search(s, { from: "2019", to: "2019" }, { desk: true }).map((d) => d.id),
  ).toEqual(["tecnico-alfa"]);
  expect(search(s, { from: "2021", to: "2018" }, { desk: true })).toHaveLength(
    0,
  );
  const old = readVersion(s, "tecnico-alfa", 1, { desk: true });
  s = apply(s, { type: "newVersion", key: "v3" });
  expect(readVersion(s, "tecnico-alfa", 1, { desk: true })).toEqual(old);
  expect(
    s.documents.find((d) => d.id === "tecnico-alfa")?.versions,
  ).toHaveLength(3);
});
test("servizio indisponibile nega file; lettore distinto, retry riconferma", () => {
  let s = initialState("service");
  expect(readVersion(s, "contratto-alfa", 1)).toBeNull();
  s = apply(s, { type: "retryService" });
  expect(s.session).toBeNull();
  s = visit(s);
  s = apply(s, { type: "logout" });
  expect(search(s)).toHaveLength(0);
  expect(execute(s, { type: "invite", key: "invite" }).ok).toBe(false);
  s = initialState("reader");
  expect(
    execute(s, { type: "present", channel: "card", code: "DEMO-ALFA-01" }).ok,
  ).toBe(false);
  expect(
    execute(s, { type: "present", channel: "code", code: "DEMO-ALFA-01" }).ok,
  ).toBe(true);
});
test("template deterministico, mancanti bloccanti e revisione invalidata", () => {
  let s = initialState();
  s = apply(s, { type: "generate", key: "1" });
  expect(s.draft[0].missing).toHaveLength(1);
  expect(execute(s, { type: "review", key: "1" }).ok).toBe(false);
  s = activated();
  s = apply(s, { type: "generate", key: "1" });
  s = apply(s, { type: "review", key: "1" });
  expect(s.draft[0].reviewed).toBe(true);
  s = apply(s, { type: "correct", key: "another" });
  expect(execute(s, { type: "review", key: "2" }).ok).toBe(false);
});
test("persiste lo stato ma non la visita, schema vecchio/corrotto ha reset esplicito", () => {
  const s = visit();
  const storage = { getItem: () => JSON.stringify(s), removeItem: () => {} };
  expect(readState(storage).practice.account).toBe(true);
  expect(readState(storage).session).toBeNull();
  expect(
    readState({ getItem: () => "{", removeItem: () => {} }).storageNotice,
  ).toContain("non leggibile");
  expect(
    readState({
      getItem: () => JSON.stringify({ schema: 3 }),
      removeItem: () => {},
    }).storageNotice,
  ).toContain("incompatibile");
});

test("retry dopo revoca mandato non restituisce il vecchio esito", () => {
  let s = activated();
  s.grants[0].revoked = true;
  expect(execute(s, { type: "invite", key: "invite" }).ok).toBe(false);
  expect(search(s)).toHaveLength(0);
});
