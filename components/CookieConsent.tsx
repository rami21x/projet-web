"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cookie, Shield, X } from "lucide-react";

export function useCookieConsent() {
  const [consent, setConsent] = useState<boolean | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("arteral-cookie-consent");
    if (stored === "accepted") setConsent(true);
    else if (stored === "refused") setConsent(false);
  }, []);

  const accept = () => {
    localStorage.setItem("arteral-cookie-consent", "accepted");
    setConsent(true);
  };

  const refuse = () => {
    localStorage.setItem("arteral-cookie-consent", "refused");
    setConsent(false);
  };

  return { consent, accept, refuse, isDecided: consent !== null };
}

export default function CookieConsent() {
  const { consent, accept, refuse } = useCookieConsent();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("arteral-cookie-consent");
    if (!stored) {
      const timer = setTimeout(() => setVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  if (!visible || consent !== null) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        className="fixed bottom-0 left-0 right-0 z-[100] p-4"
      >
        <div className="max-w-4xl mx-auto bg-white dark:bg-[#1A1A1A] border border-black/10 dark:border-white/10 shadow-2xl p-6 md:p-8">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Cookie className="w-6 h-6 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="font-display text-lg font-bold text-[#2B2B2B] dark:text-white mb-2">
                Cookies & Confidentialité
              </h3>
              <p className="font-body text-sm text-[#5A5A5A] dark:text-gray-400 mb-4 leading-relaxed">
                Nous utilisons des cookies pour améliorer votre expérience, permettre le vote anonyme,
                et suivre les statistiques du site. En acceptant, vous pouvez voter en tant que visiteur anonyme
                et profiter de toutes les fonctionnalités.
              </p>
              <div className="flex items-center gap-2 text-xs text-[#8A8A8A] dark:text-gray-500 mb-4">
                <Shield className="w-4 h-4" />
                <span>Vos données restent privées et ne sont jamais partagées avec des tiers.</span>
              </div>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => {
                    accept();
                    setVisible(false);
                  }}
                  className="px-6 py-2.5 bg-primary text-white font-medium text-sm hover:bg-primary/90 transition-colors"
                >
                  Accepter les cookies
                </button>
                <button
                  onClick={() => {
                    refuse();
                    setVisible(false);
                  }}
                  className="px-6 py-2.5 bg-[#E8E8E8] dark:bg-[#2A2A2A] text-[#5A5A5A] dark:text-gray-400 font-medium text-sm hover:bg-[#D8D8D8] dark:hover:bg-[#333] transition-colors"
                >
                  Refuser
                </button>
              </div>
            </div>
            <button
              onClick={() => setVisible(false)}
              className="text-[#8A8A8A] hover:text-[#5A5A5A] dark:text-gray-500 dark:hover:text-gray-300 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
