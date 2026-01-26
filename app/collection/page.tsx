"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import FadeIn from "@/components/FadeIn";
import NotifyMeButton from "@/components/NotifyMeButton";
import Link from "next/link";
import { useContent } from "@/hooks/useContent";

export default function CollectionPage() {
  const { collectionPageContent, philosophicalCitations } = useContent();

  return (
    <div className="bg-[#E8E8E8] dark:bg-[#0A0A0A]">
      {/* Hero Section - Minimal & Artistic */}
      <section className="min-h-[70vh] flex items-center justify-center relative overflow-hidden">
        {/* Background artistic elements */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 border border-dark/5 dark:border-white/5 rounded-full" />
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 border border-primary/10 rounded-full" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-dark/5 dark:border-white/5 rounded-full" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <FadeIn>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              <span className="font-mono text-[10px] tracking-[0.5em] text-[#7A7A7A] dark:text-gray-500 block mb-6">
                {collectionPageContent.hero.label}
              </span>
              <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-[#2B2B2B] dark:text-white mb-6 leading-tight">
                {collectionPageContent.hero.title1}
                <br />
                <span className="text-primary">{collectionPageContent.hero.title2}</span>
              </h1>
              <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mb-8" />
              <p className="font-body text-lg md:text-xl text-[#5A5A5A] dark:text-gray-400 max-w-xl mx-auto leading-relaxed">
                {collectionPageContent.hero.description}
              </p>
            </motion.div>
          </FadeIn>
        </div>
      </section>

      {/* Models Lookbook Gallery - Alternating Layout */}
      <section className="py-16 md:py-24 bg-white dark:bg-[#0A0A0A] relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="text-center mb-12 md:mb-20">
              <span className="font-mono text-[10px] tracking-[0.5em] text-[#7A7A7A] dark:text-gray-500 block mb-4">
                LOOKBOOK
              </span>
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-[#2B2B2B] dark:text-white mb-6">
                Toiles en Attente
              </h2>
              <p className="font-body text-base md:text-lg text-[#5A5A5A] dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
                Chaque silhouette est une promesse. Les distorsions que vous voyez sont l'écho d'un art à naître —
                <span className="italic text-primary"> votre vision peut habiter ces vêtements</span>.
              </p>
            </div>
          </FadeIn>

          {/* Models Alternating Grid */}
          <div className="space-y-8 md:space-y-12">
            {[1, 2, 3, 4, 5, 6].map((num, index) => (
              <FadeIn key={num} delay={index * 0.1}>
                <div className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-6 md:gap-10 items-center`}>
                  {/* Image */}
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.4 }}
                    className="w-full md:w-1/2 group relative aspect-[3/4] overflow-hidden bg-[#D8D8D8] dark:bg-[#1A1A1A]"
                  >
                    <Image
                      src={`/images/models/model-${num}.png`}
                      alt={`Model ${num}`}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    {/* Branding */}
                    <div className="absolute bottom-6 left-6">
                      <p className="font-mono text-[10px] tracking-widest text-white/60">ARTERAL</p>
                    </div>
                  </motion.div>

                  {/* Text Content */}
                  <div className={`w-full md:w-1/2 ${index % 2 === 0 ? 'md:pl-4' : 'md:pr-4'}`}>
                    <span className="font-mono text-[10px] tracking-[0.3em] text-primary/60 block mb-3">
                      0{num} / 06
                    </span>
                    <h3 className="font-display text-2xl md:text-3xl font-bold text-[#2B2B2B] dark:text-white mb-4">
                      {num === 1 && "L'Éveil"}
                      {num === 2 && "La Dualité"}
                      {num === 3 && "L'Ombre"}
                      {num === 4 && "La Lumière"}
                      {num === 5 && "Le Chaos"}
                      {num === 6 && "L'Harmonie"}
                    </h3>
                    <p className="font-body text-[#5A5A5A] dark:text-gray-400 leading-relaxed mb-4">
                      {num === 1 && "Une toile vierge attend son premier souffle. Le glitch murmure les possibilités infinies d'une création à naître."}
                      {num === 2 && "Entre l'ombre et la lumière, le vêtement cherche son équilibre. Votre art définira son identité."}
                      {num === 3 && "Dans les profondeurs de l'abstrait, une forme émerge. Elle appelle un artiste pour révéler sa nature."}
                      {num === 4 && "La clarté naît du chaos maîtrisé. Ce tissu attend que votre vision l'illumine."}
                      {num === 5 && "Le désordre apparent cache un ordre secret. Seul un regard créatif peut en extraire la beauté."}
                      {num === 6 && "La synthèse finale où tout converge. L'équilibre parfait entre votre art et notre support."}
                    </p>
                    <p className="font-display text-sm italic text-primary/80">
                      En attente de création
                    </p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>

          {/* Artistic Quote */}
          <FadeIn delay={0.7}>
            <div className="mt-16 md:mt-24 p-8 md:p-12 bg-[#F5F5F5] dark:bg-[#1A1A1A] text-center">
              <p className="font-display text-lg md:text-xl italic text-[#4A4A4A] dark:text-gray-300 leading-relaxed max-w-2xl mx-auto">
                "Le glitch n'est pas une erreur — c'est un appel. Une fréquence qui vibre entre le néant et la création,
                attendant qu'un artiste accorde sa vision à cette mélodie visuelle."
              </p>
              <div className="w-12 h-[1px] bg-primary mx-auto mt-6" />
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Série Narcisse Amoureux */}
      <section className="py-20 md:py-32 bg-[#1A1A1A] text-white relative overflow-hidden">
        {/* Subtle background */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(139,0,0,0.1),transparent_50%)]" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <FadeIn>
            <div className="text-center mb-16 md:mb-24">
              <span className="font-mono text-[10px] tracking-[0.4em] text-primary block mb-4">
                {collectionPageContent.series.label}
              </span>
              <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold mb-6 text-white">
                {collectionPageContent.series.title}
              </h2>
              <p className="font-body text-base md:text-lg text-white/80 max-w-2xl mx-auto">
                {collectionPageContent.series.description}
              </p>
            </div>
          </FadeIn>

          {/* Le Livre - Pages artistiques */}
          <div className="relative">
            <FadeIn>
              <div className="text-center mb-12">
                <span className="font-display text-sm tracking-[0.3em] text-white/60">
                  ─── {collectionPageContent.series.bookTitle} ───
                </span>
              </div>
            </FadeIn>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              {collectionPageContent.book.map((page, index) => (
                <FadeIn key={page.numero} delay={index * 0.15}>
                  <motion.div
                    whileHover={{ y: -5 }}
                    className="relative group"
                  >
                    {/* Page decoration */}
                    <div className="absolute -inset-1 bg-gradient-to-br from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-sm" />

                    <div className="relative bg-white/10 backdrop-blur-sm border border-white/20 p-8 md:p-10 rounded-sm">
                      {/* Page number */}
                      <span className="absolute top-4 right-4 font-display text-4xl font-bold text-white/20">
                        {page.numero}
                      </span>

                      <h3 className="font-display text-xl md:text-2xl font-bold text-white mb-4">
                        {page.titre}
                      </h3>
                      <p className="font-body text-sm md:text-base text-white/90 leading-relaxed italic">
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
      <section className="py-20 md:py-32 bg-[#E8E8E8] dark:bg-[#0A0A0A] relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="text-center mb-16">
              <span className="font-mono text-[10px] tracking-[0.4em] text-[#7A7A7A] dark:text-gray-500 block mb-4">
                {collectionPageContent.citations.label}
              </span>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-[#2B2B2B] dark:text-white">
                {collectionPageContent.citations.title}
              </h2>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {philosophicalCitations.map((citation, index) => (
              <FadeIn key={index} delay={index * 0.1}>
                <div className="relative group">
                  {/* Decorative quote mark */}
                  <span className="absolute -top-4 -left-2 font-display text-6xl text-primary/10 select-none">
                    &ldquo;
                  </span>

                  <blockquote className="relative pl-8 border-l-2 border-primary/30 group-hover:border-primary/60 transition-colors duration-300">
                    <p className="font-display text-lg md:text-xl text-[#3A3A3A] dark:text-gray-200 italic leading-relaxed mb-4">
                      {citation.text}
                    </p>
                    <footer className="font-body text-sm text-[#6A6A6A] dark:text-gray-500">
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
      <section className="py-20 md:py-32 bg-white dark:bg-[#0A0A0A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-0">
            {/* Left - Narcisse */}
            <FadeIn>
              <div className="bg-gradient-to-br from-primary/5 to-primary/10 dark:from-primary/10 dark:to-primary/20 p-12 md:p-16 min-h-[400px] flex flex-col justify-center border-r border-dark/5 dark:border-white/5">
                <span className="font-mono text-[10px] tracking-[0.3em] text-primary/60 mb-4">
                  {collectionPageContent.duality.narcisse.label}
                </span>
                <h3 className="font-display text-3xl md:text-4xl font-bold text-[#2B2B2B] dark:text-white mb-4">
                  {collectionPageContent.duality.narcisse.title}
                </h3>
                <p className="font-body text-[#5A5A5A] dark:text-gray-400 leading-relaxed mb-6">
                  {collectionPageContent.duality.narcisse.description}
                </p>
                <ul className="space-y-3">
                  {collectionPageContent.duality.narcisse.points.map((item) => (
                    <li key={item} className="flex items-center gap-3 font-body text-sm text-[#4A4A4A] dark:text-gray-300">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>

            {/* Right - Amoureux */}
            <FadeIn delay={0.2}>
              <div className="bg-gradient-to-br from-dark/5 to-dark/10 dark:from-white/5 dark:to-white/10 p-12 md:p-16 min-h-[400px] flex flex-col justify-center">
                <span className="font-mono text-[10px] tracking-[0.3em] text-[#7A7A7A] dark:text-gray-500 mb-4">
                  {collectionPageContent.duality.amoureux.label}
                </span>
                <h3 className="font-display text-3xl md:text-4xl font-bold text-[#2B2B2B] dark:text-white mb-4">
                  {collectionPageContent.duality.amoureux.title}
                </h3>
                <p className="font-body text-[#5A5A5A] dark:text-gray-400 leading-relaxed mb-6">
                  {collectionPageContent.duality.amoureux.description}
                </p>
                <ul className="space-y-3">
                  {collectionPageContent.duality.amoureux.points.map((item) => (
                    <li key={item} className="flex items-center gap-3 font-body text-sm text-[#4A4A4A] dark:text-gray-300">
                      <div className="w-1.5 h-1.5 bg-dark dark:bg-white rounded-full" />
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
              <div className="max-w-md mx-auto bg-[#1A1A1A] text-white p-8 md:p-10 text-center">
                <span className="font-mono text-[10px] tracking-[0.3em] text-primary/80 block mb-3">
                  {collectionPageContent.duality.paradox.label}
                </span>
                <p className="font-display text-lg md:text-xl italic">
                  &ldquo;{collectionPageContent.duality.paradox.quote}&rdquo;
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Manifesto Quote */}
      <section className="py-24 md:py-36 bg-gradient-to-br from-[#1A1A1A] via-[#1A1A1A] to-primary/20 text-white relative">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_0%_0%,rgba(255,255,255,0.1),transparent_30%)]" />
          <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_100%_100%,rgba(139,0,0,0.2),transparent_30%)]" />
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <FadeIn>
            <blockquote className="text-center">
              <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mb-10" />
              <p className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold italic leading-relaxed mb-8">
                &ldquo;{collectionPageContent.manifesto.quote}&rdquo;
              </p>
              <footer className="font-mono text-xs tracking-[0.3em] text-white/50">
                — {collectionPageContent.manifesto.author}
              </footer>
              <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mt-10" />
            </blockquote>
          </FadeIn>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-32 bg-[#E8E8E8] dark:bg-[#0A0A0A]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeIn>
            <span className="font-mono text-[10px] tracking-[0.4em] text-[#7A7A7A] dark:text-gray-500 block mb-4">
              {collectionPageContent.cta.label}
            </span>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-[#2B2B2B] dark:text-white mb-6">
              {collectionPageContent.cta.title}
            </h2>
            <p className="font-body text-base md:text-lg text-[#5A5A5A] dark:text-gray-400 leading-relaxed mb-10 max-w-xl mx-auto">
              {collectionPageContent.cta.description}
            </p>
            <NotifyMeButton />

            <div className="mt-16 pt-12 border-t border-dark/10 dark:border-white/10">
              <p className="font-body text-sm text-[#6A6A6A] dark:text-gray-500 mb-6">
                {collectionPageContent.cta.explore}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/marque"
                  className="inline-flex items-center justify-center gap-2 font-body text-sm text-[#4A4A4A] dark:text-gray-300 hover:text-primary transition-colors group"
                >
                  <span>{collectionPageContent.cta.philosophy}</span>
                  <span className="w-4 h-[1px] bg-current group-hover:w-6 transition-all" />
                </Link>
                <Link
                  href="/manifeste"
                  className="inline-flex items-center justify-center gap-2 font-body text-sm text-[#4A4A4A] dark:text-gray-300 hover:text-primary transition-colors group"
                >
                  <span>{collectionPageContent.cta.manifesto}</span>
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
