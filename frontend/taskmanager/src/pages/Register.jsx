import { useState } from "react";
import axios from "axios";

/* ─── Font + styles ──────────────────────────────────────────────────────── */
const fontLink = document.createElement("link");
fontLink.rel = "stylesheet";
fontLink.href =
  "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=Lato:wght@300;400;700&display=swap";
if (!document.head.querySelector('link[href*="Playfair"]')) {
  document.head.appendChild(fontLink);
}

const styleTag = document.createElement("style");
styleTag.setAttribute("data-reg", "1");
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

  .reg-page {
    font-family: 'Lato', sans-serif;
    color: var(--ink);
    min-height: 100vh;
    background: var(--bg);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 32px 16px;
  }

  .reg-shell {
    width: 100%;
    max-width: 460px;
  }

  /* ── brand mark ── */
  .reg-brand {
    text-align: center;
    margin-bottom: 28px;
  }
  .reg-brand-icon {
    width: 52px; height: 52px;
    background: linear-gradient(135deg, #1a56db, #0e3a9e);
    border-radius: 14px;
    display: inline-flex; align-items: center; justify-content: center;
    font-size: 1.4rem;
    margin-bottom: 12px;
    box-shadow: 0 4px 18px rgba(26,86,219,0.3);
  }
  .reg-brand-name {
    font-family: 'Playfair Display', serif;
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--ink);
    letter-spacing: -0.02em;
  }
  .reg-brand-sub {
    font-size: 0.78rem;
    color: var(--muted);
    margin-top: 3px;
    text-transform: uppercase;
    letter-spacing: 0.07em;
  }

  /* ── card ── */
  .reg-card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 20px;
    padding: 40px 40px 36px;
    box-shadow: 0 4px 28px rgba(15,25,35,0.08);
  }

  .reg-card-title {
    font-family: 'Playfair Display', serif;
    font-size: 1.35rem;
    font-weight: 700;
    color: var(--ink);
    margin-bottom: 4px;
    letter-spacing: -0.02em;
  }
  .reg-card-sub {
    font-size: 0.8rem;
    color: var(--muted);
    margin-bottom: 28px;
  }

  /* ── divider ── */
  .reg-divider {
    height: 1px;
    background: var(--border);
    margin: 24px 0;
  }

  /* ── field ── */
  .reg-field { margin-bottom: 18px; }
  .reg-label {
    display: block;
    font-size: 0.72rem;
    font-weight: 700;
    color: var(--ink2);
    text-transform: uppercase;
    letter-spacing: 0.07em;
    margin-bottom: 7px;
  }

  .reg-input, .reg-select {
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
  .reg-input:focus, .reg-select:focus {
    border-color: var(--accent);
    box-shadow: 0 0 0 3px rgba(26,86,219,0.10);
    background: #fff;
  }
  .reg-input::placeholder { color: #b0bac4; }

  /* select wrapper for custom arrow */
  .reg-select-wrap { position: relative; }
  .reg-select-wrap::after {
    content: '▾';
    position: absolute;
    right: 14px; top: 50%;
    transform: translateY(-50%);
    color: var(--muted);
    pointer-events: none;
    font-size: 0.8rem;
  }

  /* role toggle pills */
  .reg-role-group {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
  }
  .reg-role-btn {
    border: 1.5px solid var(--border);
    border-radius: 10px;
    padding: 10px 0;
    background: #fafbfc;
    font-family: 'Lato', sans-serif;
    font-size: 0.82rem;
    font-weight: 700;
    color: var(--muted);
    cursor: pointer;
    text-align: center;
    transition: all 0.15s;
    display: flex; align-items: center; justify-content: center; gap: 6px;
  }
  .reg-role-btn:hover { border-color: var(--accent); color: var(--accent); }
  .reg-role-btn.active {
    border-color: var(--accent);
    background: #eef3ff;
    color: var(--accent);
  }

  /* checkbox */
  .reg-check-row {
    display: flex; align-items: flex-start; gap: 10px;
    margin-bottom: 22px;
  }
  .reg-checkbox {
    width: 17px; height: 17px;
    border: 2px solid var(--border);
    border-radius: 5px;
    margin-top: 1px;
    cursor: pointer;
    accent-color: var(--accent);
    flex-shrink: 0;
  }
  .reg-check-label {
    font-size: 0.8rem;
    color: var(--muted);
    line-height: 1.5;
  }
  .reg-check-label a {
    color: var(--accent);
    font-weight: 700;
    text-decoration: none;
  }
  .reg-check-label a:hover { text-decoration: underline; }

  /* submit */
  .reg-submit {
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
  .reg-submit:hover { opacity: 0.92; transform: translateY(-1px); }
  .reg-submit:disabled { opacity: 0.55; cursor: not-allowed; transform: none; }

  /* sign in link */
  .reg-signin {
    text-align: center;
    font-size: 0.78rem;
    color: var(--muted);
    margin-top: 20px;
  }
  .reg-signin a { color: var(--accent); font-weight: 700; text-decoration: none; }
  .reg-signin a:hover { text-decoration: underline; }

  /* error */
  .reg-error {
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

  /* success state */
  .reg-success {
    text-align: center;
    padding: 12px 0 4px;
  }
  .reg-success-icon {
    width: 64px; height: 64px;
    background: linear-gradient(135deg, #059669, #047857);
    border-radius: 50%;
    display: inline-flex; align-items: center; justify-content: center;
    font-size: 1.8rem;
    margin-bottom: 18px;
    box-shadow: 0 4px 20px rgba(5,150,105,0.28);
  }
  .reg-success-title {
    font-family: 'Playfair Display', serif;
    font-size: 1.3rem;
    font-weight: 700;
    color: var(--ink);
    margin-bottom: 10px;
  }
  .reg-success-msg {
    font-size: 0.85rem;
    color: var(--muted);
    line-height: 1.65;
    max-width: 320px;
    margin: 0 auto;
  }
  .reg-success-note {
    margin-top: 20px;
    background: #f0fdf4;
    border: 1px solid #bbf7d0;
    border-radius: 10px;
    padding: 12px 16px;
    font-size: 0.78rem;
    color: #15803d;
    font-weight: 600;
  }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(16px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .reg-animate { animation: fadeUp 0.38s ease both; }
`;
if (!document.head.querySelector("style[data-reg]")) {
  document.head.appendChild(styleTag);
}

/* ─── Component ──────────────────────────────────────────────────────────── */
export default function Register() {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("USER");
  const [password, setPassword] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!agreed) { setError("You must agree to the terms and conditions."); return; }
    setError("");
    setLoading(true);
    try {
      await axios.post("http://localhost:8080/register", { email, role, password });
      setSuccessMessage(
        "We've sent a verification link to your email. Please check your inbox and confirm your account."
      );
    } catch (err) {
      console.error(err);
      setError(err?.response?.data?.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="reg-page">
      <div className="reg-shell reg-animate">

        {/* Brand */}
        <div className="reg-brand">
          <div className="reg-brand-icon">🎓</div>
          <div className="reg-brand-name">ResearchHub</div>
          <div className="reg-brand-sub">Academic Profile Platform</div>
        </div>

        <div className="reg-card">
          {successMessage ? (
            /* ── Success state ── */
            <div className="reg-success">
              <div className="reg-success-icon">✓</div>
              <div className="reg-success-title">Check your inbox</div>
              <div className="reg-success-msg">{successMessage}</div>
              <div className="reg-success-note">
                📬 Didn't receive it? Check your spam folder or try registering again.
              </div>
            </div>
          ) : (
            <>
              <div className="reg-card-title">Create an account</div>
              <div className="reg-card-sub">Join the academic research community</div>

              {error && (
                <div className="reg-error">⚠️ {error}</div>
              )}

              <form onSubmit={handleRegister}>

                {/* Email */}
                <div className="reg-field">
                  <label className="reg-label">Email Address</label>
                  <input
                    className="reg-input"
                    type="email"
                    placeholder="you@university.edu"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                {/* Password */}
                <div className="reg-field">
                  <label className="reg-label">Password</label>
                  <div style={{ position: "relative" }}>
                    <input
                      className="reg-input"
                      type={showPassword ? "text" : "password"}
                      placeholder="Min. 8 characters"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      style={{ paddingRight: 44 }}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((v) => !v)}
                      style={{
                        position: "absolute", right: 12, top: "50%",
                        transform: "translateY(-50%)",
                        background: "none", border: "none",
                        cursor: "pointer", fontSize: "1rem", color: "var(--muted)",
                        lineHeight: 1, padding: 0,
                      }}
                      tabIndex={-1}
                    >
                      {showPassword ? "🙈" : "👁️"}
                    </button>
                  </div>
                </div>

                {/* Role */}
                <div className="reg-field">
                  <label className="reg-label">Account Type</label>
                  <div className="reg-role-group">
                    {[
                      { value: "USER", label: "Researcher", icon: "🔬" },
                      { value: "ADMIN", label: "Admin", icon: "⚙️" },
                    ].map((r) => (
                      <button
                        key={r.value}
                        type="button"
                        className={`reg-role-btn ${role === r.value ? "active" : ""}`}
                        onClick={() => setRole(r.value)}
                      >
                        <span>{r.icon}</span> {r.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="reg-divider" />

                {/* Terms */}
                <div className="reg-check-row">
                  <input
                    className="reg-checkbox"
                    type="checkbox"
                    id="terms"
                    checked={agreed}
                    onChange={() => setAgreed(!agreed)}
                  />
                  <label className="reg-check-label" htmlFor="terms">
                    I agree to the <a href="#">Terms of Service</a> and{" "}
                    <a href="#">Privacy Policy</a>
                  </label>
                </div>

                <button
                  type="submit"
                  className="reg-submit"
                  disabled={loading}
                >
                  {loading ? "⏳ Creating account…" : "Create Account →"}
                </button>
              </form>

              <div className="reg-signin">
                Already have an account? <a href="/login">Sign in</a>
              </div>
            </>
          )}
        </div>

      </div>
    </div>
  );
}
