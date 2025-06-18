
import React from 'react';
import { Element } from '@/data/elements';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import ElementCard from './ElementCard';
import { Button } from '@/components/ui/button';
import { Info } from 'lucide-react';

interface ElementSuggestionsProps {
  element: Element | null;
  onSelectElement: (element: Element) => void;
  suggestedElements: Element[];
  isReacting?: boolean;
}

const ElementSuggestions: React.FC<ElementSuggestionsProps> = ({ 
  element, 
  onSelectElement, 
  suggestedElements,
  isReacting = false
}) => {
  if (!element || suggestedElements.length === 0 || isReacting) return null;

  return (
    <div className="absolute top-2 right-2 z-20">
      <Popover>
        <PopoverTrigger asChild>
          <Button 
            variant="outline" 
            size="sm" 
            className="flex items-center gap-1 animate-pulse bg-secondary/80"
          >
            <Info className="h-3.5 w-3.5" />
            <span className="text-xs">Suggestions</span>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-72 p-3" align="end">
          <div className="space-y-2">
            <h4 className="font-medium text-sm">Elements that react well with {element.name}</h4>
            <p className="text-xs text-muted-foreground mb-2">
              Try adding one of these elements for interesting reactions
            </p>
            <div className="grid grid-cols-2 gap-2">
              {suggestedElements.map((suggestedElement) => (
                <div 
                  key={suggestedElement.symbol} 
                  className="cursor-pointer hover:bg-muted p-1 rounded transition-colors"
                  onClick={() => onSelectElement(suggestedElement)}
                >
                  <ElementCard 
                    element={suggestedElement} 
                    onClick={() => onSelectElement(suggestedElement)} 
                    size="sm"
                    isDraggable={false}
                  />
                </div>
              ))}
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default ElementSuggestions;
