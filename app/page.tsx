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

// Sparkling dots around the logo
const sparkles = [
  { top: "10%", left: "20%", delay: 0, size: 4 },
  { top: "15%", left: "75%", delay: 0.5, size: 3 },
  { top: "25%", left: "10%", delay: 1, size: 5 },
  { top: "30%", left: "85%", delay: 0.3, size: 4 },
  { top: "50%", left: "5%", delay: 0.8, size: 3 },
  { top: "50%", left: "95%", delay: 0.2, size: 4 },
  { top: "70%", left: "15%", delay: 0.6, size: 5 },
  { top: "75%", left: "80%", delay: 0.4, size: 3 },
  { top: "85%", left: "25%", delay: 0.9, size: 4 },
  { top: "80%", left: "70%", delay: 0.1, size: 5 },
];

export default function Home() {
  const { heroContent, homeFeatures } = useContent();

  return (
    <div>
      {/* Hero Section with Video Background */}
      <section className="relative min-h-[100vh] flex items-center justify-center text-white overflow-hidden">
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
        <div className="absolute inset-0 bg-dark/50" />
        <div className="absolute inset-0 bg-gradient-to-t from-dark via-transparent to-dark/30" />

        {/* Sparkling dots */}
        {sparkles.map((sparkle, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0, 1, 0.5, 1, 0],
              scale: [0, 1, 0.8, 1, 0],
            }}
            transition={{
              duration: 3,
              delay: sparkle.delay,
              repeat: Infinity,
              repeatDelay: 2,
            }}
            style={{
              position: "absolute",
              top: sparkle.top,
              left: sparkle.left,
              width: sparkle.size,
              height: sparkle.size,
            }}
            className="bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,0.8),0_0_20px_rgba(255,255,255,0.4)] z-10"
          />
        ))}

        {/* Center content - Logo only */}
        <div className="relative z-10 flex flex-col items-center justify-center px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="relative"
          >
            {/* Glow effect behind logo */}
            <div className="absolute inset-0 blur-3xl bg-primary/40 rounded-full scale-125" />
            <div className="absolute inset-0 blur-2xl bg-white/10 rounded-full scale-110" />

            {/* Logo - Much larger */}
            <Image
              src="/images/logo.png"
              alt="Arteral Logo"
              width={400}
              height={400}
              className="relative w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 object-contain drop-shadow-2xl"
              priority
            />
          </motion.div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-8 md:mt-12"
          >
            <Link
              href={heroContent.cta.link}
              className="inline-block font-body font-semibold text-sm sm:text-base px-8 sm:px-10 py-3 sm:py-4 bg-primary hover:bg-primary/90 text-white rounded-sm transition-all hover:scale-105 shadow-lg hover:shadow-xl"
            >
              {heroContent.cta.text}
            </Link>
          </motion.div>
        </div>

        {/* Quote at bottom - artistic style */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="absolute bottom-16 sm:bottom-20 left-0 right-0 z-10 px-4"
        >
          <div className="max-w-3xl mx-auto text-center">
            <div className="relative inline-block">
              {/* Decorative lines */}
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 1.5, delay: 0.8 }}
                className="absolute -top-4 left-1/2 -translate-x-1/2 h-[1px] bg-gradient-to-r from-transparent via-primary/60 to-transparent"
                style={{ width: "120px" }}
              />

              <p className="font-display text-base sm:text-lg md:text-xl lg:text-2xl italic text-white/90 leading-relaxed">
                &ldquo;Chaque pièce raconte un paradoxe.&rdquo;
              </p>
              <p className="font-body text-xs sm:text-sm md:text-base text-white/60 mt-2 tracking-wider">
                Chaque paradoxe change celui qui la porte.
              </p>

              {/* Decorative lines */}
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 1.5, delay: 1 }}
                className="absolute -bottom-4 left-1/2 -translate-x-1/2 h-[1px] bg-gradient-to-r from-transparent via-primary/60 to-transparent"
                style={{ width: "120px" }}
              />
            </div>
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="absolute bottom-4 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-5 h-8 border-2 border-white/40 rounded-full flex justify-center pt-1.5"
          >
            <div className="w-1 h-2 bg-white/40 rounded-full" />
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
