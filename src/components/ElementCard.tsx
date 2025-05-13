
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
        `bg-${categoryColors[element.category]} rounded-md p-1 cursor-pointer transition-all`,
        sizeClasses[size],
        isDragging && 'opacity-50',
        !isDraggable && 'cursor-default'
      )}
      onClick={onClick}
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      <div className="flex justify-between items-start">
        <span className="font-mono text-xs">{element.atomicNumber}</span>
      </div>
      <div className="flex flex-col items-center justify-center h-2/3">
        <span className="font-bold">{element.symbol}</span>
        <span className="text-xs truncate w-full text-center">
          {element.name}
        </span>
      </div>
    </div>
  );
};

export default ElementCard;
