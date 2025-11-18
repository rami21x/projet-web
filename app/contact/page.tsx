"use client";

import { useState } from "react";
import { Mail, Instagram, ChevronDown, Send } from "lucide-react";
import { useContent } from "@/hooks/useContent";
import FadeIn from "@/components/FadeIn";

export default function ContactPage() {
  const { contactContent, siteConfig } = useContent();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Integrate with actual newsletter service
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

  return (
    <div>
      {/* Hero Section */}
      <section className="py-20 md:py-32 bg-gradient-to-br from-dark to-dark/95 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeIn>
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 md:mb-8">
              Contact
            </h1>
            <p className="font-body text-lg md:text-xl text-white/90 dark:text-white/95 leading-relaxed max-w-3xl mx-auto">
              Rejoignez la communauté Arteral et restez informé de nos nouvelles
              collections, collaborations artistiques et explorations philosophiques.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 md:py-24 bg-light dark:bg-dark/50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="bg-white dark:bg-dark/80 p-8 md:p-12 rounded-lg shadow-lg">
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-dark dark:text-white mb-4 md:mb-6 text-center">
                {contactContent.newsletter.headline}
              </h2>
              <p className="font-body text-base md:text-lg text-dark/70 dark:text-white/80 mb-8 md:mb-10 text-center">
                {contactContent.newsletter.subtitle}
              </p>

              {submitted ? (
                <div className="bg-primary/10 border-2 border-primary/30 p-6 rounded-lg text-center">
                  <p className="font-body text-lg text-primary font-semibold">
                    {contactContent.newsletter.successMessage}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label
                      htmlFor="email"
                      className="block font-body text-sm font-semibold text-dark dark:text-white/90 mb-2"
                    >
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full px-4 py-3 md:py-4 font-body text-base text-dark dark:text-white bg-white dark:bg-dark/60 border-2 border-dark/20 dark:border-white/20 rounded-lg focus:outline-none focus:border-primary transition-colors"
                      placeholder="votre@email.com"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="name"
                      className="block font-body text-sm font-semibold text-dark dark:text-white/90 mb-2"
                    >
                      Nom (optionnel)
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-4 py-3 md:py-4 font-body text-base text-dark dark:text-white bg-white dark:bg-dark/60 border-2 border-dark/20 dark:border-white/20 rounded-lg focus:outline-none focus:border-primary transition-colors"
                      placeholder="Votre nom"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-3 font-body font-semibold text-base sm:text-lg px-8 py-4 sm:py-5 bg-primary hover:bg-primary/90 text-white rounded-lg transition-all hover:scale-105 shadow-lg hover:shadow-xl"
                  >
                    <span>S'inscrire</span>
                    <Send className="w-5 h-5" />
                  </button>

                  <p className="font-body text-xs md:text-sm text-dark/60 dark:text-white/60 text-center mt-4">
                    {contactContent.newsletter.privacy}
                  </p>
                </form>
              )}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Contact Info Section */}
      <section className="py-16 md:py-24 bg-white dark:bg-dark/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-dark dark:text-white mb-8 md:mb-12 text-center">
              Nous contacter
            </h2>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            <FadeIn delay={0.1}>
              <a
                href={`mailto:${contactContent.info.email}`}
                className="bg-gradient-to-br from-primary/5 to-primary/10 dark:from-primary/20 dark:to-primary/30 p-6 md:p-8 rounded-lg hover:shadow-lg transition-all duration-300 group flex items-center gap-4"
              >
                <div className="flex-shrink-0 w-12 h-12 md:w-16 md:h-16 bg-primary/20 group-hover:bg-primary/30 rounded-full flex items-center justify-center transition-all duration-300">
                  <Mail className="w-6 h-6 md:w-8 md:h-8 text-primary" />
                </div>
                <div>
                  <p className="font-body text-sm font-semibold text-dark/60 dark:text-white/60 uppercase tracking-wider mb-1">
                    Email
                  </p>
                  <p className="font-body text-base md:text-lg text-dark dark:text-white font-semibold">
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
                className="bg-gradient-to-br from-accent/5 to-accent/10 dark:from-accent/20 dark:to-accent/30 p-6 md:p-8 rounded-lg hover:shadow-lg transition-all duration-300 group flex items-center gap-4"
              >
                <div className="flex-shrink-0 w-12 h-12 md:w-16 md:h-16 bg-accent/20 group-hover:bg-accent/30 rounded-full flex items-center justify-center transition-all duration-300">
                  <Instagram className="w-6 h-6 md:w-8 md:h-8 text-accent" />
                </div>
                <div>
                  <p className="font-body text-sm font-semibold text-dark/60 dark:text-white/60 uppercase tracking-wider mb-1">
                    Instagram
                  </p>
                  <p className="font-body text-base md:text-lg text-dark dark:text-white font-semibold">
                    {contactContent.info.instagram}
                  </p>
                </div>
              </a>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-24 bg-light dark:bg-dark/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-dark dark:text-white mb-8 md:mb-12 text-center">
              Questions Fréquentes
            </h2>
          </FadeIn>

          <div className="space-y-4">
            {contactContent.faq.map((item, index) => (
              <FadeIn key={index} delay={index * 0.05}>
                <div className="bg-white dark:bg-dark/80 rounded-lg shadow-sm overflow-hidden">
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full flex items-center justify-between p-6 md:p-8 text-left hover:bg-light/50 dark:hover:bg-dark/60 transition-colors"
                  >
                    <h3 className="font-body text-base md:text-lg font-semibold text-dark dark:text-white pr-4">
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
                    <div className="px-6 md:px-8 pb-6 md:pb-8">
                      <p className="font-body text-sm md:text-base text-dark/70 dark:text-white/80 leading-relaxed">
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
      <section className="py-16 md:py-24 bg-gradient-to-br from-dark via-dark/95 to-primary/20 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeIn>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mb-6 md:mb-8">
              Explorez l'univers Arteral
            </h2>
            <p className="font-body text-base md:text-lg text-light/80 leading-relaxed mb-8 md:mb-12 max-w-2xl mx-auto">
              Découvrez notre philosophie, notre processus créatif et la
              collection Amour ↔ Ennuie.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/marque"
                className="inline-block font-body font-semibold text-base sm:text-lg px-8 sm:px-10 py-4 sm:py-5 bg-primary hover:bg-primary/90 text-white rounded-sm transition-all hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Découvrir la marque
              </a>
              <a
                href="/collection"
                className="inline-block font-body font-semibold text-base sm:text-lg px-8 sm:px-10 py-4 sm:py-5 border-2 border-white hover:bg-white hover:text-dark text-white rounded-sm transition-all hover:scale-105"
              >
                Voir la collection
              </a>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
