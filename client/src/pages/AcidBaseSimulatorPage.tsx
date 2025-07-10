import React, { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Beaker, Trash2, Plus, ArrowRight, Droplets, TestTube } from 'lucide-react';
import { toast } from 'sonner';

interface AcidBase {
  id: string;
  name: string;
  formula: string;
  type: 'acid' | 'base';
  strength: 'strong' | 'weak';
  concentration: number;
  color: string;
}

interface Solution {
  acids: AcidBase[];
  bases: AcidBase[];
  ph: number;
  color: string;
  name: string;
}

const commonAcids: AcidBase[] = [
  { id: 'hcl', name: 'Hydrochloric Acid', formula: 'HCl', type: 'acid', strength: 'strong', concentration: 1.0, color: 'rgb(255, 100, 100)' },
  { id: 'h2so4', name: 'Sulfuric Acid', formula: 'H₂SO₄', type: 'acid', strength: 'strong', concentration: 1.0, color: 'rgb(255, 50, 50)' },
  { id: 'hno3', name: 'Nitric Acid', formula: 'HNO₃', type: 'acid', strength: 'strong', concentration: 1.0, color: 'rgb(255, 150, 100)' },
  { id: 'ch3cooh', name: 'Acetic Acid', formula: 'CH₃COOH', type: 'acid', strength: 'weak', concentration: 1.0, color: 'rgb(255, 200, 150)' },
];

const commonBases: AcidBase[] = [
  { id: 'naoh', name: 'Sodium Hydroxide', formula: 'NaOH', type: 'base', strength: 'strong', concentration: 1.0, color: 'rgb(100, 100, 255)' },
  { id: 'koh', name: 'Potassium Hydroxide', formula: 'KOH', type: 'base', strength: 'strong', concentration: 1.0, color: 'rgb(150, 150, 255)' },
  { id: 'nh3', name: 'Ammonia', formula: 'NH₃', type: 'base', strength: 'weak', concentration: 1.0, color: 'rgb(200, 200, 255)' },
  { id: 'caoh2', name: 'Calcium Hydroxide', formula: 'Ca(OH)₂', type: 'base', strength: 'strong', concentration: 1.0, color: 'rgb(180, 180, 255)' },
];

