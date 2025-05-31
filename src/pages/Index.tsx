
import React, { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import PeriodicTable from '@/components/PeriodicTable';
import ReactionZone from '@/components/ReactionZone';
import ElementDetail from '@/components/ElementDetail';
import ThemeSwitcher from '@/components/ThemeSwitcher';
import EduBotAssistant from '@/components/EduBotAssistant';
import { Element } from '@/data/elements';
import { Atom, FlaskConical, Bot, Sparkles, TestTube } from 'lucide-react';

const Index = () => {
  const [selectedElement, setSelectedElement] = useState<Element | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);

  const handleElementClick = (element: Element) => {
    setSelectedElement(element);
    setDetailOpen(true);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="min-h-screen bg-white">
        {/* Samsung-style Header */}
        <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <nav className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Atom className="w-8 h-8 text-blue-600" />
                </div>
                <h1 className="text-2xl font-bold text-gray-900">
                  ChemLab Pro
                </h1>
              </div>
              <div className="flex items-center space-x-8">
                <nav className="hidden md:flex items-center space-x-6 text-gray-600">
                  <span className="hover:text-blue-600 transition-colors cursor-pointer font-medium">Elements</span>
                  <span className="hover:text-blue-600 transition-colors cursor-pointer font-medium">Reactions</span>
                  <span className="hover:text-blue-600 transition-colors cursor-pointer font-medium">Lab</span>
                  <span className="hover:text-blue-600 transition-colors cursor-pointer font-medium">AI Assistant</span>
                </nav>
                <ThemeSwitcher />
              </div>
            </nav>
          </div>
        </header>

        {/* Hero Section - Samsung Style */}
        <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
          <div className="max-w-6xl mx-auto px-6 text-center">
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              The Future of
              <br />
              <span className="text-blue-600">Chemistry Learning</span>
            </h2>
            <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
              Experience chemistry through interactive simulations, real-time reactions, and AI-powered assistance. 
              Drag test tubes, mix elements, and discover the magic of molecular science.
            </p>
            <div className="flex items-center justify-center space-x-8 text-sm text-gray-500">
              <div className="flex items-center space-x-2">
                <TestTube className="w-5 h-5 text-blue-600" />
                <span>Real-time Reactions</span>
              </div>
              <div className="flex items-center space-x-2">
                <Atom className="w-5 h-5 text-blue-600" />
                <span>118 Elements</span>
              </div>
              <div className="flex items-center space-x-2">
                <Bot className="w-5 h-5 text-blue-600" />
                <span>AI Assistant</span>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content Grid */}
        <section className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-12">
            
            {/* Periodic Table Section */}
            <div className="xl:col-span-2">
              <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-8">
                <div className="flex items-center space-x-4 mb-8">
                  <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center">
                    <Atom className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">Periodic Table</h3>
                    <p className="text-gray-600">Select elements to start your experiments</p>
                  </div>
                </div>
                <PeriodicTable onElementClick={handleElementClick} />
              </div>
            </div>

            {/* Reaction Lab Section */}
            <div className="xl:col-span-1">
              <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-8 h-full">
                <div className="flex items-center space-x-4 mb-8">
                  <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center">
                    <FlaskConical className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">Reaction Lab</h3>
                    <p className="text-gray-600">Drag test tubes to create reactions</p>
                  </div>
                </div>
                <ReactionZone onElementClick={handleElementClick} />
              </div>
            </div>
          </div>
        </section>

        {/* Neutrino AI Section */}
        <section className="bg-gray-50 py-20">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-16">
              <div className="w-16 h-16 bg-purple-100 rounded-3xl flex items-center justify-center mx-auto mb-6">
                <Bot className="w-8 h-8 text-purple-600" />
              </div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Meet Neutrino AI</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Your intelligent chemistry companion. Get instant explanations, step-by-step solutions, 
                and personalized learning guidance powered by advanced AI.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Instant Explanations</h3>
                <p className="text-gray-600">Get immediate answers to your chemistry questions with detailed explanations.</p>
              </div>
              
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 text-center">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <TestTube className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Reaction Insights</h3>
                <p className="text-gray-600">Understand the science behind every reaction with AI-powered analysis.</p>
              </div>
              
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Atom className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Learning Path</h3>
                <p className="text-gray-600">Get personalized recommendations to improve your chemistry knowledge.</p>
              </div>
            </div>
            
            <div className="text-center mt-12">
              <button className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 rounded-2xl font-semibold transition-colors">
                Try Neutrino AI
              </button>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-12">
          <div className="max-w-6xl mx-auto px-6 text-center">
            <div className="flex items-center justify-center space-x-4 mb-6">
              <Atom className="w-8 h-8 text-blue-400" />
              <h3 className="text-2xl font-bold">ChemLab Pro</h3>
            </div>
            <p className="text-gray-400 mb-8">Revolutionizing chemistry education through technology</p>
            <div className="flex justify-center space-x-8 text-gray-400">
              <span className="hover:text-white cursor-pointer">Privacy</span>
              <span className="hover:text-white cursor-pointer">Terms</span>
              <span className="hover:text-white cursor-pointer">Support</span>
            </div>
          </div>
        </footer>

        {/* Modals */}
        <ElementDetail 
          element={selectedElement} 
          isOpen={detailOpen} 
          onClose={() => setDetailOpen(false)}
        />
        
        <EduBotAssistant />
      </div>
    </DndProvider>
  );
};

export default Index;
