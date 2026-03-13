import ScanForm from "@/components/ScanForm";
import Script from "next/script";

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
    desc: "Mají vaše produktové fotky popisný alternativní text? Bez něj zákazník se čtečkou obrazovky neví, co prodáváte.",
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
    desc: "Nadpisy h1–h6 musí tvořit logickou hierarchii. Skáčete z h1 rovnou na h4? To je jako kniha bez obsahu.",
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
    desc: "Pole pro e-mail, heslo nebo vyhledávání bez popisku (label)? Zákazník nevidí, co má kam napsat.",
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
    desc: "Dá se váš e-shop ovládat klávesnicí? Má správné ARIA atributy? Bez toho je pro řadu lidí nepoužitelný.",
  },
];

const faqItems = [
  {
    question: "Musí můj e-shop splňovat zákon o přístupnosti?",
    answer: "Pokud prodáváte zboží nebo služby online koncovým spotřebitelům (B2C), pak ano. Zákon 424/2023 Sb. se vztahuje na e-shopy, online tržiště a webové služby od 28. června 2025. Výjimku mají pouze mikropodniky — firmy s méně než 10 zaměstnanci a ročním obratem pod 2 miliony EUR (cca 50 mil. Kč).",
  },
  {
    question: "Co je WCAG 2.1 AA a proč se o něm mluví?",
    answer: "WCAG 2.1 AA je mezinárodní standard pro přístupnost webových stránek. Zákon 424/2023 Sb. odkazuje na harmonizovanou normu EN 301 549, která vychází právě z WCAG 2.1 úrovně AA. Jednoduše řečeno: splníte-li WCAG 2.1 AA, splníte technické požadavky zákona.",
  },
  {
    question: "Jaké pokuty hrozí za nepřístupný e-shop?",
    answer: "Česká obchodní inspekce (ČOI) může uložit pokutu až 10 000 000 Kč za nejzávažnější porušení (§25 odst. 8 zákona 424/2023 Sb.). I méně závažná porušení jsou sankcionována v řádu statisíců až milionů korun. ČOI bude dozor vykonávat od 28. června 2025.",
  },
  {
    question: "Vztahuje se zákon i na malé e-shopy na Shoptetu?",
    answer: "Záleží na velikosti firmy, ne na platformě. Pokud máte méně než 10 zaměstnanců a obrat pod 2 miliony EUR, jste mikropodnik a zákon se na vás nevztahuje. Ale pozor — pokud rostete, výjimka přestane platit. A přístupný e-shop je výhoda i bez zákona: lépe se indexuje v Google a osloví víc zákazníků.",
  },
  {
    question: "Stačí automatická kontrola přístupnosti?",
    answer: "Automatický sken (jako tento nástroj) pokryje přibližně 30–40 % požadavků WCAG 2.1 AA. Odhalí chybějící alt texty, špatnou strukturu nadpisů, formuláře bez popisků nebo problémy s ARIA atributy. Zbývajících 60–70 % vyžaduje manuální audit — testování klávesnicí, čtečkou obrazovky a kontrolu barevného kontrastu. Automatická kontrola je ale skvělý první krok.",
  },
  {
    question: "Co musím na e-shopu opravit jako první?",
    answer: "Začněte s kritickými a závažnými problémy, které náš sken označí červeně a oranžově. Nejčastější problémy jsou: chybějící alternativní texty u produktových obrázků, formulářová pole bez přiřazených popisků (label), špatná hierarchie nadpisů a chybějící možnost přeskočit navigaci. Většinu z toho zvládnete opravit sami v administraci e-shopu.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
};

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* FAQ Schema for Google */}
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

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
            <a href="#jak-to-funguje" className="hover:text-slate-900 transition-colors">Jak to funguje</a>
            <a href="#priklady" className="hover:text-slate-900 transition-colors">Příklady</a>
            <a href="#proc" className="hover:text-slate-900 transition-colors">Proč řešit</a>
            <a href="#faq" className="hover:text-slate-900 transition-colors">FAQ</a>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <main className="flex-1">
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 geo-pattern" />
          <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-100 rounded-full blur-3xl opacity-30 -translate-y-1/2 translate-x-1/3" />

          <div className="relative max-w-6xl mx-auto px-4 sm:px-6 pt-16 sm:pt-24 pb-20 sm:pb-28">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-800 text-xs font-semibold mb-6 tracking-wide uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
                Zákon 424/2023 Sb. platí od 28. 6. 2025
              </div>

              <h1
                className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-950 leading-[1.1] tracking-tight mb-6"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Splňuje váš e-shop
                <br />
                <span className="text-indigo-700">zákon o přístupnosti?</span>
              </h1>

              <p className="text-lg sm:text-xl text-slate-600 leading-relaxed mb-10 max-w-2xl">
                Bezplatná kontrola přístupnosti e-shopu podle{" "}
                <strong className="text-slate-800">WCAG 2.1 AA</strong>.
                Výsledky v češtině s konkrétními návody co opravit.
                Zjistěte za pár sekund, jestli váš bezbariérový web obstojí před ČOI.
              </p>

              <ScanForm />
            </div>
          </div>
        </section>

        {/* How it works */}
        <section id="jak-to-funguje" className="py-16 sm:py-24 bg-white border-y border-slate-200">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-12 sm:mb-16">
              <h2
                className="text-2xl sm:text-3xl font-black text-slate-950 mb-3"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Jak kontrola přístupnosti webu funguje
              </h2>
              <p className="text-slate-500 max-w-lg mx-auto">
                Tři kroky a máte jasno. Žádná registrace, žádné platby.
              </p>
            </div>

            <div className="grid sm:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="w-16 h-16 rounded-2xl bg-indigo-100 text-indigo-700 flex items-center justify-center mx-auto mb-5">
                  <span className="text-2xl font-black" style={{ fontFamily: "var(--font-display)" }}>1</span>
                </div>
                <h3 className="font-bold text-slate-900 mb-2 text-lg">Zadejte adresu</h3>
                <p className="text-sm text-slate-500 leading-relaxed">
                  Vložte URL svého e-shopu. Stačí hlavní stránka — skenujeme celou strukturu HTML.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 rounded-2xl bg-indigo-100 text-indigo-700 flex items-center justify-center mx-auto mb-5">
                  <span className="text-2xl font-black" style={{ fontFamily: "var(--font-display)" }}>2</span>
                </div>
                <h3 className="font-bold text-slate-900 mb-2 text-lg">Automatická analýza</h3>
                <p className="text-sm text-slate-500 leading-relaxed">
                  Během 5–15 sekund proběhne kontrola desítek pravidel WCAG 2.1 AA. Stejný engine jako Google Lighthouse.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 rounded-2xl bg-indigo-100 text-indigo-700 flex items-center justify-center mx-auto mb-5">
                  <span className="text-2xl font-black" style={{ fontFamily: "var(--font-display)" }}>3</span>
                </div>
                <h3 className="font-bold text-slate-900 mb-2 text-lg">Výsledky česky</h3>
                <p className="text-sm text-slate-500 leading-relaxed">
                  Dostanete skóre, seznam problémů seřazený podle závažnosti a konkrétní návody na opravu — vše v češtině.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* What we check */}
        <section id="co-kontrolujeme" className="py-16 sm:py-24">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-12 sm:mb-16">
              <h2
                className="text-2xl sm:text-3xl font-black text-slate-950 mb-3"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Co kontrolujeme na vašem e-shopu
              </h2>
              <p className="text-slate-500 max-w-lg mx-auto">
                Automatická analýza přístupnosti podle standardu WCAG 2.1 AA — stejný engine jako Google Lighthouse.
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

            <p className="text-center text-sm text-slate-500 mt-8">
              Sken probíhá v plnohodnotném prohlížeči — včetně kontroly barevného kontrastu a velikosti klikacích cílů.
            </p>
          </div>
        </section>

        {/* Practical examples */}
        <section id="priklady" className="py-16 sm:py-24 bg-white border-y border-slate-200">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-12 sm:mb-16">
              <h2
                className="text-2xl sm:text-3xl font-black text-slate-950 mb-3"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Nejčastější chyby přístupnosti e-shopů
              </h2>
              <p className="text-slate-500 max-w-xl mx-auto">
                Tyhle problémy nacházíme na většině českých e-shopů. Podívejte se, jak vypadá špatně a jak správně.
              </p>
            </div>

            <div className="space-y-8 max-w-4xl mx-auto">
              {/* Example 1: Alt texty */}
              <div className="rounded-xl border-2 border-slate-200 overflow-hidden">
                <div className="p-5 sm:p-6 bg-slate-50 border-b border-slate-200">
                  <h3 className="font-bold text-slate-900 text-lg mb-1">
                    <span className="text-indigo-700">#1</span> Produktové obrázky bez alternativního textu
                  </h3>
                  <p className="text-sm text-slate-500">
                    Zákazník se zrakovým postižením používá čtečku obrazovky. Pokud obrázek nemá alt text, čtečka přečte jen „obrázek" nebo název souboru — zákazník neví, co prodáváte.
                  </p>
                </div>
                <div className="grid sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-slate-200">
                  <div className="p-5 sm:p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-5 h-5 rounded-full bg-red-100 flex items-center justify-center">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                      </div>
                      <span className="text-sm font-bold text-red-700">Špatně</span>
                    </div>
                    <div className="code-snippet bg-red-50 border border-red-200 rounded-lg p-3 text-red-900">
                      &lt;img src=&quot;IMG_4521.jpg&quot;&gt;
                    </div>
                    <p className="text-xs text-slate-500 mt-2">Čtečka přečte: <em>&quot;obrázek, IMG 4521&quot;</em></p>
                  </div>
                  <div className="p-5 sm:p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </div>
                      <span className="text-sm font-bold text-green-700">Správně</span>
                    </div>
                    <div className="code-snippet bg-green-50 border border-green-200 rounded-lg p-3 text-green-900">
                      &lt;img src=&quot;IMG_4521.jpg&quot;<br />
                      &nbsp;&nbsp;alt=&quot;Černé běžecké boty Nike Air Max, vel. 42&quot;&gt;
                    </div>
                    <p className="text-xs text-slate-500 mt-2">Čtečka přečte: <em>&quot;Černé běžecké boty Nike Air Max, vel. 42&quot;</em></p>
                  </div>
                </div>
              </div>

              {/* Example 2: Formuláře */}
              <div className="rounded-xl border-2 border-slate-200 overflow-hidden">
                <div className="p-5 sm:p-6 bg-slate-50 border-b border-slate-200">
                  <h3 className="font-bold text-slate-900 text-lg mb-1">
                    <span className="text-indigo-700">#2</span> Formulářová pole bez popisků
                  </h3>
                  <p className="text-sm text-slate-500">
                    Vyhledávání, přihlášení, košík — všude jsou formuláře. Pokud pole nemá přiřazený label, zákazník s asistivní technologií neví, co má kam napsat.
                  </p>
                </div>
                <div className="grid sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-slate-200">
                  <div className="p-5 sm:p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-5 h-5 rounded-full bg-red-100 flex items-center justify-center">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                      </div>
                      <span className="text-sm font-bold text-red-700">Špatně</span>
                    </div>
                    <div className="code-snippet bg-red-50 border border-red-200 rounded-lg p-3 text-red-900">
                      &lt;input type=&quot;email&quot; placeholder=&quot;E-mail&quot;&gt;
                    </div>
                    <p className="text-xs text-slate-500 mt-2">Placeholder <strong>není</strong> label. Zmizí po kliknutí a čtečka ho nemusí přečíst.</p>
                  </div>
                  <div className="p-5 sm:p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </div>
                      <span className="text-sm font-bold text-green-700">Správně</span>
                    </div>
                    <div className="code-snippet bg-green-50 border border-green-200 rounded-lg p-3 text-green-900">
                      &lt;label for=&quot;email&quot;&gt;E-mail&lt;/label&gt;<br />
                      &lt;input id=&quot;email&quot; type=&quot;email&quot;&gt;
                    </div>
                    <p className="text-xs text-slate-500 mt-2">Čtečka jasně přiřadí popisek k poli. Klik na label fokusuje pole.</p>
                  </div>
                </div>
              </div>

              {/* Example 3: Nadpisy */}
              <div className="rounded-xl border-2 border-slate-200 overflow-hidden">
                <div className="p-5 sm:p-6 bg-slate-50 border-b border-slate-200">
                  <h3 className="font-bold text-slate-900 text-lg mb-1">
                    <span className="text-indigo-700">#3</span> Přeskakování úrovní nadpisů
                  </h3>
                  <p className="text-sm text-slate-500">
                    Nadpisy (h1–h6) slouží jako osnova stránky. Když přeskočíte úroveň (z h1 rovnou na h4), je to jako kapitola knihy bez podkapitol — zákazník se ztratí.
                  </p>
                </div>
                <div className="grid sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-slate-200">
                  <div className="p-5 sm:p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-5 h-5 rounded-full bg-red-100 flex items-center justify-center">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                      </div>
                      <span className="text-sm font-bold text-red-700">Špatně</span>
                    </div>
                    <div className="code-snippet bg-red-50 border border-red-200 rounded-lg p-3 text-red-900">
                      &lt;h1&gt;Náš e-shop&lt;/h1&gt;<br />
                      &lt;h4&gt;Novinky&lt;/h4&gt;&nbsp;&nbsp;
                      <span className="text-red-600">← přeskočeno h2, h3</span>
                    </div>
                    <p className="text-xs text-slate-500 mt-2">Čtečka nerozumí struktuře. Zákazník neví, co je hlavní a co vedlejší.</p>
                  </div>
                  <div className="p-5 sm:p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </div>
                      <span className="text-sm font-bold text-green-700">Správně</span>
                    </div>
                    <div className="code-snippet bg-green-50 border border-green-200 rounded-lg p-3 text-green-900">
                      &lt;h1&gt;Náš e-shop&lt;/h1&gt;<br />
                      &lt;h2&gt;Novinky&lt;/h2&gt;<br />
                      &lt;h3&gt;Tento týden&lt;/h3&gt;
                    </div>
                    <p className="text-xs text-slate-500 mt-2">Logická hierarchie. Zákazník může „listovat" nadpisy jako obsahem knihy.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center mt-10">
              <p className="text-slate-500 mb-4">Chcete vědět, kolik takových problémů má váš e-shop?</p>
              <a
                href="#"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-700 text-white font-semibold hover:bg-indigo-800 transition-colors"
              >
                Spustit kontrolu zdarma
              </a>
            </div>
          </div>
        </section>

        {/* Why section - enhanced */}
        <section id="proc" className="py-16 sm:py-24">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="max-w-3xl mx-auto">
              <h2
                className="text-2xl sm:text-3xl font-black text-slate-950 mb-4 text-center"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Proč řešit přístupnost e-shopu
              </h2>
              <p className="text-slate-500 text-center mb-10 max-w-xl mx-auto">
                Nejde jen o zákon. Přístupný e-shop lépe konvertuje, lépe se indexuje a osloví víc zákazníků.
              </p>

              <div className="space-y-6">
                <div className="flex gap-4 p-5 rounded-xl bg-white border-2 border-slate-200">
                  <div className="shrink-0 w-10 h-10 rounded-lg bg-red-100 text-red-700 flex items-center justify-center font-black text-sm">§</div>
                  <div>
                    <h3 className="font-bold text-slate-900 mb-1">Zákon 424/2023 Sb. — European Accessibility Act</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      Česká transpozice evropské směrnice EU 2019/882 (European Accessibility Act, EAA). Od <strong>28. června 2025</strong> musí provozovatelé e-shopů zajistit přístupnost webových služeb podle harmonizované normy EN 301 549. Dozor vykonává <strong>Česká obchodní inspekce (ČOI)</strong>.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 p-5 rounded-xl bg-white border-2 border-slate-200">
                  <div className="shrink-0 w-10 h-10 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center font-black text-sm">!</div>
                  <div>
                    <h3 className="font-bold text-slate-900 mb-1">Pokuta až 10 000 000 Kč</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      Za nejzávažnější porušení zákona o přístupnosti hrozí pokuta až 10 milionů korun (§25 odst. 8). I méně závažná porušení jsou sankcionována v řádu statisíců. Prevence stojí zlomek toho, co pokuta.
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
                    <h3 className="font-bold text-slate-900 mb-1">Odpovídá majitel e-shopu, ne platforma</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      Shoptet, WooCommerce nebo Upgates zajistí technický základ šablony. Ale za přístupnost vašeho obsahu — alt texty u obrázků, správná struktura nadpisů, popisky formulářů — <strong>zodpovídáte vy</strong>.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 p-5 rounded-xl bg-white border-2 border-slate-200">
                  <div className="shrink-0 w-10 h-10 rounded-lg bg-green-100 text-green-700 flex items-center justify-center font-black text-sm">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 mb-1">Lepší SEO a více zákazníků</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      Google při hodnocení stránek zohledňuje přístupnost. Alt texty pomáhají s vyhledáváním obrázků, správná struktura nadpisů usnadňuje indexaci. A v Česku žije přes <strong>1 milion lidí</strong> s nějakou formou zdravotního postižení — to jsou potenciální zákazníci.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Who is this for */}
        <section className="py-16 sm:py-24 bg-white border-y border-slate-200">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-12 sm:mb-16">
              <h2
                className="text-2xl sm:text-3xl font-black text-slate-950 mb-3"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Pro koho je test přístupnosti webu
              </h2>
              <p className="text-slate-500 max-w-xl mx-auto">
                Nezáleží na tom, na jaké platformě váš e-shop běží. Kontrolujeme HTML výstup — tedy to, co vidí zákazník i vyhledávač.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {[
                {
                  name: "Shoptet",
                  desc: "Nejpopulárnější česká e-shopová platforma. Šablona může být přístupná, ale váš obsah a úpravy je třeba zkontrolovat.",
                },
                {
                  name: "WooCommerce",
                  desc: "WordPress + WooCommerce. Přístupnost závisí na zvoleném tématu a pluginech. Častý problém: šablony třetích stran.",
                },
                {
                  name: "Upgates / Eshop‑rychle",
                  desc: "České platformy s vlastními šablonami. Kontrola odhalí problémy jak v šabloně, tak ve vašem obsahu.",
                },
                {
                  name: "Vlastní řešení",
                  desc: "E-shop na míru v Reactu, Vue, Nette nebo jiném frameworku? O to víc potřebujete nezávislou kontrolu.",
                },
                {
                  name: "Webové stránky",
                  desc: "Zákon se týká i webů služeb (banky, pojišťovny, cestovky). Kontrola funguje na jakýkoliv veřejný web.",
                },
                {
                  name: "Agentury a freelanceři",
                  desc: "Stavíte weby pro klienty? Nabídněte jim audit přístupnosti jako součást dodávky. Od června 2025 to budou potřebovat.",
                },
              ].map((item) => (
                <div key={item.name} className="p-5 rounded-xl border-2 border-slate-200 bg-slate-50">
                  <h3 className="font-bold text-slate-900 mb-2">{item.name}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="py-16 sm:py-24">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-12 sm:mb-16">
                <h2
                  className="text-2xl sm:text-3xl font-black text-slate-950 mb-3"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  Často kladené otázky
                </h2>
                <p className="text-slate-500">
                  Odpovědi na nejčastější otázky o přístupnosti e-shopů a zákonu 424/2023 Sb.
                </p>
              </div>

              <div className="space-y-4">
                {faqItems.map((item, i) => (
                  <details
                    key={i}
                    className="group rounded-xl border-2 border-slate-200 bg-white overflow-hidden"
                  >
                    <summary className="flex items-center justify-between gap-4 p-5 cursor-pointer list-none font-bold text-slate-900 hover:text-indigo-700 transition-colors [&::-webkit-details-marker]:hidden">
                      <span>{item.question}</span>
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="shrink-0 text-slate-500 group-open:rotate-180 transition-transform"
                      >
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </summary>
                    <div className="px-5 pb-5 text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-4">
                      {item.answer}
                    </div>
                  </details>
                ))}
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
              Zjistěte stav přístupnosti svého e-shopu
            </h2>
            <p className="text-indigo-200 mb-8 text-lg">
              Bezplatná kontrola přístupnosti webu podle WCAG 2.1 AA. Výsledky česky za pár sekund.
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
            <p className="text-center">
              Skenování pomocí{" "}
              <a href="https://github.com/dequelabs/axe-core" target="_blank" rel="noopener noreferrer" className="underline hover:text-slate-700">
                axe-core
              </a>{" "}
              (MPL-2.0). Automatická kontrola pokrývá cca 30–40 % WCAG 2.1 AA. Nejedná se o právní poradenství.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
