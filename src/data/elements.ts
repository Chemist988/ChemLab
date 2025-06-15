export interface Element {
  id: number;
  symbol: string;
  name: string;
  atomicNumber: number;
  atomicMass: number;
  group: number | null;
  period: number;
  electronConfiguration?: string;
  electronegativity?: number;
  density?: number;
  meltingPoint?: number;
  boilingPoint?: number;
  description?: string;
  discoveredBy?: string;
  category: string;
  color: string;
  x: number;
  y: number;
}

export type ElementCategory = 
  | 'alkali-metal'
  | 'alkaline-earth-metal'
  | 'transition-metal'
  | 'post-transition-metal'
  | 'metalloid'
  | 'nonmetal'
  | 'halogen'
  | 'noble-gas'
  | 'lanthanide'
  | 'actinide'
  | 'unknown';

export const categoryColors: Record<ElementCategory, string> = {
  'alkali-metal': 'chemistry-alkali',
  'alkaline-earth-metal': 'chemistry-alkaline',
  'transition-metal': 'chemistry-transition',
  'post-transition-metal': 'chemistry-post-transition',
  'metalloid': 'chemistry-metalloid',
  'nonmetal': 'chemistry-nonmetal',
  'halogen': 'chemistry-halogen',
  'noble-gas': 'chemistry-noble-gas',
  'lanthanide': 'chemistry-lanthanide',
  'actinide': 'chemistry-actinide',
  'unknown': 'chemistry-unknown',
};

export const categoryNames: Record<ElementCategory, string> = {
  'alkali-metal': 'Alkali Metal',
  'alkaline-earth-metal': 'Alkaline Earth Metal',
  'transition-metal': 'Transition Metal',
  'post-transition-metal': 'Post-Transition Metal',
  'metalloid': 'Metalloid',
  'nonmetal': 'Nonmetal',
  'halogen': 'Halogen',
  'noble-gas': 'Noble Gas',
  'lanthanide': 'Lanthanide',
  'actinide': 'Actinide',
  'unknown': 'Unknown',
};

// Define the periodic table layout
export const periodicTableLayout: number[][] = [
  // Period 1
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
  // Period 2
  [3, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 6, 7, 8, 9, 10],
  // Period 3
  [11, 12, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 13, 14, 15, 16, 17, 18],
  // Period 4
  [19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36],
  // Period 5
  [37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54],
  // Period 6
  [55, 56, 57, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86],
  // Period 7
  [87, 88, 89, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118],
  // Empty row
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  // Lanthanides
  [0, 0, 0, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 0],
  // Actinides
  [0, 0, 0, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 0],
];

