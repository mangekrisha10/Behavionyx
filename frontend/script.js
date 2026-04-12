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

    document.querySelector(".slider").style.left = "0%";
}

function showSignup() {
    document.getElementById("loginForm").style.display = "none";
    document.getElementById("signupForm").style.display = "block";

    document.getElementById("signupTab").classList.add("active");
    document.getElementById("loginTab").classList.remove("active");

    document.querySelector(".slider").style.left = "50%";
}

// =====================
// TOGGLE PASSWORD
// =====================
function togglePassword(id) {
    let input = document.getElementById(id);
    input.type = input.type === "password" ? "text" : "password";
}

// =====================
// LOGIN FUNCTION (FIXED)
// =====================
function login() {
    let username = document.querySelector("#loginForm input").value;
    let password = document.getElementById("password").value;

    let savedUser = localStorage.getItem("username");
    let savedPass = localStorage.getItem("password");

    if (username === savedUser && password === savedPass) {

        console.log("Typing:", keyTimes);
        console.log("Mouse:", mouseData);

        alert("Login successful ✅");

        // ✅ FIX: define BEFORE fetch
        let safeKeyTimes = keyTimes.length > 1 ? keyTimes : [1, 2];

        fetch("/analyze", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    keyTimes: safeKeyTimes
                })
            })
            .then(res => {
                if (!res.ok) {
                    throw new Error("Server error");
                }
                return res.json();
            })
            .then(data => {
                console.log("Prediction:", data);

                // Store result
                localStorage.setItem("risk", data.risk);
                localStorage.setItem("prediction", data.prediction);

                // Redirect to dashboard
                window.location.href = "/dashboard";
            })
            .catch(err => {
                console.error("Error:", err);
                alert("Server error ⚠️");
            });

        // Reset data
        keyTimes = [];
        mouseData = [];

    } else {
        alert("Invalid credentials ❌");
    }
}

// =====================
// SIGNUP FUNCTION
// =====================
function signup() {
    let username = document.querySelector("#signupForm input").value;
    let password = document.getElementById("signupPassword").value;
    let confirmPassword = document.getElementById("confirmPassword").value;

    if (password !== confirmPassword) {
        alert("Passwords do not match ❌");
        return;
    }

    localStorage.setItem("username", username);
    localStorage.setItem("password", password);

    alert("Account created successfully ✅ Please login");

    document.getElementById("signupPassword").value = "";
    document.getElementById("confirmPassword").value = "";

    showLogin();
}