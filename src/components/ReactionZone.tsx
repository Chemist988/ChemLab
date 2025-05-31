
import React, { useState, useEffect } from 'react';
import { useDrop } from 'react-dnd';
import { Element } from '../data/elements';
import ElementCard from './ElementCard';
import TestTube from './TestTube';
import { simulateReaction, ReactionResult } from '../utils/reactionUtils';
import { toast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { RotateCw, Play, Zap, Flame, Droplets } from 'lucide-react';

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
    accept: ['element', 'test-tube'],
    drop: (item: { element: Element }) => {
      if (!tube1Element && item.element) {
        setTube1Element(item.element);
        toast({
          title: `${item.element.name} added to Test Tube A`,
          description: "Ready for reaction!",
        });
      }
      return undefined;
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  const [{ isOver: isOver2 }, drop2] = useDrop(() => ({
    accept: ['element', 'test-tube'],
    drop: (item: { element: Element }) => {
      if (!tube2Element && item.element) {
        setTube2Element(item.element);
        toast({
          title: `${item.element.name} added to Test Tube B`,
          description: "Ready for reaction!",
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
        title: `+${points} points!`,
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

  return (
    <div className="space-y-8">
      {/* Game Stats */}
      <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-blue-600">{gameScore}</div>
            <div className="text-sm text-gray-600">Score</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-green-600">{successfulReactions}</div>
            <div className="text-sm text-gray-600">Reactions</div>
          </div>
          <div>
            <Zap className="w-6 h-6 text-purple-600 mx-auto" />
            <div className="text-sm text-gray-600">Lab Active</div>
          </div>
        </div>
      </div>

      {/* Test Tube Area */}
      <div className="grid grid-cols-2 gap-8">
        {/* Test Tube A */}
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-gray-900 text-center">Test Tube A</h4>
          <div 
            ref={drop1}
            className={`
              p-8 rounded-2xl border-2 border-dashed transition-all duration-300 min-h-[200px] flex items-center justify-center
              ${isOver1 ? 'border-blue-400 bg-blue-50' : 'border-gray-300 bg-gray-50'}
            `}
          >
            <TestTube element={tube1Element} isEmpty={!tube1Element} />
          </div>
        </div>

        {/* Test Tube B */}
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-gray-900 text-center">Test Tube B</h4>
          <div 
            ref={drop2}
            className={`
              p-8 rounded-2xl border-2 border-dashed transition-all duration-300 min-h-[200px] flex items-center justify-center
              ${isOver2 ? 'border-green-400 bg-green-50' : 'border-gray-300 bg-gray-50'}
            `}
          >
            <TestTube element={tube2Element} isEmpty={!tube2Element} />
          </div>
        </div>
      </div>

      {/* Reaction Controls */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6">
        <div className="flex gap-4 justify-center">
          <Button 
            onClick={triggerReaction}
            disabled={!tube1Element || !tube2Element || isReacting}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl flex items-center gap-2 font-semibold"
          >
            <Play className="h-5 w-5" />
            {isReacting ? 'REACTING...' : 'START REACTION'}
          </Button>
          
          <Button 
            variant="outline" 
            onClick={clearTubes}
            disabled={!tube1Element && !tube2Element}
            className="border-gray-300 text-gray-700 hover:bg-gray-50 px-6 py-3 rounded-xl flex items-center gap-2"
          >
            <RotateCw className="h-4 w-4" /> 
            Clear
          </Button>
        </div>
      </div>

      {/* Reaction Result */}
      {reaction && (
        <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-lg animate-fade-in">
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-3 mb-6">
              {reaction.energy === 'explosive' && <Flame className="w-8 h-8 text-red-500 animate-bounce" />}
              {reaction.energy === 'high' && <Zap className="w-8 h-8 text-orange-500 animate-pulse" />}
              {reaction.gasProduced && <Droplets className="w-8 h-8 text-blue-500" />}
            </div>
            
            <h3 className="text-3xl font-bold text-gray-900 mb-4">{reaction.result}</h3>
            <p className="text-gray-600 text-lg leading-relaxed max-w-2xl mx-auto">{reaction.description}</p>
            
            <div className="flex justify-center items-center space-x-6 mt-6 text-sm">
              <div className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full">
                <div 
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: reaction.color }}
                ></div>
                <span className="text-gray-700 capitalize font-medium">{reaction.energy} Energy</span>
              </div>
              {reaction.gasProduced && (
                <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full font-medium">Gas Produced</span>
              )}
              {reaction.precipitate && (
                <span className="bg-yellow-100 text-yellow-700 px-4 py-2 rounded-full font-medium">Precipitate Formed</span>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Reaction Animation Overlay */}
      {isReacting && (
        <div className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center">
          <div className="relative">
            {/* Explosion particles */}
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="absolute w-4 h-4 bg-gradient-to-r from-yellow-400 to-red-500 rounded-full animate-ping"
                style={{
                  left: `${Math.cos((i * 45) * Math.PI / 180) * 80}px`,
                  top: `${Math.sin((i * 45) * Math.PI / 180) * 80}px`,
                  animationDelay: `${i * 0.1}s`,
                  animationDuration: '1.5s'
                }}
              />
            ))}
            <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full animate-pulse"></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReactionZone;
