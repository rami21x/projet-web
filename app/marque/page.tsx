"use client";

import { motion } from "framer-motion";
import { MapPin, Quote, ArrowRight, Sparkles, Eye, Heart, Users, Paintbrush, FileText } from "lucide-react";
import { useContent } from "@/hooks/useContent";
import FadeIn from "@/components/FadeIn";
import Image from "next/image";

export default function MarquePage() {
  const { brandPageContent } = useContent();

  return (
    <div className="bg-light dark:bg-dark">
      {/* Hero Section */}
      <section className="py-20 md:py-32 bg-gradient-to-br from-dark via-dark/95 to-accent/20 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(160, 82, 45, 0.1) 35px, rgba(160, 82, 45, 0.1) 70px)`,
            }}
          />
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <FadeIn>
            <p className="font-mono text-xs md:text-sm tracking-[0.3em] text-accent mb-6">
              {brandPageContent.hero.label}
            </p>
            <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6">
              {brandPageContent.hero.title}
            </h1>
            <p className="font-display text-xl md:text-2xl text-light/90 mb-8">
              {brandPageContent.hero.subtitle}
            </p>
            <p className="font-body text-base md:text-lg text-light/80 leading-relaxed max-w-2xl mx-auto">
              {brandPageContent.hero.description}
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 md:py-24 bg-light dark:bg-dark">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="text-center mb-12 md:mb-16">
              <p className="font-mono text-xs tracking-[0.3em] text-accent mb-4">
                {brandPageContent.story.label}
              </p>
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-dark dark:text-white">
                {brandPageContent.story.title}
              </h2>
            </div>
          </FadeIn>

          <div className="space-y-8 md:space-y-12">
            {brandPageContent.story.chapters.map((chapter: { title: string; text: string }, index: number) => (
              <FadeIn key={chapter.title} delay={index * 0.15}>
                <div className="relative pl-8 md:pl-12 border-l-2 border-accent/30">
                  <div className="absolute left-0 top-0 w-4 h-4 -translate-x-[9px] bg-accent rounded-full" />
                  <h3 className="font-display text-xl md:text-2xl font-bold text-dark dark:text-white mb-3">
                    {chapter.title}
                  </h3>
                  <p className="font-body text-base md:text-lg text-dark/70 dark:text-white/70 leading-relaxed">
                    {chapter.text}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Founders Section */}
      <section className="py-16 md:py-24 bg-white dark:bg-dark/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="text-center mb-12 md:mb-16">
              <p className="font-mono text-xs tracking-[0.3em] text-accent mb-4">
                {brandPageContent.founders.label}
              </p>
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-dark dark:text-white">
                {brandPageContent.founders.title}
              </h2>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mb-12">
            {brandPageContent.founders.profiles.map((founder: { name: string; role: string; origin: string; bio: string; quote: string }, index: number) => (
              <FadeIn key={founder.name} delay={index * 0.2}>
                <div className="bg-light dark:bg-dark/80 p-6 md:p-8 rounded-lg border-2 border-accent/20 hover:border-accent/40 transition-all duration-300">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center text-white font-bold text-lg">
                      {founder.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="font-display text-xl md:text-2xl font-bold text-dark dark:text-white">
                        {founder.name}
                      </h3>
                      <p className="font-body text-sm text-accent font-semibold">
                        {founder.role}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mb-4 text-dark/50 dark:text-white/50">
                    <MapPin className="w-4 h-4" />
                    <span className="font-mono text-xs tracking-wider">{founder.origin}</span>
                  </div>

                  <p className="font-body text-sm md:text-base text-dark/70 dark:text-white/70 leading-relaxed mb-6">
                    {founder.bio}
                  </p>

                  <div className="bg-accent/10 p-4 rounded-lg border-l-4 border-accent">
                    <Quote className="w-5 h-5 text-accent mb-2" />
                    <p className="font-body text-sm italic text-dark/80 dark:text-white/80">
                      &ldquo;{founder.quote}&rdquo;
                    </p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={0.4}>
            <div className="text-center max-w-3xl mx-auto">
              <p className="font-body text-base md:text-lg text-dark/80 dark:text-white/80 leading-relaxed italic">
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
      <section className="py-16 md:py-24 bg-light dark:bg-dark">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="text-center mb-12 md:mb-16">
              <p className="font-mono text-xs tracking-[0.3em] text-accent mb-4">
                {brandPageContent.vision.label}
              </p>
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-dark dark:text-white">
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
                  <div className="text-center p-6 md:p-8 bg-white dark:bg-dark/60 rounded-lg hover:shadow-lg transition-all duration-300 group">
                    <div className="w-16 h-16 mx-auto mb-6 bg-primary/10 group-hover:bg-primary/20 rounded-full flex items-center justify-center transition-all">
                      <Icon className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="font-display text-xl md:text-2xl font-bold text-dark dark:text-white mb-3">
                      {item.title}
                    </h3>
                    <p className="font-body text-sm md:text-base text-dark/70 dark:text-white/70 leading-relaxed">
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
      <section className="py-16 md:py-24 bg-white dark:bg-dark/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="text-center mb-12 md:mb-16">
              <p className="font-mono text-xs tracking-[0.3em] text-accent mb-4">
                {brandPageContent.commitments.label}
              </p>
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-dark dark:text-white">
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
                  <div className="relative p-6 md:p-8 bg-light dark:bg-dark/80 rounded-lg border-l-4 border-accent">
                    <div className="absolute -top-3 -left-3 w-10 h-10 bg-accent rounded-full flex items-center justify-center">
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="font-display text-lg md:text-xl font-bold text-dark dark:text-white mb-3 mt-2">
                      {item.title}
                    </h3>
                    <p className="font-body text-sm md:text-base text-dark/70 dark:text-white/70 leading-relaxed">
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
      <section className="py-16 md:py-24 bg-gradient-to-br from-dark/5 to-primary/5 dark:from-dark/80 dark:to-primary/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="text-center mb-12 md:mb-16">
              <p className="font-mono text-xs tracking-[0.3em] text-accent mb-4">
                {brandPageContent.gallery.label}
              </p>
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-dark dark:text-white">
                {brandPageContent.gallery.title}
              </h2>
            </div>
          </FadeIn>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {brandPageContent.gallery.images.map((image: { src: string; alt: string }, index: number) => (
              <FadeIn key={image.alt} delay={index * 0.1}>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="aspect-square bg-dark/10 dark:bg-white/10 rounded-lg overflow-hidden relative group"
                >
                  <div className="absolute inset-0 flex items-center justify-center text-dark/30 dark:text-white/30 font-body text-sm">
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
