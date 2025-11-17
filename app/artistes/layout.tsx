import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Concours 5000€ - ARTERAL",
  description: "Remportez 5000€ en créant l'artwork de notre prochaine collection! Thème: CHAOS ↔ ORDRE. Concours créatif ouvert à tous les artistes.",
  keywords: ["concours art", "5000 euros", "arteral", "concours créatif", "artwork", "design textile", "philosophie"],
  openGraph: {
    title: "Concours ARTERAL - 5000€ à gagner",
    description: "Créez l'artwork de notre prochaine collection et gagnez 5000€ + collaboration officielle",
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
