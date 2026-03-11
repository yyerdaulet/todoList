import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api";

/* ─── Font + styles ──────────────────────────────────────────────────────── */
const fontLink = document.createElement("link");
fontLink.rel = "stylesheet";
fontLink.href =
  "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=Lato:wght@300;400;700&display=swap";
if (!document.head.querySelector('link[href*="Playfair"]')) {
  document.head.appendChild(fontLink);
}

const styleTag = document.createElement("style");
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

  .ca-page {
    font-family: 'Lato', sans-serif;
    color: var(--ink);
    min-height: 100vh;
    background: var(--bg);
    padding: 48px 16px 80px;
  }

  .ca-wrap { max-width: 760px; margin: 0 auto; }

  /* ── back link ── */
  .ca-back {
    display: inline-flex; align-items: center; gap: 6px;
    color: var(--muted); font-size: 0.8rem; font-weight: 700;
    text-decoration: none; text-transform: uppercase; letter-spacing: 0.06em;
    margin-bottom: 28px;
    transition: color 0.15s;
  }
  .ca-back:hover { color: var(--accent); }

  /* ── hero strip ── */
  .ca-hero {
    background: linear-gradient(135deg, #0f1923 0%, #1a2e46 60%, #1a56db 100%);
    border-radius: 20px;
    padding: 36px 44px;
    margin-bottom: 32px;
    position: relative;
    overflow: hidden;
    color: #fff;
    box-shadow: 0 8px 40px rgba(15,25,35,0.22);
  }
  .ca-hero::before {
    content: '';
    position: absolute;
    top: -50px; right: -50px;
    width: 220px; height: 220px;
    border-radius: 50%;
    background: rgba(26,86,219,0.18);
  }
  .ca-hero-title {
    font-family: 'Playfair Display', serif;
    font-size: 1.8rem;
    font-weight: 700;
    letter-spacing: -0.02em;
    position: relative; z-index: 1;
  }
  .ca-hero-sub {
    color: rgba(255,255,255,0.55);
    font-size: 0.82rem;
    margin-top: 6px;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    position: relative; z-index: 1;
  }

  /* ── card ── */
  .ca-card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 18px;
    padding: 36px 40px;
    box-shadow: 0 2px 16px rgba(0,0,0,0.06);
    margin-bottom: 20px;
  }

  .ca-section-label {
    font-size: 0.68rem;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: var(--accent);
    font-weight: 800;
    margin-bottom: 18px;
    padding-bottom: 10px;
    border-bottom: 2px solid #eef3ff;
  }

  /* ── field ── */
  .ca-field { margin-bottom: 22px; }
  .ca-label {
    display: block;
    font-size: 0.78rem;
    font-weight: 700;
    color: var(--ink2);
    text-transform: uppercase;
    letter-spacing: 0.06em;
    margin-bottom: 7px;
  }
  .ca-label sup { color: #e63946; margin-left: 2px; }

  .ca-input, .ca-textarea {
    width: 100%;
    border: 1.5px solid var(--border);
    border-radius: 10px;
    padding: 11px 15px;
    font-family: 'Lato', sans-serif;
    font-size: 0.9rem;
    color: var(--ink);
    background: #fafbfc;
    transition: border-color 0.18s, box-shadow 0.18s, background 0.18s;
    outline: none;
  }
  .ca-input:focus, .ca-textarea:focus {
    border-color: var(--accent);
    box-shadow: 0 0 0 3px rgba(26,86,219,0.10);
    background: #fff;
  }
  .ca-input::placeholder, .ca-textarea::placeholder { color: #b0bac4; }

  .ca-textarea { resize: vertical; min-height: 130px; line-height: 1.65; }

  /* ── hint ── */
  .ca-hint { font-size: 0.73rem; color: var(--muted); margin-top: 5px; }

  /* ── two-col grid ── */
  .ca-grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 0 24px; }
  @media (max-width: 580px) { .ca-grid-2 { grid-template-columns: 1fr; } }

  /* ── actions ── */
  .ca-actions {
    display: flex; gap: 12px; align-items: center;
    padding-top: 8px;
  }

  .ca-btn-primary {
    display: inline-flex; align-items: center; gap: 8px;
    background: var(--accent);
    color: #fff;
    border: none;
    border-radius: 10px;
    padding: 12px 28px;
    font-family: 'Lato', sans-serif;
    font-size: 0.85rem;
    font-weight: 700;
    letter-spacing: 0.03em;
    cursor: pointer;
    box-shadow: 0 3px 14px rgba(26,86,219,0.28);
    transition: background 0.15s, transform 0.1s;
  }
  .ca-btn-primary:hover { background: var(--accent2); transform: translateY(-1px); }
  .ca-btn-primary:disabled { opacity: 0.6; cursor: not-allowed; transform: none; }

  .ca-btn-ghost {
    background: none;
    border: 1.5px solid var(--border);
    border-radius: 10px;
    padding: 12px 22px;
    font-family: 'Lato', sans-serif;
    font-size: 0.85rem;
    font-weight: 700;
    color: var(--muted);
    cursor: pointer;
    transition: border-color 0.15s, color 0.15s;
  }
  .ca-btn-ghost:hover { border-color: var(--ink2); color: var(--ink2); }

  /* ── error banner ── */
  .ca-error {
    background: #fff0f0;
    border: 1.5px solid #fca5a5;
    border-radius: 10px;
    padding: 12px 18px;
    color: #b91c1c;
    font-size: 0.82rem;
    font-weight: 600;
    margin-bottom: 20px;
    display: flex; align-items: center; gap: 8px;
  }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(14px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .ca-animate { animation: fadeUp 0.35s ease both; }
`;
if (!document.head.querySelector("style[data-ca]")) {
  styleTag.setAttribute("data-ca", "1");
  document.head.appendChild(styleTag);
}

/* ─── Field helpers ──────────────────────────────────────────────────────── */
function Field({ label, hint, required, children }) {
  return (
    <div className="ca-field">
      <label className="ca-label">
        {label}{required && <sup>*</sup>}
      </label>
      {children}
      {hint && <div className="ca-hint">{hint}</div>}
    </div>
  );
}

/* ─── Page ───────────────────────────────────────────────────────────────── */
export default function CreateArticlePage() {
  const { profile_id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    authors: "",
    publication_year: "",
    cited_by_count: "",
    referenced_works_count: "",
    doi: "",
    description: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      await api.post(`/profiles/${profile_id}/articles`, formData);
      navigate(`/profiles/${profile_id}`);
    } catch (err) {
      console.error("Error creating article:", err);
      setError("Something went wrong. Please check your inputs and try again.");
      setSubmitting(false);
    }
  };

  return (
    <div className="ca-page">
      <div className="ca-wrap">

        {/* Back */}
        <button className="ca-back" onClick={() => navigate(-1)}>
          ← Back to Profile
        </button>

        {/* Hero */}
        <div className="ca-hero ca-animate">
          <div className="ca-hero-title">Add New Publication</div>
          <div className="ca-hero-sub">Manually register an article to your profile</div>
        </div>

        {error && (
          <div className="ca-error ca-animate">
            ⚠️ {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>

          {/* ── Core info ── */}
          <div className="ca-card ca-animate" style={{ animationDelay: "0.05s" }}>
            <div className="ca-section-label">📄 Article Information</div>

            <Field label="Title" required>
              <input
                className="ca-input"
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Full title of the publication"
                required
              />
            </Field>

            <Field label="Authors" hint='Separate multiple authors with ", "  e.g. John Smith, Jane Doe'>
              <input
                className="ca-input"
                type="text"
                name="authors"
                value={formData.authors}
                onChange={handleChange}
                placeholder="Author One, Author Two, Author Three"
              />
            </Field>

            <Field label="Description / Abstract">
              <textarea
                className="ca-textarea"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Paste or write the abstract here…"
              />
            </Field>
          </div>

          {/* ── Publication details ── */}
          <div className="ca-card ca-animate" style={{ animationDelay: "0.1s" }}>
            <div className="ca-section-label">📊 Publication Details</div>

            <div className="ca-grid-2">
              <Field label="Publication Year">
                <input
                  className="ca-input"
                  type="number"
                  name="publication_year"
                  value={formData.publication_year}
                  onChange={handleChange}
                  placeholder="e.g. 2023"
                  min="1900"
                  max={new Date().getFullYear() + 1}
                />
              </Field>

              <Field label="DOI" hint="Include full URL or bare identifier">
                <input
                  className="ca-input"
                  type="text"
                  name="doi"
                  value={formData.doi}
                  onChange={handleChange}
                  placeholder="https://doi.org/10.xxxx/…"
                />
              </Field>

              <Field label="Citations">
                <input
                  className="ca-input"
                  type="number"
                  name="cited_by_count"
                  value={formData.cited_by_count}
                  onChange={handleChange}
                  placeholder="0"
                  min="0"
                />
              </Field>

              <Field label="Referenced Works">
                <input
                  className="ca-input"
                  type="number"
                  name="referenced_works_count"
                  value={formData.referenced_works_count}
                  onChange={handleChange}
                  placeholder="0"
                  min="0"
                />
              </Field>
            </div>
          </div>

          {/* ── Actions ── */}
          <div className="ca-actions ca-animate" style={{ animationDelay: "0.15s" }}>
            <button type="submit" className="ca-btn-primary" disabled={submitting}>
              {submitting ? "⏳ Saving…" : "✓ Create Article"}
            </button>
            <button
              type="button"
              className="ca-btn-ghost"
              onClick={() => navigate(-1)}
              disabled={submitting}
            >
              Cancel
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
