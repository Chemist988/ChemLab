
import React from 'react';
import { Element } from '@/data/elements';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Atom } from 'lucide-react';

interface ElementPaletteProps {
  elements: Element[];
  onAddAtom: (element: Element) => void;
  isDisabled: boolean;
}

const ElementPalette: React.FC<ElementPaletteProps> = ({ 
  elements, 
  onAddAtom, 
  isDisabled 
}) => {
  return (
    <Card className="liquid-glass">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Atom className="w-5 h-5" />
          Element Palette
        </CardTitle>
        <CardDescription>
          Click elements to add them to your 3D space
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-4 gap-2">
          {elements.map((element) => (
            <Button
              key={element.id}
              variant="outline"
              size="sm"
              onClick={() => onAddAtom(element)}
              className="liquid-glass-button p-2 h-auto flex flex-col items-center gap-1"
              disabled={isDisabled}
            >
              <span className="font-bold text-xs">{element.symbol}</span>
              <span className="text-[0.6rem] opacity-70">{element.atomicNumber}</span>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ElementPalette;
