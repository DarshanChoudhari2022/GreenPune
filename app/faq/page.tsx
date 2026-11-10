import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Frequently Asked Questions | GreenPune",
  description: "Common questions about GreenPune tree plantation drives, volunteering, native saplings, and 3-year stewardship.",
  alternates: {
    canonical: "/faq"
  },
  openGraph: {
    title: "Frequently Asked Questions | GreenPune",
    description: "Common questions about GreenPune tree plantation drives, volunteering, native saplings, and 3-year stewardship.",
    url: "/faq",
    type: "website"
  }
};

const faqs = [
  {
    question: "What is the GreenPune initiative?",
    answer:
      "GreenPune is a citizen-led urban tree plantation and ecological stewardship movement in Pune, Maharashtra. Our mission is to plant native trees across Pune's neighborhoods, hillocks (tekdis), and river corridors while ensuring three years of post-plantation care so trees survive and thrive."
  },
  {
    question: "Who can participate in the plantation drives?",
    answer:
      "Everyone! Our drives are free and open to all citizens — students, families, housing societies, senior citizens, and corporate teams. Children are especially welcome with adult supervision to learn about urban ecology."
  },
  {
    question: "Do I need to bring my own sapling or tools?",
    answer:
      "No. GreenPune provides native saplings, organic compost, and basic gardening tools on site. However, volunteers who have healthy native species saplings (such as Neem, Peepal, Banyan, Karanj, or Tamarind) are welcome to bring them."
  },
  {
    question: "Why do you only plant native tree species?",
    answer:
      "Native species like Neem, Banyan, Peepal, and Jamun are naturally suited to Pune's soil, climate, and rainfall patterns. They require less chemical treatment, foster local bird and pollinator populations, and provide deep canopy cover without depleting ground water."
  },
  {
    question: "Where are the plantation drives organized in Pune?",
    answer:
      "Drives are organized across designated green belts, municipal parks, school grounds, and tekdi corridors in Pune. Recent drives include Anandvan in Mahadevwadi, with future drives planned across Katraj, Baner-Pashan, and Vetal Tekdi areas."
  },
  {
    question: "What happens after the plantation drive? How is tree survival ensured?",
    answer:
      "A tree plantation is only as good as its survival rate. GreenPune pairs each drive with local stewardship teams and volunteers who schedule weekly watering, install tree guards, and monitor growth for three full years."
  },
  {
    question: "Is there any registration fee to volunteer?",
    answer:
      "No. Volunteering for GreenPune plantation drives is 100% free. We are a community initiative."
  },
  {
    question: "Can our housing society or corporate group organize a drive together?",
    answer:
      "Yes. We collaborate with housing societies, schools, and companies for ward-level drives and CSR initiatives with GPS tracking and survival reporting. Reach out via csr@greenpune.in or WhatsApp at +91 9623130157."
  }
];

export default function FAQPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer
      }
    }))
  };

  return (
    <main className="faq-page" style={{
      minHeight: "100vh",
      background: "var(--paper, #f4f8f2)",
      color: "var(--ink, #1a2e1a)",
      fontFamily: "Inter, sans-serif"
    }}>
      {/* FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

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
          Everything You Need to Know
        </p>

        <h1 style={{
          fontSize: "clamp(28px, 5vw, 42px)",
          fontWeight: 900,
          lineHeight: 1.15,
          color: "#111",
          marginBottom: "16px"
        }}>
          Frequently Asked Questions
        </h1>

        <p style={{
          fontSize: "15px",
          color: "var(--muted, #5a7055)",
          lineHeight: 1.7,
          marginBottom: "36px"
        }}>
          Find answers about how our tree plantation drives work, what to bring, and how you can help increase Pune&apos;s green canopy.
        </p>

        <div style={{
          display: "flex",
          flexDirection: "column",
          gap: "16px"
        }}>
          {faqs.map((faq, idx) => (
            <details
              key={idx}
              style={{
                background: "white",
                borderRadius: "16px",
                padding: "20px 24px",
                border: "1px solid var(--line-light, #e8f0e5)",
                boxShadow: "0 2px 8px rgba(13, 74, 26, 0.04)"
              }}
            >
              <summary style={{
                fontSize: "16px",
                fontWeight: 800,
                color: "#111",
                cursor: "pointer",
                listStyle: "none",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
              }}>
                <span>{faq.question}</span>
                <span style={{ color: "var(--leaf-dark, #529624)", fontSize: "18px" }}>+</span>
              </summary>
              <p style={{
                marginTop: "14px",
                marginBottom: 0,
                fontSize: "14px",
                color: "var(--muted, #5a7055)",
                lineHeight: 1.7
              }}>
                {faq.answer}
              </p>
            </details>
          ))}
        </div>

        {/* Still have questions */}
        <div style={{
          marginTop: "48px",
          background: "linear-gradient(135deg, white, var(--leaf-soft, #f2faeb))",
          borderRadius: "20px",
          padding: "32px",
          textAlign: "center",
          border: "1px solid rgba(102, 184, 46, 0.2)"
        }}>
          <h2 style={{ fontSize: "20px", fontWeight: 800, color: "#111", marginBottom: "8px" }}>
            Have a question not answered here?
          </h2>
          <p style={{ fontSize: "14px", color: "var(--muted, #5a7055)", marginBottom: "20px" }}>
            Reach out to our organizing team on WhatsApp or send us an email.
          </p>
          <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
            <a
              href="https://wa.me/919623130157?text=Hi%20Mayank,%20I%20have%20a%20question%20about%20GreenPune"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                background: "#25d366",
                color: "white",
                padding: "12px 24px",
                borderRadius: "99px",
                fontWeight: 700,
                fontSize: "14px",
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: "8px"
              }}
            >
              💬 WhatsApp: +91 9623130157
            </a>
            <Link
              href="/register"
              style={{
                background: "var(--leaf-dark, #529624)",
                color: "white",
                padding: "12px 24px",
                borderRadius: "99px",
                fontWeight: 700,
                fontSize: "14px",
                textDecoration: "none"
              }}
            >
              Register for Next Drive →
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

