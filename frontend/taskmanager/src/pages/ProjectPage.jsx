import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api";

const fontLink = document.createElement("link");
fontLink.rel = "stylesheet";
fontLink.href = "https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,300;0,600;0,700;1,400&family=DM+Sans:wght@300;400;500;600&display=swap";
document.head.appendChild(fontLink);

/* ─── Styles ─────────────────────────────────────────────────────────────── */
const styleTag = document.createElement("style");
styleTag.textContent = `
  :root {
    --pv2-bg:        #f5f7fa;
    --pv2-surface:   #ffffff;
    --pv2-surface2:  #f0f3f8;
    --pv2-border:    #e1e6f0;
    --pv2-border2:   #ccd3e0;
    --pv2-ink:       #0d1117;
    --pv2-ink2:      #3d4a5c;
    --pv2-muted:     #7a8898;
    --pv2-accent:    #2563eb;
    --pv2-accent-bg: #dbeafe;
    --pv2-green:     #16a34a;
    --pv2-green-bg:  #dcfce7;
    --pv2-amber:     #d97706;
    --pv2-amber-bg:  #fef3c7;
    --pv2-gray-bg:   #f1f5f9;
    --pv2-shadow:    0 1px 4px rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.06);
    --pv2-shadow-lg: 0 8px 32px rgba(0,0,0,0.10);
    --pv2-radius:    14px;
    --pv2-radius-lg: 20px;
  }

  * { box-sizing: border-box; margin: 0; padding: 0; }

  .pv2-root {
    font-family: 'DM Sans', sans-serif;
    background: var(--pv2-bg);
    min-height: 100vh;
    color: var(--pv2-ink);
  }

  /* ── hero banner ── */
  .pv2-hero {
    background: linear-gradient(135deg, #0f1f3d 0%, #1a3160 50%, #1e40af 100%);
    padding: 0;
    position: relative;
    overflow: hidden;
  }
  .pv2-hero::before {
    content: '';
    position: absolute; inset: 0;
    background:
      radial-gradient(ellipse 50% 100% at 90% 50%, rgba(96,165,250,0.18) 0%, transparent 60%),
      radial-gradient(ellipse 30% 60% at 10% 80%, rgba(30,64,175,0.3) 0%, transparent 60%);
  }
  .pv2-hero-grid {
    position: absolute; inset: 0;
    background-image: linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
                      linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
    background-size: 40px 40px;
  }
  .pv2-hero-inner {
    position: relative; z-index: 1;
    padding: 52px 56px 80px;
    max-width: 100%;
  }

  .pv2-back-btn {
    display: inline-flex; align-items: center; gap: 7px;
    background: rgba(255,255,255,0.08);
    border: 1px solid rgba(255,255,255,0.15);
    border-radius: 9px;
    padding: 8px 16px;
    font-size: 0.78rem; font-weight: 500;
    color: rgba(255,255,255,0.75);
    cursor: pointer;
    margin-bottom: 40px;
    transition: background 0.15s, color 0.15s;
    font-family: 'DM Sans', sans-serif;
    text-decoration: none;
  }
  .pv2-back-btn:hover { background: rgba(255,255,255,0.14); color: #fff; }

  .pv2-hero-eyebrow {
    font-size: 0.68rem; font-weight: 600;
    letter-spacing: 0.18em; text-transform: uppercase;
    color: rgba(147,197,253,0.9);
    margin-bottom: 14px;
    display: flex; align-items: center; gap: 10px;
  }
  .pv2-hero-eyebrow::before {
    content: '';
    display: inline-block;
    width: 24px; height: 1.5px;
    background: rgba(147,197,253,0.6);
  }

  .pv2-hero-title {
    font-family: 'Fraunces', serif;
    font-size: clamp(1.8rem, 4vw, 3rem);
    font-weight: 600;
    color: #ffffff;
    line-height: 1.2;
    margin-bottom: 24px;
    max-width: 700px;
  }

  .pv2-hero-chips {
    display: flex; gap: 10px; flex-wrap: wrap;
  }
  .pv2-hero-chip {
    display: inline-flex; align-items: center; gap: 6px;
    background: rgba(255,255,255,0.09);
    border: 1px solid rgba(255,255,255,0.15);
    border-radius: 100px;
    padding: 5px 14px;
    font-size: 0.76rem; font-weight: 500;
    color: rgba(255,255,255,0.8);
  }

  /* ── status badge ── */
  .pv2-status {
    display: inline-flex; align-items: center; gap: 6px;
    font-size: 0.72rem; font-weight: 700;
    padding: 5px 14px; border-radius: 100px;
    text-transform: uppercase; letter-spacing: 0.06em;
  }
  .pv2-status::before { content: '●'; font-size: 0.5rem; }
  .pv2-status-active   { background: var(--pv2-green-bg);  color: var(--pv2-green); }
  .pv2-status-finished { background: var(--pv2-accent-bg); color: var(--pv2-accent); }
  .pv2-status-pending  { background: var(--pv2-amber-bg);  color: var(--pv2-amber); }
  .pv2-status-default  { background: var(--pv2-gray-bg);   color: var(--pv2-muted); border: 1px solid var(--pv2-border); }

  /* ── main body ── */
  .pv2-body {
    padding: 0 56px 80px;
    margin-top: -36px;
    position: relative; z-index: 2;
    display: grid;
    grid-template-columns: 1fr 300px;
    gap: 24px;
    align-items: start;
  }
  @media (max-width: 900px) {
    .pv2-body { grid-template-columns: 1fr; padding: 0 20px 60px; }
    .pv2-hero-inner { padding: 36px 20px 60px; }
  }

  /* ── card ── */
  .pv2-card {
    background: var(--pv2-surface);
    border: 1px solid var(--pv2-border);
    border-radius: var(--pv2-radius-lg);
    box-shadow: var(--pv2-shadow);
    overflow: hidden;
    margin-bottom: 20px;
  }
  .pv2-card-header {
    padding: 22px 28px 18px;
    border-bottom: 1px solid var(--pv2-border);
    display: flex; align-items: center; gap: 12px;
  }
  .pv2-card-icon {
    width: 36px; height: 36px; border-radius: 10px;
    display: flex; align-items: center; justify-content: center;
    font-size: 1rem; flex-shrink: 0;
  }
  .pv2-card-title {
    font-family: 'Fraunces', serif;
    font-size: 1rem; font-weight: 600;
    color: var(--pv2-ink);
  }
  .pv2-card-body { padding: 24px 28px; }

  /* ── purpose text ── */
  .pv2-purpose-text {
    font-size: 0.92rem;
    color: var(--pv2-ink2);
    line-height: 1.8;
    font-weight: 300;
  }

  /* ── tasks list ── */
  .pv2-tasks { display: flex; flex-direction: column; gap: 10px; }
  .pv2-task-item {
    display: flex; align-items: flex-start; gap: 14px;
    padding: 14px 18px;
    background: var(--pv2-surface2);
    border: 1px solid var(--pv2-border);
    border-radius: 10px;
    transition: border-color 0.15s, box-shadow 0.15s;
  }
  .pv2-task-item:hover {
    border-color: var(--pv2-border2);
    box-shadow: 0 2px 8px rgba(0,0,0,0.05);
  }
  .pv2-task-num {
    width: 24px; height: 24px; border-radius: 50%;
    background: var(--pv2-accent-bg);
    color: var(--pv2-accent);
    font-size: 0.68rem; font-weight: 800;
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0; margin-top: 1px;
  }
  .pv2-task-text { font-size: 0.87rem; color: var(--pv2-ink2); line-height: 1.5; }

  /* ── result ── */
  .pv2-result-box {
    background: linear-gradient(135deg, #eff6ff, #f5f3ff);
    border: 1px solid #c7d7fe;
    border-radius: 12px;
    padding: 20px 22px;
    display: flex; gap: 16px; align-items: flex-start;
  }
  .pv2-result-icon { font-size: 1.4rem; flex-shrink: 0; margin-top: 2px; }
  .pv2-result-text { font-size: 0.88rem; color: var(--pv2-ink2); line-height: 1.7; font-weight: 400; }

  /* ── pictures ── */
  .pv2-pictures-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
    gap: 10px;
  }
  .pv2-picture {
    aspect-ratio: 4/3;
    border-radius: 10px;
    overflow: hidden;
    background: var(--pv2-surface2);
    border: 1px solid var(--pv2-border);
  }
  .pv2-picture img { width: 100%; height: 100%; object-fit: cover; }
  .pv2-picture-placeholder {
    width: 100%; height: 100%;
    display: flex; align-items: center; justify-content: center;
    font-size: 1.5rem; color: var(--pv2-muted);
  }

  /* ── sidebar cards ── */
  .pv2-side-card {
    background: var(--pv2-surface);
    border: 1px solid var(--pv2-border);
    border-radius: var(--pv2-radius);
    box-shadow: var(--pv2-shadow);
    padding: 20px 22px;
    margin-bottom: 16px;
  }
  .pv2-side-title {
    font-family: 'Fraunces', serif;
    font-size: 0.9rem; font-weight: 600;
    color: var(--pv2-ink);
    margin-bottom: 14px;
    display: flex; align-items: center; gap: 8px;
  }
  .pv2-side-count {
    font-family: 'DM Sans', sans-serif;
    font-size: 0.68rem; font-weight: 600;
    background: var(--pv2-surface2);
    border: 1px solid var(--pv2-border);
    border-radius: 100px;
    padding: 2px 8px;
    color: var(--pv2-muted);
  }

  /* ── member row ── */
  .pv2-member {
    display: flex; align-items: center; gap: 12px;
    padding: 10px 0;
    border-bottom: 1px solid var(--pv2-border);
  }
  .pv2-member:last-child { border-bottom: none; padding-bottom: 0; }
  .pv2-member-avatar {
    width: 36px; height: 36px; border-radius: 50%;
    background: linear-gradient(135deg, #1e3a8a, #2563eb);
    display: flex; align-items: center; justify-content: center;
    font-size: 0.75rem; font-weight: 700; color: #fff;
    flex-shrink: 0;
  }
  .pv2-member-name { font-size: 0.84rem; font-weight: 600; color: var(--pv2-ink); }
  .pv2-member-role { font-size: 0.72rem; color: var(--pv2-muted); margin-top: 1px; }

  /* ── stat ── */
  .pv2-stat-row {
    display: flex; justify-content: space-between; align-items: center;
    padding: 10px 0;
    border-bottom: 1px solid var(--pv2-border);
    font-size: 0.82rem;
  }
  .pv2-stat-row:last-child { border-bottom: none; }
  .pv2-stat-label { color: var(--pv2-muted); }
  .pv2-stat-value { font-weight: 600; color: var(--pv2-ink); }

  /* ── empty ── */
  .pv2-empty {
    text-align: center; padding: 32px 20px;
    color: var(--pv2-muted); font-size: 0.82rem;
  }

  /* ── skeleton loader ── */
  .pv2-skeleton {
    background: linear-gradient(90deg, #e8ecf2 25%, #f5f7fa 50%, #e8ecf2 75%);
    background-size: 200% 100%;
    animation: shimmer 1.4s infinite;
    border-radius: 8px;
  }
  @keyframes shimmer { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(14px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .pv2-fade { animation: fadeUp 0.4s ease both; }
  .pv2-fade-1 { animation: fadeUp 0.4s 0.05s ease both; }
  .pv2-fade-2 { animation: fadeUp 0.4s 0.1s ease both; }
  .pv2-fade-3 { animation: fadeUp 0.4s 0.15s ease both; }
  .pv2-fade-4 { animation: fadeUp 0.4s 0.2s ease both; }
`;
document.head.appendChild(styleTag);

