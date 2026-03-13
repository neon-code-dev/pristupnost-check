interface RuleTranslation {
  title: string;
  description: string;
  fix: string;
}

// Překlady pravidel axe-core do češtiny.
// Jazyk: srozumitelný pro majitele e-shopu, ne pro vývojáře.
// Title = co je špatně. Description = proč to vadí uživatelům. Fix = co říct vývojáři.

const translations: Record<string, RuleTranslation> = {
  // ── Obrázky ──────────────────────────────────────────────

  "image-alt": {
    title: "Obrázek nemá popisek",
    description:
      "Na stránce je obrázek, ke kterému chybí textový popis. Nevidomý uživatel se čtečkou obrazovky neví, co obrázek zobrazuje — čtečka ho buď přeskočí, nebo přečte nesrozumitelný název souboru.",
    fix: "Ke každému obrázku přidejte krátký popis toho, co zobrazuje (atribut alt). Pokud je obrázek jen dekorativní, nastavte prázdný popis.",
  },
  "image-redundant-alt": {
    title: "Popis obrázku zbytečně opakuje okolní text",
    description:
      "Obrázek má stejný popis jako text vedle něj. Čtečka obrazovky pak přečte totéž dvakrát za sebou, což je otravné.",
    fix: "Upravte popis obrázku tak, aby doplňoval to, co uživatel už vidí v textu kolem.",
  },
  "input-image-alt": {
    title: "Obrázkové tlačítko nemá popis",
    description:
      "Na stránce je tlačítko zobrazené jako obrázek, ale chybí mu textový popis. Nevidomý uživatel neví, co se stane když na tlačítko klikne.",
    fix: "Přidejte k obrázkovému tlačítku textový popis jeho funkce (atribut alt).",
  },
  "role-img-alt": {
    title: "Grafický prvek nemá popis",
    description:
      "Na stránce je grafický prvek (ikona, ilustrace), který nemá žádný textový popis pro čtečky obrazovky.",
    fix: "Přidejte textový popis ke grafickému prvku.",
  },
  "svg-img-alt": {
    title: "Vektorová grafika (SVG) nemá popis",
    description:
      "Na stránce je vektorový obrázek nebo ikona bez textového popisu. Nevidomí uživatelé nevědí, co zobrazuje.",
    fix: "Přidejte textový popis k SVG obrázku.",
  },

  // ── Formuláře ────────────────────────────────────────────

  label: {
    title: "Formulářové pole nemá popisek",
    description:
      "Na stránce je vstupní pole (textové pole, zaškrtávací políčko, rozbalovací menu…), ale není k němu přiřazený popis. Uživatel se čtečkou neví, co má do pole zadat — slyší jen 'textové pole' bez dalšího vysvětlení.",
    fix: "Ke každému formulářovému poli přidejte viditelný popisek, který říká co se má zadat.",
  },
  "select-name": {
    title: "Rozbalovací menu nemá popisek",
    description:
      "Na stránce je rozbalovací výběr (select), ale není jasné, co si uživatel vybírá. Čtečka obrazovky přečte jen seznam položek bez kontextu.",
    fix: "Přidejte viditelný popisek k rozbalovacímu menu.",
  },
  "input-button-name": {
    title: "Tlačítko nemá viditelný text",
    description:
      "Na stránce je tlačítko bez textu. Uživatel nevidí ani neslyší, co tlačítko dělá — může to být tlačítko pro odeslání objednávky, přihlášení nebo cokoliv jiného.",
    fix: "Přidejte srozumitelný text do tlačítka, např. Odeslat, Přihlásit se.",
  },
  "form-field-multiple-labels": {
    title: "Formulářové pole má víc popisků najednou",
    description:
      "K jednomu poli jsou přiřazeny dva nebo více různých popisků. Čtečka obrazovky neví, který z nich přečíst, a uživatel může být zmatený.",
    fix: "Ponechte u každého pole jen jeden popisek.",
  },
  "autocomplete-valid": {
    title: "Automatické doplňování formuláře nefunguje správně",
    description:
      "Pole formuláře má nesprávně nastavené automatické doplňování. Prohlížeč pak nemůže nabídnout uložené údaje (jméno, adresu, e-mail), a uživatel musí vše vyplňovat ručně.",
    fix: "Opravte nastavení automatického doplňování (autocomplete) u formulářových polí.",
  },
  "label-content-name-mismatch": {
    title: "Viditelný text prvku nesouhlasí s jeho přístupným názvem",
    description:
      "Prvek (tlačítko, odkaz) zobrazuje jiný text, než jaký slyší čtečka obrazovky. Uživatel hlasového ovládání řekne viditelný text, ale prohlížeč ho nerozpozná.",
    fix: "Sjednoťte viditelný text s přístupným názvem prvku.",
  },

  // ── Nadpisy ──────────────────────────────────────────────

  "heading-order": {
    title: "Přeskočená úroveň nadpisu",
    description:
      "Nadpisy na stránce nejdou popořadě — například po hlavním nadpisu (H1) následuje rovnou H3 místo H2. Pro nevidomé uživatele je to jako kniha, kde po kapitole 1 přeskočíte rovnou na podkapitolu 1.2 bez kapitoly 1.1.",
    fix: "Seřaďte nadpisy postupně: H1 → H2 → H3. Nepřeskakujte úrovně.",
  },
  "page-has-heading-one": {
    title: "Stránka nemá hlavní nadpis",
    description:
      "Stránce chybí hlavní nadpis (H1). Čtečka obrazovky ho používá jako první orientační bod — nevidomý uživatel neví, na jaké stránce se nachází.",
    fix: "Přidejte na stránku jeden hlavní nadpis (H1), který vystihuje obsah stránky.",
  },
  "empty-heading": {
    title: "Prázdný nadpis",
    description:
      "Na stránce je nadpis, který neobsahuje žádný text. Čtečka obrazovky oznámí nadpis úrovně 2, ale nepřečte nic — uživatel neví, o čem sekce je.",
    fix: "Přidejte text do nadpisu, nebo ho úplně odstraňte pokud není potřeba.",
  },
  "p-as-heading": {
    title: "Text vypadá jako nadpis, ale technicky jím není",
    description:
      "Na stránce je tučný nebo velký text, který vypadá jako nadpis, ale v kódu stránky je označený jako běžný odstavec. Čtečka obrazovky ho jako nadpis nerozpozná, takže nevidomý uživatel nemůže skákat mezi sekcemi.",
    fix: "Použijte správný nadpisový prvek (H2, H3…) místo tučného odstavce.",
  },

  // ── Nastavení stránky ────────────────────────────────────

  "html-has-lang": {
    title: "Stránka nemá nastavený jazyk",
    description:
      "Stránka neříká prohlížeči, v jakém je jazyku. Čtečka obrazovky pak může číst český text anglickým hlasem, což je nesrozumitelné.",
    fix: "V kódu stránky nastavte jazyk na češtinu (lang='cs').",
  },
  "html-lang-valid": {
    title: "Nastavení jazyka stránky je neplatné",
    description:
      "Stránka má nastavený jazyk, ale hodnota je chybná — prohlížeč ji nerozpozná. Čtečka obrazovky pak použije výchozí jazyk místo správného.",
    fix: "Opravte kód jazyka na platnou hodnotu — cs pro češtinu, sk pro slovenštinu.",
  },
  "document-title": {
    title: "Stránka nemá titulek",
    description:
      "Stránce chybí titulek — ten text, který vidíte v záložce prohlížeče. Uživatel čtečky ho slyší jako první informaci po otevření stránky. Bez titulku neví, co stránka obsahuje.",
    fix: "Přidejte výstižný titulek stránky, např. Košík — MůjObchod.cz.",
  },
  "html-xml-lang-mismatch": {
    title: "Nesoulad v nastavení jazyka stránky",
    description:
      "Stránka má dva různé údaje o jazyku, které si odporují. Čtečka neví, kterému věřit.",
    fix: "Sjednoťte oba údaje o jazyku stránky na stejnou hodnotu.",
  },
  "valid-lang": {
    title: "Neplatný kód jazyka",
    description:
      "Část stránky má přiřazený jazyk, ale jeho kód je chybný. Čtečka obrazovky přečte text špatným hlasem.",
    fix: "Opravte kód jazyka na platnou hodnotu (cs, sk, en…).",
  },

  // ── Odkazy a tlačítka ────────────────────────────────────

  "link-name": {
    title: "Odkaz nemá srozumitelný text",
    description:
      "Na stránce je odkaz, který nemá žádný text — může to být prázdný odkaz nebo odkaz obsahující jen obrázek bez popisu. Uživatel čtečky slyší odkaz, ale netuší, kam vede.",
    fix: "Přidejte srozumitelný text do odkazu. Pokud odkaz obsahuje jen obrázek, přidejte k obrázku popis.",
  },
  "button-name": {
    title: "Tlačítko nemá srozumitelný text",
    description:
      "Na stránce je tlačítko bez textu — může to být ikonové tlačítko (křížek, hamburger menu, šipka). Uživatel čtečky slyší tlačítko, ale neví, co udělá.",
    fix: "Přidejte text do tlačítka. U ikonových tlačítek přidejte skrytý textový popis.",
  },
  "link-in-text-block": {
    title: "Odkaz v textu je rozlišený jen barvou",
    description:
      "Odkaz v textu je odlišený pouze barvou písma, bez podtržení. Barvoslepí uživatelé (až 8 % mužů) odkaz v textu nerozliší.",
    fix: "Přidejte k odkazům podtržení nebo jiný vizuální odlišovač kromě barvy.",
  },

  // ── Barevný kontrast ─────────────────────────────────────

  "color-contrast": {
    title: "Nedostatečný barevný kontrast textu",
    description:
      "Text na stránce je špatně čitelný — barva písma je příliš podobná barvě pozadí. Lidé se slabým zrakem, starší uživatelé nebo kdokoli na slunci na mobilu text nepřečte.",
    fix: "Ztmavěte barvu textu nebo zesvětlete pozadí. Minimální kontrastní poměr je 4.5:1 pro běžný text. Ověřte nástrojem WebAIM Contrast Checker.",
  },
  "color-contrast-enhanced": {
    title: "Barevný kontrast textu nesplňuje vyšší standard",
    description:
      "Text sice projde základní kontrolou kontrastu, ale nesplňuje přísnější požadavky pro maximální čitelnost.",
    fix: "Zvyšte kontrastní poměr na 7:1 pro běžný text.",
  },

  // ── Velikost klikacích cílů (WCAG 2.2) ──────────────────

  "target-size": {
    title: "Klikací prvek je příliš malý",
    description:
      "Odkaz nebo tlačítko má příliš malou klikací plochu. Na mobilu se těžko trefí prstem, a lidé s třesem rukou nebo motorickým postižením mohou kliknout vedle.",
    fix: "Zvětšete klikací plochu tlačítek a odkazů na minimálně 24×24 pixelů.",
  },

  // ── Tabulky ──────────────────────────────────────────────

  "td-headers-attr": {
    title: "Tabulka nemá správně propojená záhlaví",
    description:
      "Datová tabulka nemá správně propojené buňky se záhlavím. Čtečka obrazovky pak neřekne uživateli, ke kterému sloupci hodnota patří — slyší jen čísla bez kontextu.",
    fix: "Propojte buňky tabulky se záhlavím sloupců/řádků.",
  },
  "th-has-data-cells": {
    title: "Záhlaví tabulky nemá přiřazená data",
    description:
      "V tabulce je záhlaví sloupce nebo řádku, ale nejsou k němu přiřazené žádné datové buňky. To je matoucí pro čtečky obrazovky.",
    fix: "Opravte strukturu tabulky — každé záhlaví musí odpovídat sloupcům nebo řádkům s daty.",
  },
  "scope-attr-valid": {
    title: "Nesprávné nastavení záhlaví tabulky",
    description:
      "Záhlaví tabulky má chybné nastavení směru — prohlížeč neví, jestli patří ke sloupci nebo řádku.",
    fix: "Opravte nastavení záhlaví tabulky (atribut scope).",
  },

  // ── ARIA (přístupnostní značky) ──────────────────────────

  "aria-allowed-attr": {
    title: "Nesprávně použitá přístupnostní značka",
    description:
      "Prvek na stránce má přístupnostní značku (ARIA), která k němu nepatří. Čtečka obrazovky může předat uživateli zavádějící informaci.",
    fix: "Odstraňte nesprávnou přístupnostní značku z prvku.",
  },
  "aria-hidden-body": {
    title: "Celá stránka je skrytá pro čtečky obrazovky",
    description:
      "Stránka je označená jako skrytá pro asistenční technologie. Nevidomý uživatel neuvidí vůbec nic — jako by stránka neexistovala.",
    fix: "Odstraňte označení aria-hidden z hlavního prvku stránky (body).",
  },
  "aria-required-attr": {
    title: "Přístupnostní značka je nekompletní",
    description:
      "Prvek má přístupnostní značku (ARIA roli), ale chybí jí povinné doplňující informace. Čtečka dostane neúplné údaje.",
    fix: "Doplňte chybějící povinné přístupnostní údaje k prvku.",
  },
  "aria-required-children": {
    title: "Přístupnostní prvek nemá požadovaný obsah",
    description:
      "Prvek označený speciální rolí (např. seznam) neobsahuje požadované podprvky (položky seznamu). Čtečka oznámí seznam, ale nenajde žádné položky.",
    fix: "Přidejte požadované podprvky, nebo opravte roli prvku.",
  },
  "aria-required-parent": {
    title: "Přístupnostní prvek je na špatném místě",
    description:
      "Prvek (např. položka seznamu) není umístěný uvnitř správného nadřazeného prvku (seznamu). Čtečka ho nemusí správně interpretovat.",
    fix: "Přesuňte prvek do správného nadřazeného kontejneru.",
  },
  "aria-valid-attr": {
    title: "Neexistující přístupnostní značka",
    description:
      "Prvek používá přístupnostní značku, která neexistuje — pravděpodobně překlep v kódu. Čtečka ji ignoruje.",
    fix: "Opravte název přístupnostní značky (ARIA atributu).",
  },
  "aria-valid-attr-value": {
    title: "Neplatná hodnota přístupnostní značky",
    description:
      "Přístupnostní značka má hodnotu, kterou čtečka nerozumí. Informace se k uživateli nedostane.",
    fix: "Opravte hodnotu přístupnostní značky na platnou.",
  },
  "aria-roles": {
    title: "Neplatná role prvku",
    description:
      "Prvek na stránce má přiřazenou roli, která neexistuje. Čtečka obrazovky neví, jak prvek popsat uživateli.",
    fix: "Opravte roli prvku na platnou hodnotu, nebo ji odstraňte.",
  },

  // ── Navigace a struktura stránky ─────────────────────────

  bypass: {
    title: "Chybí možnost přeskočit navigaci",
    description:
      "Na stránce chybí odkaz Přeskočit na obsah. Uživatel klávesnice musí při každém načtení stránky projít tabulátorem přes celé menu, než se dostane k obsahu. Představte si, že při každém kliknutí musíte přečíst celé menu znovu.",
    fix: "Přidejte na začátek stránky skrytý odkaz Přeskočit na hlavní obsah.",
  },
  region: {
    title: "Obsah stránky není rozčleněný do oblastí",
    description:
      "Obsah stránky není rozčleněný do oblastí (záhlaví, navigace, hlavní obsah, patička). Nevidomý uživatel nemůže rychle přeskočit na konkrétní část stránky — musí projít všechno od začátku.",
    fix: "Rozčleňte stránku do oblastí: záhlaví (header), navigace (nav), hlavní obsah (main), patička (footer).",
  },
  landmark: {
    title: "Stránka nemá navigační oblasti",
    description:
      "Stránka nepoužívá navigační oblasti (landmarky). Nevidomý uživatel nemůže rychle přeskočit na menu, obsah nebo patičku.",
    fix: "Přidejte na stránku oblasti: záhlaví, navigaci, hlavní obsah a patičku.",
  },
  "landmark-one-main": {
    title: "Stránka nemá označený hlavní obsah",
    description:
      "Stránka nemá vyznačenou oblast s hlavním obsahem. Čtečka obrazovky neumí uživatele přesměrovat rovnou na to podstatné.",
    fix: "Označte hlavní obsah stránky prvkem <main>.",
  },
  "landmark-banner-is-top-level": {
    title: "Záhlaví stránky je na špatném místě v kódu",
    description:
      "Záhlaví stránky (banner) je vnořené uvnitř jiné oblasti, místo aby bylo na nejvyšší úrovni. Čtečka ho nemusí správně najít.",
    fix: "Přesuňte záhlaví stránky na nejvyšší úroveň.",
  },
  "landmark-contentinfo-is-top-level": {
    title: "Patička stránky je na špatném místě v kódu",
    description:
      "Patička stránky je vnořená uvnitř jiné oblasti, místo aby byla na nejvyšší úrovni. Čtečka ji nemusí správně najít.",
    fix: "Přesuňte patičku stránky na nejvyšší úroveň.",
  },
  "landmark-main-is-top-level": {
    title: "Hlavní obsah je na špatném místě v kódu",
    description:
      "Oblast hlavního obsahu je vnořená uvnitř jiné oblasti. Čtečka ji nemusí správně identifikovat.",
    fix: "Přesuňte hlavní obsah na nejvyšší úroveň stránky.",
  },
  "landmark-no-duplicate-banner": {
    title: "Stránka má víc záhlaví",
    description:
      "Na stránce je víc než jedno záhlaví (banner). Čtečka neví, které je to hlavní.",
    fix: "Ponechte na stránce jen jedno záhlaví.",
  },
  "landmark-no-duplicate-contentinfo": {
    title: "Stránka má víc patiček",
    description:
      "Na stránce je víc než jedna patička. Čtečka neví, která je ta hlavní.",
    fix: "Ponechte na stránce jen jednu patičku.",
  },
  "landmark-no-duplicate-main": {
    title: "Stránka má víc oblastí hlavního obsahu",
    description:
      "Na stránce je víc než jedna oblast hlavního obsahu. Čtečka neví, kde začíná to podstatné.",
    fix: "Ponechte na stránce jen jednu oblast hlavního obsahu.",
  },
  "landmark-unique": {
    title: "Oblasti stránky nejsou rozlišené",
    description:
      "Stránka má víc oblastí stejného typu (např. dvě navigace), ale nejsou pojmenované. Čtečka řekne navigace dvakrát a uživatel neví, která je hlavní a která vedlejší.",
    fix: "Pojmenujte duplicitní oblasti — např. Hlavní navigace a Navigace v patičce.",
  },

  // ── Seznamy ──────────────────────────────────────────────

  "definition-list": {
    title: "Nesprávná struktura výkladového seznamu",
    description:
      "Výkladový seznam (termín + vysvětlení) obsahuje prvky, které tam nepatří. Čtečka obrazovky špatně rozpozná, co je termín a co vysvětlení.",
    fix: "Opravte strukturu výkladového seznamu v kódu stránky.",
  },
  dlitem: {
    title: "Termín nebo vysvětlení je mimo seznam",
    description:
      "Termín nebo jeho vysvětlení jsou umístěné mimo výkladový seznam. Čtečka je neinterpretuje jako součást seznamu.",
    fix: "Přesuňte termín a vysvětlení dovnitř výkladového seznamu.",
  },
  list: {
    title: "Nesprávná struktura seznamu",
    description:
      "Seznam obsahuje prvky, které tam nepatří. Čtečka obrazovky oznámí počet položek seznamu špatně.",
    fix: "Opravte strukturu seznamu — smí obsahovat pouze položky seznamu.",
  },
  listitem: {
    title: "Položka seznamu je mimo seznam",
    description:
      "Na stránce je položka seznamu, která není uvnitř seznamu. Čtečka ji neoznačí jako součást seznamu.",
    fix: "Přesuňte položku dovnitř seznamu.",
  },

  // ── Multimédia ───────────────────────────────────────────

  "video-caption": {
    title: "Video nemá titulky",
    description:
      "Video na stránce nemá titulky. Neslyšící uživatelé a lidé v hlučném prostředí se nedozvědí, co se ve videu říká.",
    fix: "Přidejte k videu titulky (české, případně i české znakové).",
  },
  "audio-caption": {
    title: "Zvukový záznam nemá textový přepis",
    description:
      "Zvukový záznam nemá textovou verzi. Neslyšící uživatelé se nedozvědí jeho obsah.",
    fix: "Přidejte textový přepis zvukového záznamu.",
  },
  "no-autoplay-audio": {
    title: "Zvuk se přehrává automaticky",
    description:
      "Na stránce se automaticky přehrává zvuk. Uživatel čtečky obrazovky neslyší čtečku přes automaticky hrající zvuk a nemůže stránku ovládat.",
    fix: "Vypněte automatické přehrávání, nebo přidejte tlačítko pro zastavení/ztlumení.",
  },

  // ── Barevný kontrast a vizuální stránka ──────────────────

  "meta-viewport": {
    title: "Stránka zakazuje zvětšení (zoom)",
    description:
      "Stránka nedovoluje uživatelům přiblížit obsah. Lidé se slabým zrakem si nemohou text zvětšit a na stránce nic nepřečtou.",
    fix: "Povolte zvětšování stránky — odstraňte omezení zoomu z nastavení viewportu.",
  },
  "meta-refresh": {
    title: "Stránka se sama přesměrovává nebo obnovuje",
    description:
      "Stránka se automaticky obnovuje nebo přesměrovává. Uživatel čtečky nestihne přečíst obsah, než se stránka změní.",
    fix: "Zrušte automatické obnovování stránky.",
  },
  "css-orientation-lock": {
    title: "Stránka vyžaduje konkrétní orientaci obrazovky",
    description:
      "Stránka funguje jen na výšku nebo jen na šířku. Uživatel na vozíku může mít tablet připevněný napevno a nemůže ho otočit.",
    fix: "Zajistěte, aby stránka fungovala v obou orientacích (na výšku i na šířku).",
  },

  // ── Klávesnice a fokus ───────────────────────────────────

  tabindex: {
    title: "Nesprávné pořadí procházení klávesnicí",
    description:
      "Prvek na stránce mění přirozené pořadí, ve kterém se uživatel pohybuje klávesou Tab. Kurzor pak skáče na neočekávaná místa.",
    fix: "Odstraňte vlastní pořadí procházení (tabindex s kladným číslem).",
  },
  "focus-order-semantics": {
    title: "Neinteraktivní prvek přijímá fokus klávesnice",
    description:
      "Prvek, na který se dá přejít tabulátorem, nepůsobí jako tlačítko ani odkaz. Uživatel na něj přejde, ale neví co s ním dělat.",
    fix: "Buď prvek označte jako interaktivní (tlačítko/odkaz), nebo mu odeberte možnost fokusu.",
  },
  "nested-interactive": {
    title: "Klikací prvek je uvnitř jiného klikacího prvku",
    description:
      "Na stránce je odkaz uvnitř tlačítka (nebo naopak). Uživatel klávesnice neví, co se stane po kliknutí — aktivuje se vnější nebo vnitřní prvek?",
    fix: "Oddělte vnořené klikací prvky — odkaz nesmí být uvnitř tlačítka.",
  },
  "scrollable-region-focusable": {
    title: "Posuvná oblast nejde ovládat klávesnicí",
    description:
      "Na stránce je oblast s posuvníkem (scrollbar), ke které se nedá dostat klávesnicí. Uživatel bez myši se k obsahu uvnitř nedostane.",
    fix: "Nastavte posuvnou oblast tak, aby byla dostupná přes klávesnici.",
  },

  // ── Duplicitní prvky ─────────────────────────────────────

  "duplicate-id": {
    title: "Duplicitní identifikátor na stránce",
    description:
      "Dva nebo více prvků na stránce mají stejný identifikátor (ID). Prohlížeč pak může přiřadit popisek nebo přístupnostní značku k nesprávnému prvku.",
    fix: "Opravte identifikátory tak, aby byl každý unikátní.",
  },
  "duplicate-id-active": {
    title: "Duplicitní identifikátor na klikacím prvku",
    description:
      "Dvě tlačítka, odkazy nebo formulářová pole mají stejný identifikátor. Čtečka obrazovky může přiřadit popis jednoho prvku k druhému.",
    fix: "Opravte identifikátory klikacích prvků tak, aby byly unikátní.",
  },
  "duplicate-id-aria": {
    title: "Duplicitní identifikátor v přístupnostní značce",
    description:
      "Přístupnostní značka odkazuje na identifikátor, který mají dva různé prvky. Čtečka přečte text ze špatného prvku.",
    fix: "Opravte duplicitní identifikátory.",
  },

  // ── Vložený obsah (iframe, embed) ────────────────────────

  "frame-title": {
    title: "Vložený obsah (iframe) nemá popis",
    description:
      "Na stránce je vložený obsah (mapa, video, chatovací okno…), ale nemá popis. Nevidomý uživatel neví, co se v rámečku zobrazuje.",
    fix: "Přidejte popis k vloženému obsahu (atribut title na iframe).",
  },
  "frame-focusable-content": {
    title: "Interaktivní vložený obsah nemá popis",
    description:
      "Vložený obsah (iframe) obsahuje klikací prvky, ale nemá popis. Uživatel čtečky neví, s čím interaguje.",
    fix: "Přidejte popis k vloženému obsahu.",
  },
  "frame-title-unique": {
    title: "Vložené obsahy mají stejný popis",
    description:
      "Na stránce je víc vložených obsahů (iframe) se stejným popisem. Uživatel je od sebe nerozliší.",
    fix: "Dejte každému vloženému obsahu jedinečný popis.",
  },

  // ── Obrázková mapa a objekty ─────────────────────────────

  "object-alt": {
    title: "Vložený objekt nemá popis",
    description:
      "Na stránce je vložený objekt (Flash, PDF, apod.) bez textového popisu. Nevidomý uživatel neví, co obsahuje.",
    fix: "Přidejte textový popis k vloženému objektu.",
  },
  "area-alt": {
    title: "Klikací oblast v obrázkové mapě nemá popis",
    description:
      "Obrázková mapa má klikací oblast bez popisu. Uživatel čtečky neví, kam odkaz vede.",
    fix: "Přidejte popis ke klikací oblasti.",
  },
};

/**
 * Vrátí český překlad pravidla axe-core.
 * Pokud překlad neexistuje, vrátí generický český fallback (nikdy angličtinu).
 */
export function getCzechTranslation(
  ruleId: string,
  fallbackTitle?: string,
  fallbackDescription?: string
): RuleTranslation {
  if (translations[ruleId]) {
    return translations[ruleId];
  }

  // Generický český fallback — nikdy nezobrazovat angličtinu
  return {
    title: humanizeRuleId(ruleId),
    description:
      fallbackDescription
        ? `Toto pravidlo přístupnosti nebylo splněno. Podrobnosti v anglické dokumentaci níže.`
        : "Automatická kontrola odhalila problém s přístupností na tomto prvku stránky.",
    fix: "Předejte tuto informaci svému webovému vývojáři — v odkazu níže najde technické detaily a návod na opravu.",
  };
}

/** Převede rule ID na čitelný český název, např. "color-contrast" → "Pravidlo: Color contrast" */
function humanizeRuleId(ruleId: string): string {
  const name = ruleId
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
  return `Problém přístupnosti: ${name}`;
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
