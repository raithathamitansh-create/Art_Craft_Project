const otpModal = document.getElementById("otpModal");
const otpInput = document.getElementById("otpInput");
const otpCancelBtn = document.getElementById("otpCancelBtn");
const otpVerifyBtn = document.getElementById("otpVerifyBtn");
const emailInput = document.querySelector('input[type="email"]');
const passwordInput = document.querySelector('input[type="password"]');

// Handle initial login
document.querySelector("form").addEventListener("submit", async (e) => {
    e.preventDefault();

    const data = {
        email: emailInput.value,
        password: passwordInput.value
    };

    try {
        const res = await fetch(`${CONFIG.API_URL}/api/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        const result = await res.json();

        if (res.ok) {
            // Show OTP Modal
            otpInput.value = "";
            otpModal.setAttribute("aria-hidden", "false");
            otpInput.focus();
        } else {
            alert(result.message || "Login failed");
        }
    } catch (err) {
        console.error("Login error:", err);
        alert("An error occurred. Please try again.");
    }
});

// Handle OTP Verification
otpVerifyBtn.addEventListener("click", async () => {
    const otp = otpInput.value.trim();
    if (!otp) {
        alert("Please enter the OTP.");
        return;
    }

    try {
        const res = await fetch(`${CONFIG.API_URL}/api/auth/verify-otp`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: emailInput.value,
                otp: otp
            })
        });

        const result = await res.json();

        if (res.ok) {
            // Store token and user info
            localStorage.setItem("token", result.token);
            localStorage.setItem("user", JSON.stringify(result.user));
            
            alert("Login successful!");
            window.location.href = "index.html";
        } else {
            alert(result.message || "Invalid OTP");
        }
    } catch (err) {
        console.error("OTP verification error:", err);
        alert("An error occurred during verification. Please try again.");
    }
});

// Cancel OTP Modal
otpCancelBtn.addEventListener("click", () => {
    otpModal.setAttribute("aria-hidden", "true");
});