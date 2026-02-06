"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Scroll,
  Quote,
  X,
  Check,
  ArrowRight,
  BookOpen,
  Users,
  Shirt,
  Film,
} from "lucide-react";
import Image from "next/image";
import FadeIn from "@/components/FadeIn";
import NotifyMeButton from "@/components/NotifyMeButton";
import Link from "next/link";
import { useContent } from "@/hooks/useContent";

// Images mapped to process steps (index-based)
const processImages: Record<number, { src: string; alt: string }> = {
  0: { src: "/images/manifeste/broderie.png", alt: "Recherche philosophique et broderie artisanale" },
  1: { src: "/images/manifeste/atelier.png", alt: "Atelier de collaboration artistique" },
  2: { src: "/images/manifeste/materiaux.png", alt: "Matériaux et textiles premium" },
  3: { src: "/images/manifeste/packaging.png", alt: "Storytelling et packaging éthique" },
};

interface Chapter {
  number: string;
  title: string;
  text: string;
  quote: string;
  quoteAuthor: string;
}

// Alternating visual styles for chapter blocks to avoid monotony
const chapterStyles = [
  { bg: "bg-[#1A1A1A]", numColor: "text-primary", labelColor: "text-white/40", border: "border-primary/20" },                // I - Dark
  { bg: "bg-gradient-to-br from-primary to-primary/80", numColor: "text-white", labelColor: "text-white/60", border: "border-white/20" },  // II - Red
  { bg: "bg-[#1A1A1A]", numColor: "text-accent", labelColor: "text-white/40", border: "border-accent/20" },                   // III - Dark + gold
  { bg: "bg-gradient-to-br from-[#2B2B2B] to-[#1A1A1A]", numColor: "text-white", labelColor: "text-white/30", border: "border-white/10" }, // IV - Charcoal
  { bg: "bg-gradient-to-br from-accent to-accent/80", numColor: "text-white", labelColor: "text-white/60", border: "border-white/20" },    // V - Gold
  { bg: "bg-[#0A0A0A]", numColor: "text-primary", labelColor: "text-white/30", border: "border-primary/10" },                 // VI - Pure dark
  { bg: "bg-gradient-to-br from-primary/90 to-accent/90", numColor: "text-white", labelColor: "text-white/50", border: "border-white/20" },// VII - Gradient
  { bg: "bg-[#1A1A1A]", numColor: "text-white", labelColor: "text-white/40", border: "border-white/10" },                     // VIII - Dark clean
  { bg: "bg-gradient-to-br from-[#2B2B2B] to-primary/30", numColor: "text-primary", labelColor: "text-white/40", border: "border-primary/15" }, // IX - Dark red tint
  { bg: "bg-gradient-to-br from-primary to-accent", numColor: "text-white", labelColor: "text-white/60", border: "border-white/20" },      // X - Full gradient
];

const processIconMap = {
  0: BookOpen,
  1: Users,
  2: Shirt,
  3: Film,
};

