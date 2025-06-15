
import React from 'react';
import { BookOpen, Beaker, Bot, LayoutDashboard } from "lucide-react";
import { Button } from "@/components/ui/button";
import ThemeSwitcher from "@/components/ThemeSwitcher";

export interface ChemistryNavBarProps {
  onSelect?: (section: string) => void;
  current?: string;
}

const sections = [
  { key: 'explore', label: "Explore Lab", icon: LayoutDashboard },
  { key: 'heisenbot', label: "HeisenBot", icon: Bot },
  { key: 'guide', label: "Lab Guide", icon: BookOpen },
];

const ChemistryNavBar: React.FC<ChemistryNavBarProps> = ({
  onSelect,
  current = "explore",
}) => {
  return (
    <nav className="fixed z-40 top-0 left-0 w-full bg-gradient-to-r from-[#f43f5e] via-[#fbbf24] to-[#f87171] dark:from-[#1e293b] dark:via-[#eab308] dark:to-[#9333ea] shadow-md shadow-black/10">
      <div className="max-w-7xl mx-auto flex items-center justify-between h-16 px-6">
        <div className="flex items-center gap-6">
          <span className="text-2xl font-bold tracking-tighter text-white drop-shadow select-none">Chemistry Lab</span>
          <span className="mx-4 hidden md:inline text-white/30 text-xl select-none">|</span>
          <ul className="flex items-center gap-3">
            {sections.map((item) => (
              <li key={item.key}>
                <Button
                  variant="ghost"
                  size="sm"
                  className={`text-white/85 px-3 rounded-full font-medium hover:bg-white/10 hover:text-white transition-colors ${
                    current === item.key ? 'bg-white/20 text-white' : ''
                  }`}
                  onClick={onSelect ? () => onSelect(item.key) : undefined}
                  aria-current={current === item.key ? "page" : undefined}
                >
                  <item.icon className="w-4 h-4 mr-1" />
                  {item.label}
                </Button>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex items-center gap-2">
          <ThemeSwitcher />
        </div>
      </div>
    </nav>
  );
};

export default ChemistryNavBar;
