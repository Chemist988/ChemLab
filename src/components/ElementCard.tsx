
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

  const getCategoryGradient = (category: string) => {
    const gradients = {
      'alkali-metal': 'from-red-400 to-red-600',
      'alkaline-earth-metal': 'from-orange-400 to-orange-600',
      'transition-metal': 'from-blue-400 to-blue-600',
      'post-transition-metal': 'from-purple-400 to-purple-600',
      'metalloid': 'from-green-400 to-green-600',
      'nonmetal': 'from-teal-400 to-teal-600',
      'halogen': 'from-cyan-400 to-cyan-600',
      'noble-gas': 'from-pink-400 to-pink-600',
      'lanthanide': 'from-yellow-400 to-yellow-600',
      'actinide': 'from-indigo-400 to-indigo-600',
    };
    return gradients[category as keyof typeof gradients] || 'from-gray-400 to-gray-600';
  };

  return (
    <div
      ref={isDraggable ? drag : undefined}
      className={cn(
        `relative overflow-hidden cursor-pointer transition-all duration-300 ease-out rounded-lg`,
        `bg-gradient-to-br ${getCategoryGradient(element.category)}`,
        `hover:shadow-xl hover:scale-110 hover:z-20 hover:-translate-y-1`,
        `border border-white/20 dark:border-white/10`,
        `${isDragging ? 'ring-2 ring-white/50 shadow-2xl scale-110 z-30' : ''}`,
        sizeClasses[size],
        className
      )}
      onClick={onClick}
      style={{ 
        opacity: isDragging ? 0.8 : 1,
      }}
    >
      {/* Glass effect overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-black/10 pointer-events-none" />
      
      {/* Top highlight */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent" />
      
      {/* Content */}
      <div className="relative z-10 h-full flex flex-col text-white">
        {/* Header with atomic number and group */}
        <div className="flex justify-between items-start px-1.5 pt-1 text-[0.65rem] font-medium opacity-90">
          <span className="font-mono">{element.atomicNumber}</span>
          <span className="font-mono opacity-70">{element.group || ""}</span>
        </div>
        
        {/* Main content */}
        <div className="flex-1 flex flex-col items-center justify-center text-center px-1">
          <div className="font-bold text-lg leading-none mb-0.5 drop-shadow-sm">
            {element.symbol}
          </div>
          <div className="text-[0.6rem] opacity-90 leading-tight max-w-full truncate px-0.5">
            {element.name}
          </div>
        </div>
        
        {/* Footer with atomic mass */}
        <div className="text-[0.55rem] text-center pb-1 opacity-80 font-medium">
          {element.atomicMass.toFixed(1)}
        </div>
      </div>
      
      {/* Subtle inner glow */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-white/5 pointer-events-none" />
    </div>
  );
};

export default ElementCard;
