
import React from 'react';
import MoleculeViewer from '@/components/MoleculeViewer';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

const ActionsPage = () => {
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight">Interactive Actions</h1>
        <p className="text-lg text-muted-foreground mt-2">
          Engage with chemistry in new ways.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>3D Molecule Viewer</CardTitle>
          <CardDescription>
            Visualize molecules in 3D. Here's a model of Water (H₂O). Use your mouse to rotate and zoom.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <MoleculeViewer />
        </CardContent>
      </Card>

      <div className="mt-8 text-center text-muted-foreground">
        <p>More interactive actions coming soon!</p>
      </div>
    </div>
  );
};

export default ActionsPage;
