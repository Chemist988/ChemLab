
import React, { useState, useEffect } from 'react';
import { useDrop } from 'react-dnd';
import { Element } from '../data/elements';
import ElementCard from './ElementCard';
import ElementSuggestions from './ElementSuggestions';
import { simulateReaction, getAnimationClass, ReactionResult } from '../utils/reactionUtils';
import { toast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { RotateCw, Beaker, Bomb, Flame, Sparkles, Droplets, FlaskConical, Atom } from 'lucide-react';

interface ReactionZoneProps {
  onElementClick: (element: Element) => void;
}

const ReactionZone: React.FC<ReactionZoneProps> = ({ onElementClick }) => {
  const [selectedElements, setSelectedElements] = useState<Element[]>([]);
  const [reaction, setReaction] = useState<ReactionResult | null>(null);
  const [animating, setAnimating] = useState(false);
  const [bubbles, setBubbles] = useState<number[]>([]);
  const [effects, setEffects] = useState({
    explosion: false,
    gas: false,
    splash: false,
    powderBurst: { active: false, color: 'white' }
  });

  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'element',
    drop: (item: { element: Element }) => {
      addElement(item.element);
      return undefined;
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  const getCategoryColor = (category: string): string => {
    const colors = {
      'alkali-metal': '#ef4444',
      'alkaline-earth-metal': '#f97316', 
      'transition-metal': '#3b82f6',
      'post-transition-metal': '#8b5cf6',
      'metalloid': '#10b981',
      'nonmetal': '#22c55e',
      'halogen': '#06b6d4',
      'noble-gas': '#ec4899',
      'lanthanide': '#eab308',
      'actinide': '#6366f1',
    };
    return colors[category as keyof typeof colors] || '#6b7280';
  };

  const addElement = (element: Element) => {
    if (selectedElements.length >= 4) {
      toast({
        title: "Reaction zone full",
        description: "Clear the current reaction first.",
      });
      return;
    }

    // Add splash effect
    setEffects(prev => ({ ...prev, splash: true }));
    setTimeout(() => setEffects(prev => ({ ...prev, splash: false })), 700);

    // Add powder burst effect
    const burstColor = getCategoryColor(element.category);
    setEffects(prev => ({ 
      ...prev, 
      powderBurst: { active: true, color: burstColor }
    }));
    setTimeout(() => setEffects(prev => ({ 
      ...prev, 
      powderBurst: { active: false, color: burstColor }
    })), 1000);

    // Add bubbles
    setBubbles(prev => [...prev, ...Array(5).fill(0).map(() => Math.random())]);

    // Add element
    setSelectedElements(prev => [...prev, element]);

    toast({
      title: `${element.name} added`,
      description: "Element added to reaction beaker",
    });
  };

  const clearReaction = () => {
    setSelectedElements([]);
    setReaction(null);
    setAnimating(false);
    setBubbles([]);
    setEffects({
      explosion: false,
      gas: false,
      splash: false,
      powderBurst: { active: false, color: 'white' }
    });
  };

  const simulateCurrentReaction = () => {
    if (selectedElements.length < 2) return;

    setAnimating(true);
    
    const result = simulateReaction(selectedElements[0], selectedElements[1]);
    
    // Add reaction bubbles
    setBubbles(prev => [...prev, ...Array(15).fill(0).map(() => Math.random())]);
    
    // Set effects based on reaction type
    if (result.animationType === 'explosion') {
      setEffects(prev => ({ ...prev, explosion: true }));
      setTimeout(() => setEffects(prev => ({ ...prev, explosion: false })), 2000);
    } else if (result.animationType === 'gas') {
      setEffects(prev => ({ ...prev, gas: true }));
    } else {
      setEffects(prev => ({ ...prev, gas: false }));
    }

    // Set splash effect
    setEffects(prev => ({ ...prev, splash: true }));
    setTimeout(() => setEffects(prev => ({ ...prev, splash: false })), 700);

    // Set reaction result
    setTimeout(() => setReaction(result), 600);
    setTimeout(() => setAnimating(false), 2000);
  };

  useEffect(() => {
    if (selectedElements.length >= 2) {
      simulateCurrentReaction();
    } else if (selectedElements.length === 0) {
      setReaction(null);
    }
  }, [selectedElements]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (bubbles.length > 0) {
        setBubbles(prev => prev.slice(Math.floor(prev.length / 2)));
      }
    }, 2000);
    return () => clearTimeout(timer);
  }, [bubbles]);

  const getReactionColor = (animationType: string): string => {
    const colors = {
      explosion: 'bg-gradient-to-b from-orange-200/70 to-orange-300/50 dark:from-orange-900/40 dark:to-orange-800/30',
      gas: 'bg-gradient-to-b from-green-200/70 to-green-300/50 dark:from-green-900/40 dark:to-green-800/30',
      bubble: 'bg-gradient-to-b from-blue-200/70 to-blue-300/50 dark:from-blue-900/40 dark:to-blue-800/30',
      fade: 'bg-gradient-to-b from-purple-200/70 to-purple-300/50 dark:from-purple-900/40 dark:to-purple-800/30',
      crystallization: 'bg-gradient-to-b from-indigo-200/70 to-indigo-300/50 dark:from-indigo-900/40 dark:to-indigo-800/30',
      precipitation: 'bg-gradient-to-b from-yellow-200/70 to-yellow-300/50 dark:from-yellow-900/40 dark:to-yellow-800/30',
      combustion: 'bg-gradient-to-b from-red-200/70 to-red-300/50 dark:from-red-900/40 dark:to-red-800/30',
      neutralization: 'bg-gradient-to-b from-teal-200/70 to-teal-300/50 dark:from-teal-900/40 dark:to-teal-800/30'
    };
    return colors[animationType as keyof typeof colors] || 'bg-gradient-to-b from-blue-100/40 to-blue-200/30 dark:from-blue-800/30 dark:to-blue-700/20';
  };

  return (
    <div className="flex flex-col gap-4 w-full">
      <div 
        ref={drop}
        className={`
          relative h-96 p-6 rounded-xl flex flex-col items-center justify-center overflow-hidden
          ${isOver ? 'border-primary/70 bg-primary/5' : 'border border-white/10'}
          transition-all duration-300 shadow-lg bg-gradient-to-b from-blue-50/10 to-blue-100/20 dark:from-blue-900/10 dark:to-blue-800/5
        `}
      >
        {/* Effects */}
        {effects.explosion && (
          <div className="absolute inset-0 z-10">
            <div className="absolute inset-0 bg-orange-500/20 animate-pulse"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <Bomb className="h-20 w-20 text-orange-500 animate-bounce" />
            </div>
            {Array(30).fill(0).map((_, i) => (
              <div 
                key={i} 
                className="absolute bg-orange-500 rounded-full"
                style={{
                  width: Math.random() * 12 + 2 + 'px',
                  height: Math.random() * 12 + 2 + 'px',
                  left: Math.random() * 100 + '%',
                  top: Math.random() * 100 + '%',
                  animation: `explosion-particle ${Math.random() * 1 + 0.5}s ease-out forwards`,
                  animationDelay: Math.random() * 0.2 + 's'
                }}
              />
            ))}
          </div>
        )}
        
        {effects.gas && (
          <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
            {Array(25).fill(0).map((_, i) => (
              <div 
                key={i} 
                className="absolute bg-green-500/30 rounded-full dark:bg-green-400/30"
                style={{
                  width: Math.random() * 50 + 20 + 'px',
                  height: Math.random() * 50 + 20 + 'px',
                  left: Math.random() * 100 + '%',
                  top: Math.random() * 30 + 70 + '%',
                  animation: `gas-rise ${Math.random() * 3 + 3}s ease-out forwards`,
                  animationDelay: Math.random() * 2 + 's'
                }}
              />
            ))}
          </div>
        )}

        {effects.splash && (
          <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden">
            {Array(20).fill(0).map((_, i) => (
              <div 
                key={`splash-${i}`}
                className="absolute bg-blue-400/70 dark:bg-blue-500/50 animate-splash-rise"
                style={{
                  width: Math.random() * 8 + 2 + 'px',
                  height: Math.random() * 16 + 10 + 'px',
                  left: 40 + Math.random() * 20 + '%',
                  top: 40 + Math.random() * 10 + '%',
                  borderRadius: '50% 50% 0 0',
                  transform: `rotate(${Math.random() * 360}deg)`,
                }}
              />
            ))}
          </div>
        )}

        {effects.powderBurst.active && (
          <div className="absolute inset-0 z-15 pointer-events-none overflow-hidden">
            {Array(40).fill(0).map((_, i) => (
              <div 
                key={`powder-${i}`}
                className="absolute rounded-full animate-powder-burst"
                style={{
                  width: Math.random() * 6 + 1 + 'px',
                  height: Math.random() * 6 + 1 + 'px',
                  left: '50%',
                  top: '50%',
                  backgroundColor: effects.powderBurst.color,
                  '--x-move': `${Math.cos(Math.random() * Math.PI * 2) * (Math.random() * 40 + 30)}px`,
                  '--y-move': `${Math.sin(Math.random() * Math.PI * 2) * (Math.random() * 40 + 30)}px`,
                } as React.CSSProperties}
              />
            ))}
          </div>
        )}
        
        {/* Beaker */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="relative w-64 h-64">
            <div className="beaker-container absolute bottom-0 w-full h-[85%] rounded-b-lg">
              <div 
                className={`
                  absolute bottom-0 w-full rounded-b-lg transition-all duration-700 ease-out overflow-hidden
                  ${selectedElements.length > 0 ? 'h-[70%]' : 'h-[15%]'}
                  ${reaction ? getReactionColor(reaction.animationType) : 'bg-gradient-to-b from-blue-100/40 to-blue-200/30 dark:from-blue-800/30 dark:to-blue-700/20'}
                  ${animating ? 'animate-reaction-pulse' : ''}
                `}
              >
                <div className="absolute inset-x-0 top-0 h-1 bg-white/40 dark:bg-white/20"></div>
                
                {bubbles.map((bubble, index) => (
                  <div 
                    key={index} 
                    className="absolute rounded-full bg-white/80 dark:bg-white/50 animate-bubble-float"
                    style={{
                      width: Math.max(4, Math.random() * 12) + 'px',
                      height: Math.max(4, Math.random() * 12) + 'px',
                      bottom: (bubble * 100) + '%',
                      left: (Math.random() * 90 + 5) + '%',
                      animationDuration: (Math.random() * 2 + 1) + 's',
                      opacity: Math.random() * 0.6 + 0.2
                    }}
                  />
                ))}
              </div>

              <div className="absolute inset-0 flex flex-col items-center justify-center p-4 pointer-events-auto">
                {selectedElements.length === 0 ? (
                  <div className="text-center text-muted-foreground">
                    <Beaker className="mx-auto h-10 w-10 mb-2 opacity-70" />
                    <p>Drag elements here to start a reaction</p>
                    <p className="text-xs mt-2 text-muted-foreground/80">Try combining different elements!</p>
                  </div>
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center">
                    <div className="flex flex-wrap items-center justify-center gap-2">
                      {selectedElements.map((element, index) => (
                        <div 
                          key={index} 
                          className={animating ? 'animate-element-glow' : ''}
                        >
                          <ElementCard 
                            element={element} 
                            onClick={() => onElementClick(element)}
                            size="xs"
                            isDraggable={false}
                          />
                        </div>
                      ))}
                    </div>
                    
                    {reaction && (
                      <div className="text-center mt-4 animate-fade-in">
                        <h3 className="text-xl font-bold">{reaction.result}</h3>
                        <p className="text-sm mt-1">{reaction.description}</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
            
            <div className="absolute top-[15%] w-full h-[2px] bg-white/30 dark:bg-white/10"></div>
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[60%] h-[15%] border-t-[1px] border-l-[1px] border-r-[1px] border-white/30 dark:border-white/10"></div>
          </div>
        </div>
      </div>
      
      <div className="flex justify-center">
        <Button 
          variant="outline" 
          onClick={clearReaction}
          disabled={selectedElements.length === 0}
          className="flex items-center gap-2 bg-white/20 backdrop-blur-sm hover:bg-white/30 dark:bg-black/20 dark:hover:bg-black/30"
        >
          <RotateCw className="h-4 w-4" /> Clear Reaction
        </Button>
      </div>
    </div>
  );
};

export default ReactionZone;
