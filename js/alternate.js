document.addEventListener("DOMContentLoaded", () => {
    const menuToggle = document.querySelector(".menu-toggle");
    const navLinks = document.querySelector(".nav-links");

    menuToggle.addEventListener("click", () => {
        navLinks.classList.toggle("active");
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const track = document.querySelector(".virtual-recharges-track");
    const slides = document.querySelectorAll(".slide");
    const prevBtn = document.querySelector(".prev-btn");
    const nextBtn = document.querySelector(".next-btn");

    let currentIndex = 0;

    function updateSlidePosition() {
        track.style.transform = `translateX(-${currentIndex * 100}%)`;
    }

    nextBtn.addEventListener("click", () => {
        if (currentIndex < slides.length - 1) {
            currentIndex++;
        } else {
            currentIndex = 0;
        }
        updateSlidePosition();
    });

    prevBtn.addEventListener("click", () => {
        if (currentIndex > 0) {
            currentIndex--;
        } else {
            currentIndex = slides.length - 1;
        }
        updateSlidePosition();
    });

    // Auto-slide every 3 seconds
    setInterval(() => {
        nextBtn.click();
    }, 10000);
});

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
            icon: "Icon 1",
            title: "Recarga Telcel",
            description: "Realiza recargas de Telcel al instante desde tu negocio.",
        },
        {
            icon: "Icon 2",
            title: "Ofrece pagos de servicios",
            description: "Realiza más de 90 pagos de servicios en México en tu negocio. Conviértete en un punto de pagos con Linntae.",
        },
        {
            icon: "Icon 3",
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

    // Auto-slide every 5 seconds
    setInterval(() => {
        updateCarousel("next");
    }, 2000);
});


/*FAQ*/

function zoomText(icon) {
    const text = icon.nextElementSibling; // Select the text div
    text.classList.add("zoom-effect");

    setTimeout(() => {
        text.classList.remove("zoom-effect");
    }, 300);
}

function cargarSelectGiros() {
    const url = "https://back.linntae.mx/anonymous/loadInfoPage"; // URL del servicio
    const select = document.getElementById("reg-business");

    async function cargarGiros() {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Error en la petición: ${response.status}`);
            }
            const data = await response.json();

            // Limpiamos el select antes de llenarlo
            select.innerHTML = '<option value="">Selecciona un giro</option>';

            // Llenamos el select con las opciones
            data.giroNegocioList.forEach(giro => {
                let option = document.createElement("option");
                option.value = giro.id;
                option.textContent = giro.nombre;
                select.appendChild(option);
            });
        } catch (error) {
            console.error("Error al cargar giros:", error);
            select.innerHTML = '<option value="">Error al cargar datos</option>';
        }
    }

    // Llamamos a la función cuando el DOM está listo
    cargarGiros();
}

