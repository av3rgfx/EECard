import { billFields, money, type BillField, type BillSource } from "./bills";
import { NoticeCode } from "./NoticeCode";
const currency = (amount: string) =>
  new Intl.NumberFormat("it-IT", { style: "currency", currency: "EUR" }).format(
    money(amount) / 100,
  );
export function BillOriginal({ source }: { source: BillSource }) {
  return (
    <article className="bill-original" aria-label="Originale sintetico">
      <span className="ws-eyebrow">FACSIMILE · NON PAGABILE</span>
      <h3>{source.original.creditor}</h3>
      <p>
        Documento di esempio · fonte {source.id} · revisione {source.revision}
      </p>
      {source.quality === "illeggibile" ? (
        <p role="alert">
          Copia illeggibile. I campi non possono essere confermati.
        </p>
      ) : (
        <>
          <strong className="bill-original-total">
            {currency(source.original.amount)}
          </strong>
          <dl>
            {(Object.keys(billFields) as BillField[]).map((key) => (
              <div key={key}>
                <dt>{billFields[key]}</dt>
                <dd>{source.original[key] || "Assente"}</dd>
              </div>
            ))}
          </dl>
          <NoticeCode source={source} />
          <p>
            Domiciliazione: {source.debit}.<br />
            Pagamento: {source.payment}.
          </p>
          {Array.from({ length: source.pages }, (_, i) => (
            <p key={i}>
              Pagina {i + 1} di {source.pages} ·{" "}
              {i === 0
                ? "Riepilogo e importo"
                : `Dettaglio fornitura ${source.original.supply}; nessun codice presente`}
              .
            </p>
          ))}
        </>
      )}
      <p className="bill-source-note">
        {source.schema}. Solo dati inventati. Nessun codice utilizzabile,
        collegamento esterno o istruzione di pagamento.
      </p>
    </article>
  );
}
