import type { BillSource } from "./bills";

// This is a labelled textual facsimile, not an encoded QR/barcode or payment payload.
// Reused in the immutable original and its notice: no invented payment identifier.
export function NoticeCode({ source }: { source: BillSource }) {
  if (source.code !== "facsimile")
    return (
      <p className="notice-code-fallback">
        {source.code === "illeggibile"
          ? "Codice illeggibile. Il riferimento testuale resta consultabile."
          : source.code === "non supportato"
            ? "Formato non supportato per la presentazione del codice."
            : "Codice assente nell’originale."}
      </p>
    );
  return (
    <div
      className="notice-code"
      aria-label="Codice facsimile non scansionabile"
    >
      <span>FACSIMILE · NON SCANSIONABILE</span>
      <strong>{source.original.notice}</strong>
      <span>NON PAGABILE</span>
    </div>
  );
}
