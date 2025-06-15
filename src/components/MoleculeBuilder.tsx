import React, { useState, useRef, useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Sphere, Cylinder } from '@react-three/drei';
import * as THREE from 'three';
import { molecules, Molecule, BondData, AtomData } from '@/data/molecules';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const Bond = ({ bond, atoms }: { bond: BondData; atoms: AtomData[] }) => {
  const start = atoms[bond.from].position;
  const end = atoms[bond.to].position;

  const position = new THREE.Vector3().lerpVectors(start, end, 0.5);
  const direction = new THREE.Vector3().subVectors(end, start);
  const length = direction.length();
  
  const orientation = new THREE.Matrix4();
  const up = new THREE.Vector3(0, 1, 0);
  orientation.lookAt(start, end, up);
  const quaternion = new THREE.Quaternion().setFromRotationMatrix(orientation);

  const bondRadius = 0.08;

  if (bond.style === 'single') {
    return (
      <Cylinder args={[bondRadius, bondRadius, length]} position={position} quaternion={quaternion}>
        <meshStandardMaterial color="#888" />
      </Cylinder>
    );
  }

  const offset = bondRadius * 1.5;
  const offsetVec = new THREE.Vector3(0, offset, 0).applyQuaternion(quaternion);

  if (bond.style === 'double') {
    return (
      <group>
        <Cylinder args={[bondRadius, bondRadius, length]} position={position.clone().add(offsetVec)} quaternion={quaternion}>
          <meshStandardMaterial color="#888" />
        </Cylinder>
        <Cylinder args={[bondRadius, bondRadius, length]} position={position.clone().sub(offsetVec)} quaternion={quaternion}>
          <meshStandardMaterial color="#888" />
        </Cylinder>
      </group>
    );
  }

  return null; // Triple bonds can be added later
};

const Molecule3D = ({ molecule }: { molecule: Molecule }) => {
  const groupRef = useRef<THREE.Group>(null!);

  return (
    <group ref={groupRef}>
      {molecule.atoms.map((atom, index) => (
        <Sphere key={index} args={[atom.radius, 32, 32]} position={atom.position}>
          <meshStandardMaterial color={atom.color} roughness={0.3} />
        </Sphere>
      ))}
      {molecule.bonds.map((bond, index) => (
        <Bond key={index} bond={bond} atoms={molecule.atoms} />
      ))}
    </group>
  );
};

const MoleculeBuilder = () => {
  const [selectedMoleculeKey, setSelectedMoleculeKey] = useState('water');
  const selectedMolecule = useMemo(() => molecules[selectedMoleculeKey], [selectedMoleculeKey]);

  return (
    <div className="flex flex-col md:flex-row gap-8">
      <div className="md:w-1/4">
        <h3 className="text-lg font-semibold mb-4">Select a Molecule</h3>
        <div className="flex flex-col gap-2">
          {Object.entries(molecules).map(([key, molecule]) => (
            <Button
              key={key}
              variant="ghost"
              className={cn(
                "justify-start",
                selectedMoleculeKey === key && "bg-accent text-accent-foreground"
              )}
              onClick={() => setSelectedMoleculeKey(key)}
            >
              {molecule.name} ({molecule.formula})
            </Button>
          ))}
        </div>
      </div>
      <div className="flex-1 w-full h-[400px] md:h-[600px] rounded-lg border border-border cursor-grab active:cursor-grabbing">
        <Canvas camera={{ position: [0, 2, 7], fov: 50 }}>
          <ambientLight intensity={2.5} />
          <pointLight position={[10, 10, 10]} intensity={1.5} />
          <pointLight position={[-10, -10, -10]} intensity={0.5} />
          <Molecule3D molecule={selectedMolecule} />
          <OrbitControls enableZoom={true} />
        </Canvas>
      </div>
    </div>
  );
};

export default MoleculeBuilder;
