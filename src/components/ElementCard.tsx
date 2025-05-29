
import React from 'react';
import { Element, categoryColors } from '../data/elements';
import { useDrag } from 'react-dnd';
import { cn } from '@/lib/utils';

interface ElementCardProps {
  element: Element;
  onClick: () => void;
  size?: 'sm' | 'md' | 'lg' | 'xs';
  isDraggable?: boolean;
  className?: string;
}

const ElementCard: React.FC<ElementCardProps> = ({ 
  element, 
  onClick, 
  size = 'md',
  isDraggable = true,
  className = ''
}) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'element',
    item: { element },
    canDrag: isDraggable,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  const sizeClasses = {
    xs: 'w-[32px] h-[32px] text-[0.6rem]',
    sm: 'w-[48px] h-[48px] text-[0.7rem]',
    md: 'w-[56px] h-[56px] text-xs',
    lg: 'w-[72px] h-[72px] text-sm',
  };

  return (
    <div
      ref={isDraggable ? drag : undefined}
      className={cn(
        `bg-chemistry-${element.category} rounded-xl overflow-hidden cursor-pointer`,
        `transition-all duration-300 ease-out`,
        `hover:shadow-xl hover:scale-110 relative`,
        `border border-white/20`,
        `${isDragging ? 'ring-2 ring-cyan-400 shadow-2xl scale-110 rotate-3 opacity-80' : ''}`,
        sizeClasses[size],
        className
      )}
      onClick={onClick}
      style={{ 
        opacity: isDragging ? 0.8 : 1,
      }}
    >
      <div className="h-full p-1 flex flex-col text-white relative overflow-hidden">
        {/* Glassmorphism Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-black/20 pointer-events-none" />
        
        {/* Animated Border Glow */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 animate-pulse" />
        
        {/* Top Row */}
        <div className="flex justify-between items-start text-[0.5rem] font-bold opacity-90 relative z-10">
          <span className="bg-black/20 px-1 rounded">{element.atomicNumber}</span>
          <span className="bg-black/20 px-1 rounded">{element.group || ""}</span>
        </div>
        
        {/* Center - Symbol and Name */}
        <div className="flex-1 flex flex-col items-center justify-center text-center relative z-10">
          <span className="font-black text-lg leading-none mb-0.5 drop-shadow-lg">{element.symbol}</span>
          <span className="text-[0.5rem] font-semibold opacity-90 px-0.5 truncate max-w-full leading-tight drop-shadow">
            {element.name}
          </span>
        </div>
        
        {/* Bottom - Atomic Mass */}
        <div className="text-[0.45rem] text-center font-bold opacity-80 relative z-10 bg-black/20 rounded px-1">
          {element.atomicMass.toFixed(1)}
        </div>
        
        {/* Shine Effect */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/60 to-transparent" />
        <div className="absolute top-0 left-0 bottom-0 w-px bg-gradient-to-b from-white/40 via-transparent to-transparent" />
      </div>
    </div>
  );
};

export default ElementCard;
