"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Scroll,
  Quote,
  X,
  Check,
  ArrowRight,
} from "lucide-react";
import FadeIn from "@/components/FadeIn";
import { useContent } from "@/hooks/useContent";

interface Chapter {
  number: string;
  title: string;
  text: string;
  quote: string;
  quoteAuthor: string;
}

export default function ManifestePage() {
  const { manifestoPageContent } = useContent();
  const [oathTaken, setOathTaken] = useState(false);

  return (
    <div className="min-h-screen bg-light dark:bg-dark">
      {/* Hero Section */}
      <section className="py-20 md:py-32 bg-gradient-to-br from-dark via-dark/95 to-primary/20 text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-64 h-64 bg-primary/10 rounded-full filter blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/10 rounded-full filter blur-3xl" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <FadeIn>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", duration: 0.8 }}
              className="inline-block mb-8"
            >
              <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center">
                <Scroll className="w-10 h-10 text-primary" />
              </div>
            </motion.div>

            <p className="font-mono text-xs md:text-sm tracking-[0.3em] text-accent mb-6">
              {manifestoPageContent.hero.label}
            </p>
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 md:mb-8">
              {manifestoPageContent.hero.title}
            </h1>
            <p className="font-body text-lg md:text-xl text-light/90 leading-relaxed max-w-3xl mx-auto">
              {manifestoPageContent.hero.description}
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Intro Quote Section */}
      <section className="py-16 md:py-24 bg-white dark:bg-dark/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeIn>
            <Quote className="w-12 h-12 text-accent/40 mx-auto mb-6" />
            <p className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-dark dark:text-white mb-4 leading-relaxed">
              {manifestoPageContent.intro.quote}
            </p>
            <p className="font-mono text-sm text-accent tracking-wider mb-8">
              — {manifestoPageContent.intro.author}
            </p>
            <p className="font-body text-lg text-dark/70 dark:text-white/70 max-w-2xl mx-auto">
              {manifestoPageContent.intro.description}
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Chapters Section */}
      <section className="py-16 md:py-24 bg-light dark:bg-dark">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-16 md:space-y-24">
            {manifestoPageContent.chapters.map((chapter: Chapter, index: number) => {
              const isEven = index % 2 === 0;

              return (
                <FadeIn key={chapter.number} delay={index * 0.05}>
                  <div
                    className={`grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-center ${
                      !isEven ? "lg:grid-flow-dense" : ""
                    }`}
                  >
                    {/* Number Column */}
                    <div
                      className={`lg:col-span-4 ${!isEven ? "lg:col-start-9" : ""}`}
                    >
                      <div className="relative">
                        <div className="text-[120px] md:text-[180px] font-display font-bold text-dark/5 dark:text-white/5 absolute -top-8 -left-4 select-none">
                          {chapter.number}
                        </div>
                        <div className="relative z-10 bg-gradient-to-br from-primary/10 to-accent/10 dark:from-primary/20 dark:to-accent/20 p-8 md:p-12 rounded-lg flex items-center justify-center">
                          <div className="text-center">
                            <p className="font-display text-5xl md:text-6xl font-bold text-primary mb-2">
                              {chapter.number}
                            </p>
                            <p className="font-mono text-xs text-dark/50 dark:text-white/50 tracking-wider">
                              CHAPITRE
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Content Column */}
                    <div
                      className={`lg:col-span-8 ${
                        !isEven ? "lg:col-start-1 lg:row-start-1" : ""
                      }`}
                    >
                      <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-dark dark:text-white mb-4 md:mb-6">
                        {chapter.title}
                      </h2>
                      <p className="font-body text-base md:text-lg text-dark/70 dark:text-white/70 leading-relaxed mb-6">
                        {chapter.text}
                      </p>

                      {/* Quote */}
                      <div className="bg-accent/5 dark:bg-accent/10 border-l-4 border-accent p-4 md:p-6 rounded-r-lg">
                        <p className="font-body text-sm md:text-base italic text-dark/80 dark:text-white/80 mb-2">
                          &ldquo;{chapter.quote}&rdquo;
                        </p>
                        <p className="font-mono text-xs text-accent">
                          — {chapter.quoteAuthor}
                        </p>
                      </div>
                    </div>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* Anti-Manifesto Section */}
      <section className="py-16 md:py-24 bg-dark text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="text-center mb-12">
              <p className="font-mono text-xs tracking-[0.3em] text-accent mb-4">
                {manifestoPageContent.antiManifesto.label}
              </p>
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold">
                {manifestoPageContent.antiManifesto.title}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              {manifestoPageContent.antiManifesto.items.map((item: string, index: number) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-4 bg-white/5 p-4 md:p-5 rounded-lg border border-white/10"
                >
                  <div className="flex-shrink-0 w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                    <X className="w-5 h-5 text-primary" />
                  </div>
                  <p className="font-body text-sm md:text-base text-white/80">
                    {item}
                  </p>
                </motion.div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Oath Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-primary/5 to-accent/5 dark:from-primary/10 dark:to-accent/10">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeIn>
            <p className="font-mono text-xs tracking-[0.3em] text-accent mb-4">
              {manifestoPageContent.oath.label}
            </p>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-dark dark:text-white mb-8">
              {manifestoPageContent.oath.title}
            </h2>

            <div className="bg-white dark:bg-dark/80 p-8 md:p-12 rounded-lg shadow-2xl border-2 border-accent/20 mb-8">
              <p className="font-body text-lg md:text-xl text-dark/80 dark:text-white/80 leading-relaxed italic">
                &ldquo;{manifestoPageContent.oath.text}&rdquo;
              </p>
            </div>

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
                <span>Serment prononce</span>
              </motion.div>
            )}
          </FadeIn>
        </div>
      </section>

      {/* Signature Section */}
      <section className="py-16 md:py-24 bg-white dark:bg-dark/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeIn>
            <div className="w-32 h-1 bg-gradient-to-r from-primary via-accent to-primary mx-auto mb-8" />
            <p className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-dark dark:text-white mb-4">
              {manifestoPageContent.signature.text}
            </p>
            <p className="font-display text-3xl md:text-4xl font-bold text-primary italic mb-4">
              Arteral
            </p>
            <p className="font-mono text-sm text-dark/60 dark:text-white/60">
              {manifestoPageContent.signature.tagline}
            </p>
          </FadeIn>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-dark via-primary/20 to-dark text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeIn>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mb-6 md:mb-8">
              {manifestoPageContent.cta.title}
            </h2>
            <p className="font-body text-base md:text-lg text-light/80 leading-relaxed mb-8 md:mb-12 max-w-2xl mx-auto">
              {manifestoPageContent.cta.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/collection"
                className="inline-block font-body font-semibold text-base sm:text-lg px-8 sm:px-10 py-4 sm:py-5 bg-primary hover:bg-primary/90 text-white rounded-sm transition-all hover:scale-105 shadow-lg hover:shadow-xl"
              >
                {manifestoPageContent.cta.collection}
              </a>
              <a
                href="/artistes"
                className="inline-block font-body font-semibold text-base sm:text-lg px-8 sm:px-10 py-4 sm:py-5 border-2 border-white hover:bg-white hover:text-dark text-white rounded-sm transition-all hover:scale-105"
              >
                {manifestoPageContent.cta.contest}
              </a>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
