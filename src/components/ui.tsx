import { useEffect, useRef, useState, type ReactNode } from "react";
import { Dialog } from "@base-ui/react/dialog";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  X,
  ArrowUpRight,
  AlertCircle,
  Check,
  FileText,
  Upload,
  type LucideIcon,
} from "lucide-react";

export function IconBox({
  icon: Icon,
  tone = "neutral",
}: {
  icon: LucideIcon;
  tone?: string;
}) {
  return (
    <span className={`icon-box ${tone}`}>
      <Icon size={20} strokeWidth={1.7} aria-hidden="true" />
    </span>
  );
}
export function Badge({
  children,
  tone = "neutral",
}: {
  children: ReactNode;
  tone?: string;
}) {
  return <span className={`badge ${tone}`}>{children}</span>;
}
export function Button({
  children,
  onClick,
  variant = "primary",
  type = "button",
  disabled = false,
  className = "",
}: {
  children: ReactNode;
  onClick?: () => void;
  variant?: string;
  type?: "button" | "submit";
  disabled?: boolean;
  className?: string;
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`button ${variant} ${className}`}
    >
      {children}
    </button>
  );
}
export function SectionTitle({
  title,
  action,
  onClick,
}: {
  title: string;
  action?: string;
  onClick?: () => void;
}) {
  return (
    <div className="section-title">
      <h2>{title}</h2>
      {action && (
        <button className="text-button" onClick={onClick}>
          {action}
          <ArrowUpRight size={16} aria-hidden="true" />
        </button>
      )}
    </div>
  );
}
export function Empty({
  title,
  description,
  action,
  onClick,
}: {
  title: string;
  description: string;
  action?: string;
  onClick?: () => void;
}) {
  return (
    <div className="empty">
      <IconBox icon={FileText} />
      <h2>{title}</h2>
      <p>{description}</p>
      {action && (
        <Button variant="secondary" onClick={onClick}>
          {action}
        </Button>
      )}
    </div>
  );
}
export function Notice({
  children,
  error = false,
}: {
  children: ReactNode;
  error?: boolean;
}) {
  return (
    <div
      className={`notice ${error ? "error" : ""}`}
      role={error ? "alert" : undefined}
    >
      <AlertCircle size={18} aria-hidden="true" />
      <span>{children}</span>
    </div>
  );
}

