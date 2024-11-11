document.getElementById('contact-form').addEventListener('submit', function(event) {
    // Evitar el envío del formulario si no es válido
    event.preventDefault();

    // Obtener los valores del formulario
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    let valid = true;

    // Validación del nombre
    if (name === "") {
        valid = false;
        alert("Por favor, ingresa tu nombre.");
    }

    // Validación del correo electrónico
    if (email === "") {
        valid = false;
        alert("Por favor, ingresa tu correo electrónico.");
    } else if (!validateEmail(email)) {
        valid = false;
        alert("Por favor, ingresa un correo electrónico válido.");
    }

    // Validación del mensaje
    if (message === "") {
        valid = false;
        alert("Por favor, ingresa tu mensaje.");
    }

    // Si todo es válido, se procede a enviar el formulario
    if (valid) {
        sendEmail(name, email, message);
    }
});

// Función para validar el formato del correo electrónico
function validateEmail(email) {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(email);
}

// Función para enviar el correo usando EmailJS
function sendEmail(name, email, message) {
    const formData = {
        name: name,
        email: email,
        message: message
    };

    // Enviar el correo a través de EmailJS
    emailjs.send("TU_SERVICE_ID", "TU_TEMPLATE_ID", formData)
        .then(function(response) {
            console.log("Correo enviado exitosamente", response);
            alert("Tu mensaje ha sido enviado con éxito.");
        })
        .catch(function(error) {
            console.error("Error al enviar el correo", error);
            alert("Ocurrió un error al enviar el mensaje. Intenta nuevamente.");
        });
}
