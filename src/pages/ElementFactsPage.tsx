
import React, { useState } from 'react';
import { elements, Element } from '@/data/elements';
import ElementCard from '@/components/ElementCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Atom, Search, Thermometer, Zap, Weight } from 'lucide-react';

const ElementFactsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedElement, setSelectedElement] = useState<Element | null>(null);

  const filteredElements = elements.filter(element =>
    element.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    element.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
    element.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getPhaseAtRoomTemp = (element: Element) => {
    if (!element.meltingPoint || !element.boilingPoint) return 'Unknown';
    
    const roomTemp = 25; // 25°C
    
    if (roomTemp < element.meltingPoint) return 'Solid';
    if (roomTemp < element.boilingPoint) return 'Liquid';
    return 'Gas';
  };

  const getInterestingFact = (element: Element) => {
    const facts: Record<string, string> = {
      'Hydrogen': 'Most abundant element in the universe, making up about 75% of normal matter.',
      'Helium': 'Second lightest element and is used to fill balloons because it\'s lighter than air.',
      'Carbon': 'Forms the basis of all organic life and can exist as diamond or graphite.',
      'Oxygen': 'Essential for combustion and respiration, makes up 21% of Earth\'s atmosphere.',
      'Gold': 'So unreactive that it can be found in pure form in nature.',
      'Iron': 'Makes up most of Earth\'s core and is essential for red blood cells.',
      'Uranium': 'Used in nuclear power plants and has the highest atomic mass of naturally occurring elements.',
    };
    
    return facts[element.name] || `${element.name} belongs to the ${element.category.replace('-', ' ')} group.`;
  };

  return (
    <div className="container mx-auto py-8 px-4 max-w-7xl">
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-white mb-4 font-orbitron">Element Facts</h1>
        <p className="text-gray-300 max-w-2xl mx-auto">
          Discover fascinating facts about all 118 elements in the periodic table
        </p>
      </header>

      {/* Search */}
      <div className="mb-6">
        <div className="relative max-w-md mx-auto">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            type="text"
            placeholder="Search elements..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-white/90"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Element Grid */}
        <div className="lg:col-span-2">
          <Card className="bg-white/90">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Atom className="w-5 h-5" />
                Elements ({filteredElements.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2">
                {filteredElements.map((element) => (
                  <div
                    key={element.id}
                    onClick={() => setSelectedElement(element)}
                    className="cursor-pointer transform hover:scale-105 transition-transform"
                  >
                    <ElementCard
                      element={element}
                      onClick={() => setSelectedElement(element)}
                      size="sm"
                      isDraggable={false}
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Element Details */}
        <div>
          {selectedElement ? (
            <Card className="bg-white/90 sticky top-4">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                    {selectedElement.symbol}
                  </div>
                  {selectedElement.name}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Basic Info */}
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Atomic Number:</span>
                    <p className="font-semibold">{selectedElement.atomicNumber}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Atomic Mass:</span>
                    <p className="font-semibold">{selectedElement.atomicMass}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Category:</span>
                    <Badge variant="outline" className="mt-1">
                      {selectedElement.category.replace('-', ' ')}
                    </Badge>
                  </div>
                  <div>
                    <span className="text-gray-600">Phase at 25°C:</span>
                    <p className="font-semibold">{getPhaseAtRoomTemp(selectedElement)}</p>
                  </div>
                </div>

                {/* Physical Properties */}
                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-800">Physical Properties</h4>
                  
                  {selectedElement.density && (
                    <div className="flex items-center gap-2">
                      <Weight className="w-4 h-4 text-gray-600" />
                      <span className="text-sm">Density: {selectedElement.density} g/cm³</span>
                    </div>
                  )}
                  
                  {selectedElement.meltingPoint && (
                    <div className="flex items-center gap-2">
                      <Thermometer className="w-4 h-4 text-blue-600" />
                      <span className="text-sm">Melting Point: {selectedElement.meltingPoint}°C</span>
                    </div>
                  )}
                  
                  {selectedElement.boilingPoint && (
                    <div className="flex items-center gap-2">
                      <Thermometer className="w-4 h-4 text-red-600" />
                      <span className="text-sm">Boiling Point: {selectedElement.boilingPoint}°C</span>
                    </div>
                  )}
                  
                  {selectedElement.electronegativity && (
                    <div className="flex items-center gap-2">
                      <Zap className="w-4 h-4 text-yellow-600" />
                      <span className="text-sm">Electronegativity: {selectedElement.electronegativity}</span>
                    </div>
                  )}
                </div>

                {/* Electron Configuration */}
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Electron Configuration</h4>
                  <code className="text-xs bg-gray-100 px-2 py-1 rounded block">
                    {selectedElement.electronConfiguration}
                  </code>
                </div>

                {/* Discovery */}
                {selectedElement.discoveredBy && (
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Discovery</h4>
                    <p className="text-sm text-gray-600">
                      Discovered by: {selectedElement.discoveredBy}
                    </p>
                  </div>
                )}

                {/* Fun Fact */}
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Interesting Fact</h4>
                  <p className="text-sm text-gray-600 italic">
                    {getInterestingFact(selectedElement)}
                  </p>
                </div>

                {/* Description */}
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Description</h4>
                  <p className="text-sm text-gray-600">
                    {selectedElement.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="bg-white/90">
              <CardContent className="text-center py-12">
                <Atom className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                <p className="text-gray-600">Select an element to view its facts and properties</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default ElementFactsPage;
