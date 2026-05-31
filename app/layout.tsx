import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: {
    default: "Offroad NLA Parts Sourcing Europe",
    template: "%s | Offroad NLA Parts Sourcing Europe",
  },
  description:
    "Germany-based B2B RFQ sourcing for hard-to-find offroad, HMMWV, Willys Jeep, and Mercedes/Puch G W460 parts.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
