
import { Element, knownReactions } from "../data/elements";

export interface ReactionResult {
  result: string;
  description: string;
  animationType: AnimationType;
}

export type AnimationType = 'combustion' | 'oxidation' | 'crystallization' | 'gasformation' | 'generic';

// Simulate a reaction between two elements
export const simulateReaction = (element1: Element, element2: Element): ReactionResult => {
  // Sort the elements by atomic number to ensure consistent lookup
  const [first, second] = [element1, element2].sort((a, b) => a.atomicNumber - b.atomicNumber);
  
  // Create a key for the reaction lookup
  const reactionKey = `${first.symbol}-${second.symbol}`;
  
  // Look up the reaction or return the default
  return knownReactions[reactionKey as keyof typeof knownReactions] || knownReactions.default;
};

// Get animation class based on reaction type
export const getAnimationClass = (animationType: AnimationType): string => {
  switch (animationType) {
    case 'combustion':
      return 'animate-reaction bg-orange-500/50';
    case 'oxidation':
      return 'animate-reaction bg-red-500/50';
    case 'crystallization':
      return 'animate-reaction bg-blue-500/50';
    case 'gasformation':
      return 'animate-reaction bg-green-500/50';
    case 'generic':
    default:
      return 'animate-reaction bg-purple-500/50';
  }
};
