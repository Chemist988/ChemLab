
import React from 'react';
import { Button } from "@/components/ui/button";
import { useTheme } from "@/hooks/use-theme";
import { Moon, Sun, Monitor } from "lucide-react";

const ThemeSwitcher: React.FC = () => {
  const { theme, setTheme } = useTheme();
  
  const cycleTheme = () => {
    if (theme === 'light') {
      setTheme('dark');
    } else if (theme === 'dark') {
      setTheme('system');
    } else {
      setTheme('light');
    }
  };

  const getIcon = () => {
    switch (theme) {
      case 'light':
        return <Sun className="h-5 w-5" />;
      case 'dark':
        return <Moon className="h-5 w-5" />;
      default:
        return <Monitor className="h-5 w-5" />;
    }
  };

  const getThemeLabel = () => {
    switch (theme) {
      case 'light':
        return 'Light Mode';
      case 'dark':
        return 'Dark Mode';
      default:
        return 'System';
    }
  };
  
  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={cycleTheme}
      className="rounded-full hover:bg-primary/10 flex items-center gap-2 px-3 py-2"
      aria-label={`Switch to ${theme === 'light' ? 'dark' : theme === 'dark' ? 'system' : 'light'} mode`}
    >
      {getIcon()}
      <span className="text-xs font-medium hidden sm:inline">{getThemeLabel()}</span>
    </Button>
  );
};

export default ThemeSwitcher;
