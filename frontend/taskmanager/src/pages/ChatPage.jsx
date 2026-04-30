import React, { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../api";
import { Client } from "@stomp/stompjs";

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
      --self-bg: #edf3ff;
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
      padding: 54px 24px 92px;
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

    .cp-breadcrumb {
      display: inline-flex;
      align-items: center;
      gap: 10px;
      color: rgba(255,255,255,0.76);
      font-size: 0.86rem;
      text-decoration: none;
      margin-bottom: 18px;
    }

    .cp-breadcrumb:hover {
      color: #fff;
    }

    .cp-chat-head {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 18px;
      flex-wrap: wrap;
    }

    .cp-chat-title-wrap {
      min-width: 0;
    }

    .cp-chat-title {
      font-family: 'Playfair Display', serif;
      font-size: clamp(1.7rem, 4vw, 2.65rem);
      line-height: 1.15;
      letter-spacing: -0.03em;
      margin: 0 0 10px;
    }

    .cp-chat-meta {
      display: flex;
      flex-wrap: wrap;
      gap: 12px;
      color: rgba(255,255,255,0.7);
      font-size: 0.92rem;
    }

    .cp-dot {
      width: 9px;
      height: 9px;
      border-radius: 50%;
      background: var(--online);
      display: inline-block;
      margin-right: 6px;
      box-shadow: 0 0 0 4px rgba(22,163,74,0.14);
    }

    .cp-head-action {
      background: rgba(255,255,255,0.12);
      border: 1px solid rgba(255,255,255,0.20);
      color: #fff;
      padding: 10px 16px;
      border-radius: 12px;
      text-decoration: none;
      font-size: 0.9rem;
      font-weight: 700;
      transition: background 0.18s, transform 0.18s;
    }

    .cp-head-action:hover {
      background: rgba(255,255,255,0.18);
      transform: translateY(-1px);
    }

    .cp-shell {
      max-width: 1120px;
      margin: -52px auto 0;
      padding: 0 24px 72px;
      position: relative;
      z-index: 2;
    }

    .cp-chat-layout {
      display: grid;
      grid-template-columns: 290px 1fr;
      gap: 20px;
      align-items: start;
    }

    .cp-side-card,
    .cp-main-card {
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: 20px;
      box-shadow: 0 2px 16px rgba(0,0,0,0.05);
    }

    .cp-side-card {
      padding: 22px;
      position: sticky;
      top: 20px;
    }

    .cp-side-title {
      font-family: 'Playfair Display', serif;
      font-size: 1.2rem;
      margin: 0 0 16px;
      color: var(--ink);
    }

    .cp-side-text {
      color: var(--ink2);
      font-size: 0.92rem;
      line-height: 1.75;
      margin-bottom: 18px;
    }

    .cp-member-list {
      display: grid;
      gap: 10px;
    }

    .cp-member-item {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 10px 12px;
      border: 1px solid var(--border);
      border-radius: 14px;
      background: #fbfcfe;
    }

    .cp-avatar {
      width: 38px;
      height: 38px;
      border-radius: 50%;
      background: linear-gradient(135deg, var(--accent), var(--accent2));
      color: #fff;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      font-weight: 700;
      font-size: 0.9rem;
      flex-shrink: 0;
    }

    .cp-member-name {
      font-size: 0.9rem;
      color: var(--ink);
      font-weight: 700;
    }

    .cp-member-role {
      font-size: 0.8rem;
      color: var(--muted);
      margin-top: 2px;
    }

    .cp-main-card {
      display: flex;
      flex-direction: column;
      overflow: hidden;
      min-height: 72vh;
    }

    .cp-messages {
      padding: 26px;
      display: grid;
      gap: 14px;
      background:
        radial-gradient(circle at top right, rgba(26,86,219,0.05), transparent 28%),
        linear-gradient(to bottom, #ffffff, #fbfcfe);
      flex: 1;
      overflow: auto;
    }

    .cp-msg-row {
      display: flex;
    }

    .cp-msg-row.self {
      justify-content: flex-end;
    }

    .cp-msg-bubble {
      max-width: min(78%, 700px);
      border: 1px solid var(--border);
      background: #fff;
      border-radius: 18px;
      padding: 14px 16px 12px;
      box-shadow: 0 2px 12px rgba(0,0,0,0.04);
    }

    .cp-msg-row.self .cp-msg-bubble {
      background: var(--self-bg);
      border-color: rgba(26,86,219,0.16);
    }

    .cp-msg-top {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      margin-bottom: 8px;
    }

    .cp-msg-author {
      font-size: 0.84rem;
      font-weight: 700;
      color: var(--ink);
    }

    .cp-msg-time {
      font-size: 0.76rem;
      color: var(--muted);
      white-space: nowrap;
    }

    .cp-msg-content {
      font-size: 0.93rem;
      line-height: 1.75;
      color: var(--ink2);
      white-space: pre-wrap;
      word-break: break-word;
    }

    .cp-compose {
      border-top: 1px solid var(--border);
      padding: 18px;
      background: #fff;
    }

    .cp-compose-form {
      display: grid;
      grid-template-columns: 1fr auto;
      gap: 12px;
      align-items: end;
    }

    .cp-textarea {
      min-height: 58px;
      max-height: 180px;
      resize: vertical;
      border: 1px solid var(--border);
      border-radius: 16px;
      padding: 16px;
      font-family: inherit;
      font-size: 0.95rem;
      color: var(--ink);
      background: #fbfcfe;
      outline: none;
    }

    .cp-textarea:focus {
      border-color: rgba(26,86,219,0.34);
      box-shadow: 0 0 0 4px rgba(26,86,219,0.08);
      background: #fff;
    }

    .cp-send-btn {
      height: 56px;
      padding: 0 22px;
      border: none;
      border-radius: 14px;
      background: linear-gradient(135deg, var(--accent), var(--accent2));
      color: #fff;
      font-size: 0.92rem;
      font-weight: 700;
      cursor: pointer;
      box-shadow: 0 8px 24px rgba(26,86,219,0.22);
      transition: transform 0.18s, box-shadow 0.18s, opacity 0.18s;
    }

    .cp-send-btn:hover {
      transform: translateY(-1px);
      box-shadow: 0 12px 28px rgba(26,86,219,0.26);
    }

    .cp-send-btn:disabled {
      opacity: 0.6;
      cursor: not-allowed;
      transform: none;
      box-shadow: none;
    }

    .cp-compose-note {
      font-size: 0.8rem;
      color: var(--muted);
      margin-top: 10px;
      padding-left: 4px;
    }

    .cp-loading,
    .cp-error {
      padding: 26px;
      text-align: center;
      font-size: 0.95rem;
    }

    .cp-loading {
      color: var(--muted);
    }

    .cp-error {
      color: var(--danger);
    }

    @media (max-width: 940px) {
      .cp-chat-layout {
        grid-template-columns: 1fr;
      }

      .cp-side-card {
        position: static;
      }
    }

    @media (max-width: 700px) {
      .cp-compose-form {
        grid-template-columns: 1fr;
      }

      .cp-send-btn {
        width: 100%;
      }

      .cp-msg-bubble {
        max-width: 100%;
      }
    }
  `;
  document.head.appendChild(styleTag);
}

const WS_BASE_URL = "http://localhost:8080";

function getToken() {
  return localStorage.getItem("token");
}

function getAuthHeaders() {
  const token = getToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
}

function decodeJwtPayload(token) {
  try {
    const payload = token.split(".")[1];
    const normalized = payload.replace(/-/g, "+").replace(/_/g, "/");
    return JSON.parse(atob(normalized));
  } catch {
    return null;
  }
}

function getCurrentUserId() {
  const token = getToken();
  if (!token) return null;
  const payload = decodeJwtPayload(token);
  if (!payload) return null;
  return Number(payload.userId ?? payload.id ?? payload.sub) || null;
}

function formatMessageTime(value) {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

// DTOs:
// MessageResponse { messageId, chat: ChatResponse, profile: ProfileResponse, content, createdAt }
// ChatResponse    { chatId, title, about, members: ProfileResponse[], messages: MessageResponse[] }
// ProfileResponse { id, orcid, name, lastName, birthday, degree, profileImage }
function mapMessage(raw) {
  return {
    messageId: raw.messageId,
    chatId:    raw.chat?.chatId,
    userId:    raw.profile?.id,
    userName:  [raw.profile?.name, raw.profile?.lastName].filter(Boolean).join(" ") || `User #${raw.profile?.id}`,
    avatar:    raw.profile?.profileImage ?? null,
    content:   raw.content,
    createdAt: raw.createdAt,
  };
}



