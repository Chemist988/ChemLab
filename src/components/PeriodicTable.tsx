
import React, { useState, useEffect, useRef } from 'react';
import ElementCard from './ElementCard';
import { Element, elements, periodicTableLayout, categoryNames } from '../data/elements';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import { Atom, Search, X, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PeriodicTableProps {
  onElementClick: (element: Element) => void;
}

const PeriodicTable: React.FC<PeriodicTableProps> = ({ onElementClick }) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [highlightedElements, setHighlightedElements] = useState<number[]>([]);
  const tableRef = useRef<HTMLDivElement>(null);

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
    setHighlightedElements([]);
  };

  // Enhanced search functionality
  const filterElements = (query: string): Element[] => {
    if (!query.trim()) {
      setHighlightedElements([]);
      return [];
    }
    
    const lowerQuery = query.toLowerCase().trim();
    const filtered = elements.filter(element => 
      element.name.toLowerCase().includes(lowerQuery) ||
      element.symbol.toLowerCase().includes(lowerQuery) ||
      element.atomicNumber.toString().includes(lowerQuery) ||
      element.category.toLowerCase().includes(lowerQuery)
    );
    
    // Update highlighted elements
    setHighlightedElements(filtered.map(el => el.atomicNumber));
    
    return filtered;
  };

  const filteredElements = selectedCategory 
    ? elements.filter(element => element.category === selectedCategory)
    : [];

  const searchResults = searchQuery.trim() ? filterElements(searchQuery) : [];
  const isSearching = searchQuery.trim().length > 0;

  // Clear highlights when search is cleared
  React.useEffect(() => {
    if (!searchQuery.trim()) {
      setHighlightedElements([]);
    }
  }, [searchQuery]);

  const clearSearch = () => {
    setSearchQuery('');
    setHighlightedElements([]);
    setSelectedCategory(null);
  };

  return (
    <div className="space-y-6">
      {/* Enhanced Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between mb-6 gap-4">
        <div className="flex items-center gap-3">
          <div className="relative">
            <Atom className="h-8 w-8 text-primary" />
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full flex items-center justify-center">
              <Sparkles className="w-2 h-2 text-black" />
            </div>
          </div>
          <h3 className="text-2xl font-bold font-orbitron text-primary">Interactive Periodic Table</h3>
        </div>
        
        <div className={cn(
          "relative w-full sm:w-80 transition-all duration-300",
          isSearchFocused && "scale-105"
        )}>
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-primary" />
          <Input 
            placeholder="Search elements (H, Hydrogen, 1, metal...)"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setIsSearchFocused(true)}
            onBlur={() => setIsSearchFocused(false)}
            className="pl-12 pr-12 h-12 glass-morphism border-2 border-primary/30 rounded-2xl focus:border-primary focus:ring-4 focus:ring-primary/20 transition-all duration-300"
          />
          {searchQuery && (
            <button
              onClick={clearSearch}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-primary hover:text-primary/80 transition-colors"
              aria-label="Clear search"
            >
              <X className="h-5 w-5" />
            </button>
          )}
          
          {/* Search Results Dropdown */}
          {isSearching && searchResults.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-2 max-h-60 overflow-y-auto glass-morphism rounded-2xl border-2 border-primary/30 z-50 backdrop-blur-xl">
              <div className="p-2 space-y-1">
                {searchResults.slice(0, 10).map(element => (
                  <div
                    key={element.id}
                    onClick={() => {
                      onElementClick(element);
                      setSearchQuery('');
                      setHighlightedElements([]);
                    }}
                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-primary/20 cursor-pointer transition-all duration-200"
                  >
                    <div className={`w-8 h-8 rounded-lg bg-chemistry-${element.category} flex items-center justify-center text-xs font-bold`}>
                      {element.symbol}
                    </div>
                    <div>
                      <div className="font-medium">{element.name}</div>
                      <div className="text-xs text-muted-foreground">#{element.atomicNumber} • {element.atomicMass.toFixed(2)} u</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Main Table Container */}
      <div className="relative rounded-3xl overflow-hidden border-2 border-primary/30 shadow-2xl glass-morphism">
        <div className="relative p-6 flex justify-center">
          <div 
            ref={tableRef}
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
                  let isHighlighted = false;
                  
                  if (isSearching && element) {
                    const matchesQuery = searchResults.some(result => result.id === element.id);
                    isDimmed = !matchesQuery;
                    isHighlighted = highlightedElements.includes(element.atomicNumber);
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
                          size="sm"
                          isDimmed={isDimmed}
                          className={cn(
                            "backdrop-blur-sm hover:z-40",
                            isHighlighted && "ring-4 ring-yellow-400 shadow-2xl shadow-yellow-400/50 scale-110 z-50"
                          )}
                        />
                      )}
                    </div>
                  )
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Legend */}
      <div className="glass-morphism rounded-3xl shadow-2xl border-2 border-primary/30 p-6">
        <div className="text-center mb-4">
          <h4 className="text-xl font-bold font-orbitron text-primary">Element Categories</h4>
          <p className="text-muted-foreground text-sm">Click to filter by category</p>
        </div>
        
        <div className="flex flex-wrap gap-3 justify-center">
          {Object.entries(categoryNames).map(([category, name]) => (
            <div 
              key={category} 
              className={cn(
                `px-4 py-2 rounded-full text-sm flex items-center gap-3 cursor-pointer transition-all duration-300`,
                `bg-chemistry-${category} border-2 border-chemistry-${category}/30 shadow-lg`,
                `hover:shadow-2xl hover:scale-105`,
                selectedCategory === category && `ring-4 ring-primary/60 scale-105`
              )}
              onClick={() => handleCategoryClick(category)}
            >
              <div className={`w-4 h-4 rounded-full bg-chemistry-${category}`}></div>
              <span className="font-medium">{name}</span>
            </div>
          ))}
        </div>
      </div>
      
      {/* Display filtered elements when category is selected */}
      {selectedCategory && (
        <div className="glass-morphism rounded-3xl shadow-2xl border-2 border-primary/30 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className={`w-6 h-6 rounded-full bg-chemistry-${selectedCategory}`}></div>
            <h4 className="text-xl font-bold text-primary">
              {categoryNames[selectedCategory as keyof typeof categoryNames]} Elements
            </h4>
          </div>
          
          <div className="flex flex-wrap gap-3 justify-center">
            {filteredElements.map(element => (
              <ElementCard
                key={element.id}
                element={element}
                onClick={() => onElementClick(element)}
                size="md"
                className="hover:scale-110 transition-all duration-300"
              />
            ))}
            {filteredElements.length === 0 && (
              <p className="text-muted-foreground text-center py-8">No elements found in this category.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default PeriodicTable;
