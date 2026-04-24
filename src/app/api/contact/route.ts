import { NextRequest } from "next/server";

// Supabase project — constants copied verbatim from src/components/Waitlist.tsx
// (same project, same anon key). Do not diverge.
const SUPABASE_URL = "https://ykcakhvmzebakodxmjpb.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlrY2FraHZtemViYWtvZHhtanBiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE5NDEwODYsImV4cCI6MjA4NzUxNzA4Nn0.cpI9MFeTlr9p0d75R0jtiyCXu7HDiGB1fz2B8drkQ0A";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const ALLOWED_TYPES = ["general", "press", "partnership", "support"] as const;
type InquiryType = (typeof ALLOWED_TYPES)[number];

type ContactPayload = {
  name: string;
  email: string;
  subject: string;
  message: string;
  type: InquiryType;
};

type ValidationResult =
  | { ok: true; data: ContactPayload }
  | { ok: false; error: string };

function validate(input: unknown): ValidationResult {
  if (!input || typeof input !== "object") {
    return { ok: false, error: "Invalid payload." };
  }
  const raw = input as Record<string, unknown>;

  const name = typeof raw.name === "string" ? raw.name.trim() : "";
  const email = typeof raw.email === "string" ? raw.email.trim().toLowerCase() : "";
  const subject = typeof raw.subject === "string" ? raw.subject.trim() : "";
  const message = typeof raw.message === "string" ? raw.message.trim() : "";
  const type = typeof raw.type === "string" ? raw.type.trim() : "";

  if (name.length < 1 || name.length > 120) {
    return { ok: false, error: "Please enter your name (max 120 characters)." };
  }
  if (!EMAIL_RE.test(email)) {
    return { ok: false, error: "Please enter a valid email address." };
  }
  if (subject.length < 1 || subject.length > 200) {
    return { ok: false, error: "Please add a subject (max 200 characters)." };
  }
  if (message.length < 10 || message.length > 4000) {
    return {
      ok: false,
      error: "Message must be between 10 and 4000 characters.",
    };
  }
  if (!ALLOWED_TYPES.includes(type as InquiryType)) {
    return { ok: false, error: "Please select a valid inquiry type." };
  }

  return {
    ok: true,
    data: {
      name,
      email,
      subject,
      message,
      type: type as InquiryType,
    },
  };
}

export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json(
      { ok: false, error: "Invalid JSON payload." },
      { status: 400 },
    );
  }

  const result = validate(body);
  if (!result.ok) {
    return Response.json({ ok: false, error: result.error }, { status: 400 });
  }

  const ip_country = request.headers.get("x-vercel-ip-country") || null;
  const user_agent = request.headers.get("user-agent") || null;

  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/contact_inquiries`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        Prefer: "return=minimal",
      },
      body: JSON.stringify({
        ...result.data,
        ip_country,
        user_agent,
      }),
    });

    if (!res.ok) {
      // Log internal error but never leak DB details to the client.
      const detail = await res.text().catch(() => "");
      console.error("[contact] Supabase insert failed", res.status, detail);
      return Response.json(
        {
          ok: false,
          error: "We couldn't submit your message. Please try again shortly.",
        },
        { status: 500 },
      );
    }

    return Response.json({ ok: true });
  } catch (err) {
    console.error("[contact] Unexpected error", err);
    return Response.json(
      {
        ok: false,
        error: "We couldn't submit your message. Please try again shortly.",
      },
      { status: 500 },
    );
  }
}
