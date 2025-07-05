import React, { useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, MeshTransmissionMaterial } from '@react-three/drei';
import * as THREE from 'three';

interface Beaker3DProps {
  liquidHeight: number;
  liquidColor: string;
  isAnimating: boolean;
  bubbles: number[];
}

const BeakerMesh: React.FC<Beaker3DProps> = ({ liquidHeight, liquidColor, isAnimating, bubbles }) => {
  const beakerRef = useRef<THREE.Mesh>(null);
  const liquidRef = useRef<THREE.Mesh>(null);
  
  // Create beaker geometry
  const beakerGeometry = useMemo(() => {
    const shape = new THREE.Shape();
    // Beaker outline
    shape.moveTo(-1, -2);
    shape.lineTo(-1, 1.5);
    shape.lineTo(-0.8, 1.8);
    shape.lineTo(0.8, 1.8);
    shape.lineTo(1, 1.5);
    shape.lineTo(1, -2);
    
    // Inner hole
    const hole = new THREE.Path();
    hole.moveTo(-0.9, -1.9);
    hole.lineTo(-0.9, 1.4);
    hole.lineTo(0.9, 1.4);
    hole.lineTo(0.9, -1.9);
    shape.holes.push(hole);
    
    const extrudeSettings = {
      depth: 0.1,
      bevelEnabled: true,
      bevelSegments: 8,
      steps: 1,
      bevelSize: 0.02,
      bevelThickness: 0.02,
    };
    
    return new THREE.ExtrudeGeometry(shape, extrudeSettings);
  }, []);
  
  // Create liquid geometry
  const liquidGeometry = useMemo(() => {
    const height = liquidHeight * 3 - 1.8; // Scale to beaker height
    return new THREE.CylinderGeometry(0.85, 0.85, Math.max(0.1, height), 32);
  }, [liquidHeight]);
  
  // Animation
  useFrame((state) => {
    if (liquidRef.current && isAnimating) {
      liquidRef.current.rotation.y += 0.01;
      liquidRef.current.position.y = Math.sin(state.clock.elapsedTime * 2) * 0.1 - 0.5;
    }
  });
  
  return (
    <group>
      {/* Beaker glass */}
      <mesh ref={beakerRef} geometry={beakerGeometry} position={[0, 0, 0]} rotation={[0, 0, 0]}>
        <MeshTransmissionMaterial
          transmission={0.9}
          thickness={0.1}
          roughness={0.1}
          ior={1.52}
          chromaticAberration={0.02}
          backside={false}
        />
      </mesh>
      
      {/* Liquid */}
      {liquidHeight > 0.1 && (
        <mesh ref={liquidRef} geometry={liquidGeometry} position={[0, -0.5, 0]}>
          <meshStandardMaterial
            color={liquidColor}
            transparent
            opacity={0.8}
            emissive={liquidColor}
            emissiveIntensity={0.1}
          />
        </mesh>
      )}
      
      {/* Bubbles */}
      {bubbles.slice(0, 10).map((bubble, index) => (
        <mesh
          key={index}
          position={[
            (Math.random() - 0.5) * 1.5,
            -1.5 + bubble * 2.5,
            (Math.random() - 0.5) * 0.2
          ]}
        >
          <sphereGeometry args={[0.05, 8, 8]} />
          <meshStandardMaterial
            color="#ffffff"
            transparent
            opacity={0.6}
          />
        </mesh>
      ))}
    </group>
  );
};

const Beaker3D: React.FC<Beaker3DProps> = (props) => {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        style={{ background: 'transparent' }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.4} />
          <directionalLight position={[5, 5, 5]} intensity={0.8} />
          <pointLight position={[-5, -5, -5]} intensity={0.3} />
          
          <BeakerMesh {...props} />
          
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={Math.PI / 4}
          />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default Beaker3D;