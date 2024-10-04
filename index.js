const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { SessionsClient } = require('@google-cloud/dialogflow');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

// Carga de las credenciales
const sessionClient = new SessionsClient();

const projectId = 'tu-proyecto-id'; // Reemplaza esto con tu ID de proyecto real
const sessionPath = sessionClient.projectAgentSessionPath(projectId, 'session-id');

app.post('/webhook', async (req, res) => {
    const { queryInput } = req.body;

    try {
        const responses = await sessionClient.detectIntent({ session: sessionPath, queryInput });
        const result = responses[0].queryResult;

        return res.json({
            fulfillmentText: result.fulfillmentText,
        });
    } catch (error) {
        console.error('Error al procesar la solicitud:', error);
        return res.status(500).send('Error en el servidor');
    }
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
