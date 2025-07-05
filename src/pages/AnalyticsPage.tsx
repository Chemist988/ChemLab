
import React from 'react';
import { Bot } from 'lucide-react';

const AnalyticsPage = () => {
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-col w-full h-[calc(100vh-8rem)] bg-gradient-to-br from-black/95 to-gray-900/95 rounded-3xl shadow-2xl overflow-hidden border border-primary/50 backdrop-blur-xl relative">
        {/* Desert background */}
        <div 
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1482881497185-d4a9ddbe4151?auto=format&fit=crop&w=2000&q=80')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        
        {/* Header with Breaking Bad theme */}
        <div className="bg-gradient-to-r from-green-700 to-teal-600 p-6 flex items-center shrink-0 relative">
          {/* Blue crystal overlay */}
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
              <h2 className="text-2xl font-semibold text-white font-orbitron">TheBlueMatterAI</h2>
              <p className="text-white/80 text-sm">"Say my name... I'm the danger in chemistry"</p>
            </div>
          </div>
        </div>

        {/* Chatbot Container */}
        <div className="flex-grow bg-black/90 p-6 relative">
          {/* Matrix background overlay */}
          <div 
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1000&q=80')`,
              backgroundSize: 'cover',
            }}
          />
          
          <div className="w-full h-full bg-black/80 rounded-2xl shadow-lg overflow-hidden border border-primary/50 relative z-10">
            <iframe
              src="https://www.chatbase.co/chatbot-iframe/FDfuiUGe5P2Ho7k9RZQQZ"
              allow="clipboard-write; microphone;"
              className="w-full h-full border-none"
              title="TheBlueMatterAI Assistant"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;
