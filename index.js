<script>
    const sendButton = document.getElementById('send-button');
    const userInput = document.getElementById('user-input');
    const messagesDiv = document.getElementById('messages');

    sendButton.addEventListener('click', async () => {
        const userMessage = userInput.value;
        if (!userMessage) return;  // Evita enviar mensajes vacíos

        // Muestra el mensaje del usuario en la interfaz
        messagesDiv.innerHTML += `<div class="message user">Tú: ${userMessage}</div>`;
        userInput.value = '';

        try {
            // Llama al webhook de Dialogflow
            const response = await fetch('https://caring-vitality.railway.app/webhook', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    queryInput: {
                        text: {
                            text: userMessage,
                            languageCode: 'es',  // Cambia esto si utilizas otro idioma
                        },
                    },
                }),
            });

            // Maneja errores en la respuesta
            if (!response.ok) {
                throw new Error('Error en la respuesta del servidor');
            }

            const data = await response.json();
            const botMessage = data.fulfillmentText;  // Obtén el mensaje del bot

            // Muestra el mensaje del bot en la interfaz
            messagesDiv.innerHTML += `<div class="message bot">Bot: ${botMessage}</div>`;
            messagesDiv.scrollTop = messagesDiv.scrollHeight;  // Desplazarse hacia abajo
        } catch (error) {
            console.error('Error:', error);
            // Muestra un mensaje de error si no se puede obtener la respuesta
            messagesDiv.innerHTML += `<div class="message bot">Bot: No pude obtener respuesta del servidor.</div>`;
        }
    });
</script>
