"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Instagram, ChevronDown, Send, Users, Paintbrush, Globe, Sparkles, MessageCircle } from "lucide-react";
import { useContent } from "@/hooks/useContent";
import FadeIn from "@/components/FadeIn";

export default function ContactPage() {
  const { contactContent, siteConfig, contactPageContent } = useContent();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Use real API if available, fallback to localStorage
    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, name, source: 'contact-page' }),
      });

      if (!response.ok) {
        throw new Error('API error');
      }
    } catch {
      // Fallback to localStorage
      const subscribers = JSON.parse(localStorage.getItem("arteral-newsletter") || "[]");
      subscribers.push({ email, name, timestamp: Date.now(), source: "contact-page" });
      localStorage.setItem("arteral-newsletter", JSON.stringify(subscribers));
    }

    setSubmitted(true);
    setTimeout(() => {
      setEmail("");
      setName("");
      setSubmitted(false);
    }, 3000);
  };

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const stats = [
    { icon: Users, value: "2,847", label: contactPageContent.stats?.community || "Community members" },
    { icon: Paintbrush, value: "12", label: contactPageContent.stats?.artists || "Artists" },
    { icon: Globe, value: "15", label: contactPageContent.stats?.countries || "Countries" },
  ];

  return (
    <div className="bg-[#E8E8E8] dark:bg-[#0A0A0A]">
      {/* Hero Section */}
      <section className="py-20 md:py-32 bg-gradient-to-br from-dark via-dark/95 to-primary/20 text-white relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(139, 69, 69, 0.1) 35px, rgba(139, 69, 69, 0.1) 70px)`,
            }}
          />
        </div>

        {/* Floating elements */}
        <motion.div
          animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-20 left-10 w-16 h-16 border border-primary/30 rounded-full hidden md:block"
        />
        <motion.div
          animate={{ y: [0, 20, 0], rotate: [0, -5, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-20 right-10 w-24 h-24 border border-accent/20 rounded-full hidden md:block"
        />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <FadeIn>
            <p className="font-mono text-xs md:text-sm tracking-[0.3em] text-primary mb-6">
              {contactPageContent.hero.label || "REJOIGNEZ-NOUS"}
            </p>
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 md:mb-6">
              {contactPageContent.hero.title}
            </h1>
            <p className="font-display text-lg md:text-xl text-light/90 mb-6 md:mb-8">
              {contactPageContent.hero.subtitle || ""}
            </p>
            <p className="font-body text-base md:text-lg text-light/80 leading-relaxed max-w-2xl mx-auto">
              {contactPageContent.hero.description}
            </p>
          </FadeIn>

          {/* Stats */}
          <FadeIn delay={0.2}>
            <div className="flex flex-wrap justify-center gap-8 md:gap-16 mt-12 md:mt-16">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="text-center"
                >
                  <stat.icon className="w-6 h-6 md:w-8 md:h-8 text-primary mx-auto mb-2" />
                  <p className="font-display text-2xl md:text-3xl font-bold text-white">{stat.value}</p>
                  <p className="font-body text-xs md:text-sm text-light/70">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 md:py-24 bg-[#E8E8E8] dark:bg-[#0A0A0A]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="bg-white dark:bg-[#1A1A1A] p-8 md:p-12 rounded-2xl shadow-xl relative overflow-hidden">
              {/* Decorative corner */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-primary/10 to-transparent rounded-bl-full" />

              <div className="relative z-10">
                <div className="flex items-center justify-center gap-3 mb-6">
                  <Sparkles className="w-6 h-6 text-primary" />
                  <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-[#2B2B2B] dark:text-white">
                    {contactContent.newsletter.headline}
                  </h2>
                </div>
                <p className="font-body text-base md:text-lg text-[#4A4A4A] dark:text-gray-300 mb-8 md:mb-10 text-center max-w-xl mx-auto">
                  {contactContent.newsletter.subtitle}
                </p>

                {submitted ? (
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="bg-primary/10 border-2 border-primary/30 p-6 rounded-xl text-center"
                  >
                    <Sparkles className="w-8 h-8 text-primary mx-auto mb-3" />
                    <p className="font-body text-lg text-primary font-semibold">
                      {contactContent.newsletter.successMessage}
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                      <label
                        htmlFor="email"
                        className="block font-body text-sm font-semibold text-[#2B2B2B] dark:text-white mb-2"
                      >
                        {contactPageContent.form.email}
                      </label>
                      <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full px-4 py-3 md:py-4 font-body text-base text-[#2B2B2B] dark:text-white bg-[#F5F5F5] dark:bg-[#0A0A0A] border-2 border-transparent focus:border-primary rounded-xl focus:outline-none transition-all"
                        placeholder={contactPageContent.form.emailPlaceholder}
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="name"
                        className="block font-body text-sm font-semibold text-[#2B2B2B] dark:text-white mb-2"
                      >
                        {contactPageContent.form.name}
                      </label>
                      <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-4 py-3 md:py-4 font-body text-base text-[#2B2B2B] dark:text-white bg-[#F5F5F5] dark:bg-[#0A0A0A] border-2 border-transparent focus:border-primary rounded-xl focus:outline-none transition-all"
                        placeholder={contactPageContent.form.namePlaceholder}
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full flex items-center justify-center gap-3 font-body font-semibold text-base sm:text-lg px-8 py-4 sm:py-5 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary text-white rounded-xl transition-all hover:scale-[1.02] shadow-lg hover:shadow-xl"
                    >
                      <span>{contactPageContent.form.submit}</span>
                      <Send className="w-5 h-5" />
                    </button>

                    <p className="font-body text-xs md:text-sm text-[#6A6A6A] dark:text-gray-400 text-center mt-4">
                      {contactContent.newsletter.privacy}
                    </p>
                  </form>
                )}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Contact Info Section */}
      <section className="py-16 md:py-24 bg-white dark:bg-[#1A1A1A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="text-center mb-10 md:mb-14">
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-[#2B2B2B] dark:text-white mb-4">
                {contactPageContent.contactSection.title}
              </h2>
              <p className="font-body text-base md:text-lg text-[#5A5A5A] dark:text-gray-400 max-w-2xl mx-auto">
                {contactPageContent.contactSection.subtitle || ""}
              </p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            <FadeIn delay={0.1}>
              <a
                href={`mailto:${contactContent.info.email}`}
                className="group bg-gradient-to-br from-[#F8F8F8] to-[#F0F0F0] dark:from-[#1A1A1A] dark:to-[#0A0A0A] p-6 md:p-8 rounded-2xl hover:shadow-xl transition-all duration-300 border border-transparent hover:border-primary/20 flex items-center gap-5"
              >
                <div className="flex-shrink-0 w-14 h-14 md:w-16 md:h-16 bg-primary/10 group-hover:bg-primary/20 rounded-xl flex items-center justify-center transition-all duration-300">
                  <Mail className="w-6 h-6 md:w-7 md:h-7 text-primary" />
                </div>
                <div>
                  <p className="font-mono text-xs font-semibold text-primary uppercase tracking-wider mb-1">
                    {contactPageContent.contactSection.email}
                  </p>
                  <p className="font-body text-lg md:text-xl text-[#2B2B2B] dark:text-white font-semibold group-hover:text-primary transition-colors">
                    {contactContent.info.email}
                  </p>
                </div>
              </a>
            </FadeIn>

            <FadeIn delay={0.2}>
              <a
                href={`https://instagram.com/${contactContent.info.instagram.replace("@", "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-gradient-to-br from-[#F8F8F8] to-[#F0F0F0] dark:from-[#1A1A1A] dark:to-[#0A0A0A] p-6 md:p-8 rounded-2xl hover:shadow-xl transition-all duration-300 border border-transparent hover:border-accent/20 flex items-center gap-5"
              >
                <div className="flex-shrink-0 w-14 h-14 md:w-16 md:h-16 bg-accent/10 group-hover:bg-accent/20 rounded-xl flex items-center justify-center transition-all duration-300">
                  <Instagram className="w-6 h-6 md:w-7 md:h-7 text-accent" />
                </div>
                <div>
                  <p className="font-mono text-xs font-semibold text-accent uppercase tracking-wider mb-1">
                    {contactPageContent.contactSection.instagram}
                  </p>
                  <p className="font-body text-lg md:text-xl text-[#2B2B2B] dark:text-white font-semibold group-hover:text-accent transition-colors">
                    {contactContent.info.instagram}
                  </p>
                </div>
              </a>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-24 bg-[#E8E8E8] dark:bg-[#0A0A0A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="text-center mb-10 md:mb-14">
              <MessageCircle className="w-10 h-10 text-primary mx-auto mb-4" />
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-[#2B2B2B] dark:text-white mb-4">
                {contactPageContent.faq.title}
              </h2>
              <p className="font-body text-base md:text-lg text-[#5A5A5A] dark:text-gray-400">
                {contactPageContent.faq.subtitle || ""}
              </p>
            </div>
          </FadeIn>

          <div className="space-y-4">
            {contactContent.faq.map((item: { question: string; answer: string }, index: number) => (
              <FadeIn key={index} delay={index * 0.05}>
                <div className="bg-white dark:bg-[#1A1A1A] rounded-xl shadow-sm overflow-hidden border border-transparent hover:border-primary/10 transition-colors">
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full flex items-center justify-between p-5 md:p-6 text-left hover:bg-[#FAFAFA] dark:hover:bg-[#1A1A1A]/80 transition-colors"
                  >
                    <h3 className="font-body text-base md:text-lg font-semibold text-[#2B2B2B] dark:text-white pr-4">
                      {item.question}
                    </h3>
                    <ChevronDown
                      className={`w-5 h-5 md:w-6 md:h-6 text-primary flex-shrink-0 transition-transform duration-300 ${
                        openFaq === index ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      openFaq === index
                        ? "max-h-96 opacity-100"
                        : "max-h-0 opacity-0"
                    }`}
                  >
                    <div className="px-5 md:px-6 pb-5 md:pb-6 border-t border-gray-100 dark:border-gray-800 pt-4">
                      <p className="font-body text-sm md:text-base text-[#5A5A5A] dark:text-gray-300 leading-relaxed">
                        {item.answer}
                      </p>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-dark via-dark/95 to-accent/20 text-white relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-accent rounded-full blur-3xl" />
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <FadeIn>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mb-4 md:mb-6">
              {contactPageContent.cta.title}
            </h2>
            <p className="font-body text-base md:text-lg text-light/90 leading-relaxed mb-8 md:mb-12 max-w-2xl mx-auto">
              {contactPageContent.cta.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/marque"
                className="inline-flex items-center justify-center gap-2 font-body font-semibold text-base sm:text-lg px-8 sm:px-10 py-4 sm:py-5 bg-primary hover:bg-primary/90 text-white rounded-xl transition-all hover:scale-105 shadow-lg hover:shadow-xl"
              >
                {contactPageContent.cta.brand}
              </a>
              <a
                href="/collection"
                className="inline-flex items-center justify-center gap-2 font-body font-semibold text-base sm:text-lg px-8 sm:px-10 py-4 sm:py-5 border-2 border-white/80 hover:bg-white hover:text-dark text-white rounded-xl transition-all hover:scale-105"
              >
                {contactPageContent.cta.collection}
              </a>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
