const feed = document.getElementById('feed');
const imgInput = document.getElementById('img-up');
const msgInput = document.getElementById('msg');

// Inject neural-link message
function transmit(identity, content, isImage = false) {
    const entry = document.createElement('div');
    entry.className = 'mb-4 animate-pulse';
    
    const timestamp = new Date().toLocaleTimeString([], { hour12: false });
    const header = `<span class="text-[10px] text-cyan-800">[${timestamp}]</span> `;
    const userTag = `<span class="${identity === 'OLORIN' ? 'text-pink-500' : 'text-cyan-400'} font-bold">${identity}:</span> `;
    
    if (isImage) {
        entry.innerHTML = `${header}${userTag}<br><img src="${content}" class="mt-2 max-w-xs holo-border opacity-80 hover:opacity-100 transition">`;
    } else {
        entry.innerHTML = `${header}${userTag}${content}`;
    }

    feed.appendChild(entry);
    feed.scrollTop = feed.scrollHeight;
}

// Handle image uploads
imgInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (event) => transmit('OLORIN', event.target.result, true);
        reader.readAsDataURL(file);
    }
});

// Primary transmission
function send() {
    const text = msgInput.value.trim();
    if (text) {
        transmit('OLORIN', text);
        msgInput.value = '';
    }
}

// Listen for enter-key burst
msgInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') send();
});

console.log("SYSTEM_REPORT: IMAGE_CHAT_LOGIC_SYNCED_v3.036");