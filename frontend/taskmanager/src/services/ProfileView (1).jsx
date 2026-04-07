import { useEffect, useState, useMemo } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import api from "../api";

/* ─── Google Font injection ──────────────────────────────────────────────── */
const fontLink = document.createElement("link");
fontLink.rel = "stylesheet";
fontLink.href =
  "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=Lato:wght@300;400;700&display=swap";
document.head.appendChild(fontLink);

/* ─── Global styles (injected once) ─────────────────────────────────────── */
const styleTag = document.createElement("style");
styleTag.textContent = `
  :root {
    --ink:      #0f1923;
    --ink2:     #3a4a5c;
    --muted:    #7a8898;
    --border:   #e4e9f0;
    --bg:       #f5f7fa;
    --surface:  #ffffff;
    --accent:   #1a56db;
    --accent2:  #0e3a9e;
    --gold:     #c9a84c;
    --danger:   #e63946;
  }

  * { box-sizing: border-box; margin: 0; padding: 0; }

  body { background: var(--bg); }

  .pv-page {
    font-family: 'Lato', sans-serif;
    color: var(--ink);
    min-height: 100vh;
    background: var(--bg);
    padding: 48px 16px 80px;
  }

  /* ── hero strip ── */
  .pv-hero {
    background: linear-gradient(135deg, #0f1923 0%, #1a2e46 60%, #1a56db 100%);
    border-radius: 20px;
    padding: 48px 52px;
    margin-bottom: 32px;
    position: relative;
    overflow: hidden;
    color: #fff;
    box-shadow: 0 8px 40px rgba(15,25,35,0.22);
  }
  .pv-hero::before {
    content: '';
    position: absolute;
    top: -60px; right: -60px;
    width: 280px; height: 280px;
    border-radius: 50%;
    background: rgba(26,86,219,0.18);
  }
  .pv-hero::after {
    content: '';
    position: absolute;
    bottom: -80px; left: 30%;
    width: 200px; height: 200px;
    border-radius: 50%;
    background: rgba(201,168,76,0.10);
  }

  .pv-avatar {
    width: 68px; height: 68px;
    border-radius: 50%;
    background: rgba(255,255,255,0.12);
    border: 2px solid rgba(255,255,255,0.25);
    display: flex; align-items: center; justify-content: center;
    font-size: 1.8rem;
    flex-shrink: 0;
    margin-right: 20px;
  }

  .pv-hero-name {
    font-family: 'Playfair Display', serif;
    font-size: clamp(1.5rem, 3vw, 2.1rem);
    font-weight: 700;
    letter-spacing: -0.02em;
    line-height: 1.2;
  }

  .pv-hero-sub { color: rgba(255,255,255,0.6); font-size: 0.82rem; margin-top: 4px; letter-spacing: 0.04em; text-transform: uppercase; }

  .pv-chip {
    display: inline-flex; align-items: center; gap: 6px;
    background: rgba(255,255,255,0.10);
    border: 1px solid rgba(255,255,255,0.18);
    border-radius: 100px;
    padding: 5px 14px;
    font-size: 0.78rem;
    color: rgba(255,255,255,0.85);
    font-weight: 400;
    text-decoration: none;
    transition: background 0.15s;
  }
  .pv-chip:hover { background: rgba(255,255,255,0.18); color: #fff; }

  .pv-meta-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
    gap: 0;
    border-top: 1px solid rgba(255,255,255,0.1);
    margin-top: 32px;
    padding-top: 24px;
  }
  .pv-meta-item { padding: 0 24px 0 0; }
  .pv-meta-item + .pv-meta-item { border-left: 1px solid rgba(255,255,255,0.1); padding-left: 24px; }
  .pv-meta-label { font-size: 0.68rem; text-transform: uppercase; letter-spacing: 0.08em; color: rgba(255,255,255,0.45); margin-bottom: 4px; }
  .pv-meta-value { font-size: 0.9rem; font-weight: 600; color: rgba(255,255,255,0.9); }

  /* ── two-col layout ── */
  .pv-body { display: grid; grid-template-columns: 1fr 320px; gap: 24px; align-items: start; }
  @media (max-width: 900px) { .pv-body { grid-template-columns: 1fr; } }

  /* ── section title ── */
  .pv-section-title {
    font-family: 'Playfair Display', serif;
    font-size: 1.15rem;
    font-weight: 700;
    color: var(--ink);
    letter-spacing: -0.01em;
    margin-bottom: 16px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
  }
  .pv-section-title span { font-family: 'Lato', sans-serif; font-size: 0.75rem; font-weight: 700; color: var(--muted); text-transform: uppercase; letter-spacing: 0.06em; }

  /* ── article card ── */
  .pv-article {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 14px;
    padding: 24px 26px;
    cursor: pointer;
    transition: box-shadow 0.2s, transform 0.18s, border-color 0.2s;
    position: relative;
    overflow: hidden;
  }
  .pv-article:hover {
    box-shadow: 0 6px 28px rgba(26,86,219,0.10);
    border-color: rgba(26,86,219,0.3);
    transform: translateY(-2px);
  }
  .pv-article::before {
    content: '';
    position: absolute;
    left: 0; top: 0; bottom: 0;
    width: 3px;
    background: var(--accent);
    border-radius: 3px 0 0 3px;
    opacity: 0;
    transition: opacity 0.2s;
  }
  .pv-article:hover::before { opacity: 1; }

  .pv-article-title {
    font-family: 'Playfair Display', serif;
    font-size: 1rem;
    font-weight: 600;
    color: var(--ink);
    line-height: 1.5;
    margin-bottom: 10px;
    letter-spacing: -0.01em;
  }

  .pv-article-journal {
    display: inline-block;
    background: #eef3ff;
    color: #1a56db;
    border-radius: 6px;
    padding: 2px 10px;
    font-size: 0.72rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.04em;
    margin-right: 8px;
  }

  .pv-article-authors {
    color: var(--muted);
    font-size: 0.8rem;
    line-height: 1.5;
    margin: 10px 0;
  }

  .pv-cite-badge {
    background: linear-gradient(135deg, var(--accent), var(--accent2));
    color: #fff;
    border-radius: 10px;
    padding: 10px 18px;
    text-align: center;
    flex-shrink: 0;
  }

  /* ── sidebar card ── */
  .pv-sidebar-card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 16px;
    padding: 24px;
    margin-bottom: 20px;
  }

  /* ── collab rows ── */
  .pv-collab-row {
    display: flex; align-items: center; gap: 12px;
    padding: 10px 0;
    border-bottom: 1px solid var(--border);
  }
  .pv-collab-row:last-child { border-bottom: none; }

  .pv-rank {
    width: 26px; height: 26px; border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    font-size: 0.7rem; font-weight: 800;
    flex-shrink: 0;
  }

  .pv-bar-wrap { flex: 1; }
  .pv-bar-name { font-size: 0.83rem; font-weight: 600; color: var(--ink); margin-bottom: 4px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .pv-bar-track { height: 5px; border-radius: 99px; background: var(--border); overflow: hidden; }
  .pv-bar-fill { height: 100%; border-radius: 99px; transition: width 0.7s cubic-bezier(0.4,0,0.2,1); }

  .pv-count-pill {
    font-size: 0.7rem; font-weight: 800;
    padding: 2px 9px; border-radius: 100px;
    flex-shrink: 0;
  }

  /* ── add article btn ── */
  .pv-add-btn {
    display: inline-flex; align-items: center; gap: 8px;
    background: var(--accent);
    color: #fff !important;
    border-radius: 10px;
    padding: 10px 20px;
    font-size: 0.82rem;
    font-weight: 700;
    text-decoration: none;
    letter-spacing: 0.02em;
    margin-bottom: 20px;
    transition: background 0.15s, transform 0.1s;
    box-shadow: 0 3px 12px rgba(26,86,219,0.25);
  }
  .pv-add-btn:hover { background: var(--accent2); transform: translateY(-1px); }

  /* ── empty state ── */
  .pv-empty {
    text-align: center;
    padding: 60px 20px;
    color: var(--muted);
  }
  .pv-empty-icon { font-size: 2.5rem; margin-bottom: 12px; }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(16px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .pv-animate { animation: fadeUp 0.4s ease both; }
`;
document.head.appendChild(styleTag);

