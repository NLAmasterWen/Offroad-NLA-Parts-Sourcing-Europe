import type { Metadata } from "next";
import { RfqForm } from "@/components/RfqForm";
import { assertLocale } from "@/lib/i18n";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = assertLocale(rawLocale);
  return {
    title: locale === "de" ? "RFQ Anfrage für NLA Fahrzeugteile" : "RFQ Form for NLA Vehicle Parts",
    description:
      locale === "de"
        ? "Senden Sie eine B2B-Anfrage für schwer erhältliche HMMWV, Willys Jeep oder Mercedes/Puch G W460 Teile."
        : "Submit a B2B request for hard-to-find HMMWV, Willys Jeep, or Mercedes/Puch G W460 parts.",
  };
}

export default async function RfqPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  const locale = assertLocale(rawLocale);
  return (
    <section className="industrial-grid">
      <div className="mx-auto max-w-5xl px-5 py-16 md:py-24">
        <p className="text-sm font-bold uppercase tracking-[0.24em] text-[#c07a2c]">RFQ</p>
        <h1 className="mt-5 text-4xl font-black tracking-tight text-[#171915] md:text-6xl">
          {locale === "de" ? "B2B Teileanfrage" : "B2B parts request"}
        </h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-[#4d5149]">
          {locale === "de"
            ? "Füllen Sie die wichtigsten Einkaufsdaten aus. Die Anfrage wird in Version 1 lokal als JSON gespeichert."
            : "Enter the purchasing details we need to qualify the request. In version 1, submissions are stored locally as JSON."}
        </p>
        <div className="mt-10">
          <RfqForm locale={locale} />
        </div>
      </div>
    </section>
  );
}
