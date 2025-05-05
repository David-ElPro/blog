let codigoAmigoDesdeURL = null;

document.addEventListener("DOMContentLoaded", function () {
    function showLoader() {
        const loader = document.getElementById("global-loader");
        if (loader) loader.style.display = "flex";
    }

    function hideLoader() {
        const loader = document.getElementById("global-loader");
        if (loader) loader.style.display = "none";

    }

    const promoCodeField = document.getElementById("reg-promo-code");
    const urlParams = new URLSearchParams(window.location.search);
    const codigoAmigo = urlParams.get("codigo_amigo");

    // Mostrar u ocultar el campo de código promocional según dominio principal
    const promoContainer = document.getElementById("reg-promo-code");
    const promoLabel = document.querySelector('label[for="reg-promo-code"]');
    const mainDomain = getDominioActual().split('.').slice(-2).join('.');

    if (promoContainer) {
        if (mainDomain.indexOf("linntae") !== -1) {
            promoContainer.style.display = "block";
            if (promoLabel) promoLabel.style.display = "block";
        } else {
            promoContainer.style.display = "none";
            if (promoLabel) promoLabel.style.display = "none";
        }
    }

    if (codigoAmigo && promoCodeField) {
        promoCodeField.value = codigoAmigo;
        promoCodeField.readOnly = true;
        promoCodeField.classList.add("readonly");
        codigoAmigoDesdeURL = codigoAmigo;
    }

    let timer;
    let timeLeft = 300;
    let selectedMethod = null;
    let lastCode = null;
    let idRegistroPrevio = null;

    const registerForm = document.getElementById("register-form");
    const registerSection = document.getElementById("register-section");
    const verificationContainer = document.getElementById("verification-container");
    const registroGracias = document.getElementById("registroSection");
    const phoneNumberField = document.getElementById("reg-phone");
    const maskedNumberSMS = document.getElementById("masked-number-sms");
    const maskedNumberWhatsApp = document.getElementById("masked-number-whatsapp");
    const timerElement = document.getElementById("timer");
    const resendCodeButton = document.getElementById("resendCode");

    const toast = document.getElementById("toast");
    const toastMessage = document.getElementById("toast-message");
    const toastClose = document.getElementById("toast-close");

    const modalError = document.getElementById("modalError");
    const modalErrorContent = document.getElementById("modalErrorContent");
    const modalErrorClose = document.getElementById("modalErrorClose");
    const modalErrorContentWrapper = document.getElementById("modalErrorContentWrapper");

    if (!registerForm || !registerSection || !verificationContainer || !maskedNumberSMS || !maskedNumberWhatsApp || !timerElement || !resendCodeButton || !registroGracias) {
        console.error("❌ Error: Elementos faltantes en el DOM.");
        return;
    }

    registerForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const phoneNumber = phoneNumberField.value;
        if (!phoneNumber || phoneNumber.length < 10) {
            showToast("❌ Ingresa un número de teléfono válido.");
            return;
        }

        maskedNumberSMS.textContent = maskNumber(phoneNumber);
        maskedNumberWhatsApp.textContent = maskNumber(phoneNumber);

        registerSection.classList.add("hidden");
        verificationContainer.classList.remove("hidden");
        showStep("step1");
    });

    function maskNumber(number) {
        return "*******" + number.slice(-3);
    }

    function getDominioActual() {
        return location.hostname.replace("www.", "");
    }

    window.selectMethod = async function (method) {
        selectedMethod = method.toUpperCase();
        const payload = buildPayload();
        payload.tipoMedio = selectedMethod;
        const url = URL_BACK + "invitadoPreRegistro";

        try {
            showLoader();//mostar el loader

            const res = await fetch(url, {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(payload)
            });

            const data = await res.json();
            hideLoader();//ocultar el loader

            if (data.exito) {
                lastCode = data.code;
                idRegistroPrevio = data.tenderoRegistro.id;
                showStep("step2");
                startTimer(300);
            } else {
                triggerErrorFeedback(data.mensaje || "❌ No se pudo enviar el código.");

                verificationContainer.classList.add("hidden");
                registerSection.classList.remove("hidden");

                // 🧽 Limpiar campos pero conservar código promocional si vino desde URL
                const promoCodeInput = document.getElementById("reg-promo-code");
                const preservePromoCode =
                    promoCodeInput &&
                    codigoAmigoDesdeURL &&
                    promoCodeInput.value === codigoAmigoDesdeURL;

                registerForm.reset();

                if (preservePromoCode) {
                    promoCodeInput.value = codigoAmigoDesdeURL;
                    promoCodeInput.readOnly = true;
                    promoCodeInput.classList.add("readonly");
                }

                setTimeout(() => {
                    modalError.classList.remove("show");
                }, 4000);
            }
        } catch (error) {
            hideLoader();//ocultar el loader
            console.error("❌ Error al enviar código:", error);
            triggerErrorFeedback("❌ Error al enviar código.");
        }
    };

    window.verifyCode = async function () {
        const codeInputs = document.querySelectorAll(".code-box");
        const code = Array.from(codeInputs).map(i => i.value).join("");

        if (code.length !== 6) {
            triggerErrorFeedback("❌ Ingresa los 6 dígitos del código.");
            return;
        }

        if (!idRegistroPrevio) {
            triggerErrorFeedback("❌ Registro no válido. Vuelve a comenzar.");
            return;
        }

        const payload = {
            codigo: code,
            tipoMedio: selectedMethod,
            dominio: getDominioActual(),
            idRegistroPrevio
        };

        try {
            showLoader();//mostar el loader
            const url = URL_BACK + "confirmarTenderoRegistro";

            const res = await fetch(url, {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(payload)
            });

            const data = await res.json();
            hideLoader();//ocultar el loader


            if (data.exito) {
                document.getElementById("step2").classList.add("hidden");
                verificationContainer.classList.add("hidden");
                registroGracias.classList.remove("hidden");
                registroGracias.classList.add("active");
            } else {
                triggerErrorFeedback(data.mensaje || "❌ Código incorrecto o expirado.");
            }
        } catch (error) {
            hideLoader();//ocultar el loader
            console.error("❌ Error al verificar código:", error);
            triggerErrorFeedback("❌ Error al verificar código.");
        }
    };

    window.resendCode = async function () {
        if (!idRegistroPrevio) {
            triggerErrorFeedback("❌ No se puede reenviar código sin un registro válido.");
            return;
        }

        try {
            const url = URL_BACK + "reenviarCodigo";

            const res = await fetch(url, {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    tipoMedio: selectedMethod,
                    idRegistro: idRegistroPrevio
                })
            });

            const data = await res.json();

            if (data.exito) {
                lastCode = data.code;
                showToast(data.mensaje || "📩 Código reenviado");
                startTimer(60);
                resendCodeButton.classList.add("hidden");
            } else {
                triggerErrorFeedback(data.mensaje || "❌ No se pudo reenviar el código.");
            }
        } catch (error) {
            console.error("❌ Error al reenviar código:", error);
            triggerErrorFeedback("❌ Error al reenviar código.");
        }
    };

    function buildPayload() {
        const phone = phoneNumberField.value;

        return {
            clienteEmpresa: 1,
            campaniaClienteEmpresa: 4,
            tipoRegistro: "pagina",
            dominio: getDominioActual(),
            telefono: phone,
            telefonoCelular: phone,
            telefonoFijo: phone,
            telefonoSMS: selectedMethod === "SMS" ? phone : "",
            telefonoWhatsapp: selectedMethod === "WHATSAPP" ? phone : "",
            nombre: document.getElementById("reg-name").value,
            email: document.getElementById("reg-email").value,
            password: document.getElementById("reg-password").value,
            cp: document.getElementById("reg-zipcode").value,
            estado: parseInt(document.getElementById("reg-state").value),
            giroNegocioTendero: parseInt(document.getElementById("reg-business").value),
            horaSeguimiento: document.getElementById("reg-contact-time").value,
            tenderoRegistroSeguimientoTipo: parseInt(document.getElementById("reg-contact-method").value),
            tenderoReferencia: "",
            codigo_amigo: codigoAmigoDesdeURL || document.getElementById("reg-promo-code").value || ""
        };
    }

    function showStep(stepId) {
        const steps = document.querySelectorAll(".step");
        steps.forEach((step) => {
            step.classList.add("hidden");
            step.classList.remove("active");
        });
        const currentStep = document.getElementById(stepId);
        if (currentStep) {
            currentStep.classList.remove("hidden");
            currentStep.classList.add("active");
        }
    }

    function startTimer(seconds) {
        timeLeft = seconds;
        updateTimer();

        clearInterval(timer);
        timer = setInterval(() => {
            timeLeft--;
            if (timeLeft <= 0) {
                clearInterval(timer);
                resendCodeButton.classList.remove("hidden");
            }
            updateTimer();
        }, 1000);
    }

    function updateTimer() {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        timerElement.textContent = `${minutes}:${seconds.toString().padStart(2, "0")}`;
    }

    function resetVerification() {
        showStep("step1");
        clearCodeInputs();
        clearInterval(timer);
        resendCodeButton.classList.add("hidden");
    }

    function moveToNext(currentInput) {
        const nextInput = currentInput.nextElementSibling;
        if (nextInput && nextInput.classList.contains("code-box")) {
            nextInput.focus();
        }
    }

    function showToast(message) {
        toastMessage.textContent = message;
        toast.classList.remove("hidden");

        toastClose.onclick = () => {
            toast.classList.add("hidden");
        };

        setTimeout(() => {
            toast.classList.add("hidden");
        }, 6000);
    }

    function triggerErrorFeedback(message) {
        modalErrorContent.innerHTML = `<p>${message}</p>`;
        modalError.classList.add("show");

        modalErrorClose.onclick = () => {
            modalError.classList.remove("show");
        };
    }

    function clearCodeInputs() {
        document.querySelectorAll(".code-box").forEach(input => {
            input.value = "";
        });
    }

    window.showStep = showStep;
    window.resetVerification = resetVerification;
    window.moveToNext = moveToNext;
    window.showToast = showToast;
    window.triggerErrorFeedback = triggerErrorFeedback;
});
