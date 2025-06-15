
import React, { useState, useEffect } from 'react';
import { useDrop } from 'react-dnd';
import { Element } from '../data/elements';
import ElementCard from './ElementCard';
import { simulateReaction, getAnimationClass, ReactionResult } from '../utils/reactionUtils';
import { toast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Sparkles, RotateCw } from 'lucide-react';

interface ReactionZoneProps {
  onElementClick: (element: Element) => void;
}

const ReactionZone: React.FC<ReactionZoneProps> = ({ onElementClick }) => {
  const [selectedElements, setSelectedElements] = useState<Element[]>([]);
  const [reaction, setReaction] = useState<ReactionResult | null>(null);
  const [animating, setAnimating] = useState(false);

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
      setSelectedElements([...selectedElements, element]);
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
  };

  const simulateCurrentReaction = () => {
    if (selectedElements.length === 2) {
      setAnimating(true);
      const result = simulateReaction(selectedElements[0], selectedElements[1]);
      setReaction(result);
      
      setTimeout(() => {
        setAnimating(false);
      }, 2000);
    }
  };

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
          h-52 p-6 rounded-lg border-2 border-dashed flex flex-col items-center justify-center
          ${isOver ? 'border-primary/70 bg-primary/5' : 'border-muted'} 
          ${animating && reaction ? getAnimationClass(reaction.animationType) : ''}
          transition-all duration-300
        `}
      >
        {selectedElements.length === 0 ? (
          <div className="text-center text-muted-foreground">
            <Sparkles className="mx-auto h-8 w-8 mb-2" />
            <p>Drag elements here to start a reaction</p>
            <p className="text-xs mt-1">Try combining two elements!</p>
          </div>
        ) : (
          <div className="w-full h-full flex flex-col items-center">
            <div className="flex items-center justify-center gap-4 mb-4">
              {selectedElements.map((element, index) => (
                <div key={index} className="animate-bounce-subtle">
                  <ElementCard 
                    element={element} 
                    onClick={() => onElementClick(element)}
                    size="lg"
                    isDraggable={false}
                  />
                </div>
              ))}
            </div>
            
            {reaction && (
              <div className="text-center mt-2 animate-fade-in">
                <h3 className="text-xl font-bold">{reaction.result}</h3>
                <p className="text-sm mt-1">{reaction.description}</p>
              </div>
            )}
          </div>
        )}
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

export default ReactionZone;
