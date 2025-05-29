
import React, { useState, useEffect } from 'react';
import { useDrop } from 'react-dnd';
import { Element } from '../data/elements';
import ElementCard from './ElementCard';
import { simulateReaction, ReactionResult } from '../utils/reactionUtils';
import { toast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { RotateCw, TestTube, Zap, Flame, Droplets } from 'lucide-react';

interface ReactionZoneProps {
  onElementClick: (element: Element) => void;
}

const ReactionZone: React.FC<ReactionZoneProps> = ({ onElementClick }) => {
  const [selectedElements, setSelectedElements] = useState<Element[]>([]);
  const [reaction, setReaction] = useState<ReactionResult | null>(null);
  const [isReacting, setIsReacting] = useState(false);
  const [particles, setParticles] = useState<Array<{id: number, x: number, y: number}>>([]);

  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'element',
    drop: (item: { element: Element }) => {
      addElement(item.element);
      return undefined;
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  const addElement = (element: Element) => {
    if (selectedElements.length < 2) {
      setSelectedElements((prev) => [...prev, element]);
      
      toast({
        title: `🧪 ${element.name} added`,
        description: "Element loaded into reaction chamber",
      });
    } else {
      toast({
        title: "⚗️ Chamber full",
        description: "Only 2 elements allowed. Clear to add more.",
      });
    }
  };

  const clearReaction = () => {
    setSelectedElements([]);
    setReaction(null);
    setIsReacting(false);
    setParticles([]);
  };

  const triggerReactionAnimation = () => {
    setIsReacting(true);
    
    // Create explosion particles
    const newParticles = [];
    for (let i = 0; i < 15; i++) {
      newParticles.push({
        id: Date.now() + i,
        x: Math.random() * 200 - 100,
        y: Math.random() * 200 - 100
      });
    }
    setParticles(newParticles);

    // Clear particles after animation
    setTimeout(() => {
      setParticles([]);
      setIsReacting(false);
    }, 2000);
  };

  useEffect(() => {
    if (selectedElements.length === 2) {
      const result = simulateReaction(selectedElements[0], selectedElements[1]);
      setReaction(result);
      
      if (result.result !== "No Known Reaction") {
        triggerReactionAnimation();
      }
    } else {
      setReaction(null);
    }
  }, [selectedElements]);

  const getReactionColor = () => {
    if (!reaction) return 'from-blue-500/20 to-purple-500/20';
    if (reaction.result === "No Known Reaction") return 'from-gray-500/20 to-gray-600/20';
    return 'from-green-500/20 via-yellow-500/20 to-red-500/20';
  };

  return (
    <div className="space-y-6">
      {/* Test Tube Container */}
      <div 
        ref={drop}
        className={`
          relative h-80 rounded-2xl overflow-hidden transition-all duration-500
          ${isOver ? 'bg-cyan-500/20 border-2 border-cyan-400' : 'bg-gradient-to-b from-black/20 to-black/40 border border-white/10'}
        `}
      >
        {/* Test Tube Structure */}
        <div className="absolute inset-4 flex justify-center">
          <div className="relative w-32 h-full">
            {/* Main Test Tube Body */}
            <div className="absolute bottom-0 w-full h-5/6 bg-gradient-to-t from-gray-800/50 to-transparent rounded-b-full border-2 border-gray-500/50">
              
              {/* Liquid Level */}
              {selectedElements.length > 0 && (
                <div 
                  className={`
                    absolute bottom-0 w-full rounded-b-full transition-all duration-1000 overflow-hidden
                    ${selectedElements.length === 1 ? 'h-1/4' : selectedElements.length === 2 ? 'h-1/2' : ''}
                    bg-gradient-to-t ${getReactionColor()}
                  `}
                >
                  {/* Bubbling Animation */}
                  {reaction && reaction.result !== "No Known Reaction" && (
                    <>
                      {[...Array(8)].map((_, i) => (
                        <div
                          key={i}
                          className="absolute w-2 h-2 bg-white/60 rounded-full animate-bounce"
                          style={{
                            left: `${20 + (i * 10)}%`,
                            bottom: `${Math.random() * 50}%`,
                            animationDelay: `${i * 0.2}s`,
                            animationDuration: '1s'
                          }}
                        />
                      ))}
                    </>
                  )}
                  
                  {/* Liquid Surface Effect */}
                  <div className="absolute top-0 w-full h-2 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
                </div>
              )}
              
              {/* Test Tube Neck */}
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 w-8 h-12 bg-gradient-to-t from-gray-800/50 to-gray-600/30 rounded-t-lg border-2 border-gray-500/50"></div>
            </div>

            {/* Reaction Particles */}
            {particles.map(particle => (
              <div
                key={particle.id}
                className="absolute w-1 h-1 bg-yellow-400 rounded-full animate-ping"
                style={{
                  left: '50%',
                  top: '50%',
                  transform: `translate(${particle.x}px, ${particle.y}px)`,
                  animationDuration: '0.5s'
                }}
              />
            ))}
          </div>
        </div>

        {/* Element Display Area */}
        <div className="absolute top-4 left-4 right-4 flex justify-center items-center space-x-4">
          {selectedElements.length === 0 ? (
            <div className="text-center text-white/60">
              <TestTube className="mx-auto h-8 w-8 mb-2 text-cyan-400" />
              <p className="text-sm">Drop elements here to react</p>
              <div className="flex justify-center space-x-2 mt-2">
                <Zap className="w-4 h-4 text-yellow-400 animate-pulse" />
                <Flame className="w-4 h-4 text-red-400 animate-pulse" />
                <Droplets className="w-4 h-4 text-blue-400 animate-pulse" />
              </div>
            </div>
          ) : (
            <div className="flex items-center space-x-3">
              {selectedElements.map((element, index) => (
                <div key={index} className="relative">
                  <ElementCard 
                    element={element} 
                    onClick={() => onElementClick(element)}
                    size="xs"
                    isDraggable={false}
                    className="transform hover:scale-110 transition-transform shadow-lg"
                  />
                  {isReacting && (
                    <div className="absolute inset-0 bg-yellow-400/30 rounded-xl animate-ping"></div>
                  )}
                </div>
              ))}
              {selectedElements.length === 1 && (
                <div className="w-9 h-9 border-2 border-dashed border-cyan-400/50 rounded-xl flex items-center justify-center animate-pulse">
                  <span className="text-xs text-cyan-400">+1</span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Reaction Result Display */}
        {reaction && selectedElements.length === 2 && (
          <div className="absolute bottom-4 left-4 right-4 bg-black/60 backdrop-blur-sm rounded-xl p-4 border border-white/20">
            <div className="text-center">
              <h4 className="text-lg font-bold text-white mb-1">{reaction.result}</h4>
              <p className="text-xs text-white/70">{reaction.description}</p>
              
              {reaction.result !== "No Known Reaction" && (
                <div className="flex justify-center items-center space-x-2 mt-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-xs text-green-400 font-medium">Reaction Successful!</span>
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Glow Effect for Active Reactions */}
        {isReacting && (
          <div className="absolute inset-0 bg-gradient-to-t from-yellow-400/20 via-transparent to-transparent animate-pulse pointer-events-none"></div>
        )}
      </div>

      {/* Control Panel */}
      <div className="bg-black/20 backdrop-blur-sm rounded-xl p-4 border border-white/10">
        <Button 
          variant="outline" 
          onClick={clearReaction}
          disabled={selectedElements.length === 0}
          className="w-full bg-red-500/20 hover:bg-red-500/30 border-red-500/50 text-white flex items-center justify-center space-x-2"
        >
          <RotateCw className="h-4 w-4" /> 
          <span>Clear Chamber</span>
        </Button>
        
        {selectedElements.length === 2 && (
          <div className="mt-3 text-center">
            <div className="inline-flex items-center space-x-2 bg-blue-500/20 px-3 py-1 rounded-full">
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-ping"></div>
              <span className="text-xs text-blue-400 font-medium">Ready to React</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReactionZone;
