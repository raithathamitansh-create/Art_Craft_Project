// Select buttons
const loginBtn = document.getElementById("login");
const signupBtn = document.getElementById("signup");

// Redirect to Login Page
loginBtn.addEventListener("click", function () {
    window.location.href = "Login.html";
});

// Redirect to Signup Page
signupBtn.addEventListener("click", function () {
    window.location.href = "Signup.html";
});