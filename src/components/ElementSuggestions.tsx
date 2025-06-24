
import React from 'react';
import { Element } from '@/data/elements';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import ElementCard from './ElementCard';
import { Button } from '@/components/ui/button';
import { Info, Atom, Beaker, Plus } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

interface ElementSuggestionsProps {
  element: Element | null;
  onSelectElement: (element: Element) => void;
  onAddCompound?: (compound: { name: string; formula: string; description: string }) => void;
  suggestedElements: Element[];
  isReacting?: boolean;
}

// Expanded compounds database with more variety
const molecules = {
  H: [
    { name: 'Water', formula: 'H₂O', description: 'Universal solvent, essential for life' },
    { name: 'Hydrogen Gas', formula: 'H₂', description: 'Diatomic gas, clean fuel' },
    { name: 'Ammonia', formula: 'NH₃', description: 'Basic compound, fertilizer base' },
    { name: 'Methane', formula: 'CH₄', description: 'Simplest hydrocarbon, natural gas' },
    { name: 'Hydrogen Peroxide', formula: 'H₂O₂', description: 'Strong oxidizing agent' },
    { name: 'Hydrochloric Acid', formula: 'HCl', description: 'Strong acid, stomach acid' },
    { name: 'Sulfuric Acid', formula: 'H₂SO₄', description: 'Most important industrial acid' },
    { name: 'Ethanol', formula: 'C₂H₅OH', description: 'Alcohol, fuel additive' }
  ],
  O: [
    { name: 'Water', formula: 'H₂O', description: 'Essential for life, polar molecule' },
    { name: 'Carbon Dioxide', formula: 'CO₂', description: 'Greenhouse gas, photosynthesis reactant' },
    { name: 'Oxygen Gas', formula: 'O₂', description: 'Breathable gas, supports combustion' },
    { name: 'Ozone', formula: 'O₃', description: 'Atmospheric protector, powerful oxidant' },
    { name: 'Carbon Monoxide', formula: 'CO', description: 'Toxic gas, incomplete combustion' },
    { name: 'Nitric Oxide', formula: 'NO', description: 'Signaling molecule, air pollutant' },
    { name: 'Hydrogen Peroxide', formula: 'H₂O₂', description: 'Bleaching agent, antiseptic' },
    { name: 'Sulfur Dioxide', formula: 'SO₂', description: 'Preservative, acid rain precursor' }
  ],
  C: [
    { name: 'Carbon Dioxide', formula: 'CO₂', description: 'Combustion product, dry ice' },
    { name: 'Methane', formula: 'CH₄', description: 'Natural gas, greenhouse gas' },
    { name: 'Carbon Monoxide', formula: 'CO', description: 'Toxic gas, reducing agent' },
    { name: 'Glucose', formula: 'C₆H₁₂O₆', description: 'Blood sugar, energy source' },
    { name: 'Ethanol', formula: 'C₂H₅OH', description: 'Drinking alcohol, biofuel' },
    { name: 'Acetone', formula: 'C₃H₆O', description: 'Solvent, nail polish remover' },
    { name: 'Benzene', formula: 'C₆H₆', description: 'Aromatic hydrocarbon, carcinogen' },
    { name: 'Diamond', formula: 'C', description: 'Hardest natural material' }
  ],
  N: [
    { name: 'Ammonia', formula: 'NH₃', description: 'Fertilizer base, basic compound' },
    { name: 'Nitrogen Gas', formula: 'N₂', description: 'Atmospheric gas, inert' },
    { name: 'Nitric Acid', formula: 'HNO₃', description: 'Strong acid, explosive precursor' },
    { name: 'Urea', formula: 'CO(NH₂)₂', description: 'Biological waste, fertilizer' },
    { name: 'Nitrous Oxide', formula: 'N₂O', description: 'Laughing gas, anesthetic' },
    { name: 'TNT', formula: 'C₇H₅N₃O₆', description: 'Explosive compound' },
    { name: 'Caffeine', formula: 'C₈H₁₀N₄O₂', description: 'Stimulant drug' },
    { name: 'Cyanide', formula: 'CN⁻', description: 'Deadly poison ion' }
  ],
  Na: [
    { name: 'Salt', formula: 'NaCl', description: 'Table salt, essential mineral' },
    { name: 'Sodium Hydroxide', formula: 'NaOH', description: 'Lye, strong base' },
    { name: 'Sodium Bicarbonate', formula: 'NaHCO₃', description: 'Baking soda, antacid' },
    { name: 'Sodium Carbonate', formula: 'Na₂CO₃', description: 'Washing soda, glass making' },
    { name: 'Sodium Nitrate', formula: 'NaNO₃', description: 'Chile saltpeter, fertilizer' },
    { name: 'Sodium Fluoride', formula: 'NaF', description: 'Toothpaste additive' },
    { name: 'Sodium Sulfate', formula: 'Na₂SO₄', description: 'Glauber\'s salt' }
  ],
  Cl: [
    { name: 'Salt', formula: 'NaCl', description: 'Sodium chloride, table salt' },
    { name: 'Hydrochloric Acid', formula: 'HCl', description: 'Stomach acid, strong acid' },
    { name: 'Chlorine Gas', formula: 'Cl₂', description: 'Water disinfectant, toxic gas' },
    { name: 'Bleach', formula: 'NaClO', description: 'Cleaning agent, disinfectant' },
    { name: 'Calcium Chloride', formula: 'CaCl₂', description: 'De-icer, drying agent' },
    { name: 'Chloroform', formula: 'CHCl₃', description: 'Anesthetic, solvent' },
    { name: 'PVC', formula: '(C₂H₃Cl)ₙ', description: 'Plastic polymer' }
  ],
  Ca: [
    { name: 'Calcium Carbonate', formula: 'CaCO₃', description: 'Limestone, marble, chalk' },
    { name: 'Calcium Hydroxide', formula: 'Ca(OH)₂', description: 'Lime water, slaked lime' },
    { name: 'Calcium Chloride', formula: 'CaCl₂', description: 'De-icer, concrete additive' },
    { name: 'Calcium Oxide', formula: 'CaO', description: 'Quicklime, cement ingredient' },
    { name: 'Calcium Sulfate', formula: 'CaSO₄', description: 'Gypsum, plaster of Paris' },
    { name: 'Calcium Phosphate', formula: 'Ca₃(PO₄)₂', description: 'Bone mineral' }
  ],
  Fe: [
    { name: 'Iron Oxide', formula: 'Fe₂O₃', description: 'Rust, red pigment' },
    { name: 'Iron Sulfide', formula: 'FeS', description: 'Pyrite, fool\'s gold' },
    { name: 'Iron Chloride', formula: 'FeCl₃', description: 'Ferric chloride, etchant' },
    { name: 'Hemoglobin', formula: 'C₂₉₅₂H₄₆₆₄N₈₁₂O₈₁₂S₈Fe₄', description: 'Blood oxygen carrier' },
    { name: 'Steel', formula: 'Fe-C', description: 'Iron-carbon alloy' },
    { name: 'Magnetite', formula: 'Fe₃O₄', description: 'Magnetic iron ore' }
  ],
  Al: [
    { name: 'Aluminum Oxide', formula: 'Al₂O₃', description: 'Corundum, sapphire, ruby' },
    { name: 'Aluminum Hydroxide', formula: 'Al(OH)₃', description: 'Antacid, flame retardant' },
    { name: 'Aluminum Sulfate', formula: 'Al₂(SO₄)₃', description: 'Water treatment, mordant' },
    { name: 'Bauxite', formula: 'Al₂O₃·2H₂O', description: 'Aluminum ore' }
  ],
  Cu: [
    { name: 'Copper Sulfate', formula: 'CuSO₄', description: 'Blue vitriol, fungicide' },
    { name: 'Copper Oxide', formula: 'CuO', description: 'Black copper oxide' },
    { name: 'Malachite', formula: 'Cu₂CO₃(OH)₂', description: 'Green copper mineral' },
    { name: 'Bronze', formula: 'Cu-Sn', description: 'Copper-tin alloy' }
  ]
};

