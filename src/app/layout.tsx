import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { LanguageProvider } from "@/lib/i18n";

export const metadata: Metadata = {
  title: {
    template: "%s | F1 Archive (2000–2025)",
    default: "F1 Archive | 2000–2025 Formula 1 Historical Database"
  },
  description: "Comprehensive, high-precision Formula 1 historical database covering all 26 seasons from 2000 to 2025. Explore race results, qualifying, free practice, driver & team telemetry, circuit layouts, and championship progression.",
  keywords: ["Formula 1", "F1", "F1 Historical Database", "F1 Stats", "Michael Schumacher", "Lewis Hamilton", "Max Verstappen", "Ferrari", "Red Bull", "McLaren", "Mercedes"],
  openGraph: {
    title: "F1 Archive | 2000–2025 Formula 1 Historical Database",
    description: "The interactive historical database for Formula 1 from 2000 to 2025. 26 Seasons, 491 Grands Prix, 129 Drivers.",
    type: "website",
    locale: "zh_CN",
  },
  icons: {
    icon: "/favicon.ico",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh" className="dark">
      <body className="min-h-screen flex flex-col bg-[#08080a] text-zinc-100 antialiased selection:bg-red-900 selection:text-white">
        <LanguageProvider>
          <Navbar />
          <main className="flex-grow">{children}</main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
