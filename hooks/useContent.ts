"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import * as contentEn from "@/data/content";
import * as contentFr from "@/data/content-fr";

export function useContent() {
  const { language } = useLanguage();

  if (language === "fr") {
    return contentFr;
  }

  return contentEn;
}
