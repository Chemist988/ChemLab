import React, { useState } from 'react';
import ElementCard from './ElementCard';
import { Element, elements, periodicTableLayout, categoryNames, categoryColors } from '../data/elements';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Label } from '@/components/ui/label';
import { useTheme } from '@/hooks/use-theme';
import { Atom } from 'lucide-react';

interface PeriodicTableProps {
  onElementClick: (element: Element) => void;
}

const PeriodicTable: React.FC<PeriodicTableProps> = ({ onElementClick }) => {
  const { theme } = useTheme();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const getElementByAtomicNumber = (atomicNumber: number): Element | undefined => {
    return elements.find(element => element.atomicNumber === atomicNumber);
  };

  const handleCategoryClick = (category: string) => {
    if (selectedCategory === category) {
      setSelectedCategory(null);
    } else {
      setSelectedCategory(category);
    }
  };

  const filteredElements = selectedCategory 
    ? elements.filter(element => element.category === selectedCategory)
    : [];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <h3 className="text-md font-semibold">Interactive Periodic Table</h3>
        </div>
      </div>

      <div className="relative rounded-xl overflow-hidden border shadow-md bg-gradient-to-br from-card to-background/80">
        <ScrollArea className="h-auto w-full">
          <div className="relative p-4 flex justify-center">
            <div 
              className="periodic-table-grid" 
              style={{ 
                display: 'grid',
                gridTemplateColumns: 'repeat(18, 60px)',
                gridGap: '4px',
                justifyContent: 'center',
              }}
            >
              {periodicTableLayout.map((row, rowIndex) => (
                <React.Fragment key={rowIndex}>
                  {row.map((atomicNumber, colIndex) => (
                    <div 
                      key={`${rowIndex}-${colIndex}`} 
                      className={`
                        element-cell transition-all duration-300
                        ${atomicNumber > 0 ? '' : 'opacity-0 pointer-events-none'}
                      `}
                      style={{
                        width: '60px',
                        height: '60px'
                      }}
                    >
                      {atomicNumber > 0 && getElementByAtomicNumber(atomicNumber) && (
                        <ElementCard
                          element={getElementByAtomicNumber(atomicNumber)!}
                          onClick={() => onElementClick(getElementByAtomicNumber(atomicNumber)!)}
                          size="xs"
                          className="animate-fade-in backdrop-blur-sm"
                        />
                      )}
                    </div>
                  ))}
                </React.Fragment>
              ))}
            </div>
          </div>
        </ScrollArea>
        
        {/* Atom icon watermark */}
        <div className="absolute bottom-2 right-2 opacity-5 pointer-events-none">
          <Atom className="h-20 w-20" />
        </div>
      </div>
      
      {/* Legend - Always show the categories */}
      <div className="mt-4 flex flex-wrap gap-2 justify-center p-4 bg-gradient-to-br from-card/70 to-card/30 rounded-xl shadow-sm border border-white/10 backdrop-blur-sm">
        <div className="w-full text-center mb-1">
          <h4 className="text-sm font-medium">Element Categories</h4>
        </div>
        {Object.entries(categoryNames).map(([category, name]) => (
          <div 
            key={category} 
            className={`px-3 py-1.5 rounded-full text-xs flex items-center gap-2 
              bg-chemistry-${category} bg-opacity-30 dark:bg-opacity-50 
              border border-chemistry-${category}/20 shadow-sm hover:shadow-md 
              transition-shadow cursor-pointer
              ${selectedCategory === category ? 'ring-2 ring-primary' : ''}
            `}
            onClick={() => handleCategoryClick(category)}
          >
            <div className={`w-3 h-3 rounded-full bg-chemistry-${category}`}></div>
            {name}
          </div>
        ))}
      </div>
      
      {/* Display filtered elements when category is selected */}
      {selectedCategory && (
        <div className="mt-4 p-4 bg-gradient-to-br from-card/70 to-card/30 rounded-xl shadow-sm border border-white/10 backdrop-blur-sm animate-fade-in">
          <h4 className="text-sm font-medium mb-3">
            {categoryNames[selectedCategory as keyof typeof categoryNames]} Elements
          </h4>
          <div className="flex flex-wrap gap-2 justify-center">
            {filteredElements.map(element => (
              <ElementCard
                key={element.id}
                element={element}
                onClick={() => onElementClick(element)}
                size="md"
                className="animate-fade-in"
              />
            ))}
            {filteredElements.length === 0 && (
              <p className="text-sm text-muted-foreground">No elements found in this category.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default PeriodicTable;
