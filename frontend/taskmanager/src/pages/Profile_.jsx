import { useEffect, useState, useMemo } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import api from "../api";

/* ─── Font injection ─────────────────────────────────────────────────────── */
const fontLink = document.createElement("link");
fontLink.rel = "stylesheet";
fontLink.href = "https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500;600&display=swap";
document.head.appendChild(fontLink);

/* ─── Global styles ──────────────────────────────────────────────────────── */
const styleTag = document.createElement("style");
styleTag.textContent = `
  :root {
    --ink:       #0d1117;
    --ink2:      #30363d;
    --muted:     #656d76;
    --border:    #d0d7de;
    --border2:   #f0f2f5;
    --bg:        #f6f8fa;
    --surface:   #ffffff;
    --accent:    #0969da;
    --accent-bg: #dbeafe;
    --green:     #1a7f37;
    --green-bg:  #dafbe1;
    --gold:      #9a6700;
    --gold-bg:   #fff8c5;
    --purple:    #8250df;
    --purple-bg: #fbefff;
    --red:       #cf222e;
    --shadow-sm: 0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.04);
    --shadow-md: 0 4px 16px rgba(0,0,0,0.08), 0 2px 6px rgba(0,0,0,0.04);
    --shadow-lg: 0 12px 40px rgba(0,0,0,0.10), 0 4px 12px rgba(0,0,0,0.05);
    --radius:    12px;
    --radius-lg: 18px;
  }

  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { background: var(--bg); }

  .pv-root {
    font-family: 'DM Sans', sans-serif;
    color: var(--ink);
    min-height: 100vh;
    background: var(--bg);
  }

  /* ── top banner ── */
  .pv-banner {
    background: linear-gradient(160deg, #0d1117 0%, #161b22 55%, #0d419d 100%);
    padding: 32px 40px 80px;
    position: relative;
    overflow: hidden;
  }
  .pv-banner::before {
    content: '';
    position: absolute; inset: 0;
    background: radial-gradient(ellipse 60% 80% at 80% 50%, rgba(9,105,218,0.25) 0%, transparent 70%);
  }
  .pv-banner-noise {
    position: absolute; inset: 0;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E");
    opacity: 0.5;
  }
  .pv-banner-inner {
    max-width: 100%;
    padding: 0 40px;
    position: relative;
    z-index: 1;
  }

  /* ── profile card (overlaps banner) ── */
  .pv-profile-card {
    max-width: 100%;
    margin: -52px 0 0;
    padding: 0 40px;
    position: relative;
    z-index: 2;
  }
  .pv-profile-inner {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow-lg);
    padding: 28px 36px 24px;
    display: flex;
    align-items: flex-end;
    gap: 24px;
    flex-wrap: wrap;
  }

  .pv-avatar {
    width: 88px; height: 88px;
    border-radius: 50%;
    border: 4px solid var(--surface);
    background: linear-gradient(135deg, #0d419d, #0969da);
    display: flex; align-items: center; justify-content: center;
    font-size: 2.2rem;
    flex-shrink: 0;
    box-shadow: 0 4px 14px rgba(9,105,218,0.3);
    margin-top: -28px;
  }

  .pv-profile-info { flex: 1; min-width: 200px; }
  .pv-profile-name {
    font-family: 'DM Serif Display', serif;
    font-size: clamp(1.6rem, 3vw, 2.2rem);
    color: var(--ink);
    line-height: 1.15;
    margin-bottom: 6px;
  }
  .pv-profile-sub { font-size: 0.8rem; color: var(--muted); font-weight: 500; letter-spacing: 0.05em; text-transform: uppercase; }

  .pv-chips { display: flex; gap: 8px; flex-wrap: wrap; margin-top: 12px; }
  .pv-chip {
    display: inline-flex; align-items: center; gap: 5px;
    background: var(--bg);
    border: 1px solid var(--border);
    border-radius: 100px;
    padding: 4px 12px;
    font-size: 0.75rem;
    color: var(--ink2);
    font-weight: 500;
    text-decoration: none;
    transition: border-color 0.15s, background 0.15s;
  }
  .pv-chip:hover { border-color: var(--accent); background: var(--accent-bg); color: var(--accent); }

  .pv-stats-row {
    display: flex; gap: 0;
    border-left: 1px solid var(--border2);
    flex-shrink: 0;
  }
  .pv-stat {
    padding: 8px 24px;
    border-right: 1px solid var(--border2);
    text-align: center;
  }
  .pv-stat-val { font-size: 1.5rem; font-weight: 700; color: var(--ink); font-variant-numeric: tabular-nums; }
  .pv-stat-lbl { font-size: 0.68rem; color: var(--muted); text-transform: uppercase; letter-spacing: 0.06em; margin-top: 2px; }

  /* ── main layout ── */
  .pv-main {
    margin: 16px 0 80px;
    padding: 0 40px;
    display: grid;
    grid-template-columns: 1fr 320px;
    gap: 28px;
    align-items: start;
  }
  @media (max-width: 860px) {
    .pv-main { grid-template-columns: 1fr; padding: 0 20px; }
    .pv-stats-row { display: none; }
    .pv-profile-card { padding: 0 20px; }
    .pv-banner { padding: 40px 20px 100px; }
  }

  /* ── section header ── */
  .pv-sec-header {
    display: flex; align-items: center; justify-content: space-between;
    margin-bottom: 16px;
  }
  .pv-sec-title {
    font-family: 'DM Serif Display', serif;
    font-size: 1.1rem;
    color: var(--ink);
    display: flex; align-items: center; gap: 8px;
  }
  .pv-sec-title .pv-count {
    font-family: 'DM Sans', sans-serif;
    font-size: 0.72rem;
    font-weight: 600;
    color: var(--muted);
    background: var(--bg);
    border: 1px solid var(--border);
    border-radius: 100px;
    padding: 2px 9px;
  }

  /* ── add btn ── */
  .pv-btn {
    display: inline-flex; align-items: center; gap: 6px;
    background: var(--accent);
    color: #fff !important;
    border-radius: 8px;
    padding: 8px 16px;
    font-size: 0.78rem;
    font-weight: 600;
    text-decoration: none;
    transition: opacity 0.15s, transform 0.1s;
    box-shadow: 0 2px 8px rgba(9,105,218,0.28);
    letter-spacing: 0.01em;
  }
  .pv-btn:hover { opacity: 0.88; transform: translateY(-1px); }

  /* ── article card ── */
  .pv-card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    padding: 20px 22px;
    cursor: pointer;
    transition: box-shadow 0.2s, border-color 0.2s, transform 0.18s;
    position: relative;
  }
  .pv-card:hover {
    box-shadow: var(--shadow-md);
    border-color: rgba(9,105,218,0.35);
    transform: translateY(-1px);
  }
  .pv-card-title {
    font-family: 'DM Serif Display', serif;
    font-size: 0.98rem;
    color: var(--ink);
    line-height: 1.5;
    margin-bottom: 8px;
  }
  .pv-card-meta {
    display: flex; flex-wrap: wrap; align-items: center; gap: 6px;
    margin-bottom: 8px;
  }
  .pv-tag {
    display: inline-block;
    background: var(--accent-bg);
    color: var(--accent);
    border-radius: 5px;
    padding: 2px 8px;
    font-size: 0.68rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.04em;
  }
  .pv-card-authors {
    color: var(--muted);
    font-size: 0.77rem;
    line-height: 1.5;
    margin: 6px 0;
  }
  .pv-card-authors span + span::before { content: " · "; }

  .pv-cite-pill {
    background: linear-gradient(135deg, var(--accent), #0550ae);
    color: #fff;
    border-radius: 10px;
    padding: 10px 16px;
    text-align: center;
    flex-shrink: 0;
    min-width: 60px;
  }
  .pv-cite-pill-num { font-size: 1.3rem; font-weight: 700; line-height: 1; }
  .pv-cite-pill-lbl { font-size: 0.58rem; text-transform: uppercase; letter-spacing: 0.07em; opacity: 0.8; margin-top: 3px; }

  /* ── project card ── */
  .pv-proj-card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    padding: 18px 22px;
    display: flex;
    align-items: flex-start;
    gap: 16px;
    transition: box-shadow 0.2s, border-color 0.2s, transform 0.18s;
  }
  .pv-proj-card:hover {
    box-shadow: var(--shadow-md);
    border-color: rgba(9,105,218,0.3);
    transform: translateY(-1px);
  }
  .pv-proj-icon {
    width: 40px; height: 40px;
    border-radius: 10px;
    background: linear-gradient(135deg, #ebf5fb, #dbeafe);
    border: 1px solid #bfdbfe;
    display: flex; align-items: center; justify-content: center;
    font-size: 1.1rem;
    flex-shrink: 0;
  }
  .pv-proj-title {
    font-family: 'DM Serif Display', serif;
    font-size: 0.95rem;
    color: var(--ink);
    margin-bottom: 4px;
  }
  .pv-proj-desc { font-size: 0.78rem; color: var(--muted); line-height: 1.5; }

  .pv-status {
    font-size: 0.68rem; font-weight: 700;
    padding: 3px 10px; border-radius: 100px;
    text-transform: uppercase; letter-spacing: 0.05em;
    flex-shrink: 0; margin-top: 2px;
  }
  .pv-status-active   { background: var(--green-bg);  color: var(--green); }
  .pv-status-finished { background: var(--accent-bg); color: var(--accent); }
  .pv-status-default  { background: var(--bg);        color: var(--muted); border: 1px solid var(--border); }

  /* ── sidebar cards ── */
  .pv-sidebar-card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    padding: 20px;
    margin-bottom: 16px;
  }
  .pv-sidebar-title {
    font-family: 'DM Serif Display', serif;
    font-size: 0.95rem;
    color: var(--ink);
    margin-bottom: 14px;
    display: flex; align-items: center; justify-content: space-between;
  }
  .pv-sidebar-title span {
    font-family: 'DM Sans', sans-serif;
    font-size: 0.68rem; font-weight: 600;
    color: var(--muted);
    text-transform: uppercase; letter-spacing: 0.06em;
  }

  /* ── stat grid in sidebar ── */
  .pv-glance-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
  .pv-glance-item {
    background: var(--bg);
    border: 1px solid var(--border2);
    border-radius: 10px;
    padding: 12px;
  }
  .pv-glance-icon { font-size: 1rem; margin-bottom: 6px; }
  .pv-glance-val { font-size: 1.1rem; font-weight: 700; color: var(--ink); }
  .pv-glance-lbl { font-size: 0.63rem; color: var(--muted); text-transform: uppercase; letter-spacing: 0.05em; margin-top: 2px; }

  /* ── collab rows ── */
  .pv-collab-row {
    display: flex; align-items: center; gap: 10px;
    padding: 9px 0;
    border-bottom: 1px solid var(--border2);
  }
  .pv-collab-row:last-child { border-bottom: none; padding-bottom: 0; }
  .pv-rank {
    width: 22px; height: 22px; border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    font-size: 0.65rem; font-weight: 800; flex-shrink: 0;
  }
  .pv-bar-wrap { flex: 1; min-width: 0; }
  .pv-bar-name { font-size: 0.8rem; font-weight: 600; color: var(--ink); margin-bottom: 4px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .pv-bar-track { height: 4px; border-radius: 99px; background: var(--border2); overflow: hidden; }
  .pv-bar-fill  { height: 100%; border-radius: 99px; transition: width 0.7s cubic-bezier(0.4,0,0.2,1); }
  .pv-count-pill { font-size: 0.68rem; font-weight: 800; padding: 2px 8px; border-radius: 100px; flex-shrink: 0; }

  /* ── empty state ── */
  .pv-empty {
    text-align: center; padding: 48px 20px;
    color: var(--muted);
    background: var(--surface);
    border: 1px dashed var(--border);
    border-radius: var(--radius);
  }
  .pv-empty-icon { font-size: 2rem; margin-bottom: 10px; opacity: 0.5; }

  /* ── divider between sections ── */
  .pv-section-gap { margin-top: 32px; }

  /* ── link ── */
  .pv-link {
    color: var(--accent); font-weight: 600; font-size: 0.77rem;
    text-decoration: none;
  }
  .pv-link:hover { text-decoration: underline; }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(12px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .pv-fade { animation: fadeUp 0.35s ease both; }
`;
document.head.appendChild(styleTag);

