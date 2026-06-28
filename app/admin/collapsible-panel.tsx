"use client";

import React, { useState } from "react";

interface CollapsiblePanelProps {
  kicker: string;
  title: string;
  action?: React.ReactNode;
  children: React.ReactNode;
  defaultExpanded?: boolean;
}

export function CollapsiblePanel({
  kicker,
  title,
  action,
  children,
  defaultExpanded = true
}: CollapsiblePanelProps) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  return (
    <section className="admin-panel">
      <div 
        className="admin-panel-header" 
        style={{ cursor: "pointer", userSelect: "none" }} 
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div>
          <p className="admin-kicker">{kicker}</p>
          <h2 style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <span>{title}</span>
            <span style={{ 
              fontSize: "14px", 
              color: "var(--muted)", 
              display: "inline-flex",
              alignItems: "center",
              transform: isExpanded ? "rotate(0deg)" : "rotate(180deg)",
              transition: "transform 0.2s ease"
            }}>
              ▲
            </span>
          </h2>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }} onClick={(e) => e.stopPropagation()}>
          {action}
          <button 
            type="button" 
            className="admin-ghost-button" 
            style={{ 
              padding: "6px 12px", 
              fontSize: "13px",
              background: isExpanded ? "transparent" : "var(--leaf-soft)",
              color: isExpanded ? "var(--muted)" : "var(--leaf-dark)",
              borderColor: isExpanded ? "var(--line)" : "var(--leaf)"
            }}
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? "Minimize" : "Expand"}
          </button>
        </div>
      </div>
      {isExpanded && (
        <div style={{ marginTop: "24px" }}>
          {children}
        </div>
      )}
    </section>
  );
}
