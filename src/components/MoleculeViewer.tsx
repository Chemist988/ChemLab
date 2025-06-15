
import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere } from '@react-three/drei';
import * as THREE from 'three';

const WaterMolecule = () => {
  const groupRef = useRef<THREE.Group>(null!);
  
  // Simple rotation for effect
  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.005;
    }
  });

  const bondAngle = 104.5 * (Math.PI / 180); // Convert degrees to radians
  const bondLength = 1.2;

  const h1Position: [number, number, number] = [
    bondLength * Math.sin(bondAngle / 2),
    bondLength * Math.cos(bondAngle / 2),
    0
  ];
  const h2Position: [number, number, number] = [
    -bondLength * Math.sin(bondAngle / 2),
    bondLength * Math.cos(bondAngle / 2),
    0
  ];

  return (
    <group ref={groupRef} rotation={[0.2, 0, 0]}>
      {/* Oxygen atom */}
      <Sphere args={[0.7, 32, 32]} position={[0, 0, 0]}>
        <meshStandardMaterial color="#ff4d4d" roughness={0.5} />
      </Sphere>
      {/* Hydrogen atom 1 */}
      <Sphere args={[0.4, 32, 32]} position={h1Position}>
        <meshStandardMaterial color="#ffffff" roughness={0.5} />
      </Sphere>
      {/* Hydrogen atom 2 */}
      <Sphere args={[0.4, 32, 32]} position={h2Position}>
        <meshStandardMaterial color="#ffffff" roughness={0.5} />
      </Sphere>
    </group>
  );
};

const MoleculeViewer = () => {
  return (
    <div className="w-full h-[500px] rounded-lg bg-gray-900/50 border border-border cursor-grab active:cursor-grabbing">
      <Canvas camera={{ position: [0, 1, 7], fov: 60 }}>
        <ambientLight intensity={1.5} />
        <directionalLight position={[5, 5, 5]} intensity={3} />
        <WaterMolecule />
        <OrbitControls enableZoom={true} />
      </Canvas>
    </div>
  );
};

export default MoleculeViewer;
