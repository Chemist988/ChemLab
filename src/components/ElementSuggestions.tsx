
import React from 'react';
import { Element } from '@/data/elements';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import ElementCard from './ElementCard';
import { Button } from '@/components/ui/button';
import { Info, Atom, Beaker, Zap } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

interface ElementSuggestionsProps {
  element: Element | null;
  onSelectElement: (element: Element) => void;
  suggestedElements: Element[];
  isReacting?: boolean;
}

// Enhanced molecules database with more compounds
const molecules = {
  H: [
    { name: 'Water', formula: 'H₂O', description: 'Universal solvent, essential for life' },
    { name: 'Hydrogen Gas', formula: 'H₂', description: 'Clean fuel, lightest element' },
    { name: 'Ammonia', formula: 'NH₃', description: 'Fertilizer base, household cleaner' },
    { name: 'Methane', formula: 'CH₄', description: 'Natural gas, greenhouse gas' },
    { name: 'Hydrochloric Acid', formula: 'HCl', description: 'Strong acid, stomach acid' },
    { name: 'Hydrogen Peroxide', formula: 'H₂O₂', description: 'Disinfectant, bleaching agent' },
    { name: 'Ethanol', formula: 'C₂H₅OH', description: 'Alcohol in beverages' },
    { name: 'Glucose', formula: 'C₆H₁₂O₆', description: 'Blood sugar, energy source' }
  ],
  O: [
    { name: 'Water', formula: 'H₂O', description: 'Life essential, polar molecule' },
    { name: 'Carbon Dioxide', formula: 'CO₂', description: 'Greenhouse gas, respiration product' },
    { name: 'Oxygen Gas', formula: 'O₂', description: 'Breathable gas, supports combustion' },
    { name: 'Ozone', formula: 'O₃', description: 'UV protection, oxidizing agent' },
    { name: 'Carbon Monoxide', formula: 'CO', description: 'Toxic gas, incomplete combustion' },
    { name: 'Sulfur Dioxide', formula: 'SO₂', description: 'Air pollutant, acid rain precursor' },
    { name: 'Nitric Oxide', formula: 'NO', description: 'Signaling molecule, air pollutant' },
    { name: 'Iron Oxide', formula: 'Fe₂O₃', description: 'Rust, red pigment' }
  ],
  C: [
    { name: 'Carbon Dioxide', formula: 'CO₂', description: 'Combustion product, photosynthesis reactant' },
    { name: 'Methane', formula: 'CH₄', description: 'Simplest hydrocarbon, natural gas' },
    { name: 'Carbon Monoxide', formula: 'CO', description: 'Toxic gas, industrial use' },
    { name: 'Glucose', formula: 'C₆H₁₂O₆', description: 'Simple sugar, cellular fuel' },
    { name: 'Benzene', formula: 'C₆H₆', description: 'Aromatic compound, industrial solvent' },
    { name: 'Acetone', formula: 'C₃H₆O', description: 'Solvent, nail polish remover' },
    { name: 'Ethylene', formula: 'C₂H₄', description: 'Plant hormone, plastic precursor' },
    { name: 'Diamond', formula: 'C', description: 'Hardest natural material' }
  ],
  N: [
    { name: 'Ammonia', formula: 'NH₃', description: 'Fertilizer production, cleaning agent' },
    { name: 'Nitrogen Gas', formula: 'N₂', description: 'Atmospheric gas, inert atmosphere' },
    { name: 'Nitric Acid', formula: 'HNO₃', description: 'Strong acid, explosive precursor' },
    { name: 'Urea', formula: 'CO(NH₂)₂', description: 'Fertilizer, biological waste product' },
    { name: 'Nitrous Oxide', formula: 'N₂O', description: 'Laughing gas, anesthetic' },
    { name: 'TNT', formula: 'C₇H₅N₃O₆', description: 'Explosive compound' },
    { name: 'Caffeine', formula: 'C₈H₁₀N₄O₂', description: 'Stimulant in coffee' },
    { name: 'Aspirin', formula: 'C₉H₈O₄', description: 'Pain reliever medication' }
  ],
  Na: [
    { name: 'Salt', formula: 'NaCl', description: 'Table salt, essential electrolyte' },
    { name: 'Sodium Hydroxide', formula: 'NaOH', description: 'Caustic soda, strong base' },
    { name: 'Sodium Bicarbonate', formula: 'NaHCO₃', description: 'Baking soda, antacid' },
    { name: 'Sodium Carbonate', formula: 'Na₂CO₃', description: 'Washing soda, glass making' },
    { name: 'Sodium Sulfate', formula: 'Na₂SO₄', description: 'Industrial chemical, detergents' },
    { name: 'Sodium Nitrate', formula: 'NaNO₃', description: 'Fertilizer, food preservative' },
    { name: 'Sodium Phosphate', formula: 'Na₃PO₄', description: 'Cleaning agent, food additive' }
  ],
  Cl: [
    { name: 'Salt', formula: 'NaCl', description: 'Sodium chloride, food seasoning' },
    { name: 'Hydrochloric Acid', formula: 'HCl', description: 'Strong acid, digestion aid' },
    { name: 'Chlorine Gas', formula: 'Cl₂', description: 'Water disinfectant, bleaching' },
    { name: 'Bleach', formula: 'NaClO', description: 'Household cleaner, disinfectant' },
    { name: 'Calcium Chloride', formula: 'CaCl₂', description: 'Road salt, desiccant' },
    { name: 'PVC', formula: '(C₂H₃Cl)ₙ', description: 'Plastic pipes, vinyl records' },
    { name: 'Chloroform', formula: 'CHCl₃', description: 'Solvent, formerly anesthetic' }
  ],
  Ca: [
    { name: 'Calcium Carbonate', formula: 'CaCO₃', description: 'Limestone, marble, chalk' },
    { name: 'Calcium Hydroxide', formula: 'Ca(OH)₂', description: 'Lime water, mortar' },
    { name: 'Calcium Chloride', formula: 'CaCl₂', description: 'Road de-icer, drying agent' },
    { name: 'Calcium Oxide', formula: 'CaO', description: 'Quicklime, cement production' },
    { name: 'Calcium Sulfate', formula: 'CaSO₄', description: 'Gypsum, plaster of Paris' },
    { name: 'Calcium Phosphate', formula: 'Ca₃(PO₄)₂', description: 'Bone mineral, fertilizer' },
    { name: 'Calcium Fluoride', formula: 'CaF₂', description: 'Fluorite, optical components' }
  ],
  Fe: [
    { name: 'Iron Oxide', formula: 'Fe₂O₃', description: 'Rust, red pigment, ore' },
    { name: 'Iron Sulfide', formula: 'FeS', description: 'Pyrite, fools gold' },
    { name: 'Iron Chloride', formula: 'FeCl₃', description: 'Ferric chloride, water treatment' },
    { name: 'Hemoglobin', formula: 'C₂₉₅₂H₄₆₆₄N₈₁₂O₈₁₂S₈Fe₄', description: 'Oxygen transport protein' },
    { name: 'Steel', formula: 'Fe-C alloy', description: 'Construction material' },
    { name: 'Iron Carbonate', formula: 'FeCO₃', description: 'Siderite mineral' },
    { name: 'Magnetite', formula: 'Fe₃O₄', description: 'Magnetic iron ore' }
  ],
  S: [
    { name: 'Sulfuric Acid', formula: 'H₂SO₄', description: 'Strong acid, battery acid' },
    { name: 'Hydrogen Sulfide', formula: 'H₂S', description: 'Rotten egg smell, toxic gas' },
    { name: 'Sulfur Dioxide', formula: 'SO₂', description: 'Preservative, air pollutant' },
    { name: 'Sodium Sulfate', formula: 'Na₂SO₄', description: 'Glauber salt, detergents' },
    { name: 'Gypsum', formula: 'CaSO₄·2H₂O', description: 'Building material' },
    { name: 'Epsom Salt', formula: 'MgSO₄·7H₂O', description: 'Bath salts, laxative' }
  ],
  Mg: [
    { name: 'Magnesium Oxide', formula: 'MgO', description: 'Refractory material, antacid' },
    { name: 'Magnesium Hydroxide', formula: 'Mg(OH)₂', description: 'Milk of magnesia' },
    { name: 'Magnesium Sulfate', formula: 'MgSO₄', description: 'Epsom salt, fertilizer' },
    { name: 'Magnesium Chloride', formula: 'MgCl₂', description: 'De-icer, tofu coagulant' },
    { name: 'Chlorophyll', formula: 'C₅₅H₇₂MgN₄O₅', description: 'Plant pigment, photosynthesis' }
  ],
  Al: [
    { name: 'Aluminum Oxide', formula: 'Al₂O₃', description: 'Corundum, abrasive, catalyst' },
    { name: 'Aluminum Chloride', formula: 'AlCl₃', description: 'Catalyst, antiperspirant' },
    { name: 'Aluminum Sulfate', formula: 'Al₂(SO₄)₃', description: 'Water treatment, paper making' },
    { name: 'Bauxite', formula: 'Al₂O₃·xH₂O', description: 'Aluminum ore' }
  ]
};

