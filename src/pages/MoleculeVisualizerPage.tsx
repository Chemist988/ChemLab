
import React, { useState, useRef, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Text, Sphere } from '@react-three/drei';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Microscope, Search, Atom, Beaker, RotateCw, Zap, Layers3 } from 'lucide-react';
import { toast } from 'sonner';
import * as THREE from 'three';

interface Molecule {
  name: string;
  formula: string;
  structure: string;
  bonds: number;
  atoms: number;
  description: string;
  category: string;
  bondAngles?: string;
  molecularGeometry?: string;
  polarization?: string;
  color?: string;
  atoms3D?: Array<{
    element: string;
    position: [number, number, number];
    color: string;
  }>;
  bonds3D?: Array<{
    from: number;
    to: number;
    type: 'single' | 'double' | 'triple';
  }>;
}

const moleculeDatabase: Molecule[] = [
  // Basic molecules
  {
    name: 'Water', formula: 'H₂O', structure: 'H-O-H', bonds: 2, atoms: 3,
    description: 'Essential for life, bent molecular geometry',
    category: 'Basic', bondAngles: '104.5°', molecularGeometry: 'Bent', polarization: 'Polar',
    color: '#87CEEB',
    atoms3D: [
      { element: 'O', position: [0, 0, 0], color: '#ff0000' },
      { element: 'H', position: [0.96, 0, 0], color: '#ffffff' },
      { element: 'H', position: [-0.24, 0.93, 0], color: '#ffffff' }
    ],
    bonds3D: [{ from: 0, to: 1, type: 'single' }, { from: 0, to: 2, type: 'single' }]
  },
  {
    name: 'Methane', formula: 'CH₄', structure: 'H₃C-H', bonds: 4, atoms: 5,
    description: 'Simplest hydrocarbon, tetrahedral geometry',
    category: 'Hydrocarbons', bondAngles: '109.5°', molecularGeometry: 'Tetrahedral', polarization: 'Nonpolar',
    color: '#FFE4B5',
    atoms3D: [
      { element: 'C', position: [0, 0, 0], color: '#000000' },
      { element: 'H', position: [1, 1, 1], color: '#ffffff' },
      { element: 'H', position: [-1, -1, 1], color: '#ffffff' },
      { element: 'H', position: [-1, 1, -1], color: '#ffffff' },
      { element: 'H', position: [1, -1, -1], color: '#ffffff' }
    ],
    bonds3D: [
      { from: 0, to: 1, type: 'single' }, { from: 0, to: 2, type: 'single' },
      { from: 0, to: 3, type: 'single' }, { from: 0, to: 4, type: 'single' }
    ]
  },
  {
    name: 'Carbon Dioxide', formula: 'CO₂', structure: 'O=C=O', bonds: 4, atoms: 3,
    description: 'Linear molecule, greenhouse gas',
    category: 'Basic', bondAngles: '180°', molecularGeometry: 'Linear', polarization: 'Nonpolar',
    color: '#D3D3D3',
    atoms3D: [
      { element: 'C', position: [0, 0, 0], color: '#000000' },
      { element: 'O', position: [2.32, 0, 0], color: '#ff0000' },
      { element: 'O', position: [-2.32, 0, 0], color: '#ff0000' }
    ],
    bonds3D: [{ from: 0, to: 1, type: 'double' }, { from: 0, to: 2, type: 'double' }]
  },
  {
    name: 'Ammonia', formula: 'NH₃', structure: 'H₃N', bonds: 3, atoms: 4,
    description: 'Pyramidal geometry, basic compound',
    category: 'Basic', bondAngles: '107°', molecularGeometry: 'Trigonal Pyramidal', polarization: 'Polar',
    color: '#87CEEB',
    atoms3D: [
      { element: 'N', position: [0, 0, 0], color: '#0000ff' },
      { element: 'H', position: [0.94, 0.33, 0], color: '#ffffff' },
      { element: 'H', position: [-0.47, 0.33, 0.81], color: '#ffffff' },
      { element: 'H', position: [-0.47, 0.33, -0.81], color: '#ffffff' }
    ],
    bonds3D: [
      { from: 0, to: 1, type: 'single' }, { from: 0, to: 2, type: 'single' }, { from: 0, to: 3, type: 'single' }
    ]
  },

  // Organic compounds
  {
    name: 'Ethanol', formula: 'C₂H₆O', structure: 'H₃C-CH₂-OH', bonds: 8, atoms: 9,
    description: 'Alcohol found in beverages',
    category: 'Alcohols', molecularGeometry: 'Tetrahedral', polarization: 'Polar',
    color: '#F0E68C'
  },
  {
    name: 'Acetone', formula: 'C₃H₆O', structure: 'H₃C-CO-CH₃', bonds: 9, atoms: 10,
    description: 'Common solvent, nail polish remover',
    category: 'Ketones', molecularGeometry: 'Trigonal Planar', polarization: 'Polar',
    color: '#FFB6C1'
  },
  {
    name: 'Benzene', formula: 'C₆H₆', structure: 'C₆H₆ (ring)', bonds: 12, atoms: 12,
    description: 'Aromatic compound, hexagonal ring',
    category: 'Aromatics', bondAngles: '120°', molecularGeometry: 'Planar', polarization: 'Nonpolar',
    color: '#DDA0DD'
  },
  {
    name: 'Glucose', formula: 'C₆H₁₂O₆', structure: 'Ring structure', bonds: 24, atoms: 24,
    description: 'Simple sugar, energy source',
    category: 'Carbohydrates', molecularGeometry: 'Chair conformation', polarization: 'Polar',
    color: '#F5DEB3'
  },
  
  // Acids and bases
  {
    name: 'Hydrochloric Acid', formula: 'HCl', structure: 'H-Cl', bonds: 1, atoms: 2,
    description: 'Strong acid, stomach acid',
    category: 'Acids', molecularGeometry: 'Linear', polarization: 'Polar',
    color: '#98FB98'
  },
  {
    name: 'Sulfuric Acid', formula: 'H₂SO₄', structure: 'Complex', bonds: 8, atoms: 7,
    description: 'Strong acid, industrial use',
    category: 'Acids', molecularGeometry: 'Tetrahedral', polarization: 'Polar',
    color: '#F0F8FF'
  },
  {
    name: 'Sodium Hydroxide', formula: 'NaOH', structure: 'Na-O-H', bonds: 2, atoms: 3,
    description: 'Strong base, caustic soda',
    category: 'Bases', molecularGeometry: 'Linear', polarization: 'Ionic',
    color: '#E6E6FA'
  },
  
  // Salts
  {
    name: 'Salt', formula: 'NaCl', structure: 'Na⁺Cl⁻', bonds: 1, atoms: 2,
    description: 'Table salt, ionic compound',
    category: 'Salts', molecularGeometry: 'Cubic crystal', polarization: 'Ionic',
    color: '#F5F5DC'
  },
  {
    name: 'Calcium Carbonate', formula: 'CaCO₃', structure: 'Ca²⁺CO₃²⁻', bonds: 6, atoms: 5,
    description: 'Limestone, chalk, marble',
    category: 'Salts', molecularGeometry: 'Trigonal planar', polarization: 'Ionic',
    color: '#FFFAF0'
  },
  
  // Advanced molecules
  {
    name: 'Caffeine', formula: 'C₈H₁₀N₄O₂', structure: 'Complex ring system', bonds: 25, atoms: 24,
    description: 'Stimulant found in coffee',
    category: 'Biomolecules', molecularGeometry: 'Complex', polarization: 'Polar',
    color: '#8B4513'
  },
  {
    name: 'Aspirin', formula: 'C₉H₈O₄', structure: 'Benzene ring + groups', bonds: 21, atoms: 21,
    description: 'Pain reliever medication',
    category: 'Pharmaceuticals', molecularGeometry: 'Planar', polarization: 'Polar',
    color: '#F0F8FF'
  },
  {
    name: 'DNA Base (Adenine)', formula: 'C₅H₅N₅', structure: 'Double ring', bonds: 15, atoms: 15,
    description: 'DNA building block',
    category: 'Biomolecules', molecularGeometry: 'Planar', polarization: 'Polar',
    color: '#FF6347'
  },
  
  // Gases
  {
    name: 'Oxygen', formula: 'O₂', structure: 'O=O', bonds: 2, atoms: 2,
    description: 'Essential for respiration',
    category: 'Diatomic', molecularGeometry: 'Linear', polarization: 'Nonpolar',
    color: '#FF4500'
  },
  {
    name: 'Nitrogen', formula: 'N₂', structure: 'N≡N', bonds: 3, atoms: 2,
    description: 'Atmospheric gas, triple bond',
    category: 'Diatomic', molecularGeometry: 'Linear', polarization: 'Nonpolar',
    color: '#4169E1'
  },
  {
    name: 'Hydrogen', formula: 'H₂', structure: 'H-H', bonds: 1, atoms: 2,
    description: 'Lightest element, fuel',
    category: 'Diatomic', molecularGeometry: 'Linear', polarization: 'Nonpolar',
    color: '#E0E0E0'
  }
];

