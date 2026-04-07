import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api";

/* ─── Font ───────────────────────────────────────────────────────────────── */
const fontLink = document.createElement("link");
fontLink.rel = "stylesheet";
fontLink.href = "https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,300;0,600;0,700;1,400&family=DM+Sans:wght@300;400;500;600&display=swap";
document.head.appendChild(fontLink);

/* ─── Styles ─────────────────────────────────────────────────────────────── */
const styleTag = document.createElement("style");
styleTag.textContent = `
  :root {
    --pv2-bg:        #f5f7fa;
    --pv2-surface:   #ffffff;
    --pv2-surface2:  #f0f3f8;
    --pv2-border:    #e1e6f0;
    --pv2-border2:   #ccd3e0;
    --pv2-ink:       #0d1117;
    --pv2-ink2:      #3d4a5c;
    --pv2-muted:     #7a8898;
    --pv2-accent:    #2563eb;
    --pv2-accent-bg: #dbeafe;
    --pv2-green:     #16a34a;
    --pv2-green-bg:  #dcfce7;
    --pv2-amber:     #d97706;
    --pv2-amber-bg:  #fef3c7;
    --pv2-gray-bg:   #f1f5f9;
    --pv2-shadow:    0 1px 4px rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.06);
    --pv2-shadow-lg: 0 8px 32px rgba(0,0,0,0.10);
    --pv2-radius:    14px;
    --pv2-radius-lg: 20px;
  }

  * { box-sizing: border-box; margin: 0; padding: 0; }

  .pv2-root {
    font-family: 'DM Sans', sans-serif;
    background: var(--pv2-bg);
    min-height: 100vh;
    color: var(--pv2-ink);
  }

  /* ── hero banner ── */
  .pv2-hero {
    background: linear-gradient(135deg, #0f1f3d 0%, #1a3160 50%, #1e40af 100%);
    padding: 0;
    position: relative;
    overflow: hidden;
  }
  .pv2-hero::before {
    content: '';
    position: absolute; inset: 0;
    background:
      radial-gradient(ellipse 50% 100% at 90% 50%, rgba(96,165,250,0.18) 0%, transparent 60%),
      radial-gradient(ellipse 30% 60% at 10% 80%, rgba(30,64,175,0.3) 0%, transparent 60%);
  }
  .pv2-hero-grid {
    position: absolute; inset: 0;
    background-image: linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
                      linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
    background-size: 40px 40px;
  }
  .pv2-hero-inner {
    position: relative; z-index: 1;
    padding: 52px 56px 80px;
    max-width: 100%;
  }

  .pv2-back-btn {
    display: inline-flex; align-items: center; gap: 7px;
    background: rgba(255,255,255,0.08);
    border: 1px solid rgba(255,255,255,0.15);
    border-radius: 9px;
    padding: 8px 16px;
    font-size: 0.78rem; font-weight: 500;
    color: rgba(255,255,255,0.75);
    cursor: pointer;
    margin-bottom: 40px;
    transition: background 0.15s, color 0.15s;
    font-family: 'DM Sans', sans-serif;
    text-decoration: none;
  }
  .pv2-back-btn:hover { background: rgba(255,255,255,0.14); color: #fff; }

  .pv2-hero-eyebrow {
    font-size: 0.68rem; font-weight: 600;
    letter-spacing: 0.18em; text-transform: uppercase;
    color: rgba(147,197,253,0.9);
    margin-bottom: 14px;
    display: flex; align-items: center; gap: 10px;
  }
  .pv2-hero-eyebrow::before {
    content: '';
    display: inline-block;
    width: 24px; height: 1.5px;
    background: rgba(147,197,253,0.6);
  }

  .pv2-hero-title {
    font-family: 'Fraunces', serif;
    font-size: clamp(1.8rem, 4vw, 3rem);
    font-weight: 600;
    color: #ffffff;
    line-height: 1.2;
    margin-bottom: 24px;
    max-width: 700px;
  }

  .pv2-hero-chips {
    display: flex; gap: 10px; flex-wrap: wrap;
  }
  .pv2-hero-chip {
    display: inline-flex; align-items: center; gap: 6px;
    background: rgba(255,255,255,0.09);
    border: 1px solid rgba(255,255,255,0.15);
    border-radius: 100px;
    padding: 5px 14px;
    font-size: 0.76rem; font-weight: 500;
    color: rgba(255,255,255,0.8);
  }

  /* ── status badge ── */
  .pv2-status {
    display: inline-flex; align-items: center; gap: 6px;
    font-size: 0.72rem; font-weight: 700;
    padding: 5px 14px; border-radius: 100px;
    text-transform: uppercase; letter-spacing: 0.06em;
  }
  .pv2-status::before { content: '●'; font-size: 0.5rem; }
  .pv2-status-active   { background: var(--pv2-green-bg);  color: var(--pv2-green); }
  .pv2-status-finished { background: var(--pv2-accent-bg); color: var(--pv2-accent); }
  .pv2-status-pending  { background: var(--pv2-amber-bg);  color: var(--pv2-amber); }
  .pv2-status-default  { background: var(--pv2-gray-bg);   color: var(--pv2-muted); border: 1px solid var(--pv2-border); }

  /* ── main body ── */
  .pv2-body {
    padding: 0 56px 80px;
    margin-top: -36px;
    position: relative; z-index: 2;
    display: grid;
    grid-template-columns: 1fr 300px;
    gap: 24px;
    align-items: start;
  }
  @media (max-width: 900px) {
    .pv2-body { grid-template-columns: 1fr; padding: 0 20px 60px; }
    .pv2-hero-inner { padding: 36px 20px 60px; }
  }

  /* ── card ── */
  .pv2-card {
    background: var(--pv2-surface);
    border: 1px solid var(--pv2-border);
    border-radius: var(--pv2-radius-lg);
    box-shadow: var(--pv2-shadow);
    overflow: hidden;
    margin-bottom: 20px;
  }
  .pv2-card-header {
    padding: 22px 28px 18px;
    border-bottom: 1px solid var(--pv2-border);
    display: flex; align-items: center; gap: 12px;
  }
  .pv2-card-icon {
    width: 36px; height: 36px; border-radius: 10px;
    display: flex; align-items: center; justify-content: center;
    font-size: 1rem; flex-shrink: 0;
  }
  .pv2-card-title {
    font-family: 'Fraunces', serif;
    font-size: 1rem; font-weight: 600;
    color: var(--pv2-ink);
  }
  .pv2-card-body { padding: 24px 28px; }

  /* ── purpose text ── */
  .pv2-purpose-text {
    font-size: 0.92rem;
    color: var(--pv2-ink2);
    line-height: 1.8;
    font-weight: 300;
  }

  /* ── tasks list ── */
  .pv2-tasks { display: flex; flex-direction: column; gap: 10px; }
  .pv2-task-item {
    display: flex; align-items: flex-start; gap: 14px;
    padding: 14px 18px;
    background: var(--pv2-surface2);
    border: 1px solid var(--pv2-border);
    border-radius: 10px;
    transition: border-color 0.15s, box-shadow 0.15s;
  }
  .pv2-task-item:hover {
    border-color: var(--pv2-border2);
    box-shadow: 0 2px 8px rgba(0,0,0,0.05);
  }
  .pv2-task-num {
    width: 24px; height: 24px; border-radius: 50%;
    background: var(--pv2-accent-bg);
    color: var(--pv2-accent);
    font-size: 0.68rem; font-weight: 800;
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0; margin-top: 1px;
  }
  .pv2-task-text { font-size: 0.87rem; color: var(--pv2-ink2); line-height: 1.5; }

  /* ── result ── */
  .pv2-result-box {
    background: linear-gradient(135deg, #eff6ff, #f5f3ff);
    border: 1px solid #c7d7fe;
    border-radius: 12px;
    padding: 20px 22px;
    display: flex; gap: 16px; align-items: flex-start;
  }
  .pv2-result-icon { font-size: 1.4rem; flex-shrink: 0; margin-top: 2px; }
  .pv2-result-text { font-size: 0.88rem; color: var(--pv2-ink2); line-height: 1.7; font-weight: 400; }

  /* ── pictures ── */
  .pv2-pictures-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
    gap: 10px;
  }
  .pv2-picture {
    aspect-ratio: 4/3;
    border-radius: 10px;
    overflow: hidden;
    background: var(--pv2-surface2);
    border: 1px solid var(--pv2-border);
  }
  .pv2-picture img { width: 100%; height: 100%; object-fit: cover; }
  .pv2-picture-placeholder {
    width: 100%; height: 100%;
    display: flex; align-items: center; justify-content: center;
    font-size: 1.5rem; color: var(--pv2-muted);
  }

  /* ── sidebar cards ── */
  .pv2-side-card {
    background: var(--pv2-surface);
    border: 1px solid var(--pv2-border);
    border-radius: var(--pv2-radius);
    box-shadow: var(--pv2-shadow);
    padding: 20px 22px;
    margin-bottom: 16px;
  }
  .pv2-side-title {
    font-family: 'Fraunces', serif;
    font-size: 0.9rem; font-weight: 600;
    color: var(--pv2-ink);
    margin-bottom: 14px;
    display: flex; align-items: center; gap: 8px;
  }
  .pv2-side-count {
    font-family: 'DM Sans', sans-serif;
    font-size: 0.68rem; font-weight: 600;
    background: var(--pv2-surface2);
    border: 1px solid var(--pv2-border);
    border-radius: 100px;
    padding: 2px 8px;
    color: var(--pv2-muted);
  }

  /* ── member row ── */
  .pv2-member {
    display: flex; align-items: center; gap: 12px;
    padding: 10px 0;
    border-bottom: 1px solid var(--pv2-border);
  }
  .pv2-member:last-child { border-bottom: none; padding-bottom: 0; }
  .pv2-member-avatar {
    width: 36px; height: 36px; border-radius: 50%;
    background: linear-gradient(135deg, #1e3a8a, #2563eb);
    display: flex; align-items: center; justify-content: center;
    font-size: 0.75rem; font-weight: 700; color: #fff;
    flex-shrink: 0;
  }
  .pv2-member-name { font-size: 0.84rem; font-weight: 600; color: var(--pv2-ink); }
  .pv2-member-role { font-size: 0.72rem; color: var(--pv2-muted); margin-top: 1px; }

  /* ── stat ── */
  .pv2-stat-row {
    display: flex; justify-content: space-between; align-items: center;
    padding: 10px 0;
    border-bottom: 1px solid var(--pv2-border);
    font-size: 0.82rem;
  }
  .pv2-stat-row:last-child { border-bottom: none; }
  .pv2-stat-label { color: var(--pv2-muted); }
  .pv2-stat-value { font-weight: 600; color: var(--pv2-ink); }

  /* ── empty ── */
  .pv2-empty {
    text-align: center; padding: 32px 20px;
    color: var(--pv2-muted); font-size: 0.82rem;
  }

  /* ── skeleton loader ── */
  .pv2-skeleton {
    background: linear-gradient(90deg, #e8ecf2 25%, #f5f7fa 50%, #e8ecf2 75%);
    background-size: 200% 100%;
    animation: shimmer 1.4s infinite;
    border-radius: 8px;
  }
  @keyframes shimmer { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(14px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .pv2-fade { animation: fadeUp 0.4s ease both; }
  .pv2-fade-1 { animation: fadeUp 0.4s 0.05s ease both; }
  .pv2-fade-2 { animation: fadeUp 0.4s 0.1s ease both; }
  .pv2-fade-3 { animation: fadeUp 0.4s 0.15s ease both; }
  .pv2-fade-4 { animation: fadeUp 0.4s 0.2s ease both; }
`;
document.head.appendChild(styleTag);