const ElementSuggestions: React.FC<ElementSuggestionsProps> = ({ 
  element, 
  onSelectElement, 
  suggestedElements,
  isReacting = false
}) => {
  if (!element || isReacting) return null;

  const elementMolecules = molecules[element.symbol as keyof typeof molecules] || [];
  const hasContent = suggestedElements.length > 0 || elementMolecules.length > 0;

  if (!hasContent) return null;

  return (
    <div className="absolute top-2 right-2 z-20">
      <Popover>
        <PopoverTrigger asChild>
          <Button 
            variant="outline" 
            size="sm" 
            className="flex items-center gap-1 animate-pulse bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all border-primary/20 hover:border-primary/40"
          >
            <Zap className="h-3.5 w-3.5 text-amber-500" />
            <span className="text-xs font-medium">Smart Suggestions</span>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-96 p-4 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border border-white/20 dark:border-gray-700/30" align="end">
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-3">
              <div className={`w-6 h-6 rounded-full bg-chemistry-${element.category} flex items-center justify-center`}>
                <span className="text-xs font-bold text-white">{element.symbol}</span>
              </div>
              <h4 className="font-semibold text-base">Reactions for {element.name}</h4>
            </div>
            
            {/* Reactive Elements Section */}
            {suggestedElements.length > 0 && (
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Atom className="h-4 w-4 text-blue-500" />
                  <span className="text-sm font-semibold text-muted-foreground">Reactive Partners</span>
                </div>
                <p className="text-xs text-muted-foreground mb-3">
                  These elements react with {element.name} to form interesting compounds
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {suggestedElements.map((suggestedElement) => (
                    <div 
                      key={suggestedElement.symbol} 
                      className="cursor-pointer hover:bg-muted/50 p-2 rounded-lg transition-colors group"
                      onClick={() => onSelectElement(suggestedElement)}
                    >
                      <ElementCard 
                        element={suggestedElement} 
                        onClick={() => onSelectElement(suggestedElement)} 
                        size="sm"
                        isDraggable={false}
                        className="group-hover:scale-105 transition-transform"
                      />
                      <p className="text-xs text-center mt-1 text-muted-foreground">
                        +{element.symbol} → React!
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Separator */}
            {suggestedElements.length > 0 && elementMolecules.length > 0 && (
              <Separator className="my-4" />
            )}

            {/* Molecules Section */}
            {elementMolecules.length > 0 && (
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Beaker className="h-4 w-4 text-green-500" />
                  <span className="text-sm font-semibold text-muted-foreground">
                    Compounds ({elementMolecules.length})
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mb-3">
                  Common molecules and compounds containing {element.name}
                </p>
                <div className="space-y-2 max-h-64 overflow-y-auto custom-scrollbar">
                  {elementMolecules.map((molecule, index) => (
                    <div 
                      key={index}
                      className="group p-3 bg-gradient-to-r from-muted/30 to-muted/10 rounded-xl hover:from-muted/50 hover:to-muted/20 transition-all cursor-pointer border border-muted/20 hover:border-muted/40"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold text-sm group-hover:text-primary transition-colors">
                          {molecule.name}
                        </span>
                        <span className="text-xs font-mono bg-primary/15 dark:bg-primary/25 px-2 py-1 rounded-md text-primary font-medium">
                          {molecule.formula}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        {molecule.description}
                      </p>
                      <div className="mt-2 flex items-center gap-1 text-xs text-muted-foreground">
                        <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                        <span>Contains {element.symbol}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Footer tip */}
            <div className="pt-2 border-t border-muted/20">
              <p className="text-xs text-muted-foreground text-center">
                💡 Drag elements to the reaction beaker to see them interact!
              </p>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default ElementSuggestions;
