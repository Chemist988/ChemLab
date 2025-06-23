
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
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Atom, Beaker, BookOpen, Bot, Sparkles, ArrowRight, Calculator } from 'lucide-react';

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
        {/* Hero Section with Background */}
        <section className="relative min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&h=800&fit=crop')] bg-cover bg-center"></div>
            <div className="absolute inset-0 bg-gradient-to-br from-slate-900/80 via-purple-900/80 to-slate-900/80"></div>
          </div>
          
          <div className="container mx-auto py-8 px-4 relative z-10">
            {/* Apple-inspired Header */}
            <header className="mb-16 flex flex-col items-center text-center">
              <div className="space-y-6 max-w-4xl mx-auto">
                <h1 className="text-6xl md:text-7xl font-bold tracking-tight text-white font-orbitron drop-shadow-2xl">
                  ChemLab
                </h1>
                <p className="text-xl font-light text-gray-300 max-w-3xl mx-auto leading-relaxed">
                  An interactive chemistry playground. Drag elements, simulate reactions, 
                  and discover the building blocks of our world with stunning visualizations.
                </p>
                <div className="flex items-center justify-center gap-2 text-sm text-gray-400">
                  <Atom className="w-4 h-4" />
                  <span>118 Elements • Unlimited Possibilities</span>
                </div>
              </div>
            </header>

            {/* Feature Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 max-w-6xl mx-auto">
              {/* HeisenBot Card */}
              <Card className="bg-gradient-to-br from-green-600 to-teal-600 border-0 text-white relative overflow-hidden hover:scale-105 transition-transform duration-300">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -translate-y-8 translate-x-8"></div>
                <CardHeader className="relative z-10">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mb-4">
                    <Bot className="w-6 h-6" />
                  </div>
                  <CardTitle className="text-xl">HeisenBot AI</CardTitle>
                  <CardDescription className="text-white/80">
                    Your intelligent chemistry companion
                  </CardDescription>
                </CardHeader>
                <CardContent className="relative z-10">
                  <p className="text-sm text-white/90 mb-4">
                    Get instant help with reactions, molecular structures, and complex chemistry concepts.
                  </p>
                  <Button 
                    onClick={() => navigate('/analytics')}
                    className="bg-white text-green-600 hover:bg-gray-100 w-full"
                  >
                    Chat Now
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>

              {/* Formula Builder Card */}
              <Card className="bg-gradient-to-br from-purple-600 to-pink-600 border-0 text-white relative overflow-hidden hover:scale-105 transition-transform duration-300">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -translate-y-8 translate-x-8"></div>
                <CardHeader className="relative z-10">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mb-4">
                    <Calculator className="w-6 h-6" />
                  </div>
                  <CardTitle className="text-xl">Formula Builder</CardTitle>
                  <CardDescription className="text-white/80">
                    Build molecular formulas interactively
                  </CardDescription>
                </CardHeader>
                <CardContent className="relative z-10">
                  <p className="text-sm text-white/90 mb-4">
                    Construct chemical formulas, calculate molecular masses, and save compounds.
                  </p>
                  <Button 
                    onClick={() => navigate('/formula-builder')}
                    className="bg-white text-purple-600 hover:bg-gray-100 w-full"
                  >
                    Start Building
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>

              {/* Reaction Simulator Card */}
              <Card className="bg-gradient-to-br from-orange-600 to-red-600 border-0 text-white relative overflow-hidden hover:scale-105 transition-transform duration-300">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -translate-y-8 translate-x-8"></div>
                <CardHeader className="relative z-10">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mb-4">
                    <Beaker className="w-6 h-6" />
                  </div>
                  <CardTitle className="text-xl">Reaction Simulator</CardTitle>
                  <CardDescription className="text-white/80">
                    Balance equations and simulate reactions
                  </CardDescription>
                </CardHeader>
                <CardContent className="relative z-10">
                  <p className="text-sm text-white/90 mb-4">
                    Build chemical reactions, check balance, and explore transformations.
                  </p>
                  <Button 
                    onClick={() => navigate('/reaction-simulator')}
                    className="bg-white text-orange-600 hover:bg-gray-100 w-full"
                  >
                    Simulate Now
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
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
                      <h3 className="text-xl font-medium mb-2 font-orbitron">Reaction Simulator</h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                        Drag and drop elements to simulate chemical reactions
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
                            <li>• Click any element for detailed information</li>
                            <li>• Drag elements to the reaction zone</li>
                            <li>• Watch chemical reactions come to life</li>
                          </ul>
                        </div>
                        
                        <div className="p-4 bg-gradient-to-r from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-green-900/20 rounded-xl border border-emerald-200/50 dark:border-emerald-700/50">
                          <h4 className="font-medium text-emerald-700 dark:text-emerald-300 mb-2">Popular Reactions</h4>
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
