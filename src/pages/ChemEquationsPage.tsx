
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Calculator, CheckCircle, XCircle, FlaskConical, ArrowRight } from 'lucide-react';

const ChemEquationsPage = () => {
  const [equation, setEquation] = useState('');
  const [result, setResult] = useState<string | null>(null);
  const [selectedExample, setSelectedExample] = useState<string>('combustion');

  const examples = {
    combustion: {
      title: 'Combustion Reactions',
      equations: [
        { unbalanced: 'CH₄ + O₂ → CO₂ + H₂O', balanced: 'CH₄ + 2O₂ → CO₂ + 2H₂O' },
        { unbalanced: 'C₂H₆ + O₂ → CO₂ + H₂O', balanced: '2C₂H₆ + 7O₂ → 4CO₂ + 6H₂O' },
        { unbalanced: 'C₃H₈ + O₂ → CO₂ + H₂O', balanced: 'C₃H₈ + 5O₂ → 3CO₂ + 4H₂O' }
      ]
    },
    synthesis: {
      title: 'Synthesis Reactions',
      equations: [
        { unbalanced: 'H₂ + O₂ → H₂O', balanced: '2H₂ + O₂ → 2H₂O' },
        { unbalanced: 'Na + Cl₂ → NaCl', balanced: '2Na + Cl₂ → 2NaCl' },
        { unbalanced: 'N₂ + H₂ → NH₃', balanced: 'N₂ + 3H₂ → 2NH₃' }
      ]
    },
    decomposition: {
      title: 'Decomposition Reactions',
      equations: [
        { unbalanced: 'H₂O → H₂ + O₂', balanced: '2H₂O → 2H₂ + O₂' },
        { unbalanced: 'KClO₃ → KCl + O₂', balanced: '2KClO₃ → 2KCl + 3O₂' },
        { unbalanced: 'CaCO₃ → CaO + CO₂', balanced: 'CaCO₃ → CaO + CO₂' }
      ]
    }
  };

  const balanceEquation = (eq: string) => {
    // Simple equation balancer for demonstration
    const commonBalanced: Record<string, string> = {
      'CH4 + O2 → CO2 + H2O': 'CH₄ + 2O₂ → CO₂ + 2H₂O',
      'H2 + O2 → H2O': '2H₂ + O₂ → 2H₂O',
      'Na + Cl2 → NaCl': '2Na + Cl₂ → 2NaCl',
      'C2H6 + O2 → CO2 + H2O': '2C₂H₆ + 7O₂ → 4CO₂ + 6H₂O',
      'N2 + H2 → NH3': 'N₂ + 3H₂ → 2NH₃'
    };
    
    const normalized = eq.replace(/[\s₀-₉]/g, '').replace(/(\d)/g, '');
    return commonBalanced[eq] || 'Unable to balance this equation automatically';
  };

  const handleBalance = () => {
    if (!equation.trim()) return;
    const balanced = balanceEquation(equation);
    setResult(balanced);
  };

  const currentExample = examples[selectedExample as keyof typeof examples];

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4 font-orbitron">Chemical Equations</h1>
          <p className="text-gray-300">Balance equations and understand reaction types</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Equation Balancer */}
          <Card className="bg-white/10 backdrop-blur-lg border-white/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Calculator className="w-5 h-5" />
                Equation Balancer
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-gray-300 text-sm mb-2 block">Enter chemical equation:</label>
                <Input
                  value={equation}
                  onChange={(e) => setEquation(e.target.value)}
                  placeholder="e.g., H2 + O2 → H2O"
                  className="bg-white/10 border-white/30 text-white placeholder-gray-400"
                />
              </div>
              
              <Button onClick={handleBalance} className="w-full">
                <FlaskConical className="w-4 h-4 mr-2" />
                Balance Equation
              </Button>
              
              {result && (
                <div className="p-4 bg-green-900/30 rounded-lg border border-green-500/50">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span className="text-green-400 font-semibold">Balanced Equation:</span>
                  </div>
                  <p className="text-white font-mono text-lg">{result}</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Reaction Types */}
          <Card className="bg-white/10 backdrop-blur-lg border-white/20">
            <CardHeader>
              <CardTitle className="text-white">Reaction Types</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2 mb-4">
                {Object.entries(examples).map(([key, example]) => (
                  <Button
                    key={key}
                    onClick={() => setSelectedExample(key)}
                    variant={selectedExample === key ? "default" : "outline"}
                    size="sm"
                  >
                    {example.title}
                  </Button>
                ))}
              </div>
              
              <h4 className="text-white font-semibold mb-3">{currentExample.title}</h4>
              <div className="space-y-3">
                {currentExample.equations.map((eq, index) => (
                  <div key={index} className="p-3 bg-blue-900/20 rounded-lg">
                    <div className="text-gray-400 text-sm mb-1">Unbalanced:</div>
                    <div className="text-gray-300 font-mono mb-2">{eq.unbalanced}</div>
                    <div className="text-green-400 text-sm mb-1">Balanced:</div>
                    <div className="text-white font-mono">{eq.balanced}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Balancing Tips */}
        <Card className="bg-gradient-to-r from-orange-900/30 to-red-900/30 backdrop-blur-lg border-white/20 mt-8">
          <CardHeader>
            <CardTitle className="text-white">Balancing Tips</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-orange-400 font-semibold mb-3">Step-by-Step Process</h4>
                <ol className="text-gray-300 space-y-2 text-sm">
                  <li>1. Count atoms of each element on both sides</li>
                  <li>2. Start with the most complex molecule</li>
                  <li>3. Balance one element at a time</li>
                  <li>4. Use coefficients, never change formulas</li>
                  <li>5. Check that all atoms are balanced</li>
                </ol>
              </div>
              
              <div>
                <h4 className="text-red-400 font-semibold mb-3">Common Mistakes</h4>
                <ul className="text-gray-300 space-y-2 text-sm">
                  <li>• Don't change chemical formulas</li>
                  <li>• Only use whole number coefficients</li>
                  <li>• Balance polyatomic ions as units</li>
                  <li>• Check your work twice</li>
                  <li>• Start with metals, then nonmetals</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ChemEquationsPage;