/* ─── Helpers ────────────────────────────────────────────────────────────── */
const statusClass = (s) => {
  if (!s) return "pv2-status-default";
  switch (s.toUpperCase()) {
    case "ACTIVE":   return "pv2-status-active";
    case "FINISHED": return "pv2-status-finished";
    case "PENDING":  return "pv2-status-pending";
    default:         return "pv2-status-default";
  }
};

const initials = (name) => {
  if (!name) return "?";
  const parts = name.trim().split(" ");
  return parts.length >= 2
    ? `${parts[0][0]}${parts[1][0]}`.toUpperCase()
    : parts[0][0].toUpperCase();
};

/* ─── Skeleton ───────────────────────────────────────────────────────────── */
function Skeleton() {
  return (
    <div className="pv2-root">
      <div className="pv2-hero">
        <div className="pv2-hero-inner">
          <div className="pv2-skeleton" style={{ width: 80, height: 32, marginBottom: 40 }} />
          <div className="pv2-skeleton" style={{ width: 160, height: 14, marginBottom: 16 }} />
          <div className="pv2-skeleton" style={{ width: 480, height: 42, marginBottom: 12 }} />
          <div className="pv2-skeleton" style={{ width: 320, height: 28 }} />
        </div>
      </div>
      <div className="pv2-body">
        <div>
          {[180, 240, 160].map((h, i) => (
            <div key={i} className="pv2-card" style={{ marginBottom: 20 }}>
              <div style={{ padding: "22px 28px" }}>
                <div className="pv2-skeleton" style={{ width: 120, height: 18, marginBottom: 16 }} />
                <div className="pv2-skeleton" style={{ width: "100%", height: h }} />
              </div>
            </div>
          ))}
        </div>
        <div>
          <div className="pv2-side-card">
            <div className="pv2-skeleton" style={{ width: 100, height: 16, marginBottom: 16 }} />
            {[1,2,3].map(i => (
              <div key={i} style={{ display: "flex", gap: 12, padding: "10px 0", borderBottom: "1px solid #e1e6f0" }}>
                <div className="pv2-skeleton" style={{ width: 36, height: 36, borderRadius: "50%", flexShrink: 0 }} />
                <div style={{ flex: 1 }}>
                  <div className="pv2-skeleton" style={{ width: "70%", height: 13, marginBottom: 6 }} />
                  <div className="pv2-skeleton" style={{ width: "40%", height: 11 }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Main ───────────────────────────────────────────────────────────────── */
export default function ProjectPage() {
  const { profile_id, project_id } = useParams();
  const navigate = useNavigate();

  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState("");

  useEffect(() => {
    api.get(`/profiles/${profile_id}/projects/${project_id}`)
      .then((r) => setProject(r.data))
      .catch(() => setError("Failed to load project."))
      .finally(() => setLoading(false));
  }, [profile_id, project_id]);

  if (loading) return <Skeleton />;

  if (error || !project) {
    return (
      <div className="pv2-root">

        {/* ── Hero ── */}
        <div className="pv2-hero">
          <div className="pv2-hero-grid" />
          <div className="pv2-hero-inner pv2-fade">
            <button className="pv2-back-btn" onClick={() => navigate(`/profiles/${profile_id}`)}>
              ← Back to Profile
            </button>

            <div className="pv2-hero-eyebrow">Research Project</div>
            <div className="pv2-hero-title">{project.title}</div>

            <div className="pv2-hero-chips">
              {project.status && (
                <span className={`pv2-status ${statusClass(project.status)}`} style={{ background: "rgba(255,255,255,0.12)", color: "#fff", borderColor: "rgba(255,255,255,0.2)" }}>
                  {project.status}
                </span>
              )}
              {project.profiles?.length > 0 && (
                <span className="pv2-hero-chip">👥 {project.profiles.length} member{project.profiles.length !== 1 ? "s" : ""}</span>
              )}
              {project.tasks?.length > 0 && (
                <span className="pv2-hero-chip">✓ {project.tasks.length} task{project.tasks.length !== 1 ? "s" : ""}</span>
              )}
            </div>
          </div>
        </div>

        {/* ── Body ── */}
        <div className="pv2-body">

          {/* Left: main content */}
          <div>

            {/* Purpose */}
            {project.purpose && (
              <div className="pv2-card pv2-fade-1">
                <div className="pv2-card-header">
                  <div className="pv2-card-icon" style={{ background: "#eff6ff" }}>🎯</div>
                  <div className="pv2-card-title">Purpose</div>
                </div>
                <div className="pv2-card-body">
                  <p className="pv2-purpose-text">{project.purpose}</p>
                </div>
              </div>
            )}

            {/* Tasks */}
            {project.tasks?.length > 0 && (
              <div className="pv2-card pv2-fade-2">
                <div className="pv2-card-header">
                  <div className="pv2-card-icon" style={{ background: "#f0fdf4" }}>📋</div>
                  <div className="pv2-card-title">Tasks</div>
                </div>
                <div className="pv2-card-body">
                  <div className="pv2-tasks">
                    {project.tasks.map((task, i) => (
                      <div key={i} className="pv2-task-item">
                        <div className="pv2-task-num">{i + 1}</div>
                        <div className="pv2-task-text">{task}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Expected Result */}
            {project.result && (
              <div className="pv2-card pv2-fade-3">
                <div className="pv2-card-header">
                  <div className="pv2-card-icon" style={{ background: "#faf5ff" }}>🏁</div>
                  <div className="pv2-card-title">Expected Result</div>
                </div>
                <div className="pv2-card-body">
                  <div className="pv2-result-box">
                    <div className="pv2-result-icon">💡</div>
                    <div className="pv2-result-text">{project.result}</div>
                  </div>
                </div>
              </div>
            )}

            {/* Pictures */}
            {project.pictures?.length > 0 && (
              <div className="pv2-card pv2-fade-4">
                <div className="pv2-card-header">
                  <div className="pv2-card-icon" style={{ background: "#fff7ed" }}>🖼️</div>
                  <div className="pv2-card-title">Gallery</div>
                </div>
                <div className="pv2-card-body">
                  <div className="pv2-pictures-grid">
                    {project.pictures.map((pic, i) => (
                      <div key={i} className="pv2-picture">
                        {pic ? (
                          <img src={pic} alt={`Project image ${i + 1}`} />
                        ) : (
                          <div className="pv2-picture-placeholder">🖼️</div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

          </div>

          {/* Right: sidebar */}
          <div>

            {/* Status card */}
            <div className="pv2-side-card pv2-fade-1">
              <div className="pv2-side-title">📊 Overview</div>
              <div className="pv2-stat-row">
                <span className="pv2-stat-label">Status</span>
                <span className={`pv2-status ${statusClass(project.status)}`}>{project.status ?? "—"}</span>
              </div>
              <div className="pv2-stat-row">
                <span className="pv2-stat-label">Tasks</span>
                <span className="pv2-stat-value">{project.tasks?.length ?? 0}</span>
              </div>
              <div className="pv2-stat-row">
                <span className="pv2-stat-label">Members</span>
                <span className="pv2-stat-value">{project.profiles?.length ?? 0}</span>
              </div>
              <div className="pv2-stat-row">
                <span className="pv2-stat-label">Pictures</span>
                <span className="pv2-stat-value">{project.pictures?.length ?? 0}</span>
              </div>
            </div>

            {/* Team members */}
            <div className="pv2-side-card pv2-fade-2">
              <div className="pv2-side-title">
                👥 Team
                <span className="pv2-side-count">{project.profiles?.length ?? 0}</span>
              </div>
              {project.profiles?.length > 0 ? (
                project.profiles.map((profile) => (
                  <div key={profile.id} className="pv2-member">
                    <div className="pv2-member-avatar">
                      {initials(`${profile.name} ${profile.lastName ?? ""}`)}
                    </div>
                    <div>
                      <div className="pv2-member-name">{profile.name} {profile.lastName ?? ""}</div>
                      <div className="pv2-member-role">{profile.degree ?? "Researcher"}</div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="pv2-empty">No members assigned</div>
              )}
            </div>

          </div>
        </div>
      </div>
    );
}
}