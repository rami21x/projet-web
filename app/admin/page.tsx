"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Shield,
  CheckCircle,
  XCircle,
  Star,
  Eye,
  RefreshCw,
  AlertTriangle,
  Clock,
  Image as ImageIcon,
  User,
  Mail
} from "lucide-react";

interface Design {
  id: string;
  title: string;
  philosophy: string;
  imageData?: string;
  imageUrl?: string;
  garmentType: string;
  garmentFit: string;
  garmentColor: string;
  status: string;
  createdAt: string;
  author: {
    id: string;
    name: string;
    artistName?: string;
    email: string;
  };
  _count: {
    likes: number;
    votes: number;
  };
}

interface Counts {
  pending: number;
  approved: number;
  rejected: number;
  featured: number;
}

export default function AdminPage() {
  const [adminKey, setAdminKey] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [designs, setDesigns] = useState<Design[]>([]);
  const [counts, setCounts] = useState<Counts>({ pending: 0, approved: 0, rejected: 0, featured: 0 });
  const [currentStatus, setCurrentStatus] = useState("pending");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  const fetchDesigns = async (status: string = currentStatus) => {
    if (!adminKey) return;

    setLoading(true);
    setError("");

    try {
      const res = await fetch(`/api/admin/moderate?key=${adminKey}&status=${status}`);
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Erreur lors du chargement");
      }

      setDesigns(data.designs);
      setCounts(data.counts);
      setIsAuthenticated(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur inconnue");
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  const handleModerate = async (designId: string, action: "approve" | "reject" | "feature") => {
    setActionLoading(designId);

    try {
      const res = await fetch("/api/admin/moderate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ designId, action, adminKey })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Erreur lors de la modération");
      }

      // Refresh designs
      await fetchDesigns();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur inconnue");
    } finally {
      setActionLoading(null);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    fetchDesigns();
  };

  const statusTabs = [
    { key: "pending", label: "En attente", icon: Clock, color: "text-yellow-500" },
    { key: "approved", label: "Approuvés", icon: CheckCircle, color: "text-green-500" },
    { key: "featured", label: "Mis en avant", icon: Star, color: "text-purple-500" },
    { key: "rejected", label: "Rejetés", icon: XCircle, color: "text-red-500" }
  ];

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#1A1A1A] p-8 rounded-lg border border-[#2A2A2A] w-full max-w-md"
        >
          <div className="text-center mb-8">
            <Shield className="w-16 h-16 text-primary mx-auto mb-4" />
            <h1 className="font-display text-2xl font-bold text-white">Admin Arteral</h1>
            <p className="text-gray-400 mt-2">Modération des designs</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm text-gray-400 mb-2">Clé Admin</label>
              <input
                type="password"
                value={adminKey}
                onChange={(e) => setAdminKey(e.target.value)}
                className="w-full bg-[#0A0A0A] border border-[#3A3A3A] rounded px-4 py-3 text-white focus:border-primary focus:outline-none"
                placeholder="Entrez la clé admin..."
              />
            </div>

            {error && (
              <div className="flex items-center gap-2 text-red-400 text-sm">
                <AlertTriangle className="w-4 h-4" />
                <span>{error}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={loading || !adminKey}
              className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-3 rounded transition-colors disabled:opacity-50"
            >
              {loading ? "Connexion..." : "Accéder"}
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      {/* Header */}
      <header className="bg-[#1A1A1A] border-b border-[#2A2A2A] px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Shield className="w-8 h-8 text-primary" />
            <h1 className="font-display text-xl font-bold">Admin Arteral</h1>
          </div>

          <button
            onClick={() => fetchDesigns()}
            disabled={loading}
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
          >
            <RefreshCw className={`w-5 h-5 ${loading ? "animate-spin" : ""}`} />
            <span>Rafraîchir</span>
          </button>
        </div>
      </header>

      {/* Status Tabs */}
      <div className="bg-[#1A1A1A] border-b border-[#2A2A2A]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex gap-1 overflow-x-auto">
            {statusTabs.map((tab) => {
              const Icon = tab.icon;
              const count = counts[tab.key as keyof Counts];
              return (
                <button
                  key={tab.key}
                  onClick={() => {
                    setCurrentStatus(tab.key);
                    fetchDesigns(tab.key);
                  }}
                  className={`flex items-center gap-2 px-4 py-3 border-b-2 transition-colors whitespace-nowrap ${
                    currentStatus === tab.key
                      ? "border-primary text-white"
                      : "border-transparent text-gray-400 hover:text-white"
                  }`}
                >
                  <Icon className={`w-4 h-4 ${tab.color}`} />
                  <span>{tab.label}</span>
                  <span className="bg-[#2A2A2A] px-2 py-0.5 rounded-full text-xs">
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {error && (
          <div className="flex items-center gap-2 text-red-400 mb-6 p-4 bg-red-900/20 rounded-lg">
            <AlertTriangle className="w-5 h-5" />
            <span>{error}</span>
          </div>
        )}

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <RefreshCw className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : designs.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <ImageIcon className="w-16 h-16 mx-auto mb-4 opacity-50" />
            <p>Aucun design {currentStatus === "pending" ? "en attente" : ""}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {designs.map((design) => (
                <motion.div
                  key={design.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="bg-[#1A1A1A] rounded-lg border border-[#2A2A2A] overflow-hidden"
                >
                  {/* Image */}
                  <div className="aspect-square bg-[#0A0A0A] relative">
                    {design.imageData || design.imageUrl ? (
                      <img
                        src={design.imageData || design.imageUrl}
                        alt={design.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-600">
                        <ImageIcon className="w-12 h-12" />
                      </div>
                    )}

                    {/* Garment info */}
                    <div className="absolute top-2 left-2 flex gap-2">
                      <span className="bg-black/70 text-white text-xs px-2 py-1 rounded">
                        {design.garmentType}
                      </span>
                      <span className="bg-black/70 text-white text-xs px-2 py-1 rounded">
                        {design.garmentFit}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    <h3 className="font-display text-lg font-bold mb-2 line-clamp-1">
                      {design.title}
                    </h3>

                    <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                      {design.philosophy}
                    </p>

                    {/* Author info */}
                    <div className="flex items-center gap-2 mb-4 text-sm text-gray-400">
                      <User className="w-4 h-4" />
                      <span>{design.author.artistName || design.author.name}</span>
                    </div>

                    <div className="flex items-center gap-2 mb-4 text-sm text-gray-400">
                      <Mail className="w-4 h-4" />
                      <span className="truncate">{design.author.email}</span>
                    </div>

                    {/* Stats */}
                    <div className="flex items-center gap-4 mb-4 text-sm text-gray-400">
                      <span>{design._count.likes} likes</span>
                      <span>{design._count.votes} votes</span>
                    </div>

                    {/* Actions */}
                    {currentStatus === "pending" && (
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleModerate(design.id, "approve")}
                          disabled={actionLoading === design.id}
                          className="flex-1 flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white py-2 rounded transition-colors disabled:opacity-50"
                        >
                          <CheckCircle className="w-4 h-4" />
                          <span>Approuver</span>
                        </button>
                        <button
                          onClick={() => handleModerate(design.id, "reject")}
                          disabled={actionLoading === design.id}
                          className="flex-1 flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white py-2 rounded transition-colors disabled:opacity-50"
                        >
                          <XCircle className="w-4 h-4" />
                          <span>Rejeter</span>
                        </button>
                      </div>
                    )}

                    {currentStatus === "approved" && (
                      <button
                        onClick={() => handleModerate(design.id, "feature")}
                        disabled={actionLoading === design.id}
                        className="w-full flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 text-white py-2 rounded transition-colors disabled:opacity-50"
                      >
                        <Star className="w-4 h-4" />
                        <span>Mettre en avant</span>
                      </button>
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </main>
    </div>
  );
}
