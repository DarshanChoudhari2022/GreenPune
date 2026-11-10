"use client";

import { useEffect, useState } from "react";
import Script from "next/script";

const STORAGE_KEY = "greenpune_consent";

export function AnalyticsAndConsent() {
  const [consent, setConsent] = useState<"accepted" | "declined" | null>(null);
  const [showBanner, setShowBanner] = useState(false);

  const rawGaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim() || "";
  const isGaIdValid = rawGaId.length > 5 && !rawGaId.startsWith("G-XXXX");

  useEffect(() => {
    // Check stored choice
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored === "accepted" || stored === "declined") {
        setConsent(stored);
      } else {
        setShowBanner(true);
      }
    } catch {
      // Local storage disabled or error
    }

    // Expose global callback so footer / settings link can open preferences
    const handleOpenSettings = () => {
      setShowBanner(true);
    };

    window.addEventListener("open-cookie-settings", handleOpenSettings);
    (window as any).__openCookieSettings = handleOpenSettings;

    return () => {
      window.removeEventListener("open-cookie-settings", handleOpenSettings);
    };
  }, []);

  const handleAccept = () => {
    try {
      localStorage.setItem(STORAGE_KEY, "accepted");
    } catch {}
    setConsent("accepted");
    setShowBanner(false);
  };

  const handleDecline = () => {
    try {
      localStorage.setItem(STORAGE_KEY, "declined");
      // Remove Google Analytics cookies if any were set
      document.cookie.split(";").forEach((cookie) => {
        const name = cookie.split("=")[0].trim();
        if (name.startsWith("_ga")) {
          document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
        }
      });
    } catch {}
    setConsent("declined");
    setShowBanner(false);
  };

  return (
    <>
      {/* Load GA4 only if consent is given AND valid measurement ID is present */}
      {consent === "accepted" && isGaIdValid && (
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
      )}

      {/* Cookie Consent Banner */}
      {showBanner && (
        <aside
          role="region"
          aria-label="Cookie and Privacy Preferences"
          style={{
            position: "fixed",
            bottom: "20px",
            left: "20px",
            right: "20px",
            maxWidth: "520px",
            margin: "0 auto",
            background: "#ffffff",
            color: "#1a2e1a",
            padding: "20px 24px",
            borderRadius: "16px",
            boxShadow: "0 16px 48px rgba(0, 0, 0, 0.18)",
            border: "1px solid rgba(102, 184, 46, 0.25)",
            zIndex: 99999,
            fontFamily: "Inter, sans-serif"
          }}
        >
          <div style={{ display: "flex", alignItems: "flex-start", gap: "12px", marginBottom: "14px" }}>
            <span style={{ fontSize: "24px" }}>🍪</span>
            <div>
              <h2 style={{ fontSize: "15px", fontWeight: 800, margin: "0 0 4px", color: "#111" }}>
                Privacy &amp; Cookie Preferences
              </h2>
              <p style={{ fontSize: "13px", color: "#5a7055", margin: 0, lineHeight: 1.5 }}>
                We use optional analytics (Google Analytics) to measure community reach and improve our website. We do not track without your consent.
              </p>
            </div>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "10px"
            }}
          >
            <button
              type="button"
              onClick={handleDecline}
              style={{
                background: "transparent",
                border: "1.5px solid #a0b89a",
                color: "#2a422a",
                padding: "10px 16px",
                borderRadius: "99px",
                fontWeight: 700,
                fontSize: "13px",
                cursor: "pointer",
                transition: "background 0.2s"
              }}
            >
              Decline
            </button>
            <button
              type="button"
              onClick={handleAccept}
              style={{
                background: "var(--leaf-dark, #529624)",
                border: "1.5px solid var(--leaf-dark, #529624)",
                color: "white",
                padding: "10px 16px",
                borderRadius: "99px",
                fontWeight: 700,
                fontSize: "13px",
                cursor: "pointer",
                boxShadow: "0 2px 8px rgba(82, 150, 36, 0.3)"
              }}
            >
              Accept All
            </button>
          </div>
        </aside>
      )}
    </>
  );
}

