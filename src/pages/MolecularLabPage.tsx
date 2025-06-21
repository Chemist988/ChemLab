
import React, { useState } from 'react';
import { Element, elements } from '@/data/elements';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { RotateCcw, Play, Pause } from 'lucide-react';
import MolecularCanvas from '@/components/molecular/MolecularCanvas';
import ElementPalette from '@/components/molecular/ElementPalette';
import MolecularStats from '@/components/molecular/MolecularStats';
import { generateRandomPosition } from '@/utils/molecularUtils';

const MolecularLabPage = () => {
  const [selectedAtoms, setSelectedAtoms] = useState<Element[]>([]);
  const [isSimulating, setIsSimulating] = useState(false);
  const [selectedElement, setSelectedElement] = useState<Element | null>(null);
  const [atomPositions, setAtomPositions] = useState<[number, number, number][]>([]);

  const addAtom = (element: Element) => {
    if (selectedAtoms.length < 10) {
      const newPosition = generateRandomPosition();
      setSelectedAtoms([...selectedAtoms, element]);
      setAtomPositions([...atomPositions, newPosition]);
      console.log(`Added ${element.name} at position:`, newPosition);
    }
  };

  const clearAll = () => {
    setSelectedAtoms([]);
    setAtomPositions([]);
    setSelectedElement(null);
    console.log('Cleared all atoms');
  };

  const handleAtomClick = (atom: Element) => {
    setSelectedElement(atom);
    console.log(`Selected atom: ${atom.name}`);
  };

  const commonElements = elements.slice(0, 20);

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold font-orbitron mb-4 bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
          3D Molecular Visualizer
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Build molecules in real-time 3D space with physics simulation and electron orbital visualization
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3">
          <Card className="h-[600px] liquid-glass">
            <CardContent className="p-0 h-full">
              <MolecularCanvas
                selectedAtoms={selectedAtoms}
                atomPositions={atomPositions}
                selectedElement={selectedElement}
                onAtomClick={handleAtomClick}
              />
            </CardContent>
          </Card>
          
          <div className="flex gap-4 mt-4">
            <Button onClick={() => setIsSimulating(!isSimulating)} variant="default">
              {isSimulating ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
              {isSimulating ? 'Pause' : 'Simulate'}
            </Button>
            <Button onClick={clearAll} variant="outline">
              <RotateCcw className="w-4 h-4 mr-2" />
              Clear All
            </Button>
          </div>
        </div>

        <div className="space-y-6">
          <ElementPalette
            elements={commonElements}
            onAddAtom={addAtom}
            isDisabled={selectedAtoms.length >= 10}
          />

          <MolecularStats
            selectedAtoms={selectedAtoms}
            atomPositions={atomPositions}
            selectedElement={selectedElement}
            isSimulating={isSimulating}
          />
        </div>
      </div>
    </div>
  );
};

export default MolecularLabPage;
