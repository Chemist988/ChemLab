
import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, Text } from '@react-three/drei';
import * as THREE from 'three';
import { Element } from '@/data/elements';
import ElectronOrbit from './ElectronOrbit';
import { getElementColor } from '@/utils/molecularUtils';

interface AtomVisualizationProps {
  element: Element;
  position: [number, number, number];
  selected: boolean;
  onClick: () => void;
}

const AtomVisualization: React.FC<AtomVisualizationProps> = ({ 
  element, 
  position, 
  selected, 
  onClick 
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current && selected) {
      meshRef.current.rotation.y += 0.02;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2) * 0.1;
    }
  });

  const atomicRadius = Math.max(0.3, Math.min(element.atomicNumber / 50, 1.5));
  const color = getElementColor(element.category);

  const handleClick = (event: any) => {
    if (event.stopPropagation) {
      event.stopPropagation();
    }
    onClick();
  };

  return (
    <group position={position}>
      <Sphere
        ref={meshRef}
        args={[atomicRadius, 32, 32]}
        onClick={handleClick}
      >
        <meshPhysicalMaterial
          color={color}
          metalness={0.1}
          roughness={0.1}
          transmission={0.9}
          thickness={0.5}
          clearcoat={1}
          clearcoatRoughness={0.1}
          ior={1.5}
        />
      </Sphere>
      
      {Array.from({ length: Math.min(3, Math.floor(element.atomicNumber / 10) + 1) }).map((_, i) => (
        <ElectronOrbit key={i} radius={atomicRadius + 0.5 + i * 0.3} speed={1 + i * 0.5} />
      ))}
      
      <Text
        position={[0, 0, atomicRadius + 0.2]}
        fontSize={0.3}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        {element.symbol}
      </Text>
    </group>
  );
};

export default AtomVisualization;
