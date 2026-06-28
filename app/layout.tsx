import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "GreenPune Events",
  description:
    "Community portfolio and registrations for GreenPune tree plantation events.",
  metadataBase: new URL("https://greenpune.in"),
  openGraph: {
    title: "GreenPune Events",
    description: "Community portfolio and registrations for GreenPune tree plantation events.",
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
    title: "GreenPune Events",
    description: "Community portfolio and registrations for GreenPune tree plantation events.",
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
