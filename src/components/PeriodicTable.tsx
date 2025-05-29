
import React, { useState } from 'react';
import ElementCard from './ElementCard';
import { Element, elements, periodicTableLayout, categoryNames } from '../data/elements';
import { ScrollArea } from '@/components/ui/scroll-area';
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
          <h3 className="text-lg font-semibold">Periodic Table - All 118 Elements</h3>
        </div>
      </div>

      <div className="relative rounded-xl overflow-hidden border shadow-md bg-gradient-to-br from-card to-background/80">
        <ScrollArea className="h-[500px] w-full">
          <div className="relative p-4">
            <div 
              className="periodic-table-grid" 
              style={{ 
                display: 'grid',
                gridTemplateColumns: 'repeat(18, 42px)',
                gridGap: '2px',
                justifyContent: 'center',
                padding: '4px',
                transform: 'scale(0.85)',
                transformOrigin: 'center top'
              }}
            >
              {periodicTableLayout.map((row, rowIndex) => (
                <React.Fragment key={rowIndex}>
                  {row.map((atomicNumber, colIndex) => (
                    <div 
                      key={`${rowIndex}-${colIndex}`} 
                      className="element-cell transition-all duration-300"
                      style={{
                        width: '42px',
                        height: '42px'
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
            
            {/* Period numbers */}
            <div className="absolute left-0 top-0 h-full flex flex-col justify-around py-4" style={{ transform: 'scale(0.85)', transformOrigin: 'left top' }}>
              {[1, 2, 3, 4, 5, 6, 7, "", "", ""].map((period, index) => (
                <div key={`period-${index}`} className="text-xs font-medium text-muted-foreground px-1 h-[42px] flex items-center">
                  {period && period}
                </div>
              ))}
            </div>
            
            {/* Group numbers */}
            <div className="absolute top-0 left-0 w-full flex justify-around px-4" 
                 style={{ paddingLeft: '16px', transform: 'scale(0.85)', transformOrigin: 'left top' }}>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18].map((group) => (
                <div key={`group-${group}`} className="text-xs font-medium text-muted-foreground w-[42px] text-center">
                  {group}
                </div>
              ))}
            </div>
          </div>
        </ScrollArea>
        
        {/* Atom icon watermark */}
        <div className="absolute bottom-2 right-2 opacity-5 pointer-events-none">
          <Atom className="h-16 w-16" />
        </div>
      </div>
      
      {/* Legend */}
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
      
      {/* Display filtered elements */}
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
                size="sm"
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
