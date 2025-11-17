import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Collection Amour ↔ Ennuie - ARTERAL",
  description: "Explorez la collection Amour ↔ Ennuie : une exploration du paradoxe entre passion ardente et introspection silencieuse, brodée sur textile premium.",
  keywords: ["arteral", "amour ennuie", "collection", "mode philosophique", "surréalisme minimaliste"],
  openGraph: {
    title: "Collection Amour ↔ Ennuie - ARTERAL",
    description: "Passion et vide. Expansion et repli. Découvrez notre première collection philosophique.",
    type: "website",
  },
};

export default function CollectionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
