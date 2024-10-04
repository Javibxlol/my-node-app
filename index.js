const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// Manejo de solicitudes POST para el chatbot
app.post('/chat', (req, res) => {
    const userMessage = req.body.message;

    // Lógica simple de respuesta (puedes expandir esto)
    let botResponse = '';

    if (userMessage.includes('hola')) {
        botResponse = '¡Hola! ¿Cómo puedo ayudarte hoy?';
    } else if (userMessage.includes('adiós')) {
        botResponse = '¡Hasta luego! Que tengas un buen día.';
    } else {
        botResponse = 'Lo siento, no entendí tu mensaje.';
    }

    return res.json({ response: botResponse });
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
