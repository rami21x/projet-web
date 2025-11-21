"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Palette, Brain, Sparkles } from "lucide-react";
import { useContent } from "@/hooks/useContent";
import FadeIn from "@/components/FadeIn";
import PhilosophicalQuote from "@/components/PhilosophicalQuote";
import DualitySlider from "@/components/DualitySlider";

const iconMap = {
  Palette: Palette,
  Brain: Brain,
  Sparkles: Sparkles,
};

export default function Home() {
  const { heroContent, homeFeatures } = useContent();

  return (
    <div>
      {/* Hero Section with Video Background */}
      <section className="relative min-h-[90vh] flex items-center justify-center text-white overflow-hidden">
        {/* Video Background */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/videos/splash-intro.mp4" type="video/mp4" />
          <source src="/videos/splash-intro.webm" type="video/webm" />
        </video>

        {/* Overlay gradients for better text readability */}
        <div className="absolute inset-0 bg-dark/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-dark via-transparent to-dark/40" />
        <div className="absolute inset-0 bg-gradient-to-b from-dark/50 via-transparent to-dark/70" />

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Logo instead of text title */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="flex flex-col items-center mb-6 md:mb-8"
          >
            <div className="relative">
              <div className="absolute inset-0 blur-3xl bg-primary/30 rounded-full scale-150" />
              <Image
                src="/images/logo.png"
                alt="Arteral Logo"
                width={200}
                height={200}
                className="relative w-28 h-28 sm:w-36 sm:h-36 md:w-44 md:h-44 lg:w-52 lg:h-52 object-contain drop-shadow-2xl"
                priority
              />
            </div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="font-body text-lg sm:text-xl md:text-2xl mb-4 md:mb-6 leading-relaxed whitespace-pre-line max-w-3xl mx-auto"
          >
            {heroContent.subtitle}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="font-body text-base sm:text-lg md:text-xl mb-8 md:mb-12 text-light/90"
          >
            {heroContent.description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            <Link
              href={heroContent.cta.link}
              className="inline-block font-body font-semibold text-base sm:text-lg px-8 sm:px-10 py-4 sm:py-5 bg-primary hover:bg-primary/90 text-white rounded-sm transition-all hover:scale-105 shadow-lg hover:shadow-xl"
            >
              {heroContent.cta.text}
            </Link>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center pt-2"
          >
            <div className="w-1 h-3 bg-white/50 rounded-full" />
          </motion.div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24 bg-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {homeFeatures.map((feature, index) => {
              const Icon = iconMap[feature.icon as keyof typeof iconMap];
              return (
                <FadeIn key={feature.title} delay={index * 0.2}>
                  <div className="text-center group">
                    <div className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 mb-6 bg-dark/5 group-hover:bg-primary/10 rounded-full transition-all duration-300">
                      <Icon className="w-8 h-8 md:w-10 md:h-10 text-primary" />
                    </div>
                    <h3 className="font-display text-xl md:text-2xl font-bold text-dark mb-3">
                      {feature.title}
                    </h3>
                    <p className="font-body text-sm md:text-base text-dark/70 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* Philosophy Preview Section */}
      <section className="py-16 md:py-24 bg-dark text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeIn>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mb-6 md:mb-8">
              Mode qui transforme
            </h2>
            <p className="font-body text-base sm:text-lg md:text-xl text-light/95 leading-relaxed mb-8 md:mb-12">
              Nous croyons que ce qu&apos;on porte affecte la conscience. Chaque
              pièce Arteral est une exploration philosophique incarnée,
              une collaboration artistique, une série limitée qui invite
              à la contemplation.
            </p>
            <Link
              href="/marque"
              className="inline-block font-body font-semibold text-base sm:text-lg px-8 sm:px-10 py-4 sm:py-5 border-2 border-white hover:bg-white hover:text-dark text-white rounded-sm transition-all hover:scale-105"
            >
              Découvrir notre philosophie
            </Link>
          </FadeIn>
        </div>
      </section>

      {/* Philosophical Quote Section */}
      <PhilosophicalQuote />

      {/* Duality Slider Section */}
      <DualitySlider />

      {/* Collection Teaser */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-primary/5 to-accent/5">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="text-center mb-12 md:mb-16">
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-dark mb-4 md:mb-6">
                Amour ↔ Ennuie
              </h2>
              <p className="font-body text-base sm:text-lg md:text-xl text-dark/70 leading-relaxed max-w-3xl mx-auto">
                Notre première collection explore le paradoxe entre passion
                ardente et introspection silencieuse. Deux pulsations d&apos;un
                même cœur, brodées sur textile premium.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.3}>
            <div className="flex justify-center">
              <Link
                href="/collection"
                className="inline-block font-body font-semibold text-base sm:text-lg px-8 sm:px-10 py-4 sm:py-5 bg-primary hover:bg-primary/90 text-white rounded-sm transition-all hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Explorer la collection
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
