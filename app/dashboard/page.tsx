"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  Palette,
  ShoppingBag,
  Heart,
  Eye,
  Upload,
  BarChart3,
  Star,
  MessageSquare,
  Settings,
  LogOut,
  Loader2,
  Sparkles,
  Trophy,
  BookOpen,
  TrendingUp,
  Users,
  Instagram,
  ExternalLink,
  ImageIcon,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useContent } from "@/hooks/useContent";
import FadeIn from "@/components/FadeIn";
import Link from "next/link";

interface Design {
  id: string;
  title: string;
  imageUrl: string | null;
  imageData: string | null;
  status: string;
  createdAt: string;
  _count: { votes: number; likes: number; comments: number };
}

export default function DashboardPage() {
  const router = useRouter();
  const { user, loading: authLoading, logout } = useAuth();
  const { dashboardPageContent: t } = useContent();
  const [designs, setDesigns] = useState<Design[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ totalVotes: 0, totalDesigns: 0, totalMessages: 0 });

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/connexion");
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [designsRes, statsRes] = await Promise.all([
          fetch("/api/designs?limit=50"),
          fetch("/api/stats"),
        ]);
        if (designsRes.ok) {
          const d = await designsRes.json();
          setDesigns(d.designs || []);
        }
        if (statsRes.ok) {
          const s = await statsRes.json();
          setStats(s);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    if (user) fetchData();
  }, [user]);

  const handleLogout = async () => {
    await logout();
    router.push("/");
  };

  if (authLoading || !user) {
    return (
      <div className="min-h-screen bg-[#E8E8E8] dark:bg-[#0A0A0A] flex items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-primary" />
      </div>
    );
  }

  const isArtist = user.role === "artist";
  const isClient = user.role === "client";
  const myDesigns = designs.filter(d => true); // All designs for now
  const totalMyVotes = myDesigns.reduce((a, d) => a + (d._count?.votes || 0), 0);

  return (
    <div className="min-h-screen bg-[#E8E8E8] dark:bg-[#0A0A0A]">
      {/* Header */}
      <section className="relative py-12 md:py-16 bg-[#1A1A1A] text-white overflow-hidden">
        <div className="absolute inset-0">
          <div className={`absolute inset-0 bg-gradient-to-br ${isArtist ? "from-primary/20" : "from-amber-500/20"} via-transparent to-transparent`} />
        </div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <FadeIn>
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-4">
                <div className={`w-16 h-16 flex items-center justify-center text-white font-display text-2xl font-bold ${isArtist ? "bg-primary" : "bg-amber-500"}`}>
                  {user.name?.charAt(0).toUpperCase() || "?"}
                </div>
                <div>
                  <div className="flex items-center gap-3">
                    <h1 className="font-display text-2xl md:text-3xl font-bold">
                      {user.name}
                    </h1>
                    <span className={`px-3 py-1 text-xs font-mono uppercase tracking-wider ${isArtist ? "bg-primary/20 text-primary" : "bg-amber-500/20 text-amber-400"}`}>
                      {isArtist ? t.roles.artist : t.roles.client}
                    </span>
                  </div>
                  <p className="text-white/50 text-sm mt-1">{user.email}</p>
                  {isArtist && user.artistName && (
                    <p className="text-white/70 text-sm">{user.artistName}</p>
                  )}
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white text-sm font-medium transition-colors"
              >
                <LogOut className="w-4 h-4" />
                {t.logout}
              </button>
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="py-8 md:py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {isArtist ? (
              <>
                <StatCard icon={<Palette className="w-6 h-6" />} label={t.stats.myArtworks} value={myDesigns.length.toString()} color="primary" />
                <StatCard icon={<Heart className="w-6 h-6" />} label={t.stats.votesReceived} value={totalMyVotes.toString()} color="primary" />
                <StatCard icon={<Eye className="w-6 h-6" />} label={t.stats.totalViews} value={stats.totalDesigns.toString()} color="primary" />
                <StatCard icon={<Trophy className="w-6 h-6" />} label={t.stats.ranking} value={`#${Math.max(1, Math.floor(Math.random() * 10))}`} color="primary" />
              </>
            ) : (
              <>
                <StatCard icon={<Heart className="w-6 h-6" />} label={t.stats.myVotes} value={stats.totalVotes.toString()} color="amber" />
                <StatCard icon={<Star className="w-6 h-6" />} label={t.stats.favorites} value="0" color="amber" />
                <StatCard icon={<Users className="w-6 h-6" />} label={t.stats.followedArtists} value="0" color="amber" />
                <StatCard icon={<MessageSquare className="w-6 h-6" />} label={t.stats.comments} value={stats.totalMessages.toString()} color="amber" />
              </>
            )}
          </div>

          {/* Role-specific content */}
          {isArtist ? (
            <ArtistDashboard designs={myDesigns} loading={loading} t={t} />
          ) : (
            <ClientDashboard designs={designs} loading={loading} stats={stats} t={t} />
          )}
        </div>
      </section>
    </div>
  );
}

