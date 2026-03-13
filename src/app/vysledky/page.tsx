import { Suspense } from "react";
import type { Metadata } from "next";
import ScanResults from "./ScanResults";

export const metadata: Metadata = {
  title: "Výsledky skenu — Přístupnost Check",
  description: "Výsledky automatické kontroly přístupnosti webu podle WCAG 2.1 AA.",
  robots: { index: false },
};

export default function VysledkyPage() {
  return (
    <Suspense fallback={null}>
      <ScanResults />
    </Suspense>
  );
}
