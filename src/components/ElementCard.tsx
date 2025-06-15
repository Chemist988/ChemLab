
import React from 'react';
import { Element } from '../data/elements';
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
    xs: 'w-10 h-10 text-[0.6rem] p-0.5',
    sm: 'w-14 h-14 text-[0.7rem] p-1',
    md: 'w-16 h-16 text-xs p-1',
    lg: 'w-20 h-20 text-sm p-2',
  };

  return (
    <div
      ref={isDraggable ? drag : undefined}
      className={cn(
        `rounded-lg overflow-hidden cursor-pointer transition-all duration-300 relative group`,
        `bg-card/50 backdrop-blur-sm`,
        `hover:bg-card/80 hover:scale-105 hover:z-20`,
        `${isDragging ? 'ring-2 ring-primary/50 shadow-lg scale-110' : ''}`,
        sizeClasses[size],
        className
      )}
      onClick={onClick}
      style={{ opacity: isDragging ? 0.7 : 1 }}
    >
      <div className={cn(
        'absolute inset-0 rounded-lg opacity-30 group-hover:opacity-60 transition-opacity',
        `bg-chemistry-${element.category}`
      )} />
      <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-lg"></div>

      <div className="relative z-10 flex flex-col justify-between h-full text-white p-1">
        <div className="flex justify-between items-start">
          <span className="font-mono text-[0.6rem] opacity-70">{element.atomicNumber}</span>
        </div>
        <div className="flex flex-col items-center justify-center text-center -mt-2">
          <span className="font-bold text-lg">{element.symbol}</span>
          <span className="text-[0.6rem] max-w-full truncate opacity-80">
            {element.name}
          </span>
        </div>
        <div className="text-[0.55rem] text-center opacity-70">
          {element.atomicMass.toFixed(2)}
        </div>
      </div>
    </div>
  );
};

export default ElementCard;
