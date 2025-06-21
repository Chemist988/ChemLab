
import React, { useState, useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, Line, Text } from '@react-three/drei';
import * as THREE from 'three';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Zap, Play, Pause, RotateCcw, Atom } from 'lucide-react';

const QuantumParticle: React.FC<{ position: [number, number, number]; waveFunction: number; energy: number }> = ({ 
  position, waveFunction, energy 
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.elapsedTime;
      meshRef.current.position.y = position[1] + Math.sin(time * waveFunction) * 0.5;
      meshRef.current.scale.setScalar(0.5 + Math.sin(time * energy) * 0.3);
      meshRef.current.rotation.y += 0.02;
    }
  });

  return (
    <group position={position}>
      <Sphere ref={meshRef} args={[0.2, 32, 32]}>
        <meshPhysicalMaterial
          color={`hsl(${energy * 60}, 100%, 60%)`}
          metalness={0.8}
          roughness={0.1}
          transmission={0.7}
          thickness={0.3}
          clearcoat={1}
          emissive={`hsl(${energy * 60}, 100%, 30%)`}
          emissiveIntensity={0.5}
        />
      </Sphere>
      
      {/* Quantum field visualization */}
      <mesh>
        <sphereGeometry args={[1, 16, 16]} />
        <meshBasicMaterial 
          color={`hsl(${energy * 60}, 100%, 50%)`}
          transparent 
          opacity={0.1}
          wireframe
        />
      </mesh>
    </group>
  );
};

const WaveFunction: React.FC<{ amplitude: number; frequency: number }> = ({ amplitude, frequency }) => {
  const points = [];
  for (let i = 0; i <= 100; i++) {
    const x = (i / 100) * 10 - 5;
    const y = Math.sin(x * frequency) * amplitude;
    points.push(new THREE.Vector3(x, y, 0));
  }

  return (
    <Line
      points={points}
      color="#00ffff"
      lineWidth={3}
    />
  );
};

const QuantumSimulatorPage = () => {
  const [isSimulating, setIsSimulating] = useState(false);
  const [energy, setEnergy] = useState([50]);
  const [waveFunction, setWaveFunction] = useState([3]);
  const [particles, setParticles] = useState<Array<{
    position: [number, number, number];
    energy: number;
    waveFunction: number;
  }>>([]);

  const addParticle = () => {
    if (particles.length < 8) {
      const newParticle = {
        position: [
          (Math.random() - 0.5) * 6,
          (Math.random() - 0.5) * 6,
          (Math.random() - 0.5) * 6
        ] as [number, number, number],
        energy: energy[0] / 10,
        waveFunction: waveFunction[0]
      };
      setParticles([...particles, newParticle]);
    }
  };

  const clearAll = () => {
    setParticles([]);
    setIsSimulating(false);
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold font-orbitron mb-4 bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent">
          Quantum Physics Simulator
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Visualize quantum mechanics, wave functions, and particle behavior in real-time 3D space
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3">
          <Card className="h-[600px] liquid-glass">
            <CardContent className="p-0 h-full">
              <Canvas camera={{ position: [8, 8, 8], fov: 60 }}>
                <ambientLight intensity={0.2} />
                <pointLight position={[10, 10, 10]} intensity={0.8} color="#00ffff" />
                <pointLight position={[-10, -10, -10]} intensity={0.5} color="#ff00ff" />
                
                {particles.map((particle, index) => (
                  <QuantumParticle
                    key={index}
                    position={particle.position}
                    waveFunction={particle.waveFunction}
                    energy={particle.energy}
                  />
                ))}
                
                <WaveFunction amplitude={energy[0] / 100} frequency={waveFunction[0] / 2} />
                
                <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />
              </Canvas>
            </CardContent>
          </Card>
          
          <div className="flex gap-4 mt-4">
            <Button onClick={() => setIsSimulating(!isSimulating)} variant="default">
              {isSimulating ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
              {isSimulating ? 'Pause' : 'Simulate'}
            </Button>
            <Button onClick={addParticle} variant="outline" disabled={particles.length >= 8}>
              <Atom className="w-4 h-4 mr-2" />
              Add Particle
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
                <Zap className="w-5 h-5" />
                Quantum Controls
              </CardTitle>
              <CardDescription>
                Adjust quantum properties and observe changes
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <label className="text-sm font-medium mb-2 block">Energy Level: {energy[0]}%</label>
                <Slider
                  value={energy}
                  onValueChange={setEnergy}
                  max={100}
                  min={1}
                  step={1}
                  className="liquid-glass"
                />
              </div>
              
              <div>
                <label className="text-sm font-medium mb-2 block">Wave Frequency: {waveFunction[0]}Hz</label>
                <Slider
                  value={waveFunction}
                  onValueChange={setWaveFunction}
                  max={10}
                  min={1}
                  step={0.5}
                  className="liquid-glass"
                />
              </div>
            </CardContent>
          </Card>

          <Card className="liquid-glass">
            <CardHeader>
              <CardTitle>Quantum Stats</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Active Particles:</span>
                  <span>{particles.length}/8</span>
                </div>
                <div className="flex justify-between">
                  <span>Energy State:</span>
                  <Badge variant="outline" className="liquid-glass">
                    {energy[0] > 70 ? 'High' : energy[0] > 30 ? 'Medium' : 'Low'}
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span>Wave Coherence:</span>
                  <Badge variant="outline" className="liquid-glass">
                    {waveFunction[0] > 7 ? 'Stable' : 'Fluctuating'}
                  </Badge>
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

export default QuantumSimulatorPage;
