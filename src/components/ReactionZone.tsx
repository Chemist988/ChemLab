
import React, { useState, useEffect } from 'react';
import { useDrop } from 'react-dnd';
import { Element } from '../data/elements';
import ElementCard from './ElementCard';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Beaker, Flame, Droplets, Zap, RotateCcw, Info, ChevronRight } from 'lucide-react';
import { toast } from 'sonner';

interface ReactionZoneProps {
  onElementClick: (element: Element) => void;
}

interface Reaction {
  reactants: Element[];
  products: string[];
  type: string;
  description: string;
  energy: 'endothermic' | 'exothermic';
  conditions?: string;
}

const commonReactions: { [key: string]: Reaction } = {
  'H-O': {
    reactants: [],
    products: ['H₂O (Water)'],
    type: 'Synthesis',
    description: 'Hydrogen and oxygen combine to form water',
    energy: 'exothermic',
    conditions: 'Spark ignition required'
  },
  'Na-Cl': {
    reactants: [],
    products: ['NaCl (Salt)'],
    type: 'Ionic Bond',
    description: 'Sodium and chlorine form table salt',
    energy: 'exothermic',
    conditions: 'High temperature'
  },
  'C-O': {
    reactants: [],
    products: ['CO₂ (Carbon Dioxide)'],
    type: 'Combustion',
    description: 'Carbon burns in oxygen to form CO₂',
    energy: 'exothermic',
    conditions: 'Heat required'
  },
  'Fe-O': {
    reactants: [],
    products: ['Fe₂O₃ (Rust)'],
    type: 'Oxidation',
    description: 'Iron oxidizes to form rust',
    energy: 'exothermic',
    conditions: 'Moisture present'
  }
};

const ReactionZone: React.FC<ReactionZoneProps> = ({ onElementClick }) => {
  const [droppedElements, setDroppedElements] = useState<Element[]>([]);
  const [reaction, setReaction] = useState<Reaction | null>(null);
  const [isReacting, setIsReacting] = useState(false);

  const [{ isOver, canDrop }, drop] = useDrop(() => ({
    accept: 'element',
    drop: (item: { element: Element }) => {
      if (droppedElements.length < 4 && !droppedElements.find(el => el.id === item.element.id)) {
        setDroppedElements(prev => [...prev, item.element]);
        toast.success(`Added ${item.element.name} to reaction zone`);
      } else if (droppedElements.length >= 4) {
        toast.error('Maximum 4 elements allowed in reaction zone');
      } else {
        toast.warning(`${item.element.name} already in reaction zone`);
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));

  const checkForReaction = () => {
    if (droppedElements.length < 2) {
      setReaction(null);
      return;
    }

    const symbols = droppedElements.map(el => el.symbol).sort();
    const reactionKey = symbols.join('-');
    
    // Check for common reactions
    for (const [key, reactionData] of Object.entries(commonReactions)) {
      const keySymbols = key.split('-').sort();
      if (keySymbols.every(symbol => symbols.includes(symbol))) {
        setReaction({
          ...reactionData,
          reactants: droppedElements
        });
        return;
      }
    }

    // Generic reaction based on element properties
    const hasMetals = droppedElements.some(el => 
      el.category.includes('metal') && !el.category.includes('metalloid')
    );
    const hasNonmetals = droppedElements.some(el => 
      el.category === 'nonmetal' || el.category === 'halogen'
    );

    if (hasMetals && hasNonmetals) {
      setReaction({
        reactants: droppedElements,
        products: ['Ionic Compound'],
        type: 'Ionic Formation',
        description: 'Metal and nonmetal form an ionic compound',
        energy: 'exothermic'
      });
    } else if (droppedElements.length >= 2) {
      setReaction({
        reactants: droppedElements,
        products: ['Molecular Compound'],
        type: 'Molecular Formation',
        description: 'Elements combine to form a molecular compound',
        energy: 'endothermic'
      });
    }
  };

  useEffect(() => {
    checkForReaction();
  }, [droppedElements]);

  const simulateReaction = () => {
    if (!reaction) return;
    
    setIsReacting(true);
    toast.success('Reaction initiated!');
    
    setTimeout(() => {
      setIsReacting(false);
      toast.success(`${reaction.type} complete! ${reaction.products.join(', ')} formed.`);
    }, 2000);
  };

  const clearReaction = () => {
    setDroppedElements([]);
    setReaction(null);
    setIsReacting(false);
    toast.info('Reaction zone cleared');
  };

  const removeElement = (elementId: string) => {
    setDroppedElements(prev => prev.filter(el => el.id !== elementId));
  };

  return (
    <div className="space-y-4">
      {/* Drop Zone */}
      <Card className="relative overflow-hidden">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Beaker className="w-5 h-5" />
            Reaction Chamber
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div
            ref={drop}
            className={`min-h-[120px] border-2 border-dashed rounded-xl p-4 transition-all duration-300 ${
              isOver && canDrop
                ? 'border-primary bg-primary/10 scale-105'
                : 'border-gray-300 bg-gray-50/50'
            } ${isReacting ? 'animate-pulse bg-orange-100' : ''}`}
          >
            {droppedElements.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full space-y-2 text-gray-500">
                <Droplets className="w-8 h-8 opacity-50" />
                <p className="text-sm text-center">
                  Drag elements here to start a reaction
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3 justify-items-center">
                {droppedElements.map((element) => (
                  <div key={element.id} className="relative group">
                    <ElementCard
                      element={element}
                      onClick={() => onElementClick(element)}
                      size="sm"
                      isDraggable={false}
                      className={`${isReacting ? 'animate-bounce' : ''}`}
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
          
          {droppedElements.length > 0 && (
            <div className="mt-4 flex gap-2">
              <Button
                onClick={simulateReaction}
                disabled={!reaction || isReacting}
                className="flex-1"
                variant={reaction ? "default" : "secondary"}
              >
                <Flame className="w-4 h-4 mr-2" />
                {isReacting ? 'Reacting...' : 'Start Reaction'}
              </Button>
              <Button onClick={clearReaction} variant="outline" size="icon">
                <RotateCcw className="w-4 h-4" />
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Reaction Information */}
      {reaction && (
        <Card className="border-l-4 border-l-primary">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Info className="w-5 h-5" />
                Reaction Analysis
              </CardTitle>
              <Badge variant={reaction.energy === 'exothermic' ? 'destructive' : 'secondary'}>
                {reaction.energy === 'exothermic' ? (
                  <Flame className="w-3 h-3 mr-1" />
                ) : (
                  <Zap className="w-3 h-3 mr-1" />
                )}
                {reaction.energy}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <p className="font-medium text-sm text-gray-600 mb-1">Type:</p>
              <Badge variant="outline">{reaction.type}</Badge>
            </div>
            
            <Separator />
            
            <div>
              <p className="font-medium text-sm text-gray-600 mb-2">Reaction:</p>
              <div className="flex items-center gap-2 text-sm">
                <span>{reaction.reactants.map(r => r.symbol).join(' + ')}</span>
                <ChevronRight className="w-4 h-4" />
                <span className="font-medium">{reaction.products.join(' + ')}</span>
              </div>
            </div>
            
            <p className="text-sm text-gray-700">{reaction.description}</p>
            
            {reaction.conditions && (
              <div className="mt-2 p-2 bg-yellow-50 rounded-lg">
                <p className="text-xs text-yellow-800">
                  <strong>Conditions:</strong> {reaction.conditions}
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ReactionZone;
