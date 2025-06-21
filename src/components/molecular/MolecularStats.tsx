
import React from 'react';
import { Element } from '@/data/elements';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Zap } from 'lucide-react';

interface MolecularStatsProps {
  selectedAtoms: Element[];
  atomPositions: [number, number, number][];
  selectedElement: Element | null;
  isSimulating: boolean;
}

const MolecularStats: React.FC<MolecularStatsProps> = ({
  selectedAtoms,
  atomPositions,
  selectedElement,
  isSimulating
}) => {
  const bondsCount = selectedAtoms.reduce((bonds, _, i) => {
    return bonds + selectedAtoms.slice(i + 1).filter((_, j) => {
      const pos1 = atomPositions[i];
      const pos2 = atomPositions[i + j + 1];
      if (!pos1 || !pos2) return false;
      const distance = Math.sqrt(
        Math.pow(pos1[0] - pos2[0], 2) +
        Math.pow(pos1[1] - pos2[1], 2) +
        Math.pow(pos1[2] - pos2[2], 2)
      );
      return distance < 3;
    }).length;
  }, 0);

  return (
    <div className="space-y-6">
      {selectedElement && (
        <Card className="liquid-glass">
          <CardHeader>
            <CardTitle>Selected Atom</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="liquid-glass">
                {selectedElement.symbol}
              </Badge>
              <span className="font-medium">{selectedElement.name}</span>
            </div>
            <Separator />
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Atomic Number:</span>
                <span>{selectedElement.atomicNumber}</span>
              </div>
              <div className="flex justify-between">
                <span>Atomic Mass:</span>
                <span>{selectedElement.atomicMass.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Category:</span>
                <Badge variant="outline" className="liquid-glass">
                  {selectedElement.category.replace('-', ' ')}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <Card className="liquid-glass">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="w-5 h-5" />
            Molecule Stats
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Total Atoms:</span>
              <span>{selectedAtoms.length}/10</span>
            </div>
            <div className="flex justify-between">
              <span>Bonds Formed:</span>
              <span>{bondsCount}</span>
            </div>
            <div className="flex justify-between">
              <span>Simulation:</span>
              <Badge variant={isSimulating ? "default" : "secondary"} className="liquid-glass">
                {isSimulating ? "Active" : "Paused"}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MolecularStats;
