document.addEventListener('DOMContentLoaded', () => {
     // --- ১. লগইন করা ইউজারের নাম দেখানো (এটি এখানে যোগ করুন) ---
    const loggedInUser = localStorage.getItem('username');
    const viewTitle = document.getElementById('view-title');
    
    if (loggedInUser && viewTitle) {
        // ড্যাশবোর্ডের হেডিং-এ ইউজারের নাম সেট করে দিবে
        viewTitle.innerText = `Welcome, ${loggedInUser} | Security Overview`;
    }

    refreshDashboard();

    // --- ১. Socket.io রিয়েল-টাইম নোটিফিকেশন লজিক ---
    const socket = io();

    socket.on('newThreatAlert', (data) => {
        const container = document.getElementById('notification-container');
        if (container) {
            const toast = document.createElement('div');
            toast.className = 'toast-alert';
            toast.innerHTML = `
                <i class="fas fa-exclamation-triangle" style="font-size: 20px;"></i>
                <div>
                    <strong>${data.message}</strong><br>
                    <small>${data.count} new issues: ${data.topThreat}</small>
                </div>
            `;
            container.appendChild(toast);

            setTimeout(() => {
                toast.style.opacity = '0';
                setTimeout(() => toast.remove(), 500);
            }, 5000);
        }
        refreshDashboard(); // অটোমেটিক গ্রাফ আপডেট
    });

    // --- ২. মেনু নেভিগেশন ---
    const navItems = document.querySelectorAll('.sidebar li');
    const sections = document.querySelectorAll('.view-section');

    navItems.forEach(item => {
        item.addEventListener('click', () => {
            const viewName = item.getAttribute('data-view');
            navItems.forEach(nav => nav.classList.remove('active'));
            item.classList.add('active');
            sections.forEach(s => s.style.display = 'none');
            const target = document.getElementById(`${viewName}-view`);
            if (target) target.style.display = 'block';
            document.getElementById('view-title').innerText = item.innerText;

            if (viewName === 'dashboard') refreshDashboard();
            if (viewName === 'threats') loadAllThreats();
            if (viewName === 'logs') loadRawLogs();
            if (viewName === 'alerts') loadAlerts();
        });
    });

    // --- ৩. বাটন লজিকসমূহ (Sample, Reset, PDF, CSV) ---
    document.getElementById('btnSample').onclick = async () => {
        await fetch('/api/logs/sample', { method: 'POST' });
        refreshDashboard();
    };

    document.getElementById('btnReset').onclick = async () => {
        if (confirm('Clear all data?')) {
            await fetch('/api/logs/clear', { method: 'DELETE' });
            location.reload();
        }
    };

    document.getElementById('btnDownload').onclick = () => window.location.href = '/api/reports/download/pdf';
    document.getElementById('btnCSV').onclick = () => window.location.href = '/api/reports/download/csv';

    // --- ৪. সার্চ এবং ফিল্টার লজিক ---
    const searchInput = document.getElementById('logSearch');
    const filterSelect = document.getElementById('severityFilter');
    if(searchInput) searchInput.onkeyup = applyFilters;
    if(filterSelect) filterSelect.onchange = applyFilters;

    // --- ৫. ফাইল আপলোড ---
    document.getElementById('logUpload').onchange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const formData = new FormData();
        formData.append('logs', file);
        await fetch('/api/logs/upload', { method: 'POST', body: formData });
        alert('File processed!');
        refreshDashboard();
    };
});

// --- ফাংশনসমূহ ---

async function refreshDashboard() {
    const sRes = await fetch('/api/logs/stats');
    const stats = await sRes.json();
    const tRes = await fetch('/api/threats');
    const threats = await tRes.json();

    document.getElementById('stat-total-logs').innerText = stats.totalLogs || 0;
    document.getElementById('stat-failed').innerText = stats.failedLogins || 0;
    document.getElementById('stat-threats').innerText = threats.length || 0;
    
    const avg = threats.length > 0 ? Math.round(threats.reduce((a, t) => a + t.riskScore, 0) / threats.length) : 0;
    document.getElementById('stat-risk').innerText = avg + '%';

    const tbody = document.querySelector('#threat-table tbody');
    tbody.innerHTML = '';
    threats.slice(0, 5).forEach(t => {
        tbody.innerHTML += `<tr><td>${t.ipAddress}</td><td>${t.type}</td><td class="severity-${t.severity.toLowerCase()}">${t.severity}</td><td>${t.riskScore}</td><td><button class="btn-primary" onclick="viewThreatDetails('${t._id}')" style="padding:4px 8px">Review</button></td></tr>`;
    });

    if (window.renderEventChart) renderEventChart(stats.eventDistribution || []);
    if (window.renderRiskChart) renderRiskChart(threats || []);
}

