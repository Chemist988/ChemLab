import React, { useState, useMemo } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { realWorldObjects, RealWorldObject } from '@/data/realWorldObjects';
import { elements, Element } from '@/data/elements';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import ElementCard from '@/components/ElementCard';
import { Building2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';

const RealWorldPage = () => {
  const [selectedObject, setSelectedObject] = useState<RealWorldObject | null>(realWorldObjects[0]);
  const navigate = useNavigate();

  const objectElements = useMemo(() => {
    if (!selectedObject) return [];
    return elements.filter(el => selectedObject.elements.includes(el.symbol));
  }, [selectedObject]);

  const handleElementClick = (element: Element) => {
    // We can navigate to the main page and show details, but for now let's just log it.
    // Or we could open the detail view here. The detail view is part of the Index page.
    // Let's keep it simple for now.
    console.log('Clicked element:', element.name);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="container mx-auto py-12 px-4">
        <header className="text-center mb-16">
          <h1 className="text-5xl font-bold tracking-tight font-orbitron">Real-World Chemistry</h1>
          <p className="text-lg text-muted-foreground mt-4 max-w-3xl mx-auto">
            Discover the elements that make up the world around you. Click an object to see its chemical composition.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {realWorldObjects.map((obj) => (
            <div
              key={obj.id}
              className={cn(
                "rounded-xl overflow-hidden cursor-pointer transition-all duration-300 transform border",
                "bg-card",
                selectedObject?.id === obj.id
                  ? 'border-primary shadow-xl -translate-y-1 shadow-primary/20'
                  : 'border-border/30 shadow-md hover:shadow-lg hover:-translate-y-1 hover:border-primary/50'
              )}
              onClick={() => setSelectedObject(obj)}
            >
              <img src={obj.imageUrl} alt={obj.name} className="w-full h-40 object-cover" />
              <div className="p-4">
                <h3 className="font-semibold text-lg tracking-tight">{obj.name}</h3>
              </div>
            </div>
          ))}
        </div>

        {selectedObject && (
          <Card className="bg-card/50 backdrop-blur-sm animate-fade-in border-border/50">
            <CardHeader>
              <CardTitle className="text-3xl flex items-center gap-3 font-orbitron tracking-wide">
                <Building2 className="w-8 h-8 text-primary" />
                {selectedObject.name}
              </CardTitle>
              <CardDescription className="text-base pt-2 text-muted-foreground/90">{selectedObject.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <Separator className="my-4 bg-border/50" />
              <h4 className="text-xl font-semibold mb-6 text-center tracking-tight">Key Elements</h4>
              <div className="flex flex-wrap gap-4 justify-center">
                {objectElements.map(element => (
                  <ElementCard
                    key={element.id}
                    element={element}
                    onClick={() => handleElementClick(element)}
                    size="md"
                    isDraggable={false}
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </DndProvider>
  );
};

export default RealWorldPage;
