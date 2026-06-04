let eventChart, riskChart;

function renderEventChart(data) {
    const ctx = document.getElementById('eventChart').getContext('2d');
    
    if (eventChart) eventChart.destroy();
    
    const labels = data.map(item => item._id);
    const counts = data.map(item => item.count);

    eventChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Event Count',
                data: counts,
                backgroundColor: '#3b82f6'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: { beginAtZero: true, grid: { color: '#334155' } },
                x: { grid: { display: false } }
            },
            plugins: { legend: { display: false } }
        }
    });
}

function renderRiskChart(threats) {
    const ctx = document.getElementById('riskChart').getContext('2d');
    if (riskChart) riskChart.destroy();

    const severityCounts = { 'High': 0, 'Medium': 0, 'Low': 0 };
    threats.forEach(t => severityCounts[t.severity]++);

    riskChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['High', 'Medium', 'Low'],
            datasets: [{
                data: Object.values(severityCounts),
                backgroundColor: ['#ef4444', '#f59e0b', '#10b981'],
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { position: 'bottom', labels: { color: '#94a3b8' } }
            }
        }
    });
}