document.addEventListener("DOMContentLoaded", function () {
    // selecciona todos los elementos que se animarán
    const elements = document.querySelectorAll(".custom-card, .hero-image1, .feature-box, .register-background");

    const observer = new IntersectionObserver(entries => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add("active"); // Añade la clase de animación
                }, index * 200); // opcional: retrasa cada animación
            }
        });
    }, { threshold: 0.2 });

    elements.forEach(element => observer.observe(element));
});
