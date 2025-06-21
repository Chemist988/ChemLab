
import React, { useState, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, Cylinder, Torus, Text } from '@react-three/drei';
import * as THREE from 'three';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Slider } from '@/components/ui/slider';
import { Dna, Droplets, Zap, Play, Pause, RotateCcw, Plus } from 'lucide-react';

const BioMolecule: React.FC<{ 
  type: 'dna' | 'protein' | 'enzyme' | 'virus';
  position: [number, number, number];
  selected: boolean;
  onClick: () => void;
}> = ({ type, position, selected, onClick }) => {
  const meshRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += selected ? 0.03 : 0.01;
      if (selected) {
        meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 3) * 0.2;
        meshRef.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 2) * 0.1);
      }
    }
  });

  const renderMolecule = () => {
    switch (type) {
      case 'dna':
        return (
          <group>
            <Torus args={[0.8, 0.1, 8, 32]} rotation={[Math.PI / 2, 0, 0]} onClick={onClick}>
              <meshPhysicalMaterial color="#4169E1" metalness={0.3} roughness={0.4} />
            </Torus>
            <Torus args={[0.8, 0.1, 8, 32]} rotation={[Math.PI / 2, 0, Math.PI / 4]} onClick={onClick}>
              <meshPhysicalMaterial color="#FF1493" metalness={0.3} roughness={0.4} />
            </Torus>
            {Array.from({ length: 8 }).map((_, i) => (
              <Sphere key={i} args={[0.05, 16, 16]} position={[
                Math.cos((i / 8) * Math.PI * 2) * 0.8,
                0,
                Math.sin((i / 8) * Math.PI * 2) * 0.8
              ]}>
                <meshPhysicalMaterial color={i % 2 === 0 ? "#32CD32" : "#FFD700"} />
              </Sphere>
            ))}
          </group>
        );
      case 'protein':
        return (
          <group>
            <Sphere args={[0.6, 32, 32]} onClick={onClick}>
              <meshPhysicalMaterial 
                color="#FF6347" 
                metalness={0.5} 
                roughness={0.3}
                transmission={0.3}
                thickness={0.5}
              />
            </Sphere>
            {Array.from({ length: 6 }).map((_, i) => (
              <Cylinder key={i} args={[0.05, 0.05, 0.8]} position={[
                Math.cos((i / 6) * Math.PI * 2) * 0.4,
                0,
                Math.sin((i / 6) * Math.PI * 2) * 0.4
              ]} rotation={[0, 0, Math.PI / 2]}>
                <meshPhysicalMaterial color="#8A2BE2" />
              </Cylinder>
            ))}
          </group>
        );
      case 'enzyme':
        return (
          <group>
            <Torus args={[0.5, 0.2, 16, 32]} onClick={onClick}>
              <meshPhysicalMaterial 
                color="#00CED1" 
                metalness={0.7} 
                roughness={0.2}
                emissive="#008B8B"
                emissiveIntensity={selected ? 0.3 : 0.1}
              />
            </Torus>
            <Sphere args={[0.3, 16, 16]}>
              <meshPhysicalMaterial color="#20B2AA" transparent opacity={0.7} />
            </Sphere>
          </group>
        );
      case 'virus':
        return (
          <group>
            <Sphere args={[0.4, 32, 32]} onClick={onClick}>
              <meshPhysicalMaterial 
                color="#DC143C" 
                metalness={0.4} 
                roughness={0.6}
                wireframe={selected}
              />
            </Sphere>
            {Array.from({ length: 12 }).map((_, i) => (
              <Cylinder key={i} args={[0.02, 0.02, 0.3]} position={[
                Math.cos((i / 12) * Math.PI * 2) * 0.4,
                0,
                Math.sin((i / 12) * Math.PI * 2) * 0.4
              ]} rotation={[
                Math.cos((i / 12) * Math.PI * 2) * Math.PI / 4,
                0,
                Math.sin((i / 12) * Math.PI * 2) * Math.PI / 4
              ]}>
                <meshPhysicalMaterial color="#B22222" />
              </Cylinder>
            ))}
          </group>
        );
    }
  };

  return (
    <group ref={meshRef} position={position}>
      {renderMolecule()}
      {selected && (
        <Text
          position={[0, 1.2, 0]}
          fontSize={0.2}
          color="white"
          anchorX="center"
          anchorY="middle"
        >
          {type.toUpperCase()}
        </Text>
      )}
    </group>
  );
};

