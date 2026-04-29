// --- INITIALIZE PUSHER LINK ---
const pusher = new Pusher('3f9a95e2f8c70c6a4c0e', { cluster: 'ap2' });
const channel = pusher.subscribe('my-channel');
const feed = document.getElementById('feed');

// --- RECEIVE LOGIC ---
channel.bind('my-event', (data) => {
    const entry = document.createElement('div');
    entry.className = 'animate-in';
    const time = new Date().toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit' });
    
    if (data.isImage) {
        entry.innerHTML = `<span class="text-[10px] text-cyan-800">[${time}]</span> <span class="text-pink-500 font-bold">${data.user}:</span><br><img src="${data.content}" class="max-w-xs holo-border mt-2 opacity-90">`;
    } else {
        entry.innerHTML = `<span class="text-[10px] text-cyan-800">[${time}]</span> <span class="text-cyan-400 font-bold">${data.user}:</span> <span class="text-cyan-100">${data.content}</span>`;
    }
    
    feed.appendChild(entry);
    feed.scrollTop = feed.scrollHeight;
});

// --- TRANSMIT LOGIC ---
async function sendBurst(customData = null) {
    const msgInput = document.getElementById('msg');
    const payload = customData || {
        user: 'OLORIN',
        content: msgInput.value,
        isImage: false
    };

    if (!payload.content) return;

    // Triggering the Vercel Serverless Function
    await fetch('/api/transmit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    });

    if (!customData) msgInput.value = '';
}

// --- IMAGE HANDLER ---
document.getElementById('img-up').addEventListener('change', function(e) {
    const reader = new FileReader();
    reader.onload = (event) => {
        sendBurst({ user: 'OLORIN', content: event.target.result, isImage: true });
    };
    reader.readAsDataURL(e.target.files[0]);
});

// --- ENTER KEY BIND ---
document.getElementById('msg').addEventListener('keypress', (e) => { if(e.key === 'Enter') sendBurst(); });