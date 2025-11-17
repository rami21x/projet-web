import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Artistes - ARTERAL",
  description: "Découvrez les artistes conceptuels derrière Arteral. Collaborations artistiques pour transformer la philosophie en art incarné.",
  keywords: ["artistes", "arteral", "collaboration artistique", "artistes conceptuels", "mode art"],
  openGraph: {
    title: "Artistes - ARTERAL",
    description: "Rencontrez les créateurs derrière la collection Amour ↔ Ennuie",
    type: "website",
  },
};

export default function ArtistesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
