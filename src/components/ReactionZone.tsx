import React, { useState, useEffect } from 'react';
import { useDrop } from 'react-dnd';
import { Element, elements as elementsDatabase } from '@/data/elements';
import ElementCard from './ElementCard';
import ElementSuggestions from './ElementSuggestions';
import { simulateReaction, getAnimationClass, ReactionResult, reactions } from '../utils/reactionUtils';
import { toast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { RotateCw, Bomb, Flame, Sparkles, Droplets, FlaskConical, Atom, Beaker, Zap, Wind } from 'lucide-react';

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
  const [steam, setSteam] = useState(false);
  const [crystallization, setCrystallization] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [heatWaves, setHeatWaves] = useState(false);
  const [colorChange, setColorChange] = useState(false);
  const [precipitation, setPrecipitation] = useState(false);
  const [electricArcs, setElectricArcs] = useState(false);
  const [flames, setFlames] = useState(false);
  const [windEffect, setWindEffect] = useState(false);

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

  const shuffleArray = (array: any[]): any[] => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

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
    
    const currentSymbols = new Set(selectedElements.map(e => e.symbol));
    const finalSuggestions = compatibleElements.filter(e => !currentSymbols.has(e.symbol) && e.symbol !== element.symbol);

    return shuffleArray(finalSuggestions).slice(0, 4);
  };

  const addElement = (element: Element) => {
    if (selectedElements.length < 4) {
      setSplash(true);
      setTimeout(() => setSplash(false), 700);
      
      const burstColor = getCategoryColor(element.category);
      setPowderBurst({active: true, color: burstColor});
      setTimeout(() => setPowderBurst({active: false, color: burstColor}), 1000);
      
      const newBubbles = [...bubbles];
      for (let i = 0; i < 8; i++) {
        newBubbles.push(Math.random());
      }
      setBubbles(newBubbles);
      
      setSelectedElements((prev) => {
        const newElements = [...prev, element];
        setSuggestedElements(findCompatibleElements(element));
        setShowSuggestions(true);
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
        variant: "destructive"
      });
    }
  };

  const addCompound = (compound: { name: string; formula: string; description: string }) => {
    setColorChange(true);
    setSteam(true);
    setElectricArcs(true);
    
    const newBubbles = [...bubbles];
    for (let i = 0; i < 15; i++) {
      newBubbles.push(Math.random());
    }
    setBubbles(newBubbles);

    setTimeout(() => {
      setColorChange(false);
      setSteam(false);
      setElectricArcs(false);
    }, 2000);

    toast({
      title: `${compound.name} added`,
      description: `${compound.formula} - ${compound.description}`,
    });
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
    setSteam(false);
    setCrystallization(false);
    setShowSuggestions(true);
    setHeatWaves(false);
    setColorChange(false);
    setPrecipitation(false);
    setElectricArcs(false);
    setFlames(false);
    setWindEffect(false);
  };

  const simulateCurrentReaction = () => {
    if (selectedElements.length >= 2) {
      setAnimating(true);
      
      const result = simulateReaction(selectedElements[0], selectedElements[1]);
      
      const newBubbles = [...bubbles];
      for (let i = 0; i < 25; i++) {
        newBubbles.push(Math.random());
      }
      setBubbles(newBubbles);
      
      if (result.animationType === 'explosion') {
        setExplosion(true);
        setHeatWaves(true);
        setFlames(true);
        setWindEffect(true);
        setTimeout(() => {
          setExplosion(false);
          setHeatWaves(false);
          setFlames(false);
          setWindEffect(false);
        }, 3000);
      } else if (result.animationType === 'gas') {
        setGas(true);
        setSteam(true);
        setWindEffect(true);
        setTimeout(() => {
          setGas(false);
          setSteam(false);
          setWindEffect(false);
        }, 4000);
      } else if (result.animationType === 'crystallization') {
        setCrystallization(true);
        setPrecipitation(true);
        setElectricArcs(true);
        setTimeout(() => {
          setCrystallization(false);
          setPrecipitation(false);
          setElectricArcs(false);
        }, 3500);
      } else if (result.animationType === 'neutralization') {
        setColorChange(true);
        setSteam(true);
        setElectricArcs(true);
        setTimeout(() => {
          setColorChange(false);
          setSteam(false);
          setElectricArcs(false);
        }, 2500);
      } else if (result.animationType === 'combustion') {
        setExplosion(true);
        setHeatWaves(true);
        setGas(true);
        setFlames(true);
        setWindEffect(true);
        setTimeout(() => {
          setExplosion(false);
          setHeatWaves(false);
          setGas(false);
          setFlames(false);
          setWindEffect(false);
        }, 3500);
      }
      
      setSplash(true);
      setTimeout(() => setSplash(false), 700);
      
      setTimeout(() => {
        setShowSuggestions(true);
      }, 2000);
      
      setTimeout(() => {
        setReaction(result);

        try {
          const reactionLog = JSON.parse(localStorage.getItem('reactionLog') || '[]');
          const newLogEntry = {
            id: new Date().toISOString(),
            reactants: selectedElements.slice(0, 2).map(e => ({ name: e.name, symbol: e.symbol })),
            product: result.result,
            description: result.description,
            timestamp: new Date().toISOString()
          };
          const updatedLog = [newLogEntry, ...reactionLog].slice(0, 20);
          localStorage.setItem('reactionLog', JSON.stringify(updatedLog));
        } catch (error) {
          console.error("Failed to write to localStorage", error);
        }
      }, 600);
      
      setTimeout(() => {
        setAnimating(false);
      }, 2000);
    }
  };

  useEffect(() => {
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
      setReaction(null);
    }
    
    if (selectedElements.length === 1) {
      setSuggestedElements(findCompatibleElements(selectedElements[0]));
      setShowSuggestions(true);
    } else if (selectedElements.length === 0) {
      setSuggestedElements([]);
      setShowSuggestions(true);
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
      case 'actinide': return '#f59e0b';
      default: return '#d1d5db';
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
        {selectedElements.length > 0 && showSuggestions && (
          <ElementSuggestions 
            element={selectedElements[selectedElements.length - 1]} 
            onSelectElement={addElement}
            onAddCompound={addCompound}
            suggestedElements={suggestedElements}
            isReacting={animating}
          />
        )}
        
        {electricArcs && (
          <div className="absolute inset-0 z-15 pointer-events-none overflow-hidden">
            {[...Array(8)].map((_, i) => (
              <div 
                key={`arc-${i}`}
                className="absolute"
                style={{
                  width: '2px',
                  height: Math.random() * 100 + 50 + 'px',
                  left: Math.random() * 80 + 10 + '%',
                  top: Math.random() * 60 + 20 + '%',
                  background: 'linear-gradient(to bottom, #60a5fa, #3b82f6, #1d4ed8)',
                  boxShadow: '0 0 10px #3b82f6, 0 0 20px #60a5fa',
                  animation: `electric-arc ${Math.random() * 0.5 + 0.2}s ease-in-out infinite alternate`,
                  transform: `rotate(${Math.random() * 60 - 30}deg)`,
                  opacity: Math.random() * 0.8 + 0.2
                }}
              ></div>
            ))}
          </div>
        )}

        {flames && (
          <div className="absolute inset-0 z-15 pointer-events-none overflow-hidden">
            {[...Array(12)].map((_, i) => (
              <div 
                key={`flame-${i}`}
                className="absolute"
                style={{
                  width: Math.random() * 20 + 10 + 'px',
                  height: Math.random() * 40 + 20 + 'px',
                  left: Math.random() * 60 + 20 + '%',
                  bottom: Math.random() * 30 + 10 + '%',
                  background: 'linear-gradient(to top, #dc2626, #f97316, #fbbf24)',
                  borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
                  animation: `flame-flicker ${Math.random() * 0.5 + 0.3}s ease-in-out infinite alternate`,
                  filter: 'blur(1px)',
                  opacity: Math.random() * 0.9 + 0.1
                }}
              ></div>
            ))}
          </div>
        )}

        {windEffect && (
          <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
            {[...Array(20)].map((_, i) => (
              <div 
                key={`wind-${i}`}
                className="absolute bg-white/20 rounded-full"
                style={{
                  width: Math.random() * 4 + 1 + 'px',
                  height: Math.random() * 4 + 1 + 'px',
                  left: Math.random() * 100 + '%',
                  top: Math.random() * 100 + '%',
                  animation: `wind-blow ${Math.random() * 2 + 1}s linear infinite`,
                  animationDelay: Math.random() * 1 + 's'
                }}
              ></div>
            ))}
          </div>
        )}

        {heatWaves && (
          <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
            {[...Array(15)].map((_, i) => (
              <div 
                key={`heat-${i}`}
                className="absolute bg-gradient-to-t from-orange-400/30 to-red-400/20 rounded-full"
                style={{
                  width: Math.random() * 80 + 40 + 'px',
                  height: Math.random() * 120 + 60 + 'px',
                  left: Math.random() * 80 + 10 + '%',
                  top: Math.random() * 60 + 20 + '%',
                  animation: `gas-rise ${Math.random() * 2 + 1}s ease-out infinite`,
                  animationDelay: Math.random() * 1 + 's',
                  filter: 'blur(3px)'
                }}
              ></div>
            ))}
          </div>
        )}

        {explosion && (
          <div className="absolute inset-0 z-10">
            <div className="absolute inset-0 bg-gradient-radial from-orange-500/40 via-red-500/20 to-transparent animate-pulse"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative">
                <div className="w-32 h-32 bg-gradient-radial from-yellow-300 via-orange-500 to-red-600 rounded-full animate-ping opacity-75"></div>
                <div className="absolute top-1/2 left-1/2 w-20 h-20 -translate-x-1/2 -translate-y-1/2 bg-white rounded-full animate-pulse"></div>
              </div>
            </div>
            {[...Array(50)].map((_, i) => (
              <div 
                key={i} 
                className="absolute rounded-full"
                style={{
                  width: Math.random() * 8 + 2 + 'px',
                  height: Math.random() * 8 + 2 + 'px',
                  left: 50 + Math.random() * 10 - 5 + '%',
                  top: 50 + Math.random() * 10 - 5 + '%',
                  background: `hsl(${Math.random() * 60 + 10}, 90%, 60%)`,
                  opacity: Math.random() * 0.9 + 0.1,
                  animation: `explosion-particle ${Math.random() * 1.5 + 0.5}s ease-out forwards`,
                  '--x-move': `${(Math.random() - 0.5) * 400}px`,
                  '--y-move': `${(Math.random() - 0.5) * 400}px`,
                } as React.CSSProperties}
              ></div>
            ))}
          </div>
        )}
        
        {gas && (
          <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
            {[...Array(35)].map((_, i) => (
              <div 
                key={i} 
                className="absolute rounded-full"
                style={{
                  width: Math.random() * 60 + 15 + 'px',
                  height: Math.random() * 60 + 15 + 'px',
                  left: Math.random() * 80 + 10 + '%',
                  top: Math.random() * 30 + 60 + '%',
                  background: `hsla(${Math.random() * 120 + 60}, 70%, 60%, 0.4)`,
                  animationDuration: Math.random() * 4 + 2 + 's',
                  animationDelay: Math.random() * 2 + 's',
                  animation: `gas-rise ${Math.random() * 4 + 2}s ease-out infinite`,
                  filter: 'blur(2px)'
                }}
              ></div>
            ))}
          </div>
        )}

        {steam && (
          <div className="absolute inset-0 z-15 pointer-events-none overflow-hidden">
            {[...Array(50)].map((_, i) => (
              <div 
                key={`steam-${i}`}
                className="absolute bg-white/40 rounded-full"
                style={{
                  width: Math.random() * 40 + 8 + 'px',
                  height: Math.random() * 40 + 8 + 'px',
                  left: Math.random() * 70 + 15 + '%',
                  top: Math.random() * 20 + 50 + '%',
                  animationDuration: Math.random() * 5 + 2 + 's',
                  animationDelay: Math.random() * 1 + 's',
                  animation: `gas-rise ${Math.random() * 5 + 2}s ease-out infinite`,
                  filter: 'blur(3px)',
                  opacity: Math.random() * 0.6 + 0.2
                }}
              ></div>
            ))}
          </div>
        )}

        {precipitation && (
          <div className="absolute inset-0 z-15 pointer-events-none overflow-hidden">
            {[...Array(30)].map((_, i) => (
              <div 
                key={`precipitate-${i}`}
                className="absolute animate-fall"
                style={{
                  width: Math.random() * 6 + 2 + 'px',
                  height: Math.random() * 6 + 2 + 'px',
                  left: Math.random() * 70 + 15 + '%',
                  top: Math.random() * 40 + 20 + '%',
                  background: 'linear-gradient(45deg, #f0f9ff, #dbeafe, #bfdbfe)',
                  borderRadius: '50%',
                  animationDuration: Math.random() * 3 + 1 + 's',
                  animationDelay: Math.random() * 0.5 + 's',
                  opacity: Math.random() * 0.8 + 0.3
                }}
              ></div>
            ))}
          </div>
        )}

        {colorChange && (
          <div className="absolute inset-0 z-5 pointer-events-none">
            <div 
              className="absolute bottom-0 w-full h-3/4 rounded-b-2xl transition-all duration-2000"
              style={{
                background: 'linear-gradient(to top, #fef3c7, #fde68a, #fcd34d)',
                animation: 'pulse 2s ease-in-out'
              }}
            ></div>
          </div>
        )}

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
        
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="relative w-56 h-64">
              <div className="absolute bottom-0 w-full h-full rounded-b-3xl rounded-t-lg overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent border-2 border-gray-300/50 rounded-b-3xl rounded-t-lg backdrop-blur-sm shadow-2xl">
                  <div className="absolute top-8 left-4 w-16 h-32 bg-white/25 rounded-full transform -rotate-12 blur-sm"></div>
                  <div className="absolute top-12 right-6 w-8 h-24 bg-white/20 rounded-full transform rotate-12 blur-sm"></div>
                  <div className="absolute bottom-16 left-8 w-12 h-16 bg-white/15 rounded-full transform -rotate-45 blur-sm"></div>
                  
                  <div className="absolute inset-0 border border-gray-200/40 rounded-b-3xl rounded-t-lg"></div>
                  <div className="absolute inset-1 border border-gray-100/30 rounded-b-3xl rounded-t-lg"></div>
                </div>
                
                <div className="absolute -top-[1px] left-[8%] w-[35%] h-5 border-t-2 border-l-2 border-r-2 border-gray-300/50 bg-gradient-to-b from-white/8 to-transparent" 
                     style={{ clipPath: 'polygon(0 0, 85% 0, 100% 100%, 15% 100%)' }}>
                  <div className="absolute top-0 left-2 w-4 h-2 bg-white/15 rounded-full blur-sm"></div>
                </div>
                
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-48 h-4 bg-black/15 rounded-full blur-lg"></div>
              </div>

              <div className={`absolute bottom-0 w-full transition-all duration-700 ease-out overflow-hidden rounded-b-2xl ${selectedElements.length > 0 ? 'h-[70%]' : 'h-[15%]'}`}>
                <div className={`w-full h-full relative ${reaction?.productColor ? reaction.productColor : 'bg-gradient-to-b from-blue-100/50 to-blue-200/40 dark:from-blue-800/40 dark:to-blue-700/30'} ${animating ? 'animate-pulse' : ''}`}>
                  <div className="absolute inset-x-0 top-0 h-2 bg-gradient-to-b from-white/60 via-white/30 to-transparent rounded-full"></div>
                  <div className="absolute inset-x-2 top-0 h-1 bg-white/40 rounded-full"></div>
                  
                  {bubbles.map((bubble, index) => (
                      <div key={index} 
                           className="absolute rounded-full bg-white/90 dark:bg-white/60 animate-rise shadow-lg" 
                           style={{
                              width: Math.max(4, Math.random() * 12) + 'px',
                              height: Math.max(4, Math.random() * 12) + 'px',
                              bottom: bubble * 100 + '%',
                              left: Math.random() * 80 + 10 + '%',
                              animationDuration: Math.random() * 2 + 1 + 's',
                              opacity: Math.random() * 0.8 + 0.2,
                              boxShadow: 'inset 0 0 4px rgba(255,255,255,0.9), 0 0 4px rgba(0,0,0,0.2)'
                           }} />
                  ))}
                  
                  {selectedElements.length > 1 && (
                    <>
                      <div className="absolute bottom-0 w-full h-1/4 bg-gradient-to-t from-black/15 to-transparent"></div>
                      <div className="absolute bottom-1/4 w-full h-1 bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
                    </>
                  )}
                </div>
              </div>

              <div className="absolute inset-0 flex flex-col items-center justify-between p-4 pt-8 pb-4">
                  {selectedElements.length === 0 ? (
                      <div className="text-center text-muted-foreground self-center mt-12">
                          <Beaker className="mx-auto h-12 w-12 mb-3 opacity-50" />
                          <p>Drag elements here</p>
                          <p className="text-xs mt-1 text-muted-foreground/80">to start a reaction</p>
                      </div>
                  ) : (
                    <>
                      {reaction ? (
                          <div className="text-center">
                              <h3 className="text-xl font-bold">{reaction.result}</h3>
                              <p className="text-sm mt-1">{reaction.description}</p>
                              <div className="mt-3 flex items-center justify-center gap-2">
                                  {getReactionIcon(reaction.animationType)}
                                  <span className="text-xs text-muted-foreground">{getReactionTypeName(reaction.animationType)}</span>
                              </div>
                          </div>
                      ) : <div />}
                      
                      <div className="flex flex-wrap items-center justify-center gap-2">
                          {selectedElements.map((element, index) => (
                              <div key={index} className={`${animating ? 'animate-shake' : ''}`}>
                                  <ElementCard element={element} onClick={() => onElementClick(element)} size="xs" isDraggable={false} />
                              </div>
                          ))}
                      </div>
                    </>
                  )}
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
