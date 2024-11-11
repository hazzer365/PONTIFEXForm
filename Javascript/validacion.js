// Inicializar EmailJS
emailjs.init("hbfib5vK7ZjTsK7vK");

document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('precalificacionForm');
    const submitButton = document.getElementById('enviarButton');
    const errorsDiv = document.getElementById('form-errors');

    form.addEventListener('submit', function (event) {
        event.preventDefault(); // Evita que el formulario se envíe si hay errores
        validarFormulario();
    });

    function validarFormulario() {
        limpiarMensajes();
        
        let valid = true;
        valid = validarCampo('nombre-contacto', 'Favor de ingresar nombre completo.') && valid;
        valid = validarCampo('nombre-empresa', 'Favor de ingresar nombre de la empresa.') && valid;
        valid = validarCampo('regimen-fiscal', 'Seleccione el régimen fiscal correspondiente.') && valid;
        valid = validarCampoEmail('correo', 'Favor de ingresar un correo electrónico válido.') && valid;
        valid = validarCampoTelefono('telefono', 'Ingrese un teléfono válido a 10 dígitos.') && valid;

        if (!document.querySelector('input[name="interes"]:checked')) {
            mostrarMensajeError('checkbox-group', 'Seleccione al menos una opción.');
            valid = false;
        }

        if (valid) {
            enviarFormulario();
        }
    }

    function validarCampo(id, mensaje) {
        const campo = document.getElementById(id);
        if (campo.value.trim() === '') {
            mostrarMensajeError(id, mensaje);
            return false;
        }
        return true;
    }

    function validarCampoEmail(id, mensaje) {
        const campo = document.getElementById(id);
        const regexEmail = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
        if (!regexEmail.test(campo.value.trim())) {
            mostrarMensajeError(id, mensaje);
            return false;
        }
        return true;
    }

    function validarCampoTelefono(id, mensaje) {
        const campo = document.getElementById(id);
        const regexTelefono = /^[0-9]{10}$/;
        if (!regexTelefono.test(campo.value.trim())) {
            mostrarMensajeError(id, mensaje);
            return false;
        }
        return true;
    }

    function mostrarMensajeError(id, mensaje) {
        const mensajeError = document.createElement('p');
        mensajeError.classList.add('error-message');
        mensajeError.innerText = mensaje;
        document.getElementById(id).parentNode.insertBefore(mensajeError, document.getElementById(id).nextSibling);
        document.getElementById(id).classList.add('input-error');
    }

    function mostrarMensajeExito(mensaje) {
        const mensajeExito = document.createElement('p');
        mensajeExito.classList.add('success-message');
        mensajeExito.innerText = mensaje;
        form.appendChild(mensajeExito);
    }

    function limpiarMensajes() {
        const mensajesError = document.querySelectorAll('.error-message');
        mensajesError.forEach((mensaje) => mensaje.remove());

        const camposError = document.querySelectorAll('.input-error');
        camposError.forEach((campo) => campo.classList.remove('input-error'));

        const mensajesExito = document.querySelectorAll('.success-message');
        mensajesExito.forEach((mensaje) => mensaje.remove());
    }

    function enviarFormulario() {
        const formData = new FormData(form);
        const emailParams = {
            to_name: formData.get('nombre-contacto'),
            from_name: formData.get('nombre-empresa'),
            email: formData.get('correo'),
            telefono: formData.get('telefono'),
            regimen_fiscal: formData.get('regimen-fiscal'),
            interes: Array.from(document.querySelectorAll('input[name="interes"]:checked')).map(el => el.value).join(", ")
        };

        emailjs.send('service_xy7z1gn', 'template_cmv6o4v', emailParams)
            .then(function(response) {
                mostrarMensajeExito('¡Formulario enviado con éxito!');
                form.reset();
            }, function(error) {
                mostrarMensajeError('form-errors', 'Hubo un error al enviar el formulario. Intenta nuevamente.');
            });
    }
});