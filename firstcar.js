/*Carrusel code */

document.addEventListener("DOMContentLoaded", () => {
    const leftArrow = document.querySelector(".left-arrow");
    const rightArrow = document.querySelector(".right-arrow");
    const centerIcon = document.querySelector(".carousel-center-icon img");
    const leftIcon = document.querySelector(".left-icon img");
    const rightIcon = document.querySelector(".right-icon img");
    const title = document.getElementById("carousel-title");
    const description = document.getElementById("carousel-description");

    let currentIndex = 1;

    const items = [
        {
            icon: "icon1.png",
            title: "Recarga Telcel",
            description: "Realiza recargas de Telcel al instante desde tu negocio.",
        },
        {
            icon: "icon2.png",
            title: "Ofrece pagos de servicios",
            description: "Realiza más de 90 pagos de servicios en México en tu negocio. Conviértete en un punto de pagos con Linnate.",
        },
        {
            icon: "icon3.png",
            title: "Pines Electrónicos",
            description: "Vende pines electrónicos de Amazon, Netflix y más.",
        }
    ];

    function updateCarousel(direction) {
        if (direction === "next") {
            currentIndex = (currentIndex + 1) % items.length;
        } else {
            currentIndex = (currentIndex - 1 + items.length) % items.length;
        }

        centerIcon.src = items[currentIndex].icon;
        title.textContent = items[currentIndex].title;
        description.textContent = items[currentIndex].description;

        leftIcon.src = items[(currentIndex - 1 + items.length) % items.length].icon;
        rightIcon.src = items[(currentIndex + 1) % items.length].icon;
    }

    rightArrow.addEventListener("click", () => updateCarousel("next"));
    leftArrow.addEventListener("click", () => updateCarousel("prev"));

    // auto deslizarse cada 5 segundos
    setInterval(() => {
        updateCarousel("next");
    }, 5000);
});
