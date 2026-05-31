import Link from "next/link";
import { Locale } from "@/lib/i18n";

type Props = {
  locale: Locale;
  title: string;
  lead: string;
  items: readonly string[];
};

export function VehiclePage({ locale, title, lead, items }: Props) {
  const cta = locale === "de" ? "Teileanfrage starten" : "Start parts RFQ";
  const note = locale === "de" ? "Typische Suchbereiche" : "Common sourcing areas";
  const prompt = locale === "de" ? "OE-Nummern, Fotos und Mengen helfen uns, schneller zu prüfen." : "OE numbers, photos, and quantities help us qualify faster.";
  return (
    <section className="industrial-grid">
      <div className="mx-auto max-w-7xl px-5 py-16 md:py-24">
        <div className="max-w-3xl">
          <p className="text-sm font-bold uppercase tracking-[0.24em] text-[#c07a2c]">NLA / Obsolete / Surplus</p>
          <h1 className="mt-5 text-4xl font-black tracking-tight text-[#171915] md:text-6xl">{title}</h1>
          <p className="mt-6 text-lg leading-8 text-[#4d5149]">{lead}</p>
          <Link href={`/${locale}/rfq`} className="mt-8 inline-flex rounded-sm bg-[#2f3b2d] px-6 py-4 text-sm font-bold uppercase tracking-[0.14em] text-white shadow-sm hover:bg-[#20291f]">
            {cta}
          </Link>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-[1fr_0.85fr]">
          <div className="rounded-sm border border-[#d8d1c3] bg-[#fffdf8] p-8 shadow-sm">
            <h2 className="text-2xl font-black text-[#2e3438]">{note}</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {items.map((item) => (
                <div key={item} className="border-l-4 border-[#c07a2c] bg-[#f5f3ee] p-4 font-semibold text-[#2e3438]">
                  {item}
                </div>
              ))}
            </div>
          </div>
          <aside className="rounded-sm bg-[#2e3438] p-8 text-white shadow-sm">
            <h2 className="text-2xl font-black">RFQ ready</h2>
            <p className="mt-4 text-[#d8d1c3]">{prompt}</p>
            <ul className="mt-6 space-y-3 text-sm text-[#f5f3ee]">
              <li>✓ Vehicle model and year</li>
              <li>✓ Part name and OE number</li>
              <li>✓ Quantity and target price</li>
              <li>✓ Photo upload placeholder</li>
            </ul>
          </aside>
        </div>
      </div>
    </section>
  );
}
