
import React, { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import PeriodicTable from '@/components/PeriodicTable';
import ReactionZone from '@/components/ReactionZone';
import ElementDetail from '@/components/ElementDetail';
import ThemeSwitcher from '@/components/ThemeSwitcher';
import { Element } from '@/data/elements';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from '@/components/ui/separator';

const Index = () => {
  const [selectedElement, setSelectedElement] = useState<Element | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);

  const handleElementClick = (element: Element) => {
    setSelectedElement(element);
    setDetailOpen(true);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="min-h-screen bg-gradient-to-b from-background to-muted/30 dark:from-background dark:to-background/80 transition-colors">
        <div className="container mx-auto py-8">
          <header className="mb-12 flex flex-col items-center relative">
            <div className="absolute right-0 top-0">
              <ThemeSwitcher />
            </div>
            <h1 className="text-5xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600 dark:from-blue-400 dark:to-purple-500">
              Interactive Periodic Table
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto text-center">
              Explore elements and simulate reactions with stunning visualizations. 
              Drag elements from the table into the reaction zone to see what happens!
            </p>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 bg-gradient-to-br from-card/95 to-card/60 rounded-xl shadow-lg p-6 dark:shadow-blue-500/5 border border-white/10 backdrop-blur-sm">
              <h2 className="text-2xl font-semibold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600 dark:from-blue-400 dark:to-purple-500">Periodic Table of Elements</h2>
              <PeriodicTable onElementClick={handleElementClick} />
            </div>

            <div className="bg-gradient-to-br from-card/95 to-card/60 rounded-xl shadow-lg p-6 dark:shadow-purple-500/5 border border-white/10 backdrop-blur-sm">
              <Tabs defaultValue="reaction">
                <TabsList className="w-full mb-4 bg-white/10 dark:bg-black/10">
                  <TabsTrigger value="reaction" className="flex-1">Reaction Zone</TabsTrigger>
                  <TabsTrigger value="info" className="flex-1">Guide</TabsTrigger>
                </TabsList>
                
                <TabsContent value="reaction" className="space-y-4">
                  <h2 className="text-xl font-semibold">Reaction Simulator</h2>
                  <p className="text-muted-foreground text-sm">
                    Drag and drop elements to simulate chemical reactions
                  </p>
                  <Separator />
                  <ReactionZone onElementClick={handleElementClick} />
                </TabsContent>
                
                <TabsContent value="info">
                  <div className="space-y-4">
                    <h2 className="text-xl font-semibold">How it works</h2>
                    <ol className="list-decimal list-inside space-y-2 text-sm">
                      <li>Click any element to view detailed information</li>
                      <li>Drag elements from the periodic table to the reaction zone</li>
                      <li>Combine up to four elements to see their simulated reaction</li>
                      <li>The simulation will generate an animated visualization of the reaction</li>
                      <li>Clear the reaction zone to try different combinations</li>
                    </ol>
                    
                    <h3 className="text-lg font-semibold mt-6">Available Reactions</h3>
                    <p className="text-sm text-muted-foreground">
                      Try these combinations for interesting results:
                    </p>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                      <li>H + O (Hydrogen + Oxygen)</li>
                      <li>Na + Cl (Sodium + Chlorine)</li>
                      <li>C + O (Carbon + Oxygen)</li>
                      <li>H + Cl (Hydrogen + Chlorine)</li>
                      <li>Na + O (Sodium + Oxygen)</li>
                      <li>Fe + O (Iron + Oxygen)</li>
                      <li>Mg + O (Magnesium + Oxygen)</li>
                      <li>Cu + S (Copper + Sulfur)</li>
                      <li>K + Br (Potassium + Bromine)</li>
                      <li>Al + I (Aluminum + Iodine)</li>
                      <li>Ca + F (Calcium + Fluorine)</li>
                    </ul>
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
      </div>
    </DndProvider>
  );
};

export default Index;
