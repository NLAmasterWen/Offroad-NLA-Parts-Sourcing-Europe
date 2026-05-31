import type { Metadata } from "next";
import { VehiclePage } from "@/components/VehiclePage";
import { assertLocale, pageCopy } from "@/lib/i18n";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = assertLocale(rawLocale);
  const copy = pageCopy.willys[locale];
  return { title: copy.title, description: copy.description };
}

export default async function WillysPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  const locale = assertLocale(rawLocale);
  const copy = pageCopy.willys[locale];
  return <VehiclePage locale={locale} title={copy.h1} lead={copy.lead} items={copy.items} />;
}
