import type { Metadata } from "next";
import { Playfair_Display, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { defaultMetadata } from "@/lib/metadata";

const playfairDisplay = Playfair_Display({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = defaultMetadata;

import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { ThemeProviders } from "@/components/ThemeProvider";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { AuthProvider } from "@/contexts/AuthContext";
import CustomCursor from "@/components/CustomCursor";
import AmbientMusic from "@/components/AmbientMusic";
import MuseumSpotlight from "@/components/MuseumSpotlight";
import PhilosophicalEasterEggs from "@/components/PhilosophicalEasterEggs";
import CookieConsent from "@/components/CookieConsent";
import SplashScreen from "@/components/SplashScreen";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="scroll-smooth" suppressHydrationWarning>
      <body
        className={`${playfairDisplay.variable} ${inter.variable} ${jetbrainsMono.variable} antialiased`}
      >
        <ThemeProviders>
          <LanguageProvider>
            <AuthProvider>
              <SplashScreen />
              <CustomCursor />
              <MuseumSpotlight />
              <PhilosophicalEasterEggs />
              <AmbientMusic />
              <Navigation />
              <main className="min-h-screen pt-16 md:pt-20">{children}</main>
              <Footer />
              <CookieConsent />
            </AuthProvider>
          </LanguageProvider>
        </ThemeProviders>
      </body>
    </html>
  );
}
