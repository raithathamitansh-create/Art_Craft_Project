// Select buttons
const loginBtn = document.getElementById("login");
const signupBtn = document.getElementById("signup");

// Redirect to Login Page
if (loginBtn) {
    loginBtn.addEventListener("click", function () {
        // Only redirect if not already logged in (Enrollment.js handles the 'Hi, User' text)
        if (loginBtn.textContent === "Login") {
            window.location.href = "Login.html";
        }
    });
}

// Redirect to Signup Page
if (signupBtn) {
    signupBtn.addEventListener("click", function () {
        // Only redirect if not logged in (Enrollment.js handles the 'Logout' text)
        if (signupBtn.textContent === "Sign up") {
            window.location.href = "Signup.html";
        }
    });
}