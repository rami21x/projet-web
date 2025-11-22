"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpen,
  Feather,
  Heart,
  Star,
  Sparkles,
  MessageCircle,
  Users,
  Share2,
  ThumbsUp,
  Instagram,
  Twitter,
  Send,
  Trophy,
  Vote,
  Flame
} from "lucide-react";
import FadeIn from "@/components/FadeIn";
import { useContent } from "@/hooks/useContent";

interface GuestEntry {
  id: number;
  name: string;
  message: string;
  date: string;
  mood: "love" | "inspired" | "thoughtful";
  likes?: number;
}

interface ArtworkVote {
  id: number;
  artist: string;
  title: string;
  image: string;
  votes: number;
  hasVoted?: boolean;
}

const moodIcons = {
  love: Heart,
  inspired: Sparkles,
  thoughtful: Star,
};

const moodEmojis = {
  love: "💖",
  inspired: "✨",
  thoughtful: "🤔",
};

export default function LivreDorPage() {
  const { guestbookPageContent } = useContent();
  const [entries, setEntries] = useState<GuestEntry[]>([]);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [mood, setMood] = useState<"love" | "inspired" | "thoughtful">("inspired");
  const [submitted, setSubmitted] = useState(false);
  const [activeTab, setActiveTab] = useState<"write" | "vote">("write");
  const [artworks, setArtworks] = useState<ArtworkVote[]>([
    { id: 1, artist: "Marie L.", title: "Dualité Urbaine", image: "/images/art1.jpg", votes: 127 },
    { id: 2, artist: "Thomas B.", title: "L'Écho du Chaos", image: "/images/art2.jpg", votes: 98 },
    { id: 3, artist: "Clara M.", title: "Narcisse Digital", image: "/images/art3.jpg", votes: 156 },
  ]);
  const [totalVisitors, setTotalVisitors] = useState(2847);
  const [totalMessages, setTotalMessages] = useState(423);

  // Initialize entries from content
  useEffect(() => {
    if (guestbookPageContent?.defaultEntries) {
      const entriesWithLikes = guestbookPageContent.defaultEntries.map((entry: GuestEntry) => ({
        ...entry,
        likes: Math.floor(Math.random() * 50) + 5,
      }));
      setEntries(entriesWithLikes as GuestEntry[]);
    }
  }, [guestbookPageContent]);

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
      likes: 0,
    };

    setEntries([newEntry, ...entries]);
    setName("");
    setMessage("");
    setSubmitted(true);
    setTotalMessages(prev => prev + 1);

    setTimeout(() => {
      setSubmitted(false);
    }, 3000);
  };

  const handleVote = (artworkId: number) => {
    setArtworks(artworks.map(art =>
      art.id === artworkId
        ? { ...art, votes: art.hasVoted ? art.votes - 1 : art.votes + 1, hasVoted: !art.hasVoted }
        : art
    ));
  };

  const handleLike = (entryId: number) => {
    setEntries(entries.map(entry =>
      entry.id === entryId
        ? { ...entry, likes: (entry.likes || 0) + 1 }
        : entry
    ));
  };

  const shareOnSocial = (platform: string) => {
    const text = encodeURIComponent(guestbookPageContent.social?.shareText || "Découvrez ARTERAL - L'art rencontre la mode");
    const url = encodeURIComponent(typeof window !== 'undefined' ? window.location.href : 'https://arteral.com');

    const urls: Record<string, string> = {
      twitter: `https://twitter.com/intent/tweet?text=${text}&url=${url}`,
      instagram: `https://instagram.com`,
    };

    if (typeof window !== 'undefined') {
      window.open(urls[platform], '_blank');
    }
  };

  return (
    <div className="min-h-screen bg-[#E8E8E8] dark:bg-[#0A0A0A]">
      {/* Hero Section - More Engaging */}
      <section className="relative py-20 md:py-32 bg-[#1A1A1A] text-white overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-accent/20" />
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.2, 0.1],
            }}
            transition={{ duration: 8, repeat: Infinity }}
            className="absolute top-1/4 -left-32 w-96 h-96 bg-primary/30 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.1, 0.2, 0.1],
            }}
            transition={{ duration: 8, repeat: Infinity, delay: 2 }}
            className="absolute bottom-1/4 -right-32 w-96 h-96 bg-accent/30 rounded-full blur-3xl"
          />
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left - Text Content */}
            <FadeIn>
              <div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-3 mb-6"
                >
                  <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center">
                    <MessageCircle className="w-6 h-6 text-accent" />
                  </div>
                  <span className="font-mono text-xs tracking-[0.3em] text-accent uppercase">
                    {guestbookPageContent.hero.label}
                  </span>
                </motion.div>

                <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
                  {guestbookPageContent.hero.title}
                </h1>

                <p className="font-body text-xl text-white/80 leading-relaxed mb-8">
                  {guestbookPageContent.hero.description}
                </p>

                {/* Why Share - Importance Message */}
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-6 mb-8">
                  <h3 className="font-display text-lg font-bold text-primary mb-3 flex items-center gap-2">
                    <Flame className="w-5 h-5" />
                    {guestbookPageContent.hero.whyShareTitle}
                  </h3>
                  <p className="font-body text-white/70 text-sm leading-relaxed">
                    {guestbookPageContent.hero.whyShareText}
                  </p>
                </div>

                {/* Stats */}
                <div className="flex gap-8">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-center"
                  >
                    <div className="font-display text-3xl font-bold text-primary">{totalVisitors.toLocaleString()}</div>
                    <div className="font-mono text-xs text-white/50 uppercase tracking-wider">{guestbookPageContent.stats?.visitors}</div>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 }}
                    className="text-center"
                  >
                    <div className="font-display text-3xl font-bold text-accent">{totalMessages}</div>
                    <div className="font-mono text-xs text-white/50 uppercase tracking-wider">{guestbookPageContent.stats?.messages}</div>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 }}
                    className="text-center"
                  >
                    <div className="font-display text-3xl font-bold text-white">{artworks.reduce((acc, a) => acc + a.votes, 0)}</div>
                    <div className="font-mono text-xs text-white/50 uppercase tracking-wider">{guestbookPageContent.stats?.votes}</div>
                  </motion.div>
                </div>
              </div>
            </FadeIn>

            {/* Right - Interactive Visual */}
            <FadeIn delay={0.2}>
              <div className="relative">
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="relative aspect-square max-w-md mx-auto"
                >
                  {/* Floating Cards Effect */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative w-full h-full">
                      {/* Background glow */}
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl blur-2xl" />

                      {/* Main visual - Community illustration */}
                      <div className="relative bg-white/5 backdrop-blur-md border border-white/20 rounded-2xl p-8 h-full flex flex-col items-center justify-center">
                        <motion.div
                          animate={{ rotate: [0, 5, -5, 0] }}
                          transition={{ duration: 6, repeat: Infinity }}
                        >
                          <Users className="w-24 h-24 text-primary/80 mb-6" />
                        </motion.div>
                        <p className="font-display text-2xl font-bold text-white text-center mb-2">
                          {guestbookPageContent.hero.communityTitle}
                        </p>
                        <p className="font-body text-white/60 text-center text-sm">
                          {guestbookPageContent.hero.communitySubtitle}
                        </p>

                        {/* Floating reaction bubbles */}
                        <div className="absolute -top-4 -right-4 bg-primary rounded-full p-3 shadow-lg">
                          <Heart className="w-6 h-6 text-white" fill="white" />
                        </div>
                        <div className="absolute -bottom-4 -left-4 bg-accent rounded-full p-3 shadow-lg">
                          <Sparkles className="w-6 h-6 text-white" />
                        </div>
                        <div className="absolute top-1/4 -left-6 bg-white rounded-full p-2 shadow-lg">
                          <Star className="w-4 h-4 text-primary" fill="currentColor" />
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Social Share Banner */}
      <section className="py-6 bg-gradient-to-r from-primary to-accent">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Share2 className="w-5 h-5 text-white" />
              <p className="font-body text-white font-medium">{guestbookPageContent.social?.callToAction}</p>
            </div>
            <div className="flex gap-3">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => shareOnSocial('twitter')}
                className="bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => shareOnSocial('instagram')}
                className="bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </motion.button>
            </div>
          </div>
        </div>
      </section>

      {/* Vote for Artwork Section */}
      <section className="py-16 md:py-24 bg-white dark:bg-[#1A1A1A]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="text-center mb-12">
              <div className="flex items-center justify-center gap-3 mb-4">
                <Trophy className="w-8 h-8 text-primary" />
                <span className="font-mono text-xs tracking-[0.3em] text-primary uppercase">
                  {guestbookPageContent.voting?.label}
                </span>
              </div>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-[#2B2B2B] dark:text-white mb-4">
                {guestbookPageContent.voting?.title}
              </h2>
              <p className="font-body text-[#5A5A5A] dark:text-gray-400 max-w-2xl mx-auto">
                {guestbookPageContent.voting?.description}
              </p>
            </div>
          </FadeIn>

          <div className="grid md:grid-cols-3 gap-6">
            {artworks.map((artwork, index) => (
              <FadeIn key={artwork.id} delay={index * 0.1}>
                <motion.div
                  whileHover={{ y: -5 }}
                  className="bg-[#E8E8E8] dark:bg-[#0A0A0A] rounded-xl overflow-hidden shadow-lg border border-dark/10 dark:border-white/10"
                >
                  {/* Artwork Preview */}
                  <div className="relative aspect-[4/3] bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                    <div className="text-center p-4">
                      <Sparkles className="w-12 h-12 text-primary/50 mx-auto mb-2" />
                      <p className="font-mono text-xs text-[#5A5A5A] dark:text-gray-500">{guestbookPageContent.voting?.artworkPlaceholder}</p>
                    </div>
                    {/* Rank Badge */}
                    <div className={`absolute top-3 left-3 px-3 py-1 rounded-full text-white font-bold text-sm ${
                      index === 0 ? 'bg-yellow-500' : index === 1 ? 'bg-gray-400' : 'bg-amber-700'
                    }`}>
                      #{index + 1}
                    </div>
                  </div>

                  <div className="p-5">
                    <h3 className="font-display text-lg font-bold text-[#2B2B2B] dark:text-white mb-1">
                      {artwork.title}
                    </h3>
                    <p className="font-body text-sm text-[#5A5A5A] dark:text-gray-400 mb-4">
                      {guestbookPageContent.voting?.by} {artwork.artist}
                    </p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <ThumbsUp className={`w-5 h-5 ${artwork.hasVoted ? 'text-primary' : 'text-[#7A7A7A] dark:text-gray-500'}`} />
                        <span className="font-display text-xl font-bold text-[#2B2B2B] dark:text-white">{artwork.votes}</span>
                        <span className="font-mono text-xs text-[#7A7A7A] dark:text-gray-500">{guestbookPageContent.voting?.votesLabel}</span>
                      </div>

                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleVote(artwork.id)}
                        className={`px-4 py-2 rounded-lg font-body text-sm font-semibold transition-all ${
                          artwork.hasVoted
                            ? 'bg-primary text-white'
                            : 'bg-[#2B2B2B] dark:bg-white/10 text-white hover:bg-primary'
                        }`}
                      >
                        {artwork.hasVoted ? guestbookPageContent.voting?.voted : guestbookPageContent.voting?.voteButton}
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              </FadeIn>
            ))}
          </div>

          {/* Share your vote */}
          <FadeIn delay={0.4}>
            <div className="mt-10 text-center">
              <p className="font-body text-[#5A5A5A] dark:text-gray-400 mb-4">
                {guestbookPageContent.voting?.sharePrompt}
              </p>
              <div className="flex justify-center gap-3">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  onClick={() => shareOnSocial('twitter')}
                  className="flex items-center gap-2 px-5 py-2 bg-[#1DA1F2] text-white rounded-full font-body text-sm"
                >
                  <Twitter className="w-4 h-4" />
                  {guestbookPageContent.voting?.shareTwitter}
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  onClick={() => shareOnSocial('instagram')}
                  className="flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full font-body text-sm"
                >
                  <Instagram className="w-4 h-4" />
                  {guestbookPageContent.voting?.shareInstagram}
                </motion.button>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Form Section - More Interactive */}
      <section className="py-16 md:py-24 bg-[#E8E8E8] dark:bg-[#0A0A0A]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="bg-white dark:bg-[#1A1A1A] rounded-2xl shadow-2xl overflow-hidden">
              {/* Form Header with Tabs */}
              <div className="bg-gradient-to-r from-primary to-accent p-6">
                <div className="flex items-center gap-4 mb-4">
                  <Feather className="w-8 h-8 text-white" />
                  <h2 className="font-display text-2xl md:text-3xl font-bold text-white">
                    {guestbookPageContent.form.title}
                  </h2>
                </div>
                <p className="font-body text-white/80 text-sm">
                  {guestbookPageContent.form.subtitle}
                </p>
              </div>

              <div className="p-8 md:p-10">
                {submitted && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    className="mb-6 p-5 bg-gradient-to-r from-primary/10 to-accent/10 border-2 border-primary/30 rounded-xl"
                  >
                    <div className="flex items-center gap-3">
                      <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 0.5, repeat: 3 }}
                      >
                        <Heart className="w-8 h-8 text-primary" fill="currentColor" />
                      </motion.div>
                      <div>
                        <p className="font-display text-lg font-bold text-[#2B2B2B] dark:text-white">
                          {guestbookPageContent.form.success}
                        </p>
                        <p className="font-body text-sm text-[#5A5A5A] dark:text-gray-400">
                          {guestbookPageContent.form.successSubtext}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block font-body text-sm font-semibold text-[#2B2B2B] dark:text-white mb-2"
                    >
                      {guestbookPageContent.form.nameLabel}
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className="w-full px-4 py-3 font-body text-base text-[#2B2B2B] dark:text-white bg-[#E8E8E8] dark:bg-[#0A0A0A] border-2 border-transparent rounded-xl focus:outline-none focus:border-primary transition-colors"
                      placeholder={guestbookPageContent.form.namePlaceholder}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block font-body text-sm font-semibold text-[#2B2B2B] dark:text-white mb-2"
                    >
                      {guestbookPageContent.form.messageLabel}
                    </label>
                    <textarea
                      id="message"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      required
                      rows={5}
                      className="w-full px-4 py-3 font-body text-base text-[#2B2B2B] dark:text-white bg-[#E8E8E8] dark:bg-[#0A0A0A] border-2 border-transparent rounded-xl focus:outline-none focus:border-primary transition-colors resize-none"
                      placeholder={guestbookPageContent.form.messagePlaceholder}
                    />
                  </div>

                  <div>
                    <label className="block font-body text-sm font-semibold text-[#2B2B2B] dark:text-white mb-3">
                      {guestbookPageContent.form.moodLabel}
                    </label>
                    <div className="flex gap-3">
                      {(Object.keys(moodIcons) as Array<keyof typeof moodIcons>).map(
                        (moodKey) => {
                          const Icon = moodIcons[moodKey];
                          const emoji = moodEmojis[moodKey];
                          return (
                            <motion.button
                              key={moodKey}
                              type="button"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => setMood(moodKey)}
                              className={`flex-1 p-4 rounded-xl border-2 transition-all ${
                                mood === moodKey
                                  ? "border-primary bg-primary/10 shadow-lg shadow-primary/20"
                                  : "border-transparent bg-[#E8E8E8] dark:bg-[#0A0A0A] hover:border-primary/50"
                              }`}
                            >
                              <motion.div
                                animate={mood === moodKey ? { scale: [1, 1.2, 1] } : {}}
                                transition={{ duration: 0.3 }}
                                className="text-2xl mb-2"
                              >
                                {emoji}
                              </motion.div>
                              <p
                                className={`font-body text-xs font-semibold ${
                                  mood === moodKey
                                    ? "text-primary"
                                    : "text-[#5A5A5A] dark:text-gray-400"
                                }`}
                              >
                                {guestbookPageContent.moods[moodKey]}
                              </p>
                            </motion.button>
                          );
                        }
                      )}
                    </div>
                  </div>

                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full flex items-center justify-center gap-3 font-body font-bold text-base sm:text-lg px-8 py-4 bg-gradient-to-r from-primary to-accent hover:from-accent hover:to-primary text-white rounded-xl transition-all shadow-lg hover:shadow-xl"
                  >
                    <Send className="w-5 h-5" />
                    <span>{guestbookPageContent.form.submit}</span>
                  </motion.button>
                </form>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Entries Section - More Fun */}
      <section className="py-16 md:py-24 bg-white dark:bg-[#1A1A1A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="text-center mb-12">
              <h2 className="font-display text-3xl md:text-4xl font-bold text-[#2B2B2B] dark:text-white mb-4">
                {guestbookPageContent.entries.title}
              </h2>
              <p className="font-body text-[#5A5A5A] dark:text-gray-400">
                {guestbookPageContent.entries.subtitle}
              </p>
            </div>
          </FadeIn>

          <div className="space-y-6">
            <AnimatePresence>
              {entries.map((entry, index) => {
                const Icon = moodIcons[entry.mood];
                const emoji = moodEmojis[entry.mood];
                return (
                  <motion.div
                    key={entry.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ delay: index * 0.05 }}
                    className="group"
                  >
                    <div className="bg-[#E8E8E8] dark:bg-[#0A0A0A] p-6 md:p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all border border-transparent hover:border-primary/20">
                      <div className="flex items-start gap-4">
                        <motion.div
                          whileHover={{ rotate: [0, -10, 10, 0] }}
                          className="flex-shrink-0"
                        >
                          <div className="w-14 h-14 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full flex items-center justify-center text-2xl">
                            {emoji}
                          </div>
                        </motion.div>

                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-3">
                            <h3 className="font-display text-lg font-bold text-[#2B2B2B] dark:text-white">
                              {entry.name}
                            </h3>
                            <p className="font-mono text-xs text-[#6A6A6A] dark:text-gray-500">
                              {entry.date}
                            </p>
                          </div>

                          <p className="font-body text-base text-[#3A3A3A] dark:text-gray-200 leading-relaxed mb-4">
                            &ldquo;{entry.message}&rdquo;
                          </p>

                          <div className="flex items-center justify-between">
                            <span className="font-mono text-xs text-primary uppercase tracking-wider bg-primary/10 px-3 py-1 rounded-full">
                              {guestbookPageContent.moods[entry.mood]}
                            </span>

                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => handleLike(entry.id)}
                              className="flex items-center gap-2 text-[#7A7A7A] dark:text-gray-500 hover:text-primary transition-colors"
                            >
                              <Heart className="w-4 h-4" />
                              <span className="font-mono text-sm">{entry.likes || 0}</span>
                            </motion.button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 bg-[#1A1A1A] text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <FadeIn>
            <BookOpen className="w-12 h-12 text-accent mx-auto mb-6" />
            <h2 className="font-display text-2xl md:text-3xl font-bold mb-4">
              {guestbookPageContent.cta?.title}
            </h2>
            <p className="font-body text-white/70 mb-8 max-w-2xl mx-auto">
              {guestbookPageContent.cta?.description}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                onClick={() => shareOnSocial('twitter')}
                className="flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 rounded-full font-body text-sm transition-colors"
              >
                <Twitter className="w-4 h-4" />
                {guestbookPageContent.cta?.shareTwitter}
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                onClick={() => shareOnSocial('instagram')}
                className="flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 rounded-full font-body text-sm transition-colors"
              >
                <Instagram className="w-4 h-4" />
                {guestbookPageContent.cta?.shareInstagram}
              </motion.button>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
