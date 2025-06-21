
import React, { useState } from 'react';
import { FlaskConical, Zap, AlertTriangle, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const ReactionLabPage = () => {
  const [selectedElements, setSelectedElements] = useState<string[]>([]);
  const [reaction, setReaction] = useState<string | null>(null);

  const commonElements = [
    { symbol: 'H', name: 'Hydrogen', color: 'bg-red-500' },
    { symbol: 'O', name: 'Oxygen', color: 'bg-blue-500' },
    { symbol: 'C', name: 'Carbon', color: 'bg-gray-700' },
    { symbol: 'N', name: 'Nitrogen', color: 'bg-purple-500' },
    { symbol: 'Na', name: 'Sodium', color: 'bg-yellow-500' },
    { symbol: 'Cl', name: 'Chlorine', color: 'bg-green-500' },
    { symbol: 'Fe', name: 'Iron', color: 'bg-orange-600' },
    { symbol: 'Ca', name: 'Calcium', color: 'bg-pink-500' },
  ];

  const reactions = {
    'H,O': { equation: '2H₂ + O₂ → 2H₂O', name: 'Water Formation', type: 'synthesis' },
    'Na,Cl': { equation: 'Na + Cl₂ → NaCl', name: 'Salt Formation', type: 'synthesis' },
    'Fe,O': { equation: '4Fe + 3O₂ → 2Fe₂O₃', name: 'Rust Formation', type: 'oxidation' },
    'Ca,O': { equation: '2Ca + O₂ → 2CaO', name: 'Calcium Oxide Formation', type: 'synthesis' },
  };

  const handleElementClick = (symbol: string) => {
    if (selectedElements.includes(symbol)) {
      setSelectedElements(selectedElements.filter(el => el !== symbol));
    } else if (selectedElements.length < 2) {
      setSelectedElements([...selectedElements, symbol]);
    }
  };

  const simulateReaction = () => {
    const key = selectedElements.sort().join(',');
    const reactionData = reactions[key as keyof typeof reactions];
    setReaction(reactionData || null);
  };

  const clearReaction = () => {
    setSelectedElements([]);
    setReaction(null);
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4 font-orbitron">Reaction Lab</h1>
          <p className="text-gray-300">Select two elements to simulate chemical reactions</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Element Selection */}
          <Card className="bg-white/10 backdrop-blur-lg border-white/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <FlaskConical className="w-5 h-5" />
                Element Selection
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-4 gap-3 mb-4">
                {commonElements.map((element) => (
                  <Button
                    key={element.symbol}
                    onClick={() => handleElementClick(element.symbol)}
                    variant={selectedElements.includes(element.symbol) ? "default" : "outline"}
                    className={`h-16 flex flex-col ${element.color} ${
                      selectedElements.includes(element.symbol) 
                        ? 'ring-2 ring-white' 
                        : 'bg-white/20 hover:bg-white/30 text-white border-white/30'
                    }`}
                  >
                    <span className="text-lg font-bold">{element.symbol}</span>
                    <span className="text-xs">{element.name}</span>
                  </Button>
                ))}
              </div>
              
              <div className="text-center">
                <Button 
                  onClick={simulateReaction}
                  disabled={selectedElements.length !== 2}
                  className="bg-green-600 hover:bg-green-700 text-white"
                >
                  <Zap className="w-4 h-4 mr-2" />
                  Simulate Reaction
                </Button>
                <Button 
                  onClick={clearReaction}
                  variant="outline"
                  className="ml-2 border-white/30 text-white hover:bg-white/10"
                >
                  Clear
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Reaction Results */}
          <Card className="bg-white/10 backdrop-blur-lg border-white/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                Reaction Results
              </CardTitle>
            </CardHeader>
            <CardContent>
              {selectedElements.length > 0 && (
                <div className="mb-4">
                  <p className="text-gray-300 mb-2">Selected Elements:</p>
                  <div className="flex gap-2">
                    {selectedElements.map((symbol) => (
                      <span key={symbol} className="px-3 py-1 bg-blue-600 text-white rounded-full text-sm">
                        {symbol}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {reaction ? (
                <div className="space-y-4">
                  <div className="p-4 bg-green-900/30 border border-green-500/50 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle className="w-5 h-5 text-green-400" />
                      <h3 className="text-green-400 font-semibold">{reaction.name}</h3>
                    </div>
                    <p className="text-white font-mono text-lg">{reaction.equation}</p>
                    <p className="text-gray-300 text-sm mt-2">Type: {reaction.type}</p>
                  </div>
                </div>
              ) : selectedElements.length === 2 ? (
                <div className="p-4 bg-yellow-900/30 border border-yellow-500/50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-yellow-400" />
                    <p className="text-yellow-400">No common reaction found for these elements</p>
                  </div>
                </div>
              ) : (
                <div className="text-center text-gray-400 py-8">
                  <FlaskConical className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Select two elements to see possible reactions</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ReactionLabPage;
