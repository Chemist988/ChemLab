
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Atom, Beaker, Calculator, Bot, BookOpen, BarChart3, Sparkles } from 'lucide-react';
import ThemeSwitcher from './ThemeSwitcher';
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
    { path: '/', icon: Atom, label: 'Element Table' },
    { path: '/formula-builder', icon: Calculator, label: 'Formula Lab' },
    { path: '/analytics', icon: Bot, label: 'AI Assistant' },
    { path: '/activity', icon: BarChart3, label: 'Lab Reports' },
    { path: '/sources', icon: BookOpen, label: 'References' }
  ];

  return (
    <nav className={cn(
      "sticky top-0 z-50 transition-all duration-500",
      scrolled 
        ? "ios-liquid-glass border-b-2 border-green-400/40 shadow-2xl breaking-bad-glow-enhanced" 
        : "bg-black/90 backdrop-blur-xl border-b border-green-400/30"
    )}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Enhanced Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-green-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-2xl transition-all duration-300">
                <Beaker className="h-6 w-6 text-black group-hover:animate-pulse" />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full flex items-center justify-center animate-pulse">
                <Sparkles className="w-2 h-2 text-black" />
              </div>
            </div>
            <span className="text-3xl font-black font-orbitron bg-gradient-to-r from-green-400 via-green-300 to-green-500 bg-clip-text text-transparent group-hover:scale-105 transition-transform duration-300 text-shadow-enhanced">
              ChemLab
            </span>
          </Link>
          
          {/* Enhanced Navigation */}
          <div className="hidden md:flex items-center space-x-2">
            {navItems.map(({ path, icon: Icon, label }) => (
              <Link
                key={path}
                to={path}
                className={cn(
                  'flex items-center space-x-2 px-4 py-2 rounded-2xl transition-all duration-300 relative group',
                  isActive(path)
                    ? 'ios-liquid-glass text-green-400 shadow-2xl border-2 border-green-400/40 breaking-bad-glow-enhanced scale-105'
                    : 'text-green-300/80 hover:text-green-400 hover:bg-green-500/20 hover:scale-105 hover:shadow-lg backdrop-blur-sm'
                )}
              >
                <Icon className={cn(
                  "h-4 w-4 transition-all duration-300",
                  isActive(path) && "animate-pulse"
                )} />
                <span className="text-sm font-semibold">{label}</span>
                
                {/* Active indicator */}
                {isActive(path) && (
                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-green-400 rounded-full animate-pulse shadow-lg" />
                )}
                
                {/* Hover effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-green-400/0 via-green-400/10 to-green-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Link>
            ))}
          </div>

          {/* Enhanced Theme Switcher */}
          <div className="flex items-center space-x-3">
            <ThemeSwitcher />
            
            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button className="ios-liquid-glass p-2 rounded-xl border border-green-400/30 text-green-400 hover:bg-green-500/20 transition-all duration-300">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        <div className="md:hidden pb-4">
          <div className="flex flex-wrap gap-2 justify-center">
            {navItems.map(({ path, icon: Icon, label }) => (
              <Link
                key={path}
                to={path}
                className={cn(
                  'flex items-center space-x-2 px-3 py-2 rounded-xl text-xs transition-all duration-300',
                  isActive(path)
                    ? 'ios-liquid-glass text-green-400 border border-green-400/40'
                    : 'text-green-300/80 hover:text-green-400 hover:bg-green-500/20'
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
