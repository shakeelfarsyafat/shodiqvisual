import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import "./globals.css";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { LenisProvider } from "@/components/providers/LenisProvider";
import { LoadingScreen } from "@/components/ui/LoadingScreen";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageTransition from "@/components/layout/PageTransition";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Shodiq Visual — Premium Cinematography & Photography Studio",
    template: "%s | Shodiq Visual",
  },
  description:
    "Studio videografi dan fotografi premium berbasis di Jakarta. Kami mengabadikan setiap cerita dalam frame-frame yang penuh makna — Wedding, Commercial, Editorial, dan lebih.",
  keywords: [
    "videografi jakarta",
    "fotografer jakarta",
    "wedding videographer",
    "cinematic video",
    "shodiq visual",
    "videografi pernikahan",
    "brand film jakarta",
    "photographer indonesia",
  ],
  authors: [{ name: "Shodiq Visual" }],
  creator: "Shodiq Visual",
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "https://shodiqvisual.com",
    siteName: "Shodiq Visual",
    title: "Shodiq Visual — Premium Cinematography & Photography Studio",
    description:
      "Every frame tells a story. Studio videografi dan fotografi premium di Jakarta.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Shodiq Visual",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Shodiq Visual",
    description: "Every frame tells a story.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${cormorant.variable} ${dmSans.variable}`} suppressHydrationWarning>
      <body className="bg-obsidian text-white antialiased overflow-x-hidden">
        {/* Noise texture overlay */}
        <div className="noise-overlay" aria-hidden="true" />

        {/* Custom cursor */}
        <CustomCursor />

        {/* Loading screen */}
        <LoadingScreen />

        {/* Lenis smooth scroll */}
        <LenisProvider>
          <PageTransition>
            <Navbar />
            <main>{children}</main>
            <Footer />
          </PageTransition>
        </LenisProvider>
      </body>
    </html>
  );
}
