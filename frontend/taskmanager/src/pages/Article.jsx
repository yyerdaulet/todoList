import api from "../api";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

/* ─── Font + styles ──────────────────────────────────────────────────────── */
const fontLink = document.createElement("link");
fontLink.rel = "stylesheet";
fontLink.href =
  "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;0,700;1,600&family=Lato:wght@300;400;700&display=swap";
if (!document.head.querySelector('link[href*="Playfair"]')) {
  document.head.appendChild(fontLink);
}

const styleTag = document.createElement("style");
styleTag.setAttribute("data-av", "1");
styleTag.textContent = `
  :root {
    --ink:     #0f1923;
    --ink2:    #3a4a5c;
    --muted:   #7a8898;
    --border:  #e4e9f0;
    --bg:      #f5f7fa;
    --surface: #ffffff;
    --accent:  #1a56db;
    --accent2: #0e3a9e;
  }

  .av-page {
    font-family: 'Lato', sans-serif;
    color: var(--ink);
    min-height: 100vh;
    background: var(--bg);
    padding: 48px 16px 80px;
  }

  .av-wrap { max-width: 820px; margin: 0 auto; }

  /* back */
  .av-back {
    display: inline-flex; align-items: center; gap: 6px;
    color: var(--muted); font-size: 0.8rem; font-weight: 700;
    text-transform: uppercase; letter-spacing: 0.06em;
    margin-bottom: 28px; background: none; border: none;
    cursor: pointer; transition: color 0.15s;
    font-family: 'Lato', sans-serif;
  }
  .av-back:hover { color: var(--accent); }

  /* ── hero ── */
  .av-hero {
    background: linear-gradient(135deg, #0f1923 0%, #1a2e46 55%, #1a56db 100%);
    border-radius: 20px;
    padding: 44px 52px;
    margin-bottom: 28px;
    position: relative;
    overflow: hidden;
    color: #fff;
    box-shadow: 0 8px 40px rgba(15,25,35,0.22);
  }
  .av-hero::before {
    content: '';
    position: absolute; top: -70px; right: -70px;
    width: 300px; height: 300px; border-radius: 50%;
    background: rgba(26,86,219,0.15);
  }
  .av-hero::after {
    content: '';
    position: absolute; bottom: -60px; left: 20%;
    width: 180px; height: 180px; border-radius: 50%;
    background: rgba(201,168,76,0.08);
  }

  .av-hero-eyebrow {
    font-size: 0.7rem; text-transform: uppercase;
    letter-spacing: 0.1em; color: rgba(255,255,255,0.45);
    margin-bottom: 14px; position: relative; z-index: 1;
    display: flex; align-items: center; gap: 8px;
  }
  .av-hero-eyebrow span {
    background: rgba(255,255,255,0.1);
    border: 1px solid rgba(255,255,255,0.18);
    border-radius: 100px; padding: 3px 12px;
  }

  .av-hero-title {
    font-family: 'Playfair Display', serif;
    font-size: clamp(1.3rem, 3vw, 1.85rem);
    font-weight: 700;
    line-height: 1.35;
    letter-spacing: -0.02em;
    color: #fff;
    margin-bottom: 20px;
    position: relative; z-index: 1;
    max-width: 680px;
  }

  .av-hero-meta {
    display: flex; flex-wrap: wrap; gap: 10px;
    position: relative; z-index: 1;
  }
  .av-hero-chip {
    display: inline-flex; align-items: center; gap: 6px;
    background: rgba(255,255,255,0.10);
    border: 1px solid rgba(255,255,255,0.18);
    border-radius: 100px; padding: 5px 14px;
    font-size: 0.78rem; color: rgba(255,255,255,0.82);
  }

  /* ── stat bar ── */
  .av-stats {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
    gap: 14px;
    margin-bottom: 28px;
  }
  .av-stat-card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 14px;
    padding: 18px 20px;
    text-align: center;
    box-shadow: 0 2px 10px rgba(0,0,0,0.05);
  }
  .av-stat-icon { font-size: 1.2rem; margin-bottom: 6px; }
  .av-stat-value {
    font-size: 1.5rem; font-weight: 800;
    color: var(--ink); line-height: 1;
    margin-bottom: 4px;
  }
  .av-stat-label {
    font-size: 0.65rem; text-transform: uppercase;
    letter-spacing: 0.07em; color: var(--muted); font-weight: 700;
  }

  /* ── content card ── */
  .av-card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 18px;
    padding: 36px 40px;
    box-shadow: 0 2px 16px rgba(0,0,0,0.06);
    margin-bottom: 20px;
  }

  .av-section-label {
    font-size: 0.68rem; text-transform: uppercase;
    letter-spacing: 0.1em; color: var(--accent); font-weight: 800;
    margin-bottom: 16px; padding-bottom: 10px;
    border-bottom: 2px solid #eef3ff;
  }

  /* authors list */
  .av-authors {
    display: flex; flex-wrap: wrap; gap: 8px;
  }
  .av-author-pill {
    background: #f1f5ff;
    border: 1px solid #d0dbff;
    border-radius: 100px;
    padding: 5px 14px;
    font-size: 0.8rem;
    font-weight: 600;
    color: var(--accent2);
  }

  /* abstract */
  .av-abstract {
    font-size: 0.92rem;
    line-height: 1.8;
    color: var(--ink2);
    font-family: 'Lato', sans-serif;
    font-weight: 300;
  }
  .av-abstract-empty {
    color: var(--muted); font-style: italic; font-size: 0.88rem;
  }

  /* doi row */
  .av-doi-row {
    display: flex; align-items: center; gap: 12px; flex-wrap: wrap;
  }
  .av-doi-text {
    font-family: 'Lato', sans-serif;
    font-size: 0.82rem; color: var(--muted);
    word-break: break-all;
  }
  .av-doi-link {
    display: inline-flex; align-items: center; gap: 6px;
    background: var(--accent); color: #fff;
    border-radius: 8px; padding: 7px 16px;
    font-size: 0.78rem; font-weight: 700;
    text-decoration: none; letter-spacing: 0.02em;
    box-shadow: 0 2px 10px rgba(26,86,219,0.22);
    transition: background 0.15s, transform 0.1s;
    flex-shrink: 0;
  }
  .av-doi-link:hover { background: var(--accent2); transform: translateY(-1px); }

  /* pdf button */
  .av-pdf-btn {
    display: inline-flex; align-items: center; gap: 8px;
    background: linear-gradient(135deg, #059669, #047857);
    color: #fff; text-decoration: none;
    border-radius: 10px; padding: 12px 24px;
    font-size: 0.85rem; font-weight: 700;
    box-shadow: 0 3px 14px rgba(5,150,105,0.28);
    transition: opacity 0.15s, transform 0.1s;
  }
  .av-pdf-btn:hover { opacity: 0.9; transform: translateY(-1px); }

  /* ── loading / error ── */
  .av-center {
    display: flex; flex-direction: column;
    align-items: center; justify-content: center;
    min-height: 60vh; gap: 16px;
    font-family: 'Lato', sans-serif;
  }
  .av-spinner {
    width: 44px; height: 44px; border-radius: 50%;
    border: 3px solid #e4e9f0;
    border-top-color: var(--accent);
    animation: av-spin 0.8s linear infinite;
  }
  @keyframes av-spin { to { transform: rotate(360deg); } }

  .av-error-icon {
    width: 64px; height: 64px; border-radius: 50%;
    background: #fff0f0; display: flex;
    align-items: center; justify-content: center;
    font-size: 1.8rem;
  }
  .av-error-msg { color: #b91c1c; font-weight: 700; font-size: 0.9rem; }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(14px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .av-animate { animation: fadeUp 0.38s ease both; }
`;
if (!document.head.querySelector("style[data-av]")) {
  document.head.appendChild(styleTag);
}

