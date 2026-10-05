* {
  box-sizing: border-box;
}

:root {
  --bg: #0f172a;
  --panel: #111827;
  --panel-alt: #1f2937;
  --card: #0b1220;
  --muted: #94a3b8;
  --text: #e2e8f0;
  --accent: #38bdf8;
  --accent-strong: #0ea5e9;
  --success: #22c55e;
  --warning: #f59e0b;
  --danger: #ef4444;
  --border: rgba(148, 163, 184, 0.2);
}

html, body {
  margin: 0;
  padding: 0;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  background: linear-gradient(135deg, #020817, #111827 40%, #0f172a);
  color: var(--text);
}

body {
  min-height: 100vh;
}

button,
select {
  font: inherit;
}

.app-shell {
  display: grid;
  grid-template-columns: 260px 1fr;
  min-height: 100vh;
}

.sidebar {
  background: rgba(15, 23, 42, 0.92);
  border-right: 1px solid var(--border);
  padding: 24px 18px;
}

.brand {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 32px;
}

.brand-mark {
  width: 44px;
  height: 44px;
  display: grid;
  place-items: center;
  font-weight: 700;
  color: #03131d;
  background: linear-gradient(135deg, var(--accent), #67e8f9);
  border-radius: 12px;
}

.brand h1 {
  margin: 0;
  font-size: 1.1rem;
}

.brand small {
  color: var(--muted);
}

.nav-links {
  display: grid;
  gap: 10px;
  margin-bottom: 24px;
}

.nav-button {
  border: 1px solid var(--border);
  background: transparent;
  color: var(--text);
  padding: 12px 14px;
  border-radius: 10px;
  text-align: left;
  cursor: pointer;
  transition: 0.2s ease;
}

.nav-button.active,
.nav-button:hover {
  background: rgba(56, 189, 248, 0.1);
  border-color: rgba(56, 189, 248, 0.5);
}

.sidebar-card,
.panel-card {
  border: 1px solid var(--border);
  background: rgba(17, 24, 39, 0.85);
  border-radius: 14px;
  padding: 16px;
}

.label,
.eyebrow {
  margin: 0 0 8px;
  font-size: 0.72rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--muted);
}

.main-panel {
  padding: 28px;
}

.section {
  display: none;
}

.section.active {
  display: block;
}

.panel-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.panel-header h2 {
  margin: 0;
  font-size: clamp(1.7rem, 3vw, 2.4rem);
}

.metric-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 18px;
  margin-bottom: 26px;
}

.metric-box {
  border: 1px solid var(--border);
  background: rgba(15, 23, 42, 0.9);
  border-radius: 14px;
  padding: 20px;
}

.metric-box h3 {
  margin: 0 0 8px;
  font-size: 0.86rem;
  color: var(--muted);
}

.metric-box strong {
  font-size: 1.8rem;
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 18px;
}

.panel-card h3 {
  margin-top: 0;
}

.panel-card ul {
  margin: 0;
  padding-left: 18px;
  color: var(--text);
}

.panel-card p {
  margin: 0;
  color: var(--text);
  line-height: 1.6;
}

.connect-toolbar {
  display: flex;
  align-items: end;
  gap: 12px;
  flex-wrap: wrap;
  margin-bottom: 16px;
}

.connect-toolbar label {
  display: grid;
  gap: 8px;
  font-size: 0.9rem;
  color: var(--muted);
}

select,
.primary-button,
.secondary-button {
  border-radius: 10px;
  border: 1px solid var(--border);
  background: #0b1220;
  color: var(--text);
  padding: 10px 14px;
}

.primary-button {
  background: linear-gradient(135deg, var(--accent), var(--accent-strong));
  color: #04131c;
  border: none;
  font-weight: 700;
  cursor: pointer;
}

.secondary-button {
  cursor: pointer;
}

.status-box {
  display: inline-flex;
  align-items: center;
  min-height: 42px;
  padding: 8px 12px;
  border-radius: 10px;
  border: 1px solid var(--border);
  margin-bottom: 16px;
}

.status-box.ok {
  background: rgba(34, 197, 94, 0.12);
  border-color: rgba(34, 197, 94, 0.4);
  color: #bbf7d0;
}

.status-box.err {
  background: rgba(239, 68, 68, 0.12);
  border-color: rgba(239, 68, 68, 0.4);
  color: #fecaca;
}

.status-box.idle {
  background: rgba(148, 163, 184, 0.08);
  color: var(--muted);
}

.terminal {
  height: 480px;
  border-radius: 12px;
  border: 1px solid var(--border);
  background: rgba(2, 6, 23, 0.92);
  overflow: hidden;
}

.host-list {
  display: grid;
  gap: 14px;
}

.host-item {
  display: grid;
  grid-template-columns: 1.5fr 1fr auto;
  align-items: center;
  gap: 12px;
  border: 1px solid var(--border);
  background: rgba(15, 23, 42, 0.8);
  border-radius: 12px;
  padding: 16px;
}

.host-item h4 {
  margin: 0 0 6px;
}

.host-item p {
  margin: 0;
  color: var(--muted);
}

.host-status {
  display: inline-flex;
  justify-content: center;
  padding: 8px 10px;
  border-radius: 999px;
  font-size: 0.75rem;
  border: 1px solid rgba(56, 189, 248, 0.4);
  background: rgba(56, 189, 248, 0.08);
  color: #bae6fd;
}

@media (max-width: 900px) {
  .app-shell {
    grid-template-columns: 1fr;
  }

  .sidebar {
    border-right: none;
    border-bottom: 1px solid var(--border);
  }
}
