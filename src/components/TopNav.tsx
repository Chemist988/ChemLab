
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Atom, Bot, FlaskConical, Skull, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';

const TopNav = () => {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const navItems = [
    { path: '/', icon: Atom, label: 'Periodic Table' },
    { path: '/analytics', icon: Bot, label: 'TheBlueMatterAI' }
  ];

  return (
    <nav className={cn(
      "sticky top-0 z-50 transition-all duration-500 glass-effect",
      scrolled && "breaking-bad-glow"
    )}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Breaking Bad inspired title */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="flex items-center gap-2">
              <FlaskConical className="h-8 w-8 text-primary group-hover:animate-pulse" />
              <Skull className="h-4 w-4 text-primary/70" />
            </div>
            <span className="text-2xl font-black font-orbitron text-breaking-bad group-hover:scale-105 transition-transform duration-300">
              ChemLab
            </span>
            <Zap className="h-4 w-4 text-primary/70 animate-pulse" />
          </Link>
          
          {/* Navigation */}
          <div className="hidden md:flex items-center space-x-2">
            {navItems.map(({ path, icon: Icon, label }) => (
              <Link
                key={path}
                to={path}
                className={cn(
                  'flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-300',
                  isActive(path)
                    ? 'glass-effect text-primary breaking-bad-glow border border-primary/30'
                    : 'text-foreground/80 hover:text-primary hover:bg-primary/10'
                )}
              >
                <Icon className="h-4 w-4" />
                <span className="text-sm font-semibold">{label}</span>
                {path === '/analytics' && <Skull className="h-3 w-3 text-primary/70" />}
              </Link>
            ))}
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden flex flex-col space-y-2">
            {navItems.map(({ path, icon: Icon, label }) => (
              <Link
                key={path}
                to={path}
                className={cn(
                  'flex items-center space-x-2 px-3 py-2 rounded-lg text-xs transition-all duration-300',
                  isActive(path)
                    ? 'glass-effect text-primary border border-primary/30'
                    : 'text-foreground/80 hover:text-primary hover:bg-primary/10'
                )}
              >
                <Icon className="h-3 w-3" />
                <span className="font-medium">{label}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default TopNav;
