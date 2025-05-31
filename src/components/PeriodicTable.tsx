
import React, { useState } from 'react';
import ElementCard from './ElementCard';
import { Element, elements, periodicTableLayout, categoryNames } from '../data/elements';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Atom, Filter } from 'lucide-react';

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
    <div className="space-y-8">
      {/* Header Info */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
            <Atom className="w-5 h-5 text-blue-600" />
          </div>
          <span className="text-gray-600 font-medium">118 Elements Available</span>
        </div>
        <div className="text-sm text-gray-500">
          Click to select • Drag to test tubes
        </div>
      </div>

      {/* Main Periodic Table */}
      <div className="bg-gray-50 rounded-2xl border border-gray-200 overflow-hidden">
        <ScrollArea className="h-[420px] w-full">
          <div className="p-6">
            <div 
              className="periodic-table-grid mx-auto" 
              style={{ 
                display: 'grid',
                gridTemplateColumns: 'repeat(18, 36px)',
                gridGap: '3px',
                justifyContent: 'center',
                transform: 'scale(0.85)',
                transformOrigin: 'center top'
              }}
            >
              {periodicTableLayout.map((row, rowIndex) => (
                <React.Fragment key={rowIndex}>
                  {row.map((atomicNumber, colIndex) => (
                    <div 
                      key={`${rowIndex}-${colIndex}`} 
                      className="element-cell"
                      style={{ width: '36px', height: '36px' }}
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
                              transition-all duration-200 
                              ${hoveredElement === atomicNumber ? 'scale-150 z-50 shadow-xl' : 'hover:scale-125'}
                              ${selectedCategory && getElementByAtomicNumber(atomicNumber)?.category === selectedCategory ? 'ring-2 ring-blue-400' : ''}
                            `}
                          />
                          
                          {/* Hover tooltip */}
                          {hoveredElement === atomicNumber && (
                            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg whitespace-nowrap z-50">
                              {getElementByAtomicNumber(atomicNumber)?.name}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </React.Fragment>
              ))}
            </div>
            
            {/* Period labels */}
            <div className="absolute left-2 top-6 h-full flex flex-col justify-around" style={{ transform: 'scale(0.85)', transformOrigin: 'left top' }}>
              {[1, 2, 3, 4, 5, 6, 7, "", "", ""].map((period, index) => (
                <div key={`period-${index}`} className="text-xs font-medium text-gray-500 h-[36px] flex items-center">
                  {period && (
                    <div className="bg-gray-200 px-2 py-1 rounded text-center min-w-[24px] text-gray-700">
                      {period}
                    </div>
                  )}
                </div>
              ))}
            </div>
            
            {/* Group labels */}
            <div className="absolute top-2 left-6 w-full flex justify-around" style={{ transform: 'scale(0.85)', transformOrigin: 'left top', paddingLeft: '20px' }}>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18].map((group) => (
                <div key={`group-${group}`} className="text-xs font-medium text-gray-500 w-[36px] text-center">
                  <div className="bg-gray-200 px-1 py-1 rounded text-gray-700">
                    {group}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ScrollArea>
      </div>
      
      {/* Element Categories */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6">
        <div className="flex items-center space-x-3 mb-6">
          <Filter className="w-5 h-5 text-gray-600" />
          <h4 className="text-lg font-semibold text-gray-900">Element Categories</h4>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {Object.entries(categoryNames).map(([category, name]) => (
            <button 
              key={category} 
              onClick={() => handleCategoryClick(category)}
              className={`
                px-4 py-3 rounded-xl text-sm flex items-center space-x-3 transition-all duration-200
                ${selectedCategory === category 
                  ? 'bg-blue-100 border-blue-300 text-blue-800 shadow-sm' 
                  : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100'
                }
                border transform hover:scale-105
              `}
            >
              <div className={`w-3 h-3 rounded-full bg-chemistry-${category}`}></div>
              <span className="font-medium">{name}</span>
            </button>
          ))}
        </div>
      </div>
      
      {/* Filtered Elements Display */}
      {selectedCategory && (
        <div className="bg-white rounded-2xl border border-gray-200 p-6 animate-fade-in">
          <h4 className="text-lg font-semibold text-gray-900 mb-6">
            {categoryNames[selectedCategory as keyof typeof categoryNames]} Elements
          </h4>
          <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4 justify-items-center">
            {filteredElements.map(element => (
              <ElementCard
                key={element.id}
                element={element}
                onClick={() => onElementClick(element)}
                size="sm"
                className="transform hover:scale-110 transition-all duration-200 shadow-sm hover:shadow-lg"
              />
            ))}
            {filteredElements.length === 0 && (
              <p className="col-span-full text-center text-gray-500">No elements found in this category.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default PeriodicTable;