/* ─── Helpers ────────────────────────────────────────────────────────────── */
const statusClass = (s) => {
  if (!s) return "pv2-status-default";
  switch (s.toUpperCase()) {
    case "ACTIVE":   return "pv2-status-active";
    case "FINISHED": return "pv2-status-finished";
    case "PENDING":  return "pv2-status-pending";
    default:         return "pv2-status-default";
  }
};

const stateClass = (s) => {
  if (!s) return "pv2-status-default";
  switch (s.toUpperCase()) {
    case "FINISHED":        return "pv2-status-finished";
    case "IN_PROGRESS": return "pv2-status-active";
    case "NEW":        return "pv2-status-pending";
    default:            return "pv2-status-default";
  }
};

const initials = (name) => {
  if (!name) return "?";
  const parts = name.trim().split(" ");
  return parts.length >= 2
    ? `${parts[0][0]}${parts[1][0]}`.toUpperCase()
    : parts[0][0].toUpperCase();
};

const fmt = (dt) => {
  if (!dt) return "—";
  try {
    return new Date(dt).toLocaleDateString("en-GB", {
      day: "2-digit", month: "short", year: "numeric",
    });
  } catch { return dt; }
};

const toInputDT = (dt) => {
  if (!dt) return "";
  try { return new Date(dt).toISOString().slice(0, 16); }
  catch { return ""; }
};

