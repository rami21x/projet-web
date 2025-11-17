"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const philosophicalQuotes = [
  {
    text: "La mode est une forme d'art. C'est un reflet de notre temps.",
    author: "Yves Saint Laurent",
    theme: "Art & Mode",
  },
  {
    text: "Le chaos n'est pas l'absence d'ordre, mais un ordre que nous ne comprenons pas encore.",
    author: "Niels Bohr",
    theme: "Chaos & Ordre",
  },
  {
    text: "L'art ne reproduit pas le visible, il rend visible.",
    author: "Paul Klee",
    theme: "Art",
  },
  {
    text: "Le vêtement est une seconde peau, une architecture portée.",
    author: "Hussein Chalayan",
    theme: "Philosophie du Vêtement",
  },
  {
    text: "La beauté est la promesse du bonheur.",
    author: "Stendhal",
    theme: "Esthétique",
  },
  {
    text: "Je ne crée pas la mode, je suis la mode.",
    author: "Coco Chanel",
    theme: "Identité",
  },
  {
    text: "Dans le chaos, cherchez la simplicité. Dans la discorde, l'harmonie.",
    author: "Bruce Lee",
    theme: "Dualité",
  },
  {
    text: "L'art est le mensonge qui nous permet de comprendre la vérité.",
    author: "Pablo Picasso",
    theme: "Vérité",
  },
  {
    text: "La mode passe, le style reste.",
    author: "Coco Chanel",
    theme: "Style",
  },
  {
    text: "Tout ce qui est beau et noble est le résultat de la raison et du calcul.",
    author: "Charles Baudelaire",
    theme: "Beauté",
  },
  {
    text: "Le vêtement est l'expression la plus immédiate de l'être.",
    author: "Roland Barthes",
    theme: "Identité",
  },
  {
    text: "L'ordre naît du chaos par la main de l'artiste.",
    author: "Arteral",
    theme: "Création",
  },
  {
    text: "Porter un vêtement, c'est porter une pensée.",
    author: "Arteral",
    theme: "Philosophie Arteral",
  },
  {
    text: "L'amour et l'ennui : deux faces d'une même médaille existentielle.",
    author: "Arteral",
    theme: "Amour ↔ Ennuie",
  },
];

export default function PhilosophicalQuote() {
  const [quote, setQuote] = useState(philosophicalQuotes[0]);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Select random quote on mount
    const randomQuote =
      philosophicalQuotes[Math.floor(Math.random() * philosophicalQuotes.length)];
    setQuote(randomQuote);

    // Change quote every 15 seconds with fade animation
    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        const newQuote =
          philosophicalQuotes[
            Math.floor(Math.random() * philosophicalQuotes.length)
          ];
        setQuote(newQuote);
        setIsVisible(true);
      }, 500);
    }, 15000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-dark via-dark/95 to-primary/10 py-16 md:py-24">
      {/* Decorative Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(139, 0, 0, 0.1) 35px, rgba(139, 0, 0, 0.1) 70px)`,
          }}
        />
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isVisible ? 1 : 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          {/* Quote Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="inline-block mb-8"
          >
            <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center">
              <Quote className="w-8 h-8 text-primary" />
            </div>
          </motion.div>

          {/* Quote Text */}
          <blockquote className="mb-8">
            <p className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-relaxed mb-6 px-4">
              "{quote.text}"
            </p>
          </blockquote>

          {/* Author & Theme */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8">
            <p className="font-body text-lg md:text-xl text-primary font-semibold">
              — {quote.author}
            </p>
            <span className="hidden sm:block w-px h-6 bg-white/20" />
            <p className="font-mono text-sm md:text-base text-white/60 uppercase tracking-wider">
              {quote.theme}
            </p>
          </div>

          {/* Animated underline */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="mt-12 mx-auto w-32 h-1 bg-gradient-to-r from-transparent via-primary to-transparent"
          />
        </motion.div>
      </div>

      {/* Decorative corner elements */}
      <div className="absolute top-0 left-0 w-32 h-32 border-t-2 border-l-2 border-primary/20" />
      <div className="absolute bottom-0 right-0 w-32 h-32 border-b-2 border-r-2 border-primary/20" />
    </div>
  );
}
