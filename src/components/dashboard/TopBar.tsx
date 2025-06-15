
import React from "react";
import { search } from "lucide-react";
import { Button } from "@/components/ui/button";

const TopBar = () => (
  <header className="h-16 w-full flex items-center justify-between px-8 bg-gradient-to-r from-blue-600 to-purple-600 shadow-sm">
    <div className="flex items-center gap-4">
      <span className="text-lg font-black text-white tracking-tighter">ChemLab Dashboard</span>
      <nav className="ml-8 space-x-4">
        <a href="#" className="text-white/80 hover:text-white text-sm font-medium">Sources</a>
        <a href="#" className="text-white/80 hover:text-white text-sm font-medium">History</a>
        <a href="#" className="text-white/80 hover:text-white text-sm font-medium">Settings</a>
      </nav>
    </div>
    <div className="flex items-center gap-2">
      <Button size="sm" className="bg-white/20 text-white hover:bg-white/30 flex gap-2">
        <search className="w-4 h-4" />
        Search
      </Button>
    </div>
  </header>
);

export default TopBar;
