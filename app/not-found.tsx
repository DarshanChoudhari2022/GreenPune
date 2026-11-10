import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page Not Found",
  description: "The page you are looking for does not exist on GreenPune.",
  robots: {
    index: false,
    follow: false
  }
};

export default function NotFound() {
  return (
    <main className="not-found-page" style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center",
      padding: "32px 20px",
      background: "linear-gradient(165deg, #f4f8f2 0%, #e8f5e1 100%)",
      color: "var(--ink, #1a2e1a)",
      fontFamily: "Inter, sans-serif"
    }}>
      <div style={{
        maxWidth: "540px",
        background: "white",
        borderRadius: "24px",
        padding: "48px 32px",
        boxShadow: "0 20px 60px rgba(13, 74, 26, 0.1)",
        border: "1px solid rgba(102, 184, 46, 0.2)"
      }}>
        <div style={{ fontSize: "56px", marginBottom: "16px" }}>🌱</div>
        <p style={{
          fontSize: "12px",
          fontWeight: 900,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: "var(--leaf-dark, #529624)",
          marginBottom: "8px"
        }}>
          404 — Page Not Found
        </p>
        <h1 style={{
          fontSize: "clamp(26px, 4vw, 36px)",
          fontWeight: 900,
          lineHeight: 1.2,
          marginBottom: "14px",
          color: "#111"
        }}>
          This page has branched off
        </h1>
        <p style={{
          fontSize: "15px",
          color: "var(--muted, #5a7055)",
          lineHeight: 1.6,
          marginBottom: "32px"
        }}>
          The page you requested could not be found or may have moved. Explore our main pages below to get involved with GreenPune:
        </p>

        <div style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          marginBottom: "28px"
        }}>
          <Link
            href="/"
            style={{
              background: "var(--leaf-dark, #529624)",
              color: "white",
              padding: "13px 24px",
              borderRadius: "99px",
              fontWeight: 700,
              fontSize: "14px",
              textDecoration: "none",
              display: "inline-block"
            }}
          >
            Go to Homepage →
          </Link>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "10px",
            marginTop: "6px"
          }}>
            <Link
              href="/about"
              style={{
                border: "1px solid var(--line, #d4e4cf)",
                background: "var(--paper, #f4f8f2)",
                color: "var(--ink, #1a2e1a)",
                padding: "10px 16px",
                borderRadius: "99px",
                fontWeight: 600,
                fontSize: "13px",
                textDecoration: "none"
              }}
            >
              About Mission
            </Link>
            <Link
              href="/register"
              style={{
                border: "1px solid var(--line, #d4e4cf)",
                background: "var(--paper, #f4f8f2)",
                color: "var(--ink, #1a2e1a)",
                padding: "10px 16px",
                borderRadius: "99px",
                fontWeight: 600,
                fontSize: "13px",
                textDecoration: "none"
              }}
            >
              Register for Drive
            </Link>
            <Link
              href="/faq"
              style={{
                border: "1px solid var(--line, #d4e4cf)",
                background: "var(--paper, #f4f8f2)",
                color: "var(--ink, #1a2e1a)",
                padding: "10px 16px",
                borderRadius: "99px",
                fontWeight: 600,
                fontSize: "13px",
                textDecoration: "none"
              }}
            >
              FAQs
            </Link>
            <Link
              href="/privacy"
              style={{
                border: "1px solid var(--line, #d4e4cf)",
                background: "var(--paper, #f4f8f2)",
                color: "var(--ink, #1a2e1a)",
                padding: "10px 16px",
                borderRadius: "99px",
                fontWeight: 600,
                fontSize: "13px",
                textDecoration: "none"
              }}
            >
              Privacy Policy
            </Link>
          </div>
        </div>

        <p style={{ fontSize: "12px", color: "#888", margin: 0 }}>
          Need assistance? WhatsApp us at <a href="https://wa.me/919623130157" target="_blank" rel="noopener noreferrer" style={{ color: "var(--leaf-dark, #529624)", fontWeight: 700 }}>+91 9623130157</a>
        </p>
      </div>
    </main>
  );
}

