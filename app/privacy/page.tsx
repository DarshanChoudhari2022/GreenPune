import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy | GreenPune Initiative",
  description: "Learn how GreenPune handles volunteer registrations, optional analytics, and communication with full transparency.",
  alternates: {
    canonical: "/privacy"
  },
  openGraph: {
    title: "Privacy Policy | GreenPune Initiative",
    description: "Learn how GreenPune handles volunteer registrations, optional analytics, and communication with full transparency.",
    url: "/privacy",
    type: "website"
  }
};

export default function PrivacyPage() {
  return (
    <main className="privacy-page" style={{
      minHeight: "100vh",
      background: "var(--paper, #f4f8f2)",
      color: "var(--ink, #1a2e1a)",
      fontFamily: "Inter, sans-serif"
    }}>
      {/* Topbar */}
      <nav className="topbar">
        <div className="topbar-left">
          <Link href="/" className="brand-text">
            <span className="drop">☘️</span>
            <div className="brand-stack">
              <span className="brand-bold">GREEN</span>
              <span className="brand-light">PUNE</span>
            </div>
          </Link>
        </div>
        <div className="topbar-right" style={{ display: "flex", gap: "16px", alignItems: "center" }}>
          <Link href="/" className="nav-about">HOME</Link>
          <Link href="/about" className="nav-about">ABOUT</Link>
          <Link href="/register" className="nav-about">REGISTER</Link>
        </div>
      </nav>

      {/* Content */}
      <div style={{
        maxWidth: "800px",
        margin: "0 auto",
        padding: "120px 24px 80px"
      }}>
        <p style={{
          fontSize: "12px",
          fontWeight: 900,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          color: "var(--leaf-dark, #529624)",
          marginBottom: "12px"
        }}>
          Legal & Transparency
        </p>

        <h1 style={{
          fontSize: "clamp(28px, 5vw, 42px)",
          fontWeight: 900,
          lineHeight: 1.15,
          color: "#111",
          marginBottom: "16px"
        }}>
          Privacy Policy
        </h1>

        <p style={{
          fontSize: "14px",
          color: "var(--muted, #5a7055)",
          marginBottom: "36px"
        }}>
          Effective Date: 1 November 2026 • Last Updated: 10 November 2026
        </p>

        <div style={{
          display: "flex",
          flexDirection: "column",
          gap: "28px",
          fontSize: "15px",
          lineHeight: "1.7",
          color: "#333"
        }}>
          <section>
            <h2 style={{ fontSize: "20px", fontWeight: 800, color: "#111", marginBottom: "10px" }}>
              1. Overview of GreenPune
            </h2>
            <p>
              GreenPune is a citizen-driven community initiative dedicated to restoring Pune's urban tree cover, protecting local tekdis, and caring for native trees for three years after planting. We believe in complete transparency with all volunteers, supporters, and visitors.
            </p>
          </section>

          <section>
            <h2 style={{ fontSize: "20px", fontWeight: 800, color: "#111", marginBottom: "10px" }}>
              2. Information We Collect
            </h2>
            <p>
              When you voluntarily sign up for a plantation drive or express interest in adopting a tree, we collect:
            </p>
            <ul style={{ paddingLeft: "20px", marginTop: "8px" }}>
              <li><strong>Full Name:</strong> To address you and manage volunteer badges/groups.</li>
              <li><strong>Contact Number (Mobile / WhatsApp):</strong> To communicate gathering locations, timing, emergency instructions on planting day, and post-plantation tree care updates.</li>
              <li><strong>Address / Locality in Pune:</strong> To assign volunteers to nearby plantation sites (e.g. Mahadevwadi, Anandvan, Baner, Katraj).</li>
              <li><strong>Volunteer Preferences:</strong> Answers regarding whether you can bring a native sapling or gardening tools.</li>
            </ul>
          </section>

          <section>
            <h2 style={{ fontSize: "20px", fontWeight: 800, color: "#111", marginBottom: "10px" }}>
              3. Secure Server Processing
            </h2>
            <p>
              All registration data is validated directly on our secure server endpoint with anti-spam honeypot verification and rate limiting. Volunteer entries are saved securely for drive coordination. We never sell, rent, or trade your personal data to advertisers, commercial brokers, or third parties.
            </p>
          </section>

          <section>
            <h2 style={{ fontSize: "20px", fontWeight: 800, color: "#111", marginBottom: "10px" }}>
              4. Optional Analytics & Cookies
            </h2>
            <p>
              We value your privacy by design:
            </p>
            <ul style={{ paddingLeft: "20px", marginTop: "8px" }}>
              <li><strong>No Tracking Without Consent:</strong> Google Analytics 4 (GA4) is completely disabled by default. No requests are sent to Google until you explicitly choose "Accept" on our cookie banner.</li>
              <li><strong>Equal Choice:</strong> You have an equal, unhindered option to decline cookies. Declining does not affect your ability to browse or register.</li>
              <li><strong>Consent Withdrawal:</strong> You can modify or withdraw your cookie consent at any time by clicking "Cookie Settings" in the footer.</li>
            </ul>
          </section>

          <section>
            <h2 style={{ fontSize: "20px", fontWeight: 800, color: "#111", marginBottom: "10px" }}>
              5. Data Retention & Deletion Rights
            </h2>
            <p>
              Volunteer information is retained for coordinating post-plantation watering schedules and announcing future drives in Pune. If at any time you wish to have your details removed from our registration records, simply message or email us, and your data will be permanently deleted within 48 hours.
            </p>
          </section>

          <section style={{
            background: "white",
            padding: "24px",
            borderRadius: "16px",
            border: "1px solid var(--line, #d4e4cf)",
            marginTop: "12px"
          }}>
            <h2 style={{ fontSize: "18px", fontWeight: 800, color: "#111", marginBottom: "12px" }}>
              6. Organization & Contact Details
            </h2>
            <p style={{ margin: "0 0 8px" }}>
              For privacy inquiries, data deletion requests, or questions regarding GreenPune:
            </p>
            <div style={{ fontSize: "14px", lineHeight: "1.8", color: "#444" }}>
              <div><strong>Initiative:</strong> GreenPune Citizen Greening Initiative</div>
              <div><strong>Lead Coordinator:</strong> Mayank Goher</div>
              <div><strong>Phone / WhatsApp:</strong> <a href="https://wa.me/919623130157" style={{ color: "var(--leaf-dark, #529624)", fontWeight: 700 }}>+91 9623130157</a></div>
              <div><strong>Email:</strong> <a href="mailto:hello@greenpune.in" style={{ color: "var(--leaf-dark, #529624)" }}>hello@greenpune.in</a></div>
              <div><strong>Technology Partner:</strong> <a href="https://www.bracketdex.com/" target="_blank" rel="noopener noreferrer" style={{ color: "var(--leaf-dark, #529624)", textDecoration: "underline" }}>BracketDex Technologies</a></div>
              <div><strong>Operating Area:</strong> Pune Municipal Corporation (PMC), Maharashtra, India</div>
            </div>
          </section>
        </div>

        <div style={{ marginTop: "40px", textAlign: "center" }}>
          <Link
            href="/"
            style={{
              display: "inline-block",
              background: "var(--leaf-dark, #529624)",
              color: "white",
              padding: "12px 28px",
              borderRadius: "99px",
              fontWeight: 700,
              fontSize: "14px",
              textDecoration: "none"
            }}
          >
            ← Back to Homepage
          </Link>
        </div>
      </div>
    </main>
  );
}

