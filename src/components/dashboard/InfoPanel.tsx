
import React from "react";
import { Button } from "@/components/ui/button";

const InfoPanel = () => (
  <aside className="bg-card p-6 rounded-2xl shadow-sm border border-border min-w-[260px] max-w-xs w-full flex flex-col gap-5">
    <div>
      <h2 className="font-semibold text-lg mb-2">Summary</h2>
      <ul className="text-sm text-muted-foreground space-y-1">
        <li>• 0 files processed</li>
        <li>• 0 errors</li>
        <li>• 0 MB used</li>
      </ul>
    </div>
    <Button className="w-full font-semibold">Retrain Assistant</Button>
  </aside>
);

export default InfoPanel;
