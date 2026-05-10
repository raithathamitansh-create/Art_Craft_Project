
document.querySelector("form").addEventListener("submit", async (e) => {
    e.preventDefault();

    const data = {
        email: document.querySelector('input[type="email"]').value,
        password: document.querySelector('input[type="password"]').value
    };

    const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });

    const result = await res.json();

    if (res.ok) {
        window.location.href = "Main.html";
    } else {
        alert(result.message);
    }
});

if (res.ok) {
    localStorage.setItem("token", result.token);
    window.location.href = "Main.html";
}