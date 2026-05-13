// Validación de nombre
function validateName(name) {
    const trimmed = name.trim();
    if (trimmed.length < 2) {
        return {
            valid: false,
            error: 'El nombre debe tener al menos 2 caracteres'
        };
    }
    return { valid: true, error: '' };
}

// Validación de email
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return {
            valid: false,
            error: 'Por favor ingresa un email válido'
        };
    }
    return { valid: true, error: '' };
}

// Validación general del formulario
function validateForm(name, email) {
    const nameValidation = validateName(name);
    const emailValidation = validateEmail(email);

    return {
        name: nameValidation,
        email: emailValidation,
        isValid: nameValidation.valid && emailValidation.valid
    };
}

// Mostrar errores en el formulario
function showErrors(errors) {
    // Limpiar errores previos
    document.getElementById('name-error').textContent = '';
    document.getElementById('email-error').textContent = '';
    document.getElementById('name-error').classList.remove('show');
    document.getElementById('email-error').classList.remove('show');
    document.getElementById('name').classList.remove('error');
    document.getElementById('email').classList.remove('error');

    // Mostrar nuevos errores
    if (!errors.name.valid) {
        document.getElementById('name-error').textContent = errors.name.error;
        document.getElementById('name-error').classList.add('show');
        document.getElementById('name').classList.add('error');
    }

    if (!errors.email.valid) {
        document.getElementById('email-error').textContent = errors.email.error;
        document.getElementById('email-error').classList.add('show');
        document.getElementById('email').classList.add('error');
    }
}

// Limpiar errores
function clearErrors() {
    document.getElementById('name-error').textContent = '';
    document.getElementById('email-error').textContent = '';
    document.getElementById('name-error').classList.remove('show');
    document.getElementById('email-error').classList.remove('show');
    document.getElementById('name').classList.remove('error');
    document.getElementById('email').classList.remove('error');
}

// Enviar suscriptor a Mailerlite (via proxy server)
async function sendToMailerlite(name, email) {
    try {
        const response = await fetch('/api/subscribe', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email })
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || 'Error en Mailerlite');
        }

        const data = await response.json();
        console.log('Suscriptor añadido a Mailerlite:', data);
        return data;
    } catch (error) {
        console.error('Error enviando a Mailerlite:', error);
        throw error;
    }
}

// Enviar notificación a Web3Forms (via proxy server)
async function sendToWeb3Forms(name, email) {
    try {
        const response = await fetch('/api/notify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email })
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || 'Error en Web3Forms');
        }

        const data = await response.json();
        console.log('Notificación enviada via Web3Forms:', data);
        return data;
    } catch (error) {
        console.error('Error enviando a Web3Forms:', error);
        throw error;
    }
}

// Manejar envío del formulario
async function handleFormSubmit(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const submitBtn = document.getElementById('submit-btn');
    const successMsg = document.getElementById('success-message');
    const errorMsg = document.getElementById('error-message');
    const errorText = document.getElementById('error-text');

    // Validar
    const validation = validateForm(name, email);

    if (!validation.isValid) {
        showErrors(validation);
        return;
    }

    clearErrors();

    // Deshabilitar botón y mostrar estado
    submitBtn.disabled = true;
    submitBtn.textContent = 'Enviando...';
    errorMsg.style.display = 'none';
    successMsg.style.display = 'none';

    try {
        // Enviar a ambas APIs simultáneamente
        await Promise.all([
            sendToMailerlite(name, email),
            sendToWeb3Forms(name, email)
        ]);

        // Éxito
        successMsg.style.display = 'block';
        errorMsg.style.display = 'none';

        // Limpiar formulario
        document.getElementById('signup-form').reset();

        // Reabilitar botón después de 3 segundos
        setTimeout(() => {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Suscribirse';
        }, 3000);

    } catch (error) {
        // Error
        errorText.textContent = 'Hubo un problema al procesar tu solicitud. Por favor intenta de nuevo.';
        errorMsg.style.display = 'block';
        successMsg.style.display = 'none';

        // Reabilitar botón
        submitBtn.disabled = false;
        submitBtn.textContent = 'Suscribirse';
    }
}

// Inicializar event listeners
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('signup-form');
    if (form) {
        form.addEventListener('submit', handleFormSubmit);
    }
});
