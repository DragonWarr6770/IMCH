"use client";
import { useState, useEffect, useRef } from 'react';
import { supabase, getRandomUsername } from './lib/supabase';
import { Upload, Send } from 'lucide-react';

export default function CampfireApp() {
  const [image, setImage] = useState("https://images.unsplash.com/photo-1526481280693-3bfa7568e0f3?q=80&w=1000&auto=format&fit=crop"); // Default Campfire Image
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [username] = useState(getRandomUsername());
  const chatEndRef = useRef(null);

  // 1. Listen for new messages in real-time
  useEffect(() => {
    const channel = supabase
      .channel('schema-db-changes')
      .on('postgres_changes', { event: 'INSERT', table: 'messages' }, (payload) => {
        setMessages((prev) => [...prev, payload.new]);
      })
      .subscribe();

    // Fetch existing messages
    const fetchMessages = async () => {
      const { data } = await supabase.from('messages').select('*').order('created_at', { ascending: true });
      if (data) setMessages(data);
    };

    fetchMessages();
    return () => supabase.removeChannel(channel);
  }, []);

  // 2. Auto-scroll chat to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // 3. Handle Image Upload
  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const { data, error } = await supabase.storage.from('images').upload(fileName, file);

    if (data) {
      const { data: urlData } = supabase.storage.from('images').getPublicUrl(fileName);
      setImage(urlData.publicUrl);
      // Update the "global" image state in a real DB table if needed
    }
  };

  // 4. Handle Sending Messages
  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    await supabase.from('messages').insert([
      { text: input, user: username, created_at: new Date() }
    ]);
    setInput("");
  };

  return (
    <main className="flex flex-col h-screen max-w-2xl mx-auto p-4 md:p-6 bg-campfire-charcoal">
      
      {/* Photo Section */}
      <div className="relative flex-1 rounded-3xl overflow-hidden border-2 border-campfire-smoke shadow-fire animate-flicker mb-6">
        <img src={image} alt="Campfire Central" className="w-full h-full object-cover" />
        <label className="absolute bottom-4 right-4 bg-campfire-ember p-4 rounded-full cursor-pointer hover:bg-campfire-glow transition-colors">
          <Upload size={24} color="white" />
          <input type="file" className="hidden" onChange={handleUpload} accept="image/*" />
        </label>
      </div>

      {/* Chat Section */}
      <div className="flex flex-col h-1/2 bg-black/30 rounded-2xl p-4 border border-campfire-smoke">
        <div className="flex-1 overflow-y-auto space-y-3 mb-4 pr-2">
          {messages.map((m, i) => (
            <div key={i} className="animate-in fade-in slide-in-from-bottom-1">
              <span className="text-campfire-glow text-xs font-bold uppercase tracking-widest">{m.user}</span>
              <p className="text-gray-200 bg-white/5 p-2 rounded-lg mt-1 border-l-2 border-campfire-ember">{m.text}</p>
            </div>
          ))}
          <div ref={chatEndRef} />
        </div>

        {/* Input Area */}
        <form onSubmit={sendMessage} className="flex gap-2">
          <input 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Whisper to the flames..."
            className="flex-1 bg-campfire-charcoal border border-campfire-smoke rounded-xl px-4 py-3 focus:outline-none focus:border-campfire-ember text-white"
          />
          <button type="submit" className="bg-campfire-ember px-6 rounded-xl hover:bg-campfire-glow transition-all">
            <Send size={20} color="white" />
          </button>
        </form>
      </div>
    </main>
  );
}