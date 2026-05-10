document.querySelector("form").addEventListener("submit", async (e) => {
    e.preventDefault();

    const data = {
        email: document.querySelector('input[type="email"]').value,
        password: document.querySelector('input[type="password"]').value
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
            // Store token and user info
            localStorage.setItem("token", result.token);
            localStorage.setItem("user", JSON.stringify(result.user));
            
            alert("Login successful!");
            window.location.href = "Main.html";
        } else {
            alert(result.message || "Login failed");
        }
    } catch (err) {
        console.error("Login error:", err);
        alert("An error occurred. Please try again.");
    }
});