// Elements with detailed information
export const elements: Element[] = [
  {
    id: 1,
    symbol: 'H',
    name: 'Hydrogen',
    atomicNumber: 1,
    atomicMass: 1.008,
    category: 'nonmetal',
    group: 1,
    period: 1,
    electronConfiguration: '1s¹',
    electronegativity: 2.20,
    density: 0.0000899,
    meltingPoint: -259.16,
    boilingPoint: -252.87,
    discoveredBy: 'Henry Cavendish',
    description: 'Colorless, odorless, tasteless, non-toxic, highly combustible gas with the molecular formula H₂.',
    color: 'chemistry-nonmetal',
    x: 0,
    y: 0
  },
  {
    id: 2,
    symbol: 'He',
    name: 'Helium',
    atomicNumber: 2,
    atomicMass: 4.0026,
    category: 'noble-gas',
    group: 18,
    period: 1,
    electronConfiguration: '1s²',
    density: 0.0001785,
    meltingPoint: -272.2,
    boilingPoint: -268.93,
    discoveredBy: 'Pierre Janssen',
    description: 'Colorless, odorless, tasteless, non-toxic, inert, monatomic gas with very low chemical reactivity.',
    color: 'chemistry-noble-gas',
    x: 17,
    y: 0
  },
  {
    id: 3,
    symbol: 'Li',
    name: 'Lithium',
    atomicNumber: 3,
    atomicMass: 6.94,
    category: 'alkali-metal',
    group: 1,
    period: 2,
    electronConfiguration: '1s² 2s¹',
    electronegativity: 0.98,
    density: 0.534,
    meltingPoint: 180.54,
    boilingPoint: 1342,
    discoveredBy: 'Johan August Arfwedson',
    description: 'Soft, silvery-white alkali metal that is highly reactive, forming strong bonds with anions.',
    color: 'chemistry-alkali',
    x: 0,
    y: 1
  },
  {
    id: 4,
    symbol: 'Be',
    name: 'Beryllium',
    atomicNumber: 4,
    atomicMass: 9.0122,
    category: 'alkaline-earth-metal',
    group: 2,
    period: 2,
    electronConfiguration: '1s² 2s²',
    electronegativity: 1.57,
    density: 1.85,
    meltingPoint: 1287,
    boilingPoint: 2470,
    discoveredBy: 'Louis Nicolas Vauquelin',
    description: 'Relatively rare element in the universe, steel-gray, strong, lightweight, brittle alkaline earth metal.',
    color: 'chemistry-alkaline',
    x: 1,
    y: 1
  },
  {
    id: 5,
    symbol: 'B',
    name: 'Boron',
    atomicNumber: 5,
    atomicMass: 10.81,
    category: 'metalloid',
    group: 13,
    period: 2,
    electronConfiguration: '1s² 2s² 2p¹',
    electronegativity: 2.04,
    density: 2.34,
    meltingPoint: 2076,
    boilingPoint: 3927,
    discoveredBy: 'Joseph Louis Gay-Lussac',
    description: 'Occurs naturally as orthoboric acid in certain volcanic spring waters and as borates in borax and colemanite.',
    color: 'chemistry-metalloid',
    x: 12,
    y: 1
  },
  {
    id: 6,
    symbol: 'C',
    name: 'Carbon',
    atomicNumber: 6,
    atomicMass: 12.011,
    category: 'nonmetal',
    group: 14,
    period: 2,
    electronConfiguration: '1s² 2s² 2p²',
    electronegativity: 2.55,
    density: 2.267,
    meltingPoint: 3550,
    boilingPoint: 4027,
    description: 'Forms more compounds than any other element and serves as the fundamental building block of life.',
    color: 'chemistry-nonmetal',
    x: 13,
    y: 1
  },
  {
    id: 7,
    symbol: 'N',
    name: 'Nitrogen',
    atomicNumber: 7,
    atomicMass: 14.007,
    category: 'nonmetal',
    group: 15,
    period: 2,
    electronConfiguration: '1s² 2s² 2p³',
    electronegativity: 3.04,
    density: 0.001251,
    meltingPoint: -210.1,
    boilingPoint: -195.79,
    discoveredBy: 'Daniel Rutherford',
    description: 'Colorless, odorless, tasteless gas that makes up about 78% of Earth\'s atmosphere.',
    color: 'chemistry-nonmetal',
    x: 14,
    y: 1
  },
  {
    id: 8,
    symbol: 'O',
    name: 'Oxygen',
    atomicNumber: 8,
    atomicMass: 15.999,
    category: 'nonmetal',
    group: 16,
    period: 2,
    electronConfiguration: '1s² 2s² 2p⁴',
    electronegativity: 3.44,
    density: 0.001429,
    meltingPoint: -218.79,
    boilingPoint: -182.95,
    discoveredBy: 'Carl Wilhelm Scheele',
    description: 'Highly reactive element that readily forms oxides with most other elements as well as with compounds.',
    color: 'chemistry-nonmetal',
    x: 15,
    y: 1
  },
  {
    id: 9,
    symbol: 'F',
    name: 'Fluorine',
    atomicNumber: 9,
    atomicMass: 18.998,
    category: 'halogen',
    group: 17,
    period: 2,
    electronConfiguration: '1s² 2s² 2p⁵',
    electronegativity: 3.98,
    density: 0.001696,
    meltingPoint: -219.67,
    boilingPoint: -188.11,
    discoveredBy: 'Henri Moissan',
    description: 'The most electronegative element, extremely reactive and forms strong bonds with many other elements.',
    color: 'chemistry-halogen',
    x: 16,
    y: 1
  },
  {
    id: 10,
    symbol: 'Ne',
    name: 'Neon',
    atomicNumber: 10,
    atomicMass: 20.180,
    category: 'noble-gas',
    group: 18,
    period: 2,
    electronConfiguration: '1s² 2s² 2p⁶',
    density: 0.0008999,
    meltingPoint: -248.59,
    boilingPoint: -246.08,
    discoveredBy: 'William Ramsay and Morris Travers',
    description: 'Colorless, odorless, inert monatomic gas with about two-thirds the density of air, known for its bright reddish-orange glow.',
    color: 'chemistry-noble-gas',
    x: 17,
    y: 1
  },
  {
    id: 11,
    symbol: 'Na',
    name: 'Sodium',
    atomicNumber: 11,
    atomicMass: 22.990,
    category: 'alkali-metal',
    group: 1,
    period: 3,
    electronConfiguration: '1s² 2s² 2p⁶ 3s¹',
    electronegativity: 0.93,
    density: 0.971,
    meltingPoint: 97.72,
    boilingPoint: 883,
    discoveredBy: 'Humphry Davy',
    description: 'Soft, silvery-white, highly reactive metal that is never found as a free element in nature.',
    color: 'chemistry-alkali',
    x: 0,
    y: 2
  },
  {
    id: 12,
    symbol: 'Mg',
    name: 'Magnesium',
    atomicNumber: 12,
    atomicMass: 24.305,
    category: 'alkaline-earth-metal',
    group: 2,
    period: 3,
    electronConfiguration: '1s² 2s² 2p⁶ 3s²',
    electronegativity: 1.31,
    density: 1.738,
    meltingPoint: 650,
    boilingPoint: 1090,
    discoveredBy: 'Joseph Black',
    description: 'Shiny grey solid which bears a close physical resemblance to the other five elements in group 2.',
    color: 'chemistry-alkaline',
    x: 1,
    y: 2
  },
  {
    id: 13,
    symbol: 'Al',
    name: 'Aluminum',
    atomicNumber: 13,
    atomicMass: 26.982,
    category: 'post-transition-metal',
    group: 13,
    period: 3,
    electronConfiguration: '1s² 2s² 2p⁶ 3s² 3p¹',
    electronegativity: 1.61,
    density: 2.698,
    meltingPoint: 660.32,
    boilingPoint: 2519,
    discoveredBy: 'Hans Christian Ørsted',
    description: 'Silvery-white, soft, non-magnetic, ductile metal that resists corrosion due to a thin layer of oxide.',
    color: 'chemistry-post-transition',
    x: 12,
    y: 2
  },
  {
    id: 14,
    symbol: 'Si',
    name: 'Silicon',
    atomicNumber: 14,
    atomicMass: 28.085,
    category: 'metalloid',
    group: 14,
    period: 3,
    electronConfiguration: '1s² 2s² 2p⁶ 3s² 3p²',
    electronegativity: 1.9,
    density: 2.3296,
    meltingPoint: 1414,
    boilingPoint: 3265,
    discoveredBy: 'Jöns Jacob Berzelius',
    description: 'Hard and brittle crystalline solid with a blue-grey metallic lustre, used in most electronic circuits.',
    color: 'chemistry-metalloid',
    x: 13,
    y: 2
  },
  {
    id: 15,
    symbol: 'P',
    name: 'Phosphorus',
    atomicNumber: 15,
    atomicMass: 30.974,
    category: 'nonmetal',
    group: 15,
    period: 3,
    electronConfiguration: '1s² 2s² 2p⁶ 3s² 3p³',
    electronegativity: 2.19,
    density: 1.82,
    meltingPoint: 44.15,
    boilingPoint: 280.5,
    discoveredBy: 'Hennig Brand',
    description: 'Essential element for life, found in DNA, RNA, ATP, and the phospholipids that form cell membranes.',
    color: 'chemistry-nonmetal',
    x: 14,
    y: 2
  },
  {
    id: 16,
    symbol: 'S',
    name: 'Sulfur',
    atomicNumber: 16,
    atomicMass: 32.06,
    category: 'nonmetal',
    group: 16,
    period: 3,
    electronConfiguration: '1s² 2s² 2p⁶ 3s² 3p⁴',
    electronegativity: 2.58,
    density: 2.067,
    meltingPoint: 115.21,
    boilingPoint: 444.61,
    description: 'Abundant, multivalent non-metal, bright yellow crystalline solid when in pure form.',
    color: 'chemistry-nonmetal',
    x: 15,
    y: 2
  },
  {
    id: 17,
    symbol: 'Cl',
    name: 'Chlorine',
    atomicNumber: 17,
    atomicMass: 35.45,
    category: 'halogen',
    group: 17,
    period: 3,
    electronConfiguration: '1s² 2s² 2p⁶ 3s² 3p⁵',
    electronegativity: 3.16,
    density: 0.003214,
    meltingPoint: -101.5,
    boilingPoint: -34.04,
    discoveredBy: 'Carl Wilhelm Scheele',
    description: 'Yellow-green gas that is a member of the halogen group of elements, highly reactive and irritating to the eyes.',
    color: 'chemistry-halogen',
    x: 16,
    y: 2
  },
  {
    id: 18,
    symbol: 'Ar',
    name: 'Argon',
    atomicNumber: 18,
    atomicMass: 39.948,
    category: 'noble-gas',
    group: 18,
    period: 3,
    electronConfiguration: '1s² 2s² 2p⁶ 3s² 3p⁶',
    density: 0.0017837,
    meltingPoint: -189.34,
    boilingPoint: -185.85,
    discoveredBy: 'Lord Rayleigh and William Ramsay',
    description: 'Third most abundant gas in the Earth\'s atmosphere, colorless, odorless, and inert under standard conditions.',
    color: 'chemistry-noble-gas',
    x: 17,
    y: 2
  },
  // ... (continue with all other elements similarly, including id, discoveredBy, color, x, y)
];

