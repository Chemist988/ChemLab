
import React, { useState } from 'react';
import { Bot, X } from 'lucide-react';

interface EduBotAssistantProps {
  isOpen?: boolean;
  onClose?: () => void;
}

const TheBlueMatterAI: React.FC<EduBotAssistantProps> = ({ isOpen: externalIsOpen, onClose }) => {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const isOpen = externalIsOpen !== undefined ? externalIsOpen : internalIsOpen;
  
  const handleToggle = () => {
    if (externalIsOpen !== undefined && onClose) {
      onClose();
    } else {
      setInternalIsOpen(!internalIsOpen);
    }
  };

  return (
    <>
      {/* Floating Button with Breaking Bad styling */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={handleToggle}
          className="w-16 h-16 rounded-full bg-gradient-to-r from-cyan-600 to-blue-700 hover:from-cyan-700 hover:to-blue-800 shadow-2xl hover:shadow-3xl transition-all duration-500 flex items-center justify-center border border-cyan-400/50 backdrop-blur-xl transform hover:scale-105 relative overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, #0891b2, #1e40af, #3730a3)',
            boxShadow: '0 0 30px rgba(34, 211, 238, 0.4), 0 0 60px rgba(59, 130, 246, 0.2), inset 0 0 20px rgba(255, 255, 255, 0.1)'
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent"></div>
          {isOpen ? <X className="w-7 h-7 text-white relative z-10" /> : <Bot className="w-7 h-7 text-white relative z-10" />}
        </button>
      </div>

      {/* Chatbot Modal with Breaking Bad theme */}
      {isOpen && (
        <div className="fixed inset-0 z-40 flex items-center justify-center p-4 bg-black/60 backdrop-blur-lg">
          <div className="w-full max-w-5xl h-[85vh] rounded-3xl shadow-2xl overflow-hidden backdrop-blur-xl relative"
               style={{
                 background: 'linear-gradient(135deg, rgba(8, 145, 178, 0.95), rgba(30, 64, 175, 0.95), rgba(55, 48, 163, 0.95))',
                 border: '2px solid rgba(34, 211, 238, 0.3)',
                 boxShadow: '0 0 50px rgba(34, 211, 238, 0.2), inset 0 0 30px rgba(255, 255, 255, 0.1)'
               }}>
            {/* Crystal structure overlay */}
            <div className="absolute inset-0 opacity-10"
                 style={{
                   backgroundImage: `url('https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?auto=format&fit=crop&w=1000&q=80')`,
                   backgroundSize: 'cover',
                 }}
            />
            
            {/* Header with Crystal Blue styling */}
            <div className="bg-gradient-to-r from-cyan-600 to-blue-700 p-6 flex items-center justify-between relative border-b border-cyan-400/30"
                 style={{
                   background: 'linear-gradient(135deg, #0891b2, #1e40af)',
                   boxShadow: 'inset 0 0 20px rgba(255, 255, 255, 0.1)'
                 }}>
              {/* Blue crystal background */}
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
                  <p className="text-white/80 text-sm">"I am the one who knocks... on chemistry's door"</p>
                </div>
              </div>
              <button
                onClick={handleToggle}
                className="text-white hover:bg-white/10 rounded-full p-2 relative z-10 transition-all duration-300"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Chatbot Container */}
            <div className="h-full p-6 relative"
                 style={{
                   background: 'linear-gradient(135deg, rgba(8, 145, 178, 0.9), rgba(30, 64, 175, 0.9))'
                 }}>
              {/* Desert background overlay */}
              <div 
                className="absolute inset-0 opacity-5"
                style={{
                  backgroundImage: `url('https://images.unsplash.com/photo-1482881497185-d4a9ddbe4151?auto=format&fit=crop&w=1000&q=80')`,
                  backgroundSize: 'cover',
                }}
              />
              
              <div className="w-full h-full rounded-2xl shadow-lg overflow-hidden relative z-10"
                   style={{
                     background: 'linear-gradient(135deg, rgba(34, 211, 238, 0.1), rgba(59, 130, 246, 0.1))',
                     border: '1px solid rgba(34, 211, 238, 0.3)',
                     boxShadow: 'inset 0 0 20px rgba(255, 255, 255, 0.1)'
                   }}>
                <iframe
                  src="https://www.chatbase.co/chatbot-iframe/FDfuiUGe5P2Ho7k9RZQQZ"
                  allow="clipboard-write; microphone;"
                  className="w-full h-full border-none"
                  title="TheBlueMatterAI Assistant"
                />
              </div>
            </div>

            {/* Suggested Prompts with Crystal Blue theme */}
            <div className="p-6 border-t border-cyan-400/30 relative"
                 style={{
                   background: 'linear-gradient(135deg, rgba(8, 145, 178, 0.8), rgba(30, 64, 175, 0.8))'
                 }}>
              <div className="grid grid-cols-1 gap-4">
                <div className="p-4 rounded-xl relative overflow-hidden"
                     style={{
                       background: 'linear-gradient(135deg, rgba(34, 211, 238, 0.2), rgba(59, 130, 246, 0.2))',
                       border: '1px solid rgba(34, 211, 238, 0.4)',
                       boxShadow: 'inset 0 0 15px rgba(255, 255, 255, 0.1)'
                     }}>
                  {/* RV background */}
                  <div 
                    className="absolute inset-0 opacity-20"
                    style={{
                      backgroundImage: `url('/lovable-uploads/d216d585-0f35-442a-9b4c-e5e456e8825b.png')`,
                      backgroundSize: 'cover',
                    }}
                  />
                  
                  <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-2">
                      <p className="text-cyan-200 text-sm font-medium">99.1% Pure Chemistry Knowledge</p>
                    </div>
                    <p className="text-cyan-300 text-xs">"The Science is Pure!" - Explore reactions, molecular structures, and chemical processes</p>
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
