
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
        {/* Main Content - Breaking Bad Chemistry Lab */}
        <section className="relative min-h-screen bg-gradient-to-br from-black via-green-950 to-black overflow-hidden">
          {/* Breaking Bad Background Pattern */}
          <div className="absolute inset-0 opacity-30">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&h=800&fit=crop')] bg-cover bg-center"></div>
            <div className="absolute inset-0 bg-gradient-to-br from-black/90 via-green-900/80 to-black/90"></div>
            <div className="absolute inset-0" style={{
              backgroundImage: `
                radial-gradient(circle at 25% 25%, rgba(0, 255, 65, 0.1) 0%, transparent 50%),
                radial-gradient(circle at 75% 75%, rgba(0, 255, 65, 0.08) 0%, transparent 50%)
              `
            }}></div>
          </div>
          
          <div className="container mx-auto py-8 px-4 relative z-10">
            {/* Breaking Bad Header */}
            <header className="mb-8 flex flex-col items-center text-center">
              <div className="space-y-4 max-w-4xl mx-auto">
                <h1 className="text-6xl md:text-7xl font-bold tracking-tight text-green-400 font-orbitron drop-shadow-2xl breaking-bad-glow">
                  ChemLab
                </h1>
                <div className="text-xl font-light text-green-200 max-w-2xl mx-auto leading-relaxed">
                  <span className="text-green-400 font-semibold">Cook</span> some chemistry • 
                  <span className="text-green-400 font-semibold"> Experiment</span> with elements • 
                  <span className="text-green-400 font-semibold"> Break</span> molecular bonds
                </div>
              </div>
            </header>

            {/* Main Lab Content Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-4 gap-8 mb-12">
              {/* Periodic Table - Breaking Bad Style */}
              <div className="xl:col-span-3 lab-container rounded-3xl shadow-2xl backdrop-blur-xl p-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-3xl font-thin text-green-400 font-orbitron neon-glow-primary">Element Table</h2>
                  <div className="text-sm text-green-300/80 bg-green-500/10 px-3 py-1 rounded-full border border-green-400/30">
                    Click any element to analyze
                  </div>
                </div>
                <PeriodicTable onElementClick={handleElementClick} />
              </div>

              {/* Lab Equipment Sidebar */}
              <div className="lab-container rounded-3xl shadow-2xl backdrop-blur-xl p-6">
                <Tabs defaultValue="reaction" className="h-full">
                  <TabsList className="w-full mb-6 bg-black/50 rounded-2xl p-1 border border-green-400/30">
                    <TabsTrigger value="reaction" className="flex-1 rounded-xl data-[state=active]:bg-green-500/20 data-[state=active]:text-green-400 text-green-300">
                      <Beaker className="w-4 h-4 mr-2" />
                      Lab
                    </TabsTrigger>
                    <TabsTrigger value="info" className="flex-1 rounded-xl data-[state=active]:bg-green-500/20 data-[state=active]:text-green-400 text-green-300">
                      <BookOpen className="w-4 h-4 mr-2" />
                      Manual
                    </TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="reaction" className="space-y-6 h-full">
                    <div>
                      <h3 className="text-xl font-medium mb-2 font-orbitron text-green-400">Reaction Chamber</h3>
                      <p className="text-green-300/80 text-sm mb-4">
                        Drag elements to cook up reactions
                      </p>
                    </div>
                    <Separator className="bg-green-400/30" />
                    <ReactionZone onElementClick={handleElementClick} />
                  </TabsContent>
                  
                  <TabsContent value="info" className="space-y-6">
                    <div>
                      <h3 className="text-xl font-medium mb-4 font-orbitron text-green-400">Lab Protocol</h3>
                      <div className="space-y-4 text-sm">
                        <div className="p-4 bg-green-500/10 rounded-xl border border-green-400/30">
                          <h4 className="font-medium text-green-400 mb-2">Safety First</h4>
                          <ul className="space-y-1 text-green-300/80 text-xs">
                            <li>• Click elements for detailed analysis</li>
                            <li>• Drag elements to reaction chamber</li>
                            <li>• Select compounds from suggestions</li>
                            <li>• Observe chemical transformations</li>
                          </ul>
                        </div>
                        
                        <div className="p-4 bg-yellow-500/10 rounded-xl border border-yellow-400/30">
                          <h4 className="font-medium text-yellow-400 mb-2">Common Reactions</h4>
                          <ul className="space-y-1 text-green-300/80 text-xs">
                            <li>• H + O → H₂O (Pure)</li>
                            <li>• Na + Cl → NaCl (Table Salt)</li>
                            <li>• Fe + O → Fe₂O₃ (Rust)</li>
                            <li>• C + H → CH₄ (Methane)</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </div>

            {/* Breaking Bad AI Assistant Section */}
            <div className="bg-gradient-to-r from-green-900/30 via-black/40 to-green-900/30 rounded-3xl shadow-2xl backdrop-blur-xl border border-green-400/30 p-8 mb-12 breaking-bad-glow">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
                <div className="lg:col-span-2 space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center shadow-xl breaking-bad-glow">
                        <Brain className="w-8 h-8 text-black" />
                      </div>
                      <div className="absolute -top-1 -right-1 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center animate-pulse">
                        <Sparkles className="w-3 h-3 text-black" />
                      </div>
                    </div>
                    <div>
                      <h2 className="text-3xl font-bold text-green-400 mb-2 font-orbitron">AI Lab Assistant</h2>
                      <p className="text-green-200">Your digital chemistry partner for reactions and analysis</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-green-500/10 rounded-xl p-4 backdrop-blur-sm border border-green-400/30">
                      <div className="flex items-center gap-2 mb-2">
                        <Zap className="w-4 h-4 text-yellow-400" />
                        <span className="text-sm font-medium text-green-400">Reaction Predictions</span>
                      </div>
                      <p className="text-xs text-green-300/80">Predict chemical reaction outcomes</p>
                    </div>
                    
                    <div className="bg-green-500/10 rounded-xl p-4 backdrop-blur-sm border border-green-400/30">
                      <div className="flex items-center gap-2 mb-2">
                        <FlaskConical className="w-4 h-4 text-blue-400" />
                        <span className="text-sm font-medium text-green-400">Formula Analysis</span>
                      </div>
                      <p className="text-xs text-green-300/80">Molecular structure assistance</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col items-center space-y-4">
                  <Button 
                    onClick={() => navigate('/analytics')}
                    className="bg-gradient-to-r from-green-600 to-green-500 text-black hover:from-green-500 hover:to-green-400 w-full py-6 text-lg font-semibold rounded-2xl shadow-xl transform hover:scale-105 transition-all duration-200 breaking-bad-glow"
                  >
                    <Bot className="w-5 h-5 mr-2" />
                    Start Analysis
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                  
                  <Button 
                    onClick={() => navigate('/formula-builder')}
                    variant="outline"
                    className="bg-green-500/10 text-green-400 border-green-400/50 hover:bg-green-500/20 w-full rounded-xl backdrop-blur-sm"
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
