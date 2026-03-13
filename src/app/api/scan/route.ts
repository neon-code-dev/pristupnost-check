import { NextRequest, NextResponse } from "next/server";

export const maxDuration = 60;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { url } = body;

    if (!url || typeof url !== "string") {
      return NextResponse.json(
        { error: "Zadejte URL adresu stránky" },
        { status: 400 }
      );
    }

    if (url.length > 2000) {
      return NextResponse.json(
        { error: "URL je příliš dlouhá" },
        { status: 400 }
      );
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
      return NextResponse.json(
        { error: "Nelze skenovat lokální adresy" },
        { status: 400 }
      );
    }

    // Dynamic import to catch module-level errors (jsdom/axe-core on Vercel)
    const { scanUrl } = await import("@/lib/scanner");
    const result = await scanUrl(url);

    return NextResponse.json(result);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Neznámá chyba při skenování";
    const stack =
      error instanceof Error ? error.stack : undefined;

    console.error("Scan error:", message, stack);

    if (message.includes("Invalid URL") || message.includes("ERR_INVALID_URL")) {
      return NextResponse.json(
        { error: "Neplatná URL adresa. Zadejte adresu ve formátu www.example.cz" },
        { status: 400 }
      );
    }

    if (message.includes("abort") || message.includes("timeout") || message.includes("TIMEOUT") || message.includes("TimeoutError") || message.includes("Navigation timeout")) {
      return NextResponse.json(
        { error: "Stránka neodpověděla včas (timeout 20s). Zkuste to znovu nebo zkontrolujte URL." },
        { status: 504 }
      );
    }

    if (message.includes("net::ERR_NAME_NOT_RESOLVED")) {
      return NextResponse.json(
        { error: "Doména nebyla nalezena. Zkontrolujte URL adresu." },
        { status: 400 }
      );
    }

    if (message.includes("net::ERR_CONNECTION_REFUSED") || message.includes("net::ERR_CONNECTION_RESET")) {
      return NextResponse.json(
        { error: "Nepodařilo se připojit k serveru. Stránka může být nedostupná." },
        { status: 502 }
      );
    }

    if (message.includes("net::ERR_CERT") || message.includes("net::ERR_SSL")) {
      return NextResponse.json(
        { error: "Chyba SSL certifikátu. Stránka nemá platný HTTPS certifikát." },
        { status: 502 }
      );
    }

    if (message.includes("ENOTFOUND") || message.includes("getaddrinfo")) {
      return NextResponse.json(
        { error: "Doména nebyla nalezena. Zkontrolujte URL adresu." },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: `Chyba při skenování: ${message}` },
      { status: 500 }
    );
  }
}
