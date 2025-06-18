
import React from 'react';
import { Element } from '@/data/elements';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import ElementCard from './ElementCard';
import { Button } from '@/components/ui/button';
import { Info, Atom, Molecule } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

interface ElementSuggestionsProps {
  element: Element | null;
  onSelectElement: (element: Element) => void;
  suggestedElements: Element[];
  isReacting?: boolean;
}

// Common molecules database
const molecules = {
  H: [
    { name: 'Water', formula: 'H₂O', description: 'Universal solvent' },
    { name: 'Hydrogen Gas', formula: 'H₂', description: 'Diatomic gas' },
    { name: 'Ammonia', formula: 'NH₃', description: 'Basic compound' },
    { name: 'Methane', formula: 'CH₄', description: 'Simplest hydrocarbon' }
  ],
  O: [
    { name: 'Water', formula: 'H₂O', description: 'Essential for life' },
    { name: 'Carbon Dioxide', formula: 'CO₂', description: 'Greenhouse gas' },
    { name: 'Oxygen Gas', formula: 'O₂', description: 'Breathable gas' },
    { name: 'Ozone', formula: 'O₃', description: 'Atmospheric protector' }
  ],
  C: [
    { name: 'Carbon Dioxide', formula: 'CO₂', description: 'Combustion product' },
    { name: 'Methane', formula: 'CH₄', description: 'Natural gas' },
    { name: 'Carbon Monoxide', formula: 'CO', description: 'Toxic gas' },
    { name: 'Glucose', formula: 'C₆H₁₂O₆', description: 'Sugar molecule' }
  ],
  N: [
    { name: 'Ammonia', formula: 'NH₃', description: 'Fertilizer base' },
    { name: 'Nitrogen Gas', formula: 'N₂', description: 'Atmospheric gas' },
    { name: 'Nitric Acid', formula: 'HNO₃', description: 'Strong acid' },
    { name: 'Urea', formula: 'CO(NH₂)₂', description: 'Biological waste' }
  ],
  Na: [
    { name: 'Salt', formula: 'NaCl', description: 'Table salt' },
    { name: 'Sodium Hydroxide', formula: 'NaOH', description: 'Strong base' },
    { name: 'Sodium Bicarbonate', formula: 'NaHCO₃', description: 'Baking soda' },
    { name: 'Sodium Carbonate', formula: 'Na₂CO₃', description: 'Washing soda' }
  ],
  Cl: [
    { name: 'Salt', formula: 'NaCl', description: 'Sodium chloride' },
    { name: 'Hydrochloric Acid', formula: 'HCl', description: 'Stomach acid' },
    { name: 'Chlorine Gas', formula: 'Cl₂', description: 'Disinfectant' },
    { name: 'Bleach', formula: 'NaClO', description: 'Cleaning agent' }
  ],
  Ca: [
    { name: 'Calcium Carbonate', formula: 'CaCO₃', description: 'Limestone' },
    { name: 'Calcium Hydroxide', formula: 'Ca(OH)₂', description: 'Lime water' },
    { name: 'Calcium Chloride', formula: 'CaCl₂', description: 'De-icer' },
    { name: 'Calcium Oxide', formula: 'CaO', description: 'Quicklime' }
  ],
  Fe: [
    { name: 'Iron Oxide', formula: 'Fe₂O₃', description: 'Rust' },
    { name: 'Iron Sulfide', formula: 'FeS', description: 'Pyrite' },
    { name: 'Iron Chloride', formula: 'FeCl₃', description: 'Ferric chloride' },
    { name: 'Heme', formula: 'C₃₄H₃₂FeN₄O₄', description: 'Blood component' }
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
            className="flex items-center gap-1 animate-pulse bg-secondary/80"
          >
            <Info className="h-3.5 w-3.5" />
            <span className="text-xs">Suggestions</span>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80 p-3" align="end">
          <div className="space-y-3">
            <h4 className="font-medium text-sm">Suggestions for {element.name}</h4>
            
            {/* Elements Section */}
            {suggestedElements.length > 0 && (
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Atom className="h-3.5 w-3.5 text-blue-500" />
                  <span className="text-xs font-medium text-muted-foreground">Reactive Elements</span>
                </div>
                <p className="text-xs text-muted-foreground mb-2">
                  Try adding one of these elements for interesting reactions
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {suggestedElements.map((suggestedElement) => (
                    <div 
                      key={suggestedElement.symbol} 
                      className="cursor-pointer hover:bg-muted p-1 rounded transition-colors"
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

            {/* Molecules Section */}
            {elementMolecules.length > 0 && (
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Molecule className="h-3.5 w-3.5 text-green-500" />
                  <span className="text-xs font-medium text-muted-foreground">Common Molecules</span>
                </div>
                <p className="text-xs text-muted-foreground mb-2">
                  Molecules that contain {element.name}
                </p>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {elementMolecules.map((molecule, index) => (
                    <div 
                      key={index}
                      className="p-2 bg-muted/50 rounded-lg hover:bg-muted transition-colors cursor-pointer"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-medium text-sm">{molecule.name}</span>
                        <span className="text-xs font-mono bg-primary/10 px-1.5 py-0.5 rounded text-primary">
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
