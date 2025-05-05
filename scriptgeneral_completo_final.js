// ------------------------------
// Slider Auto Movimiento
// ------------------------------
document.addEventListener("DOMContentLoaded", () => {
  const track = document.querySelector(".virtual-recharges-track");
  const slides = document.querySelectorAll(".slide");
  const prevBtn = document.querySelector(".prev-btn");
  const nextBtn = document.querySelector(".next-btn");

  const slidesToShow = 3;
  const slideWidth = slides[0].offsetWidth + 15;
  const totalSlides = slides.length;
  let currentIndex = 0;

  function updateSlidePosition() {
    const offset = currentIndex * slideWidth;
    track.style.transform = `translateX(-${offset}px)`;
  }

  nextBtn.addEventListener("click", () => {
    currentIndex = currentIndex < totalSlides - slidesToShow ? currentIndex + 1 : 0;
    updateSlidePosition();
  });

  prevBtn.addEventListener("click", () => {
    currentIndex = currentIndex > 0 ? currentIndex - 1 : totalSlides - slidesToShow;
    updateSlidePosition();
  });

  setInterval(() => {
    const modal = document.getElementById("modalError");
    if (!modal?.classList.contains("show")) nextBtn.click();
  }, 3000);

  window.addEventListener("resize", updateSlidePosition);
});


// ------------------------------
// Inicialización Principal
// ------------------------------
document.addEventListener("DOMContentLoaded", async () => {
  const url = "https://back.linntae.mx/anonymous/loadInfoPage";
  const dominioPortal = location.hostname.replace("www.", "");
  const formData = new FormData();
  formData.append("dominioPortal", dominioPortal);

  try {
    const response = await fetch(url, { method: "POST", body: formData });
    if (!response.ok) throw new Error("Error al cargar datos del backend");

    const resp = await response.json();
    cargarDatosFormulario(resp);
    cargarDatosFooter(resp, dominioPortal);
    cargarLogoMarca(resp);
    cargarNombreMarca(resp);
    cargarBotonesDescarga(resp, dominioPortal);
    cargarRedesSociales(resp);
    actualizarLinksLogin(resp);
  } catch (error) {
    console.error("❌ Error cargando datos dinámicos:", error);
  }
});


// ------------------------------
// Funciones por sección
// ------------------------------
function cargarDatosFormulario(resp) {
  const selectgiro = document.getElementById("reg-business");
  const selectestado = document.getElementById("reg-state");
  const selectmedio = document.getElementById("reg-contact-method");
  const selectHorario = document.getElementById("reg-contact-time");
  const datahorario = ['08:00 - 09:00', '09:00 - 10:00', '10:00 - 11:00', '11:00 - 12:00', '12:00 - 13:00', '13:00 - 14:00', '14:00 - 15:00', '15:00 - 16:00', '16:00 - 17:00', '17:00 - 18:00', '18:00 - 19:00', '19:00 - 20:00', '20:00 - 21:00'];

  if (resp.giroNegocioList) {
    selectgiro.innerHTML = '<option value="">Selecciona un giro</option>';
    resp.giroNegocioList.forEach(giro => {
      let option = document.createElement("option");
      option.value = giro.id;
      option.textContent = giro.nombre;
      selectgiro.appendChild(option);
    });
  }

  if (resp.estadoList) {
    selectestado.innerHTML = '<option value="">Selecciona tu estado</option>';
    resp.estadoList.forEach(estado => {
      let option = document.createElement("option");
      option.value = estado.id;
      option.textContent = estado.nombre;
      selectestado.appendChild(option);
    });
  }

  if (resp.tenderoRegistroSeguimientoTipoList) {
    selectmedio.innerHTML = '<option value="">Selecciona medio para ser contactado</option>';
    resp.tenderoRegistroSeguimientoTipoList.forEach(item => {
      let option = document.createElement("option");
      option.value = item.id;
      option.textContent = item.nombre;
      selectmedio.appendChild(option);
    });
  }

  if (selectHorario) {
    selectHorario.innerHTML = '<option value="">Selecciona horario para ser contactado</option>';
    datahorario.forEach(horario => {
      let option = document.createElement("option");
      option.value = horario;
      option.textContent = horario;
      selectHorario.appendChild(option);
    });
  }
}

function cargarDatosFooter(resp, dominioPortal) {
  const direccion = document.getElementById("direccion");
  const correo = document.getElementById("correo");
  const infoVentas = document.getElementById("info_ventas");
  const infoSoporte = document.getElementById("info_soporte");
  const infoContacto = document.getElementById("info_contacto");
  const infoContactoTel = document.getElementById("info_contacto_tel");

  if (direccion && resp.direccion) direccion.textContent = resp.direccion;
  if (correo && resp.correo) correo.textContent = resp.correo;

  const esLinntae = ["linntae.com", "demov2.linntae.com", "distribucion.linntae.com"].includes(dominioPortal);
  if (esLinntae) {
    if (infoVentas) infoVentas.style.display = "";
    if (infoSoporte) infoSoporte.style.display = "";
    if (infoContacto) infoContacto.style.display = "none";
  } else {
    if (infoVentas) infoVentas.style.display = "none";
    if (infoSoporte) infoSoporte.style.display = "none";
    if (infoContacto) infoContacto.style.display = "";
    if (resp.telefono && infoContactoTel) {
      infoContactoTel.textContent = resp.telefono;
      infoContactoTel.setAttribute("href", "tel:" + resp.telefono);
    }
  }
}

