import React, { useState, useEffect } from 'react';
import { useDrop } from 'react-dnd';
import { Element } from '../data/elements';
import ElementCard from './ElementCard';
import { simulateReaction, getAnimationClass, ReactionResult } from '../utils/reactionUtils';
import { toast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { RotateCw, Beaker, Bomb, Flame, Sparkles, Droplets, FlaskConical, AtomIcon, Atom } from 'lucide-react';

interface ReactionZoneProps {
  onElementClick: (element: Element) => void;
}

const ReactionZone: React.FC<ReactionZoneProps> = ({ onElementClick }) => {
  const [selectedElements, setSelectedElements] = useState<Element[]>([]);
  const [reaction, setReaction] = useState<ReactionResult | null>(null);
  const [animating, setAnimating] = useState(false);
  const [bubbles, setBubbles] = useState<number[]>([]);
  const [explosion, setExplosion] = useState(false);
  const [gas, setGas] = useState(false);

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

  const addElement = (element: Element) => {
    if (selectedElements.length < 2) {
      // Create bubble effect when adding element to beaker
      const newBubbles = [...bubbles];
      for (let i = 0; i < 5; i++) {
        newBubbles.push(Math.random());
      }
      setBubbles(newBubbles);
      
      // Add element with animation delay
      setSelectedElements((prev) => [...prev, element]);
      
      // Show toast
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
    setExplosion(false);
    setGas(false);
  };

  const simulateCurrentReaction = () => {
    if (selectedElements.length === 2) {
      setAnimating(true);
      const result = simulateReaction(selectedElements[0], selectedElements[1]);
      
      // Create intense bubble effect for reaction
      const newBubbles = [...bubbles];
      for (let i = 0; i < 15; i++) {
        newBubbles.push(Math.random());
      }
      setBubbles(newBubbles);
      
      // Set special animation effects based on reaction type
      if (result.animationType === 'explosion') {
        setExplosion(true);
        setTimeout(() => setExplosion(false), 2000);
      } else if (result.animationType === 'gas') {
        setGas(true);
      } else {
        setGas(false);
      }
      
      // Delay setting reaction to allow animation to be visible
      setTimeout(() => {
        setReaction(result);
      }, 600);
      
      setTimeout(() => {
        setAnimating(false);
      }, 2000);
    }
  };

  useEffect(() => {
    // Clean up bubbles over time
    const timer = setTimeout(() => {
      if (bubbles.length > 0) {
        setBubbles(prev => prev.slice(Math.floor(prev.length / 2)));
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [bubbles]);

  useEffect(() => {
    if (selectedElements.length === 2) {
      simulateCurrentReaction();
    } else {
      setReaction(null);
    }
  }, [selectedElements]);

  return (
    <div className="flex flex-col gap-4 w-full">
      <div 
        ref={drop}
        className={`
          relative h-64 p-6 rounded-lg flex flex-col items-center justify-center overflow-hidden
          ${isOver ? 'border-primary/70 bg-primary/5' : 'border border-border'}
          transition-all duration-300 shadow-sm
        `}
      >
        {/* Explosion effect */}
        {explosion && (
          <div className="absolute inset-0 z-10">
            <div className="absolute inset-0 bg-orange-500/20 animate-pulse"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative">
                <Bomb className="h-20 w-20 text-orange-500 animate-bounce" />
                <div className="absolute top-0 left-1/2 w-6 h-12 -translate-x-1/2 -translate-y-full">
                  <div className="w-full h-full bg-gradient-to-t from-orange-500 to-transparent animate-flame"></div>
                </div>
              </div>
            </div>
            {[...Array(20)].map((_, i) => (
              <div 
                key={i} 
                className="absolute bg-orange-500 rounded-full animate-explosion-particle"
                style={{
                  width: Math.random() * 8 + 2 + 'px',
                  height: Math.random() * 8 + 2 + 'px',
                  left: Math.random() * 100 + '%',
                  top: Math.random() * 100 + '%',
                  opacity: Math.random() * 0.7 + 0.3,
                  animationDuration: Math.random() * 1 + 0.5 + 's',
                  animationDelay: Math.random() * 0.2 + 's'
                }}
              ></div>
            ))}
          </div>
        )}
        
        {/* Gas effect */}
        {gas && (
          <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
            {[...Array(15)].map((_, i) => (
              <div 
                key={i} 
                className="absolute bg-green-500/30 rounded-full animate-gas-rise dark:bg-green-400/30"
                style={{
                  width: Math.random() * 40 + 10 + 'px',
                  height: Math.random() * 40 + 10 + 'px',
                  left: Math.random() * 100 + '%',
                  top: Math.random() * 30 + 70 + '%',
                  animationDuration: Math.random() * 3 + 3 + 's',
                  animationDelay: Math.random() * 2 + 's'
                }}
              ></div>
            ))}
          </div>
        )}
        
        {/* Beaker container */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="relative w-48 h-48">
            {/* Beaker body */}
            <div className="absolute bottom-0 w-full h-[85%] border-2 border-gray-300 rounded-b-lg bg-blue-50/40 backdrop-blur-sm dark:border-gray-600 dark:bg-blue-950/20">
              {/* Beaker liquid */}
              <div 
                className={`
                  absolute bottom-0 w-full rounded-b-lg transition-all duration-700 ease-out
                  ${selectedElements.length > 0 ? 'h-[70%]' : 'h-[15%]'}
                  ${reaction ? getReactionColor(reaction.animationType) : 'bg-blue-100/70 dark:bg-blue-800/50'}
                  ${animating ? 'animate-pulse' : ''}
                `}
              >
                {/* Bubbles */}
                {bubbles.map((bubble, index) => (
                  <div 
                    key={index} 
                    className="absolute rounded-full bg-white/80 dark:bg-white/50 animate-rise"
                    style={{
                      width: Math.max(4, Math.random() * 10) + 'px',
                      height: Math.max(4, Math.random() * 10) + 'px',
                      bottom: (bubble * 100) + '%',
                      left: (Math.random() * 90 + 5) + '%',
                      animationDuration: (Math.random() * 2 + 1) + 's',
                      opacity: Math.random() * 0.5 + 0.2
                    }}
                  />
                ))}
              </div>

              {/* Beaker content */}
              <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
                {selectedElements.length === 0 ? (
                  <div className="text-center text-muted-foreground">
                    <Beaker className="mx-auto h-8 w-8 mb-2" />
                    <p>Drag elements here to start a reaction</p>
                    <p className="text-xs mt-1">Try combining two elements!</p>
                  </div>
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center">
                    <div className="flex flex-wrap items-center justify-center gap-3">
                      {selectedElements.map((element, index) => (
                        <div 
                          key={index} 
                          className={`
                            ${index === 0 && animating ? 'animate-bounce-subtle' : ''}
                            ${index === 1 && animating ? 'animate-bounce-subtle delay-100' : ''}
                            ${(explosion || gas) && 'animate-shake'}
                          `}
                        >
                          <ElementCard 
                            element={element} 
                            onClick={() => onElementClick(element)}
                            size="sm"
                            isDraggable={false}
                          />
                        </div>
                      ))}
                    </div>
                    
                    {reaction && (
                      <div className={`text-center mt-4 ${animating ? getAnimationClass(reaction.animationType) : 'animate-fade-in'}`}>
                        <h3 className="text-xl font-bold">{reaction.result}</h3>
                        <p className="text-sm mt-1">{reaction.description}</p>
                        
                        <div className="mt-3 flex items-center justify-center gap-2">
                          {getReactionIcon(reaction.animationType)}
                          <span className="text-xs text-muted-foreground">
                            {getReactionTypeName(reaction.animationType)}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
            
            {/* Beaker top rim */}
            <div className="absolute top-[15%] w-full h-[3px] bg-gray-300 dark:bg-gray-600"></div>
            
            {/* Beaker neck */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[60%] h-[15%] border-t-2 border-l-2 border-r-2 border-gray-300 dark:border-gray-600"></div>
          </div>
        </div>
      </div>
      
      <div className="flex justify-center">
        <Button 
          variant="outline" 
          onClick={clearReaction}
          disabled={selectedElements.length === 0}
          className="flex items-center gap-2"
        >
          <RotateCw className="h-4 w-4" /> Clear Reaction
        </Button>
      </div>
    </div>
  );
};

// Helper function to get color based on reaction type
const getReactionColor = (animationType: string): string => {
  switch (animationType) {
    case 'explosion':
      return 'bg-orange-200 dark:bg-orange-900/50';
    case 'gas':
      return 'bg-green-200 dark:bg-green-900/50';
    case 'bubble':
      return 'bg-blue-200 dark:bg-blue-900/50';
    case 'fade':
      return 'bg-purple-200 dark:bg-purple-900/50';
    case 'crystallization':
      return 'bg-indigo-200 dark:bg-indigo-900/50';
    case 'precipitation':
      return 'bg-yellow-200 dark:bg-yellow-900/50';
    case 'combustion':
      return 'bg-red-200 dark:bg-red-900/50';
    case 'neutralization':
      return 'bg-teal-200 dark:bg-teal-900/50';
    default:
      return 'bg-blue-100/70 dark:bg-blue-800/50';
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
      return <Bomb className="h-4 w-4 text-orange-500" />;
    case 'gas':
      return <Sparkles className="h-4 w-4 text-green-500" />;
    case 'bubble':
      return <Droplets className="h-4 w-4 text-blue-500" />;
    case 'fade':
      return <FlaskConical className="h-4 w-4 text-purple-500" />;
    case 'crystallization':
      return <FlaskConical className="h-4 w-4 text-indigo-500" />;
    case 'precipitation':
      return <Droplets className="h-4 w-4 text-yellow-500" />;
    case 'combustion':
      return <Flame className="h-4 w-4 text-red-500" />;
    case 'neutralization':
      return <Atom className="h-4 w-4 text-teal-500" />;
    default:
      return <Beaker className="h-4 w-4 text-gray-500" />;
  }
};

export default ReactionZone;
