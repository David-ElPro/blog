document.addEventListener("DOMContentLoaded", function () {
    const passwordField = document.getElementById("reg-password");
    const passwordError = document.getElementById("password-error");
    const togglePasswordButton = document.getElementById("toggle-password");
    const eyeIcon = document.getElementById("eye-icon");
    const registerForm = document.getElementById("register-form");
    const postalCodeField = document.getElementById("reg-zipcode");
    const postalCodeError = document.getElementById("zipcode-error");
    const passwordValidation = document.getElementById("password-validation");

    const nameField = document.getElementById("reg-name");
    const nameError = document.getElementById("name-error"); // <small id="name-error"></small>

    const phoneField = document.getElementById("reg-phone");
    const phoneError = document.getElementById("phone-error"); // <small id="phone-error"></small>

    const capitalCheck = document.getElementById("capital-check");
    const numberCheck = document.getElementById("number-check");
    const lengthCheck = document.getElementById("length-check");

    if (!passwordField || !passwordError || !togglePasswordButton || !eyeIcon ||
        !registerForm || !postalCodeField || !postalCodeError || !passwordValidation ||
        !capitalCheck || !numberCheck || !lengthCheck || !nameField || !nameError || !phoneField || !phoneError) {
        console.error("❌ Error: Algunos elementos requeridos no están en el DOM.");
        return;
    }

    const passwordRegex = /^(?=.*\d)(?=.*[A-Z]).{8,30}$/;
    const postalCodeRegex = /^[0-9]{5}$/;
    const nameRegex = /^[a-zA-ZÀ-ÿ\s]{2,}$/; // solo letras y espacios (incluso acentos)

    passwordValidation.style.display = "none";

    passwordField.addEventListener("focus", () => passwordValidation.style.display = "block");

    passwordField.addEventListener("blur", () => {
        if (passwordField.value === "") passwordValidation.style.display = "none";
    });

    togglePasswordButton.addEventListener("click", function () {
        const isPassword = passwordField.type === "password";
        passwordField.type = isPassword ? "text" : "password";
        eyeIcon.src = isPassword
            ? "https://cdn-icons-png.flaticon.com/512/159/159605.png"
            : "https://cdn-icons-png.flaticon.com/512/159/159604.png";
    });

    passwordField.addEventListener("input", function () {
        const val = passwordField.value;

        capitalCheck.innerHTML = /[A-Z]/.test(val) ? "✔ Una letra mayúscula" : "❌ Una letra mayúscula";
        capitalCheck.style.color = /[A-Z]/.test(val) ? "green" : "red";

        numberCheck.innerHTML = /\d/.test(val) ? "✔ Un número" : "❌ Un número";
        numberCheck.style.color = /\d/.test(val) ? "green" : "red";

        lengthCheck.innerHTML = val.length >= 8 ? "✔ Mínimo 8 caracteres" : "❌ Mínimo 8 caracteres";
        lengthCheck.style.color = val.length >= 8 ? "green" : "red";

        [capitalCheck, numberCheck, lengthCheck].forEach(el => {
            el.style.fontWeight = "bold";
            el.style.textShadow = "0 0 5px rgb(255, 255, 255)";
            el.style.transition = "all 0.3s ease-in-out";
        });
    });

    postalCodeField.addEventListener("input", function () {
        this.value = this.value.replace(/\D/g, "").slice(0, 5); // solo números y máx 5 dígitos
        postalCodeError.textContent = postalCodeRegex.test(this.value)
            ? ""
            : "❌ El código postal debe tener exactamente 5 dígitos numéricos.";
    });

    // ✅ Validar campo de nombre (solo letras)
    nameField.addEventListener("input", function () {
        const isValid = nameRegex.test(this.value.trim());
        nameError.textContent = isValid || this.value.trim() === ""
            ? ""
            : "❌ El nombre solo debe contener letras.";
    });

    // ✅ Validar teléfono (solo números y máximo 10)
    phoneField.addEventListener("input", function () {
        this.value = this.value.replace(/\D/g, "").slice(0, 10); // solo números y máx 10
        phoneError.textContent = this.value.length < 10 && this.value !== ""
            ? "❌ El número debe tener 10 dígitos."
            : "";
    });

    registerForm.addEventListener("submit", function (event) {
        let isValid = true;

        // Validación nombre
        if (!nameRegex.test(nameField.value.trim())) {
            nameError.textContent = "❌ El nombre solo debe contener letras.";
            isValid = false;
        }

        // Validación teléfono
        if (phoneField.value.length !== 10) {
            phoneError.textContent = "❌ El número debe tener exactamente 10 dígitos.";
            isValid = false;
        }

        if (!passwordRegex.test(passwordField.value)) {
            passwordError.textContent = "❌ La contraseña debe tener al menos 8 caracteres, una letra mayúscula y un número.";
            isValid = false;
        }

        if (!postalCodeRegex.test(postalCodeField.value)) {
            postalCodeError.textContent = "❌ El código postal debe tener exactamente 5 dígitos numéricos.";
            isValid = false;
        }

        if (!isValid) {
            event.preventDefault();
            alert("❌ Corrige los errores antes de enviar el formulario.");
        }
    });
});
