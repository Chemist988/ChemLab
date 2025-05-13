
import React from 'react';
import { Element, categoryColors } from '../data/elements';
import { useDrag } from 'react-dnd';
import { cn } from '@/lib/utils';

interface ElementCardProps {
  element: Element;
  onClick: () => void;
  size?: 'sm' | 'md' | 'lg';
  isDraggable?: boolean;
}

const ElementCard: React.FC<ElementCardProps> = ({ 
  element, 
  onClick, 
  size = 'md',
  isDraggable = true
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
    sm: 'w-12 h-12 text-xs',
    md: 'w-16 h-16 text-sm',
    lg: 'w-20 h-20 text-base',
  };

  return (
    <div
      ref={isDraggable ? drag : undefined}
      className={cn(
        `bg-chemistry-${element.category} rounded-md shadow-sm overflow-hidden cursor-pointer transition-all`,
        `border border-white/20 dark:border-black/20`,
        `hover:shadow-md hover:scale-105`,
        sizeClasses[size],
        isDragging && 'opacity-50 shadow-lg',
        !isDraggable && 'cursor-default'
      )}
      onClick={onClick}
      style={{ 
        opacity: isDragging ? 0.5 : 1,
        backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.1) 0%, rgba(0,0,0,0.05) 100%)` 
      }}
    >
      <div className="flex justify-between items-start px-1 pt-1">
        <span className="font-mono text-xs opacity-80">{element.atomicNumber}</span>
      </div>
      <div className="flex flex-col items-center justify-center h-2/3 -mt-1">
        <span className="font-bold">{element.symbol}</span>
        <span className="text-xs truncate w-full text-center opacity-90">
          {element.name}
        </span>
      </div>
    </div>
  );
};

export default ElementCard;
