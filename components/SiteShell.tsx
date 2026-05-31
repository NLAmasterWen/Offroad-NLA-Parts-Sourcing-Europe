import Link from "next/link";
import { dictionary, Locale, nav } from "@/lib/i18n";

export function SiteShell({ locale, children }: { locale: Locale; children: React.ReactNode }) {
  const copy = dictionary[locale];
  return (
    <div className="min-h-screen bg-[#f5f3ee] text-[#171915]">
      <header className="border-b border-[#d8d1c3] bg-[#fffdf8]/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-5 md:flex-row md:items-center md:justify-between">
          <Link href={`/${locale}`} className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-sm bg-[#2f3b2d] text-lg font-black text-[#f5f3ee]">
              NLA
            </span>
            <span>
              <span className="block text-sm font-bold uppercase tracking-[0.24em] text-[#2f3b2d]">Offroad Sourcing</span>
              <span className="block text-xs uppercase tracking-[0.22em] text-[#666a60]">Germany · Europe · B2B</span>
            </span>
          </Link>
          <nav className="flex flex-wrap items-center gap-2 text-sm font-semibold text-[#2e3438]">
            {nav[locale].map((item) => (
              <Link key={item.href} href={item.href} className="rounded-sm px-3 py-2 hover:bg-[#ece6d9]">
                {item.label}
              </Link>
            ))}
            <Link href={copy.alternatePath as string} className="rounded-sm border border-[#d8d1c3] px-3 py-2 hover:bg-[#ece6d9]">
              {copy.alternate as string}
            </Link>
          </nav>
        </div>
      </header>
      <main>{children}</main>
      <footer className="border-t border-[#d8d1c3] bg-[#2e3438] text-[#f5f3ee]">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-10 md:grid-cols-3">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-[#c07a2c]">Offroad NLA Parts</p>
            <p className="mt-3 text-sm text-[#d8d1c3]">{copy.trust as string}</p>
          </div>
          <div className="text-sm text-[#d8d1c3]">
            <p className="font-semibold text-white">Platforms</p>
            <p className="mt-3">HMMWV / Humvee · Willys Jeep · Mercedes / Puch G W460</p>
          </div>
          <div className="flex items-start gap-3 md:justify-end">
            <Link href={`/${locale}/rfq`} className="rounded-sm bg-[#c07a2c] px-5 py-3 text-sm font-bold text-white shadow-sm hover:bg-[#a86422]">
              {copy.rfqCta as string}
            </Link>
            <Link href="/admin" className="rounded-sm border border-[#747970] px-5 py-3 text-sm font-bold text-white hover:bg-white/10">
              {copy.admin as string}
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