const BioReactorPage = () => {
  const [molecules, setMolecules] = useState<Array<{
    id: string;
    type: 'dna' | 'protein' | 'enzyme' | 'virus';
    position: [number, number, number];
    activity: number;
  }>>([]);
  const [selectedMolecule, setSelectedMolecule] = useState<string | null>(null);
  const [isReacting, setIsReacting] = useState(false);
  const [temperature, setTemperature] = useState([37]);
  const [ph, setPh] = useState([7]);

  const bioTypes = [
    { type: 'dna' as const, name: 'DNA Helix', description: 'Genetic material carrier' },
    { type: 'protein' as const, name: 'Protein Complex', description: 'Functional biomolecule' },
    { type: 'enzyme' as const, name: 'Enzyme Catalyst', description: 'Biochemical catalyst' },
    { type: 'virus' as const, name: 'Virus Particle', description: 'Infectious agent' }
  ];

  const addMolecule = (type: typeof bioTypes[0]['type']) => {
    if (molecules.length < 10) {
      const newMolecule = {
        id: `${type}-${Date.now()}`,
        type,
        position: [
          (Math.random() - 0.5) * 8,
          (Math.random() - 0.5) * 8,
          (Math.random() - 0.5) * 8
        ] as [number, number, number],
        activity: Math.random() * 100
      };
      setMolecules([...molecules, newMolecule]);
    }
  };

  const clearAll = () => {
    setMolecules([]);
    setSelectedMolecule(null);
    setIsReacting(false);
  };

  const selectedMol = molecules.find(m => m.id === selectedMolecule);
  const averageActivity = molecules.length > 0 ? 
    molecules.reduce((sum, mol) => sum + mol.activity, 0) / molecules.length : 0;

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold font-orbitron mb-4 bg-gradient-to-r from-red-400 to-green-600 bg-clip-text text-transparent">
          Biological Reactor Chamber
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Simulate biological processes, molecular interactions, and biochemical reactions
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3">
          <Card className="h-[600px] liquid-glass">
            <CardContent className="p-0 h-full">
              <Canvas camera={{ position: [12, 12, 12], fov: 60 }}>
                <ambientLight intensity={0.3} />
                <pointLight position={[10, 10, 10]} intensity={0.8} color="#ffffff" />
                <pointLight position={[-10, -10, -10]} intensity={0.4} color="#ff6b6b" />
                <pointLight position={[0, 10, -10]} intensity={0.4} color="#4ecdc4" />
                
                {/* Reactor chamber visualization */}
                <Cylinder args={[4, 4, 8, 32]} position={[0, 0, 0]}>
                  <meshPhysicalMaterial 
                    color="#87CEEB" 
                    transparent 
                    opacity={0.1}
                    metalness={0.1}
                    roughness={0.9}
                  />
                </Cylinder>
                
                {molecules.map((molecule) => (
                  <BioMolecule
                    key={molecule.id}
                    type={molecule.type}
                    position={molecule.position}
                    selected={selectedMolecule === molecule.id}
                    onClick={() => setSelectedMolecule(molecule.id)}
                  />
                ))}
                
                <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />
              </Canvas>
            </CardContent>
          </Card>
          
          <div className="flex gap-4 mt-4">
            <Button onClick={() => setIsReacting(!isReacting)} variant="default">
              {isReacting ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
              {isReacting ? 'Stop Reaction' : 'Start Reaction'}
            </Button>
            <Button onClick={clearAll} variant="outline">
              <RotateCcw className="w-4 h-4 mr-2" />
              Clear Chamber
            </Button>
          </div>
        </div>

        <div className="space-y-6">
          <Card className="liquid-glass">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Dna className="w-5 h-5" />
                Bio Molecules
              </CardTitle>
              <CardDescription>
                Add biological components to the reactor
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-2">
                {bioTypes.map((bio) => (
                  <Button
                    key={bio.type}
                    variant="outline"
                    size="sm"
                    onClick={() => addMolecule(bio.type)}
                    className="liquid-glass-button justify-start h-auto py-3"
                    disabled={molecules.length >= 10}
                  >
                    <div className="text-left">
                      <div className="font-medium">{bio.name}</div>
                      <div className="text-xs opacity-70">{bio.description}</div>
                    </div>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="liquid-glass">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Droplets className="w-5 h-5" />
                Reaction Conditions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <label className="text-sm font-medium mb-2 block">Temperature: {temperature[0]}°C</label>
                <Slider
                  value={temperature}
                  onValueChange={setTemperature}
                  max={80}
                  min={0}
                  step={1}
                  className="liquid-glass"
                />
              </div>
              
              <div>
                <label className="text-sm font-medium mb-2 block">pH Level: {ph[0]}</label>
                <Slider
                  value={ph}
                  onValueChange={setPh}
                  max={14}
                  min={0}
                  step={0.1}
                  className="liquid-glass"
                />
              </div>
            </CardContent>
          </Card>

          {selectedMol && (
            <Card className="liquid-glass">
              <CardHeader>
                <CardTitle>Molecule Analysis</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="liquid-glass">
                    {selectedMol.type.toUpperCase()}
                  </Badge>
                </div>
                <Separator />
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Activity Level:</span>
                    <span>{selectedMol.activity.toFixed(1)}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Status:</span>
                    <Badge variant="outline" className="liquid-glass">
                      {selectedMol.activity > 70 ? 'Highly Active' : 
                       selectedMol.activity > 30 ? 'Active' : 'Low Activity'}
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
                Reactor Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Molecules:</span>
                  <span>{molecules.length}/10</span>
                </div>
                <div className="flex justify-between">
                  <span>Avg. Activity:</span>
                  <span>{averageActivity.toFixed(1)}%</span>
                </div>
                <div className="flex justify-between">
                  <span>Reaction:</span>
                  <Badge variant={isReacting ? "default" : "secondary"} className="liquid-glass">
                    {isReacting ? "Active" : "Idle"}
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span>Environment:</span>
                  <Badge variant="outline" className="liquid-glass">
                    {temperature[0] > 60 ? 'Hot' : temperature[0] > 20 ? 'Optimal' : 'Cold'}
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

export default BioReactorPage;
