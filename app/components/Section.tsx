"use client";

import { forwardRef, type ReactNode } from "react";

interface SectionProps {
  id?: string;
  className?: string;
  theme?: "light" | "green" | "dark";
  children: ReactNode;
}

export const Section = forwardRef<HTMLElement, SectionProps>(
  function Section({ id, className = "", theme, children }, ref) {
    return (
      <section
        ref={ref}
        id={id}
        className={`slide-section ${className}`}
        data-theme={theme}
      >
        <div className="slide-inner">{children}</div>
      </section>
    );
  }
);
