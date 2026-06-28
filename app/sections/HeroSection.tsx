"use client";

import Image from "next/image";
import Link from "next/link";

export function HeroSection() {
  return (
    <section className="hero-slide">
      <div className="hero-inner">
        <h1 className="hero-heading">
          <div className="hero-line">SOW A FUTURE</div>
          <div className="hero-line">
            ONE <span className="text-leaf">TREE</span> AT A TIME
          </div>
        </h1>

        <div className="hero-tree">
          <Image
            alt="Lush green tree"
            src="/images/hero-tree.png"
            width={700}
            height={800}
            priority
            quality={100}
            className="tree-img"
          />
        </div>

        <div className="hero-bottom-grid">
          <div className="hero-stat-box">
            Help us plant <br />
            1 million trees in Pune over the <br />
            next 5 years.
          </div>
          <div className="hero-cta-box">
            <p>
              Join our campaign to plant over <strong>10 Million trees</strong>. We are on a journey to save the forest, Join us!
            </p>
            <Link href="/register" className="plant-btn">
              Join the Drive
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
