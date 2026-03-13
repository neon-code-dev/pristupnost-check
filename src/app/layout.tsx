import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Kontrola přístupnosti e-shopu zdarma | WCAG 2.1 AA česky",
  description:
    "Zkontrolujte přístupnost svého e-shopu podle WCAG 2.1 AA zdarma. Výsledky česky s návody na opravu. Zákon 424/2023 Sb. platí — vyhněte se pokutám ČOI až 10 mil. Kč.",
  keywords: [
    "kontrola přístupnosti webu",
    "test přístupnosti e-shopu",
    "přístupnost e-shopu",
    "WCAG 2.1 AA",
    "audit přístupnosti webu",
    "zákon 424/2023",
    "European Accessibility Act",
    "EAA",
    "bezbariérový e-shop",
    "bezbariérový web",
    "ČOI přístupnost",
    "validator přístupnosti",
    "přístupnost Shoptet",
    "pokuta nepřístupný e-shop",
    "test přístupnosti webu zdarma česky",
  ],
  authors: [{ name: "PřístupnostCheck" }],
  openGraph: {
    title: "Kontrola přístupnosti e-shopu zdarma | WCAG 2.1",
    description:
      "Splňuje váš e-shop zákon o přístupnosti? Bezplatný test podle WCAG 2.1 AA s výsledky v češtině. Pokuta až 10 mil. Kč.",
    type: "website",
    locale: "cs_CZ",
    siteName: "PřístupnostCheck",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://pristupnost-check.vercel.app",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="cs">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: "PřístupnostCheck",
              description:
                "Bezplatný online test přístupnosti webových stránek a e-shopů podle standardu WCAG 2.1 AA. Výsledky v češtině.",
              url: "https://pristupnost-check.vercel.app",
              applicationCategory: "DeveloperApplication",
              operatingSystem: "Web",
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "CZK",
              },
              inLanguage: "cs",
            }),
          }}
        />
      </head>
      <body className="min-h-screen">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
