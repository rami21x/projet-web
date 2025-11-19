import { Metadata } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://arteral.com";

export const defaultMetadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Arteral — Mode Philosophique, Art Incarné",
    template: "%s | Arteral",
  },
  description:
    "Mode philosophique et art incarné. Chaque pièce Arteral raconte un paradoxe. Créations en édition limitée, collaborations artistiques, collections intemporelles.",
  keywords: [
    "mode philosophique",
    "art incarné",
    "vêtements artistiques",
    "édition limitée",
    "mode consciente",
    "création artistique",
    "artisanat",
    "fashion philosophy",
  ],
  authors: [{ name: "Arteral" }],
  creator: "Arteral",
  publisher: "Arteral",
  openGraph: {
    type: "website",
    locale: "fr_FR",
    alternateLocale: "en_US",
    url: siteUrl,
    siteName: "Arteral",
    title: "Arteral — Mode Philosophique, Art Incarné",
    description:
      "Mode philosophique et art incarné. Chaque pièce Arteral raconte un paradoxe.",
    images: [
      {
        url: `${siteUrl}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "Arteral — Mode Philosophique",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Arteral — Mode Philosophique, Art Incarné",
    description:
      "Mode philosophique et art incarné. Chaque pièce Arteral raconte un paradoxe.",
    images: [`${siteUrl}/og-image.jpg`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    // Add when available:
    // google: "your-google-verification-code",
    // yandex: "your-yandex-verification-code",
  },
};

export function generatePageMetadata(
  title: string,
  description: string,
  path: string = ""
): Metadata {
  const url = `${siteUrl}${path}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      images: [
        {
          url: `${siteUrl}/og-image.jpg`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      title,
      description,
      images: [`${siteUrl}/og-image.jpg`],
    },
    alternates: {
      canonical: url,
    },
  };
}
