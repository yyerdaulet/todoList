import React, { useEffect, useMemo, useState,useRef } from "react";
import { Link } from "react-router-dom";
import api from "../api";

const styleId = "chat-pages-style";

function ensureChatStyles() {
  if (document.getElementById(styleId)) return;

  const styleTag = document.createElement("style");
  styleTag.id = styleId;
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
      --online:  #16a34a;
      --danger:  #dc2626;
    }

    .cp-page {
      font-family: 'Lato', sans-serif;
      color: var(--ink);
      background: var(--bg);
      min-height: 100vh;
    }

    .cp-hero {
      background: linear-gradient(135deg, #0f1923 0%, #1a2e46 55%, #1a56db 100%);
      padding: 72px 24px 84px;
      position: relative;
      overflow: hidden;
      color: #fff;
    }

    .cp-hero::before {
      content: '';
      position: absolute;
      top: -80px;
      right: -90px;
      width: 360px;
      height: 360px;
      border-radius: 50%;
      background: rgba(26,86,219,0.16);
    }

    .cp-hero::after {
      content: '';
      position: absolute;
      bottom: -100px;
      left: 8%;
      width: 250px;
      height: 250px;
      border-radius: 50%;
      background: rgba(201,168,76,0.08);
    }

    .cp-hero-inner {
      max-width: 1120px;
      margin: 0 auto;
      position: relative;
      z-index: 1;
    }

    .cp-hero-eyebrow {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      background: rgba(255,255,255,0.10);
      border: 1px solid rgba(255,255,255,0.18);
      border-radius: 999px;
      padding: 6px 16px;
      font-size: 0.72rem;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      color: rgba(255,255,255,0.78);
      margin-bottom: 18px;
    }

    .cp-hero-title {
      font-family: 'Playfair Display', serif;
      font-size: clamp(2rem, 5vw, 3.05rem);
      line-height: 1.15;
      letter-spacing: -0.03em;
      margin: 0 0 14px;
    }

    .cp-hero-desc {
      max-width: 700px;
      color: rgba(255,255,255,0.68);
      font-size: 1rem;
      line-height: 1.75;
      margin: 0;
    }

    .cp-content {
      max-width: 1120px;
      margin: -42px auto 0;
      padding: 0 24px 72px;
      position: relative;
      z-index: 2;
    }

    .cp-toolbar {
      display: grid;
      grid-template-columns: 1fr;
      gap: 14px;
      margin-bottom: 22px;
    }

    .cp-input {
      height: 52px;
      border: 1px solid var(--border);
      border-radius: 14px;
      background: var(--surface);
      color: var(--ink);
      padding: 0 16px;
      font-size: 0.95rem;
      outline: none;
      box-shadow: 0 2px 14px rgba(0,0,0,0.04);
    }

    .cp-input:focus {
      border-color: rgba(26,86,219,0.34);
      box-shadow: 0 0 0 4px rgba(26,86,219,0.08);
    }

    .cp-list {
      display: grid;
      gap: 16px;
    }

    .cp-card {
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: 18px;
      padding: 20px 22px;
      box-shadow: 0 2px 16px rgba(0,0,0,0.05);
      text-decoration: none;
      transition: transform 0.18s, box-shadow 0.18s, border-color 0.18s;
      display: block;
      color: inherit;
    }

    .cp-card:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 26px rgba(26,86,219,0.10);
      border-color: rgba(26,86,219,0.28);
    }

    .cp-card-top {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      gap: 16px;
      margin-bottom: 10px;
    }

    .cp-card-left {
      min-width: 0;
    }

    .cp-chat-name {
      font-size: 1rem;
      font-weight: 700;
      color: var(--ink);
      margin-bottom: 6px;
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .cp-online-dot {
      width: 9px;
      height: 9px;
      border-radius: 50%;
      background: var(--online);
      flex-shrink: 0;
      box-shadow: 0 0 0 4px rgba(22,163,74,0.12);
    }

    .cp-members {
      color: var(--muted);
      font-size: 0.82rem;
    }

    .cp-time {
      flex-shrink: 0;
      color: var(--muted);
      font-size: 0.8rem;
      font-weight: 700;
    }

    .cp-last-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 14px;
    }

    .cp-last-message {
      color: var(--ink2);
      font-size: 0.92rem;
      line-height: 1.6;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      min-width: 0;
      flex: 1;
    }

    .cp-empty,
    .cp-error,
    .cp-loading {
      text-align: center;
      padding: 72px 16px;
      font-size: 0.92rem;
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: 18px;
      box-shadow: 0 2px 16px rgba(0,0,0,0.04);
    }

    .cp-empty,
    .cp-loading {
      color: var(--muted);
    }

    .cp-error {
      color: var(--danger);
    }

    @media (max-width: 760px) {
      .cp-card-top,
      .cp-last-row {
        flex-direction: column;
        align-items: flex-start;
      }

      .cp-time {
        align-self: flex-end;
      }

      .cp-last-message {
        white-space: normal;
      }
    }
  `;
  document.head.appendChild(styleTag);
}

/* ─── Helpers ────────────────────────────────────────────────────────────── */
function getAuthHeaders() {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

function mapChats(rawChats) {
  return (rawChats || []).map((chat) => ({
    id: chat.chatId,
    name: chat.title,
    membersCount: chat.members.length ?? chat.memberCount ?? 0,
    latestMessage: chat.latestMessage?.content ?? "No messages yet.",
  }));
}

function formatChatTime(value) {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleString([], {
    month: "short", day: "numeric",
    hour: "2-digit", minute: "2-digit",
  });
}

const initials = (p) =>
  `${p.name?.[0] ?? ""}${p.lastName?.[0] ?? ""}`.toUpperCase() || "?";

/* ─── AuthorSearch ───────────────────────────────────────────────────────── */
function AuthorSearch({ selected, onChange }) {
  const [query,   setQuery]   = useState("");
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
        setResults(res.data.filter(p => !selected.find(s => s.id === p.id)));
      } catch { setResults([]); }
      finally  { setLoading(false); }
    }, 400);
  };

  const add    = (p) => { onChange([...selected, p]); setQuery(""); setResults([]); };
  const remove = (id) => onChange(selected.filter(p => p.id !== id));

  return (
    <>
      <div style={{ position: "relative" }}>
        <input
          className="cc-input"
          value={query}
          onChange={(e) => search(e.target.value)}
          placeholder="Search by name or ORCID…"
        />
        {(results.length > 0 || loading) && (
          <div className="cc-dropdown">
            {loading && <div className="cc-dropdown-info">Searching…</div>}
            {results.map(p => (
              <div key={p.id} className="cc-dropdown-item" onClick={() => add(p)}>
                <div className="cc-avatar-sm">{initials(p)}</div>
                <div>
                  <div className="cc-dropdown-name">{p.name} {p.lastName}</div>
                  <div className="cc-dropdown-meta">{p.degree ?? ""}{p.orcid ? ` · ${p.orcid}` : ""}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      {selected.length > 0 && (
        <div className="cc-chips">
          {selected.map(p => (
            <div key={p.id} className="cc-chip">
              <div className="cc-avatar-xs">{initials(p)}</div>
              {p.name} {p.lastName}
              <button className="cc-chip-remove" onClick={() => remove(p.id)}>×</button>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

/* ─── CreateChatModal ────────────────────────────────────────────────────── */
const STEPS = [
  { label: "Basics",  sub: "Title & description" },
  { label: "Members", sub: "Add participants"    },
  { label: "Review",  sub: "Confirm & create"    },
];

function CreateChatModal({ onClose, onCreated }) {
  const [step,       setStep]       = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [error,      setError]      = useState("");
  const [form,       setForm]       = useState({ title: "", about: "", members: [] });

  const set = (key, val) => setForm(f => ({ ...f, [key]: val }));

  const canNext = () => {
    if (step === 0) return form.title.trim() && form.about.trim();
    return true;
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    setError("");

    try {
      const res = await api.post(
                    "/chats",
                    {
                      title: form.title,
                      about: form.about,
                      members: form.members
                    },
                    {
                      headers: getAuthHeaders()
                    }
                  );

      onCreated(res.data);
    } catch (e) {
      setError(e?.response?.data?.message || "Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="cc-backdrop" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="cc-modal">

        {/* Header */}
        <div className="cc-modal-header">
          <div>
            <div className="cc-modal-eyebrow">Step {step + 1} of {STEPS.length}</div>
            <div className="cc-modal-title">{STEPS[step].label}</div>
          </div>
          <button className="cc-modal-close" onClick={onClose}>✕</button>
        </div>

        {/* Progress */}
        <div className="cc-modal-progress">
          <div className="cc-modal-progress-fill" style={{ width: `${((step + 1) / STEPS.length) * 100}%` }} />
        </div>

        {/* Steps nav */}
        <div className="cc-steps-nav">
          {STEPS.map((s, i) => (
            <div key={i} className={`cc-step-pill ${i === step ? "active" : i < step ? "done" : ""}`}>
              <span className="cc-step-num">{i < step ? "✓" : i + 1}</span>
              {s.label}
            </div>
          ))}
        </div>

        {/* Body */}
        <div className="cc-modal-body">

          {/* Step 0 — Basics */}
          {step === 0 && (
            <div className="cc-fade">
              <div className="cc-field">
                <label className="cc-label">Chat Title <span className="cc-required">*</span></label>
                <input
                  className="cc-input"
                  value={form.title}
                  onChange={(e) => set("title", e.target.value)}
                  placeholder="e.g. Project Alpha Discussion"
                />
              </div>
              <div className="cc-field">
                <label className="cc-label">About <span className="cc-required">*</span></label>
                <textarea
                  className="cc-input cc-textarea"
                  value={form.about}
                  onChange={(e) => set("about", e.target.value)}
                  placeholder="What is this chat about?"
                  rows={4}
                />
              </div>
            </div>
          )}

          {/* Step 1 — Members */}
          {step === 1 && (
            <div className="cc-fade">
              <div className="cc-field">
                <label className="cc-label">Add Members</label>
                <AuthorSearch selected={form.members} onChange={(v) => set("members", v)} />
                {form.members.length === 0 && (
                  <div className="cc-hint">You can skip this and add members later.</div>
                )}
              </div>
            </div>
          )}

          {/* Step 2 — Review */}
          {step === 2 && (
            <div className="cc-fade">
              <div className="cc-review-item">
                <div className="cc-review-label">Title</div>
                <div className="cc-review-val">{form.title}</div>
              </div>
              <div className="cc-review-item">
                <div className="cc-review-label">About</div>
                <div className="cc-review-val">{form.about}</div>
              </div>
              <div className="cc-review-item">
                <div className="cc-review-label">Members ({form.members.length})</div>
                <div className="cc-chips" style={{ marginTop: 6 }}>
                  {form.members.length === 0
                    ? <span className="cc-hint">None added</span>
                    : form.members.map(m => (
                        <div key={m.id} className="cc-chip cc-chip-static">
                          <div className="cc-avatar-xs">{initials(m)}</div>
                          {m.name} {m.lastName}
                        </div>
                      ))
                  }
                </div>
              </div>
              {error && <div className="cc-error">⚠ {error}</div>}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="cc-modal-footer">
          <button
            className="cc-btn-ghost"
            onClick={() => step > 0 ? setStep(s => s - 1) : onClose()}
          >
            {step > 0 ? "← Back" : "Cancel"}
          </button>
          {step < STEPS.length - 1 ? (
            <button className="cc-btn-primary" disabled={!canNext()} onClick={() => setStep(s => s + 1)}>
              Continue →
            </button>
          ) : (
            <button className="cc-btn-primary" disabled={submitting} onClick={handleSubmit}>
              {submitting ? "Creating…" : "✓ Create Chat"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

/* ─── Chats Page ─────────────────────────────────────────────────────────── */
export default function Chats() {
  const [search,      setSearch]      = useState("");
  const [chats,       setChats]       = useState([]);
  const [loading,     setLoading]     = useState(true);
  const [error,       setError]       = useState("");
  const [showCreate,  setShowCreate]  = useState(false);

  useEffect(() => { fetchChats(); }, []);

  const filteredChats = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return chats;
    return chats.filter(c =>
      (c.name?.toLowerCase() || "").includes(q) ||
      (c.latestMessage?.toLowerCase() || "").includes(q)
    );
  }, [chats, search]);

  async function fetchChats() {
    setLoading(true); setError("");
    try {
      const res = await api.get("/chats", { headers: getAuthHeaders() });
      setChats(mapChats(res.data));
    } catch {
      setError("Failed to load chats.");
    } finally {
      setLoading(false);
    }
  }

  const handleCreated = (newChat) => {
    setChats(prev => [mapChats([newChat])[0], ...prev]);
    setShowCreate(false);
  };

  return (
    <>
      {showCreate && (
        <CreateChatModal
          onClose={() => setShowCreate(false)}
          onCreated={handleCreated}
        />
      )}

      <div className="ch-page">

        {/* Hero */}
        <div className="ch-hero">
          <div className="ch-hero-inner">
            <div className="ch-hero-eyebrow">ResearchHub · Messaging</div>
            <h1 className="ch-hero-title">Group Chats</h1>
            <p className="ch-hero-desc">
              Communicate with your research team in real time.
            </p>
            <button className="ch-create-btn" onClick={() => setShowCreate(true)}>
              + New Chat
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="ch-content">
          <input
            className="ch-search"
            type="text"
            placeholder="Search chats…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          {loading ? (
            <div className="ch-state">Loading chats…</div>
          ) : error ? (
            <div className="ch-state ch-state-error">{error}</div>
          ) : filteredChats.length === 0 ? (
            <div className="ch-state">
              <div style={{ fontSize: "2rem", marginBottom: 8 }}>💬</div>
              <div style={{ fontWeight: 600, marginBottom: 4 }}>No chats yet</div>
              <div style={{ fontSize: "0.82rem", color: "#7a8898", marginBottom: 16 }}>
                Create your first group chat to get started.
              </div>
              <button className="ch-create-btn-sm" onClick={() => setShowCreate(true)}>
                + New Chat
              </button>
            </div>
          ) : (
            <div className="ch-list">
              {filteredChats.map((chat) => (
                <Link key={chat.id} to={`/chats/${chat.id}`} className="ch-card">
                  <div className="ch-card-avatar">
                    {(chat.title?.[0] ?? "C").toUpperCase()}
                  </div>
                  <div className="ch-card-body">
                    <div className="ch-card-top">
                      <div className="ch-card-name">{chat.name}</div>
                      <div className="ch-card-time">{formatChatTime(chat.latestAt)}</div>
                    </div>
                    <div className="ch-card-bottom">
                      <div className="ch-card-last">{chat.latestMessage}</div>
                      <div className="ch-card-members">{chat.membersCount} members</div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>

      <style>{`
        /* ── Page ── */
        .ch-page { min-height: 100vh; background: #f5f7fa; }

        /* ── Hero ── */
        .ch-hero {
          background: linear-gradient(135deg, #0f1923 0%, #1a2e45 100%);
          padding: 48px 32px 40px;
        }
        .ch-hero-inner { max-width: 720px; margin: 0 auto; }
        .ch-hero-eyebrow {
          font-size: 0.72rem; font-weight: 700; letter-spacing: 0.12em;
          text-transform: uppercase; color: #60a5fa; margin-bottom: 10px;
        }
        .ch-hero-title {
          font-size: 2.2rem; font-weight: 700; color: #fff;
          margin: 0 0 10px; letter-spacing: -0.02em;
        }
        .ch-hero-desc { font-size: 0.9rem; color: #94a3b8; margin: 0 0 24px; }
        .ch-create-btn {
          background: linear-gradient(135deg, #1a56db, #0e3a9e);
          color: #fff; border: none; border-radius: 10px;
          padding: 11px 22px; font-size: 0.85rem; font-weight: 700;
          cursor: pointer; box-shadow: 0 4px 16px rgba(26,86,219,0.35);
          transition: all 0.15s;
        }
        .ch-create-btn:hover { transform: translateY(-1px); box-shadow: 0 6px 20px rgba(26,86,219,0.45); }

        /* ── Content ── */
        .ch-content { max-width: 720px; margin: 0 auto; padding: 28px 32px; }
        .ch-search {
          width: 100%; border: 1.5px solid #e4e9f0; border-radius: 12px;
          padding: 11px 16px; font-size: 0.875rem; outline: none;
          background: #fff; margin-bottom: 20px; box-sizing: border-box;
          transition: border-color 0.15s;
        }
        .ch-search:focus { border-color: #1a56db; }

        /* ── States ── */
        .ch-state {
          text-align: center; padding: 48px 20px;
          color: #7a8898; font-size: 0.88rem;
        }
        .ch-state-error { color: #dc2626; }
        .ch-create-btn-sm {
          background: linear-gradient(135deg, #1a56db, #0e3a9e);
          color: #fff; border: none; border-radius: 8px;
          padding: 9px 18px; font-size: 0.82rem; font-weight: 700;
          cursor: pointer; transition: all 0.15s;
        }
        .ch-create-btn-sm:hover { transform: translateY(-1px); }

        /* ── Chat list ── */
        .ch-list { display: flex; flex-direction: column; gap: 8px; }
        .ch-card {
          display: flex; align-items: center; gap: 14px;
          background: #fff; border-radius: 14px; padding: 14px 16px;
          border: 1.5px solid #e4e9f0; text-decoration: none;
          transition: all 0.15s; cursor: pointer;
        }
        .ch-card:hover { border-color: #93c5fd; box-shadow: 0 4px 16px rgba(0,0,0,0.07); transform: translateY(-1px); }
        .ch-card-avatar {
          width: 46px; height: 46px; border-radius: 14px; flex-shrink: 0;
          background: linear-gradient(135deg, #1a56db, #0e3a9e);
          color: #fff; font-size: 1.1rem; font-weight: 700;
          display: flex; align-items: center; justify-content: center;
        }
        .ch-card-body { flex: 1; min-width: 0; }
        .ch-card-top { display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px; }
        .ch-card-name { font-size: 0.9rem; font-weight: 700; color: #0f1923; }
        .ch-card-time { font-size: 0.72rem; color: #7a8898; flex-shrink: 0; }
        .ch-card-bottom { display: flex; justify-content: space-between; align-items: center; }
        .ch-card-last {
          font-size: 0.8rem; color: #7a8898;
          white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 400px;
        }
        .ch-card-members { font-size: 0.72rem; color: #94a3b8; flex-shrink: 0; }

        /* ── Modal backdrop ── */
        .cc-backdrop {
          position: fixed; inset: 0; z-index: 1000;
          background: rgba(10,20,35,0.6); backdrop-filter: blur(4px);
          display: flex; align-items: center; justify-content: center;
          padding: 20px; animation: cc-fade 0.18s ease;
        }
        @keyframes cc-fade { from { opacity: 0 } to { opacity: 1 } }

        /* ── Modal ── */
        .cc-modal {
          background: #fff; border-radius: 20px;
          box-shadow: 0 24px 80px rgba(0,0,0,0.22);
          width: 100%; max-width: 520px; max-height: 88vh;
          display: flex; flex-direction: column; overflow: hidden;
          animation: cc-up 0.22s cubic-bezier(0.34,1.56,0.64,1);
        }
        @keyframes cc-up {
          from { opacity: 0; transform: translateY(20px) scale(0.97) }
          to   { opacity: 1; transform: translateY(0) scale(1) }
        }
        .cc-modal-header {
          display: flex; align-items: center; justify-content: space-between;
          padding: 20px 24px 14px;
          border-bottom: 1px solid #e4e9f0; flex-shrink: 0;
        }
        .cc-modal-eyebrow {
          font-size: 0.68rem; font-weight: 700; text-transform: uppercase;
          letter-spacing: 0.1em; color: #7a8898; margin-bottom: 4px;
        }
        .cc-modal-title { font-size: 1.1rem; font-weight: 700; color: #0f1923; }
        .cc-modal-close {
          background: #f3f4f6; border: none; cursor: pointer;
          width: 30px; height: 30px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-size: 0.85rem; color: #7a8898; transition: background 0.15s;
        }
        .cc-modal-close:hover { background: #e5e7eb; }

        /* Progress */
        .cc-modal-progress {
          height: 3px; background: #e4e9f0; flex-shrink: 0;
        }
        .cc-modal-progress-fill {
          height: 100%; background: linear-gradient(90deg, #1a56db, #0e3a9e);
          transition: width 0.3s ease;
        }

        /* Steps nav */
        .cc-steps-nav {
          display: flex; gap: 6px; padding: 14px 24px;
          border-bottom: 1px solid #e4e9f0; flex-shrink: 0;
        }
        .cc-step-pill {
          display: flex; align-items: center; gap: 6px;
          padding: 5px 12px; border-radius: 99px; font-size: 0.75rem;
          font-weight: 600; color: #94a3b8; background: #f3f4f6;
          transition: all 0.15s;
        }
        .cc-step-pill.active { background: #eff6ff; color: #1a56db; }
        .cc-step-pill.done   { background: #f0fdf4; color: #16a34a; }
        .cc-step-num {
          width: 18px; height: 18px; border-radius: 50%;
          background: currentColor; color: #fff;
          display: flex; align-items: center; justify-content: center;
          font-size: 0.65rem; font-weight: 800; opacity: 0.9;
        }
        .cc-step-pill.active .cc-step-num { background: #1a56db; opacity: 1; }
        .cc-step-pill.done .cc-step-num   { background: #16a34a; opacity: 1; }

        /* Modal body */
        .cc-modal-body { padding: 22px 24px; overflow-y: auto; flex: 1; }
        .cc-fade { animation: cc-fade 0.2s ease; }

        /* Form */
        .cc-field { margin-bottom: 18px; }
        .cc-label {
          display: block; font-size: 0.78rem; font-weight: 700;
          color: #3a4a5c; margin-bottom: 7px;
        }
        .cc-required { color: #dc2626; }
        .cc-input {
          width: 100%; border: 1.5px solid #e4e9f0; border-radius: 10px;
          padding: 10px 13px; font-size: 0.875rem; color: #0f1923;
          background: #fff; outline: none; box-sizing: border-box;
          transition: border-color 0.15s, box-shadow 0.15s;
          font-family: inherit;
        }
        .cc-input:focus { border-color: #1a56db; box-shadow: 0 0 0 3px rgba(26,86,219,0.1); }
        .cc-textarea { resize: vertical; min-height: 100px; }
        .cc-hint { font-size: 0.78rem; color: #94a3b8; margin-top: 8px; }
        .cc-error {
          background: #fef2f2; color: #dc2626; border: 1px solid #fecaca;
          border-radius: 8px; padding: 10px 14px; font-size: 0.82rem;
          font-weight: 500; margin-top: 14px;
        }

        /* Dropdown */
        .cc-dropdown {
          position: absolute; top: calc(100% + 4px); left: 0; right: 0;
          background: #fff; border: 1.5px solid #e4e9f0; border-radius: 12px;
          box-shadow: 0 8px 24px rgba(0,0,0,0.12); z-index: 50; overflow: hidden;
        }
        .cc-dropdown-info { padding: 12px 16px; font-size: 0.8rem; color: #7a8898; }
        .cc-dropdown-item {
          display: flex; align-items: center; gap: 10px;
          padding: 10px 14px; cursor: pointer; transition: background 0.12s;
        }
        .cc-dropdown-item:hover { background: #eff6ff; }
        .cc-dropdown-name { font-size: 0.85rem; font-weight: 600; color: #0f1923; }
        .cc-dropdown-meta { font-size: 0.72rem; color: #7a8898; }

        /* Chips */
        .cc-chips { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 10px; }
        .cc-chip {
          display: flex; align-items: center; gap: 6px;
          background: #eff6ff; border: 1px solid #bfdbfe;
          border-radius: 99px; padding: 4px 10px 4px 6px;
          font-size: 0.78rem; font-weight: 600; color: #1e40af;
        }
        .cc-chip-static { cursor: default; }
        .cc-chip-remove {
          background: none; border: none; cursor: pointer;
          color: #93c5fd; font-size: 1rem; line-height: 1;
          padding: 0; margin-left: 2px; transition: color 0.12s;
        }
        .cc-chip-remove:hover { color: #1d4ed8; }

        /* Avatars */
        .cc-avatar-sm {
          width: 34px; height: 34px; border-radius: 50%; flex-shrink: 0;
          background: linear-gradient(135deg, #1a56db, #0e3a9e);
          color: #fff; font-size: 0.75rem; font-weight: 700;
          display: flex; align-items: center; justify-content: center;
        }
        .cc-avatar-xs {
          width: 20px; height: 20px; border-radius: 50%; flex-shrink: 0;
          background: linear-gradient(135deg, #1a56db, #0e3a9e);
          color: #fff; font-size: 0.6rem; font-weight: 700;
          display: flex; align-items: center; justify-content: center;
        }

        /* Review */
        .cc-review-item {
          background: #f8fafc; border-radius: 10px;
          padding: 12px 16px; margin-bottom: 12px;
        }
        .cc-review-label {
          font-size: 0.7rem; font-weight: 700; text-transform: uppercase;
          letter-spacing: 0.06em; color: #7a8898; margin-bottom: 6px;
        }
        .cc-review-val { font-size: 0.88rem; color: #0f1923; font-weight: 500; }

        /* Modal footer */
        .cc-modal-footer {
          display: flex; justify-content: flex-end; gap: 10px;
          padding: 14px 24px 20px;
          border-top: 1px solid #e4e9f0; flex-shrink: 0;
        }
        .cc-btn-ghost {
          border: 1.5px solid #e4e9f0; background: #f8fafc;
          color: #3a4a5c; border-radius: 10px; padding: 9px 18px;
          font-size: 0.85rem; font-weight: 600; cursor: pointer;
          transition: all 0.15s;
        }
        .cc-btn-ghost:hover { background: #e5e7eb; }
        .cc-btn-primary {
          background: linear-gradient(135deg, #1a56db, #0e3a9e);
          color: #fff; border: none; border-radius: 10px;
          padding: 9px 20px; font-size: 0.85rem; font-weight: 600;
          cursor: pointer; box-shadow: 0 2px 8px rgba(26,86,219,0.25);
          transition: all 0.15s;
        }
        .cc-btn-primary:hover:not(:disabled) { transform: translateY(-1px); box-shadow: 0 4px 12px rgba(26,86,219,0.35); }
        .cc-btn-primary:disabled { opacity: 0.5; cursor: not-allowed; }
      `}</style>
    </>
  );
}