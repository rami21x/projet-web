"use client";

import { motion } from "framer-motion";
import FadeIn from "@/components/FadeIn";
import NotifyMeButton from "@/components/NotifyMeButton";
import Link from "next/link";

// Citations philosophiques sur le paradoxe et Narcisse
const citations = [
  {
    text: "Je me cherche dans l'autre pour me trouver moi-même.",
    author: "Oscar Wilde",
  },
  {
    text: "L'amour de soi est le commencement d'une romance qui dure toute la vie.",
    author: "Oscar Wilde",
  },
  {
    text: "Dans chaque miroir, un étranger me regarde avec mes propres yeux.",
    author: "Fernando Pessoa",
  },
  {
    text: "Le paradoxe est la passion de la pensée.",
    author: "Søren Kierkegaard",
  },
];

// Pages du livre artistique
const livrePages = [
  {
    numero: "I",
    titre: "Le Reflet",
    texte: "Narcisse ne tomba pas amoureux de lui-même, mais de l'inconnu qu'il voyait dans l'eau. Nous portons tous ce mystère : celui qui nous regarde depuis l'autre côté du miroir.",
  },
  {
    numero: "II",
    titre: "Le Paradoxe",
    texte: "Aimer l'autre, c'est se perdre. S'aimer soi-même, c'est se trouver. Mais peut-on vraiment aimer sans se perdre ? Peut-on se trouver sans aimer ?",
  },
  {
    numero: "III",
    titre: "La Dualité",
    texte: "Entre l'ego et l'écho, entre le moi et le toi, existe un espace où les contraires dansent. C'est là que naît l'art. C'est là que naît Arteral.",
  },
  {
    numero: "IV",
    titre: "L'Harmonie",
    texte: "Du chaos naît l'ordre. De la contradiction, la beauté. Chaque pièce que nous créons porte cette tension : être soi tout en étant pour l'autre.",
  },
];

