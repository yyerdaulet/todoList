import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
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
styleTag.setAttribute("data-lp", "1");
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

  .lp-page {
    font-family: 'Lato', sans-serif;
    color: var(--ink);
    background: var(--bg);
    min-height: 100vh;
  }

  /* ── hero ── */
  .lp-hero {
    background: linear-gradient(135deg, #0f1923 0%, #1a2e46 55%, #1a56db 100%);
    padding: 60px 32px 68px;
    position: relative; overflow: hidden;
    color: #fff;
  }
  .lp-hero::before {
    content: '';
    position: absolute; top: -80px; right: -80px;
    width: 340px; height: 340px; border-radius: 50%;
    background: rgba(26,86,219,0.15);
  }
  .lp-hero::after {
    content: '';
    position: absolute; bottom: -80px; left: 15%;
    width: 220px; height: 220px; border-radius: 50%;
    background: rgba(201,168,76,0.07);
  }
  .lp-hero-inner { max-width: 1100px; margin: 0 auto; position: relative; z-index: 1; }
  .lp-hero-eyebrow {
    display: inline-flex; align-items: center; gap: 8px;
    background: rgba(255,255,255,0.10);
    border: 1px solid rgba(255,255,255,0.18);
    border-radius: 100px; padding: 5px 16px;
    font-size: 0.72rem; letter-spacing: 0.1em;
    text-transform: uppercase; color: rgba(255,255,255,0.65);
    margin-bottom: 16px;
  }
  .lp-hero-title {
    font-family: 'Playfair Display', serif;
    font-size: clamp(1.8rem, 4vw, 2.8rem);
    font-weight: 700; letter-spacing: -0.03em;
    line-height: 1.2; margin-bottom: 16px;
  }
  .lp-hero-info {
    font-size: 0.95rem; line-height: 1.75;
    color: rgba(255,255,255,0.60);
    max-width: 680px; font-weight: 300;
    margin-bottom: 28px;
  }
  .lp-hero-stats {
    display: flex; gap: 0;
    border-top: 1px solid rgba(255,255,255,0.12);
    padding-top: 24px;
    flex-wrap: wrap;
  }
  .lp-hero-stat {
    padding: 0 32px 0 0;
    margin-right: 32px;
    border-right: 1px solid rgba(255,255,255,0.12);
  }
  .lp-hero-stat:last-child { border-right: none; }
  .lp-hero-stat-val {
    font-size: 1.6rem; font-weight: 800; line-height: 1;
    margin-bottom: 4px;
  }
  .lp-hero-stat-label {
    font-size: 0.68rem; text-transform: uppercase;
    letter-spacing: 0.08em; color: rgba(255,255,255,0.45);
    font-weight: 600;
  }

  /* ── body ── */
  .lp-body { max-width: 1100px; margin: 0 auto; padding: 52px 24px 80px; }

  /* ── section ── */
  .lp-section { margin-bottom: 56px; }
  .lp-section-head {
    display: flex; align-items: center; gap: 14px;
    margin-bottom: 24px;
  }
  .lp-section-title {
    font-family: 'Playfair Display', serif;
    font-size: 1.4rem; font-weight: 700;
    color: var(--ink); letter-spacing: -0.02em;
    white-space: nowrap;
  }
  .lp-section-line { flex: 1; height: 1px; background: var(--border); }
  .lp-count-badge {
    background: #eef3ff; color: var(--accent);
    border-radius: 100px; padding: 3px 12px;
    font-size: 0.72rem; font-weight: 800;
    letter-spacing: 0.04em; flex-shrink: 0;
  }

  /* ── project cards ── */
  .lp-projects-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 16px;
  }
  .lp-project-card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 16px; padding: 24px 26px;
    box-shadow: 0 2px 12px rgba(0,0,0,0.05);
    display: flex; flex-direction: column; gap: 10px;
    transition: box-shadow 0.2s, transform 0.18s, border-color 0.2s;
    position: relative; overflow: hidden;
  }
  .lp-project-card::before {
    content: '';
    position: absolute; left: 0; top: 0; bottom: 0;
    width: 3px;
    background: var(--accent);
    border-radius: 3px 0 0 3px;
    opacity: 0; transition: opacity 0.2s;
  }
  .lp-project-card:hover {
    box-shadow: 0 6px 24px rgba(26,86,219,0.10);
    border-color: rgba(26,86,219,0.25);
    transform: translateY(-2px);
  }
  .lp-project-card:hover::before { opacity: 1; }
  .lp-project-title {
    font-family: 'Playfair Display', serif;
    font-size: 0.98rem; font-weight: 700;
    color: var(--ink); line-height: 1.4;
  }
  .lp-project-desc {
    font-size: 0.82rem; line-height: 1.65;
    color: var(--muted); flex: 1;
  }
  .lp-open-btn {
    display: inline-flex; align-items: center; gap: 6px;
    background: none; border: 1.5px solid var(--border);
    border-radius: 8px; padding: 7px 14px;
    font-family: 'Lato', sans-serif;
    font-size: 0.76rem; font-weight: 700;
    color: var(--ink2); cursor: pointer;
    transition: border-color 0.15s, color 0.15s, background 0.15s;
    align-self: flex-start; margin-top: 4px;
  }
  .lp-open-btn:hover {
    border-color: var(--accent);
    color: var(--accent);
    background: #eef3ff;
  }

  /* ── article cards ── */
  .lp-articles-list { display: flex; flex-direction: column; gap: 14px; }
  .lp-article-card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 14px; padding: 20px 24px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.05);
    display: flex; align-items: flex-start; gap: 18px;
    transition: box-shadow 0.2s, transform 0.18s, border-color 0.2s;
    cursor: pointer;
  }
  .lp-article-card:hover {
    box-shadow: 0 5px 22px rgba(26,86,219,0.09);
    border-color: rgba(26,86,219,0.25);
    transform: translateY(-2px);
  }
  .lp-article-icon {
    width: 40px; height: 40px; border-radius: 10px;
    background: #eef3ff; display: flex; align-items: center;
    justify-content: center; font-size: 1.1rem; flex-shrink: 0;
  }
  .lp-article-title {
    font-family: 'Playfair Display', serif;
    font-size: 0.95rem; font-weight: 700;
    color: var(--ink); line-height: 1.45; margin-bottom: 6px;
  }
  .lp-article-desc {
    font-size: 0.8rem; line-height: 1.6; color: var(--muted);
    display: -webkit-box; -webkit-line-clamp: 2;
    -webkit-box-orient: vertical; overflow: hidden;
  }

  /* ── profile cards ── */
  .lp-profiles-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 14px;
  }
  .lp-profile-card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 16px; padding: 24px 20px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.05);
    display: flex; flex-direction: column;
    align-items: center; gap: 10px; text-align: center;
    transition: box-shadow 0.2s, transform 0.18s;
  }
  .lp-profile-card:hover {
    box-shadow: 0 5px 20px rgba(26,86,219,0.09);
    transform: translateY(-2px);
  }
  .lp-profile-avatar {
    width: 52px; height: 52px; border-radius: 50%;
    background: linear-gradient(135deg, #dce8ff, #eef3ff);
    border: 2px solid var(--border);
    display: flex; align-items: center; justify-content: center;
    font-size: 1.3rem; color: var(--accent); font-weight: 800;
  }
  .lp-profile-name {
    font-weight: 700; font-size: 0.88rem;
    color: var(--ink); line-height: 1.3;
  }
  .lp-profile-role {
    font-size: 0.74rem; color: var(--muted); font-weight: 400;
  }

  /* ── empty ── */
  .lp-empty {
    background: #f8fafc; border: 1px dashed var(--border);
    border-radius: 12px; padding: 28px;
    text-align: center; color: var(--muted);
    font-size: 0.82rem;
  }

  /* ── loading / error ── */
  .lp-center {
    display: flex; flex-direction: column;
    align-items: center; justify-content: center;
    min-height: 60vh; gap: 14px;
    font-family: 'Lato', sans-serif;
  }
  .lp-spinner {
    width: 44px; height: 44px; border-radius: 50%;
    border: 3px solid #e4e9f0; border-top-color: var(--accent);
    animation: lp-spin 0.8s linear infinite;
  }
  @keyframes lp-spin { to { transform: rotate(360deg); } }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(14px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .lp-animate { animation: fadeUp 0.38s ease both; }
`;
if (!document.head.querySelector("style[data-lp]")) {
  document.head.appendChild(styleTag);
}

/* ─── Section wrapper ────────────────────────────────────────────────────── */
function Section({ title, count, children, delay = "0s" }) {
  return (
    <div className="lp-section lp-animate" style={{ animationDelay: delay }}>
      <div className="lp-section-head">
        <div className="lp-section-title">{title}</div>
        <div className="lp-section-line" />
        <div className="lp-count-badge">{count}</div>
      </div>
      {children}
    </div>
  );
}



/* ─── Component ──────────────────────────────────────────────────────────── */
export default function LabPage() {
  const { lab_id } = useParams();
  const navigate = useNavigate();

  const [lab, setLab] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  {/* ── Projects ── */}
  const [projects, setProjects] = useState([]);
  const [projectsLoading, setProjectsLoading] = useState(true);

  const [articles, setArticles] = useState([]);
  const [articlesLoading, setArticlesLoading] = useState(true);
  const [profiles, setProfiles] = useState([]);
  const [profilesLoading, setProfilesLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    api.get(`/labs/${lab_id}`)
      .then((r) => setLab(r.data))
      .catch((err) => { console.error(err); setError("Failed to load laboratory data."); })
      .finally(() => setLoading(false));
  }, [lab_id]);

  useEffect(() => {
      api.get(`/labs/${lab_id}/projects`)
        .then((r) => setProjects(Array.isArray(r.data) ? r.data : []))
        .catch(console.error)
        .finally(() => setProjectsLoading(false));
    }, [lab_id]);

  useEffect(() => {
    api.get(`/labs/${lab_id}/articles`)
      .then((r) => setArticles(Array.isArray(r.data) ? r.data : []))
      .catch(console.error)
      .finally(() => setArticlesLoading(false));
  }, [lab_id]);

  useEffect(() => {
    api.get(`/labs/${lab_id}/profiles`)
      .then((r) => setProfiles(Array.isArray(r.data) ? r.data : []))
      .catch(console.error)
      .finally(() => setProfilesLoading(false));
  }, [lab_id]);


  /* ── Loading ── */
  if (loading) return (
    <div className="lp-center">
      <div className="lp-spinner" />
      <span style={{ color: "var(--muted)", fontSize: "0.82rem" }}>Loading laboratory…</span>
    </div>
  );

  /* ── Error / empty ── */
  if (error || !lab) return (
    <div className="lp-center">
      <div style={{ fontSize: "2.5rem" }}>🔬</div>
      <div style={{ fontWeight: 700, color: "#b91c1c", fontSize: "0.9rem" }}>
        {error || "No laboratory data found."}
      </div>
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





  const getName = (p) =>
    p.fullName ||
    p.name ||
    `${p.firstName || ""} ${p.lastName || ""}`.trim() ||
    "Unnamed";


  return (
    <div className="lp-page">

      {/* ── Hero ── */}
      <div className="lp-hero lp-animate">
        <div className="lp-hero-inner">
          <div className="lp-hero-eyebrow">🔬 Research Laboratory</div>
          <div className="lp-hero-title">{lab.name}</div>
          {lab.info && <div className="lp-hero-info">{lab.info}</div>}
          <div className="lp-hero-stats">
            <div className="lp-hero-stat">
              <div className="lp-hero-stat-val">{projects?.length ?? 0}</div>
              <div className="lp-hero-stat-label">Projects</div>
            </div>
            <div className="lp-hero-stat">
              <div className="lp-hero-stat-val">{articles?.length ?? 0}</div>
              <div className="lp-hero-stat-label">Articles</div>
            </div>
            <div className="lp-hero-stat">
              <div className="lp-hero-stat-val">{profiles?.length ?? 0}</div>
              <div className="lp-hero-stat-label">Researchers</div>
            </div>
          </div>
        </div>
      </div>

      <div className="lp-body">

        {/* ── Projects ── */}
        <Section title="Projects" count={projects.length} delay="0.05s">
          {projectsLoading ? (
            <div className="lp-center">
              <div className="lp-spinner" />
            </div>
          ) : projects.length > 0 ? (
            <div className="lp-projects-grid">
              {projects.map((p, i) => (
                <div
                  key={p.id || i}
                  className="lp-project-card lp-animate"
                  style={{ animationDelay: `${0.08 + i * 0.04}s` }}
                >
                  <div className="lp-project-title">
                    {p.title || p.name || "Untitled Project"}
                  </div>
                  <div className="lp-project-desc">
                    {p.description || p.info || "No description available."}
                  </div>
                  <button
                    className="lp-open-btn"
                    onClick={() => navigate(`/projects/${p.id}`)}
                  >
                    Open →
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="lp-empty">📂 No projects available yet.</div>
          )}
        </Section>

        {/* ── Articles ── */}
        <Section title="Articles" count={articles.length} delay="0.10s">
          {articlesLoading ? (
            <div className="lp-center"><div className="lp-spinner" /></div>
          ) : articles.length > 0 ? (
            <div className="lp-articles-list">
              {articles.map((a, i) => (
                <div
                  key={a.id || i}
                  className="lp-article-card lp-animate"
                  style={{ animationDelay: `${0.12 + i * 0.04}s` }}
                  onClick={() => navigate(`/articles/${a.id}`)}
                >
                  <div className="lp-article-icon">📄</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div className="lp-article-title">
                      {a.title || "Untitled Article"}
                    </div>
                    <div className="lp-article-desc">
                      {a.description || a.abstractText || a.abstract || "No abstract available."}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="lp-empty">📭 No articles available yet.</div>
          )}
        </Section>

        {/* ── Researchers ── */}
        <Section title="Researchers" count={profiles.length} delay="0.15s">
          {profilesLoading ? (
            <div className="lp-center"><div className="lp-spinner" /></div>
          ) : profiles.length > 0 ? (
            <div className="lp-profiles-grid">
              {profiles.map((p, i) => (
                <div
                  key={p.id || i}
                  className="lp-profile-card lp-animate"
                  style={{ animationDelay: `${0.18 + i * 0.04}s`, cursor: "pointer" }}
                  onClick={() => navigate(`/profiles/${p.id}`)}
                >
                  <div className="lp-profile-avatar">
                    {getName(p)[0]?.toUpperCase() ?? "?"}
                  </div>
                  <div className="lp-profile-name">{getName(p)}</div>
                  {(p.position || p.role) && (
                    <div className="lp-profile-role">{p.position || p.role}</div>
                  )}
                  <button
                    className="lp-open-btn"
                    onClick={(e) => { e.stopPropagation(); navigate(`/profiles/${p.id}`); }}
                  >
                    View Profile →
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="lp-empty">👥 No researchers listed yet.</div>
          )}
        </Section>



      </div>
    </div>
  );
}