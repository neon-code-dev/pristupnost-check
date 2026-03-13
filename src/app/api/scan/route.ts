import { NextRequest, NextResponse } from "next/server";

export const maxDuration = 60;

const ALLOWED_ORIGINS = [
  "https://pristupnost-check.vercel.app",
  "http://localhost:3000",
];

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
  res.headers.set("X-Pristupnost-Version", "2");
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
    const { url } = body;

    if (!url || typeof url !== "string") {
      return jsonResponse({ error: "Zadejte URL adresu stránky" }, 400, cors);
    }

    if (url.length > 2000) {
      return jsonResponse({ error: "URL je příliš dlouhá" }, 400, cors);
    }

    // Block localhost / private IPs
    const normalized = url.trim().toLowerCase();
    if (
      normalized.includes("localhost") ||
      normalized.includes("127.0.0.1") ||
      normalized.includes("0.0.0.0") ||
      normalized.match(/https?:\/\/10\./) ||
      normalized.match(/https?:\/\/192\.168\./) ||
      normalized.match(/https?:\/\/172\.(1[6-9]|2\d|3[01])\./)
    ) {
      return jsonResponse({ error: "Nelze skenovat lokální adresy" }, 400, cors);
    }

    const { scanUrl } = await import("@/lib/scanner");
    const result = await scanUrl(url);

    return jsonResponse(result, 200, cors);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Neznámá chyba při skenování";

    console.error("Scan error:", message);

    if (message.includes("Invalid URL") || message.includes("ERR_INVALID_URL")) {
      return jsonResponse(
        { error: "Neplatná URL adresa. Zadejte adresu ve formátu www.example.cz" },
        400, cors
      );
    }

    if (
      message.includes("abort") ||
      message.includes("timeout") ||
      message.includes("TIMEOUT") ||
      message.includes("TimeoutError") ||
      message.includes("Navigation timeout")
    ) {
      return jsonResponse(
        { error: "Stránka neodpověděla včas (timeout 20s). Zkuste to znovu nebo zkontrolujte URL." },
        504, cors
      );
    }

    if (message.includes("net::ERR_NAME_NOT_RESOLVED") || message.includes("ENOTFOUND") || message.includes("getaddrinfo")) {
      return jsonResponse(
        { error: "Doména nebyla nalezena. Zkontrolujte URL adresu." },
        400, cors
      );
    }

    if (message.includes("net::ERR_CONNECTION_REFUSED") || message.includes("net::ERR_CONNECTION_RESET")) {
      return jsonResponse(
        { error: "Nepodařilo se připojit k serveru. Stránka může být nedostupná." },
        502, cors
      );
    }

    if (message.includes("net::ERR_CERT") || message.includes("net::ERR_SSL")) {
      return jsonResponse(
        { error: "Chyba SSL certifikátu. Stránka nemá platný HTTPS certifikát." },
        502, cors
      );
    }

    return jsonResponse(
      { error: `Chyba při skenování: ${message}` },
      500, cors
    );
  }
}
