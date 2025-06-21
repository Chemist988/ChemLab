
import React, { useState } from 'react';
import { Calculator, Atom, Beaker, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const ChemCalculatorPage = () => {
  const [molarMass, setMolarMass] = useState({ formula: '', result: '' });
  const [molarity, setMolarity] = useState({ moles: '', volume: '', result: '' });
  const [pH, setPH] = useState({ concentration: '', result: '' });

  const calculateMolarMass = () => {
    // Simplified molar mass calculation for common compounds
    const masses: { [key: string]: number } = {
      'H': 1.008, 'He': 4.003, 'Li': 6.941, 'Be': 9.012, 'B': 10.811, 'C': 12.011,
      'N': 14.007, 'O': 15.999, 'F': 18.998, 'Ne': 20.180, 'Na': 22.990, 'Mg': 24.305,
      'Al': 26.982, 'Si': 28.086, 'P': 30.974, 'S': 32.065, 'Cl': 35.453, 'Ar': 39.948,
      'K': 39.098, 'Ca': 40.078, 'Fe': 55.845, 'Cu': 63.546, 'Zn': 65.38, 'Br': 79.904,
      'Ag': 107.868, 'I': 126.904, 'Au': 196.967
    };

    const formula = molarMass.formula.toUpperCase();
    let totalMass = 0;
    let i = 0;

    try {
      while (i < formula.length) {
        let element = '';
        let count = '';

        // Get element symbol
        if (formula[i] && formula[i].match(/[A-Z]/)) {
          element = formula[i];
          i++;
          
          // Check for second lowercase letter
          if (formula[i] && formula[i].match(/[a-z]/)) {
            element += formula[i].toLowerCase();
            i++;
          }
        }

        // Get count
        while (i < formula.length && formula[i].match(/[0-9]/)) {
          count += formula[i];
          i++;
        }

        const elementMass = masses[element];
        const elementCount = count ? parseInt(count) : 1;

        if (elementMass) {
          totalMass += elementMass * elementCount;
        }
      }

      setMolarMass({ ...molarMass, result: totalMass.toFixed(3) + ' g/mol' });
    } catch (error) {
      setMolarMass({ ...molarMass, result: 'Invalid formula' });
    }
  };

  const calculateMolarity = () => {
    const molesVal = parseFloat(molarity.moles);
    const volumeVal = parseFloat(molarity.volume);
    
    if (molesVal && volumeVal) {
      const result = molesVal / volumeVal;
      setMolarity({ ...molarity, result: result.to fixed(3) + ' M' });
    } else {
      setMolarity({ ...molarity, result: 'Invalid input' });
    }
  };

  const calculatePH = () => {
    const concentration = parseFloat(pH.concentration);
    
    if (concentration && concentration > 0) {
      const result = -Math.log10(concentration);
      setPH({ ...pH, result: result.toFixed(2) });
    } else {
      setPH({ ...pH, result: 'Invalid concentration' });
    }
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4 font-orbitron">Chemistry Calculator</h1>
          <p className="text-gray-300">Essential calculations for chemistry problems</p>
        </div>

        <Tabs defaultValue="molar" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 bg-white/10 backdrop-blur-lg">
            <TabsTrigger value="molar" className="data-[state=active]:bg-white/20">
              <Atom className="w-4 h-4 mr-2" />
              Molar Mass
            </TabsTrigger>
            <TabsTrigger value="molarity" className="data-[state=active]:bg-white/20">
              <Beaker className="w-4 h-4 mr-2" />
              Molarity
            </TabsTrigger>
            <TabsTrigger value="ph" className="data-[state=active]:bg-white/20">
              <Zap className="w-4 h-4 mr-2" />
              pH Calculator
            </TabsTrigger>
          </TabsList>

          <TabsContent value="molar">
            <Card className="bg-white/10 backdrop-blur-lg border-white/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Calculator className="w-5 h-5" />
                  Molar Mass Calculator
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-white text-sm mb-2 block">Chemical Formula</label>
                  <Input
                    placeholder="e.g., H2O, NaCl, CaCO3"
                    value={molarMass.formula}
                    onChange={(e) => setMolarMass({ ...molarMass, formula: e.target.value })}
                    className="bg-white/10 border-white/30 text-white placeholder-gray-400"
                  />
                </div>
                <Button 
                  onClick={calculateMolarMass}
                  className="w-full bg-blue-600 hover:bg-blue-700"
                >
                  Calculate Molar Mass
                </Button>
                {molarMass.result && (
                  <div className="p-4 bg-green-900/30 border border-green-500/50 rounded-lg">
                    <p className="text-green-400 font-semibold">Result: {molarMass.result}</p>
                  </div>
                )}
                <div className="text-sm text-gray-400">
                  <p>Enter a chemical formula to calculate its molar mass.</p>
                  <p>Examples: H2O (water), NaCl (salt), CaCO3 (calcium carbonate)</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="molarity">
            <Card className="bg-white/10 backdrop-blur-lg border-white/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Calculator className="w-5 h-5" />
                  Molarity Calculator
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-white text-sm mb-2 block">Moles of solute</label>
                    <Input
                      placeholder="e.g., 0.5"
                      value={molarity.moles}
                      onChange={(e) => setMolarity({ ...molarity, moles: e.target.value })}
                      className="bg-white/10 border-white/30 text-white placeholder-gray-400"
                    />
                  </div>
                  <div>
                    <label className="text-white text-sm mb-2 block">Volume (L)</label>
                    <Input
                      placeholder="e.g., 1.0"
                      value={molarity.volume}
                      onChange={(e) => setMolarity({ ...molarity, volume: e.target.value })}
                      className="bg-white/10 border-white/30 text-white placeholder-gray-400"
                    />
                  </div>
                </div>
                <Button 
                  onClick={calculateMolarity}
                  className="w-full bg-purple-600 hover:bg-purple-700"
                >
                  Calculate Molarity
                </Button>
                {molarity.result && (
                  <div className="p-4 bg-green-900/30 border border-green-500/50 rounded-lg">
                    <p className="text-green-400 font-semibold">Molarity: {molarity.result}</p>
                  </div>
                )}
                <div className="text-sm text-gray-400">
                  <p>Molarity (M) = moles of solute ÷ liters of solution</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="ph">
            <Card className="bg-white/10 backdrop-blur-lg border-white/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Calculator className="w-5 h-5" />
                  pH Calculator
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-white text-sm mb-2 block">H⁺ Concentration (M)</label>
                  <Input
                    placeholder="e.g., 0.001 or 1e-3"
                    value={pH.concentration}
                    onChange={(e) => setPH({ ...pH, concentration: e.target.value })}
                    className="bg-white/10 border-white/30 text-white placeholder-gray-400"
                  />
                </div>
                <Button 
                  onClick={calculatePH}
                  className="w-full bg-orange-600 hover:bg-orange-700"
                >
                  Calculate pH
                </Button>
                {pH.result && (
                  <div className="p-4 bg-green-900/30 border border-green-500/50 rounded-lg">
                    <p className="text-green-400 font-semibold">pH: {pH.result}</p>
                    <p className="text-gray-300 text-sm mt-1">
                      {parseFloat(pH.result) < 7 ? 'Acidic' : 
                       parseFloat(pH.result) === 7 ? 'Neutral' : 'Basic'}
                    </p>
                  </div>
                )}
                <div className="text-sm text-gray-400">
                  <p>pH = -log₁₀[H⁺]</p>
                  <p>pH &lt; 7: Acidic, pH = 7: Neutral, pH &gt; 7: Basic</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ChemCalculatorPage;
