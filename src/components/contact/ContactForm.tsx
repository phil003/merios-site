"use client";

import { useEffect, useId, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { duration, easing } from "@/lib/motion";

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

// ─── Floating-label field ────────────────────────────────────────────────────

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
  const [focused, setFocused] = useState(false);
  const reduced = useReducedMotion();
  const floating = focused || value.length > 0;

  const borderColor = invalid
    ? "var(--color-accent-warm)"
    : focused
      ? "var(--color-pulse)"
      : "rgba(14,20,18,0.22)";

  return (
    <div className="relative">
      <label
        htmlFor={id}
        className="pointer-events-none absolute left-0 origin-top-left select-none"
        style={{
          fontFamily: "var(--font-serif)",
          color: invalid
            ? "var(--color-accent-warm)"
            : focused
              ? "var(--color-green-deep)"
              : "var(--color-ink-secondary)",
          transform: floating
            ? "translateY(-2px) scale(0.72)"
            : "translateY(22px) scale(1)",
          transformOrigin: "top left",
          transition: reduced
            ? `color ${duration.quick}s ${easing.smooth}`
            : `transform ${duration.quick}s cubic-bezier(0.22, 1, 0.36, 1), color ${duration.quick}s ${easing.smooth}`,
          fontSize: "1.0625rem",
          letterSpacing: "-0.01em",
          fontWeight: 400,
        }}
      >
        {label}
      </label>
      <motion.input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        disabled={disabled}
        autoComplete={autoComplete}
        maxLength={maxLength}
        aria-invalid={invalid || undefined}
        aria-describedby={describedBy}
        className="w-full bg-transparent pb-2.5 pt-6 text-base outline-none disabled:opacity-60"
        style={{
          fontFamily: "var(--font-sans)",
          color: "var(--color-ink)",
          letterSpacing: "-0.005em",
        }}
        animate={{
          borderBottomColor: borderColor,
          borderBottomWidth: 1,
          borderBottomStyle: "solid",
        }}
        transition={
          reduced
            ? { duration: duration.quick, ease: easing.smooth }
            : { duration: duration.quick, ease: easing.smooth }
        }
      />
    </div>
  );
}

// ─── Floating-label textarea ─────────────────────────────────────────────────

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
  const [focused, setFocused] = useState(false);
  const reduced = useReducedMotion();
  const floating = focused || value.length > 0;

  const borderColor = invalid
    ? "var(--color-accent-warm)"
    : focused
      ? "var(--color-pulse)"
      : "rgba(14,20,18,0.22)";

  return (
    <div className="relative">
      <label
        htmlFor={id}
        className="pointer-events-none absolute left-0 origin-top-left select-none"
        style={{
          fontFamily: "var(--font-serif)",
          color: invalid
            ? "var(--color-accent-warm)"
            : focused
              ? "var(--color-green-deep)"
              : "var(--color-ink-secondary)",
          transform: floating
            ? "translateY(-2px) scale(0.72)"
            : "translateY(22px) scale(1)",
          transformOrigin: "top left",
          transition: reduced
            ? `color ${duration.quick}s ${easing.smooth}`
            : `transform ${duration.quick}s cubic-bezier(0.22, 1, 0.36, 1), color ${duration.quick}s ${easing.smooth}`,
          fontSize: "1.0625rem",
          letterSpacing: "-0.01em",
          fontWeight: 400,
        }}
      >
        {label}
      </label>
      <motion.textarea
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        disabled={disabled}
        rows={5}
        maxLength={maxLength}
        aria-invalid={invalid || undefined}
        aria-describedby={describedBy}
        className="w-full resize-none bg-transparent pb-2.5 pt-6 text-base outline-none disabled:opacity-60"
        style={{
          fontFamily: "var(--font-sans)",
          color: "var(--color-ink)",
          lineHeight: 1.6,
          letterSpacing: "-0.005em",
        }}
        animate={{
          borderBottomColor: borderColor,
          borderBottomWidth: 1,
          borderBottomStyle: "solid",
        }}
        transition={{ duration: duration.quick, ease: easing.smooth }}
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
  const reduced = useReducedMotion();
  return (
    <fieldset disabled={disabled} className="contents">
      <legend
        className="mb-3 block"
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 11,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color: "var(--color-ink-tertiary)",
          fontWeight: 500,
        }}
      >
        Inquiry type
      </legend>
      <div
        role="radiogroup"
        aria-labelledby={groupId}
        className="flex flex-wrap gap-2"
      >
        {INQUIRY_TYPES.map((t) => {
          const active = t.value === value;
          return (
            <motion.button
              key={t.value}
              type="button"
              role="radio"
              aria-checked={active}
              onClick={() => onChange(t.value)}
              disabled={disabled}
              className="inline-flex items-center gap-2 rounded-full px-4 py-2 disabled:cursor-default disabled:opacity-60"
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: 13,
                fontWeight: 500,
                letterSpacing: "-0.005em",
                color: active ? "var(--color-canvas)" : "var(--color-ink)",
                border: "1px solid",
                borderColor: active
                  ? "var(--color-green-deep)"
                  : "var(--color-grid)",
                background: active
                  ? "var(--color-green-deep)"
                  : "var(--color-canvas-alt)",
                cursor: disabled ? "default" : "pointer",
              }}
              whileHover={
                reduced || disabled || active ? undefined : { y: -1 }
              }
              transition={{ duration: duration.quick, ease: easing.smooth }}
            >
              <span
                aria-hidden
                className="inline-block h-1.5 w-1.5 rounded-full"
                style={{
                  background: active
                    ? "var(--color-pulse)"
                    : "var(--color-grid)",
                }}
              />
              {t.label}
            </motion.button>
          );
        })}
      </div>
    </fieldset>
  );
}

