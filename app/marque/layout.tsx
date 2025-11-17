import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "La Marque - ARTERAL",
  description: "Découvrez la philosophie d'Arteral : mode philosophique qui fusionne art conceptuel et textile. Chaque pièce est une collaboration artistique unique.",
  keywords: ["arteral", "mode philosophique", "art conceptuel", "fashion", "philosophie"],
  openGraph: {
    title: "La Marque - ARTERAL",
    description: "Mode philosophique qui fusionne art conceptuel et textile",
    type: "website",
  },
};

export default function MarqueLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
