"use client";

import React, { useState, ChangeEvent } from 'react';
import { MessageCircle, Upload, Send } from 'lucide-react';

export default function App() {
  const [bgImage, setBgImage] = useState<string>('');
  const [isChatOpen, setIsChatOpen] = useState(false);

  // Handles the image upload and creates a local URL
  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setBgImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <main className="relative min-h-screen w-full overflow-hidden">
      {/* 1. SLIDABLE BACKGROUND */}
      {bgImage && (
        <div className="bg-slide-container animate-slide-bg">
          <div 
            className="bg-image-part" 
            style={{ backgroundImage: `url(${bgImage})` }} 
          />
          <div 
            className="bg-image-part" 
            style={{ backgroundImage: `url(${bgImage})` }} 
          />
        </div>
      )}

      {/* 2. UPLOAD INTERFACE (Centered UI) */}
      {!bgImage && (
        <div className="flex flex-col items-center justify-center min-h-screen bg-neutral-900 text-white p-4">
          <label className="flex flex-col items-center gap-4 cursor-pointer hover:text-blue-400 transition-colors">
            <Upload size={48} />
            <span className="text-xl font-semibold">Upload Background Image</span>
            <input 
              type="file" 
              className="hidden" 
              accept="image/*" 
              onChange={handleImageUpload} 
            />
          </label>
        </div>
      )}

      {/* 3. FLOATING CHAT BUTTON */}
      <button
        onClick={() => setIsChatOpen(!isChatOpen)}
        className="fixed bottom-6 right-6 p-4 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-2xl transition-all active:scale-95 z-50"
      >
        <MessageCircle size={28} />
      </button>

      {/* 4. CHAT WINDOW (Toggleable) */}
      {isChatOpen && (
        <div className="fixed bottom-24 right-6 w-80 h-96 bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden z-50 animate-in fade-in slide-in-from-bottom-4">
          <div className="bg-blue-600 p-4 text-white font-bold">Chat Support</div>
          <div className="flex-1 p-4 overflow-y-auto text-black">
            <p className="bg-gray-100 p-2 rounded-lg text-sm mb-2">Hello! How can I help you today?</p>
          </div>
          <div className="p-3 border-t flex gap-2">
            <input 
              type="text" 
              placeholder="Type a message..." 
              className="flex-1 text-sm border p-2 rounded-md focus:outline-none text-black"
            />
            <button className="text-blue-600">
              <Send size={20} />
            </button>
          </div>
        </div>
      )}
    </main>
  );
}