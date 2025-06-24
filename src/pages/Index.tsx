
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
import { Atom, Beaker, BookOpen, Bot, ArrowRight, Calculator, Microscope, Sparkles } from 'lucide-react';

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
      <div className="relative min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800">
        <div className="container mx-auto py-6 px-4">
          {/* Header */}
          <header className="mb-8 text-center">
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent font-orbitron mb-4">
              ChemLab
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Interactive chemistry playground for exploring elements and molecular structures
            </p>
          </header>

          {/* Feature Cards - Compact and elegant */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 max-w-4xl mx-auto">
            {/* AI Assistant */}
            <div className="group cursor-pointer" onClick={() => navigate('/analytics')}>
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-500/10 to-green-500/5 p-6 border border-emerald-200/50 dark:border-emerald-800/30 hover:border-emerald-300 dark:hover:border-emerald-700 transition-all duration-300 hover:shadow-lg">
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-emerald-400/20 to-green-500/10 rounded-full -translate-y-6 translate-x-6"></div>
                <div className="relative">
                  <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Bot className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">AI Assistant</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Get expert help with chemistry concepts and reactions
                  </p>
                  <div className="flex items-center text-emerald-600 dark:text-emerald-400 text-sm font-medium">
                    Start Chat <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </div>

            {/* Formula Builder */}
            <div className="group cursor-pointer" onClick={() => navigate('/formula-builder')}>
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-500/10 to-violet-500/5 p-6 border border-purple-200/50 dark:border-purple-800/30 hover:border-purple-300 dark:hover:border-purple-700 transition-all duration-300 hover:shadow-lg">
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-purple-400/20 to-violet-500/10 rounded-full -translate-y-6 translate-x-6"></div>
                <div className="relative">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-violet-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Calculator className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Formula Builder</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Build molecular formulas and calculate molecular masses
                  </p>
                  <div className="flex items-center text-purple-600 dark:text-purple-400 text-sm font-medium">
                    Build Formula <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </div>

            {/* Molecule Visualizer */}
            <div className="group cursor-pointer" onClick={() => navigate('/molecule-visualizer')}>
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-500/10 to-cyan-500/5 p-6 border border-blue-200/50 dark:border-blue-800/30 hover:border-blue-300 dark:hover:border-blue-700 transition-all duration-300 hover:shadow-lg">
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-400/20 to-cyan-500/10 rounded-full -translate-y-6 translate-x-6"></div>
                <div className="relative">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Microscope className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">3D Visualizer</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Explore molecular structures in interactive 3D
                  </p>
                  <div className="flex items-center text-blue-600 dark:text-blue-400 text-sm font-medium">
                    View Molecules <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content - Periodic Table and Lab */}
          <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
            {/* Periodic Table - Main Focus */}
            <div className="xl:col-span-3 bg-white/80 dark:bg-gray-900/80 rounded-3xl shadow-xl backdrop-blur-xl border border-white/20 dark:border-gray-700/30 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-light text-gray-900 dark:text-white font-orbitron">Periodic Table</h2>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Sparkles className="w-4 h-4" />
                  <span>Interactive Elements</span>
                </div>
              </div>
              <PeriodicTable onElementClick={handleElementClick} />
            </div>

            {/* Reaction Lab Sidebar */}
            <div className="bg-white/80 dark:bg-gray-900/80 rounded-3xl shadow-xl backdrop-blur-xl border border-white/20 dark:border-gray-700/30 p-5">
              <Tabs defaultValue="reaction" className="h-full">
                <TabsList className="w-full mb-4 bg-gray-100/50 dark:bg-gray-800/50 rounded-xl p-1">
                  <TabsTrigger value="reaction" className="flex-1 rounded-lg data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700">
                    <Beaker className="w-4 h-4 mr-2" />
                    Lab
                  </TabsTrigger>
                  <TabsTrigger value="info" className="flex-1 rounded-lg data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700">
                    <BookOpen className="w-4 h-4 mr-2" />
                    Guide
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="reaction" className="space-y-4 h-full">
                  <div>
                    <h3 className="text-lg font-medium mb-2 font-orbitron">Reaction Lab</h3>
                    <p className="text-muted-foreground text-sm mb-4">
                      Drag elements to simulate chemical reactions
                    </p>
                  </div>
                  <Separator />
                  <ReactionZone onElementClick={handleElementClick} />
                </TabsContent>
                
                <TabsContent value="info" className="space-y-4">
                  <div>
                    <h3 className="text-lg font-medium mb-4 font-orbitron">Quick Guide</h3>
                    <div className="space-y-3 text-sm">
                      <div className="p-3 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl border border-blue-200/50 dark:border-blue-700/50">
                        <h4 className="font-medium text-blue-700 dark:text-blue-300 mb-2">Getting Started</h4>
                        <ul className="space-y-1 text-muted-foreground text-xs">
                          <li>• Click elements for detailed information</li>
                          <li>• Drag elements to the reaction beaker</li>
                          <li>• Watch realistic chemical reactions</li>
                        </ul>
                      </div>
                      
                      <div className="p-3 bg-gradient-to-r from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-green-900/20 rounded-xl border border-emerald-200/50 dark:border-emerald-700/50">
                        <h4 className="font-medium text-emerald-700 dark:text-emerald-300 mb-2">Popular Reactions</h4>
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
      </div>
    </DndProvider>
  );
};

export default Index;
