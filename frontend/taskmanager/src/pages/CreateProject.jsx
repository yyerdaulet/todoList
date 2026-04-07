import { useState,useRef} from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api";

/* ─── Font ───────────────────────────────────────────────────────────────── */
const fontLink = document.createElement("link");
fontLink.rel = "stylesheet";
fontLink.href = "https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,300;0,600;0,700;1,300&family=DM+Sans:wght@300;400;500;600&display=swap";
document.head.appendChild(fontLink);

/* ─── Styles ─────────────────────────────────────────────────────────────── */
const styleTag = document.createElement("style");
styleTag.textContent = `
  :root {
    --cp-bg:       #f5f7fa;
    --cp-surface:  #ffffff;
    --cp-surface2: #f0f2f7;
    --cp-border:   #d0d7de;
    --cp-border2:  #bcc3d0;
    --cp-ink:      #0d1117;
    --cp-ink2:     #4a5568;
    --cp-muted:    #8a94a8;
    --cp-accent:   #2563eb;
    --cp-accent2:  #1d4ed8;
    --cp-accent-g: linear-gradient(135deg, #2563eb, #7c3aed);
    --cp-green:    #16a34a;
    --cp-gold:     #d97706;
    --cp-red:      #dc2626;
    --cp-radius:   14px;
    --cp-radius-lg:20px;
  }

  * { box-sizing: border-box; margin: 0; padding: 0; }

  .cp-root {
    font-family: 'DM Sans', sans-serif;
    background: var(--cp-bg);
    min-height: 100vh;
    color: var(--cp-ink);
    padding: 0;
  }

  /* ── split layout ── */
  .cp-layout {
    display: grid;
    grid-template-columns: 380px 1fr;
    min-height: 100vh;
  }
  @media (max-width: 860px) {
    .cp-layout { grid-template-columns: 1fr; }
    .cp-sidebar { display: none; }
  }

  /* ── left sidebar ── */
  .cp-sidebar {
    background: linear-gradient(170deg, #1e3a8a 0%, #1e40af 50%, #2563eb 100%);
    border-right: 1px solid var(--cp-border);
    padding: 60px 44px;
    position: sticky;
    top: 0;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    overflow: hidden;
  }
  .cp-sidebar::before {
    content: '';
    position: absolute;
    top: -100px; left: -100px;
    width: 400px; height: 400px;
    background: radial-gradient(circle, rgba(79,124,255,0.12) 0%, transparent 70%);
    pointer-events: none;
  }
  .cp-sidebar::after {
    content: '';
    position: absolute;
    bottom: -80px; right: -80px;
    width: 300px; height: 300px;
    background: radial-gradient(circle, rgba(167,139,250,0.08) 0%, transparent 70%);
    pointer-events: none;
  }

  .cp-sidebar-logo {
    font-family: 'Fraunces', serif;
    font-size: 0.75rem;
    font-weight: 300;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.5);
    margin-bottom: 60px;
    position: relative; z-index: 1;
  }

  .cp-sidebar-heading {
    font-family: 'Fraunces', serif;
    font-size: clamp(2rem, 3vw, 2.8rem);
    font-weight: 600;
    line-height: 1.2;
    color: #ffffff;
    margin-bottom: 20px;
    position: relative; z-index: 1;
  }
  .cp-sidebar-heading em {
    font-style: italic;
    font-weight: 300;
    background: var(--cp-accent-g);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .cp-sidebar-desc {
    font-size: 0.85rem;
    color: rgba(255,255,255,0.7);
    line-height: 1.7;
    font-weight: 300;
    position: relative; z-index: 1;
  }

  .cp-steps {
    position: relative; z-index: 1;
    display: flex;
    flex-direction: column;
    gap: 0;
  }
  .cp-step {
    display: flex;
    align-items: flex-start;
    gap: 16px;
    padding: 14px 0;
    border-bottom: 1px solid var(--cp-border);
    cursor: default;
    transition: opacity 0.2s;
  }
  .cp-step:last-child { border-bottom: none; }
  .cp-step-dot {
    width: 28px; height: 28px;
    border-radius: 50%;
    border: 1.5px solid var(--cp-border2);
    background: var(--cp-surface);
    display: flex; align-items: center; justify-content: center;
    font-size: 0.68rem; font-weight: 700;
    color: var(--cp-muted);
    flex-shrink: 0;
    margin-top: 1px;
    transition: all 0.25s;
  }
  .cp-step.active .cp-step-dot {
    background: var(--cp-accent);
    border-color: var(--cp-accent);
    color: #fff;
    box-shadow: 0 0 14px rgba(79,124,255,0.4);
  }
  .cp-step.done .cp-step-dot {
    background: var(--cp-green);
    border-color: var(--cp-green);
    color: #fff;
  }
  .cp-step-label { font-size: 0.82rem; font-weight: 500; color: var(--cp-ink2); margin-bottom: 2px; }
  .cp-step.active .cp-step-label { color: var(--cp-ink); }
  .cp-step-sub { font-size: 0.72rem; color: var(--cp-muted); }

  /* ── right content ── */
  .cp-content {
    padding: 60px 64px 80px;
    overflow-y: auto;
  }
  @media (max-width: 1100px) { .cp-content { padding: 40px 32px 60px; } }

  .cp-top-bar {
    display: flex; align-items: center; justify-content: space-between;
    margin-bottom: 48px;
  }
  .cp-back-btn {
    display: inline-flex; align-items: center; gap: 8px;
    background: var(--cp-surface);
    border: 1px solid var(--cp-border);
    border-radius: 10px;
    padding: 9px 16px;
    font-size: 0.8rem; font-weight: 500;
    color: var(--cp-ink2);
    cursor: pointer;
    text-decoration: none;
    transition: border-color 0.15s, color 0.15s;
  }
  .cp-back-btn:hover { border-color: var(--cp-accent); color: var(--cp-ink); }

  .cp-progress-bar {
    height: 3px;
    background: var(--cp-border);
    border-radius: 99px;
    width: 200px;
    overflow: hidden;
  }
  .cp-progress-fill {
    height: 100%;
    background: var(--cp-accent-g);
    border-radius: 99px;
    transition: width 0.4s cubic-bezier(0.4,0,0.2,1);
  }

  /* ── section title ── */
  .cp-section-eyebrow {
    font-size: 0.68rem;
    font-weight: 600;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: var(--cp-accent);
    margin-bottom: 8px;
  }
  .cp-section-title {
    font-family: 'Fraunces', serif;
    font-size: 1.7rem;
    font-weight: 600;
    color: var(--cp-ink);
    margin-bottom: 6px;
    line-height: 1.2;
  }
  .cp-section-sub {
    font-size: 0.82rem;
    color: var(--cp-ink2);
    margin-bottom: 36px;
    font-weight: 300;
  }

  /* ── form fields ── */
  .cp-field { margin-bottom: 24px; }
  .cp-label {
    display: block;
    font-size: 0.78rem;
    font-weight: 600;
    color: var(--cp-ink2);
    letter-spacing: 0.04em;
    text-transform: uppercase;
    margin-bottom: 8px;
  }
  .cp-label span { color: var(--cp-accent); margin-left: 2px; }

  .cp-input, .cp-textarea {
    width: 100%;
    background: var(--cp-surface);
    border: 1px solid var(--cp-border);
    border-radius: var(--cp-radius);
    padding: 13px 16px;
    font-size: 0.9rem;
    font-family: 'DM Sans', sans-serif;
    color: var(--cp-ink);
    outline: none;
    transition: border-color 0.2s, box-shadow 0.2s;
  }
  .cp-input::placeholder, .cp-textarea::placeholder { color: var(--cp-muted); }
  .cp-input:focus, .cp-textarea:focus {
    border-color: var(--cp-accent);
    box-shadow: 0 0 0 3px rgba(79,124,255,0.12);
  }
  .cp-textarea { resize: vertical; min-height: 110px; line-height: 1.6; }

  /* ── tag input ── */
  .cp-tag-wrap {
    background: var(--cp-surface);
    border: 1px solid var(--cp-border);
    border-radius: var(--cp-radius);
    padding: 10px 12px;
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    transition: border-color 0.2s, box-shadow 0.2s;
    cursor: text;
  }
  .cp-tag-wrap:focus-within {
    border-color: var(--cp-accent);
    box-shadow: 0 0 0 3px rgba(79,124,255,0.12);
  }
  .cp-tag {
    display: inline-flex; align-items: center; gap: 6px;
    background: rgba(79,124,255,0.15);
    border: 1px solid rgba(79,124,255,0.3);
    border-radius: 7px;
    padding: 4px 10px;
    font-size: 0.8rem;
    color: #a0b4ff;
    font-weight: 500;
  }
  .cp-tag-remove {
    background: none; border: none; cursor: pointer;
    color: #6b80cc; font-size: 0.9rem; line-height: 1;
    padding: 0; display: flex; align-items: center;
    transition: color 0.15s;
  }
  .cp-tag-remove:hover { color: var(--cp-red); }
  .cp-tag-input {
    background: none; border: none; outline: none;
    font-size: 0.88rem; font-family: 'DM Sans', sans-serif;
    color: var(--cp-ink); flex: 1; min-width: 140px;
    padding: 4px 4px;
  }
  .cp-tag-input::placeholder { color: var(--cp-muted); }
  .cp-tag-hint { font-size: 0.7rem; color: var(--cp-muted); margin-top: 6px; }

  /* ── author search ── */
  .cp-author-search-wrap { position: relative; }
  .cp-author-results {
    position: absolute; top: calc(100% + 6px); left: 0; right: 0;
    background: var(--cp-surface2);
    border: 1px solid var(--cp-border2);
    border-radius: var(--cp-radius);
    box-shadow: 0 12px 40px rgba(0,0,0,0.4);
    z-index: 100;
    overflow: hidden;
    max-height: 240px;
    overflow-y: auto;
  }
  .cp-author-item {
    display: flex; align-items: center; gap: 12px;
    padding: 12px 16px;
    cursor: pointer;
    transition: background 0.15s;
    border-bottom: 1px solid var(--cp-border);
  }
  .cp-author-item:last-child { border-bottom: none; }
  .cp-author-item:hover { background: rgba(79,124,255,0.08); }
  .cp-author-avatar {
    width: 36px; height: 36px; border-radius: 50%;
    background: linear-gradient(135deg, #2d3561, #4f7cff);
    display: flex; align-items: center; justify-content: center;
    font-size: 0.8rem; font-weight: 700; color: #fff;
    flex-shrink: 0;
  }
  .cp-author-name { font-size: 0.85rem; font-weight: 600; color: var(--cp-ink); }
  .cp-author-meta { font-size: 0.72rem; color: var(--cp-muted); margin-top: 1px; }

  .cp-selected-authors {
    display: flex; flex-wrap: wrap; gap: 8px;
    margin-top: 12px;
  }
  .cp-author-chip {
    display: inline-flex; align-items: center; gap: 8px;
    background: var(--cp-surface2);
    border: 1px solid var(--cp-border2);
    border-radius: 100px;
    padding: 6px 12px 6px 8px;
    font-size: 0.8rem;
    color: var(--cp-ink2);
  }
  .cp-author-chip-avatar {
    width: 22px; height: 22px; border-radius: 50%;
    background: linear-gradient(135deg, #2d3561, #4f7cff);
    display: flex; align-items: center; justify-content: center;
    font-size: 0.6rem; font-weight: 700; color: #fff;
    flex-shrink: 0;
  }
  .cp-author-chip-remove {
    background: none; border: none; cursor: pointer;
    color: var(--cp-muted); font-size: 1rem; line-height: 1;
    display: flex; align-items: center; padding: 0;
    transition: color 0.15s;
  }
  .cp-author-chip-remove:hover { color: var(--cp-red); }

  /* ── two col grid ── */
  .cp-grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
  @media (max-width: 700px) { .cp-grid-2 { grid-template-columns: 1fr; } }

  /* ── nav buttons ── */
  .cp-nav { display: flex; justify-content: space-between; align-items: center; margin-top: 40px; padding-top: 32px; border-top: 1px solid var(--cp-border); }
  .cp-btn-ghost {
    background: none;
    border: 1px solid var(--cp-border);
    border-radius: 12px;
    padding: 12px 24px;
    font-size: 0.85rem; font-weight: 600;
    color: var(--cp-ink2);
    cursor: pointer;
    font-family: 'DM Sans', sans-serif;
    transition: border-color 0.15s, color 0.15s;
  }
  .cp-btn-ghost:hover { border-color: var(--cp-border2); color: var(--cp-ink); }

  .cp-btn-primary {
    background: var(--cp-accent);
    border: none;
    border-radius: 12px;
    padding: 12px 28px;
    font-size: 0.85rem; font-weight: 600;
    color: #fff;
    cursor: pointer;
    font-family: 'DM Sans', sans-serif;
    transition: opacity 0.15s, transform 0.1s;
    box-shadow: 0 4px 16px rgba(79,124,255,0.3);
    display: inline-flex; align-items: center; gap: 8px;
  }
  .cp-btn-primary:hover { opacity: 0.88; transform: translateY(-1px); }
  .cp-btn-primary:disabled { opacity: 0.4; cursor: not-allowed; transform: none; }

  /* ── review card ── */
  .cp-review-card {
    background: var(--cp-surface);
    border: 1px solid var(--cp-border);
    border-radius: var(--cp-radius-lg);
    padding: 24px 28px;
    margin-bottom: 16px;
  }
  .cp-review-label {
    font-size: 0.68rem; font-weight: 600;
    letter-spacing: 0.12em; text-transform: uppercase;
    color: var(--cp-muted); margin-bottom: 8px;
  }
  .cp-review-value {
    font-size: 0.9rem; color: var(--cp-ink); line-height: 1.6;
  }
  .cp-review-tags { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 4px; }
  .cp-review-tag {
    background: var(--cp-surface2);
    border: 1px solid var(--cp-border2);
    border-radius: 6px;
    padding: 3px 10px;
    font-size: 0.77rem; color: var(--cp-ink2);
  }

  /* ── success ── */
  .cp-success {
    display: flex; flex-direction: column; align-items: center;
    justify-content: center; min-height: 60vh; text-align: center;
  }
  .cp-success-icon {
    width: 80px; height: 80px; border-radius: 50%;
    background: rgba(52,211,153,0.12);
    border: 2px solid rgba(52,211,153,0.3);
    display: flex; align-items: center; justify-content: center;
    font-size: 2rem; margin-bottom: 24px;
    animation: pop 0.4s cubic-bezier(0.34,1.56,0.64,1) both;
  }
  @keyframes pop { from { transform: scale(0.5); opacity: 0; } to { transform: scale(1); opacity: 1; } }

  .cp-error { font-size: 0.78rem; color: var(--cp-red); margin-top: 6px; }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(16px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .cp-fade { animation: fadeUp 0.35s ease both; }
`;
document.head.appendChild(styleTag);

