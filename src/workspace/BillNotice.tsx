import { useEffect, useRef } from "react";
import { Modal } from "../components/ui";
import type { State } from "../demo/model";
import { readBillNotice, type Bill } from "./bills";
import { BillOriginal } from "./BillOriginal";
import { NoticeCode } from "./NoticeCode";

export function BillNotice({
  state,
  bills,
  property,
  selection,
  onClose,
  onCurrent,
}: {
  state: State;
  bills: Bill[];
  property: string;
  selection: { id: string; number: number } | null;
  onClose: () => void;
  onCurrent: (number: number) => void;
}) {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const previous = useRef(selection?.number);
  useEffect(() => {
    if (
      previous.current !== undefined &&
      selection &&
      previous.current !== selection.number
    )
      titleRef.current?.focus();
    previous.current = selection?.number;
  }, [selection]);
  const notice =
    selection &&
    readBillNotice(state, bills, property, selection.id, selection.number);
  return (
    <Modal
      open={!!selection}
      onClose={onClose}
      title="Avviso della bolletta"
      description="Facsimile non pagabile. La consultazione non registra un pagamento."
    >
      <div className="ws-modal-content bill-panel bill-notice">
        {!notice ? (
          <>
            <p role="alert">
              Avviso non disponibile. Il titolo, il contesto o la versione non
              consentono la lettura. Torna alle utenze e riapri una bolletta
              disponibile.
            </p>
            <button className="ws-btn ws-secondary" onClick={onClose}>
              Chiudi avviso
            </button>
          </>
        ) : (
          <>
            <span className="ws-eyebrow">
              {notice.version.data.period} · VERSIONE {notice.version.number}{" "}
              {notice.superseded ? "SUPERATA" : "CORRENTE"}
            </span>
            <h3 ref={titleRef} tabIndex={-1}>
              {notice.version.data.creditor}
            </h3>
            <strong className="notice-total">
              {new Intl.NumberFormat("it-IT", {
                style: "currency",
                currency: notice.version.data.currency,
              }).format(notice.version.amountCents / 100)}
            </strong>
            <p className="notice-due">Scadenza {notice.version.data.due}</p>
            {notice.superseded && (
              <div className="bill-error" role="status">
                <strong>Versione superata: solo consultazione storica.</strong>
                <p>Una rettifica ha sostituito questi dati.</p>
                <button
                  className="ws-btn ws-secondary"
                  onClick={() => onCurrent(notice.currentNumber)}
                >
                  Mostra versione corrente
                </button>
              </div>
            )}
            <div className="notice-status" role="status">
              <strong>
                {notice.source.payment !== "ignoto"
                  ? "Pagamento indicato, non verificato"
                  : notice.source.debit !== "ignota"
                    ? "Domiciliazione indicata"
                    : "Stato del pagamento ignoto"}
              </strong>
              <p>
                {notice.source.payment !== "ignoto"
                  ? "L’originale indica un pagamento. Verifica il riscontro prima di una nuova disposizione: non è un incasso verificato né una quietanza."
                  : notice.source.debit !== "ignota"
                    ? "L’originale indica un addebito automatico. Verifica se è già avvenuto prima di una nuova disposizione."
                    : "Non sappiamo se questo importo sia ancora dovuto. Verifica lo stato prima di una disposizione."}
              </p>
              {notice.pastDue && (
                <p>
                  La scadenza è trascorsa rispetto alla data della demo. Questo
                  non prova un mancato pagamento.
                </p>
              )}
            </div>
            <NoticeCode source={notice.source} />
            <section aria-label="Alternativa testuale sullo stesso telefono">
              <h3>Riferimenti in testo</h3>
              <dl className="bill-data-rows">
                <div>
                  <dt>Identificativo avviso</dt>
                  <dd>
                    {notice.version.data.notice || "Assente nell’originale"}
                  </dd>
                </div>
                <div>
                  <dt>Formato</dt>
                  <dd>{notice.source.schema}</dd>
                </div>
              </dl>
              <p>
                Puoi leggere e selezionare questi riferimenti sullo stesso
                telefono, senza inquadrare il display. Sono dati dimostrativi,
                inutilizzabili per pagare.
              </p>
              {notice.source.code !== "facsimile" && (
                <p>
                  Consulta l’originale completo qui sotto. Per un documento
                  reale occorrerebbe una copia leggibile o il canale indicato
                  dall’emittente; questa demo non ne attiva alcuno.
                </p>
              )}
            </section>
            <details key={`${selection?.id}:${notice.version.number}`}>
              <summary>Apri originale completo</summary>
              <BillOriginal source={notice.source} />
            </details>
            <p className="bill-source-note">
              Fonte {notice.source.id} · revisione {notice.source.revision}.
              Nessun QR autentico o collegamento operativo. La lettura da un
              terminale non è stata provata.
            </p>
            <button className="ws-btn ws-secondary" onClick={onClose}>
              Chiudi avviso
            </button>
          </>
        )}
      </div>
    </Modal>
  );
}
