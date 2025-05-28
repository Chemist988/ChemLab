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
import { Atom, Beaker, BookOpen, X } from 'lucide-react';
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
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-black dark:to-gray-800 transition-all duration-700">
        <div className="container mx-auto py-8 px-4">
          {/* Apple-inspired Header */}
          <header className="mb-16 flex flex-col items-center relative">
            <div className="absolute right-0 top-0">
              <ThemeSwitcher />
            </div>
            <div className="text-center space-y-6">
              <h1 className="text-6xl md:text-7xl font-thin tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-blue-800 to-purple-700 dark:from-white dark:via-blue-200 dark:to-purple-300">
                Interactive Chemistry
              </h1>
              <p className="text-xl font-light text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
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
          <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
            {/* Periodic Table - Larger and More Visible */}
            <div className="xl:col-span-3 bg-white/80 dark:bg-gray-900/80 rounded-3xl shadow-xl backdrop-blur-xl border border-gray-200/50 dark:border-gray-700/50 p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl font-thin text-gray-900 dark:text-white">Periodic Table</h2>
                <div className="text-sm text-gray-500 dark:text-gray-400">Click any element to explore</div>
              </div>
              {/* Zoomed out container for better visibility */}
              <div className="overflow-x-auto">
                <div className="min-w-[1200px] transform scale-90 origin-top-left">
                  <PeriodicTable onElementClick={handleElementClick} />
                </div>
              </div>
            </div>

            {/* Sidebar with Tabs */}
            <div className="bg-white/80 dark:bg-gray-900/80 rounded-3xl shadow-xl backdrop-blur-xl border border-gray-200/50 dark:border-gray-700/50 p-6">
              <Tabs defaultValue="reaction" className="h-full">
                <TabsList className="w-full mb-6 bg-gray-100/50 dark:bg-gray-800/50 rounded-2xl p-1">
                  <TabsTrigger value="reaction" className="flex-1 rounded-xl data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700">
                    <Beaker className="w-4 h-4 mr-2" />
                    Lab
                  </TabsTrigger>
                  <TabsTrigger value="info" className="flex-1 rounded-xl data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700">
                    <BookOpen className="w-4 h-4 mr-2" />
                    Guide
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="reaction" className="space-y-6 h-full">
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
                      
                      <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl border border-purple-200/50 dark:border-purple-700/50">
                        <h4 className="font-medium text-purple-700 dark:text-purple-300 mb-2">Need Help?</h4>
                        <p className="text-gray-600 dark:text-gray-400 text-xs mb-3">
                          Get instant help with chemistry concepts and NCERT questions
                        </p>
                        <Button 
                          onClick={() => setShowBot(true)}
                          className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-xl"
                          size="sm"
                        >
                          <Atom className="w-4 h-4 mr-2" />
                          Ask Neutrino
                        </Button>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
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
        
        {/* Additional bot instance for guide integration */}
        {showBot && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-lg">
            <div className="w-full max-w-5xl h-[85vh] bg-gradient-to-br from-white/95 to-gray-50/95 dark:from-gray-900/95 dark:to-black/95 rounded-3xl shadow-2xl overflow-hidden border border-gray-200/50 dark:border-gray-700/50 backdrop-blur-xl">
              <div className="bg-gradient-to-r from-gray-900 to-slate-800 p-6 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white/10 rounded-full">
                    <Atom className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-semibold text-white">Neutrino</h2>
                    <p className="text-gray-300 text-sm">Your intelligent chemistry companion</p>
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
