import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About GreenPune | Urban Greening Initiative",
  description:
    "Learn about the GreenPune initiative — planting 1 million trees in Pune over 5 years, our first plantation drive on 15 August 2026, and how you can help.",
};

export default function AboutPage() {
  return (
    <main className="about-page">
      {/* Topbar */}
      <nav className="topbar">
        <div className="topbar-left">
          <a href="/" className="brand-text">
            <span className="drop">☘️</span>
            <div className="brand-stack">
              <span className="brand-bold">GREEN</span>
              <span className="brand-light">PUNE</span>
            </div>
          </a>
        </div>
        <div className="topbar-center">
          <span className="save-the-text">SAVE THE:</span>
          <a href="/about#ocean" className="nav-pill nav-pill-outline">OCEAN</a>
          <a href="/about#forest" className="nav-pill nav-pill-solid">FOREST</a>
        </div>
        <div className="topbar-right">
          <a href="/" className="nav-about">HOME</a>
        </div>
      </nav>

      {/* Hero */}
      <section className="about-hero">
        <div className="about-hero-inner">
          <p className="about-eyebrow">🌳 The GreenPune Initiative</p>
          <h1>
            Pune Needs Trees.<br />
            We Are Planting Them.
          </h1>
          <p className="about-hero-sub">
            A citizen-led urban greening movement — beginning 15 August 2026 at
            Mahadji Shinde Nagar. Our goal: <strong>1 million trees in 5 years.</strong>
          </p>
          <div className="about-hero-actions">
            <Link href="/register" className="primary-action">
              Register for Plantation Drive
            </Link>
            <a href="#donate" className="secondary-action">
              Support with Donation
            </a>
          </div>
        </div>
      </section>

      {/* Why Pune Needs Trees */}
      <section className="about-section" id="why-pune">
        <div className="about-section-inner">
          <p className="about-label">THE NEED</p>
          <h2>Why Pune Urgently Needs Urban Greening</h2>
          <p className="about-lead">
            Pune is one of India's fastest-growing cities — but its green cover
            is shrinking at an alarming rate. The consequences are already
            visible: rising temperatures, flooding, poor air quality, and loss of
            biodiversity.
          </p>
          <div className="about-stat-grid">
            <div className="about-stat-card">
              <strong>620 ha</strong>
              <span>Tree-cover lost between 2016–2019 (WRI India)</span>
            </div>
            <div className="about-stat-card">
              <strong>40%</strong>
              <span>Target canopy cover for a healthy urban forest — Pune is far below</span>
            </div>
            <div className="about-stat-card">
              <strong>9 m²</strong>
              <span>Minimum green space per person (WHO benchmark)</span>
            </div>
            <div className="about-stat-card">
              <strong>55 L+</strong>
              <span>Trees claimed by PMC — with limited geolocation and survival tracking</span>
            </div>
          </div>
          <div className="about-fact-box">
            <h3>Key Issues Facing Pune's Green Cover</h3>
            <ul>
              <li>
                <strong>Urban Heat Island Effect:</strong> Densely built areas
                without tree cover are 3–5°C hotter than vegetated zones. Pune's
                temperatures have risen year on year.
              </li>
              <li>
                <strong>Flash Flooding:</strong> Without adequate tree root
                systems, rainwater runoff has increased, worsening flooding in
                low-lying areas.
              </li>
              <li>
                <strong>Air Quality:</strong> PM2.5 levels in Pune frequently
                exceed safe limits. Trees act as natural air filters, absorbing
                particulate matter.
              </li>
              <li>
                <strong>Biodiversity Loss:</strong> Tekdis (hillocks) and
                natural forests are being encroached upon, displacing native
                flora and fauna.
              </li>
              <li>
                <strong>Mental Wellbeing:</strong> Research links access to
                urban greenery with reduced stress, lower rates of anxiety, and
                stronger community bonds.
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* First Event */}
      <section className="about-section about-section-green" id="first-event">
        <div className="about-section-inner">
          <p className="about-label" style={{ color: "rgba(255,255,255,0.7)" }}>OUR FIRST EVENT</p>
          <h2 style={{ color: "white" }}>15 August 2026 — Independence Day Plantation Drive</h2>
          <p className="about-lead" style={{ color: "rgba(255,255,255,0.85)" }}>
            On India's Independence Day, GreenPune will launch its first large-scale
            community plantation drive at <strong>Mahadji Shinde Nagar, Pune</strong>.
            The event is open to all residents, schools, and organisations.
          </p>
          <div className="about-event-details">
            <div>
              <dt>📅 Date</dt>
              <dd>15 August 2026 (Independence Day)</dd>
            </div>
            <div>
              <dt>📍 Location</dt>
              <dd>Mahadji Shinde Nagar, Pune</dd>
            </div>
            <div>
              <dt>🌿 Theme</dt>
              <dd>Green Neighborhood — Beautiful Neighborhood — Prosperous Neighborhood</dd>
            </div>
            <div>
              <dt>🤝 Organiser</dt>
              <dd>GreenPune in association with Sakal Hindu Samaj</dd>
            </div>
          </div>
          <div className="about-event-steps">
            <div>
              <span>01</span>
              <h3>Register</h3>
              <p>Sign up online. Bring your family, friends, and neighbours.</p>
            </div>
            <div>
              <span>02</span>
              <h3>Bring a Sapling</h3>
              <p>If possible, bring a native species sapling. We'll guide you on which ones to choose.</p>
            </div>
            <div>
              <span>03</span>
              <h3>Plant & Adopt</h3>
              <p>Plant your tree and take responsibility for watering and care in your neighbourhood.</p>
            </div>
          </div>
          <div style={{ marginTop: "32px", textAlign: "center" }}>
            <Link href="/register" className="primary-action" style={{ background: "white", color: "var(--leaf-deeper)" }}>
              Register for the Drive →
            </Link>
          </div>
        </div>
      </section>

      {/* Forest Zones in Pune */}
      <section className="about-section" id="forest">
        <div className="about-section-inner">
          <p className="about-label">PUNE'S GREEN HERITAGE</p>
          <h2>Officially Declared Forest Zones & Protected Areas in Pune</h2>
          <p className="about-lead">
            Pune has several officially declared reserved forests, biodiversity
            parks, and protected tekdis (hillocks). These are irreplaceable
            ecological lungs that must be preserved — and expanded.
          </p>
          <div className="about-forest-grid">
            {[
              {
                name: "Taljai Tekdi Forest",
                status: "Reserved Forest",
                area: "~85 acres",
                desc: "One of Pune's most important green lungs, home to over 100 bird species. Officially protected under Maharashtra Forest Dept.",
              },
              {
                name: "Vetal Tekdi Forest",
                status: "Reserved Forest",
                area: "~100 acres",
                desc: "A biodiversity hotspot in central Pune. Declared reserved forest by the Maharashtra government.",
              },
              {
                name: "Hanuman Tekdi (Katraj)",
                status: "Protected Hill",
                area: "~60 acres",
                desc: "Supports diverse flora and fauna. Part of Pune's ring of protected hillocks.",
              },
              {
                name: "Baner–Pashan Biodiversity Park",
                status: "Biodiversity Park",
                area: "~300 acres",
                desc: "One of Pune's largest biodiversity parks with a lake, wetlands, and native vegetation corridors.",
              },
              {
                name: "Parvati Hill",
                status: "Heritage Green",
                area: "~40 acres",
                desc: "A protected heritage hillock with native tree species and panoramic views of Pune.",
              },
              {
                name: "Sus–Bavdhan Hills",
                status: "Protected Green Zone",
                area: "~200+ acres",
                desc: "Part of the Western Ghats foothills. Subject to ongoing conservation efforts to prevent encroachment.",
              },
              {
                name: "Katraj Lake Forest",
                status: "Protected Buffer Zone",
                area: "~120 acres",
                desc: "The forested buffer around Katraj Lake. A critical water recharge zone and wildlife corridor.",
              },
              {
                name: "Sinhagad Fort Forests",
                status: "Reserved Forest",
                area: "~500+ acres",
                desc: "Dense forest surrounding the historic Sinhagad Fort. Protected by Maharashtra Forest Dept.",
              },
              {
                name: "Tamhini Ghat (Mulshi)",
                status: "Reserved Forest / Wildlife",
                area: "~5000+ acres",
                desc: "Part of the Western Ghats — a UNESCO World Heritage biodiversity hotspot on Pune's western edge.",
              },
            ].map((zone) => (
              <div key={zone.name} className="about-forest-card">
                <div className="about-forest-status">{zone.status}</div>
                <h3>{zone.name}</h3>
                <div className="about-forest-area">📐 {zone.area}</div>
                <p>{zone.desc}</p>
              </div>
            ))}
          </div>
          <div className="about-fact-box" style={{ marginTop: "32px" }}>
            <h3>⚠️ Threats to Pune's Forests</h3>
            <ul>
              <li>Illegal construction and encroachment on reserved forest land</li>
              <li>Road widening projects cutting through protected tekdi zones</li>
              <li>Lack of local community awareness and involvement in forest protection</li>
              <li>Insufficient compensatory plantation tracking when trees are felled</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Ocean section */}
      <section className="about-section about-section-blue" id="ocean">
        <div className="about-section-inner">
          <p className="about-label" style={{ color: "rgba(255,255,255,0.7)" }}>SAVE THE OCEAN</p>
          <h2 style={{ color: "white" }}>Pune's Role in Protecting Maharashtra's Coastline</h2>
          <p className="about-lead" style={{ color: "rgba(255,255,255,0.85)" }}>
            Inland cities like Pune have a critical role to play in ocean
            conservation. Plastic waste from Pune's drains travels through rivers
            to the Arabian Sea. Urban trees and green cover reduce runoff,
            filter pollutants, and protect watersheds that feed Maharashtra's
            coastal ecosystems.
          </p>
          <div className="about-ocean-facts">
            <div>
              <strong>Mutha River</strong>
              <p>Pune's Mutha River flows into the Krishna and eventually to the Bay. What we put in our drains reaches the sea.</p>
            </div>
            <div>
              <strong>Plastic Pollution</strong>
              <p>Maharashtra generates significant plastic waste that ends up in waterways. Reducing single-use plastic in Pune events is a GreenPune commitment.</p>
            </div>
            <div>
              <strong>Trees = Ocean Health</strong>
              <p>Urban trees reduce stormwater runoff, preventing soil and pollutant flow into rivers. A greener Pune means cleaner waterways.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Donation Section */}
      <section className="about-section" id="donate">
        <div className="about-section-inner">
          <p className="about-label">SUPPORT THE MISSION</p>
          <h2>Help Us Plant 1 Million Trees in Pune</h2>
          <p className="about-lead">
            Every tree matters. Your donation directly funds saplings, care
            equipment, volunteer coordination, and survival tracking for every
            tree we plant.
          </p>
          <div className="about-donate-grid">
            <div className="about-donate-card">
              <div className="about-donate-amount">₹500</div>
              <h3>Plant 1 Tree</h3>
              <p>Covers the cost of one native sapling, planting, and 3-year care support.</p>
              <a href="#bank-details" className="primary-action about-donate-btn">Donate ₹500</a>
            </div>
            <div className="about-donate-card about-donate-card-featured">
              <div className="about-donate-badge">POPULAR</div>
              <div className="about-donate-amount">₹5,000</div>
              <h3>Plant 10 Trees</h3>
              <p>Make a real impact — fund a full row of trees in a neighbourhood.</p>
              <a href="#bank-details" className="primary-action about-donate-btn">Donate ₹5,000</a>
            </div>
            <div className="about-donate-card">
              <div className="about-donate-amount">₹25,000</div>
              <h3>Sponsor a Grove</h3>
              <p>Name a grove after your family, school, or company. 50 trees with full tracking.</p>
              <a href="#bank-details" className="primary-action about-donate-btn">Donate ₹25,000</a>
            </div>
          </div>

          {/* Bank Details */}
          <div className="about-bank-box" id="bank-details">
            <h3>🏦 Donation Account Details</h3>
            <p className="about-bank-notice">
              Bank account details will be published shortly. To express interest
              in donating or for CSR partnerships, please write to us:
            </p>
            <a href="mailto:donate@greenpune.in" className="about-email-link">
              📧 donate@greenpune.in
            </a>
            <div className="about-bank-grid">
              <div>
                <span>Account Name</span>
                <strong>GreenPune Initiative</strong>
              </div>
              <div>
                <span>Account Number</span>
                <strong>Coming Soon</strong>
              </div>
              <div>
                <span>Bank & Branch</span>
                <strong>Coming Soon</strong>
              </div>
              <div>
                <span>IFSC Code</span>
                <strong>Coming Soon</strong>
              </div>
              <div>
                <span>UPI ID</span>
                <strong>Coming Soon</strong>
              </div>
            </div>
            <p className="about-bank-note">
              ✅ All donations are used exclusively for tree plantation and
              follow-up care. Transparency reports will be published after each
              event.
            </p>
          </div>

          {/* CSR Section */}
          <div className="about-csr-box">
            <h3>🏢 CSR & Corporate Partnerships</h3>
            <p>
              Is your company looking to fulfil CSR obligations through
              meaningful, trackable environmental impact? GreenPune offers
              corporate plantation packages with GPS-tagged trees, survival
              reports, and branded grove signage.
            </p>
            <a href="mailto:csr@greenpune.in" className="about-email-link">
              📧 csr@greenpune.in
            </a>
          </div>
        </div>
      </section>

      {/* Contact / Footer */}
      <section className="about-section about-section-dark" id="contact">
        <div className="about-section-inner">
          <div className="about-footer-grid">
            <div>
              <div className="brand-text" style={{ marginBottom: "16px" }}>
                <span className="drop" style={{ fontSize: "24px" }}>☘️</span>
                <div className="brand-stack" style={{ fontSize: "20px" }}>
                  <span className="brand-bold" style={{ color: "white" }}>GREEN</span>
                  <span className="brand-light" style={{ color: "rgba(255,255,255,0.7)" }}>PUNE</span>
                </div>
              </div>
              <p style={{ color: "rgba(255,255,255,0.7)", maxWidth: "320px", lineHeight: 1.7 }}>
                A citizen-led urban tree plantation movement. Harit Nagar. Sundar
                Nagar. Samruddha Nagar.
              </p>
            </div>
            <div className="about-footer-links">
              <h4>Quick Links</h4>
              <ul>
                <li><a href="/">Home</a></li>
                <li><a href="/register">Register for Drive</a></li>
                <li><a href="#why-pune">Why Pune Needs Trees</a></li>
                <li><a href="#first-event">First Event — 15 Aug 2026</a></li>
                <li><a href="#forest">Forest Zones in Pune</a></li>
                <li><a href="#donate">Donate / Support</a></li>
              </ul>
            </div>
            <div className="about-footer-links">
              <h4>Contact</h4>
              <ul>
                <li><a href="mailto:hello@greenpune.in">📧 hello@greenpune.in</a></li>
                <li><a href="mailto:donate@greenpune.in">💚 donate@greenpune.in</a></li>
                <li><a href="mailto:csr@greenpune.in">🏢 csr@greenpune.in</a></li>
                <li><a href="/register">📋 Register for Event</a></li>
              </ul>
            </div>
          </div>
          <div className="about-footer-bottom">
            <p>© 2026 GreenPune Initiative. All rights reserved.</p>
            <p>
              Powered by{" "}
              <a href="https://bracketdex.com" target="_blank" rel="noopener noreferrer">
                BracketDex Technologies
              </a>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
