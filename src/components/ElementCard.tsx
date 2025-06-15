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
    xs: 'w-[58px] h-[58px] text-[0.65rem]',
    sm: 'w-[68px] h-[68px] text-[0.7rem]',
    md: 'w-[80px] h-[80px] text-xs',
    lg: 'w-[100px] h-[100px] text-sm',
  };

  return (
    <div
      ref={isDraggable ? drag : undefined}
      className={cn(
        `bg-chemistry-${element.category} rounded-md cursor-pointer transition-all duration-300`,
        `backdrop-blur-sm border border-white/10 dark:border-black/10`,
        `hover:shadow-lg hover:scale-110 hover:z-20`,
        neonGlowClasses[element.category as keyof typeof neonGlowClasses],
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
        <span className="font-mono text-[0.65rem] opacity-80">{element.atomicNumber}</span>
        <span className="font-mono text-[0.65rem] opacity-70">{element.group || ""}</span>
      </div>
      <div className="flex flex-col items-center justify-center text-center h-[60%] -mt-0.5">
        <span className="font-bold">{element.symbol}</span>
        <span className="text-[0.7rem] max-w-full px-0.5 font-medium">
          {element.name}
        </span>
      </div>
      <div className="text-[0.6rem] text-center opacity-80">
        {element.atomicMass.toFixed(1)}
      </div>
    </div>
  );
};

export default ElementCard;
