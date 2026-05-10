document.querySelector("form").addEventListener("submit", async (e) => {
    e.preventDefault();

    const data = {
        first_name: document.querySelector('input[placeholder="First name"]').value,
        last_name: document.querySelector('input[placeholder="Last name"]').value,
        mobile: document.querySelector('input[placeholder="Mobile Number"]').value,
        email: document.querySelector('input[placeholder="Email"]').value,
        password: document.querySelector('input[placeholder="Password"]').value
    };

    try {
        const res = await fetch("http://localhost:5000/api/auth/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        const result = await res.json();
        
        if (res.ok) {
            alert("Signup successful! Please login.");
            window.location.href = "Login.html";
        } else {
            alert(result.message || "Signup failed");
        }
    } catch (err) {
        console.error("Signup error:", err);
        alert("An error occurred. Please try again.");
    }
});
