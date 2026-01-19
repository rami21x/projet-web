"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useContent } from "@/hooks/useContent";
import FadeIn from "@/components/FadeIn";
import PhilosophicalQuote from "@/components/PhilosophicalQuote";
import DualitySlider from "@/components/DualitySlider";

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
  const { homeFeatures, homePageContent } = useContent();

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

        {/* Center content - Logo only, no button */}
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
              src="/images/logo.gif"
              alt="Arteral Logo"
              unoptimized
              width={400}
              height={400}
              className="relative w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 object-contain drop-shadow-2xl"
              priority
            />
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
                &ldquo;{homePageContent.heroQuote.quote}&rdquo;
              </p>
              <p className="font-body text-xs sm:text-sm md:text-base text-white/60 mt-2 tracking-wider">
                {homePageContent.heroQuote.subquote}
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

      {/* Features Section - Artistic style without emojis */}
      <section className="py-20 md:py-32 bg-[#E8E8E8] dark:bg-[#0A0A0A]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="text-center mb-16 md:mb-20">
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-[#2B2B2B] dark:text-white mb-4">
                {homePageContent.essence.title}
              </h2>
              <div className="w-16 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent mx-auto" />
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
            {homeFeatures.map((feature, index) => (
              <FadeIn key={feature.title} delay={index * 0.2}>
                <div className="text-center group">
                  {/* Artistic circle instead of emoji icon */}
                  <div className="relative w-20 h-20 mx-auto mb-8">
                    <div className="absolute inset-0 border border-primary/30 rounded-full group-hover:border-primary/60 transition-colors duration-500" />
                    <div className="absolute inset-2 border border-[#2B2B2B]/20 dark:border-white/20 rounded-full group-hover:border-primary/40 transition-colors duration-500" />
                    <div className="absolute inset-4 bg-gradient-to-br from-primary/10 to-accent/10 rounded-full group-hover:from-primary/20 group-hover:to-accent/20 transition-colors duration-500" />
                    <span className="absolute inset-0 flex items-center justify-center font-display text-2xl font-bold text-primary/70 group-hover:text-primary transition-colors duration-300">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </div>
                  <h3 className="font-display text-xl md:text-2xl font-bold text-[#2B2B2B] dark:text-white mb-4">
                    {feature.title}
                  </h3>
                  <p className="font-body text-sm md:text-base text-[#5A5A5A] dark:text-gray-400 leading-relaxed max-w-xs mx-auto">
                    {feature.description}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* NARCISSE AMOUREUX - Standalone artistic section */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-[#E8E8E8] via-white to-[#E8E8E8] dark:from-[#0A0A0A] dark:via-[#0A0A0A] dark:to-[#0A0A0A] relative overflow-hidden">
        {/* Subtle decorative elements */}
        <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] border border-[#2B2B2B] dark:border-white rounded-full" />
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <FadeIn>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <Link
                href="/collection"
                className="inline-block group"
              >
                <span className="font-mono text-[10px] tracking-[0.5em] text-[#6A6A6A] dark:text-gray-500 block mb-4">
                  {homePageContent.series.label}
                </span>
                <div className="relative">
                  <div className="absolute -inset-6 border border-[#2B2B2B]/5 dark:border-white/5 group-hover:border-primary/20 transition-colors duration-500" />
                  <div className="absolute -inset-3 border border-[#2B2B2B]/10 dark:border-white/10 group-hover:border-primary/30 transition-colors duration-500" />
                  <div className="relative px-12 py-8 md:px-16 md:py-10">
                    <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-[#2B2B2B] dark:text-white group-hover:text-primary transition-colors duration-500 tracking-wide">
                      {homePageContent.series.title1}
                    </h2>
                    <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-primary group-hover:text-[#2B2B2B] dark:group-hover:text-white transition-colors duration-500 tracking-wide -mt-1">
                      {homePageContent.series.title2}
                    </h2>
                    <div className="w-12 h-[1px] bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mt-6 group-hover:w-24 transition-all duration-500" />
                    <p className="font-body text-sm text-[#6A6A6A] dark:text-gray-500 mt-6 group-hover:text-[#4A4A4A] dark:group-hover:text-gray-300 transition-colors">
                      {homePageContent.series.cta}
                    </p>
                  </div>
                </div>
              </Link>
            </motion.div>
          </FadeIn>
        </div>
      </section>

      {/* Philosophy Section - Clean without the CTA */}
      <section className="py-20 md:py-32 bg-dark text-white relative overflow-hidden">
        {/* Background artistic elements */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-10 w-64 h-64 border border-white rounded-full" />
          <div className="absolute bottom-20 right-10 w-48 h-48 border border-white rounded-full" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 border border-white/50 rounded-full" />
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <FadeIn>
            <p className="font-mono text-xs tracking-[0.3em] text-primary/80 mb-6">
              {homePageContent.philosophy.label}
            </p>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mb-8 md:mb-10 leading-tight">
              {homePageContent.philosophy.title}
            </h2>
            <p className="font-body text-base sm:text-lg md:text-xl text-light/80 leading-relaxed max-w-2xl mx-auto">
              {homePageContent.philosophy.description}
            </p>
            <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mt-10" />
          </FadeIn>
        </div>
      </section>

      {/* Philosophical Quote Section */}
      <PhilosophicalQuote />

      {/* Duality Slider Section */}
      <DualitySlider />

      {/* Collection Teaser - Harmonie du Chaos */}
      <section className="py-20 md:py-32 bg-[#E8E8E8] dark:bg-[#0A0A0A] relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="text-center">
              {/* Artistic header */}
              <div className="relative inline-block mb-8">
                <span className="font-mono text-[10px] tracking-[0.5em] text-[#6A6A6A] dark:text-gray-500 block mb-4">
                  {homePageContent.collection.label}
                </span>
                <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-[#2B2B2B] dark:text-white">
                  {homePageContent.collection.title}
                </h2>
                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-24 h-[1px] bg-gradient-to-r from-transparent via-primary to-transparent" />
              </div>

              <p className="font-body text-base sm:text-lg md:text-xl text-[#5A5A5A] dark:text-gray-400 leading-relaxed max-w-2xl mx-auto mt-12 mb-16">
                {homePageContent.collection.description}
              </p>

              {/* Link to collection */}
              <Link
                href="/collection"
                className="inline-flex items-center gap-3 font-body text-sm font-medium text-primary hover:text-primary/70 transition-colors group"
              >
                <span>{homePageContent.collection.cta}</span>
                <span className="w-8 h-[1px] bg-primary group-hover:w-12 transition-all duration-300" />
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
