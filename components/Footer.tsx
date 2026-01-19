"use client";

import Link from "next/link";
import Image from "next/image";
import { Instagram, Mail } from "lucide-react";
import { useContent } from "@/hooks/useContent";

export default function Footer() {
  const { navigation, siteConfig, footerContent } = useContent();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-dark text-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {/* Brand Section */}
          <div>
            <Link href="/" className="inline-flex items-center gap-4 mb-6 group">
              <div className="relative">
                <div className="absolute inset-0 bg-primary/20 blur-lg rounded-full scale-125 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <Image
                  src="/images/logo.gif"
                  alt="Arteral Logo"
                  unoptimized
                  width={56}
                  height={56}
                  className="relative w-12 h-12 md:w-14 md:h-14 object-contain transition-all duration-300 group-hover:scale-110"
                />
              </div>
              <div className="flex flex-col">
                <h3 className="font-display text-2xl md:text-3xl font-bold text-white group-hover:text-primary transition-colors duration-300 tracking-wider">
                  ARTERAL
                </h3>
                <span className="text-xs text-light/50 font-body tracking-widest mt-1">
                  WEAR YOUR PHILOSOPHY
                </span>
              </div>
            </Link>
            <p className="font-body text-sm text-light/70 leading-relaxed whitespace-pre-line max-w-xs">
              {footerContent.brand.tagline}
            </p>
          </div>

          {/* Navigation Links */}
          <div>
            <h4 className="font-body text-sm font-semibold text-white mb-4 uppercase tracking-wider">
              {footerContent.sections.navigation}
            </h4>
            <ul className="space-y-2">
              {navigation.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="font-body text-sm text-light/80 hover:text-white transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Social */}
          <div>
            <h4 className="font-body text-sm font-semibold text-white mb-4 uppercase tracking-wider">
              {footerContent.sections.contact}
            </h4>
            <div className="space-y-3">
              <a
                href={`mailto:${siteConfig.email}`}
                className="flex items-center gap-2 font-body text-sm text-light/95 hover:text-white transition-colors group"
              >
                <Mail size={16} className="group-hover:text-primary" />
                {siteConfig.email}
              </a>
              <a
                href={`https://instagram.com/${siteConfig.instagram.replace("@", "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 font-body text-sm text-light/95 hover:text-white transition-colors group"
              >
                <Instagram size={16} className="group-hover:text-primary" />
                {siteConfig.instagram}
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-light/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="font-body text-xs text-light/90">
              © {currentYear} Arteral. {footerContent.copyright}
            </p>
            <p className="font-body text-xs text-light/90">
              {footerContent.taglineShort}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
