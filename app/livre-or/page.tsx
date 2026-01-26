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
} from "lucide-react";
import FadeIn from "@/components/FadeIn";
import Link from "next/link";

interface Design {
  id: string;
  title: string;
  philosophy: string;
  imageUrl: string | null;
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

  // Fetch designs from API
  useEffect(() => {
    const fetchDesigns = async () => {
      setLoading(true);
      try {
        const response = await fetch('/api/designs?status=approved&limit=50');
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
    setVotingId(designId);
    try {
      const visitorId = localStorage.getItem('visitorId') || Date.now().toString();
      localStorage.setItem('visitorId', visitorId);

      const response = await fetch(`/api/designs/${designId}/vote`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ visitorId }),
      });

      if (response.ok) {
        const data = await response.json();
        setDesigns(designs.map(d =>
          d.id === designId
            ? { ...d, _count: { votes: data.votes }, hasVoted: data.hasVoted }
            : d
        ));
      }
    } catch (error) {
      console.error('Error voting:', error);
    } finally {
      setVotingId(null);
    }
  };

  const extractInstagram = (philosophy: string): string | null => {
    // Try to extract Instagram from philosophy text or author name
    const match = philosophy.match(/@[\w.]+/) || null;
    return match ? match[0] : null;
  };

  const extractMessage = (philosophy: string): string => {
    // Extract the MESSAGE part from philosophy
    const messageMatch = philosophy.match(/MESSAGE:\s*(.+?)(?=\n\n|COMMENTAIRE:|POSITION:|$)/s);
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
                  LIVRET D'OR
                </span>
              </div>

              <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
                Galerie des Artistes
              </h1>

              <p className="font-body text-xl text-white/70 leading-relaxed max-w-2xl mx-auto mb-8">
                Découvrez les œuvres soumises par notre communauté d'artistes.
                <span className="text-primary"> Votez pour vos créations préférées</span> — chaque like compte pour élire l'œuvre gagnante.
              </p>

              {/* Stats */}
              <div className="flex justify-center gap-12 mt-10">
                <div className="text-center">
                  <div className="font-display text-4xl font-bold text-primary">
                    {designs.length}
                  </div>
                  <div className="font-mono text-xs text-white/50 uppercase tracking-wider mt-1">
                    Œuvres
                  </div>
                </div>
                <div className="text-center">
                  <div className="font-display text-4xl font-bold text-white">
                    {designs.reduce((acc, d) => acc + d._count.votes, 0)}
                  </div>
                  <div className="font-mono text-xs text-white/50 uppercase tracking-wider mt-1">
                    Votes
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
              {designs.length} œuvre{designs.length > 1 ? 's' : ''} soumise{designs.length > 1 ? 's' : ''}
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
                Plus votées
              </button>
              <button
                onClick={() => setSortBy("recent")}
                className={`px-4 py-2 text-sm font-medium transition-all ${
                  sortBy === "recent"
                    ? "bg-primary text-white"
                    : "bg-[#E8E8E8] dark:bg-[#1A1A1A] text-[#5A5A5A] dark:text-gray-400 hover:bg-primary/10"
                }`}
              >
                Récentes
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
              <p className="text-[#6A6A6A] dark:text-gray-500">Chargement des œuvres...</p>
            </div>
          ) : designs.length === 0 ? (
            <FadeIn>
              <div className="text-center py-20 bg-white dark:bg-[#111111] border border-black/5 dark:border-white/5">
                <Sparkles className="w-16 h-16 text-primary/30 mx-auto mb-6" />
                <h3 className="font-display text-2xl font-bold text-[#2B2B2B] dark:text-white mb-3">
                  Aucune œuvre pour le moment
                </h3>
                <p className="font-body text-[#5A5A5A] dark:text-gray-400 mb-8">
                  Soyez le premier à soumettre votre création artistique !
                </p>
                <Link
                  href="/studio"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white font-medium hover:bg-primary/90 transition-colors"
                >
                  <Sparkles className="w-5 h-5" />
                  Créer mon œuvre
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
                        <div className="relative aspect-square bg-[#F5F5F5] dark:bg-[#0A0A0A] overflow-hidden">
                          {design.imageUrl ? (
                            <Image
                              src={design.imageUrl}
                              alt={design.title}
                              fill
                              className="object-contain group-hover:scale-105 transition-transform duration-500"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <ImageIcon className="w-20 h-20 text-[#D8D8D8] dark:text-[#2A2A2A]" />
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
                              <span>{design.hasVoted ? 'Voté' : 'Voter'}</span>
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
                                par {design.author.name}
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
                            "{message}"
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
                              {design.hasVoted ? 'Voté' : 'Voter'}
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

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-[#1A1A1A] text-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeIn>
            <Sparkles className="w-12 h-12 text-primary mx-auto mb-6" />
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
              Votre œuvre mérite sa place ici
            </h2>
            <p className="font-body text-lg text-white/70 mb-8 max-w-xl mx-auto">
              Rejoignez notre communauté d'artistes et soumettez votre création pour avoir une chance de voir votre design porté.
            </p>
            <Link
              href="/studio"
              className="inline-flex items-center gap-3 px-8 py-4 bg-primary text-white font-semibold hover:bg-primary/90 transition-colors shadow-lg shadow-primary/25"
            >
              <Sparkles className="w-5 h-5" />
              Soumettre mon œuvre
            </Link>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
