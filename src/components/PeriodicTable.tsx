
import React, { useState } from 'react';
import ElementCard from './ElementCard';
import { Element, elements, periodicTableLayout, categoryNames, categoryColors } from '../data/elements';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { useTheme } from '@/hooks/use-theme';
import { Slider } from '@/components/ui/slider';
import { Atom } from 'lucide-react';

interface PeriodicTableProps {
  onElementClick: (element: Element) => void;
}

const PeriodicTable: React.FC<PeriodicTableProps> = ({ onElementClick }) => {
  const { theme } = useTheme();
  const [scale, setScale] = useState(0.6);
  const [showLegend, setShowLegend] = useState(true);

  const getElementByAtomicNumber = (atomicNumber: number): Element | undefined => {
    return elements.find(element => element.atomicNumber === atomicNumber);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <Label htmlFor="zoom" className="font-medium">Zoom:</Label>
          <Slider
            id="zoom"
            min={0.4}
            max={1.0}
            step={0.05}
            value={[scale]}
            onValueChange={(values) => setScale(values[0])}
            className="w-32"
          />
          <span className="text-sm text-muted-foreground">{Math.round(scale * 100)}%</span>
        </div>
        <div className="flex items-center gap-2">
          <Label htmlFor="show-legend" className="text-sm">Legend</Label>
          <Switch 
            id="show-legend" 
            checked={showLegend} 
            onCheckedChange={setShowLegend}
          />
        </div>
      </div>

      <div className="relative rounded-lg overflow-hidden border shadow-md bg-gradient-to-br from-card to-background">
        <ScrollArea className="h-[540px] w-full">
          <div className="relative p-6" style={{ transform: `scale(${scale})`, transformOrigin: 'top left', transition: 'transform 0.3s ease' }}>
            <div 
              className="periodic-table-grid" 
              style={{ 
                display: 'grid',
                gridTemplateColumns: 'repeat(18, 42px)',
                gridGap: '3px',
                justifyContent: 'center',
                padding: '8px'
              }}
            >
              {periodicTableLayout.map((row, rowIndex) => (
                <React.Fragment key={rowIndex}>
                  {row.map((atomicNumber, colIndex) => (
                    <div 
                      key={`${rowIndex}-${colIndex}`} 
                      className={`
                        element-cell transition-all duration-300
                        ${atomicNumber > 0 ? '' : 'opacity-0 pointer-events-none'}
                      `}
                      style={{
                        width: '42px',
                        height: '42px'
                      }}
                    >
                      {atomicNumber > 0 && getElementByAtomicNumber(atomicNumber) && (
                        <ElementCard
                          element={getElementByAtomicNumber(atomicNumber)!}
                          onClick={() => onElementClick(getElementByAtomicNumber(atomicNumber)!)}
                          size="sm"
                        />
                      )}
                    </div>
                  ))}
                </React.Fragment>
              ))}
            </div>
            
            {/* Period numbers (vertical) */}
            <div className="absolute left-0 top-0 h-full flex flex-col justify-around py-6">
              {[1, 2, 3, 4, 5, 6, 7, "", 8, 9].map((period, index) => (
                <div key={`period-${index}`} className="text-xs font-medium text-muted-foreground px-1">
                  {period && period}
                </div>
              ))}
            </div>
            
            {/* Group numbers (horizontal) */}
            <div className="absolute top-0 left-0 w-full flex justify-around px-6" 
                 style={{ paddingLeft: '20px' }}>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18].map((group) => (
                <div key={`group-${group}`} className="text-xs font-medium text-muted-foreground">
                  {group}
                </div>
              ))}
            </div>
          </div>
        </ScrollArea>
        
        {/* Atom icon watermark */}
        <div className="absolute bottom-2 right-2 opacity-5 pointer-events-none">
          <Atom className="h-20 w-20" />
        </div>
      </div>
      
      {/* Legend */}
      {showLegend && (
        <div className="mt-4 flex flex-wrap gap-2 justify-center p-4 bg-card/50 rounded-lg shadow-sm border">
          <div className="w-full text-center mb-1">
            <h4 className="text-sm font-medium">Element Categories</h4>
          </div>
          {Object.entries(categoryNames).map(([category, name]) => (
            <div 
              key={category} 
              className={`px-3 py-1.5 rounded-full text-xs flex items-center gap-2 bg-chemistry-${category} bg-opacity-30 dark:bg-opacity-50 border border-chemistry-${category}/20 shadow-sm hover:shadow-md transition-shadow`}
            >
              <div className={`w-3 h-3 rounded-full bg-chemistry-${category}`}></div>
              {name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PeriodicTable;
