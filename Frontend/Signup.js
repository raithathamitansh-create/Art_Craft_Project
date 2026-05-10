
document.querySelector("form").addEventListener("submit", async (e) => {
    e.preventDefault();

    const data = {
        first_name: document.querySelector('input[placeholder="First name"]').value,
        last_name: document.querySelector('input[placeholder="Last name"]').value,
        mobile: document.querySelector('input[placeholder="Mobile Number"]').value,
        email: document.querySelector('input[placeholder="Email"]').value,
        password: document.querySelector('input[placeholder="Password"]').value
    };

    const res = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });

    const result = await res.json();
    alert(result.message);
});
