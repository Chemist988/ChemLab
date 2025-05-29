
import React, { useState } from 'react';
import ElementCard from './ElementCard';
import { Element, elements, periodicTableLayout, categoryNames } from '../data/elements';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Atom, Sparkles } from 'lucide-react';

interface PeriodicTableProps {
  onElementClick: (element: Element) => void;
}

const PeriodicTable: React.FC<PeriodicTableProps> = ({ onElementClick }) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [hoveredElement, setHoveredElement] = useState<number | null>(null);

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
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Sparkles className="w-5 h-5 text-cyan-400 animate-pulse" />
          <span className="text-white/80 text-sm font-medium">118 Elements Ready for Mixing</span>
        </div>
      </div>

      {/* Main Periodic Table */}
      <div className="relative bg-black/20 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10">
        <ScrollArea className="h-[500px] w-full">
          <div className="relative p-6">
            
            {/* Periodic Table Grid */}
            <div 
              className="periodic-table-grid mx-auto" 
              style={{ 
                display: 'grid',
                gridTemplateColumns: 'repeat(18, 38px)',
                gridGap: '2px',
                justifyContent: 'center',
                transform: 'scale(0.75)',
                transformOrigin: 'center top'
              }}
            >
              {periodicTableLayout.map((row, rowIndex) => (
                <React.Fragment key={rowIndex}>
                  {row.map((atomicNumber, colIndex) => (
                    <div 
                      key={`${rowIndex}-${colIndex}`} 
                      className="element-cell"
                      style={{ width: '38px', height: '38px' }}
                    >
                      {atomicNumber > 0 && getElementByAtomicNumber(atomicNumber) && (
                        <div
                          onMouseEnter={() => setHoveredElement(atomicNumber)}
                          onMouseLeave={() => setHoveredElement(null)}
                          className="relative"
                        >
                          <ElementCard
                            element={getElementByAtomicNumber(atomicNumber)!}
                            onClick={() => onElementClick(getElementByAtomicNumber(atomicNumber)!)}
                            size="xs"
                            className={`
                              transition-all duration-300 
                              ${hoveredElement === atomicNumber ? 'scale-150 z-50 shadow-2xl' : 'hover:scale-125'}
                              ${selectedCategory && getElementByAtomicNumber(atomicNumber)?.category === selectedCategory ? 'ring-2 ring-cyan-400' : ''}
                            `}
                          />
                          
                          {/* Hover Glow Effect */}
                          {hoveredElement === atomicNumber && (
                            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/30 to-purple-400/30 rounded-xl blur-sm -z-10 animate-pulse"></div>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </React.Fragment>
              ))}
            </div>
            
            {/* Period Labels */}
            <div className="absolute left-2 top-6 h-full flex flex-col justify-around" style={{ transform: 'scale(0.75)', transformOrigin: 'left top' }}>
              {[1, 2, 3, 4, 5, 6, 7, "", "", ""].map((period, index) => (
                <div key={`period-${index}`} className="text-xs font-medium text-white/60 h-[38px] flex items-center">
                  {period && (
                    <div className="bg-white/10 px-2 py-1 rounded text-center min-w-[20px]">
                      {period}
                    </div>
                  )}
                </div>
              ))}
            </div>
            
            {/* Group Labels */}
            <div className="absolute top-2 left-6 w-full flex justify-around" style={{ transform: 'scale(0.75)', transformOrigin: 'left top', paddingLeft: '20px' }}>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18].map((group) => (
                <div key={`group-${group}`} className="text-xs font-medium text-white/60 w-[38px] text-center">
                  <div className="bg-white/10 px-1 py-1 rounded">
                    {group}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ScrollArea>
        
        {/* Floating Atom Icon */}
        <div className="absolute bottom-4 right-4 opacity-20 pointer-events-none">
          <Atom className="h-12 w-12 text-cyan-400 animate-spin" style={{ animationDuration: '8s' }} />
        </div>
      </div>
      
      {/* Interactive Legend */}
      <div className="bg-black/20 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
        <div className="text-center mb-4">
          <h4 className="text-lg font-bold text-white mb-2">Element Categories</h4>
          <p className="text-white/60 text-sm">Click to filter • Drag elements to react</p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {Object.entries(categoryNames).map(([category, name]) => (
            <div 
              key={category} 
              className={`
                group px-4 py-3 rounded-xl text-sm flex items-center space-x-3 
                bg-chemistry-${category}/20 hover:bg-chemistry-${category}/30 
                border border-chemistry-${category}/30 hover:border-chemistry-${category}/50 
                transition-all duration-300 cursor-pointer transform hover:scale-105
                ${selectedCategory === category ? 'ring-2 ring-cyan-400 bg-chemistry-' + category + '/40' : ''}
              `}
              onClick={() => handleCategoryClick(category)}
            >
              <div className={`w-3 h-3 rounded-full bg-chemistry-${category} group-hover:animate-pulse`}></div>
              <span className="text-white font-medium">{name}</span>
            </div>
          ))}
        </div>
      </div>
      
      {/* Filtered Elements Display */}
      {selectedCategory && (
        <div className="bg-black/20 backdrop-blur-sm rounded-2xl p-6 border border-white/10 animate-fade-in">
          <h4 className="text-lg font-bold text-white mb-4 flex items-center space-x-2">
            <Sparkles className="w-5 h-5 text-cyan-400" />
            <span>{categoryNames[selectedCategory as keyof typeof categoryNames]} Elements</span>
          </h4>
          <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4 justify-items-center">
            {filteredElements.map(element => (
              <ElementCard
                key={element.id}
                element={element}
                onClick={() => onElementClick(element)}
                size="sm"
                className="transform hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-cyan-400/25"
              />
            ))}
            {filteredElements.length === 0 && (
              <p className="col-span-full text-center text-white/60">No elements found in this category.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default PeriodicTable;
