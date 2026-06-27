import Image from "next/image";
import { RegisterForm } from "./register-form";
import { currentEvent, events } from "@/lib/events";

const impactStats = [
  ["१", "पहिला सार्वजनिक उपक्रम"],
  ["२०२६", "हरित वर्षाची सुरुवात"],
  ["१००+", "कुटुंबांना जोडण्याचे ध्येय"]
];

export default function Home() {
  return (
    <main>
      <nav className="topbar" aria-label="Primary navigation">
        <a className="brand" href="#top" aria-label="GreenPune home">
          <span className="brand-mark">GP</span>
          <span>GreenPune</span>
        </a>
        <div className="nav-links">
          <a href="#events">Events</a>
          <a href="#mission">Mission</a>
          <a href="#register">Register</a>
          <a href="#contact">Contact</a>
        </div>
        <a className="nav-cta" href="#register">Join</a>
      </nav>

      <section className="hero" id="top">
        <div className="hero-copy">
          <p className="eyebrow">Community Tree Plantation Portfolio</p>
          <h1>Protecting Nature, Growing Pune Together</h1>
          <p>
            GreenPune brings neighborhood events, volunteer registrations, and
            public updates into one clean place, starting with Mahadji Shinde
            Nagar tree plantation 2026.
          </p>
          <div className="hero-actions">
            <a className="primary-action" href="#register">Register Now</a>
            <a className="secondary-action" href="#events">View Event</a>
          </div>
        </div>
        <div className="hero-visual" aria-label="Tree plantation visual">
          <Image
            alt="Green nature reference"
            fill
            priority
            sizes="(max-width: 900px) 100vw, 48vw"
            src="https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=1200&q=85"
          />
          <div className="hero-badge">
            <span>Plant</span>
            <strong>Protect</strong>
            <span>Nurture</span>
          </div>
        </div>
      </section>

      <section className="intro-band" id="mission">
        <div>
          <p className="eyebrow">Who we are</p>
          <h2>A growing civic portfolio for greener neighborhoods.</h2>
        </div>
        <p>
          We help organizers publish events, collect participant details, and
          keep the community aligned from announcement to action day.
        </p>
        <div className="stats-grid">
          {impactStats.map(([value, label]) => (
            <article key={label}>
              <strong>{value}</strong>
              <span>{label}</span>
            </article>
          ))}
        </div>
      </section>

      <section className="event-section" id="events">
        <div className="event-poster">
          <Image
            alt={`${currentEvent.titleDevanagari} poster`}
            fill
            sizes="(max-width: 900px) 92vw, 38vw"
            src={currentEvent.poster}
          />
        </div>
        <div className="event-copy">
          <p className="eyebrow">Current Event</p>
          <h2>{currentEvent.titleDevanagari}</h2>
          <p className="organizer">{currentEvent.organizer}</p>
          <dl className="event-details">
            <div>
              <dt>Date</dt>
              <dd>{currentEvent.dateLabel}</dd>
            </div>
            <div>
              <dt>Location</dt>
              <dd>{currentEvent.location}</dd>
            </div>
            <div>
              <dt>Theme</dt>
              <dd>{currentEvent.theme}</dd>
            </div>
          </dl>
          <p>{currentEvent.summary}</p>
          <a className="primary-action" href="#register">Fill Form</a>
        </div>
      </section>

      <section className="register-section">
        <div className="form-panel">
          <div className="form-copy">
            <p className="eyebrow">Registration</p>
            <h2>Join the plantation drive</h2>
            <p>
              This form captures the required WhatsApp group details. Once
              Supabase credentials are added, submissions will save directly to
              your database.
            </p>
          </div>
          <RegisterForm eventId={currentEvent.id} />
        </div>
      </section>

      <section className="portfolio-section">
        <div>
          <p className="eyebrow">Events Portfolio</p>
          <h2>Built to host many events next.</h2>
        </div>
        <div className="event-list">
          {events.map((event) => (
            <article key={event.id}>
              <span>{event.status}</span>
              <h3>{event.titleDevanagari}</h3>
              <p>{event.dateLabel}</p>
            </article>
          ))}
          <article className="muted-card">
            <span>upcoming</span>
            <h3>Next community event</h3>
            <p>Ready to add when the next poster and details arrive.</p>
          </article>
        </div>
      </section>

      <footer id="contact">
        <div>
          <strong>GreenPune</strong>
          <p>Harit Nagar. Sundar Nagar. Samruddha Nagar.</p>
        </div>
        <a href="#register">Share Form Link</a>
      </footer>

      <a className="floating-register" href="#register" aria-label="Open registration form">
        Register
      </a>
    </main>
  );
}
