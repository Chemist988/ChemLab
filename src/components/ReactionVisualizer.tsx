
import React, { useState, useMemo, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Sphere, Cylinder, Text } from '@react-three/drei';
import * as THREE from 'three';
import { reactions, molecules, Molecule, BondData, AtomData } from '@/data/reactions';
import { Button } from '@/components/ui/button';

const Bond = ({ bond, atoms }: { bond: BondData; atoms: AtomData[] }) => {
  const start = atoms[bond.from].position;
  const end = atoms[bond.to].position;

  const position = new THREE.Vector3().lerpVectors(start, end, 0.5);
  const direction = new THREE.Vector3().subVectors(end, start);
  const length = direction.length();
  
  const orientation = new THREE.Matrix4();
  const up = new THREE.Vector3(0, 1, 0);
  orientation.lookAt(new THREE.Vector3(), direction, up);
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

const Molecule3D = ({ molecule, position = new THREE.Vector3() }: { molecule: Molecule, position?: THREE.Vector3 }) => {
  const groupRef = useRef<THREE.Group>(null!);

  return (
    <group ref={groupRef} position={position}>
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


const ReactionVisualizer = () => {
    const [selectedReactionKey, setSelectedReactionKey] = useState('water_formation');
    const selectedReaction = useMemo(() => reactions[selectedReactionKey], [selectedReactionKey]);

    const placeMolecules = (list: {key: string, count: number}[]) => {
        const placedMolecules: { key: string, molecule: Molecule, index: number }[] = [];
        let moleculeIndex = 0;
        for (const item of list) {
            const molecule = molecules[item.key];
            if (!molecule) continue;
            for (let i = 0; i < item.count; i++) {
                placedMolecules.push({
                    key: `${item.key}-${i}`,
                    molecule,
                    index: moleculeIndex++
                });
            }
        }
        return placedMolecules;
    };

    const reactants = placeMolecules(selectedReaction.reactants);
    const products = placeMolecules(selectedReaction.products);

    const getMoleculePosition = (index: number, total: number, side: 'left' | 'right') => {
        const spacing = 4;
        const totalWidth = (total - 1) * spacing;
        const startX = -totalWidth / 2;
        const x = startX + index * spacing;
        const sideOffset = side === 'left' ? -8 : 8;
        return new THREE.Vector3(x + sideOffset, 0, 0);
    };

    return (
        <div className="flex flex-col gap-8">
            <div className="flex flex-col items-center gap-4">
                <div className="flex gap-2 flex-wrap justify-center">
                    {Object.entries(reactions).map(([key, reaction]) => (
                        <Button
                            key={key}
                            variant={selectedReactionKey === key ? "default" : "secondary"}
                            onClick={() => setSelectedReactionKey(key)}
                        >
                            {reaction.name}
                        </Button>
                    ))}
                </div>
                <div className="text-lg md:text-xl font-mono p-4 bg-muted rounded-lg w-full text-center overflow-x-auto">
                    {selectedReaction.equation}
                </div>
            </div>

            <div className="flex-1 w-full h-[400px] md:h-[500px] rounded-lg border border-border cursor-grab active:cursor-grabbing">
                <Canvas camera={{ position: [0, 5, 22], fov: 50 }}>
                    <ambientLight intensity={2.5} />
                    <pointLight position={[10, 10, 10]} intensity={1.5} />
                    <pointLight position={[-10, -10, -10]} intensity={0.5} />

                    <Text position={[-8, 3.5, 0]} fontSize={0.8} color="white" anchorX="center">
                        Reactants
                    </Text>
                    {reactants.map(({ key, molecule, index }) => (
                        <Molecule3D key={key} molecule={molecule} position={getMoleculePosition(index, reactants.length, 'left')} />
                    ))}
                    
                    <group position={[0,0,0]}>
                      <mesh rotation-z={Math.PI / 2}>
                        <cylinderGeometry args={[0.05, 0.05, 5]} />
                        <meshStandardMaterial color="white" />
                      </mesh>
                      <mesh position={[2.5, 0, 0]} rotation-z={-Math.PI / 4}>
                          <cylinderGeometry args={[0.05, 0.05, 1.5]} />
                          <meshStandardMaterial color="white" />
                      </mesh>
                      <mesh position={[2.5, 0, 0]} rotation-z={Math.PI / 4}>
                          <cylinderGeometry args={[0.05, 0.05, 1.5]} />
                          <meshStandardMaterial color="white" />
                      </mesh>
                    </group>

                    <Text position={[8, 3.5, 0]} fontSize={0.8} color="white" anchorX="center">
                        Products
                    </Text>
                    {products.map(({ key, molecule, index }) => (
                        <Molecule3D key={key} molecule={molecule} position={getMoleculePosition(index, products.length, 'right')} />
                    ))}

                    <OrbitControls enableZoom={true} />
                </Canvas>
            </div>
        </div>
    );
};

export default ReactionVisualizer;
