
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
    xs: 'w-[48px] h-[48px] text-[0.6rem]',
    sm: 'w-[68px] h-[68px] text-[0.7rem]',
    md: 'w-[80px] h-[80px] text-xs',
    lg: 'w-[100px] h-[100px] text-sm',
  };

  return (
    <div
      ref={isDraggable ? drag : undefined}
      className={cn(
        `bg-chemistry-${element.category} rounded-lg cursor-pointer transition-all duration-500`,
        `backdrop-blur-xl border-2 border-white/30 dark:border-black/20`,
        `hover:shadow-2xl hover:scale-110 hover:z-20 liquid-glass-element`,
        `transform-gpu perspective-1000`,
        neonGlowClasses[element.category as keyof typeof neonGlowClasses],
        `${isDragging ? 'ring-2 ring-primary/50 shadow-2xl scale-110' : ''}`,
        isDimmed && 'opacity-20 saturate-0 pointer-events-none',
        sizeClasses[size],
        className
      )}
      onClick={onClick}
      style={{ 
        opacity: isDragging ? 0.7 : 1,
        background: `
          linear-gradient(135deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0.05) 100%),
          linear-gradient(45deg, rgba(255,255,255,0.1) 0%, transparent 50%)
        `,
        backdropFilter: 'blur(20px) saturate(180%)',
        WebkitBackdropFilter: 'blur(20px) saturate(180%)',
        boxShadow: `
          inset 0 2px 0 rgba(255,255,255,0.3),
          inset 0 -2px 0 rgba(0,0,0,0.1),
          0 8px 32px rgba(0,0,0,0.15),
          0 4px 12px rgba(0,0,0,0.1)
        `,
      } as React.CSSProperties}
    >
      <div className="flex justify-between items-start px-1 pt-0.5">
        <span className="font-mono text-[0.6rem] opacity-90 text-shadow font-bold">{element.atomicNumber}</span>
        <span className="font-mono text-[0.6rem] opacity-80 text-shadow">{element.group || ""}</span>
      </div>
      <div className="flex flex-col items-center justify-center text-center h-[60%] -mt-0.5">
        <span className="font-bold text-base leading-none text-shadow-lg drop-shadow-sm">{element.symbol}</span>
      </div>
      <div className="text-[0.55rem] text-center opacity-90 text-shadow font-medium">
        {element.atomicMass.toFixed(1)}
      </div>
    </div>
  );
};

export default ElementCard;
