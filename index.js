const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { SessionsClient } = require('@google-cloud/dialogflow');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Cargar las credenciales de Dialogflow
const credentials = JSON.parse(fs.readFileSync(path.join(__dirname, 'dialogflow-credentials.json')));
const sessionClient = new SessionsClient({ credentials });

const projectId = credentials.project_id;
const sessionId = 'session-id';
const sessionPath = sessionClient.projectAgentSessionPath(projectId, sessionId);

// Endpoint para recibir mensajes del frontend
app.post('/webhook', async (req, res) => {
    const userMessage = req.body.message;

    const request = {
        session: sessionPath,
        queryInput: {
            text: {
                text: userMessage,
                languageCode: 'es', // Cambia esto al idioma que prefieras
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

// Servir el frontend
app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
