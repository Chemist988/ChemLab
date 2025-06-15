
import React from "react";
import { layoutDashboard, fileText, bookOpen, search, chevronRight } from "lucide-react";

const navItems = [
  { label: "Dashboard", icon: layoutDashboard, active: true },
  { label: "Files", icon: fileText },
  { label: "Text", icon: bookOpen },
  { label: "Website", icon: search },
];

const SidebarNav = () => (
  <nav className="flex flex-col py-8 h-full">
    <div className="mb-6 px-6">
      <span className="text-xl font-black tracking-tight text-primary">ChemLab</span>
    </div>
    <ul className="space-y-2 flex-1">
      {navItems.map((item) => (
        <li key={item.label}>
          <button
            className={
              "flex items-center w-full px-6 py-3 gap-3 rounded-xl text-base font-medium " +
              (item.active
                ? "bg-primary/10 text-primary"
                : "text-muted-foreground hover:bg-muted")
            }
          >
            <item.icon className="w-5 h-5" />
            {item.label}
          </button>
        </li>
      ))}
    </ul>
    <div className="mt-auto px-6 pb-4">
      <button className="flex items-center text-sm gap-2 text-muted-foreground hover:text-primary transition">
        See all <chevronRight className="w-4 h-4" />
      </button>
    </div>
  </nav>
);

export default SidebarNav;
