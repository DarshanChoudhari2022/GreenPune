"use client";

import React from "react";

interface CookieSettingsButtonProps {
  style?: React.CSSProperties;
  className?: string;
  children?: React.ReactNode;
}

export function CookieSettingsButton({
  style,
  className,
  children = "Cookie Settings"
}: CookieSettingsButtonProps) {
  return (
    <button
      type="button"
      className={className}
      onClick={() => {
        if (typeof window !== "undefined") {
          window.dispatchEvent(new CustomEvent("open-cookie-settings"));
        }
      }}
      style={{
        background: "transparent",
        border: "none",
        cursor: "pointer",
        padding: 0,
        ...style
      }}
    >
      {children}
    </button>
  );
}

