import ScanForm from "@/components/ScanForm";

const checks = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
        <circle cx="8.5" cy="8.5" r="1.5" />
        <polyline points="21 15 16 10 5 21" />
      </svg>
    ),
    title: "Obrázky a alt texty",
    desc: "Kontrola, zda mají všechny obrázky produktů popisný alternativní text pro čtečky obrazovky.",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 7V4h16v3" />
        <path d="M9 20h6" />
        <path d="M12 4v16" />
      </svg>
    ),
    title: "Struktura nadpisů",
    desc: "Ověření správné hierarchie nadpisů (h1–h6) pro logickou navigaci stránkou.",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
        <path d="M16 2v4" />
        <path d="M8 2v4" />
        <path d="M3 10h18" />
        <path d="M8 14h.01" />
        <path d="M12 14h.01" />
        <path d="M16 14h.01" />
        <path d="M8 18h.01" />
        <path d="M12 18h.01" />
      </svg>
    ),
    title: "Formuláře a popisky",
    desc: "Detekce formulářových polí bez přiřazených labels — vyhledávání, přihlášení, košík.",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
    title: "Navigace a ARIA",
    desc: "Kontrola landmark oblastí, ARIA atributů a možnosti přeskočit navigaci klávesnicí.",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-700 flex items-center justify-center">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <span className="font-bold text-slate-900 text-sm tracking-tight">
              Přístupnost<span className="text-indigo-700">Check</span>
            </span>
          </div>
          <nav className="hidden sm:flex items-center gap-6 text-sm text-slate-600">
            <a href="#co-kontrolujeme" className="hover:text-slate-900 transition-colors">Co kontrolujeme</a>
            <a href="#proc" className="hover:text-slate-900 transition-colors">Proč řešit</a>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <main className="flex-1">
        <section className="relative overflow-hidden">
          {/* Geometric background accent */}
          <div className="absolute inset-0 geo-pattern" />
          <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-100 rounded-full blur-3xl opacity-30 -translate-y-1/2 translate-x-1/3" />

          <div className="relative max-w-6xl mx-auto px-4 sm:px-6 pt-16 sm:pt-24 pb-20 sm:pb-28">
            <div className="max-w-3xl">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-800 text-xs font-semibold mb-6 tracking-wide uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
                Zákon 424/2023 Sb. platí od 28. 6. 2025
              </div>

              <h1
                className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-950 leading-[1.1] tracking-tight mb-6"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Kontrola přístupnosti
                <br />
                <span className="text-indigo-700">vašeho webu</span>
              </h1>

              <p className="text-lg sm:text-xl text-slate-600 leading-relaxed mb-10 max-w-2xl">
                Zjistěte zda váš e-shop splňuje požadavky na přístupnost podle{" "}
                <strong className="text-slate-800">WCAG 2.1 AA</strong>.
                Výsledky v češtině s konkrétními návody na opravu. Zdarma.
              </p>

              <ScanForm />
            </div>
          </div>
        </section>

        {/* What we check */}
        <section id="co-kontrolujeme" className="py-16 sm:py-24 bg-white border-y border-slate-200">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-12 sm:mb-16">
              <h2
                className="text-2xl sm:text-3xl font-black text-slate-950 mb-3"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Co kontrolujeme
              </h2>
              <p className="text-slate-500 max-w-lg mx-auto">
                Automatická analýza podle standardu WCAG 2.1 AA — stejný engine jako Google Lighthouse.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {checks.map((check) => (
                <div
                  key={check.title}
                  className="group p-6 rounded-xl border-2 border-slate-200 bg-slate-50 hover:border-indigo-300 hover:bg-indigo-50/50 transition-all duration-200"
                >
                  <div className="w-12 h-12 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center mb-4 group-hover:bg-indigo-200 transition-colors">
                    {check.icon}
                  </div>
                  <h3 className="font-bold text-slate-900 mb-2">{check.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{check.desc}</p>
                </div>
              ))}
            </div>

            <p className="text-center text-sm text-slate-400 mt-8">
              Poznámka: Kontrola barevného kontrastu vyžaduje plný rendering stránky a není zatím součástí bezplatného skenu.
            </p>
          </div>
        </section>

        {/* Why section */}
        <section id="proc" className="py-16 sm:py-24">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="max-w-3xl mx-auto">
              <h2
                className="text-2xl sm:text-3xl font-black text-slate-950 mb-8 text-center"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Proč řešit přístupnost e-shopu
              </h2>

              <div className="space-y-6">
                <div className="flex gap-4 p-5 rounded-xl bg-white border-2 border-slate-200">
                  <div className="shrink-0 w-10 h-10 rounded-lg bg-red-100 text-red-700 flex items-center justify-center font-black text-sm">§</div>
                  <div>
                    <h3 className="font-bold text-slate-900 mb-1">Zákon 424/2023 Sb.</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      Transpozice evropské směrnice EU 2019/882 (European Accessibility Act). Od 28. června 2025 musí provozovatelé e-shopů zajistit přístupnost webových služeb. Dozor vykonává <strong>ČOI</strong>.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 p-5 rounded-xl bg-white border-2 border-slate-200">
                  <div className="shrink-0 w-10 h-10 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center font-black text-sm">!</div>
                  <div>
                    <h3 className="font-bold text-slate-900 mb-1">Pokuta až 10 mil. Kč</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      Za nejzávažnější porušení zákona hrozí pokuta až 10 000 000 Kč (§25 odst. 8). I méně závažná porušení jsou sankcionována v řádu milionů.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 p-5 rounded-xl bg-white border-2 border-slate-200">
                  <div className="shrink-0 w-10 h-10 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center font-black text-sm">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 mb-1">Sdílená odpovědnost</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      Platforma (Shoptet, WooCommerce…) zajišťuje technický základ. Ale za přístupnost obsahu — alt texty, struktura nadpisů, popisky formulářů — <strong>zodpovídá majitel e-shopu</strong>.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA repeat */}
        <section className="py-16 sm:py-20 bg-indigo-700 relative overflow-hidden">
          <div className="absolute inset-0 geo-pattern opacity-10" />
          <div className="relative max-w-3xl mx-auto px-4 sm:px-6 text-center">
            <h2
              className="text-2xl sm:text-3xl font-black text-white mb-4"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Zkontrolujte svůj e-shop
            </h2>
            <p className="text-indigo-200 mb-8 text-lg">
              Bezplatná kontrola přístupnosti. Výsledky za pár sekund.
            </p>
            <div className="flex justify-center">
              <ScanForm size="compact" />
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-slate-500">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded bg-indigo-700 flex items-center justify-center">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <span>PřístupnostCheck</span>
            </div>
            <p>
              Skenování pomocí{" "}
              <a href="https://github.com/dequelabs/axe-core" target="_blank" rel="noopener noreferrer" className="underline hover:text-slate-700">
                axe-core
              </a>{" "}
              (MPL-2.0). Nejedná se o právní poradenství.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
