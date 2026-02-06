"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, ArrowRight, ArrowLeft, CheckCircle2, Loader2 } from "lucide-react";
import Link from "next/link";
import { useContent } from "@/hooks/useContent";
import FadeIn from "@/components/FadeIn";

export default function ForgotPasswordPage() {
  const { connexionPageContent: t } = useContent();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok) {
        setSent(true);
      } else {
        setError(data.error || "Une erreur est survenue");
      }
    } catch {
      setError("Erreur de connexion au serveur");
    } finally {
      setLoading(false);
    }
  };

  if (sent) {
    return (
      <div className="min-h-screen bg-[#E8E8E8] dark:bg-[#0A0A0A] flex items-center justify-center px-4">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="max-w-md w-full text-center"
        >
          <CheckCircle2 className="w-20 h-20 text-green-500 mx-auto mb-4" />
          <h2 className="font-display text-2xl font-bold text-[#2B2B2B] dark:text-white mb-4">
            Email envoyé !
          </h2>
          <p className="text-[#5A5A5A] dark:text-gray-400 mb-6">
            Si un compte existe avec l&apos;adresse <strong>{email}</strong>,
            vous recevrez un email avec les instructions pour réinitialiser votre mot de passe.
          </p>
          <p className="text-sm text-[#8A8A8A] mb-8">
            Pensez à vérifier vos spams si vous ne voyez pas l&apos;email.
          </p>
          <Link
            href="/connexion"
            className="inline-flex items-center gap-2 text-primary font-medium hover:underline"
          >
            <ArrowLeft className="w-4 h-4" />
            Retour à la connexion
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#E8E8E8] dark:bg-[#0A0A0A]">
      {/* Hero */}
      <section className="relative py-16 md:py-24 bg-[#1A1A1A] text-white overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-transparent" />
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <FadeIn>
            <span className="font-mono text-xs tracking-[0.3em] text-primary uppercase">
              RÉCUPÉRATION
            </span>
            <h1 className="font-display text-4xl sm:text-5xl font-bold mt-4 mb-4">
              Mot de passe oublié
            </h1>
            <p className="font-body text-lg text-white/70 max-w-xl mx-auto">
              Entrez votre email pour recevoir un lien de réinitialisation
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Form */}
      <section className="py-12 md:py-20">
        <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-[#111111] border border-black/5 dark:border-white/5 p-8 md:p-10">
            <Link
              href="/connexion"
              className="flex items-center gap-2 text-sm text-[#5A5A5A] dark:text-gray-400 hover:text-primary transition-colors mb-6"
            >
              <ArrowLeft className="w-4 h-4" /> Retour
            </Link>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block font-body text-sm font-medium text-[#2B2B2B] dark:text-white mb-2">
                  {t.form.email}
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#8A8A8A]" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 bg-[#F5F5F5] dark:bg-[#0A0A0A] border border-black/5 dark:border-white/10 text-[#2B2B2B] dark:text-white font-body focus:outline-none focus:border-primary transition-colors"
                    placeholder="votre@email.com"
                  />
                </div>
              </div>

              {error && (
                <p className="text-red-500 text-sm font-medium">{error}</p>
              )}

              <button
                type="submit"
                disabled={loading || !email}
                className="w-full py-3.5 bg-primary text-white font-semibold hover:bg-primary/90 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {loading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    Envoyer le lien
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