// Common molecules for the reactions
export const molecules = [
  {
    id: 1,
    formula: 'H2O',
    name: 'Water',
    description: 'The most common compound on Earth\'s surface, essential for all known forms of life.',
    composition: [
      { elementId: 1, count: 2 }, // Hydrogen
      { elementId: 8, count: 1 }  // Oxygen
    ]
  },
  {
    id: 2,
    formula: 'NaCl',
    name: 'Sodium Chloride (Table Salt)',
    description: 'Essential for animal life, used as a food preservative and seasoning.',
    composition: [
      { elementId: 11, count: 1 }, // Sodium
      { elementId: 17, count: 1 }  // Chlorine
    ]
  },
  {
    id: 3,
    formula: 'CO2',
    name: 'Carbon Dioxide',
    description: 'Used by plants for photosynthesis, a greenhouse gas, and important in Earth\'s carbon cycle.',
    composition: [
      { elementId: 6, count: 1 },  // Carbon
      { elementId: 8, count: 2 }   // Oxygen
    ]
  },
  {
    id: 4,
    formula: 'NH3',
    name: 'Ammonia',
    description: 'Used in fertilizers, cleaning products, and manufacturing processes.',
    composition: [
      { elementId: 7, count: 1 },  // Nitrogen
      { elementId: 1, count: 3 }   // Hydrogen
    ]
  },
  {
    id: 5,
    formula: 'CH4',
    name: 'Methane',
    description: 'Simplest hydrocarbon and a potent greenhouse gas, used as a fuel.',
    composition: [
      { elementId: 6, count: 1 },  // Carbon
      { elementId: 1, count: 4 }   // Hydrogen
    ]
  },
  {
    id: 6,
    formula: 'C2H5OH',
    name: 'Ethanol (Drinking Alcohol)',
    description: 'Used in alcoholic beverages, as a solvent, and as a fuel.',
    composition: [
      { elementId: 6, count: 2 },  // Carbon
      { elementId: 1, count: 6 },  // Hydrogen
      { elementId: 8, count: 1 }   // Oxygen
    ]
  },
  {
    id: 7,
    formula: 'C6H12O6',
    name: 'Glucose',
    description: 'Simple sugar used by cells for energy in the process of cellular respiration.',
    composition: [
      { elementId: 6, count: 6 },  // Carbon
      { elementId: 1, count: 12 }, // Hydrogen
      { elementId: 8, count: 6 }   // Oxygen
    ]
  },
  {
    id: 8,
    formula: 'H2SO4',
    name: 'Sulfuric Acid',
    description: 'Strong mineral acid used in fertilizer manufacturing, chemical synthesis, and metal processing.',
    composition: [
      { elementId: 1, count: 2 },  // Hydrogen
      { elementId: 16, count: 1 }, // Sulfur
      { elementId: 8, count: 4 }   // Oxygen
    ]
  },
  {
    id: 9,
    formula: 'HCl',
    name: 'Hydrochloric Acid',
    description: 'Strong corrosive acid found in gastric acid, used in metal cleaning and processing.',
    composition: [
      { elementId: 1, count: 1 },  // Hydrogen
      { elementId: 17, count: 1 }  // Chlorine
    ]
  },
  {
    id: 10,
    formula: 'NaOH',
    name: 'Sodium Hydroxide (Lye)',
    description: 'Strong base used in manufacturing soap, paper, and drain cleaners.',
    composition: [
      { elementId: 11, count: 1 }, // Sodium
      { elementId: 8, count: 1 },  // Oxygen
      { elementId: 1, count: 1 }   // Hydrogen
    ]
  }
];
