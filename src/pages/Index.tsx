
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
import { Atom, Beaker, BookOpen, Bot, Sparkles, ArrowRight } from 'lucide-react';
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
      <div className="min-h-screen bg-background transition-all duration-700">
        {/* Background glow effects */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-[10%] left-[10%] w-[500px] h-[500px] bg-bb-green/10 rounded-full blur-[100px] animate-[pulse_8s_cubic-bezier(0.4,0,0.6,1)_infinite]"></div>
          <div className="absolute bottom-[5%] right-[5%] w-[400px] h-[400px] bg-bb-blue/10 rounded-full blur-[100px] animate-[pulse_10s_cubic-bezier(0.4,0,0.6,1)_infinite_2s]"></div>
        </div>
      
        <div className="relative container mx-auto py-8 px-4 z-10">
          <header className="mb-24 flex flex-col items-center relative">
            <div className="absolute right-0 top-0">
              <ThemeSwitcher />
            </div>
            <div className="text-center space-y-4">
              <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-glow bg-clip-text text-transparent bg-gradient-to-br from-white via-neutral-300 to-white">
                Heisenberg's Lab
              </h1>
              <p className="text-xl font-light text-neutral-400 max-w-2xl mx-auto">
                Time to cook. Drag elements, simulate reactions, and build your chemical empire.
              </p>
            </div>
          </header>

          <section className="mb-24 relative card-border-glow rounded-3xl">
            <div className="bg-card/80 backdrop-blur-xl rounded-3xl p-12 relative z-10">
              <div className="relative z-10 text-center">
                <div className="flex items-center justify-center mb-6">
                  <div className="p-3 rounded-full bg-gradient-to-br from-bb-green/20 to-bb-blue/20">
                    <div className="p-3 rounded-full bg-card">
                      <Bot className="w-12 h-12 text-glow" style={{'--glow': 'hsl(var(--bb-blue))'} as React.CSSProperties} />
                    </div>
                  </div>
                </div>
                
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 text-glow" style={{'--glow': 'hsl(var(--bb-green))'} as React.CSSProperties}>
                  Meet Neutrino AI
                </h2>
                
                <p className="text-lg text-neutral-300 mb-8 max-w-2xl mx-auto">
                  Your intelligent chemistry companion for NCERT Class 10. Get instant help with reactions, 
                  molecular structures, and complex chemistry concepts through natural conversation.
                </p>
                
                <Button 
                  onClick={() => setShowBot(true)}
                  size="lg"
                  className="bg-white text-black hover:bg-neutral-200 font-bold px-8 py-3 rounded-full transition-all duration-300 transform hover:scale-105 shadow-[0_0_20px_hsl(var(--primary)/0.5)]"
                >
                  <Sparkles className="w-5 h-5 mr-2" />
                  Start Exploring
                </Button>
              </div>
            </div>
          </section>

          <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
            <div className="xl:col-span-3 bg-card/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/10 p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl font-thin text-white">Periodic Table</h2>
                <div className="text-sm text-neutral-400">Click any element to explore</div>
              </div>
              <PeriodicTable onElementClick={handleElementClick} />
            </div>

            <div className="bg-card/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/10 p-6">
              <Tabs defaultValue="reaction" className="h-full">
                <TabsList className="w-full mb-6 bg-card rounded-2xl p-1">
                  <TabsTrigger value="reaction" className="flex-1 rounded-xl data-[state=active]:bg-background">
                    <Beaker className="w-4 h-4 mr-2" />
                    Lab
                  </TabsTrigger>
                  <TabsTrigger value="info" className="flex-1 rounded-xl data-[state=active]:bg-background">
                    <BookOpen className="w-4 h-4 mr-2" />
                    Guide
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="reaction" className="space-y-6 h-full">
                  <div>
                    <h3 className="text-xl font-medium mb-2">Reaction Simulator</h3>
                    <p className="text-neutral-400 text-sm mb-4">
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
                      <div className="p-4 bg-background/50 rounded-xl border border-white/10">
                        <h4 className="font-medium text-primary mb-2">Getting Started</h4>
                        <ul className="space-y-1 text-neutral-400">
                          <li>• Click any element for detailed information</li>
                          <li>• Drag elements to the reaction zone</li>
                          <li>• Watch chemical reactions come to life</li>
                        </ul>
                      </div>
                      
                      <div className="p-4 bg-background/50 rounded-xl border border-white/10">
                        <h4 className="font-medium text-primary mb-2">Popular Reactions</h4>
                        <ul className="space-y-1 text-neutral-400 text-xs">
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
        
        <EduBotAssistant />
        
        {showBot && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-lg">
            <div className="w-full max-w-5xl h-[85vh] bg-card/80 rounded-3xl shadow-2xl overflow-hidden border border-white/10 backdrop-blur-xl">
              <div className="bg-gradient-to-r from-bb-green to-bb-blue p-6 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white/10 rounded-full">
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
                  className="text-white hover:bg-white/10 rounded-full p-2"
                >
                  ×
                </Button>
              </div>
              <div className="h-[calc(100%-92px)] bg-background/90 p-4">
                <div className="w-full h-full bg-background rounded-2xl shadow-lg overflow-hidden border border-border">
                  <iframe
                    src="https://www.chatbase.co/chatbot-iframe/COwMkAjIYb1meY0saCFK1"
                    allow="clipboard-write; microphone;"
                    className="w-full h-full border-none"
                    title="Neutrino AI Assistant"
                    style={{ filter: 'invert(0.9) hue-rotate(180deg)' }}
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
