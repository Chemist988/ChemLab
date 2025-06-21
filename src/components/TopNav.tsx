
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Atom, Bot, FlaskConical, Zap, BookOpen, Calculator } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { name: 'Playground', href: '/', icon: Atom },
  { name: 'AI Assistant', href: '/analytics', icon: Bot },
  { name: 'Reaction Lab', href: '/reaction-lab', icon: FlaskConical },
  { name: 'Element Quiz', href: '/element-quiz', icon: Zap },
  { name: 'Study Guide', href: '/study-guide', icon: BookOpen },
  { name: 'Chem Calculator', href: '/chem-calculator', icon: Calculator },
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
