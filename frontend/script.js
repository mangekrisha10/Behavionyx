// =====================
// BEHAVIOR DATA STORAGE
// =====================
let keyTimes = [];
let mouseData = [];

// =====================
// CAPTURE TYPING
// =====================
document.querySelectorAll("input").forEach(input => {
    input.addEventListener("keydown", () => {
        keyTimes.push(Date.now());
    });
});

// =====================
// CAPTURE MOUSE
// =====================
document.addEventListener("mousemove", (e) => {
    if (mouseData.length < 100) {
        mouseData.push({
            x: e.clientX,
            y: e.clientY,
            time: Date.now()
        });
    }
});

// =====================
// TOGGLE LOGIN / SIGNUP
// =====================
function showLogin() {
    document.getElementById("loginForm").style.display = "block";
    document.getElementById("signupForm").style.display = "none";

    document.getElementById("loginTab").classList.add("active");
    document.getElementById("signupTab").classList.remove("active");

    document.querySelector(".slider").style.left = "4px";
}

function showSignup() {
    document.getElementById("loginForm").style.display = "none";
    document.getElementById("signupForm").style.display = "block";

    document.getElementById("signupTab").classList.add("active");
    document.getElementById("loginTab").classList.remove("active");

    document.querySelector(".slider").style.left = "calc(50% + 0px)";
}

// =====================
// TOGGLE PASSWORD
// =====================
function togglePassword(id) {
    let input = document.getElementById(id);
    input.type = input.type === "password" ? "text" : "password";
}

// =====================
// CALCULATE DEMO RISK
// =====================
function calculateBehaviorRisk() {
    let risk = 20;

    if (keyTimes.length < 2) {
        risk += 15;
    }

    if (mouseData.length < 10) {
        risk += 10;
    }

    if (keyTimes.length > 8) {
        const intervals = [];
        for (let i = 1; i < keyTimes.length; i++) {
            intervals.push(keyTimes[i] - keyTimes[i - 1]);
        }

        const avgInterval =
            intervals.reduce((sum, value) => sum + value, 0) / intervals.length;

        if (avgInterval < 40) {
            risk += 25;
        } else if (avgInterval < 80) {
            risk += 15;
        }
    }

    if (mouseData.length > 0) {
        let totalDistance = 0;

        for (let i = 1; i < mouseData.length; i++) {
            const dx = mouseData[i].x - mouseData[i - 1].x;
            const dy = mouseData[i].y - mouseData[i - 1].y;
            totalDistance += Math.sqrt(dx * dx + dy * dy);
        }

        if (totalDistance < 200) {
            risk += 15;
        }
    }

    if (risk > 100) risk = 100;

    let prediction = "Normal User";
    if (risk >= 70) {
        prediction = "Suspicious User";
    } else if (risk >= 40) {
        prediction = "Needs Review";
    }

    return { risk, prediction };
}

// =====================
// LOGIN FUNCTION
// =====================
function login() {
    let username = document.getElementById("loginUsername").value.trim();
    let password = document.getElementById("password").value.trim();

    let savedUser = localStorage.getItem("username");
    let savedPass = localStorage.getItem("password");

    if (!username || !password) {
        alert("Please fill all fields");
        return;
    }

    if (username === savedUser && password === savedPass) {
        console.log("Typing:", keyTimes);
        console.log("Mouse:", mouseData);

        const result = calculateBehaviorRisk();

        localStorage.setItem("risk", result.risk);
        localStorage.setItem("prediction", result.prediction);
        localStorage.setItem("mouseData", JSON.stringify(mouseData));
        localStorage.setItem("keyTimes", JSON.stringify(keyTimes));
        localStorage.setItem("lastLoginUser", username);
        localStorage.setItem("lastLoginTime", new Date().toLocaleString());

        alert("Login successful ✅");

        keyTimes = [];
        mouseData = [];

        window.location.href = "dashboard.html";
    } else {
        alert("Invalid credentials ❌");
    }
}

// =====================
// SIGNUP FUNCTION
// =====================
function signup() {
    let username = document.getElementById("signupUsername").value.trim();
    let password = document.getElementById("signupPassword").value.trim();
    let confirmPassword = document.getElementById("confirmPassword").value.trim();

    if (!username || !password || !confirmPassword) {
        alert("Please fill all fields");
        return;
    }

    if (password !== confirmPassword) {
        alert("Passwords do not match ❌");
        return;
    }

    localStorage.setItem("username", username);
    localStorage.setItem("password", password);

    alert("Account created successfully ✅ Please login");

    document.getElementById("signupUsername").value = "";
    document.getElementById("signupPassword").value = "";
    document.getElementById("confirmPassword").value = "";

    showLogin();
}