/* ─── Steps config ───────────────────────────────────────────────────────── */
const STEPS = [
  { label: "Basics",  sub: "Title & purpose" },
  { label: "Details", sub: "Tasks & result" },
  { label: "Authors", sub: "Team members" },
  { label: "Review",  sub: "Confirm & submit" },
];

/* ─── TagInput ───────────────────────────────────────────────────────────── */
function TagInput({ tags, onChange, placeholder }) {
  const [input, setInput] = useState("");

  const add = (val) => {
    const v = val.trim();
    if (v && !tags.includes(v)) onChange([...tags, v]);
    setInput("");
  };

  const remove = (i) => onChange(tags.filter((_, idx) => idx !== i));

  return (
    <>
      <div className="cp-tag-wrap" onClick={() => document.getElementById("cp-tag-input-el")?.focus()}>
        {tags.map((t, i) => (
          <span key={i} className="cp-tag">
            {t}
            <button className="cp-tag-remove" onClick={() => remove(i)}>×</button>
          </span>
        ))}
        <input
          id="cp-tag-input-el"
          className="cp-tag-input"
          value={input}
          placeholder={tags.length === 0 ? placeholder : "Add more..."}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === ",") { e.preventDefault(); add(input); }
            if (e.key === "Backspace" && !input && tags.length) remove(tags.length - 1);
          }}
          onBlur={() => { if (input.trim()) add(input); }}
        />
      </div>
      <div className="cp-tag-hint">Press Enter or comma to add</div>
    </>
  );
}

