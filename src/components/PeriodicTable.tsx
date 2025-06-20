
import React, { useState } from 'react';
import ElementCard from './ElementCard';
import { Element, elements, periodicTableLayout, categoryNames } from '../data/elements';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import { Atom, Search, X } from 'lucide-react';

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
    setSearchQuery(''); // Reset search when a category is clicked
  };

  const filteredElements = selectedCategory 
    ? elements.filter(element => element.category === selectedCategory)
    : [];

  const lowerCaseQuery = searchQuery.toLowerCase();
  const isSearching = lowerCaseQuery.length > 0;

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row items-center justify-between mb-4 gap-4">
        <h3 className="text-md font-semibold font-orbitron">Interactive Periodic Table</h3>
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search element (e.g., Iron)"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value)
              setSelectedCategory(null); // Reset category filter when searching
            }}
            className="pl-10 pr-10 bg-background/50"
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

      <div className="relative rounded-xl overflow-hidden border shadow-md bg-gradient-to-br from-card to-background/80">
        <ScrollArea className="h-auto w-full">
          <div className="relative p-4 flex justify-center">
            <div 
              className="periodic-table-grid" 
              style={{ 
                display: 'grid',
                gridTemplateColumns: 'repeat(18, 50px)',
                gridGap: '3px',
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
                          width: '50px',
                          height: '50px'
                        }}
                      >
                        {element && (
                          <ElementCard
                            element={element}
                            onClick={() => onElementClick(element)}
                            size="xs"
                            isDimmed={isDimmed}
                            className="animate-fade-in backdrop-blur-sm"
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
        
        {/* Atom icon watermark */}
        <div className="absolute bottom-2 right-2 opacity-5 pointer-events-none">
          <Atom className="h-20 w-20" />
        </div>
      </div>
      
      {/* Legend - Always show the categories */}
      <div className="mt-4 flex flex-wrap gap-2 justify-center p-4 bg-gradient-to-br from-card/70 to-card/30 rounded-xl shadow-sm border border-white/10 backdrop-blur-sm">
        <div className="w-full text-center mb-1">
          <h4 className="text-sm font-medium font-orbitron">Element Categories</h4>
        </div>
        {Object.entries(categoryNames).map(([category, name]) => (
          <div 
            key={category} 
            className={`px-3 py-1.5 rounded-full text-xs flex items-center gap-2 
              bg-chemistry-${category} bg-opacity-30 dark:bg-opacity-50 
              border border-chemistry-${category}/20 shadow-sm hover:shadow-md 
              transition-all cursor-pointer hover:ring-2 hover:ring-primary/50
              ${selectedCategory === category ? `ring-2 ring-primary neon-glow-${category}` : ''}
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
