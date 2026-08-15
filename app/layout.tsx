import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "GreenPune Events — Anandvan Mahadevwadi 110 Trees Drive",
  description:
    "110 native trees planted at Anandvan, Mahadevwadi, Pune (11:00 AM - 2:00 PM, 15 Aug 2026). Featuring Choksi School Pune awareness dance act & Sakal Hindu Samaj.",
  metadataBase: new URL("https://greenpune.in"),
  openGraph: {
    title: "GreenPune Events — Anandvan Mahadevwadi 110 Trees Drive",
    description: "110 native trees planted at Anandvan, Mahadevwadi, Pune (11:00 AM - 2:00 PM, 15 Aug 2026). Featuring Choksi School Pune awareness dance act & Sakal Hindu Samaj.",
    url: "https://greenpune.in",
    siteName: "GreenPune",
    images: [
      {
        url: "/images/greenpune-logo.png",
        width: 1200,
        height: 630,
        alt: "GreenPune Logo"
      }
    ],
    locale: "en_US",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "GreenPune Events — Anandvan Mahadevwadi 110 Trees Drive",
    description: "110 native trees planted at Anandvan, Mahadevwadi, Pune (11:00 AM - 2:00 PM, 15 Aug 2026). Featuring Choksi School Pune awareness dance act & Sakal Hindu Samaj.",
    images: ["/images/greenpune-logo.png"]
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="mr">
      <body>{children}</body>
    </html>
  );
}
