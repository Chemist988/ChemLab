
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

const cleanThemeClasses: { [key: string]: string } = {
    'alkali-metal': 'clean-theme-alkali',
    'alkaline-earth-metal': 'clean-theme-alkaline',
    'transition-metal': 'clean-theme-transition',
    'post-transition-metal': 'clean-theme-post-transition',
    'metalloid': 'clean-theme-metalloid',
    'nonmetal': 'clean-theme-nonmetal',
    'halogen': 'clean-theme-halogen',
    'noble-gas': 'clean-theme-noble-gas',
    'lanthanide': 'clean-theme-lanthanide',
    'actinide': 'clean-theme-actinide',
    'unknown': 'clean-theme-unknown',
};

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
    xs: 'w-[48px] h-[48px] text-[0.55rem]',
    sm: 'w-[68px] h-[68px] text-[0.65rem]',
    md: 'w-[80px] h-[80px] text-xs',
    lg: 'w-[100px] h-[100px] text-sm',
  };

  const formatAtomicMass = (mass: number) => {
    return mass % 1 === 0 ? mass.toString() : mass.toFixed(2);
  };

  return (
    <div
      ref={isDraggable ? drag : undefined}
      className={cn(
        `bg-chemistry-${element.category} rounded-xl cursor-pointer element-card-enhanced`,
        `border border-border`,
        `hover:shadow-lg hover:scale-105 hover:z-30`,
        `transform-gpu relative group transition-all duration-200`,
        cleanThemeClasses[element.category as keyof typeof cleanThemeClasses],
        `${isDragging ? 'ring-2 ring-primary shadow-lg scale-105 clean-highlight' : ''}`,
        isDimmed && 'opacity-30 saturate-0 pointer-events-none blur-sm',
        sizeClasses[size],
        className
      )}
      onClick={onClick}
      style={{ 
        opacity: isDragging ? 0.8 : 1,
      } as React.CSSProperties}
    >
      {/* Atomic Number and Group */}
      <div className="flex justify-between items-start px-1.5 pt-1">
        <span className="font-mono text-[0.5rem] opacity-70 font-medium bg-foreground/10 px-1 rounded text-foreground">
          {element.atomicNumber}
        </span>
        {element.group && (
          <span className="font-mono text-[0.45rem] opacity-60 bg-foreground/10 px-1 rounded text-foreground">
            {element.group}
          </span>
        )}
      </div>
      
      {/* Element Symbol */}
      <div className="flex flex-col items-center justify-center text-center h-[45%] -mt-1">
        <span className="font-bold text-base leading-none font-orbitron text-foreground">
          {element.symbol}
        </span>
      </div>
      
      {/* Element Name (for larger sizes) */}
      {(size === 'lg' || size === 'md') && (
        <div className="text-[0.5rem] text-center opacity-70 font-medium px-1 truncate text-foreground">
          {element.name}
        </div>
      )}
      
      {/* Atomic Mass */}
      <div className="text-[0.5rem] text-center opacity-80 font-mono bg-foreground/10 mx-1 mb-1 rounded px-1 text-foreground">
        {formatAtomicMass(element.atomicMass)}
      </div>
      
      {/* Hover Effect Overlay */}
      <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
        <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-foreground/5 via-transparent to-transparent"></div>
      </div>
    </div>
  );
};

export default ElementCard;
