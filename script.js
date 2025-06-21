document.getElementById('startBtn').addEventListener('click', function () {
    document.getElementById('welcomeScreen').style.display = 'none';
  
    // Show chatbot
    document.body.classList.remove('chat-hidden');
  
    // Apply fade-in to chat elements
    document.getElementById('chat').classList.add('fade-in');
    document.getElementById('inputArea').classList.add('fade-in');
    document.querySelector('h2').classList.add('fade-in');
  });
  
  

document.getElementById('sendBtn').addEventListener('click', sendMessage);
document.getElementById('userInput').addEventListener('keydown', function (e) {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    sendMessage();
  }
});

async function sendMessage() {
  const input = document.getElementById('userInput');
  const chat = document.getElementById('chat');
  const message = input.value.trim();
  if (!message) return;

  // Show user message
  const userMsg = document.createElement('div');
  userMsg.className = 'message user';
  userMsg.innerHTML = `<strong>You:</strong> ${message}`;
  chat.appendChild(userMsg);
  input.value = '';
  chat.scrollTop = chat.scrollHeight;

  // Show "typing..."
  const botMsg = document.createElement('div');
  botMsg.className = 'message bot';
  botMsg.innerHTML = `<em>Snoopy is typing...</em>`;
  chat.appendChild(botMsg);
  chat.scrollTop = chat.scrollHeight;

  try {
    const res = await fetch('https://yurarainnz.app.n8n.cloud/webhook/snoopy-chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message })
    });

    const data = await res.json();
    botMsg.innerHTML = `<strong>Snoopy:</strong> ${data.reply}`;
  } catch (err) {
    botMsg.innerHTML = `<strong>Snoopy:</strong> Oops! Something went wrong.`;
  }

  chat.scrollTop = chat.scrollHeight;
  input.focus();
}
