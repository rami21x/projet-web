"use client";

import { useState } from "react";
import Link from "next/link";
import FadeIn from "@/components/FadeIn";
import { motion, AnimatePresence } from "framer-motion";

export default function ConcoursPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [instagram, setInstagram] = useState("");
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
      setInstagram("");
    }, 5000);
  };

  return (
    <div className="bg-light">
      {/* Hero Section - Artistic */}
      <section className="relative min-h-[80vh] flex items-center justify-center bg-dark text-white overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-10 w-64 h-64 border border-white/5 rounded-full" />
          <div className="absolute bottom-1/4 right-10 w-96 h-96 border border-primary/10 rounded-full" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-white/5 rounded-full" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <FadeIn>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              <span className="font-mono text-[10px] tracking-[0.5em] text-primary/60 block mb-6">
                APPEL AUX ARTISTES
              </span>

              <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight">
                L&apos;Art de
                <br />
                <span className="text-primary">Narcisse</span>
              </h1>

              <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mb-8" />

              <p className="font-body text-lg md:text-xl text-white/60 max-w-2xl mx-auto mb-12 leading-relaxed">
                Dessinez l&apos;âme de notre première série. Votre art pourrait habiller
                des milliers de personnes et raconter l&apos;histoire de Narcisse Amoureux.
              </p>

              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                <a
                  href="#participer"
                  className="inline-block font-body text-sm px-10 py-4 border border-white/30 hover:border-primary hover:bg-primary/10 text-white transition-all duration-300"
                >
                  Soumettre mon œuvre
                </a>
                <a
                  href="#regles"
                  className="inline-flex items-center gap-2 font-body text-sm text-white/50 hover:text-white transition-colors"
                >
                  <span>Lire les règles</span>
                  <span className="w-4 h-[1px] bg-current" />
                </a>
              </div>
            </motion.div>
          </FadeIn>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-5 h-8 border border-white/30 rounded-full flex justify-center pt-1.5"
          >
            <div className="w-1 h-2 bg-white/30 rounded-full" />
          </motion.div>
        </motion.div>
      </section>

      {/* Le Concept */}
      <section className="py-20 md:py-32 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="text-center mb-16">
              <span className="font-mono text-[10px] tracking-[0.4em] text-dark/40 block mb-4">
                LE CONCEPT
              </span>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-dark mb-6">
                Donnez vie à Narcisse Amoureux
              </h2>
              <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-primary to-transparent mx-auto" />
            </div>

            <div className="prose prose-lg max-w-none">
              <p className="font-body text-dark/70 leading-relaxed mb-6 text-center">
                Nous cherchons l&apos;artiste qui saura capturer l&apos;essence du paradoxe :
                l&apos;amour de soi qui rencontre l&apos;amour de l&apos;autre. Votre création
                deviendra le visuel de notre première série, imprimée sur des pièces
                portées par ceux qui embrassent leur dualité.
              </p>
            </div>

            {/* Le Livrable */}
            <div className="mt-16 relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 rounded-sm" />
              <div className="relative p-10 md:p-14 border border-dark/10">
                <span className="font-mono text-[10px] tracking-[0.4em] text-primary/60 block mb-4">
                  ÉTAPE ESSENTIELLE
                </span>
                <h3 className="font-display text-2xl md:text-3xl font-bold text-dark mb-4">
                  Lisez le Livrable
                </h3>
                <p className="font-body text-dark/60 leading-relaxed mb-6">
                  Avant de créer, imprégnez-vous de l&apos;histoire. Le livrable contient
                  l&apos;essence de Narcisse Amoureux : les textes philosophiques, les
                  références visuelles, et l&apos;âme de la série. C&apos;est votre source
                  d&apos;inspiration.
                </p>
                <Link
                  href="/collection"
                  className="inline-flex items-center gap-3 font-body text-sm font-medium text-primary hover:text-primary/70 transition-colors group"
                >
                  <span>Découvrir Narcisse Amoureux</span>
                  <span className="w-8 h-[1px] bg-primary group-hover:w-12 transition-all duration-300" />
                </Link>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Les Prix */}
      <section className="py-20 md:py-32 bg-dark text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="text-center mb-20">
              <span className="font-mono text-[10px] tracking-[0.4em] text-primary/60 block mb-4">
                RÉCOMPENSES
              </span>
              <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
                Deux façons de gagner
              </h2>
              <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-primary to-transparent mx-auto" />
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {/* Prix du Peuple */}
            <FadeIn delay={0.1}>
              <motion.div
                whileHover={{ y: -5 }}
                className="relative group"
              >
                <div className="absolute -inset-1 bg-gradient-to-br from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-sm" />
                <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 p-10 md:p-12">
                  <span className="font-mono text-[10px] tracking-[0.3em] text-white/40 block mb-4">
                    PREMIER PRIX
                  </span>
                  <h3 className="font-display text-3xl md:text-4xl font-bold text-white mb-2">
                    Prix du Peuple
                  </h3>
                  <p className="font-display text-5xl md:text-6xl font-bold text-primary mb-6">
                    3 500€
                  </p>
                  <div className="w-12 h-[1px] bg-white/20 mb-6" />
                  <p className="font-body text-white/60 leading-relaxed mb-6">
                    Le gagnant sera choisi par <span className="text-white">vous</span>.
                    Toutes les œuvres seront publiées sur notre Instagram.
                    Celle qui recevra le plus de likes remporte le prix.
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3 font-body text-sm text-white/70">
                      <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                      Votre art imprimé sur la collection
                    </li>
                    <li className="flex items-start gap-3 font-body text-sm text-white/70">
                      <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                      Crédit artiste sur chaque pièce
                    </li>
                    <li className="flex items-start gap-3 font-body text-sm text-white/70">
                      <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                      5 pièces de la collection offertes
                    </li>
                  </ul>
                </div>
              </motion.div>
            </FadeIn>

            {/* Prix du Cœur */}
            <FadeIn delay={0.2}>
              <motion.div
                whileHover={{ y: -5 }}
                className="relative group"
              >
                <div className="absolute -inset-1 bg-gradient-to-br from-accent/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-sm" />
                <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 p-10 md:p-12">
                  <span className="font-mono text-[10px] tracking-[0.3em] text-white/40 block mb-4">
                    DEUXIÈME PRIX
                  </span>
                  <h3 className="font-display text-3xl md:text-4xl font-bold text-white mb-2">
                    Prix du Cœur
                  </h3>
                  <p className="font-display text-5xl md:text-6xl font-bold text-accent mb-6">
                    1 500€
                  </p>
                  <div className="w-12 h-[1px] bg-white/20 mb-6" />
                  <p className="font-body text-white/60 leading-relaxed mb-6">
                    Sélectionné par un jury d&apos;exception. Trois regards, une décision.
                  </p>

                  {/* Jury mystère */}
                  <div className="space-y-4 mb-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                        <span className="font-display text-lg text-white/40">?</span>
                      </div>
                      <div>
                        <p className="font-body text-sm text-white/80">Un artiste reconnu</p>
                        <p className="font-mono text-[10px] text-white/40">RÉVÉLÉ BIENTÔT</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                        <span className="font-display text-lg text-white/40">?</span>
                      </div>
                      <div>
                        <p className="font-body text-sm text-white/80">Une figure de la mode</p>
                        <p className="font-mono text-[10px] text-white/40">RÉVÉLÉ BIENTÔT</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-primary/30 flex items-center justify-center">
                        <span className="font-display text-lg text-white">A</span>
                      </div>
                      <div>
                        <p className="font-body text-sm text-white/80">L&apos;équipe Arteral</p>
                        <p className="font-mono text-[10px] text-primary/60">FONDATEURS</p>
                      </div>
                    </div>
                  </div>

                  <ul className="space-y-3">
                    <li className="flex items-start gap-3 font-body text-sm text-white/70">
                      <span className="w-1.5 h-1.5 bg-accent rounded-full mt-2 flex-shrink-0" />
                      Mention spéciale sur nos supports
                    </li>
                    <li className="flex items-start gap-3 font-body text-sm text-white/70">
                      <span className="w-1.5 h-1.5 bg-accent rounded-full mt-2 flex-shrink-0" />
                      3 pièces de la collection offertes
                    </li>
                  </ul>
                </div>
              </motion.div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Règles */}
      <section id="regles" className="py-20 md:py-32 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="text-center mb-16">
              <span className="font-mono text-[10px] tracking-[0.4em] text-dark/40 block mb-4">
                PARTICIPATION
              </span>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-dark mb-6">
                Les règles du jeu
              </h2>
              <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-primary to-transparent mx-auto" />
            </div>
          </FadeIn>

          <div className="space-y-8">
            {/* Règle 1 */}
            <FadeIn delay={0.1}>
              <div className="flex gap-6">
                <div className="flex-shrink-0">
                  <span className="font-display text-4xl font-bold text-primary/20">01</span>
                </div>
                <div>
                  <h3 className="font-display text-xl font-bold text-dark mb-2">
                    Imprégnez-vous de l&apos;histoire
                  </h3>
                  <p className="font-body text-dark/60 leading-relaxed">
                    Lisez attentivement le livrable de la collection Narcisse Amoureux.
                    Comprenez le paradoxe, ressentez la dualité, laissez l&apos;histoire
                    nourrir votre création.
                  </p>
                </div>
              </div>
            </FadeIn>

            {/* Règle 2 */}
            <FadeIn delay={0.2}>
              <div className="flex gap-6">
                <div className="flex-shrink-0">
                  <span className="font-display text-4xl font-bold text-primary/20">02</span>
                </div>
                <div>
                  <h3 className="font-display text-xl font-bold text-dark mb-2">
                    Respectez les contraintes... ou pas
                  </h3>
                  <p className="font-body text-dark/60 leading-relaxed">
                    Nous suggérons une palette de couleurs et des dimensions, mais
                    l&apos;art ne connaît pas de frontières. Si votre vision demande
                    de sortir du cadre, faites-le. Surprenez-nous.
                  </p>
                </div>
              </div>
            </FadeIn>

            {/* Règle 3 */}
            <FadeIn delay={0.3}>
              <div className="flex gap-6">
                <div className="flex-shrink-0">
                  <span className="font-display text-4xl font-bold text-primary/20">03</span>
                </div>
                <div>
                  <h3 className="font-display text-xl font-bold text-dark mb-2">
                    Format et soumission
                  </h3>
                  <p className="font-body text-dark/60 leading-relaxed">
                    PNG ou JPEG en haute résolution (minimum 3000x3000px).
                    Incluez votre compte Instagram pour la publication.
                    Une seule soumission par artiste.
                  </p>
                </div>
              </div>
            </FadeIn>

            {/* Règle 4 */}
            <FadeIn delay={0.4}>
              <div className="flex gap-6">
                <div className="flex-shrink-0">
                  <span className="font-display text-4xl font-bold text-primary/20">04</span>
                </div>
                <div>
                  <h3 className="font-display text-xl font-bold text-dark mb-2">
                    Droits et publication
                  </h3>
                  <p className="font-body text-dark/60 leading-relaxed">
                    En soumettant, vous autorisez Arteral à publier votre œuvre sur
                    Instagram pour le vote. Le gagnant cède les droits d&apos;exploitation
                    pour la collection en échange du prix et des crédits.
                  </p>
                </div>
              </div>
            </FadeIn>
          </div>

          {/* Guide des contraintes */}
          <FadeIn delay={0.5}>
            <div className="mt-16 p-8 md:p-10 bg-light border border-dark/10">
              <h3 className="font-display text-xl font-bold text-dark mb-6">
                Guide suggéré (non obligatoire)
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="font-mono text-[10px] tracking-[0.2em] text-dark/40 mb-2">PALETTE</p>
                  <div className="flex gap-2">
                    <div className="w-8 h-8 bg-[#8B0000] rounded-sm" title="Rouge profond" />
                    <div className="w-8 h-8 bg-[#2B2B2B] rounded-sm" title="Noir charbon" />
                    <div className="w-8 h-8 bg-[#E8E8E8] rounded-sm border" title="Blanc" />
                    <div className="w-8 h-8 bg-[#A0522D] rounded-sm" title="Brun/or" />
                  </div>
                </div>
                <div>
                  <p className="font-mono text-[10px] tracking-[0.2em] text-dark/40 mb-2">THÈMES</p>
                  <p className="font-body text-sm text-dark/60">
                    Miroir, reflet, dualité, amour, solitude, connexion
                  </p>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Formulaire de soumission */}
      <section id="participer" className="py-20 md:py-32 bg-light">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="text-center mb-12">
              <span className="font-mono text-[10px] tracking-[0.4em] text-dark/40 block mb-4">
                SOUMISSION
              </span>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-dark mb-6">
                Envoyez votre œuvre
              </h2>
              <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-primary to-transparent mx-auto" />
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="bg-white p-12 border border-dark/10 text-center"
                >
                  <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="font-display text-2xl text-primary">✓</span>
                  </div>
                  <h3 className="font-display text-2xl font-bold text-dark mb-4">
                    Œuvre reçue
                  </h3>
                  <p className="font-body text-dark/60">
                    Merci pour votre participation. Nous vous contacterons bientôt.
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-white p-10 md:p-12 border border-dark/10"
                >
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label className="block font-body text-sm text-dark/60 mb-2">
                        Nom complet
                      </label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="w-full px-4 py-3 border border-dark/20 bg-transparent focus:border-primary focus:outline-none transition-colors font-body"
                        placeholder="Votre nom"
                      />
                    </div>

                    <div>
                      <label className="block font-body text-sm text-dark/60 mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full px-4 py-3 border border-dark/20 bg-transparent focus:border-primary focus:outline-none transition-colors font-body"
                        placeholder="votre@email.com"
                      />
                    </div>

                    <div>
                      <label className="block font-body text-sm text-dark/60 mb-2">
                        Instagram
                      </label>
                      <input
                        type="text"
                        value={instagram}
                        onChange={(e) => setInstagram(e.target.value)}
                        required
                        className="w-full px-4 py-3 border border-dark/20 bg-transparent focus:border-primary focus:outline-none transition-colors font-body"
                        placeholder="@votre_compte"
                      />
                    </div>

                    <div>
                      <label className="block font-body text-sm text-dark/60 mb-2">
                        Votre œuvre
                      </label>
                      <div className="border border-dashed border-dark/20 p-8 text-center hover:border-primary transition-colors cursor-pointer">
                        <input
                          type="file"
                          onChange={handleFileChange}
                          accept=".png,.jpg,.jpeg"
                          required
                          className="hidden"
                          id="artwork-upload"
                        />
                        <label htmlFor="artwork-upload" className="cursor-pointer block">
                          {selectedFile ? (
                            <div>
                              <p className="font-body text-primary font-medium">{selectedFile.name}</p>
                              <p className="font-mono text-[10px] text-dark/40 mt-1">Cliquez pour changer</p>
                            </div>
                          ) : (
                            <div>
                              <p className="font-body text-dark/60 mb-1">Glissez ou cliquez pour uploader</p>
                              <p className="font-mono text-[10px] text-dark/40">PNG, JPEG - Min 3000x3000px</p>
                            </div>
                          )}
                        </label>
                      </div>
                    </div>

                    <div className="pt-4">
                      <button
                        type="submit"
                        className="w-full font-body text-sm py-4 bg-dark hover:bg-primary text-white transition-colors duration-300"
                      >
                        Soumettre mon œuvre
                      </button>
                    </div>

                    <p className="font-mono text-[10px] text-dark/40 text-center">
                      En soumettant, vous acceptez les conditions de participation.
                    </p>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </FadeIn>
        </div>
      </section>

      {/* Deadline */}
      <section className="py-16 bg-dark text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <FadeIn>
            <span className="font-mono text-[10px] tracking-[0.4em] text-white/40 block mb-4">
              DATE LIMITE
            </span>
            <p className="font-display text-3xl md:text-4xl font-bold">
              15 Janvier 2025
            </p>
            <p className="font-body text-sm text-white/50 mt-4">
              Les résultats seront annoncés le 1er Février 2025
            </p>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
