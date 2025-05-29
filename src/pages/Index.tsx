
import React, { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import PeriodicTable from '@/components/PeriodicTable';
import ReactionZone from '@/components/ReactionZone';
import ElementDetail from '@/components/ElementDetail';
import ThemeSwitcher from '@/components/ThemeSwitcher';
import EduBotAssistant from '@/components/EduBotAssistant';
import { Element } from '@/data/elements';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from '@/components/ui/separator';
import { Atom, Beaker, BookOpen, Bot, Sparkles, ArrowRight, X, ChevronRight, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';

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
      <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white">
        {/* Apple-style Navigation */}
        <nav className="sticky top-0 z-50 bg-white/80 dark:bg-black/80 backdrop-blur-xl border-b border-gray-200/20 dark:border-gray-800/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-12">
              <div className="flex items-center space-x-8">
                <div className="flex items-center space-x-2">
                  <Atom className="w-6 h-6" />
                  <span className="text-lg font-medium">Chemistry</span>
                </div>
                <div className="hidden md:flex space-x-8 text-sm">
                  <a href="#" className="hover:text-gray-600 dark:hover:text-gray-300 transition-colors">Periodic Table</a>
                  <a href="#" className="hover:text-gray-600 dark:hover:text-gray-300 transition-colors">Reactions</a>
                  <a href="#" className="hover:text-gray-600 dark:hover:text-gray-300 transition-colors">AI Assistant</a>
                </div>
              </div>
              <ThemeSwitcher />
            </div>
          </div>
        </nav>

        {/* Hero Section - Apple Style */}
        <section className="pt-16 pb-24 px-4">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-semibold tracking-tight mb-6 bg-gradient-to-b from-black to-gray-600 dark:from-white dark:to-gray-400 bg-clip-text text-transparent">
              Interactive Chemistry.
            </h1>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-light text-gray-600 dark:text-gray-400 mb-8 max-w-4xl mx-auto leading-tight">
              Explore elements like never before.
            </h2>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed">
              Drag, drop, and discover the beauty of chemistry with our interactive periodic table and AI-powered assistant.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
              <Button 
                onClick={() => setShowBot(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full text-lg font-medium transition-all duration-200"
              >
                Try Neutrino AI
              </Button>
              <Button 
                variant="outline"
                className="border-2 border-gray-300 dark:border-gray-600 px-8 py-3 rounded-full text-lg font-medium hover:border-gray-400 dark:hover:border-gray-500 transition-all duration-200"
              >
                <Play className="w-5 h-5 mr-2" />
                Watch Demo
              </Button>
            </div>

            {/* Feature highlights */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Atom className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold mb-2">118 Elements</h3>
                <p className="text-gray-600 dark:text-gray-400">Complete periodic table with detailed information</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Beaker className="w-8 h-8 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Live Reactions</h3>
                <p className="text-gray-600 dark:text-gray-400">Simulate chemical reactions in real-time</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Bot className="w-8 h-8 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="text-xl font-semibold mb-2">AI Assistant</h3>
                <p className="text-gray-600 dark:text-gray-400">Get instant help with chemistry concepts</p>
              </div>
            </div>
          </div>
        </section>

        {/* Neutrino AI Section - Apple Product Style */}
        <section className="py-24 bg-gray-50 dark:bg-gray-900/50">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold mb-6">
                Meet Neutrino AI.
              </h2>
              <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 font-light">
                Precision meets intuition.
              </p>
            </div>
            
            <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 rounded-3xl overflow-hidden">
              <div className="p-12 md:p-16 lg:p-20 text-center text-white">
                <div className="w-24 h-24 bg-white/20 rounded-3xl flex items-center justify-center mx-auto mb-8 backdrop-blur-sm">
                  <Bot className="w-12 h-12" />
                </div>
                
                <h3 className="text-3xl md:text-4xl font-semibold mb-6">
                  Your intelligent chemistry companion
                </h3>
                
                <p className="text-lg md:text-xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed">
                  Get instant help with reactions, molecular structures, and complex chemistry concepts through natural conversation.
                </p>
                
                <Button 
                  onClick={() => setShowBot(true)}
                  className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 rounded-full text-lg font-semibold transition-all duration-200 shadow-xl"
                >
                  Start Exploring
                  <ChevronRight className="w-5 h-5 ml-2" />
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content - Apple Layout */}
        <section className="py-24 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 xl:grid-cols-4 gap-12">
              {/* Periodic Table */}
              <div className="xl:col-span-3">
                <div className="bg-white dark:bg-gray-900/50 rounded-3xl p-8 shadow-2xl border border-gray-200/50 dark:border-gray-800/50">
                  <div className="flex items-center justify-between mb-8">
                    <h2 className="text-3xl font-semibold">Periodic Table</h2>
                    <span className="text-sm text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full">
                      Click any element
                    </span>
                  </div>
                  <PeriodicTable onElementClick={handleElementClick} />
                </div>
              </div>

              {/* Sidebar */}
              <div className="bg-white dark:bg-gray-900/50 rounded-3xl p-6 shadow-2xl border border-gray-200/50 dark:border-gray-800/50">
                <Tabs defaultValue="reaction" className="h-full">
                  <TabsList className="w-full mb-6 bg-gray-100 dark:bg-gray-800 rounded-2xl p-1">
                    <TabsTrigger value="reaction" className="flex-1 rounded-xl text-sm font-medium">
                      <Beaker className="w-4 h-4 mr-2" />
                      Lab
                    </TabsTrigger>
                    <TabsTrigger value="info" className="flex-1 rounded-xl text-sm font-medium">
                      <BookOpen className="w-4 h-4 mr-2" />
                      Guide
                    </TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="reaction" className="space-y-6">
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Reaction Simulator</h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm mb-6">
                        Drag and drop elements to simulate chemical reactions
                      </p>
                    </div>
                    <Separator className="bg-gray-200 dark:bg-gray-700" />
                    <ReactionZone onElementClick={handleElementClick} />
                  </TabsContent>
                  
                  <TabsContent value="info" className="space-y-6">
                    <div>
                      <h3 className="text-xl font-semibold mb-6">Getting Started</h3>
                      <div className="space-y-4">
                        <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-2xl border border-blue-200/50 dark:border-blue-800/50">
                          <h4 className="font-semibold text-blue-700 dark:text-blue-300 mb-3">Explore Elements</h4>
                          <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                            <li>• Click any element for detailed information</li>
                            <li>• View atomic structure and properties</li>
                            <li>• Learn about electron configurations</li>
                          </ul>
                        </div>
                        
                        <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-2xl border border-green-200/50 dark:border-green-800/50">
                          <h4 className="font-semibold text-green-700 dark:text-green-300 mb-3">Simulate Reactions</h4>
                          <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                            <li>• Drag elements to the reaction zone</li>
                            <li>• Watch chemical reactions come to life</li>
                            <li>• Understand molecular interactions</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </div>
        </section>

        {/* Footer - Apple Style */}
        <footer className="bg-gray-50 dark:bg-gray-900/50 py-16">
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
        
        <ElementDetail 
          element={selectedElement} 
          isOpen={detailOpen} 
          onClose={() => setDetailOpen(false)}
        />
        
        <EduBotAssistant />
        
        {showBot && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xl">
            <div className="w-full max-w-5xl h-[85vh] bg-white dark:bg-gray-900 rounded-3xl shadow-2xl overflow-hidden border border-gray-200/50 dark:border-gray-700/50">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/20 rounded-2xl flex items-center justify-center">
                    <Bot className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-semibold text-white">Neutrino AI</h2>
                    <p className="text-white/80 text-sm">Precision meets intuition.</p>
                  </div>
                </div>
                <Button
                  onClick={() => setShowBot(false)}
                  variant="ghost"
                  size="sm"
                  className="text-white hover:bg-white/10 rounded-full w-10 h-10 p-0"
                >
                  <X className="w-5 h-5" />
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
