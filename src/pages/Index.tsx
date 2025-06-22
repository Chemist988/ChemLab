
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
import { Atom, Beaker, BookOpen, Bot, Sparkles, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

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
      <div className="container mx-auto py-8 px-4 max-w-7xl">
        {/* Streamlined Header */}
        <header className="mb-12 text-center">
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-white font-orbitron mb-4">
            ChemLab
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-6">
            Interactive chemistry playground. Explore elements, simulate reactions, and learn chemistry concepts.
          </p>
          <div className="flex items-center justify-center gap-2 text-sm text-gray-400">
            <Atom className="w-4 h-4" />
            <span>118 Elements • Unlimited Reactions</span>
          </div>
        </header>

        {/* AI Assistant Banner */}
        <section className="mb-8">
          <div className="bg-gradient-to-r from-green-600 to-teal-600 rounded-2xl p-6 text-center">
            <div className="flex items-center justify-center mb-3">
              <Bot className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">HeisenBot Assistant</h2>
            <p className="text-white/90 mb-4">Get instant help with chemistry concepts and reactions</p>
            <Button 
              onClick={() => navigate('/analytics')}
              className="bg-white text-green-600 hover:bg-gray-100 font-semibold"
            >
              <Sparkles className="w-4 h-4 mr-2" />
              Chat Now
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </section>

        {/* Main Content */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Periodic Table - Main Focus */}
          <div className="xl:col-span-2 bg-white/90 dark:bg-gray-900/90 rounded-2xl shadow-lg backdrop-blur-sm border border-gray-200/50 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white font-orbitron">
                Periodic Table
              </h2>
              <span className="text-sm text-gray-500">Click any element to explore</span>
            </div>
            <PeriodicTable onElementClick={handleElementClick} />
          </div>

          {/* Sidebar - Reaction Lab */}
          <div className="bg-white/90 dark:bg-gray-900/90 rounded-2xl shadow-lg backdrop-blur-sm border border-gray-200/50 p-6">
            <Tabs defaultValue="reaction" className="h-full">
              <TabsList className="w-full mb-4 bg-gray-100/50">
                <TabsTrigger value="reaction" className="flex-1">
                  <Beaker className="w-4 h-4 mr-2" />
                  Lab
                </TabsTrigger>
                <TabsTrigger value="guide" className="flex-1">
                  <BookOpen className="w-4 h-4 mr-2" />
                  Guide
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="reaction" className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium mb-2">Reaction Simulator</h3>
                  <p className="text-gray-600 text-sm mb-4">
                    Drag elements to create chemical reactions
                  </p>
                </div>
                <Separator />
                <ReactionZone onElementClick={handleElementClick} />
              </TabsContent>
              
              <TabsContent value="guide" className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium mb-4">Quick Guide</h3>
                  <div className="space-y-4 text-sm">
                    <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                      <h4 className="font-medium text-blue-700 mb-2">Getting Started</h4>
                      <ul className="space-y-1 text-gray-600 text-xs">
                        <li>• Click elements for detailed info</li>
                        <li>• Drag 2+ elements to reaction zone</li>
                        <li>• Press "Start Reaction" to simulate</li>
                      </ul>
                    </div>
                    
                    <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                      <h4 className="font-medium text-green-700 mb-2">Common Reactions</h4>
                      <ul className="space-y-1 text-gray-600 text-xs">
                        <li>• H + O → Water (H₂O)</li>
                        <li>• Na + Cl → Salt (NaCl)</li>
                        <li>• C + O → CO₂</li>
                        <li>• Fe + O → Rust (Fe₂O₃)</li>
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
    </DndProvider>
  );
};

export default Index;
