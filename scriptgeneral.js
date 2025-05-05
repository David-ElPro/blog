let URL_PRODUCCION = "https://back.linntae.mx/anonymous/";
let URL_DEMO = "https://demoempresa.linntae.com/anonymous/";
let URL_LOCAL = "http://localhost:8080/anonymous/";
let URL_BACK = URL_PRODUCCION;

// Esta varible es la del dominio cuando se pruebe en local
//let dominioPortal = 'linntae.com';

// Con esta varible obtenemos el dominio actual
const dominioPortal = location.hostname.replace("www.", "");


document.addEventListener("DOMContentLoaded", () => {
    const track = document.querySelector(".virtual-recharges-track");
    const slides = document.querySelectorAll(".slide");
    const prevBtn = document.querySelector(".prev-btn");
    const nextBtn = document.querySelector(".next-btn");

    const slidesToShow = 3;
    const slideWidth = slides[0].offsetWidth + 15; // +gap
    const totalSlides = slides.length;
    let currentIndex = 0;

    function updateSlidePosition() {
        const offset = currentIndex * slideWidth;
        track.style.transform = `translateX(-${offset}px)`;
    }

    nextBtn.addEventListener("click", () => {
        if (currentIndex < totalSlides - slidesToShow) {
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
            currentIndex = totalSlides - slidesToShow;
        }
        updateSlidePosition();
    });

    setInterval(() => {
        const modal = document.getElementById("modalError");
        const isModalOpen = modal && modal.classList.contains("show");
        if (!isModalOpen) {
            nextBtn.click();
        }
    }, 3000);

    window.addEventListener("resize", () => {
        updateSlidePosition();
    });
});

