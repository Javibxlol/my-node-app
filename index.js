async function sendMessage() {
    const userMessage = document.getElementById('user-input').value;
    const chatLog = document.getElementById('chat-log');

    // Muestra el mensaje del usuario en el chat
    chatLog.innerHTML += `<div><strong>Tú:</strong> ${userMessage}</div>`;
    document.getElementById('user-input').value = '';

    try {
        const response = await fetch('https://caring-vitality.railway.app/webhook', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message: userMessage }),
        });

        if (!response.ok) {
            throw new Error('Error en la respuesta de la API');
        }

        const data = await response.json();
        chatLog.innerHTML += `<div><strong>Bot:</strong> ${data.response}</div>`;
        chatLog.scrollTop = chatLog.scrollHeight; // Desplaza el scroll al final
    } catch (error) {
        chatLog.innerHTML += `<div><strong>Error:</strong> ${error.message}</div>`;
    }
}
