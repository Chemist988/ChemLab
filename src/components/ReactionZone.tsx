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
  const [particles, setParticles] = useState<{id: number; type: string; x: number; y: number}[]>([]);
  const [liquidLevel, setLiquidLevel] = useState(15);
  const [suggestedElements, setSuggestedElements] = useState<Element[]>([]);

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

  // Helper function to find compatible elements
  const findCompatibleElements = (element: Element): Element[] => {
    const elementsDatabase = require('../data/elements').elements;
    
    const compatibleElements = elementsDatabase.filter((e: Element) => {
      if (e.symbol === element.symbol) return false;
      
      if (e.category !== element.category) {
        return true;
      }
      
      if ((element.category.includes('metal') && !e.category.includes('metal')) ||
          (!element.category.includes('metal') && e.category.includes('metal'))) {
        return true;
      }
      
      if (Math.abs(e.atomicNumber - element.atomicNumber) > 30) {
        return true;
      }
      
      return false;
    });
    
    return shuffleArray(compatibleElements).slice(0, 4);
  };
  
  const shuffleArray = (array: any[]): any[] => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  const addElement = (element: Element) => {
    if (selectedElements.length < 4) {
      // Create realistic splash particles
      const newParticles = [];
      for (let i = 0; i < 10; i++) {
        newParticles.push({
          id: Date.now() + i,
          type: 'liquid',
          x: 50 + (Math.random() - 0.5) * 30,
          y: 60 + Math.random() * 10
        });
      }
      setParticles(prev => [...prev, ...newParticles]);
      
      // Increase liquid level
      setLiquidLevel(prev => Math.min(70, prev + 15));
      
      // Create realistic bubbles
      const newBubbles = [...bubbles];
      for (let i = 0; i < 8; i++) {
        newBubbles.push(Math.random());
      }
      setBubbles(newBubbles);
      
      setSelectedElements((prev) => {
        const newElements = [...prev, element];
        setSuggestedElements(findCompatibleElements(element));
        return newElements;
      });
      
      toast({
        title: `${element.name} added`,
        description: "Element added to reaction beaker",
      });
    } else {
      toast({
        title: "Reaction zone full",
        description: "Please clear the current reaction first.",
      });
    }
  };

  const clearReaction = () => {
    setSelectedElements([]);
    setReaction(null);
    setAnimating(false);
    setBubbles([]);
    setParticles([]);
    setLiquidLevel(15);
    setSuggestedElements([]);
  };

  const simulateCurrentReaction = () => {
    if (selectedElements.length >= 2) {
      setAnimating(true);
      
      const result = simulateReaction(selectedElements[0], selectedElements[1]);
      
      // Create intense realistic effects based on reaction type
      const newParticles = [];
      const newBubbles = [...bubbles];
      
      if (result.animationType === 'explosion') {
        // Explosion particles
        for (let i = 0; i < 25; i++) {
          newParticles.push({
            id: Date.now() + i,
            type: 'explosion',
            x: 50 + (Math.random() - 0.5) * 50,
            y: 50 + (Math.random() - 0.5) * 50
          });
        }
      } else if (result.animationType === 'gas') {
        // Gas particles
        for (let i = 0; i < 15; i++) {
          newParticles.push({
            id: Date.now() + i,
            type: 'gas',
            x: 40 + Math.random() * 20,
            y: 70 + Math.random() * 10
          });
        }
      }
      
      // Always add bubbles for chemical activity
      for (let i = 0; i < 20; i++) {
        newBubbles.push(Math.random());
      }
      
      setBubbles(newBubbles);
      setParticles(prev => [...prev, ...newParticles]);
      
      // Increase liquid level for reaction
      setLiquidLevel(prev => Math.min(80, prev + 10));
      
      setTimeout(() => {
        setReaction(result);
      }, 600);
      
      setTimeout(() => {
        setAnimating(false);
      }, 3000);
    }
  };

  useEffect(() => {
    // Clean up particles and bubbles
    const timer = setTimeout(() => {
      if (bubbles.length > 10) {
        setBubbles(prev => prev.slice(Math.floor(prev.length / 3)));
      }
      if (particles.length > 5) {
        setParticles(prev => prev.slice(Math.floor(prev.length / 2)));
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [bubbles, particles]);

  useEffect(() => {
    if (selectedElements.length >= 2 && selectedElements.length <= 4) {
      simulateCurrentReaction();
    } else if (selectedElements.length === 0) {
      setReaction(null);
      setSuggestedElements([]);
    }
  }, [selectedElements]);

  const getCategoryColor = (category: string): string => {
    switch (category) {
      case 'alkali-metal': return '#f87171';
      case 'alkaline-earth-metal': return '#fb923c';
      case 'transition-metal': return '#3b82f6';
      case 'post-transition-metal': return '#a78bfa';
      case 'metalloid': return '#34d399';
      case 'nonmetal': return '#4ade80';
      case 'halogen': return '#22d3ee';
      case 'noble-gas': return '#d946ef';
      case 'lanthanide': return '#ec4899';
      case 'actinide': return '#fb7185';
      default: return '#d1d5db';
    }
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
        {/* Element Suggestions */}
        {selectedElements.length > 0 && (
          <ElementSuggestions 
            element={selectedElements[selectedElements.length - 1]} 
            onSelectElement={addElement}
            suggestedElements={suggestedElements}
          />
        )}
        
        {/* Realistic Particles */}
        {particles.map((particle) => (
          <div 
            key={particle.id}
            className={`absolute pointer-events-none ${
              particle.type === 'explosion' ? 'particle-explosion bg-orange-500 rounded-full' :
              particle.type === 'gas' ? 'gas-particle bg-green-500/70 rounded-full' :
              'liquid-particle bg-blue-500 rounded-full'
            }`}
            style={{
              width: particle.type === 'explosion' ? '8px' : particle.type === 'gas' ? '12px' : '6px',
              height: particle.type === 'explosion' ? '8px' : particle.type === 'gas' ? '12px' : '6px',
              left: particle.x + '%',
              top: particle.y + '%',
            }}
          />
        ))}
        
        {/* Enhanced Beaker */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="relative w-64 h-64">
            {/* Beaker body with more realistic design */}
            <div className="absolute bottom-0 w-full h-[85%] border-2 border-white/20 dark:border-white/10 rounded-b-xl bg-white/5 backdrop-blur-md dark:bg-black/5 shadow-2xl">
              {/* Realistic liquid with dynamic level */}
              <div 
                className={`
                  absolute bottom-0 w-full rounded-b-xl transition-all duration-1000 ease-out overflow-hidden
                  ${reaction ? getReactionColor(reaction.animationType) : 'realistic-liquid'}
                  ${animating ? 'chemical-reaction-glow' : ''}
                `}
                style={{ height: `${liquidLevel}%` }}
              >
                {/* Liquid surface with shimmer */}
                <div className="absolute inset-x-0 top-0 h-2 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
                
                {/* Enhanced realistic bubbles */}
                {bubbles.map((bubble, index) => (
                  <div 
                    key={index} 
                    className="absolute realistic-bubble animate-realistic-bubble"
                    style={{
                      width: Math.max(6, Math.random() * 16) + 'px',
                      height: Math.max(6, Math.random() * 16) + 'px',
                      bottom: (bubble * 80) + '%',
                      left: (Math.random() * 80 + 10) + '%',
                      animationDuration: (Math.random() * 3 + 2) + 's',
                      animationDelay: Math.random() * 2 + 's'
                    }}
                  />
                ))}
              </div>

              {/* Beaker content */}
              <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
                {selectedElements.length === 0 ? (
                  <div className="text-center text-muted-foreground">
                    <Beaker className="mx-auto h-10 w-10 mb-2 opacity-70" />
                    <p>Drag elements here to start a reaction</p>
                    <p className="text-xs mt-2 text-muted-foreground/80">Watch chemistry come alive!</p>
                  </div>
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center">
                    <div className="flex flex-wrap items-center justify-center gap-2">
                      {selectedElements.map((element, index) => (
                        <div 
                          key={index} 
                          className={`
                            transition-all duration-500
                            ${animating ? 'animate-reaction' : 'animate-apple-scale-in'}
                          `}
                          style={{
                            animationDelay: `${index * 100}ms`
                          }}
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
                      <div className={`text-center mt-4 ${animating ? getAnimationClass(reaction.animationType) : 'animate-fade-in'}`}>
                        <h3 className="text-xl font-bold text-white drop-shadow-lg">{reaction.result}</h3>
                        <p className="text-sm mt-1 text-white/90 drop-shadow">{reaction.description}</p>
                        
                        <div className="mt-3 flex items-center justify-center gap-2">
                          {getReactionIcon(reaction.animationType)}
                          <span className="text-xs text-white/80">
                            {getReactionTypeName(reaction.animationType)}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
            
            {/* Enhanced beaker top rim */}
            <div className="absolute top-[15%] w-full h-[3px] bg-gradient-to-r from-white/20 via-white/40 to-white/20 rounded-full"></div>
            
            {/* Beaker neck with better styling */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[60%] h-[15%] border-t-2 border-l-2 border-r-2 border-white/20 dark:border-white/10 rounded-t-lg bg-white/5 backdrop-blur-sm"></div>
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

// Helper function to get color based on reaction type (no yellow)
const getReactionColor = (animationType: string): string => {
  switch (animationType) {
    case 'explosion':
      return 'bg-gradient-to-b from-orange-400/80 to-red-500/70 dark:from-orange-600/60 dark:to-red-700/50';
    case 'gas':
      return 'bg-gradient-to-b from-green-400/80 to-emerald-500/70 dark:from-green-600/60 dark:to-emerald-700/50';
    case 'bubble':
      return 'bg-gradient-to-b from-blue-400/80 to-cyan-500/70 dark:from-blue-600/60 dark:to-cyan-700/50';
    case 'fade':
      return 'bg-gradient-to-b from-purple-400/80 to-violet-500/70 dark:from-purple-600/60 dark:to-violet-700/50';
    case 'crystallization':
      return 'bg-gradient-to-b from-indigo-400/80 to-blue-500/70 dark:from-indigo-600/60 dark:to-blue-700/50';
    case 'precipitation':
      return 'bg-gradient-to-b from-orange-400/80 to-pink-500/70 dark:from-orange-600/60 dark:to-pink-700/50';
    case 'combustion':
      return 'bg-gradient-to-b from-red-400/80 to-orange-500/70 dark:from-red-600/60 dark:to-orange-700/50';
    case 'neutralization':
      return 'bg-gradient-to-b from-teal-400/80 to-green-500/70 dark:from-teal-600/60 dark:to-green-700/50';
    default:
      return 'realistic-liquid';
  }
};

// Helper function to get reaction type display name
const getReactionTypeName = (animationType: string): string => {
  switch (animationType) {
    case 'explosion':
      return 'Explosive Reaction';
    case 'gas':
      return 'Gas Formation';
    case 'bubble':
      return 'Aqueous Reaction';
    case 'fade':
      return 'Subtle Reaction';
    case 'crystallization':
      return 'Crystallization';
    case 'precipitation':
      return 'Precipitation';
    case 'combustion':
      return 'Combustion Reaction';
    case 'neutralization':
      return 'Neutralization';
    default:
      return 'Chemical Reaction';
  }
};

// Helper function to get reaction icon
const getReactionIcon = (animationType: string): React.ReactNode => {
  switch (animationType) {
    case 'explosion':
      return <Bomb className="h-4 w-4 text-orange-400" />;
    case 'gas':
      return <Sparkles className="h-4 w-4 text-green-400" />;
    case 'bubble':
      return <Droplets className="h-4 w-4 text-blue-400" />;
    case 'fade':
      return <FlaskConical className="h-4 w-4 text-purple-400" />;
    case 'crystallization':
      return <FlaskConical className="h-4 w-4 text-indigo-400" />;
    case 'precipitation':
      return <Droplets className="h-4 w-4 text-orange-400" />;
    case 'combustion':
      return <Flame className="h-4 w-4 text-red-400" />;
    case 'neutralization':
      return <Atom className="h-4 w-4 text-teal-400" />;
    default:
      return <Beaker className="h-4 w-4 text-gray-400" />;
  }
};

export default ReactionZone;
