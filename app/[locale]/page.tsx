import type { Metadata } from "next";
import Link from "next/link";
import { assertLocale, dictionary, Locale } from "@/lib/i18n";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = assertLocale(rawLocale);
  return {
    title: locale === "de" ? "B2B Sourcing für Offroad- und Militärfahrzeugteile" : "B2B Offroad and Military Vehicle Parts Sourcing",
    description:
      locale === "de"
        ? "Deutschlandbasierte RFQ-Website für schwer erhältliche HMMWV, Willys Jeep und Mercedes/Puch G W460 NLA-Teile."
        : "Germany-based RFQ website for hard-to-find HMMWV, Willys Jeep, and Mercedes/Puch G W460 NLA parts.",
  };
}

const cards = {
  en: [
    { href: "/en/hmmwv-humvee-nla-parts", title: "HMMWV / Humvee NLA parts", text: "Surplus, obsolete, and hard-to-find parts for military and civilian Humvee platforms." },
    { href: "/en/willys-jeep-parts", title: "Willys Jeep parts", text: "Structured RFQ support for restoration and workshop procurement." },
    { href: "/en/mercedes-puch-g-w460-nla-parts", title: "Mercedes / Puch G W460", text: "German-market sourcing for early G-class NLA and military-specific components." },
  ],
  de: [
    { href: "/de/hmmwv-humvee-nla-parts", title: "HMMWV / Humvee NLA-Teile", text: "Surplus-, obsolete und schwer erhältliche Teile für militärische und zivile Humvee-Plattformen." },
    { href: "/de/willys-jeep-parts", title: "Willys Jeep Teile", text: "Strukturierte RFQ-Unterstützung für Restaurierung und Werkstattbeschaffung." },
    { href: "/de/mercedes-puch-g-w460-nla-parts", title: "Mercedes / Puch G W460", text: "Sourcing im deutschen Markt für frühe G-Klasse NLA- und Militärkomponenten." },
  ],
} satisfies Record<Locale, { href: string; title: string; text: string }[]>;

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  const locale = assertLocale(rawLocale);
  const copy = dictionary[locale];
  return (
    <>
      <section className="industrial-grid border-b border-[#d8d1c3]">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 md:grid-cols-[1.15fr_0.85fr] md:py-24">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.26em] text-[#c07a2c]">{copy.trust as string}</p>
            <h1 className="mt-5 text-5xl font-black tracking-tight text-[#171915] md:text-7xl">{copy.heroTitle as string}</h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-[#4d5149]">{copy.heroLead as string}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href={`/${locale}/rfq`} className="rounded-sm bg-[#c07a2c] px-6 py-4 text-sm font-black uppercase tracking-[0.14em] text-white shadow-sm hover:bg-[#a86422]">
                {copy.rfqCta as string}
              </Link>
              <Link href={`/${locale}/hmmwv-humvee-nla-parts`} className="rounded-sm border border-[#2f3b2d] px-6 py-4 text-sm font-black uppercase tracking-[0.14em] text-[#2f3b2d] hover:bg-[#ece6d9]">
                HMMWV
              </Link>
            </div>
          </div>
          <div className="rounded-sm bg-[#2e3438] p-8 text-white shadow-xl">
            <p className="text-sm font-bold uppercase tracking-[0.24em] text-[#c07a2c]">Capability</p>
            <ul className="mt-6 space-y-4">
              {(copy.heroBullets as string[]).map((item) => (
                <li key={item} className="flex gap-3 border-b border-white/10 pb-4 text-lg font-semibold"><span className="text-[#c07a2c]">■</span>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-5 py-16">
        <p className="text-sm font-bold uppercase tracking-[0.24em] text-[#c07a2c]">{copy.vehicleIntro as string}</p>
        <div className="mt-6 grid gap-6 md:grid-cols-3">
          {cards[locale].map((card) => (
            <Link key={card.href} href={card.href} className="rounded-sm border border-[#d8d1c3] bg-[#fffdf8] p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
              <h2 className="text-2xl font-black text-[#2e3438]">{card.title}</h2>
              <p className="mt-4 text-[#666a60]">{card.text}</p>
            </Link>
          ))}
        </div>
      </section>
      <section className="bg-[#fffdf8]">
        <div className="mx-auto max-w-7xl px-5 py-16">
          <h2 className="text-3xl font-black text-[#2e3438]">{copy.processTitle as string}</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {(copy.process as string[]).map((step, index) => (
              <div key={step} className="border-l-4 border-[#c07a2c] bg-[#f5f3ee] p-6">
                <p className="text-sm font-black uppercase tracking-[0.2em] text-[#c07a2c]">0{index + 1}</p>
                <p className="mt-3 font-semibold leading-7 text-[#2e3438]">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
