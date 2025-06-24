
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Microscope, Search, Atom, Beaker } from 'lucide-react';
import { toast } from 'sonner';

interface Molecule {
  name: string;
  formula: string;
  structure: string;
  bonds: number;
  atoms: number;
  description: string;
}

const commonMolecules: Molecule[] = [
  {
    name: 'Water',
    formula: 'H₂O',
    structure: 'H-O-H',
    bonds: 2,
    atoms: 3,
    description: 'Essential for life, bent molecular geometry'
  },
  {
    name: 'Methane',
    formula: 'CH₄',
    structure: 'H₃C-H',
    bonds: 4,
    atoms: 5,
    description: 'Simplest hydrocarbon, tetrahedral geometry'
  },
  {
    name: 'Carbon Dioxide',
    formula: 'CO₂',
    structure: 'O=C=O',
    bonds: 4,
    atoms: 3,
    description: 'Linear molecule, greenhouse gas'
  },
  {
    name: 'Ammonia',
    formula: 'NH₃',
    structure: 'H₃N',
    bonds: 3,
    atoms: 4,
    description: 'Pyramidal geometry, basic compound'
  },
  {
    name: 'Ethanol',
    formula: 'C₂H₆O',
    structure: 'H₃C-CH₂-OH',
    bonds: 8,
    atoms: 9,
    description: 'Alcohol found in beverages'
  },
  {
    name: 'Benzene',
    formula: 'C₆H₆',
    structure: 'C₆H₆ (ring)',
    bonds: 12,
    atoms: 12,
    description: 'Aromatic compound, hexagonal ring'
  }
];

const MoleculeVisualizerPage = () => {
  const [selectedMolecule, setSelectedMolecule] = useState<Molecule | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [customFormula, setCustomFormula] = useState('');

  const filteredMolecules = commonMolecules.filter(molecule =>
    molecule.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    molecule.formula.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleMoleculeSelect = (molecule: Molecule) => {
    setSelectedMolecule(molecule);
    toast(`Visualizing ${molecule.name}`);
  };

  const handleCustomFormula = () => {
    if (customFormula.trim()) {
      const customMolecule: Molecule = {
        name: 'Custom Molecule',
        formula: customFormula,
        structure: 'Structure analysis needed',
        bonds: 0,
        atoms: 0,
        description: 'Custom molecular formula entered'
      };
      setSelectedMolecule(customMolecule);
      toast(`Analyzing ${customFormula}`);
    }
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold font-orbitron mb-4 bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
          Molecule Visualizer
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Explore molecular structures and understand chemical bonding patterns
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Molecule Library */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="w-5 h-5" />
                Molecule Library
              </CardTitle>
              <CardDescription>
                Browse common molecules or enter a custom formula
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    placeholder="Search molecules..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="flex-1"
                  />
                </div>

                <div className="flex gap-2">
                  <Input
                    placeholder="Enter custom formula (e.g., H2SO4)"
                    value={customFormula}
                    onChange={(e) => setCustomFormula(e.target.value)}
                    className="flex-1"
                  />
                  <Button onClick={handleCustomFormula}>
                    Analyze
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredMolecules.map((molecule, index) => (
                    <Card
                      key={index}
                      className={`cursor-pointer transition-all hover:shadow-md ${
                        selectedMolecule?.name === molecule.name ? 'ring-2 ring-primary' : ''
                      }`}
                      onClick={() => handleMoleculeSelect(molecule)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-medium">{molecule.name}</h3>
                          <Badge variant="secondary">{molecule.formula}</Badge>
                        </div>
                        <div className="text-sm text-muted-foreground mb-2">
                          {molecule.structure}
                        </div>
                        <div className="flex gap-4 text-xs text-muted-foreground">
                          <span>{molecule.atoms} atoms</span>
                          <span>{molecule.bonds} bonds</span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Molecule Details */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Microscope className="w-5 h-5" />
                Molecule Details
              </CardTitle>
            </CardHeader>
            <CardContent>
              {selectedMolecule ? (
                <div className="space-y-4">
                  <div className="text-center">
                    <h3 className="text-xl font-bold">{selectedMolecule.name}</h3>
                    <div className="text-2xl font-mono text-primary my-2">
                      {selectedMolecule.formula}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {selectedMolecule.description}
                    </p>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <span className="font-medium">Structure:</span>
                      <span className="font-mono">{selectedMolecule.structure}</span>
                    </div>

                    <div className="flex justify-between items-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                      <span className="font-medium">Total Atoms:</span>
                      <span>{selectedMolecule.atoms}</span>
                    </div>

                    <div className="flex justify-between items-center p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                      <span className="font-medium">Chemical Bonds:</span>
                      <span>{selectedMolecule.bonds}</span>
                    </div>
                  </div>

                  {/* Simple 2D Visualization */}
                  <div className="p-6 bg-gray-50 dark:bg-gray-900 rounded-lg text-center">
                    <div className="text-6xl mb-2">
                      {selectedMolecule.name === 'Water' && '💧'}
                      {selectedMolecule.name === 'Methane' && '⚡'}
                      {selectedMolecule.name === 'Carbon Dioxide' && '🌫️'}
                      {selectedMolecule.name === 'Ammonia' && '🔬'}
                      {selectedMolecule.name === 'Ethanol' && '🍺'}
                      {selectedMolecule.name === 'Benzene' && '⬡'}
                      {!['Water', 'Methane', 'Carbon Dioxide', 'Ammonia', 'Ethanol', 'Benzene'].includes(selectedMolecule.name) && '🧪'}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      2D Representation
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <Atom className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-muted-foreground">
                    Select a molecule to view its structure
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Beaker className="w-5 h-5" />
                Quick Facts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <div className="font-medium mb-1">Molecular Geometry</div>
                  <div className="text-muted-foreground">
                    Determines molecular properties and behavior
                  </div>
                </div>
                
                <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <div className="font-medium mb-1">Chemical Bonds</div>
                  <div className="text-muted-foreground">
                    Covalent bonds hold atoms together in molecules
                  </div>
                </div>
                
                <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                  <div className="font-medium mb-1">Electron Pairs</div>
                  <div className="text-muted-foreground">
                    Shared electrons create stable molecular structures
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default MoleculeVisualizerPage;