// ─── Main form ───────────────────────────────────────────────────────────────

export default function ContactForm() {
  const searchParams = useSearchParams();
  const reduced = useReducedMotion();

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
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-8">
      <div id={typeLegendId} className="sr-only">
        Inquiry type
      </div>

      <TypeSelector
        value={state.type}
        onChange={update("type")}
        disabled={isLoading || isSuccess}
        groupId={typeLegendId}
      />

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
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
      <div className="flex flex-col-reverse items-start justify-between gap-5 sm:flex-row sm:items-center">
        <div
          className="min-h-[1.25rem]"
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            letterSpacing: "0.08em",
          }}
        >
          <AnimatePresence mode="wait" initial={false}>
            {isError && errorMsg ? (
              <motion.p
                key="error"
                id={errorId}
                role="alert"
                aria-live="polite"
                initial={reduced ? { opacity: 0 } : { opacity: 0, y: 4 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  color: "var(--color-accent-warm)",
                }}
                exit={reduced ? { opacity: 0 } : { opacity: 0, y: -4 }}
                transition={{ duration: duration.quick, ease: easing.smooth }}
              >
                {errorMsg}
              </motion.p>
            ) : isSuccess ? (
              <motion.p
                key="success"
                id={successId}
                role="status"
                aria-live="polite"
                initial={reduced ? { opacity: 0 } : { opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0, color: "var(--color-pulse)" }}
                exit={reduced ? { opacity: 0 } : { opacity: 0, y: -4 }}
                transition={{ duration: duration.quick, ease: easing.smooth }}
              >
                Sent. We&rsquo;ll reply within 24h.
              </motion.p>
            ) : (
              <motion.p
                key="helper"
                initial={reduced ? { opacity: 0 } : { opacity: 0, y: 4 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  color: "var(--color-ink-tertiary)",
                }}
                exit={reduced ? { opacity: 0 } : { opacity: 0, y: -4 }}
                transition={{ duration: duration.quick, ease: easing.smooth }}
              >
                We typically reply within 24h.
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        <motion.button
          type="submit"
          disabled={isLoading || isSuccess}
          aria-busy={isLoading || undefined}
          className="group relative inline-flex items-center justify-center gap-3 overflow-hidden rounded-full px-7 py-3.5 disabled:cursor-default"
          style={{
            fontFamily: "var(--font-serif)",
            fontWeight: 400,
            letterSpacing: "-0.005em",
            fontSize: "1rem",
            color: "var(--color-canvas)",
            cursor: isLoading || isSuccess ? "default" : "pointer",
          }}
          animate={{
            backgroundColor: isSuccess
              ? "rgba(30,61,42,0.55)"
              : "var(--color-green-deep)",
            boxShadow: isSuccess
              ? "0 0 0 0 rgba(30,61,42,0)"
              : "0 12px 30px -14px rgba(30,61,42,0.55)",
          }}
          whileHover={
            reduced || isLoading || isSuccess
              ? undefined
              : { y: -2, boxShadow: "0 16px 36px -14px rgba(30,61,42,0.65)" }
          }
          whileTap={reduced || isLoading || isSuccess ? undefined : { y: -1 }}
          transition={{ duration: duration.quick, ease: easing.smooth }}
        >
          <AnimatePresence mode="wait" initial={false}>
            {isLoading ? (
              <motion.span
                key="label-loading"
                initial={reduced ? { opacity: 0 } : { opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduced ? { opacity: 0 } : { opacity: 0, y: -4 }}
                transition={{ duration: duration.quick, ease: easing.smooth }}
              >
                Sending
              </motion.span>
            ) : isSuccess ? (
              <motion.span
                key="label-success"
                initial={reduced ? { opacity: 0 } : { opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduced ? { opacity: 0 } : { opacity: 0, y: -4 }}
                transition={{ duration: duration.quick, ease: easing.smooth }}
              >
                Message sent
              </motion.span>
            ) : (
              <motion.span
                key="label-idle"
                initial={reduced ? { opacity: 0 } : { opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduced ? { opacity: 0 } : { opacity: 0, y: -4 }}
                transition={{ duration: duration.quick, ease: easing.smooth }}
              >
                Send message
              </motion.span>
            )}
          </AnimatePresence>

          <AnimatePresence mode="wait" initial={false}>
            {isLoading ? (
              <motion.span
                key="icon-loader"
                aria-hidden
                className="inline-block h-3.5 w-3.5 rounded-full border-2"
                style={{
                  borderColor: "var(--color-canvas)",
                  borderRightColor: "transparent",
                }}
                initial={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.7 }}
                animate={
                  reduced
                    ? { opacity: 1 }
                    : { opacity: 1, scale: 1, rotate: 360 }
                }
                exit={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.7 }}
                transition={
                  reduced
                    ? { duration: duration.quick }
                    : {
                        rotate: {
                          duration: 0.9,
                          ease: "linear",
                          repeat: Infinity,
                        },
                        opacity: {
                          duration: duration.quick,
                          ease: easing.smooth,
                        },
                        scale: {
                          duration: duration.quick,
                          ease: easing.smooth,
                        },
                      }
                }
              />
            ) : isSuccess ? (
              <motion.svg
                key="icon-check"
                aria-hidden
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.7 }}
                transition={{ duration: duration.quick, ease: easing.smooth }}
              >
                <path d="M20 6L9 17l-5-5" />
              </motion.svg>
            ) : (
              <motion.span
                key="icon-arrow"
                aria-hidden
                className="inline-block transition-transform motion-reduce:transition-none"
                style={{
                  transitionDuration: `${duration.quick * 1000}ms`,
                  transitionTimingFunction:
                    "cubic-bezier(0.22, 1, 0.36, 1)",
                }}
                initial={reduced ? { opacity: 0 } : { opacity: 0, x: -4 }}
                animate={{ opacity: 1, x: 0 }}
                exit={reduced ? { opacity: 0 } : { opacity: 0, x: 4 }}
                transition={{ duration: duration.quick, ease: easing.smooth }}
              >
                <span className="group-hover:translate-x-1 inline-block transition-transform motion-reduce:transition-none">
                  →
                </span>
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </div>
    </form>
  );
}
