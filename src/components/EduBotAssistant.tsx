
import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { Button } from './ui/button';

const EduBotAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Floating Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className="w-14 h-14 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center"
        >
          {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
        </Button>
      </div>

      {/* Chatbot Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-40 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="w-full max-w-4xl h-[80vh] bg-gradient-to-br from-gray-900 to-black rounded-2xl shadow-2xl overflow-hidden border border-cyan-500/20">
            {/* Header */}
            <div className="bg-gradient-to-r from-cyan-500 to-blue-500 p-4 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-white">EduBot Learn</h2>
                <p className="text-cyan-100 text-sm">Ask anything from NCERT Class 10 - EduBot has read it all!</p>
              </div>
              <Button
                onClick={() => setIsOpen(false)}
                variant="ghost"
                size="sm"
                className="text-white hover:bg-white/20"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            {/* Chatbot Container */}
            <div className="h-full bg-gray-900 p-6">
              <div className="w-full h-full bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-cyan-500/30">
                <iframe
                  src="https://www.chatbase.co/chatbot-iframe/COwMkAjIYb1meY0saCFK1"
                  allow="clipboard-write; microphone;"
                  className="w-full h-full border-none"
                  title="EduBot Learn Assistant"
                />
              </div>
            </div>

            {/* Suggested Prompts */}
            <div className="bg-gray-900 p-4 border-t border-cyan-500/20">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="bg-gray-800 p-3 rounded-lg border-l-4 border-cyan-500">
                  <p className="text-cyan-400 text-sm font-medium">Chemistry Help</p>
                  <p className="text-gray-300 text-xs">Ask about chemical reactions, periodic table, or molecular structures</p>
                </div>
                <div className="bg-gray-800 p-3 rounded-lg border-l-4 border-blue-500">
                  <p className="text-blue-400 text-sm font-medium">NCERT Questions</p>
                  <p className="text-gray-300 text-xs">Get help with Class 10 science textbook questions</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EduBotAssistant;