// Este metodo carga toda la información de la página
document.addEventListener("DOMContentLoaded", function () {
    const url = URL_BACK + "loadInfoPage";
    const selectgiro = document.getElementById("reg-business");
    const selectestado = document.getElementById("reg-state");
    const selectmedio = document.getElementById("reg-contact-method");
    const selectHorario = document.getElementById("reg-contact-time");
    const datahorario = ['08:00 - 09:00', '09:00 - 10:00', '10:00 - 11:00', '11:00 - 12:00', '12:00 - 13:00', '13:00 - 14:00', '14:00 - 15:00', '15:00 - 16:00', '16:00 - 17:00', '17:00 - 18:00', '18:00 - 19:00', '19:00 - 20:00', '20:00 - 21:00'];

    const formData = new FormData();
    formData.append("dominioPortal", dominioPortal);

    async function llamadaapi() {
        const response = await fetch(url, {
            method: "POST",
            body: formData
        });

        if (!response.ok) {
            throw new Error(`Error en la petición: ${response.status}`);
        }

        const data = await response.json();

        //Validacion para saber si el dominio es de linntae
        const isLinntae = dominioPortal.indexOf("linntae") !== -1;

        // Título dinámico y Nombre de la marca
        let iconPath = 'https://storage.googleapis.com/linn-files/LinntaeWebPage/favicon/linntaebluelogoicon.png';
        let marca = dominioPortal.toLowerCase();
        let marcaTitle = data.nombre ? data.nombre : "Recargas y Servicios";

        if (marca.indexOf("linntae") !== -1) {
            iconPath = 'icons/linntae/favicon.png';
            marcaTitle = "Linntae";
        } else if (marca.indexOf("prepagotae") !== -1) {
            iconPath = 'icons/prepagotae/favicon.png';
            marcaTitle = "PrepagoTae";
        } else if (marca.indexOf("datcel") !== -1) {
            iconPath = 'icons/datcel/favicon.png';
            marcaTitle = "Datcel";
        } else if (marca.indexOf("demo") !== -1) {
            iconPath = 'icons/demo/favicon.png';
            marcaTitle = "Demo";
        } else if (marca.indexOf("movilconecta") !== -1) {
            iconPath = 'icons/movilconecta/favicon.png';
            marcaTitle = "Movil Conecta";
        } else if (marca.indexOf("recargasmovil") !== -1) {
            iconPath = 'icons/recargasmovil/favicon.png';
            marcaTitle = "Recargas Movil";
        } else if (marca.indexOf("recargasinteligentes") !== -1) {
            iconPath = 'icons/recargasinteligentes/favicon.png';
            marcaTitle = "Recargas Inteligentes";
        } else if (marca.indexOf("ramcel") !== -1) {
            iconPath = 'icons/ramcel/favicon.png';
            marcaTitle = "RamcelTae";
        } else if (marca.indexOf("virtualceltae") !== -1) {
            iconPath = 'icons/virtualcel/favicon.png';
            marcaTitle = "VirtualcelTae";
        } else if (marca.indexOf("recargasmx") !== -1) {
            iconPath = 'icons/recargadetae/favicon.png';
            marcaTitle = "Recargas de Tae";
        } else if (marca.indexOf("recargasgmb") !== -1) {
            iconPath = 'icons/gmb/favicon.png';
            marcaTitle = "Recargas GMB";
        } else if (marca.indexOf("iconic") !== -1) {
            iconPath = 'icons/iconic/favicon.png';
            marcaTitle = "Iconic";
        } else if (marca.indexOf("okrecargas") !== -1) {
            marcaTitle = "OkRecargas";
        }

        document.getElementById('favicon').href = iconPath;
        document.title = `${marcaTitle} - Plataforma para vender recargas`;

        const companyNameElements = document.getElementsByClassName("companyName");
        for (let element of companyNameElements) {
            element.textContent = marcaTitle;
        }

        // Dirección
        const direccion = document.getElementById("direccion");
        if (direccion && data.direccion) direccion.innerHTML = data.direccion;

        // Correo
        const correo = document.getElementById("correo");
        if (correo && data.correo) correo.innerHTML = data.correo;

        // Logo dinámico
        const logoImage = document.getElementById("logoimagen");
        if (logoImage && data.logoUrl) {
            const time = new Date().getTime();
            logoImage.src = data.logoUrl + "?key=" + time;
        }

        // Cambiar el texto del enlace "Regístrate gratis en:"
        const linkRegistroTexto = document.getElementById("linkRegistroTexto");
        if (linkRegistroTexto && data.nombre) {
            linkRegistroTexto.textContent = `${data.nombre}`;
        }

        // Icono para instalar en pc
        const pcInstallerButton = document.getElementById("pc-installer-link");
        if (pcInstallerButton) {
            if (isLinntae) {
                // Linntae sí tiene app de escritorio
                pcInstallerButton.href = "https://storage.googleapis.com/linn-files/LinntaeWebPage/HowTo/Linntae%20recargas%20Installer%20(3).exe";
            } else if (data.urlLogin) {
                // Otros distribuidores → redirigir a su plataforma web
                pcInstallerButton.href = "https://" + data.urlLogin;
            }
        }
        // Acceso Clientes en navbar
        const accesoClientesNavbar = document.getElementById("acceso-clientes-navbar");
        if (accesoClientesNavbar && data.urlLogin) {
            accesoClientesNavbar.setAttribute("href", "https://" + data.urlLogin);
            accesoClientesNavbar.setAttribute("target", "_blank");
        }
        // Botón "INICIAR SESIÓN" dinámico (el de la navbar o botón grande)
        const btnSesion = document.querySelector("button.buttonsy.sesion");
        if (btnSesion && data.urlLogin) {
            btnSesion.onclick = () => {
                window.location.href = "https://" + data.urlLogin;
            };
        }

        // Botón "EMPIEZA A VENDER" dinámico (el que debe mandar al portal de la marca)
        const btnVender = document.querySelector('a.sell-recharges-button[href="#"]');
        if (btnVender && data.urlLogin) {
            btnVender.setAttribute("href", "https://" + data.urlLogin);
            btnVender.setAttribute("target", "_blank");
        }

        // Botón "COMIENZA AQUÍ" dinámico (el que manda a register-section normal)
        const btnComienzaAqui = document.querySelector('a.sell-recharges-button[href="#register-section"]');
        if (btnComienzaAqui) {
            btnComienzaAqui.setAttribute("href", "#register-section");
        }


        // WhatsApp dinámico
        const whatsappBtn = document.getElementById("whatsappButton");
        if (whatsappBtn && data.telWhats) {
            const telefonoLimpio = data.telWhats.replace(/\D/g, ''); // Quitar cualquier caracter no numérico
            whatsappBtn.href = `https://api.whatsapp.com/send?phone=+52${telefonoLimpio}&text=Hola!!,%20me%20pueden%20dar%20informaci%C3%B3n%20sobre%20la%20venta%20de%20tiempo%20aire`;
            whatsappBtn.style.display = "inline-block";
        }

        // Cambiar el link del texto "Descarga la APP en:"
        const urlPlayStore = data.urlPlayStore;

        const linkAppTexto = document.getElementById("linkAppTexto");
        if (linkAppTexto) {
            if (urlPlayStore && urlPlayStore !== "") {
                linkAppTexto.href = urlPlayStore;
            } else {
                // URL por defecto de Linntae
                linkAppTexto.href = "https://play.google.com/store/apps/details?id=com.linn.Linntae&hl=es_MX";
            }
        }

        // Botones de descarga
        const downloadButtons = [
            document.getElementById("downloadButton"),
            document.getElementById("downloadButton1"),
            document.getElementById("downloadButton2"),
            document.getElementById("downloadButton3"),
            document.getElementById("downloadButton4"),
            document.getElementById("downloadButton5"),
        ];

        downloadButtons.forEach((btn) => {
            if (!btn) return;
            // Si hay URL específica de Play Store (para un dominio personalizado)
            if (urlPlayStore && !isLinntae) {
                btn.setAttribute("href", urlPlayStore);
                btn.setAttribute("target", "_blank");
            } else if (isLinntae) {
                // Si es Linntae, mantener lógica dinámica por tipo de dispositivo
                const isMobile = /Android|iPhone|iPad/i.test(navigator.userAgent);
                if (isMobile) {
                    btn.setAttribute(
                        "href",
                        "https://play.google.com/store/apps/details?id=com.linn.linntae&hl=es_MX"
                    );
                } else {
                    btn.setAttribute(
                        "href",
                        "https://storage.googleapis.com/linn-files/LinntaeWebPage/HowTo/Linntae%20recargas%20Installer%20(3).exe"
                    );
                }
            } else {
                // Si no tiene urlPlayStore, pero tampoco es Linntae, mostrar app de Linntae por defecto
                btn.setAttribute(
                    "href",
                    "https://play.google.com/store/apps/details?id=com.linn.linntae&hl=es_MX"
                );
            }
        });

        // Redes sociales
        const redes = {
            link_fb: "link_fb",
            link_youtube: "link_youtube",
            link_instagram: "link_instagram",
            url_tiktok: "link_tiktok",
            link_twitter: "link_twitter",
            video_youtube: "video_youtube"
        };

        let algunaRedActiva = false;
        for (const [key, id] of Object.entries(redes)) {
            let idElementBar = id + '_bar'
            let url = data[key];
            let element = document.getElementById(id);
            let elementBar = document.getElementById(idElementBar);

            if (url && element) {
                element.setAttribute("href", url);
                element.style.display = "inline-block";
                elementBar.setAttribute("href", url);
                elementBar.style.display = "inline-block";
                algunaRedActiva = true;
            } else if (element) {
                element.style.display = "none";
                elementBar.style.display = "none";
            }
        }

        if (!algunaRedActiva) {
            const lblSiguenos = document.getElementById("lblSiguenos");
            if (lblSiguenos) lblSiguenos.style.display = "none";
            const socialNetwork = document.getElementById("socialNetwork");
            if (socialNetwork) socialNetwork.style.display = "none";
        }

        // Teléfonos
        const infoVentas = document.getElementById("info_ventas");
        const infoSoporte = document.getElementById("info_soporte");
        const infoContacto = document.getElementById("info_contacto");
        const infoContactoTel = document.getElementById("info_contacto_tel");

        if (isLinntae) {
            if (infoVentas) infoVentas.style.display = "";
            if (infoSoporte) infoSoporte.style.display = "";
            if (infoContacto) infoContacto.style.display = "none";
        } else {
            if (infoVentas) infoVentas.style.display = "none";
            if (infoSoporte) infoSoporte.style.display = "none";
            if (infoContacto) infoContacto.style.display = "";

            if (data.telefono && infoContactoTel) {
                infoContactoTel.textContent = data.telefono;
                infoContactoTel.setAttribute("href", "tel:" + data.telefono);
            }
        }

        const toggle = document.getElementById("socialToggle");
        const socialLinks = document.querySelector(".social-bar ul");

        if (toggle && socialLinks) {
            toggle.addEventListener("click", () => {
                socialLinks.classList.toggle("show");
            });
        }

        cargarGiros(data.giroNegocioList, selectgiro);
        estadoList(data.estadoList, selectestado);
        tenderoRegistroSeguimientoTipoList(data.tenderoRegistroSeguimientoTipoList, selectmedio);
        horarios(selectHorario, datahorario);
    }

    async function cargarGiros(lista, select) {
        select.innerHTML = '<option value="">Selecciona un giro</option>';
        lista.forEach(giro => {
            let option = document.createElement("option");
            option.value = giro.id;
            option.textContent = giro.nombre;
            select.appendChild(option);
        });
    }

    async function estadoList(lista, select) {
        select.innerHTML = '<option value="">Selecciona tu estado</option>';
        lista.forEach(estadoList => {
            let option = document.createElement("option");
            option.value = estadoList.id;
            option.textContent = estadoList.nombre;
            select.appendChild(option);
        });
    }

    async function tenderoRegistroSeguimientoTipoList(lista, select) {
        select.innerHTML = '<option value="">Selecciona medio para ser contactado</option>';
        lista.forEach(tenderoseguimiento => {
            let option = document.createElement("option");
            option.value = tenderoseguimiento.id;
            option.textContent = tenderoseguimiento.nombre;
            select.appendChild(option);
        });
    }

    async function horarios(select, horarios) {
        select.innerHTML = '<option value="">Selecciona horario para ser contactado</option>';
        horarios.forEach(horario => {
            let option = document.createElement("option");
            option.value = horario;
            option.textContent = horario;
            select.appendChild(option);
        });
    }

    llamadaapi();
});
