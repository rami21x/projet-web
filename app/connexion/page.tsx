"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Palette,
  ShoppingBag,
  Mail,
  Lock,
  User,
  Instagram,
  ArrowRight,
  ArrowLeft,
  Loader2,
  Sparkles,
  Heart,
  Eye,
  EyeOff,
  CheckCircle2,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useContent } from "@/hooks/useContent";
import FadeIn from "@/components/FadeIn";

type Mode = "choice" | "login" | "register";
type Role = "artist" | "client";

export default function ConnexionPage() {
  const router = useRouter();
  const { login, register } = useAuth();
  const { connexionPageContent: t } = useContent();
  const [mode, setMode] = useState<Mode>("choice");
  const [role, setRole] = useState<Role>("client");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  // Form fields
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [artistName, setArtistName] = useState("");
  const [instagram, setInstagram] = useState("");
  const [bio, setBio] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const result = await login(email, password);
    setLoading(false);
    if (result.success) {
      setSuccess(true);
      setTimeout(() => router.push("/dashboard"), 1000);
    } else {
      setError(result.error || t.errors.loginError);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const result = await register({
      email,
      password,
      name,
      role,
      artistName: role === "artist" ? artistName : undefined,
      instagram: role === "artist" ? instagram : undefined,
      bio,
    });
    setLoading(false);
    if (result.success) {
      setSuccess(true);
      setTimeout(() => router.push("/dashboard"), 1000);
    } else {
      setError(result.error || t.errors.registerError);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-[#E8E8E8] dark:bg-[#0A0A0A] flex items-center justify-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center"
        >
          <CheckCircle2 className="w-20 h-20 text-green-500 mx-auto mb-4" />
          <h2 className="font-display text-2xl font-bold text-[#2B2B2B] dark:text-white mb-2">
            {mode === "login" ? t.success.loggedIn : t.success.accountCreated}
          </h2>
          <p className="text-[#5A5A5A] dark:text-gray-400">{t.success.redirecting}</p>
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
          <div className="absolute top-1/4 -left-32 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <FadeIn>
            <span className="font-mono text-xs tracking-[0.3em] text-primary uppercase">
              {t.hero.label}
            </span>
            <h1 className="font-display text-4xl sm:text-5xl font-bold mt-4 mb-4">
              {mode === "choice" && t.hero.titleChoice}
              {mode === "login" && t.hero.titleLogin}
              {mode === "register" && (role === "artist" ? t.hero.titleRegisterArtist : t.hero.titleRegisterClient)}
            </h1>
            <p className="font-body text-lg text-white/70 max-w-xl mx-auto">
              {mode === "choice" && t.hero.subtitleChoice}
              {mode === "login" && t.hero.subtitleLogin}
              {mode === "register" && role === "artist" && t.hero.subtitleRegisterArtist}
              {mode === "register" && role === "client" && t.hero.subtitleRegisterClient}
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 md:py-20">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatePresence mode="wait">
            {/* Role Choice */}
            {mode === "choice" && (
              <motion.div
                key="choice"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6"
              >
                {/* Artist Card */}
                <button
                  onClick={() => { setRole("artist"); setMode("register"); }}
                  className="w-full group"
                >
                  <div className="bg-white dark:bg-[#111111] border border-black/5 dark:border-white/5 p-8 hover:shadow-xl hover:border-primary/30 transition-all duration-300 text-left">
                    <div className="flex items-start gap-6">
                      <div className="w-16 h-16 bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                        <Palette className="w-8 h-8 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-display text-2xl font-bold text-[#2B2B2B] dark:text-white mb-2 group-hover:text-primary transition-colors">
                          {t.roles.artist.title}
                        </h3>
                        <p className="font-body text-[#5A5A5A] dark:text-gray-400 mb-4">
                          {t.roles.artist.description}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {t.roles.artist.features.map((f: string) => (
                            <span key={f} className="px-3 py-1 bg-primary/5 text-primary text-xs font-medium">
                              {f}
                            </span>
                          ))}
                        </div>
                      </div>
                      <ArrowRight className="w-6 h-6 text-[#D8D8D8] dark:text-gray-600 group-hover:text-primary transition-colors flex-shrink-0" />
                    </div>
                  </div>
                </button>

                {/* Client Card */}
                <button
                  onClick={() => { setRole("client"); setMode("register"); }}
                  className="w-full group"
                >
                  <div className="bg-white dark:bg-[#111111] border border-black/5 dark:border-white/5 p-8 hover:shadow-xl hover:border-primary/30 transition-all duration-300 text-left">
                    <div className="flex items-start gap-6">
                      <div className="w-16 h-16 bg-amber-500/10 flex items-center justify-center flex-shrink-0 group-hover:bg-amber-500/20 transition-colors">
                        <ShoppingBag className="w-8 h-8 text-amber-500" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-display text-2xl font-bold text-[#2B2B2B] dark:text-white mb-2 group-hover:text-amber-500 transition-colors">
                          {t.roles.client.title}
                        </h3>
                        <p className="font-body text-[#5A5A5A] dark:text-gray-400 mb-4">
                          {t.roles.client.description}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {t.roles.client.features.map((f: string) => (
                            <span key={f} className="px-3 py-1 bg-amber-500/5 text-amber-600 dark:text-amber-400 text-xs font-medium">
                              {f}
                            </span>
                          ))}
                        </div>
                      </div>
                      <ArrowRight className="w-6 h-6 text-[#D8D8D8] dark:text-gray-600 group-hover:text-amber-500 transition-colors flex-shrink-0" />
                    </div>
                  </div>
                </button>

                {/* Already have an account */}
                <div className="text-center pt-4">
                  <p className="text-[#5A5A5A] dark:text-gray-400 text-sm">
                    {t.links.alreadyAccount}{" "}
                    <button
                      onClick={() => setMode("login")}
                      className="text-primary font-medium hover:underline"
                    >
                      {t.links.login}
                    </button>
                  </p>
                </div>
              </motion.div>
            )}

            {/* Login Form */}
            {mode === "login" && (
              <motion.div
                key="login"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <div className="bg-white dark:bg-[#111111] border border-black/5 dark:border-white/5 p-8 md:p-10">
                  <button
                    onClick={() => setMode("choice")}
                    className="flex items-center gap-2 text-sm text-[#5A5A5A] dark:text-gray-400 hover:text-primary transition-colors mb-6"
                  >
                    <ArrowLeft className="w-4 h-4" /> {t.form.back}
                  </button>

                  <form onSubmit={handleLogin} className="space-y-5">
                    {/* Email */}
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

                    {/* Password */}
                    <div>
                      <label className="block font-body text-sm font-medium text-[#2B2B2B] dark:text-white mb-2">
                        {t.form.password}
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#8A8A8A]" />
                        <input
                          type={showPassword ? "text" : "password"}
                          required
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="w-full pl-11 pr-12 py-3 bg-[#F5F5F5] dark:bg-[#0A0A0A] border border-black/5 dark:border-white/10 text-[#2B2B2B] dark:text-white font-body focus:outline-none focus:border-primary transition-colors"
                          placeholder="••••••••"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8A8A8A] hover:text-primary"
                        >
                          {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                      </div>
                    </div>

                    {error && (
                      <p className="text-red-500 text-sm font-medium">{error}</p>
                    )}

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-3.5 bg-primary text-white font-semibold hover:bg-primary/90 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      {loading ? (
                        <Loader2 className="w-5 h-5 animate-spin" />
                      ) : (
                        <>
                          {t.form.loginButton}
                          <ArrowRight className="w-5 h-5" />
                        </>
                      )}
                    </button>
                  </form>

                  <div className="text-center mt-6">
                    <p className="text-[#5A5A5A] dark:text-gray-400 text-sm">
                      {t.links.noAccount}{" "}
                      <button
                        onClick={() => setMode("choice")}
                        className="text-primary font-medium hover:underline"
                      >
                        {t.links.createAccount}
                      </button>
                    </p>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Register Form */}
            {mode === "register" && (
              <motion.div
                key="register"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <div className="bg-white dark:bg-[#111111] border border-black/5 dark:border-white/5 p-8 md:p-10">
                  <button
                    onClick={() => setMode("choice")}
                    className="flex items-center gap-2 text-sm text-[#5A5A5A] dark:text-gray-400 hover:text-primary transition-colors mb-6"
                  >
                    <ArrowLeft className="w-4 h-4" /> {t.form.backToChoice}
                  </button>

                  {/* Role badge */}
                  <div className="flex items-center gap-3 mb-8 p-4 bg-[#F5F5F5] dark:bg-[#0A0A0A] border border-black/5 dark:border-white/5">
                    {role === "artist" ? (
                      <Palette className="w-6 h-6 text-primary" />
                    ) : (
                      <ShoppingBag className="w-6 h-6 text-amber-500" />
                    )}
                    <div>
                      <span className="font-display font-bold text-[#2B2B2B] dark:text-white">
                        {role === "artist" ? t.roles.artist.accountTitle : t.roles.client.accountTitle}
                      </span>
                      <p className="text-xs text-[#5A5A5A] dark:text-gray-500">
                        {role === "artist" ? t.roles.artist.accountSubtitle : t.roles.client.accountSubtitle}
                      </p>
                    </div>
                  </div>

                  <form onSubmit={handleRegister} className="space-y-5">
                    {/* Name */}
                    <div>
                      <label className="block font-body text-sm font-medium text-[#2B2B2B] dark:text-white mb-2">
                        {t.form.fullName}
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#8A8A8A]" />
                        <input
                          type="text"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="w-full pl-11 pr-4 py-3 bg-[#F5F5F5] dark:bg-[#0A0A0A] border border-black/5 dark:border-white/10 text-[#2B2B2B] dark:text-white font-body focus:outline-none focus:border-primary transition-colors"
                          placeholder={t.form.fullNamePlaceholder}
                        />
                      </div>
                    </div>

                    {/* Artist-specific fields */}
                    {role === "artist" && (
                      <>
                        <div>
                          <label className="block font-body text-sm font-medium text-[#2B2B2B] dark:text-white mb-2">
                            {t.form.artistName}
                          </label>
                          <div className="relative">
                            <Sparkles className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#8A8A8A]" />
                            <input
                              type="text"
                              value={artistName}
                              onChange={(e) => setArtistName(e.target.value)}
                              className="w-full pl-11 pr-4 py-3 bg-[#F5F5F5] dark:bg-[#0A0A0A] border border-black/5 dark:border-white/10 text-[#2B2B2B] dark:text-white font-body focus:outline-none focus:border-primary transition-colors"
                              placeholder={t.form.artistNamePlaceholder}
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block font-body text-sm font-medium text-[#2B2B2B] dark:text-white mb-2">
                            {t.form.instagram}
                          </label>
                          <div className="relative">
                            <Instagram className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#8A8A8A]" />
                            <input
                              type="text"
                              value={instagram}
                              onChange={(e) => setInstagram(e.target.value)}
                              className="w-full pl-11 pr-4 py-3 bg-[#F5F5F5] dark:bg-[#0A0A0A] border border-black/5 dark:border-white/10 text-[#2B2B2B] dark:text-white font-body focus:outline-none focus:border-primary transition-colors"
                              placeholder={t.form.instagramPlaceholder}
                            />
                          </div>
                        </div>
                      </>
                    )}

                    {/* Email */}
                    <div>
                      <label className="block font-body text-sm font-medium text-[#2B2B2B] dark:text-white mb-2">
                        {t.form.email} *
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

                    {/* Password */}
                    <div>
                      <label className="block font-body text-sm font-medium text-[#2B2B2B] dark:text-white mb-2">
                        {t.form.password} * <span className="text-xs text-[#8A8A8A]">{t.form.passwordHint}</span>
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#8A8A8A]" />
                        <input
                          type={showPassword ? "text" : "password"}
                          required
                          minLength={6}
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="w-full pl-11 pr-12 py-3 bg-[#F5F5F5] dark:bg-[#0A0A0A] border border-black/5 dark:border-white/10 text-[#2B2B2B] dark:text-white font-body focus:outline-none focus:border-primary transition-colors"
                          placeholder="••••••••"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8A8A8A] hover:text-primary"
                        >
                          {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                      </div>
                    </div>

                    {/* Bio */}
                    <div>
                      <label className="block font-body text-sm font-medium text-[#2B2B2B] dark:text-white mb-2">
                        {t.form.bio} <span className="text-xs text-[#8A8A8A]">{t.form.bioOptional}</span>
                      </label>
                      <textarea
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                        rows={3}
                        maxLength={500}
                        className="w-full px-4 py-3 bg-[#F5F5F5] dark:bg-[#0A0A0A] border border-black/5 dark:border-white/10 text-[#2B2B2B] dark:text-white font-body focus:outline-none focus:border-primary transition-colors resize-none"
                        placeholder={role === "artist" ? t.form.bioPlaceholderArtist : t.form.bioPlaceholderClient}
                      />
                    </div>

                    {error && (
                      <p className="text-red-500 text-sm font-medium">{error}</p>
                    )}

                    <button
                      type="submit"
                      disabled={loading}
                      className={`w-full py-3.5 font-semibold transition-colors flex items-center justify-center gap-2 disabled:opacity-50 ${
                        role === "artist"
                          ? "bg-primary text-white hover:bg-primary/90"
                          : "bg-amber-500 text-white hover:bg-amber-600"
                      }`}
                    >
                      {loading ? (
                        <Loader2 className="w-5 h-5 animate-spin" />
                      ) : (
                        <>
                          {role === "artist" ? t.form.createAccountArtist : t.form.createAccountClient}
                          <ArrowRight className="w-5 h-5" />
                        </>
                      )}
                    </button>
                  </form>

                  <div className="text-center mt-6">
                    <p className="text-[#5A5A5A] dark:text-gray-400 text-sm">
                      {t.links.alreadyAccount}{" "}
                      <button
                        onClick={() => setMode("login")}
                        className="text-primary font-medium hover:underline"
                      >
                        {t.links.login}
                      </button>
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
}
