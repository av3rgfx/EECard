import { test, expect } from "@playwright/test";
import { initialState, execute } from "../src/demo/model";
import {
  emptyWorkspace,
  work,
  visibleRequests,
} from "../src/workspace/service";
function state(actor = "person-alfa") {
  const s = initialState("ended");
  s.relationEnded = false;
  s.actor = actor;
  return s;
}
test("documenti personali, titolo di esportazione e isolamento su ID diretti", () => {
  const s = state();
  expect(
    execute(s, {
      type: "file",
      action: "read",
      id: "bolletta-alfa",
      version: 1,
      purpose: "utenze",
    }).ok,
  ).toBe(true);
  s.actor = "owner-alfa";
  expect(
    execute(s, {
      type: "file",
      action: "read",
      id: "bolletta-alfa",
      version: 1,
      purpose: "utenze",
    }).ok,
  ).toBe(false);
  s.actor = "person-alfa";
  expect(
    execute(s, {
      type: "file",
      action: "export",
      id: "tecnico-alfa",
      version: 2,
      purpose: "storico",
    }).ok,
  ).toBe(false);
  expect(
    execute(s, {
      type: "file",
      action: "read",
      id: "contratto-beta",
      version: 1,
      purpose: "storico",
    }).ok,
  ).toBe(false);
});
test("richiesta del cliente leggibile soltanto nel rapporto autorizzato", () => {
  const s = state();
  const r = work(s, emptyWorkspace(), {
    type: "request",
    subject: "Perdita di esempio",
    detail: "Solo dati sintetici",
  });
  expect(r.ok).toBe(true);
  s.actor = "op-alfa";
  expect(visibleRequests(s, r.state)).toHaveLength(1);
  expect(
    work(s, r.state, { type: "work", id: "richiesta-1" }).state.requests[0]
      .status,
  ).toBe("In lavorazione");
  s.actor = "op-beta";
  s.agency = "beta";
  expect(visibleRequests(s, r.state)).toHaveLength(0);
  expect(work(s, r.state, { type: "work", id: "richiesta-1" }).ok).toBe(false);
});
test("fine rapporto, servizio o sessione chiusi negano nuove operazioni", () => {
  const s = state();
  s.relationEnded = true;
  expect(
    work(s, emptyWorkspace(), { type: "request", subject: "x", detail: "x" })
      .ok,
  ).toBe(false);
  s.relationEnded = false;
  s.serviceAvailable = false;
  expect(work(s, emptyWorkspace(), { type: "declare", amount: 400 }).ok).toBe(
    false,
  );
  s.serviceAvailable = true;
  s.operatorAuthenticated = false;
  expect(work(s, emptyWorkspace(), { type: "declare", amount: 400 }).ok).toBe(
    false,
  );
});
test("incasso parziale: evidenza e dichiarazione non cambiano il residuo, quietanza separata", () => {
  const s = state();
  let u = emptyWorkspace();
  u = work(s, u, { type: "evidence" }).state;
  u = work(s, u, { type: "declare", amount: 900 }).state;
  expect(u.ledger.verified).toBe(0);
  expect(
    work(s, u, { type: "verify", amount: 900, source: "Facsimile" }).ok,
  ).toBe(false);
  s.actor = "op-alfa";
  expect(work(s, u, { type: "receipt" }).ok).toBe(false);
  u = work(s, u, {
    type: "verify",
    amount: 400,
    source: "Registro sintetico",
  }).state;
  expect(u.ledger.receipt).toBe(false);
  u = work(s, u, { type: "receipt" }).state;
  expect(u.ledger.receipt).toBe(true);
  expect(900 - u.ledger.verified).toBe(500);
});
test("importi non validi e verifica senza fonte vengono negati", () => {
  const s = state("op-alfa");
  for (const amount of [NaN, -10, 0, 901])
    expect(
      work(s, emptyWorkspace(), { type: "verify", amount, source: "Sorgente" })
        .ok,
    ).toBe(false);
  expect(
    work(s, emptyWorkspace(), { type: "verify", amount: 400, source: "" }).ok,
  ).toBe(false);
});
test("tessere personali distinte da rapporti e dalla tessera delle altre persone", () => {
  let s = state();
  const result = execute(s, { type: "blockOwnCard" });
  expect(result.ok).toBe(true);
  s = result.state;
  expect(s.relationEnded).toBe(false);
  expect(s.practice.membership).toBe("attiva simulata");
  s.actor = "owner-alfa";
  const u = work(s, emptyWorkspace(), { type: "blockOwnerCard" });
  expect(u.state.ownerCardBlocked).toBe(true);
  expect(execute(s, { type: "blockOwnCard" }).ok).toBe(false);
  expect(visibleRequests(s, u.state)).toHaveLength(0);
});
