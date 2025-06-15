
import React, { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import PeriodicTable from '@/components/PeriodicTable';
import ReactionZone from '@/components/ReactionZone';
import ElementDetail from '@/components/ElementDetail';
import ChemistryNavBar from '@/components/ChemistryNavBar';
import EduBotAssistant from '@/components/EduBotAssistant';
import { Element } from '@/data/refactored-elements';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from '@/components/ui/separator';
import { Apple } from 'lucide-react';
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

  // Use a local state to remember which main dashboard tab is "active"
  const [dashboardSection, setDashboardSection] = useState("elements");

  // The main dashboard card: Elements, Reactions, Neutrino AI, Lab Guide as tabs
  return (
    <DndProvider backend={HTML5Backend}>
      {/* Gradient background */}
      <div className="min-h-screen w-full bg-gradient-to-br from-[#ffd6b0] via-[#feb47b] to-[#fd5e53] dark:from-[#0f172a] dark:via-[#3b0764] dark:to-[#fbbf24] relative transition-colors duration-700 pb-12">
        <ChemistryNavBar current={dashboardSection} onSelect={setDashboardSection} />
        {/* Top nav bar space */}
        <div className="h-16 w-full" />
        {/* Main white dashboard card */}
        <div className="container max-w-7xl mx-auto flex justify-center items-start px-1 md:px-6">
          <div className="w-full">
            <div className="mx-auto w-full max-w-6xl rounded-[2rem] shadow-2xl bg-white dark:bg-card border border-border mt-6 mb-6 p-0 overflow-hidden transition-all">
              <div className="w-full h-full p-0">
                {/* Headline - only visible in Elements tab */}
                {dashboardSection === "elements" && (
                  <header className="flex flex-col items-center pt-12 pb-4 px-4 text-center">
                    <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter text-gradient mb-2 select-none">
                      Chemistry Lab
                    </h1>
                    <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
                      Explore the periodic table, combine elements, and discover chemical reactions.
                    </p>
                  </header>
                )}
                <Tabs value={dashboardSection} onValueChange={setDashboardSection} className="w-full">
                  <TabsList className="mx-6 my-4 border border-muted bg-muted/20 rounded-full flex-center shadow-sm">
                    <TabsTrigger value="elements" className="flex-1 min-w-24 rounded-full data-[state=active]:bg-primary data-[state=active]:text-primary-foreground text-base font-medium">Elements</TabsTrigger>
                    <TabsTrigger value="reactions" className="flex-1 min-w-24 rounded-full data-[state=active]:bg-primary data-[state=active]:text-primary-foreground text-base font-medium">Reactions</TabsTrigger>
                    <TabsTrigger value="assistant" className="flex-1 min-w-28 rounded-full data-[state=active]:bg-primary data-[state=active]:text-primary-foreground text-base font-medium">AI Assistant</TabsTrigger>
                    <TabsTrigger value="guide" className="flex-1 min-w-24 rounded-full data-[state=active]:bg-primary data-[state=active]:text-primary-foreground text-base font-medium">Lab Guide</TabsTrigger>
                  </TabsList>

                  {/* Periodic Table */}
                  <TabsContent value="elements" className="px-8 pb-12 pt-2">
                    <div className="bg-card rounded-2xl border border-border shadow-inner py-10 px-2 md:px-8">
                      <h2 className="text-3xl font-light text-foreground mb-3 text-center">
                        Periodic Table
                      </h2>
                      <div className="text-center text-sm text-muted-foreground mb-4">Click an element to explore</div>
                      <PeriodicTable onElementClick={handleElementClick} />
                    </div>
                  </TabsContent>

                  {/* Reaction Simulator */}
                  <TabsContent value="reactions" className="px-8 pb-12 pt-2">
                    <div className="bg-card rounded-2xl border border-border shadow-inner px-2 md:px-10 py-10 min-h-[32rem]">
                      <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-4 text-center">Reaction Simulator</h2>
                      <ReactionZone onElementClick={handleElementClick} />
                    </div>
                  </TabsContent>

                  {/* AI Assistant */}
                  <TabsContent value="assistant" className="px-8 pb-12 pt-2">
                    <div className="bg-card rounded-2xl border border-border shadow-inner p-6 w-full flex flex-col items-center">
                      <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-4 text-center flex items-center justify-center gap-2">
                        <Apple className="w-7 h-7 text-primary mb-1" />
                        Neutrino AI – Chemistry Assistant
                      </h2>
                      <p className="text-muted-foreground text-base mb-6 max-w-md text-center">
                        Your intelligent chemistry companion. Get instant help with reactions, molecular structures, and complex concepts.
                      </p>
                      <Button 
                        onClick={() => setShowBot(true)}
                        size="lg"
                        className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold px-6 rounded-full text-base mx-auto"
                      >
                        Launch Assistant
                      </Button>
                    </div>
                  </TabsContent>

                  {/* Lab Guide */}
                  <TabsContent value="guide" className="px-8 pb-12 pt-2">
                    <div className="bg-card rounded-2xl border border-border shadow-inner p-8 w-full">
                      <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-4 text-center">Lab Guide</h2>
                      <Separator className="mb-6" />
                      <div className="space-y-4 text-sm max-w-3xl mx-auto">
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
