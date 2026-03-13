import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Kontrola přístupnosti webu — bezplatný WCAG skener pro e-shopy",
  description:
    "Zkontrolujte přístupnost svého e-shopu zdarma. Automatický sken podle WCAG 2.1 AA s výsledky v češtině. Od června 2025 platí zákon 424/2023 Sb. — pokuta až 10 mil. Kč.",
  keywords: [
    "kontrola přístupnosti",
    "přístupnost webu",
    "WCAG",
    "přístupnost e-shopu",
    "zákon 424/2023",
    "European Accessibility Act",
    "EAA",
    "WCAG 2.1",
    "ČOI přístupnost",
    "bezbariérový web",
    "audit přístupnosti",
    "accessibility checker",
  ],
  authors: [{ name: "Přístupnost Check" }],
  openGraph: {
    title: "Kontrola přístupnosti webu — bezplatný WCAG skener",
    description:
      "Zkontrolujte přístupnost svého e-shopu zdarma. Automatický sken podle WCAG 2.1 AA s výsledky v češtině.",
    type: "website",
    locale: "cs_CZ",
    siteName: "Přístupnost Check",
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
        <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>✓</text></svg>" />
      </head>
      <body className="min-h-screen">
        {children}
      </body>
    </html>
  );
}
