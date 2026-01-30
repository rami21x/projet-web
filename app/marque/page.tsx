"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { MapPin, Quote, ArrowRight, Sparkles, Eye, Heart, Users, Paintbrush, FileText } from "lucide-react";
import { useContent } from "@/hooks/useContent";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import FadeIn from "@/components/FadeIn";

// Dynamic Hero Image Component - Changes based on light/dark mode with Glitch Effect
function HeroImage() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a1a] via-[#2a2a2a] to-[#8B0000]/30" />
    );
  }

  const isDark = resolvedTheme === "dark";
  const imageSrc = isDark ? "/images/brand-hero-dark.png" : "/images/brand-hero-light.png";

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={resolvedTheme}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        className="absolute inset-0"
      >
        {/* Image de fond */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url('${imageSrc}')` }}
        />

        {/* Scanlines subtiles */}
        <div
          className="absolute inset-0 pointer-events-none opacity-30"
          style={{
            background: `repeating-linear-gradient(
              0deg,
              transparent,
              transparent 2px,
              rgba(0, 0, 0, 0.03) 2px,
              rgba(0, 0, 0, 0.03) 4px
            )`
          }}
        />

        {/* Vignette */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.4) 100%)" }}
        />

        {/* Overlay adapté au mode */}
        <div className={`absolute inset-0 ${
          isDark
            ? "bg-gradient-to-b from-black/40 via-transparent to-black/60"
            : "bg-gradient-to-b from-white/10 via-transparent to-black/40"
        }`} />
      </motion.div>
    </AnimatePresence>
  );
}

export default function MarquePage() {
  const { brandPageContent } = useContent();

  return (
    <div className="bg-[#E8E8E8] dark:bg-[#0A0A0A]">
      {/* Hero Section - Design minimaliste et artistique */}
      <section className="relative min-h-[50vh] md:min-h-[70vh] lg:min-h-[80vh] flex items-end justify-center overflow-hidden">
        {/* Dynamic Background Image */}
        <HeroImage />

        {/* Éléments décoratifs subtils */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          transition={{ duration: 1.5, delay: 0.5 }}
          className="absolute top-12 left-12 w-20 h-20 border-l border-t border-white/30"
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          transition={{ duration: 1.5, delay: 0.5 }}
          className="absolute bottom-32 right-12 w-20 h-20 border-r border-b border-white/30"
        />

        {/* Contenu minimaliste en bas */}
        <div className="relative z-10 w-full pb-16 md:pb-24">
          <div className="max-w-6xl mx-auto px-6 md:px-12">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="flex flex-col md:flex-row md:items-end md:justify-between gap-6"
            >
              {/* Titre principal uniquement */}
              <div>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                  className="font-mono text-xs tracking-[0.4em] text-accent/90 mb-4"
                >
                  {brandPageContent.hero.label}
                </motion.p>
                <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white tracking-tight">
                  {brandPageContent.hero.title}
                </h1>
              </div>

              {/* Ligne animée verticale */}
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: "80px" }}
                transition={{ duration: 1.2, delay: 0.8 }}
                className="hidden md:block w-px bg-gradient-to-b from-transparent via-accent to-transparent"
              />

              {/* Scroll indicator */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.6 }}
                transition={{ duration: 1, delay: 1.2 }}
                className="flex items-center gap-3"
              >
                <span className="font-mono text-xs text-white/60 tracking-wider">SCROLL</span>
                <motion.div
                  animate={{ y: [0, 8, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="w-px h-8 bg-white/40"
                />
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Ligne accent en bas */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.5, delay: 0.5 }}
          className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent origin-left"
        />
      </section>

      {/* Story Section */}
      <section className="py-16 md:py-24 bg-[#E8E8E8] dark:bg-[#0A0A0A]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="text-center mb-12 md:mb-16">
              <p className="font-mono text-xs tracking-[0.3em] text-accent mb-4">
                {brandPageContent.story.label}
              </p>
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-[#2B2B2B] dark:text-white">
                {brandPageContent.story.title}
              </h2>
            </div>
          </FadeIn>

          <div className="space-y-8 md:space-y-12">
            {brandPageContent.story.chapters.map((chapter: { title: string; text: string }, index: number) => (
              <FadeIn key={chapter.title} delay={index * 0.15}>
                <div className="relative pl-8 md:pl-12 border-l-2 border-accent/30">
                  <div className="absolute left-0 top-0 w-4 h-4 -translate-x-[9px] bg-accent rounded-full" />
                  <h3 className="font-display text-xl md:text-2xl font-bold text-[#2B2B2B] dark:text-white mb-3">
                    {chapter.title}
                  </h3>
                  <p className="font-body text-base md:text-lg text-[#4A4A4A] dark:text-gray-300 leading-relaxed">
                    {chapter.text}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Founders Section */}
      <section className="py-16 md:py-24 bg-white dark:bg-[#1A1A1A]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="text-center mb-12 md:mb-16">
              <p className="font-mono text-xs tracking-[0.3em] text-accent mb-4">
                {brandPageContent.founders.label}
              </p>
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-[#2B2B2B] dark:text-white mb-6">
                {brandPageContent.founders.title}
              </h2>
              <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mb-6" />
              <p className="font-display text-lg md:text-xl italic text-[#4A4A4A] dark:text-gray-300 max-w-xl mx-auto">
                &ldquo;{brandPageContent.founders.citation}&rdquo;
              </p>
            </div>
          </FadeIn>

          {/* Photo des fondateurs ensemble */}
          <FadeIn delay={0.1}>
            <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-center mb-16">
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.4 }}
                className="w-full md:w-5/12 relative overflow-hidden rounded-sm group"
              >
                <div className="relative aspect-[4/5]">
                  <Image
                    src={brandPageContent.founders.image}
                    alt="Soheil & Rami — Fondateurs d'Arteral"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 42vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6">
                    <p className="font-display text-2xl font-bold text-white">Soheil & Rami</p>
                    <p className="font-mono text-[10px] tracking-[0.3em] text-white/60 mt-1">FONDATEURS</p>
                  </div>
                </div>
              </motion.div>

              <div className="w-full md:w-7/12 space-y-8">
                {brandPageContent.founders.profiles.map((founder: { name: string; role: string; origin: string; description: string; quote: string }, index: number) => (
                  <FadeIn key={founder.name} delay={0.2 + index * 0.15}>
                    <div className="relative">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center text-white font-bold text-sm">
                          {founder.name.charAt(0)}
                        </div>
                        <div>
                          <h3 className="font-display text-xl font-bold text-[#2B2B2B] dark:text-white">
                            {founder.name}
                          </h3>
                          <p className="font-mono text-[10px] tracking-wider text-accent">
                            {founder.role}
                          </p>
                        </div>
                        <span className="ml-auto flex items-center gap-1 text-[#6A6A6A] dark:text-gray-500">
                          <MapPin className="w-3 h-3" />
                          <span className="font-mono text-[10px] tracking-wider">{founder.origin}</span>
                        </span>
                      </div>

                      <p className="font-body text-sm md:text-base text-[#4A4A4A] dark:text-gray-300 leading-relaxed mb-3 pl-[52px]">
                        {founder.description}
                      </p>

                      <blockquote className="pl-[52px] border-l-2 border-primary/30 ml-0">
                        <p className="font-body text-sm italic text-[#3A3A3A] dark:text-gray-200 pl-4">
                          &ldquo;{founder.quote}&rdquo;
                        </p>
                      </blockquote>
                    </div>
                  </FadeIn>
                ))}
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.4}>
            <div className="text-center max-w-2xl mx-auto">
              <div className="w-8 h-[1px] bg-primary mx-auto mb-6" />
              <p className="font-body text-base md:text-lg text-[#3A3A3A] dark:text-gray-200 leading-relaxed">
                {brandPageContent.founders.sharedVision}
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Manifesto Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-dark to-primary/20 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 25% 25%, rgba(160, 82, 45, 0.3) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(139, 0, 0, 0.3) 0%, transparent 50%)`,
            }}
          />
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <FadeIn>
            <p className="font-mono text-xs tracking-[0.3em] text-accent mb-8">
              {brandPageContent.manifesto.label}
            </p>
            <div className="mb-8">
              <Quote className="w-12 h-12 text-accent/60 mx-auto mb-6" />
              <p className="font-display text-xl sm:text-2xl md:text-3xl font-bold leading-relaxed">
                {brandPageContent.manifesto.quote}
              </p>
            </div>
            <a
              href="/manifeste"
              className="inline-flex items-center gap-2 font-body font-semibold text-accent hover:text-white transition-colors"
            >
              <span>{brandPageContent.manifesto.cta}</span>
              <ArrowRight className="w-5 h-5" />
            </a>
          </FadeIn>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-16 md:py-24 bg-[#E8E8E8] dark:bg-[#0A0A0A]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="text-center mb-12 md:mb-16">
              <p className="font-mono text-xs tracking-[0.3em] text-accent mb-4">
                {brandPageContent.vision.label}
              </p>
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-[#2B2B2B] dark:text-white">
                {brandPageContent.vision.title}
              </h2>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {brandPageContent.vision.items.map((item: { title: string; description: string }, index: number) => {
              const icons = [Sparkles, Eye, Heart];
              const Icon = icons[index % icons.length];
              return (
                <FadeIn key={item.title} delay={index * 0.15}>
                  <div className="text-center p-6 md:p-8 bg-white dark:bg-[#1A1A1A] rounded-lg hover:shadow-lg transition-all duration-300 group">
                    <div className="w-16 h-16 mx-auto mb-6 bg-primary/10 group-hover:bg-primary/20 rounded-full flex items-center justify-center transition-all">
                      <Icon className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="font-display text-xl md:text-2xl font-bold text-[#2B2B2B] dark:text-white mb-3">
                      {item.title}
                    </h3>
                    <p className="font-body text-sm md:text-base text-[#4A4A4A] dark:text-gray-300 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* Commitments Section */}
      <section className="py-16 md:py-24 bg-white dark:bg-[#1A1A1A]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="text-center mb-12 md:mb-16">
              <p className="font-mono text-xs tracking-[0.3em] text-accent mb-4">
                {brandPageContent.commitments.label}
              </p>
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-[#2B2B2B] dark:text-white">
                {brandPageContent.commitments.title}
              </h2>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {brandPageContent.commitments.items.map((item: { title: string; description: string }, index: number) => {
              const icons = [Paintbrush, FileText, Users];
              const Icon = icons[index % icons.length];
              return (
                <FadeIn key={item.title} delay={index * 0.15}>
                  <div className="relative p-6 md:p-8 bg-[#F5F5F5] dark:bg-[#1A1A1A] rounded-lg border-l-4 border-accent">
                    <div className="absolute -top-3 -left-3 w-10 h-10 bg-accent rounded-full flex items-center justify-center">
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="font-display text-lg md:text-xl font-bold text-[#2B2B2B] dark:text-white mb-3 mt-2">
                      {item.title}
                    </h3>
                    <p className="font-body text-sm md:text-base text-[#4A4A4A] dark:text-gray-300 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-16 md:py-24 bg-[#F0F0F0] dark:bg-[#0A0A0A]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="text-center mb-12 md:mb-16">
              <p className="font-mono text-xs tracking-[0.3em] text-accent mb-4">
                {brandPageContent.gallery.label}
              </p>
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-[#2B2B2B] dark:text-white">
                {brandPageContent.gallery.title}
              </h2>
            </div>
          </FadeIn>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {brandPageContent.gallery.images.map((image: { src: string; alt: string }, index: number) => (
              <FadeIn key={image.alt} delay={index * 0.1}>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="aspect-square bg-[#2B2B2B]/10 dark:bg-white/10 rounded-lg overflow-hidden relative group"
                >
                  <div className="absolute inset-0 flex items-center justify-center text-[#5A5A5A] dark:text-gray-400 font-body text-sm">
                    {image.alt}
                  </div>
                  <div className="absolute inset-0 bg-accent/0 group-hover:bg-accent/20 transition-colors duration-300" />
                </motion.div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-dark text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeIn>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mb-6 md:mb-8">
              {brandPageContent.cta.title}
            </h2>
            <p className="font-body text-base md:text-lg text-light/90 leading-relaxed mb-10 md:mb-12 max-w-2xl mx-auto">
              {brandPageContent.cta.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/collection"
                className="inline-flex items-center justify-center gap-2 font-body font-semibold text-base sm:text-lg px-8 sm:px-10 py-4 sm:py-5 bg-primary hover:bg-primary/90 text-white rounded-sm transition-all hover:scale-105 shadow-lg hover:shadow-xl"
              >
                <span>{brandPageContent.cta.collection}</span>
                <ArrowRight className="w-5 h-5" />
              </a>
              <a
                href="/artistes"
                className="inline-block font-body font-semibold text-base sm:text-lg px-8 sm:px-10 py-4 sm:py-5 border-2 border-white hover:bg-white hover:text-dark text-white rounded-sm transition-all hover:scale-105"
              >
                {brandPageContent.cta.contest}
              </a>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
