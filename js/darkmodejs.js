document.addEventListener("DOMContentLoaded", function () {
    const darkModeToggle = document.getElementById("darkModeToggle");
    const body = document.body;

    // Check if there's a saved preference in localStorage
    if (localStorage.getItem("theme") === "dark") {
        body.classList.add("dark-mode");
        darkModeToggle.textContent = "☀️ Light Mode";
    } else if (!localStorage.getItem("theme")) {
        // Detect system preference
        if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
            body.classList.add("dark-mode");
            localStorage.setItem("theme", "dark");
            darkModeToggle.textContent = "☀️ Light Mode";
        }
    }

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
    });
});
