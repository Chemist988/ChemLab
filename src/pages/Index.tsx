
import React, { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useNavigate } from 'react-router-dom';
import PeriodicTable from '@/components/PeriodicTable';
import ReactionZone from '@/components/ReactionZone';
import ElementDetail from '@/components/ElementDetail';

import { Element } from '@/data/elements';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Atom, Beaker, Bot, ArrowRight, Brain, FlaskConical, Flame, Zap, Hexagon } from 'lucide-react';

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
      <div className="relative min-h-screen">
        {/* Hero Section with Breaking Bad atmosphere */}
        <section className="relative overflow-hidden bg-gradient-to-br from-background via-background/95 to-background/90">
          {/* Chemistry Lab Background */}
          <div 
            className="absolute inset-0 opacity-8"
            style={{
              backgroundImage: `url('/lovable-uploads/5cb5a96f-bf4c-426a-8e1f-c6a488b53379.png')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
          
          {/* Background pattern with Breaking Bad vibes */}
          <div className="absolute inset-0 opacity-20">
            <div 
              className="w-full h-full"
              style={{
                backgroundImage: `
                  radial-gradient(circle at 20% 80%, hsl(var(--primary) / 0.1) 0%, transparent 50%),
                  radial-gradient(circle at 80% 20%, hsl(var(--primary) / 0.08) 0%, transparent 50%),
                  radial-gradient(circle at 40% 40%, hsl(var(--primary) / 0.05) 0%, transparent 60%)
                `,
              }}
            />
          </div>
          
          <div className="container mx-auto py-12 px-4 relative z-10">
            {/* Hero Header with Breaking Bad styling */}
            <header className="mb-12 text-center">
              <div className="space-y-6 max-w-4xl mx-auto">
                <div className="flex items-center justify-center gap-4 mb-6">
                  <h1 className="text-5xl md:text-6xl font-black tracking-tight font-orbitron text-primary">
                    ChemLab
                  </h1>
                </div>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                  Interactive Chemistry Laboratory - Explore molecular interactions
                </p>
                
                {/* Breaking Bad inspired stats - centered */}
                <div className="flex justify-center items-center gap-8 mt-8">
                  <div className="text-center glass-effect px-4 py-3 rounded-xl border border-primary/50">
                    <div className="text-xl font-bold text-primary">118</div>
                    <div className="text-xs text-muted-foreground">Elements</div>
                  </div>
                  <div className="text-center glass-effect px-4 py-3 rounded-xl border border-primary/50">
                    <div className="text-xl font-bold text-primary">99.1%</div>
                    <div className="text-xs text-muted-foreground">Pure</div>
                  </div>
                  <div className="text-center glass-effect px-4 py-3 rounded-xl border border-primary/50">
                    <div className="text-xl font-bold text-primary">AI</div>
                    <div className="text-xs text-muted-foreground">Powered</div>
                  </div>
                </div>
              </div>
            </header>

            {/* Main Content */}
             <div className="grid grid-cols-1 xl:grid-cols-4 gap-8 mb-16">   
              {/* Periodic Table */}
              <div className="xl:col-span-3">
                <div className="glass-effect rounded-2xl p-6 border border-primary/30">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-primary/20 rounded-xl flex items-center justify-center">
                        <Atom className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-foreground font-orbitron">Element Table</h2>
                        <p className="text-muted-foreground text-sm">Interactive periodic table of elements</p>
                      </div>
                    </div>
                  </div>
                  
                  <PeriodicTable onElementClick={handleElementClick} />
                </div>
              </div>

              {/* Lab Equipment Sidebar with Breaking Bad theme */}
              <div>
                <div className="glass-effect rounded-2xl p-6 border border-primary/30 h-full">
                  <Tabs defaultValue="reaction" className="h-full">
                    <TabsList className="w-full mb-6 bg-muted/20 rounded-xl p-1">
                      <TabsTrigger 
                        value="reaction" 
                        className="flex-1 rounded-lg data-[state=active]:bg-primary/30 data-[state=active]:text-primary"
                      >
                        <Beaker className="w-4 h-4 mr-2" />
                        Lab
                      </TabsTrigger>
                      <TabsTrigger 
                        value="info" 
                        className="flex-1 rounded-lg data-[state=active]:bg-primary/30 data-[state=active]:text-primary"
                      >
                        <FlaskConical className="w-4 h-4 mr-2" />
                        Info
                      </TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="reaction" className="space-y-6">
                      <div>
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center border border-primary/30">
                            <Hexagon className="w-4 h-4 text-primary" />
                          </div>
                          <h3 className="text-lg font-bold font-orbitron text-foreground">Chemical Reactor</h3>
                        </div>
                        <p className="text-muted-foreground text-sm mb-4">
                          Drag elements to create chemical reactions
                        </p>
                      </div>
                      <Separator className="bg-primary/30" />
                      <ReactionZone onElementClick={handleElementClick} />
                    </TabsContent>
                    
                    <TabsContent value="info" className="space-y-6">
                      <div>
                        <div className="flex items-center gap-3 mb-4">
                          <FlaskConical className="w-5 h-5 text-primary" />
                          <h3 className="text-lg font-bold font-orbitron text-primary">How to Use</h3>
                        </div>
                        
                        <div className="space-y-4 text-sm">
                          <div className="glass-effect p-4 rounded-xl border border-primary/30">
                            <h4 className="font-bold text-primary mb-3">Quick Guide</h4>
                            <ul className="space-y-2 text-muted-foreground text-xs">
                              <li>• Click elements for detailed information</li>
                              <li>• Search the periodic table</li>
                              <li>• Drag elements to reaction chamber</li>
                              <li>• Explore chemical reactions</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>
              </div>
            </div>

            {/* AI Assistant Section - TheBlueMatterAI */}
            <div className="glass-effect rounded-2xl border border-primary/30 p-8 mb-16 relative overflow-hidden">
              {/* Chemistry lab background */}
              <div 
                className="absolute inset-0 opacity-5"
                style={{
                  backgroundImage: `url('/lovable-uploads/5cb5a96f-bf4c-426a-8e1f-c6a488b53379.png')`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              />
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center relative z-10">
                <div className="lg:col-span-2 space-y-6">
                  <div className="flex items-center gap-6">
                    <div className="w-14 h-14 bg-primary/20 rounded-2xl flex items-center justify-center border border-primary/30 relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-primary/20 to-primary/10 animate-pulse"></div>
                      <div className="relative z-10 flex items-center justify-center w-full h-full">
                        <div className="w-6 h-6 bg-primary rounded-full animate-pulse shadow-lg shadow-primary/50"></div>
                        <div className="absolute inset-0 rounded-2xl border border-primary/50 animate-pulse"></div>
                      </div>
                    </div>
                    <div>
                      <h2 className="text-3xl font-black text-primary mb-2 font-orbitron">Chemistry AI</h2>
                      <p className="text-lg text-muted-foreground">Your intelligent chemistry assistant</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="glass-effect rounded-xl p-4 border border-primary/30">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-6 h-6 bg-primary/20 rounded-lg flex items-center justify-center">
                          <Atom className="w-3 h-3 text-primary" />
                        </div>
                        <span className="font-bold text-primary text-sm">Smart Analysis</span>
                      </div>
                      <p className="text-xs text-muted-foreground">Detailed chemical insights</p>
                    </div>
                    
                    <div className="glass-effect rounded-xl p-4 border border-primary/30">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-6 h-6 bg-primary/20 rounded-lg flex items-center justify-center">
                          <Zap className="w-3 h-3 text-primary" />
                        </div>
                        <span className="font-bold text-primary text-sm">Molecular Guidance</span>
                      </div>
                      <p className="text-xs text-muted-foreground">Interactive learning experience</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col items-center space-y-4">
                  <Button 
                    onClick={() => navigate('/analytics')}
                    className="bg-primary hover:bg-primary/90 text-primary-foreground w-full py-6 text-lg font-bold rounded-xl transform hover:scale-105 transition-all duration-300 group border border-primary/50"
                  >
                    <Bot className="w-5 h-5 mr-3" />
                    Start with AI
                    <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform" />
                  </Button>
                  <p className="text-xs text-muted-foreground text-center">AI-powered chemistry assistant</p>
                </div>
              </div>
            </div>

            {/* Chemistry Features Section */}
            <div className="glass-effect rounded-2xl border border-primary/30 p-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary/20 rounded-2xl flex items-center justify-center border border-primary/30">
                      <Flame className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-black text-foreground font-orbitron">Explore Chemistry</h3>
                      <p className="text-muted-foreground">Interactive learning platform</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="glass-effect rounded-xl p-4 border border-primary/30">
                      <h4 className="font-bold text-primary mb-2 flex items-center gap-2">
                        <Zap className="w-4 h-4" />
                        Reaction Simulator
                      </h4>
                      <p className="text-sm text-muted-foreground">Master chemical reactions and molecular structures</p>
                    </div>
                    
                    <div className="glass-effect rounded-xl p-4 border border-primary/30">
                      <h4 className="font-bold text-primary mb-2 flex items-center gap-2">
                        <Atom className="w-4 h-4" />
                        Element Explorer
                      </h4>
                      <p className="text-sm text-muted-foreground">Discover properties of all elements</p>
                    </div>
                  </div>
                </div>
                
                <div className="text-center space-y-4">
                  <div className="w-48 h-48 mx-auto rounded-2xl glass-effect border border-primary/30 flex items-center justify-center bg-gradient-to-br from-primary/5 to-primary/10">
                    <Atom className="w-24 h-24 text-primary opacity-50" />
                  </div>
                  <p className="text-sm text-muted-foreground">Interactive chemistry laboratory</p>
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
        
        
      </div>
    </DndProvider>
  );
};

export default Index;
