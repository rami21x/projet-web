"use client";

import { useState } from "react";
import { Trophy, Award, Star, CheckCircle, Calendar, Users, Upload, Download, Sparkles } from "lucide-react";
import { useContent } from "@/hooks/useContent";
import FadeIn from "@/components/FadeIn";
import { motion } from "framer-motion";

const iconMap = {
  Trophy: Trophy,
  Award: Award,
  Star: Star,
};

export default function ConcoursPage() {
  const { contestContent } = useContent();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setSelectedFile(null);
      setEmail("");
      setName("");
    }, 5000);
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center bg-gradient-to-br from-black via-dark to-primary/30 dark:from-black dark:via-light/10 dark:to-primary/20 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(139,0,0,0.4),transparent_50%)]" />
        </div>

        <motion.div
          animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
          transition={{ duration: 6, repeat: Infinity }}
          className="absolute top-20 left-10 w-32 h-32 border-4 border-primary/30 rounded-full"
        />

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <Trophy className="w-20 h-20 md:w-28 md:h-28 mx-auto text-primary mb-6" />
          </motion.div>

          <FadeIn>
            <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6">
              {contestContent.hero.title}
            </h1>
            <p className="font-display text-3xl sm:text-4xl md:text-5xl italic mb-4 text-accent">
              {contestContent.hero.subtitle}
            </p>
            <p className="font-body text-xl sm:text-2xl md:text-3xl mb-8 text-light/90">
              {contestContent.hero.description}
            </p>

            <div className="bg-primary/20 backdrop-blur-sm border-2 border-primary px-8 py-4 rounded-lg inline-block mb-8">
              <Calendar className="w-6 h-6 inline mr-2" />
              <span className="font-body font-bold text-lg">
                Deadline: {contestContent.hero.deadline}
              </span>
            </div>

            <br />

            <a
              href="#submit"
              className="inline-block font-body font-semibold text-lg px-12 py-6 bg-primary hover:bg-primary/90 text-white rounded-sm transition-all hover:scale-105 shadow-2xl"
            >
              Participer Maintenant →
            </a>
          </FadeIn>
        </div>
      </section>

      {/* Prix */}
      <section className="py-24 bg-light dark:bg-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <h2 className="font-display text-6xl font-bold text-center text-dark dark:text-white mb-4">
              Prix: <span className="text-primary">6500€</span>
            </h2>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            {contestContent.prizes.map((prize, idx) => {
              const Icon = iconMap[prize.icon as keyof typeof iconMap];
              return (
                <FadeIn key={prize.position} delay={idx * 0.2}>
                  <motion.div whileHover={{ y: -10 }} className="bg-white dark:bg-white border-2 border-primary/40 p-8 rounded-lg">
                    {idx === 0 && (
                      <div className="absolute -top-4 -right-4 bg-primary text-white px-4 py-2 rounded-full font-bold text-sm">
                        GAGNANT!
                      </div>
                    )}
                    <Icon className="w-16 h-16 mb-4 mx-auto text-primary" />
                    <h3 className="font-display text-3xl font-bold text-dark mb-2 text-center">
                      {prize.position}
                    </h3>
                    <p className="font-display text-5xl font-bold text-primary mb-6 text-center">
                      {prize.amount}
                    </p>
                    <ul className="space-y-3">
                      {prize.rewards.map((reward, i) => (
                        <li key={i} className="flex items-start gap-2 font-body text-sm text-dark/80">
                          <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                          {reward}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* Thème */}
      <section className="py-24 bg-gradient-to-br from-dark to-primary/20 text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <h2 className="font-display text-6xl font-bold mb-8 text-center">
              {contestContent.theme.title}
            </h2>
            <p className="font-body text-xl leading-relaxed mb-8 whitespace-pre-line">
              {contestContent.theme.description}
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Soumission */}
      <section id="submit" className="py-24 bg-light dark:bg-dark">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <Sparkles className="w-16 h-16 mx-auto mb-4 text-primary" />
            <h2 className="font-display text-5xl font-bold text-dark dark:text-white mb-12 text-center">
              Soumettre votre Artwork
            </h2>
          </FadeIn>

          <FadeIn delay={0.2}>
            {submitted ? (
              <div className="bg-white p-12 rounded-lg text-center border-2 border-primary">
                <CheckCircle className="w-20 h-20 mx-auto mb-6 text-primary" />
                <h3 className="font-display text-3xl font-bold text-dark mb-4">
                  Soumission Reçue!
                </h3>
              </div>
            ) : (
              <div className="bg-white dark:bg-white p-12 rounded-lg shadow-2xl">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block font-body text-sm font-semibold text-dark mb-2">
                      Nom Complet *
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className="w-full px-4 py-4 border-2 border-dark/20 rounded-lg focus:border-primary"
                      placeholder="Votre nom"
                    />
                  </div>

                  <div>
                    <label className="block font-body text-sm font-semibold text-dark mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full px-4 py-4 border-2 border-dark/20 rounded-lg focus:border-primary"
                      placeholder="votre@email.com"
                    />
                  </div>

                  <div>
                    <label className="block font-body text-sm font-semibold text-dark mb-2">
                      Artwork *
                    </label>
                    <div className="border-2 border-dashed border-dark/30 rounded-lg p-8 text-center hover:border-primary cursor-pointer">
                      <input
                        type="file"
                        onChange={handleFileChange}
                        accept=".png,.jpg,.jpeg,.psd,.ai"
                        required
                        className="hidden"
                        id="artwork-upload"
                      />
                      <label htmlFor="artwork-upload" className="cursor-pointer">
                        <Upload className="w-12 h-12 mx-auto mb-4 text-dark/40" />
                        {selectedFile ? (
                          <p className="font-body text-primary font-semibold">{selectedFile.name}</p>
                        ) : (
                          <p className="font-body text-dark/60">Cliquez pour uploader</p>
                        )}
                      </label>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-3 font-body font-semibold text-lg px-8 py-5 bg-primary hover:bg-primary/90 text-white rounded-lg"
                  >
                    Soumettre
                    <Sparkles className="w-5 h-5" />
                  </button>
                </form>
              </div>
            )}
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
