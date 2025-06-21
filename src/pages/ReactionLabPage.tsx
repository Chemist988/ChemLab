
import React, { useState } from 'react';
import { FlaskConical, Zap, AlertTriangle, CheckCircle, Flame, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface ReactionData {
  equation: string;
  name: string;
  type: string;
  energy?: string;
  color?: string;
  temperature?: string;
  products?: string[];
}

const ReactionLabPage = () => {
  const [selectedElements, setSelectedElements] = useState<string[]>([]);
  const [reaction, setReaction] = useState<ReactionData | null>(null);
  const [reactionHistory, setReactionHistory] = useState<ReactionData[]>([]);
  const [temperature, setTemperature] = useState(25);
  const [catalyst, setCatalyst] = useState<string | null>(null);

  const commonElements = [
    { symbol: 'H', name: 'Hydrogen', color: 'bg-red-500' },
    { symbol: 'O', name: 'Oxygen', color: 'bg-blue-500' },
    { symbol: 'C', name: 'Carbon', color: 'bg-gray-700' },
    { symbol: 'N', name: 'Nitrogen', color: 'bg-purple-500' },
    { symbol: 'Na', name: 'Sodium', color: 'bg-yellow-500' },
    { symbol: 'Cl', name: 'Chlorine', color: 'bg-green-500' },
    { symbol: 'Fe', name: 'Iron', color: 'bg-orange-600' },
    { symbol: 'Ca', name: 'Calcium', color: 'bg-pink-500' },
    { symbol: 'Mg', name: 'Magnesium', color: 'bg-gray-400' },
    { symbol: 'Al', name: 'Aluminum', color: 'bg-blue-300' },
    { symbol: 'S', name: 'Sulfur', color: 'bg-yellow-600' },
    { symbol: 'P', name: 'Phosphorus', color: 'bg-red-700' },
  ];

  const catalysts = ['Pt', 'Pd', 'Ni', 'Cu', 'Mn'];

  const reactions: { [key: string]: ReactionData } = {
    'H,O': { 
      equation: '2H₂ + O₂ → 2H₂O', 
      name: 'Water Formation', 
      type: 'synthesis',
      energy: 'Exothermic (-572 kJ/mol)',
      color: 'Colorless',
      temperature: '2000°C (ignition)',
      products: ['Water vapor', 'Heat', 'Light']
    },
    'Na,Cl': { 
      equation: 'Na + Cl₂ → NaCl', 
      name: 'Salt Formation', 
      type: 'synthesis',
      energy: 'Exothermic (-411 kJ/mol)',
      color: 'Yellow flame → White solid',
      temperature: '801°C (melting point)',
      products: ['Sodium chloride', 'Light emission']
    },
    'Fe,O': { 
      equation: '4Fe + 3O₂ → 2Fe₂O₃', 
      name: 'Rust Formation', 
      type: 'oxidation',
      energy: 'Exothermic (-1648 kJ/mol)',
      color: 'Red-brown',
      temperature: 'Room temperature (slow)',
      products: ['Iron oxide', 'Heat (minimal)']
    },
    'Ca,O': { 
      equation: '2Ca + O₂ → 2CaO', 
      name: 'Calcium Oxide Formation', 
      type: 'synthesis',
      energy: 'Exothermic (-1270 kJ/mol)',
      color: 'Bright white light',
      temperature: '2613°C',
      products: ['Quicklime', 'Intense heat', 'Bright light']
    },
    'Mg,O': {
      equation: '2Mg + O₂ → 2MgO',
      name: 'Magnesium Combustion',
      type: 'combustion',
      energy: 'Exothermic (-1204 kJ/mol)',
      color: 'Brilliant white light',
      temperature: '2500°C',
      products: ['Magnesium oxide', 'UV light', 'Heat']
    },
    'C,O': {
      equation: 'C + O₂ → CO₂',
      name: 'Carbon Combustion',
      type: 'combustion',
      energy: 'Exothermic (-394 kJ/mol)',
      color: 'Orange-blue flame',
      temperature: '1000°C',
      products: ['Carbon dioxide', 'Heat', 'Light']
    },
    'Al,O': {
      equation: '4Al + 3O₂ → 2Al₂O₃',
      name: 'Thermite Reaction',
      type: 'oxidation',
      energy: 'Exothermic (-3350 kJ/mol)',
      color: 'Brilliant white-orange',
      temperature: '2500°C',
      products: ['Aluminum oxide', 'Molten iron', 'Sparks']
    }
  };

  const handleElementClick = (symbol: string) => {
    if (selectedElements.includes(symbol)) {
      setSelectedElements(selectedElements.filter(el => el !== symbol));
    } else if (selectedElements.length < 3) {
      setSelectedElements([...selectedElements, symbol]);
    }
  };

  const simulateReaction = () => {
    const key = selectedElements.sort().join(',');
    const reactionData = reactions[key];
    
    if (reactionData) {
      // Apply temperature and catalyst effects
      let modifiedReaction = { ...reactionData };
      
      if (catalyst) {
        modifiedReaction.name += ` (${catalyst} catalyzed)`;
        modifiedReaction.temperature = `Reduced by ~200°C with ${catalyst}`;
      }
      
      if (temperature > 100) {
        modifiedReaction.name += ` (High temp: ${temperature}°C)`;
      }
      
      setReaction(modifiedReaction);
      setReactionHistory(prev => [modifiedReaction, ...prev.slice(0, 4)]);
    } else {
      setReaction(null);
    }
  };

  const clearReaction = () => {
    setSelectedElements([]);
    setReaction(null);
    setCatalyst(null);
    setTemperature(25);
  };

  const getReactionIcon = (type: string) => {
    switch (type) {
      case 'combustion':
        return <Flame className="w-5 h-5 text-orange-500" />;
      case 'synthesis':
        return <Sparkles className="w-5 h-5 text-green-500" />;
      case 'oxidation':
        return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
      default:
        return <FlaskConical className="w-5 h-5 text-blue-500" />;
    }
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4 font-orbitron">Advanced Reaction Lab</h1>
          <p className="text-gray-300">Select elements, adjust conditions, and explore chemical reactions with detailed analysis</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Element Selection */}
          <Card className="bg-white/10 backdrop-blur-lg border-white/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <FlaskConical className="w-5 h-5" />
                Element Selection
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-3 mb-4">
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
              
              {/* Reaction Conditions */}
              <div className="space-y-4 mb-4">
                <div>
                  <label className="text-white text-sm mb-2 block">Temperature: {temperature}°C</label>
                  <input
                    type="range"
                    min="25"
                    max="3000"
                    value={temperature}
                    onChange={(e) => setTemperature(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                </div>
                
                <div>
                  <label className="text-white text-sm mb-2 block">Catalyst</label>
                  <div className="flex gap-2 flex-wrap">
                    {catalysts.map((cat) => (
                      <Badge
                        key={cat}
                        variant={catalyst === cat ? "default" : "outline"}
                        className={`cursor-pointer ${catalyst === cat ? 'bg-blue-600' : 'border-white/30 text-white'}`}
                        onClick={() => setCatalyst(catalyst === cat ? null : cat)}
                      >
                        {cat}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="text-center">
                <Button 
                  onClick={simulateReaction}
                  disabled={selectedElements.length < 2}
                  className="bg-green-600 hover:bg-green-700 text-white mb-2"
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
                Reaction Analysis
              </CardTitle>
            </CardHeader>
            <CardContent>
              {selectedElements.length > 0 && (
                <div className="mb-4">
                  <p className="text-gray-300 mb-2">Selected Elements:</p>
                  <div className="flex gap-2 flex-wrap">
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
                      {getReactionIcon(reaction.type)}
                      <h3 className="text-green-400 font-semibold">{reaction.name}</h3>
                    </div>
                    <p className="text-white font-mono text-lg mb-3">{reaction.equation}</p>
                    
                    <div className="grid grid-cols-1 gap-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-300">Type:</span>
                        <span className="text-white">{reaction.type}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-300">Energy:</span>
                        <span className="text-white">{reaction.energy}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-300">Color:</span>
                        <span className="text-white">{reaction.color}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-300">Temperature:</span>
                        <span className="text-white">{reaction.temperature}</span>
                      </div>
                    </div>
                    
                    {reaction.products && (
                      <div className="mt-3">
                        <p className="text-gray-300 text-sm mb-1">Products:</p>
                        <div className="flex gap-1 flex-wrap">
                          {reaction.products.map((product, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs border-green-500/50 text-green-300">
                              {product}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ) : selectedElements.length >= 2 ? (
                <div className="p-4 bg-yellow-900/30 border border-yellow-500/50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-yellow-400" />
                    <p className="text-yellow-400">No reaction found for these elements</p>
                  </div>
                </div>
              ) : (
                <div className="text-center text-gray-400 py-8">
                  <FlaskConical className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Select two or more elements to see possible reactions</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Reaction History */}
          <Card className="bg-white/10 backdrop-blur-lg border-white/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <FlaskConical className="w-5 h-5" />
                Recent Reactions
              </CardTitle>
            </CardHeader>
            <CardContent>
              {reactionHistory.length > 0 ? (
                <div className="space-y-3">
                  {reactionHistory.map((hist, idx) => (
                    <div key={idx} className="p-3 bg-gray-800/50 rounded-lg border border-gray-600/30">
                      <div className="flex items-center gap-2 mb-1">
                        {getReactionIcon(hist.type)}
                        <span className="text-white text-sm font-medium">{hist.name}</span>
                      </div>
                      <p className="text-gray-300 text-xs font-mono">{hist.equation}</p>
                      <p className="text-gray-400 text-xs mt-1">{hist.energy}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center text-gray-400 py-8">
                  <p className="text-sm">No reactions performed yet</p>
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
