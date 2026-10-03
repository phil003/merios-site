"use client";

// ContactForm — v3 art direction, motion/react-free. All animation is CSS:
// - Fields: white inputs with a hairline grid border, mono labels, an ink
//   focus ring; invalid fields turn soft-alert (never an alarm red).
// - State messages / button labels are keyed elements that remount with a
//   small keyframe entrance (.cf-in / .cf-pop) — exits are immediate.
// - Border / background / shadow changes ride plain CSS transitions.
// Reduced motion is honored by the global
// `@media (prefers-reduced-motion: reduce)` rule in globals.css.
// Every selector in the scoped styles is prefixed .cf-form.

import { useEffect, useId, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";

// ─── Types ───────────────────────────────────────────────────────────────────

type InquiryType = "general" | "press" | "partnership" | "support";

const INQUIRY_TYPES: { value: InquiryType; label: string; helper: string }[] = [
  { value: "general", label: "General", helper: "A question or note." },
  { value: "press", label: "Press", helper: "Media & editorial." },
  { value: "partnership", label: "Partnership", helper: "Clinical or brand." },
  { value: "support", label: "Support", helper: "Product help." },
];

type Status = "idle" | "loading" | "success" | "error";

type FormState = {
  name: string;
  email: string;
  subject: string;
  message: string;
  type: InquiryType;
};

const INITIAL_STATE: FormState = {
  name: "",
  email: "",
  subject: "",
  message: "",
  type: "general",
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function isValidType(value: string): value is InquiryType {
  return (
    value === "general" ||
    value === "press" ||
    value === "partnership" ||
    value === "support"
  );
}

// ─── Field ───────────────────────────────────────────────────────────────────

type FieldProps = {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: "text" | "email";
  autoComplete?: string;
  describedBy?: string;
  invalid?: boolean;
  disabled?: boolean;
  maxLength?: number;
};

function Field({
  id,
  label,
  value,
  onChange,
  type = "text",
  autoComplete,
  describedBy,
  invalid,
  disabled,
  maxLength,
}: FieldProps) {
  return (
    <div className="cf-field" data-invalid={invalid || undefined}>
      <label htmlFor={id} className="cf-label">
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        autoComplete={autoComplete}
        maxLength={maxLength}
        aria-invalid={invalid || undefined}
        aria-describedby={describedBy}
        className="cf-input"
      />
    </div>
  );
}

// ─── Textarea field ──────────────────────────────────────────────────────────

type TextareaFieldProps = {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  describedBy?: string;
  invalid?: boolean;
  disabled?: boolean;
  maxLength?: number;
};

function TextareaField({
  id,
  label,
  value,
  onChange,
  describedBy,
  invalid,
  disabled,
  maxLength,
}: TextareaFieldProps) {
  return (
    <div className="cf-field" data-invalid={invalid || undefined}>
      <label htmlFor={id} className="cf-label">
        {label}
      </label>
      <textarea
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        rows={5}
        maxLength={maxLength}
        aria-invalid={invalid || undefined}
        aria-describedby={describedBy}
        className="cf-input cf-textarea"
      />
    </div>
  );
}

// ─── Type selector (radio group styled as pills) ─────────────────────────────

type TypeSelectorProps = {
  value: InquiryType;
  onChange: (v: InquiryType) => void;
  disabled?: boolean;
  groupId: string;
};

function TypeSelector({ value, onChange, disabled, groupId }: TypeSelectorProps) {
  return (
    <fieldset disabled={disabled} className="min-w-0">
      <legend className="cf-label mb-3 block">Inquiry type</legend>
      <div
        role="radiogroup"
        aria-labelledby={groupId}
        className="flex flex-wrap gap-2"
      >
        {INQUIRY_TYPES.map((t) => {
          const active = t.value === value;
          return (
            <button
              key={t.value}
              type="button"
              role="radio"
              aria-checked={active}
              onClick={() => onChange(t.value)}
              disabled={disabled}
              className="cf-type"
            >
              <span aria-hidden className="cf-type-dot" />
              {t.label}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}

// ─── Main form ───────────────────────────────────────────────────────────────

export default function ContactForm() {
  const searchParams = useSearchParams();

  const uid = useId();
  const nameId = `${uid}-name`;
  const emailId = `${uid}-email`;
  const subjectId = `${uid}-subject`;
  const messageId = `${uid}-message`;
  const errorId = `${uid}-error`;
  const successId = `${uid}-success`;
  const typeLegendId = `${uid}-type-legend`;

  const [state, setState] = useState<FormState>(INITIAL_STATE);
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [invalidField, setInvalidField] = useState<keyof FormState | null>(null);
  // Entrance animations only play after the first submit attempt so the
  // initial static content renders with zero animation (visible by default).
  const [hasSubmitted, setHasSubmitted] = useState(false);

  // Query param pre-fill — only runs once on mount.
  const hydratedRef = useRef(false);
  useEffect(() => {
    if (hydratedRef.current) return;
    hydratedRef.current = true;
    if (!searchParams) return;

    const qType = searchParams.get("type");
    const qSubject = searchParams.get("subject");
    const qName = searchParams.get("name");
    const qEmail = searchParams.get("email");
    const qMessage = searchParams.get("message");

    setState((prev) => ({
      ...prev,
      type: qType && isValidType(qType) ? qType : prev.type,
      subject: qSubject ? qSubject.slice(0, 200) : prev.subject,
      name: qName ? qName.slice(0, 120) : prev.name,
      email: qEmail ?? prev.email,
      message: qMessage ? qMessage.slice(0, 4000) : prev.message,
    }));
  }, [searchParams]);

  const update =
    <K extends keyof FormState>(key: K) =>
    (value: FormState[K]) => {
      setState((prev) => ({ ...prev, [key]: value }));
      if (status === "error") setStatus("idle");
      if (invalidField === key) setInvalidField(null);
      if (errorMsg) setErrorMsg(null);
    };

  const validateLocal = (): { field: keyof FormState; msg: string } | null => {
    const name = state.name.trim();
    const email = state.email.trim();
    const subject = state.subject.trim();
    const message = state.message.trim();

    if (name.length < 1 || name.length > 120) {
      return { field: "name", msg: "Please enter your name." };
    }
    if (!EMAIL_RE.test(email)) {
      return { field: "email", msg: "That email doesn't look right." };
    }
    if (subject.length < 1 || subject.length > 200) {
      return { field: "subject", msg: "Please add a subject." };
    }
    if (message.length < 10 || message.length > 4000) {
      return {
        field: "message",
        msg: "Tell us a bit more — at least 10 characters.",
      };
    }
    return null;
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "loading" || status === "success") return;

    setHasSubmitted(true);

    const local = validateLocal();
    if (local) {
      setInvalidField(local.field);
      setErrorMsg(local.msg);
      setStatus("error");
      return;
    }

    setStatus("loading");
    setErrorMsg(null);
    setInvalidField(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: state.name.trim(),
          email: state.email.trim().toLowerCase(),
          subject: state.subject.trim(),
          message: state.message.trim(),
          type: state.type,
        }),
      });

      const json = (await res.json().catch(() => null)) as {
        ok?: boolean;
        error?: string;
      } | null;

      if (res.ok && json?.ok) {
        setStatus("success");
        setState(INITIAL_STATE);
      } else {
        setStatus("error");
        setErrorMsg(
          json?.error ?? "Something went wrong. Please try again shortly.",
        );
      }
    } catch {
      setStatus("error");
      setErrorMsg("Network error. Please try again.");
    }
  };

  const isLoading = status === "loading";
  const isSuccess = status === "success";
  const isError = status === "error";

  const describedBy = (field: keyof FormState): string | undefined => {
    if (invalidField === field && isError) return errorId;
    return undefined;
  };

  return (
    <form onSubmit={onSubmit} noValidate className="cf-form flex flex-col gap-7">
      <div id={typeLegendId} className="sr-only">
        Inquiry type
      </div>

      <TypeSelector
        value={state.type}
        onChange={update("type")}
        disabled={isLoading || isSuccess}
        groupId={typeLegendId}
      />

      <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 sm:gap-5">
        <Field
          id={nameId}
          label="Your name"
          value={state.name}
          onChange={update("name")}
          autoComplete="name"
          invalid={invalidField === "name"}
          describedBy={describedBy("name")}
          disabled={isLoading || isSuccess}
          maxLength={120}
        />
        <Field
          id={emailId}
          label="Email"
          type="email"
          value={state.email}
          onChange={update("email")}
          autoComplete="email"
          invalid={invalidField === "email"}
          describedBy={describedBy("email")}
          disabled={isLoading || isSuccess}
        />
      </div>

      <Field
        id={subjectId}
        label="Subject"
        value={state.subject}
        onChange={update("subject")}
        invalid={invalidField === "subject"}
        describedBy={describedBy("subject")}
        disabled={isLoading || isSuccess}
        maxLength={200}
      />

      <TextareaField
        id={messageId}
        label="Message"
        value={state.message}
        onChange={update("message")}
        invalid={invalidField === "message"}
        describedBy={describedBy("message")}
        disabled={isLoading || isSuccess}
        maxLength={4000}
      />

      {/* Submit + state message row */}
      <div className="cf-actions flex flex-col-reverse items-stretch justify-between gap-4 sm:flex-row sm:items-center sm:gap-6">
        <div className="min-h-[1.25rem]">
          {isError && errorMsg ? (
            <p
              key="error"
              id={errorId}
              role="alert"
              aria-live="polite"
              className="cf-in cf-msg"
              data-tone="error"
            >
              <span aria-hidden className="cf-msg-dot" />
              {errorMsg}
            </p>
          ) : isSuccess ? (
            <p
              key="success"
              id={successId}
              role="status"
              aria-live="polite"
              className="cf-in cf-msg"
              data-tone="success"
            >
              <span aria-hidden className="cf-msg-dot" />
              Sent. We&rsquo;ll reply within 24h.
            </p>
          ) : (
            <p
              key="helper"
              className={hasSubmitted ? "cf-in cf-msg" : "cf-msg"}
              data-tone="idle"
            >
              We typically reply within 24h.
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isLoading || isSuccess}
          aria-busy={isLoading || undefined}
          className="btn btn-ink cf-submit"
          data-state={isSuccess ? "success" : isLoading ? "loading" : "idle"}
        >
          {isLoading ? (
            <span key="label-loading" className="cf-in">
              Sending
            </span>
          ) : isSuccess ? (
            <span key="label-success" className="cf-in">
              Message sent
            </span>
          ) : (
            <span
              key="label-idle"
              className={hasSubmitted ? "cf-in" : undefined}
            >
              Send message
            </span>
          )}

          {isLoading ? (
            <span
              key="icon-loader"
              aria-hidden
              className="cf-spinner inline-block h-3.5 w-3.5 rounded-full border-2"
              style={{
                borderColor: "currentColor",
                borderRightColor: "transparent",
              }}
            />
          ) : isSuccess ? (
            <svg
              key="icon-check"
              aria-hidden
              className="cf-pop"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.25"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M20 6L9 17l-5-5" />
            </svg>
          ) : (
            <span
              key="icon-arrow"
              aria-hidden
              className={
                hasSubmitted ? "cf-in inline-block" : "inline-block"
              }
            >
              <span className="btn-arrow inline-block">→</span>
            </span>
          )}
        </button>
      </div>

      <style>{styles}</style>
    </form>
  );
}

// ─── Scoped styles ───────────────────────────────────────────────────────────
// Field look + keyframe entrances (replacing the previous AnimatePresence
// crossfades). The global prefers-reduced-motion rule in globals.css collapses
// the animations to 0.01ms / a single iteration.
const styles = `
.cf-form .cf-field {
  display: grid;
  gap: 9px;
}
.cf-form .cf-label {
  font-family: var(--font-mono);
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.14em;
  line-height: 1.2;
  text-transform: uppercase;
  color: var(--color-ink-tertiary);
  transition: color 200ms var(--ease-smooth);
}
.cf-form .cf-field:focus-within .cf-label {
  color: var(--color-ink);
}
.cf-form .cf-field[data-invalid] .cf-label {
  color: var(--color-soft-alert);
}
.cf-form .cf-input {
  display: block;
  width: 100%;
  height: 52px;
  margin: 0;
  padding: 0 16px;
  border-radius: 14px;
  border: 1px solid var(--color-grid);
  background: #FFFFFF;
  color: var(--color-ink);
  font-family: var(--font-sans);
  font-size: 1rem;
  line-height: 1.4;
  letter-spacing: -0.005em;
  box-shadow: 0 1px 2px rgb(16 35 26 / 0.04);
  -webkit-appearance: none;
  appearance: none;
  transition:
    border-color 300ms var(--ease-smooth),
    background-color 300ms var(--ease-smooth),
    box-shadow 300ms var(--ease-smooth);
}
.cf-form .cf-textarea {
  height: auto;
  min-height: 168px;
  padding: 14px 16px;
  line-height: 1.6;
  resize: none;
}
.cf-form .cf-input:hover:not(:disabled):not(:focus) {
  border-color: color-mix(in srgb, var(--color-ink) 28%, var(--color-grid));
}
.cf-form .cf-input:focus {
  outline: 2px solid var(--color-ink);
  outline-offset: 2px;
  border-color: var(--color-ink);
}
.cf-form .cf-input[aria-invalid="true"] {
  border-color: var(--color-soft-alert);
  background: color-mix(in srgb, var(--color-soft-alert) 5%, #FFFFFF);
}
.cf-form .cf-input[aria-invalid="true"]:focus {
  outline-color: var(--color-soft-alert);
}
.cf-form .cf-input:disabled {
  opacity: 0.6;
  cursor: default;
}

.cf-form .cf-type {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  min-height: 40px;
  padding: 0 16px 0 14px;
  border-radius: 999px;
  border: 1px solid var(--color-grid);
  background: #FFFFFF;
  color: var(--color-ink);
  font-family: var(--font-sans);
  font-size: 14px;
  font-weight: 550;
  letter-spacing: -0.005em;
  line-height: 1;
  cursor: pointer;
  transition:
    background-color 300ms var(--ease-expo),
    border-color 300ms var(--ease-expo),
    color 300ms var(--ease-expo),
    transform 300ms var(--ease-expo);
}
.cf-form .cf-type-dot {
  width: 6px;
  height: 6px;
  flex: none;
  border-radius: 999px;
  background: var(--color-grid);
  transition: background-color 300ms var(--ease-expo), box-shadow 300ms var(--ease-expo);
}
.cf-form .cf-type:hover:not(:disabled) {
  border-color: color-mix(in srgb, var(--color-ink) 38%, var(--color-grid));
}
.cf-form .cf-type[aria-checked="true"] {
  background: var(--color-ink);
  border-color: var(--color-ink);
  color: #FFFFFF;
}
.cf-form .cf-type[aria-checked="true"] .cf-type-dot {
  background: var(--color-lime);
  box-shadow: 0 0 10px rgb(214 240 80 / 0.7);
}
.cf-form .cf-type:disabled {
  cursor: default;
  opacity: 0.6;
}
.cf-form .cf-type:focus-visible {
  outline: 2px solid var(--color-ink);
  outline-offset: 3px;
}
@media (prefers-reduced-motion: no-preference) {
  .cf-form .cf-type[aria-checked="false"]:hover:not(:disabled) {
    transform: translateY(-1px);
  }
}

.cf-form .cf-msg {
  display: inline-flex;
  align-items: flex-start;
  gap: 9px;
  margin: 0;
  font-family: var(--font-mono);
  font-size: 11px;
  letter-spacing: 0.08em;
  line-height: 1.5;
}
.cf-form .cf-msg[data-tone="idle"] { color: var(--color-ink-tertiary); }
.cf-form .cf-msg[data-tone="error"] { color: var(--color-soft-alert); }
.cf-form .cf-msg[data-tone="success"] { color: var(--color-green-deep); }
.cf-form .cf-msg-dot {
  width: 7px;
  height: 7px;
  margin-top: 0.43em;
  flex: none;
  border-radius: 999px;
  background: currentColor;
}
.cf-form .cf-msg[data-tone="success"] .cf-msg-dot {
  background: var(--color-lime);
  box-shadow: 0 0 0 1.5px rgb(16 35 26 / 0.45);
}

.cf-form .cf-submit {
  min-width: 188px;
  cursor: pointer;
}
.cf-form .cf-submit:disabled {
  cursor: default;
  transform: none;
}
.cf-form .cf-submit[data-state="loading"] {
  opacity: 0.88;
}
.cf-form .cf-submit[data-state="success"] {
  background: var(--color-lime);
  color: var(--color-ink);
  box-shadow: inset 0 1px 0 rgb(255 255 255 / 0.6);
}

@keyframes cf-in {
  from { opacity: 0; transform: translateY(4px); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes cf-pop {
  from { opacity: 0; transform: scale(0.7); }
  to { opacity: 1; transform: scale(1); }
}
@keyframes cf-spin {
  to { transform: rotate(360deg); }
}
.cf-form .cf-in { animation: cf-in 300ms var(--ease-smooth) both; }
.cf-form .cf-pop { animation: cf-pop 300ms var(--ease-smooth) both; }
.cf-form .cf-spinner {
  animation: cf-pop 300ms var(--ease-smooth) both,
    cf-spin 0.9s linear infinite;
}
`;