const ElementSuggestions: React.FC<ElementSuggestionsProps> = ({ 
  element, 
  onSelectElement, 
  onAddCompound,
  suggestedElements,
  isReacting = false
}) => {
  if (!element || isReacting) return null;

  const elementMolecules = molecules[element.symbol as keyof typeof molecules] || [];
  const hasContent = suggestedElements.length > 0 || elementMolecules.length > 0;

  if (!hasContent) return null;

  const handleCompoundClick = (compound: { name: string; formula: string; description: string }) => {
    if (onAddCompound) {
      onAddCompound(compound);
    }
  };

  return (
    <div className="absolute top-2 right-2 z-20">
      <Popover>
        <PopoverTrigger asChild>
          <Button 
            variant="outline" 
            size="sm" 
            className="flex items-center gap-1 animate-pulse bg-secondary/80 hover:bg-secondary border-primary/30"
          >
            <Info className="h-3.5 w-3.5" />
            <span className="text-xs">Suggestions</span>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-96 p-4 max-h-[500px] overflow-y-auto" align="end">
          <div className="space-y-4">
            <h4 className="font-medium text-base">Suggestions for {element.name}</h4>
            
            {/* Elements Section */}
            {suggestedElements.length > 0 && (
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Atom className="h-4 w-4 text-blue-500" />
                  <span className="text-sm font-medium text-muted-foreground">Reactive Elements</span>
                </div>
                <p className="text-xs text-muted-foreground mb-3">
                  Click to add these elements for interesting reactions
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {suggestedElements.map((suggestedElement) => (
                    <div 
                      key={suggestedElement.symbol} 
                      className="cursor-pointer hover:bg-muted p-2 rounded-lg transition-colors border border-border/50 hover:border-primary/50"
                      onClick={() => onSelectElement(suggestedElement)}
                    >
                      <ElementCard 
                        element={suggestedElement} 
                        onClick={() => onSelectElement(suggestedElement)} 
                        size="sm"
                        isDraggable={false}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Separator between sections */}
            {suggestedElements.length > 0 && elementMolecules.length > 0 && (
              <Separator />
            )}

            {/* Compounds Section */}
            {elementMolecules.length > 0 && (
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Beaker className="h-4 w-4 text-green-500" />
                  <span className="text-sm font-medium text-muted-foreground">Common Compounds</span>
                </div>
                <p className="text-xs text-muted-foreground mb-3">
                  Click to add compounds containing {element.name} to the beaker
                </p>
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {elementMolecules.map((molecule, index) => (
                    <div 
                      key={index}
                      className="p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors cursor-pointer border border-border/30 hover:border-primary/50 group"
                      onClick={() => handleCompoundClick(molecule)}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-sm">{molecule.name}</span>
                          <Plus className="w-3 h-3 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                        <span className="text-xs font-mono bg-primary/10 px-2 py-1 rounded text-primary border border-primary/20">
                          {molecule.formula}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground">{molecule.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default ElementSuggestions;