const AcidBaseSimulatorPage = () => {
  const [currentSolution, setCurrentSolution] = useState<Solution>({
    acids: [],
    bases: [],
    ph: 7,
    color: 'rgb(200, 200, 200)',
    name: ''
  });
  const [solutionName, setSolutionName] = useState('');
  const [savedSolutions, setSavedSolutions] = useState<Solution[]>([]);

  const calculatePH = useCallback((acids: AcidBase[], bases: AcidBase[]) => {
    if (acids.length === 0 && bases.length === 0) return 7;
    
    let totalAcidity = 0;
    let totalBasicity = 0;
    
    acids.forEach(acid => {
      const strength = acid.strength === 'strong' ? 1 : 0.1;
      totalAcidity += acid.concentration * strength;
    });
    
    bases.forEach(base => {
      const strength = base.strength === 'strong' ? 1 : 0.1;
      totalBasicity += base.concentration * strength;
    });
    
    const netAcidity = totalAcidity - totalBasicity;
    
    if (netAcidity > 0) {
      return Math.max(0, 7 - Math.log10(netAcidity * 10));
    } else if (netAcidity < 0) {
      return Math.min(14, 7 + Math.log10(Math.abs(netAcidity) * 10));
    }
    
    return 7;
  }, []);

  const getSolutionColor = useCallback((ph: number, acids: AcidBase[], bases: AcidBase[]) => {
    if (acids.length === 0 && bases.length === 0) {
      return 'rgb(200, 200, 200)';
    }
    
    if (ph < 3) return 'rgb(255, 100, 100)'; // Strong acid - red
    if (ph < 6) return 'rgb(255, 180, 120)'; // Weak acid - orange
    if (ph < 8) return 'rgb(220, 220, 220)'; // Neutral - gray
    if (ph < 11) return 'rgb(150, 200, 255)'; // Weak base - light blue
    return 'rgb(100, 150, 255)'; // Strong base - blue
  }, []);

  const addAcid = useCallback((acid: AcidBase) => {
    const newAcids = [...currentSolution.acids, acid];
    const ph = calculatePH(newAcids, currentSolution.bases);
    const color = getSolutionColor(ph, newAcids, currentSolution.bases);
    
    setCurrentSolution(prev => ({
      ...prev,
      acids: newAcids,
      ph,
      color
    }));
    
    toast(`Added ${acid.name} to solution`);
  }, [currentSolution, calculatePH, getSolutionColor]);

  const addBase = useCallback((base: AcidBase) => {
    const newBases = [...currentSolution.bases, base];
    const ph = calculatePH(currentSolution.acids, newBases);
    const color = getSolutionColor(ph, currentSolution.acids, newBases);
    
    setCurrentSolution(prev => ({
      ...prev,
      bases: newBases,
      ph,
      color
    }));
    
    toast(`Added ${base.name} to solution`);
  }, [currentSolution, calculatePH, getSolutionColor]);

  const clearSolution = useCallback(() => {
    setCurrentSolution({
      acids: [],
      bases: [],
      ph: 7,
      color: 'rgb(200, 200, 200)',
      name: ''
    });
    setSolutionName('');
    toast('Solution cleared');
  }, []);

  const saveSolution = useCallback(() => {
    if (!solutionName.trim()) {
      toast.error('Please enter a solution name');
      return;
    }
    
    const solution = {
      ...currentSolution,
      name: solutionName.trim()
    };
    
    setSavedSolutions(prev => [...prev, solution]);
    setSolutionName('');
    toast.success(`Saved solution: ${solution.name}`);
  }, [currentSolution, solutionName]);

  const getPHColor = (ph: number) => {
    if (ph < 3) return 'text-red-500';
    if (ph < 6) return 'text-orange-500';
    if (ph < 8) return 'text-gray-500';
    if (ph < 11) return 'text-blue-400';
    return 'text-blue-600';
  };

  const getPHLabel = (ph: number) => {
    if (ph < 3) return 'Strongly Acidic';
    if (ph < 6) return 'Weakly Acidic';
    if (ph < 8) return 'Neutral';
    if (ph < 11) return 'Weakly Basic';
    return 'Strongly Basic';
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold font-orbitron mb-4 bg-gradient-to-r from-red-400 via-yellow-500 to-blue-600 bg-clip-text text-transparent">
          Acid-Base Reaction Simulator
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Mix acids and bases to create solutions and observe pH changes in real-time
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Solution Beaker */}
        <div className="lg:col-span-1">
          <Card className="liquid-glass h-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Beaker className="w-5 h-5" />
                Solution Beaker
              </CardTitle>
              <CardDescription>
                Current solution composition and pH
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Solution Name Input */}
              <div className="flex gap-2">
                <Input
                  placeholder="Solution name..."
                  value={solutionName}
                  onChange={(e) => setSolutionName(e.target.value)}
                  className="flex-1"
                />
                <Button onClick={saveSolution} disabled={currentSolution.acids.length === 0 && currentSolution.bases.length === 0}>
                  Save
                </Button>
                <Button variant="outline" onClick={clearSolution}>
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>

              {/* Beaker Visualization */}
              <div className="relative mx-auto w-48 h-64">
                <div className="absolute inset-0 border-4 border-gray-300 rounded-b-full rounded-t-lg bg-transparent">
                  {/* Solution */}
                  <div 
                    className="absolute bottom-0 left-0 right-0 rounded-b-full transition-all duration-1000 ease-out"
                    style={{
                      height: `${Math.min(85, (currentSolution.acids.length + currentSolution.bases.length) * 20 + 20)}%`,
                      backgroundColor: currentSolution.color,
                      opacity: 0.8,
                      animation: currentSolution.acids.length > 0 || currentSolution.bases.length > 0 ? 'gentle-bubble 3s infinite' : 'none'
                    }}
                  />
                  
                  {/* Measurement marks */}
                  <div className="absolute left-2 top-4 text-xs text-muted-foreground">100ml</div>
                  <div className="absolute left-2 top-1/2 text-xs text-muted-foreground">50ml</div>
                </div>
              </div>

              {/* pH Scale */}
              <div className="space-y-4">
                <div className="text-center">
                  <div className={`text-3xl font-bold ${getPHColor(currentSolution.ph)}`}>
                    pH {currentSolution.ph.toFixed(2)}
                  </div>
                  <div className={`text-sm ${getPHColor(currentSolution.ph)}`}>
                    {getPHLabel(currentSolution.ph)}
                  </div>
                </div>
                
                {/* pH Scale Visual */}
                <div className="relative h-8 rounded-lg overflow-hidden bg-gradient-to-r from-red-500 via-yellow-500 via-green-500 via-blue-500 to-purple-500">
                  <div 
                    className="absolute top-0 w-1 h-full bg-white border-2 border-black transition-all duration-500"
                    style={{ left: `${(currentSolution.ph / 14) * 100}%` }}
                  />
                  <div className="absolute bottom-0 left-0 text-xs text-white font-bold p-1">0</div>
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 text-xs text-black font-bold p-1">7</div>
                  <div className="absolute bottom-0 right-0 text-xs text-white font-bold p-1">14</div>
                </div>
              </div>

              {/* Current Components */}
              <div className="space-y-2">
                <h4 className="font-semibold">Components:</h4>
                {currentSolution.acids.map((acid, index) => (
                  <Badge key={`acid-${index}`} variant="destructive" className="mr-2">
                    {acid.formula}
                  </Badge>
                ))}
                {currentSolution.bases.map((base, index) => (
                  <Badge key={`base-${index}`} className="mr-2 bg-blue-500">
                    {base.formula}
                  </Badge>
                ))}
                {currentSolution.acids.length === 0 && currentSolution.bases.length === 0 && (
                  <p className="text-muted-foreground text-sm">Empty beaker</p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Acids and Bases Selection */}
        <div className="lg:col-span-2 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Acids */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-red-600">
                  <TestTube className="w-5 h-5" />
                  Acids
                </CardTitle>
                <CardDescription>
                  Click to add acids to the solution
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-2">
                  {commonAcids.map((acid) => (
                    <Button
                      key={acid.id}
                      variant="outline"
                      onClick={() => addAcid(acid)}
                      className="justify-start h-auto p-4 hover:bg-red-50 dark:hover:bg-red-950 border-red-200 dark:border-red-800"
                    >
                      <div className="text-left">
                        <div className="font-semibold">{acid.name}</div>
                        <div className="text-sm text-muted-foreground">{acid.formula}</div>
                        <Badge variant={acid.strength === 'strong' ? 'destructive' : 'secondary'} className="text-xs mt-1">
                          {acid.strength}
                        </Badge>
                      </div>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Bases */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-blue-600">
                  <Droplets className="w-5 h-5" />
                  Bases
                </CardTitle>
                <CardDescription>
                  Click to add bases to the solution
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-2">
                  {commonBases.map((base) => (
                    <Button
                      key={base.id}
                      variant="outline"
                      onClick={() => addBase(base)}
                      className="justify-start h-auto p-4 hover:bg-blue-50 dark:hover:bg-blue-950 border-blue-200 dark:border-blue-800"
                    >
                      <div className="text-left">
                        <div className="font-semibold">{base.name}</div>
                        <div className="text-sm text-muted-foreground">{base.formula}</div>
                        <Badge variant={base.strength === 'strong' ? 'default' : 'secondary'} className="text-xs mt-1 bg-blue-500">
                          {base.strength}
                        </Badge>
                      </div>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Saved Solutions */}
          {savedSolutions.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Saved Solutions</CardTitle>
                <CardDescription>Previously created acid-base solutions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {savedSolutions.map((solution, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <h4 className="font-semibold">{solution.name}</h4>
                      <div className={`text-lg font-bold ${getPHColor(solution.ph)}`}>
                        pH {solution.ph.toFixed(2)}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {solution.acids.length} acids, {solution.bases.length} bases
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default AcidBaseSimulatorPage;