import { Routes, Route, Link, useLocation } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import CreateProfile from "./pages/CreateProfile";
import { useState, useEffect, useRef } from "react";
import StudentsPage from "./pages/StudentsPage";
import AdminPanel from "./pages/Admin";
import VerifyEmail from "./pages/VerifyEmail";
import Article from "./pages/Article";
import CreateArticle from "./pages/CreateArticle";
import MainPage from "./pages/MainPage";
import LabPage from "./pages/LabPage";
import CreateProject from "./pages/CreateProject";
import ProjectPage from "./pages/ProjectPage";
import api from "./api";
import Chats from "./pages/Chats";
import ChatPage from "./pages/ChatPage";
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

  /* ── AI FAB ── */
  .ai-fab {
    position: fixed; bottom: 28px; right: 28px; z-index: 900;
    width: 52px; height: 52px; border-radius: 50%;
    background: linear-gradient(135deg, #6366f1, #4f46e5);
    color: #fff; font-size: 1.3rem; border: none; cursor: pointer;
    box-shadow: 0 4px 20px rgba(99,102,241,0.45);
    display: flex; align-items: center; justify-content: center;
    transition: all 0.2s; user-select: none;
  }
  .ai-fab:hover { transform: scale(1.08); box-shadow: 0 6px 24px rgba(99,102,241,0.55); }

  /* ── AI Panel ── */
  .ai-panel {
    position: fixed; bottom: 90px; right: 28px; z-index: 890;
    width: 360px; height: 540px;
    background: #fff;
    border-radius: 20px;
    box-shadow: 0 20px 60px rgba(0,0,0,0.18);
    border: 1.5px solid #e4e9f0;
    display: flex; flex-direction: column;
    animation: ai-slide-up 0.22s cubic-bezier(0.34,1.56,0.64,1);
    overflow: hidden;
  }
  @keyframes ai-slide-up {
    from { opacity:0; transform: translateY(20px) scale(0.97) }
    to   { opacity:1; transform: translateY(0)    scale(1)    }
  }
  .ai-panel-header {
    display: flex; align-items: center; justify-content: space-between;
    padding: 14px 16px;
    border-bottom: 1px solid #e4e9f0;
    flex-shrink: 0;
    background: linear-gradient(135deg, #6366f1, #4f46e5);
    color: #fff;
  }
  .ai-panel-icon {
    width: 32px; height: 32px; border-radius: 50%;
    background: rgba(255,255,255,0.2);
    display: flex; align-items: center; justify-content: center;
    font-size: 1rem;
  }
  .ai-panel-title    { font-size: 0.9rem; font-weight: 700; }
  .ai-panel-subtitle { font-size: 0.72rem; opacity: 0.8; margin-top: 1px; }
  .ai-panel-close {
    background: rgba(255,255,255,0.15); border: none; cursor: pointer;
    color: #fff; width: 28px; height: 28px; border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    font-size: 0.85rem; transition: background 0.15s;
  }
  .ai-panel-close:hover { background: rgba(255,255,255,0.25); }

  /* Messages */
  .ai-panel-messages {
    flex: 1; overflow-y: auto; padding: 14px 12px;
    display: flex; flex-direction: column; gap: 12px;
  }
  .ai-panel-empty {
    flex: 1; display: flex; flex-direction: column;
    align-items: center; justify-content: center;
    text-align: center; color: #7a8898;
    padding: 20px; font-size: 0.85rem;
  }
  .ai-msg { display: flex; gap: 8px; align-items: flex-start; }
  .ai-msg-user { flex-direction: row-reverse; }
  .ai-msg-avatar {
    width: 28px; height: 28px; border-radius: 50%; flex-shrink: 0;
    background: linear-gradient(135deg,#6366f1,#4f46e5);
    color: #fff; font-size: 0.75rem;
    display: flex; align-items: center; justify-content: center;
  }
  .ai-msg-bubble {
    max-width: 78%; padding: 9px 13px; border-radius: 14px;
    font-size: 0.83rem; line-height: 1.55;
    background: #f3f4f6; color: #0f1923;
    white-space: pre-wrap; word-break: break-word;
  }
  .ai-msg-user .ai-msg-bubble {
    background: linear-gradient(135deg,#6366f1,#4f46e5);
    color: #fff; border-radius: 14px 14px 4px 14px;
  }
  .ai-msg-ai .ai-msg-bubble  { border-radius: 14px 14px 14px 4px; }
  .ai-msg-error .ai-msg-bubble { background: #fef2f2; color: #dc2626; }

  /* Typing indicator */
  .ai-typing {
    display: flex; gap: 4px; align-items: center;
    padding: 12px 16px !important;
  }
  .ai-typing span {
    width: 7px; height: 7px; border-radius: 50%;
    background: #9ca3af; display: inline-block;
    animation: ai-bounce 1.2s infinite ease-in-out;
  }
  .ai-typing span:nth-child(2) { animation-delay: 0.2s; }
  .ai-typing span:nth-child(3) { animation-delay: 0.4s; }
  @keyframes ai-bounce {
    0%,80%,100% { transform: translateY(0); }
    40%          { transform: translateY(-6px); }
  }

  /* Input */
  .ai-panel-input-wrap {
    display: flex; gap: 8px; padding: 10px 12px;
    border-top: 1px solid #e4e9f0;
    flex-shrink: 0; align-items: flex-end;
  }
  .ai-panel-input {
    flex: 1; border: 1.5px solid #e4e9f0;
    border-radius: 12px; padding: 9px 12px;
    font-size: 0.83rem; resize: none; outline: none;
    color: #0f1923; background: #fff;
    transition: border-color 0.15s;
    font-family: 'Lato', sans-serif;
  }
  .ai-panel-input:focus { border-color: #6366f1; }
  .ai-panel-input:disabled { opacity: 0.6; }
  .ai-panel-send {
    width: 36px; height: 36px; border-radius: 50%; border: none;
    background: linear-gradient(135deg,#6366f1,#4f46e5);
    color: #fff; font-size: 1.1rem; cursor: pointer;
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0; transition: all 0.15s;
    box-shadow: 0 2px 8px rgba(99,102,241,0.3);
  }
  .ai-panel-send:hover:not(:disabled) { transform: scale(1.08); }
  .ai-panel-send:disabled { opacity: 0.4; cursor: not-allowed; }
`;
if (!document.head.querySelector("style[data-app]")) {
  document.head.appendChild(styleTag);
}

/* ─── AI Chat Panel ──────────────────────────────────────────────────────── */
function AiChatPanel({ open, onClose }) {
  const [messages, setMessages] = useState([]);
  const [input,    setInput]    = useState("");
  const [loading,  setLoading]  = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    if (bottomRef.current) bottomRef.current.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const sendMessage = async () => {
    const text = input.trim();
    if (!text || loading) return;

    setMessages((prev) => [...prev, { role: "user", text }]);
    setInput("");
    setLoading(true);

    try {
      const r = await api.post("/ai/chat", { message: text });
      setMessages((prev) => [...prev, { role: "ai", text: r.data.reply }]);
    } catch {
      setMessages((prev) => [...prev, { role: "ai", text: "Something went wrong. Please try again.", error: true }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKey = (e) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); }
  };

  if (!open) return null;

  return (
    <div className="ai-panel">
      {/* Header */}
      <div className="ai-panel-header">
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div className="ai-panel-icon">✦</div>
          <div>
            <div className="ai-panel-title">AI Assistant</div>
            <div className="ai-panel-subtitle">Ask me anything</div>
          </div>
        </div>
        <button className="ai-panel-close" onClick={onClose}>✕</button>
      </div>

      {/* Messages */}
      <div className="ai-panel-messages">
        {messages.length === 0 && (
          <div className="ai-panel-empty">
            <div style={{ fontSize: "2rem", marginBottom: 8 }}>✦</div>
            <div style={{ fontWeight: 600, marginBottom: 4, color: "#0f1923" }}>How can I help?</div>
            <div style={{ fontSize: "0.78rem", color: "#7a8898" }}>
              Ask me about research, projects, articles, or anything else.
            </div>
          </div>
        )}
        {messages.map((msg, i) => (
          <div key={i} className={`ai-msg ai-msg-${msg.role} ${msg.error ? "ai-msg-error" : ""}`}>
            {msg.role === "ai" && <div className="ai-msg-avatar">✦</div>}
            <div className="ai-msg-bubble">{msg.text}</div>
          </div>
        ))}
        {loading && (
          <div className="ai-msg ai-msg-ai">
            <div className="ai-msg-avatar">✦</div>
            <div className="ai-msg-bubble ai-typing">
              <span /><span /><span />
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="ai-panel-input-wrap">
        <textarea
          className="ai-panel-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKey}
          placeholder="Type a message… (Enter to send)"
          rows={2}
          disabled={loading}
        />
        <button
          className="ai-panel-send"
          onClick={sendMessage}
          disabled={loading || !input.trim()}
        >
          ↑
        </button>
      </div>
    </div>
  );
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
      <Link to="/main" className="app-nav-brand">
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
               My Profile
            </Link>
            <Link to="/chats" className={navClass("/chats")}>
                   Chats
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
  const [isAuth,  setIsAuth]  = useState(!!localStorage.getItem("token"));
  const [aiOpen,  setAiOpen]  = useState(false);
  const navigate = useNavigate();


  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuth(false);
    navigate("/login");
  };

  return (
    <div>
      <Navbar isAuth={isAuth} onLogout={handleLogout} />
      <div className="app-content">
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login setIsAuth={setIsAuth} />} />
          <Route path="/profiles/:profile_id" element={<Profile />} />
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/admin/profiles" element={<StudentsPage />} />
          <Route path="/profiles" element={<CreateProfile />} />
          <Route path="/chats" element={<Chats />} />
          <Route path="/chats/:chat_id" element={<ChatPage />} />
          <Route path="/register/verify" element={<VerifyEmail />} />
          <Route path="/profiles/:profile_id/articles/:article_id" element={<Article />} />
          <Route path="/profiles/:profile_id/articles" element={<CreateArticle />} />
          <Route path="/profiles/:profile_id/projects" element={<CreateProject />} />
          <Route path="/profiles/:profile_id/projects/:project_id/" element={<ProjectPage />} />
          <Route path="/main" element={<MainPage />} />
          <Route path="/labs/:lab_id" element={<LabPage />} />
        </Routes>
      </div>

      {/* ── Global AI Chat ── */}
      <AiChatPanel open={aiOpen} onClose={() => setAiOpen(false)} />
      <button className="ai-fab" onClick={() => setAiOpen((v) => !v)} title="AI Assistant">
        {aiOpen ? "✕" : "✦"}
      </button>
    </div>
  );
}

export default App;