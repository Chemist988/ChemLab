
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Atom, Bot, Boxes, Zap, Microscope, Dna } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { name: 'Playground', href: '/', icon: Atom },
  { name: 'AI Assistant', href: '/analytics', icon: Bot },
  { name: '3D Molecular Lab', href: '/molecular-lab', icon: Boxes },
  { name: 'Quantum Simulator', href: '/quantum-simulator', icon: Zap },
  { name: 'Nano Explorer', href: '/nano-explorer', icon: Microscope },
  { name: 'Bio Reactor', href: '/bio-reactor', icon: Dna },
];

const TopNav = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center justify-between">
        <nav className="flex items-center space-x-6">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              end={item.href === '/'}
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-all duration-500 hover:bg-accent hover:text-accent-foreground font-orbitron liquid-glass-transition',
                  isActive ? 'bg-accent text-accent-foreground liquid-glass scale-105' : 'text-muted-foreground'
                )
              }
            >
              <item.icon className="h-4 w-4" />
              <span>{item.name}</span>
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default TopNav;