/* ─── Accent palette ─────────────────────────────────────────────────────── */
const ACCENTS = [
  { bar: "#0969da", pill: "#dbeafe", pillText: "#0969da" },
  { bar: "#0891b2", pill: "#ecfeff", pillText: "#0e7490" },
  { bar: "#1a7f37", pill: "#dafbe1", pillText: "#1a7f37" },
  { bar: "#9a6700", pill: "#fff8c5", pillText: "#9a6700" },
  { bar: "#8250df", pill: "#fbefff", pillText: "#8250df" },
];

/* ─── TopCollaborators ───────────────────────────────────────────────────── */
function TopCollaborators({ articles, profileName }) {
  const [showAll, setShowAll] = useState(false);
  const TOP_N = 5;

  const collaborators = useMemo(() => {
    const counts = {};
    articles.forEach((article) => {
      if (!article.authors) return;
      article.authors
        .filter((author) => {
          const fullName = `${author.name} ${author.lastName}`;
          return !profileName || !fullName.toLowerCase().includes(profileName.toLowerCase());
        })
        .forEach((author) => {
          const fullName = `${author.name} ${author.lastName}`;
          counts[fullName] = (counts[fullName] || 0) + 1;
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
      <div className="pv-sidebar-title">
        🤝 Collaborators <span>{collaborators.length} unique</span>
      </div>
      {displayed.map((c, i) => {
        const ac = ACCENTS[i % ACCENTS.length];
        return (
          <div className="pv-collab-row" key={c.name}>
            <div className="pv-rank" style={{ background: i < 3 ? ac.bar : "#f0f2f5", color: i < 3 ? "#fff" : "#656d76" }}>
              {i + 1}
            </div>
            <div className="pv-bar-wrap">
              <div className="pv-bar-name" title={c.name}>{c.name}</div>
              <div className="pv-bar-track">
                <div className="pv-bar-fill" style={{ width: `${Math.round((c.count / max) * 100)}%`, background: ac.bar }} />
              </div>
            </div>
            <div className="pv-count-pill" style={{ background: ac.pill, color: ac.pillText }}>{c.count}×</div>
          </div>
        );
      })}
      {collaborators.length > TOP_N && (
        <button
          onClick={() => setShowAll((v) => !v)}
          style={{ marginTop: 12, width: "100%", border: "1px solid var(--border)", background: "none", borderRadius: 7, padding: "6px 0", fontSize: "0.75rem", fontWeight: 600, color: "var(--muted)", cursor: "pointer" }}
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

  const W = 256, H = 120, PAD = { top: 10, right: 8, bottom: 26, left: 22 };
  const innerW = W - PAD.left - PAD.right;
  const innerH = H - PAD.top - PAD.bottom;
  const maxCount = Math.max(...data.map((d) => d.count));
  const barW = Math.min(26, (innerW / data.length) - 4);
  const xScale = (i) => PAD.left + (i + 0.5) * (innerW / data.length);
  const yScale = (v) => PAD.top + innerH - (v / maxCount) * innerH;
  const yTicks = maxCount <= 2 ? [0, maxCount] : [0, Math.round(maxCount / 2), maxCount];
  const labelEvery = data.length <= 6 ? 1 : data.length <= 10 ? 2 : 3;

  return (
    <div className="pv-sidebar-card">
      <div className="pv-sidebar-title">
        📅 By Year
        <span>{data.length} active {data.length === 1 ? "year" : "years"}</span>
      </div>
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" style={{ overflow: "visible", display: "block" }}>
        {yTicks.map((tick) => {
          const y = yScale(tick);
          return (
            <g key={tick}>
              <line x1={PAD.left} x2={W - PAD.right} y1={y} y2={y} stroke="#e8ecf0" strokeWidth="1" strokeDasharray={tick === 0 ? "none" : "3 3"} />
              <text x={PAD.left - 5} y={y + 4} textAnchor="end" fontSize="8" fill="#656d76" fontFamily="DM Sans, sans-serif">{tick}</text>
            </g>
          );
        })}
        {data.map((d, i) => {
          const x = xScale(i);
          const barH = (d.count / maxCount) * innerH;
          const y = yScale(d.count);
          const isMax = d.count === maxCount;
          return (
            <g key={d.year}>
              <rect x={x - barW / 2} y={y} width={barW} height={barH} rx={4} fill={isMax ? "#0969da" : "#bfdbfe"} />
              <text x={x} y={y - 3} textAnchor="middle" fontSize="8" fontWeight="700" fill={isMax ? "#0969da" : "#656d76"} fontFamily="DM Sans, sans-serif">{d.count}</text>
              {i % labelEvery === 0 && (
                <text x={x} y={H - PAD.bottom + 14} textAnchor="middle" fontSize="8" fill="#656d76" fontFamily="DM Sans, sans-serif">{d.year}</text>
              )}
            </g>
          );
        })}
        <line x1={PAD.left} x2={W - PAD.right} y1={yScale(0)} y2={yScale(0)} stroke="#d0d7de" strokeWidth="1.5" />
      </svg>
      {data.length > 1 && (
        <div style={{ marginTop: 10, background: "#dbeafe", borderRadius: 8, padding: "6px 12px", fontSize: "0.72rem", color: "#0969da", fontWeight: 600, display: "flex", justifyContent: "space-between" }}>
          <span>🏆 Peak</span>
          <span>{data.find(d => d.count === maxCount)?.year} — {maxCount} {maxCount === 1 ? "paper" : "papers"}</span>
        </div>
      )}
    </div>
  );
}

/* ─── StatsCard ──────────────────────────────────────────────────────────── */
function StatsCard({ articles, projects }) {
  const totalCitations = articles.reduce((s, a) => s + (a.cited_by_count || 0), 0);
  const totalRefs = articles.reduce((s, a) => s + (a.referenced_works_count || 0), 0);
  const years = articles.map((a) => a.publication_year).filter(Boolean);
  const span = years.length ? `${Math.min(...years)}–${Math.max(...years)}` : "—";

  const stats = [
    { label: "Publications", value: articles.length, icon: "📄" },
    { label: "Citations",    value: totalCitations.toLocaleString(), icon: "📊" },
    { label: "Projects",     value: projects.length, icon: "🗂️" },
    { label: "Active Years", value: span, icon: "📅" },
  ];

  return (
    <div className="pv-sidebar-card">
      <div className="pv-sidebar-title">📈 At a Glance</div>
      <div className="pv-glance-grid">
        {stats.map((s) => (
          <div key={s.label} className="pv-glance-item">
            <div className="pv-glance-icon">{s.icon}</div>
            <div className="pv-glance-val">{s.value}</div>
            <div className="pv-glance-lbl">{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── ArticlesSection ────────────────────────────────────────────────────── */
const ArticlesSection = ({ articles, projects, profile }) => {
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

  const totalCitations = articles.reduce((s, a) => s + (a.cited_by_count || 0), 0);

  return (
    <div className="pv-root">

      {/* ── Banner ── */}
      <div className="pv-banner">
        <div className="pv-banner-noise" />
        <div className="pv-banner-inner">
          <div style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.45)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 8 }}>
            Researcher Profile
          </div>
          <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: "clamp(1.8rem, 4vw, 2.8rem)", color: "#fff", lineHeight: 1.15 }}>
            {profile.name} {profile.lastName || ""}
          </div>
        </div>
      </div>

      {/* ── Profile card ── */}
      <div className="pv-profile-card pv-fade">
        <div className="pv-profile-inner">
          <div className="pv-avatar">👤</div>

          <div className="pv-profile-info">
            <div className="pv-profile-name">{profile.name} {profile.lastName || ""}</div>
            <div className="pv-profile-sub">{profile.degree || "Researcher"}</div>
            <div className="pv-chips">
              {profile.orcid && (
                <a href={`https://orcid.org/${profile.orcid}`} target="_blank" rel="noreferrer" className="pv-chip">
                  <span style={{ color: "#a6ce39", fontWeight: 800, fontSize: "0.7rem" }}>iD</span>
                  {profile.orcid}
                </a>
              )}
              {profile.degree  && <span className="pv-chip">🎓 {profile.degree}</span>}
              {profile.birthday && <span className="pv-chip">📅 {profile.birthday}</span>}
            </div>
          </div>

          <div className="pv-stats-row">
            <div className="pv-stat">
              <div className="pv-stat-val">{articles.length}</div>
              <div className="pv-stat-lbl">Publications</div>
            </div>
            <div className="pv-stat">
              <div className="pv-stat-val">{totalCitations.toLocaleString()}</div>
              <div className="pv-stat-lbl">Citations</div>
            </div>
            <div className="pv-stat">
              <div className="pv-stat-val">{projects.length}</div>
              <div className="pv-stat-lbl">Projects</div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Main ── */}
      <div className="pv-main">

        {/* Left column */}
        <div>

          {/* Projects */}
          <div className="pv-sec-header">
            <div className="pv-sec-title">
              🗂️ Projects
              <span className="pv-count">{projects.length}</span>
            </div>
            <Link to={`/profiles/${id}/projects`} className="pv-btn">+ Create Project</Link>
          </div>

          {projects.length === 0 ? (
            <div className="pv-empty">
              <div className="pv-empty-icon">📭</div>
              <div style={{ fontWeight: 600, marginBottom: 4 }}>No projects yet</div>
              <div style={{ fontSize: "0.8rem" }}>Create your first project to get started.</div>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {projects.map((project, idx) => (
                <div key={project.id || project.title} className="pv-proj-card pv-fade" style={{ animationDelay: `${idx * 0.04}s` }}>
                  <div className="pv-proj-icon">🗂️</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div className="pv-proj-title">{project.title}</div>
                    {project.description && <div className="pv-proj-desc">{project.description}</div>}
                  </div>
                  {project.status && (
                    <span className={`pv-status ${
                      project.status === "ACTIVE"   ? "pv-status-active" :
                      project.status === "FINISHED" ? "pv-status-finished" : "pv-status-default"
                    }`}>
                      {project.status}
                    </span>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Publications */}
          <div className="pv-section-gap">
            <div className="pv-sec-header">
              <div className="pv-sec-title">
                📄 Publications
                <span className="pv-count">{articles.length}</span>
              </div>
              <Link to={`/profiles/${id}/articles`} className="pv-btn">+ Add Article</Link>
            </div>

            {articles.length === 0 ? (
              <div className="pv-empty">
                <div className="pv-empty-icon">📭</div>
                <div style={{ fontWeight: 600, marginBottom: 4 }}>No publications yet</div>
                <div style={{ fontSize: "0.8rem" }}>Add your first article to get started.</div>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {articles.map((article, idx) => (
                  <div
                    key={article.id || article.title}
                    className="pv-card pv-fade"
                    style={{ animationDelay: `${idx * 0.04}s` }}
                    onClick={() => handleOpenArticle(article)}
                  >
                    <div style={{ display: "flex", alignItems: "flex-start", gap: 16 }}>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div className="pv-card-title">{article.title}</div>
                        <div className="pv-card-meta">
                          {article.primary_location?.source?.display_name && (
                            <span className="pv-tag">{article.primary_location.source.display_name}</span>
                          )}
                          {article.publication_year && (
                            <span style={{ color: "var(--muted)", fontSize: "0.75rem", fontWeight: 600 }}>{article.publication_year}</span>
                          )}
                        </div>
                        <div className="pv-card-authors">
                          {Array.isArray(article.authors) && article.authors.map((author) => (
                            <span key={author.id}>{author.name} {author.lastName}</span>
                          ))}
                        </div>
                        <div style={{ display: "flex", gap: 16, fontSize: "0.75rem", marginTop: 8, alignItems: "center" }}>
                          {article.doi && (
                            <a href={`https://doi.org/${article.doi}`} target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()} className="pv-link">
                              🔗 Full Text
                            </a>
                          )}
                          <span style={{ color: "var(--muted)" }}>Refs: {article.referenced_works_count ?? "—"}</span>
                        </div>
                      </div>
                      <div className="pv-cite-pill">
                        <div className="pv-cite-pill-num">{article.cited_by_count ?? 0}</div>
                        <div className="pv-cite-pill-lbl">cited</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right sidebar */}
        <div>
          <StatsCard articles={articles} projects={projects} />
          <PublicationsChart articles={articles} />
          <TopCollaborators articles={articles} profileName={profile.name} />
        </div>

      </div>
    </div>
  );
};

/* ─── ProfileView (data layer) ───────────────────────────────────────────── */
export default function ProfileView() {
  const { profile_id } = useParams();
  const [profile, setProfile]   = useState({ orcid: "", name: "", lastName: "", birthday: "", degree: "" });
  const [articles, setArticles] = useState([]);
  const [projects, setProjects] = useState([]);

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

  useEffect(() => {
    api.get(`/profiles/${profile_id}/projects`)
      .then((r) => setProjects(r.data))
      .catch((e) => console.error("Failed to fetch projects:", e));
  }, [profile_id]);

  return <ArticlesSection articles={articles} projects={projects} profile={profile} />;
}
