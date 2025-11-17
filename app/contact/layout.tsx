import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact & Newsletter - ARTERAL",
  description: "Rejoignez la communauté Arteral. Inscrivez-vous à notre newsletter et restez informé de nos collections et collaborations artistiques.",
  keywords: ["contact arteral", "newsletter", "faq", "mode philosophique"],
  openGraph: {
    title: "Contact & Newsletter - ARTERAL",
    description: "Restez connecté à la conscience. Rejoignez la communauté Arteral.",
    type: "website",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
