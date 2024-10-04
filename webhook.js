async function sendMessage() {
    const userMessage = document.getElementById('user-input').value;

    const response = await fetch('https://caring-vitality.railway.app/webhook', { 
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: userMessage }),
    });

    const data = await response.json();
    document.getElementById('chat-log').innerHTML += `<div>${data.response}</div>`;
}
