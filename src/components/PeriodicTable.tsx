
import React, { useState, useEffect, useRef } from 'react';
import ElementCard from './ElementCard';
import { Element, elements, periodicTableLayout, categoryNames } from '../data/elements';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import { Atom, Search, X, Sparkles, Zap } from 'lucide-react';

interface PeriodicTableProps {
  onElementClick: (element: Element) => void;
}

const PeriodicTable: React.FC<PeriodicTableProps> = ({ onElementClick }) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
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
    setSearchQuery(''); // Reset search when a category is clicked
  };

  // Enhanced search functionality
  const filterElements = (query: string): Element[] => {
    if (!query.trim()) return [];
    
    const lowerQuery = query.toLowerCase().trim();
    return elements.filter(element => 
      element.name.toLowerCase().includes(lowerQuery) ||
      element.symbol.toLowerCase().includes(lowerQuery) ||
      element.atomicNumber.toString().includes(lowerQuery) ||
      element.category.toLowerCase().includes(lowerQuery)
    );
  };

  const filteredElements = selectedCategory 
    ? elements.filter(element => element.category === selectedCategory)
    : [];

  const searchResults = searchQuery.trim() ? filterElements(searchQuery) : [];
  const isSearching = searchQuery.trim().length > 0;

  // Intersection Observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
          }
        });
      },
      { threshold: 0.1 }
    );

    const sections = document.querySelectorAll('.section-transition');
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="space-y-6">
      {/* Enhanced Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between mb-6 gap-4 section-transition">
        <div className="flex items-center gap-3">
          <div className="relative">
            <Atom className="h-8 w-8 text-green-400 animate-spin" style={{ animationDuration: '10s' }} />
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full flex items-center justify-center animate-pulse">
              <Sparkles className="w-2 h-2 text-black" />
            </div>
          </div>
          <h3 className="text-2xl font-bold font-orbitron text-glow-primary">Interactive Periodic Table</h3>
        </div>
        
        <div className={cn(
          "relative w-full sm:w-80 transition-all duration-500",
          isSearchFocused && "scale-105"
        )}>
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-green-400" />
          <Input 
            placeholder="Search elements (H, Hydrogen, 1, metal...)"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setIsSearchFocused(true)}
            onBlur={() => setIsSearchFocused(false)}
            className="pl-12 pr-12 h-12 bg-black/50 border-2 border-green-400/50 rounded-2xl text-green-100 placeholder:text-green-400/60 focus:border-green-400 focus:ring-4 focus:ring-green-400/20 ios-liquid-glass transition-all duration-300"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-green-400 hover:text-green-300 transition-colors"
              aria-label="Clear search"
            >
              <X className="h-5 w-5" />
            </button>
          )}
          
          {/* Search Results Dropdown */}
          {isSearching && searchResults.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-2 max-h-60 overflow-y-auto ios-liquid-glass rounded-2xl border-2 border-green-400/30 z-50">
              <div className="p-2 space-y-1">
                {searchResults.slice(0, 10).map(element => (
                  <div
                    key={element.id}
                    onClick={() => {
                      onElementClick(element);
                      setSearchQuery('');
                    }}
                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-green-500/20 cursor-pointer transition-all duration-200 hover:scale-102"
                  >
                    <div className={`w-8 h-8 rounded-lg bg-chemistry-${element.category} flex items-center justify-center text-xs font-bold`}>
                      {element.symbol}
                    </div>
                    <div>
                      <div className="font-medium text-green-100">{element.name}</div>
                      <div className="text-xs text-green-400/80">#{element.atomicNumber} • {element.atomicMass.toFixed(2)} u</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Main Table Container */}
      <div className="relative rounded-3xl overflow-hidden border-2 border-green-400/30 shadow-2xl lab-container-enhanced section-transition">
        <ScrollArea className="h-auto w-full">
          <div className="relative p-6 flex justify-center">
            <div 
              ref={tableRef}
              className="periodic-table-grid" 
              style={{ 
                display: 'grid',
                gridTemplateColumns: 'repeat(18, 52px)',
                gridGap: '4px',
                justifyContent: 'center',
              }}
            >
              {periodicTableLayout.map((row, rowIndex) => (
                <div key={rowIndex} style={{ display: 'contents' }}>
                  {row.map((atomicNumber, colIndex) => {
                    const element = atomicNumber > 0 ? getElementByAtomicNumber(atomicNumber) : null;
                    
                    let isDimmed = false;
                    if (isSearching && element) {
                      const matchesQuery = searchResults.some(result => result.id === element.id);
                      isDimmed = !matchesQuery;
                    }

                    return (
                      <div 
                        key={`${rowIndex}-${colIndex}`} 
                        className={`
                          element-cell transition-all duration-500
                          ${atomicNumber > 0 ? '' : 'opacity-0 pointer-events-none'}
                        `}
                        style={{
                          width: '52px',
                          height: '52px'
                        }}
                      >
                        {element && (
                          <ElementCard
                            element={element}
                            onClick={() => onElementClick(element)}
                            size="xs"
                            isDimmed={isDimmed}
                            className="animate-fade-in backdrop-blur-sm hover:z-40"
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
        
        {/* Enhanced Atom Watermark */}
        <div className="absolute bottom-4 right-4 opacity-10 pointer-events-none">
          <div className="relative">
            <Atom className="h-24 w-24 animate-spin text-green-400" style={{ animationDuration: '20s' }} />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <Zap className="h-6 w-6 text-yellow-400 animate-pulse" />
            </div>
          </div>
        </div>
      </div>
      
      {/* Enhanced Legend */}
      <div className="section-transition ios-liquid-glass rounded-3xl shadow-2xl border-2 border-green-400/30 p-6">
        <div className="text-center mb-4">
          <h4 className="text-xl font-bold font-orbitron text-glow-primary">Element Categories</h4>
          <p className="text-green-300/80 text-sm">Click to filter by category</p>
        </div>
        
        <div className="flex flex-wrap gap-3 justify-center">
          {Object.entries(categoryNames).map(([category, name]) => (
            <div 
              key={category} 
              className={cn(
                `px-4 py-2 rounded-full text-sm flex items-center gap-3 cursor-pointer transition-all duration-300`,
                `bg-chemistry-${category} bg-opacity-40 border-2 border-chemistry-${category}/30 shadow-lg`,
                `hover:shadow-2xl hover:scale-105 hover:bg-opacity-60 element-card-enhanced`,
                selectedCategory === category && `ring-4 ring-primary/60 neon-glow-${category} scale-105`
              )}
              onClick={() => handleCategoryClick(category)}
            >
              <div className={`w-4 h-4 rounded-full bg-chemistry-${category} shadow-inner`}></div>
              <span className="font-medium text-white">{name}</span>
            </div>
          ))}
        </div>
      </div>
      
      {/* Display filtered elements when category is selected */}
      {selectedCategory && (
        <div className="section-transition ios-liquid-glass rounded-3xl shadow-2xl border-2 border-green-400/30 p-6 animate-fade-in">
          <div className="flex items-center gap-3 mb-4">
            <div className={`w-6 h-6 rounded-full bg-chemistry-${selectedCategory}`}></div>
            <h4 className="text-xl font-bold text-glow-primary">
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
                className="animate-fade-in hover:scale-110 transition-all duration-300"
              />
            ))}
            {filteredElements.length === 0 && (
              <p className="text-green-400/80 text-center py-8">No elements found in this category.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default PeriodicTable;
