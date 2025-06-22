
import React from 'react';
import { Element } from '../data/elements';
import { useDrag } from 'react-dnd';
import { cn } from '@/lib/utils';

interface ElementCardProps {
  element: Element;
  onClick: () => void;
  size?: 'sm' | 'md' | 'lg' | 'xs';
  isDraggable?: boolean;
  isDimmed?: boolean;
  className?: string;
}

const ElementCard: React.FC<ElementCardProps> = ({ 
  element, 
  onClick, 
  size = 'md',
  isDraggable = true,
  isDimmed = false,
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
    xs: 'w-[48px] h-[48px] text-[0.6rem]',
    sm: 'w-[68px] h-[68px] text-[0.7rem]',
    md: 'w-[80px] h-[80px] text-xs',
    lg: 'w-[100px] h-[100px] text-sm',
  };

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      'alkali-metal': 'from-red-400 to-red-600',
      'alkaline-earth-metal': 'from-blue-400 to-blue-600',
      'transition-metal': 'from-green-400 to-green-600',
      'post-transition-metal': 'from-pink-400 to-pink-600',
      'metalloid': 'from-gray-400 to-gray-600',
      'nonmetal': 'from-slate-200 to-slate-400',
      'halogen': 'from-orange-400 to-orange-600',
      'noble-gas': 'from-purple-400 to-purple-600',
      'lanthanide': 'from-indigo-400 to-indigo-600',
      'actinide': 'from-violet-400 to-violet-600',
      'unknown': 'from-gray-300 to-gray-500',
    };
    return colors[category] || 'from-gray-300 to-gray-500';
  };

  return (
    <div
      ref={isDraggable ? drag : undefined}
      className={cn(
        `bg-gradient-to-br ${getCategoryColor(element.category)} rounded-xl cursor-pointer transition-all duration-300`,
        `backdrop-blur-sm border border-white/30 shadow-lg`,
        `hover:shadow-xl hover:scale-105 hover:z-10`,
        `transform-gpu`,
        `${isDragging ? 'ring-2 ring-primary/50 shadow-2xl scale-110' : ''}`,
        isDimmed && 'opacity-30 saturate-0 pointer-events-none',
        sizeClasses[size],
        className
      )}
      onClick={onClick}
      style={{ 
        opacity: isDragging ? 0.7 : 1,
      }}
    >
      <div className="flex justify-between items-start px-2 pt-1">
        <span className="font-mono text-[0.6rem] opacity-90 text-white font-bold">{element.atomicNumber}</span>
        <span className="font-mono text-[0.6rem] opacity-80 text-white">{element.group || ""}</span>
      </div>
      <div className="flex flex-col items-center justify-center text-center h-[60%] -mt-1">
        <span className="font-bold text-lg leading-none text-white drop-shadow-lg">{element.symbol}</span>
      </div>
      <div className="text-[0.55rem] text-center opacity-90 text-white font-medium px-1">
        {element.name.length > 10 ? element.name.substring(0, 8) + '...' : element.name}
      </div>
    </div>
  );
};

export default ElementCard;
