"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Lock, Eye, EyeOff, ArrowRight, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import Link from "next/link";
import FadeIn from "@/components/FadeIn";

function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  // Password validation
  const hasMinLength = password.length >= 12;
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasSpecial = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);
  const passwordsMatch = password === confirmPassword && password.length > 0;
  const isValid = hasMinLength && hasUppercase && hasLowercase && hasSpecial && passwordsMatch;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid || !token) return;

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });

      const data = await res.json();

      if (res.ok) {
        setSuccess(true);
        setTimeout(() => router.push("/connexion"), 3000);
      } else {
        setError(data.error || "Une erreur est survenue");
      }
    } catch {
      setError("Erreur de connexion au serveur");
    } finally {
      setLoading(false);
    }
  };

  if (!token) {
    return (
      <div className="min-h-screen bg-[#E8E8E8] dark:bg-[#0A0A0A] flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h1 className="font-display text-2xl font-bold text-[#2B2B2B] dark:text-white mb-4">
            Lien invalide
          </h1>
          <p className="text-[#5A5A5A] dark:text-gray-400 mb-6">
            Ce lien de réinitialisation est invalide ou a expiré.
          </p>
          <Link
            href="/connexion"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white font-medium"
          >
            Retour à la connexion
          </Link>
        </div>
      </div>
    );
  }

  if (success) {
    return (
      <div className="min-h-screen bg-[#E8E8E8] dark:bg-[#0A0A0A] flex items-center justify-center px-4">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center"
        >
          <CheckCircle2 className="w-20 h-20 text-green-500 mx-auto mb-4" />
          <h2 className="font-display text-2xl font-bold text-[#2B2B2B] dark:text-white mb-2">
            Mot de passe réinitialisé !
          </h2>
          <p className="text-[#5A5A5A] dark:text-gray-400">
            Redirection vers la page de connexion...
          </p>
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
              SÉCURITÉ
            </span>
            <h1 className="font-display text-4xl sm:text-5xl font-bold mt-4 mb-4">
              Nouveau mot de passe
            </h1>
            <p className="font-body text-lg text-white/70 max-w-xl mx-auto">
              Créez un mot de passe sécurisé pour votre compte
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Form */}
      <section className="py-12 md:py-20">
        <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-[#111111] border border-black/5 dark:border-white/5 p-8 md:p-10">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* New Password */}
              <div>
                <label className="block font-body text-sm font-medium text-[#2B2B2B] dark:text-white mb-2">
                  Nouveau mot de passe
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#8A8A8A]" />
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-11 pr-12 py-3 bg-[#F5F5F5] dark:bg-[#0A0A0A] border border-black/5 dark:border-white/10 text-[#2B2B2B] dark:text-white font-body focus:outline-none focus:border-primary transition-colors"
                    placeholder="••••••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8A8A8A] hover:text-primary"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>

                {/* Password requirements */}
                <div className="mt-3 space-y-1">
                  <PasswordRequirement met={hasMinLength} text="12 caractères minimum" />
                  <PasswordRequirement met={hasUppercase} text="Une lettre majuscule" />
                  <PasswordRequirement met={hasLowercase} text="Une lettre minuscule" />
                  <PasswordRequirement met={hasSpecial} text="Un caractère spécial (!@#$%...)" />
                </div>
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block font-body text-sm font-medium text-[#2B2B2B] dark:text-white mb-2">
                  Confirmer le mot de passe
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#8A8A8A]" />
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 bg-[#F5F5F5] dark:bg-[#0A0A0A] border border-black/5 dark:border-white/10 text-[#2B2B2B] dark:text-white font-body focus:outline-none focus:border-primary transition-colors"
                    placeholder="••••••••••••"
                  />
                </div>
                {confirmPassword && !passwordsMatch && (
                  <p className="mt-2 text-sm text-red-500">Les mots de passe ne correspondent pas</p>
                )}
              </div>

              {error && (
                <p className="text-red-500 text-sm font-medium">{error}</p>
              )}

              <button
                type="submit"
                disabled={!isValid || loading}
                className={`w-full py-3.5 font-semibold flex items-center justify-center gap-2 transition-colors ${
                  isValid && !loading
                    ? "bg-primary text-white hover:bg-primary/90"
                    : "bg-gray-200 dark:bg-gray-800 text-gray-400 cursor-not-allowed"
                }`}
              >
                {loading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    Réinitialiser
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

function PasswordRequirement({ met, text }: { met: boolean; text: string }) {
  return (
    <div className={`flex items-center gap-2 text-xs ${met ? "text-green-600" : "text-[#8A8A8A]"}`}>
      <div className={`w-1.5 h-1.5 rounded-full ${met ? "bg-green-500" : "bg-gray-300"}`} />
      {text}
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#E8E8E8] dark:bg-[#0A0A0A] flex items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-primary" />
      </div>
    }>
      <ResetPasswordForm />
    </Suspense>
  );
}
