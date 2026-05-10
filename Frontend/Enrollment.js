document.addEventListener("DOMContentLoaded", () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("token");

    // Update Header with User Info
    const header = document.querySelector("header");
    if (user && token && header) {
        const loginBtn = document.getElementById("login");
        const signupBtn = document.getElementById("signup");

        if (loginBtn && signupBtn) {
            loginBtn.textContent = `Hi, ${user.first_name}`;
            loginBtn.style.backgroundColor = "green";
            loginBtn.style.width = "auto";
            loginBtn.style.padding = "10px 20px";
            loginBtn.onclick = null; // Remove redirect to login

            signupBtn.textContent = "Logout";
            signupBtn.style.backgroundColor = "gray";
            signupBtn.onclick = () => {
                localStorage.removeItem("token");
                localStorage.removeItem("user");
                alert("Logged out successfully");
                window.location.reload();
            };
        }
    }

    // Handle Enrollment Clicks
    const enrollButtons = document.querySelectorAll(".buy-btn");
    enrollButtons.forEach(button => {
        button.addEventListener("click", async (e) => {
            if (!token) {
                alert("Please login to enroll in a course");
                window.location.href = "Login.html";
                return;
            }

            // Get course name from page title or H1
            const courseName = document.querySelector(".course-hero h1").textContent;
            // Get plan tier from the card's H3
            const planTier = button.parentElement.querySelector("h3").textContent;

            try {
                const res = await fetch(`${CONFIG.API_URL}/api/enrollments/enroll`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": token
                    },
                    body: JSON.stringify({ courseName, planTier })
                });

                const result = await res.json();
                if (res.ok) {
                    alert(result.message);
                } else {
                    alert(result.message || "Enrollment failed");
                }
            } catch (err) {
                console.error("Enrollment error:", err);
                alert("An error occurred during enrollment.");
            }
        });
    });
});
