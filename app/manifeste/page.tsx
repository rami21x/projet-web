"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Scroll, Feather } from "lucide-react";
import FadeIn from "@/components/FadeIn";

const manifestoText = `MANIFESTE ARTERAL

L'Art n'est pas une décoration. La Mode n'est pas une superficialité.

Nous sommes Arteral, et nous croyons que ce que vous portez influence qui vous êtes.

I. LE VÊTEMENT COMME PENSÉE

Chaque fil est une idée. Chaque couture, un argument philosophique. Nous ne créons pas des habits, nous tissons des réflexions portables. Le textile devient manifeste, la mode devient langage.

II. CHAOS ↔ ORDRE

La création naît dans le chaos. L'art émerge de la tension entre désordre et structure. Nous embrassons cette dualité : la spontanéité créative rencontre la précision artisanale. Du chaos naît la forme. De l'ordre naît la beauté.

III. AMOUR ↔ ENNUI

Passion ardente et introspection silencieuse. Deux pulsations d'un même cœur existentiel. L'amour nous consume, l'ennui nous révèle. Notre première collection explore ce paradoxe fondamental de l'existence humaine.

IV. L'ARTISTE EST ARTISAN

Nous refusons la production de masse. Chaque pièce Arteral est une collaboration artistique, une édition limitée créée avec intention. L'artisan n'est pas obsolète – il est essentiel.

V. LA MODE CONSCIENTE

Porter Arteral, c'est faire un choix. Un acte de conscience. Un refus du conformisme commercial. C'est affirmer que le style n'est pas ce que vous achetez, mais qui vous choisissez d'être.

VI. L'ART INCARNÉ

La galerie ne se limite pas aux murs blancs. Votre corps est une exposition vivante. Chaque jour, vous créez une œuvre d'art simplement en existant. Nous vous donnons les outils pour que cette œuvre soit intentionnelle.

VII. PHILOSOPHIE PORTÉE

Nietzsche sur un t-shirt n'est pas de la philosophie. Mais un vêtement qui incarne une question existentielle, qui porte en lui un paradoxe, qui vous force à réfléchir – cela est philosophique.

VIII. LA BEAUTÉ COMME RÉSISTANCE

Dans un monde d'uniformité algorithmique, la beauté intentionnelle est un acte révolutionnaire. Créer quelque chose de beau, de réfléchi, de significatif – c'est résister à la médiocrité commerciale.

IX. COLLECTION PERMANENTE

Nous ne suivons pas les tendances. Nous créons des pièces intemporelles. Votre garde-robe Arteral est une collection permanente, un musée personnel que vous construisez au fil des saisons.

X. L'INVITATION

Rejoignez-nous. Non pas comme consommateurs, mais comme collaborateurs. Comme penseurs. Comme artistes de votre propre existence.

Portez vos idées. Incarnez votre philosophie.

— ARTERAL
Mode Philosophique, Art Incarné`;

export default function ManifestePage() {
  const [displayedText, setDisplayedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (currentIndex < manifestoText.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(manifestoText.substring(0, currentIndex + 1));
        setCurrentIndex(currentIndex + 1);
      }, 10); // Speed of typing (10ms per character)

      return () => clearTimeout(timeout);
    } else {
      setIsComplete(true);
    }
  }, [currentIndex]);

  const skipToEnd = () => {
    setDisplayedText(manifestoText);
    setCurrentIndex(manifestoText.length);
    setIsComplete(true);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 md:py-32 bg-gradient-to-br from-dark via-dark/95 to-primary/20 text-white relative overflow-hidden">
        {/* Decorative elements */}
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

            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 md:mb-8">
              Le Manifeste
            </h1>
            <p className="font-body text-lg md:text-xl text-light/90 leading-relaxed max-w-3xl mx-auto mb-8">
              Notre vision, notre philosophie, notre engagement envers une mode qui
              pense et fait penser.
            </p>

            <div className="flex items-center justify-center gap-4">
              <Feather className="w-6 h-6 text-accent animate-pulse" />
              <p className="font-mono text-sm text-accent">
                {isComplete ? "Lecture complète" : "Écriture en cours..."}
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Manifesto Text Section */}
      <section className="py-16 md:py-24 bg-light dark:bg-dark/50 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-dark/80 p-8 md:p-16 rounded-lg shadow-2xl border-2 border-primary/20 relative overflow-hidden">
            {/* Decorative corner flourishes */}
            <div className="absolute top-0 left-0 w-16 h-16 border-t-4 border-l-4 border-primary/30" />
            <div className="absolute top-0 right-0 w-16 h-16 border-t-4 border-r-4 border-primary/30" />
            <div className="absolute bottom-0 left-0 w-16 h-16 border-b-4 border-l-4 border-primary/30" />
            <div className="absolute bottom-0 right-0 w-16 h-16 border-b-4 border-r-4 border-primary/30" />

            {/* Typewriter Text */}
            <div className="relative z-10">
              <pre className="font-body text-sm md:text-base lg:text-lg text-dark dark:text-white leading-relaxed whitespace-pre-wrap">
                {displayedText}
                {!isComplete && (
                  <motion.span
                    animate={{ opacity: [1, 0] }}
                    transition={{ duration: 0.8, repeat: Infinity }}
                    className="inline-block w-0.5 h-6 bg-primary ml-1"
                  />
                )}
              </pre>

              {/* Skip Button */}
              {!isComplete && (
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 2 }}
                  onClick={skipToEnd}
                  className="mt-8 font-body text-sm text-primary hover:text-accent underline transition-colors"
                >
                  Passer directement à la fin →
                </motion.button>
              )}
            </div>
          </div>

          {/* Signature */}
          {isComplete && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-12 text-center"
            >
              <div className="inline-block">
                <div className="w-32 h-1 bg-gradient-to-r from-primary via-accent to-primary mb-6" />
                <p className="font-display text-2xl md:text-3xl font-bold text-primary dark:text-accent italic">
                  Arteral
                </p>
                <p className="font-mono text-sm text-dark/60 dark:text-white/60 mt-2">
                  Mode Philosophique · Art Incarné
                </p>
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      {isComplete && (
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="py-16 md:py-24 bg-gradient-to-br from-dark via-primary/20 to-dark text-white"
        >
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mb-6 md:mb-8">
              Prêt à incarner la philosophie ?
            </h2>
            <p className="font-body text-base md:text-lg text-light/80 leading-relaxed mb-8 md:mb-12 max-w-2xl mx-auto">
              Explorez notre collection et découvrez comment la mode devient pensée.
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
                Participer au concours
              </a>
            </div>
          </div>
        </motion.section>
      )}
    </div>
  );
}
