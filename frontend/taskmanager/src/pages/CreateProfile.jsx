import React, { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";

/* ─── Font + styles ──────────────────────────────────────────────────────── */
const fontLink = document.createElement("link");
fontLink.rel = "stylesheet";
fontLink.href =
  "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=Lato:wght@300;400;700&display=swap";
if (!document.head.querySelector('link[href*="Playfair"]')) {
  document.head.appendChild(fontLink);
}

const styleTag = document.createElement("style");
styleTag.setAttribute("data-pf", "1");
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

  .pf-page {
    font-family: 'Lato', sans-serif;
    background: var(--bg);
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 48px 16px 80px;
  }

  .pf-shell { width: 100%; max-width: 520px; }

  /* brand */
  .pf-brand {
    text-align: center;
    margin-bottom: 28px;
  }
  .pf-brand-icon {
    width: 52px; height: 52px;
    background: linear-gradient(135deg, var(--accent), var(--accent2));
    border-radius: 14px;
    display: inline-flex; align-items: center; justify-content: center;
    font-size: 1.4rem;
    box-shadow: 0 4px 18px rgba(26,86,219,0.3);
    margin-bottom: 12px;
  }
  .pf-brand-name {
    font-family: 'Playfair Display', serif;
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--ink);
    letter-spacing: -0.02em;
  }
  .pf-brand-sub {
    font-size: 0.78rem;
    color: var(--muted);
    margin-top: 3px;
    text-transform: uppercase;
    letter-spacing: 0.07em;
  }

  /* hero strip */
  .pf-hero {
    background: linear-gradient(135deg, #0f1923 0%, #1a2e46 60%, #1a56db 100%);
    border-radius: 16px 16px 0 0;
    padding: 28px 36px;
    position: relative;
    overflow: hidden;
  }
  .pf-hero::before {
    content: '';
    position: absolute;
    top: -40px; right: -40px;
    width: 180px; height: 180px;
    border-radius: 50%;
    background: rgba(26,86,219,0.18);
  }
  .pf-hero-title {
    font-family: 'Playfair Display', serif;
    font-size: 1.35rem;
    font-weight: 700;
    color: #fff;
    letter-spacing: -0.02em;
    position: relative; z-index: 1;
  }
  .pf-hero-sub {
    font-size: 0.78rem;
    color: rgba(255,255,255,0.52);
    text-transform: uppercase;
    letter-spacing: 0.06em;
    margin-top: 5px;
    position: relative; z-index: 1;
  }

  /* steps indicator */
  .pf-steps {
    display: flex; gap: 6px; margin-top: 18px;
    position: relative; z-index: 1;
  }
  .pf-step {
    height: 3px; border-radius: 99px;
    background: rgba(255,255,255,0.22);
    flex: 1;
    transition: background 0.3s;
  }
  .pf-step.done { background: #fff; }
  .pf-step.active { background: rgba(255,255,255,0.7); }

  /* card body */
  .pf-body {
    background: var(--surface);
    border: 1px solid var(--border);
    border-top: none;
    border-radius: 0 0 20px 20px;
    padding: 36px 36px 32px;
    box-shadow: 0 8px 32px rgba(15,25,35,0.09);
  }

  .pf-section-label {
    font-size: 0.68rem;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: var(--accent);
    font-weight: 800;
    margin-bottom: 18px;
    padding-bottom: 10px;
    border-bottom: 2px solid #eef3ff;
  }

  /* field */
  .pf-field { margin-bottom: 20px; }
  .pf-label {
    display: block;
    font-size: 0.72rem;
    font-weight: 700;
    color: var(--ink2);
    text-transform: uppercase;
    letter-spacing: 0.07em;
    margin-bottom: 7px;
  }
  .pf-label sup { color: #e63946; margin-left: 2px; }

  .pf-input, .pf-select {
    width: 100%;
    border: 1.5px solid var(--border);
    border-radius: 10px;
    padding: 11px 14px;
    font-family: 'Lato', sans-serif;
    font-size: 0.9rem;
    color: var(--ink);
    background: #fafbfc;
    outline: none;
    transition: border-color 0.18s, box-shadow 0.18s, background 0.18s;
    appearance: none;
  }
  .pf-input:focus, .pf-select:focus {
    border-color: var(--accent);
    box-shadow: 0 0 0 3px rgba(26,86,219,0.10);
    background: #fff;
  }
  .pf-input::placeholder { color: #b0bac4; }

  .pf-select-wrap { position: relative; }
  .pf-select-wrap::after {
    content: '▾';
    position: absolute; right: 14px; top: 50%;
    transform: translateY(-50%);
    color: var(--muted); pointer-events: none; font-size: 0.8rem;
  }

  /* name grid */
  .pf-grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 0 20px; }
  @media (max-width: 500px) { .pf-grid-2 { grid-template-columns: 1fr; } }

  /* degree pills */
  .pf-degree-group { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 10px; }
  .pf-degree-btn {
    border: 1.5px solid var(--border);
    border-radius: 10px;
    padding: 10px 0;
    background: #fafbfc;
    font-family: 'Lato', sans-serif;
    font-size: 0.8rem;
    font-weight: 700;
    color: var(--muted);
    cursor: pointer;
    text-align: center;
    transition: all 0.15s;
    display: flex; flex-direction: column;
    align-items: center; justify-content: center; gap: 4px;
  }
  .pf-degree-btn:hover { border-color: var(--accent); color: var(--accent); }
  .pf-degree-btn.active {
    border-color: var(--accent);
    background: #eef3ff;
    color: var(--accent);
  }
  .pf-degree-icon { font-size: 1.2rem; }

  /* hint */
  .pf-hint { font-size: 0.72rem; color: var(--muted); margin-top: 5px; }

  /* divider */
  .pf-divider { height: 1px; background: var(--border); margin: 24px 0; }

  /* submit */
  .pf-submit {
    width: 100%;
    padding: 13px;
    background: linear-gradient(135deg, var(--accent), var(--accent2));
    color: #fff;
    border: none;
    border-radius: 10px;
    font-family: 'Lato', sans-serif;
    font-size: 0.88rem;
    font-weight: 700;
    letter-spacing: 0.03em;
    cursor: pointer;
    box-shadow: 0 4px 16px rgba(26,86,219,0.28);
    transition: opacity 0.15s, transform 0.1s;
  }
  .pf-submit:hover { opacity: 0.92; transform: translateY(-1px); }
  .pf-submit:disabled { opacity: 0.55; cursor: not-allowed; transform: none; }

  /* error */
  .pf-error {
    background: #fff0f0;
    border: 1.5px solid #fca5a5;
    border-radius: 10px;
    padding: 11px 16px;
    color: #b91c1c;
    font-size: 0.8rem;
    font-weight: 600;
    margin-bottom: 18px;
    display: flex; align-items: center; gap: 8px;
  }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(16px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .pf-animate { animation: fadeUp 0.38s ease both; }
`;
if (!document.head.querySelector("style[data-pf]")) {
  document.head.appendChild(styleTag);
}

const DEGREES = [
  { value: "BACHELOR", label: "Bachelor", icon: "📘" },
  { value: "MASTER",   label: "Master",   icon: "📗" },
  { value: "DOCTOR",   label: "Doctor",   icon: "📙" },
];

const ProfileForm = () => {
  const navigate = useNavigate();
  const id = localStorage.getItem("id");

  const [formData, setFormData] = useState({
    user_id: id,
    orcid: "",
    name: "",
    lastName: "",
    birthday: "",
    degree: "BACHELOR",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await api.post("/profiles", formData);
      navigate(`/profiles/${id}`);
    } catch (err) {
      console.error(err);
      setError("Failed to save profile. Please check your details and try again.");
      setLoading(false);
    }
  };

  // progress: count filled required fields out of 4
  const filled = [formData.name, formData.lastName, formData.birthday, formData.degree].filter(Boolean).length;

  return (
    <div className="pf-page">
      <div className="pf-shell pf-animate">

        {/* Brand */}
        <div className="pf-brand">
          <div className="pf-brand-icon">🎓</div>
          <div className="pf-brand-name">ResearchHub</div>
          <div className="pf-brand-sub">Academic Profile Platform</div>
        </div>

        {/* Hero */}
        <div className="pf-hero">
          <div className="pf-hero-title">Set Up Your Profile</div>
          <div className="pf-hero-sub">Complete your researcher identity</div>
          <div className="pf-steps">
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                className={`pf-step ${i < filled ? "done" : i === filled ? "active" : ""}`}
              />
            ))}
          </div>
        </div>

        {/* Body */}
        <div className="pf-body">
          {error && <div className="pf-error">⚠️ {error}</div>}

          <form onSubmit={handleSubmit}>

            {/* Personal info */}
            <div className="pf-section-label">👤 Personal Information</div>

            <div className="pf-grid-2">
              <div className="pf-field">
                <label className="pf-label">First Name <sup>*</sup></label>
                <input
                  className="pf-input"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Jane"
                  required
                />
              </div>
              <div className="pf-field">
                <label className="pf-label">Last Name <sup>*</sup></label>
                <input
                  className="pf-input"
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Doe"
                  required
                />
              </div>
            </div>

            <div className="pf-field">
              <label className="pf-label">Date of Birth <sup>*</sup></label>
              <input
                className="pf-input"
                type="date"
                name="birthday"
                value={formData.birthday}
                onChange={handleChange}
                required
              />
            </div>

            <div className="pf-divider" />

            {/* Academic info */}
            <div className="pf-section-label">🔬 Academic Details</div>

            <div className="pf-field">
              <label className="pf-label">ORCID iD</label>
              <input
                className="pf-input"
                type="text"
                name="orcid"
                value={formData.orcid}
                onChange={handleChange}
                placeholder="0000-0000-0000-0000"
              />
              <div className="pf-hint">
                Your unique researcher identifier — find yours at{" "}
                <a href="https://orcid.org" target="_blank" rel="noreferrer"
                  style={{ color: "var(--accent)", fontWeight: 700, textDecoration: "none" }}>
                  orcid.org
                </a>
              </div>
            </div>

            <div className="pf-field">
              <label className="pf-label">Academic Degree <sup>*</sup></label>
              <div className="pf-degree-group">
                {DEGREES.map((d) => (
                  <button
                    key={d.value}
                    type="button"
                    className={`pf-degree-btn ${formData.degree === d.value ? "active" : ""}`}
                    onClick={() => setFormData({ ...formData, degree: d.value })}
                  >
                    <span className="pf-degree-icon">{d.icon}</span>
                    {d.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="pf-divider" />

            <button type="submit" className="pf-submit" disabled={loading}>
              {loading ? "⏳ Saving…" : "Save Profile →"}
            </button>

          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfileForm;