
import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere } from '@react-three/drei';
import * as THREE from 'three';

interface ElectronOrbitProps {
  radius: number;
  speed: number;
}

const ElectronOrbit: React.FC<ElectronOrbitProps> = ({ radius, speed }) => {
  const electronRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (electronRef.current) {
      const time = state.clock.elapsedTime * speed;
      electronRef.current.position.x = Math.cos(time) * radius;
      electronRef.current.position.z = Math.sin(time) * radius;
    }
  });

  return (
    <>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[radius - 0.01, radius + 0.01, 64]} />
        <meshBasicMaterial color="#444" transparent opacity={0.3} />
      </mesh>
      
      <Sphere ref={electronRef} args={[0.05, 16, 16]} position={[radius, 0, 0]}>
        <meshBasicMaterial color="#00ffff" />
      </Sphere>
    </>
  );
};

export default ElectronOrbit;