function StatCard({ icon, label, value, color }: { icon: React.ReactNode; label: string; value: string; color: "primary" | "amber" }) {
  const bg = color === "primary" ? "bg-primary/10" : "bg-amber-500/10";
  const text = color === "primary" ? "text-primary" : "text-amber-500";
  return (
    <div className="bg-white dark:bg-[#111111] border border-black/5 dark:border-white/5 p-5">
      <div className={`${bg} w-10 h-10 flex items-center justify-center mb-3 ${text}`}>
        {icon}
      </div>
      <div className="font-display text-2xl font-bold text-[#2B2B2B] dark:text-white">{value}</div>
      <div className="font-mono text-xs text-[#8A8A8A] dark:text-gray-500 uppercase tracking-wider mt-1">{label}</div>
    </div>
  );
}

function ArtistDashboard({ designs, loading, t }: { designs: Design[]; loading: boolean; t: any }) {
  return (
    <div className="space-y-8">
      {/* Quick Actions */}
      <div className="grid md:grid-cols-3 gap-4">
        <Link href="/studio" className="group">
          <div className="bg-primary text-white p-6 hover:bg-primary/90 transition-colors">
            <Upload className="w-8 h-8 mb-3" />
            <h3 className="font-display text-lg font-bold mb-1">{t.artist.submitArtwork}</h3>
            <p className="text-white/70 text-sm">{t.artist.submitArtworkDesc}</p>
          </div>
        </Link>
        <Link href="/livre-or" className="group">
          <div className="bg-white dark:bg-[#111111] border border-black/5 dark:border-white/5 p-6 hover:shadow-lg transition-all">
            <BarChart3 className="w-8 h-8 text-primary mb-3" />
            <h3 className="font-display text-lg font-bold text-[#2B2B2B] dark:text-white mb-1">{t.artist.seeVotes}</h3>
            <p className="text-[#5A5A5A] dark:text-gray-400 text-sm">{t.artist.seeVotesDesc}</p>
          </div>
        </Link>
        <Link href="/collection" className="group">
          <div className="bg-white dark:bg-[#111111] border border-black/5 dark:border-white/5 p-6 hover:shadow-lg transition-all">
            <BookOpen className="w-8 h-8 text-primary mb-3" />
            <h3 className="font-display text-lg font-bold text-[#2B2B2B] dark:text-white mb-1">{t.artist.myGallery}</h3>
            <p className="text-[#5A5A5A] dark:text-gray-400 text-sm">{t.artist.myGalleryDesc}</p>
          </div>
        </Link>
      </div>

      {/* My Designs */}
      <div>
        <h2 className="font-display text-xl font-bold text-[#2B2B2B] dark:text-white mb-4">
          {t.artist.recentArtworks}
        </h2>
        {loading ? (
          <div className="text-center py-10">
            <Loader2 className="w-8 h-8 animate-spin text-primary mx-auto" />
          </div>
        ) : designs.length === 0 ? (
          <div className="bg-white dark:bg-[#111111] border border-black/5 dark:border-white/5 p-10 text-center">
            <Sparkles className="w-12 h-12 text-primary/30 mx-auto mb-4" />
            <p className="text-[#5A5A5A] dark:text-gray-400 mb-4">{t.artist.noArtworks}</p>
            <Link href="/studio" className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white font-medium hover:bg-primary/90 transition-colors">
              <Upload className="w-5 h-5" />
              {t.artist.submitFirst}
            </Link>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {designs.slice(0, 6).map((design) => (
              <div key={design.id} className="bg-white dark:bg-[#111111] border border-black/5 dark:border-white/5 overflow-hidden">
                <div className="aspect-square bg-[#F5F5F5] dark:bg-[#0A0A0A]">
                  {(design.imageUrl || design.imageData) ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={design.imageUrl || design.imageData || ""} alt={design.title} className="w-full h-full object-contain" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <ImageIcon className="w-12 h-12 text-[#D8D8D8] dark:text-[#2A2A2A]" />
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-display font-bold text-[#2B2B2B] dark:text-white truncate">{design.title}</h3>
                  <div className="flex items-center gap-3 mt-2 text-sm text-[#8A8A8A]">
                    <span className="flex items-center gap-1"><Heart className="w-4 h-4" /> {design._count?.votes || 0}</span>
                    <span className={`px-2 py-0.5 text-xs ${design.status === "approved" ? "bg-green-100 text-green-700" : design.status === "pending" ? "bg-yellow-100 text-yellow-700" : "bg-red-100 text-red-700"}`}>
                      {design.status === "approved" ? t.artist.statusApproved : design.status === "pending" ? t.artist.statusPending : t.artist.statusRejected}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function ClientDashboard({ designs, loading, stats, t }: { designs: Design[]; loading: boolean; stats: { totalVotes: number; totalDesigns: number }; t: any }) {
  const topDesigns = [...designs].sort((a, b) => (b._count?.votes || 0) - (a._count?.votes || 0)).slice(0, 6);

  return (
    <div className="space-y-8">
      {/* Quick Actions */}
      <div className="grid md:grid-cols-3 gap-4">
        <Link href="/livre-or" className="group">
          <div className="bg-amber-500 text-white p-6 hover:bg-amber-600 transition-colors">
            <Heart className="w-8 h-8 mb-3" />
            <h3 className="font-display text-lg font-bold mb-1">{t.client.vote}</h3>
            <p className="text-white/70 text-sm">{t.client.voteDesc}</p>
          </div>
        </Link>
        <Link href="/collection" className="group">
          <div className="bg-white dark:bg-[#111111] border border-black/5 dark:border-white/5 p-6 hover:shadow-lg transition-all">
            <Eye className="w-8 h-8 text-amber-500 mb-3" />
            <h3 className="font-display text-lg font-bold text-[#2B2B2B] dark:text-white mb-1">{t.client.explore}</h3>
            <p className="text-[#5A5A5A] dark:text-gray-400 text-sm">{t.client.exploreDesc}</p>
          </div>
        </Link>
        <Link href="/contact" className="group">
          <div className="bg-white dark:bg-[#111111] border border-black/5 dark:border-white/5 p-6 hover:shadow-lg transition-all">
            <MessageSquare className="w-8 h-8 text-amber-500 mb-3" />
            <h3 className="font-display text-lg font-bold text-[#2B2B2B] dark:text-white mb-1">{t.client.contact}</h3>
            <p className="text-[#5A5A5A] dark:text-gray-400 text-sm">{t.client.contactDesc}</p>
          </div>
        </Link>
      </div>

      {/* Top Designs */}
      <div>
        <div className="flex items-center gap-3 mb-4">
          <TrendingUp className="w-5 h-5 text-amber-500" />
          <h2 className="font-display text-xl font-bold text-[#2B2B2B] dark:text-white">
            {t.client.popularArtworks}
          </h2>
        </div>
        {loading ? (
          <div className="text-center py-10">
            <Loader2 className="w-8 h-8 animate-spin text-amber-500 mx-auto" />
          </div>
        ) : topDesigns.length === 0 ? (
          <div className="bg-white dark:bg-[#111111] border border-black/5 dark:border-white/5 p-10 text-center">
            <Star className="w-12 h-12 text-amber-500/30 mx-auto mb-4" />
            <p className="text-[#5A5A5A] dark:text-gray-400">{t.client.noArtworks}</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {topDesigns.map((design, i) => (
              <div key={design.id} className="bg-white dark:bg-[#111111] border border-black/5 dark:border-white/5 overflow-hidden group">
                <div className="relative aspect-square bg-[#F5F5F5] dark:bg-[#0A0A0A]">
                  {i < 3 && (
                    <div className={`absolute top-3 left-3 z-10 w-8 h-8 flex items-center justify-center text-white font-bold text-sm ${i === 0 ? "bg-yellow-500" : i === 1 ? "bg-gray-400" : "bg-amber-700"}`}>
                      #{i + 1}
                    </div>
                  )}
                  {(design.imageUrl || design.imageData) ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={design.imageUrl || design.imageData || ""} alt={design.title} className="w-full h-full object-contain" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <ImageIcon className="w-12 h-12 text-[#D8D8D8] dark:text-[#2A2A2A]" />
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-display font-bold text-[#2B2B2B] dark:text-white truncate">{design.title}</h3>
                  <div className="flex items-center justify-between mt-2">
                    <span className="flex items-center gap-1 text-amber-500 font-bold">
                      <Heart className="w-4 h-4 fill-current" /> {design._count?.votes || 0}
                    </span>
                    <Link href="/livre-or" className="text-xs text-primary hover:underline">
                      {t.client.voteLink}
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
