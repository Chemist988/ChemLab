import React, { useState, useEffect } from 'react';
import { useDrop } from 'react-dnd';
import { Element } from '@/data/elements';
import ElementCard from './ElementCard';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Slider } from '@/components/ui/slider';
import { 
  FlaskConical, 
  Zap, 
  Flame, 
  Droplets, 
  Wind, 
  Thermometer, 
  AlertTriangle, 
  CheckCircle, 
  RotateCcw,
  Play,
  Pause,
  Sparkles
} from 'lucide-react';

interface ReactionZoneProps {
  onElementClick: (element: Element) => void;
  onReactionComplete?: () => void;
}

interface ReactionResult {
  equation: string;
  products: string[];
  type: string;
  energy: 'endothermic' | 'exothermic';
  conditions: string;
  safetyLevel: 'safe' | 'caution' | 'dangerous';
  color?: string;
  temperature?: number;
}

const ReactionZone: React.FC<ReactionZoneProps> = ({ onElementClick, onReactionComplete }) => {
  const [droppedElements, setDroppedElements] = useState<Element[]>([]);
  const [reactionResult, setReactionResult] = useState<ReactionResult | null>(null);
  const [isReacting, setIsReacting] = useState(false);
  const [temperature, setTemperature] = useState([25]);
  const [pressure, setPressure] = useState([1]);
  const [catalyst, setCatalyst] = useState<string | null>(null);
  const [reactionHistory, setReactionHistory] = useState<ReactionResult[]>([]);

  const [{ isOver }, drop] = useDrop({
    accept: 'element',
    drop: (item: { element: Element }) => {
      if (droppedElements.length < 4 && !droppedElements.find(el => el.id === item.element.id)) {
        setDroppedElements(prev => [...prev, item.element]);
      }
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  const commonReactions: { [key: string]: ReactionResult } = {
    'H,O': {
      equation: '2H₂ + O₂ → 2H₂O',
      products: ['Water', 'Heat', 'Steam'],
      type: 'Combustion',
      energy: 'exothermic',
      conditions: 'Spark ignition required',
      safetyLevel: 'dangerous',
      color: 'Blue flame',
      temperature: 2000
    },
    'Na,Cl': {
      equation: 'Na + Cl₂ → NaCl',
      products: ['Sodium Chloride', 'Light'],
      type: 'Synthesis',
      energy: 'exothermic',
      conditions: 'High temperature',
      safetyLevel: 'caution',
      color: 'Yellow flame',
      temperature: 800
    },
    'Fe,O': {
      equation: '4Fe + 3O₂ → 2Fe₂O₃',
      products: ['Iron Oxide', 'Rust'],
      type: 'Oxidation',
      energy: 'exothermic',
      conditions: 'Moisture present',
      safetyLevel: 'safe',
      color: 'Red-brown',
      temperature: 25
    },
    'C,O': {
      equation: 'C + O₂ → CO₂',
      products: ['Carbon Dioxide', 'Heat'],
      type: 'Combustion',
      energy: 'exothermic',
      conditions: 'High temperature',
      safetyLevel: 'caution',
      color: 'Orange flame',
      temperature: 1000
    }
  };

  const simulateReaction = () => {
    if (droppedElements.length < 2) return;
    
    setIsReacting(true);
    
    setTimeout(() => {
      const elementSymbols = droppedElements.map(el => el.symbol).sort().join(',');
      const reaction = commonReactions[elementSymbols];
      
      if (reaction) {
        // Apply environmental conditions
        const modifiedReaction = {
          ...reaction,
          temperature: reaction.temperature + (temperature[0] - 25) * 0.1,
          conditions: `${reaction.conditions} | Temp: ${temperature[0]}°C | Pressure: ${pressure[0]} atm${catalyst ? ` | Catalyst: ${catalyst}` : ''}`
        };
        
        setReactionResult(modifiedReaction);
        setReactionHistory(prev => [modifiedReaction, ...prev.slice(0, 4)]);
        onReactionComplete?.();
      } else {
        setReactionResult({
          equation: 'No reaction observed',
          products: ['No products formed'],
          type: 'None',
          energy: 'exothermic',
          conditions: 'Stable under current conditions',
          safetyLevel: 'safe'
        });
      }
      setIsReacting(false);
    }, 2000);
  };

  const clearReaction = () => {
    setDroppedElements([]);
    setReactionResult(null);
    setIsReacting(false);
  };

  const getSafetyColor = (level: string) => {
    switch (level) {
      case 'safe': return 'text-green-400 border-green-400';
      case 'caution': return 'text-yellow-400 border-yellow-400';
      case 'dangerous': return 'text-red-400 border-red-400';
      default: return 'text-gray-400 border-gray-400';
    }
  };

  const catalysts = ['Pt', 'Pd', 'Ni', 'Cu', 'Fe'];

  return (
    <div className="space-y-4">
      {/* Environmental Controls */}
      <Card className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 border-blue-400/30">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm flex items-center gap-2">
            <Thermometer className="w-4 h-4" />
            Reaction Conditions
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div>
            <label className="text-xs text-gray-300 mb-1 block">Temperature: {temperature[0]}°C</label>
            <Slider
              value={temperature}
              onValueChange={setTemperature}
              max={3000}
              min={-200}
              step={10}
              className="h-1"
            />
          </div>
          <div>
            <label className="text-xs text-gray-300 mb-1 block">Pressure: {pressure[0]} atm</label>
            <Slider
              value={pressure}
              onValueChange={setPressure}
              max={10}
              min={0.1}
              step={0.1}
              className="h-1"
            />
          </div>
          <div>
            <label className="text-xs text-gray-300 mb-1 block">Catalyst</label>
            <div className="flex gap-1">
              {catalysts.map((cat) => (
                <Button
                  key={cat}
                  variant={catalyst === cat ? "default" : "outline"}
                  size="sm"
                  className="h-6 px-2 text-xs"
                  onClick={() => setCatalyst(catalyst === cat ? null : cat)}
                >
                  {cat}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Reaction Zone */}
      <Card className="bg-gradient-to-br from-gray-900/50 to-gray-800/50 border-dashed border-2 border-gray-400/50">
        <CardContent className="p-6">
          <div
            ref={drop}
            className={`min-h-[200px] rounded-xl border-2 border-dashed transition-all duration-300 flex flex-col items-center justify-center p-4 ${
              isOver 
                ? 'border-blue-400 bg-blue-900/20' 
                : isReacting
                ? 'border-orange-400 bg-orange-900/20 animate-pulse'
                : 'border-gray-600 bg-gray-900/30'
            }`}
          >
            {droppedElements.length === 0 ? (
              <div className="text-center">
                <FlaskConical className="w-12 h-12 mx-auto text-gray-400 mb-3" />
                <p className="text-gray-400 text-sm">Drag elements here to create reactions</p>
                <p className="text-gray-500 text-xs mt-1">Mix 2-4 elements for best results</p>
              </div>
            ) : (
              <div className="w-full">
                <div className="flex flex-wrap gap-2 justify-center mb-4">
                  {droppedElements.map((element) => (
                    <ElementCard
                      key={element.id}
                      element={element}
                      onClick={() => onElementClick(element)}
                      size="sm"
                      className={`transition-all duration-300 ${isReacting ? 'animate-pulse scale-110' : ''}`}
                    />
                  ))}
                </div>
                
                {isReacting && (
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <Sparkles className="w-5 h-5 text-yellow-400 animate-spin" />
                      <p className="text-yellow-400 font-medium">Reaction in Progress...</p>
                      <Sparkles className="w-5 h-5 text-yellow-400 animate-spin" />
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-1">
                      <div className="bg-gradient-to-r from-yellow-400 to-orange-400 h-1 rounded-full animate-pulse" style={{ width: '70%' }}></div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
          
          <div className="flex gap-2 mt-4">
            <Button 
              onClick={simulateReaction}
              disabled={droppedElements.length < 2 || isReacting}
              className="flex-1 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
            >
              {isReacting ? (
                <>
                  <Pause className="w-4 h-4 mr-2" />
                  Reacting...
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 mr-2" />
                  Start Reaction
                </>
              )}
            </Button>
            <Button 
              onClick={clearReaction}
              variant="outline"
              className="border-white/30 text-white hover:bg-white/10"
            >
              <RotateCcw className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Reaction Results */}
      {reactionResult && (
        <Card className={`animate-fade-in ${
          reactionResult.equation === 'No reaction observed' 
            ? 'bg-yellow-900/20 border-yellow-400/50' 
            : 'bg-green-900/20 border-green-400/50'
        }`}>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2">
              {reactionResult.equation === 'No reaction observed' ? (
                <AlertTriangle className="w-4 h-4 text-yellow-400" />
              ) : (
                <CheckCircle className="w-4 h-4 text-green-400" />
              )}
              Reaction Analysis
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="font-mono text-lg text-center py-2 bg-gray-800/50 rounded">
              {reactionResult.equation}
            </div>
            
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <span className="text-gray-400">Type:</span>
                <div className="text-white font-medium">{reactionResult.type}</div>
              </div>
              <div>
                <span className="text-gray-400">Energy:</span>
                <Badge variant={reactionResult.energy === 'exothermic' ? 'default' : 'secondary'} className="ml-1">
                  <Flame className="w-3 h-3 mr-1" />
                  {reactionResult.energy}
                </Badge>
              </div>
              <div>
                <span className="text-gray-400">Safety:</span>
                <Badge variant="outline" className={`ml-1 ${getSafetyColor(reactionResult.safetyLevel)}`}>
                  {reactionResult.safetyLevel}
                </Badge>
              </div>
              {reactionResult.color && (
                <div>
                  <span className="text-gray-400">Color:</span>
                  <div className="text-white font-medium">{reactionResult.color}</div>
                </div>
              )}
            </div>
            
            <Separator />
            
            <div>
              <span className="text-gray-400 text-xs">Products:</span>
              <div className="flex flex-wrap gap-1 mt-1">
                {reactionResult.products.map((product, idx) => (
                  <Badge key={idx} variant="outline" className="text-xs">
                    {product}
                  </Badge>
                ))}
              </div>
            </div>
            
            <div>
              <span className="text-gray-400 text-xs">Conditions:</span>
              <p className="text-gray-300 text-xs mt-1">{reactionResult.conditions}</p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Reaction History */}
      {reactionHistory.length > 0 && (
        <Card className="bg-gradient-to-br from-purple-900/20 to-blue-900/20 border-purple-400/30">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2">
              <FlaskConical className="w-4 h-4" />
              Recent Reactions ({reactionHistory.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 max-h-32 overflow-y-auto">
              {reactionHistory.map((reaction, idx) => (
                <div key={idx} className="text-xs p-2 bg-gray-800/50 rounded border border-gray-600/30">
                  <div className="font-mono text-gray-300">{reaction.equation}</div>
                  <div className="flex gap-2 mt-1">
                    <Badge variant="outline" className="text-xs">
                      {reaction.type}
                    </Badge>
                    <Badge variant="outline" className={`text-xs ${getSafetyColor(reaction.safetyLevel)}`}>
                      {reaction.safetyLevel}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ReactionZone;
