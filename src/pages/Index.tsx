
import React, { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import PeriodicTable from '@/components/PeriodicTable';
import ReactionZone from '@/components/ReactionZone';
import ElementDetail from '@/components/ElementDetail';
import ThemeSwitcher from '@/components/ThemeSwitcher';
import EduBotAssistant from '@/components/EduBotAssistant';
import { Element } from '@/data/elements';
import { Button } from '@/components/ui/button';
import { Atom, Beaker, Bot, ChevronRight, Search } from 'lucide-react';

const Index = () => {
  const [selectedElement, setSelectedElement] = useState<Element | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);
  const [showBot, setShowBot] = useState(false);

  const handleElementClick = (element: Element) => {
    setSelectedElement(element);
    setDetailOpen(true);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="min-h-screen bg-white dark:bg-black">
        {/* Apple Store Navigation */}
        <header className="sticky top-0 z-50 bg-white/80 dark:bg-black/80 backdrop-blur-xl border-b border-gray-200/20 dark:border-gray-800/20">
          <div className="max-w-7xl mx-auto">
            <nav className="flex items-center justify-between h-11 px-6 text-sm">
              <div className="flex items-center space-x-8">
                <div className="flex items-center space-x-2">
                  <Atom className="w-4 h-4" />
                  <span className="font-medium">Chemistry</span>
                </div>
                <div className="hidden md:flex items-center space-x-8">
                  <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors">Store</a>
                  <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors">Elements</a>
                  <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors">Reactions</a>
                  <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors">Lab</a>
                  <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors">Support</a>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <Search className="w-4 h-4 text-gray-600 dark:text-gray-300 cursor-pointer hover:text-black dark:hover:text-white transition-colors" />
                <ThemeSwitcher />
              </div>
            </nav>
          </div>
        </header>

        {/* Hero Section */}
        <section className="pt-12 pb-16 px-4">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-semibold tracking-tight mb-4">
              Store. <span className="text-gray-600 dark:text-gray-400">The best way to explore Chemistry.</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
              Need help with chemistry? Ask Neutrino AI. Available anytime.
            </p>
          </div>
        </section>

        {/* Featured Products Grid */}
        <section className="pb-16 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-8">
              {/* Periodic Table Card */}
              <div className="group bg-gray-50 dark:bg-gray-900/50 rounded-3xl overflow-hidden hover:shadow-xl transition-all duration-300">
                <div className="p-12 h-full flex flex-col justify-between min-h-[400px]">
                  <div>
                    <h2 className="text-4xl font-semibold mb-4">Periodic Table</h2>
                    <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
                      Explore all 118 elements with interactive design. From Hydrogen to Oganesson.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-6">
                        Explore Elements
                      </Button>
                      <Button variant="outline" className="rounded-full px-6 border-gray-300 dark:border-gray-600">
                        Learn more <ChevronRight className="w-4 h-4 ml-1" />
                      </Button>
                    </div>
                  </div>
                  <div className="mt-8 flex justify-center">
                    <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-3xl flex items-center justify-center">
                      <Atom className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Reaction Lab Card */}
              <div className="group bg-gray-50 dark:bg-gray-900/50 rounded-3xl overflow-hidden hover:shadow-xl transition-all duration-300">
                <div className="p-12 h-full flex flex-col justify-between min-h-[400px]">
                  <div>
                    <h2 className="text-4xl font-semibold mb-4">Reaction Lab</h2>
                    <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
                      Simulate real chemical reactions. Watch chemistry come to life with realistic effects.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <Button className="bg-green-600 hover:bg-green-700 text-white rounded-full px-6">
                        Start Experimenting
                      </Button>
                      <Button variant="outline" className="rounded-full px-6 border-gray-300 dark:border-gray-600">
                        Learn more <ChevronRight className="w-4 h-4 ml-1" />
                      </Button>
                    </div>
                  </div>
                  <div className="mt-8 flex justify-center">
                    <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-3xl flex items-center justify-center">
                      <Beaker className="w-8 h-8 text-green-600 dark:text-green-400" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* AI Assistant Full Width Card */}
            <div className="bg-gradient-to-r from-gray-900 to-black rounded-3xl overflow-hidden text-white mb-8">
              <div className="p-12 text-center">
                <div className="w-20 h-20 bg-white/10 rounded-3xl flex items-center justify-center mx-auto mb-6 backdrop-blur-sm">
                  <Bot className="w-10 h-10" />
                </div>
                <h2 className="text-4xl font-semibold mb-4">Neutrino AI</h2>
                <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
                  Get instant help with chemistry concepts. Your intelligent companion for learning.
                </p>
                <Button 
                  onClick={() => setShowBot(true)}
                  className="bg-white text-black hover:bg-gray-100 rounded-full px-8 py-3 text-lg font-medium shadow-lg"
                >
                  Ask Neutrino AI
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Main Interactive Section */}
        <section className="pb-24 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="bg-white dark:bg-gray-900/50 rounded-3xl shadow-2xl border border-gray-200/50 dark:border-gray-800/50 overflow-hidden">
              <div className="p-8">
                <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
                  {/* Periodic Table - 3/4 width */}
                  <div className="xl:col-span-3">
                    <PeriodicTable onElementClick={handleElementClick} />
                  </div>

                  {/* Reaction Sidebar - 1/4 width */}
                  <div className="bg-gray-50 dark:bg-gray-800/50 rounded-2xl p-6">
                    <div className="mb-6">
                      <h3 className="text-xl font-semibold mb-2">Reaction Lab</h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">
                        Drag 2 elements to simulate reactions
                      </p>
                    </div>
                    <ReactionZone onElementClick={handleElementClick} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Apple-style Footer */}
        <footer className="bg-gray-50 dark:bg-gray-900/50 py-16 border-t border-gray-200/30 dark:border-gray-800/30">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Atom className="w-6 h-6" />
              <span className="text-lg font-medium">Interactive Chemistry</span>
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Explore the periodic table like never before.
            </p>
          </div>
        </footer>
        
        {/* Modals */}
        <ElementDetail 
          element={selectedElement} 
          isOpen={detailOpen} 
          onClose={() => setDetailOpen(false)}
        />
        
        <EduBotAssistant />
        
        {/* Bot Modal */}
        {showBot && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xl">
            <div className="w-full max-w-5xl h-[85vh] bg-white dark:bg-gray-900 rounded-3xl shadow-2xl overflow-hidden border border-gray-200/50 dark:border-gray-700/50">
              <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                    <Bot className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-semibold text-white">Neutrino AI</h2>
                    <p className="text-white/80 text-sm">Say hi and I'll introduce myself!</p>
                  </div>
                </div>
                <Button
                  onClick={() => setShowBot(false)}
                  variant="ghost"
                  size="sm"
                  className="text-white hover:bg-white/10 rounded-full w-10 h-10 p-0"
                >
                  ✕
                </Button>
              </div>
              <div className="h-full bg-white dark:bg-gray-900 p-6">
                <div className="w-full h-full bg-gray-50 dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
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
        )}
      </div>
    </DndProvider>
  );
};

export default Index;