/* ─── Accent palette ─────────────────────────────────────────────────────── */
const ACCENTS = [
  { bar: "#1a56db", pill: "#eef3ff", pillText: "#1a56db" },
  { bar: "#0891b2", pill: "#ecfeff", pillText: "#0e7490" },
  { bar: "#059669", pill: "#ecfdf5", pillText: "#047857" },
  { bar: "#c9a84c", pill: "#fffbeb", pillText: "#92680e" },
  { bar: "#7c3aed", pill: "#f5f3ff", pillText: "#6d28d9" },
];

/* ─── TopCollaborators sidebar ───────────────────────────────────────────── */
function TopCollaborators({ articles, profileName }) {
  const [showAll, setShowAll] = useState(false);
  const TOP_N = 5;

  const collaborators = useMemo(() => {
    const counts = {};
    articles.forEach((article) => {
      if (!article.authors) return;
      article.authors
        .split(", ")
        .map((n) => n.trim())
        .filter(Boolean)
        .forEach((name) => {
          if (profileName && name.toLowerCase().includes(profileName.toLowerCase())) return;
          counts[name] = (counts[name] || 0) + 1;
        });
    });
    return Object.entries(counts)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count);
  }, [articles, profileName]);

  if (collaborators.length === 0) return null;

  const displayed = showAll ? collaborators : collaborators.slice(0, TOP_N);
  const max = collaborators[0]?.count || 1;

  return (
    <div className="pv-sidebar-card">
      <div className="pv-section-title">
        🤝 Collaborators <span>{collaborators.length} unique</span>
      </div>

      {displayed.map((c, i) => {
        const ac = ACCENTS[i % ACCENTS.length];
        return (
          <div className="pv-collab-row" key={c.name}>
            <div
              className="pv-rank"
              style={{
                background: i < 3 ? ac.bar : "#f1f3f5",
                color: i < 3 ? "#fff" : "#868e96",
              }}
            >
              {i + 1}
            </div>
            <div className="pv-bar-wrap" style={{ minWidth: 0 }}>
              <div className="pv-bar-name" title={c.name}>{c.name}</div>
              <div className="pv-bar-track">
                <div
                  className="pv-bar-fill"
                  style={{ width: `${Math.round((c.count / max) * 100)}%`, background: ac.bar }}
                />
              </div>
            </div>
            <div
              className="pv-count-pill"
              style={{ background: ac.pill, color: ac.pillText }}
            >
              {c.count}×
            </div>
          </div>
        );
      })}

      {collaborators.length > TOP_N && (
        <button
          onClick={() => setShowAll((v) => !v)}
          style={{
            marginTop: 14, width: "100%", border: "1.5px solid var(--border)",
            background: "none", borderRadius: 8, padding: "7px 0",
            fontSize: "0.78rem", fontWeight: 700, color: "var(--muted)", cursor: "pointer",
          }}
        >
          {showAll ? "▲ Show less" : `▼ All ${collaborators.length} collaborators`}
        </button>
      )}
    </div>
  );
}

