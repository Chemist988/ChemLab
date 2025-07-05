import React, { useState, useEffect } from 'react';
import { useDrop } from 'react-dnd';
import { Element, elements as elementsDatabase } from '@/data/elements';
import ElementCard from './ElementCard';
import ElementSuggestions from './ElementSuggestions';
import Beaker3D from './Beaker3D';
import { simulateReaction, ReactionResult, reactions } from '../utils/reactionUtils';
import { Button } from '@/components/ui/button';
import { RotateCw, Bomb, Flame, Sparkles, Droplets, FlaskConical, Atom, Beaker, Zap, Hexagon } from 'lucide-react';

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
  const [plasmaBurst, setPlasmaBurst] = useState(false);
  const [radioactiveGlow, setRadioactiveGlow] = useState(false);
  const [chemicalSpiral, setChemicalSpiral] = useState(false);
  const [molecularDance, setMolecularDance] = useState(false);
  const [quantumFlicker, setQuantumFlicker] = useState(false);

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
  };

  const clearReaction = () => {
    setSelectedElements([]);
    setReaction(null);
    setAnimating(false);
    setBubbles([]);
    setExplosion(false);
    setGas(false);
    setSplash(false);
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
    setPlasmaBurst(false);
    setRadioactiveGlow(false);
    setChemicalSpiral(false);
    setMolecularDance(false);
    setQuantumFlicker(false);
  };

  const simulateCurrentReaction = () => {
    if (selectedElements.length >= 2) {
      setAnimating(true);
      
      const result = simulateReaction(selectedElements[0], selectedElements[1]);
      
      const newBubbles = [...bubbles];
      for (let i = 0; i < 35; i++) {
        newBubbles.push(Math.random());
      }
      setBubbles(newBubbles);
      
      // Enhanced animations based on reaction type
      if (result.animationType === 'explosion') {
        setExplosion(true);
        setHeatWaves(true);
        setFlames(true);
        setWindEffect(true);
        setPlasmaBurst(true);
        setTimeout(() => {
          setExplosion(false);
          setHeatWaves(false);
          setFlames(false);
          setWindEffect(false);
          setPlasmaBurst(false);
        }, 4000);
      } else if (result.animationType === 'gas') {
        setGas(true);
        setSteam(true);
        setWindEffect(true);
        setChemicalSpiral(true);
        setTimeout(() => {
          setGas(false);
          setSteam(false);
          setWindEffect(false);
          setChemicalSpiral(false);
        }, 5000);
      } else if (result.animationType === 'crystallization') {
        setCrystallization(true);
        setPrecipitation(true);
        setElectricArcs(true);
        setMolecularDance(true);
        setTimeout(() => {
          setCrystallization(false);
          setPrecipitation(false);
          setElectricArcs(false);
          setMolecularDance(false);
        }, 4500);
      } else if (result.animationType === 'neutralization') {
        setColorChange(true);
        setSteam(true);
        setElectricArcs(true);
        setQuantumFlicker(true);
        setTimeout(() => {
          setColorChange(false);
          setSteam(false);
          setElectricArcs(false);
          setQuantumFlicker(false);
        }, 3500);
      } else if (result.animationType === 'combustion') {
        setExplosion(true);
        setHeatWaves(true);
        setGas(true);
        setFlames(true);
        setWindEffect(true);
        setPlasmaBurst(true);
        setTimeout(() => {
          setExplosion(false);
          setHeatWaves(false);
          setGas(false);
          setFlames(false);
          setWindEffect(false);
          setPlasmaBurst(false);
        }, 4500);
      } else if (result.animationType === 'radioactive') {
        setRadioactiveGlow(true);
        setElectricArcs(true);
        setQuantumFlicker(true);
        setTimeout(() => {
          setRadioactiveGlow(false);
          setElectricArcs(false);
          setQuantumFlicker(false);
        }, 6000);
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
      }, 2500);
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
        
        {/* Simple reaction indicator */}
        {animating && (
          <div className="absolute inset-0 z-10 pointer-events-none">
            <div className="absolute inset-0 bg-primary/10 animate-pulse rounded-xl"></div>
          </div>
        )}

        {steam && (
          <div className="absolute inset-0 z-15 pointer-events-none overflow-hidden">
            {[...Array(20)].map((_, i) => (
              <div 
                key={`steam-${i}`}
                className="absolute bg-primary/20 rounded-full"
                style={{
                  width: Math.random() * 20 + 8 + 'px',
                  height: Math.random() * 20 + 8 + 'px',
                  left: Math.random() * 70 + 15 + '%',
                  top: Math.random() * 20 + 50 + '%',
                  animation: `gas-rise ${Math.random() * 3 + 2}s ease-out infinite`,
                  animationDelay: Math.random() * 1 + 's',
                  opacity: Math.random() * 0.4 + 0.2
                }}
              ></div>
            ))}
          </div>
        )}

        
        {gas && (
          <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
            {[...Array(15)].map((_, i) => (
              <div 
                key={i} 
                className="absolute rounded-full bg-primary/20"
                style={{
                  width: Math.random() * 30 + 10 + 'px',
                  height: Math.random() * 30 + 10 + 'px',
                  left: Math.random() * 80 + 10 + '%',
                  top: Math.random() * 30 + 60 + '%',
                  animationDuration: Math.random() * 3 + 2 + 's',
                  animationDelay: Math.random() * 1 + 's',
                  animation: `gas-rise ${Math.random() * 3 + 2}s ease-out infinite`,
                  opacity: Math.random() * 0.4 + 0.2
                }}
              ></div>
            ))}
          </div>
        )}

        {precipitation && (
          <div className="absolute inset-0 z-15 pointer-events-none overflow-hidden">
            {[...Array(12)].map((_, i) => (
              <div 
                key={`precipitate-${i}`}
                className="absolute"
                style={{
                  width: Math.random() * 4 + 2 + 'px',
                  height: Math.random() * 4 + 2 + 'px',
                  left: Math.random() * 70 + 15 + '%',
                  top: Math.random() * 40 + 20 + '%',
                  background: 'hsl(var(--primary) / 0.3)',
                  borderRadius: '50%',
                  animation: `gas-rise ${Math.random() * 2 + 1}s ease-out infinite`,
                  animationDelay: Math.random() * 0.5 + 's',
                  opacity: Math.random() * 0.6 + 0.3
                }}
              ></div>
            ))}
          </div>
        )}

        {colorChange && (
          <div className="absolute inset-0 z-5 pointer-events-none">
            <div 
              className="absolute bottom-0 w-full h-3/4 rounded-b-2xl transition-all duration-1000"
              style={{
                background: 'linear-gradient(to top, hsl(var(--primary) / 0.2), hsl(var(--primary) / 0.1), transparent)',
                animation: 'pulse 1.5s ease-in-out'
              }}
            ></div>
          </div>
        )}

        {splash && (
          <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden">
            {[...Array(10)].map((_, i) => (
              <div 
                key={`splash-${i}`}
                className="absolute bg-primary/40"
                style={{
                  width: Math.random() * 6 + 2 + 'px',
                  height: Math.random() * 12 + 8 + 'px',
                  left: 40 + Math.random() * 20 + '%',
                  top: 40 + Math.random() * 10 + '%',
                  borderRadius: '50% 50% 0 0',
                  transform: `rotate(${Math.random() * 360}deg)`,
                  opacity: Math.random() * 0.6 + 0.3,
                  animation: `gas-rise ${Math.random() * 0.8 + 0.5}s ease-out forwards`,
                }}
              ></div>
            ))}
          </div>
        )}
        
        {/* 3D Beaker */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="relative w-64 h-80">
            <Beaker3D
              liquidHeight={selectedElements.length > 0 ? 0.7 : 0.15}
              liquidColor="#3b82f6"
              isAnimating={animating}
              bubbles={bubbles}
            />
          </div>
        </div>

        <div className="absolute inset-0 flex flex-col items-center justify-center p-4 pt-8 pb-4">
          {selectedElements.length === 0 ? (
            <div className="text-center text-muted-foreground">
              <Beaker className="mx-auto h-12 w-12 mb-3 opacity-50" />
              <p>Drag elements here</p>
              <p className="text-xs mt-1 text-muted-foreground/80">to start a reaction</p>
            </div>
          ) : (
            <>
              {reaction ? (
                <div className="text-center mb-4">
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
    case 'radioactive':
      return 'Nuclear Reaction';
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
    case 'radioactive':
      return <Zap className="h-4 w-4 text-green-500" />;
    default:
      return <FlaskConical className="h-4 w-4 text-gray-500" />;
  }
};

export default ReactionZone;
