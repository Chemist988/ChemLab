
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
        `bg-zinc-900 rounded-lg overflow-hidden cursor-pointer`,
        `transition-all duration-200 ease-out relative border-2`,
        `border-chemistry-${element.category}`,
        `hover:shadow-lg hover:scale-105 hover:shadow-primary/20`,
        `${isDragging ? 'ring-2 ring-primary shadow-xl scale-110 rotate-2 opacity-80' : ''}`,
        sizeClasses[size],
        className
      )}
      onClick={onClick}
      style={{ 
        opacity: isDragging ? 0.8 : 1,
      }}
    >
      <div className="h-full p-1.5 flex flex-col text-white relative">
        {/* Glass effect overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/20 pointer-events-none rounded-lg" />
        
        {/* Top Row - Atomic Number */}
        <div className="flex justify-between items-start text-[0.45rem] font-bold opacity-90 relative z-10">
          <span className="bg-black/40 px-1 rounded text-center min-w-[12px]">{element.atomicNumber}</span>
          {element.group && <span className="bg-black/40 px-1 rounded">{element.group}</span>}
        </div>
        
        {/* Center - Symbol and Name */}
        <div className="flex-1 flex flex-col items-center justify-center text-center relative z-10">
          <span className="font-black text-base leading-none mb-1 drop-shadow-sm">{element.symbol}</span>
          <span className="text-[0.45rem] font-medium text-zinc-300 px-0.5 truncate max-w-full leading-tight">
            {element.name}
          </span>
        </div>
        
        {/* Bottom - Atomic Mass */}
        <div className="text-[0.4rem] text-center font-medium opacity-80 relative z-10 bg-black/40 rounded px-1">
          {element.atomicMass.toFixed(1)}
        </div>
        
        {/* Subtle highlight */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      </div>
    </div>
  );
};

export default ElementCard;
