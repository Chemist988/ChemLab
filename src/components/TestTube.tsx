
import React from 'react';
import { useDrag } from 'react-dnd';
import { Element } from '../data/elements';

interface TestTubeProps {
  element: Element | null;
  isEmpty?: boolean;
  className?: string;
}

const TestTube: React.FC<TestTubeProps> = ({ element, isEmpty = false, className = '' }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'test-tube',
    item: { element },
    canDrag: !!element,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  const getLiquidColor = (element: Element | null) => {
    if (!element) return 'transparent';
    
    switch (element.category) {
      case 'alkali-metal': return '#ef4444';
      case 'alkaline-earth-metal': return '#f97316';
      case 'transition-metal': return '#3b82f6';
      case 'nonmetal': return '#10b981';
      case 'halogen': return '#06b6d4';
      case 'noble-gas': return '#a855f7';
      default: return '#9ca3af';
    }
  };

  return (
    <div
      ref={element ? drag : undefined}
      className={`relative cursor-pointer transition-all duration-300 ${isDragging ? 'scale-110 rotate-3 opacity-80' : ''} ${className}`}
    >
      {/* Test Tube Glass */}
      <div className="relative w-16 h-32 mx-auto">
        {/* Main tube body */}
        <div className="absolute bottom-0 w-full h-24 bg-gradient-to-t from-gray-100 to-transparent rounded-b-full border-2 border-gray-300 shadow-lg">
          {/* Liquid */}
          {element && (
            <div 
              className="absolute bottom-0 w-full h-16 rounded-b-full transition-all duration-1000"
              style={{
                background: `linear-gradient(to top, ${getLiquidColor(element)}, ${getLiquidColor(element)}80)`
              }}
            >
              {/* Bubbles */}
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-1 h-1 bg-white/60 rounded-full animate-bounce"
                  style={{
                    left: `${30 + (i * 20)}%`,
                    bottom: `${Math.random() * 40 + 10}%`,
                    animationDelay: `${i * 0.5}s`,
                    animationDuration: '2s'
                  }}
                />
              ))}
            </div>
          )}
        </div>
        
        {/* Test tube neck */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-4 h-10 bg-gradient-to-t from-gray-100 to-gray-50 rounded-t-lg border-2 border-gray-300 shadow-md"></div>
        
        {/* Cork/Stopper */}
        <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-5 h-3 bg-amber-800 rounded-t-lg border border-amber-900"></div>
      </div>
      
      {/* Element Label */}
      {element && (
        <div className="text-center mt-2">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 px-2 py-1">
            <div className="text-sm font-bold text-gray-900">{element.symbol}</div>
            <div className="text-xs text-gray-600 truncate">{element.name}</div>
          </div>
        </div>
      )}
      
      {/* Empty state */}
      {isEmpty && !element && (
        <div className="text-center mt-2">
          <div className="text-xs text-gray-400">Empty</div>
        </div>
      )}
    </div>
  );
};

export default TestTube;
