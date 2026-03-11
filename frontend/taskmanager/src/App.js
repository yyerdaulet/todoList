import { Routes, Route, Link, useLocation } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import CreateProfile from "./pages/CreateProfile";
import { useState } from "react";
import StudentsPage from "./pages/StudentsPage";
import AdminLayout from "./pages/AdminLayout";
import Dashboard from "./pages/Dashboard";
import VerifyEmail from "./pages/VerifyEmail";
import Article from "./pages/Article";
import CreateArticle from "./pages/CreateArticle";

/* ─── Font + styles ──────────────────────────────────────────────────────── */
const fontLink = document.createElement("link");
fontLink.rel = "stylesheet";
fontLink.href =
  "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=Lato:wght@300;400;700&display=swap";
if (!document.head.querySelector('link[href*="Playfair"]')) {
  document.head.appendChild(fontLink);
}

const styleTag = document.createElement("style");
styleTag.setAttribute("data-app", "1");
styleTag.textContent = `
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --ink:     #0f1923;
    --ink2:    #3a4a5c;
    --muted:   #7a8898;
    --border:  #e4e9f0;
    --bg:      #f5f7fa;
    --surface: #ffffff;
    --accent:  #1a56db;
    --accent2: #0e3a9e;
    --nav-h:   64px;
  }

  body {
    font-family: 'Lato', sans-serif;
    background: var(--bg);
    color: var(--ink);
  }

  .app-nav {
    position: sticky;
    top: 0;
    z-index: 100;
    height: var(--nav-h);
    background: rgba(255,255,255,0.92);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border-bottom: 1px solid var(--border);
    display: flex;
    align-items: center;
    padding: 0 32px;
  }

  .app-nav-brand {
    display: flex;
    align-items: center;
    gap: 10px;
    text-decoration: none;
    margin-right: auto;
  }
  .app-nav-brand-icon {
    width: 34px; height: 34px;
    background: linear-gradient(135deg, var(--accent), var(--accent2));
    border-radius: 9px;
    display: flex; align-items: center; justify-content: center;
    font-size: 1rem;
    box-shadow: 0 2px 10px rgba(26,86,219,0.25);
    flex-shrink: 0;
  }
  .app-nav-brand-name {
    font-family: 'Playfair Display', serif;
    font-size: 1.1rem;
    font-weight: 700;
    color: var(--ink);
    letter-spacing: -0.02em;
  }

  .app-nav-links {
    display: flex;
    align-items: center;
    gap: 4px;
  }

  .app-nav-link {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 7px 14px;
    border-radius: 8px;
    font-size: 0.82rem;
    font-weight: 700;
    color: var(--muted);
    text-decoration: none;
    letter-spacing: 0.02em;
    transition: background 0.15s, color 0.15s;
    border: none;
    background: none;
    cursor: pointer;
    font-family: 'Lato', sans-serif;
  }
  .app-nav-link:hover { background: #f1f3f5; color: var(--ink); }
  .app-nav-link.active { background: #eef3ff; color: var(--accent); }

  .app-nav-cta {
    display: inline-flex;
    align-items: center;
    gap: 7px;
    padding: 8px 18px;
    background: linear-gradient(135deg, var(--accent), var(--accent2));
    color: #fff !important;
    border-radius: 9px;
    font-size: 0.82rem;
    font-weight: 700;
    letter-spacing: 0.02em;
    text-decoration: none;
    box-shadow: 0 2px 10px rgba(26,86,219,0.25);
    transition: opacity 0.15s, transform 0.1s;
    margin-left: 6px;
    border: none;
    cursor: pointer;
    font-family: 'Lato', sans-serif;
  }
  .app-nav-cta:hover { opacity: 0.9; transform: translateY(-1px); }

  .app-nav-sep {
    width: 1px; height: 22px;
    background: var(--border);
    margin: 0 8px;
  }

  .app-nav-avatar {
    width: 32px; height: 32px;
    border-radius: 50%;
    background: #eef3ff;
    border: 1.5px solid var(--border);
    display: flex; align-items: center; justify-content: center;
    font-size: 0.78rem;
    color: var(--accent);
    font-weight: 800;
    margin-right: 4px;
    flex-shrink: 0;
  }

  .app-content { min-height: calc(100vh - var(--nav-h)); }
`;
if (!document.head.querySelector("style[data-app]")) {
  document.head.appendChild(styleTag);
}

/* ─── Navbar component ───────────────────────────────────────────────────── */
function Navbar({ isAuth, onLogout }) {
  const location = useLocation();
  const id = localStorage.getItem("id");
  const email = localStorage.getItem("email") || "U";

  const navClass = (path) =>
    location.pathname === path ? "app-nav-link active" : "app-nav-link";

  return (
    <nav className="app-nav">
      <Link to="/" className="app-nav-brand">
        <div className="app-nav-brand-icon">🎓</div>
        <span className="app-nav-brand-name">ResearchHub</span>
      </Link>

      <div className="app-nav-links">
        {!isAuth ? (
          <>
            <Link to="/login" className={navClass("/login")}>
              Sign in
            </Link>
            <Link to="/register" className="app-nav-cta">
              Get Started →
            </Link>
          </>
        ) : (
          <>
            <Link to={`/profiles/${id}`} className={navClass(`/profiles/${id}`)}>
              👤 My Profile
            </Link>
            <div className="app-nav-sep" />
            <div className="app-nav-avatar">
              {email[0].toUpperCase()}
            </div>
            <button className="app-nav-link" onClick={onLogout}>
              Sign out
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

/* ─── App ────────────────────────────────────────────────────────────────── */
function App() {
  const [isAuth, setIsAuth] = useState(!!localStorage.getItem("token"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuth(false);
  };

  return (
    <div>
      <Navbar isAuth={isAuth} onLogout={handleLogout} />
      <div className="app-content">
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login setIsAuth={setIsAuth} />} />
          <Route path="/profiles/:profile_id" element={<Profile />} />
          <Route path="/admin" element={<AdminLayout />} />
          <Route path="/admin/profiles" element={<StudentsPage />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="/profiles" element={<CreateProfile />} />
          <Route path="/register/verify" element={<VerifyEmail />} />
          <Route path="/profiles/:profile_id/articles/:article_id" element={<Article />} />
          <Route path="/profiles/:profile_id/articles" element={<CreateArticle />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;