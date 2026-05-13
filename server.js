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
        console.error('MAILERLITE_API_KEY no configurada');
        return res.status(500).json({ error: 'MAILERLITE_API_KEY no configurada' });
    }

    try {
        const response = await fetch('https://connect.mailerlite.com/api/subscribers', {
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

        const responseText = await response.text();
        console.log('Mailerlite response status:', response.status);
        console.log('Mailerlite response:', responseText);

        if (!response.ok) {
            throw new Error(`Mailerlite error ${response.status}: ${responseText}`);
        }

        const data = JSON.parse(responseText);
        res.json(data);
    } catch (error) {
        console.error('Error Mailerlite:', error);
        res.status(500).json({ error: error.message });
    }
});

// Notificación al owner (simulado - en producción usarías un email service)
app.post('/api/notify', async (req, res) => {
    const { name, email } = req.body;

    try {
        // Simular envío de notificación (log)
        console.log(`✓ Notificación: Nuevo suscriptor - ${name} (${email})`);

        // En producción, aquí irías a SendGrid, Resend, o similar
        res.json({ success: true, message: 'Notificación enviada' });
    } catch (error) {
        console.error('Error en notificación:', error);
        res.status(500).json({ error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
