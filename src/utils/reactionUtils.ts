import { Element } from '../data/elements';

// Define animation types
export type AnimationType = 'explosion' | 'fade' | 'bubble' | 'gas' | 'crystallization' | 'precipitation' | 'combustion' | 'neutralization';

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
      return 'animate-rise';
    case 'fade':
      return 'animate-fade-in';
    case 'bubble':
      return 'animate-bounce-subtle';
    case 'crystallization':
      return 'animate-pulse';
    case 'precipitation':
      return 'animate-fall';
    case 'combustion':
      return 'animate-flame';
    case 'neutralization':
      return 'animate-neutralize';
    default:
      return '';
  }
};

// Comprehensive list of reactions
export const reactions: Record<string, ReactionResult> = {
  // Hydrogen reactions
  "H-O": {
    result: "H₂O (Water)",
    description: "Hydrogen and oxygen combine explosively to form water. This is a classic synthesis reaction.",
    animationType: "bubble"
  },
  "H-Cl": {
    result: "HCl (Hydrochloric Acid)",
    description: "Hydrogen and chlorine form hydrogen chloride, a strong acid when dissolved in water.",
    animationType: "explosion"
  },
  "H-N": {
    result: "NH₃ (Ammonia)",
    description: "Hydrogen and nitrogen form ammonia, a common nitrogen source for plants.",
    animationType: "gas"
  },
  "H-F": {
    result: "HF (Hydrofluoric Acid)",
    description: "Hydrogen and fluorine form hydrofluoric acid, a highly corrosive substance.",
    animationType: "explosion"
  },
  "H-Br": {
    result: "HBr (Hydrogen Bromide)",
    description: "Hydrogen and bromine form hydrogen bromide, a strong acid in aqueous solution.",
    animationType: "gas"
  },
  "H-I": {
    result: "HI (Hydrogen Iodide)",
    description: "Hydrogen and iodine form hydrogen iodide, used in organic synthesis.",
    animationType: "gas"
  },
  "H-S": {
    result: "H₂S (Hydrogen Sulfide)",
    description: "Hydrogen and sulfur form hydrogen sulfide, known for its strong rotten egg smell.",
    animationType: "gas"
  },
  
  // Sodium reactions
  "Na-Cl": {
    result: "NaCl (Table Salt)",
    description: "A reactive metal (Na) and a reactive nonmetal (Cl) form a stable ionic compound (salt).",
    animationType: "crystallization"
  },
  "Na-O": {
    result: "Na₂O (Sodium Oxide)",
    description: "Sodium reacts vigorously with oxygen to form sodium oxide.",
    animationType: "explosion"
  },
  "Na-H": {
    result: "NaH (Sodium Hydride)",
    description: "Sodium and hydrogen form sodium hydride, a strong base.",
    animationType: "precipitation"
  },
  "Na-F": {
    result: "NaF (Sodium Fluoride)",
    description: "Sodium and fluorine form sodium fluoride, used in dental products.",
    animationType: "crystallization"
  },
  "Na-Br": {
    result: "NaBr (Sodium Bromide)",
    description: "Sodium and bromine form sodium bromide, historically used in medicine.",
    animationType: "crystallization"
  },
  "Na-I": {
    result: "NaI (Sodium Iodide)",
    description: "Sodium and iodine form sodium iodide, used in radiation detection.",
    animationType: "crystallization"
  },
  "Na-S": {
    result: "Na₂S (Sodium Sulfide)",
    description: "Sodium and sulfur form sodium sulfide, used in leather processing.",
    animationType: "precipitation"
  },
  
  // Potassium reactions
  "K-Cl": {
    result: "KCl (Potassium Chloride)",
    description: "Potassium and chlorine form potassium chloride, used as a salt substitute.",
    animationType: "crystallization"
  },
  "K-O": {
    result: "K₂O (Potassium Oxide)",
    description: "Potassium reacts with oxygen to form potassium oxide.",
    animationType: "explosion"
  },
  "K-Br": {
    result: "KBr (Potassium Bromide)",
    description: "Potassium and bromine form potassium bromide, historically used as a sedative.",
    animationType: "crystallization"
  },
  
  // Magnesium reactions (NEW)
  "Mg-O": {
    result: "MgO (Magnesium Oxide)",
    description: "Magnesium burns in oxygen with a bright white light to form magnesium oxide.",
    animationType: "combustion"
  },
  "Mg-Cl": {
    result: "MgCl₂ (Magnesium Chloride)",
    description: "Magnesium reacts with chlorine to form magnesium chloride, an ionic salt.",
    animationType: "crystallization"
  },
  
  // Calcium reactions
  "Ca-O": {
    result: "CaO (Quicklime)",
    description: "Calcium and oxygen form calcium oxide, used in cement production.",
    animationType: "combustion"
  },
  "Ca-Cl": {
    result: "CaCl₂ (Calcium Chloride)",
    description: "Calcium and chlorine form calcium chloride, used as a desiccant and road salt.",
    animationType: "crystallization"
  },
  
  // Aluminum reactions (NEW)
  "Al-Cl": {
    result: "AlCl₃ (Aluminum Chloride)",
    description: "Aluminum and chlorine react to form aluminum chloride, a common catalyst in chemical reactions.",
    animationType: "gas"
  },
  
  // Carbon reactions
  "C-O": {
    result: "CO₂ (Carbon Dioxide)",
    description: "Carbon and oxygen form carbon dioxide in complete combustion.",
    animationType: "combustion"
  },
  "C-H": {
    result: "CH₄ (Methane)",
    description: "Carbon and hydrogen form methane, the simplest hydrocarbon.",
    animationType: "combustion"
  },
  "C-N": {
    result: "CN (Cyanide Group)",
    description: "Carbon and nitrogen form the cyanide group, found in various compounds.",
    animationType: "precipitation"
  },
  "C-S": {
    result: "CS₂ (Carbon Disulfide)",
    description: "Carbon and sulfur form carbon disulfide, a volatile liquid.",
    animationType: "gas"
  },
  
  // Nitrogen reactions
  "N-O": {
    result: "NO₂ (Nitrogen Dioxide)",
    description: "Nitrogen and oxygen form nitrogen dioxide, a reddish-brown toxic gas.",
    animationType: "gas"
  },
  "N-H": {
    result: "NH₃ (Ammonia)",
    description: "Nitrogen and hydrogen form ammonia, used in fertilizers.",
    animationType: "gas"
  },
  
  // Oxygen reactions
  "O-H": {
    result: "H₂O (Water)",
    description: "Oxygen and hydrogen combine to form water, essential for life. This is a synthesis reaction.",
    animationType: "bubble"
  },
  "O-C": {
    result: "CO₂ (Carbon Dioxide)",
    description: "Oxygen and carbon form carbon dioxide during respiration and combustion.",
    animationType: "gas"
  },
  "O-Fe": {
    result: "Fe₂O₃ (Iron Oxide)",
    description: "Oxygen and iron form iron oxide, commonly known as rust.",
    animationType: "fade"
  },
  "O-Al": {
    result: "Al₂O₃ (Aluminum Oxide)",
    description: "A protective layer of aluminum oxide quickly forms on aluminum, preventing further reaction.",
    animationType: "fade"
  },
  
  // Halogen reactions (F, Cl, Br, I)
  "Cl-H": {
    result: "HCl (Hydrochloric Acid)",
    description: "Chlorine and hydrogen form hydrochloric acid, a strong acid.",
    animationType: "gas"
  },
  "F-H": {
    result: "HF (Hydrofluoric Acid)",
    description: "Fluorine and hydrogen form hydrofluoric acid, which can etch glass.",
    animationType: "gas"
  },
  "Br-H": {
    result: "HBr (Hydrogen Bromide)",
    description: "Bromine and hydrogen form hydrogen bromide, a strong acid.",
    animationType: "gas"
  },
  
  // Alkali metal reactions with water
  "Li-H2O": {
    result: "LiOH + H₂",
    description: "Lithium reacts with water to produce lithium hydroxide and hydrogen gas.",
    animationType: "bubble"
  },
  "Na-H2O": {
    result: "NaOH + H₂",
    description: "Sodium reacts vigorously with water to produce sodium hydroxide and hydrogen.",
    animationType: "explosion"
  },
  "K-H2O": {
    result: "KOH + H₂",
    description: "Potassium reacts explosively with water to form potassium hydroxide and hydrogen.",
    animationType: "explosion"
  },
  
  // Metal oxide reactions with water
  "CaO-H2O": {
    result: "Ca(OH)₂",
    description: "Calcium oxide reacts with water to form calcium hydroxide (slaked lime).",
    animationType: "precipitation"
  },
  
  // Acid-base reactions
  "HCl-NaOH": {
    result: "NaCl + H₂O",
    description: "Hydrochloric acid and sodium hydroxide form salt and water.",
    animationType: "neutralization"
  },
  
  // Noble gas compounds (rare but possible)
  "Xe-F": {
    result: "XeF₂",
    description: "Xenon and fluorine can form xenon difluoride under specific conditions.",
    animationType: "crystallization"
  }
};

