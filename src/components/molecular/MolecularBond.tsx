
import React, { useMemo } from 'react';
import { Line } from '@react-three/drei';
import * as THREE from 'three';

interface MolecularBondProps {
  start: [number, number, number];
  end: [number, number, number];
}

const MolecularBond: React.FC<MolecularBondProps> = ({ start, end }) => {
  const points = useMemo(() => [new THREE.Vector3(...start), new THREE.Vector3(...end)], [start, end]);
  
  return (
    <Line
      points={points}
      color="#ffff00"
      lineWidth={3}
    />
  );
};

export default MolecularBond;
