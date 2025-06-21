
import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Element } from '@/data/elements';
import AtomVisualization from './AtomVisualization';
import MolecularBond from './MolecularBond';

interface MolecularCanvasProps {
  selectedAtoms: Element[];
  atomPositions: [number, number, number][];
  selectedElement: Element | null;
  onAtomClick: (atom: Element) => void;
}

const MolecularCanvas: React.FC<MolecularCanvasProps> = ({
  selectedAtoms,
  atomPositions,
  selectedElement,
  onAtomClick
}) => {
  return (
    <Canvas camera={{ position: [10, 10, 10], fov: 60 }}>
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <spotLight position={[-10, 10, 5]} angle={0.3} penumbra={1} intensity={0.5} />
      
      {selectedAtoms.map((atom, index) => (
        <AtomVisualization
          key={`${atom.id}-${index}`}
          element={atom}
          position={atomPositions[index]}
          selected={selectedElement?.id === atom.id}
          onClick={() => onAtomClick(atom)}
        />
      ))}
      
      {selectedAtoms.map((atom1, i) =>
        selectedAtoms.slice(i + 1).map((atom2, j) => {
          const pos1 = atomPositions[i];
          const pos2 = atomPositions[i + j + 1];
          if (!pos1 || !pos2) return null;
          
          const distance = Math.sqrt(
            Math.pow(pos1[0] - pos2[0], 2) +
            Math.pow(pos1[1] - pos2[1], 2) +
            Math.pow(pos1[2] - pos2[2], 2)
          );
          
          return distance < 3 ? (
            <MolecularBond
              key={`bond-${i}-${i + j + 1}`}
              start={pos1}
              end={pos2}
            />
          ) : null;
        })
      )}
      
      <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />
    </Canvas>
  );
};

export default MolecularCanvas;
