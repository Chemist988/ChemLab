import React, { useState, useMemo } from 'react';
import { realWorldObjects, RealWorldObject } from '@/data/realWorldObjects';
import { elements, Element } from '@/data/elements';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import ElementCard from '@/components/ElementCard';
import { Building2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

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
    <div className="container mx-auto py-8 px-4">
      <header className="text-center mb-12">
        <h1 className="text-5xl font-bold tracking-tight font-orbitron">Real-World Chemistry</h1>
        <p className="text-lg text-muted-foreground mt-3 max-w-2xl mx-auto">
          Discover the elements that make up the world around you. Click an object to see its chemical composition.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {realWorldObjects.map((obj) => (
          <div
            key={obj.id}
            className={`rounded-xl overflow-hidden cursor-pointer transition-all duration-300 transform hover:scale-105 ${selectedObject?.id === obj.id ? 'ring-2 ring-primary shadow-lg' : 'shadow-md'}`}
            onClick={() => setSelectedObject(obj)}
          >
            <img src={obj.imageUrl} alt={obj.name} className="w-full h-40 object-cover" />
            <div className="p-4 bg-card">
              <h3 className="font-semibold text-lg">{obj.name}</h3>
            </div>
          </div>
        ))}
      </div>

      {selectedObject && (
        <Card className="bg-background/80 backdrop-blur-sm animate-fade-in">
          <CardHeader>
            <CardTitle className="text-3xl flex items-center gap-3">
              <Building2 className="w-8 h-8 text-primary" />
              {selectedObject.name}
            </CardTitle>
            <CardDescription className="text-base pt-2">{selectedObject.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <Separator className="my-4" />
            <h4 className="text-xl font-semibold mb-4">Key Elements:</h4>
            <div className="flex flex-wrap gap-3 justify-center">
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
  );
};

export default RealWorldPage;
