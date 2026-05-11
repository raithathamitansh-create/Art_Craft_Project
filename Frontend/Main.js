// Select elements
const loginBtn = document.getElementById("login");
const signupBtn = document.getElementById("signup");
const themeToggle = document.getElementById("theme-toggle");
const searchInput = document.getElementById("search");
const courseItems = document.querySelectorAll(".items");

// ================= THEME TOGGLE =================
if (themeToggle) {
    // Check local storage for saved theme
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
        document.documentElement.setAttribute("data-theme", savedTheme);
        themeToggle.textContent = savedTheme === "dark" ? "☀️" : "🌙";
    }

    // Toggle event listener
    themeToggle.addEventListener("click", () => {
        const currentTheme = document.documentElement.getAttribute("data-theme");
        const newTheme = currentTheme === "dark" ? "light" : "dark";
        
        document.documentElement.setAttribute("data-theme", newTheme);
        localStorage.setItem("theme", newTheme);
        themeToggle.textContent = newTheme === "dark" ? "☀️" : "🌙";
    });
}

// ================= LIVE SEARCH =================
if (searchInput && courseItems.length > 0) {
    searchInput.addEventListener("input", function (e) {
        const query = e.target.value.toLowerCase();
        
        courseItems.forEach(item => {
            const title = item.querySelector("h1").textContent.toLowerCase();
            if (title.includes(query)) {
                item.style.display = "flex";
            } else {
                item.style.display = "none";
            }
        });
    });
}

// ================= REDIRECTS =================
// Redirect to Login Page
if (loginBtn) {
    loginBtn.addEventListener("click", function () {
        // Only redirect if not already logged in (Enrollment.js handles the 'Hi, User' text)
        if (loginBtn.textContent === "Login") {
            window.location.href = "/Login.html";
        }
    });
}

// Redirect to Signup Page
if (signupBtn) {
    signupBtn.addEventListener("click", function () {
        // Only redirect if not logged in (Enrollment.js handles the 'Logout' text)
        if (signupBtn.textContent === "Sign up") {
            window.location.href = "/Signup.html";
        }
    });
}