// Simulate chemical reactions between elements
export const simulateReaction = (element1: Element, element2: Element): ReactionResult => {
  const combo = `${element1.symbol}-${element2.symbol}`;
  const reversedCombo = `${element2.symbol}-${element1.symbol}`;
  
  // Specific no-reaction cases for better explanations
  if (element1.category.includes('noble-gas') && element2.category.includes('noble-gas')) {
    return {
      result: "No Reaction",
      description: `${element1.name} and ${element2.name} are noble gases with stable electron configurations, making them very unreactive.`,
      animationType: "fade"
    };
  }

  if (element1.category.includes('alkali-metal') && element2.category.includes('alkali-metal') && element1.symbol !== element2.symbol) {
    return {
      result: "No Reaction",
      description: `Two different alkali metals like ${element1.name} and ${element2.name} will not form a chemical compound; they form alloys instead.`,
      animationType: "fade"
    };
  }

  // Check for reaction in both directions
  if (reactions[combo]) {
    return reactions[combo];
  } else if (reactions[reversedCombo]) {
    return reactions[reversedCombo];
  } else {
    // Default for any other combinations
    return {
      result: "No Reaction",
      description: `No common reaction is defined between ${element1.symbol} and ${element2.symbol} in this simulation.`,
      animationType: "fade"
    };
  }
};
