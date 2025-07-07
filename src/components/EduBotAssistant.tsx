import React from 'react';

interface EduBotAssistantProps {
  isOpen: boolean;
  onClose: () => void;
}

const EduBotAssistant: React.FC<EduBotAssistantProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm">
      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg w-full max-w-4xl h-[80vh] flex flex-col">
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="text-xl font-semibold">EduBot Assistant</h2>
            <button 
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              ✕
            </button>
          </div>
          <div className="flex-1 p-4">
            <iframe
              src="https://www.chatbase.co/chatbot-iframe/FDfuiUGe5P2Ho7k9RZQQZ"
              className="w-full h-full border-0 rounded"
              title="EduBot Assistant"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EduBotAssistant;