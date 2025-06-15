import React, { useState, useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, Cylinder } from '@react-three/drei';
import * as THREE from 'three';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

const atomColors: { [key: string]: string } = {
  H: '#FFFFFF', // White
  O: '#FF0000', // Red
  C: '#222222', // Black
  N: '#0000FF', // Blue
};

const atomRadii: { [key: string]: number } = {
  H: 0.25,
  O: 0.4,
  C: 0.45,
  N: 0.42,
};

const moleculesData = {
  water: {
    name: 'Water (H₂O)',
    atoms: [
      { element: 'O', position: [0, 0, 0] as [number, number, number] },
      { element: 'H', position: [0.757, 0.586, 0] as [number, number, number] },
      { element: 'H', position: [-0.757, 0.586, 0] as [number, number, number] },
    ],
    bonds: [ [0, 1], [0, 2] ]
  },
  methane: {
    name: 'Methane (CH₄)',
    atoms: [
      { element: 'C', position: [0, 0, 0] as [number, number, number] },
      { element: 'H', position: [0.629, 0.629, 0.629] as [number, number, number] },
      { element: 'H', position: [-0.629, -0.629, 0.629] as [number, number, number] },
      { element: 'H', position: [-0.629, 0.629, -0.629] as [number, number, number] },
      { element: 'H', position: [0.629, -0.629, -0.629] as [number, number, number] },
    ],
    bonds: [ [0, 1], [0, 2], [0, 3], [0, 4] ]
  },
  ammonia: {
    name: 'Ammonia (NH₃)',
    atoms: [
        { element: 'N', position: [0, 0.2, 0] as [number, number, number] },
        { element: 'H', position: [0, -0.4, 0.94] as [number, number, number] },
        { element: 'H', position: [0.81, -0.4, -0.47] as [number, number, number] },
        { element: 'H', position: [-0.81, -0.4, -0.47] as [number, number, number] },
    ],
    bonds: [ [0,1], [0,2], [0,3] ],
  }
};

type MoleculeKey = keyof typeof moleculesData;

const Molecule = ({ moleculeKey }: { moleculeKey: MoleculeKey }) => {
  const groupRef = useRef<THREE.Group>(null!);
  const molecule = moleculesData[moleculeKey];

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.1;
    }
  });

  const center = useMemo(() => {
    if (!molecule.atoms.length) return new THREE.Vector3(0, 0, 0);
    const centerVec = new THREE.Vector3();
    molecule.atoms.forEach(atom => centerVec.add(new THREE.Vector3(...atom.position)));
    return centerVec.divideScalar(molecule.atoms.length);
  }, [molecule.atoms]);

  const orientedBonds = useMemo(() => {
    return molecule.bonds.map((bondIndices, i) => {
      const start = new THREE.Vector3(...molecule.atoms[bondIndices[0]].position);
      const end = new THREE.Vector3(...molecule.atoms[bondIndices[1]].position);
      
      const distance = start.distanceTo(end);
      if (distance < 0.001) return null; // Prevent rendering zero-length bonds

      const position = start.clone().lerp(end, 0.5);

      const direction = end.clone().sub(start).normalize();
      // The default Cylinder in three.js is aligned along the Y axis, so we create a quaternion to rotate it.
      const quaternion = new THREE.Quaternion().setFromUnitVectors(
        new THREE.Vector3(0, 1, 0), 
        direction
      );
      
      return (
          <Cylinder key={i} args={[0.08, 0.08, distance, 8]} position={position} quaternion={quaternion}>
              <meshStandardMaterial color="#888888" />
          </Cylinder>
      );
    });
  }, [molecule.bonds, molecule.atoms]);

  return (
    <group ref={groupRef}>
      <group position={center.clone().negate()}>
        {molecule.atoms.map((atom, i) => (
          <Sphere key={i} position={atom.position} args={[atomRadii[atom.element], 32, 32]}>
            <meshStandardMaterial color={atomColors[atom.element]} roughness={0.3} metalness={0.2} />
          </Sphere>
        ))}
        {orientedBonds}
      </group>
    </group>
  );
};


const MoleculeViewer = () => {
  const [molecule, setMolecule] = useState<MoleculeKey>('water');

  return (
    <div className="h-full w-full flex flex-col gap-4">
      <div className="flex flex-wrap gap-2 justify-center">
        {Object.keys(moleculesData).map((key) => (
          <Button
            key={key}
            variant={molecule === key ? 'default' : 'secondary'}
            size="sm"
            onClick={() => setMolecule(key as MoleculeKey)}
            className="font-semibold"
          >
            {moleculesData[key as MoleculeKey].name}
          </Button>
        ))}
      </div>
      <div className="flex-grow w-full h-[300px] rounded-lg bg-black/20 border border-border/50 relative">
        <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
          <ambientLight intensity={1.5} />
          <pointLight position={[10, 10, 10]} intensity={2} />
          <Molecule moleculeKey={molecule} />
          <OrbitControls enableZoom={true} enablePan={false} />
        </Canvas>
        <Label className="absolute bottom-2 right-2 text-xs text-muted-foreground">
          Drag to rotate
        </Label>
      </div>
    </div>
  );
};

export default MoleculeViewer;
