"use client";

import { BookOpen, Users, Shirt, Film } from "lucide-react";
import { useContent } from "@/hooks/useContent";
import FadeIn from "@/components/FadeIn";

const iconMap = {
  0: BookOpen,
  1: Users,
  2: Shirt,
  3: Film,
};

export default function ProcessusPage() {
  const { processContent } = useContent();

  return (
    <div>
      {/* Hero Section */}
      <section className="py-20 md:py-32 bg-gradient-to-br from-dark to-dark/95 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeIn>
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 md:mb-8">
              Processus de Création
            </h1>
            <p className="font-body text-lg md:text-xl text-light/90 leading-relaxed max-w-3xl mx-auto">
              De la philosophie au vêtement : découvrez comment nous transformons
              des concepts abstraits en pièces tangibles et porteuses de sens.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Process Sections */}
      <section className="py-16 md:py-24 bg-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-16 md:space-y-24">
            {processContent.sections.map((section, index) => {
              const Icon = iconMap[index as keyof typeof iconMap];
              const isEven = index % 2 === 0;

              return (
                <FadeIn key={section.title} delay={index * 0.1}>
                  <div
                    className={`grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center ${
                      !isEven ? "lg:grid-flow-dense" : ""
                    }`}
                  >
                    {/* Icon/Visual Column */}
                    <div
                      className={`${
                        !isEven ? "lg:col-start-2" : ""
                      } bg-gradient-to-br from-primary/10 to-accent/10 p-12 md:p-16 rounded-lg flex items-center justify-center min-h-[300px]`}
                    >
                      <div className="text-center">
                        <div className="inline-flex items-center justify-center w-24 h-24 md:w-32 md:h-32 mb-6 bg-white rounded-full shadow-lg">
                          {Icon && (
                            <Icon className="w-12 h-12 md:w-16 md:h-16 text-primary" />
                          )}
                        </div>
                        <p className="font-display text-xl md:text-2xl font-bold text-dark">
                          Étape {index + 1}
                        </p>
                      </div>
                    </div>

                    {/* Content Column */}
                    <div className={!isEven ? "lg:col-start-1 lg:row-start-1" : ""}>
                      <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-dark mb-4 md:mb-6">
                        {section.title}
                      </h2>
                      <p className="font-body text-base md:text-lg text-dark/70 leading-relaxed mb-6 md:mb-8">
                        {section.description}
                      </p>

                      {/* Subsections */}
                      {section.subsections && (
                        <ul className="space-y-3">
                          {section.subsections.map((subsection) => (
                            <li
                              key={subsection}
                              className="flex items-start gap-3 font-body text-sm md:text-base text-dark/80"
                            >
                              <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0 mt-2" />
                              {subsection}
                            </li>
                          ))}
                        </ul>
                      )}

                      {/* Steps */}
                      {section.steps && (
                        <div className="space-y-3">
                          {section.steps.map((step, stepIndex) => (
                            <div
                              key={step}
                              className="flex items-center gap-4 bg-white p-4 rounded-lg"
                            >
                              <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center text-white text-sm font-bold">
                                {stepIndex + 1}
                              </div>
                              <p className="font-body text-sm md:text-base text-dark/80">
                                {step}
                              </p>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Details */}
                      {section.details && (
                        <ul className="space-y-3">
                          {section.details.map((detail) => (
                            <li
                              key={detail}
                              className="flex items-start gap-3 font-body text-sm md:text-base text-dark/80"
                            >
                              <div className="w-2 h-2 bg-accent rounded-full flex-shrink-0 mt-2" />
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

      {/* Timeline Overview */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-center text-dark mb-12 md:mb-16">
              De l'idée au vêtement
            </h2>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {processContent.sections.map((section, index) => {
              const Icon = iconMap[index as keyof typeof iconMap];
              return (
                <FadeIn key={section.title} delay={index * 0.15}>
                  <div className="text-center group">
                    <div className="relative mb-6">
                      <div className="w-16 h-16 md:w-20 md:h-20 mx-auto bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300">
                        {Icon && <Icon className="w-8 h-8 md:w-10 md:h-10" />}
                      </div>
                      {index < processContent.sections.length - 1 && (
                        <div className="hidden lg:block absolute top-1/2 left-full w-full h-0.5 bg-dark/10 -translate-y-1/2" />
                      )}
                    </div>
                    <h3 className="font-display text-lg md:text-xl font-bold text-dark mb-2">
                      {section.title}
                    </h3>
                    <p className="font-body text-xs md:text-sm text-dark/60 line-clamp-3">
                      {section.description}
                    </p>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-dark via-dark/95 to-primary/20 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeIn>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mb-6 md:mb-8">
              Découvrez le résultat
            </h2>
            <p className="font-body text-base md:text-lg text-light/80 leading-relaxed mb-8 md:mb-12 max-w-2xl mx-auto">
              Tout ce processus aboutit à la collection Amour ↔ Ennuie.
              Explorez les pièces finales et découvrez les artistes qui
              les ont créées.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/collection"
                className="inline-block font-body font-semibold text-base sm:text-lg px-8 sm:px-10 py-4 sm:py-5 bg-primary hover:bg-primary/90 text-white rounded-sm transition-all hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Voir la collection
              </a>
              <a
                href="/artistes"
                className="inline-block font-body font-semibold text-base sm:text-lg px-8 sm:px-10 py-4 sm:py-5 border-2 border-white hover:bg-white hover:text-dark text-white rounded-sm transition-all hover:scale-105"
              >
                Rencontrer les artistes
              </a>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
