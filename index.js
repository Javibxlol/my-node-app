const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { SessionsClient } = require('@google-cloud/dialogflow');

// Crear el servidor Express
const app = express();
app.use(cors());
app.use(bodyParser.json());

// Inicializa el cliente de Dialogflow
const projectId = 'tu-project-id'; // Reemplaza con tu project ID de Dialogflow
const sessionClient = new SessionsClient({
    keyFilename: 'dialogflow-credentials.json' // Reemplaza con la ruta correcta
});

// Ruta para manejar el webhook de Dialogflow
app.post('/webhook', async (req, res) => {
    const userMessage = req.body.message; // Mensaje que viene del frontend (HTML)
    
    // Crea la sesión de Dialogflow
    const sessionPath = sessionClient.projectAgentSessionPath(
        projectId,
        Math.random().toString(36).substring(7) // Genera un ID de sesión aleatorio
    );

    const request = {
        session: sessionPath,
        queryInput: {
            text: {
                text: userMessage,
                languageCode: 'es', // Idioma
            },
        },
    };

    try {
        // Envía el mensaje del usuario a Dialogflow y recibe la respuesta
        const responses = await sessionClient.detectIntent(request);
        const result = responses[0].queryResult;
        
        // Enviar la respuesta de Dialogflow al frontend (HTML)
        res.json({ response: result.fulfillmentText });
    } catch (error) {
        console.error('Error conectando con Dialogflow:', error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
});

// Iniciar el servidor en Railway
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Servidor corriendo en el puerto ${port}`);
});
