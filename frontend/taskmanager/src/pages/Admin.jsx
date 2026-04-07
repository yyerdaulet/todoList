import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
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
styleTag.setAttribute("data-adm", "1");
styleTag.textContent = `
  :root {
    --ink:      #0f1923;
    --ink2:     #3a4a5c;
    --muted:    #7a8898;
    --border:   #e4e9f0;
    --bg:       #f5f7fa;
    --surface:  #ffffff;
    --accent:   #1a56db;
    --accent2:  #0e3a9e;
    --sidebar-w: 240px;
    --danger:   #e63946;
  }

  .adm-shell {
    display: flex;
    min-height: calc(100vh - 64px);
    font-family: 'Lato', sans-serif;
    background: var(--bg);
  }

  /* ── Sidebar ── */
  .adm-sidebar {
    width: var(--sidebar-w);
    background: #0f1923;
    flex-shrink: 0;
    display: flex;
    flex-direction: column;
    padding: 28px 0 24px;
    position: sticky;
    top: 64px;
    height: calc(100vh - 64px);
    overflow-y: auto;
  }

  .adm-sidebar-title {
    font-family: 'Playfair Display', serif;
    font-size: 0.78rem;
    font-weight: 700;
    color: rgba(255,255,255,0.3);
    text-transform: uppercase;
    letter-spacing: 0.12em;
    padding: 0 20px 12px;
    border-bottom: 1px solid rgba(255,255,255,0.07);
    margin-bottom: 8px;
  }

  .adm-nav-item {
    display: flex; align-items: center; gap: 10px;
    padding: 10px 20px;
    font-size: 0.82rem; font-weight: 700;
    color: rgba(255,255,255,0.45);
    cursor: pointer; border: none; background: none;
    width: 100%; text-align: left;
    font-family: 'Lato', sans-serif;
    border-left: 3px solid transparent;
    transition: color 0.15s, background 0.15s, border-color 0.15s;
  }
  .adm-nav-item:hover {
    color: rgba(255,255,255,0.8);
    background: rgba(255,255,255,0.05);
  }
  .adm-nav-item.active {
    color: #fff;
    background: rgba(26,86,219,0.2);
    border-left-color: var(--accent);
  }
  .adm-nav-icon { font-size: 1rem; width: 20px; text-align: center; }

  .adm-nav-badge {
    margin-left: auto;
    background: rgba(255,255,255,0.1);
    border-radius: 100px;
    padding: 1px 8px;
    font-size: 0.68rem;
    color: rgba(255,255,255,0.5);
  }
  .adm-nav-item.active .adm-nav-badge {
    background: rgba(26,86,219,0.4);
    color: rgba(255,255,255,0.9);
  }

  /* ── Main ── */
  .adm-main {
    flex: 1; min-width: 0;
    padding: 36px 36px 64px;
    overflow-y: auto;
  }

  /* ── Page header ── */
  .adm-page-header {
    display: flex; align-items: center; justify-content: space-between;
    margin-bottom: 28px;
    flex-wrap: wrap; gap: 12px;
  }
  .adm-page-title {
    font-family: 'Playfair Display', serif;
    font-size: 1.5rem; font-weight: 700;
    color: var(--ink); letter-spacing: -0.02em;
  }
  .adm-page-sub { font-size: 0.78rem; color: var(--muted); margin-top: 2px; }

  /* ── Toolbar ── */
  .adm-toolbar {
    display: flex; gap: 10px; align-items: center; flex-wrap: wrap;
    margin-bottom: 20px;
  }
  .adm-search {
    flex: 1; min-width: 200px; max-width: 340px;
    border: 1.5px solid var(--border); border-radius: 9px;
    padding: 9px 14px 9px 36px;
    font-family: 'Lato', sans-serif; font-size: 0.85rem;
    color: var(--ink); background: var(--surface); outline: none;
    transition: border-color 0.15s, box-shadow 0.15s;
    position: relative;
  }
  .adm-search:focus { border-color: var(--accent); box-shadow: 0 0 0 3px rgba(26,86,219,0.09); }
  .adm-search-wrap { position: relative; flex: 1; min-width: 200px; max-width: 340px; }
  .adm-search-icon {
    position: absolute; left: 11px; top: 50%;
    transform: translateY(-50%); font-size: 0.85rem; pointer-events: none;
  }

  .adm-btn {
    display: inline-flex; align-items: center; gap: 6px;
    padding: 9px 18px; border-radius: 9px;
    font-family: 'Lato', sans-serif; font-size: 0.82rem; font-weight: 700;
    cursor: pointer; border: none; transition: opacity 0.15s, transform 0.1s;
    white-space: nowrap;
  }
  .adm-btn:hover { opacity: 0.88; transform: translateY(-1px); }
  .adm-btn-primary { background: var(--accent); color: #fff; box-shadow: 0 2px 10px rgba(26,86,219,0.22); }
  .adm-btn-danger  { background: var(--danger); color: #fff; }
  .adm-btn-ghost   { background: none; border: 1.5px solid var(--border); color: var(--ink2); }
  .adm-btn-ghost:hover { border-color: var(--accent); color: var(--accent); background: #eef3ff; transform: none; }
  .adm-btn-sm { padding: 5px 12px; font-size: 0.74rem; }

  /* ── Table ── */
  .adm-table-wrap {
    background: var(--surface); border: 1px solid var(--border);
    border-radius: 16px; overflow: hidden;
    box-shadow: 0 2px 14px rgba(0,0,0,0.05);
  }
  table.adm-table { width: 100%; border-collapse: collapse; }
  .adm-table thead tr {
    background: #f8fafc; border-bottom: 1px solid var(--border);
  }
  .adm-table th {
    padding: 12px 16px; text-align: left;
    font-size: 0.68rem; font-weight: 800;
    text-transform: uppercase; letter-spacing: 0.08em;
    color: var(--muted);
  }
  .adm-table td {
    padding: 13px 16px; font-size: 0.84rem;
    color: var(--ink2); border-bottom: 1px solid #f1f3f5;
    vertical-align: middle;
  }
  .adm-table tbody tr:last-child td { border-bottom: none; }
  .adm-table tbody tr:hover td { background: #fafbfc; }

  .adm-td-main { font-weight: 700; color: var(--ink); }
  .adm-td-sub  { font-size: 0.76rem; color: var(--muted); margin-top: 2px; }

  .adm-actions-cell { display: flex; gap: 6px; align-items: center; }

  /* ── Badge ── */
  .adm-badge {
    display: inline-block; padding: 2px 10px; border-radius: 100px;
    font-size: 0.68rem; font-weight: 800; letter-spacing: 0.04em;
  }
  .adm-badge-blue   { background: #eef3ff; color: var(--accent); }
  .adm-badge-green  { background: #ecfdf5; color: #059669; }
  .adm-badge-orange { background: #fff7ed; color: #d97706; }
  .adm-badge-purple { background: #f5f3ff; color: #7c3aed; }
  .adm-badge-red    { background: #fff0f0; color: var(--danger); }

  /* ── Empty / loading ── */
  .adm-empty {
    text-align: center; padding: 52px 20px;
    color: var(--muted); font-size: 0.85rem;
  }
  .adm-empty-icon { font-size: 2rem; margin-bottom: 10px; }
  .adm-spinner {
    width: 36px; height: 36px; border-radius: 50%;
    border: 3px solid #e4e9f0; border-top-color: var(--accent);
    animation: adm-spin 0.8s linear infinite;
    margin: 48px auto;
  }
  @keyframes adm-spin { to { transform: rotate(360deg); } }

  /* ── Stats row ── */
  .adm-stats {
    display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 14px; margin-bottom: 28px;
  }
  .adm-stat-card {
    background: var(--surface); border: 1px solid var(--border);
    border-radius: 14px; padding: 18px 20px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.04);
  }
  .adm-stat-icon { font-size: 1.2rem; margin-bottom: 8px; }
  .adm-stat-val  { font-size: 1.6rem; font-weight: 800; color: var(--ink); line-height: 1; }
  .adm-stat-label{ font-size: 0.68rem; text-transform: uppercase; letter-spacing: 0.07em; color: var(--muted); margin-top: 4px; font-weight: 700; }

  /* ── Modal ── */
  .adm-modal-overlay {
    position: fixed; inset: 0; background: rgba(15,25,35,0.5);
    display: flex; align-items: center; justify-content: center;
    z-index: 1000; padding: 20px;
    backdrop-filter: blur(3px);
  }
  .adm-modal {
    background: var(--surface); border-radius: 18px;
    padding: 32px 36px; width: 100%; max-width: 480px;
    box-shadow: 0 20px 60px rgba(0,0,0,0.2);
    animation: adm-pop 0.2s ease;
  }
  @keyframes adm-pop {
    from { opacity: 0; transform: scale(0.95); }
    to   { opacity: 1; transform: scale(1); }
  }
  .adm-modal-title {
    font-family: 'Playfair Display', serif;
    font-size: 1.15rem; font-weight: 700; margin-bottom: 6px;
  }
  .adm-modal-sub { font-size: 0.8rem; color: var(--muted); margin-bottom: 22px; }
  .adm-modal-actions { display: flex; gap: 10px; justify-content: flex-end; margin-top: 24px; }

  .adm-field { margin-bottom: 16px; }
  .adm-label {
    display: block; font-size: 0.72rem; font-weight: 700;
    color: var(--ink2); text-transform: uppercase; letter-spacing: 0.07em; margin-bottom: 6px;
  }
  .adm-input, .adm-textarea, .adm-select {
    width: 100%; border: 1.5px solid var(--border); border-radius: 9px;
    padding: 10px 13px; font-family: 'Lato', sans-serif; font-size: 0.88rem;
    color: var(--ink); background: #fafbfc; outline: none; appearance: none;
    transition: border-color 0.15s, box-shadow 0.15s;
  }
  .adm-input:focus, .adm-textarea:focus, .adm-select:focus {
    border-color: var(--accent); box-shadow: 0 0 0 3px rgba(26,86,219,0.09);
    background: #fff;
  }
  .adm-textarea { resize: vertical; min-height: 90px; line-height: 1.6; }

  /* ── Toast ── */
  .adm-toast {
    position: fixed; bottom: 24px; right: 24px; z-index: 2000;
    background: #0f1923; color: #fff;
    border-radius: 10px; padding: 12px 20px;
    font-size: 0.82rem; font-weight: 600;
    box-shadow: 0 4px 20px rgba(0,0,0,0.25);
    display: flex; align-items: center; gap: 8px;
    animation: adm-slideIn 0.25s ease;
  }
  @keyframes adm-slideIn {
    from { opacity: 0; transform: translateY(12px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(10px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .adm-animate { animation: fadeUp 0.3s ease both; }
`;
if (!document.head.querySelector("style[data-adm]")) {
  document.head.appendChild(styleTag);
}

