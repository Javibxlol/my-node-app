const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// Usa el puerto proporcionado por Railway o un puerto por defecto
const PORT = process.env.PORT || 3000;  // Cambia 8000 a 3000 si lo tenías así

app.use(bodyParser.json());

app.post('/webhook', (req, res) => {
    const intentName = req.body.queryResult.intent.displayName;
    let responseText = '';

    // Lógica de respuesta
    if (intentName === 'Default Welcome Intent') {
        responseText = '¡Hola! ¿Cómo puedo ayudarte?';
    } else {
        responseText = 'Lo siento, no entendí eso.';
    }

    res.json({
        fulfillmentText: responseText,
    });
});

// Escucha en el puerto definido
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
