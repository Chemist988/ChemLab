
import React from 'react';
import ReactionVisualizer from '@/components/ReactionVisualizer';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

const ActionsPage = () => {
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight">Chemistry in Action</h1>
        <p className="text-lg text-muted-foreground mt-2">
          Visualize chemical reactions in an interactive 3D space.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Chemical Reaction Visualizer</CardTitle>
          <CardDescription>
            Select a chemical reaction to see the reactant and product molecules. Use your mouse to rotate, pan, and zoom.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ReactionVisualizer />
        </CardContent>
      </Card>

      <div className="mt-8 text-center text-muted-foreground">
        <p>Animation and more reactions coming soon!</p>
      </div>
    </div>
  );
};

export default ActionsPage;
