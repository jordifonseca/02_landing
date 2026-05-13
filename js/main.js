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

// Enviar suscriptor a Mailerlite
async function sendToMailerlite(name, email) {
    const MAILERLITE_API_KEY = process.env.MAILERLITE_API_KEY;

    if (!MAILERLITE_API_KEY) {
        console.error('MAILERLITE_API_KEY no configurada');
        throw new Error('Error de configuración del servidor');
    }

    const payload = {
        email: email,
        fields: {
            name: name
        }
    };

    try {
        const response = await fetch('https://api.mailerlite.com/api/v1/subscribers', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${MAILERLITE_API_KEY}`
            },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(`Mailerlite error: ${error.message || 'Unknown error'}`);
        }

        const data = await response.json();
        console.log('Suscriptor añadido a Mailerlite:', data);
        return data;
    } catch (error) {
        console.error('Error enviando a Mailerlite:', error);
        throw error;
    }
}