/* ─── Task Modal ─────────────────────────────────────────────────────────── */
function TaskModal({ mode, task, projectId, members, onClose, onSaved, onDeleted, onCompleted }) {
  const isView     = mode === "view";
  const isDel      = mode === "delete-confirm";
  const isEdit     = mode === "edit";
  const isCreate   = mode === "create";
  const isComplete = mode === "complete-confirm";

  const [form, setForm] = useState(
    isEdit || isCreate
      ? {
          title:       task?.title       ?? "",
          description: task?.description ?? "",
          start:       toInputDT(task?.start),
          finish:      toInputDT(task?.finish),
          state:       task?.state       ?? "TODO",
          reportPath:  task?.reportPath  ?? "",
          assigneeIds: (task?.assignee ?? []).map((p) => p.id),
        }
      : {}
  );
  const [saving,     setSaving]     = useState(false);
  const [deleting,   setDeleting]   = useState(false);
  const [completing, setCompleting] = useState(false);
  const [err,        setErr]        = useState("");

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const toggleAssignee = (id) => {
    set(
      "assigneeIds",
      form.assigneeIds.includes(id)
        ? form.assigneeIds.filter((x) => x !== id)
        : [...form.assigneeIds, id]
    );
  };

  const handleSave = async () => {
    if (!form.title.trim()) { setErr("Title is required."); return; }
    setSaving(true); setErr("");
    try {
      const assignee = (members ?? []).filter((m) => form.assigneeIds.includes(m.id));

      if (isCreate) {
        const body = {
          title:       form.title,
          description: form.description,
          start:       form.start  || null,
          finish:      form.finish || null,
          assignee,
        };
        const r = await api.post(`/projects/${projectId}/tasks`, body);
        onSaved(r.data, "create");
      } else {
        const body = {
          title:       form.title,
          description: form.description,
          start:       form.start  || null,
          finish:      form.finish || null,
          state:       form.state,
          reportPath:  form.reportPath,
          assignee,
        };
        const r = await api.put(`/projects/${projectId}/tasks/${task.id}`, body);
        onSaved(r.data, "edit");
      }
    } catch (e) {
      setErr(e?.response?.data?.message ?? "Something went wrong.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    setDeleting(true); setErr("");
    try {
      await api.delete(`/projects/${projectId}/tasks/${task.id}`);
      onDeleted(task.id);
    } catch (e) {
      setErr(e?.response?.data?.message ?? "Failed to delete.");
      setDeleting(false);
    }
  };

  const handleComplete = async () => {
    setCompleting(true); setErr("");
    try {
      await api.patch(`/projects/${projectId}/tasks/${task.id}/complete`);
      onCompleted(task.id);
    } catch (e) {
      setErr(e?.response?.data?.message ?? "Failed to complete task.");
      setCompleting(false);
    }
  };

  return (
    <div className="pv2-modal-backdrop" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className={`pv2-modal ${isDel || isComplete ? "pv2-modal-sm" : ""}`}>

        {/* Header */}
        <div className="pv2-modal-header">
          <div className="pv2-modal-title">
            {isCreate   && "➕ New Task"}
            {isEdit     && "✏️ Edit Task"}
            {isView     && "📋 Task Detail"}
            {isDel      && "🗑️ Delete Task"}
            {isComplete && "✅ Complete Task"}
          </div>
          <button className="pv2-modal-close" onClick={onClose}>✕</button>
        </div>

        {/* Body */}
        <div className="pv2-modal-body">

          {/* ── VIEW ── */}
          {isView && task && (
            <div>
              <h2 className="pv2-modal-view-title">{task.title}</h2>
              {task.description && (
                <p className="pv2-modal-view-desc">{task.description}</p>
              )}
              <div className="pv2-modal-meta-grid">
                <div className="pv2-modal-meta-item">
                  <span className="pv2-modal-meta-label">State</span>
                  <span className={`pv2-status ${stateClass(task.state)}`}>{task.state ?? "—"}</span>
                </div>
                <div className="pv2-modal-meta-item">
                  <span className="pv2-modal-meta-label">Start</span>
                  <span className="pv2-modal-meta-val">{fmt(task.start)}</span>
                </div>
                <div className="pv2-modal-meta-item">
                  <span className="pv2-modal-meta-label">Finish</span>
                  <span className="pv2-modal-meta-val">{fmt(task.finish)}</span>
                </div>
                {task.reportPath && (
                  <div className="pv2-modal-meta-item" style={{ gridColumn: "1/-1" }}>
                    <span className="pv2-modal-meta-label">Report</span>
                    <a href={task.reportPath} target="_blank" rel="noreferrer" className="pv2-modal-link">
                      {task.reportPath}
                    </a>
                  </div>
                )}
              </div>
              {task.assignee?.length > 0 && (
                <div style={{ marginTop: 20 }}>
                  <div className="pv2-modal-section-label">Assignees</div>
                  <div className="pv2-modal-assignee-list">
                    {task.assignee.map((p) => (
                      <div key={p.id} className="pv2-member" style={{ padding: "8px 0" }}>
                        <div className="pv2-member-avatar">
                          {initials(`${p.name} ${p.lastName ?? ""}`)}
                        </div>
                        <div>
                          <div className="pv2-member-name">{p.name} {p.lastName ?? ""}</div>
                          <div className="pv2-member-role">{p.degree ?? "Researcher"}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ── DELETE CONFIRM ── */}
          {isDel && (
            <div style={{ textAlign: "center", padding: "8px 0 16px" }}>
              <div style={{ fontSize: "2.4rem", marginBottom: 12 }}>⚠️</div>
              <p style={{ color: "var(--pv2-ink)", fontWeight: 600, marginBottom: 6 }}>
                Delete "{task?.title}"?
              </p>
              <p style={{ color: "var(--pv2-muted)", fontSize: "0.85rem" }}>
                This action cannot be undone.
              </p>
              {err && <div className="pv2-form-error" style={{ marginTop: 12 }}>{err}</div>}
            </div>
          )}

          {/* ── COMPLETE CONFIRM ── */}
          {isComplete && (
            <div style={{ textAlign: "center", padding: "8px 0 16px" }}>
              <div style={{ fontSize: "2.4rem", marginBottom: 12 }}>✅</div>
              <p style={{ color: "var(--pv2-ink)", fontWeight: 600, marginBottom: 6 }}>
                Mark "{task?.title}" as complete?
              </p>
              <p style={{ color: "var(--pv2-muted)", fontSize: "0.85rem" }}>
                This will set the task state to DONE.
              </p>
              {err && <div className="pv2-form-error" style={{ marginTop: 12 }}>{err}</div>}
            </div>
          )}

          {/* ── CREATE / EDIT FORM ── */}
          {(isCreate || isEdit) && (
            <div className="pv2-form">
              <div className="pv2-form-group">
                <label className="pv2-form-label">
                  Title <span style={{ color: "#e53e3e" }}>*</span>
                </label>
                <input
                  className="pv2-form-input"
                  value={form.title}
                  onChange={(e) => set("title", e.target.value)}
                  placeholder="Task title"
                />
              </div>

              <div className="pv2-form-group">
                <label className="pv2-form-label">Description</label>
                <textarea
                  className="pv2-form-input pv2-form-textarea"
                  value={form.description}
                  onChange={(e) => set("description", e.target.value)}
                  placeholder="Describe the task…"
                  rows={3}
                />
              </div>

              <div className="pv2-form-row">
                <div className="pv2-form-group">
                  <label className="pv2-form-label">Start</label>
                  <input
                    type="datetime-local"
                    className="pv2-form-input"
                    value={form.start}
                    onChange={(e) => set("start", e.target.value)}
                  />
                </div>
                <div className="pv2-form-group">
                  <label className="pv2-form-label">Finish</label>
                  <input
                    type="datetime-local"
                    className="pv2-form-input"
                    value={form.finish}
                    onChange={(e) => set("finish", e.target.value)}
                  />
                </div>
              </div>

              {isEdit && (
                <>
                  <div className="pv2-form-group">
                    <label className="pv2-form-label">State</label>
                    <select
                      className="pv2-form-input pv2-form-select"
                      value={form.state}
                      onChange={(e) => set("state", e.target.value)}
                    >
                      <option value="TODO">TODO</option>
                      <option value="IN_PROGRESS">IN_PROGRESS</option>
                      <option value="DONE">DONE</option>
                    </select>
                  </div>
                  <div className="pv2-form-group">
                    <label className="pv2-form-label">Report Path</label>
                    <input
                      className="pv2-form-input"
                      value={form.reportPath}
                      onChange={(e) => set("reportPath", e.target.value)}
                      placeholder="https://…"
                    />
                  </div>
                </>
              )}

              <div className="pv2-form-group">
                <label className="pv2-form-label">Assignees</label>
                {members?.length > 0 ? (
                  <div className="pv2-assignee-picker">
                    {members.map((m) => {
                      const checked = form.assigneeIds.includes(m.id);
                      return (
                        <div
                          key={m.id}
                          className={`pv2-assignee-option ${checked ? "pv2-assignee-selected" : ""}`}
                          onClick={() => toggleAssignee(m.id)}
                        >
                          <div className="pv2-member-avatar" style={{ width: 30, height: 30, fontSize: "0.7rem" }}>
                            {initials(`${m.name} ${m.lastName ?? ""}`)}
                          </div>
                          <div style={{ flex: 1 }}>
                            <div style={{ fontSize: "0.82rem", fontWeight: 600, color: "var(--pv2-ink)" }}>
                              {m.name} {m.lastName ?? ""}
                            </div>
                            <div style={{ fontSize: "0.72rem", color: "var(--pv2-muted)" }}>
                              {m.degree ?? "Researcher"}
                            </div>
                          </div>
                          <div className={`pv2-assignee-check ${checked ? "pv2-assignee-check-on" : ""}`}>
                            {checked ? "✓" : ""}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="pv2-empty">No project members to assign.</div>
                )}
              </div>

              {err && <div className="pv2-form-error">{err}</div>}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="pv2-modal-footer">
          {isView && (
            <button className="pv2-btn pv2-btn-ghost" onClick={onClose}>Close</button>
          )}
          {isDel && (
            <>
              <button className="pv2-btn pv2-btn-ghost"  onClick={onClose}     disabled={deleting}>Cancel</button>
              <button className="pv2-btn pv2-btn-danger" onClick={handleDelete} disabled={deleting}>
                {deleting ? "Deleting…" : "Delete"}
              </button>
            </>
          )}
          {(isCreate || isEdit) && (
            <>
              <button className="pv2-btn pv2-btn-ghost"   onClick={onClose}   disabled={saving}>Cancel</button>
              <button className="pv2-btn pv2-btn-primary" onClick={handleSave} disabled={saving}>
                {saving ? "Saving…" : isCreate ? "Create Task" : "Save Changes"}
              </button>
            </>
          )}
          {isComplete && (
            <>
              <button className="pv2-btn pv2-btn-ghost"    onClick={onClose}        disabled={completing}>Cancel</button>
              <button className="pv2-btn pv2-btn-complete" onClick={handleComplete}  disabled={completing}>
                {completing ? "Completing…" : "Mark Complete"}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

/* ─── Task Card ──────────────────────────────────────────────────────────── */
function TaskCard({ task, onView, onEdit, onDelete, onComplete }) {
  const isDone = task.state === "DONE";
  return (
    <div className="pv2-task-card">
      <div className="pv2-task-card-top">
        <div className="pv2-task-card-title">{task.title}</div>
        <span className={`pv2-status ${stateClass(task.state)}`} style={{ fontSize: "0.72rem", flexShrink: 0 }}>
          {task.state ?? "TODO"}
        </span>
      </div>
      {task.description && (
        <p className="pv2-task-card-desc">{task.description}</p>
      )}
      <div className="pv2-task-card-meta">
        {task.start && (
          <span className="pv2-task-card-date">📅 {fmt(task.start)} → {fmt(task.finish)}</span>
        )}
        {task.assignee?.length > 0 && (
          <div className="pv2-task-card-avatars">
            {task.assignee.slice(0, 4).map((p) => (
              <div key={p.id} className="pv2-task-avatar" title={`${p.name} ${p.lastName ?? ""}`}>
                {initials(`${p.name} ${p.lastName ?? ""}`)}
              </div>
            ))}
            {task.assignee.length > 4 && (
              <div className="pv2-task-avatar pv2-task-avatar-more">+{task.assignee.length - 4}</div>
            )}
          </div>
        )}
      </div>
      <div className="pv2-task-card-actions">
        <button className="pv2-task-action" onClick={() => onView(task)}>👁 View</button>
        <button className="pv2-task-action" onClick={() => onEdit(task)}>✏️ Edit</button>
        <button
          className="pv2-task-action pv2-task-action-complete"
          onClick={() => onComplete(task)}
          disabled={isDone}
          title={isDone ? "Already completed" : "Mark as complete"}
        >
          {isDone ? "✅ Done" : "✓ Complete"}
        </button>
        <button className="pv2-task-action pv2-task-action-del" onClick={() => onDelete(task)}>🗑️</button>
      </div>
    </div>
  );
}

/* ─── Skeleton ───────────────────────────────────────────────────────────── */
function Skeleton() {
  return (
    <div className="pv2-root">
      <div className="pv2-hero">
        <div className="pv2-hero-inner">
          <div className="pv2-skeleton" style={{ width: 80,  height: 32, marginBottom: 40 }} />
          <div className="pv2-skeleton" style={{ width: 160, height: 14, marginBottom: 16 }} />
          <div className="pv2-skeleton" style={{ width: 480, height: 42, marginBottom: 12 }} />
          <div className="pv2-skeleton" style={{ width: 320, height: 28 }} />
        </div>
      </div>
      <div className="pv2-body">
        <div>
          {[180, 240, 160].map((h, i) => (
            <div key={i} className="pv2-card" style={{ marginBottom: 20 }}>
              <div style={{ padding: "22px 28px" }}>
                <div className="pv2-skeleton" style={{ width: 120, height: 18, marginBottom: 16 }} />
                <div className="pv2-skeleton" style={{ width: "100%", height: h }} />
              </div>
            </div>
          ))}
        </div>
        <div>
          <div className="pv2-side-card">
            <div className="pv2-skeleton" style={{ width: 100, height: 16, marginBottom: 16 }} />
            {[1, 2, 3].map((i) => (
              <div key={i} style={{ display: "flex", gap: 12, padding: "10px 0", borderBottom: "1px solid #e1e6f0" }}>
                <div className="pv2-skeleton" style={{ width: 36, height: 36, borderRadius: "50%", flexShrink: 0 }} />
                <div style={{ flex: 1 }}>
                  <div className="pv2-skeleton" style={{ width: "70%", height: 13, marginBottom: 6 }} />
                  <div className="pv2-skeleton" style={{ width: "40%", height: 11 }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Main ───────────────────────────────────────────────────────────────── */
export default function ProjectView() {
  const { profile_id, project_id } = useParams();
  const navigate = useNavigate();

  const [project,      setProject]      = useState(null);
  const [tasks,        setTasks]        = useState([]);
  const [loading,      setLoading]      = useState(true);
  const [tasksLoading, setTasksLoading] = useState(true);
  const [error,        setError]        = useState("");

  // modal: { mode: "create"|"edit"|"view"|"delete-confirm", task: obj|null }
  const [modal, setModal] = useState(null);

  /* ── Fetch project ── */
  useEffect(() => {
    api.get(`/profiles/${profile_id}/projects/${project_id}`)
      .then((r) => setProject(r.data))
      .catch(() => setError("Failed to load project."))
      .finally(() => setLoading(false));
  }, [profile_id, project_id]);

  /* ── Fetch tasks ── */
  useEffect(() => {
    api.get(`/projects/${project_id}/tasks`)
      .then((r) => setTasks(r.data ?? []))
      .catch(() => setTasks([]))
      .finally(() => setTasksLoading(false));
  }, [profile_id]);

  /* ── Modal helpers ── */
  const openCreate   = ()     => setModal({ mode: "create",           task: null });
  const openView     = (task) => setModal({ mode: "view",             task });
  const openEdit     = (task) => setModal({ mode: "edit",             task });
  const openDelete   = (task) => setModal({ mode: "delete-confirm",   task });
  const openComplete = (task) => setModal({ mode: "complete-confirm", task });
  const closeModal   = ()     => setModal(null);

  const handleSaved = (saved, mode) => {
    if (mode === "create") {
      setTasks((prev) => [...prev, saved]);
    } else {
      setTasks((prev) => prev.map((t) => (t.id === saved.id ? saved : t)));
    }
    closeModal();
  };

  const handleDeleted = (id) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
    closeModal();
  };

  const handleCompleted = (id) => {
    setTasks((prev) => prev.map((t) => t.id === id ? { ...t, state: "DONE" } : t));
    closeModal();
  };

  if (loading) return <Skeleton />;

  if (error || !project) {
    return (
      <div className="pv2-root" style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh" }}>
        <div style={{ textAlign: "center", color: "var(--pv2-muted)" }}>
          <div style={{ fontSize: "2.5rem", marginBottom: 12 }}>⚠️</div>
          <div style={{ fontWeight: 600, marginBottom: 8, color: "var(--pv2-ink)" }}>Project not found</div>
          <div style={{ fontSize: "0.82rem", marginBottom: 24 }}>{error}</div>
          <button
            className="pv2-back-btn"
            style={{ background: "var(--pv2-surface)", color: "var(--pv2-ink2)", border: "1px solid var(--pv2-border)" }}
            onClick={() => navigate(`/profiles/${profile_id}`)}
          >
            ← Back to Profile
          </button>
        </div>
      </div>
    );
  }

  const members = project.profiles ?? [];
  const doneCnt = tasks.filter((t) => t.state === "DONE").length;

  return (
    <div className="pv2-root">

      {/* ── Modal ── */}
      {modal && (
        <TaskModal
          mode={modal.mode}
          task={modal.task}
          projectId={project_id}
          members={members}
          onClose={closeModal}
          onSaved={handleSaved}
          onDeleted={handleDeleted}
          onCompleted={handleCompleted}
        />
      )}

      {/* ── Hero ── */}
      <div className="pv2-hero">
        <div className="pv2-hero-grid" />
        <div className="pv2-hero-inner pv2-fade">
          <button className="pv2-back-btn" onClick={() => navigate(`/profiles/${profile_id}`)}>
            ← Back to Profile
          </button>

          <div className="pv2-hero-eyebrow">Research Project</div>
          <div className="pv2-hero-title">{project.title}</div>

          <div className="pv2-hero-chips">
            {project.status && (
              <span
                className={`pv2-status ${statusClass(project.status)}`}
                style={{ background: "rgba(255,255,255,0.12)", color: "#fff", borderColor: "rgba(255,255,255,0.2)" }}
              >
                {project.status}
              </span>
            )}
            {members.length > 0 && (
              <span className="pv2-hero-chip">👥 {members.length} member{members.length !== 1 ? "s" : ""}</span>
            )}
            {tasks.length > 0 && (
              <span className="pv2-hero-chip">✓ {tasks.length} task{tasks.length !== 1 ? "s" : ""}</span>
            )}
          </div>
        </div>
      </div>

      {/* ── Body ── */}
      <div className="pv2-body">

        {/* ── Left column ── */}
        <div>

          {/* Purpose */}
          {project.purpose && (
            <div className="pv2-card pv2-fade-1">
              <div className="pv2-card-header">
                <div className="pv2-card-icon" style={{ background: "#eff6ff" }}>🎯</div>
                <div className="pv2-card-title">Purpose</div>
              </div>
              <div className="pv2-card-body">
                <p className="pv2-purpose-text">{project.purpose}</p>
              </div>
            </div>
          )}

          {/* ── Tasks ── */}
          <div className="pv2-card pv2-fade-2">
            <div className="pv2-card-header">
              <div className="pv2-card-icon" style={{ background: "#f0fdf4" }}>📋</div>
              <div className="pv2-card-title">Tasks</div>
              <button
                className="pv2-btn pv2-btn-primary pv2-btn-sm"
                onClick={openCreate}
                style={{ marginLeft: "auto" }}
              >
                + New Task
              </button>
            </div>
            <div className="pv2-card-body">
              {tasksLoading ? (
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  {[1, 2].map((i) => (
                    <div key={i} className="pv2-skeleton" style={{ height: 90, borderRadius: 10 }} />
                  ))}
                </div>
              ) : tasks.length === 0 ? (
                <div className="pv2-tasks-empty">
                  <div style={{ fontSize: "2rem", marginBottom: 8 }}>📭</div>
                  <div style={{ fontWeight: 600, color: "var(--pv2-ink)", marginBottom: 4 }}>No tasks yet</div>
                  <div style={{ fontSize: "0.82rem", color: "var(--pv2-muted)", marginBottom: 16 }}>
                    Create the first task for this project.
                  </div>
                  <button className="pv2-btn pv2-btn-primary pv2-btn-sm" onClick={openCreate}>
                    + New Task
                  </button>
                </div>
              ) : (
                <div className="pv2-task-cards">
                  {tasks.map((task) => (
                    <TaskCard
                      key={task.id}
                      task={task}
                      onView={openView}
                      onEdit={openEdit}
                      onDelete={openDelete}
                      onComplete={openComplete}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Expected Result */}
          {project.result && (
            <div className="pv2-card pv2-fade-3">
              <div className="pv2-card-header">
                <div className="pv2-card-icon" style={{ background: "#faf5ff" }}>🏁</div>
                <div className="pv2-card-title">Expected Result</div>
              </div>
              <div className="pv2-card-body">
                <div className="pv2-result-box">
                  <div className="pv2-result-icon">💡</div>
                  <div className="pv2-result-text">{project.result}</div>
                </div>
              </div>
            </div>
          )}

          {/* Pictures */}
          {project.pictures?.length > 0 && (
            <div className="pv2-card pv2-fade-4">
              <div className="pv2-card-header">
                <div className="pv2-card-icon" style={{ background: "#fff7ed" }}>🖼️</div>
                <div className="pv2-card-title">Gallery</div>
              </div>
              <div className="pv2-card-body">
                <div className="pv2-pictures-grid">
                  {project.pictures.map((pic, i) => (
                    <div key={i} className="pv2-picture">
                      {pic ? (
                        <img src={pic} alt={`Project image ${i + 1}`} />
                      ) : (
                        <div className="pv2-picture-placeholder">🖼️</div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

        </div>

        {/* ── Right column (sidebar) ── */}
        <div>

          {/* Overview */}
          <div className="pv2-side-card pv2-fade-1">
            <div className="pv2-side-title">📊 Overview</div>
            <div className="pv2-stat-row">
              <span className="pv2-stat-label">Status</span>
              <span className={`pv2-status ${statusClass(project.status)}`}>{project.status ?? "—"}</span>
            </div>
            <div className="pv2-stat-row">
              <span className="pv2-stat-label">Tasks</span>
              <span className="pv2-stat-value">{tasks.length}</span>
            </div>
            <div className="pv2-stat-row">
              <span className="pv2-stat-label">Members</span>
              <span className="pv2-stat-value">{members.length}</span>
            </div>
            <div className="pv2-stat-row">
              <span className="pv2-stat-label">Pictures</span>
              <span className="pv2-stat-value">{project.pictures?.length ?? 0}</span>
            </div>
          </div>

          {/* Progress */}
          {tasks.length > 0 && (
            <div className="pv2-side-card pv2-fade-2">
              <div className="pv2-side-title">
                ✅ Progress
                <span className="pv2-side-count">{doneCnt}/{tasks.length}</span>
              </div>
              <div className="pv2-progress-bar-wrap">
                <div
                  className="pv2-progress-bar-fill"
                  style={{ width: `${Math.round((doneCnt / tasks.length) * 100)}%` }}
                />
              </div>
              <div style={{ fontSize: "0.75rem", color: "var(--pv2-muted)", marginTop: 6 }}>
                {Math.round((doneCnt / tasks.length) * 100)}% complete
              </div>
              <div style={{ marginTop: 14, display: "flex", flexDirection: "column", gap: 6 }}>
                {[
                  { state: "TODO",        label: "To Do",       color: "#f59e0b" },
                  { state: "IN_PROGRESS", label: "In Progress", color: "#3b82f6" },
                  { state: "DONE",        label: "Done",        color: "#10b981" },
                ].map(({ state, label, color }) => {
                  const count = tasks.filter((t) => (t.state ?? "TODO") === state).length;
                  return (
                    <div key={state} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span style={{ fontSize: "0.78rem", color: "var(--pv2-muted)", display: "flex", alignItems: "center", gap: 6 }}>
                        <span style={{ width: 8, height: 8, borderRadius: "50%", background: color, display: "inline-block" }} />
                        {label}
                      </span>
                      <span style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--pv2-ink2)" }}>{count}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Team */}
          <div className="pv2-side-card pv2-fade-3">
            <div className="pv2-side-title">
              👥 Team
              <span className="pv2-side-count">{members.length}</span>
            </div>
            {members.length > 0 ? (
              members.map((profile) => (
                <div
                  key={profile.id}
                  className="pv2-member pv2-member-clickable"
                  onClick={() => navigate(`/profiles/${profile.id}`)}
                  title={`View ${profile.name}'s profile`}
                >
                  <div className="pv2-member-avatar">
                    {profile.profileImage ? (
                     <img
                       src={`http://localhost:8080/profiles/${profile.id}/image`}
                       alt={profile.name}
                       style={{ width: "100%", height: "100%", borderRadius: "50%", objectFit: "cover" }}
                     />

                    ) : (
                      initials(`${profile.name} ${profile.lastName ?? ""}`)
                    )}
                  </div>
                  <div>
                    <div className="pv2-member-name">{profile.name} {profile.lastName ?? ""}</div>
                    <div className="pv2-member-role">{profile.degree ?? "Researcher"}</div>
                  </div>
                  <div className="pv2-member-arrow">→</div>
                </div>


              ))
            ) : (
              <div className="pv2-empty">No members assigned</div>
            )}
          </div>

        </div>
      </div>

      {/* ── Injected styles for task/modal additions ── */}
      <style>{`
        /* ── Backdrop ── */
        .pv2-modal-backdrop {
          position: fixed; inset: 0; z-index: 1000;
          background: rgba(10,15,30,0.55);
          backdrop-filter: blur(4px);
          display: flex; align-items: center; justify-content: center;
          padding: 20px;
          animation: pv2-fade-in 0.18s ease;
        }
        @keyframes pv2-fade-in { from { opacity:0 } to { opacity:1 } }

        /* ── Modal shell ── */
        .pv2-modal {
          background: var(--pv2-surface, #fff);
          border-radius: 18px;
          box-shadow: 0 24px 80px rgba(0,0,0,0.22);
          width: 100%; max-width: 560px; max-height: 88vh;
          display: flex; flex-direction: column;
          animation: pv2-slide-up 0.22s cubic-bezier(0.34,1.56,0.64,1);
          overflow: hidden;
        }
        .pv2-modal-sm { max-width: 380px; }
        @keyframes pv2-slide-up {
          from { opacity:0; transform: translateY(24px) scale(0.97) }
          to   { opacity:1; transform: translateY(0)   scale(1)    }
        }

        /* ── Modal header ── */
        .pv2-modal-header {
          display: flex; align-items: center; justify-content: space-between;
          padding: 20px 24px 16px;
          border-bottom: 1px solid var(--pv2-border, #e8edf5);
          flex-shrink: 0;
        }
        .pv2-modal-title { font-size: 1rem; font-weight: 700; color: var(--pv2-ink, #111827); }
        .pv2-modal-close {
          background: none; border: none; cursor: pointer;
          font-size: 1rem; color: var(--pv2-muted, #6b7280);
          width: 30px; height: 30px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          transition: background 0.15s;
        }
        .pv2-modal-close:hover { background: #f3f4f6; }

        /* ── Modal body / footer ── */
        .pv2-modal-body { padding: 22px 24px; overflow-y: auto; flex: 1; }
        .pv2-modal-footer {
          padding: 14px 24px 20px;
          border-top: 1px solid var(--pv2-border, #e8edf5);
          display: flex; justify-content: flex-end; gap: 10px;
          flex-shrink: 0;
        }

        /* ── View mode ── */
        .pv2-modal-view-title { font-size:1.25rem; font-weight:700; color:var(--pv2-ink,#111827); margin:0 0 10px; }
        .pv2-modal-view-desc  { font-size:0.88rem; color:var(--pv2-muted,#6b7280); line-height:1.6; margin:0 0 18px; }
        .pv2-modal-meta-grid  { display:grid; grid-template-columns:1fr 1fr; gap:12px; margin-bottom:4px; }
        .pv2-modal-meta-item  { background:var(--pv2-bg,#f8fafc); border-radius:10px; padding:10px 14px; display:flex; flex-direction:column; gap:4px; }
        .pv2-modal-meta-label { font-size:0.72rem; font-weight:600; text-transform:uppercase; letter-spacing:.06em; color:var(--pv2-muted,#9ca3af); }
        .pv2-modal-meta-val   { font-size:0.85rem; font-weight:600; color:var(--pv2-ink,#111827); }
        .pv2-modal-link       { font-size:0.82rem; color:#3b82f6; word-break:break-all; }
        .pv2-modal-section-label { font-size:0.75rem; font-weight:700; text-transform:uppercase; letter-spacing:.06em; color:var(--pv2-muted,#9ca3af); margin-bottom:8px; }
        .pv2-modal-assignee-list { display:flex; flex-direction:column; gap:2px; }

        /* ── Form ── */
        .pv2-form       { display:flex; flex-direction:column; gap:16px; }
        .pv2-form-group { display:flex; flex-direction:column; gap:6px; }
        .pv2-form-row   { display:grid; grid-template-columns:1fr 1fr; gap:14px; }
        .pv2-form-label { font-size:0.78rem; font-weight:600; color:var(--pv2-ink2,#374151); letter-spacing:.01em; }
        .pv2-form-input {
          border: 1.5px solid var(--pv2-border, #e8edf5);
          border-radius: 10px; padding: 9px 13px;
          font-size: 0.875rem; color: var(--pv2-ink, #111827);
          background: var(--pv2-surface, #fff);
          outline: none; transition: border-color .15s, box-shadow .15s;
          width: 100%; box-sizing: border-box;
        }
        .pv2-form-input:focus { border-color:#3b82f6; box-shadow:0 0 0 3px rgba(59,130,246,.12); }
        .pv2-form-textarea { resize:vertical; min-height:80px; }
        .pv2-form-select   { appearance:none; cursor:pointer; }
        .pv2-form-error    { background:#fef2f2; color:#dc2626; border:1px solid #fecaca; border-radius:8px; padding:9px 13px; font-size:0.82rem; font-weight:500; }

        /* ── Assignee picker ── */
        .pv2-assignee-picker {
          display:flex; flex-direction:column; gap:6px;
          max-height:200px; overflow-y:auto;
          border:1.5px solid var(--pv2-border,#e8edf5); border-radius:10px; padding:8px;
        }
        .pv2-assignee-option {
          display:flex; align-items:center; gap:10px;
          padding:7px 10px; border-radius:8px; cursor:pointer;
          transition:background .12s; border:1.5px solid transparent;
        }
        .pv2-assignee-option:hover   { background:#f0f9ff; }
        .pv2-assignee-selected       { background:#eff6ff !important; border-color:#bfdbfe; }
        .pv2-assignee-check {
          width:20px; height:20px; border-radius:50%;
          border:2px solid var(--pv2-border,#d1d5db);
          display:flex; align-items:center; justify-content:center;
          font-size:.7rem; font-weight:700; color:#fff;
          flex-shrink:0; transition:all .15s;
        }
        .pv2-assignee-check-on { background:#3b82f6; border-color:#3b82f6; }

        /* ── Buttons ── */
        .pv2-btn {
          border:none; border-radius:10px; padding:9px 20px;
          font-size:.85rem; font-weight:600; cursor:pointer;
          transition:all .15s; display:inline-flex; align-items:center; gap:6px;
        }
        .pv2-btn-sm { padding:7px 14px; font-size:.78rem; }
        .pv2-btn-primary {
          background: linear-gradient(135deg,#3b82f6,#2563eb);
          color:#fff; box-shadow:0 2px 8px rgba(59,130,246,.25);
        }
        .pv2-btn-primary:hover:not(:disabled) {
          background:linear-gradient(135deg,#2563eb,#1d4ed8);
          box-shadow:0 4px 12px rgba(59,130,246,.35); transform:translateY(-1px);
        }
        .pv2-btn-primary:disabled { opacity:.6; cursor:not-allowed; }
        .pv2-btn-ghost  { background:var(--pv2-bg,#f3f4f6); color:var(--pv2-ink2,#374151); }
        .pv2-btn-ghost:hover:not(:disabled) { background:#e5e7eb; }
        .pv2-btn-ghost:disabled { opacity:.6; cursor:not-allowed; }
        .pv2-btn-danger {
          background:linear-gradient(135deg,#ef4444,#dc2626);
          color:#fff; box-shadow:0 2px 8px rgba(239,68,68,.25);
        }
        .pv2-btn-danger:hover:not(:disabled) { transform:translateY(-1px); }
        .pv2-btn-danger:disabled { opacity:.6; cursor:not-allowed; }

        /* ── Task cards ── */
        .pv2-task-cards { display:flex; flex-direction:column; gap:12px; }
        .pv2-task-card  {
          border:1.5px solid var(--pv2-border,#e8edf5); border-radius:12px;
          padding:14px 16px; background:var(--pv2-surface,#fff);
          transition:box-shadow .15s, border-color .15s;
        }
        .pv2-task-card:hover { box-shadow:0 4px 18px rgba(0,0,0,.07); border-color:#c7d7f0; }
        .pv2-task-card-top  { display:flex; align-items:flex-start; justify-content:space-between; gap:10px; margin-bottom:6px; }
        .pv2-task-card-title { font-size:.9rem; font-weight:700; color:var(--pv2-ink,#111827); line-height:1.4; }
        .pv2-task-card-desc  {
          font-size:.82rem; color:var(--pv2-muted,#6b7280); line-height:1.5; margin:0 0 10px;
          display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical; overflow:hidden;
        }
        .pv2-task-card-meta {
          display:flex; align-items:center; justify-content:space-between;
          flex-wrap:wrap; gap:8px; margin-bottom:12px;
        }
        .pv2-task-card-date    { font-size:.75rem; color:var(--pv2-muted,#9ca3af); }
        .pv2-task-card-avatars { display:flex; }
        .pv2-task-avatar {
          width:26px; height:26px; border-radius:50%;
          background:linear-gradient(135deg,#3b82f6,#6366f1);
          color:#fff; font-size:.65rem; font-weight:700;
          display:flex; align-items:center; justify-content:center;
          border:2px solid #fff; margin-left:-6px;
        }
        .pv2-task-avatar:first-child { margin-left:0; }
        .pv2-task-avatar-more { background:#e5e7eb; color:var(--pv2-ink2,#374151); }
        .pv2-task-card-actions {
          display:flex; gap:6px;
          border-top:1px solid var(--pv2-border,#f0f2f7);
          padding-top:10px; margin-top:2px;
        }
        .pv2-task-action {
          background:var(--pv2-bg,#f8fafc); border:1px solid var(--pv2-border,#e8edf5);
          border-radius:7px; padding:5px 11px;
          font-size:.76rem; font-weight:600; cursor:pointer;
          color:var(--pv2-ink2,#374151); transition:all .12s;
        }
        .pv2-task-action:hover          { background:#eef2ff; border-color:#c7d2fe; color:#4f46e5; }
        .pv2-task-action-del            { margin-left:auto; }
        .pv2-task-action-del:hover      { background:#fef2f2; border-color:#fecaca; color:#dc2626; }
        .pv2-task-action-complete:hover:not(:disabled) { background:#ecfdf5; border-color:#6ee7b7; color:#047857; }
        .pv2-task-action-complete:disabled { opacity:.5; cursor:not-allowed; }

        /* ── Complete button (modal footer) ── */
        .pv2-btn-complete {
          background: linear-gradient(135deg,#10b981,#059669);
          color:#fff; box-shadow:0 2px 8px rgba(16,185,129,.25);
        }
        .pv2-btn-complete:hover:not(:disabled) {
          transform:translateY(-1px);
          box-shadow:0 4px 12px rgba(16,185,129,.35);
        }
        .pv2-btn-complete:disabled { opacity:.6; cursor:not-allowed; }

        /* ── Empty state ── */
        .pv2-tasks-empty { text-align:center; padding:32px 20px; }

        /* ── Progress bar ── */
        .pv2-progress-bar-wrap {
          height:8px; border-radius:99px;
          background:var(--pv2-border,#e8edf5); overflow:hidden; margin-top:10px;
        }
        .pv2-progress-bar-fill {
          height:100%; border-radius:99px;
          background:linear-gradient(90deg,#10b981,#34d399);
          transition:width .5s ease;
        }
        .pv2-member-clickable {
          cursor: pointer;
          border-radius: 10px;
          padding: 6px 8px;
          margin: 0 -8px;
          transition: background 0.15s;
        }
        .pv2-member-clickable:hover { background: #f0f9ff; }
        .pv2-member-clickable:hover .pv2-member-arrow { opacity: 1; }
        .pv2-member-arrow {
          margin-left: auto;
          font-size: 0.85rem;
          color: #3b82f6;
          opacity: 0;
          transition: opacity 0.15s;
        }
        .pv2-member-avatar {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: linear-gradient(...);
          overflow: hidden ;
        }
      `}</style>

    </div>
  );
}
