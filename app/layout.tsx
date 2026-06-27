import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "GreenPune Events",
  description:
    "Community portfolio and registrations for GreenPune tree plantation events."
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
