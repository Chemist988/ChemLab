
import React from 'react';
import { Element, categoryNames } from '../data/elements';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from '@/components/ui/scroll-area';

interface ElementDetailProps {
  element: Element | null;
  isOpen: boolean;
  onClose: () => void;
}

const ElementDetail: React.FC<ElementDetailProps> = ({ element, isOpen, onClose }) => {
  if (!element) return null;
  
  const formatValue = (value: number | undefined, unit: string): string => {
    if (value === undefined) return 'Unknown';
    return `${value} ${unit}`;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl flex items-center gap-2">
            <span className="text-4xl font-bold">{element.symbol}</span> 
            <span>- {element.name}</span>
          </DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-[60vh] pr-4">
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-muted/50 p-2 rounded">
                <p className="text-sm font-medium">Atomic Number</p>
                <p className="text-xl">{element.atomicNumber}</p>
              </div>
              <div className="bg-muted/50 p-2 rounded">
                <p className="text-sm font-medium">Atomic Mass</p>
                <p className="text-xl">{element.atomicMass} u</p>
              </div>
              <div className="bg-muted/50 p-2 rounded">
                <p className="text-sm font-medium">Category</p>
                <p className="text-xl">{categoryNames[element.category]}</p>
              </div>
              <div className="bg-muted/50 p-2 rounded">
                <p className="text-sm font-medium">Group / Period</p>
                <p className="text-xl">{element.group || '–'} / {element.period}</p>
              </div>
            </div>
            
            <div className="bg-muted/30 p-3 rounded">
              <h3 className="font-medium mb-1">Physical Properties</h3>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <p className="text-muted-foreground">Density</p>
                  <p>{formatValue(element.density, 'g/cm³')}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Electronegativity</p>
                  <p>{formatValue(element.electronegativity, '')}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Melting Point</p>
                  <p>{formatValue(element.meltingPoint, '°C')}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Boiling Point</p>
                  <p>{formatValue(element.boilingPoint, '°C')}</p>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="font-medium mb-1">Electron Configuration</h3>
              <p className="font-mono bg-muted/30 p-2 rounded">{element.electronConfiguration}</p>
            </div>
            
            {element.discoveredBy && (
              <div>
                <h3 className="font-medium mb-1">Discovered By</h3>
                <p>{element.discoveredBy}</p>
              </div>
            )}
            
            <div>
              <h3 className="font-medium mb-1">Description</h3>
              <p className="text-sm leading-relaxed">{element.description}</p>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default ElementDetail;
