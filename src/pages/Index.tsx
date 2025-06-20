
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
import { Atom, Beaker, BookOpen, Bot, Sparkles, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

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
      <>
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-indigo-900">
          <div className="container mx-auto py-8 px-4">
            {/* Liquid Glass Header */}
            <header className="mb-16 flex flex-col items-center relative">
              <div className="text-center space-y-8">
                {/* Frosted glass background */}
                <div className="absolute inset-0 bg-white/10 dark:bg-black/10 backdrop-blur-3xl rounded-[3rem] border border-white/20 dark:border-white/10 shadow-2xl -z-10 transform -rotate-1"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-white/5 dark:from-white/10 dark:to-white/5 backdrop-blur-2xl rounded-[3rem] border border-white/30 dark:border-white/20 shadow-xl -z-10 transform rotate-1"></div>
                
                <div className="relative z-10 py-12 px-8">
                  <h1 className="text-7xl md:text-8xl font-bold tracking-tight bg-gradient-to-br from-slate-900 via-blue-800 to-indigo-900 dark:from-white dark:via-blue-200 dark:to-indigo-200 bg-clip-text text-transparent font-orbitron drop-shadow-2xl">
                    ChemLab
                  </h1>
                  <p className="text-xl font-light text-slate-700 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed mt-6">
                    An interactive chemistry playground with liquid glass aesthetics. 
                    Drag elements, simulate reactions, and discover molecular beauty.
                  </p>
                  <div className="flex items-center justify-center gap-3 text-sm text-slate-500 dark:text-slate-400 mt-4">
                    <div className="flex items-center gap-2 px-4 py-2 bg-white/30 dark:bg-black/20 backdrop-blur-lg rounded-full border border-white/40 dark:border-white/20">
                      <Atom className="w-4 h-4" />
                      <span>118 Elements</span>
                    </div>
                    <div className="flex items-center gap-2 px-4 py-2 bg-white/30 dark:bg-black/20 backdrop-blur-lg rounded-full border border-white/40 dark:border-white/20">
                      <Sparkles className="w-4 h-4" />
                      <span>Unlimited Reactions</span>
                    </div>
                  </div>
                </div>
              </div>
            </header>

            {/* HeisenBot Section - Liquid Glass Card */}
            <section className="mb-12 relative">
              <div className="relative overflow-hidden rounded-[2rem] border border-white/30 dark:border-white/20 shadow-2xl">
                {/* Animated gradient background */}
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/20 via-teal-500/20 to-cyan-500/20 dark:from-emerald-600/20 dark:via-teal-700/20 dark:to-cyan-700/20"></div>
                <div className="absolute inset-0 bg-white/40 dark:bg-black/40 backdrop-blur-2xl"></div>
                
                {/* Floating orbs */}
                <div className="absolute top-8 left-8 w-32 h-32 bg-gradient-to-br from-white/30 to-emerald-200/30 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-8 right-8 w-24 h-24 bg-gradient-to-br from-teal-200/40 to-cyan-300/40 rounded-full blur-2xl animate-pulse delay-1000"></div>
                <div className="absolute top-1/2 left-1/3 w-20 h-20 bg-gradient-to-br from-blue-200/30 to-indigo-300/30 rounded-full blur-xl animate-pulse delay-500"></div>
                
                <div className="relative z-10 p-12 text-center">
                  <div className="flex items-center justify-center mb-6">
                    <div className="p-4 bg-white/20 dark:bg-black/20 backdrop-blur-lg rounded-2xl border border-white/30 dark:border-white/20 shadow-lg">
                      <Bot className="w-12 h-12 text-emerald-600 dark:text-emerald-400" />
                    </div>
                  </div>
                  
                  <h2 className="text-4xl md:text-5xl font-bold text-slate-800 dark:text-white mb-4 font-orbitron">
                    Meet HeisenBot
                  </h2>
                  
                  <p className="text-lg text-slate-600 dark:text-slate-300 mb-2 font-medium">
                    Precision meets intuition.
                  </p>
                  
                  <p className="text-base text-slate-500 dark:text-slate-400 mb-8 max-w-2xl mx-auto leading-relaxed">
                    Your intelligent chemistry companion powered by liquid glass UI. 
                    Get instant help through natural conversation.
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <Button 
                      onClick={() => navigate('/analytics')}
                      size="lg"
                      className="bg-white/80 hover:bg-white/90 dark:bg-black/60 dark:hover:bg-black/70 text-emerald-600 dark:text-emerald-400 font-semibold px-8 py-4 rounded-2xl transition-all duration-500 transform hover:scale-105 shadow-xl backdrop-blur-lg border border-white/40 dark:border-white/20 hover:shadow-2xl"
                    >
                      <Sparkles className="w-5 h-5 mr-2" />
                      Chat with HeisenBot
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                    
                    <div className="flex items-center gap-2 px-4 py-2 bg-white/20 dark:bg-black/20 backdrop-blur-lg rounded-full border border-white/30 dark:border-white/20">
                      <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                      <span className="text-slate-600 dark:text-slate-300 text-sm font-medium">24/7 Available</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Main Content - Liquid Glass Layout */}
            <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
              {/* Periodic Table - Frosted Glass Container */}
              <div className="xl:col-span-3 relative">
                <div className="absolute inset-0 bg-white/40 dark:bg-black/30 backdrop-blur-2xl rounded-[2rem] border border-white/30 dark:border-white/20 shadow-2xl"></div>
                <div className="relative z-10 p-10">
                  <div className="flex items-center justify-between mb-8">
                    <h2 className="text-3xl font-light text-slate-800 dark:text-white font-orbitron">Periodic Table</h2>
                    <div className="text-sm text-slate-500 dark:text-slate-400 px-4 py-2 bg-white/30 dark:bg-black/20 backdrop-blur-lg rounded-full border border-white/40 dark:border-white/20">
                      Click any element to explore
                    </div>
                  </div>
                  <PeriodicTable onElementClick={handleElementClick} />
                </div>
              </div>

              {/* Sidebar - Liquid Glass Tabs */}
              <div className="relative">
                <div className="absolute inset-0 bg-white/40 dark:bg-black/30 backdrop-blur-2xl rounded-[2rem] border border-white/30 dark:border-white/20 shadow-2xl"></div>
                <div className="relative z-10 p-8">
                  <Tabs defaultValue="reaction" className="h-full">
                    <TabsList className="w-full mb-8 bg-white/20 dark:bg-black/20 backdrop-blur-lg rounded-2xl p-1 border border-white/30 dark:border-white/20">
                      <TabsTrigger 
                        value="reaction" 
                        className="flex-1 rounded-xl data-[state=active]:bg-white/80 dark:data-[state=active]:bg-black/60 data-[state=active]:backdrop-blur-lg data-[state=active]:shadow-lg transition-all duration-300"
                      >
                        <Beaker className="w-4 h-4 mr-2" />
                        Lab
                      </TabsTrigger>
                      <TabsTrigger 
                        value="info" 
                        className="flex-1 rounded-xl data-[state=active]:bg-white/80 dark:data-[state=active]:bg-black/60 data-[state=active]:backdrop-blur-lg data-[state=active]:shadow-lg transition-all duration-300"
                      >
                        <BookOpen className="w-4 h-4 mr-2" />
                        Guide
                      </TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="reaction" className="space-y-6 h-full">
                      <div>
                        <h3 className="text-xl font-medium mb-2 font-orbitron text-slate-800 dark:text-white">Reaction Simulator</h3>
                        <p className="text-slate-600 dark:text-slate-400 text-sm mb-4">
                          Drag and drop elements to simulate chemical reactions
                        </p>
                      </div>
                      <div className="h-px bg-gradient-to-r from-transparent via-white/40 dark:via-white/20 to-transparent"></div>
                      <ReactionZone onElementClick={handleElementClick} />
                    </TabsContent>
                    
                    <TabsContent value="info" className="space-y-6">
                      <div>
                        <h3 className="text-xl font-medium mb-4 font-orbitron text-slate-800 dark:text-white">How to Use</h3>
                        <div className="space-y-4 text-sm">
                          <div className="p-5 bg-white/30 dark:bg-black/20 backdrop-blur-lg rounded-2xl border border-white/40 dark:border-white/20 shadow-lg">
                            <h4 className="font-medium text-blue-700 dark:text-blue-300 mb-3">Getting Started</h4>
                            <ul className="space-y-2 text-slate-600 dark:text-slate-400">
                              <li className="flex items-start gap-2">
                                <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                                <span>Click any element for detailed information</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                                <span>Drag elements to the reaction zone</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                                <span>Watch chemical reactions come to life</span>
                              </li>
                            </ul>
                          </div>
                          
                          <div className="p-5 bg-white/30 dark:bg-black/20 backdrop-blur-lg rounded-2xl border border-white/40 dark:border-white/20 shadow-lg">
                            <h4 className="font-medium text-emerald-700 dark:text-emerald-300 mb-3">Popular Reactions</h4>
                            <ul className="space-y-2 text-slate-600 dark:text-slate-400 text-xs">
                              <li className="flex items-center gap-2">
                                <span className="font-mono bg-white/40 dark:bg-black/30 px-2 py-1 rounded">H + O</span>
                                <span>→ Water formation</span>
                              </li>
                              <li className="flex items-center gap-2">
                                <span className="font-mono bg-white/40 dark:bg-black/30 px-2 py-1 rounded">Na + Cl</span>
                                <span>→ Salt formation</span>
                              </li>
                              <li className="flex items-center gap-2">
                                <span className="font-mono bg-white/40 dark:bg-black/30 px-2 py-1 rounded">Fe + O</span>
                                <span>→ Rust formation</span>
                              </li>
                              <li className="flex items-center gap-2">
                                <span className="font-mono bg-white/40 dark:bg-black/30 px-2 py-1 rounded">Mg + O</span>
                                <span>→ Combustion</span>
                              </li>
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
        </div>
        
        <ElementDetail 
          element={selectedElement} 
          isOpen={detailOpen} 
          onClose={() => setDetailOpen(false)}
        />
        
        <EduBotAssistant />
      </>
    </DndProvider>
  );
};

export default Index;
