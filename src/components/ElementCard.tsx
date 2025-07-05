
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

const neonGlowClasses: { [key: string]: string } = {
    'alkali-metal': 'neon-glow-alkali-metal',
    'alkaline-earth-metal': 'neon-glow-alkaline-earth-metal',
    'transition-metal': 'neon-glow-transition-metal',
    'post-transition-metal': 'neon-glow-post-transition-metal',
    'metalloid': 'neon-glow-metalloid',
    'nonmetal': 'neon-glow-nonmetal',
    'halogen': 'neon-glow-halogen',
    'noble-gas': 'neon-glow-noble-gas',
    'lanthanide': 'neon-glow-lanthanide',
    'actinide': 'neon-glow-actinide',
    'unknown': 'neon-glow-unknown',
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
        `border-2 border-white/40 dark:border-black/30`,
        `hover:shadow-2xl hover:scale-110 hover:z-30 ios-liquid-glass`,
        `transform-gpu perspective-1000 relative group`,
        neonGlowClasses[element.category as keyof typeof neonGlowClasses],
        `${isDragging ? 'ring-4 ring-primary/60 shadow-2xl scale-110 breaking-bad-glow-enhanced' : ''}`,
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
        <span className="font-mono text-[0.5rem] opacity-90 text-shadow-enhanced font-bold bg-black/20 px-1 rounded">
          {element.atomicNumber}
        </span>
        {element.group && (
          <span className="font-mono text-[0.45rem] opacity-80 text-shadow-enhanced bg-black/20 px-1 rounded">
            {element.group}
          </span>
        )}
      </div>
      
      {/* Element Symbol */}
      <div className="flex flex-col items-center justify-center text-center h-[45%] -mt-1">
        <span className="font-bold text-base leading-none text-glow-primary drop-shadow-xl font-orbitron">
          {element.symbol}
        </span>
      </div>
      
      {/* Element Name (for larger sizes) */}
      {(size === 'lg' || size === 'md') && (
        <div className="text-[0.5rem] text-center opacity-90 text-shadow-enhanced font-medium px-1 truncate">
          {element.name}
        </div>
      )}
      
      {/* Atomic Mass */}
      <div className="text-[0.5rem] text-center opacity-95 text-shadow-enhanced font-mono bg-black/30 mx-1 mb-1 rounded px-1">
        {formatAtomicMass(element.atomicMass)}
      </div>
      
      {/* Hover Effect Overlay */}
      <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/20 via-transparent to-transparent"></div>
      </div>
    </div>
  );
};

export default ElementCard;
