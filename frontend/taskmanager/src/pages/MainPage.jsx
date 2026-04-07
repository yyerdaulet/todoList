import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../api";

/* ─── Font + styles ──────────────────────────────────────────────────────── */
const fontLink = document.createElement("link");
fontLink.rel = "stylesheet";
fontLink.href =
  "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;0,700;1,600&family=Lato:wght@300;400;700&display=swap";
if (!document.head.querySelector('link[href*="Playfair"]')) {
  document.head.appendChild(fontLink);
}

const styleTag = document.createElement("style");
styleTag.setAttribute("data-mp", "1");
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

  .mp-page {
    font-family: 'Lato', sans-serif;
    color: var(--ink);
    background: var(--bg);
    min-height: 100vh;
  }

  /* ── HERO ── */
  .mp-hero {
    background: linear-gradient(135deg, #0f1923 0%, #1a2e46 55%, #1a56db 100%);
    padding: 80px 24px 90px;
    position: relative;
    overflow: hidden;
    text-align: center;
    color: #fff;
  }
  .mp-hero::before {
    content: '';
    position: absolute; top: -80px; right: -80px;
    width: 380px; height: 380px; border-radius: 50%;
    background: rgba(26,86,219,0.15);
  }
  .mp-hero::after {
    content: '';
    position: absolute; bottom: -100px; left: 10%;
    width: 260px; height: 260px; border-radius: 50%;
    background: rgba(201,168,76,0.08);
  }
  .mp-hero-eyebrow {
    display: inline-flex; align-items: center; gap: 8px;
    background: rgba(255,255,255,0.10);
    border: 1px solid rgba(255,255,255,0.18);
    border-radius: 100px; padding: 5px 16px;
    font-size: 0.72rem; letter-spacing: 0.1em;
    text-transform: uppercase; color: rgba(255,255,255,0.7);
    margin-bottom: 20px;
    position: relative; z-index: 1;
  }
  .mp-hero-title {
    font-family: 'Playfair Display', serif;
    font-size: clamp(2rem, 5vw, 3.2rem);
    font-weight: 700; letter-spacing: -0.03em;
    line-height: 1.2; margin-bottom: 18px;
    position: relative; z-index: 1;
  }
  .mp-hero-desc {
    font-size: 1rem; line-height: 1.7;
    color: rgba(255,255,255,0.62);
    max-width: 640px; margin: 0 auto 32px;
    font-weight: 300;
    position: relative; z-index: 1;
  }
  .mp-hero-chips {
    display: flex; flex-wrap: wrap; gap: 10px;
    justify-content: center;
    position: relative; z-index: 1;
  }
  .mp-hero-chip {
    background: rgba(255,255,255,0.10);
    border: 1px solid rgba(255,255,255,0.18);
    border-radius: 100px; padding: 6px 16px;
    font-size: 0.78rem; color: rgba(255,255,255,0.82);
  }

  /* ── SECTION WRAPPER ── */
  .mp-content { max-width: 1100px; margin: 0 auto; padding: 64px 24px 80px; }

  /* ── SECTION TITLE ── */
  .mp-section-head {
    display: flex; align-items: flex-end; gap: 14px;
    margin-bottom: 28px;
  }
  .mp-section-title {
    font-family: 'Playfair Display', serif;
    font-size: 1.55rem; font-weight: 700;
    color: var(--ink); letter-spacing: -0.02em;
    line-height: 1;
  }
  .mp-section-line {
    flex: 1; height: 1px;
    background: var(--border);
    margin-bottom: 5px;
  }

  /* ── ABOUT CARD ── */
  .mp-about-card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 18px;
    padding: 36px 40px;
    box-shadow: 0 2px 16px rgba(0,0,0,0.06);
    margin-bottom: 64px;
    position: relative;
    overflow: hidden;
  }
  .mp-about-card::before {
    content: '';
    position: absolute; left: 0; top: 0; bottom: 0;
    width: 4px;
    background: linear-gradient(to bottom, var(--accent), var(--accent2));
    border-radius: 4px 0 0 4px;
  }
  .mp-about-text {
    font-size: 0.92rem; line-height: 1.85;
    color: var(--ink2); font-weight: 300;
  }

  /* ── DIRECTIONS ── */
  .mp-directions {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 16px;
    margin-bottom: 64px;
  }
  .mp-dir-card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 16px;
    padding: 28px 24px;
    box-shadow: 0 2px 12px rgba(0,0,0,0.05);
    text-decoration: none;
    transition: box-shadow 0.2s, transform 0.18s, border-color 0.2s;
    display: flex; flex-direction: column;
    align-items: flex-start; gap: 12px;
    position: relative; overflow: hidden;
  }
  .mp-dir-card::after {
    content: '→';
    position: absolute; right: 18px; bottom: 18px;
    font-size: 1rem; color: var(--border);
    transition: color 0.2s, transform 0.2s;
  }
  .mp-dir-card:hover {
    box-shadow: 0 6px 28px rgba(26,86,219,0.12);
    border-color: rgba(26,86,219,0.3);
    transform: translateY(-3px);
  }
  .mp-dir-card:hover::after { color: var(--accent); transform: translateX(3px); }
  .mp-dir-icon {
    width: 42px; height: 42px; border-radius: 12px;
    display: flex; align-items: center; justify-content: center;
    font-size: 1.2rem;
    flex-shrink: 0;
  }
  .mp-dir-name {
    font-size: 0.9rem; font-weight: 700;
    color: var(--ink); line-height: 1.4;
  }

  /* ── NEWS ── */
  .mp-news-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 18px;
  }
  .mp-news-card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 16px;
    padding: 26px 28px;
    box-shadow: 0 2px 12px rgba(0,0,0,0.05);
    display: flex; flex-direction: column; gap: 12px;
    transition: box-shadow 0.2s, transform 0.18s;
  }
  .mp-news-card:hover {
    box-shadow: 0 6px 24px rgba(26,86,219,0.10);
    transform: translateY(-2px);
  }
  .mp-news-date {
    display: inline-flex; align-items: center; gap: 6px;
    font-size: 0.72rem; font-weight: 700;
    text-transform: uppercase; letter-spacing: 0.07em;
    color: var(--accent);
    background: #eef3ff; border-radius: 100px;
    padding: 3px 12px; align-self: flex-start;
  }
  .mp-news-text {
    font-size: 0.88rem; line-height: 1.7;
    color: var(--ink2); font-weight: 400;
    flex: 1;
  }

  /* ── EMPTY ── */
  .mp-empty {
    text-align: center; padding: 48px 0;
    color: var(--muted); font-size: 0.85rem;
  }

  /* ── DIVIDER ── */
  .mp-divider { height: 1px; background: var(--border); margin: 0 0 64px; }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(16px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .mp-animate { animation: fadeUp 0.4s ease both; }
`;
if (!document.head.querySelector("style[data-mp]")) {
  document.head.appendChild(styleTag);
}

/* ─── Direction config ───────────────────────────────────────────────────── */
const DIRECTIONS = [
  { id: 1, label: "Information Systems",               icon: "🗄️", color: "#eef3ff", iconBg: "#dce8ff" },
  { id: 2, label: "Artificial Intelligence & Big Data", icon: "🤖", color: "#f0fdf4", iconBg: "#d1fae5" },
  { id: 3, label: "Computer Science",                  icon: "💻", color: "#fdf4ff", iconBg: "#ede9fe" },
  { id: 4, label: "Cybersecurity & Cryptology",        icon: "🔐", color: "#fff7ed", iconBg: "#fed7aa" },
];

/* ─── Component ──────────────────────────────────────────────────────────── */
export default function MainPage() {
  const [news, setNews] = useState([]);

  useEffect(() => {
    api.get("/news")
      .then((res) => setNews(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="mp-page">

      {/* ── Hero ── */}
      <div className="mp-hero mp-animate">
        <div className="mp-hero-eyebrow">🔬 Research Laboratory</div>
        <div className="mp-hero-title">IT Research Laboratory</div>
        <div className="mp-hero-desc">
          A research and development environment focused on software engineering,
          artificial intelligence, and distributed systems — exploring emerging
          technologies and building practical digital solutions.
        </div>
        <div className="mp-hero-chips">
          <span className="mp-hero-chip">Machine Learning</span>
          <span className="mp-hero-chip">Cloud Computing</span>
          <span className="mp-hero-chip">Cybersecurity</span>
          <span className="mp-hero-chip">Data Analytics</span>
        </div>
      </div>

      <div className="mp-content">

        {/* ── About ── */}
        <div className="mp-animate" style={{ animationDelay: "0.05s" }}>
          <div className="mp-section-head">
            <div className="mp-section-title">About Us</div>
            <div className="mp-section-line" />
          </div>
          <div className="mp-about-card">
            <p className="mp-about-text">
              The laboratory was established in the mid-2010s by a small group of software engineers
              and researchers interested in exploring emerging digital technologies. Initially, the team
              focused on experimental projects in web development and distributed systems. As the
              laboratory grew, its activities expanded to include research in artificial intelligence,
              data processing, and cloud computing. Over time, the laboratory developed several
              prototype tools and research projects, gradually evolving into a collaborative
              environment for innovation and technological experimentation.
            </p>
          </div>
        </div>

        {/* ── Directions ── */}
        <div className="mp-animate" style={{ animationDelay: "0.10s" }}>
          <div className="mp-section-head">
            <div className="mp-section-title">Research Directions</div>
            <div className="mp-section-line" />
          </div>
          <div className="mp-directions">
            {DIRECTIONS.map((d, i) => (
              <Link
                key={d.id}
                to={`/labs/${d.id}`}
                className="mp-dir-card mp-animate"
                style={{ animationDelay: `${0.12 + i * 0.05}s`, background: d.color, borderColor: "transparent" }}
              >
                <div className="mp-dir-icon" style={{ background: d.iconBg }}>
                  {d.icon}
                </div>
                <div className="mp-dir-name">{d.label}</div>
              </Link>
            ))}
          </div>
        </div>

        {/* ── News ── */}
        <div className="mp-animate" style={{ animationDelay: "0.15s" }}>
          <div className="mp-section-head">
            <div className="mp-section-title">Latest News</div>
            <div className="mp-section-line" />
          </div>

          {news.length === 0 ? (
            <div className="mp-empty">
              <div style={{ fontSize: "2rem", marginBottom: 10 }}>📭</div>
              No news published yet.
            </div>
          ) : (
            <div className="mp-news-grid">
              {news.map((item, i) => (
                <div
                  key={i}
                  className="mp-news-card mp-animate"
                  style={{ animationDelay: `${0.18 + i * 0.04}s` }}
                >
                  <div className="mp-news-date">📅 {item.publication_date}</div>
                  <div className="mp-news-text">{item.publication_text}</div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}