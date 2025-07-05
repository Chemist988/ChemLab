import React, { useState } from 'react';
import { Bot, X } from 'lucide-react';

const TheBlueMatterAI = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Floating Button with Crystal Blue styling */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-blue-600 hover:to-cyan-500 shadow-2xl hover:shadow-3xl transition-all duration-500 flex items-center justify-center border border-blue-300/30 backdrop-blur-xl transform hover:scale-105 relative"
        >
          {isOpen ? <X className="w-7 h-7 text-white" /> : <Bot className="w-7 h-7 text-white" />}
        </button>
      </div>

      {/* Chatbot Modal with Crystal Blue theme */}
      {isOpen && (
        <div className="fixed inset-0 z-40 flex items-center justify-center p-4 bg-black/60 backdrop-blur-lg">
          <div className="w-full max-w-5xl h-[85vh] bg-gradient-to-br from-blue-900 via-blue-800 to-cyan-900 rounded-3xl shadow-2xl overflow-hidden border border-cyan-300/50 backdrop-blur-xl flex flex-col">

            {/* Header - Crystal Blue only */}
            <div className="relative p-6 flex items-center justify-between bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-500 shadow-inner">
              <h2 className="text-2xl font-bold text-white tracking-wider">The Blue Matter AI</h2>
              <button onClick={() => setIsOpen(false)} className="text-white hover:text-gray-300">
                <X className="w-6 h-6" />
              </button>
              <div 
                className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage: `url('https://upload.wikimedia.org/wikipedia/commons/6/6e/Breaking_Bad_logo.svg')`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              />
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-6 text-white bg-gradient-to-b from-blue-950/60 to-cyan-900/40">
              <p className="text-cyan-100 italic">"I am the one who chats."</p>
            </div>

            {/* Input Area */}
            <div className="p-4 border-t border-cyan-300/20 bg-blue-950/60 flex items-center gap-2">
              <input 
                type="text"
                placeholder="Type your message..."
                className="flex-1 p-3 rounded-lg bg-blue-800 text-white placeholder-cyan-200 focus:outline-none focus:ring focus:ring-cyan-500"
              />
              <button className="p-3 rounded-lg bg-cyan-600 hover:bg-cyan-700 transition text-white font-semibold">
                Send
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
};

export default TheBlueMatterAI;

