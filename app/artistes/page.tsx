"use client";

import { useState } from "react";
import Link from "next/link";
import FadeIn from "@/components/FadeIn";
import { motion, AnimatePresence } from "framer-motion";
import { useContent } from "@/hooks/useContent";

export default function ConcoursPage() {
  const { contestPageContent } = useContent();
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
    <div className="bg-[#E8E8E8] dark:bg-[#0A0A0A]">
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
                {contestPageContent.hero.label}
              </span>

              <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight">
                {contestPageContent.hero.title1}
                <br />
                <span className="text-primary">{contestPageContent.hero.title2}</span>
              </h1>

              <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mb-8" />

              <p className="font-body text-lg md:text-xl text-white/60 max-w-2xl mx-auto mb-12 leading-relaxed">
                {contestPageContent.hero.description}
              </p>

              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                <a
                  href="#participer"
                  className="inline-block font-body text-sm px-10 py-4 border border-white/30 hover:border-primary hover:bg-primary/10 text-white transition-all duration-300"
                >
                  {contestPageContent.hero.cta}
                </a>
                <a
                  href="#regles"
                  className="inline-flex items-center gap-2 font-body text-sm text-white/50 hover:text-white transition-colors"
                >
                  <span>{contestPageContent.hero.rules}</span>
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
      <section className="py-20 md:py-32 bg-white dark:bg-[#0A0A0A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="text-center mb-16">
              <span className="font-mono text-[10px] tracking-[0.4em] text-[#7A7A7A] dark:text-gray-500 block mb-4">
                {contestPageContent.concept.label}
              </span>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-[#2B2B2B] dark:text-white mb-6">
                {contestPageContent.concept.title}
              </h2>
              <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-primary to-transparent mx-auto" />
            </div>

            <div className="prose prose-lg max-w-none">
              <p className="font-body text-[#4A4A4A] dark:text-gray-300 leading-relaxed mb-6 text-center">
                {contestPageContent.concept.description}
              </p>
            </div>

            {/* Le Livrable */}
            <div className="mt-16 relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 rounded-sm" />
              <div className="relative p-10 md:p-14 border border-dark/10 dark:border-white/10">
                <span className="font-mono text-[10px] tracking-[0.4em] text-primary/60 dark:text-primary block mb-4">
                  {contestPageContent.concept.essential.label}
                </span>
                <h3 className="font-display text-2xl md:text-3xl font-bold text-[#2B2B2B] dark:text-white mb-4">
                  {contestPageContent.concept.essential.title}
                </h3>
                <p className="font-body text-[#5A5A5A] dark:text-gray-400 leading-relaxed mb-6">
                  {contestPageContent.concept.essential.description}
                </p>
                <Link
                  href="/collection"
                  className="inline-flex items-center gap-3 font-body text-sm font-medium text-primary hover:text-primary/70 transition-colors group"
                >
                  <span>{contestPageContent.concept.essential.cta}</span>
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
                {contestPageContent.prizes.label}
              </span>
              <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
                {contestPageContent.prizes.title}
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
                    {contestPageContent.prizes.peuple.label}
                  </span>
                  <h3 className="font-display text-3xl md:text-4xl font-bold text-white mb-2">
                    {contestPageContent.prizes.peuple.title}
                  </h3>
                  <p className="font-display text-5xl md:text-6xl font-bold text-primary mb-6">
                    {contestPageContent.prizes.peuple.amount}
                  </p>
                  <div className="w-12 h-[1px] bg-white/20 mb-6" />
                  <p className="font-body text-white/60 leading-relaxed mb-6">
                    {contestPageContent.prizes.peuple.description} <span className="text-white font-semibold">{contestPageContent.prizes.peuple.you}</span>.
                    {contestPageContent.prizes.peuple.details}
                  </p>
                  <ul className="space-y-3">
                    {contestPageContent.prizes.peuple.rewards.map((reward, index) => (
                      <li key={index} className="flex items-start gap-3 font-body text-sm text-white/70">
                        <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                        {reward}
                      </li>
                    ))}
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
                    {contestPageContent.prizes.coeur.label}
                  </span>
                  <h3 className="font-display text-3xl md:text-4xl font-bold text-white mb-2">
                    {contestPageContent.prizes.coeur.title}
                  </h3>
                  <p className="font-display text-5xl md:text-6xl font-bold text-accent mb-6">
                    {contestPageContent.prizes.coeur.amount}
                  </p>
                  <div className="w-12 h-[1px] bg-white/20 mb-6" />
                  <p className="font-body text-white/60 leading-relaxed mb-6">
                    {contestPageContent.prizes.coeur.description}
                  </p>

                  {/* Jury mystère */}
                  <div className="space-y-4 mb-6">
                    {contestPageContent.prizes.coeur.jury.map((member, index) => (
                      <div key={index} className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-full ${index === 2 ? 'bg-primary/30' : 'bg-white/10'} flex items-center justify-center`}>
                          <span className={`font-display text-lg ${index === 2 ? 'text-white' : 'text-white/40'}`}>
                            {index === 2 ? 'A' : '?'}
                          </span>
                        </div>
                        <div>
                          <p className="font-body text-sm text-white/80">{member.title}</p>
                          <p className={`font-mono text-[10px] ${index === 2 ? 'text-primary/60' : 'text-white/40'}`}>
                            {member.status}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <ul className="space-y-3">
                    {contestPageContent.prizes.coeur.rewards.map((reward, index) => (
                      <li key={index} className="flex items-start gap-3 font-body text-sm text-white/70">
                        <span className="w-1.5 h-1.5 bg-accent rounded-full mt-2 flex-shrink-0" />
                        {reward}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Règles */}
      <section id="regles" className="py-20 md:py-32 bg-white dark:bg-[#0A0A0A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="text-center mb-16">
              <span className="font-mono text-[10px] tracking-[0.4em] text-[#7A7A7A] dark:text-gray-500 block mb-4">
                {contestPageContent.rules.label}
              </span>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-[#2B2B2B] dark:text-white mb-6">
                {contestPageContent.rules.title}
              </h2>
              <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-primary to-transparent mx-auto" />
            </div>
          </FadeIn>

          <div className="space-y-8">
            {contestPageContent.rules.items.map((rule, index) => (
              <FadeIn key={index} delay={index * 0.1}>
                <div className="flex gap-6">
                  <div className="flex-shrink-0">
                    <span className="font-display text-4xl font-bold text-primary/20 dark:text-primary/30">{rule.num}</span>
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-bold text-[#2B2B2B] dark:text-white mb-2">
                      {rule.title}
                    </h3>
                    <p className="font-body text-[#5A5A5A] dark:text-gray-400 leading-relaxed">
                      {rule.description}
                    </p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>

          {/* Guide des contraintes - Download Section */}
          <FadeIn delay={0.5}>
            <div className="mt-16 p-8 md:p-10 bg-gradient-to-br from-primary/5 to-accent/5 dark:from-primary/10 dark:to-accent/10 border border-primary/20 dark:border-primary/30 rounded-sm">
              <h3 className="font-display text-xl font-bold text-[#2B2B2B] dark:text-white mb-4">
                {contestPageContent.rules.guide.title}
              </h3>

              <div className="mb-6">
                <h4 className="font-display text-lg font-semibold text-primary mb-2">
                  {contestPageContent.rules.guide.downloadTitle}
                </h4>
                <p className="font-body text-sm text-[#5A5A5A] dark:text-gray-400 mb-4">
                  {contestPageContent.rules.guide.downloadDescription}
                </p>
                <a
                  href="/downloads/arteral-concours-brief.zip"
                  download
                  className="inline-flex items-center gap-3 font-body text-sm font-semibold px-6 py-3 bg-primary hover:bg-primary/90 text-white rounded-sm transition-all hover:scale-105 shadow-lg"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  {contestPageContent.rules.guide.downloadButton}
                </a>
              </div>

              <div className="pt-6 border-t border-dark/10 dark:border-white/10">
                <p className="font-mono text-[10px] tracking-[0.2em] text-[#7A7A7A] dark:text-gray-500 mb-2">
                  {contestPageContent.rules.guide.themes}
                </p>
                <p className="font-body text-sm text-[#5A5A5A] dark:text-gray-400">
                  {contestPageContent.rules.guide.themesText}
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Formulaire de soumission */}
      <section id="participer" className="py-20 md:py-32 bg-[#E8E8E8] dark:bg-[#0A0A0A]">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="text-center mb-12">
              <span className="font-mono text-[10px] tracking-[0.4em] text-[#7A7A7A] dark:text-gray-500 block mb-4">
                {contestPageContent.form.label}
              </span>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-[#2B2B2B] dark:text-white mb-6">
                {contestPageContent.form.title}
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
                  className="bg-white dark:bg-white/5 p-12 border border-dark/10 dark:border-white/10 text-center"
                >
                  <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="font-display text-2xl text-primary">✓</span>
                  </div>
                  <h3 className="font-display text-2xl font-bold text-[#2B2B2B] dark:text-white mb-4">
                    {contestPageContent.form.success.title}
                  </h3>
                  <p className="font-body text-[#5A5A5A] dark:text-gray-400">
                    {contestPageContent.form.success.message}
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-white dark:bg-white/5 p-10 md:p-12 border border-dark/10 dark:border-white/10"
                >
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label className="block font-body text-sm text-[#5A5A5A] dark:text-gray-400 mb-2">
                        {contestPageContent.form.fields.name}
                      </label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="w-full px-4 py-3 border border-dark/20 dark:border-white/20 bg-transparent focus:border-primary focus:outline-none transition-colors font-body text-[#2B2B2B] dark:text-white"
                        placeholder={contestPageContent.form.fields.namePlaceholder}
                      />
                    </div>

                    <div>
                      <label className="block font-body text-sm text-[#5A5A5A] dark:text-gray-400 mb-2">
                        {contestPageContent.form.fields.email}
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full px-4 py-3 border border-dark/20 dark:border-white/20 bg-transparent focus:border-primary focus:outline-none transition-colors font-body text-[#2B2B2B] dark:text-white"
                        placeholder={contestPageContent.form.fields.emailPlaceholder}
                      />
                    </div>

                    <div>
                      <label className="block font-body text-sm text-[#5A5A5A] dark:text-gray-400 mb-2">
                        {contestPageContent.form.fields.instagram}
                      </label>
                      <input
                        type="text"
                        value={instagram}
                        onChange={(e) => setInstagram(e.target.value)}
                        required
                        className="w-full px-4 py-3 border border-dark/20 dark:border-white/20 bg-transparent focus:border-primary focus:outline-none transition-colors font-body text-[#2B2B2B] dark:text-white"
                        placeholder={contestPageContent.form.fields.instagramPlaceholder}
                      />
                    </div>

                    <div>
                      <label className="block font-body text-sm text-[#5A5A5A] dark:text-gray-400 mb-2">
                        {contestPageContent.form.fields.artwork}
                      </label>
                      <div className="border border-dashed border-dark/20 dark:border-white/20 p-8 text-center hover:border-primary transition-colors cursor-pointer">
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
                              <p className="font-mono text-[10px] text-[#7A7A7A] dark:text-gray-500 mt-1">
                                {contestPageContent.form.fields.changeFile}
                              </p>
                            </div>
                          ) : (
                            <div>
                              <p className="font-body text-[#5A5A5A] dark:text-gray-400 mb-1">
                                {contestPageContent.form.fields.uploadText}
                              </p>
                              <p className="font-mono text-[10px] text-[#7A7A7A] dark:text-gray-500">
                                {contestPageContent.form.fields.uploadHint}
                              </p>
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
                        {contestPageContent.form.submit}
                      </button>
                    </div>

                    <p className="font-mono text-[10px] text-[#7A7A7A] dark:text-gray-500 text-center">
                      {contestPageContent.form.terms}
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
              {contestPageContent.deadline.label}
            </span>
            <p className="font-display text-3xl md:text-4xl font-bold">
              {contestPageContent.deadline.date}
            </p>
            <p className="font-body text-sm text-white/50 mt-4">
              {contestPageContent.deadline.results}
            </p>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
