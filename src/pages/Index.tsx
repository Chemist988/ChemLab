
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
import { Apple, Beaker, BookOpen, Bot } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/hooks/use-theme';

const Index = () => {
  const [selectedElement, setSelectedElement] = useState<Element | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);
  const [showBot, setShowBot] = useState(false);
  const { theme } = useTheme();

  const handleElementClick = (element: Element) => {
    setSelectedElement(element);
    setDetailOpen(true);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="min-h-screen bg-background transition-colors duration-500">
        <div className="relative container mx-auto py-12 px-4 z-10">
          <header className="mb-20 flex flex-col items-center relative text-center">
            <div className="absolute right-0 top-0">
              <ThemeSwitcher />
            </div>
            <div className="space-y-4">
              <h1 className="text-6xl md:text-8xl font-bold tracking-tighter text-gradient">
                Chemistry Lab
              </h1>
              <p className="text-xl font-normal text-muted-foreground max-w-2xl mx-auto">
                Explore the periodic table, combine elements, and discover chemical reactions.
              </p>
            </div>
          </header>

          <section className="mb-20 bg-card rounded-2xl p-8 md:p-12 border border-border">
            <div className="text-center max-w-3xl mx-auto">
              <div className="flex items-center justify-center mb-6">
                <Apple className="w-12 h-12 text-foreground" />
              </div>
              
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                Meet Neutrino AI
              </h2>
              
              <p className="text-lg text-muted-foreground mb-8">
                Your intelligent chemistry companion. Get instant help with reactions, 
                molecular structures, and complex concepts.
              </p>
              
              <Button 
                onClick={() => setShowBot(true)}
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold px-6 rounded-full text-base"
              >
                Launch Assistant
              </Button>
            </div>
          </section>

          <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
            <div className="xl:col-span-3 bg-card rounded-2xl shadow-sm border border-border p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl font-light text-foreground">Periodic Table</h2>
                <div className="text-sm text-muted-foreground">Click an element to explore</div>
              </div>
              <PeriodicTable onElementClick={handleElementClick} />
            </div>

            <div className="bg-card rounded-2xl shadow-sm border border-border p-6">
              <Tabs defaultValue="reaction" className="h-full">
                <TabsList className="w-full mb-6 bg-background rounded-2xl p-1 border">
                  <TabsTrigger value="reaction" className="flex-1 rounded-xl data-[state=active]:bg-secondary data-[state=active]:text-secondary-foreground data-[state=active]:shadow-inner">
                    <Beaker className="w-4 h-4 mr-2" />
                    Lab
                  </TabsTrigger>
                  <TabsTrigger value="info" className="flex-1 rounded-xl data-[state=active]:bg-secondary data-[state=active]:text-secondary-foreground data-[state=active]:shadow-inner">
                    <BookOpen className="w-4 h-4 mr-2" />
                    Guide
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="reaction" className="space-y-6 h-full">
                  <div>
                    <h3 className="text-xl font-medium mb-2 text-foreground">Reaction Simulator</h3>
                    <p className="text-muted-foreground text-sm mb-4">
                      Drag and drop elements to simulate chemical reactions
                    </p>
                  </div>
                  <Separator />
                  <ReactionZone onElementClick={handleElementClick} />
                </TabsContent>
                
                <TabsContent value="info" className="space-y-6">
                   <div>
                    <h3 className="text-xl font-medium mb-4 text-foreground">How to Use</h3>
                    <div className="space-y-4 text-sm">
                      <div className="p-4 bg-background rounded-xl border">
                        <h4 className="font-medium text-primary mb-2">Getting Started</h4>
                        <ul className="space-y-1 text-muted-foreground">
                          <li>• Click any element for detailed information</li>
                          <li>• Drag elements to the reaction zone</li>
                          <li>• Watch chemical reactions come to life</li>
                        </ul>
                      </div>
                      
                      <div className="p-4 bg-background rounded-xl border">
                        <h4 className="font-medium text-primary mb-2">Popular Reactions</h4>
                        <ul className="space-y-1 text-muted-foreground text-xs">
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
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-md">
            <div className="w-full max-w-5xl h-[85vh] bg-card rounded-2xl shadow-2xl overflow-hidden border border-border">
              <div className="bg-secondary p-4 flex items-center justify-between border-b">
                <div className="flex items-center gap-3">
                  <Apple className="w-6 h-6 text-foreground" />
                  <div>
                    <h2 className="text-xl font-semibold text-foreground">Neutrino AI</h2>
                    <p className="text-muted-foreground text-sm">Your chemistry assistant.</p>
                  </div>
                </div>
                <Button
                  onClick={() => setShowBot(false)}
                  variant="ghost"
                  size="icon"
                  className="text-muted-foreground hover:bg-secondary/80 rounded-full"
                >
                  <span className="text-2xl font-light">×</span>
                </Button>
              </div>
              <div className="h-[calc(100%-73px)] bg-background p-2">
                <div className="w-full h-full bg-background rounded-2xl shadow-inner overflow-hidden border">
                  <iframe
                    src="https://www.chatbase.co/chatbot-iframe/COwMkAjIYb1meY0saCFK1"
                    allow="clipboard-write; microphone;"
                    className="w-full h-full border-none"
                    title="Neutrino AI Assistant"
                    style={theme === 'dark' ? { filter: 'invert(0.9) hue-rotate(180deg)' } : {}}
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
