import React, { useState, useEffect } from 'react';
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
import { Atom, Beaker, BookOpen, Bot, ArrowRight, Calculator, Brain, Sparkles, Zap, FlaskConical, Flame, Microscope } from 'lucide-react';
import { cn } from '@/lib/utils';

const Index = () => {
  const [selectedElement, setSelectedElement] = useState<Element | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);
  const [currentSection, setCurrentSection] = useState('table');
  const navigate = useNavigate();

  const handleElementClick = (element: Element) => {
    setSelectedElement(element);
    setDetailOpen(true);
  };

  // Intersection Observer for section transitions
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            setCurrentSection(entry.target.id || 'table');
          }
        });
      },
      { threshold: 0.3 }
    );

    const sections = document.querySelectorAll('.section-transition');
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="relative">
        {/* Enhanced Hero Section */}
        <section className="relative min-h-screen overflow-hidden">
          {/* Background */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-br from-background via-background/95 to-muted/50"></div>
            <div className="absolute inset-0" style={{
              backgroundImage: `
                radial-gradient(circle at 25% 25%, hsl(var(--primary) / 0.1) 0%, transparent 60%),
                radial-gradient(circle at 75% 75%, hsl(var(--primary) / 0.08) 0%, transparent 60%),
                radial-gradient(circle at 50% 50%, hsl(var(--primary) / 0.05) 0%, transparent 80%)
              `
            }}></div>
            
            {/* Animated Particles */}
            <div className="absolute inset-0 overflow-hidden">
              {[...Array(15)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-1 h-1 bg-primary/30 rounded-full animate-pulse"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 3}s`,
                    animationDuration: `${2 + Math.random() * 4}s`
                  }}
                />
              ))}
            </div>
          </div>
          
          <div className="container mx-auto py-12 px-4 relative z-10">
            {/* Hero Header */}
            <header id="hero" className="mb-12 flex flex-col items-center text-center section-transition">
              <div className="space-y-6 max-w-5xl mx-auto">
                <div className="relative">
                  <h1 className="text-6xl md:text-7xl font-black tracking-tight font-orbitron text-glow-primary relative z-10">
                    ChemLab
                  </h1>
                  <div className="absolute inset-0 text-6xl md:text-7xl font-black tracking-tight font-orbitron text-primary/20 animate-pulse blur-sm">
                    ChemLab
                  </div>
                </div>
                
                <div className="text-xl font-light text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                  <div className="flex flex-wrap justify-center gap-4 text-base">
                    <span className="ios-liquid-glass px-4 py-2 rounded-full border border-primary/30">
                      🧪 <span className="text-primary font-semibold">Explore</span> Chemistry
                    </span>
                    <span className="ios-liquid-glass px-4 py-2 rounded-full border border-primary/30">
                      ⚛️ <span className="text-primary font-semibold">Discover</span> Elements
                    </span>
                    <span className="ios-liquid-glass px-4 py-2 rounded-full border border-primary/30">
                      💡 <span className="text-primary font-semibold">Learn</span> Science
                    </span>
                  </div>
                </div>
                
                {/* Quick Stats */}
                <div className="flex justify-center gap-8 mt-8">
                  <div className="text-center ios-liquid-glass px-6 py-4 rounded-2xl">
                    <div className="text-2xl font-bold text-primary">118</div>
                    <div className="text-sm text-muted-foreground">Elements</div>
                  </div>
                  <div className="text-center ios-liquid-glass px-6 py-4 rounded-2xl">
                    <div className="text-2xl font-bold text-primary">∞</div>
                    <div className="text-sm text-muted-foreground">Reactions</div>
                  </div>
                  <div className="text-center ios-liquid-glass px-6 py-4 rounded-2xl">
                    <div className="text-2xl font-bold text-primary">AI</div>
                    <div className="text-sm text-muted-foreground">Powered</div>
                  </div>
                </div>
              </div>
            </header>

            {/* Main Lab Content */}
            <div className="grid grid-cols-1 xl:grid-cols-4 gap-8 mb-16">
              {/* Periodic Table */}
              <div id="table" className="xl:col-span-3 section-transition">
                <div className="ios-liquid-glass rounded-3xl shadow-2xl p-6 border-2 border-primary/30">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary/80 rounded-2xl flex items-center justify-center shadow-xl">
                          <Atom className="w-6 h-6 text-primary-foreground animate-spin" style={{ animationDuration: '8s' }} />
                        </div>
                      </div>
                      <div>
                        <h2 className="text-3xl font-bold text-glow-primary font-orbitron">Element Table</h2>
                        <p className="text-muted-foreground">Interactive Periodic System</p>
                      </div>
                    </div>
                  </div>
                  
                  <PeriodicTable onElementClick={handleElementClick} />
                </div>
              </div>

              {/* Lab Equipment Sidebar */}
              <div id="lab" className="section-transition">
                <div className="ios-liquid-glass rounded-3xl shadow-2xl p-6 border-2 border-primary/30 h-full">
                  <Tabs defaultValue="reaction" className="h-full">
                    <TabsList className="w-full mb-6 bg-muted/60 rounded-2xl p-1 border-2 border-primary/30">
                      <TabsTrigger 
                        value="reaction" 
                        className="flex-1 rounded-xl data-[state=active]:bg-primary/30 data-[state=active]:text-primary transition-all duration-300"
                      >
                        <Beaker className="w-4 h-4 mr-2" />
                        Lab
                      </TabsTrigger>
                      <TabsTrigger 
                        value="info" 
                        className="flex-1 rounded-xl data-[state=active]:bg-primary/30 data-[state=active]:text-primary transition-all duration-300"
                      >
                        <BookOpen className="w-4 h-4 mr-2" />
                        Guide
                      </TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="reaction" className="space-y-6 h-full">
                      <div>
                        <div className="flex items-center gap-3 mb-3">
                          <FlaskConical className="w-6 h-6 text-primary" />
                          <h3 className="text-xl font-bold font-orbitron text-primary">Reaction Chamber</h3>
                        </div>
                        <p className="text-muted-foreground text-sm mb-4">
                          Drag elements to create reactions and explore chemistry
                        </p>
                      </div>
                      <Separator className="bg-primary/30" />
                      <ReactionZone onElementClick={handleElementClick} />
                    </TabsContent>
                    
                    <TabsContent value="info" className="space-y-6">
                      <div>
                        <div className="flex items-center gap-3 mb-4">
                          <BookOpen className="w-6 h-6 text-primary" />
                          <h3 className="text-xl font-bold font-orbitron text-primary">Lab Guide</h3>
                        </div>
                        
                        <div className="space-y-4 text-sm">
                          <div className="ios-liquid-glass p-4 rounded-2xl border border-primary/30">
                            <h4 className="font-bold text-primary mb-3 flex items-center gap-2">
                              <Zap className="w-4 h-4" />
                              How to Use
                            </h4>
                            <ul className="space-y-2 text-muted-foreground text-xs">
                              <li className="flex items-center gap-2">
                                <div className="w-1 h-1 bg-primary rounded-full"></div>
                                Click elements for detailed information
                              </li>
                              <li className="flex items-center gap-2">
                                <div className="w-1 h-1 bg-primary rounded-full"></div>
                                Search elements by name or symbol
                              </li>
                              <li className="flex items-center gap-2">
                                <div className="w-1 h-1 bg-primary rounded-full"></div>
                                Drag elements to reaction chamber
                              </li>
                              <li className="flex items-center gap-2">
                                <div className="w-1 h-1 bg-primary rounded-full"></div>
                                Filter by element categories
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

            {/* AI Assistant Section */}
            <div id="ai" className="section-transition ios-liquid-glass rounded-3xl shadow-2xl border-2 border-primary/30 p-8 mb-16">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
                <div className="lg:col-span-2 space-y-6">
                  <div className="flex items-center gap-6">
                    <div className="relative">
                      <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary/80 rounded-3xl flex items-center justify-center shadow-2xl">
                        <Brain className="w-8 h-8 text-primary-foreground" />
                      </div>
                      <div className="absolute -top-1 -right-1 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center animate-pulse">
                        <Sparkles className="w-3 h-3 text-black" />
                      </div>
                    </div>
                    <div>
                      <h2 className="text-3xl md:text-4xl font-black text-glow-primary mb-2 font-orbitron">AI Lab Assistant</h2>
                      <p className="text-lg text-muted-foreground">Your digital chemistry partner for analysis and learning</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="ios-liquid-glass rounded-2xl p-4 border border-primary/30 hover:scale-105 transition-all duration-300">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-8 h-8 bg-yellow-500/20 rounded-xl flex items-center justify-center">
                          <Zap className="w-4 h-4 text-yellow-400" />
                        </div>
                        <span className="font-bold text-primary">Smart Analysis</span>
                      </div>
                      <p className="text-sm text-muted-foreground">AI-powered element analysis and reaction predictions</p>
                    </div>
                    
                    <div className="ios-liquid-glass rounded-2xl p-4 border border-blue-400/30 hover:scale-105 transition-all duration-300">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-8 h-8 bg-blue-500/20 rounded-xl flex items-center justify-center">
                          <FlaskConical className="w-4 h-4 text-blue-400" />
                        </div>
                        <span className="font-bold text-primary">Formula Help</span>
                      </div>
                      <p className="text-sm text-muted-foreground">Interactive molecular structure and compound building</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col items-center space-y-4">
                  <Button 
                    onClick={() => navigate('/analytics')}
                    className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 w-full py-6 text-lg font-bold rounded-2xl shadow-2xl transform hover:scale-105 transition-all duration-300 group"
                  >
                    <Bot className="w-5 h-5 mr-3 group-hover:animate-pulse" />
                    Start Analysis
                    <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform" />
                  </Button>
                  
                  <Button 
                    onClick={() => navigate('/formula-builder')}
                    variant="outline"
                    className="ios-liquid-glass border-2 border-primary/50 hover:bg-primary/10 w-full py-4 rounded-2xl font-semibold hover:scale-105 transition-all duration-300"
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
