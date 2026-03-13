interface RuleTranslation {
  title: string;
  description: string;
  fix: string;
}

const translations: Record<string, RuleTranslation> = {
  // Images
  "image-alt": {
    title: "Obrázek nemá alternativní text (alt)",
    description:
      "Každý obrázek musí mít atribut alt, který popisuje jeho obsah. Bez něj čtečky obrazovky obrázek přeskočí nebo přečtou název souboru.",
    fix: "Přidejte atribut alt s popisem obsahu obrázku. U dekorativních obrázků použijte prázdný alt=\"\".",
  },
  "image-redundant-alt": {
    title: "Alt text obrázku opakuje okolní text",
    description:
      "Alt text obrázku by neměl opakovat text, který je už viditelný v okolí obrázku.",
    fix: "Upravte alt text tak, aby doplňoval okolní kontext, ne ho opakoval.",
  },
  "input-image-alt": {
    title: "Obrázkové tlačítko nemá alternativní text",
    description:
      "Obrázkové vstupy (input type=\"image\") musí mít atribut alt popisující akci tlačítka.",
    fix: "Přidejte atribut alt popisující, co tlačítko dělá.",
  },
  "role-img-alt": {
    title: "Element s rolí obrázku nemá alt text",
    description:
      "Elementy s role=\"img\" musí mít přístupný název pomocí alt, aria-label nebo aria-labelledby.",
    fix: "Přidejte aria-label nebo aria-labelledby k elementu s role=\"img\".",
  },
  "svg-img-alt": {
    title: "SVG obrázek nemá přístupný název",
    description:
      "SVG elementy s role=\"img\" musí mít přístupný název.",
    fix: "Přidejte element <title> dovnitř SVG nebo aria-label na SVG element.",
  },

  // Forms
  label: {
    title: "Formulářové pole nemá popisek (label)",
    description:
      "Každé vstupní pole musí mít přiřazený label. Bez něj uživatel se čtečkou neví, co má do pole zadat.",
    fix: "Přidejte element <label for=\"id-pole\"> nebo atribut aria-label k formulářovému poli.",
  },
  "select-name": {
    title: "Výběrové pole (select) nemá popisek",
    description:
      "Výběrové pole musí mít přiřazený label, aby bylo jasné co uživatel vybírá.",
    fix: "Přidejte <label> element přiřazený k select poli.",
  },
  "input-button-name": {
    title: "Vstupní tlačítko nemá přístupný text",
    description:
      "Tlačítka typu submit/reset/button musí mít viditelný text nebo value.",
    fix: "Přidejte atribut value s popisem akce tlačítka.",
  },

  // Headings
  "heading-order": {
    title: "Přeskočená úroveň nadpisu",
    description:
      "Nadpisy musí jít postupně (h1 → h2 → h3). Přeskočení úrovně ztěžuje navigaci čtečkou obrazovky.",
    fix: "Opravte hierarchii nadpisů — nepoužívejte h3 po h1 bez h2 mezi nimi.",
  },
  "page-has-heading-one": {
    title: "Stránka nemá nadpis h1",
    description:
      "Každá stránka by měla mít právě jeden nadpis h1, který popisuje hlavní obsah stránky.",
    fix: "Přidejte na stránku jeden hlavní nadpis <h1>.",
  },
  "empty-heading": {
    title: "Prázdný nadpis",
    description:
      "Nadpis bez textu je pro čtečky matoucí — čtečka oznámí úroveň nadpisu, ale nepřečte žádný obsah.",
    fix: "Přidejte text do nadpisu, nebo ho odstraňte pokud není potřeba.",
  },

  // Document
  "html-has-lang": {
    title: "Stránka nemá nastavený jazyk",
    description:
      "Element <html> musí mít atribut lang (např. lang=\"cs\"). Bez něj čtečka neví jakým jazykem číst.",
    fix: "Přidejte lang=\"cs\" na element <html>.",
  },
  "html-lang-valid": {
    title: "Neplatná hodnota atributu lang",
    description: "Atribut lang musí obsahovat platný kód jazyka.",
    fix: "Použijte platný kód jazyka, např. \"cs\" pro češtinu, \"sk\" pro slovenštinu.",
  },
  "document-title": {
    title: "Stránka nemá titulek (title)",
    description:
      "Každá stránka musí mít element <title>. Titulek se zobrazuje v záložce prohlížeče a čtečky ho čtou jako první.",
    fix: "Přidejte <title> element do <head> stránky s výstižným popisem obsahu.",
  },
  "html-xml-lang-mismatch": {
    title: "Nesoulad atributů lang a xml:lang",
    description:
      "Pokud element html má oba atributy lang a xml:lang, musí mít stejnou hodnotu.",
    fix: "Sjednoťte hodnoty atributů lang a xml:lang.",
  },
  "valid-lang": {
    title: "Neplatný kód jazyka na elementu",
    description: "Atribut lang na elementu obsahuje neplatný kód jazyka.",
    fix: "Opravte kód jazyka na platnou hodnotu (např. cs, sk, en).",
  },

  // Links & Buttons
  "link-name": {
    title: "Odkaz nemá přístupný text",
    description:
      "Odkaz musí mít viditelný text nebo aria-label, aby uživatel věděl kam ho odkaz zavede.",
    fix: "Přidejte text do odkazu, nebo použijte aria-label pokud odkaz obsahuje jen obrázek.",
  },
  "button-name": {
    title: "Tlačítko nemá přístupný text",
    description:
      "Tlačítko musí mít viditelný text nebo aria-label, aby uživatel věděl co tlačítko dělá.",
    fix: "Přidejte text do tlačítka, nebo přidejte aria-label.",
  },
  "link-in-text-block": {
    title: "Odkaz v textu nelze vizuálně rozlišit",
    description:
      "Odkazy v textu musí být rozlišitelné nejen barvou (např. podtržením).",
    fix: "Přidejte podtržení nebo jiný vizuální indikátor odkazů mimo barvy.",
  },

  // Tables
  "td-headers-attr": {
    title: "Buňka tabulky nemá správné záhlaví",
    description:
      "Atribut headers v buňce tabulky musí odkazovat na existující záhlaví.",
    fix: "Opravte atribut headers tak, aby odpovídal ID záhlaví tabulky.",
  },
  "th-has-data-cells": {
    title: "Záhlaví tabulky nemá přiřazené datové buňky",
    description:
      "Každé záhlaví tabulky (th) musí být spojeno s datovými buňkami.",
    fix: "Zajistěte, aby záhlaví odpovídalo sloupcům nebo řádkům s daty.",
  },
  "scope-attr-valid": {
    title: "Neplatný atribut scope v záhlaví tabulky",
    description:
      "Atribut scope musí mít hodnotu row, col, rowgroup nebo colgroup.",
    fix: "Opravte hodnotu atributu scope na jednu z povolených.",
  },

  // ARIA
  "aria-allowed-attr": {
    title: "Nepovolený ARIA atribut",
    description: "Element používá ARIA atribut, který není povolený pro jeho roli.",
    fix: "Odstraňte nepovolený ARIA atribut nebo změňte roli elementu.",
  },
  "aria-hidden-body": {
    title: "Element body má aria-hidden=\"true\"",
    description:
      "Pokud má body aria-hidden=\"true\", celá stránka je skrytá pro asistenční technologie.",
    fix: "Odstraňte aria-hidden=\"true\" z elementu body.",
  },
  "aria-required-attr": {
    title: "Chybějící povinný ARIA atribut",
    description:
      "Element s ARIA rolí nemá všechny povinné atributy pro danou roli.",
    fix: "Přidejte chybějící povinné ARIA atributy.",
  },
  "aria-required-children": {
    title: "ARIA element nemá povinné potomky",
    description:
      "Některé ARIA role vyžadují specifické potomky (např. list vyžaduje listitem).",
    fix: "Přidejte požadované potomky, nebo opravte ARIA roli.",
  },
  "aria-required-parent": {
    title: "ARIA element nemá povinného rodiče",
    description:
      "Některé ARIA role musí být uvnitř specifického rodičovského elementu.",
    fix: "Umístěte element do správného rodičovského kontejneru.",
  },
  "aria-valid-attr": {
    title: "Neplatný ARIA atribut",
    description: "Element používá ARIA atribut, který neexistuje.",
    fix: "Odstraňte neplatný ARIA atribut nebo ho opravte na správný název.",
  },
  "aria-valid-attr-value": {
    title: "Neplatná hodnota ARIA atributu",
    description: "ARIA atribut má hodnotu, která není povolená.",
    fix: "Opravte hodnotu ARIA atributu na jednu z povolených.",
  },
  "aria-roles": {
    title: "Neplatná ARIA role",
    description: "Element má ARIA roli, která neexistuje.",
    fix: "Opravte roli na platnou hodnotu nebo ji odstraňte.",
  },

  // Navigation & Structure
  bypass: {
    title: "Chybí možnost přeskočit navigaci",
    description:
      "Stránka musí mít odkaz \"Přeskočit na obsah\" nebo landmark oblasti, aby uživatel klávesnice mohl přeskočit opakující se navigaci.",
    fix: "Přidejte odkaz \"Přeskočit na hlavní obsah\" na začátek stránky, nebo použijte HTML5 landmark elementy (main, nav, header).",
  },
  region: {
    title: "Obsah mimo landmark oblast",
    description:
      "Veškerý obsah stránky by měl být uvnitř landmark oblastí (header, nav, main, footer).",
    fix: "Obalte obsah do odpovídajících landmark elementů (<main>, <nav>, <header>, <footer>).",
  },
  landmark: {
    title: "Stránka nemá landmark oblasti",
    description:
      "Stránka by měla používat landmark elementy pro snadnou navigaci čtečkou.",
    fix: "Přidejte landmark elementy: <header>, <nav>, <main>, <footer>.",
  },
  "landmark-one-main": {
    title: "Stránka nemá element <main>",
    description:
      "Každá stránka musí mít právě jeden element <main>, který označuje hlavní obsah.",
    fix: "Přidejte element <main> kolem hlavního obsahu stránky.",
  },

  // Lists
  "definition-list": {
    title: "Nesprávná struktura definiční seznamu",
    description: "Element <dl> smí obsahovat pouze <dt> a <dd> elementy.",
    fix: "Opravte strukturu definiční seznamu — uvnitř <dl> mohou být jen <dt> a <dd>.",
  },
  dlitem: {
    title: "Element <dt>/<dd> není uvnitř <dl>",
    description: "Elementy <dt> a <dd> musí být uvnitř <dl>.",
    fix: "Umístěte <dt>/<dd> dovnitř elementu <dl>.",
  },
  list: {
    title: "Nesprávná struktura seznamu",
    description: "Elementy <ul> a <ol> smí obsahovat pouze <li>, <script> nebo <template>.",
    fix: "Opravte strukturu seznamu — uvnitř <ul>/<ol> mohou být jen <li> elementy.",
  },
  listitem: {
    title: "Element <li> není uvnitř seznamu",
    description: "Element <li> musí být uvnitř <ul>, <ol> nebo <menu>.",
    fix: "Umístěte <li> dovnitř <ul>, <ol> nebo <menu>.",
  },

  // Multimedia
  "video-caption": {
    title: "Video nemá titulky",
    description: "Videa musí mít titulky pro neslyšící uživatele.",
    fix: "Přidejte titulky (captions) k videu pomocí elementu <track>.",
  },
  "audio-caption": {
    title: "Audio nemá textový přepis",
    description:
      "Audio obsah musí mít textový přepis nebo titulky.",
    fix: "Přidejte textový přepis audio obsahu.",
  },

  // Color contrast
  "color-contrast": {
    title: "Nedostatečný barevný kontrast textu",
    description:
      "Barva textu nemá dostatečný kontrast vůči pozadí. Uživatelé se slabým zrakem text špatně přečtou. WCAG 2.1 AA vyžaduje poměr minimálně 4.5:1 pro běžný text a 3:1 pro velký text.",
    fix: "Zvyšte kontrast — buď ztmavěte text, nebo zesvětlete pozadí. Použijte nástroj jako WebAIM Contrast Checker.",
  },
  "color-contrast-enhanced": {
    title: "Barevný kontrast nesplňuje vyšší úroveň AAA",
    description:
      "Text nesplňuje přísnější požadavky WCAG AAA na kontrastní poměr (7:1 pro běžný text).",
    fix: "Zvyšte kontrast na poměr minimálně 7:1 pro běžný text.",
  },

  // Target size (WCAG 2.2)
  "target-size": {
    title: "Klikací cíl je příliš malý",
    description:
      "Interaktivní prvek (odkaz, tlačítko) má menší klikací plochu než 24×24 pixelů. Uživatelé s motorickým postižením nebo na mobilech ho těžko trefí.",
    fix: "Zvětšete klikací plochu na minimálně 24×24 px pomocí paddingu nebo min-width/min-height.",
  },

  // Focus
  "focus-order-semantics": {
    title: "Element v pořadí fokusu nemá interaktivní roli",
    description:
      "Element, který přijímá fokus klávesnicí, by měl mít interaktivní roli (odkaz, tlačítko apod.).",
    fix: "Přidejte odpovídající roli, nebo odstraňte tabindex pokud element nemá být interaktivní.",
  },

  // Autocomplete
  "autocomplete-valid": {
    title: "Neplatná hodnota atributu autocomplete",
    description:
      "Atribut autocomplete musí mít správnou hodnotu odpovídající typu pole (např. name, email, tel).",
    fix: "Opravte hodnotu autocomplete na platnou — např. autocomplete=\"email\" pro emailové pole.",
  },

  // Duplicate ID
  "duplicate-id-aria": {
    title: "Duplicitní ID odkazované z ARIA",
    description:
      "Více elementů má stejné ID, na které odkazuje ARIA atribut (aria-labelledby, aria-describedby). Čtečka pak přečte špatný text.",
    fix: "Opravte duplicitní ID tak, aby bylo unikátní.",
  },

  // Nested interactive
  "nested-interactive": {
    title: "Vnořené interaktivní prvky",
    description:
      "Interaktivní prvek (tlačítko, odkaz) je uvnitř jiného interaktivního prvku. To je matoucí pro klávesnici i čtečky.",
    fix: "Oddělte vnořené prvky — odkaz nesmí být uvnitř tlačítka a naopak.",
  },

  // Scrollable region
  "scrollable-region-focusable": {
    title: "Scrollovatelná oblast není přístupná klávesnicí",
    description:
      "Oblast s posuvníkem musí být ovladatelná klávesnicí, jinak se uživatel bez myši k obsahu nedostane.",
    fix: "Přidejte tabindex=\"0\" a role=\"region\" s aria-label na scrollovatelný kontejner.",
  },

  // Landmarks
  "landmark-banner-is-top-level": {
    title: "Banner (header) není na nejvyšší úrovni",
    description: "Element s rolí banner musí být přímý potomek body, ne vnořený v jiném landmarku.",
    fix: "Přesuňte <header> na nejvyšší úroveň stránky.",
  },
  "landmark-contentinfo-is-top-level": {
    title: "Contentinfo (footer) není na nejvyšší úrovni",
    description: "Element s rolí contentinfo musí být přímý potomek body.",
    fix: "Přesuňte <footer> na nejvyšší úroveň stránky.",
  },
  "landmark-main-is-top-level": {
    title: "Main není na nejvyšší úrovni",
    description: "Element <main> musí být přímý potomek body, ne vnořený v jiném landmarku.",
    fix: "Přesuňte <main> na nejvyšší úroveň stránky.",
  },
  "landmark-no-duplicate-banner": {
    title: "Stránka má více bannerů (header)",
    description: "Na stránce by měl být jen jeden element s rolí banner.",
    fix: "Ponechte jen jeden <header> s rolí banner.",
  },
  "landmark-no-duplicate-contentinfo": {
    title: "Stránka má více patičkových oblastí",
    description: "Na stránce by měl být jen jeden element s rolí contentinfo.",
    fix: "Ponechte jen jeden <footer> s rolí contentinfo.",
  },
  "landmark-no-duplicate-main": {
    title: "Stránka má více elementů <main>",
    description: "Na stránce musí být jen jeden element <main>.",
    fix: "Ponechte jen jeden <main> element.",
  },
  "landmark-unique": {
    title: "Landmark oblasti nejsou unikátní",
    description:
      "Pokud stránka má více landmarků stejného typu (např. dva <nav>), musí mít unikátní aria-label.",
    fix: "Přidejte aria-label k duplicitním landmarkům, např. aria-label=\"Hlavní navigace\".",
  },

  // Forms additional
  "form-field-multiple-labels": {
    title: "Formulářové pole má více popisků",
    description: "Pole má přiřazeno více <label> elementů, což je matoucí pro čtečky.",
    fix: "Ponechte jen jeden <label> pro každé pole.",
  },
  "label-content-name-mismatch": {
    title: "Viditelný text nesouhlasí s přístupným názvem",
    description:
      "Text viditelný na obrazovce se liší od přístupného názvu (aria-label). Uživatelé hlasového ovládání pak prvek nenajdou.",
    fix: "Sjednoťte aria-label s viditelným textem, nebo aria-label úplně odstraňte.",
  },

  // Objects & Embeds
  "object-alt": {
    title: "Element <object> nemá alternativní text",
    description: "Vložený objekt musí mít přístupný název pro čtečky obrazovky.",
    fix: "Přidejte aria-label nebo textový obsah dovnitř <object> elementu.",
  },
  "area-alt": {
    title: "Element <area> v image map nemá alt text",
    description: "Klikací oblasti v obrázkové mapě musí mít atribut alt.",
    fix: "Přidejte atribut alt popisující, kam odkaz vede.",
  },

  // Iframe
  "frame-focusable-content": {
    title: "Iframe s focusovatelným obsahem nemá přístupný název",
    description: "Iframe, který obsahuje interaktivní prvky, musí mít atribut title.",
    fix: "Přidejte atribut title na element <iframe>.",
  },
  "frame-title-unique": {
    title: "Iframe nemá unikátní titulek",
    description: "Pokud stránka obsahuje více iframe, každý musí mít odlišný title.",
    fix: "Upravte titulky iframe tak, aby se navzájem lišily.",
  },

  // Orientation & responsivity
  "css-orientation-lock": {
    title: "Obsah je uzamčen na jednu orientaci",
    description:
      "Stránka nesmí vynutit orientaci displeje (portrait/landscape). Uživatel na vozíku může mít tablet připevněný na pevno.",
    fix: "Odstraňte CSS pravidla, která vynucují orientaci přes @media (orientation).",
  },

  // Autoplay
  "no-autoplay-audio": {
    title: "Audio se přehrává automaticky",
    description:
      "Automaticky přehrávané audio delší než 3 sekundy musí jít pozastavit nebo ztlumit.",
    fix: "Přidejte ovládací prvky pro pozastavení/ztlumení, nebo odstraňte autoplay.",
  },

  // Typography & semantic
  "p-as-heading": {
    title: "Tučný odstavec použitý místo nadpisu",
    description:
      "Text vypadá jako nadpis (velký/tučný), ale je označený jako odstavec <p>. Čtečky ho nerozpoznají jako nadpis.",
    fix: "Použijte správný nadpisový element (<h2>, <h3>...) místo tučného odstavce.",
  },

  // Other common
  "meta-viewport": {
    title: "Meta viewport zakazuje zvětšení stránky",
    description:
      "Uživatelé musí mít možnost stránku přiblížit (zoom). Atribut maximum-scale nebo user-scalable=no jim to brání.",
    fix: "Odstraňte maximum-scale a user-scalable=no z meta viewport tagu.",
  },
  "meta-refresh": {
    title: "Stránka se automaticky přesměrovává nebo obnovuje",
    description:
      "Meta refresh je problematický pro uživatele se čtečkami — stránka se jim změní pod rukama.",
    fix: "Odstraňte meta refresh a použijte serverové přesměrování (HTTP 301/302).",
  },
  tabindex: {
    title: "Prvek má tabindex větší než 0",
    description:
      "Tabindex s hodnotou vyšší než 0 mění přirozené pořadí navigace klávesnicí a je matoucí.",
    fix: "Použijte tabindex=\"0\" nebo tabindex=\"-1\" místo kladných hodnot.",
  },
  "duplicate-id": {
    title: "Duplicitní ID na stránce",
    description:
      "Atribut id musí být na stránce unikátní. Duplicitní ID způsobuje problémy s label přiřazením a ARIA referencemi.",
    fix: "Přejmenujte duplicitní ID tak, aby každé bylo unikátní.",
  },
  "duplicate-id-active": {
    title: "Duplicitní ID na aktivním prvku",
    description:
      "Aktivní prvky (tlačítka, odkazy, formulářová pole) s duplicitním ID způsobují chyby asistenčních technologií.",
    fix: "Opravte ID aktivních prvků tak, aby byla unikátní.",
  },
  "frame-title": {
    title: "Iframe nemá titulek",
    description:
      "Každý iframe musí mít atribut title popisující jeho obsah.",
    fix: "Přidejte atribut title na element <iframe>.",
  },
};

export function getCzechTranslation(ruleId: string): RuleTranslation | null {
  return translations[ruleId] || null;
}

export function getImpactLabel(impact: string): string {
  switch (impact) {
    case "critical":
      return "Kritický";
    case "serious":
      return "Závažný";
    case "moderate":
      return "Střední";
    case "minor":
      return "Drobný";
    default:
      return impact;
  }
}

export function getImpactColor(impact: string): string {
  switch (impact) {
    case "critical":
      return "text-red-700 bg-red-50 border-red-200";
    case "serious":
      return "text-orange-700 bg-orange-50 border-orange-200";
    case "moderate":
      return "text-yellow-700 bg-yellow-50 border-yellow-200";
    case "minor":
      return "text-blue-700 bg-blue-50 border-blue-200";
    default:
      return "text-gray-700 bg-gray-50 border-gray-200";
  }
}
