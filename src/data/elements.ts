export interface Element {
  id: number;
  symbol: string;
  name: string;
  atomicNumber: number;
  category: ElementCategory;
  atomicMass: number;
  group: number | null;
  period: number;
  electronConfiguration: string;
  electronegativity?: number;
  density?: number;
  meltingPoint?: number;
  boilingPoint?: number;
  discoveredBy?: string;
  description: string;
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

// First 20 elements with detailed information
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
    description: 'Colorless, odorless, tasteless, non-toxic, highly combustible gas with the molecular formula H₂.'
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
    description: 'Colorless, odorless, tasteless, non-toxic, inert, monatomic gas with very low chemical reactivity.'
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
    description: 'Soft, silvery-white alkali metal that is highly reactive, forming strong bonds with anions.'
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
    description: 'Relatively rare element in the universe, steel-gray, strong, lightweight, brittle alkaline earth metal.'
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
    description: 'Occurs naturally as orthoboric acid in certain volcanic spring waters and as borates in borax and colemanite.'
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
    description: 'Forms more compounds than any other element and serves as the fundamental building block of life.'
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
    description: 'Colorless, odorless, tasteless gas that makes up about 78% of Earth\'s atmosphere.'
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
    description: 'Highly reactive element that readily forms oxides with most other elements as well as with compounds.'
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
    description: 'The most electronegative element, extremely reactive and forms strong bonds with many other elements.'
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
    description: 'Colorless, odorless, inert monatomic gas with about two-thirds the density of air, known for its bright reddish-orange glow.'
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
    description: 'Soft, silvery-white, highly reactive metal that is never found as a free element in nature.'
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
    description: 'Shiny grey solid which bears a close physical resemblance to the other five elements in group 2.'
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
    description: 'Silvery-white, soft, non-magnetic, ductile metal that resists corrosion due to a thin layer of oxide.'
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
    description: 'Hard and brittle crystalline solid with a blue-grey metallic lustre, used in most electronic circuits.'
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
    description: 'Essential element for life, found in DNA, RNA, ATP, and the phospholipids that form cell membranes.'
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
    description: 'Abundant, multivalent non-metal, bright yellow crystalline solid when in pure form.'
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
    description: 'Yellow-green gas that is a member of the halogen group of elements, highly reactive and irritating to the eyes.'
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
    description: 'Third most abundant gas in the Earth\'s atmosphere, colorless, odorless, and inert under standard conditions.'
  },
  {
    id: 19,
    symbol: 'K',
    name: 'Potassium',
    atomicNumber: 19,
    atomicMass: 39.098,
    category: 'alkali-metal',
    group: 1,
    period: 4,
    electronConfiguration: '1s² 2s² 2p⁶ 3s² 3p⁶ 4s¹',
    electronegativity: 0.82,
    density: 0.862,
    meltingPoint: 63.38,
    boilingPoint: 759,
    discoveredBy: 'Humphry Davy',
    description: 'Soft, silvery-white alkali metal that reacts rapidly with water producing hydrogen gas and heat.'
  },
  {
    id: 20,
    symbol: 'Ca',
    name: 'Calcium',
    atomicNumber: 20,
    atomicMass: 40.078,
    category: 'alkaline-earth-metal',
    group: 2,
    period: 4,
    electronConfiguration: '1s² 2s² 2p⁶ 3s² 3p⁶ 4s²',
    electronegativity: 1.0,
    density: 1.54,
    meltingPoint: 842,
    boilingPoint: 1484,
    discoveredBy: 'Humphry Davy',
    description: 'Essential for living organisms, particularly in cell physiology and for the mineralization of bones and teeth.'
  },
  // Additional elements would be added here...
];

// Complete periodic table structure - this represents positions
export const periodicTableLayout = [
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
  [3, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 6, 7, 8, 9, 10],
  [11, 12, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 13, 14, 15, 16, 17, 18],
  [19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36],
  [37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54],
  [55, 56, 57, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86],
  [87, 88, 89, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 0],
  [0, 0, 0, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 0],
];

// Map of known reactions between elements
export const knownReactions = {
  // Hydrogen reactions
  "H-O": {
    result: "H₂O (Water)",
    description: "Hydrogen and oxygen combine to form water, a vital compound for life.",
    animationType: "combustion"
  },
  "H-Cl": {
    result: "HCl (Hydrogen Chloride)",
    description: "Hydrogen and chlorine form hydrogen chloride, a strong acid when dissolved in water.",
    animationType: "gasformation"
  },
  
  // Sodium reactions
  "Na-Cl": {
    result: "NaCl (Table Salt)",
    description: "Sodium and chlorine react to form sodium chloride, common table salt.",
    animationType: "crystallization"
  },
  "Na-O": {
    result: "Na₂O (Sodium Oxide)",
    description: "Sodium reacts vigorously with oxygen to form sodium oxide.",
    animationType: "oxidation"
  },
  
  // Carbon reactions
  "C-O": {
    result: "CO₂ (Carbon Dioxide)",
    description: "Carbon and oxygen combine to form carbon dioxide in complete combustion.",
    animationType: "combustion"
  },
  
  // Generic fallback for unknown combinations
  "default": {
    result: "Unknown Compound",
    description: "Our AI doesn't have data on this specific reaction yet.",
    animationType: "generic"
  }
};
