import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
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
styleTag.setAttribute("data-login", "1");
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

  .ln-page {
    font-family: 'Lato', sans-serif;
    background: var(--bg);
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 32px 16px;
  }

  .ln-shell { width: 100%; max-width: 440px; }

  /* brand */
  .ln-brand {
    text-align: center;
    margin-bottom: 28px;
  }
  .ln-brand-icon {
    width: 52px; height: 52px;
    background: linear-gradient(135deg, var(--accent), var(--accent2));
    border-radius: 14px;
    display: inline-flex; align-items: center; justify-content: center;
    font-size: 1.4rem;
    box-shadow: 0 4px 18px rgba(26,86,219,0.3);
    margin-bottom: 12px;
  }
  .ln-brand-name {
    font-family: 'Playfair Display', serif;
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--ink);
    letter-spacing: -0.02em;
  }
  .ln-brand-sub {
    font-size: 0.78rem;
    color: var(--muted);
    margin-top: 3px;
    text-transform: uppercase;
    letter-spacing: 0.07em;
  }

  /* card */
  .ln-card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 20px;
    padding: 40px 40px 36px;
    box-shadow: 0 4px 28px rgba(15,25,35,0.08);
  }

  .ln-card-title {
    font-family: 'Playfair Display', serif;
    font-size: 1.35rem;
    font-weight: 700;
    color: var(--ink);
    margin-bottom: 4px;
    letter-spacing: -0.02em;
  }
  .ln-card-sub {
    font-size: 0.8rem;
    color: var(--muted);
    margin-bottom: 28px;
  }

  /* field */
  .ln-field { margin-bottom: 18px; }
  .ln-label {
    display: block;
    font-size: 0.72rem;
    font-weight: 700;
    color: var(--ink2);
    text-transform: uppercase;
    letter-spacing: 0.07em;
    margin-bottom: 7px;
  }

  .ln-input {
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
  }
  .ln-input:focus {
    border-color: var(--accent);
    box-shadow: 0 0 0 3px rgba(26,86,219,0.10);
    background: #fff;
  }
  .ln-input::placeholder { color: #b0bac4; }

  /* remember row */
  .ln-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 24px;
  }
  .ln-check-wrap {
    display: flex; align-items: center; gap: 8px;
  }
  .ln-checkbox {
    width: 16px; height: 16px;
    border-radius: 4px;
    cursor: pointer;
    accent-color: var(--accent);
    flex-shrink: 0;
  }
  .ln-check-label {
    font-size: 0.8rem;
    color: var(--muted);
    cursor: pointer;
    user-select: none;
  }
  .ln-forgot {
    font-size: 0.78rem;
    font-weight: 700;
    color: var(--accent);
    text-decoration: none;
  }
  .ln-forgot:hover { text-decoration: underline; }

  /* divider */
  .ln-divider {
    height: 1px;
    background: var(--border);
    margin: 0 0 22px;
  }

  /* submit */
  .ln-submit {
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
  .ln-submit:hover { opacity: 0.92; transform: translateY(-1px); }
  .ln-submit:disabled { opacity: 0.55; cursor: not-allowed; transform: none; }

  /* register link */
  .ln-register {
    text-align: center;
    font-size: 0.78rem;
    color: var(--muted);
    margin-top: 20px;
  }
  .ln-register a {
    color: var(--accent);
    font-weight: 700;
    text-decoration: none;
  }
  .ln-register a:hover { text-decoration: underline; }

  /* error */
  .ln-error {
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
  .ln-animate { animation: fadeUp 0.38s ease both; }
`;
if (!document.head.querySelector("style[data-login]")) {
  document.head.appendChild(styleTag);
}

/* ─── Component ──────────────────────────────────────────────────────────── */
function Login({ setIsAuth }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const response = await api.post("/login", { email, password });

      localStorage.setItem("id", response.data.id);
      localStorage.setItem("token", response.data.jwt);
      if (remember) localStorage.setItem("email", email);

      const hasProfile = await api.get(`/login/${response.data.id}/check`);
      setIsAuth(true);

      if (hasProfile.data) {
        navigate(`/main`);
      } else {
        navigate(`/profiles`);
      }
    } catch (err) {
      console.error(err);
      setError(
        err?.response?.status === 401
          ? "Incorrect email or password. Please try again."
          : "Something went wrong. Please try again."
      );
      setLoading(false);
    }
  };

  return (
    <div className="ln-page">
      <div className="ln-shell ln-animate">

        {/* Brand */}
        <div className="ln-brand">
          <div className="ln-brand-name">ResearchHub</div>
          <div className="ln-brand-sub">Academic Profile Platform</div>
        </div>

        <div className="ln-card">
          <div className="ln-card-title">Welcome back</div>
          <div className="ln-card-sub">Sign in to access your research profile</div>

          {error && (
            <div className="ln-error">⚠️ {error}</div>
          )}

          <form onSubmit={handleLogin}>

            {/* Email */}
            <div className="ln-field">
              <label className="ln-label" htmlFor="ln-email">Email Address</label>
              <input
                id="ln-email"
                className="ln-input"
                type="email"
                placeholder="you@university.edu"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* Password */}
            <div className="ln-field">
              <label className="ln-label" htmlFor="ln-password">Password</label>
              <div style={{ position: "relative" }}>
                <input
                  id="ln-password"
                  className="ln-input"
                  type={showPassword ? "text" : "password"}
                  placeholder="Your password"
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
                    cursor: "pointer", fontSize: "1rem",
                    color: "var(--muted)", lineHeight: 1, padding: 0,
                  }}
                  tabIndex={-1}
                >
                  {showPassword ? "🙈" : "👁️"}
                </button>
              </div>
            </div>

            {/* Remember + forgot */}
            <div className="ln-row">
              <div className="ln-check-wrap">
                <input
                  className="ln-checkbox"
                  type="checkbox"
                  id="rememberMe"
                  checked={remember}
                  onChange={() => setRemember(!remember)}
                />
                <label className="ln-check-label" htmlFor="rememberMe">
                  Remember me
                </label>
              </div>
              <a href="#" className="ln-forgot">Forgot password?</a>
            </div>

            <div className="ln-divider" />

            <button type="submit" className="ln-submit" disabled={loading}>
              {loading ? "⏳ Signing in…" : "Sign in →"}
            </button>
          </form>

          <div className="ln-register">
            Don't have an account?{" "}
            <Link to="/register">Create one</Link>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Login;