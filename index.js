// Importar dependencias
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Agregar soporte para CORS
const { SessionsClient } = require('@google-cloud/dialogflow'); // Importar el cliente de Dialogflow

const app = express();
const PORT = process.env.PORT || 3000;

// Configurar middleware
app.use(cors()); // Habilitar CORS
app.use(bodyParser.json()); // Parsear JSON

// Crear cliente de Dialogflow
const projectId = 'tu-proyecto-id'; // Reemplaza con tu ID de proyecto
const sessionClient = new SessionsClient();
const sessionPath = sessionClient.projectAgentSessionPath(projectId, 'session-id'); // Puedes cambiar 'session-id' por cualquier identificador único

// Endpoint para manejar el webhook
app.post('/webhook', async (req, res) => {
    const { queryInput } = req.body; // Obtener la entrada del usuario

    try {
        const responses = await sessionClient.detectIntent({ session: sessionPath, queryInput });
        const result = responses[0].queryResult; // Obtener el resultado

        // Enviar respuesta de vuelta al frontend
        return res.json({
            fulfillmentText: result.fulfillmentText, // Texto de respuesta del bot
        });
    } catch (error) {
        console.error('Error al procesar la solicitud:', error);
        return res.status(500).send('Error en el servidor');
    }
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
