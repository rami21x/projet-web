"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
  Heart,
  Sparkles,
  Instagram,
  Trophy,
  Loader2,
  ImageIcon,
  ExternalLink,
  Cookie,
  User,
  LogIn,
  X,
  ChevronLeft,
  ChevronRight,
  Layers,
} from "lucide-react";
import FadeIn from "@/components/FadeIn";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { useCookieConsent } from "@/components/CookieConsent";
import { useContent } from "@/hooks/useContent";

interface StoryboardItem {
  imageData: string;
  caption?: string;
  category?: 'inspiration' | 'process' | 'details' | 'final' | 'other';
}

interface Design {
  id: string;
  title: string;
  philosophy: string;
  imageUrl: string | null;
  imageData: string | null;
  storyboard?: StoryboardItem[];
  createdAt: string;
  author: {
    name: string;
    artistName?: string;
  };
  _count: {
    votes: number;
  };
  hasVoted?: boolean;
}

export default function LivretDorPage() {
  const [designs, setDesigns] = useState<Design[]>([]);
  const [loading, setLoading] = useState(true);
  const [votingId, setVotingId] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<"votes" | "recent">("votes");
  const [showCookiePrompt, setShowCookiePrompt] = useState(false);
  const [selectedDesign, setSelectedDesign] = useState<Design | null>(null);
  const [storyboardIndex, setStoryboardIndex] = useState(0);
  const { user } = useAuth();
  const { consent, accept, isDecided } = useCookieConsent();
  const { livretDorContent: t, studioPageContent: studioT } = useContent();

  // Fetch designs from API
  useEffect(() => {
    const fetchDesigns = async () => {
      setLoading(true);
      try {
        const response = await fetch('/api/designs?limit=50');
        if (response.ok) {
          const data = await response.json();
          setDesigns(data.designs || []);
        }
      } catch (error) {
        console.error('Error fetching designs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDesigns();
  }, []);

  const handleVote = async (designId: string) => {
    if (!user && !consent) {
      setShowCookiePrompt(true);
      return;
    }

    setVotingId(designId);
    try {
      let body: Record<string, string> = {};
      if (user) {
        body = { email: user.email };
      } else {
        const visitorId = localStorage.getItem('visitorId') || Date.now().toString();
        localStorage.setItem('visitorId', visitorId);
        body = { visitorId };
      }

      const response = await fetch(`/api/designs/${designId}/vote`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (response.ok) {
        const data = await response.json();
        setDesigns(designs.map(d =>
          d.id === designId
            ? { ...d, _count: { ...d._count, votes: data.votes }, hasVoted: data.hasVoted }
            : d
        ));
      } else {
        const err = await response.text();
        console.error('Vote error:', response.status, err);
      }
    } catch (error) {
      console.error('Error voting:', error);
    } finally {
      setVotingId(null);
    }
  };

  const extractInstagram = (philosophy: string): string | null => {
    const match = philosophy.match(/@[\w.]+/) || null;
    return match ? match[0] : null;
  };

  const extractMessage = (philosophy: string): string => {
    const messageMatch = philosophy.match(/MESSAGE:\s*([\s\S]+?)(?=\n\n|COMMENTAIRE:|POSITION:|$)/);
    return messageMatch ? messageMatch[1].trim() : philosophy.substring(0, 150);
  };

  const sortedDesigns = [...designs].sort((a, b) => {
    if (sortBy === "votes") {
      return b._count.votes - a._count.votes;
    }
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-[#E8E8E8] dark:bg-[#0A0A0A]">
      {/* Hero Section */}
      <section className="relative py-20 md:py-28 bg-[#1A1A1A] text-white overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-transparent" />
          <div className="absolute top-1/4 -left-32 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <FadeIn>
            <div className="text-center">
              <div className="flex items-center justify-center gap-3 mb-6">
                <div className="w-12 h-12 bg-primary/20 flex items-center justify-center">
                  <Trophy className="w-6 h-6 text-primary" />
                </div>
                <span className="font-mono text-xs tracking-[0.3em] text-primary uppercase">
                  {t.hero.label}
                </span>
              </div>

              <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
                {t.hero.title}
              </h1>

              <p className="font-body text-xl text-white/70 leading-relaxed max-w-2xl mx-auto mb-8">
                {t.hero.description}
                <span className="text-primary"> {t.hero.descriptionHighlight}</span> {t.hero.descriptionSuffix}
              </p>

              {/* Stats */}
              <div className="flex justify-center gap-12 mt-10">
                <div className="text-center">
                  <div className="font-display text-4xl font-bold text-primary">
                    {designs.length}
                  </div>
                  <div className="font-mono text-xs text-white/50 uppercase tracking-wider mt-1">
                    {t.stats.artworks}
                  </div>
                </div>
                <div className="text-center">
                  <div className="font-display text-4xl font-bold text-white">
                    {designs.reduce((acc, d) => acc + d._count.votes, 0)}
                  </div>
                  <div className="font-mono text-xs text-white/50 uppercase tracking-wider mt-1">
                    {t.stats.votes}
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Sort Bar */}
      <section className="py-4 bg-white dark:bg-[#111111] border-b border-black/5 dark:border-white/5 sticky top-0 z-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <p className="font-mono text-xs text-[#6A6A6A] dark:text-gray-500 uppercase tracking-wider">
              {designs.length} {designs.length > 1 ? t.sort.submittedCountPlural : t.sort.submittedCount} {designs.length > 1 ? t.sort.submittedPlural : t.sort.submitted}
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setSortBy("votes")}
                className={`px-4 py-2 text-sm font-medium transition-all ${
                  sortBy === "votes"
                    ? "bg-primary text-white"
                    : "bg-[#E8E8E8] dark:bg-[#1A1A1A] text-[#5A5A5A] dark:text-gray-400 hover:bg-primary/10"
                }`}
              >
                {t.sort.mostVoted}
              </button>
              <button
                onClick={() => setSortBy("recent")}
                className={`px-4 py-2 text-sm font-medium transition-all ${
                  sortBy === "recent"
                    ? "bg-primary text-white"
                    : "bg-[#E8E8E8] dark:bg-[#1A1A1A] text-[#5A5A5A] dark:text-gray-400 hover:bg-primary/10"
                }`}
              >
                {t.sort.recent}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-12 md:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <Loader2 className="w-10 h-10 animate-spin text-primary mb-4" />
              <p className="text-[#6A6A6A] dark:text-gray-500">{t.loading}</p>
            </div>
          ) : designs.length === 0 ? (
            <FadeIn>
              <div className="text-center py-20 bg-white dark:bg-[#111111] border border-black/5 dark:border-white/5">
                <Sparkles className="w-16 h-16 text-primary/30 mx-auto mb-6" />
                <h3 className="font-display text-2xl font-bold text-[#2B2B2B] dark:text-white mb-3">
                  {t.empty.title}
                </h3>
                <p className="font-body text-[#5A5A5A] dark:text-gray-400 mb-8">
                  {t.empty.description}
                </p>
                <Link
                  href="/studio"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white font-medium hover:bg-primary/90 transition-colors"
                >
                  <Sparkles className="w-5 h-5" />
                  {t.empty.cta}
                </Link>
              </div>
            </FadeIn>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence>
                {sortedDesigns.map((design, index) => {
                  const instagram = design.author.artistName?.startsWith('@')
                    ? design.author.artistName
                    : extractInstagram(design.philosophy);
                  const message = extractMessage(design.philosophy);
                  const isTop3 = sortBy === "votes" && index < 3;

                  return (
                    <motion.div
                      key={design.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ delay: index * 0.05 }}
                      className="group"
                    >
                      <div className="relative bg-white dark:bg-[#111111] border border-black/5 dark:border-white/5 overflow-hidden hover:shadow-xl transition-all duration-300">
                        {/* Rank Badge for Top 3 */}
                        {isTop3 && (
                          <div className={`absolute top-4 left-4 z-10 w-10 h-10 flex items-center justify-center font-display font-bold text-white ${
                            index === 0 ? 'bg-yellow-500' : index === 1 ? 'bg-gray-400' : 'bg-amber-700'
                          }`}>
                            #{index + 1}
                          </div>
                        )}

                        {/* Artwork Image */}
                        <div
                          className="relative aspect-square bg-[#F5F5F5] dark:bg-[#0A0A0A] overflow-hidden cursor-pointer"
                          onClick={() => {
                            setSelectedDesign(design);
                            setStoryboardIndex(0);
                          }}
                        >
                          {(design.imageUrl || design.imageData) ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                              src={design.imageUrl || design.imageData || ''}
                              alt={design.title}
                              className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <ImageIcon className="w-20 h-20 text-[#D8D8D8] dark:text-[#2A2A2A]" />
                            </div>
                          )}

                          {/* Storyboard indicator */}
                          {design.storyboard && design.storyboard.length > 0 && (
                            <div className="absolute top-3 right-3 z-10 flex items-center gap-1.5 px-2 py-1 bg-black/70 text-white text-xs">
                              <Layers className="w-3.5 h-3.5" />
                              <span>{design.storyboard.length}</span>
                            </div>
                          )}

                          {/* Vote Overlay */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => handleVote(design.id)}
                              disabled={votingId === design.id}
                              className={`w-full py-3 flex items-center justify-center gap-2 font-medium transition-all ${
                                design.hasVoted
                                  ? "bg-primary text-white"
                                  : "bg-white text-[#1A1A1A] hover:bg-primary hover:text-white"
                              }`}
                            >
                              {votingId === design.id ? (
                                <Loader2 className="w-5 h-5 animate-spin" />
                              ) : (
                                <Heart className={`w-5 h-5 ${design.hasVoted ? 'fill-current' : ''}`} />
                              )}
                              <span>{design.hasVoted ? t.card.voted : t.card.vote}</span>
                            </motion.button>
                          </div>
                        </div>

                        {/* Content */}
                        <div className="p-5">
                          {/* Header */}
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <h3 className="font-display text-lg font-bold text-[#2B2B2B] dark:text-white line-clamp-1">
                                {design.title}
                              </h3>
                              <p className="font-body text-sm text-[#6A6A6A] dark:text-gray-500">
                                {t.card.by} {design.author.name}
                              </p>
                            </div>
                            <div className="flex items-center gap-1.5 text-primary">
                              <Heart className={`w-4 h-4 ${design.hasVoted ? 'fill-current' : ''}`} />
                              <span className="font-display font-bold">{design._count.votes}</span>
                            </div>
                          </div>

                          {/* Instagram */}
                          {instagram && (
                            <a
                              href={`https://instagram.com/${instagram.replace('@', '')}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 text-sm text-primary hover:underline mb-3"
                            >
                              <Instagram className="w-4 h-4" />
                              <span>{instagram}</span>
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          )}

                          {/* Message */}
                          <p className="font-body text-sm text-[#5A5A5A] dark:text-gray-400 italic line-clamp-2">
                            &quot;{message}&quot;
                          </p>

                          {/* Footer */}
                          <div className="flex items-center justify-between mt-4 pt-4 border-t border-black/5 dark:border-white/5">
                            <span className="font-mono text-xs text-[#8A8A8A] dark:text-gray-600">
                              {formatDate(design.createdAt)}
                            </span>
                            <button
                              onClick={() => handleVote(design.id)}
                              disabled={votingId === design.id}
                              className={`flex items-center gap-2 px-3 py-1.5 text-sm font-medium transition-all ${
                                design.hasVoted
                                  ? "bg-primary/10 text-primary"
                                  : "bg-[#F5F5F5] dark:bg-[#1A1A1A] text-[#5A5A5A] dark:text-gray-400 hover:bg-primary hover:text-white"
                              }`}
                            >
                              <Heart className={`w-4 h-4 ${design.hasVoted ? 'fill-current' : ''}`} />
                              {design.hasVoted ? t.card.voted : t.card.vote}
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          )}
        </div>
      </section>

      {/* User Status Bar */}
      <section className="py-4 bg-white dark:bg-[#111111] border-t border-black/5 dark:border-white/5">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center gap-3 text-sm">
            {user ? (
              <span className="flex items-center gap-2 text-primary font-medium">
                <User className="w-4 h-4" />
                {t.userStatus.loggedInAs} {user.name} ({user.role === "artist" ? t.userStatus.artist : t.userStatus.client}) {t.userStatus.votesWithAccount}
              </span>
            ) : consent ? (
              <span className="flex items-center gap-2 text-green-600 dark:text-green-400">
                <Cookie className="w-4 h-4" />
                {t.userStatus.anonymousVote}
              </span>
            ) : (
              <span className="flex items-center gap-2 text-[#8A8A8A]">
                <Cookie className="w-4 h-4" />
                {t.userStatus.acceptCookies}{" "}
                <Link href="/connexion" className="text-primary hover:underline inline-flex items-center gap-1">
                  <LogIn className="w-3 h-3" /> {t.userStatus.loginLink}
                </Link>
              </span>
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-[#1A1A1A] text-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeIn>
            <Sparkles className="w-12 h-12 text-primary mx-auto mb-6" />
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
              {t.cta.title}
            </h2>
            <p className="font-body text-lg text-white/70 mb-8 max-w-xl mx-auto">
              {t.cta.description}
            </p>
            <Link
              href="/studio"
              className="inline-flex items-center gap-3 px-8 py-4 bg-primary text-white font-semibold hover:bg-primary/90 transition-colors shadow-lg shadow-primary/25"
            >
              <Sparkles className="w-5 h-5" />
              {t.cta.button}
            </Link>
          </FadeIn>
        </div>
      </section>

      {/* Cookie Consent Prompt for Voting */}
      <AnimatePresence>
        {showCookiePrompt && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/50 flex items-center justify-center p-4"
            onClick={() => setShowCookiePrompt(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white dark:bg-[#1A1A1A] p-8 max-w-md w-full shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <Cookie className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="font-display text-xl font-bold text-center text-[#2B2B2B] dark:text-white mb-3">
                {t.cookiePrompt.title}
              </h3>
              <p className="font-body text-sm text-[#5A5A5A] dark:text-gray-400 text-center mb-6">
                {t.cookiePrompt.description}
              </p>
              <div className="space-y-3">
                <button
                  onClick={() => {
                    accept();
                    setShowCookiePrompt(false);
                  }}
                  className="w-full py-3 bg-primary text-white font-medium hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
                >
                  <Cookie className="w-5 h-5" />
                  {t.cookiePrompt.acceptButton}
                </button>
                <Link
                  href="/connexion"
                  className="w-full py-3 bg-[#E8E8E8] dark:bg-[#2A2A2A] text-[#2B2B2B] dark:text-white font-medium hover:bg-[#D8D8D8] dark:hover:bg-[#333] transition-colors flex items-center justify-center gap-2"
                >
                  <LogIn className="w-5 h-5" />
                  {t.cookiePrompt.loginButton}
                </Link>
                <button
                  onClick={() => setShowCookiePrompt(false)}
                  className="w-full py-2 text-sm text-[#8A8A8A] hover:text-[#5A5A5A] transition-colors"
                >
                  {t.cookiePrompt.cancel}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Storyboard Modal */}
      <AnimatePresence>
        {selectedDesign && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4"
            onClick={() => setSelectedDesign(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-5xl max-h-[90vh] bg-white dark:bg-[#111111] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedDesign(null)}
                className="absolute top-4 right-4 z-20 w-10 h-10 bg-black/50 hover:bg-black/70 text-white flex items-center justify-center transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="flex flex-col md:flex-row h-full max-h-[90vh]">
                {/* Main Image Area */}
                <div className="flex-1 relative bg-[#0A0A0A] flex items-center justify-center min-h-[300px] md:min-h-[500px]">
                  {/* Main artwork or storyboard image */}
                  {storyboardIndex === 0 ? (
                    // Show main artwork
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={selectedDesign.imageUrl || selectedDesign.imageData || ''}
                      alt={selectedDesign.title}
                      className="max-w-full max-h-full object-contain"
                    />
                  ) : (
                    // Show storyboard image
                    selectedDesign.storyboard && selectedDesign.storyboard[storyboardIndex - 1] && (
                      <div className="flex flex-col items-center">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={selectedDesign.storyboard[storyboardIndex - 1].imageData}
                          alt={`Storyboard ${storyboardIndex}`}
                          className="max-w-full max-h-[70vh] object-contain"
                        />
                        {/* Caption */}
                        {selectedDesign.storyboard[storyboardIndex - 1].caption && (
                          <p className="mt-4 text-white/80 text-center max-w-lg px-4">
                            {selectedDesign.storyboard[storyboardIndex - 1].caption}
                          </p>
                        )}
                        {/* Category badge */}
                        {selectedDesign.storyboard[storyboardIndex - 1].category && (
                          <span className="mt-2 px-3 py-1 bg-primary/20 text-primary text-sm">
                            {studioT?.storyboard?.categories?.[selectedDesign.storyboard[storyboardIndex - 1].category!] ||
                              selectedDesign.storyboard[storyboardIndex - 1].category}
                          </span>
                        )}
                      </div>
                    )
                  )}

                  {/* Navigation arrows - only if storyboard exists */}
                  {selectedDesign.storyboard && selectedDesign.storyboard.length > 0 && (
                    <>
                      <button
                        onClick={() => setStoryboardIndex(Math.max(0, storyboardIndex - 1))}
                        disabled={storyboardIndex === 0}
                        className={`absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center transition-all ${
                          storyboardIndex === 0
                            ? 'bg-white/10 text-white/30 cursor-not-allowed'
                            : 'bg-white/20 hover:bg-white/30 text-white'
                        }`}
                      >
                        <ChevronLeft className="w-8 h-8" />
                      </button>
                      <button
                        onClick={() => setStoryboardIndex(Math.min(selectedDesign.storyboard!.length, storyboardIndex + 1))}
                        disabled={storyboardIndex === selectedDesign.storyboard.length}
                        className={`absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center transition-all ${
                          storyboardIndex === selectedDesign.storyboard.length
                            ? 'bg-white/10 text-white/30 cursor-not-allowed'
                            : 'bg-white/20 hover:bg-white/30 text-white'
                        }`}
                      >
                        <ChevronRight className="w-8 h-8" />
                      </button>
                    </>
                  )}

                  {/* Image counter */}
                  {selectedDesign.storyboard && selectedDesign.storyboard.length > 0 && (
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 bg-black/60 text-white text-sm">
                      {storyboardIndex === 0 ? (
                        <span className="flex items-center gap-2">
                          <ImageIcon className="w-4 h-4" />
                          {t.modal?.mainArtwork || "Œuvre principale"}
                        </span>
                      ) : (
                        <span className="flex items-center gap-2">
                          <Layers className="w-4 h-4" />
                          {storyboardIndex} / {selectedDesign.storyboard.length}
                        </span>
                      )}
                    </div>
                  )}
                </div>

                {/* Side Panel - Info & Thumbnails */}
                <div className="w-full md:w-80 p-6 flex flex-col bg-white dark:bg-[#111111] border-t md:border-t-0 md:border-l border-black/10 dark:border-white/10">
                  {/* Artist Info */}
                  <div className="mb-6">
                    <h2 className="font-display text-2xl font-bold text-[#2B2B2B] dark:text-white mb-2">
                      {selectedDesign.title}
                    </h2>
                    <p className="text-[#6A6A6A] dark:text-gray-400">
                      {t.card.by} {selectedDesign.author.name}
                    </p>
                    {selectedDesign.author.artistName && (
                      <a
                        href={`https://instagram.com/${selectedDesign.author.artistName.replace('@', '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-primary text-sm hover:underline mt-1"
                      >
                        <Instagram className="w-4 h-4" />
                        {selectedDesign.author.artistName}
                      </a>
                    )}
                  </div>

                  {/* Message */}
                  <div className="mb-6 p-4 bg-[#F5F5F5] dark:bg-[#0A0A0A]">
                    <p className="text-sm text-[#5A5A5A] dark:text-gray-400 italic">
                      &quot;{extractMessage(selectedDesign.philosophy)}&quot;
                    </p>
                  </div>

                  {/* Storyboard Thumbnails */}
                  {selectedDesign.storyboard && selectedDesign.storyboard.length > 0 && (
                    <div className="flex-1 overflow-y-auto">
                      <h3 className="font-display text-sm font-semibold text-[#2B2B2B] dark:text-white mb-3 flex items-center gap-2">
                        <Layers className="w-4 h-4 text-primary" />
                        {studioT?.storyboard?.title || "Storyboard"}
                      </h3>
                      <div className="grid grid-cols-3 gap-2">
                        {/* Main artwork thumbnail */}
                        <button
                          onClick={() => setStoryboardIndex(0)}
                          className={`aspect-square relative overflow-hidden border-2 transition-all ${
                            storyboardIndex === 0
                              ? 'border-primary'
                              : 'border-transparent hover:border-primary/50'
                          }`}
                        >
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={selectedDesign.imageUrl || selectedDesign.imageData || ''}
                            alt="Main"
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                            <ImageIcon className="w-4 h-4 text-white" />
                          </div>
                        </button>
                        {/* Storyboard thumbnails */}
                        {selectedDesign.storyboard.map((item, idx) => (
                          <button
                            key={idx}
                            onClick={() => setStoryboardIndex(idx + 1)}
                            className={`aspect-square relative overflow-hidden border-2 transition-all ${
                              storyboardIndex === idx + 1
                                ? 'border-primary'
                                : 'border-transparent hover:border-primary/50'
                            }`}
                          >
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={item.imageData}
                              alt={`Storyboard ${idx + 1}`}
                              className="w-full h-full object-cover"
                            />
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Vote Button */}
                  <div className="mt-6 pt-6 border-t border-black/10 dark:border-white/10">
                    <button
                      onClick={() => handleVote(selectedDesign.id)}
                      disabled={votingId === selectedDesign.id}
                      className={`w-full py-3 flex items-center justify-center gap-2 font-medium transition-all ${
                        selectedDesign.hasVoted
                          ? "bg-primary text-white"
                          : "bg-[#E8E8E8] dark:bg-[#1A1A1A] text-[#2B2B2B] dark:text-white hover:bg-primary hover:text-white"
                      }`}
                    >
                      {votingId === selectedDesign.id ? (
                        <Loader2 className="w-5 h-5 animate-spin" />
                      ) : (
                        <Heart className={`w-5 h-5 ${selectedDesign.hasVoted ? 'fill-current' : ''}`} />
                      )}
                      <span>{selectedDesign._count.votes} {selectedDesign.hasVoted ? t.card.voted : t.card.vote}</span>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
