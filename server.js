import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static('.'));

// Proxy para Mailerlite
app.post('/api/subscribe', async (req, res) => {
    const { name, email } = req.body;
    const MAILERLITE_API_KEY = process.env.MAILERLITE_API_KEY;

    if (!MAILERLITE_API_KEY) {
        return res.status(500).json({ error: 'MAILERLITE_API_KEY no configurada' });
    }

    try {
        const response = await fetch('https://api.mailerlite.com/api/v1/subscribers', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${MAILERLITE_API_KEY}`
            },
            body: JSON.stringify({
                email: email,
                fields: { name: name }
            })
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Error al añadir suscriptor');
        }

        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('Error Mailerlite:', error);
        res.status(500).json({ error: error.message });
    }
});

// Proxy para Web3Forms
app.post('/api/notify', async (req, res) => {
    const { name, email } = req.body;
    const WEB3FORMS_ACCESS_KEY = process.env.WEB3FORMS_ACCESS_KEY;

    if (!WEB3FORMS_ACCESS_KEY) {
        return res.status(500).json({ error: 'WEB3FORMS_ACCESS_KEY no configurada' });
    }

    try {
        const response = await fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                access_key: WEB3FORMS_ACCESS_KEY,
                name: name,
                email: email,
                subject: `Nuevo suscriptor: ${name}`,
                message: `Nombre: ${name}\nEmail: ${email}\nFecha: ${new Date().toLocaleString('es-ES')}`
            })
        });

        if (!response.ok) {
            throw new Error(`Web3Forms error: ${response.statusText}`);
        }

        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('Error Web3Forms:', error);
        res.status(500).json({ error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
