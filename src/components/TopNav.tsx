
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Atom, Beaker, Calculator, Bot, BookOpen, BarChart3 } from 'lucide-react';
import { ThemeSwitcher } from './ThemeSwitcher';

const TopNav = () => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const navItems = [
    { path: '/', icon: Atom, label: 'Periodic Table' },
    { path: '/formula-builder', icon: Calculator, label: 'Formula Builder' },
    { path: '/analytics', icon: Bot, label: 'AI Assistant' },
    { path: '/activity', icon: BarChart3, label: 'Activity' },
    { path: '/sources', icon: BookOpen, label: 'Sources' }
  ];

  return (
    <nav className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border-b border-gray-200/50 dark:border-gray-700/50 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Beaker className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold font-orbitron bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
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
                    ? 'bg-primary text-primary-foreground shadow-lg'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
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
