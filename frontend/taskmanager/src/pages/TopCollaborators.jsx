import { useMemo, useState } from "react";

/**
 * TopCollaborators
 * Props:
 *   articles  – array of article objects (same shape as ProfileView uses)
 *   profileName – the current researcher's name (to exclude from the list)
 */
export default function TopCollaborators({ articles = [], profileName = "" }) {
  const [showAll, setShowAll] = useState(false);
  const TOP_N = 5;

  // ── Parse & count ──────────────────────────────────────────────────────────
  const collaborators = useMemo(() => {
    const counts = {};

    articles.forEach((article) => {
      if (!article.authors) return;

      // Authors are separated by ", "
      const names = article.authors
        .split(" ,")
        .map((n) => n.trim())
        .filter(Boolean);

      names.forEach((name) => {
        // Skip the profile owner (simple includes check, tolerates partial matches)
        if (profileName && name.toLowerCase().includes(profileName.toLowerCase())) return;
        counts[name] = (counts[name] || 0) + 1;
      });
    });

    return Object.entries(counts)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count);
  }, [articles, profileName]);

  const displayed = showAll ? collaborators : collaborators.slice(0, TOP_N);
  const maxCount = collaborators[0]?.count || 1;

  if (collaborators.length === 0) return null;

  // ── Colour palette cycling ─────────────────────────────────────────────────
  const ACCENTS = [
    { bar: "#4f46e5", badge: "#eef2ff", text: "#4338ca" },
    { bar: "#0891b2", badge: "#ecfeff", text: "#0e7490" },
    { bar: "#059669", badge: "#ecfdf5", text: "#047857" },
    { bar: "#d97706", badge: "#fffbeb", text: "#b45309" },
    { bar: "#7c3aed", badge: "#f5f3ff", text: "#6d28d9" },
  ];

  return (
    <div
      style={{
        fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
        background: "#ffffff",
        borderRadius: "20px",
        boxShadow: "0 2px 16px rgba(0,0,0,0.07)",
        padding: "28px 32px",
        marginBottom: "32px",
        border: "1px solid #f1f3f5",
      }}
    >
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "24px" }}>
        <div>
          <h4 style={{ margin: 0, fontWeight: 700, fontSize: "1.1rem", color: "#1a1a2e", letterSpacing: "-0.02em" }}>
            🤝 Top Collaborators
          </h4>
          <p style={{ margin: "4px 0 0", fontSize: "0.78rem", color: "#868e96" }}>
            Co-authors ranked by shared publications
          </p>
        </div>
        <span
          style={{
            background: "#f1f3f5",
            color: "#495057",
            borderRadius: "20px",
            padding: "4px 12px",
            fontSize: "0.75rem",
            fontWeight: 600,
          }}
        >
          {collaborators.length} unique
        </span>
      </div>

      {/* Rows */}
      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        {displayed.map((collab, idx) => {
          const accent = ACCENTS[idx % ACCENTS.length];
          const pct = Math.round((collab.count / maxCount) * 100);

          return (
            <div key={collab.name} style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              {/* Rank */}
              <div
                style={{
                  width: "28px",
                  height: "28px",
                  borderRadius: "50%",
                  background: idx < 3 ? accent.bar : "#f1f3f5",
                  color: idx < 3 ? "#fff" : "#868e96",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "0.72rem",
                  fontWeight: 700,
                  flexShrink: 0,
                }}
              >
                {idx + 1}
              </div>

              {/* Name + bar */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "5px" }}>
                  <span
                    style={{
                      fontWeight: 600,
                      fontSize: "0.88rem",
                      color: "#2d3436",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      maxWidth: "70%",
                    }}
                    title={collab.name}
                  >
                    {collab.name}
                  </span>
                  <span
                    style={{
                      background: accent.badge,
                      color: accent.text,
                      borderRadius: "12px",
                      padding: "2px 10px",
                      fontSize: "0.72rem",
                      fontWeight: 700,
                      flexShrink: 0,
                    }}
                  >
                    {collab.count} {collab.count === 1 ? "paper" : "papers"}
                  </span>
                </div>

                {/* Progress bar */}
                <div
                  style={{
                    height: "6px",
                    borderRadius: "99px",
                    background: "#f1f3f5",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      height: "100%",
                      width: `${pct}%`,
                      borderRadius: "99px",
                      background: accent.bar,
                      transition: "width 0.6s cubic-bezier(0.4,0,0.2,1)",
                    }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Show more / less */}
      {collaborators.length > TOP_N && (
        <button
          onClick={() => setShowAll((v) => !v)}
          style={{
            marginTop: "20px",
            background: "none",
            border: "1.5px solid #dee2e6",
            borderRadius: "10px",
            padding: "7px 18px",
            fontSize: "0.8rem",
            fontWeight: 600,
            color: "#495057",
            cursor: "pointer",
            width: "100%",
            transition: "background 0.15s",
          }}
          onMouseEnter={(e) => (e.target.style.background = "#f8f9fa")}
          onMouseLeave={(e) => (e.target.style.background = "none")}
        >
          {showAll ? "▲ Show less" : `▼ Show all ${collaborators.length} collaborators`}
        </button>
      )}
    </div>
  );
}