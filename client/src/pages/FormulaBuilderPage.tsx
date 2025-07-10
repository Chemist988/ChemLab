
import React, { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Calculator, Trash2, Plus, Minus, Zap, Atom, FlaskConical } from 'lucide-react';
import { Element, elements } from '@/data/elements';
import { toast } from 'sonner';

interface FormulaElement {
  element: Element;
  count: number;
  id: string;
}

interface Molecule {
  name: string;
  formula: FormulaElement[];
  mass: number;
  charge: number;
}

const FormulaBuilderPage = () => {
  const [currentFormula, setCurrentFormula] = useState<FormulaElement[]>([]);
  const [savedMolecules, setSavedMolecules] = useState<Molecule[]>([]);
  const [moleculeName, setMoleculeName] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const commonElements = elements.slice(0, 20);
  const filteredElements = elements.filter(el => 
    el.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    el.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const addElement = useCallback((element: Element) => {
    const existingIndex = currentFormula.findIndex(fe => fe.element.id === element.id);
    
    if (existingIndex >= 0) {
      setCurrentFormula(prev => prev.map((fe, idx) => 
        idx === existingIndex ? { ...fe, count: fe.count + 1 } : fe
      ));
    } else {
      setCurrentFormula(prev => [...prev, {
        element,
        count: 1,
        id: `${element.id}-${Date.now()}`
      }]);
    }
    toast(`Added ${element.symbol} to formula`);
  }, [currentFormula]);

  const updateElementCount = useCallback((id: string, delta: number) => {
    setCurrentFormula(prev => prev.map(fe => {
      if (fe.id === id) {
        const newCount = Math.max(1, fe.count + delta);
        return { ...fe, count: newCount };
      }
      return fe;
    }));
  }, []);

  const removeElement = useCallback((id: string) => {
    setCurrentFormula(prev => prev.filter(fe => fe.id !== id));
  }, []);

  const calculateMolecularMass = useCallback(() => {
    return currentFormula.reduce((total, fe) => total + (fe.element.atomicMass * fe.count), 0);
  }, [currentFormula]);

  const getFormulaString = useCallback(() => {
    return currentFormula
      .map(fe => `${fe.element.symbol}${fe.count > 1 ? fe.count : ''}`)
      .join('');
  }, [currentFormula]);

  const saveMolecule = useCallback(() => {
    if (!moleculeName.trim() || currentFormula.length === 0) {
      toast.error('Please enter a name and add elements to the formula');
      return;
    }

    const molecule: Molecule = {
      name: moleculeName.trim(),
      formula: [...currentFormula],
      mass: calculateMolecularMass(),
      charge: 0
    };

    setSavedMolecules(prev => [...prev, molecule]);
    setMoleculeName('');
    setCurrentFormula([]);
    toast.success(`Saved molecule: ${molecule.name}`);
  }, [moleculeName, currentFormula, calculateMolecularMass]);

  const clearFormula = useCallback(() => {
    setCurrentFormula([]);
    setMoleculeName('');
    toast('Formula cleared');
  }, []);

  const loadMolecule = useCallback((molecule: Molecule) => {
    setCurrentFormula([...molecule.formula]);
    setMoleculeName(molecule.name);
    toast(`Loaded ${molecule.name}`);
  }, []);

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold font-orbitron mb-4 bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
          Molecular Formula Builder
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Build chemical formulas interactively, calculate molecular masses, and save your compounds
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Formula Builder */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="liquid-glass">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FlaskConical className="w-5 h-5" />
                Current Formula
              </CardTitle>
              <CardDescription>
                Build your molecular formula by adding elements
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    placeholder="Molecule name..."
                    value={moleculeName}
                    onChange={(e) => setMoleculeName(e.target.value)}
                    className="flex-1"
                  />
                  <Button onClick={saveMolecule} disabled={currentFormula.length === 0}>
                    Save
                  </Button>
                  <Button variant="outline" onClick={clearFormula}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>

                {/* Formula Display */}
                <div className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl border">
                  <div className="text-center">
                    <div className="text-3xl font-mono font-bold mb-2">
                      {getFormulaString() || 'Empty Formula'}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Molecular Mass: {calculateMolecularMass().toFixed(2)} g/mol
                    </div>
                  </div>
                </div>

                {/* Current Elements */}
                {currentFormula.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="font-medium">Elements in Formula:</h4>
                    <div className="grid gap-2">
                      {currentFormula.map((fe) => (
                        <div key={fe.id} className="flex items-center justify-between p-3 bg-white/50 dark:bg-gray-800/50 rounded-lg">
                          <div className="flex items-center gap-3">
                            <Badge variant="secondary">{fe.element.symbol}</Badge>
                            <span className="font-medium">{fe.element.name}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button size="sm" variant="outline" onClick={() => updateElementCount(fe.id, -1)}>
                              <Minus className="w-3 h-3" />
                            </Button>
                            <span className="w-8 text-center font-mono">{fe.count}</span>
                            <Button size="sm" variant="outline" onClick={() => updateElementCount(fe.id, 1)}>
                              <Plus className="w-3 h-3" />
                            </Button>
                            <Button size="sm" variant="destructive" onClick={() => removeElement(fe.id)}>
                              <Trash2 className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Element Palette */}
          <Card className="liquid-glass">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Atom className="w-5 h-5" />
                Element Palette
              </CardTitle>
              <CardDescription>
                Search and select elements to add to your formula
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Input
                  placeholder="Search elements..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                
                <div className="grid grid-cols-6 sm:grid-cols-8 gap-2">
                  {(searchTerm ? filteredElements.slice(0, 48) : commonElements).map((element) => (
                    <Button
                      key={element.id}
                      variant="outline"
                      size="sm"
                      onClick={() => addElement(element)}
                      className="liquid-glass-button p-2 h-auto flex flex-col items-center gap-1 hover:scale-105 transition-transform"
                    >
                      <span className="font-bold text-xs">{element.symbol}</span>
                      <span className="text-[0.6rem] opacity-70">{element.atomicNumber}</span>
                    </Button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Saved Molecules */}
        <div className="space-y-6">
          <Card className="liquid-glass">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="w-5 h-5" />
                Formula Stats
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span>Elements:</span>
                  <span>{currentFormula.length}</span>
                </div>
                <div className="flex justify-between">
                  <span>Total Atoms:</span>
                  <span>{currentFormula.reduce((sum, fe) => sum + fe.count, 0)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Molecular Mass:</span>
                  <span>{calculateMolecularMass().toFixed(2)} g/mol</span>
                </div>
                <Separator />
                <div className="flex justify-between">
                  <span>Status:</span>
                  <Badge variant={currentFormula.length > 0 ? "default" : "secondary"}>
                    {currentFormula.length > 0 ? "Building" : "Empty"}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="liquid-glass">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="w-5 h-5" />
                Saved Molecules
              </CardTitle>
              <CardDescription>
                Your saved chemical formulas
              </CardDescription>
            </CardHeader>
            <CardContent>
              {savedMolecules.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-4">
                  No saved molecules yet
                </p>
              ) : (
                <div className="space-y-3">
                  {savedMolecules.slice().reverse().slice(0, 10).map((molecule, index) => (
                    <div
                      key={index}
                      className="p-3 bg-white/50 dark:bg-gray-800/50 rounded-lg cursor-pointer hover:bg-white/70 dark:hover:bg-gray-800/70 transition-colors"
                      onClick={() => loadMolecule(molecule)}
                    >
                      <div className="font-medium text-sm">{molecule.name}</div>
                      <div className="font-mono text-xs text-muted-foreground">
                        {molecule.formula.map(fe => `${fe.element.symbol}${fe.count > 1 ? fe.count : ''}`).join('')}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {molecule.mass.toFixed(2)} g/mol
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default FormulaBuilderPage;