/* ─── Publications by Year chart ────────────────────────────────────────── */
function PublicationsChart({ articles }) {
  const data = useMemo(() => {
    const counts = {};
    articles.forEach((a) => {
      if (a.publication_year) counts[a.publication_year] = (counts[a.publication_year] || 0) + 1;
    });
    return Object.entries(counts)
      .map(([year, count]) => ({ year: Number(year), count }))
      .sort((a, b) => a.year - b.year);
  }, [articles]);

  if (data.length === 0) return null;

  const W = 260, H = 130, PAD = { top: 10, right: 8, bottom: 28, left: 24 };
  const innerW = W - PAD.left - PAD.right;
  const innerH = H - PAD.top - PAD.bottom;
  const maxCount = Math.max(...data.map((d) => d.count));
  const barW = Math.min(28, (innerW / data.length) - 4);

  const xScale = (i) => PAD.left + (i + 0.5) * (innerW / data.length);
  const yScale = (v) => PAD.top + innerH - (v / maxCount) * innerH;

  // y-axis ticks: 0 and max, plus midpoint if max > 2
  const yTicks = maxCount <= 2
    ? [0, maxCount]
    : [0, Math.round(maxCount / 2), maxCount];

  // only label every Nth year so they don't collide
  const labelEvery = data.length <= 6 ? 1 : data.length <= 10 ? 2 : 3;

  return (
    <div className="pv-sidebar-card">
      <div className="pv-section-title">
        📅 Publications by Year
        <span style={{ marginLeft: "auto", fontSize: "0.7rem", color: "var(--muted)", fontFamily: "Lato, sans-serif", fontWeight: 600 }}>
          {data.length} active {data.length === 1 ? "year" : "years"}
        </span>
      </div>

      <svg
        viewBox={`0 0 ${W} ${H}`}
        width="100%"
        style={{ overflow: "visible", display: "block" }}
      >
        {/* grid lines + y labels */}
        {yTicks.map((tick) => {
          const y = yScale(tick);
          return (
            <g key={tick}>
              <line
                x1={PAD.left} x2={W - PAD.right}
                y1={y} y2={y}
                stroke="#e4e9f0" strokeWidth="1"
                strokeDasharray={tick === 0 ? "none" : "3 3"}
              />
              <text
                x={PAD.left - 5} y={y + 4}
                textAnchor="end"
                fontSize="8"
                fill="#7a8898"
                fontFamily="Lato, sans-serif"
              >
                {tick}
              </text>
            </g>
          );
        })}

        {/* bars */}
        {data.map((d, i) => {
          const x = xScale(i);
          const barH = (d.count / maxCount) * innerH;
          const y = yScale(d.count);
          const isMax = d.count === maxCount;

          return (
            <g key={d.year}>
              {/* bar */}
              <rect
                x={x - barW / 2}
                y={y}
                width={barW}
                height={barH}
                rx={4}
                fill={isMax ? "#1a56db" : "#93b4f7"}
                style={{ transition: "fill 0.2s" }}
              />
              {/* value label on top */}
              <text
                x={x} y={y - 3}
                textAnchor="middle"
                fontSize="8"
                fontWeight="700"
                fill={isMax ? "#1a56db" : "#7a8898"}
                fontFamily="Lato, sans-serif"
              >
                {d.count}
              </text>
              {/* x-axis year label */}
              {i % labelEvery === 0 && (
                <text
                  x={x}
                  y={H - PAD.bottom + 14}
                  textAnchor="middle"
                  fontSize="8"
                  fill="#7a8898"
                  fontFamily="Lato, sans-serif"
                >
                  {d.year}
                </text>
              )}
            </g>
          );
        })}

        {/* x-axis baseline */}
        <line
          x1={PAD.left} x2={W - PAD.right}
          y1={yScale(0)} y2={yScale(0)}
          stroke="#c8d0db" strokeWidth="1.5"
        />
      </svg>

      {/* peak callout */}
      {data.length > 1 && (
        <div style={{
          marginTop: 10,
          background: "#eef3ff",
          borderRadius: 8,
          padding: "7px 12px",
          fontSize: "0.72rem",
          color: "#1a56db",
          fontWeight: 600,
          display: "flex",
          justifyContent: "space-between",
        }}>
          <span>🏆 Peak year</span>
          <span>{data.find(d => d.count === maxCount)?.year} — {maxCount} {maxCount === 1 ? "paper" : "papers"}</span>
        </div>
      )}
    </div>
  );
}

