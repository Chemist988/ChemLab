
import { Element } from '../data/elements';

export interface ReactionResult {
  result: string;
  description: string;
  energy: 'low' | 'medium' | 'high' | 'explosive';
  color: string;
  gasProduced: boolean;
  precipitate: boolean;
}

// Simulate chemical reactions between elements
export const simulateReaction = (element1: Element, element2: Element): ReactionResult => {
  const combo = `${element1.symbol}-${element2.symbol}`;
  const reversedCombo = `${element2.symbol}-${element1.symbol}`;
  
  // Enhanced collection of chemical reactions with visual properties
  const reactions: Record<string, ReactionResult> = {
    // Explosive reactions
    "H-O": { 
      result: "H₂O (Water)", 
      description: "Hydrogen and oxygen combine explosively to form water molecules.",
      energy: 'explosive',
      color: '#ff6b6b',
      gasProduced: true,
      precipitate: false
    },
    "Na-H2O": { 
      result: "NaOH + H₂", 
      description: "Sodium reacts violently with water producing sodium hydroxide and hydrogen gas.",
      energy: 'explosive',
      color: '#ffa500',
      gasProduced: true,
      precipitate: false
    },
    "K-H2O": { 
      result: "KOH + H₂", 
      description: "Potassium explodes in water forming potassium hydroxide and hydrogen.",
      energy: 'explosive',
      color: '#ff4757',
      gasProduced: true,
      precipitate: false
    },

    // High energy reactions
    "Mg-O": { 
      result: "MgO (Magnesium Oxide)", 
      description: "Magnesium burns in oxygen to form bright white magnesium oxide.",
      energy: 'high',
      color: '#ffffff',
      gasProduced: false,
      precipitate: true
    },
    "Fe-O": { 
      result: "Fe₂O₃ (Iron Oxide)", 
      description: "Iron and oxygen form rust, iron oxide, through oxidation.",
      energy: 'medium',
      color: '#cd853f',
      gasProduced: false,
      precipitate: true
    },
    "Al-O": { 
      result: "Al₂O₃ (Aluminum Oxide)", 
      description: "Aluminum and oxygen form aluminum oxide, sapphire and ruby.",
      energy: 'high',
      color: '#87ceeb',
      gasProduced: false,
      precipitate: true
    },

    // Salt formations
    "Na-Cl": { 
      result: "NaCl (Table Salt)", 
      description: "Sodium and chlorine form common table salt with ionic bonds.",
      energy: 'medium',
      color: '#f0f8ff',
      gasProduced: false,
      precipitate: true
    },
    "Li-Cl": { 
      result: "LiCl (Lithium Chloride)", 
      description: "Lithium and chlorine form lithium chloride salt.",
      energy: 'medium',
      color: '#ffe4e1',
      gasProduced: false,
      precipitate: true
    },
    "K-Cl": { 
      result: "KCl (Potassium Chloride)", 
      description: "Potassium and chlorine form potassium chloride salt substitute.",
      energy: 'medium',
      color: '#f5f5dc',
      gasProduced: false,
      precipitate: true
    },

    // Acid formations
    "H-Cl": { 
      result: "HCl (Hydrochloric Acid)", 
      description: "Hydrogen and chlorine form hydrogen chloride, a strong acid.",
      energy: 'medium',
      color: '#32cd32',
      gasProduced: true,
      precipitate: false
    },
    "H-F": { 
      result: "HF (Hydrofluoric Acid)", 
      description: "Hydrogen and fluorine form hydrofluoric acid, extremely corrosive.",
      energy: 'high',
      color: '#ff69b4',
      gasProduced: true,
      precipitate: false
    },
    "H-S": { 
      result: "H₂S (Hydrogen Sulfide)", 
      description: "Hydrogen and sulfur form toxic hydrogen sulfide with rotten egg smell.",
      energy: 'medium',
      color: '#ffff00',
      gasProduced: true,
      precipitate: false
    },

    // Compound formations
    "C-O": { 
      result: "CO₂ (Carbon Dioxide)", 
      description: "Carbon burns in oxygen to form carbon dioxide gas.",
      energy: 'medium',
      color: '#b0c4de',
      gasProduced: true,
      precipitate: false
    },
    "N-O": { 
      result: "NO₂ (Nitrogen Dioxide)", 
      description: "Nitrogen and oxygen form brown nitrogen dioxide gas.",
      energy: 'medium',
      color: '#daa520',
      gasProduced: true,
      precipitate: false
    },
    "S-O": { 
      result: "SO₂ (Sulfur Dioxide)", 
      description: "Sulfur burns to form choking sulfur dioxide gas.",
      energy: 'medium',
      color: '#ff6347',
      gasProduced: true,
      precipitate: false
    },

    // Metal oxides
    "Cu-O": { 
      result: "CuO (Copper Oxide)", 
      description: "Copper and oxygen form black copper oxide.",
      energy: 'medium',
      color: '#2f4f4f',
      gasProduced: false,
      precipitate: true
    },
    "Zn-O": { 
      result: "ZnO (Zinc Oxide)", 
      description: "Zinc and oxygen form white zinc oxide, used in sunscreen.",
      energy: 'medium',
      color: '#f8f8ff',
      gasProduced: false,
      precipitate: true
    },
    "Ca-O": { 
      result: "CaO (Quicklime)", 
      description: "Calcium burns in oxygen to form quicklime, used in cement.",
      energy: 'high',
      color: '#f5f5f5',
      gasProduced: false,
      precipitate: true
    },

    // More combinations
    "Si-O": { 
      result: "SiO₂ (Silicon Dioxide)", 
      description: "Silicon and oxygen form quartz, sand, and glass.",
      energy: 'low',
      color: '#e6e6fa',
      gasProduced: false,
      precipitate: true
    },
    "P-O": { 
      result: "P₂O₅ (Phosphorus Pentoxide)", 
      description: "Phosphorus burns to form phosphorus pentoxide.",
      energy: 'high',
      color: '#fff8dc',
      gasProduced: false,
      precipitate: true
    },
    "Ti-O": { 
      result: "TiO₂ (Titanium Dioxide)", 
      description: "Titanium and oxygen form white titanium dioxide pigment.",
      energy: 'medium',
      color: '#fffafa',
      gasProduced: false,
      precipitate: true
    }
  };
  
  if (reactions[combo]) {
    return reactions[combo];
  } else if (reactions[reversedCombo]) {
    return reactions[reversedCombo];
  } else {
    return {
      result: "No Known Reaction",
      description: `No documented reaction between ${element1.name} and ${element2.name} under normal conditions.`,
      energy: 'low',
      color: '#808080',
      gasProduced: false,
      precipitate: false
    };
  }
};
