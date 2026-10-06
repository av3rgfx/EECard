import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Check } from "lucide-react";
import type { Payment } from "../data";
import "./payment-progress.css";

const paymentOrder: Payment["status"][] = [
  "pending",
  "uploaded",
  "declared",
  "verified",
  "receipt",
];
const steps = ["Documento", "Dichiarazione", "Verifica", "Quietanza"];

const phaseNarratives = {
  pending: {
    title: "Documento da aggiungere",
    detail:
      "Il file, la dichiarazione, la verifica dell’incasso e la quietanza sono passaggi distinti.",
  },
  uploaded: {
    title: "Il documento è presente",
    detail:
      "Un file caricato non dichiara il pagamento e non conferma l’incasso.",
  },
  declared: {
    title: "Dichiarato, da verificare",
    detail:
      "La dichiarazione attende una verifica separata del beneficiario o dell’agenzia delegata.",
  },
  verified: {
    title: "Incasso verificato",
    detail:
      "La quietanza è un passaggio separato e non è ancora stata generata.",
  },
  receipt: {
    title: "Quietanza demo disponibile",
    detail:
      "Il facsimile riguarda l’importo verificato. Un eventuale residuo resta da ricevere.",
  },
} satisfies Record<Payment["status"], { title: string; detail: string }>;

export function paymentPhaseNarrative(status: Payment["status"]) {
  return phaseNarratives[status];
}

function tokenMilliseconds(value: string, fallback: number) {
  const duration = Number.parseFloat(value);
  if (!Number.isFinite(duration)) return fallback;
  return value.trim().endsWith("ms") ? duration : duration * 1000;
}

/**
 * A read-only view of the existing payment state machine. No state can be
 * entered by clicking a step. Mounting a payment never animates its history.
 */
export function PaymentProgress({
  payment,
  className = "",
  label = "Avanzamento del pagamento: quattro passaggi distinti",
}: {
  payment: Payment;
  className?: string;
  label?: string;
}) {
  const completed = paymentOrder.indexOf(payment.status);
  const markers = useRef<Array<HTMLSpanElement | null>>([]);
  const previousStatus = useRef(payment.status);
  const active = useRef<{ node: HTMLSpanElement; animation: Animation } | null>(
    null,
  );
  const [reduced, setReduced] = useState(
    () => matchMedia("(prefers-reduced-motion: reduce)").matches,
  );

  useEffect(() => {
    const media = matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(media.matches);
    const stopForKeyboard = () => active.current?.animation.cancel();
    media.addEventListener("change", update);
    window.addEventListener("keydown", stopForKeyboard);
    return () => {
      media.removeEventListener("change", update);
      window.removeEventListener("keydown", stopForKeyboard);
      active.current?.animation.cancel();
    };
  }, []);

  useLayoutEffect(() => {
    const changed = previousStatus.current !== payment.status;
    previousStatus.current = payment.status;
    if (!changed) {
      // An OS preference change must also stop movement already in progress.
      if (reduced) active.current?.animation.cancel();
      return;
    }

    const node = markers.current[Math.min(completed, steps.length - 1)];
    const running =
      active.current?.node === node &&
      active.current.animation.playState === "running";
    const presentation = running && node ? getComputedStyle(node) : null;
    const start = presentation
      ? { opacity: presentation.opacity, transform: presentation.transform }
      : { opacity: "0.55", transform: "scale(0.96)" };
    active.current?.animation.cancel();

    if (
      !node ||
      document.documentElement.dataset.input === "keyboard" ||
      typeof node.animate !== "function"
    )
      return;

    const tokens = getComputedStyle(node);
    const duration = tokenMilliseconds(
      tokens.getPropertyValue(
        reduced ? "--duration-reduced" : "--duration-fast",
      ),
      reduced ? 120 : 160,
    );
    const animation = node.animate(
      reduced
        ? [{ opacity: running ? start.opacity : "0.65" }, { opacity: 1 }]
        : [start, { opacity: 1, transform: "scale(1)" }],
      {
        duration,
        easing:
          tokens.getPropertyValue("--ease-out").trim() ||
          "cubic-bezier(0.23, 1, 0.32, 1)",
      },
    );
    active.current = { node, animation };
  }, [payment.status, completed, reduced]);

  return (
    <ol className={`payment-progress ${className}`} aria-label={label}>
      {steps.map((step, index) => {
        const done = index < completed;
        const current = index === completed;
        return (
          <li
            key={step}
            className="payment-progress-step"
            data-state={done ? "done" : current ? "current" : "upcoming"}
            aria-current={current ? "step" : undefined}
          >
            <span
              ref={(node) => {
                markers.current[index] = node;
              }}
              className="payment-progress-marker"
              aria-hidden="true"
            >
              {done ? (
                <Check size={16} strokeWidth={2} />
              ) : (
                String(index + 1).padStart(2, "0")
              )}
            </span>
            <span className="payment-progress-title">{step}</span>
            <span className="payment-progress-state">
              {done ? "Completato" : current ? "Fase attuale" : "Successivo"}
            </span>
          </li>
        );
      })}
    </ol>
  );
}
