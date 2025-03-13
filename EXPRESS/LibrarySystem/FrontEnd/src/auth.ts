document.addEventListener("DOMContentLoaded", () => {
    const signupForm = document.getElementById("signup-form") as HTMLFormElement;

    signupForm.addEventListener("submit", async (event) => {
        event.preventDefault();
        
        const name = (document.getElementById("name") as HTMLInputElement).value;
        const email = (document.getElementById("email") as HTMLInputElement).value;
        const password = (document.getElementById("password") as HTMLInputElement).value;

        const response = await fetch("http://localhost:3000/api/v1/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name, email, password })
        });

        const data = await response.json();

        if (response.ok) {
            alert("User registered successfully!");
            window.location.href = "dashboard.html";
        } else {
            alert(data.message || "Error signing up");
        }
    });
});