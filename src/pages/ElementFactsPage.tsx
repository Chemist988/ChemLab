
import React, { useState, useEffect } from 'react';
import { elements, Element } from '@/data/elements';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Lightbulb, RefreshCw, Heart, Zap, Star, Globe, Clock, Award } from 'lucide-react';

const ElementFactsPage = () => {
  const [currentElement, setCurrentElement] = useState<Element>(elements[0]);
  const [funFacts, setFunFacts] = useState<string[]>([]);
  const [streak, setStreak] = useState(0);
  const [favorites, setFavorites] = useState<string[]>([]);

  const elementFacts = {
    'H': [
      'Most abundant element in the universe (75%)',
      'Can exist as a metal under extreme pressure',
      'Powers the sun through nuclear fusion',
      'Essential for all life forms',
      'Lightest element on the periodic table'
    ],
    'He': [
      'Second most abundant element in universe',
      'Named after the Greek god of the sun, Helios',
      'Makes your voice squeaky when inhaled',
      'Used in party balloons and airships',
      'Never forms chemical compounds naturally'
    ],
    'Li': [
      'Lightest metal that exists',
      'Used in rechargeable batteries',
      'Can float on water like oil',
      'Essential for some medications',
      'Burns with a bright red flame'
    ],
    'C': [
      'Forms more compounds than any other element',
      'Diamond and graphite are both pure carbon',
      'Essential building block of all life',
      'Can form chains millions of atoms long',
      'Carbon dating helps determine age of fossils'
    ],
    'O': [
      'Most abundant element in Earth\'s crust',
      'Makes up 21% of the air you breathe',
      'Essential for combustion and fire',
      'Ozone layer protects us from UV radiation',
      'Liquid oxygen is magnetic and blue'
    ],
    'Na': [
      'Explodes when it touches water',
      'Essential for nerve function in your body',
      'Pure sodium is stored under oil',
      'Burns with a bright yellow flame',
      'Ancient Romans used it as currency (salary comes from salt)'
    ],
    'Fe': [
      'Makes up 35% of Earth\'s mass',
      'Essential for carrying oxygen in blood',
      'Can be magnetized permanently',
      'Most recycled metal on Earth',
      'Red color of Mars comes from iron oxide'
    ],
    'Au': [
      'Doesn\'t tarnish or rust ever',
      'So soft you can shape it with your hands',
      'All gold on Earth came from dying stars',
      'One ounce can be stretched into 50 miles of wire',
      'Your smartphone contains tiny amounts of gold'
    ]
  };

  const getRandomElement = () => {
    const randomIndex = Math.floor(Math.random() * elements.length);
    return elements[randomIndex];
  };

  const getElementFacts = (symbol: string) => {
    return elementFacts[symbol as keyof typeof elementFacts] || [
      'This element has unique properties',
      'Found in various compounds in nature',
      'Has important industrial applications',
      'Discovered through scientific research',
      'Part of the periodic table family'
    ];
  };

  const nextElement = () => {
    const newElement = getRandomElement();
    setCurrentElement(newElement);
    setFunFacts(getElementFacts(newElement.symbol));
    setStreak(prev => prev + 1);
  };

  const toggleFavorite = () => {
    if (favorites.includes(currentElement.symbol)) {
      setFavorites(prev => prev.filter(f => f !== currentElement.symbol));
    } else {
      setFavorites(prev => [...prev, currentElement.symbol]);
    }
  };

  useEffect(() => {
    setFunFacts(getElementFacts(currentElement.symbol));
  }, [currentElement]);

  const isFavorite = favorites.includes(currentElement.symbol);

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4 font-orbitron">Element Facts Explorer</h1>
          <p className="text-gray-300">Discover amazing facts about the elements around us</p>
          
          <div className="flex justify-center gap-4 mt-4">
            <Badge variant="outline" className="text-white border-white/30">
              <Star className="w-4 h-4 mr-1" />
              Streak: {streak}
            </Badge>
            <Badge variant="outline" className="text-white border-white/30">
              <Heart className="w-4 h-4 mr-1" />
              Favorites: {favorites.length}
            </Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Element Display */}
          <Card className="bg-white/10 backdrop-blur-lg border-white/20">
            <CardHeader className="text-center">
              <div className={`w-32 h-32 mx-auto rounded-full flex items-center justify-center text-4xl font-bold bg-chemistry-${currentElement.category} bg-opacity-30 border-4 border-chemistry-${currentElement.category}/50 neon-glow-${currentElement.category}`}>
                {currentElement.symbol}
              </div>
              <CardTitle className="text-white text-2xl font-orbitron mt-4">
                {currentElement.name}
              </CardTitle>
              <div className="flex justify-center gap-2 mt-2">
                <Badge variant="outline" className="text-white border-white/30">
                  #{currentElement.atomicNumber}
                </Badge>
                <Badge variant="outline" className="text-white border-white/30">
                  {currentElement.atomicMass}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="text-center">
              <div className="flex justify-center gap-2 mb-4">
                <Button
                  onClick={toggleFavorite}
                  variant={isFavorite ? "default" : "outline"}
                  size="sm"
                  className={isFavorite ? "bg-red-600 hover:bg-red-700" : "border-white/30 text-white"}
                >
                  <Heart className={`w-4 h-4 mr-1 ${isFavorite ? 'fill-current' : ''}`} />
                  {isFavorite ? 'Favorited' : 'Add to Favorites'}
                </Button>
              </div>
              
              <div className="space-y-2 text-sm text-gray-300">
                <div className="flex justify-between">
                  <span>Category:</span>
                  <Badge className={`bg-chemistry-${currentElement.category}/30`}>
                    {currentElement.category}
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span>Phase:</span>
                  <span className="text-white">{currentElement.phase}</span>
                </div>
                <div className="flex justify-between">
                  <span>Group:</span>
                  <span className="text-white">{currentElement.group || 'N/A'}</span>
                </div>
                <div className="flex justify-between">
                  <span>Period:</span>
                  <span className="text-white">{currentElement.period}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Fun Facts */}
          <Card className="bg-white/10 backdrop-blur-lg border-white/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-yellow-400" />
                Amazing Facts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {funFacts.map((fact, index) => (
                  <div 
                    key={index}
                    className="p-3 bg-gradient-to-r from-blue-900/20 to-purple-900/20 rounded-lg border border-blue-400/30 animate-fade-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="flex items-start gap-2">
                      <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-xs font-bold text-white mt-0.5">
                        {index + 1}
                      </div>
                      <p className="text-gray-200 text-sm leading-relaxed">{fact}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 flex gap-2">
                <Button 
                  onClick={nextElement}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Discover Another Element
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
          <Card className="bg-gradient-to-br from-green-700/20 to-green-600/20 backdrop-blur-lg border-green-400/30 p-4 text-center">
            <Globe className="w-8 h-8 mx-auto text-green-400 mb-2" />
            <div className="text-2xl font-bold text-white">{elements.length}</div>
            <div className="text-xs text-green-200">Elements Total</div>
          </Card>
          
          <Card className="bg-gradient-to-br from-blue-700/20 to-blue-600/20 backdrop-blur-lg border-blue-400/30 p-4 text-center">
            <Zap className="w-8 h-8 mx-auto text-blue-400 mb-2" />
            <div className="text-2xl font-bold text-white">{streak}</div>
            <div className="text-xs text-blue-200">Learning Streak</div>
          </Card>
          
          <Card className="bg-gradient-to-br from-purple-700/20 to-purple-600/20 backdrop-blur-lg border-purple-400/30 p-4 text-center">
            <Heart className="w-8 h-8 mx-auto text-purple-400 mb-2" />
            <div className="text-2xl font-bold text-white">{favorites.length}</div>
            <div className="text-xs text-purple-200">Favorites</div>
          </Card>
          
          <Card className="bg-gradient-to-br from-orange-700/20 to-orange-600/20 backdrop-blur-lg border-orange-400/30 p-4 text-center">
            <Award className="w-8 h-8 mx-auto text-orange-400 mb-2" />
            <div className="text-2xl font-bold text-white">
              {Math.floor((streak / elements.length) * 100)}%
            </div>
            <div className="text-xs text-orange-200">Progress</div>
          </Card>
        </div>
        
      </div>
    </div>
  );
};

export default ElementFactsPage;
