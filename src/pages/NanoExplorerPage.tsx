
import React, { useState, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, Box, Cylinder, Text } from '@react-three/drei';
import * as THREE from 'three';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Microscope, Zap, Play, Pause, RotateCcw, Search } from 'lucide-react';

const NanoStructure: React.FC<{ 
  type: 'carbon-nanotube' | 'fullerene' | 'graphene' | 'quantum-dot';
  position: [number, number, number];
  selected: boolean;
  onClick: () => void;
}> = ({ type, position, selected, onClick }) => {
  const meshRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += selected ? 0.02 : 0.005;
      if (selected) {
        meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2) * 0.1;
      }
    }
  });

  const renderStructure = () => {
    switch (type) {
      case 'carbon-nanotube':
        return (
          <>
            <Cylinder args={[0.3, 0.3, 2, 16]} onClick={onClick}>
              <meshPhysicalMaterial color="#444444" metalness={0.8} roughness={0.2} />
            </Cylinder>
            {Array.from({ length: 12 }).map((_, i) => (
              <Sphere key={i} args={[0.1, 16, 16]} position={[
                Math.cos((i / 12) * Math.PI * 2) * 0.3,
                (i % 4 - 2) * 0.3,
                Math.sin((i / 12) * Math.PI * 2) * 0.3
              ]}>
                <meshPhysicalMaterial color="#222222" />
              </Sphere>
            ))}
          </>
        );
      case 'fullerene':
        return (
          <Sphere args={[0.5, 32, 32]} onClick={onClick}>
            <meshPhysicalMaterial 
              color="#8B4513" 
              metalness={0.6} 
              roughness={0.3}
              wireframe={selected}
            />
          </Sphere>
        );
      case 'graphene':
        return (
          <Box args={[1.5, 0.05, 1.5]} onClick={onClick}>
            <meshPhysicalMaterial 
              color="#708090" 
              metalness={0.9} 
              roughness={0.1}
              transmission={0.8}
              thickness={0.1}
            />
          </Box>
        );
      case 'quantum-dot':
        return (
          <Sphere args={[0.2, 32, 32]} onClick={onClick}>
            <meshPhysicalMaterial 
              color="#FF6347" 
              emissive="#FF4500"
              emissiveIntensity={selected ? 0.8 : 0.3}
              metalness={0.5}
              roughness={0.2}
            />
          </Sphere>
        );
    }
  };

  return (
    <group ref={meshRef} position={position}>
      {renderStructure()}
      {selected && (
        <Text
          position={[0, 1, 0]}
          fontSize={0.2}
          color="white"
          anchorX="center"
          anchorY="middle"
        >
          {type.replace('-', ' ').toUpperCase()}
        </Text>
      )}
    </group>
  );
};

const NanoExplorerPage = () => {
  const [structures, setStructures] = useState<Array<{
    id: string;
    type: 'carbon-nanotube' | 'fullerene' | 'graphene' | 'quantum-dot';
    position: [number, number, number];
    properties: { size: string; conductivity: string; strength: string };
  }>>([]);
  const [selectedStructure, setSelectedStructure] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);

  const nanoTypes = [
    { 
      type: 'carbon-nanotube' as const, 
      name: 'Carbon Nanotube',
      properties: { size: '1-2 nm', conductivity: 'High', strength: 'Ultra-high' }
    },
    { 
      type: 'fullerene' as const, 
      name: 'Fullerene (C60)',
      properties: { size: '0.7 nm', conductivity: 'Moderate', strength: 'High' }
    },
    { 
      type: 'graphene' as const, 
      name: 'Graphene Sheet',
      properties: { size: '0.34 nm thick', conductivity: 'Excellent', strength: 'Ultimate' }
    },
    { 
      type: 'quantum-dot' as const, 
      name: 'Quantum Dot',
      properties: { size: '2-10 nm', conductivity: 'Tunable', strength: 'Moderate' }
    }
  ];

  const addStructure = (type: typeof nanoTypes[0]['type']) => {
    if (structures.length < 12) {
      const newStructure = {
        id: `${type}-${Date.now()}`,
        type,
        position: [
          (Math.random() - 0.5) * 8,
          (Math.random() - 0.5) * 8,
          (Math.random() - 0.5) * 8
        ] as [number, number, number],
        properties: nanoTypes.find(nt => nt.type === type)?.properties || { size: '', conductivity: '', strength: '' }
      };
      setStructures([...structures, newStructure]);
    }
  };

  const clearAll = () => {
    setStructures([]);
    setSelectedStructure(null);
    setIsScanning(false);
  };

  const selectedStruct = structures.find(s => s.id === selectedStructure);

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold font-orbitron mb-4 bg-gradient-to-r from-green-400 to-blue-600 bg-clip-text text-transparent">
          Nano-Scale Explorer
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Explore nanomaterials, their properties, and atomic-scale structures in 3D
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3">
          <Card className="h-[600px] liquid-glass">
            <CardContent className="p-0 h-full">
              <Canvas camera={{ position: [10, 10, 10], fov: 60 }}>
                <ambientLight intensity={0.4} />
                <pointLight position={[10, 10, 10]} intensity={1} color="#ffffff" />
                <pointLight position={[-10, -10, -10]} intensity={0.5} color="#00ffff" />
                
                {structures.map((structure) => (
                  <NanoStructure
                    key={structure.id}
                    type={structure.type}
                    position={structure.position}
                    selected={selectedStructure === structure.id}
                    onClick={() => setSelectedStructure(structure.id)}
                  />
                ))}
                
                <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />
              </Canvas>
            </CardContent>
          </Card>
          
          <div className="flex gap-4 mt-4">
            <Button onClick={() => setIsScanning(!isScanning)} variant="default">
              {isScanning ? <Pause className="w-4 h-4 mr-2" /> : <Search className="w-4 h-4 mr-2" />}
              {isScanning ? 'Stop Scan' : 'Start Scan'}
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
                <Microscope className="w-5 h-5" />
                Nano Structures
              </CardTitle>
              <CardDescription>
                Add nanomaterials to explore their properties
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-2">
                {nanoTypes.map((nano) => (
                  <Button
                    key={nano.type}
                    variant="outline"
                    size="sm"
                    onClick={() => addStructure(nano.type)}
                    className="liquid-glass-button justify-start"
                    disabled={structures.length >= 12}
                  >
                    {nano.name}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          {selectedStruct && (
            <Card className="liquid-glass">
              <CardHeader>
                <CardTitle>Structure Analysis</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="liquid-glass">
                    {selectedStruct.type.replace('-', ' ')}
                  </Badge>
                </div>
                <Separator />
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Size:</span>
                    <span>{selectedStruct.properties.size}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Conductivity:</span>
                    <Badge variant="outline" className="liquid-glass">
                      {selectedStruct.properties.conductivity}
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Strength:</span>
                    <Badge variant="outline" className="liquid-glass">
                      {selectedStruct.properties.strength}
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
                Nano Stats
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Structures:</span>
                  <span>{structures.length}/12</span>
                </div>
                <div className="flex justify-between">
                  <span>Scale:</span>
                  <Badge variant="outline" className="liquid-glass">
                    Nanometer
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span>Scanner:</span>
                  <Badge variant={isScanning ? "default" : "secondary"} className="liquid-glass">
                    {isScanning ? "Active" : "Idle"}
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

export default NanoExplorerPage;
