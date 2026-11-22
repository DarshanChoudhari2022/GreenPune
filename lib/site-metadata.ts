import type { Metadata } from "next";

export const siteUrl = new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://www.greenpune.in").origin;

export function pageMetadata(path: string, title: string, description: string): Metadata {
  const socialTitle = `${title} | GreenPune`;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: socialTitle,
      description,
      url: path,
      siteName: "GreenPune",
      locale: "en_IN",
      type: "website",
      images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "GreenPune urban greening initiative" }]
    },
    twitter: { card: "summary_large_image", title: socialTitle, description, images: ["/opengraph-image"] },
    ...(path === "/thank-you" ? { robots: { index: false, follow: false } } : {})
  };
}
