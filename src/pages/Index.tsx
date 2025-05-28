
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
import { Button } from '@/components/ui/button';
import { Atom, BookOpen, Beaker, Bot } from 'lucide-react';

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
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-black dark:to-gray-800 transition-all duration-700 overflow-x-hidden">
        <div className="container mx-auto py-12 px-6 max-w-7xl">
          {/* Apple-inspired Header */}
          <header className="mb-20 flex flex-col items-center relative">
            <div className="absolute right-0 top-0">
              <ThemeSwitcher />
            </div>
            <div className="text-center space-y-8">
              <h1 className="text-7xl md:text-8xl font-thin tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-blue-800 to-purple-700 dark:from-white dark:via-blue-200 dark:to-purple-300 leading-none">
                Interactive Chemistry
              </h1>
              <p className="text-2xl font-light text-gray-700 dark:text-gray-200 tracking-wide">
                Precision meets intuition.
              </p>
              <p className="text-lg font-light text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
                Explore the periodic table like never before. Drag elements, simulate reactions, 
                and discover the beauty of chemistry with stunning visualizations.
              </p>
              <div className="flex items-center justify-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                <Atom className="w-4 h-4" />
                <span>118 Elements • Unlimited Possibilities</span>
              </div>
            </div>
          </header>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-5 gap-8">
            {/* Periodic Table - Full width without scrolling */}
            <div className="xl:col-span-3 bg-white/90 dark:bg-gray-900/90 rounded-3xl shadow-2xl backdrop-blur-xl border border-gray-200/50 dark:border-gray-700/50 p-8">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-4xl font-thin text-gray-900 dark:text-white">Periodic Table</h2>
                <div className="text-sm text-gray-500 dark:text-gray-400">Click any element to explore</div>
              </div>
              {/* No scaling, proper responsive design */}
              <div className="w-full">
                <PeriodicTable onElementClick={handleElementClick} />
              </div>
            </div>

            {/* Sidebar with Tabs */}
            <div className="xl:col-span-2 space-y-6">
              {/* Neutrino AI Section */}
              <div className="bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 rounded-3xl shadow-xl backdrop-blur-xl border border-purple-200/50 dark:border-purple-700/50 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full">
                    <Bot className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-purple-700 dark:text-purple-300">Neutrino AI</h3>
                    <p className="text-sm text-purple-600 dark:text-purple-400">Your chemistry companion</p>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                  Get instant help with NCERT Class 10 chemistry concepts, reactions, and problem-solving.
                </p>
                <Button 
                  onClick={() => setShowBot(true)}
                  className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <Atom className="w-4 h-4 mr-2" />
                  Chat with Neutrino AI
                </Button>
              </div>

              {/* Lab & Guide Section */}
              <div className="bg-white/90 dark:bg-gray-900/90 rounded-3xl shadow-xl backdrop-blur-xl border border-gray-200/50 dark:border-gray-700/50 p-6">
                <Tabs defaultValue="reaction" className="h-full">
                  <TabsList className="w-full mb-6 bg-gray-100/80 dark:bg-gray-800/80 rounded-2xl p-1">
                    <TabsTrigger value="reaction" className="flex-1 rounded-xl data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700 data-[state=active]:shadow-sm">
                      <Beaker className="w-4 h-4 mr-2" />
                      Lab
                    </TabsTrigger>
                    <TabsTrigger value="info" className="flex-1 rounded-xl data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700 data-[state=active]:shadow-sm">
                      <BookOpen className="w-4 h-4 mr-2" />
                      Guide
                    </TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="reaction" className="space-y-6">
                    <div>
                      <h3 className="text-xl font-medium mb-2">Reaction Simulator</h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                        Drag and drop elements to simulate chemical reactions
                      </p>
                    </div>
                    <Separator />
                    <ReactionZone onElementClick={handleElementClick} />
                  </TabsContent>
                  
                  <TabsContent value="info" className="space-y-6">
                    <div>
                      <h3 className="text-xl font-medium mb-4">How to Use</h3>
                      <div className="space-y-4 text-sm">
                        <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl border border-blue-200/50 dark:border-blue-700/50">
                          <h4 className="font-medium text-blue-700 dark:text-blue-300 mb-2">Getting Started</h4>
                          <ul className="space-y-1 text-gray-600 dark:text-gray-400">
                            <li>• Click any element for detailed information</li>
                            <li>• Drag elements to the reaction zone</li>
                            <li>• Watch chemical reactions come to life</li>
                          </ul>
                        </div>
                        
                        <div className="p-4 bg-gradient-to-r from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-green-900/20 rounded-xl border border-emerald-200/50 dark:border-emerald-700/50">
                          <h4 className="font-medium text-emerald-700 dark:text-emerald-300 mb-2">Popular Reactions</h4>
                          <ul className="space-y-1 text-gray-600 dark:text-gray-400 text-xs">
                            <li>• H + O → Water formation</li>
                            <li>• Na + Cl → Salt formation</li>
                            <li>• Fe + O → Rust formation</li>
                            <li>• Mg + O → Combustion</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </div>
        </div>
        
        <ElementDetail 
          element={selectedElement} 
          isOpen={detailOpen} 
          onClose={() => setDetailOpen(false)}
        />
        
        {/* Neutrino AI Assistant */}
        <EduBotAssistant />
        
        {/* Additional bot instance for dedicated section */}
        {showBot && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-lg">
            <div className="w-full max-w-5xl h-[85vh] bg-gradient-to-br from-white/95 to-gray-50/95 dark:from-gray-900/95 dark:to-black/95 rounded-3xl shadow-2xl overflow-hidden border border-gray-200/50 dark:border-gray-700/50 backdrop-blur-xl">
              <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-6 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white/20 rounded-full">
                    <Bot className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-semibold text-white">Neutrino AI</h2>
                    <p className="text-purple-100 text-sm">Your intelligent chemistry companion</p>
                  </div>
                </div>
                <Button
                  onClick={() => setShowBot(false)}
                  variant="ghost"
                  size="sm"
                  className="text-white hover:bg-white/10 rounded-full p-2"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>
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
            </div>
          </div>
        )}
      </div>
    </DndProvider>
  );
};

export default Index;
