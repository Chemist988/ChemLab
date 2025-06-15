
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
      style={{ filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.1))' }}
    >
      {/* Test Tube Glass */}
      <div className="relative w-16 h-40 mx-auto">
        {/* Glass reflection */}
        <div className="absolute top-4 left-3 w-1 h-24 bg-white/40 rounded-full blur-[1px] -rotate-6" />

        {/* Main tube body */}
        <div className="absolute bottom-0 w-full h-32 bg-gradient-to-r from-gray-200/30 via-white/20 to-gray-200/30 rounded-b-full border-2 border-gray-400/30 shadow-inner">
          {/* Liquid */}
          {element && (
            <div className="absolute bottom-0 w-full h-[70%] rounded-b-full overflow-hidden">
              <div
                className="w-full h-full relative"
                style={{
                  background: `linear-gradient(to top, ${getLiquidColor(element)}B3, ${getLiquidColor(element)}E6)`
                }}
              >
                {/* Meniscus (curved liquid surface) */}
                <div 
                  className="absolute top-0 left-0 w-full h-3"
                  style={{ 
                    borderRadius: '0 0 50% 50% / 0 0 100% 100%',
                    boxShadow: `0 2px 4px ${getLiquidColor(element)}99 inset`,
                    transform: 'translateY(-1px)'
                  }}
                />

                {/* Liquid surface highlight */}
                 <div 
                  className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-1.5 rounded-full"
                  style={{ 
                    background: `radial-gradient(ellipse, white, transparent 70%)`,
                    opacity: 0.5,
                  }}
                />

                {/* Bubbles */}
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-1.5 h-1.5 rounded-full animate-bubble-rise"
                    style={{
                      left: `${20 + Math.random() * 60}%`,
                      bottom: '5%',
                      background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.9), rgba(255,255,255,0.1))',
                      border: '1px solid rgba(255,255,255,0.2)',
                      animationDelay: `${Math.random() * 3}s`,
                      animationDuration: `${2 + Math.random() * 3}s`
                    }}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
        
        {/* Test tube lip */}
        <div className="absolute top-8 left-1/2 transform -translate-x-1/2 w-[110%] h-2.5 bg-gradient-to-b from-gray-300/70 via-white/40 to-gray-300/70 rounded-full border border-gray-400/50" />
        
        {/* Test tube neck */}
        <div className="absolute top-0 w-12 left-1/2 transform -translate-x-1/2 h-9 bg-gradient-to-r from-gray-200/30 via-white/10 to-gray-200/30 border-x-2 border-gray-400/30" />
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
