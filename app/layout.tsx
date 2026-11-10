import type { Metadata } from "next";
import "./globals.css";
import { AnalyticsAndConsent } from "./components/AnalyticsAndConsent";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://greenpune.in";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "GreenPune — Native Tree Plantation & Urban Greening Movement",
    template: "%s | GreenPune"
  },
  description:
    "Citizen-led urban greening initiative in Pune. Planting 1 million native trees across Pune neighborhoods, Anandvan, and tekdis with 3-year survival care.",
  alternates: {
    canonical: "/"
  },
  openGraph: {
    title: "GreenPune — Native Tree Plantation & Urban Greening Movement",
    description:
      "Citizen-led urban greening initiative in Pune. Planting 1 million native trees across Pune neighborhoods, Anandvan, and tekdis with 3-year survival care.",
    url: siteUrl,
    siteName: "GreenPune",
    locale: "en_IN",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "GreenPune — Native Tree Plantation & Urban Greening Movement",
    description:
      "Citizen-led urban greening initiative in Pune. Planting 1 million native trees across Pune neighborhoods, Anandvan, and tekdis with 3-year survival care."
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="mr">
      <body>
        {children}
        <AnalyticsAndConsent />
      </body>
    </html>
  );
}
