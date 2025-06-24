
import React, { useState } from 'react';
import ElementCard from './ElementCard';
import { Element, elements, periodicTableLayout, categoryNames } from '../data/elements';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import { Search, X } from 'lucide-react';

interface PeriodicTableProps {
  onElementClick: (element: Element) => void;
}

const PeriodicTable: React.FC<PeriodicTableProps> = ({ onElementClick }) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const getElementByAtomicNumber = (atomicNumber: number): Element | undefined => {
    return elements.find(element => element.atomicNumber === atomicNumber);
  };

  const handleCategoryClick = (category: string) => {
    if (selectedCategory === category) {
      setSelectedCategory(null);
    } else {
      setSelectedCategory(category);
    }
    setSearchQuery('');
  };

  const filteredElements = selectedCategory 
    ? elements.filter(element => element.category === selectedCategory)
    : [];

  const lowerCaseQuery = searchQuery.toLowerCase();
  const isSearching = lowerCaseQuery.length > 0;

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row items-center justify-between mb-4 gap-4">
        <h3 className="text-sm font-medium font-orbitron text-muted-foreground">Interactive Elements</h3>
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search element..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value)
              setSelectedCategory(null);
            }}
            className="pl-10 pr-10 bg-white/50 dark:bg-gray-800/50 border-gray-200/50 dark:border-gray-700/50"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              aria-label="Clear search"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-white/40 to-gray-50/20 dark:from-gray-800/40 dark:to-gray-900/20 backdrop-blur-sm">
        <ScrollArea className="h-auto w-full">
          <div className="relative p-6 flex justify-center">
            <div 
              className="periodic-table-grid" 
              style={{ 
                display: 'grid',
                gridTemplateColumns: 'repeat(18, 48px)',
                gridGap: '2px',
                justifyContent: 'center',
              }}
            >
              {periodicTableLayout.map((row, rowIndex) => (
                <div key={rowIndex} style={{ display: 'contents' }}>
                  {row.map((atomicNumber, colIndex) => {
                    const element = atomicNumber > 0 ? getElementByAtomicNumber(atomicNumber) : null;
                    
                    let isDimmed = false;
                    if (isSearching && element) {
                      const matchesQuery = 
                        element.name.toLowerCase().includes(lowerCaseQuery) ||
                        element.symbol.toLowerCase().includes(lowerCaseQuery) ||
                        element.atomicNumber.toString().includes(lowerCaseQuery);
                      isDimmed = !matchesQuery;
                    }

                    return (
                      <div 
                        key={`${rowIndex}-${colIndex}`} 
                        className={`
                          element-cell transition-all duration-300
                          ${atomicNumber > 0 ? '' : 'opacity-0 pointer-events-none'}
                        `}
                        style={{
                          width: '48px',
                          height: '48px'
                        }}
                      >
                        {element && (
                          <ElementCard
                            element={element}
                            onClick={() => onElementClick(element)}
                            size="xs"
                            isDimmed={isDimmed}
                            className="animate-fade-in backdrop-blur-sm border-0 shadow-sm hover:shadow-md"
                          />
                        )}
                      </div>
                    )
                  })}
                </div>
              ))}
            </div>
          </div>
        </ScrollArea>
      </div>
      
      {/* Legend - Clean design */}
      <div className="flex flex-wrap gap-2 justify-center p-4 bg-gradient-to-br from-white/30 to-gray-50/10 dark:from-gray-800/30 dark:to-gray-900/10 rounded-2xl backdrop-blur-sm">
        <div className="w-full text-center mb-2">
          <h4 className="text-sm font-medium font-orbitron text-muted-foreground">Element Categories</h4>
        </div>
        {Object.entries(categoryNames).map(([category, name]) => (
          <div 
            key={category} 
            className={`px-3 py-1.5 rounded-full text-xs flex items-center gap-2 
              bg-chemistry-${category} bg-opacity-20 dark:bg-opacity-30 
              border border-chemistry-${category}/30 hover:border-chemistry-${category}/50
              transition-all cursor-pointer hover:shadow-sm
              ${selectedCategory === category ? `ring-2 ring-chemistry-${category}/50 bg-opacity-30` : ''}
            `}
            onClick={() => handleCategoryClick(category)}
          >
            <div className={`w-2.5 h-2.5 rounded-full bg-chemistry-${category}`}></div>
            {name}
          </div>
        ))}
      </div>
      
      {/* Display filtered elements */}
      {selectedCategory && (
        <div className="p-4 bg-gradient-to-br from-white/30 to-gray-50/10 dark:from-gray-800/30 dark:to-gray-900/10 rounded-2xl backdrop-blur-sm animate-fade-in">
          <h4 className="text-sm font-medium mb-3 text-center">
            {categoryNames[selectedCategory as keyof typeof categoryNames]} Elements
          </h4>
          <div className="flex flex-wrap gap-2 justify-center">
            {filteredElements.map(element => (
              <ElementCard
                key={element.id}
                element={element}
                onClick={() => onElementClick(element)}
                size="md"
                className="animate-fade-in border-0 shadow-sm hover:shadow-md"
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
