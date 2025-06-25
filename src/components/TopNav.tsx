
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Atom, Beaker, Calculator, Bot, BookOpen, BarChart3 } from 'lucide-react';
import ThemeSwitcher from './ThemeSwitcher';

const TopNav = () => {
  const location = useLocation();

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
    <nav className="bg-black/95 backdrop-blur-xl border-b border-green-400/30 sticky top-0 z-50 breaking-bad-glow">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Beaker className="h-8 w-8 text-green-400" />
            <span className="text-2xl font-bold font-orbitron bg-gradient-to-r from-green-400 to-green-500 bg-clip-text text-transparent">
              ChemLab
            </span>
          </Link>
          
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map(({ path, icon: Icon, label }) => (
              <Link
                key={path}
                to={path}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                  isActive(path)
                    ? 'bg-green-500/20 text-green-400 shadow-lg border border-green-400/30 breaking-bad-glow'
                    : 'text-green-300/80 hover:text-green-400 hover:bg-green-500/10'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span className="text-sm font-medium">{label}</span>
              </Link>
            ))}
          </div>

          <ThemeSwitcher />
        </div>
      </div>
    </nav>
  );
};

export default TopNav;