/* ─── Helpers ────────────────────────────────────────────────────────────── */
function parseAuthors(raw) {
  if (!raw) return [];
  return raw.split(",").map((s) => s.trim()).filter(Boolean);
}

/* ─── Component ──────────────────────────────────────────────────────────── */
export default function ArticleView() {
  const { profile_id, article_id } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    api.get(`profiles/${profile_id}/articles/${article_id}`)
      .then((r) => setArticle(r.data))
      .catch((err) => {
        console.error(err);
        setError("Failed to load article. It may have been removed or the link is invalid.");
      });
  }, [profile_id, article_id]);

  /* ── Loading ── */
  if (!article && !error) {
    return (
      <div className="av-center">
        <div className="av-spinner" />
        <span style={{ color: "var(--muted)", fontSize: "0.82rem", fontFamily: "Lato, sans-serif" }}>
          Loading article…
        </span>
      </div>
    );
  }

  /* ── Error ── */
  if (error) {
    return (
      <div className="av-center">
        <div className="av-error-icon">📭</div>
        <div className="av-error-msg">{error}</div>
        <button
          onClick={() => navigate(-1)}
          style={{
            marginTop: 8, background: "var(--accent)", color: "#fff",
            border: "none", borderRadius: 9, padding: "10px 22px",
            fontFamily: "Lato, sans-serif", fontWeight: 700,
            fontSize: "0.82rem", cursor: "pointer",
          }}
        >
          ← Go Back
        </button>
      </div>
    );
  }

  const title = article.displayDocTitle || article.title || "Untitled";
  const abstract = article.abstract || article.description;
  const authors = parseAuthors(article.authors);
  const journal = article.primary_location?.source?.display_name;

  const stats = [
    { icon: "📊", value: article.cited_by_count ?? "—", label: "Citations" },
    { icon: "🔗", value: article.referenced_works_count ?? "—", label: "References" },
    { icon: "📅", value: article.publication_year ?? "—", label: "Published" },
  ].filter(s => s.value !== "—" || s.label === "Published");

  return (
    <div className="av-page">
      <div className="av-wrap">

        <button className="av-back" onClick={() => navigate(-1)}>
          ← Back to Profile
        </button>

        {/* Hero */}
        <div className="av-hero av-animate">
          <div className="av-hero-eyebrow">
            <span>📄 Publication</span>
            {journal && <span>{journal}</span>}
          </div>
          <div className="av-hero-title">{title}</div>
          <div className="av-hero-meta">
            {article.publication_year && (
              <span className="av-hero-chip">📅 {article.publication_year}</span>
            )}
            {article.cited_by_count != null && (
              <span className="av-hero-chip">📊 {article.cited_by_count} citations</span>
            )}
            {article.doi && (
              <span className="av-hero-chip">🔗 DOI</span>
            )}
          </div>
        </div>

        {/* Stat cards */}
        {stats.length > 0 && (
          <div className="av-stats av-animate" style={{ animationDelay: "0.05s" }}>
            {stats.map((s) => (
              <div className="av-stat-card" key={s.label}>
                <div className="av-stat-icon">{s.icon}</div>
                <div className="av-stat-value">{s.value}</div>
                <div className="av-stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        )}

        {/* Authors */}
        {authors.length > 0 && (
          <div className="av-card av-animate" style={{ animationDelay: "0.08s" }}>
            <div className="av-section-label">👥 Authors</div>
            <div className="av-authors">
              {authors.map((a) => (
                <span className="av-author-pill" key={a}>{a}</span>
              ))}
            </div>
          </div>
        )}

        {/* Abstract */}
        <div className="av-card av-animate" style={{ animationDelay: "0.12s" }}>
          <div className="av-section-label">📝 Abstract</div>
          {abstract
            ? <p className="av-abstract">{abstract}</p>
            : <p className="av-abstract-empty">No abstract available for this publication.</p>
          }
        </div>

        {/* DOI + PDF */}
        {(article.doi || article.pdfUrl) && (
          <div className="av-card av-animate" style={{ animationDelay: "0.16s" }}>
            <div className="av-section-label">🔗 Access</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

              {article.doi && (
                <div className="av-doi-row">
                  <span className="av-doi-text">{article.doi}</span>
                  <a
                    href={article.doi.startsWith("http") ? article.doi : `https://doi.org/${article.doi}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="av-doi-link"
                  >
                    View Article ↗
                  </a>
                </div>
              )}

              {article.pdfUrl && (
                <div>
                  <a
                    href={article.pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="av-pdf-btn"
                  >
                    ⬇ Download PDF
                  </a>
                </div>
              )}

            </div>
          </div>
        )}

      </div>
    </div>
  );
}