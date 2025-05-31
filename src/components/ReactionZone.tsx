
import React, { useState, useEffect } from 'react';
import { useDrop } from 'react-dnd';
import { Element } from '../data/elements';
import ElementCard from './ElementCard';
import { simulateReaction, ReactionResult } from '../utils/reactionUtils';
import { toast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { RotateCw, TestTube, Zap, Flame, Droplets, Play } from 'lucide-react';

interface ReactionZoneProps {
  onElementClick: (element: Element) => void;
}

const ReactionZone: React.FC<ReactionZoneProps> = ({ onElementClick }) => {
  const [tube1Element, setTube1Element] = useState<Element | null>(null);
  const [tube2Element, setTube2Element] = useState<Element | null>(null);
  const [reaction, setReaction] = useState<ReactionResult | null>(null);
  const [isReacting, setIsReacting] = useState(false);
  const [gameScore, setGameScore] = useState(0);
  const [successfulReactions, setSuccessfulReactions] = useState(0);

  const [{ isOver: isOver1 }, drop1] = useDrop(() => ({
    accept: 'element',
    drop: (item: { element: Element }) => {
      if (!tube1Element) {
        setTube1Element(item.element);
        toast({
          title: `🧪 ${item.element.name} loaded into Tube 1`,
          description: "Ready for mixing!",
        });
      }
      return undefined;
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  const [{ isOver: isOver2 }, drop2] = useDrop(() => ({
    accept: 'element',
    drop: (item: { element: Element }) => {
      if (!tube2Element) {
        setTube2Element(item.element);
        toast({
          title: `🧪 ${item.element.name} loaded into Tube 2`,
          description: "Ready for mixing!",
        });
      }
      return undefined;
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  const triggerReaction = () => {
    if (!tube1Element || !tube2Element) return;
    
    setIsReacting(true);
    const result = simulateReaction(tube1Element, tube2Element);
    setReaction(result);

    // Update game score
    if (result.result !== "No Known Reaction") {
      const energyPoints = {
        low: 10,
        medium: 25,
        high: 50,
        explosive: 100
      };
      const points = energyPoints[result.energy];
      setGameScore(prev => prev + points);
      setSuccessfulReactions(prev => prev + 1);
      
      toast({
        title: `🎉 +${points} points!`,
        description: `Successful ${result.energy} energy reaction!`,
      });
    }

    // Reset after 3 seconds
    setTimeout(() => {
      setIsReacting(false);
      setTube1Element(null);
      setTube2Element(null);
      setReaction(null);
    }, 3000);
  };

  const clearTubes = () => {
    setTube1Element(null);
    setTube2Element(null);
    setReaction(null);
    setIsReacting(false);
  };

  const getEnergyColor = (energy: string) => {
    switch (energy) {
      case 'explosive': return '#ff0000';
      case 'high': return '#ff6600';
      case 'medium': return '#ffaa00';
      case 'low': return '#00aaff';
      default: return '#666666';
    }
  };

  return (
    <div className="space-y-6">
      {/* Game Stats */}
      <div className="bg-black/30 backdrop-blur-xl rounded-2xl p-4 border border-white/10">
        <div className="flex justify-between items-center">
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-400">{gameScore}</div>
            <div className="text-xs text-white/60">Score</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-400">{successfulReactions}</div>
            <div className="text-xs text-white/60">Reactions</div>
          </div>
          <div className="text-center">
            <Zap className="w-6 h-6 text-cyan-400 animate-pulse" />
            <div className="text-xs text-white/60">Lab</div>
          </div>
        </div>
      </div>

      {/* Dual Test Tube Setup */}
      <div className="grid grid-cols-2 gap-6">
        {/* Test Tube 1 */}
        <div className="space-y-4">
          <h4 className="text-lg font-bold text-white text-center flex items-center justify-center gap-2">
            <TestTube className="w-5 h-5 text-blue-400" />
            Tube A
          </h4>
          <div 
            ref={drop1}
            className={`
              relative h-80 rounded-2xl overflow-hidden transition-all duration-500 border-2
              ${isOver1 ? 'border-cyan-400 bg-cyan-500/20' : 'border-white/20 bg-black/20'}
            `}
          >
            {/* Test Tube Visualization */}
            <div className="absolute inset-4 flex justify-center">
              <div className="relative w-20 h-full">
                {/* Test Tube Body */}
                <div className="absolute bottom-0 w-full h-5/6 bg-gradient-to-t from-gray-800/50 to-transparent rounded-b-full border-2 border-gray-400/50">
                  
                  {/* Liquid with Element */}
                  {tube1Element && (
                    <div 
                      className="absolute bottom-0 w-full h-1/3 rounded-b-full transition-all duration-1000"
                      style={{
                        background: `linear-gradient(to top, ${tube1Element.category === 'alkali-metal' ? '#ef4444' : 
                          tube1Element.category === 'alkaline-earth-metal' ? '#f97316' :
                          tube1Element.category === 'transition-metal' ? '#3b82f6' :
                          tube1Element.category === 'nonmetal' ? '#10b981' :
                          tube1Element.category === 'halogen' ? '#06b6d4' :
                          tube1Element.category === 'noble-gas' ? '#a855f7' : '#9ca3af'}, transparent)`
                      }}
                    >
                      {/* Bubbling Animation */}
                      {[...Array(5)].map((_, i) => (
                        <div
                          key={i}
                          className="absolute w-1 h-1 bg-white/60 rounded-full animate-bounce"
                          style={{
                            left: `${20 + (i * 15)}%`,
                            bottom: `${Math.random() * 30}%`,
                            animationDelay: `${i * 0.3}s`,
                            animationDuration: '1.5s'
                          }}
                        />
                      ))}
                    </div>
                  )}
                  
                  {/* Test Tube Neck */}
                  <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-6 h-8 bg-gradient-to-t from-gray-800/50 to-gray-600/30 rounded-t-lg border-2 border-gray-400/50"></div>
                </div>
              </div>
            </div>

            {/* Element Display */}
            <div className="absolute top-4 left-4 right-4 text-center">
              {tube1Element ? (
                <ElementCard 
                  element={tube1Element} 
                  onClick={() => onElementClick(tube1Element)}
                  size="xs"
                  isDraggable={false}
                  className="mx-auto"
                />
              ) : (
                <div className="text-white/60 text-sm">
                  <TestTube className="mx-auto h-6 w-6 mb-2 text-blue-400" />
                  Drop element here
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Test Tube 2 */}
        <div className="space-y-4">
          <h4 className="text-lg font-bold text-white text-center flex items-center justify-center gap-2">
            <TestTube className="w-5 h-5 text-purple-400" />
            Tube B
          </h4>
          <div 
            ref={drop2}
            className={`
              relative h-80 rounded-2xl overflow-hidden transition-all duration-500 border-2
              ${isOver2 ? 'border-purple-400 bg-purple-500/20' : 'border-white/20 bg-black/20'}
            `}
          >
            {/* Test Tube Visualization */}
            <div className="absolute inset-4 flex justify-center">
              <div className="relative w-20 h-full">
                {/* Test Tube Body */}
                <div className="absolute bottom-0 w-full h-5/6 bg-gradient-to-t from-gray-800/50 to-transparent rounded-b-full border-2 border-gray-400/50">
                  
                  {/* Liquid with Element */}
                  {tube2Element && (
                    <div 
                      className="absolute bottom-0 w-full h-1/3 rounded-b-full transition-all duration-1000"
                      style={{
                        background: `linear-gradient(to top, ${tube2Element.category === 'alkali-metal' ? '#ef4444' : 
                          tube2Element.category === 'alkaline-earth-metal' ? '#f97316' :
                          tube2Element.category === 'transition-metal' ? '#3b82f6' :
                          tube2Element.category === 'nonmetal' ? '#10b981' :
                          tube2Element.category === 'halogen' ? '#06b6d4' :
                          tube2Element.category === 'noble-gas' ? '#a855f7' : '#9ca3af'}, transparent)`
                      }}
                    >
                      {/* Bubbling Animation */}
                      {[...Array(5)].map((_, i) => (
                        <div
                          key={i}
                          className="absolute w-1 h-1 bg-white/60 rounded-full animate-bounce"
                          style={{
                            left: `${20 + (i * 15)}%`,
                            bottom: `${Math.random() * 30}%`,
                            animationDelay: `${i * 0.3}s`,
                            animationDuration: '1.5s'
                          }}
                        />
                      ))}
                    </div>
                  )}
                  
                  {/* Test Tube Neck */}
                  <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-6 h-8 bg-gradient-to-t from-gray-800/50 to-gray-600/30 rounded-t-lg border-2 border-gray-400/50"></div>
                </div>
              </div>
            </div>

            {/* Element Display */}
            <div className="absolute top-4 left-4 right-4 text-center">
              {tube2Element ? (
                <ElementCard 
                  element={tube2Element} 
                  onClick={() => onElementClick(tube2Element)}
                  size="xs"
                  isDraggable={false}
                  className="mx-auto"
                />
              ) : (
                <div className="text-white/60 text-sm">
                  <TestTube className="mx-auto h-6 w-6 mb-2 text-purple-400" />
                  Drop element here
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Reaction Controls */}
      <div className="bg-black/30 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
        <div className="flex gap-4 justify-center">
          <Button 
            onClick={triggerReaction}
            disabled={!tube1Element || !tube2Element || isReacting}
            className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-bold py-3 px-6 rounded-xl flex items-center gap-2 text-lg"
          >
            <Play className="h-5 w-5" />
            {isReacting ? 'REACTING...' : 'MIX ELEMENTS'}
          </Button>
          
          <Button 
            variant="outline" 
            onClick={clearTubes}
            disabled={!tube1Element && !tube2Element}
            className="bg-red-500/20 hover:bg-red-500/30 border-red-500/50 text-white py-3 px-6 rounded-xl flex items-center gap-2"
          >
            <RotateCw className="h-4 w-4" /> 
            Clear
          </Button>
        </div>
      </div>

      {/* Reaction Result Display */}
      {reaction && (
        <div 
          className="bg-black/60 backdrop-blur-xl rounded-2xl p-6 border border-white/20 animate-fade-in"
          style={{ borderColor: getEnergyColor(reaction.energy) }}
        >
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-2 mb-4">
              {reaction.energy === 'explosive' && <Flame className="w-6 h-6 text-red-500 animate-bounce" />}
              {reaction.energy === 'high' && <Zap className="w-6 h-6 text-orange-500 animate-pulse" />}
              {reaction.gasProduced && <Droplets className="w-6 h-6 text-blue-400 animate-bounce" />}
            </div>
            
            <h3 className="text-2xl font-bold text-white">{reaction.result}</h3>
            <p className="text-white/80">{reaction.description}</p>
            
            <div className="flex justify-center items-center space-x-4 text-sm">
              <div className="flex items-center gap-2">
                <div 
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: getEnergyColor(reaction.energy) }}
                ></div>
                <span className="text-white/70 capitalize">{reaction.energy} Energy</span>
              </div>
              {reaction.gasProduced && (
                <span className="text-blue-400">Gas Produced</span>
              )}
              {reaction.precipitate && (
                <span className="text-yellow-400">Precipitate Formed</span>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Reaction Animation Overlay */}
      {isReacting && (
        <div className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center">
          <div className="relative">
            {/* Explosion Effect */}
            {[...Array(12)].map((_, i) => (
              <div
                key={i}
                className="absolute w-3 h-3 bg-yellow-400 rounded-full animate-ping"
                style={{
                  left: `${Math.cos((i * 30) * Math.PI / 180) * 100}px`,
                  top: `${Math.sin((i * 30) * Math.PI / 180) * 100}px`,
                  animationDelay: `${i * 0.1}s`,
                  animationDuration: '1s'
                }}
              />
            ))}
            <div className="w-20 h-20 bg-gradient-to-r from-yellow-400 to-red-500 rounded-full animate-pulse"></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReactionZone;
