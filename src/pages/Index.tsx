
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
import { Atom, Beaker, BookOpen, Bot, ArrowRight, Calculator, Microscope } from 'lucide-react';

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
            {/* Header */}
            <header className="mb-16 flex flex-col items-center text-center">
              <div className="space-y-6 max-w-4xl mx-auto">
                <h1 className="text-6xl md:text-7xl font-bold tracking-tight text-white font-orbitron drop-shadow-2xl">
                  ChemLab
                </h1>
                <p className="text-xl font-light text-gray-300 max-w-3xl mx-auto leading-relaxed">
                  Interactive chemistry tools for exploring elements, building molecules, 
                  and understanding chemical reactions.
                </p>
                <div className="flex items-center justify-center gap-2 text-sm text-gray-400">
                  <Atom className="w-4 h-4" />
                  <span>118 Elements • Modern Chemistry Tools</span>
                </div>
              </div>
            </header>

            {/* Feature Cards - Without outer containers */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 max-w-6xl mx-auto">
              {/* AI Assistant */}
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Bot className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-semibold text-white">AI Assistant</h3>
                <p className="text-gray-300 mb-4">Get help with chemistry concepts</p>
                <p className="text-sm text-gray-400 mb-6">
                  Ask questions about reactions, molecular structures, and chemical properties.
                </p>
                <Button 
                  onClick={() => navigate('/analytics')}
                  className="bg-green-600 text-white hover:bg-green-700 w-full"
                >
                  Start Chat
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>

              {/* Formula Builder */}
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calculator className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-semibold text-white">Formula Builder</h3>
                <p className="text-gray-300 mb-4">Build molecular formulas</p>
                <p className="text-sm text-gray-400 mb-6">
                  Create chemical formulas, calculate molecular masses, and save compounds.
                </p>
                <Button 
                  onClick={() => navigate('/formula-builder')}
                  className="bg-purple-600 text-white hover:bg-purple-700 w-full"
                >
                  Build Formula
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>

              {/* Molecule Visualizer */}
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Microscope className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-semibold text-white">Molecule Visualizer</h3>
                <p className="text-gray-300 mb-4">Explore molecular structures</p>
                <p className="text-sm text-gray-400 mb-6">
                  View molecular structures, understand bonding patterns, and analyze geometry.
                </p>
                <Button 
                  onClick={() => navigate('/molecule-visualizer')}
                  className="bg-blue-600 text-white hover:bg-blue-700 w-full"
                >
                  Explore Molecules
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
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
                      <h3 className="text-xl font-medium mb-2 font-orbitron">Reaction Lab</h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                        Drag elements to simulate reactions
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
                            <li>• Click elements for detailed information</li>
                            <li>• Drag elements to the reaction zone</li>
                            <li>• Explore molecular structures</li>
                          </ul>
                        </div>
                        
                        <div className="p-4 bg-gradient-to-r from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-green-900/20 rounded-xl border border-emerald-200/50 dark:border-emerald-700/50">
                          <h4 className="font-medium text-emerald-700 dark:text-emerald-300 mb-2">Common Reactions</h4>
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