export default function ChatPage() {
  const { chat_id } = useParams();

  const [channel, setChannel]   = useState(null);
  const [messages, setMessages] = useState([]);
  const [content, setContent]   = useState("");
  const [loading, setLoading]   = useState(true);
  const [sending, setSending]   = useState(false);
  const [error, setError]       = useState("");
  const [connected, setConnected] = useState(false);
  const messageQueueRef = useRef([]);

  const stompClientRef = useRef(null);
  const messagesEndRef = useRef(null);

  const currentUserId = getCurrentUserId();

  useEffect(() => { ensureChatStyles(); }, []);

  useEffect(() => {
      if (!chat_id) return;
      fetchChatPageData();
      startPolling();
      return () => stopPolling();
  }, [chat_id]);

  useEffect(() => { scrollToBottom(); }, [messages]);

  async function fetchChatPageData() {
    setLoading(true);
    setError("");
    try {
      const [channelRes, messagesRes] = await Promise.all([
        api.get(`/chats/${chat_id}`,                         { headers: getAuthHeaders() }),
        api.get(`/chats/${chat_id}/messages?page=0&size=50`, { headers: getAuthHeaders() }),
      ]);

      setChannel(channelRes.data);

      const pageData     = messagesRes.data;
      const contentArray = Array.isArray(pageData) ? pageData : (pageData.content ?? []);
      setMessages(contentArray.map(mapMessage));
    } catch (err) {
      console.error("Failed to load chat page", err);
      setError("Failed to load chat.");
    } finally {
      setLoading(false);
    }
  }



const pollRef = useRef(null);

function startPolling() {
    pollRef.current = setInterval(async () => {
        try {
            const res = await api.get(`/chats/${chat_id}/messages?page=0&size=50`, {
                headers: getAuthHeaders()
            });
            const pageData = res.data;
            const contentArray = Array.isArray(pageData) ? pageData : (pageData.content ?? []);
            const mapped = contentArray.map(mapMessage);

            setMessages((prev) => {
                // добавляем только новые
                const existingIds = new Set(prev.map(m => m.messageId));
                const newOnes = mapped.filter(m => !existingIds.has(m.messageId));
                return newOnes.length > 0 ? [...prev, ...newOnes] : prev;
            });
        } catch (err) {
            console.error("Polling error:", err);
        }
    }, 3000); // каждые 3 секунды
}

function stopPolling() {
    if (pollRef.current) {
        clearInterval(pollRef.current);
        pollRef.current = null;
    }
}

  function scrollToBottom() {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }

async function handleSend(e) {
    e.preventDefault();
    const trimmed = content.trim();
    if (!trimmed) return;

    setSending(true);
    try {
        await api.post(`/chats/${chat_id}/messages`,
            { content: trimmed },
            { headers: getAuthHeaders() }
        );
        setContent("");
    } catch (err) {
        console.error("Failed to send message", err);
    } finally {
        setSending(false);
    }
}

  return (
    <div className="cp-page">
      <section className="cp-hero">
        <div className="cp-hero-inner">
          <Link to="/chats" className="cp-breadcrumb">← Back to chats</Link>

          <div className="cp-chat-head">
            <div className="cp-chat-title-wrap">
              {/* ChatResponse.title */}
              <h1 className="cp-chat-title">{channel?.title || `Chat #${chat_id}`}</h1>
              <div className="cp-chat-meta">
                <span><span className="cp-dot" />Live group channel</span>
                {/* ChatResponse.members.length */}
                <span>{channel?.members?.length ?? 0} members</span>
                <span>Chat #{chat_id}</span>
              </div>
            </div>
            <Link to="/chats" className="cp-head-action">View all chats</Link>
          </div>
        </div>
      </section>

      <main className="cp-shell">
        <div className="cp-chat-layout">

          <aside className="cp-side-card">
            <h2 className="cp-side-title">About this chat</h2>
            {/* ChatResponse.about */}
            <div className="cp-side-text">
              {channel?.about || "Collaborative communication space for this research group."}
            </div>

            <h3 className="cp-side-title" style={{ fontSize: "1.05rem", marginTop: 4 }}>
              Members
            </h3>

            <div className="cp-member-list">
              {(channel?.members ?? []).map((member) => (
                <div className="cp-member-item" key={member.id}>
                  <div className="cp-avatar">
                    {member.profileImage
                      ? <img src={member.profileImage} alt={member.name} />
                      : (member.name?.[0] ?? "U").toUpperCase()
                    }
                  </div>
                  <div>
                    {/* ProfileResponse.name + ProfileResponse.lastName */}
                    <div className="cp-member-name">
                      {[member.name, member.lastName].filter(Boolean).join(" ")}
                    </div>
                    {/* ProfileResponse.degree */}
                    <div className="cp-member-role">{member.degree ?? "Researcher"}</div>
                  </div>
                </div>
              ))}
            </div>
          </aside>

          <section className="cp-main-card">
            {loading ? (
              <div className="cp-loading">Loading messages…</div>
            ) : error ? (
              <div className="cp-error">{error}</div>
            ) : (
              <>
                <div className="cp-messages">
                  {messages.map((message) => {
                    const isSelf =
                      currentUserId !== null &&
                      Number(message.userId) === Number(currentUserId);

                    return (
                      <div
                        key={message.messageId}
                        className={`cp-msg-row ${isSelf ? "self" : ""}`}
                      >
                        <div className="cp-msg-bubble">
                          <div className="cp-msg-top">
                            {/* userName built from ProfileResponse.name + ProfileResponse.lastName */}
                            <div className="cp-msg-author">
                              {isSelf ? "You" : message.userName}
                            </div>
                            <div className="cp-msg-time">
                              {formatMessageTime(message.createdAt)}
                            </div>
                          </div>
                          <div className="cp-msg-content">{message.content}</div>
                        </div>
                      </div>
                    );
                  })}
                  <div ref={messagesEndRef} />
                </div>

                <div className="cp-compose">
                  <form className="cp-compose-form" onSubmit={handleSend}>
                    <textarea
                      className="cp-textarea"
                      placeholder="Write your message to the group…"
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                          e.preventDefault();
                          handleSend(e);
                        }
                      }}
                    />
                    <button
                      className="cp-send-btn"
                      type="submit"
                      disabled={!content.trim() || sending}
                    >
                      {sending ? "Sending…" : "Send message"}
                    </button>
                  </form>
                  <div className="cp-compose-note">
                    Connected to REST history + WebSocket live updates. Enter to send.
                  </div>
                </div>
              </>
            )}
          </section>

        </div>
      </main>
    </div>
  );
}

