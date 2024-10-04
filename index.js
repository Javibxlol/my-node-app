const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { SessionsClient } = require('@google-cloud/dialogflow');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

// Carga de credenciales
const credentials = JSON.parse(fs.readFileSync(path.join(__dirname, 'dialogflow-credentials.json')));
const sessionClient = new SessionsClient({ credentials });

const projectId = credentials.project_id; // Obtener el ID del proyecto de las credenciales
const sessionId = 'session-id'; // Puedes generar un ID único para cada sesión
const sessionPath = sessionClient.projectAgentSessionPath(projectId, sessionId);

// Endpoint para recibir mensajes del frontend
app.post('/webhook', async (req, res) => {
    const userMessage = req.body.message;

    const request = {
        session: sessionPath,
        queryInput: {
            text: {
                text: userMessage,
                languageCode: 'es', // Cambia esto a tu idioma preferido
            },
        },
    };

    try {
        const responses = await sessionClient.detectIntent(request);
        const result = responses[0].queryResult;

        return res.json({ response: result.fulfillmentText });
    } catch (error) {
        console.error('Error en Dialogflow:', error);
        return res.status(500).send('Error en el servidor');
    }
});

// Ruta para servir el frontend
app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
