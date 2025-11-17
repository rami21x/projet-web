import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Processus de Création - ARTERAL",
  description: "De la philosophie au vêtement : découvrez notre processus créatif complet, de la recherche philosophique à la broderie artisanale.",
  keywords: ["processus créatif", "arteral", "making-of", "création artistique", "mode artisanale"],
  openGraph: {
    title: "Processus de Création - ARTERAL",
    description: "Comment nous transformons des concepts philosophiques en pièces tangibles",
    type: "website",
  },
};

export default function ProcessusLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
