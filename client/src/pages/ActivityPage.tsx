
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Atom, Zap } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface ReactionLogEntry {
  id: string;
  reactants: { name: string; symbol: string }[];
  product: string;
  description: string;
  timestamp: string;
}

const ActivityPage = () => {
  const [reactionLog, setReactionLog] = useState<ReactionLogEntry[]>([]);

  useEffect(() => {
    const handleStorageChange = () => {
      try {
        const log = JSON.parse(localStorage.getItem('reactionLog') || '[]');
        setReactionLog(log);
      } catch (error) {
        console.error("Failed to read from localStorage", error);
        setReactionLog([]);
      }
    };
    
    handleStorageChange(); // Initial load

    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight">Recent Activity</h1>
        <p className="text-lg text-muted-foreground mt-2">A log of your recent chemical reactions.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Reaction Log</CardTitle>
          <CardDescription>Showing the last {reactionLog.length} reactions.</CardDescription>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[600px] pr-4">
            {reactionLog.length > 0 ? (
              <div className="space-y-6">
                {reactionLog.map((entry) => (
                  <div key={entry.id} className="flex items-start gap-4">
                    <div className="flex-shrink-0 mt-1">
                      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary">
                        <Zap className="h-5 w-5 text-secondary-foreground" />
                      </span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <p className="font-semibold">
                          {entry.reactants.map(r => r.name).join(' + ')} → {entry.product}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {formatDistanceToNow(new Date(entry.timestamp), { addSuffix: true })}
                        </p>
                      </div>
                      <p className="text-sm text-muted-foreground">{entry.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <Atom className="mx-auto h-12 w-12 text-muted-foreground" />
                <h3 className="mt-4 text-lg font-medium">No activity yet</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Go to the playground and start some reactions!
                </p>
              </div>
            )}
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
};

export default ActivityPage;
