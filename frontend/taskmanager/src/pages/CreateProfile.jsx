import React, { useState, useEffect } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";

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
    display: flex; align-items: center; justify-content: center;
    padding: 48px 16px 80px;
  }
  .pf-shell { width: 100%; max-width: 520px; }
  .pf-brand { text-align: center; margin-bottom: 28px; }
  .pf-brand-icon {
    width: 52px; height: 52px;
    background: linear-gradient(135deg, var(--accent), var(--accent2));
    border-radius: 14px;
    display: inline-flex; align-items: center; justify-content: center;
    font-size: 1.4rem;
    box-shadow: 0 4px 18px rgba(26,86,219,0.3); margin-bottom: 12px;
  }
  .pf-brand-name {
    font-family: 'Playfair Display', serif;
    font-size: 1.5rem; font-weight: 700; color: var(--ink); letter-spacing: -0.02em;
  }
  .pf-brand-sub { font-size: 0.78rem; color: var(--muted); margin-top: 3px; text-transform: uppercase; letter-spacing: 0.07em; }
  .pf-hero {
    background: linear-gradient(135deg, #0f1923 0%, #1a2e46 60%, #1a56db 100%);
    border-radius: 16px 16px 0 0; padding: 28px 36px;
    position: relative; overflow: hidden;
  }
  .pf-hero::before {
    content: ''; position: absolute; top: -40px; right: -40px;
    width: 180px; height: 180px; border-radius: 50%;
    background: rgba(26,86,219,0.18);
  }
  .pf-hero-title {
    font-family: 'Playfair Display', serif; font-size: 1.35rem;
    font-weight: 700; color: #fff; letter-spacing: -0.02em; position: relative; z-index: 1;
  }
  .pf-hero-sub {
    font-size: 0.78rem; color: rgba(255,255,255,0.52); text-transform: uppercase;
    letter-spacing: 0.06em; margin-top: 5px; position: relative; z-index: 1;
  }
  .pf-steps { display: flex; gap: 6px; margin-top: 18px; position: relative; z-index: 1; }
  .pf-step { height: 3px; border-radius: 99px; background: rgba(255,255,255,0.22); flex: 1; transition: background 0.3s; }
  .pf-step.done { background: #fff; }
  .pf-step.active { background: rgba(255,255,255,0.7); }
  .pf-body {
    background: var(--surface); border: 1px solid var(--border); border-top: none;
    border-radius: 0 0 20px 20px; padding: 36px 36px 32px;
    box-shadow: 0 8px 32px rgba(15,25,35,0.09);
  }
  .pf-section-label {
    font-size: 0.68rem; text-transform: uppercase; letter-spacing: 0.1em;
    color: var(--accent); font-weight: 800; margin-bottom: 18px;
    padding-bottom: 10px; border-bottom: 2px solid #eef3ff;
  }
  .pf-field { margin-bottom: 20px; }
  .pf-label {
    display: block; font-size: 0.72rem; font-weight: 700; color: var(--ink2);
    text-transform: uppercase; letter-spacing: 0.07em; margin-bottom: 7px;
  }
  .pf-label sup { color: #e63946; margin-left: 2px; }
  .pf-input, .pf-select {
    width: 100%; border: 1.5px solid var(--border); border-radius: 10px;
    padding: 11px 14px; font-family: 'Lato', sans-serif; font-size: 0.9rem;
    color: var(--ink); background: #fafbfc; outline: none;
    transition: border-color 0.18s, box-shadow 0.18s, background 0.18s; appearance: none;
  }
  .pf-input:focus, .pf-select:focus {
    border-color: var(--accent); box-shadow: 0 0 0 3px rgba(26,86,219,0.10); background: #fff;
  }
  .pf-input::placeholder { color: #b0bac4; }
  .pf-grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 0 20px; }
  @media (max-width: 500px) { .pf-grid-2 { grid-template-columns: 1fr; } }
  .pf-degree-group { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 10px; }
  .pf-degree-btn {
    border: 1.5px solid var(--border); border-radius: 10px; padding: 10px 0;
    background: #fafbfc; font-family: 'Lato', sans-serif; font-size: 0.8rem;
    font-weight: 700; color: var(--muted); cursor: pointer; text-align: center;
    transition: all 0.15s; display: flex; flex-direction: column;
    align-items: center; justify-content: center; gap: 4px;
  }
  .pf-degree-btn:hover { border-color: var(--accent); color: var(--accent); }
  .pf-degree-btn.active { border-color: var(--accent); background: #eef3ff; color: var(--accent); }
  .pf-degree-icon { font-size: 1.2rem; }
  .pf-hint { font-size: 0.72rem; color: var(--muted); margin-top: 5px; }
  .pf-divider { height: 1px; background: var(--border); margin: 24px 0; }

  /* ── lab cards ── */
  .pf-lab-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
  @media (max-width: 480px) { .pf-lab-grid { grid-template-columns: 1fr; } }
  .pf-lab-btn {
    border: 1.5px solid var(--border); border-radius: 12px; padding: 14px;
    background: #fafbfc; font-family: 'Lato', sans-serif; cursor: pointer;
    text-align: left; transition: all 0.15s;
    display: flex; align-items: flex-start; gap: 10px;
  }
  .pf-lab-btn:hover { border-color: var(--accent); background: #f4f7ff; }
  .pf-lab-btn.active {
    border-color: var(--accent); background: #eef3ff;
    box-shadow: 0 0 0 3px rgba(26,86,219,0.10);
  }
  .pf-lab-radio {
    width: 18px; height: 18px; border-radius: 50%;
    border: 2px solid var(--border); flex-shrink: 0; margin-top: 2px;
    display: flex; align-items: center; justify-content: center;
    transition: all 0.15s;
  }
  .pf-lab-btn.active .pf-lab-radio { border-color: var(--accent); background: var(--accent); }
  .pf-lab-radio-dot { width: 6px; height: 6px; border-radius: 50%; background: #fff; }
  .pf-lab-name { font-size: 0.82rem; font-weight: 700; color: var(--ink); line-height: 1.35; }
  .pf-lab-info {
    font-size: 0.72rem; color: var(--muted); margin-top: 3px; line-height: 1.4;
    display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;
  }
  .pf-lab-none {
    grid-column: 1 / -1;
    border: 1.5px dashed var(--border); border-radius: 12px;
    padding: 14px; background: #fafbfc; font-family: 'Lato', sans-serif;
    cursor: pointer; text-align: left; transition: all 0.15s;
    display: flex; align-items: center; gap: 10px;
    font-size: 0.82rem; font-weight: 700; color: var(--muted);
  }
  .pf-lab-none:hover { border-color: var(--muted); color: var(--ink2); }
  .pf-lab-none.active { border-color: var(--accent); color: var(--accent); background: #eef3ff; }
  .pf-lab-loading { text-align: center; padding: 24px 0; color: var(--muted); font-size: 0.8rem; }
  .pf-lab-spinner {
    width: 24px; height: 24px; border-radius: 50%;
    border: 2px solid var(--border); border-top-color: var(--accent);
    animation: pf-spin 0.7s linear infinite; margin: 0 auto 8px;
  }
  @keyframes pf-spin { to { transform: rotate(360deg); } }

  .pf-submit {
    width: 100%; padding: 13px;
    background: linear-gradient(135deg, var(--accent), var(--accent2));
    color: #fff; border: none; border-radius: 10px;
    font-family: 'Lato', sans-serif; font-size: 0.88rem;
    font-weight: 700; letter-spacing: 0.03em; cursor: pointer;
    box-shadow: 0 4px 16px rgba(26,86,219,0.28);
    transition: opacity 0.15s, transform 0.1s;
  }
  .pf-submit:hover { opacity: 0.92; transform: translateY(-1px); }
  .pf-submit:disabled { opacity: 0.55; cursor: not-allowed; transform: none; }
  .pf-error {
    background: #fff0f0; border: 1.5px solid #fca5a5; border-radius: 10px;
    padding: 11px 16px; color: #b91c1c; font-size: 0.8rem;
    font-weight: 600; margin-bottom: 18px; display: flex; align-items: center; gap: 8px;
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
    lab_id: 1,
  });
  const [labs, setLabs] = useState([]);
  const [labsLoading, setLabsLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    api.get("/labs")
      .then((r) => {
          console.log(r.data);
          setLabs(Array.isArray(r.data) ? r.data : [])})
      .catch(console.error)
      .finally(() => setLabsLoading(false));


  }, []);

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

  // progress: name, lastName, birthday, degree, lab (5 steps)
  const filled = [
    formData.name,
    formData.lastName,
    formData.birthday,
    formData.degree,
    formData.lab_id,
  ].filter(Boolean).length;

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
            {[0, 1, 2, 3, 4].map((i) => (
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
                  className="pf-input" type="text" name="name"
                  value={formData.name} onChange={handleChange}
                  placeholder="Jane" required
                />
              </div>
              <div className="pf-field">
                <label className="pf-label">Last Name <sup>*</sup></label>
                <input
                  className="pf-input" type="text" name="lastName"
                  value={formData.lastName} onChange={handleChange}
                  placeholder="Doe" required
                />
              </div>
            </div>

            <div className="pf-field">
              <label className="pf-label">Date of Birth <sup>*</sup></label>
              <input
                className="pf-input" type="date" name="birthday"
                value={formData.birthday} onChange={handleChange} required
              />
            </div>

            <div className="pf-divider" />

            {/* Academic info */}
            <div className="pf-section-label">🔬 Academic Details</div>

            <div className="pf-field">
              <label className="pf-label">ORCID iD</label>
              <input
                className="pf-input" type="text" name="orcid"
                value={formData.orcid} onChange={handleChange}
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
                    key={d.value} type="button"
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

            {/* Lab selection */}
            <div className="pf-section-label">🏛 Research Laboratory</div>

            <div className="pf-field">
              <label className="pf-label">Choose your lab</label>

              {labsLoading ? (
                <div className="pf-lab-loading">
                  <div className="pf-lab-spinner" />
                  Loading laboratories…
                </div>
              ) : (
                <div className="pf-lab-grid">
                  {labs.map((lab) => {
                    const isActive = formData.lab_id === lab.id;
                    return (
                      <button
                        key={lab.id}
                        type="button"
                        className={`pf-lab-btn ${isActive ? "active" : ""}`}
                        onClick={() => setFormData({ ...formData, lab_id: isActive ? null : lab.id })}
                      >
                        <div className="pf-lab-radio">
                          {isActive && <div className="pf-lab-radio-dot" />}
                        </div>
                        <div>
                          <div className="pf-lab-name">{lab.name}</div>
                          {lab.info && <div className="pf-lab-info">{lab.info}</div>}
                        </div>
                      </button>
                    );
                  })}

                  {/* None / skip option */}

                </div>
              )}


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
