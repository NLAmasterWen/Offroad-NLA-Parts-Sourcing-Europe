import { notFound } from "next/navigation";
import { SiteShell } from "@/components/SiteShell";
import { assertLocale, isLocale } from "@/lib/i18n";

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "de" }];
}

export default async function LocaleLayout({ children, params }: Readonly<{ children: React.ReactNode; params: Promise<{ locale: string }> }>) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) {
    notFound();
  }
  const locale = assertLocale(rawLocale);
  return <SiteShell locale={locale}>{children}</SiteShell>;
}
