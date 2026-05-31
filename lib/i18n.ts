export type Locale = "en" | "de";

export const locales: Locale[] = ["en", "de"];

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export function assertLocale(value: string): Locale {
  if (!isLocale(value)) {
    return "en";
  }
  return value;
}

export const nav = {
  en: [
    { href: "/en", label: "Home" },
    { href: "/en/hmmwv-humvee-nla-parts", label: "HMMWV / Humvee" },
    { href: "/en/willys-jeep-parts", label: "Willys Jeep" },
    { href: "/en/mercedes-puch-g-w460-nla-parts", label: "Mercedes / Puch G" },
    { href: "/en/rfq", label: "RFQ" },
  ],
  de: [
    { href: "/de", label: "Start" },
    { href: "/de/hmmwv-humvee-nla-parts", label: "HMMWV / Humvee" },
    { href: "/de/willys-jeep-parts", label: "Willys Jeep" },
    { href: "/de/mercedes-puch-g-w460-nla-parts", label: "Mercedes / Puch G" },
    { href: "/de/rfq", label: "Anfrage" },
  ],
} satisfies Record<Locale, { href: string; label: string }[]>;

export const dictionary = {
  en: {
    languageName: "English",
    alternate: "Deutsch",
    alternatePath: "/de",
    rfqCta: "Request quote",
    admin: "Admin",
    trust: "Germany-based sourcing desk for professional buyers",
    heroTitle: "Hard-to-find offroad and military vehicle parts, sourced in Europe.",
    heroLead:
      "We help workshops, fleet operators, restorers, and government contractors locate NLA and obsolete components for HMMWV / Humvee, Willys Jeep, and Mercedes / Puch G W460 platforms.",
    heroBullets: ["B2B RFQ workflow", "EU supplier network", "Export-minded documentation", "No database in v1"],
    vehicleIntro: "Vehicle platforms",
    processTitle: "RFQ process built for B2B purchasing",
    process: [
      "Send part details, OE number, quantity, and target price.",
      "We validate fitment clues and search European surplus, OEM, and specialist channels.",
      "You receive a commercial quotation with availability, lead time, and status tracking.",
    ],
  },
  de: {
    languageName: "Deutsch",
    alternate: "English",
    alternatePath: "/en",
    rfqCta: "Anfrage senden",
    admin: "Admin",
    trust: "Sourcing-Desk aus Deutschland für professionelle Einkäufer",
    heroTitle: "Schwer zu findende Offroad- und Militärfahrzeugteile aus Europa.",
    heroLead:
      "Wir unterstützen Werkstätten, Flottenbetreiber, Restaurierer und Behördenlieferanten bei NLA- und Obsolete-Teilen für HMMWV / Humvee, Willys Jeep und Mercedes / Puch G W460.",
    heroBullets: ["B2B-Anfrageprozess", "EU-Lieferantennetzwerk", "Exportfähige Dokumentation", "Keine Datenbank in v1"],
    vehicleIntro: "Fahrzeugplattformen",
    processTitle: "RFQ-Prozess für den B2B-Einkauf",
    process: [
      "Senden Sie Teileangaben, OE-Nummer, Menge und Zielpreis.",
      "Wir prüfen Hinweise zur Passgenauigkeit und suchen in europäischen Surplus-, OEM- und Spezialkanälen.",
      "Sie erhalten ein Angebot mit Verfügbarkeit, Lieferzeit und Statusverfolgung.",
    ],
  },
} satisfies Record<Locale, Record<string, string | string[]>>;

export const pageCopy = {
  hmmwv: {
    en: {
      title: "HMMWV / Humvee NLA Parts",
      description:
        "B2B sourcing for hard-to-find HMMWV and Humvee NLA parts, surplus components, driveline, suspension, body, and electrical items.",
      h1: "HMMWV / Humvee NLA parts sourcing",
      lead:
        "From obsolete military vehicle components to commercial Humvee service parts, we run targeted RFQs across European specialist suppliers.",
      items: ["Driveline and axle components", "Suspension and steering parts", "Electrical and lighting items", "Body hardware and brackets"],
    },
    de: {
      title: "HMMWV / Humvee NLA-Teile",
      description:
        "B2B-Sourcing für schwer erhältliche HMMWV- und Humvee-NLA-Teile, Surplus-Komponenten, Antrieb, Fahrwerk, Karosserie und Elektrik.",
      h1: "HMMWV / Humvee NLA-Teile beschaffen",
      lead:
        "Von obsolete Militärfahrzeugkomponenten bis zu Humvee-Service-Teilen: Wir starten gezielte RFQs bei europäischen Speziallieferanten.",
      items: ["Antrieb und Achskomponenten", "Fahrwerk und Lenkung", "Elektrik und Beleuchtung", "Karosseriebeschläge und Halter"],
    },
  },
  willys: {
    en: {
      title: "Willys Jeep Parts",
      description:
        "RFQ sourcing for Willys Jeep restoration, service, and hard-to-find mechanical, body, and electrical parts in Europe.",
      h1: "Willys Jeep parts sourcing",
      lead:
        "We support professional restorers and workshops with structured sourcing for Willys Jeep parts where normal catalog channels stop.",
      items: ["Engine service parts", "Transmission and transfer case items", "Body panels and hardware", "Brake, steering, and axle components"],
    },
    de: {
      title: "Willys Jeep Teile",
      description:
        "RFQ-Sourcing für Willys Jeep Restaurierung, Service und schwer erhältliche Mechanik-, Karosserie- und Elektrikteile in Europa.",
      h1: "Willys Jeep Teile beschaffen",
      lead:
        "Wir unterstützen professionelle Restaurierer und Werkstätten mit strukturiertem Sourcing, wenn normale Katalogkanäle nicht ausreichen.",
      items: ["Motorservice-Teile", "Getriebe und Verteilergetriebe", "Karosserieteile und Beschläge", "Bremsen, Lenkung und Achsen"],
    },
  },
  gw460: {
    en: {
      title: "Mercedes / Puch G W460 NLA Parts",
      description:
        "Germany-based B2B sourcing for Mercedes-Benz and Puch G W460 NLA parts, obsolete trim, mechanical, chassis, and military G-class components.",
      h1: "Mercedes / Puch G W460 NLA parts sourcing",
      lead:
        "For W460 and early G-class platforms, we combine German market knowledge with a practical RFQ workflow for obsolete or low-availability parts.",
      items: ["Chassis and axle parts", "Obsolete trim and interior items", "Body seals, hinges, and hardware", "Military G-specific components"],
    },
    de: {
      title: "Mercedes / Puch G W460 NLA-Teile",
      description:
        "B2B-Sourcing aus Deutschland für Mercedes-Benz und Puch G W460 NLA-Teile, obsolete Ausstattung, Mechanik, Fahrwerk und Militär-G-Komponenten.",
      h1: "Mercedes / Puch G W460 NLA-Teile beschaffen",
      lead:
        "Für W460 und frühe G-Klasse-Plattformen verbinden wir deutschen Marktüberblick mit einem praxisnahen RFQ-Prozess für schwer verfügbare Teile.",
      items: ["Fahrwerk und Achsteile", "Obsolete Ausstattung und Innenraum", "Dichtungen, Scharniere und Beschläge", "Militär-G-spezifische Komponenten"],
    },
  },
} as const;
