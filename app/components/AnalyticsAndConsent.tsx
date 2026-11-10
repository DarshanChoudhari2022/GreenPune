"use client";

import Script from "next/script";

export function AnalyticsAndConsent() {
  const rawGaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim() || "";
  const isGaIdValid = rawGaId.length > 5 && !rawGaId.startsWith("G-XXXX");

  if (!isGaIdValid) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${rawGaId}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${rawGaId}', {
            page_path: window.location.pathname,
            anonymize_ip: true
          });
        `}
      </Script>
    </>
  );
}
