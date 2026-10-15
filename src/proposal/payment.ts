import type { State } from "../demo/model";
import { readBillNotice, type Bill } from "../workspace/bills";

export type PaymentAttempt = {
  actor: string;
  agency: string;
  property: string;
  bill: string;
  version: number;
  outcome: "accepted" | "unknown" | "failed";
};
// A rehearsal receipt is neither financial evidence nor a ledger event.
// Retry is blocked across revisions too: a correction cannot erase an uncertain attempt.
export function paymentGate(
  s: State,
  bills: Bill[],
  property: string,
  id: string,
  version: number,
  attempts: PaymentAttempt[],
) {
  const notice = readBillNotice(s, bills, property, id, version);
  if (!notice)
    return "Accesso non disponibile: riapri una bolletta autorizzata.";
  if (notice.superseded)
    return "Questa versione è stata sostituita. Controlla la versione corrente.";
  if (
    attempts.some(
      (a) =>
        a.agency === s.agency &&
        a.property === property &&
        a.bill === id &&
        a.outcome !== "failed",
    )
  )
    return "Esiste già un tentativo da verificare. Non ripetere il pagamento.";
  if (notice.source.payment !== "ignoto")
    return "Il documento indica un pagamento: verifica il riscontro prima di procedere.";
  if (notice.source.debit !== "ignota")
    return "È indicata una domiciliazione: verifica prima l’addebito.";
  return null;
}
export function simulatePayment(
  s: State,
  bills: Bill[],
  property: string,
  id: string,
  version: number,
  attempts: PaymentAttempt[],
  checked: boolean,
  outcome: PaymentAttempt["outcome"],
) {
  const error = paymentGate(s, bills, property, id, version, attempts);
  if (error || !checked)
    return {
      error: error || "Conferma il controllo dello stato nel caso di esempio.",
      attempts,
    };
  return {
    error: null,
    attempts: [
      ...attempts,
      {
        actor: s.actor,
        agency: s.agency,
        property,
        bill: id,
        version,
        outcome,
      },
    ],
  };
}
