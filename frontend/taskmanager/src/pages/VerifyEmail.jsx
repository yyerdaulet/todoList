import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
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
styleTag.setAttribute("data-ve", "1");
styleTag.textContent = `
  :root {
    --ink:     #0f1923;
    --muted:   #7a8898;
    --border:  #e4e9f0;
    --bg:      #f5f7fa;
    --surface: #ffffff;
    --accent:  #1a56db;
    --accent2: #0e3a9e;
  }

  .ve-page {
    font-family: 'Lato', sans-serif;
    background: var(--bg);
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 32px 16px;
  }

  .ve-shell { width: 100%; max-width: 440px; }

  /* brand */
  .ve-brand {
    text-align: center;
    margin-bottom: 28px;
  }
  .ve-brand-icon {
    width: 48px; height: 48px;
    background: linear-gradient(135deg, var(--accent), var(--accent2));
    border-radius: 13px;
    display: inline-flex; align-items: center; justify-content: center;
    font-size: 1.3rem;
    box-shadow: 0 4px 16px rgba(26,86,219,0.28);
    margin-bottom: 10px;
  }
  .ve-brand-name {
    font-family: 'Playfair Display', serif;
    font-size: 1.35rem;
    font-weight: 700;
    color: var(--ink);
    letter-spacing: -0.02em;
  }

  /* card */
  .ve-card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 20px;
    padding: 44px 40px;
    box-shadow: 0 4px 28px rgba(15,25,35,0.08);
    text-align: center;
  }

  /* state icon circle */
  .ve-state-icon {
    width: 72px; height: 72px;
    border-radius: 50%;
    display: inline-flex; align-items: center; justify-content: center;
    font-size: 2rem;
    margin-bottom: 22px;
  }
  .ve-state-icon.loading {
    background: #eef3ff;
    animation: ve-pulse 1.4s ease-in-out infinite;
  }
  .ve-state-icon.success {
    background: linear-gradient(135deg, #059669, #047857);
    box-shadow: 0 4px 20px rgba(5,150,105,0.28);
  }
  .ve-state-icon.error {
    background: linear-gradient(135deg, #dc2626, #b91c1c);
    box-shadow: 0 4px 20px rgba(220,38,38,0.22);
  }

  .ve-title {
    font-family: 'Playfair Display', serif;
    font-size: 1.4rem;
    font-weight: 700;
    color: var(--ink);
    letter-spacing: -0.02em;
    margin-bottom: 10px;
  }
  .ve-msg {
    font-size: 0.85rem;
    color: var(--muted);
    line-height: 1.65;
    max-width: 300px;
    margin: 0 auto 24px;
  }

  /* redirect notice */
  .ve-redirect {
    background: #f0fdf4;
    border: 1px solid #bbf7d0;
    border-radius: 10px;
    padding: 11px 16px;
    font-size: 0.78rem;
    color: #15803d;
    font-weight: 600;
    margin-bottom: 20px;
  }

  /* progress bar for redirect countdown */
  .ve-progress-wrap {
    height: 4px;
    background: #e4e9f0;
    border-radius: 99px;
    overflow: hidden;
    margin-bottom: 22px;
  }
  .ve-progress-bar {
    height: 100%;
    background: linear-gradient(90deg, #059669, #047857);
    border-radius: 99px;
    animation: ve-shrink 2s linear forwards;
  }
  @keyframes ve-shrink {
    from { width: 100%; }
    to   { width: 0%; }
  }

  /* CTA button */
  .ve-btn {
    display: inline-flex; align-items: center; gap: 7px;
    padding: 11px 26px;
    background: linear-gradient(135deg, var(--accent), var(--accent2));
    color: #fff;
    border: none;
    border-radius: 10px;
    font-family: 'Lato', sans-serif;
    font-size: 0.85rem;
    font-weight: 700;
    cursor: pointer;
    text-decoration: none;
    box-shadow: 0 3px 14px rgba(26,86,219,0.25);
    transition: opacity 0.15s, transform 0.1s;
  }
  .ve-btn:hover { opacity: 0.9; transform: translateY(-1px); }

  /* spinner dots */
  .ve-dots { display: flex; gap: 6px; justify-content: center; margin-top: 16px; }
  .ve-dot {
    width: 7px; height: 7px;
    border-radius: 50%;
    background: var(--accent);
    opacity: 0.3;
    animation: ve-blink 1.2s ease-in-out infinite;
  }
  .ve-dot:nth-child(2) { animation-delay: 0.2s; }
  .ve-dot:nth-child(3) { animation-delay: 0.4s; }
  @keyframes ve-blink {
    0%, 80%, 100% { opacity: 0.3; transform: scale(1); }
    40%           { opacity: 1;   transform: scale(1.3); }
  }
  @keyframes ve-pulse {
    0%, 100% { box-shadow: 0 0 0 0 rgba(26,86,219,0.15); }
    50%       { box-shadow: 0 0 0 10px rgba(26,86,219,0); }
  }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(16px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .ve-animate { animation: fadeUp 0.38s ease both; }
`;
if (!document.head.querySelector("style[data-ve]")) {
  document.head.appendChild(styleTag);
}

