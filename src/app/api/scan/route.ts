import { NextRequest, NextResponse } from "next/server";
import { scanUrl } from "@/lib/scanner";

export const maxDuration = 30;

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

    const result = await scanUrl(url);

    return NextResponse.json(result);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Neznámá chyba při skenování";

    if (message.includes("Invalid URL") || message.includes("ERR_INVALID_URL")) {
      return NextResponse.json(
        { error: "Neplatná URL adresa. Zadejte adresu ve formátu www.example.cz" },
        { status: 400 }
      );
    }

    if (message.includes("abort") || message.includes("timeout") || message.includes("TIMEOUT")) {
      return NextResponse.json(
        { error: "Stránka neodpověděla včas (timeout 8s). Zkuste to znovu nebo zkontrolujte URL." },
        { status: 504 }
      );
    }

    if (message.includes("ENOTFOUND") || message.includes("getaddrinfo")) {
      return NextResponse.json(
        { error: "Doména nebyla nalezena. Zkontrolujte URL adresu." },
        { status: 400 }
      );
    }

    console.error("Scan error:", message);
    return NextResponse.json(
      { error: `Chyba při skenování: ${message}` },
      { status: 500 }
    );
  }
}