function cargarLogoMarca(resp) {
  const logoImage = document.getElementById("logoimagen");
  if (logoImage && resp.logoUrl) {
    const time = new Date().getTime();
    logoImage.src = `${resp.logoUrl}?key=${time}`;
  }
}

function cargarNombreMarca(resp) {
  if (resp.nombre) {
    const elements = document.getElementsByClassName("companyName");
    for (let el of elements) {
      el.textContent = resp.nombre;
    }
    const linkRegistroTexto = document.getElementById("linkRegistroTexto");
    if (linkRegistroTexto) linkRegistroTexto.textContent = resp.nombre;
  }
}

function cargarBotonesDescarga(resp, dominioPortal) {
  const pcInstallerButton = document.getElementById("pc-installer-link");
  if (pcInstallerButton) {
    if (["linntae.com", "demov2.linntae.com", "distribucion.linntae.com"].includes(dominioPortal)) {
      pcInstallerButton.href = "https://storage.googleapis.com/linn-files/LinntaeWebPage/HowTo/Linntae%20recargas%20Installer%20(3).exe";
    } else if (resp.urlLogin) {
      pcInstallerButton.href = "https://" + resp.urlLogin;
    }
  }

  const linkAppTexto = document.getElementById("linkAppTexto");
  if (linkAppTexto) {
    linkAppTexto.href = resp.urlPlayStore && resp.urlPlayStore.trim() !== ""
      ? resp.urlPlayStore
      : "https://play.google.com/store/apps/details?id=com.linn.Linntae&hl=es_MX";
  }

  const urlPlayStore = resp.urlPlayStore;
  const mainDomain = getMainDomain(location.hostname);
  const isLinntae = mainDomain === "linntae.com";
  const downloadButtons = ["downloadButton", "downloadButton1", "downloadButton2", "downloadButton3", "downloadButton4", "downloadButton5"].map(id => document.getElementById(id));

  downloadButtons.forEach((btn) => {
    if (!btn) return;
    if (urlPlayStore && !isLinntae) {
      btn.href = urlPlayStore;
      btn.target = "_blank";
    } else if (isLinntae) {
      const isMobile = /Android|iPhone|iPad/i.test(navigator.userAgent);
      btn.href = isMobile
        ? "https://play.google.com/store/apps/details?id=com.linn.linntae&hl=es_MX"
        : "https://storage.googleapis.com/linn-files/LinntaeWebPage/HowTo/Linntae%20recargas%20Installer%20(3).exe";
    } else {
      btn.href = "https://play.google.com/store/apps/details?id=com.linn.linntae&hl=es_MX";
    }
  });
}

function cargarRedesSociales(resp) {
  const socialList = document.getElementById("dynamiqueSocialLinks");
  if (!socialList) return;
  socialList.innerHTML = "";

  const redes = {
    link_fb: { icon: "facebook", color: "#3b5998" },
    link_twitter: { icon: "twitter", color: "#00aced" },
    link_tiktok: { icon: "tiktok", color: "#dd4b39" },
    link_youtube: { icon: "youtube", color: "#fa441f" },
    link_instagram: { icon: "instagram", color: "#e4405f" }
  };

  let algunaRedActiva = false;
  for (const [key, info] of Object.entries(redes)) {
    const url = resp[key];
    if (url && url.trim() !== "") {
      algunaRedActiva = true;
      const li = document.createElement("li");
      const a = document.createElement("a");
      a.href = url;
      a.target = "_blank";
      a.innerHTML = `<i class="fab fa-${info.icon}"></i>`;
      a.style.color = info.color;
      li.appendChild(a);
      socialList.appendChild(li);
    }
  }

  if (!algunaRedActiva) {
    const socialBar = document.getElementById("socialBar");
    if (socialBar) socialBar.style.display = "none";
  }
}

function actualizarLinksLogin(resp) {
  if (resp.urlLogin) {
    const accesoClientesBtn = document.querySelector('a[href*="linntae.mx/#/"]');
    if (accesoClientesBtn) {
      accesoClientesBtn.href = "https://" + resp.urlLogin;
      accesoClientesBtn.target = "_blank";
    }

    const btnVender = document.querySelector(".sell-recharges-button");
    if (btnVender) {
      btnVender.href = "https://" + resp.urlLogin;
      btnVender.target = "_blank";
    }
  }
}

function getMainDomain(hostname) {
  const parts = hostname.split(".");
  return parts.length >= 2 ? parts.slice(-2).join(".") : hostname;
}

// ------------------------------
// Toggle Redes Sociales Móviles
// ------------------------------
document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.getElementById("socialToggle");
  const socialLinks = document.querySelector(".social-bar ul");
  if (toggle && socialLinks) {
    toggle.addEventListener("click", () => {
      socialLinks.classList.toggle("show");
    });
  }
});
