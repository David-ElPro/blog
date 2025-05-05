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
            icon: "https://storage.googleapis.com/linn-files/LinntaeWebPage/carrusel/smartphonecarrusel.png",
            title: "Recarga Telcel",
            description: "Realiza recargas de Telcel al instante desde tu negocio.",
        },
        {
            icon: "https://storage.googleapis.com/linn-files/LinntaeWebPage/carrusel/pagosdeserviciodrop",
            title: "Ofrece pagos de servicios",
            description: "Realiza más de 100 pagos de servicios en México desde tu negocio. Conviértete en un punto de pagos y ofrece soluciones rápidas a tus clientes.",
        },
        {
            icon: "https://storage.googleapis.com/linn-files/LinntaeWebPage/carrusel/giftcardcarrusel.png",
            title: "Pines Electrónicos",
            description: "Vende los pines electrónicos más buscados, incluyendo Google Play, uno de los más vendidos. También disponibles: Amazon, Netflix y muchos más. Aumenta tus ingresos ofreciendo lo que todos están buscando.",
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

    // deslizar autotamitcamente cada 5 segundos
    setInterval(() => {
        updateCarousel("next");
    }, 5000);
});


window.onload = function () {}
