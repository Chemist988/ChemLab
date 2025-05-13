
import { Element } from '../data/elements';

// Define animation types
export type AnimationType = 'explosion' | 'fade' | 'bubble' | 'gas';

export interface ReactionResult {
  result: string;
  description: string;
  animationType: AnimationType;
}

// Use this function to get the appropriate animation class
export const getAnimationClass = (animationType: AnimationType): string => {
  switch (animationType) {
    case 'explosion':
      return 'animate-reaction';
    case 'gas':
      return 'animate-fade-in';
    case 'fade':
      return 'animate-fade-in';
    case 'bubble':
      return 'animate-bounce-subtle';
    default:
      return '';
  }
};

// Simulate chemical reactions between elements
export const simulateReaction = (element1: Element, element2: Element): ReactionResult => {
  const combo = `${element1.symbol}-${element2.symbol}`;
  
  // Predefined reactions
  switch (combo) {
    // Hydrogen + Oxygen
    case 'H-O':
    case 'O-H':
      return {
        result: 'H₂O (Water)',
        description: 'Hydrogen and oxygen combine to form water molecules.',
        animationType: 'bubble'
      };
    
    // Sodium + Chlorine
    case 'Na-Cl':
    case 'Cl-Na':
      return {
        result: 'NaCl (Table Salt)',
        description: 'Sodium and chlorine form ionic bonds to create table salt.',
        animationType: 'explosion'
      };
    
    // Carbon + Oxygen
    case 'C-O':
    case 'O-C':
      return {
        result: 'CO₂ (Carbon Dioxide)',
        description: 'Carbon and oxygen form carbon dioxide, a greenhouse gas.',
        animationType: 'gas'
      };
    
    // Hydrogen + Chlorine
    case 'H-Cl':
    case 'Cl-H':
      return {
        result: 'HCl (Hydrochloric Acid)',
        description: 'Hydrogen and chlorine combine to form hydrochloric acid.',
        animationType: 'explosion'
      };
    
    // Sodium + Oxygen
    case 'Na-O':
    case 'O-Na':
      return {
        result: 'Na₂O (Sodium Oxide)',
        description: 'Sodium and oxygen react to form sodium oxide.',
        animationType: 'gas'
      };
    
    // Default for any other combinations
    default:
      return {
        result: 'Unknown Reaction',
        description: `No known reaction between ${element1.symbol} and ${element2.symbol}.`,
        animationType: 'fade'
      };
  }
};
