"use client";

import { motion } from "framer-motion";
import { useContent } from "@/hooks/useContent";
import FadeIn from "@/components/FadeIn";
import NotifyMeButton from "@/components/NotifyMeButton";

export default function CollectionPage() {
  const { collectionContent } = useContent();

  return (
    <div>
      {/* Header Section */}
      <section className="py-20 md:py-32 bg-gradient-to-br from-primary/10 via-light to-accent/10 dark:from-primary/20 dark:via-light dark:to-accent/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeIn>
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-dark dark:text-dark mb-4 md:mb-6">
              {collectionContent.title}
            </h1>
            <p className="font-body text-lg md:text-xl text-dark/80 dark:text-dark/80 mb-8 md:mb-12">
              {collectionContent.subtitle}
            </p>
            <p className="font-body text-base md:text-lg text-dark/70 dark:text-dark/70 leading-relaxed whitespace-pre-line max-w-3xl mx-auto mb-8">
              {collectionContent.description}
            </p>
            <NotifyMeButton />
          </FadeIn>
        </div>
      </section>

      {/* Moodboard Central - 3 Column Layout */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {/* LEFT - Amour */}
            <FadeIn delay={0}>
              <div className="bg-gradient-to-br from-primary/5 to-primary/10 p-8 md:p-10 rounded-lg border-2 border-primary/20 hover:border-primary/40 transition-all duration-300">
                <h2 className="font-display text-3xl md:text-4xl font-bold text-primary mb-3">
                  {collectionContent.moodboard.amour.title}
                </h2>
                <p className="font-body text-lg md:text-xl text-dark/70 mb-6">
                  {collectionContent.moodboard.amour.subtitle}
                </p>
                <ul className="space-y-3">
                  {collectionContent.moodboard.amour.points.map((point) => (
                    <li
                      key={point}
                      className="flex items-center gap-3 font-body text-sm md:text-base text-dark/80"
                    >
                      <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0" />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>

            {/* CENTER - Artwork Placeholder */}
            <FadeIn delay={0.2}>
              <div className="bg-gradient-to-br from-dark to-dark/90 p-8 md:p-10 rounded-lg flex items-center justify-center min-h-[400px] relative overflow-hidden group">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(139,0,0,0.3),transparent_70%)] opacity-50" />
                <div className="relative z-10 text-center text-white">
                  <div className="w-32 h-32 md:w-40 md:h-40 mx-auto mb-6 border-4 border-white/30 rounded-full flex items-center justify-center">
                    <div className="w-24 h-24 md:w-32 md:h-32 border-2 border-white/50 rounded-full" />
                  </div>
                  <p className="font-display text-xl md:text-2xl font-bold">
                    AMOUR ↔ ENNUIE
                  </p>
                  <p className="font-body text-sm md:text-base text-light/80 mt-2">
                    Artwork surréaliste minimaliste
                  </p>
                </div>
              </div>
            </FadeIn>

            {/* RIGHT - Ennuie */}
            <FadeIn delay={0.4}>
              <div className="bg-gradient-to-br from-dark/5 to-dark/10 p-8 md:p-10 rounded-lg border-2 border-dark/20 hover:border-dark/40 transition-all duration-300">
                <h2 className="font-display text-3xl md:text-4xl font-bold text-dark mb-3">
                  {collectionContent.moodboard.ennuie.title}
                </h2>
                <p className="font-body text-lg md:text-xl text-dark/70 mb-6">
                  {collectionContent.moodboard.ennuie.subtitle}
                </p>
                <ul className="space-y-3">
                  {collectionContent.moodboard.ennuie.points.map((point) => (
                    <li
                      key={point}
                      className="flex items-center gap-3 font-body text-sm md:text-base text-dark/80"
                    >
                      <div className="w-2 h-2 bg-dark rounded-full flex-shrink-0" />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* 6 Elements Section */}
      <section className="py-16 md:py-24 bg-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-center text-dark mb-12 md:mb-16">
              Éléments de la Série
            </h2>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {collectionContent.elements.map((element, index) => {
              const colorClasses = {
                primary: "bg-primary/10 border-primary/30 hover:border-primary/50",
                dark: "bg-dark/5 border-dark/20 hover:border-dark/40",
                accent: "bg-accent/10 border-accent/30 hover:border-accent/50",
              };

              return (
                <FadeIn key={element.title} delay={index * 0.1}>
                  <div
                    className={`p-6 md:p-8 rounded-lg border-2 transition-all duration-300 hover:shadow-lg ${
                      colorClasses[element.color as keyof typeof colorClasses]
                    }`}
                  >
                    <h3 className="font-display text-xl md:text-2xl font-bold text-dark mb-3">
                      {element.title}
                    </h3>
                    <p className="font-body text-sm md:text-base text-dark/70 leading-relaxed">
                      {element.content}
                    </p>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* Process Timeline */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-center text-dark mb-12 md:mb-16">
              Processus de Création
            </h2>
          </FadeIn>

          <div className="space-y-6 md:space-y-8">
            {collectionContent.timeline.map((item, index) => (
              <FadeIn key={item.step} delay={index * 0.1}>
                <div className="flex items-start gap-4 md:gap-6 group">
                  <div className="flex-shrink-0 w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center text-white font-bold text-lg md:text-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                    {item.step}
                  </div>
                  <div className="flex-1 bg-light p-4 md:p-6 rounded-lg group-hover:shadow-md transition-all duration-300">
                    <h3 className="font-display text-xl md:text-2xl font-bold text-dark mb-2">
                      {item.title}
                    </h3>
                    <p className="font-body text-sm md:text-base text-dark/70">
                      {item.description}
                    </p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-dark via-dark/95 to-primary/20 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <blockquote className="text-center">
              <p className="font-display text-2xl sm:text-3xl md:text-4xl font-bold italic leading-relaxed mb-6 md:mb-8">
                "{collectionContent.quote.text}"
              </p>
              <footer className="font-body text-lg md:text-xl text-light/80">
                — {collectionContent.quote.author}
              </footer>
            </blockquote>
          </FadeIn>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-light">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeIn>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-dark mb-6 md:mb-8">
              Découvrez plus
            </h2>
            <p className="font-body text-base md:text-lg text-dark/70 leading-relaxed mb-8 md:mb-12 max-w-2xl mx-auto">
              Explorez les artistes derrière Amour ↔ Ennuie et découvrez
              le processus complet de création.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/artistes"
                className="inline-block font-body font-semibold text-base sm:text-lg px-8 sm:px-10 py-4 sm:py-5 bg-primary hover:bg-primary/90 text-white rounded-sm transition-all hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Voir les artistes
              </a>
              <a
                href="/processus"
                className="inline-block font-body font-semibold text-base sm:text-lg px-8 sm:px-10 py-4 sm:py-5 border-2 border-dark hover:bg-dark hover:text-white text-dark rounded-sm transition-all hover:scale-105"
              >
                Explorer le processus
              </a>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
