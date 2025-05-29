
import React, { useState, useEffect } from 'react';
import { useDrop } from 'react-dnd';
import { Element } from '../data/elements';
import ElementCard from './ElementCard';
import ElementSuggestions from './ElementSuggestions';
import { simulateReaction, ReactionResult } from '../utils/reactionUtils';
import { toast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { RotateCw, Beaker } from 'lucide-react';

interface ReactionZoneProps {
  onElementClick: (element: Element) => void;
}

const ReactionZone: React.FC<ReactionZoneProps> = ({ onElementClick }) => {
  const [selectedElements, setSelectedElements] = useState<Element[]>([]);
  const [reaction, setReaction] = useState<ReactionResult | null>(null);

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
      setSelectedElements((prev) => [...prev, element]);
      
      toast({
        title: `${element.name} added`,
        description: "Element added to reaction beaker",
      });
    } else {
      toast({
        title: "Reaction zone full",
        description: "Only 2 elements allowed. Clear to add more.",
      });
    }
  };

  const clearReaction = () => {
    setSelectedElements([]);
    setReaction(null);
  };

  useEffect(() => {
    if (selectedElements.length === 2) {
      const result = simulateReaction(selectedElements[0], selectedElements[1]);
      setReaction(result);
    } else {
      setReaction(null);
    }
  }, [selectedElements]);

  return (
    <div className="flex flex-col gap-4 w-full">
      <div 
        ref={drop}
        className={`
          relative h-80 p-6 rounded-xl flex flex-col items-center justify-center
          ${isOver ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' : 'border-2 border-dashed border-gray-300 dark:border-gray-600'}
          transition-all duration-300 bg-white dark:bg-gray-800
        `}
      >
        {/* Beaker Design */}
        <div className="relative w-48 h-48 mx-auto">
          {/* Beaker outline */}
          <div className="absolute bottom-0 w-full h-40 border-4 border-gray-400 dark:border-gray-500 rounded-b-3xl bg-transparent">
            {/* Liquid level based on elements */}
            {selectedElements.length > 0 && (
              <div 
                className={`
                  absolute bottom-0 w-full rounded-b-3xl transition-all duration-1000
                  ${selectedElements.length === 1 ? 'h-1/3 bg-blue-200 dark:bg-blue-800' : ''}
                  ${selectedElements.length === 2 && reaction ? 
                    (reaction.result === "No Reaction" ? 'h-1/2 bg-gray-200 dark:bg-gray-700' : 'h-3/4 bg-green-200 dark:bg-green-800') 
                    : selectedElements.length === 2 ? 'h-1/2 bg-purple-200 dark:bg-purple-800' : ''
                  }
                `}
                style={{
                  background: selectedElements.length === 2 && reaction && reaction.result !== "No Reaction" 
                    ? 'linear-gradient(0deg, rgba(34,197,94,0.3) 0%, rgba(59,130,246,0.2) 100%)'
                    : undefined
                }}
              >
                {/* Bubbles effect for reactions */}
                {selectedElements.length === 2 && reaction && reaction.result !== "No Reaction" && (
                  <>
                    <div className="absolute top-2 left-4 w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
                    <div className="absolute top-4 left-8 w-1.5 h-1.5 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    <div className="absolute top-1 right-6 w-2.5 h-2.5 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                    <div className="absolute top-6 right-4 w-1 h-1 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '0.6s' }}></div>
                  </>
                )}
              </div>
            )}
          </div>
          
          {/* Beaker neck */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-20 h-12 border-4 border-t-4 border-l-4 border-r-4 border-gray-400 dark:border-gray-500 rounded-t-lg border-b-0"></div>
          
          {/* Element cards in beaker */}
          <div className="absolute inset-0 flex items-center justify-center">
            {selectedElements.length === 0 ? (
              <div className="text-center text-gray-500 dark:text-gray-400">
                <Beaker className="mx-auto h-8 w-8 mb-2" />
                <p className="text-sm">Drop 2 elements here</p>
              </div>
            ) : (
              <div className="flex gap-2 items-center justify-center">
                {selectedElements.map((element, index) => (
                  <ElementCard 
                    key={index}
                    element={element} 
                    onClick={() => onElementClick(element)}
                    size="xs"
                    isDraggable={false}
                  />
                ))}
                {selectedElements.length === 1 && (
                  <div className="w-9 h-9 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg flex items-center justify-center">
                    <span className="text-xs text-gray-400">+1</span>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
        
        {/* Reaction Result */}
        {reaction && selectedElements.length === 2 && (
          <div className="mt-4 text-center">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">{reaction.result}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{reaction.description}</p>
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