// 3D Molecule Component
const Molecule3D: React.FC<{ molecule: Molecule | null }> = ({ molecule }) => {
  if (!molecule || !molecule.atoms3D) {
    return (
      <group>
        <Text position={[0, 0, 0]} fontSize={0.5} color="#666">
          Select a molecule to view 3D structure
        </Text>
      </group>
    );
  }

  return (
    <group>
      {/* Render atoms */}
      {molecule.atoms3D.map((atom, index) => (
        <group key={index} position={atom.position}>
          <Sphere args={[atom.element === 'H' ? 0.3 : 0.5]} position={[0, 0, 0]}>
            <meshStandardMaterial color={atom.color} />
          </Sphere>
          <Text
            position={[0, atom.element === 'H' ? 0.5 : 0.7, 0]}
            fontSize={0.2}
            color="#333"
          >
            {atom.element}
          </Text>
        </group>
      ))}
      
      {/* Render bonds */}
      {molecule.bonds3D?.map((bond, index) => {
        const fromPos = molecule.atoms3D![bond.from].position;
        const toPos = molecule.atoms3D![bond.to].position;
        const distance = Math.sqrt(
          Math.pow(toPos[0] - fromPos[0], 2) +
          Math.pow(toPos[1] - fromPos[1], 2) +
          Math.pow(toPos[2] - fromPos[2], 2)
        );
        const midPoint: [number, number, number] = [
          (fromPos[0] + toPos[0]) / 2,
          (fromPos[1] + toPos[1]) / 2,
          (fromPos[2] + toPos[2]) / 2
        ];
        
        return (
          <group key={index} position={midPoint}>
            <mesh>
              <cylinderGeometry args={[0.05, 0.05, distance]} />
              <meshStandardMaterial color="#333" />
            </mesh>
          </group>
        );
      })}
    </group>
  );
};

