
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
        {/* Breaking Bad Hero Section */}
        <section className="relative min-h-screen overflow-hidden">
          {/* Enhanced Background */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-br from-black via-green-950/50 to-black"></div>
            <div className="absolute inset-0" style={{
              backgroundImage: `
                radial-gradient(circle at 25% 25%, rgba(0, 255, 65, 0.2) 0%, transparent 60%),
                radial-gradient(circle at 75% 75%, rgba(0, 255, 65, 0.15) 0%, transparent 60%),
                radial-gradient(circle at 50% 50%, rgba(0, 255, 65, 0.05) 0%, transparent 80%)
              `
            }}></div>
            
            {/* Animated Particles */}
            <div className="absolute inset-0 overflow-hidden">
              {[...Array(20)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-2 h-2 bg-green-400/30 rounded-full animate-pulse"
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
            {/* Enhanced Hero Header */}
            <header id="hero" className="mb-12 flex flex-col items-center text-center section-transition">
              <div className="space-y-6 max-w-5xl mx-auto">
                <div className="relative">
                  <h1 className="text-7xl md:text-8xl font-black tracking-tight font-orbitron text-glow-primary breaking-bad-glow-enhanced relative z-10">
                    ChemLab
                  </h1>
                  <div className="absolute inset-0 text-7xl md:text-8xl font-black tracking-tight font-orbitron text-green-400/20 animate-pulse blur-sm">
                    ChemLab
                  </div>
                </div>
                
                <div className="text-2xl font-light text-green-200 max-w-3xl mx-auto leading-relaxed">
                  <div className="flex flex-wrap justify-center gap-4 text-lg">
                    <span className="bg-green-500/20 px-4 py-2 rounded-full border border-green-400/30 backdrop-blur-sm">
                      🧪 <span className="text-green-400 font-semibold">Cook</span> Chemistry
                    </span>
                    <span className="bg-green-500/20 px-4 py-2 rounded-full border border-green-400/30 backdrop-blur-sm">
                      ⚛️ <span className="text-green-400 font-semibold">Experiment</span> Elements
                    </span>
                    <span className="bg-green-500/20 px-4 py-2 rounded-full border border-green-400/30 backdrop-blur-sm">
                      💥 <span className="text-green-400 font-semibold">Break</span> Bonds
                    </span>
                  </div>
                </div>
                
                {/* Quick Stats */}
                <div className="flex justify-center gap-8 mt-8">
                  <div className="text-center ios-liquid-glass px-6 py-4 rounded-2xl">
                    <div className="text-3xl font-bold text-green-400">118</div>
                    <div className="text-sm text-green-300/80">Elements</div>
                  </div>
                  <div className="text-center ios-liquid-glass px-6 py-4 rounded-2xl">
                    <div className="text-3xl font-bold text-green-400">∞</div>
                    <div className="text-sm text-green-300/80">Reactions</div>
                  </div>
                  <div className="text-center ios-liquid-glass px-6 py-4 rounded-2xl">
                    <div className="text-3xl font-bold text-green-400">AI</div>
                    <div className="text-sm text-green-300/80">Powered</div>
                  </div>
                </div>
              </div>
            </header>

            {/* Main Lab Content */}
            <div className="grid grid-cols-1 xl:grid-cols-4 gap-8 mb-16">
              {/* Periodic Table - Enhanced */}
              <div id="table" className="xl:col-span-3 section-transition">
                <div className="ios-liquid-glass rounded-3xl shadow-2xl p-8 border-2 border-green-400/30 breaking-bad-glow-enhanced">
                  <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-2xl flex items-center justify-center shadow-xl">
                          <Atom className="w-6 h-6 text-black animate-spin" style={{ animationDuration: '8s' }} />
                        </div>
                        <div className="absolute -top-1 -right-1 w-5 h-5 bg-yellow-400 rounded-full flex items-center justify-center animate-bounce">
                          <Flame className="w-2 h-2 text-black" />
                        </div>
                      </div>
                      <div>
                        <h2 className="text-4xl font-bold text-glow-primary font-orbitron">Element Table</h2>
                        <p className="text-green-300/80">Interactive Periodic System</p>
                      </div>
                    </div>
                    
                    <div className="hidden lg:flex items-center gap-3 text-sm text-green-300/80 bg-green-500/10 px-4 py-2 rounded-2xl border border-green-400/30 backdrop-blur-sm">
                      <Microscope className="w-4 h-4" />
                      Click any element to analyze
                    </div>
                  </div>
                  
                  <PeriodicTable onElementClick={handleElementClick} />
                </div>
              </div>

              {/* Lab Equipment Sidebar - Enhanced */}
              <div id="lab" className="section-transition">
                <div className="ios-liquid-glass rounded-3xl shadow-2xl p-6 border-2 border-green-400/30 h-full">
                  <Tabs defaultValue="reaction" className="h-full">
                    <TabsList className="w-full mb-6 bg-black/60 rounded-2xl p-1 border-2 border-green-400/30 backdrop-blur-sm">
                      <TabsTrigger 
                        value="reaction" 
                        className="flex-1 rounded-xl data-[state=active]:bg-green-500/30 data-[state=active]:text-green-400 text-green-300 transition-all duration-300 data-[state=active]:shadow-lg"
                      >
                        <Beaker className="w-4 h-4 mr-2" />
                        Lab
                      </TabsTrigger>
                      <TabsTrigger 
                        value="info" 
                        className="flex-1 rounded-xl data-[state=active]:bg-green-500/30 data-[state=active]:text-green-400 text-green-300 transition-all duration-300 data-[state=active]:shadow-lg"
                      >
                        <BookOpen className="w-4 h-4 mr-2" />
                        Manual
                      </TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="reaction" className="space-y-6 h-full">
                      <div>
                        <div className="flex items-center gap-3 mb-3">
                          <FlaskConical className="w-6 h-6 text-green-400" />
                          <h3 className="text-xl font-bold font-orbitron text-green-400">Reaction Chamber</h3>
                        </div>
                        <p className="text-green-300/80 text-sm mb-4">
                          Drag elements to cook up reactions and witness chemical magic
                        </p>
                      </div>
                      <Separator className="bg-green-400/30" />
                      <ReactionZone onElementClick={handleElementClick} />
                    </TabsContent>
                    
                    <TabsContent value="info" className="space-y-6">
                      <div>
                        <div className="flex items-center gap-3 mb-4">
                          <BookOpen className="w-6 h-6 text-green-400" />
                          <h3 className="text-xl font-bold font-orbitron text-green-400">Lab Protocol</h3>
                        </div>
                        
                        <div className="space-y-4 text-sm">
                          <div className="ios-liquid-glass p-4 rounded-2xl border border-green-400/30">
                            <h4 className="font-bold text-green-400 mb-3 flex items-center gap-2">
                              <Zap className="w-4 h-4" />
                              Safety First
                            </h4>
                            <ul className="space-y-2 text-green-300/80 text-xs">
                              <li className="flex items-center gap-2">
                                <div className="w-1 h-1 bg-green-400 rounded-full"></div>
                                Click elements for detailed analysis
                              </li>
                              <li className="flex items-center gap-2">
                                <div className="w-1 h-1 bg-green-400 rounded-full"></div>
                                Drag elements to reaction chamber
                              </li>
                              <li className="flex items-center gap-2">
                                <div className="w-1 h-1 bg-green-400 rounded-full"></div>
                                Search by name, symbol, or number
                              </li>
                              <li className="flex items-center gap-2">
                                <div className="w-1 h-1 bg-green-400 rounded-full"></div>
                                Observe chemical transformations
                              </li>
                            </ul>
                          </div>
                          
                          <div className="ios-liquid-glass p-4 rounded-2xl border border-yellow-400/30 bg-yellow-500/5">
                            <h4 className="font-bold text-yellow-400 mb-3 flex items-center gap-2">
                              <Flame className="w-4 h-4" />
                              Common Reactions
                            </h4>
                            <ul className="space-y-2 text-green-300/80 text-xs">
                              <li className="flex items-center gap-2">
                                <span className="text-blue-400">H + O</span> → <span className="text-green-400">H₂O</span> (Pure Water)
                              </li>
                              <li className="flex items-center gap-2">
                                <span className="text-red-400">Na + Cl</span> → <span className="text-green-400">NaCl</span> (Table Salt)
                              </li>
                              <li className="flex items-center gap-2">
                                <span className="text-orange-400">Fe + O</span> → <span className="text-green-400">Fe₂O₃</span> (Rust)
                              </li>
                              <li className="flex items-center gap-2">
                                <span className="text-purple-400">C + H</span> → <span className="text-green-400">CH₄</span> (Methane)
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

            {/* Enhanced AI Assistant Section */}
            <div id="ai" className="section-transition ios-liquid-glass rounded-3xl shadow-2xl border-2 border-green-400/30 p-8 mb-16 breaking-bad-glow-enhanced">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
                <div className="lg:col-span-2 space-y-8">
                  <div className="flex items-center gap-6">
                    <div className="relative">
                      <div className="w-20 h-20 bg-gradient-to-br from-green-500 via-green-400 to-green-600 rounded-3xl flex items-center justify-center shadow-2xl breaking-bad-glow-enhanced animate-pulse">
                        <Brain className="w-10 h-10 text-black" />
                      </div>
                      <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center animate-bounce shadow-lg">
                        <Sparkles className="w-4 h-4 text-black" />
                      </div>
                    </div>
                    <div>
                      <h2 className="text-4xl md:text-5xl font-black text-glow-primary mb-3 font-orbitron">AI Lab Assistant</h2>
                      <p className="text-xl text-green-200">Your digital chemistry partner for reactions and molecular analysis</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="ios-liquid-glass rounded-2xl p-6 border border-green-400/30 hover:scale-105 transition-all duration-300">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 bg-yellow-500/20 rounded-xl flex items-center justify-center">
                          <Zap className="w-5 h-5 text-yellow-400" />
                        </div>
                        <span className="font-bold text-green-400">Reaction Predictions</span>
                      </div>
                      <p className="text-sm text-green-300/80">AI-powered chemical reaction outcomes and molecular behavior analysis</p>
                    </div>
                    
                    <div className="ios-liquid-glass rounded-2xl p-6 border border-blue-400/30 hover:scale-105 transition-all duration-300">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 bg-blue-500/20 rounded-xl flex items-center justify-center">
                          <FlaskConical className="w-5 h-5 text-blue-400" />
                        </div>
                        <span className="font-bold text-green-400">Formula Analysis</span>
                      </div>
                      <p className="text-sm text-green-300/80">Advanced molecular structure assistance and compound identification</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col items-center space-y-6">
                  <Button 
                    onClick={() => navigate('/analytics')}
                    className="bg-gradient-to-r from-green-600 via-green-500 to-green-400 text-black hover:from-green-500 hover:via-green-400 hover:to-green-300 w-full py-6 text-xl font-bold rounded-2xl shadow-2xl transform hover:scale-110 transition-all duration-300 breaking-bad-glow-enhanced group"
                  >
                    <Bot className="w-6 h-6 mr-3 group-hover:animate-spin" />
                    Start Analysis
                    <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-1 transition-transform" />
                  </Button>
                  
                  <Button 
                    onClick={() => navigate('/formula-builder')}
                    variant="outline"
                    className="ios-liquid-glass text-green-400 border-2 border-green-400/50 hover:bg-green-500/20 w-full py-4 rounded-2xl backdrop-blur-sm font-semibold hover:scale-105 transition-all duration-300"
                  >
                    <Calculator className="w-5 h-5 mr-2" />
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
