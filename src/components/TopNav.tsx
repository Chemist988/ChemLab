
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Atom, Bot, Activity, Files, Beaker, Globe } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { name: 'Playground', href: '/', icon: Atom },
  { name: 'AI Assistant', href: '/analytics', icon: Bot },
  { name: 'Quizzes', href: '/quizzes', icon: Beaker },
  { name: 'Real World', href: '/real-world', icon: Globe },
  { name: 'Activity', href: '/activity', icon: Activity },
  { name: 'Sources', href: '/sources', icon: Files },
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
                  'flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground font-orbitron',
                  isActive ? 'bg-accent text-accent-foreground' : 'text-muted-foreground'
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
