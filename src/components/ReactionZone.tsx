import React, { useState, useEffect } from 'react';
import { useDrop } from 'react-dnd';
import { Element, elements as elementsDatabase } from '@/data/elements';
import ElementCard from './ElementCard';
import ElementSuggestions from './ElementSuggestions';
import { simulateReaction, getAnimationClass, ReactionResult, reactions } from '../utils/reactionUtils';
import { toast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { RotateCw, Bomb, Flame, Sparkles, Droplets, FlaskConical, Atom } from 'lucide-react';

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
  const [splash, setSplash] = useState(false);
  const [powderBurst, setPowderBurst] = useState<{active: boolean; color: string}>({active: false, color: 'white'});
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

  // Shuffle array helper
  const shuffleArray = (array: any[]): any[] => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  // Helper function to find compatible elements
  const findCompatibleElements = (element: Element): Element[] => {
    const reactionKeys = Object.keys(reactions);
    const compatibleSymbols = new Set<string>();

    reactionKeys.forEach(key => {
        const symbols = key.split('-');
        if (symbols[0] === element.symbol) {
            compatibleSymbols.add(symbols[1]);
        } else if (symbols[1] === element.symbol) {
            compatibleSymbols.add(symbols[0]);
        }
    });

    const compatibleElements = elementsDatabase.filter((e: Element) => compatibleSymbols.has(e.symbol));
    
    // also don't suggest elements already in the beaker
    const currentSymbols = new Set(selectedElements.map(e => e.symbol));
    const finalSuggestions = compatibleElements.filter(e => !currentSymbols.has(e.symbol) && e.symbol !== element.symbol);

    return shuffleArray(finalSuggestions).slice(0, 4);
  };

  const addElement = (element: Element) => {
    if (selectedElements.length < 4) {
      // Create splash effect when adding element to beaker
      setSplash(true);
      setTimeout(() => setSplash(false), 700);
      
      // Create powder burst effect based on element category
      const burstColor = getCategoryColor(element.category);
      setPowderBurst({active: true, color: burstColor});
      setTimeout(() => setPowderBurst({active: false, color: burstColor}), 1000);
      
      // Create bubble effect when adding element to beaker
      const newBubbles = [...bubbles];
      for (let i = 0; i < 5; i++) {
        newBubbles.push(Math.random());
      }
      setBubbles(newBubbles);
      
      // Add element with animation delay
      setSelectedElements((prev) => {
        const newElements = [...prev, element];
        
        // Update suggested elements based on the last added element
        setSuggestedElements(findCompatibleElements(element));
        
        return newElements;
      });
      
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
    setSplash(false);
    setPowderBurst({active: false, color: 'white'});
    setSuggestedElements([]);
  };

  const simulateCurrentReaction = () => {
    if (selectedElements.length >= 2) {
      setAnimating(true);
      
      // For simplicity, we'll use the first two elements for the reaction
      // In a more complex implementation, you could consider all combinations
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
      
      // Create splash effect for reaction
      setSplash(true);
      setTimeout(() => setSplash(false), 700);
      
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
    if (selectedElements.length >= 2) {
      simulateCurrentReaction();
    } else {
      // This will handle length 0 and 1, clearing any previous reaction.
      setReaction(null);
    }
    
    if (selectedElements.length === 1) {
      setSuggestedElements(findCompatibleElements(selectedElements[0]));
    } else if (selectedElements.length === 0) {
      setSuggestedElements([]);
    }
  }, [selectedElements]);

  // Helper function to get color based on element category
  const getCategoryColor = (category: string): string => {
    switch (category) {
      case 'alkali-metal': return '#f87171'; // red
      case 'alkaline-earth-metal': return '#fb923c'; // orange
      case 'transition-metal': return '#3b82f6'; // blue
      case 'post-transition-metal': return '#a78bfa'; // purple
      case 'metalloid': return '#34d399'; // emerald
      case 'nonmetal': return '#4ade80'; // green
      case 'halogen': return '#22d3ee'; // cyan
      case 'noble-gas': return '#d946ef'; // fuchsia
      case 'lanthanide': return '#ec4899'; // pink
      case 'actinide': return '#f59e0b'; // amber
      default: return '#d1d5db'; // gray
    }
  };

  return (
    <div className="flex flex-col gap-4 w-full">
      <div 
        ref={drop}
        className={`
          relative h-96 p-6 rounded-xl flex flex-col items-center justify-center overflow-hidden
          ${isOver ? 'border-primary/70 bg-primary/5' : 'border-0'}
          transition-all duration-300 shadow-lg bg-gradient-to-b from-blue-50/10 to-blue-100/20 dark:from-blue-900/10 dark:to-blue-800/5
        `}
      >
        {/* Element Suggestions Popup */}
        {selectedElements.length > 0 && (
          <ElementSuggestions 
            element={selectedElements[selectedElements.length - 1]} 
            onSelectElement={addElement}
            suggestedElements={suggestedElements}
          />
        )}
        
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
            {[...Array(30)].map((_, i) => (
              <div 
                key={i} 
                className="absolute bg-orange-500 rounded-full animate-explosion-particle"
                style={{
                  width: Math.random() * 12 + 2 + 'px',
                  height: Math.random() * 12 + 2 + 'px',
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
            {[...Array(25)].map((_, i) => (
              <div 
                key={i} 
                className="absolute bg-green-500/30 rounded-full animate-gas-rise dark:bg-green-400/30"
                style={{
                  width: Math.random() * 50 + 20 + 'px',
                  height: Math.random() * 50 + 20 + 'px',
                  left: Math.random() * 100 + '%',
                  top: Math.random() * 30 + 70 + '%',
                  animationDuration: Math.random() * 3 + 3 + 's',
                  animationDelay: Math.random() * 2 + 's'
                }}
              ></div>
            ))}
          </div>
        )}

        {/* Splash effect */}
        {splash && (
          <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden">
            {[...Array(20)].map((_, i) => (
              <div 
                key={`splash-${i}`}
                className="absolute bg-blue-400/70 dark:bg-blue-500/50"
                style={{
                  width: Math.random() * 8 + 2 + 'px',
                  height: Math.random() * 16 + 10 + 'px',
                  left: 40 + Math.random() * 20 + '%',
                  top: 40 + Math.random() * 10 + '%',
                  borderRadius: '50% 50% 0 0',
                  transform: `rotate(${Math.random() * 360}deg)`,
                  opacity: Math.random() * 0.8 + 0.3,
                  animation: `splash-rise ${Math.random() * 0.8 + 0.5}s ease-out forwards`,
                }}
              ></div>
            ))}
          </div>
        )}

        {/* Powder Burst effect */}
        {powderBurst.active && (
          <div className="absolute inset-0 z-15 pointer-events-none overflow-hidden">
            {[...Array(40)].map((_, i) => {
              const size = Math.random() * 6 + 1;
              const angle = Math.random() * Math.PI * 2;
              const distance = Math.random() * 40 + 30;
              const duration = Math.random() * 1 + 0.5;
              
              return (
                <div 
                  key={`powder-${i}`}
                  className="absolute rounded-full"
                  style={{
                    width: size + 'px',
                    height: size + 'px',
                    left: 'calc(50% - ' + size/2 + 'px)',
                    top: '50%',
                    backgroundColor: powderBurst.color,
                    opacity: Math.random() * 0.9 + 0.2,
                    transform: `translateY(-50%)`,
                    animation: `powder-burst ${duration}s ease-out forwards`,
                    '--x-move': `${Math.cos(angle) * distance}px`,
                    '--y-move': `${Math.sin(angle) * distance}px`,
                  } as React.CSSProperties}
                ></div>
              );
            })}
          </div>
        )}
        
        {/* Beaker container - More realistic design */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="relative w-56 h-72">
            {/* Beaker Glass */}
            <div className="absolute bottom-0 w-full h-full rounded-b-3xl rounded-t-lg border-2 border-gray-400/20 bg-gray-500/10 backdrop-blur-sm">
              {/* Glossy highlight */}
              <div className="absolute top-0 left-0 w-full h-full rounded-b-3xl rounded-t-lg overflow-hidden">
                <div className="absolute -top-1/4 -left-1/2 w-full h-1/2 bg-white/10 dark:bg-white/5 transform -rotate-45"></div>
              </div>

              {/* Volume Markings */}
              {[...Array(4)].map((_, i) => (
                <div key={i} className="absolute left-2 right-2 border-t border-gray-400/30" style={{bottom: `${20 + i * 15}%`}}>
                  <span className="absolute -left-1 top-0 -translate-y-1/2 text-xs text-gray-400/50">{100 * (i+1)}</span>
                </div>
              ))}
              
              {/* Beaker liquid */}
              <div 
                className={`
                  absolute bottom-0 w-full rounded-b-3xl transition-all duration-700 ease-out overflow-hidden
                  ${selectedElements.length > 0 ? 'h-[70%]' : 'h-[15%]'}
                  ${reaction?.productColor ? reaction.productColor : 'bg-gradient-to-b from-blue-100/40 to-blue-200/30 dark:from-blue-800/30 dark:to-blue-700/20'}
                  ${animating ? 'animate-pulse' : ''}
                `}
              >
                {/* Reflective surface */}
                <div className="absolute inset-x-0 top-0 h-1 bg-white/40 dark:bg-white/20"></div>
                
                {/* Bubbles */}
                {bubbles.map((bubble, index) => (
                  <div 
                    key={index} 
                    className="absolute rounded-full bg-white/80 dark:bg-white/50 animate-rise"
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

              {/* Beaker content */}
              <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
                {selectedElements.length === 0 ? (
                  <div className="text-center text-muted-foreground">
                    <FlaskConical className="mx-auto h-12 w-12 mb-3 opacity-50" />
                    <p>Drag elements here to start a reaction</p>
                    <p className="text-xs mt-2 text-muted-foreground/80">Combine up to two elements</p>
                  </div>
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center">
                    <div className="flex flex-wrap items-center justify-center gap-2">
                      {selectedElements.map((element, index) => (
                        <div 
                          key={index} 
                          className={`
                            ${index === 0 && animating ? 'animate-bounce-subtle' : ''}
                            ${index === 1 && animating ? 'animate-bounce-subtle delay-100' : ''}
                            ${(index === 2 || index === 3) && animating ? 'animate-bounce-subtle delay-200' : ''}
                            ${(explosion || gas) && 'animate-shake'}
                          `}
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
      return <FlaskConical className="h-4 w-4 text-gray-500" />;
  }
};

export default ReactionZone;
