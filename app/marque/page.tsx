"use client";

import { motion } from "framer-motion";
import { CircleDot, Moon, Flame, Check } from "lucide-react";
import { useContent } from "@/hooks/useContent";
import FadeIn from "@/components/FadeIn";
import type { Metadata } from "next";

const iconMap = {
  "Yin Yang": CircleDot,
  Moon: Moon,
  Flame: Flame,
};

export default function MarquePage() {
  const { aboutContent, brandPageContent } = useContent();

  return (
    <div className="bg-light dark:bg-dark">
      {/* Hero Section */}
      <section className="py-20 md:py-32 bg-gradient-to-br from-dark to-dark/95 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeIn>
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold mb-4 md:mb-6">
              {aboutContent.vision.title}
            </h1>
            <p className="font-body text-xl md:text-2xl text-light/90 mb-8 md:mb-12">
              {aboutContent.vision.subtitle}
            </p>
            <p className="font-body text-base md:text-lg text-light/95 leading-relaxed whitespace-pre-line max-w-2xl mx-auto">
              {aboutContent.vision.description}
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-16 md:py-24 bg-light dark:bg-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-center text-dark dark:text-white mb-12 md:mb-16">
              {brandPageContent.philosophySection.title}
            </h2>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {aboutContent.philosophy.map((item, index) => {
              const Icon = iconMap[item.icon as keyof typeof iconMap];
              return (
                <FadeIn key={item.title} delay={index * 0.2}>
                  <div className="text-center group p-6 md:p-8 rounded-lg hover:bg-white dark:hover:bg-dark/60 transition-all duration-300 hover:shadow-lg">
                    <div className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 mb-6 bg-primary/10 group-hover:bg-primary/20 rounded-full transition-all duration-300">
                      <Icon className="w-8 h-8 md:w-10 md:h-10 text-primary" />
                    </div>
                    <h3 className="font-display text-2xl md:text-3xl font-bold text-dark dark:text-white mb-2">
                      {item.title}
                    </h3>
                    <p className="font-body text-sm md:text-base font-semibold text-accent mb-3">
                      {item.subtitle}
                    </p>
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

      {/* Creative Process Section */}
      <section className="py-16 md:py-24 bg-white dark:bg-dark/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-center text-dark dark:text-white mb-12 md:mb-16">
              {brandPageContent.processSection.title}
            </h2>
          </FadeIn>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 md:gap-8">
            {aboutContent.processSteps.map((step, index) => (
              <FadeIn key={step.title} delay={index * 0.1}>
                <div className="text-center">
                  <div className="relative mb-4">
                    <div className="w-12 h-12 md:w-16 md:h-16 mx-auto bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center text-white font-bold text-lg md:text-xl">
                      {index + 1}
                    </div>
                    {index < aboutContent.processSteps.length - 1 && (
                      <div className="hidden lg:block absolute top-1/2 left-full w-full h-0.5 bg-dark/10 dark:bg-white/10 -translate-y-1/2" />
                    )}
                  </div>
                  <h4 className="font-body font-semibold text-sm md:text-base text-dark dark:text-white mb-1">
                    {step.title}
                  </h4>
                  <p className="font-body text-xs md:text-sm text-dark/60 dark:text-white/60">
                    {step.description}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-dark/5 to-primary/5 dark:from-dark/80 dark:to-primary/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-center text-dark dark:text-white mb-12 md:mb-16">
              {brandPageContent.valuesSection.title}
            </h2>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {aboutContent.values.map((value, index) => (
              <FadeIn key={value.title} delay={index * 0.15}>
                <div className="bg-white dark:bg-dark/60 p-6 md:p-8 rounded-lg hover:shadow-lg transition-all duration-300 group">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-primary/10 group-hover:bg-primary/20 rounded-full flex items-center justify-center transition-all duration-300">
                      <Check className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-display text-xl md:text-2xl font-bold text-dark dark:text-white mb-2">
                        {value.title}
                      </h3>
                      <p className="font-body text-sm md:text-base text-dark/70 dark:text-white/70 leading-relaxed">
                        {value.description}
                      </p>
                    </div>
                  </div>
                </div>
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
            <p className="font-body text-base md:text-lg text-light/95 leading-relaxed mb-8 md:mb-12 max-w-2xl mx-auto">
              {brandPageContent.cta.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/collection"
                className="inline-block font-body font-semibold text-base sm:text-lg px-8 sm:px-10 py-4 sm:py-5 bg-primary hover:bg-primary/90 text-white rounded-sm transition-all hover:scale-105 shadow-lg hover:shadow-xl"
              >
                {brandPageContent.cta.collection}
              </a>
              <a
                href="/artistes"
                className="inline-block font-body font-semibold text-base sm:text-lg px-8 sm:px-10 py-4 sm:py-5 border-2 border-white hover:bg-white hover:text-dark text-white rounded-sm transition-all hover:scale-105"
              >
                {brandPageContent.cta.artists}
              </a>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