/* ─── AuthorSearch ───────────────────────────────────────────────────────── */
function AuthorSearch({ selected, onChange }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const debounceRef = useRef(null);

  const search = (q) => {
    setQuery(q);
    if (q.length < 2) { setResults([]); return; }

    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await api.get(`/profiles/search?query=${encodeURIComponent(q)}`);
        setResults(res.data.filter(p => !selected.find(s => s.orcid === p.orcid)));
      } catch {
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, 400);
  };

  const add = (profile) => {
    onChange([...selected, profile]);
    setQuery("");
    setResults([]);
  };

  const remove = (id) => onChange(selected.filter(p => p.id !== id));

  const initials = (p) => `${p.name?.[0] ?? ""}${p.lastName?.[0] ?? ""}`.toUpperCase();

  return (
    <>
      <div className="cp-author-search-wrap">
        <input
          className="cp-input"
          value={query}
          onChange={(e) => search(e.target.value)}
          placeholder="Search by name, last name or ORCID..."
        />
        {(results.length > 0 || loading) && (
          <div className="cp-author-results">
            {loading && <div style={{ padding: "14px 16px", fontSize: "0.8rem", color: "var(--cp-muted)" }}>Searching...</div>}
            {results.map(p => (
              <div key={p.id} className="cp-author-item" onClick={() => add(p)}>
                <div className="cp-author-avatar">{initials(p)}</div>
                <div>
                  <div className="cp-author-name">{p.name} {p.lastName}</div>
                  <div className="cp-author-meta">{p.degree ?? ""}{p.orcid ? ` · ${p.orcid}` : ""}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      {selected.length > 0 && (
        <div className="cp-selected-authors">
          {selected.map(p => (
            <div key={p.id} className="cp-author-chip">
              <div className="cp-author-chip-avatar">{initials(p)}</div>
              {p.name} {p.lastName}
              <button className="cp-author-chip-remove" onClick={() => remove(p.id)}>×</button>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

/* ─── Main ───────────────────────────────────────────────────────────────── */
export default function CreateProject() {
  const navigate = useNavigate();
  const { profile_id } = useParams();

  const [step, setStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    title:   "",
    purpose: "",
    result:  "",
    authors: [],
  });

  const set = (key, val) => setForm(f => ({ ...f, [key]: val }));

  const progress = ((step + 1) / STEPS.length) * 100;

  /* validation per step */
 const canNext = () => {
   if (step === 0) return form.title.trim() && form.purpose.trim();
   if (step === 1) return form.result.trim();
   return true;
 };

  const handleSubmit = async () => {
    setSubmitting(true);
    setError("");
    try {
      await api.post(`/profiles/${profile_id}/projects`, {
        title:   form.title,
        purpose: form.purpose,
        result:  form.result,
        authors: form.authors,
      });
      setSubmitted(true);
    } catch (e) {
      setError(e?.response?.data?.message || "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  /* ── Success screen ── */
  if (submitted) {
    return (
      <div className="cp-root">
        <div className="cp-content cp-success">
          <div className="cp-success-icon">✓</div>
          <div style={{ fontFamily: "'Fraunces', serif", fontSize: "1.8rem", fontWeight: 600, marginBottom: 12 }}>
            Project Created!
          </div>
          <div style={{ color: "var(--cp-ink2)", fontSize: "0.88rem", marginBottom: 32 }}>
            "{form.title}" has been added to your profile.
          </div>
          <div style={{ display: "flex", gap: 12 }}>
            <button className="cp-btn-ghost" onClick={() => { setSubmitted(false); setStep(0); setForm({ title: "", purpose: "", tasks: [], result: "", authors: [] }); }}>
              + New Project
            </button>
            <button className="cp-btn-primary" onClick={() => navigate(`/profiles/${profile_id}`)}>
              Back to Profile →
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="cp-root">
      <div className="cp-layout">

        {/* ── Sidebar ── */}
        <div className="cp-sidebar">
          <div>
            <div className="cp-sidebar-logo">Lab Research Portal</div>
            <div className="cp-sidebar-heading">
              Create a<br /><em>new project</em>
            </div>
            <div className="cp-sidebar-desc">
              Define your research project, list the key tasks, expected results, and bring your team together.
            </div>
          </div>

          <div className="cp-steps">
            {STEPS.map((s, i) => (
              <div key={i} className={`cp-step ${i === step ? "active" : i < step ? "done" : ""}`}>
                <div className="cp-step-dot">{i < step ? "✓" : i + 1}</div>
                <div>
                  <div className="cp-step-label">{s.label}</div>
                  <div className="cp-step-sub">{s.sub}</div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ fontSize: "0.7rem", color: "var(--cp-muted)" }}>
            Step {step + 1} of {STEPS.length}
          </div>
        </div>

        {/* ── Content ── */}
        <div className="cp-content">

          {/* top bar */}
          <div className="cp-top-bar">
            <button className="cp-back-btn" onClick={() => step > 0 ? setStep(s => s - 1) : navigate(`/profiles/${profile_id}`)}>
              ← {step > 0 ? "Back" : "Cancel"}
            </button>
            <div>
              <div style={{ fontSize: "0.68rem", color: "var(--cp-muted)", marginBottom: 6, textAlign: "right" }}>
                {Math.round(progress)}% complete
              </div>
              <div className="cp-progress-bar">
                <div className="cp-progress-fill" style={{ width: `${progress}%` }} />
              </div>
            </div>
          </div>

          {/* ── Step 0: Basics ── */}
          {step === 0 && (
            <div className="cp-fade">
              <div className="cp-section-eyebrow">Step 1</div>
              <div className="cp-section-title">Project Basics</div>
              <div className="cp-section-sub">Give your project a clear title and describe its main purpose.</div>

              <div className="cp-field">
                <label className="cp-label">Project Title <span>*</span></label>
                <input
                  className="cp-input"
                  value={form.title}
                  onChange={(e) => set("title", e.target.value)}
                  placeholder="e.g. Machine Learning for Climate Prediction"
                />
              </div>

              <div className="cp-field">
                <label className="cp-label">Purpose <span>*</span></label>
                <textarea
                  className="cp-textarea"
                  value={form.purpose}
                  onChange={(e) => set("purpose", e.target.value)}
                  placeholder="What is the main goal of this project? What problem does it solve?"
                  style={{ minHeight: 140 }}
                />
              </div>
            </div>
          )}

          {/* ── Step 1: Details ── */}
          {step === 1 && (
            <div className="cp-fade">
              <div className="cp-section-eyebrow">Step 2</div>
              <div className="cp-section-title">Expected Result</div>
              <div className="cp-section-sub">Describe what success looks like for this project.</div>

              <div className="cp-field">
                <label className="cp-label">Expected Result <span>*</span></label>
                <textarea
                  className="cp-textarea"
                  value={form.result}
                  onChange={(e) => set("result", e.target.value)}
                  placeholder="What is the expected outcome or deliverable of this project?"
                  style={{ minHeight: 140 }}
                />
              </div>
            </div>
          )}

          {/* ── Step 2: Authors ── */}
          {step === 2 && (
            <div className="cp-fade">
              <div className="cp-section-eyebrow">Step 3</div>
              <div className="cp-section-title">Team Members</div>
              <div className="cp-section-sub">Search and add researchers who will be part of this project.</div>

              <div className="cp-field">
                <label className="cp-label">Authors</label>
                <AuthorSearch selected={form.authors} onChange={(v) => set("authors", v)} />
                {form.authors.length === 0 && (
                  <div style={{ marginTop: 12, fontSize: "0.78rem", color: "var(--cp-muted)" }}>
                    You can skip this step and add authors later.
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ── Step 3: Review ── */}
          {step === 3 && (
            <div className="cp-fade">
              <div className="cp-section-eyebrow">Step 4</div>
              <div className="cp-section-title">Review & Submit</div>
              <div className="cp-section-sub">Double-check everything before creating your project.</div>

              <div className="cp-review-card">
                <div className="cp-review-label">Title</div>
                <div className="cp-review-value">{form.title}</div>
              </div>

              <div className="cp-review-card">
                <div className="cp-review-label">Purpose</div>
                <div className="cp-review-value">{form.purpose}</div>
              </div>

              <div className="cp-review-card">
                <div className="cp-review-label">Expected Result</div>
                <div className="cp-review-value">{form.result}</div>
              </div>

              <div className="cp-review-card">
                <div className="cp-review-label">Team Members ({form.authors.length})</div>
                <div className="cp-review-tags">
                  {form.authors.length === 0
                    ? <span style={{ color: "var(--cp-muted)", fontSize: "0.82rem" }}>No authors added</span>
                    : form.authors.map(a => (
                        <span key={a.id} className="cp-review-tag">{a.name} {a.lastName}</span>
                      ))
                  }
                </div>
              </div>

              {error && <div className="cp-error">⚠ {error}</div>}
            </div>
          )}

          {/* ── Navigation ── */}
          <div className="cp-nav">
            <button className="cp-btn-ghost" onClick={() => step > 0 ? setStep(s => s - 1) : navigate(`/profiles/${profile_id}`)}>
              {step > 0 ? "← Previous" : "Cancel"}
            </button>

            {step < STEPS.length - 1 ? (
              <button className="cp-btn-primary" disabled={!canNext()} onClick={() => setStep(s => s + 1)}>
                Continue →
              </button>
            ) : (
              <button className="cp-btn-primary" disabled={submitting} onClick={handleSubmit}>
                {submitting ? "Creating..." : "✓ Create Project"}
              </button>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
