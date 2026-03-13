import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const ALLOWED_ORIGINS = [
  "https://pristupnost-check.vercel.app",
  "http://localhost:3000",
];

const SERVICE_LABELS: Record<string, string> = {
  audit: "Kompletní audit celého webu",
  monitoring: "Pravidelný monitoring",
  other: "Jiné",
};

function corsHeaders(origin: string | null): Record<string, string> {
  const headers: Record<string, string> = {
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };
  if (origin && ALLOWED_ORIGINS.includes(origin)) {
    headers["Access-Control-Allow-Origin"] = origin;
  }
  return headers;
}

function jsonResponse(
  data: object,
  status: number,
  cors: Record<string, string>
): NextResponse {
  const res = NextResponse.json(data, { status });
  for (const [key, value] of Object.entries(cors)) {
    res.headers.set(key, value);
  }
  return res;
}

export async function OPTIONS(request: NextRequest) {
  const origin = request.headers.get("origin");
  const cors = corsHeaders(origin);
  const res = new NextResponse(null, { status: 204 });
  for (const [key, value] of Object.entries(cors)) {
    res.headers.set(key, value);
  }
  return res;
}

export async function POST(request: NextRequest) {
  const origin = request.headers.get("origin");
  const cors = corsHeaders(origin);

  try {
    const body = await request.json();
    const { email, websiteUrl, serviceType, note, gdprConsent } = body;

    // Validate email
    if (!email || typeof email !== "string" || email.length > 254) {
      return jsonResponse({ error: "Zadejte platný e-mail." }, 400, cors);
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return jsonResponse({ error: "Zadejte platný e-mail." }, 400, cors);
    }

    // Validate service type
    if (!serviceType || !SERVICE_LABELS[serviceType]) {
      return jsonResponse({ error: "Vyberte typ služby." }, 400, cors);
    }

    // Validate GDPR consent
    if (gdprConsent !== true) {
      return jsonResponse(
        { error: "Pro odeslání je nutný souhlas se zpracováním údajů." },
        400,
        cors
      );
    }

    // Optional fields
    const safeUrl =
      websiteUrl && typeof websiteUrl === "string"
        ? websiteUrl.slice(0, 2000)
        : "";
    const safeNote =
      note && typeof note === "string" ? note.slice(0, 500) : "";

    const serviceLabel = SERVICE_LABELS[serviceType];

    // Check Resend API key
    if (!process.env.RESEND_API_KEY) {
      console.error("RESEND_API_KEY is not configured");
      return jsonResponse(
        { error: "Služba je dočasně nedostupná. Zkuste to prosím později." },
        500,
        cors
      );
    }

    const resend = new Resend(process.env.RESEND_API_KEY);

    const { error: sendError } = await resend.emails.send({
      from: "PřístupnostCheck <onboarding@resend.dev>",
      to: ["admin@axnflw.com"],
      replyTo: email,
      subject: `Nová poptávka: ${serviceLabel}${safeUrl ? ` — ${safeUrl}` : ""}`,
      html: `<!DOCTYPE html>
<html lang="cs">
<head><meta charset="utf-8"></head>
<body>
<h2>Nová poptávka z PřístupnostCheck</h2>
<table style="border-collapse:collapse;font-family:sans-serif;">
  <tr><td style="padding:6px 12px 6px 0;font-weight:bold;vertical-align:top;">E-mail:</td><td style="padding:6px 0;">${escapeHtml(email)}</td></tr>
  <tr><td style="padding:6px 12px 6px 0;font-weight:bold;vertical-align:top;">Služba:</td><td style="padding:6px 0;">${escapeHtml(serviceLabel)}</td></tr>
  ${safeUrl ? `<tr><td style="padding:6px 12px 6px 0;font-weight:bold;vertical-align:top;">Web:</td><td style="padding:6px 0;">${escapeHtml(safeUrl)}</td></tr>` : ""}
  ${safeNote ? `<tr><td style="padding:6px 12px 6px 0;font-weight:bold;vertical-align:top;">Poznámka:</td><td style="padding:6px 0;">${escapeHtml(safeNote)}</td></tr>` : ""}
</table>
<hr style="margin:16px 0;border:none;border-top:1px solid #e2e8f0;" />
<p style="color:#64748b;font-size:13px;">Odesláno z formuláře na pristupnost-check.vercel.app · GDPR souhlas udělen</p>
</body>
</html>`.trim(),
    });

    if (sendError) {
      console.error("Resend error:", sendError);
      return jsonResponse(
        { error: "Nepodařilo se odeslat poptávku. Zkuste to prosím později." },
        500,
        cors
      );
    }

    return jsonResponse({ success: true }, 200, cors);
  } catch (error) {
    console.error("Contact form error:", error);
    return jsonResponse(
      { error: "Nepodařilo se odeslat poptávku. Zkuste to prosím později." },
      500,
      cors
    );
  }
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
