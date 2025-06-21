
import React, { useState, useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree, ThreeEvent } from '@react-three/fiber';
import { OrbitControls, Text, Sphere, Line } from '@react-three/drei';
import * as THREE from 'three';
import { Element, elements } from '@/data/elements';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Atom, Zap, RotateCcw, Play, Pause } from 'lucide-react';

interface AtomProps {
  element: Element;
  position: [number, number, number];
  selected: boolean;
  onClick: () => void;
}

const AtomVisualization: React.FC<AtomProps> = ({ element, position, selected, onClick }) => {
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

const ElectronOrbit: React.FC<{ radius: number; speed: number }> = ({ radius, speed }) => {
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

const Bond: React.FC<{ start: [number, number, number]; end: [number, number, number] }> = ({ start, end }) => {
  const points = useMemo(() => [new THREE.Vector3(...start), new THREE.Vector3(...end)], [start, end]);
  
  return (
    <Line
      points={points}
      color="#ffff00"
      lineWidth={3}
    />
  );
};

const getElementColor = (category: string): string => {
  const colors: { [key: string]: string } = {
    'alkali-metal': '#ff6b6b',
    'alkaline-earth-metal': '#4ecdc4',
    'transition-metal': '#45b7d1',
    'post-transition-metal': '#f9ca24',
    'metalloid': '#6c5ce7',
    'nonmetal': '#a29bfe',
    'halogen': '#fd79a8',
    'noble-gas': '#fdcb6e',
    'lanthanide': '#74b9ff',
    'actinide': '#e17055',
    'unknown': '#636e72'
  };
  return colors[category] || '#636e72';
};

const MolecularLabPage = () => {
  const [selectedAtoms, setSelectedAtoms] = useState<Element[]>([]);
  const [isSimulating, setIsSimulating] = useState(false);
  const [selectedElement, setSelectedElement] = useState<Element | null>(null);
  const [atomPositions, setAtomPositions] = useState<[number, number, number][]>([]);

  const addAtom = (element: Element) => {
    if (selectedAtoms.length < 10) {
      const newPosition: [number, number, number] = [
        (Math.random() - 0.5) * 8,
        (Math.random() - 0.5) * 8,
        (Math.random() - 0.5) * 8
      ];
      setSelectedAtoms([...selectedAtoms, element]);
      setAtomPositions([...atomPositions, newPosition]);
      console.log(`Added ${element.name} at position:`, newPosition);
    }
  };

  const clearAll = () => {
    setSelectedAtoms([]);
    setAtomPositions([]);
    setSelectedElement(null);
    console.log('Cleared all atoms');
  };

  const handleAtomClick = (atom: Element) => {
    setSelectedElement(atom);
    console.log(`Selected atom: ${atom.name}`);
  };

  const commonElements = elements.slice(0, 20);

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold font-orbitron mb-4 bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
          3D Molecular Visualizer
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Build molecules in real-time 3D space with physics simulation and electron orbital visualization
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3">
          <Card className="h-[600px] liquid-glass">
            <CardContent className="p-0 h-full">
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
                    onClick={() => handleAtomClick(atom)}
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
                      <Bond
                        key={`bond-${i}-${i + j + 1}`}
                        start={pos1}
                        end={pos2}
                      />
                    ) : null;
                  })
                )}
                
                <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />
              </Canvas>
            </CardContent>
          </Card>
          
          <div className="flex gap-4 mt-4">
            <Button onClick={() => setIsSimulating(!isSimulating)} variant="default">
              {isSimulating ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
              {isSimulating ? 'Pause' : 'Simulate'}
            </Button>
            <Button onClick={clearAll} variant="outline">
              <RotateCcw className="w-4 h-4 mr-2" />
              Clear All
            </Button>
          </div>
        </div>

        <div className="space-y-6">
          <Card className="liquid-glass">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Atom className="w-5 h-5" />
                Element Palette
              </CardTitle>
              <CardDescription>
                Click elements to add them to your 3D space
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-4 gap-2">
                {commonElements.map((element) => (
                  <Button
                    key={element.id}
                    variant="outline"
                    size="sm"
                    onClick={() => addAtom(element)}
                    className="liquid-glass-button p-2 h-auto flex flex-col items-center gap-1"
                    disabled={selectedAtoms.length >= 10}
                  >
                    <span className="font-bold text-xs">{element.symbol}</span>
                    <span className="text-[0.6rem] opacity-70">{element.atomicNumber}</span>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

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
                  <span>
                    {selectedAtoms.reduce((bonds, _, i) => {
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
                    }, 0)}
                  </span>
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
      </div>
    </div>
  );
};

export default MolecularLabPage;
