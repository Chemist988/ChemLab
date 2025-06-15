
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

export interface Element {
  id: number;
  name: string;
  symbol: string;
  atomicNumber: number;
  atomicMass: number;
  category: ElementCategory;
  group: number;
  period: number;
  block?: string;
  electronConfiguration?: string;
  electronegativity?: number | null;
  atomicRadius?: number | null;
  ionRadius?: string | null;
  vanDerWaalsRadius?: number | null;
  ionizationEnergy?: number | null;
  electronAffinity?: number | null;
  oxidationStates?: string | null;
  bondingType?: string | null;
  meltingPoint?: number | null;
  boilingPoint?: number | null;
  density?: number | null;
  yearDiscovered?: number | string | null;
  discoveredBy?: string | null;
  description?: string;
  cpkHexColor?: string;
}
