
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
    xs: 'w-[36px] h-[36px] text-[0.6rem]',
    sm: 'w-[54px] h-[54px] text-[0.7rem]',
    md: 'w-[64px] h-[64px] text-xs',
    lg: 'w-[80px] h-[80px] text-sm',
  };

  return (
    <div
      ref={isDraggable ? drag : undefined}
      className={cn(
        `bg-chemistry-${element.category} rounded-2xl overflow-hidden cursor-pointer`,
        `transition-all duration-300 ease-out`,
        `hover:shadow-2xl hover:scale-110 hover:z-20`,
        `border border-white/20 dark:border-black/20`,
        `backdrop-blur-xl`,
        `${isDragging ? 'ring-2 ring-blue-500/50 shadow-2xl scale-110 rotate-3' : ''}`,
        sizeClasses[size],
        className
      )}
      onClick={onClick}
      style={{ 
        opacity: isDragging ? 0.8 : 1,
      }}
    >
      <div className="h-full p-1.5 flex flex-col text-white relative overflow-hidden">
        {/* Apple-style glass overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-black/10 pointer-events-none" />
        
        {/* Top row - atomic number and group */}
        <div className="flex justify-between items-start text-[0.6rem] font-medium opacity-90 relative z-10">
          <span>{element.atomicNumber}</span>
          <span>{element.group || ""}</span>
        </div>
        
        {/* Center - symbol and name */}
        <div className="flex-1 flex flex-col items-center justify-center text-center relative z-10">
          <span className="font-bold text-lg leading-none mb-0.5">{element.symbol}</span>
          <span className="text-[0.6rem] font-medium opacity-90 px-0.5 truncate max-w-full leading-tight">
            {element.name}
          </span>
        </div>
        
        {/* Bottom - atomic mass */}
        <div className="text-[0.55rem] text-center font-medium opacity-80 relative z-10">
          {element.atomicMass.toFixed(1)}
        </div>
        
        {/* Apple-style highlight effect */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
      </div>
    </div>
  );
};

export default ElementCard;