const MoleculeVisualizerPage = () => {
  const [selectedMolecule, setSelectedMolecule] = useState<Molecule | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [customFormula, setCustomFormula] = useState('');
  const [view3D, setView3D] = useState(true);

  const categories = ['all', ...Array.from(new Set(moleculeDatabase.map(m => m.category)))];
  
  const filteredMolecules = moleculeDatabase.filter(molecule => {
    const matchesSearch = molecule.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         molecule.formula.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || molecule.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const handleMoleculeSelect = (molecule: Molecule) => {
    setSelectedMolecule(molecule);
    toast(`Viewing ${molecule.name} in ${view3D ? '3D' : '2D'}`);
  };

  const handleCustomFormula = () => {
    if (customFormula.trim()) {
      const customMolecule: Molecule = {
        name: 'Custom Molecule',
        formula: customFormula,
        structure: 'Analysis needed',
        bonds: 0,
        atoms: 0,
        description: 'Custom molecular formula entered',
        category: 'Custom'
      };
      setSelectedMolecule(customMolecule);
      toast(`Analyzing ${customFormula}`);
    }
  };

  return (
    <div className="container mx-auto py-8 px-4 min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-950 dark:to-slate-900">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold font-orbitron mb-4 bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
          3D Molecule Visualizer
        </h1>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Explore molecular structures in interactive 3D space with comprehensive molecular database
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Molecule Library */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="w-5 h-5" />
                Molecular Database ({filteredMolecules.length} compounds)
              </CardTitle>
              <CardDescription>
                Browse our extensive collection of molecules or analyze custom formulas
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    placeholder="Search molecules or formulas..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="flex-1"
                  />
                  <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                    <SelectTrigger className="w-48">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map(cat => (
                        <SelectItem key={cat} value={cat}>
                          {cat === 'all' ? 'All Categories' : cat}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
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

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-96 overflow-y-auto">
                  {filteredMolecules.map((molecule, index) => (
                    <Card
                      key={index}
                      className={`cursor-pointer transition-all hover:shadow-md bg-white/50 dark:bg-gray-800/50 ${
                        selectedMolecule?.name === molecule.name ? 'ring-2 ring-primary' : ''
                      }`}
                      onClick={() => handleMoleculeSelect(molecule)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-medium text-sm">{molecule.name}</h3>
                          <Badge variant="secondary" className="text-xs">{molecule.formula}</Badge>
                        </div>
                        <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
                          <span>{molecule.category}</span>
                          <span>{molecule.atoms} atoms</span>
                        </div>
                        <p className="text-xs text-muted-foreground">{molecule.description}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 3D Viewer and Details */}
        <div className="space-y-6">
          {/* 3D Viewer */}
          <Card className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Layers3 className="w-5 h-5" />
                  3D Structure
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setView3D(!view3D)}
                >
                  {view3D ? 'Hide 3D' : 'Show 3D'}
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {view3D ? (
                <div className="h-64 w-full bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-lg overflow-hidden">
                  <Canvas camera={{ position: [5, 5, 5], fov: 50 }}>
                    <ambientLight intensity={0.5} />
                    <pointLight position={[10, 10, 10]} />
                    <pointLight position={[-10, -10, -10]} intensity={0.3} />
                    <Molecule3D molecule={selectedMolecule} />
                    <OrbitControls enableZoom enablePan enableRotate />
                  </Canvas>
                </div>
              ) : (
                <div className="h-64 flex items-center justify-center text-muted-foreground">
                  <div className="text-center">
                    <Atom className="w-12 h-12 mx-auto mb-2" />
                    <p>3D view disabled</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Molecule Details */}
          <Card className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
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
                    <Badge className="mb-2">{selectedMolecule.category}</Badge>
                    <p className="text-sm text-muted-foreground">
                      {selectedMolecule.description}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <span className="font-medium text-sm">Total Atoms:</span>
                      <span className="text-sm">{selectedMolecule.atoms}</span>
                    </div>

                    <div className="flex justify-between items-center p-2 bg-green-50 dark:bg-green-900/20 rounded-lg">
                      <span className="font-medium text-sm">Chemical Bonds:</span>
                      <span className="text-sm">{selectedMolecule.bonds}</span>
                    </div>

                    {selectedMolecule.molecularGeometry && (
                      <div className="flex justify-between items-center p-2 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                        <span className="font-medium text-sm">Geometry:</span>
                        <span className="text-sm">{selectedMolecule.molecularGeometry}</span>
                      </div>
                    )}

                    {selectedMolecule.polarization && (
                      <div className="flex justify-between items-center p-2 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                        <span className="font-medium text-sm">Polarity:</span>
                        <span className="text-sm">{selectedMolecule.polarization}</span>
                      </div>
                    )}

                    {selectedMolecule.bondAngles && (
                      <div className="flex justify-between items-center p-2 bg-pink-50 dark:bg-pink-900/20 rounded-lg">
                        <span className="font-medium text-sm">Bond Angles:</span>
                        <span className="text-sm">{selectedMolecule.bondAngles}</span>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <Atom className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-muted-foreground">
                    Select a molecule to view its detailed structure and properties
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default MoleculeVisualizerPage;
