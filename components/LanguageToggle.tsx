"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { Globe } from "lucide-react";

export default function LanguageToggle() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center gap-2 bg-white dark:bg-dark/80 rounded-full p-1 border border-dark/10 dark:border-white/20 shadow-sm">
      <button
        onClick={() => setLanguage("fr")}
        className={`px-3 py-1 rounded-full text-xs font-semibold transition-all flex items-center gap-1 ${
          language === "fr"
            ? "bg-primary text-white"
            : "text-dark/60 dark:text-white/90 hover:text-dark dark:hover:text-white"
        }`}
      >
        <Globe className="w-3 h-3" />
        FR
      </button>
      <button
        onClick={() => setLanguage("en")}
        className={`px-3 py-1 rounded-full text-xs font-semibold transition-all flex items-center gap-1 ${
          language === "en"
            ? "bg-primary text-white"
            : "text-dark/60 dark:text-white/90 hover:text-dark dark:hover:text-white"
        }`}
      >
        <Globe className="w-3 h-3" />
        EN
      </button>
    </div>
  );
}
