
import React, { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useNavigate } from 'react-router-dom';
import PeriodicTable from '@/components/PeriodicTable';
import ReactionZone from '@/components/ReactionZone';
import ElementDetail from '@/components/ElementDetail';
import EduBotAssistant from '@/components/EduBotAssistant';
import { Element } from '@/data/elements';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Atom, Beaker, BookOpen, Bot, ArrowRight, Calculator, Brain, Sparkles, Zap, FlaskConical } from 'lucide-react';

const Index = () => {
  const [selectedElement, setSelectedElement] = useState<Element | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);
  const navigate = useNavigate();

  const handleElementClick = (element: Element) => {
    setSelectedElement(element);
    setDetailOpen(true);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="relative">
        {/* Main Content - Periodic Table and Reaction Lab First */}
        <section className="relative min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&h=800&fit=crop')] bg-cover bg-center"></div>
            <div className="absolute inset-0 bg-gradient-to-br from-slate-900/80 via-purple-900/80 to-slate-900/80"></div>
          </div>
          
          <div className="container mx-auto py-8 px-4 relative z-10">
            {/* Compact Header */}
            <header className="mb-8 flex flex-col items-center text-center">
              <div className="space-y-4 max-w-4xl mx-auto">
                <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-white font-orbitron drop-shadow-2xl">
                  ChemLab
                </h1>
                <p className="text-lg font-light text-gray-300 max-w-2xl mx-auto leading-relaxed">
                  Interactive chemistry lab for exploring elements and reactions
                </p>
              </div>
            </header>

            {/* Main Content Grid - PT and Lab First */}
            <div className="grid grid-cols-1 xl:grid-cols-4 gap-8 mb-12">
              {/* Periodic Table */}
              <div className="xl:col-span-3 bg-white/95 dark:bg-gray-900/95 rounded-3xl shadow-2xl backdrop-blur-xl border border-gray-200/50 dark:border-gray-700/50 p-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-3xl font-thin text-gray-900 dark:text-white font-orbitron">Periodic Table</h2>
                  <div className="text-sm text-gray-500 dark:text-gray-400">Click any element to explore</div>
                </div>
                <PeriodicTable onElementClick={handleElementClick} />
              </div>

              {/* Sidebar with Lab Tools */}
              <div className="bg-white/95 dark:bg-gray-900/95 rounded-3xl shadow-2xl backdrop-blur-xl border border-gray-200/50 dark:border-gray-700/50 p-6">
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
                      <h3 className="text-xl font-medium mb-2 font-orbitron">Reaction Lab</h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                        Drag elements to simulate reactions
                      </p>
                    </div>
                    <Separator />
                    <ReactionZone onElementClick={handleElementClick} />
                  </TabsContent>
                  
                  <TabsContent value="info" className="space-y-6">
                    <div>
                      <h3 className="text-xl font-medium mb-4 font-orbitron">How to Use</h3>
                      <div className="space-y-4 text-sm">
                        <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl border border-blue-200/50 dark:border-blue-700/50">
                          <h4 className="font-medium text-blue-700 dark:text-blue-300 mb-2">Getting Started</h4>
                          <ul className="space-y-1 text-gray-600 dark:text-gray-400">
                            <li>• Click elements for detailed information</li>
                            <li>• Drag elements to the reaction zone</li>
                            <li>• Click compounds in suggestions to add them</li>
                          </ul>
                        </div>
                        
                        <div className="p-4 bg-gradient-to-r from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-green-900/20 rounded-xl border border-emerald-200/50 dark:border-emerald-700/50">
                          <h4 className="font-medium text-emerald-700 dark:text-emerald-300 mb-2">Common Reactions</h4>
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

            {/* Enhanced AI Assistant Section */}
            <div className="bg-gradient-to-r from-emerald-900/20 via-teal-900/20 to-cyan-900/20 rounded-3xl shadow-2xl backdrop-blur-xl border border-emerald-200/30 dark:border-emerald-700/30 p-8 mb-12">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
                <div className="lg:col-span-2 space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center shadow-xl">
                        <Brain className="w-8 h-8 text-white" />
                      </div>
                      <div className="absolute -top-1 -right-1 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center animate-pulse">
                        <Sparkles className="w-3 h-3 text-yellow-900" />
                      </div>
                    </div>
                    <div>
                      <h2 className="text-3xl font-bold text-white mb-2">AI Chemistry Assistant</h2>
                      <p className="text-emerald-200">Get instant help with reactions, formulas, and concepts</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm border border-white/20">
                      <div className="flex items-center gap-2 mb-2">
                        <Zap className="w-4 h-4 text-yellow-400" />
                        <span className="text-sm font-medium text-white">Reaction Predictions</span>
                      </div>
                      <p className="text-xs text-gray-300">Predict outcomes of chemical reactions</p>
                    </div>
                    
                    <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm border border-white/20">
                      <div className="flex items-center gap-2 mb-2">
                        <FlaskConical className="w-4 h-4 text-blue-400" />
                        <span className="text-sm font-medium text-white">Formula Help</span>
                      </div>
                      <p className="text-xs text-gray-300">Assistance with molecular formulas</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col items-center space-y-4">
                  <Button 
                    onClick={() => navigate('/analytics')}
                    className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white hover:from-emerald-700 hover:to-teal-700 w-full py-6 text-lg font-semibold rounded-2xl shadow-xl transform hover:scale-105 transition-all duration-200"
                  >
                    <Bot className="w-5 h-5 mr-2" />
                    Start Chat
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                  
                  <Button 
                    onClick={() => navigate('/formula-builder')}
                    variant="outline"
                    className="bg-white/10 text-white border-white/30 hover:bg-white/20 w-full rounded-xl backdrop-blur-sm"
                  >
                    <Calculator className="w-4 h-4 mr-2" />
                    Formula Builder
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

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