/* ─── Toast ─────────────────────────────────────────────────────────────── */
function Toast({ msg, onDone }) {
  useEffect(() => { const t = setTimeout(onDone, 2800); return () => clearTimeout(t); }, []);
  return <div className="adm-toast">✓ {msg}</div>;
}

/* ─── Confirm modal ──────────────────────────────────────────────────────── */
function ConfirmModal({ msg, onConfirm, onCancel }) {
  return (
    <div className="adm-modal-overlay" onClick={onCancel}>
      <div className="adm-modal" onClick={(e) => e.stopPropagation()}>
        <div className="adm-modal-title">Confirm Delete</div>
        <div className="adm-modal-sub">{msg}</div>
        <div className="adm-modal-actions">
          <button className="adm-btn adm-btn-ghost" onClick={onCancel}>Cancel</button>
          <button className="adm-btn adm-btn-danger" onClick={onConfirm}>Delete</button>
        </div>
      </div>
    </div>
  );
}

/* ─── Generic form modal ─────────────────────────────────────────────────── */
function FormModal({ title, fields, values, onChange, onSave, onClose, saving }) {
  return (
    <div className="adm-modal-overlay" onClick={onClose}>
      <div className="adm-modal" onClick={(e) => e.stopPropagation()}>
        <div className="adm-modal-title">{title}</div>
        <div className="adm-modal-sub">Fill in the details below</div>
        {fields.map((f) => (
          <div className="adm-field" key={f.key}>
            <label className="adm-label">{f.label}</label>
            {f.type === "textarea" ? (
              <textarea
                className="adm-textarea"
                value={values[f.key] || ""}
                onChange={(e) => onChange(f.key, e.target.value)}
                placeholder={f.placeholder || ""}
              />
            ) : f.type === "select" ? (
              <select
                className="adm-select"
                value={values[f.key] || ""}
                onChange={(e) => onChange(f.key, e.target.value)}
              >
                {f.options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
            ) : (
              <input
                className="adm-input"
                type={f.type || "text"}
                value={values[f.key] || ""}
                onChange={(e) => onChange(f.key, e.target.value)}
                placeholder={f.placeholder || ""}
              />
            )}
          </div>
        ))}
        <div className="adm-modal-actions">
          <button className="adm-btn adm-btn-ghost" onClick={onClose}>Cancel</button>
          <button className="adm-btn adm-btn-primary" onClick={onSave} disabled={saving}>
            {saving ? "Saving…" : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── Section configs ────────────────────────────────────────────────────── */
const SECTIONS = [
  { key: "dashboard", label: "Dashboard",  icon: "📊" },
  { key: "users",     label: "Users",       icon: "👤" },
  { key: "labs",      label: "Labs",        icon: "🔬" },
  { key: "articles",  label: "Articles",    icon: "📄" },
  { key: "news",      label: "News",        icon: "📰" },
  { key: "projects",  label: "Projects",    icon: "📁" },
];

/* ─── Dashboard ──────────────────────────────────────────────────────────── */
function DashboardTab({ counts }) {
  const cards = [
    { icon: "👤", label: "Users",    val: counts.users,    color: "#eef3ff", accent: "#1a56db" },
    { icon: "🔬", label: "Labs",     val: counts.labs,     color: "#ecfdf5", accent: "#059669" },
    { icon: "📄", label: "Articles", val: counts.articles, color: "#f5f3ff", accent: "#7c3aed" },
    { icon: "📰", label: "News",     val: counts.news,     color: "#fff7ed", accent: "#d97706" },
    { icon: "📁", label: "Projects", val: counts.projects, color: "#fff0f0", accent: "#e63946" },
  ];
  return (
    <div className="adm-animate">
      <div className="adm-page-header">
        <div>
          <div className="adm-page-title">Dashboard</div>
          <div className="adm-page-sub">Overview of all resources</div>
        </div>
      </div>
      <div className="adm-stats">
        {cards.map((c) => (
          <div key={c.label} className="adm-stat-card" style={{ borderTop: `3px solid ${c.accent}` }}>
            <div className="adm-stat-icon">{c.icon}</div>
            <div className="adm-stat-val" style={{ color: c.accent }}>{c.val ?? "—"}</div>
            <div className="adm-stat-label">{c.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Generic CRUD tab ───────────────────────────────────────────────────── */
function CrudTab({ sectionKey, label, icon, endpoint, columns, formFields, rowKey = "id", getTitle, getSub, extraActions }) {
  const [items, setItems]       = useState([]);
  const [loading, setLoading]   = useState(true);
  const [search, setSearch]     = useState("");
  const [modal, setModal]       = useState(null); // null | { mode: 'create'|'edit', data: {} }
  const [confirm, setConfirm]   = useState(null); // item to delete
  const [saving, setSaving]     = useState(false);
  const [toast, setToast]       = useState("");

  const showToast = (msg) => { setToast(msg); };

  const load = useCallback(() => {
    setLoading(true);
    api.get(endpoint)
      .then((r) => setItems(Array.isArray(r.data) ? r.data : r.data.content ?? []))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [endpoint]);

  useEffect(() => { load(); }, [load]);

  const filtered = items.filter((item) => {
    const title = getTitle(item).toLowerCase();
    return title.includes(search.toLowerCase());
  });

  const handleSave = async () => {
    setSaving(true);
    try {
      if (modal.mode === "create") {
        await api.post(endpoint, modal.data);
        showToast(`${label.slice(0, -1)} created`);
      } else {
        await api.put(`${endpoint}/${modal.data[rowKey]}`, modal.data);
        showToast(`${label.slice(0, -1)} updated`);
      }
      setModal(null);
      load();
    } catch (e) { console.error(e); }
    finally { setSaving(false); }
  };

  const handleDelete = async (item) => {
    try {
      await api.delete(`${endpoint}/${item[rowKey]}`);
      showToast(`${label.slice(0, -1)} deleted`);
      load();
    } catch (e) { console.error(e); }
    setConfirm(null);
  };

  return (
    <div className="adm-animate">
      <div className="adm-page-header">
        <div>
          <div className="adm-page-title">{icon} {label}</div>
          <div className="adm-page-sub">Manage all {label.toLowerCase()} in the system</div>
        </div>
        <div style={{ display: "flex", gap: 10 }}>

          <button className="adm-btn adm-btn-primary" onClick={() => setModal({ mode: "create", data: {} })}>
            + Add {label.slice(0, -1)}
          </button>
        </div>
      </div>

      <div className="adm-toolbar">
        <div className="adm-search-wrap">
          <span className="adm-search-icon">🔍</span>
          <input
            className="adm-search"
            style={{ paddingLeft: 36 }}
            placeholder={`Search ${label.toLowerCase()}…`}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <span style={{ fontSize: "0.78rem", color: "var(--muted)", fontWeight: 600 }}>
          {filtered.length} {filtered.length === 1 ? "result" : "results"}
        </span>
      </div>

      <div className="adm-table-wrap">
        {loading ? (
          <div className="adm-spinner" />
        ) : filtered.length === 0 ? (
          <div className="adm-empty">
            <div className="adm-empty-icon">{icon}</div>
            {search ? "No results match your search." : `No ${label.toLowerCase()} found.`}
          </div>
        ) : (
          <table className="adm-table">
            <thead>
              <tr>
                {columns.map((c) => <th key={c.key}>{c.label}</th>)}
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((item, i) => (
                <tr key={item[rowKey] || i}>
                  {columns.map((c) => (
                    <td key={c.key}>
                      {c.render ? c.render(item) : (
                        c.main ? (
                          <>
                            <div className="adm-td-main">{getTitle(item)}</div>
                            {getSub && <div className="adm-td-sub">{getSub(item)}</div>}
                          </>
                        ) : (
                          <span>{item[c.key] ?? "—"}</span>
                        )
                      )}
                    </td>
                  ))}
                  <td>
                    <div className="adm-actions-cell">
                      <button
                        className="adm-btn adm-btn-ghost adm-btn-sm"
                        onClick={() => setModal({ mode: "edit", data: { ...item } })}
                      >
                        ✏️ Edit
                      </button>
                      <button
                        className="adm-btn adm-btn-sm"
                        style={{ background: "#fff0f0", color: "var(--danger)", border: "1.5px solid #fca5a5" }}
                        onClick={() => setConfirm(item)}
                      >
                        🗑 Delete

                      </button>

                       {extraActions && extraActions(item)}

                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Form modal */}
      {modal && (
        <FormModal
          title={modal.mode === "create" ? `Add ${label.slice(0, -1)}` : `Edit ${label.slice(0, -1)}`}
          fields={formFields}
          values={modal.data}
          onChange={(key, val) => setModal((m) => ({ ...m, data: { ...m.data, [key]: val } }))}
          onSave={handleSave}
          onClose={() => setModal(null)}
          saving={saving}
        />
      )}

      {/* Confirm delete */}
      {confirm && (
        <ConfirmModal
          msg={`Delete "${getTitle(confirm)}"? This cannot be undone.`}
          onConfirm={() => handleDelete(confirm)}
          onCancel={() => setConfirm(null)}
        />
      )}

      {/* Toast */}
      {toast && <Toast msg={toast} onDone={() => setToast("")} />}
    </div>
  );
}

/* ─── Section definitions ────────────────────────────────────────────────── */
const TABS = {
  users: {
    label: "Users", icon: "👤", endpoint: "/profiles",
    rowKey: "id",
    getTitle: (r) => `${r.name || ""} ${r.lastName || ""}`.trim() || "Unnamed",
    getSub: (r) => r.orcid || r.degree || "",
    columns: [
      { key: "name", label: "Name", main: true },
      { key: "degree", label: "Degree", render: (r) => r.degree ? <span className="adm-badge adm-badge-blue">{r.degree}</span> : "—" },
      { key: "birthday", label: "Birthday" },
      { key: "orcid", label: "ORCID", render: (r) => r.orcid ? <span style={{ fontFamily: "monospace", fontSize: "0.78rem" }}>{r.orcid}</span> : "—" },
    ],
    formFields: [
         { key: "user_id",      label: "User id",    placeholder: "12" },
      { key: "name",      label: "First Name",    placeholder: "Jane" },
      { key: "lastName",  label: "Last Name",      placeholder: "Doe" },
      { key: "orcid",     label: "ORCID",          placeholder: "0000-0000-0000-0000" },
      { key: "birthday",  label: "Birthday",       type: "date" },
      { key: "degree",    label: "Degree",         type: "select", options: [
        { value: "BACHELOR", label: "Bachelor" },
        { value: "MASTER",   label: "Master" },
        { value: "DOCTOR",   label: "Doctor" },
      ]},
    ],
  },

  labs: {
    label: "Labs", icon: "🔬", endpoint: "/labs",
    rowKey: "id",
    getTitle: (r) => r.name || "Unnamed Lab",
    getSub:   (r) => r.info?.slice(0, 60) + (r.info?.length > 60 ? "…" : "") || "",
    columns: [
      { key: "name", label: "Name", main: true },
      { key: "info", label: "Description", render: (r) => <span style={{ fontSize: "0.78rem", color: "var(--muted)" }}>{r.info?.slice(0, 80) ?? "—"}{r.info?.length > 80 ? "…" : ""}</span> },
    ],
    formFields: [
      { key: "name", label: "Lab Name", placeholder: "e.g. AI Research Lab" },
      { key: "info", label: "Description", type: "textarea", placeholder: "Brief description…" },
    ],
extraActions: (item) => (
    <button
      className="adm-btn adm-btn-sm"
      style={{background: "#ecfdf5",
        color: "#059669",
        border: "1.5px solid #6ee7b7",
        marginLeft: "10px"
      }}
      onClick={() => {
        api.get(`/labs/${item.id}/articles/update`)
          .catch(console.error);
      }}
    >
      🔄 Update Articles
    </button>
  ),
  },

  articles: {
      label: "Articles", icon: "📄", endpoint: "/articles",
      rowKey: "id",
      getTitle: (r) => r.title || "Untitled",
      getSub: (r) => Array.isArray(r.authors)
          ? r.authors.map(a => `${a.name} ${a.lastName}`).join(", ")
          : "",
      columns: [
          { key: "title", label: "Title", main: true },
          { key: "authors", label: "Authors", render: (r) => Array.isArray(r.authors)
              ? r.authors.map(a => `${a.name} ${a.lastName}`).join(", ")
              : "—"
          },
          { key: "publication_year", label: "Year", render: (r) => r.publication_year ? <span className="adm-badge adm-badge-purple">{r.publication_year}</span> : "—" },
          { key: "cited_by_count", label: "Citations", render: (r) => <span style={{ fontWeight: 700 }}>{r.cited_by_count ?? 0}</span> },
      ],
      formFields: [
          { key: "title",            label: "Title",            placeholder: "Article title" },
          { key: "publication_year", label: "Year",             type: "number", placeholder: new Date().getFullYear().toString() },
          { key: "doi",              label: "DOI",              placeholder: "10.xxxx/…" },
          { key: "description",      label: "Abstract",         type: "textarea" },
      ],
  },

  news: {
    label: "News", icon: "📰", endpoint: "/news",
    rowKey: "id",
    getTitle: (r) => r.publication_text?.slice(0, 60) + (r.publication_text?.length > 60 ? "…" : "") || "Untitled",
    getSub:   (r) => r.publication_date || "",
    columns: [
      { key: "publication_text", label: "Content", main: true },
      { key: "publication_date", label: "Date", render: (r) => r.publication_date ? <span className="adm-badge adm-badge-green">{r.publication_date}</span> : "—" },
    ],
    formFields: [
      { key: "publication_text", label: "Content",       type: "textarea", placeholder: "News content…" },
      { key: "publication_date", label: "Date",           type: "date" },
    ],
  },

  projects: {
    label: "Projects", icon: "📁", endpoint: "/projects",
    rowKey: "id",
    getTitle: (r) => r.title || r.name || "Untitled",
    getSub:   (r) => r.description?.slice(0, 60) + (r.description?.length > 60 ? "…" : "") || "",
    columns: [
      { key: "title",       label: "Title", main: true },
      { key: "description", label: "Description", render: (r) => <span style={{ fontSize: "0.78rem", color: "var(--muted)" }}>{r.description?.slice(0, 80) ?? "—"}{r.description?.length > 80 ? "…" : ""}</span> },
    ],
    formFields: [
      { key: "title",       label: "Project Title", placeholder: "e.g. AI Chatbot" },
      { key: "name",        label: "Short Name",    placeholder: "Optional short name" },
      { key: "description", label: "Description",   type: "textarea" },
    ],
  },
};

/* ─── Admin Panel ────────────────────────────────────────────────────────── */
export default function AdminPanel() {
  const [active, setActive] = useState("dashboard");
  const [counts, setCounts] = useState({});

  useEffect(() => {
    // fetch counts for dashboard
    const keys = ["users", "labs", "articles", "news", "projects"];
    const endpoints = { users: "/profiles", labs: "/labs", articles: "/articles", news: "/news", projects: "/projects" };
    keys.forEach((k) => {
      api.get(endpoints[k])
        .then((r) => {
          const arr = Array.isArray(r.data) ? r.data : r.data.content ?? [];
          setCounts((c) => ({ ...c, [k]: arr.length }));
        })
        .catch(() => {});
    });
  }, []);

  const tab = TABS[active];

  return (
    <div className="adm-shell">

      {/* ── Sidebar ── */}
      <aside className="adm-sidebar">
        <div className="adm-sidebar-title">Admin Panel</div>
        {SECTIONS.map((s) => (
          <button
            key={s.key}
            className={`adm-nav-item ${active === s.key ? "active" : ""}`}
            onClick={() => setActive(s.key)}
          >
            <span className="adm-nav-icon">{s.icon}</span>
            {s.label}
            {s.key !== "dashboard" && counts[s.key] != null && (
              <span className="adm-nav-badge">{counts[s.key]}</span>
            )}
          </button>
        ))}
      </aside>

      {/* ── Main content ── */}
      <main className="adm-main">
        {active === "dashboard" ? (
          <DashboardTab counts={counts} />
        ) : tab ? (
          <CrudTab key={active} sectionKey={active} {...tab} />
        ) : null}
      </main>

    </div>
  );
}

