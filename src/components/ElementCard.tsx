
import React from 'react';
import { Element, categoryColors } from '../data/elements';
import { useDrag } from 'react-dnd';
import { cn } from '@/lib/utils';

interface ElementCardProps {
  element: Element;
  onClick: () => void;
  size?: 'sm' | 'md' | 'lg';
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
    sm: 'w-[42px] h-[42px] text-[0.65rem]',
    md: 'w-[56px] h-[56px] text-xs',
    lg: 'w-[72px] h-[72px] text-sm',
  };

  return (
    <div
      ref={isDraggable ? drag : undefined}
      className={cn(
        `bg-chemistry-${element.category} rounded-md overflow-hidden cursor-pointer transition-all duration-300`,
        `border border-white/20 dark:border-black/20`,
        `hover:shadow-lg hover:scale-110 hover:z-20`,
        `${isDragging ? 'ring-2 ring-primary/50 shadow-lg scale-110' : ''}`,
        sizeClasses[size],
        className
      )}
      onClick={onClick}
      style={{ 
        opacity: isDragging ? 0.7 : 1,
        backgroundImage: `radial-gradient(circle at center, var(--element-center-color, rgba(255,255,255,0.2)) 0%, var(--element-edge-color, rgba(0,0,0,0.05)) 100%)`,
        '--element-center-color': element.category === 'alkali-metal' || element.category === 'transition-metal' ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.15)',
        '--element-edge-color': 'rgba(0,0,0,0.1)'
      } as React.CSSProperties}
    >
      <div className="flex justify-between items-start px-1 pt-0.5">
        <span className="font-mono text-[0.6rem] opacity-80">{element.atomicNumber}</span>
        <span className="font-mono text-[0.6rem] opacity-70">{element.group || ""}</span>
      </div>
      <div className="flex flex-col items-center justify-center text-center h-[60%] -mt-1">
        <span className="font-bold">{element.symbol}</span>
        <span className="text-[0.6rem] max-w-full truncate opacity-90 px-0.5">
          {element.name}
        </span>
      </div>
      <div className="text-[0.55rem] text-center mt-[-2px] opacity-80">
        {element.atomicMass.toFixed(1)}
      </div>
    </div>
  );
};

export default ElementCard;
