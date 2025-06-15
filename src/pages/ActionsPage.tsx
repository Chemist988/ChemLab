
import React from 'react';
import MoleculeBuilder from '@/components/MoleculeBuilder';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

const ActionsPage = () => {
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight">Molecule Builder</h1>
        <p className="text-lg text-muted-foreground mt-2">
          Build and visualize molecules in an interactive 3D space.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>3D Molecule Viewer</CardTitle>
          <CardDescription>
            Select a molecule from the list to view its 3D structure. Use your mouse to rotate and zoom.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <MoleculeBuilder />
        </CardContent>
      </Card>

      <div className="mt-8 text-center text-muted-foreground">
        <p>More molecules and features coming soon!</p>
      </div>
    </div>
  );
};

export default ActionsPage;