export default function ManifestePage() {
  const { manifestoPageContent, processContent, processPageContent } = useContent();
  const [oathTaken, setOathTaken] = useState(false);

  return (
    <div className="min-h-screen bg-[#E8E8E8] dark:bg-[#0A0A0A]">
      {/* ═══════════════════════════════════════════════ */}
      {/* HERO - Artistic & Minimal (Collection style)   */}
      {/* ═══════════════════════════════════════════════ */}
      <section className="min-h-[80vh] flex items-center justify-center relative overflow-hidden">
        {/* Background artistic elements */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 border border-dark/5 dark:border-white/5 rounded-full" />
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 border border-primary/10 rounded-full" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-dark/5 dark:border-white/5 rounded-full" />
          <div className="absolute top-0 left-0 w-64 h-64 bg-primary/5 rounded-full filter blur-3xl" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/5 rounded-full filter blur-3xl" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <FadeIn>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", duration: 0.8 }}
                className="inline-block mb-8"
              >
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center">
                  <Scroll className="w-10 h-10 text-primary" />
                </div>
              </motion.div>

              <span className="font-mono text-[10px] tracking-[0.5em] text-[#7A7A7A] dark:text-gray-500 block mb-6">
                {manifestoPageContent.hero.label}
              </span>
              <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-[#2B2B2B] dark:text-white mb-6 leading-tight">
                {manifestoPageContent.hero.title}
                <br />
                <span className="text-primary">&amp; Processus</span>
              </h1>
              <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mb-8" />
              <p className="font-body text-lg md:text-xl text-[#5A5A5A] dark:text-gray-400 max-w-xl mx-auto leading-relaxed">
                {manifestoPageContent.hero.description}
              </p>
            </motion.div>
          </FadeIn>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════ */}
      {/* INTRO QUOTE                                     */}
      {/* ═══════════════════════════════════════════════ */}
      <section className="py-16 md:py-24 bg-white dark:bg-[#1A1A1A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeIn>
            <span className="absolute -top-4 left-1/2 -translate-x-1/2 font-display text-8xl text-primary/10 select-none">
              &ldquo;
            </span>
            <Quote className="w-12 h-12 text-accent mx-auto mb-6" />
            <p className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-[#2B2B2B] dark:text-white mb-4 leading-relaxed">
              {manifestoPageContent.intro.quote}
            </p>
            <div className="w-12 h-[1px] bg-primary mx-auto my-6" />
            <p className="font-mono text-sm text-accent tracking-wider mb-8">
              — {manifestoPageContent.intro.author}
            </p>
            <p className="font-body text-lg text-[#4A4A4A] dark:text-gray-300 max-w-2xl mx-auto">
              {manifestoPageContent.intro.description}
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════ */}
      {/* 10 CHAPTERS - Alternating layout                */}
      {/* ═══════════════════════════════════════════════ */}
      <section className="py-16 md:py-24 bg-[#E8E8E8] dark:bg-[#0A0A0A]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="text-center mb-12 md:mb-20">
              <span className="font-mono text-[10px] tracking-[0.5em] text-[#7A7A7A] dark:text-gray-500 block mb-4">
                {manifestoPageContent.chaptersSection.label}
              </span>
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-[#2B2B2B] dark:text-white mb-6">
                {manifestoPageContent.chaptersSection.title}
              </h2>
              <p className="font-body text-base md:text-lg text-[#5A5A5A] dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
                {manifestoPageContent.chaptersSection.description}
                <span className="italic text-primary">{manifestoPageContent.chaptersSection.descriptionHighlight}</span>.
              </p>
            </div>
          </FadeIn>

          <div className="space-y-12 md:space-y-20">
            {manifestoPageContent.chapters.map((chapter: Chapter, index: number) => {
              const isEven = index % 2 === 0;
              const style = chapterStyles[index] || chapterStyles[0];

              return (
                <FadeIn key={chapter.number} delay={index * 0.05}>
                  <div
                    className={`flex flex-col ${isEven ? "md:flex-row" : "md:flex-row-reverse"} gap-6 md:gap-10 items-stretch`}
                  >
                    {/* Number / Visual Column */}
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.4 }}
                      className="w-full md:w-5/12 group relative overflow-hidden"
                    >
                      <div className={`relative ${style.bg} p-10 md:p-14 rounded-sm min-h-[300px] md:min-h-[340px] flex items-center justify-center border ${style.border}`}>
                        {/* Large ghost number */}
                        <div className="absolute inset-0 flex items-center justify-center select-none pointer-events-none overflow-hidden">
                          <span className="text-[180px] md:text-[240px] font-display font-bold text-white/[0.04]">
                            {chapter.number}
                          </span>
                        </div>

                        {/* Hover shimmer */}
                        <div className="absolute inset-0 bg-gradient-to-t from-white/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                        {/* Content */}
                        <div className="relative z-10 text-center">
                          <p className={`font-display text-6xl md:text-7xl lg:text-8xl font-bold ${style.numColor} mb-3 transition-transform duration-500 group-hover:scale-110`}>
                            {chapter.number}
                          </p>
                          <div className="w-8 h-[1px] bg-current opacity-30 mx-auto mb-3" />
                          <p className={`font-mono text-[10px] tracking-[0.4em] ${style.labelColor} uppercase`}>
                            {manifestoPageContent.chapterLabel}
                          </p>
                        </div>
                      </div>
                    </motion.div>

                    {/* Content Column */}
                    <div className={`w-full md:w-7/12 ${isEven ? "md:pl-4" : "md:pr-4"}`}>
                      <span className="font-mono text-[10px] tracking-[0.3em] text-primary/60 block mb-3">
                        {String(index + 1).padStart(2, "0")} / 10
                      </span>
                      <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-[#2B2B2B] dark:text-white mb-4 md:mb-6">
                        {chapter.title}
                      </h2>
                      <p className="font-body text-base md:text-lg text-[#4A4A4A] dark:text-gray-300 leading-relaxed mb-6">
                        {chapter.text}
                      </p>

                      {/* Quote - styled like Collection citations */}
                      <div className="relative group/quote">
                        <span className="absolute -top-3 -left-1 font-display text-5xl text-primary/10 select-none">
                          &ldquo;
                        </span>
                        <blockquote className="pl-6 border-l-2 border-primary/30 group-hover/quote:border-primary/60 transition-colors duration-300">
                          <p className="font-body text-sm md:text-base italic text-[#3A3A3A] dark:text-gray-200 mb-2">
                            {chapter.quote}
                          </p>
                          <footer className="font-mono text-xs text-accent">
                            — {chapter.quoteAuthor}
                          </footer>
                        </blockquote>
                      </div>
                    </div>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════ */}
      {/* ANTI-MANIFESTO - Dark section                   */}
      {/* ═══════════════════════════════════════════════ */}
      <section className="py-20 md:py-32 bg-[#1A1A1A] text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(139,0,0,0.1),transparent_50%)]" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <FadeIn>
            <div className="text-center mb-16 md:mb-24">
              <span className="font-mono text-[10px] tracking-[0.4em] text-primary block mb-4">
                {manifestoPageContent.antiManifesto.label}
              </span>
              <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold mb-6 text-white">
                {manifestoPageContent.antiManifesto.title}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              {manifestoPageContent.antiManifesto.items.map((item: string, index: number) => (
                <FadeIn key={index} delay={index * 0.1}>
                  <motion.div
                    whileHover={{ y: -5 }}
                    className="relative group"
                  >
                    <div className="absolute -inset-1 bg-gradient-to-br from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-sm" />

                    <div className="relative flex items-center gap-4 bg-white/5 backdrop-blur-sm border border-white/10 p-5 md:p-6 rounded-sm">
                      <div className="flex-shrink-0 w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                        <X className="w-5 h-5 text-primary" />
                      </div>
                      <p className="font-body text-sm md:text-base text-white/80">
                        {item}
                      </p>
                    </div>
                  </motion.div>
                </FadeIn>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════ */}
      {/* ARTISTIC QUOTE TRANSITION                       */}
      {/* ═══════════════════════════════════════════════ */}
      <FadeIn>
        <div className="relative py-24 md:py-36 overflow-hidden">
          <Image
            src="/images/manifeste/dualite.png"
            alt="Dualité Chaos et Ordre — la tension créatrice d'Arteral"
            fill
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-black/60" />
          <div className="relative z-10 max-w-3xl mx-auto px-4 text-center">
            <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mb-8" />
            <p className="font-display text-xl md:text-2xl lg:text-3xl italic text-white leading-relaxed">
              &ldquo;{manifestoPageContent.transitionQuote}&rdquo;
            </p>
            <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mt-8" />
          </div>
        </div>
      </FadeIn>

      {/* ═══════════════════════════════════════════════ */}
      {/* PROCESSUS DE CRÉATION - Alternating layout      */}
      {/* ═══════════════════════════════════════════════ */}
      <section className="py-16 md:py-24 bg-white dark:bg-[#1A1A1A]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="text-center mb-12 md:mb-20">
              <span className="font-mono text-[10px] tracking-[0.5em] text-[#7A7A7A] dark:text-gray-500 block mb-4">
                {manifestoPageContent.processSection.label}
              </span>
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-[#2B2B2B] dark:text-white mb-6">
                {processPageContent.hero.title}
              </h2>
              <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mb-8" />
              <p className="font-body text-base md:text-lg text-[#5A5A5A] dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
                {processPageContent.hero.description}
              </p>
            </div>
          </FadeIn>

          <div className="space-y-8 md:space-y-12">
            {processContent.sections.map((section: { title: string; description: string; subsections?: string[]; steps?: string[]; details?: string[] }, index: number) => {
              const Icon = processIconMap[index as keyof typeof processIconMap];
              const isEven = index % 2 === 0;

              return (
                <FadeIn key={section.title} delay={index * 0.1}>
                  <div
                    className={`flex flex-col ${isEven ? "md:flex-row" : "md:flex-row-reverse"} gap-6 md:gap-10 items-center`}
                  >
                    {/* Visual Column - Image or Icon fallback */}
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.4 }}
                      className="w-full md:w-5/12 group relative overflow-hidden"
                    >
                      <div className="relative rounded-sm min-h-[280px] md:min-h-[360px] flex items-center justify-center">
                        {processImages[index] ? (
                          <>
                            <Image
                              src={processImages[index].src}
                              alt={processImages[index].alt}
                              fill
                              className="object-cover transition-transform duration-700 group-hover:scale-105"
                              sizes="(max-width: 768px) 100vw, 42vw"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                            <div className="relative z-10 text-center">
                              <div className="inline-flex items-center justify-center w-16 h-16 mb-3 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
                                {Icon && <Icon className="w-8 h-8 text-white" />}
                              </div>
                              <p className="font-mono text-[10px] tracking-[0.3em] text-white/70">
                                {processPageContent.stepLabel} {index + 1}
                              </p>
                            </div>
                          </>
                        ) : (
                          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 dark:from-primary/20 dark:to-accent/20 flex items-center justify-center">
                            <div className="text-center">
                              <div className="inline-flex items-center justify-center w-24 h-24 md:w-32 md:h-32 mb-6 bg-white dark:bg-[#0A0A0A] rounded-full shadow-lg">
                                {Icon && <Icon className="w-12 h-12 md:w-16 md:h-16 text-primary" />}
                              </div>
                              <p className="font-mono text-[10px] tracking-[0.3em] text-[#5A5A5A] dark:text-gray-400">
                                {processPageContent.stepLabel} {index + 1}
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    </motion.div>

                    {/* Content Column */}
                    <div className={`w-full md:w-7/12 ${isEven ? "md:pl-4" : "md:pr-4"}`}>
                      <span className="font-mono text-[10px] tracking-[0.3em] text-primary/60 block mb-3">
                        {String(index + 1).padStart(2, "0")} / 04
                      </span>
                      <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-[#2B2B2B] dark:text-white mb-4 md:mb-6">
                        {section.title}
                      </h2>
                      <p className="font-body text-base md:text-lg text-[#4A4A4A] dark:text-gray-300 leading-relaxed mb-6">
                        {section.description}
                      </p>

                      {/* Subsections */}
                      {section.subsections && (
                        <ul className="space-y-3">
                          {section.subsections.map((sub: string) => (
                            <li
                              key={sub}
                              className="flex items-start gap-3 font-body text-sm md:text-base text-[#3A3A3A] dark:text-gray-200"
                            >
                              <div className="w-1.5 h-1.5 bg-primary rounded-full flex-shrink-0 mt-2" />
                              {sub}
                            </li>
                          ))}
                        </ul>
                      )}

                      {/* Steps */}
                      {section.steps && (
                        <div className="space-y-3">
                          {section.steps.map((step: string, stepIndex: number) => (
                            <motion.div
                              key={step}
                              whileHover={{ x: 4 }}
                              className="flex items-center gap-4 bg-[#F5F5F5] dark:bg-[#0A0A0A] p-4 rounded-sm border border-dark/5 dark:border-white/5"
                            >
                              <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center text-white text-sm font-bold">
                                {stepIndex + 1}
                              </div>
                              <p className="font-body text-sm md:text-base text-[#3A3A3A] dark:text-gray-200">
                                {step}
                              </p>
                            </motion.div>
                          ))}
                        </div>
                      )}

                      {/* Details */}
                      {section.details && (
                        <ul className="space-y-3">
                          {section.details.map((detail: string) => (
                            <li
                              key={detail}
                              className="flex items-start gap-3 font-body text-sm md:text-base text-[#3A3A3A] dark:text-gray-200"
                            >
                              <div className="w-1.5 h-1.5 bg-accent rounded-full flex-shrink-0 mt-2" />
                              {detail}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════ */}
      {/* TIMELINE OVERVIEW                               */}
      {/* ═══════════════════════════════════════════════ */}
      <section className="py-16 md:py-24 bg-[#E8E8E8] dark:bg-[#0A0A0A]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="text-center mb-12 md:mb-16">
              <span className="font-mono text-[10px] tracking-[0.5em] text-[#7A7A7A] dark:text-gray-500 block mb-4">
                {manifestoPageContent.overviewSection.label}
              </span>
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-[#2B2B2B] dark:text-white">
                {processPageContent.timeline.title}
              </h2>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {processContent.sections.map((section: { title: string; description: string }, index: number) => {
              const Icon = processIconMap[index as keyof typeof processIconMap];
              return (
                <FadeIn key={section.title} delay={index * 0.15}>
                  <motion.div
                    whileHover={{ y: -5 }}
                    className="text-center group relative"
                  >
                    <div className="absolute -inset-2 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-sm" />

                    <div className="relative">
                      <div className="relative mb-6">
                        <div className="w-16 h-16 md:w-20 md:h-20 mx-auto bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300">
                          {Icon && <Icon className="w-8 h-8 md:w-10 md:h-10" />}
                        </div>
                        {index < processContent.sections.length - 1 && (
                          <div className="hidden lg:block absolute top-1/2 left-full w-full h-0.5 bg-dark/10 dark:bg-white/10 -translate-y-1/2" />
                        )}
                      </div>
                      <h3 className="font-display text-lg md:text-xl font-bold text-[#2B2B2B] dark:text-white mb-2">
                        {section.title}
                      </h3>
                      <p className="font-body text-xs md:text-sm text-[#5A5A5A] dark:text-gray-400 line-clamp-3">
                        {section.description}
                      </p>
                    </div>
                  </motion.div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════ */}
      {/* OATH SECTION - Duality style                    */}
      {/* ═══════════════════════════════════════════════ */}
      <section className="py-20 md:py-32 bg-white dark:bg-[#0A0A0A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
            {/* Left - Le Serment */}
            <FadeIn>
              <div className="bg-gradient-to-br from-primary/5 to-primary/10 dark:from-primary/10 dark:to-primary/20 p-12 md:p-16 min-h-[400px] flex flex-col justify-center border-r border-dark/5 dark:border-white/5">
                <span className="font-mono text-[10px] tracking-[0.3em] text-primary/60 mb-4">
                  {manifestoPageContent.oath.label}
                </span>
                <h3 className="font-display text-3xl md:text-4xl font-bold text-[#2B2B2B] dark:text-white mb-6">
                  {manifestoPageContent.oath.title}
                </h3>
                <p className="font-body text-lg md:text-xl text-[#3A3A3A] dark:text-gray-200 leading-relaxed italic">
                  &ldquo;{manifestoPageContent.oath.text}&rdquo;
                </p>
              </div>
            </FadeIn>

            {/* Right - Signature & Action */}
            <FadeIn delay={0.2}>
              <div className="bg-gradient-to-br from-dark/5 to-dark/10 dark:from-white/5 dark:to-white/10 p-12 md:p-16 min-h-[400px] flex flex-col justify-center items-center text-center">
                <div className="w-32 h-1 bg-gradient-to-r from-primary via-accent to-primary mx-auto mb-8" />
                <p className="font-display text-2xl sm:text-3xl font-bold text-[#2B2B2B] dark:text-white mb-4">
                  {manifestoPageContent.signature.text}
                </p>
                <p className="font-display text-3xl md:text-4xl font-bold text-primary italic mb-6">
                  Arteral
                </p>
                <p className="font-mono text-sm text-[#5A5A5A] dark:text-gray-400 mb-8">
                  {manifestoPageContent.signature.tagline}
                </p>

                {!oathTaken ? (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setOathTaken(true)}
                    className="inline-flex items-center gap-3 font-body font-semibold text-base sm:text-lg px-8 sm:px-10 py-4 sm:py-5 bg-primary hover:bg-primary/90 text-white rounded-sm transition-all shadow-lg hover:shadow-xl"
                  >
                    <span>{manifestoPageContent.oath.cta}</span>
                    <ArrowRight className="w-5 h-5" />
                  </motion.button>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="inline-flex items-center gap-3 font-body font-semibold text-lg text-accent"
                  >
                    <div className="w-10 h-10 bg-accent/20 rounded-full flex items-center justify-center">
                      <Check className="w-6 h-6 text-accent" />
                    </div>
                    <span>Serment prononcé</span>
                  </motion.div>
                )}
              </div>
            </FadeIn>
          </div>

          {/* Center paradox overlay */}
          <FadeIn delay={0.3}>
            <div className="relative -mt-8 md:-mt-12 z-10">
              <div className="max-w-md mx-auto bg-[#1A1A1A] text-white p-8 md:p-10 text-center">
                <span className="font-mono text-[10px] tracking-[0.3em] text-primary/80 block mb-3">
                  {manifestoPageContent.commitmentSection.label}
                </span>
                <p className="font-display text-lg md:text-xl italic">
                  &ldquo;{manifestoPageContent.commitmentSection.quote}&rdquo;
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════ */}
      {/* MANIFESTO QUOTE - Full bleed                    */}
      {/* ═══════════════════════════════════════════════ */}
      <section className="py-24 md:py-36 text-white relative overflow-hidden">
        <Image
          src="/images/manifeste/narcisse.png"
          alt="Narcisse Amoureux — le paradoxe de l'amour de soi"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/70" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <FadeIn>
            <blockquote className="text-center">
              <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mb-10" />
              <p className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold italic leading-relaxed mb-8">
                &ldquo;{manifestoPageContent.finalQuote.text}&rdquo;
              </p>
              <footer className="font-mono text-xs tracking-[0.3em] text-white/50">
                — {manifestoPageContent.finalQuote.author}
              </footer>
              <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mt-10" />
            </blockquote>
          </FadeIn>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════ */}
      {/* CTA SECTION                                     */}
      {/* ═══════════════════════════════════════════════ */}
      <section className="py-20 md:py-32 bg-[#E8E8E8] dark:bg-[#0A0A0A]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeIn>
            <span className="font-mono text-[10px] tracking-[0.4em] text-[#7A7A7A] dark:text-gray-500 block mb-4">
              REJOIGNEZ LE MOUVEMENT
            </span>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-[#2B2B2B] dark:text-white mb-6">
              {manifestoPageContent.cta.title}
            </h2>
            <p className="font-body text-base md:text-lg text-[#5A5A5A] dark:text-gray-400 leading-relaxed mb-10 max-w-xl mx-auto">
              {manifestoPageContent.cta.description}
            </p>
            <NotifyMeButton />

            <div className="mt-16 pt-12 border-t border-dark/10 dark:border-white/10">
              <p className="font-body text-sm text-[#6A6A6A] dark:text-gray-500 mb-6">
                Explorez l&apos;univers Arteral
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/collection"
                  className="inline-flex items-center justify-center gap-2 font-body text-sm text-[#4A4A4A] dark:text-gray-300 hover:text-primary transition-colors group"
                >
                  <span>{manifestoPageContent.cta.collection}</span>
                  <span className="w-4 h-[1px] bg-current group-hover:w-6 transition-all" />
                </Link>
                <Link
                  href="/studio"
                  className="inline-flex items-center justify-center gap-2 font-body text-sm text-[#4A4A4A] dark:text-gray-300 hover:text-primary transition-colors group"
                >
                  <span>{manifestoPageContent.cta.contest}</span>
                  <span className="w-4 h-[1px] bg-current group-hover:w-6 transition-all" />
                </Link>
                <Link
                  href="/studio"
                  className="inline-flex items-center justify-center gap-2 font-body text-sm text-[#4A4A4A] dark:text-gray-300 hover:text-primary transition-colors group"
                >
                  <span>Créer dans le Studio</span>
                  <span className="w-4 h-[1px] bg-current group-hover:w-6 transition-all" />
                </Link>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
