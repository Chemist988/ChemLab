
import React, { useState } from 'react';
import { Bot, X } from 'lucide-react';
import { Button } from './ui/button';

const EduBotAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Floating Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className="w-16 h-16 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-2xl hover:shadow-3xl transition-all duration-500 flex items-center justify-center border border-white/20 backdrop-blur-xl transform hover:scale-105"
        >
          {isOpen ? <X className="w-7 h-7 text-white" /> : <Bot className="w-7 h-7 text-white" />}
        </Button>
      </div>

      {/* Chatbot Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-40 flex items-center justify-center p-4 bg-black/60 backdrop-blur-lg">
          <div className="w-full max-w-5xl h-[85vh] bg-gradient-to-br from-white/95 to-gray-50/95 dark:from-gray-900/95 dark:to-black/95 rounded-3xl shadow-2xl overflow-hidden border border-gray-200/50 dark:border-gray-700/50 backdrop-blur-xl">
            {/* Header */}
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/10 rounded-full">
                  <Bot className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-semibold text-white">Neutrino AI</h2>
                  <p className="text-white/80 text-sm">Precision meets intuition. Your intelligent chemistry companion for NCERT Class 10</p>
                </div>
              </div>
              <Button
                onClick={() => setIsOpen(false)}
                variant="ghost"
                size="sm"
                className="text-white hover:bg-white/10 rounded-full p-2"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            {/* Chatbot Container */}
            <div className="h-full bg-white/90 dark:bg-gray-900/90 p-6">
              <div className="w-full h-full bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden border border-gray-200/50 dark:border-gray-700/50">
                <iframe
                  src="https://www.chatbase.co/chatbot-iframe/COwMkAjIYb1meY0saCFK1"
                  allow="clipboard-write; microphone;"
                  className="w-full h-full border-none"
                  title="Neutrino AI Assistant"
                />
              </div>
            </div>

            {/* Suggested Prompts */}
            <div className="bg-white/90 dark:bg-gray-900/90 p-6 border-t border-gray-200/50 dark:border-gray-700/50">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-4 rounded-xl border border-blue-200/50 dark:border-blue-700/50">
                  <p className="text-blue-700 dark:text-blue-300 text-sm font-medium">Chemistry Mastery</p>
                  <p className="text-gray-600 dark:text-gray-400 text-xs">Explore reactions, periodic trends, and molecular structures</p>
                </div>
                <div className="bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-green-900/20 p-4 rounded-xl border border-emerald-200/50 dark:border-emerald-700/50">
                  <p className="text-emerald-700 dark:text-emerald-300 text-sm font-medium">NCERT Solutions</p>
                  <p className="text-gray-600 dark:text-gray-400 text-xs">Get step-by-step solutions for Class 10 science questions</p>
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