/* ─── Component ──────────────────────────────────────────────────────────── */
export default function VerifyEmail() {
  const [phase, setPhase] = useState("loading"); // loading | success | error
  const [message, setMessage] = useState("");
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const token = searchParams.get("token");
    if (!token) {
      setPhase("error");
      setMessage("No verification token was found in the link. Please use the link from your email.");
      return;
    }

    api
      .get(`/register/verify?token=${token}`)
      .then((res) => {
        setMessage(res.data);
        if (res.data === "email verified successfully!") {
          setPhase("success");
          setTimeout(() => navigate("/login"), 2000);
        } else {
          setPhase("error");
        }
      })
      .catch((err) => {
        setPhase("error");
        if (err.response) setMessage(err.response.data);
        else setMessage("A network error occurred. Please check your connection and try again.");
      });
  }, [searchParams, navigate]);

  const states = {
    loading: {
      iconClass: "loading",
      icon: "✉️",
      title: "Verifying your email…",
      showDots: true,
    },
    success: {
      iconClass: "success",
      icon: "✓",
      title: "Email Verified!",
      showDots: false,
    },
    error: {
      iconClass: "error",
      icon: "✕",
      title: "Verification Failed",
      showDots: false,
    },
  };

  const s = states[phase];

  return (
    <div className="ve-page">
      <div className="ve-shell ve-animate">

        {/* Brand */}
        <div className="ve-brand">
          <div className="ve-brand-icon">🎓</div>
          <div className="ve-brand-name">ResearchHub</div>
        </div>

        <div className="ve-card">
          <div className={`ve-state-icon ${s.iconClass}`}>
            {s.icon}
          </div>

          <div className="ve-title">{s.title}</div>

          {phase === "loading" && (
            <>
              <div className="ve-msg">
                Please wait while we confirm your email address.
              </div>
              <div className="ve-dots">
                <div className="ve-dot" />
                <div className="ve-dot" />
                <div className="ve-dot" />
              </div>
            </>
          )}

          {phase === "success" && (
            <>
              <div className="ve-msg">
                Your account is now active. You'll be redirected to the sign-in page automatically.
              </div>
              <div className="ve-redirect">
                ⏱ Redirecting to login in 2 seconds…
              </div>
              <div className="ve-progress-wrap">
                <div className="ve-progress-bar" />
              </div>
              <button className="ve-btn" onClick={() => navigate("/login")}>
                Sign in now →
              </button>
            </>
          )}

          {phase === "error" && (
            <>
              <div className="ve-msg">{message}</div>
              <button className="ve-btn" onClick={() => navigate("/register")}>
                Back to Register
              </button>
            </>
          )}
        </div>

      </div>
    </div>
  );
}