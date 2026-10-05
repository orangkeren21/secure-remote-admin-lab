const socket = io();

const metricGrid = document.getElementById('metric-grid');
const hostSelect = document.getElementById('host-select');
const hostList = document.getElementById('host-list');
const healthStatus = document.getElementById('health-status');
const connectionStatus = document.getElementById('connection-status');
const connectButton = document.getElementById('connect-button');
const disconnectButton = document.getElementById('disconnect-button');

const navButtons = document.querySelectorAll('.nav-button');
const sections = document.querySelectorAll('.section');

let terminalInstance = null;
let activeSocketSession = null;

navButtons.forEach((button) => {
  button.addEventListener('click', () => {
    navButtons.forEach((btn) => btn.classList.remove('active'));
    sections.forEach((section) => section.classList.remove('active'));
    button.classList.add('active');
    const target = button.dataset.section;
    document.getElementById(target).classList.add('active');
  });
});

function renderMetrics(hosts) {
  const metrics = [
    { label: 'Host Aktif', value: hosts.length },
    { label: 'SSH Access', value: 'Key-Based' },
    { label: 'Firewall', value: 'Default Deny' },
    { label: 'Status', value: 'Running' }
  ];

  metricGrid.innerHTML = metrics
    .map(
      (metric) => `
        <div class="metric-box">
          <h3>${metric.label}</h3>
          <strong>${metric.value}</strong>
        </div>
      `
    )
    .join('');
}

function renderHostList(hosts) {
  if (hosts.length === 0) {
    hostList.innerHTML = '<p style="color: var(--muted); padding: 20px;">Belum ada host yang dikonfigurasi.</p>';
    return;
  }

  hostList.innerHTML = hosts
    .map(
      (host) => `
        <div class="host-item">
          <div>
            <h4>${host.name}</h4>
            <p>${host.host}:${host.port} · ${host.description}</p>
          </div>
          <div>
            <p>${host.type.toUpperCase()} · ${host.access}</p>
          </div>
          <span class="host-status">${host.status}</span>
        </div>
      `
    )
    .join('');
}

function populateHostSelect(hosts) {
  if (hosts.length === 0) {
    hostSelect.innerHTML = '<option>Tidak ada host</option>';
    return;
  }

  hostSelect.innerHTML = hosts
    .map((host) => `<option value="${host.id}">${host.name}</option>`)
    .join('');
}

async function loadHosts() {
  try {
    const response = await fetch('/api/hosts');
    if (!response.ok) throw new Error('Failed to load hosts');

    const hosts = await response.json();
    renderMetrics(hosts);
    renderHostList(hosts);
    populateHostSelect(hosts);
    healthStatus.textContent = 'Server online';
    healthStatus.className = 'status-box ok';
  } catch (error) {
    healthStatus.textContent = 'Server unavailable';
    healthStatus.className = 'status-box err';
    console.error('Error loading hosts:', error);
  }
}

function initTerminal() {
  const terminalElement = document.getElementById('terminal');

  if (!terminalElement) {
    console.error('Terminal element not found');
    return;
  }

  const term = new Terminal({
    cursorBlink: true,
    theme: {
      background: '#020817',
      foreground: '#e2e8f0'
    },
    fontSize: 13,
    scrollback: 10000,
    rows: 25,
    cols: 80
  });

  const fitAddon = new FitAddon.FitAddon();
  term.loadAddon(fitAddon);
  term.open(terminalElement);

  try {
    fitAddon.fit();
  } catch (e) {
    console.error('Error fitting terminal:', e);
  }

  term.onData((data) => {
    if (activeSocketSession) {
      socket.emit('terminal-input', data);
    }
  });

  terminalInstance = term;
  term.write('Ready to connect to a host. Select a host above and click Connect.\r\n');
}

async function connectToHost() {
  const hostId = hostSelect.value;
  if (!hostId) {
    connectionStatus.textContent = 'Pilih host terlebih dahulu';
    connectionStatus.className = 'status-box err';
    return;
  }

  connectionStatus.textContent = 'Menghubungkan...';
  connectionStatus.className = 'status-box idle';
  activeSocketSession = hostId;

  if (terminalInstance) {
    terminalInstance.reset();
    terminalInstance.write('Connecting...\r\n');
  }

  socket.emit('connect-host', { hostId });
}

function disconnectHost() {
  if (terminalInstance) {
    terminalInstance.reset();
    terminalInstance.write('\r\n[Session Disconnected]\r\n');
  }

  connectionStatus.textContent = 'Tidak terhubung';
  connectionStatus.className = 'status-box idle';
  activeSocketSession = null;
}

connectButton.addEventListener('click', connectToHost);
disconnectButton.addEventListener('click', disconnectHost);

socket.on('connect-status', (message) => {
  connectionStatus.textContent = message;
  connectionStatus.className = 'status-box ok';
  if (terminalInstance) {
    terminalInstance.write('\r\n');
  }
});

socket.on('connect-error', (message) => {
  connectionStatus.textContent = `Error: ${message}`;
  connectionStatus.className = 'status-box err';
  if (terminalInstance) {
    terminalInstance.write(`\r\n[ERROR] ${message}\r\n`);
  }
  activeSocketSession = null;
});

socket.on('terminal-output', (data) => {
  if (terminalInstance) {
    terminalInstance.write(data);
  }
});

fetch('/api/health')
  .then((response) => response.json())
  .then((data) => {
    if (data.status === 'ok') {
      healthStatus.textContent = 'Server online';
      healthStatus.className = 'status-box ok';
    } else {
      healthStatus.textContent = 'Server error';
      healthStatus.className = 'status-box err';
    }
  })
  .catch((error) => {
    console.error('Health check failed:', error);
    healthStatus.textContent = 'Server unavailable';
    healthStatus.className = 'status-box err';
  });

document.addEventListener('DOMContentLoaded', () => {
  loadHosts();
  initTerminal();
});
