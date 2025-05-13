
import React, { useState, useEffect } from 'react';
import { useDrop } from 'react-dnd';
import { Element } from '../data/elements';
import ElementCard from './ElementCard';
import { simulateReaction, getAnimationClass, ReactionResult } from '../utils/reactionUtils';
import { toast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Sparkles, RotateCw, Beaker } from 'lucide-react';

interface ReactionZoneProps {
  onElementClick: (element: Element) => void;
}

const ReactionZone: React.FC<ReactionZoneProps> = ({ onElementClick }) => {
  const [selectedElements, setSelectedElements] = useState<Element[]>([]);
  const [reaction, setReaction] = useState<ReactionResult | null>(null);
  const [animating, setAnimating] = useState(false);
  const [bubbles, setBubbles] = useState<number[]>([]);

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
          ${isOver ? 'border-primary/70 bg-primary/5' : ''}
          transition-all duration-300
        `}
      >
        {/* Beaker container */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="relative w-48 h-48">
            {/* Beaker body */}
            <div className="absolute bottom-0 w-full h-[85%] border-2 border-gray-300 rounded-b-lg bg-blue-50/40 backdrop-blur-sm">
              {/* Beaker liquid */}
              <div 
                className={`
                  absolute bottom-0 w-full rounded-b-lg transition-all duration-700 ease-out
                  ${selectedElements.length > 0 ? 'h-[70%]' : 'h-[15%]'}
                  ${reaction ? getReactionColor(reaction.animationType) : 'bg-blue-100/70'}
                  ${animating ? 'animate-pulse' : ''}
                `}
              >
                {/* Bubbles */}
                {bubbles.map((bubble, index) => (
                  <div 
                    key={index} 
                    className="absolute rounded-full bg-white/80 animate-rise"
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
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
            
            {/* Beaker top rim */}
            <div className="absolute top-[15%] w-full h-[3px] bg-gray-300"></div>
            
            {/* Beaker neck */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[60%] h-[15%] border-t-2 border-l-2 border-r-2 border-gray-300"></div>
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
      return 'bg-orange-200';
    case 'bubble':
      return 'bg-green-200';
    case 'fade':
      return 'bg-blue-200';
    default:
      return 'bg-blue-100/70';
  }
};

export default ReactionZone;
