"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart,
  MessageCircle,
  Calendar,
  User,
  Instagram,
  Sparkles,
  TrendingUp,
  Clock,
  Palette,
  Send,
  X,
} from "lucide-react";
import FadeIn from "@/components/FadeIn";
import Image from "next/image";

interface Design {
  id: string;
  artistName: string;
  email: string;
  title: string;
  philosophy: string;
  imageData: string;
  designData: string;
  timestamp: number;
  likes: number;
  comments: Comment[];
  social?: string;
}

interface Comment {
  id: string;
  author: string;
  text: string;
  timestamp: number;
}

export default function GaleriePage() {
  const [designs, setDesigns] = useState<Design[]>([]);
  const [filter, setFilter] = useState<"recent" | "popular" | "all">("all");
  const [selectedDesign, setSelectedDesign] = useState<Design | null>(null);
  const [commentText, setCommentText] = useState("");
  const [commentAuthor, setCommentAuthor] = useState("");

  // Load designs from localStorage
  useEffect(() => {
    const loadDesigns = () => {
      const stored = localStorage.getItem("arteral-designs");
      if (stored) {
        const parsed = JSON.parse(stored);
        setDesigns(parsed);
      }
    };

    loadDesigns();

    // Reload when storage changes (if user submits from another tab)
    window.addEventListener("storage", loadDesigns);
    return () => window.removeEventListener("storage", loadDesigns);
  }, []);

  // Like a design
  const handleLike = (designId: string) => {
    const likedDesigns = JSON.parse(
      localStorage.getItem("arteral-liked") || "[]"
    );

    if (likedDesigns.includes(designId)) {
      // Already liked, unlike it
      const newLiked = likedDesigns.filter((id: string) => id !== designId);
      localStorage.setItem("arteral-liked", JSON.stringify(newLiked));

      setDesigns((prev) =>
        prev.map((d) =>
          d.id === designId ? { ...d, likes: Math.max(0, d.likes - 1) } : d
        )
      );
    } else {
      // Like it
      likedDesigns.push(designId);
      localStorage.setItem("arteral-liked", JSON.stringify(likedDesigns));

      setDesigns((prev) =>
        prev.map((d) => (d.id === designId ? { ...d, likes: d.likes + 1 } : d))
      );
    }

    // Update in main storage
    const allDesigns = JSON.parse(
      localStorage.getItem("arteral-designs") || "[]"
    );
    const updated = allDesigns.map((d: Design) =>
      d.id === designId
        ? {
            ...d,
            likes: likedDesigns.includes(designId)
              ? d.likes + 1
              : Math.max(0, d.likes - 1),
          }
        : d
    );
    localStorage.setItem("arteral-designs", JSON.stringify(updated));
  };

  // Add comment
  const handleAddComment = (designId: string) => {
    if (!commentText.trim() || !commentAuthor.trim()) return;

    const newComment: Comment = {
      id: `comment-${Date.now()}`,
      author: commentAuthor.trim(),
      text: commentText.trim(),
      timestamp: Date.now(),
    };

    const allDesigns = JSON.parse(
      localStorage.getItem("arteral-designs") || "[]"
    );

    const updated = allDesigns.map((d: Design) => {
      if (d.id === designId) {
        const comments = d.comments || [];
        return { ...d, comments: [...comments, newComment] };
      }
      return d;
    });

    localStorage.setItem("arteral-designs", JSON.stringify(updated));
    setDesigns(updated);

    if (selectedDesign?.id === designId) {
      setSelectedDesign({
        ...selectedDesign,
        comments: [...(selectedDesign.comments || []), newComment],
      });
    }

    setCommentText("");
    setCommentAuthor("");
  };

  // Check if design is liked
  const isLiked = (designId: string) => {
    const likedDesigns = JSON.parse(
      localStorage.getItem("arteral-liked") || "[]"
    );
    return likedDesigns.includes(designId);
  };

  // Filter and sort designs
  const filteredDesigns = [...designs]
    .filter((d) => {
      if (filter === "popular") return d.likes > 0;
      if (filter === "recent")
        return Date.now() - d.timestamp < 7 * 24 * 60 * 60 * 1000; // Last 7 days
      return true;
    })
    .sort((a, b) => {
      if (filter === "popular") return b.likes - a.likes;
      return b.timestamp - a.timestamp; // Most recent first
    });

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 md:py-32 bg-gradient-to-br from-accent via-primary/20 to-accent text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(160, 82, 45, 0.1) 35px, rgba(160, 82, 45, 0.1) 70px)`,
            }}
          />
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <FadeIn>
            <motion.div
              initial={{ scale: 0, rotate: 180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", duration: 1 }}
              className="inline-block mb-8"
            >
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center">
                <Sparkles className="w-10 h-10 text-white" />
              </div>
            </motion.div>

            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 md:mb-8">
              Galerie Arteral
            </h1>
            <p className="font-body text-lg md:text-xl text-white/90 leading-relaxed max-w-3xl mx-auto mb-8">
              Découvrez les créations philosophiques de la communauté. Votez,
              commentez, inspirez-vous.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/studio"
                className="inline-block font-body font-semibold px-8 py-4 bg-white text-primary hover:bg-white/90 rounded-lg transition-all hover:scale-105"
              >
                Créer votre design
              </a>
              <a
                href="/artistes"
                className="inline-block font-body font-semibold px-8 py-4 border-2 border-white hover:bg-white hover:text-primary text-white rounded-lg transition-all hover:scale-105"
              >
                Concours 5000€
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 bg-white dark:bg-dark/30 border-b border-dark/10 dark:border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Palette className="w-5 h-5 text-primary" />
              <p className="font-body text-dark dark:text-white font-semibold">
                {filteredDesigns.length} design{filteredDesigns.length !== 1 ? "s" : ""}
              </p>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setFilter("all")}
                className={`px-4 py-2 rounded-lg font-body text-sm font-semibold transition-all ${
                  filter === "all"
                    ? "bg-primary text-white"
                    : "bg-dark/10 dark:bg-white/10 text-dark dark:text-white hover:bg-dark/20 dark:hover:bg-white/20"
                }`}
              >
                Tous
              </button>
              <button
                onClick={() => setFilter("recent")}
                className={`px-4 py-2 rounded-lg font-body text-sm font-semibold transition-all flex items-center gap-2 ${
                  filter === "recent"
                    ? "bg-primary text-white"
                    : "bg-dark/10 dark:bg-white/10 text-dark dark:text-white hover:bg-dark/20 dark:hover:bg-white/20"
                }`}
              >
                <Clock className="w-4 h-4" />
                Récents
              </button>
              <button
                onClick={() => setFilter("popular")}
                className={`px-4 py-2 rounded-lg font-body text-sm font-semibold transition-all flex items-center gap-2 ${
                  filter === "popular"
                    ? "bg-primary text-white"
                    : "bg-dark/10 dark:bg-white/10 text-dark dark:text-white hover:bg-dark/20 dark:hover:bg-white/20"
                }`}
              >
                <TrendingUp className="w-4 h-4" />
                Populaires
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-16 md:py-24 bg-light dark:bg-dark/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredDesigns.length === 0 ? (
            <div className="text-center py-20">
              <Sparkles className="w-16 h-16 text-dark/20 dark:text-white/20 mx-auto mb-4" />
              <h3 className="font-display text-2xl font-bold text-dark dark:text-white mb-2">
                Aucun design pour le moment
              </h3>
              <p className="font-body text-dark/60 dark:text-white/60 mb-8">
                Soyez le premier à créer !
              </p>
              <a
                href="/studio"
                className="inline-block font-body font-semibold px-8 py-4 bg-primary hover:bg-primary/90 text-white rounded-lg transition-all"
              >
                Créer un design
              </a>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <AnimatePresence>
                {filteredDesigns.map((design, index) => (
                  <motion.div
                    key={design.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white dark:bg-dark/80 rounded-lg shadow-lg overflow-hidden border-2 border-primary/10 hover:border-primary/30 transition-all group cursor-pointer"
                    onClick={() => setSelectedDesign(design)}
                  >
                    {/* Design Image */}
                    <div className="relative aspect-square bg-light dark:bg-dark/50 overflow-hidden">
                      <img
                        src={design.designData}
                        alt={design.title}
                        className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>

                    {/* Info */}
                    <div className="p-6">
                      <h3 className="font-display text-xl font-bold text-dark dark:text-white mb-2">
                        {design.title}
                      </h3>

                      <div className="flex items-center gap-2 mb-3">
                        <User className="w-4 h-4 text-primary" />
                        <p className="font-body text-sm text-dark/70 dark:text-white/70">
                          {design.artistName}
                        </p>
                        {design.social && (
                          <>
                            <span className="text-dark/30 dark:text-white/30">·</span>
                            <Instagram className="w-4 h-4 text-accent" />
                            <p className="font-body text-sm text-accent">
                              {design.social}
                            </p>
                          </>
                        )}
                      </div>

                      <p className="font-body text-sm text-dark/60 dark:text-white/60 line-clamp-3 mb-4">
                        {design.philosophy}
                      </p>

                      {/* Actions */}
                      <div className="flex items-center justify-between pt-4 border-t border-dark/10 dark:border-white/10">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleLike(design.id);
                          }}
                          className={`flex items-center gap-2 font-body text-sm font-semibold transition-all hover:scale-110 ${
                            isLiked(design.id)
                              ? "text-primary"
                              : "text-dark/60 dark:text-white/60"
                          }`}
                        >
                          <Heart
                            className={`w-5 h-5 ${
                              isLiked(design.id) ? "fill-primary" : ""
                            }`}
                          />
                          {design.likes}
                        </button>

                        <div className="flex items-center gap-2 font-body text-sm text-dark/60 dark:text-white/60">
                          <MessageCircle className="w-5 h-5" />
                          {design.comments?.length || 0}
                        </div>

                        <div className="flex items-center gap-2 font-body text-xs text-dark/40 dark:text-white/40">
                          <Calendar className="w-4 h-4" />
                          {new Date(design.timestamp).toLocaleDateString("fr-FR")}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>
      </section>

      {/* Design Detail Modal */}
      <AnimatePresence>
        {selectedDesign && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4 overflow-y-auto"
            onClick={() => setSelectedDesign(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white dark:bg-dark/95 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedDesign(null)}
                className="absolute top-4 right-4 w-10 h-10 bg-dark/10 dark:bg-white/10 hover:bg-dark/20 dark:hover:bg-white/20 rounded-full flex items-center justify-center transition-all z-10"
              >
                <X className="w-5 h-5 text-dark dark:text-white" />
              </button>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
                {/* Left: Image */}
                <div>
                  <img
                    src={selectedDesign.designData}
                    alt={selectedDesign.title}
                    className="w-full rounded-lg"
                  />

                  {/* Like Button */}
                  <button
                    onClick={() => handleLike(selectedDesign.id)}
                    className={`w-full mt-4 flex items-center justify-center gap-3 font-body font-semibold px-6 py-3 rounded-lg transition-all hover:scale-105 ${
                      isLiked(selectedDesign.id)
                        ? "bg-primary text-white"
                        : "bg-dark/10 dark:bg-white/10 text-dark dark:text-white"
                    }`}
                  >
                    <Heart
                      className={`w-5 h-5 ${
                        isLiked(selectedDesign.id) ? "fill-white" : ""
                      }`}
                    />
                    {isLiked(selectedDesign.id) ? "Aimé" : "Aimer"} (
                    {selectedDesign.likes})
                  </button>
                </div>

                {/* Right: Details & Comments */}
                <div className="flex flex-col">
                  <div className="flex-shrink-0 mb-6">
                    <h2 className="font-display text-3xl font-bold text-dark dark:text-white mb-4">
                      {selectedDesign.title}
                    </h2>

                    <div className="flex items-center gap-2 mb-4">
                      <User className="w-5 h-5 text-primary" />
                      <p className="font-body text-lg text-dark dark:text-white font-semibold">
                        {selectedDesign.artistName}
                      </p>
                      {selectedDesign.social && (
                        <>
                          <span className="text-dark/30 dark:text-white/30">·</span>
                          <Instagram className="w-5 h-5 text-accent" />
                          <a
                            href={`https://instagram.com/${selectedDesign.social.replace("@", "")}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-body text-accent hover:underline"
                          >
                            {selectedDesign.social}
                          </a>
                        </>
                      )}
                    </div>

                    <div className="bg-light dark:bg-dark/50 p-4 rounded-lg mb-4">
                      <p className="font-body text-xs font-semibold text-primary uppercase tracking-wider mb-2">
                        Philosophie
                      </p>
                      <p className="font-body text-sm text-dark dark:text-white leading-relaxed">
                        {selectedDesign.philosophy}
                      </p>
                    </div>

                    <p className="font-body text-xs text-dark/50 dark:text-white/50">
                      Créé le{" "}
                      {new Date(selectedDesign.timestamp).toLocaleDateString("fr-FR", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </p>
                  </div>

                  {/* Comments Section */}
                  <div className="flex-1 overflow-y-auto border-t border-dark/10 dark:border-white/10 pt-6">
                    <h3 className="font-display text-xl font-bold text-dark dark:text-white mb-4 flex items-center gap-2">
                      <MessageCircle className="w-5 h-5 text-primary" />
                      Commentaires ({selectedDesign.comments?.length || 0})
                    </h3>

                    {/* Comment List */}
                    <div className="space-y-4 mb-6 max-h-60 overflow-y-auto">
                      {selectedDesign.comments?.length === 0 ? (
                        <p className="font-body text-sm text-dark/50 dark:text-white/50 italic">
                          Aucun commentaire pour le moment. Soyez le premier !
                        </p>
                      ) : (
                        selectedDesign.comments?.map((comment) => (
                          <div
                            key={comment.id}
                            className="bg-light dark:bg-dark/50 p-4 rounded-lg"
                          >
                            <div className="flex items-center justify-between mb-2">
                              <p className="font-body text-sm font-semibold text-dark dark:text-white">
                                {comment.author}
                              </p>
                              <p className="font-body text-xs text-dark/40 dark:text-white/40">
                                {new Date(comment.timestamp).toLocaleDateString("fr-FR")}
                              </p>
                            </div>
                            <p className="font-body text-sm text-dark/80 dark:text-white/80">
                              {comment.text}
                            </p>
                          </div>
                        ))
                      )}
                    </div>

                    {/* Add Comment Form */}
                    <div className="border-t border-dark/10 dark:border-white/10 pt-4">
                      <input
                        type="text"
                        value={commentAuthor}
                        onChange={(e) => setCommentAuthor(e.target.value)}
                        placeholder="Votre nom"
                        className="w-full px-4 py-2 mb-2 font-body text-sm text-dark dark:text-white bg-white dark:bg-dark/60 border-2 border-dark/20 dark:border-white/20 rounded-lg focus:outline-none focus:border-primary"
                      />
                      <textarea
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                        placeholder="Partagez vos pensées philosophiques..."
                        rows={3}
                        className="w-full px-4 py-2 mb-2 font-body text-sm text-dark dark:text-white bg-white dark:bg-dark/60 border-2 border-dark/20 dark:border-white/20 rounded-lg focus:outline-none focus:border-primary resize-none"
                      />
                      <button
                        onClick={() => handleAddComment(selectedDesign.id)}
                        className="w-full flex items-center justify-center gap-2 font-body font-semibold px-4 py-2 bg-primary hover:bg-primary/90 text-white rounded-lg transition-all"
                      >
                        <Send className="w-4 h-4" />
                        Envoyer
                      </button>
                    </div>
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