/* ─── Stats sidebar ──────────────────────────────────────────────────────── */
function StatsCard({ articles }) {
  const totalCitations = articles.reduce((s, a) => s + (a.cited_by_count || 0), 0);
  const totalRefs = articles.reduce((s, a) => s + (a.referenced_works_count || 0), 0);
  const years = articles.map((a) => a.publication_year).filter(Boolean);
  const span = years.length ? `${Math.min(...years)} – ${Math.max(...years)}` : "—";

  const stats = [
    { label: "Publications", value: articles.length, icon: "📄" },
    { label: "Total Citations", value: totalCitations.toLocaleString(), icon: "📊" },
    { label: "References", value: totalRefs.toLocaleString(), icon: "🔗" },
    { label: "Active Years", value: span, icon: "📅" },
  ];

  return (
    <div className="pv-sidebar-card">
      <div className="pv-section-title">📈 At a Glance</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
        {stats.map((s) => (
          <div
            key={s.label}
            style={{
              background: "#f8fafc",
              borderRadius: 10,
              padding: "12px 14px",
              border: "1px solid var(--border)",
            }}
          >
            <div style={{ fontSize: "1.1rem", marginBottom: 4 }}>{s.icon}</div>
            <div style={{ fontSize: "1rem", fontWeight: 800, color: "var(--ink)" }}>{s.value}</div>
            <div style={{ fontSize: "0.68rem", color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.05em" }}>{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── ArticlesSection ────────────────────────────────────────────────────── */
const ArticlesSection = ({ articles, profile }) => {
  const navigate = useNavigate();
  const id = localStorage.getItem("id");

  const handleOpenArticle = (article) => {
    let article_link;
    if (article.doi) {
      article_link = article.doi.split("https://doi.org/").pop();
      if (article_link.startsWith("10.1109")) {
        article_link = article_link.split(".").pop();
      } else if (/^\d+$/.test(article.id)) {
        article_link = article.id;
      } else {
        article_link = article.id.split("/").pop();
      }
    }
    navigate(`/profiles/${id}/articles/${article_link}`);
  };

  return (
    <div className="pv-page">
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>

        {/* ── Hero ── */}
        <div className="pv-hero pv-animate">
          <div style={{ display: "flex", alignItems: "center", marginBottom: 28, position: "relative", zIndex: 1 }}>
            <div className="pv-avatar">👤</div>
            <div>
              <div className="pv-hero-name">
                {profile.name} {profile.lastName || ""}
              </div>
              <div className="pv-hero-sub">Researcher Profile</div>
            </div>
          </div>

          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", position: "relative", zIndex: 1 }}>
            {profile.orcid && (
              <a
                href={`https://orcid.org/${profile.orcid}`}
                target="_blank"
                rel="noreferrer"
                className="pv-chip"
              >
                <span style={{ color: "#a6ce39", fontWeight: 800 }}>ID</span>
                {profile.orcid}
              </a>
            )}
            {profile.degree && (
              <span className="pv-chip">🎓 {profile.degree}</span>
            )}
            {profile.birthday && (
              <span className="pv-chip">📅 {profile.birthday}</span>
            )}
          </div>

          <div className="pv-meta-grid" style={{ position: "relative", zIndex: 1 }}>
            <div className="pv-meta-item">
              <div className="pv-meta-label">Publications</div>
              <div className="pv-meta-value">{articles.length}</div>
            </div>
            <div className="pv-meta-item">
              <div className="pv-meta-label">Total Citations</div>
              <div className="pv-meta-value">
                {articles.reduce((s, a) => s + (a.cited_by_count || 0), 0).toLocaleString()}
              </div>
            </div>
            <div className="pv-meta-item">
              <div className="pv-meta-label">Degree</div>
              <div className="pv-meta-value">{profile.degree || "—"}</div>
            </div>
            <div className="pv-meta-item">
              <div className="pv-meta-label">ORCID</div>
              <div className="pv-meta-value" style={{ fontSize: "0.78rem" }}>
                {profile.orcid || "—"}
              </div>
            </div>
          </div>
        </div>

        {/* ── Body ── */}
        <div className="pv-body">

          {/* Left: publications */}
          <div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
              <div className="pv-section-title" style={{ marginBottom: 0 }}>
                📄 Publications <span>{articles.length} works</span>
              </div>
              <Link to={`/profiles/${id}/articles`} className="pv-add-btn">
                + Add Article
              </Link>
            </div>

            {articles.length === 0 ? (
              <div className="pv-empty">
                <div className="pv-empty-icon">📭</div>
                <div style={{ fontWeight: 700, marginBottom: 6 }}>No publications yet</div>
                <div style={{ fontSize: "0.82rem" }}>Add your first article to get started.</div>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {articles.map((article, idx) => (
                  <div
                    key={article.id || article.title}
                    className="pv-article pv-animate"
                    style={{ animationDelay: `${idx * 0.04}s` }}
                    onClick={() => handleOpenArticle(article)}
                  >
                    <div style={{ display: "flex", alignItems: "flex-start", gap: 20 }}>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div className="pv-article-title">{article.title}</div>

                        <div style={{ marginBottom: 8, display: "flex", flexWrap: "wrap", alignItems: "center", gap: 6 }}>
                          {article.primary_location?.source?.display_name && (
                            <span className="pv-article-journal">
                              {article.primary_location.source.display_name}
                            </span>
                          )}
                          {article.publication_year && (
                            <span style={{ color: "var(--muted)", fontSize: "0.78rem", fontWeight: 600 }}>
                              {article.publication_year}
                            </span>
                          )}
                        </div>

                        <div className="pv-article-authors">{article.authors}</div>

                        <div style={{ display: "flex", gap: 20, fontSize: "0.78rem", marginTop: 8 }}>
                          {article.doi && (
                            <a
                              href={`https://doi.org/${article.doi}`}
                              target="_blank"
                              rel="noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              style={{ color: "var(--accent)", fontWeight: 700, textDecoration: "none" }}
                            >
                              🔗 Full Text
                            </a>
                          )}
                          <span style={{ color: "var(--muted)" }}>
                            Refs: {article.referenced_works_count ?? "—"}
                          </span>
                        </div>
                      </div>

                      <div
                        className="pv-cite-badge"
                        style={{ minWidth: 64 }}
                      >
                        <div style={{ fontSize: "1.35rem", fontWeight: 800, lineHeight: 1 }}>
                          {article.cited_by_count ?? 0}
                        </div>
                        <div style={{ fontSize: "0.6rem", textTransform: "uppercase", letterSpacing: "0.07em", opacity: 0.75, marginTop: 3 }}>
                          Citations
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right: sidebar */}
          <div>
            <StatsCard articles={articles} />
            <PublicationsChart articles={articles} />
            <TopCollaborators articles={articles} profileName={profile.name} />
          </div>

        </div>
      </div>
    </div>
  );
};

/* ─── ProfileView (data layer) ───────────────────────────────────────────── */
export default function ProfileView() {
  const { profile_id } = useParams();
  const [profile, setProfile] = useState({ orcid: "", name: "", lastName: "", birthday: "", degree: "" });
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    api.get(`/profiles/${profile_id}`)
      .then((r) => setProfile(r.data))
      .catch((e) => console.error("Failed to fetch profile:", e));
  }, [profile_id]);

  useEffect(() => {
    api.get(`/profiles/${profile_id}/articles`)
      .then((r) => setArticles(r.data))
      .catch((e) => console.error("Failed to fetch articles:", e));
  }, [profile_id]);

  return <ArticlesSection articles={articles} profile={profile} />;
}