export default function CollectionPage() {
  return (
    <div className="bg-light">
      {/* Hero Section - Minimal & Artistic */}
      <section className="min-h-[70vh] flex items-center justify-center relative overflow-hidden">
        {/* Background artistic elements */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 border border-dark/5 rounded-full" />
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 border border-primary/10 rounded-full" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-dark/5 rounded-full" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <FadeIn>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              <span className="font-mono text-[10px] tracking-[0.5em] text-dark/40 block mb-6">
                COLLECTION
              </span>
              <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-dark mb-6 leading-tight">
                Harmonie
                <br />
                <span className="text-primary">du Chaos</span>
              </h1>
              <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mb-8" />
              <p className="font-body text-lg md:text-xl text-dark/60 max-w-xl mx-auto leading-relaxed">
                Là où l&apos;ordre rencontre le désordre, où la beauté naît de la contradiction.
              </p>
            </motion.div>
          </FadeIn>
        </div>
      </section>

      {/* Série Narcisse Amoureux */}
      <section className="py-20 md:py-32 bg-dark text-white relative overflow-hidden">
        {/* Subtle background */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(139,0,0,0.1),transparent_50%)]" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <FadeIn>
            <div className="text-center mb-16 md:mb-24">
              <span className="font-mono text-[10px] tracking-[0.4em] text-primary/60 block mb-4">
                PREMIÈRE SÉRIE
              </span>
              <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
                Narcisse Amoureux
              </h2>
              <p className="font-body text-base md:text-lg text-white/60 max-w-2xl mx-auto">
                Le paradoxe entre l&apos;amour de soi et l&apos;amour de l&apos;autre.
                Une exploration textile du miroir intérieur.
              </p>
            </div>
          </FadeIn>

          {/* Le Livre - Pages artistiques */}
          <div className="relative">
            <FadeIn>
              <div className="text-center mb-12">
                <span className="font-display text-sm tracking-[0.3em] text-white/40">
                  ─── LE LIVRE ───
                </span>
              </div>
            </FadeIn>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              {livrePages.map((page, index) => (
                <FadeIn key={page.numero} delay={index * 0.15}>
                  <motion.div
                    whileHover={{ y: -5 }}
                    className="relative group"
                  >
                    {/* Page decoration */}
                    <div className="absolute -inset-1 bg-gradient-to-br from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-sm" />

                    <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 p-8 md:p-10 rounded-sm">
                      {/* Page number */}
                      <span className="absolute top-4 right-4 font-display text-4xl font-bold text-white/10">
                        {page.numero}
                      </span>

                      <h3 className="font-display text-xl md:text-2xl font-bold text-white mb-4">
                        {page.titre}
                      </h3>
                      <p className="font-body text-sm md:text-base text-white/70 leading-relaxed italic">
                        &ldquo;{page.texte}&rdquo;
                      </p>
                    </div>
                  </motion.div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Citations Section */}
      <section className="py-20 md:py-32 bg-light relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="text-center mb-16">
              <span className="font-mono text-[10px] tracking-[0.4em] text-dark/40 block mb-4">
                INSPIRATIONS
              </span>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-dark">
                Pensées sur le Paradoxe
              </h2>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {citations.map((citation, index) => (
              <FadeIn key={index} delay={index * 0.1}>
                <div className="relative group">
                  {/* Decorative quote mark */}
                  <span className="absolute -top-4 -left-2 font-display text-6xl text-primary/10 select-none">
                    &ldquo;
                  </span>

                  <blockquote className="relative pl-8 border-l-2 border-primary/30 group-hover:border-primary/60 transition-colors duration-300">
                    <p className="font-display text-lg md:text-xl text-dark/80 italic leading-relaxed mb-4">
                      {citation.text}
                    </p>
                    <footer className="font-body text-sm text-dark/50">
                      — {citation.author}
                    </footer>
                  </blockquote>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Duality Visual Section */}
      <section className="py-20 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-0">
            {/* Left - Narcisse */}
            <FadeIn>
              <div className="bg-gradient-to-br from-primary/5 to-primary/10 p-12 md:p-16 min-h-[400px] flex flex-col justify-center border-r border-dark/5">
                <span className="font-mono text-[10px] tracking-[0.3em] text-primary/60 mb-4">
                  L&apos;AMOUR DE SOI
                </span>
                <h3 className="font-display text-3xl md:text-4xl font-bold text-dark mb-4">
                  Narcisse
                </h3>
                <p className="font-body text-dark/60 leading-relaxed mb-6">
                  Se regarder sans se juger. S&apos;accepter dans sa complexité.
                  Trouver la beauté dans ses propres contradictions.
                </p>
                <ul className="space-y-3">
                  {["Introspection", "Acceptation", "Authenticité"].map((item) => (
                    <li key={item} className="flex items-center gap-3 font-body text-sm text-dark/70">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>

            {/* Right - Amoureux */}
            <FadeIn delay={0.2}>
              <div className="bg-gradient-to-br from-dark/5 to-dark/10 p-12 md:p-16 min-h-[400px] flex flex-col justify-center">
                <span className="font-mono text-[10px] tracking-[0.3em] text-dark/40 mb-4">
                  L&apos;AMOUR DE L&apos;AUTRE
                </span>
                <h3 className="font-display text-3xl md:text-4xl font-bold text-dark mb-4">
                  Amoureux
                </h3>
                <p className="font-body text-dark/60 leading-relaxed mb-6">
                  Se perdre dans le regard de l&apos;autre. Découvrir qui l&apos;on est
                  à travers celui qu&apos;on aime.
                </p>
                <ul className="space-y-3">
                  {["Connection", "Vulnérabilité", "Transcendance"].map((item) => (
                    <li key={item} className="flex items-center gap-3 font-body text-sm text-dark/70">
                      <div className="w-1.5 h-1.5 bg-dark rounded-full" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>
          </div>

          {/* Center paradox */}
          <FadeIn delay={0.3}>
            <div className="relative -mt-8 md:-mt-12 z-10">
              <div className="max-w-md mx-auto bg-dark text-white p-8 md:p-10 text-center">
                <span className="font-mono text-[10px] tracking-[0.3em] text-primary/80 block mb-3">
                  LE PARADOXE
                </span>
                <p className="font-display text-lg md:text-xl italic">
                  &ldquo;On ne peut aimer l&apos;autre sans s&apos;aimer soi-même.
                  On ne peut se connaître sans le miroir de l&apos;autre.&rdquo;
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Manifesto Quote */}
      <section className="py-24 md:py-36 bg-gradient-to-br from-dark via-dark to-primary/20 text-white relative">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_0%_0%,rgba(255,255,255,0.1),transparent_30%)]" />
          <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_100%_100%,rgba(139,0,0,0.2),transparent_30%)]" />
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <FadeIn>
            <blockquote className="text-center">
              <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mb-10" />
              <p className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold italic leading-relaxed mb-8">
                &ldquo;Porter Arteral, c&apos;est porter son paradoxe.
                C&apos;est accepter d&apos;être multiple, contradictoire, humain.&rdquo;
              </p>
              <footer className="font-mono text-xs tracking-[0.3em] text-white/50">
                — MANIFESTE ARTERAL
              </footer>
              <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mt-10" />
            </blockquote>
          </FadeIn>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-32 bg-light">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeIn>
            <span className="font-mono text-[10px] tracking-[0.4em] text-dark/40 block mb-4">
              BIENTÔT DISPONIBLE
            </span>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-dark mb-6">
              Soyez les premiers
            </h2>
            <p className="font-body text-base md:text-lg text-dark/60 leading-relaxed mb-10 max-w-xl mx-auto">
              La collection Narcisse Amoureux arrive bientôt.
              Inscrivez-vous pour être notifié du lancement.
            </p>
            <NotifyMeButton />

            <div className="mt-16 pt-12 border-t border-dark/10">
              <p className="font-body text-sm text-dark/50 mb-6">
                En attendant, explorez notre univers
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/marque"
                  className="inline-flex items-center justify-center gap-2 font-body text-sm text-dark/70 hover:text-primary transition-colors group"
                >
                  <span>Notre philosophie</span>
                  <span className="w-4 h-[1px] bg-current group-hover:w-6 transition-all" />
                </Link>
                <Link
                  href="/manifeste"
                  className="inline-flex items-center justify-center gap-2 font-body text-sm text-dark/70 hover:text-primary transition-colors group"
                >
                  <span>Le manifeste</span>
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
