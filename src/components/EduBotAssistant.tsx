
import React, { useState } from 'react';
import { Bot, X, Skull, Zap } from 'lucide-react';

const TheBlueMatterAI = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Floating Button with Breaking Bad styling */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-16 h-16 rounded-full bg-gradient-to-r from-green-700 to-teal-600 hover:from-green-800 hover:to-teal-700 shadow-2xl hover:shadow-3xl transition-all duration-500 flex items-center justify-center border border-primary/30 backdrop-blur-xl transform hover:scale-105 relative"
        >
          {isOpen ? <X className="w-7 h-7 text-white" /> : <Bot className="w-7 h-7 text-white" />}
          <Skull className="w-3 h-3 text-white/70 absolute top-1 right-1" />
        </button>
      </div>

      {/* Chatbot Modal with Breaking Bad theme */}
      {isOpen && (
        <div className="fixed inset-0 z-40 flex items-center justify-center p-4 bg-black/60 backdrop-blur-lg">
          <div className="w-full max-w-5xl h-[85vh] bg-gradient-to-br from-black/95 to-gray-900/95 rounded-3xl shadow-2xl overflow-hidden border border-primary/50 backdrop-blur-xl">
            {/* Header with Breaking Bad styling */}
            <div className="bg-gradient-to-r from-green-700 to-teal-600 p-6 flex items-center justify-between relative">
              {/* Background pattern */}
              <div 
                className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage: `url('https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?auto=format&fit=crop&w=1000&q=80')`,
                  backgroundSize: 'cover',
                }}
              />
              
              <div className="flex items-center gap-3 relative z-10">
                <div className="p-2 bg-white/10 rounded-full border border-white/20">
                  <Bot className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-2xl font-semibold text-white font-orbitron">TheBlueMatterAI</h2>
                    <Zap className="w-5 h-5 text-white animate-pulse" />
                  </div>
                  <p className="text-white/80 text-sm">"I am the one who knocks... on chemistry's door"</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white hover:bg-white/10 rounded-full p-2 relative z-10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Chatbot Container */}
            <div className="h-full bg-black/90 p-6 relative">
              {/* Desert background overlay */}
              <div 
                className="absolute inset-0 opacity-5"
                style={{
                  backgroundImage: `url('https://images.unsplash.com/photo-1482881497185-d4a9ddbe4151?auto=format&fit=crop&w=1000&q=80')`,
                  backgroundSize: 'cover',
                }}
              />
              
              <div className="w-full h-full bg-black/80 rounded-2xl shadow-lg overflow-hidden border border-primary/50 relative z-10">
                <iframe
                  src="https://www.chatbase.co/chatbot-iframe/COwMkAjIYb1meY0saCFK1"
                  allow="clipboard-write; microphone;"
                  className="w-full h-full border-none"
                  title="TheBlueMatterAI Assistant"
                />
              </div>
            </div>

            {/* Suggested Prompts with Breaking Bad theme */}
            <div className="bg-black/90 p-6 border-t border-primary/50">
              <div className="grid grid-cols-1 gap-4">
                <div className="bg-gradient-to-br from-green-900/30 to-teal-900/30 p-4 rounded-xl border border-green-500/30 relative overflow-hidden">
                  {/* Yellow lights background */}
                  <div 
                    className="absolute inset-0 opacity-10"
                    style={{
                      backgroundImage: `url('https://images.unsplash.com/photo-1500673922987-e212871fec22?auto=format&fit=crop&w=500&q=80')`,
                      backgroundSize: 'cover',
                    }}
                  />
                  
                  <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-2">
                      <Skull className="w-4 h-4 text-green-400" />
                      <p className="text-green-300 text-sm font-medium">99.1% Pure Chemistry</p>
                    </div>
                    <p className="text-gray-300 text-xs">"Yeah, Science!" - Explore reactions, molecular structures, and the danger zone</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TheBlueMatterAI;
