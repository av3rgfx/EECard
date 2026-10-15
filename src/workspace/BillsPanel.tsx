import { BillOriginal } from "./BillOriginal";
import { BillNotice } from "./BillNotice";
import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, FileText, Plus, Check } from "lucide-react";
import type { State } from "../demo/model";
import {
  availableBillSources,
  beginBillImport,
  billFields,
  canImportBill,
  checkBillDraft,
  readBill,
  readBillSource,
  visibleBills,
  money,
  type Bill,
  type BillData,
  type BillDraft,
  type BillField,
} from "./bills";

const currency = (amount: string) =>
  new Intl.NumberFormat("it-IT", { style: "currency", currency: "EUR" }).format(
    money(amount) / 100,
  );
function DataRows({ data }: { data: BillData }) {
  return (
    <dl className="bill-data-rows">
      {(Object.keys(billFields) as BillField[]).map((key) => (
        <div key={key}>
          <dt>{billFields[key]}</dt>
          <dd>{data[key] || "Assente"}</dd>
        </div>
      ))}
    </dl>
  );
}
export function BillsPanel({
  state: s,
  bills,
  property,
  save,
}: {
  state: State;
  bills: Bill[];
  property: string;
  save: (
    draft: BillDraft,
    reason: string,
  ) => { ok: boolean; message: string; id?: string };
}) {
  const [mode, setMode] = useState<
    "list" | "choose" | "compare" | "confirm" | "detail"
  >("list");
  const [notice, setNotice] = useState<{ id: string; number: number } | null>(
    null,
  );
  const [draft, setDraft] = useState<BillDraft | null>(null);
  const [reason, setReason] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [originalTab, setOriginalTab] = useState(false);
  const [selection, setSelection] = useState<{
    id: string;
    number: number;
  } | null>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const previousMode = useRef(mode);
  const permitted = canImportBill(s, property);
  const visible = visibleBills(s, bills, property);
  const selected = selection
    ? readBill(s, bills, property, selection.id)
    : null;
  const version = selected?.versions.find(
    (v) => v.number === selection?.number,
  );
  const detailSource = version
    ? readBillSource(s, property, version.sourceId)
    : null;
  const check = draft ? checkBillDraft(s, bills, property, draft) : null;
  // Never render a cached draft/source after a grant, actor or service change.
  const source =
    draft && check?.kind !== "denied"
      ? readBillSource(s, property, draft.sourceId)
      : null;
  useEffect(() => {
    if (previousMode.current === mode) return;
    if (mode === "list") trigger.current?.focus();
    else titleRef.current?.focus();
    previousMode.current = mode;
  }, [mode]);
  const cancel = () => {
    setDraft(null);
    setSelection(null);
    setError("");
    setMessage("");
    setMode("list");
  };
  useEffect(() => {
    const listener = (e: KeyboardEvent) => {
      if (e.key === "Escape" && mode !== "list" && !notice) {
        e.preventDefault();
        cancel();
      }
    };
    document.addEventListener("keydown", listener);
    return () => document.removeEventListener("keydown", listener);
  }, [mode, notice]);
  const choose = () => {
    setMode("choose");
    setError("");
    setMessage("");
    setDraft(null);
    setReason("");
  };
  const begin = (id: string) => {
    const next = beginBillImport(s, bills, property, id);
    if (!next) {
      setError("Titolo non disponibile. Torna alle utenze.");
      return;
    }
    setDraft(next);
    setReason("");
    setError("");
    setOriginalTab(false);
    setMode("compare");
  };
  const open = (b: Bill) => {
    setSelection({ id: b.id, number: b.versions.at(-1)!.number });
    setMode("detail");
  };
  const renderDenied = (
    <div className="ws-empty">
      <h3>Accesso non disponibile</h3>
      <p>
        Il titolo, la sessione o il contesto non consentono questa operazione.
      </p>
      <button className="ws-btn ws-secondary" onClick={cancel}>
        Torna alle utenze
      </button>
    </div>
  );
  if (
    (["choose", "compare", "confirm"].includes(mode) &&
      (!permitted || check?.kind === "denied")) ||
    (mode === "detail" && !selected)
  )
    return renderDenied;
  return (
    <div className="bill-panel">
      <BillNotice
        state={s}
        bills={bills}
        property={property}
        selection={notice}
        onClose={() => setNotice(null)}
        onCurrent={(number) => setNotice(notice && { ...notice, number })}
      />
      {mode !== "list" && (
        <button className="ws-btn ws-quiet" onClick={cancel}>
          <ArrowLeft size={16} />
          Torna alle utenze
        </button>
      )}
      {message && (
        <p className="bill-feedback" role="status">
          {message}
        </p>
      )}
      {error && (
        <p className="bill-error" role="alert">
          {error}
        </p>
      )}
      {mode === "list" && (
        <>
          <div className="bill-section-heading">
            <div>
              <span className="ws-eyebrow">IL TUO ARCHIVIO UTENZE</span>
              <h2>Bollette e originali</h2>
            </div>
            {permitted && (
              <button
                ref={trigger}
                className="ws-btn ws-primary"
                onClick={choose}
              >
                <Plus size={18} />
                Aggiungi bolletta
              </button>
            )}
          </div>
          {!visible.length && (
            <div className="ws-empty">
              <h3>Nessuna bolletta disponibile</h3>
              <p>
                La casa selezionata non concede accesso alle bollette private di
                un’altra persona.
              </p>
            </div>
          )}
          {visible.map((b) => {
            const v = b.versions.at(-1)!;
            const f = readBillSource(s, property, v.sourceId)!;
            return (
              <section className="ws-bill" key={b.id}>
                <div>
                  <span className="ws-eyebrow">ENERGIA · {v.data.period}</span>
                  <h2>{v.data.creditor}</h2>
                  <p>
                    {v.data.holder} · {v.data.supply} · versione {v.number}
                  </p>
                  <span className="ws-status amber">
                    Incasso non verificato
                  </span>
                </div>
                <div className="ws-bill-amount">
                  <span>Importo del facsimile</span>
                  <strong>{currency(v.data.amount)}</strong>
                  <small>Scadenza {v.data.due}</small>
                </div>
                <div className="ws-bill-footer">
                  <button
                    className="ws-btn ws-primary"
                    onClick={() => setNotice({ id: b.id, number: v.number })}
                  >
                    Mostra avviso
                  </button>
                  <button
                    className="ws-btn ws-secondary"
                    onClick={() => open(b)}
                  >
                    Apri bolletta <ArrowRight size={16} />
                  </button>
                  <span>
                    Pagamento: {f.payment}. Domiciliazione: {f.debit}.
                  </span>
                </div>
              </section>
            );
          })}
        </>
      )}
      {mode === "choose" && (
        <>
          <span className="ws-eyebrow">01 / 03 · SCEGLI IL FACSIMILE</span>
          <h2 ref={titleRef} tabIndex={-1}>
            Aggiungi una bolletta di esempio
          </h2>
          <p>
            {property === "casa-alfa" ? "Casa Luce" : "Casa Atelier"} ·
            intestatario Cliente 01. Scegli uno degli originali inclusi: i campi
            proposti sono simulati e vanno confrontati.
          </p>
          <div className="bill-sources">
            {availableBillSources(s, property).map((f) => (
              <button
                className="bill-source-choice"
                key={f.id}
                onClick={() => begin(f.id)}
              >
                <FileText size={24} />
                <span>
                  <strong>{f.label}</strong>
                  <small>
                    {f.pages} {f.pages === 1 ? "pagina" : "pagine"} · {f.schema}
                  </small>
                </span>
                <ArrowRight size={18} />
              </button>
            ))}
          </div>
          <p>Nessun caricamento di file, scansione o OCR reale.</p>
        </>
      )}
      {mode === "compare" && source && draft && (
        <>
          <span className="ws-eyebrow">02 / 03 · CONFRONTA E CORREGGI</span>
          <h2 ref={titleRef} tabIndex={-1}>
            L’originale, accanto ai tuoi dati
          </h2>
          <p>
            Controlla importo, date e intestazione. Una proposta non è ancora un
            dato confermato.
          </p>
          {source.quality === "illeggibile" ? (
            <>
              <BillOriginal source={source} />
              <button className="ws-btn ws-primary" onClick={choose}>
                Scegli una copia leggibile
              </button>
            </>
          ) : (
            <>
              <div className="bill-mobile-tabs">
                <button
                  className="ws-btn ws-secondary"
                  aria-pressed={originalTab}
                  onClick={() => setOriginalTab(true)}
                >
                  Originale
                </button>
                <button
                  className="ws-btn ws-secondary"
                  aria-pressed={!originalTab}
                  onClick={() => setOriginalTab(false)}
                >
                  Dati da controllare
                </button>
              </div>
              <div
                className={`bill-compare ${originalTab ? "show-original" : "show-data"}`}
              >
                <div className="bill-original-column">
                  <BillOriginal source={source} />
                </div>
                <form
                  className="bill-fields"
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (check?.kind === "error") {
                      setError(check.message);
                      return;
                    }
                    setError("");
                    setMode("confirm");
                  }}
                >
                  <h3>Dati proposti</h3>
                  {(Object.keys(billFields) as BillField[]).map((key) => (
                    <label key={key} htmlFor={`bill-${key}`}>
                      <span id={`bill-label-${key}`}>
                        {billFields[key]}
                        {key === "notice" && " (se presente)"}
                      </span>
                      <input
                        id={`bill-${key}`}
                        aria-labelledby={`bill-label-${key}`}
                        inputMode={key === "amount" ? "decimal" : undefined}
                        value={draft.data[key]}
                        maxLength={100}
                        aria-invalid={
                          (check?.kind === "error" &&
                            check.invalid?.includes(key)) ||
                          undefined
                        }
                        aria-describedby={`bill-help-${key}`}
                        onChange={(e) =>
                          setDraft({
                            ...draft,
                            data: { ...draft.data, [key]: e.target.value },
                          })
                        }
                      />
                      <small id={`bill-help-${key}`}>
                        Fonte: pagina{" "}
                        {source.pages === 2 &&
                        ["supply", "notice"].includes(key)
                          ? 2
                          : 1}{" "}
                        ·{" "}
                        {source.extracted[key] === source.original[key]
                          ? "esempio coerente, da confermare"
                          : "confidenza incerta: confronta l’originale"}
                      </small>
                    </label>
                  ))}
                  <label htmlFor="bill-reason">
                    <span id="bill-reason-label">Motivo della correzione</span>
                    <input
                      aria-labelledby="bill-reason-label"
                      aria-describedby="bill-reason-help"
                      id="bill-reason"
                      value={reason}
                      maxLength={240}
                      onChange={(e) => setReason(e.target.value)}
                    />
                    <small id="bill-reason-help">
                      Richiesto se correggi un campo o importi una rettifica.
                    </small>
                  </label>
                  {check?.kind === "error" && (
                    <p className="bill-error" role="status">
                      {check.message}
                    </p>
                  )}
                  <button type="submit" className="ws-btn ws-primary">
                    Rivedi prima di salvare <ArrowRight size={16} />
                  </button>
                </form>
              </div>
            </>
          )}
          <button className="ws-btn ws-quiet" onClick={choose}>
            Scegli un altro facsimile
          </button>
        </>
      )}
      {mode === "confirm" && source && draft && check && (
        <>
          <span className="ws-eyebrow">03 / 03 · CONFERMA</span>
          <h2 ref={titleRef} tabIndex={-1}>
            {check.kind === "duplicate"
              ? "Originale già presente"
              : check.kind === "correction"
                ? "Conferma la rettifica"
                : "Conferma i dati della bolletta"}
          </h2>
          <p>{check.message}</p>
          {check.kind === "correction" && (
            <p className="bill-feedback">
              Versione {check.existing!.versions.length}:{" "}
              {currency(check.existing!.versions.at(-1)!.data.amount)} → nuova
              versione: {currency(draft.data.amount)}. Un solo dovuto, con
              storico.
            </p>
          )}
          <DataRows data={draft.data} />
          <details>
            <summary>Rivedi l’originale</summary>
            <BillOriginal source={source} />
          </details>
          <p>
            Domiciliazione: {source.debit}. Pagamento: {source.payment}.
            L’importazione non verifica un incasso e non genera pagamenti.
          </p>
          {check.kind === "duplicate" ? (
            <button
              className="ws-btn ws-primary"
              onClick={() => open(check.existing)}
            >
              Apri quella già presente
            </button>
          ) : (
            <button
              className="ws-btn ws-primary"
              onClick={() => {
                const result = save(draft, reason);
                if (!result.ok) {
                  setError(result.message);
                  return;
                }
                setMessage(result.message);
                setError("");
                setDraft(null);
                setMode("list");
              }}
            >
              <Check size={17} />
              {check.kind === "correction"
                ? "Conferma rettifica"
                : "Conferma e salva nel browser"}
            </button>
          )}
          <button
            className="ws-btn ws-secondary"
            onClick={() => {
              setError("");
              setMode("compare");
            }}
          >
            Torna al confronto
          </button>
          <button className="ws-btn ws-quiet" onClick={cancel}>
            Annulla importazione
          </button>
        </>
      )}
      {mode === "detail" && selected && version && detailSource && (
        <>
          <span className="ws-eyebrow">ORIGINALE E STORICO</span>
          <h2 ref={titleRef} tabIndex={-1}>
            {version.data.creditor} · {version.data.period}
          </h2>
          <button
            className="ws-btn ws-primary"
            onClick={() =>
              setNotice({ id: selected.id, number: version.number })
            }
          >
            Mostra avviso
          </button>
          <label className="bill-version">
            Versione
            <select
              aria-label="Versione"
              value={version.number}
              onChange={(e) =>
                setSelection({
                  id: selected.id,
                  number: Number(e.target.value),
                })
              }
            >
              {selected.versions.map((v) => (
                <option key={v.number} value={v.number}>
                  Versione {v.number}
                  {v.number === selected.versions.length
                    ? " · corrente"
                    : " · superata"}
                </option>
              ))}
            </select>
          </label>
          <p>
            Fonte {version.sourceId} / revisione {version.sourceRevision} ·{" "}
            {version.acquired}. Autore: {version.author}. Motivo:{" "}
            {version.reason}.
          </p>
          <div className="bill-detail">
            <BillOriginal source={detailSource} />
            <div>
              <h3>Dati confermati · versione {version.number}</h3>
              <DataRows data={version.data} />
              <details>
                <summary>Provenienza e correzioni dei campi</summary>
                {(Object.keys(billFields) as BillField[]).map((k) => (
                  <p key={k}>
                    <strong>{billFields[k]}</strong>: fonte{" "}
                    {version.fields[k].source}, pagina {version.fields[k].page};{" "}
                    {version.fields[k].confidence}; proposto «
                    {version.fields[k].proposed || "assente"}»;{" "}
                    {version.fields[k].corrected ? "corretto" : "confermato"} da{" "}
                    {version.fields[k].reviewer}.
                  </p>
                ))}
              </details>
              <p>
                Incasso non verificato. Nessuna evidenza, quietanza o pagamento
                generati.
              </p>
            </div>
          </div>
          {permitted && (
            <button className="ws-btn ws-secondary" onClick={choose}>
              Importa un altro originale o una rettifica
            </button>
          )}
        </>
      )}
    </div>
  );
}
