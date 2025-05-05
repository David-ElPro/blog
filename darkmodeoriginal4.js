document.addEventListener("DOMContentLoaded", function () {
    const darkModeToggle = document.getElementById("darkModeToggle");
// Toggle dark mode class

    const body = document.body;


    // Toggle dark mode
    darkModeToggle.addEventListener("click", function () {
        if (body.classList.contains("dark-mode")) {
            body.classList.remove("dark-mode");
            localStorage.setItem("theme", "light");
            darkModeToggle.textContent = "🌙 Dark Mode";
        } else {
            body.classList.add("dark-mode");
            localStorage.setItem("theme", "dark");
            darkModeToggle.textContent = "☀️ Light Mode";
        }
        this.dataset.emoji = body.classList.contains("dark-mode") ? "🌙" : "☀️";
        this.innerHTML = body.classList.contains("dark-mode") ? '<span>☀️ Light Mode</span>' : '<span>🌙 Dark Mode</span>';
    });

    });
