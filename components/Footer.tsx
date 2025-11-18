"use client";

import Link from "next/link";
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
            <h3 className="font-display text-2xl md:text-3xl font-bold text-white mb-4">
              ARTERAL
            </h3>
            <p className="font-body text-sm text-light/80 leading-relaxed whitespace-pre-line">
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
                className="flex items-center gap-2 font-body text-sm text-light/80 hover:text-white transition-colors group"
              >
                <Mail size={16} className="group-hover:text-primary" />
                {siteConfig.email}
              </a>
              <a
                href={`https://instagram.com/${siteConfig.instagram.replace("@", "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 font-body text-sm text-light/80 hover:text-white transition-colors group"
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
            <p className="font-body text-xs text-light/60">
              © {currentYear} Arteral. {footerContent.copyright}
            </p>
            <p className="font-body text-xs text-light/60">
              {footerContent.taglineShort}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
