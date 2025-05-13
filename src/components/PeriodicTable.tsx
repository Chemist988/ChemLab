
import React, { useState } from 'react';
import ElementCard from './ElementCard';
import { Element, elements, periodicTableLayout, categoryNames, categoryColors } from '../data/elements';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { useTheme } from '@/hooks/use-theme';

interface PeriodicTableProps {
  onElementClick: (element: Element) => void;
}

const PeriodicTable: React.FC<PeriodicTableProps> = ({ onElementClick }) => {
  const { theme } = useTheme();
  const [scale, setScale] = useState(1);

  const getElementByAtomicNumber = (atomicNumber: number): Element | undefined => {
    return elements.find(element => element.atomicNumber === atomicNumber);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <Label htmlFor="zoom">Zoom</Label>
          <input 
            id="zoom"
            type="range"
            min="0.8"
            max="1.2"
            step="0.1"
            value={scale}
            onChange={(e) => setScale(parseFloat(e.target.value))}
            className="w-24"
          />
        </div>
      </div>

      <ScrollArea className="h-[420px] w-full border rounded-md shadow-inner">
        <div className="p-4" style={{ transform: `scale(${scale})`, transformOrigin: 'top left', transition: 'transform 0.2s ease' }}>
          <div className="grid gap-1" style={{ gridTemplateColumns: 'repeat(18, minmax(0, 1fr))' }}>
            {periodicTableLayout.map((row, rowIndex) => (
              <React.Fragment key={rowIndex}>
                {row.map((atomicNumber, colIndex) => (
                  <div key={`${rowIndex}-${colIndex}`} className="min-h-14 flex items-center justify-center">
                    {atomicNumber > 0 && (
                      <ElementCard
                        element={getElementByAtomicNumber(atomicNumber)!}
                        onClick={() => onElementClick(getElementByAtomicNumber(atomicNumber)!)}
                        size="sm"
                      />
                    )}
                  </div>
                ))}
              </React.Fragment>
            ))}
          </div>
        </div>
      </ScrollArea>
      
      {/* Legend */}
      <div className="mt-4 flex flex-wrap gap-2 justify-center">
        {Object.entries(categoryNames).map(([category, name]) => (
          <div 
            key={category} 
            className={`px-2 py-1 rounded text-xs flex items-center gap-1 bg-chemistry-${category} bg-opacity-30 dark:bg-opacity-50`}
          >
            <div className={`w-3 h-3 rounded-sm bg-chemistry-${category}`}></div>
            {name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PeriodicTable;
