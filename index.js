const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json()); // Para poder manejar el JSON del webhook

app.post('/webhook', (req, res) => {
    const intentName = req.body.queryResult.intent.displayName;

    let responseText = '';

    if (intentName === 'Default Welcome Intent') {
        responseText = '¡Hola! ¿Cómo puedo ayudarte?';
    } else if (intentName === 'Your Other Intent') {
        responseText = 'Esta es una respuesta para otro intento.';
    } else {
        responseText = 'Lo siento, no entendí eso.';
    }

    res.json({
        fulfillmentText: responseText,
    });
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
