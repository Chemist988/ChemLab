
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
        <div className="container mx-auto py-8 px-4">
          {/* Liquid Glass Header */}
          <header className="mb-16 flex flex-col items-center relative">
            <div className="text-center space-y-6 liquid-glass-container">
              <h1 className="text-6xl md:text-7xl font-bold tracking-tight text-white font-orbitron drop-shadow-2xl liquid-glass-text">
                ChemLab
              </h1>
              <p className="text-xl font-light text-gray-300 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed liquid-glass-surface">
                An interactive chemistry playground. Drag elements, simulate reactions, 
                and discover the building blocks of our world with stunning visualizations.
              </p>
              <div className="flex items-center justify-center gap-2 text-sm text-gray-400 dark:text-gray-400 liquid-glass-accent">
                <Atom className="w-4 h-4 liquid-glass-icon" />
                <span>118 Elements • Unlimited Possibilities</span>
              </div>
            </div>
          </header>

          {/* Liquid Glass HeisenBot Section */}
          <section className="mb-12 relative overflow-hidden">
            <div className="liquid-glass-card liquid-glass-gradient p-8 relative caustics-overlay">
              {/* Refractive background pattern */}
              <div className="absolute inset-0 opacity-30 refractive-pattern">
                <div className="absolute top-10 left-10 w-32 h-32 liquid-glass-orb rainbow-refraction"></div>
                <div className="absolute bottom-10 right-10 w-24 h-24 liquid-glass-orb caustic-light"></div>
                <div className="absolute top-1/2 left-1/3 w-20 h-20 liquid-glass-orb prismatic-effect"></div>
              </div>
              
              <div className="relative z-10 text-center liquid-glass-content">
                <div className="flex items-center justify-center mb-4">
                  <div className="p-3 liquid-glass-icon-container backdrop-blur-sm raytraced-surface">
                    <Bot className="w-10 h-10 text-white liquid-glass-icon" />
                  </div>
                </div>
                
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-3 liquid-glass-heading">
                  Meet HeisenBot
                </h2>
                
                <p className="text-lg text-white/90 mb-1 font-medium liquid-glass-text">
                  Precision meets intuition.
                </p>
                
                <p className="text-base text-white/80 mb-6 max-w-2xl mx-auto leading-relaxed liquid-glass-description">
                  Your intelligent chemistry companion. Get instant help with reactions, 
                  molecular structures, and complex chemistry concepts through natural conversation.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <Button 
                    onClick={() => navigate('/analytics')}
                    size="lg"
                    className="liquid-glass-button font-semibold px-8 py-3 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg neon-glow-primary caustic-button"
                  >
                    <Sparkles className="w-5 h-5 mr-2 liquid-glass-sparkle" />
                    Chat with HeisenBot
                    <ArrowRight className="w-5 h-5 ml-2 liquid-glass-arrow" />
                  </Button>
                  
                  <div className="flex items-center gap-4 text-white/80 text-sm liquid-glass-status">
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 liquid-glass-dot rounded-full"></div>
                      <span>24/7 Available</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Liquid Glass Main Content Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
            {/* Periodic Table - Liquid Glass Enhanced */}
            <div className="xl:col-span-3 liquid-glass-panel rounded-3xl shadow-xl backdrop-blur-xl border border-gray-200/50 dark:border-gray-700/50 p-8 refractive-surface">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl font-thin text-gray-900 dark:text-white font-orbitron liquid-glass-title">Periodic Table</h2>
                <div className="text-sm text-gray-500 dark:text-gray-400 liquid-glass-hint">Click any element to explore</div>
              </div>
              <div className="liquid-glass-table-container">
                <PeriodicTable onElementClick={handleElementClick} />
              </div>
            </div>

            {/* Liquid Glass Sidebar */}
            <div className="liquid-glass-panel rounded-3xl shadow-xl backdrop-blur-xl border border-gray-200/50 dark:border-gray-700/50 p-6 prismatic-sidebar">
              <Tabs defaultValue="reaction" className="h-full">
                <TabsList className="w-full mb-6 liquid-glass-tabs rounded-2xl p-1">
                  <TabsTrigger value="reaction" className="flex-1 rounded-xl liquid-glass-tab data-[state=active]:liquid-glass-tab-active">
                    <Beaker className="w-4 h-4 mr-2 liquid-glass-icon" />
                    Lab
                  </TabsTrigger>
                  <TabsTrigger value="info" className="flex-1 rounded-xl liquid-glass-tab data-[state=active]:liquid-glass-tab-active">
                    <BookOpen className="w-4 h-4 mr-2 liquid-glass-icon" />
                    Guide
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="reaction" className="space-y-6 h-full">
                  <div className="liquid-glass-section">
                    <h3 className="text-xl font-medium mb-2 font-orbitron liquid-glass-heading">Reaction Simulator</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 liquid-glass-text">
                      Drag and drop elements to simulate chemical reactions
                    </p>
                  </div>
                  <Separator className="liquid-glass-separator" />
                  <div className="liquid-glass-reaction-zone">
                    <ReactionZone onElementClick={handleElementClick} />
                  </div>
                </TabsContent>
                
                <TabsContent value="info" className="space-y-6">
                  <div className="liquid-glass-info">
                    <h3 className="text-xl font-medium mb-4 font-orbitron liquid-glass-heading">How to Use</h3>
                    <div className="space-y-4 text-sm">
                      <div className="liquid-glass-info-card p-4 rounded-xl border border-blue-200/50 dark:border-blue-700/50 refractive-info">
                        <h4 className="font-medium text-blue-700 dark:text-blue-300 mb-2 liquid-glass-info-title">Getting Started</h4>
                        <ul className="space-y-1 text-gray-600 dark:text-gray-400 liquid-glass-list">
                          <li>• Click any element for detailed information</li>
                          <li>• Drag elements to the reaction zone</li>
                          <li>• Watch chemical reactions come to life</li>
                        </ul>
                      </div>
                      
                      <div className="liquid-glass-info-card p-4 rounded-xl border border-emerald-200/50 dark:border-emerald-700/50 refractive-info">
                        <h4 className="font-medium text-emerald-700 dark:text-emerald-300 mb-2 liquid-glass-info-title">Popular Reactions</h4>
                        <ul className="space-y-1 text-gray-600 dark:text-gray-400 text-xs liquid-glass-list">
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
        
        <ElementDetail 
          element={selectedElement} 
          isOpen={detailOpen} 
          onClose={() => setDetailOpen(false)}
        />
        
        {/* Liquid Glass HeisenBot AI Assistant */}
        <div className="liquid-glass-assistant">
          <EduBotAssistant />
        </div>
        
      </>
    </DndProvider>
  );
};

export default Index;
