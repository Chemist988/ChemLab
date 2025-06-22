
import React, { useState, useEffect } from 'react';
import { useDrop } from 'react-dnd';
import { Element } from '../data/elements';
import ElementCard from './ElementCard';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card } from './ui/card';
import { Separator } from './ui/separator';
import { Beaker, Zap, AlertTriangle, Thermometer, Clock, Activity } from 'lucide-react';

interface ReactionZoneProps {
  onElementClick: (element: Element) => void;
}

interface Reaction {
  id: string;
  reactants: Element[];
  products: string;
  conditions: string;
  energy: number;
  safety: 'low' | 'medium' | 'high';
  time: number;
}

const ReactionZone: React.FC<ReactionZoneProps> = ({ onElementClick }) => {
  const [elements, setElements] = useState<Element[]>([]);
  const [isReacting, setIsReacting] = useState(false);
  const [reactionResult, setReactionResult] = useState<string | null>(null);
  const [temperature, setTemperature] = useState(25);
  const [pressure, setPressure] = useState(1);
  const [catalyst, setCatalyst] = useState<string>('none');
  const [reactionHistory, setReactionHistory] = useState<Reaction[]>([]);

  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'element',
    drop: (item: { element: Element }) => {
      if (elements.find((el) => el.id === item.element.id)) return;
      setElements(prev => [...prev, item.element]);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  const removeElement = (elementId: number) => {
    setElements(prev => prev.filter(el => el.id !== elementId));
  };

  const clearAll = () => {
    setElements([]);
    setReactionResult(null);
  };

  const getReactionProduct = (reactantElements: Element[]): { product: string; energy: number; safety: 'low' | 'medium' | 'high'; conditions: string } => {
    const symbols = reactantElements.map(el => el.symbol).sort();
    
    // Common reactions with more detailed analysis
    const reactions: Record<string, { product: string; energy: number; safety: 'low' | 'medium' | 'high'; conditions: string }> = {
      'H,O': { 
        product: 'H₂O (Water)', 
        energy: -286, 
        safety: 'medium', 
        conditions: 'Requires ignition, explosive mixture' 
      },
      'Na,Cl': { 
        product: 'NaCl (Sodium Chloride)', 
        energy: -411, 
        safety: 'high', 
        conditions: 'Vigorous reaction, heat and light produced' 
      },
      'C,O': { 
        product: 'CO₂ (Carbon Dioxide)', 
        energy: -394, 
        safety: 'low', 
        conditions: 'Combustion reaction, requires heat' 
      },
      'H,N': { 
        product: 'NH₃ (Ammonia)', 
        energy: -46, 
        safety: 'medium', 
        conditions: 'High pressure and temperature required (Haber process)' 
      },
      'Fe,O': { 
        product: 'Fe₂O₃ (Iron Oxide/Rust)', 
        energy: -824, 
        safety: 'low', 
        conditions: 'Slow oxidation, accelerated by moisture' 
      },
      'Ca,O': { 
        product: 'CaO (Calcium Oxide)', 
        energy: -635, 
        safety: 'medium', 
        conditions: 'High temperature required, produces quicklime' 
      },
      'Mg,O': { 
        product: 'MgO (Magnesium Oxide)', 
        energy: -602, 
        safety: 'medium', 
        conditions: 'Burns with bright white light' 
      },
      'Al,O': { 
        product: 'Al₂O₃ (Aluminum Oxide)', 
        energy: -1676, 
        safety: 'medium', 
        conditions: 'Thermite reaction, extremely exothermic' 
      }
    };

    const key = symbols.join(',');
    return reactions[key] || { 
      product: `${symbols.join(' + ')} → Complex mixture`, 
      energy: Math.random() * 200 - 100, 
      safety: 'medium', 
      conditions: 'Reaction conditions vary' 
    };
  };

  const startReaction = () => {
    if (elements.length < 2) return;
    
    setIsReacting(true);
    
    // Simulate reaction time based on conditions
    const baseTime = 2000;
    const tempFactor = temperature > 100 ? 0.5 : temperature < 0 ? 2 : 1;
    const pressureFactor = pressure > 1 ? 0.8 : 1.2;
    const catalystFactor = catalyst !== 'none' ? 0.6 : 1;
    
    const reactionTime = baseTime * tempFactor * pressureFactor * catalystFactor;
    
    setTimeout(() => {
      const result = getReactionProduct(elements);
      setReactionResult(result.product);
      
      // Add to history
      const newReaction: Reaction = {
        id: Date.now().toString(),
        reactants: [...elements],
        products: result.product,
        conditions: `${temperature}°C, ${pressure} atm, ${catalyst}`,
        energy: result.energy,
        safety: result.safety,
        time: Date.now()
      };
      
      setReactionHistory(prev => [newReaction, ...prev.slice(0, 4)]);
      setIsReacting(false);
    }, reactionTime);
  };

  const getSafetyColor = (safety: 'low' | 'medium' | 'high') => {
    switch (safety) {
      case 'low': return 'text-green-600 bg-green-50';
      case 'medium': return 'text-yellow-600 bg-yellow-50';
      case 'high': return 'text-red-600 bg-red-50';
    }
  };

  const getEnergyColor = (energy: number) => {
    if (energy < -200) return 'text-red-600';
    if (energy < 0) return 'text-orange-600';
    return 'text-blue-600';
  };

  return (
    <div className="space-y-6">
      {/* Reaction Chamber */}
      <Card className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <Beaker className="w-5 h-5 text-blue-600" />
          <h3 className="text-lg font-semibold">Reaction Chamber</h3>
          {isReacting && <Activity className="w-4 h-4 text-blue-600 animate-spin" />}
        </div>
        
        <div
          ref={drop}
          className={`min-h-32 border-2 border-dashed rounded-lg p-4 transition-colors ${
            isOver ? 'border-blue-400 bg-blue-50' : 'border-gray-300'
          } ${isReacting ? 'animate-pulse bg-yellow-50' : ''}`}
        >
          {elements.length === 0 ? (
            <div className="text-center text-gray-500 py-8">
              <Beaker className="w-12 h-12 mx-auto mb-2 opacity-50" />
              <p>Drag elements here to create reactions</p>
              <p className="text-sm">Need at least 2 elements to start</p>
            </div>
          ) : (
            <div className="flex flex-wrap gap-2">
              {elements.map((element) => (
                <div key={element.id} className="relative group">
                  <ElementCard
                    element={element}
                    onClick={() => onElementClick(element)}
                    size="sm"
                    isDraggable={false}
                  />
                  <button
                    onClick={() => removeElement(element.id)}
                    className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white rounded-full text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
        
        {/* Controls */}
        <div className="flex flex-wrap gap-4 mt-4">
          <div className="flex items-center gap-2">
            <Thermometer className="w-4 h-4" />
            <span className="text-sm">Temp:</span>
            <input
              type="range"
              min="-50"
              max="200"
              value={temperature}
              onChange={(e) => setTemperature(Number(e.target.value))}
              className="w-16"
            />
            <span className="text-sm font-mono">{temperature}°C</span>
          </div>
          
          <div className="flex items-center gap-2">
            <span className="text-sm">Pressure:</span>
            <select
              value={pressure}
              onChange={(e) => setPressure(Number(e.target.value))}
              className="text-sm border rounded px-2 py-1"
            >
              <option value={0.1}>0.1 atm</option>
              <option value={1}>1 atm</option>
              <option value={5}>5 atm</option>
              <option value={10}>10 atm</option>
            </select>
          </div>
          
          <div className="flex items-center gap-2">
            <span className="text-sm">Catalyst:</span>
            <select
              value={catalyst}
              onChange={(e) => setCatalyst(e.target.value)}
              className="text-sm border rounded px-2 py-1"
            >
              <option value="none">None</option>
              <option value="platinum">Platinum</option>
              <option value="iron">Iron</option>
              <option value="enzyme">Enzyme</option>
            </select>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 mt-4">
          <Button
            onClick={startReaction}
            disabled={elements.length < 2 || isReacting}
            className="flex items-center gap-2"
          >
            <Zap className="w-4 h-4" />
            {isReacting ? 'Reacting...' : 'Start Reaction'}
          </Button>
          <Button variant="outline" onClick={clearAll}>
            Clear All
          </Button>
        </div>
        
        {/* Result Display */}
        {reactionResult && (
          <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Zap className="w-5 h-5 text-green-600" />
              <span className="font-semibold text-green-800">Reaction Complete!</span>
            </div>
            <p className="text-green-700">{reactionResult}</p>
          </div>
        )}
      </Card>

      {/* Reaction History */}
      {reactionHistory.length > 0 && (
        <Card className="p-4">
          <div className="flex items-center gap-2 mb-3">
            <Clock className="w-4 h-4" />
            <h4 className="font-medium">Recent Reactions</h4>
          </div>
          <div className="space-y-2">
            {reactionHistory.map((reaction) => (
              <div key={reaction.id} className="text-sm p-2 bg-gray-50 rounded border">
                <div className="flex items-center justify-between">
                  <span className="font-medium">{reaction.products}</span>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className={getSafetyColor(reaction.safety)}>
                      <AlertTriangle className="w-3 h-3 mr-1" />
                      {reaction.safety}
                    </Badge>
                    <span className={`text-sm font-mono ${getEnergyColor(reaction.energy)}`}>
                      {reaction.energy > 0 ? '+' : ''}{reaction.energy.toFixed(0)} kJ
                    </span>
                  </div>
                </div>
                <div className="text-gray-600 text-xs mt-1">
                  Reactants: {reaction.reactants.map(r => r.symbol).join(' + ')} | {reaction.conditions}
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
};

export default ReactionZone;
