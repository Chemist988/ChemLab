
import React, { useState } from 'react';
import ElementCard from './ElementCard';
import { Element, elements, periodicTableLayout, categoryNames, categoryColors } from '../data/elements';
import { ScrollArea } from '@/components/ui/scroll-area';

interface PeriodicTableProps {
  onElementClick: (element: Element) => void;
}

const PeriodicTable: React.FC<PeriodicTableProps> = ({ onElementClick }) => {
  const getElementByAtomicNumber = (atomicNumber: number): Element | undefined => {
    return elements.find(element => element.atomicNumber === atomicNumber);
  };

  return (
    <ScrollArea className="h-[500px] w-full">
      <div className="p-4">
        <div className="grid gap-1" style={{ gridTemplateColumns: 'repeat(18, minmax(0, 1fr))' }}>
          {periodicTableLayout.map((row, rowIndex) => (
            <React.Fragment key={rowIndex}>
              {row.map((atomicNumber, colIndex) => (
                <div key={`${rowIndex}-${colIndex}`} className="min-h-16 flex items-center justify-center">
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
        
        {/* Legend */}
        <div className="mt-8 flex flex-wrap gap-2 justify-center">
          {Object.entries(categoryNames).map(([category, name]) => (
            <div 
              key={category} 
              className={`px-2 py-1 rounded text-xs flex items-center gap-1 bg-${categoryColors[category as keyof typeof categoryColors]} bg-opacity-30`}
            >
              <div className={`w-3 h-3 rounded-sm bg-${categoryColors[category as keyof typeof categoryColors]}`}></div>
              {name}
            </div>
          ))}
        </div>
      </div>
    </ScrollArea>
  );
};

export default PeriodicTable;
