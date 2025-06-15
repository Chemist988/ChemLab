
import React from 'react';
import { Bot } from 'lucide-react';

const AnalyticsPage = () => {
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-col w-full h-[calc(100vh-8rem)] bg-gradient-to-br from-white/95 to-gray-50/95 dark:from-gray-900/95 dark:to-black/95 rounded-3xl shadow-2xl overflow-hidden border border-gray-200/50 dark:border-gray-700/50 backdrop-blur-xl">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 flex items-center shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/10 rounded-full">
              <Bot className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-white">Neutrino AI</h2>
              <p className="text-white/80 text-sm">Your intelligent chemistry companion for NCERT Class 10</p>
            </div>
          </div>
        </div>

        {/* Chatbot Container */}
        <div className="flex-grow bg-white/90 dark:bg-gray-900/90 p-6">
          <div className="w-full h-full bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden border border-gray-200/50 dark:border-gray-700/50">
            <iframe
              src="https://www.chatbase.co/chatbot-iframe/COwMkAjIYb1meY0saCFK1"
              allow="clipboard-write; microphone;"
              className="w-full h-full border-none"
              title="Neutrino AI Assistant"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;
