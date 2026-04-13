function loadPage(page) {

    let content = document.getElementById("mainContent");

    if (page === "overview") {
        content.innerHTML = `
            <h1>Overview</h1>
            <div class="card">Total Logins: 120</div>
            <div class="card">Risk Alerts: 5</div>

            <canvas id="riskChart"></canvas>
        `;

        setTimeout(loadChart, 100);
    } else if (page === "behavior") {
        content.innerHTML = `
            <h1>Behavior Analysis</h1>

            <div class="card">
                <h3>Typing Behavior</h3>
                <p>Speed: Normal</p>
                <p>Consistency: High</p>
            </div>

            <div class="card">
                <h3>Mouse Movement</h3>
                <p>Pattern: Smooth</p>
                <p>Deviation: Low</p>
            </div>
        `;
    } else if (page === "risk") {
        let risk = localStorage.getItem("riskScore") || 20;

        content.innerHTML = `
            <h1>Risk Report</h1>

            <div class="card">
                <h2>Risk Score: ${risk}</h2>
                <p>Status: ${risk < 50 ? "Safe ✅" : "Suspicious ⚠️"}</p>
            </div>

            <div class="card">
                <h3>Analysis Summary</h3>
                <p>User behavior matches previous patterns.</p>
                <p>No major anomalies detected.</p>
            </div>
        `;
    } else if (page === "activity") {
        content.innerHTML = `
            <h1>User Activity</h1>

            <div class="card">Last Login: Today</div>
            <div class="card">Sessions: 3</div>
            <div class="card">Device: Chrome Browser</div>
        `;
    }
}

// 📊 Chart
function loadChart() {
    const ctx = document.getElementById('riskChart');

    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
            datasets: [{
                label: 'Risk Score',
                data: [20, 30, 25, 40, 20],
                borderWidth: 2
            }]
        }
    });
}

function logout() {
    window.location.href = "index.html";
}

function checkRiskAlert() {
    let risk = Math.floor(Math.random() * 100);

    if (risk > 70) {
        let alertBox = document.getElementById("alertBox");
        alertBox.innerText = "⚠️ High Risk Activity Detected!";
        alertBox.classList.remove("hidden");
    }
}