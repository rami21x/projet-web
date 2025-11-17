"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, Feather, Heart, Star, Sparkles } from "lucide-react";
import FadeIn from "@/components/FadeIn";

interface GuestEntry {
  id: number;
  name: string;
  message: string;
  date: string;
  mood: "love" | "inspired" | "thoughtful";
}

const moodIcons = {
  love: Heart,
  inspired: Sparkles,
  thoughtful: Star,
};

const moodLabels = {
  love: "Amour",
  inspired: "Inspiré",
  thoughtful: "Pensif",
};

// Simulated guest entries
const initialEntries: GuestEntry[] = [
  {
    id: 1,
    name: "Sophie M.",
    message:
      "Arteral transcende la mode. C'est une expérience philosophique que je porte chaque jour.",
    date: "15 Nov 2024",
    mood: "inspired",
  },
  {
    id: 2,
    name: "Marc L.",
    message:
      "Enfin une marque qui comprend que le vêtement est bien plus qu'un tissu. C'est une pensée incarnée.",
    date: "12 Nov 2024",
    mood: "thoughtful",
  },
  {
    id: 3,
    name: "Amélie D.",
    message:
      "La collection Amour ↔ Ennuie m'a touchée profondément. Merci de créer avec autant d'intention.",
    date: "10 Nov 2024",
    mood: "love",
  },
];

export default function LivreDorPage() {
  const [entries, setEntries] = useState<GuestEntry[]>(initialEntries);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [mood, setMood] = useState<"love" | "inspired" | "thoughtful">("inspired");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !message.trim()) return;

    const newEntry: GuestEntry = {
      id: Date.now(),
      name: name.trim(),
      message: message.trim(),
      date: new Date().toLocaleDateString("fr-FR", {
        day: "numeric",
        month: "short",
        year: "numeric",
      }),
      mood,
    };

    setEntries([newEntry, ...entries]);
    setName("");
    setMessage("");
    setSubmitted(true);

    setTimeout(() => {
      setSubmitted(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 md:py-32 bg-gradient-to-br from-dark via-dark/95 to-accent/20 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(160, 82, 45, 0.1) 35px, rgba(160, 82, 45, 0.1) 70px)`,
            }}
          />
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <FadeIn>
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", duration: 1 }}
              className="inline-block mb-8"
            >
              <div className="w-20 h-20 bg-accent/20 rounded-full flex items-center justify-center">
                <BookOpen className="w-10 h-10 text-accent" />
              </div>
            </motion.div>

            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 md:mb-8">
              Livre d'Or
            </h1>
            <p className="font-body text-lg md:text-xl text-light/90 leading-relaxed max-w-3xl mx-auto">
              Partagez votre expérience Arteral. Vos impressions, vos réflexions, vos
              émotions. Chaque visiteur laisse une trace dans notre musée virtuel.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-16 md:py-24 bg-light dark:bg-dark/50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="bg-white dark:bg-dark/80 p-8 md:p-12 rounded-lg shadow-2xl border-2 border-accent/20">
              <div className="flex items-center gap-4 mb-8">
                <Feather className="w-8 h-8 text-accent" />
                <h2 className="font-display text-2xl md:text-3xl font-bold text-dark dark:text-white">
                  Laissez votre empreinte
                </h2>
              </div>

              {submitted && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 p-4 bg-accent/10 border-2 border-accent/30 rounded-lg"
                >
                  <p className="font-body text-accent font-semibold text-center">
                    ✨ Merci pour votre contribution au Livre d'Or !
                  </p>
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block font-body text-sm font-semibold text-dark dark:text-white/90 mb-2"
                  >
                    Votre nom *
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full px-4 py-3 font-body text-base text-dark dark:text-white bg-white dark:bg-dark/60 border-2 border-dark/20 dark:border-white/20 rounded-lg focus:outline-none focus:border-accent transition-colors"
                    placeholder="Sophie M."
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block font-body text-sm font-semibold text-dark dark:text-white/90 mb-2"
                  >
                    Votre message *
                  </label>
                  <textarea
                    id="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                    rows={5}
                    className="w-full px-4 py-3 font-body text-base text-dark dark:text-white bg-white dark:bg-dark/60 border-2 border-dark/20 dark:border-white/20 rounded-lg focus:outline-none focus:border-accent transition-colors resize-none"
                    placeholder="Partagez votre expérience Arteral..."
                  />
                </div>

                <div>
                  <label className="block font-body text-sm font-semibold text-dark dark:text-white/90 mb-3">
                    Votre humeur
                  </label>
                  <div className="flex gap-4">
                    {(Object.keys(moodIcons) as Array<keyof typeof moodIcons>).map(
                      (moodKey) => {
                        const Icon = moodIcons[moodKey];
                        return (
                          <button
                            key={moodKey}
                            type="button"
                            onClick={() => setMood(moodKey)}
                            className={`flex-1 p-4 rounded-lg border-2 transition-all hover:scale-105 ${
                              mood === moodKey
                                ? "border-accent bg-accent/10 shadow-lg"
                                : "border-dark/20 dark:border-white/20 hover:border-accent/50"
                            }`}
                          >
                            <Icon
                              className={`w-6 h-6 mx-auto mb-2 ${
                                mood === moodKey ? "text-accent" : "text-dark/40 dark:text-white/40"
                              }`}
                            />
                            <p
                              className={`font-body text-xs font-semibold ${
                                mood === moodKey
                                  ? "text-accent"
                                  : "text-dark/60 dark:text-white/60"
                              }`}
                            >
                              {moodLabels[moodKey]}
                            </p>
                          </button>
                        );
                      }
                    )}
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-3 font-body font-semibold text-base sm:text-lg px-8 py-4 bg-gradient-to-r from-accent to-primary hover:from-primary hover:to-accent text-white rounded-lg transition-all hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  <Feather className="w-5 h-5" />
                  <span>Signer le Livre d'Or</span>
                </button>
              </form>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Entries Section */}
      <section className="py-16 md:py-24 bg-white dark:bg-dark/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-dark dark:text-white mb-12 text-center">
              Les Visiteurs d'Arteral
            </h2>
          </FadeIn>

          <div className="space-y-6">
            <AnimatePresence>
              {entries.map((entry, index) => {
                const Icon = moodIcons[entry.mood];
                return (
                  <motion.div
                    key={entry.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-light dark:bg-dark/80 p-6 md:p-8 rounded-lg shadow-lg border-l-4 border-accent"
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center">
                          <Icon className="w-6 h-6 text-accent" />
                        </div>
                      </div>

                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="font-body text-lg font-bold text-dark dark:text-white">
                            {entry.name}
                          </h3>
                          <p className="font-mono text-xs text-dark/50 dark:text-white/50">
                            {entry.date}
                          </p>
                        </div>

                        <p className="font-body text-base text-dark/80 dark:text-white/80 leading-relaxed italic">
                          "{entry.message}"
                        </p>

                        <p className="font-mono text-xs text-accent mt-3 uppercase tracking-wider">
                          {moodLabels[entry.mood]}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>
      </section>
    </div>
  );
}
