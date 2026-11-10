import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Registration Confirmed",
  description: "Your registration for the GreenPune tree plantation drive has been confirmed.",
  robots: {
    index: false,
    follow: false
  },
  alternates: {
    canonical: "/thank-you"
  }
};

export default function ThankYouPage() {
  return (
    <main className="thank-you-page" style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "48px 20px",
      background: "linear-gradient(165deg, #f4f8f2 0%, #e8f5e1 100%)",
      fontFamily: "Inter, sans-serif",
      color: "var(--ink, #1a2e1a)"
    }}>
      <div style={{
        maxWidth: "600px",
        width: "100%",
        background: "white",
        borderRadius: "24px",
        padding: "48px 32px",
        boxShadow: "0 20px 60px rgba(13, 74, 26, 0.1)",
        border: "1px solid rgba(102, 184, 46, 0.2)",
        textAlign: "center"
      }}>
        <div style={{
          width: "72px",
          height: "72px",
          borderRadius: "50%",
          background: "var(--leaf-soft, #f2faeb)",
          color: "var(--leaf-dark, #529624)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "36px",
          margin: "0 auto 20px",
          border: "2px solid rgba(102, 184, 46, 0.3)"
        }}>
          ✓
        </div>

        <p style={{
          fontSize: "12px",
          fontWeight: 900,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: "var(--leaf-dark, #529624)",
          marginBottom: "8px"
        }}>
          Registration Received
        </p>

        <h1 style={{
          fontSize: "clamp(26px, 4vw, 36px)",
          fontWeight: 900,
          lineHeight: 1.2,
          marginBottom: "16px",
          color: "#111"
        }}>
          Thank You for Joining the Mission!
        </h1>

        <p style={{
          fontSize: "15px",
          color: "var(--muted, #5a7055)",
          lineHeight: 1.7,
          marginBottom: "28px"
        }}>
          Your volunteer registration for the upcoming GreenPune plantation drive has been successfully recorded. Together, we are building a greener, cooler, and healthier Pune.
        </p>

        {/* What to expect card */}
        <div style={{
          background: "var(--paper, #f4f8f2)",
          borderRadius: "16px",
          padding: "20px",
          textAlign: "left",
          marginBottom: "28px",
          border: "1px solid var(--line-light, #e8f0e5)"
        }}>
          <h3 style={{
            fontSize: "14px",
            fontWeight: 800,
            textTransform: "uppercase",
            letterSpacing: "0.05em",
            color: "var(--leaf-dark, #529624)",
            marginBottom: "12px"
          }}>
            What to expect next
          </h3>
          <ul style={{
            margin: 0,
            paddingLeft: "20px",
            display: "flex",
            flexDirection: "column",
            gap: "8px",
            fontSize: "14px",
            color: "#444",
            lineHeight: 1.5
          }}>
            <li><strong>WhatsApp updates:</strong> We will share exact gathering points and timing before the plantation day.</li>
            <li><strong>What to bring:</strong> Comfortable shoes, drinking water, and your enthusiasm. Planting tools and saplings are provided on site.</li>
            <li><strong>Post-care tracking:</strong> After planting, you can participate in our 3-year adoption and watering schedule.</li>
          </ul>
        </div>

        {/* Action buttons */}
        <div style={{
          display: "flex",
          flexDirection: "column",
          gap: "12px"
        }}>
          <a
            href="https://wa.me/919623130157?text=Hi%20Mayank,%20I%20have%20registered%20for%20the%20GreenPune%20Tree%20Plantation%20Drive!"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              background: "#25d366",
              color: "white",
              padding: "14px 28px",
              borderRadius: "99px",
              fontWeight: 800,
              fontSize: "14px",
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px"
            }}
          >
            <span>💬</span> Join WhatsApp Volunteer Community
          </a>

          <div style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "12px",
            marginTop: "6px"
          }}>
            <Link
              href="/"
              style={{
                border: "1px solid var(--line, #d4e4cf)",
                background: "white",
                color: "var(--ink, #1a2e1a)",
                padding: "12px 20px",
                borderRadius: "99px",
                fontWeight: 700,
                fontSize: "13px",
                textDecoration: "none"
              }}
            >
              Back to Home
            </Link>
            <Link
              href="/about"
              style={{
                border: "1px solid var(--line, #d4e4cf)",
                background: "white",
                color: "var(--ink, #1a2e1a)",
                padding: "12px 20px",
                borderRadius: "99px",
                fontWeight: 700,
                fontSize: "13px",
                textDecoration: "none"
              }}
            >
              Explore Mission
            </Link>
          </div>
        </div>

        <p style={{
          marginTop: "28px",
          marginBottom: 0,
          fontSize: "12px",
          color: "var(--muted, #5a7055)"
        }}>
          Questions? Contact drive coordinator Mayank Goher: <a href="tel:+919623130157" style={{ color: "var(--leaf-dark, #529624)", fontWeight: 700 }}>+91 9623130157</a>
        </p>
      </div>
    </main>
  );
}