async function viewThreatDetails(id) {
    const res = await fetch(`/api/threats/${id}`);
    const threat = await res.json();
    const modal = document.getElementById('threatModal');
    const modalBody = document.getElementById('modal-body');

    const mitigationMap = {
        'Brute Force Attempt': 'Block this IP in your firewall. Enforce MFA.',
        'Port Scan': 'Close unused ports. Deploy an IPS system.',
        'Unauthorized Access Pattern': 'Review permissions. Implement PoLP principle.',
        'UNKNOWN_EVENT': 'Investigate raw logs for more details.'
    };
    const mitigation = mitigationMap[threat.type] || mitigationMap['UNKNOWN_EVENT'];

    modalBody.innerHTML = `
        <div class="detail-row"><span>Type:</span> <strong>${threat.type}</strong></div>
        <div class="detail-row"><span>IP:</span> <code>${threat.ipAddress}</code></div>
        <div class="detail-row"><span>Severity:</span> <span class="severity-${threat.severity.toLowerCase()}">${threat.severity}</span></div>
        <div class="detail-row"><span>Risk Score:</span> <strong>${threat.riskScore}/100</strong></div>
        <div style="margin: 10px 0; padding: 10px; background: rgba(16, 185, 129, 0.1); border-radius: 5px; border: 1px solid #10b981;">
            <p style="color:#10b981; font-weight:bold;">Recommendation:</p>
            <p style="font-size:13px;">${mitigation}</p>
        </div>
    `;
    modal.style.display = "block";
}

function applyFilters() {
    const s = document.getElementById('logSearch').value.toLowerCase();
    const f = document.getElementById('severityFilter').value.toLowerCase();
    const rows = document.querySelectorAll('.view-section:not([style*="display: none"]) table tbody tr');

    rows.forEach(r => {
        const txt = r.textContent.toLowerCase();
        r.style.display = (txt.includes(s) && (f === "" || txt.includes(f))) ? "" : "none";
    });
}

async function loadAllThreats() {
    const res = await fetch('/api/threats');
    const threats = await res.json();
    const tbody = document.querySelector('#all-threats-table tbody');
    tbody.innerHTML = '';
    threats.forEach(t => {
        tbody.innerHTML += `<tr><td>${new Date(t.lastSeen).toLocaleDateString()}</td><td>${t.ipAddress}</td><td>${t.type}</td><td>${t.riskScore}</td><td><button class="btn-primary" onclick="viewThreatDetails('${t._id}')" style="padding:4px 8px">Details</button></td></tr>`;
    });
}

async function loadRawLogs() {
    const res = await fetch('/api/logs/all');
    const logs = await res.json();
    const tbody = document.querySelector('#raw-logs-table tbody');
    tbody.innerHTML = '';
    logs.forEach(l => {
        tbody.innerHTML += `<tr><td>${new Date(l.timestamp).toLocaleString()}</td><td>${l.ipAddress}</td><td>${l.eventType}</td><td>${l.status}</td></tr>`;
    });
}

async function loadAlerts() {
    const res = await fetch('/api/threats');
    const threats = await res.json();
    const list = document.getElementById('alerts-list');
    const high = threats.filter(t => t.severity === 'High');
    list.innerHTML = high.length ? '' : '<p>No critical alerts.</p>';
    high.forEach(t => {
        list.innerHTML += `<div style="border-left:4px solid red; padding:15px; margin:10px 0; background:#1e293b; border-radius:6px; display:flex; justify-content:space-between; align-items:center;">
            <div><strong>ALERT: ${t.type}</strong><br><small>IP: ${t.ipAddress}</small></div>
            <button class="btn-primary" onclick="viewThreatDetails('${t._id}')">Investigate</button>
        </div>`;
    });
}

function closeModal() { document.getElementById('threatModal').style.display = "none"; }
window.onclick = (e) => { if (e.target == document.getElementById('threatModal')) closeModal(); };

// লগআউট ফাংশন
function logout() {
    localStorage.removeItem('token'); // ব্রাউজার থেকে টোকেন মুছে ফেলা
    window.location.href = 'login.html'; // লগইন পেজে ফিরে যাওয়া
}