// Adapted from Animate UI Base Dialog. Copyright (c) 2025 Elliot Sutton.
// MIT + Commons Clause: docs/design/LICENSE-Animate-UI.txt.
// Base UI owns focus, inert background, Escape and restoration; Motion owns one surface.
export function Modal({
  open,
  onClose,
  title,
  description,
  children,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  description: string;
  children: ReactNode;
}) {
  const reduce = useReducedMotion();
  const [mobile, setMobile] = useState(
    window.matchMedia("(max-width: 700px)").matches,
  );
  const trigger = useRef<HTMLElement | null>(null);
  useEffect(() => {
    const m = window.matchMedia("(max-width: 700px)");
    const change = () => setMobile(m.matches);
    m.addEventListener("change", change);
    return () => m.removeEventListener("change", change);
  }, []);
  useEffect(() => {
    if (open) trigger.current = document.activeElement as HTMLElement;
  }, [open]);
  const keyboard = document.documentElement.dataset.input === "keyboard";
  const transform =
    reduce || keyboard ? "none" : mobile ? "translateY(24px)" : "scale(0.97)";
  const transition = {
    duration: keyboard
      ? 0
      : parseFloat(
          getComputedStyle(document.documentElement).getPropertyValue(
            reduce ? "--duration-reduced" : "--duration-panel",
          ),
        ) / 1000,
    ease: [0.23, 1, 0.32, 1] as [number, number, number, number],
  };
  return (
    <Dialog.Root
      open={open}
      onOpenChange={(value) => {
        if (!value) onClose();
      }}
    >
      <AnimatePresence>
        {open && (
          <Dialog.Portal keepMounted>
            <Dialog.Backdrop
              className="modal-backdrop"
              render={
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={transition}
                />
              }
            />
            <div className="modal-position">
              <Dialog.Popup
                className="modal"
                finalFocus={() => trigger.current}
                render={
                  <motion.div
                    initial={{ opacity: 0, transform }}
                    animate={{
                      opacity: 1,
                      transform:
                        reduce || keyboard
                          ? "none"
                          : mobile
                            ? "translateY(0px)"
                            : "scale(1)",
                    }}
                    exit={{ opacity: 0, transform }}
                    transition={transition}
                  />
                }
              >
                <div className="sheet-handle" aria-hidden="true" />
                <Dialog.Close
                  className="icon-button modal-close"
                  aria-label="Chiudi pannello"
                >
                  <X size={20} />
                </Dialog.Close>
                <Dialog.Title>{title}</Dialog.Title>
                <Dialog.Description>{description}</Dialog.Description>
                <div className="modal-body">{children}</div>
              </Dialog.Popup>
            </div>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
}

// Adapted from Rare UI Notification Bell. Copyright (c) 2026 Swami Malode.
// https://rareui.com — license and attribution: docs/design/LICENSE-Rare-UI.txt.
// Preserve the bell silhouette/badge geometry; remove ringing and rolling counters
// for daily navigation. The count updates immediately, including reduced motion.
export function NotificationBell({
  count,
  onClick,
}: {
  count: number;
  onClick: () => void;
}) {
  const side = 44 * 0.22,
    inset = 44 / 2 - (0.9 * 44 * Math.SQRT1_2) / 2 - side / 2;
  return (
    <button
      className="icon-button notification-bell"
      aria-label={`Notifiche, ${count} da leggere`}
      onClick={onClick}
    >
      <svg
        viewBox="0 0 18 18"
        width="23"
        height="23"
        fill="currentColor"
        aria-hidden="true"
      >
        <path
          fillOpacity=".8"
          d="M3.5 6.5C3.5 3.46279 5.96279 1 9 1C12.0372 1 14.5 3.46279 14.5 6.5V10.75C14.5 11.4408 15.0592 12 15.75 12C16.1642 12 16.5 12.3358 16.5 12.75C16.5 13.1642 16.1642 13.5 15.75 13.5H2.25C1.83579 13.5 1.5 13.1642 1.5 12.75C1.5 12.3358 1.83579 12 2.25 12C2.94079 12 3.5 11.4408 3.5 10.75V6.5Z"
        />
        <path d="M10.2 15H7.80099C7.64999 15 7.50799 15.068 7.41299 15.185C7.31799 15.302 7.28099 15.456 7.31199 15.603C7.48499 16.425 8.17999 17 9.00099 17C9.82199 17 10.517 16.425 10.69 15.603C10.721 15.456 10.684 15.302 10.589 15.185C10.494 15.068 10.351 15 10.2 15Z" />
      </svg>
      {count > 0 && (
        <span
          aria-hidden="true"
          className="notification-dot"
          style={{ width: side, height: side, top: inset, right: inset }}
        />
      )}
    </button>
  );
}

export function FileInput({
  onFile,
  label = "Allegato",
  demoName = "documento-demo.pdf",
  required = false,
}: {
  onFile: (name: string) => void;
  label?: string;
  demoName?: string;
  required?: boolean;
}) {
  const [file, setFile] = useState("");
  const [error, setError] = useState("");
  function accept(f: File | undefined) {
    if (!f) return;
    if (
      !["application/pdf", "image/jpeg", "image/png"].includes(f.type) ||
      f.size > 5 * 1024 * 1024
    ) {
      setError(
        "Scegli un PDF, JPG o PNG fino a 5 MB. Il file non è stato allegato.",
      );
      setFile("");
      onFile("");
      return;
    }
    setError("");
    setFile(f.name);
    onFile(f.name);
  }
  return (
    <div className="file-field">
      <span className="field-label">
        {label}
        {required ? " · richiesto" : ""}
      </span>
      <label className="upload-zone">
        <Upload size={23} aria-hidden="true" />
        <strong>{file || "Scegli un file"}</strong>
        <span>PDF, JPG o PNG · max 5 MB</span>
        <input
          type="file"
          accept=".pdf,.jpg,.jpeg,.png"
          aria-label={label}
          onChange={(e) => accept(e.target.files?.[0])}
        />
      </label>
      <button
        type="button"
        className="text-button"
        onClick={() => {
          setFile(demoName);
          onFile(demoName);
          setError("");
        }}
      >
        <Check size={16} aria-hidden="true" />
        Usa allegato dimostrativo
      </button>
      {error && (
        <p className="field-error" role="alert">
          {error}
        </p>
      )}
      <small>
        Solo il nome del file resta in questa demo. Nessun contenuto viene
        inviato.
      </small>
    </div>
  );
}
