document.addEventListener("DOMContentLoaded", () => {
    const menuToggle = document.querySelector(".menu-toggle");
    const navLinks = document.querySelector(".nav-links");

    if (!menuToggle || !navLinks) {
        console.error("Error: .menu-toggle or .nav-links not found!");
        return;
    }

    menuToggle.addEventListener("click", () => {
        navLinks.classList.toggle("active");
    });
});