import React, { useState } from 'react';
import ElementCard from './ElementCard';
import { Element, elements, periodicTableLayout, categoryNames } from '../data/elements';
import { useTheme } from '@/hooks/use-theme';
import { Atom, ZoomIn, ZoomOut } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface PeriodicTableProps {
  onElementClick: (element: Element) => void;
}

const PeriodicTable: React.FC<PeriodicTableProps> = ({ onElementClick }) => {
  const { theme } = useTheme();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [zoom, setZoom] = useState(0.75);

  const handleZoomIn = () => setZoom(z => Math.min(z + 0.1, 1.2));
  const handleZoomOut = () => setZoom(z => Math.max(z - 0.1, 0.4));

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
      <div className="flex items-center justify-end gap-2 px-6 -mb-2 z-20 relative">
        <Button variant="outline" size="icon" onClick={handleZoomOut} className="bg-transparent border-white/10 hover:bg-white/10 h-8 w-8">
          <ZoomOut className="h-4 w-4" />
          <span className="sr-only">Zoom Out</span>
        </Button>
        <Button variant="outline" size="icon" onClick={handleZoomIn} className="bg-transparent border-white/10 hover:bg-white/10 h-8 w-8">
          <ZoomIn className="h-4 w-4" />
          <span className="sr-only">Zoom In</span>
        </Button>
      </div>
      
      <div className="relative rounded-xl overflow-x-auto">
        <div 
          className="relative p-6 transition-transform duration-300 ease-in-out"
          style={{ 
            transform: `scale(${zoom})`,
            transformOrigin: 'center top'
          }}
        >
          <div 
            className="periodic-table-grid" 
            style={{ 
              display: 'grid',
              gridTemplateColumns: 'repeat(18, 60px)',
              gridGap: '4px',
              justifyContent: 'center',
              padding: '8px'
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
                        size="sm"
                      />
                    )}
                  </div>
                ))}
              </React.Fragment>
            ))}
          </div>
          
          {/* Period numbers (vertical) */}
          <div className="absolute left-0 top-0 h-full flex flex-col justify-around py-6">
            {[1, 2, 3, 4, 5, 6, 7, "", 8, 9].map((period, index) => (
              <div key={`period-${index}`} className="text-xs font-medium text-neutral-500 px-1">
                {period && period}
              </div>
            ))}
          </div>
          
          {/* Group numbers (horizontal) */}
          <div className="absolute top-0 left-0 w-full flex justify-around px-6" 
               style={{ paddingLeft: '20px' }}>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18].map((group) => (
              <div key={`group-${group}`} className="text-xs font-medium text-neutral-500">
                {group}
              </div>
            ))}
          </div>
        </div>
        
        {/* Atom icon watermark */}
        <div className="absolute bottom-2 right-2 opacity-5 pointer-events-none">
          <Atom className="h-20 w-20 text-white" />
        </div>
      </div>
      
      {/* Legend */}
      <div className="mt-4 flex flex-wrap gap-2 justify-center p-4 bg-card/50 rounded-xl border border-white/10 backdrop-blur-sm">
        <div className="w-full text-center mb-1">
          <h4 className="text-sm font-medium text-neutral-300">Element Categories</h4>
        </div>
        {Object.entries(categoryNames).map(([category, name]) => (
          <button
            key={category} 
            className={cn(`px-3 py-1.5 rounded-full text-xs flex items-center gap-2 
              bg-card hover:bg-background
              border border-white/10
              transition-all
              `,
              selectedCategory === category ? 'ring-2 ring-primary' : ''
            )}
            onClick={() => handleCategoryClick(category)}
          >
            <div className={cn(
              `w-3 h-3 rounded-full`,
              `bg-chemistry-${category}`
            )}></div>
            {name}
          </button>
        ))}
      </div>
      
      {/* Display filtered elements when category is selected */}
      {selectedCategory && (
        <div className="mt-4 p-4 bg-card/50 rounded-xl border border-white/10 backdrop-blur-sm animate-fade-in">
          <h4 className="text-sm font-medium mb-3 text-neutral-300">
            {categoryNames[selectedCategory as keyof typeof categoryNames]} Elements
          </h4>
          <div className="flex flex-wrap gap-2 justify-center">
            {filteredElements.map(element => (
              <ElementCard
                key={element.id}
                element={element}
                onClick={() => onElementClick(element)}
                size="md"
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
