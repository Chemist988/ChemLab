
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown, ArrowRight, Target, Zap, Atom } from 'lucide-react';

const PeriodicTrendsPage = () => {
  const [selectedTrend, setSelectedTrend] = useState<string>('atomic-size');

  const trends = {
    'atomic-size': {
      title: 'Atomic Size',
      icon: Atom,
      description: 'How the size of atoms changes across the periodic table',
      acrossPeriods: 'Decreases from left to right',
      downGroups: 'Increases from top to bottom',
      explanation: 'Atomic size decreases across periods due to increasing nuclear charge pulling electrons closer. It increases down groups as new electron shells are added.',
      examples: [
        'Sodium (Na) is larger than Chlorine (Cl)',
        'Lithium (Li) is smaller than Cesium (Cs)',
        'Fluorine (F) is the smallest atom'
      ]
    },
    'ionization-energy': {
      title: 'Ionization Energy',
      icon: Zap,
      description: 'The energy required to remove an electron from an atom',
      acrossPeriods: 'Increases from left to right',
      downGroups: 'Decreases from top to bottom',
      explanation: 'Ionization energy increases across periods as nuclear charge increases. It decreases down groups as electrons are farther from the nucleus.',
      examples: [
        'Helium (He) has the highest ionization energy',
        'Cesium (Cs) has the lowest ionization energy',
        'Noble gases have very high ionization energies'
      ]
    },
    'electronegativity': {
      title: 'Electronegativity',
      icon: Target,
      description: 'The ability of an atom to attract electrons in a chemical bond',
      acrossPeriods: 'Increases from left to right',
      downGroups: 'Decreases from top to bottom',
      explanation: 'Electronegativity increases across periods and decreases down groups. Fluorine is the most electronegative element.',
      examples: [
        'Fluorine (F) is the most electronegative (4.0)',
        'Francium (Fr) is the least electronegative',
        'Metals have low electronegativity, nonmetals have high'
      ]
    }
  };

  const currentTrend = trends[selectedTrend as keyof typeof trends];

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4 font-orbitron">Periodic Trends</h1>
          <p className="text-gray-300">Understand how properties change across the periodic table</p>
        </div>

        <div className="flex flex-wrap gap-3 justify-center mb-8">
          {Object.entries(trends).map(([key, trend]) => (
            <Button
              key={key}
              onClick={() => setSelectedTrend(key)}
              variant={selectedTrend === key ? "default" : "outline"}
              className="flex items-center gap-2"
            >
              <trend.icon className="w-4 h-4" />
              {trend.title}
            </Button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="bg-white/10 backdrop-blur-lg border-white/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <currentTrend.icon className="w-5 h-5" />
                {currentTrend.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 mb-6">{currentTrend.description}</p>
              
              <div className="space-y-4">
                <div className="p-4 bg-blue-900/30 rounded-lg border border-blue-500/50">
                  <div className="flex items-center gap-2 mb-2">
                    <ArrowRight className="w-4 h-4 text-blue-400" />
                    <span className="text-blue-400 font-semibold">Across Periods (Left to Right)</span>
                  </div>
                  <p className="text-gray-300">{currentTrend.acrossPeriods}</p>
                </div>
                
                <div className="p-4 bg-green-900/30 rounded-lg border border-green-500/50">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingDown className="w-4 h-4 text-green-400" />
                    <span className="text-green-400 font-semibold">Down Groups (Top to Bottom)</span>
                  </div>
                  <p className="text-gray-300">{currentTrend.downGroups}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-lg border-white/20">
            <CardHeader>
              <CardTitle className="text-white">Why This Happens</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 mb-6">{currentTrend.explanation}</p>
              
              <h4 className="text-white font-semibold mb-3">Examples:</h4>
              <div className="space-y-2">
                {currentTrend.examples.map((example, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <Badge variant="outline" className="text-xs">
                      {index + 1}
                    </Badge>
                    <span className="text-gray-300 text-sm">{example}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-gradient-to-r from-purple-900/30 to-blue-900/30 backdrop-blur-lg border-white/20 mt-8">
          <CardHeader>
            <CardTitle className="text-white">Quick Reference Guide</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
              <div>
                <h4 className="text-purple-400 font-semibold mb-3">Atomic Size</h4>
                <div className="space-y-1 text-gray-300">
                  <p>• Largest: Bottom-left (Cs, Fr)</p>
                  <p>• Smallest: Top-right (He, F)</p>
                  <p>• Metals {'>'} Nonmetals</p>
                </div>
              </div>
              
              <div>
                <h4 className="text-blue-400 font-semibold mb-3">Ionization Energy</h4>
                <div className="space-y-1 text-gray-300">
                  <p>• Highest: Noble gases</p>
                  <p>• Lowest: Alkali metals</p>
                  <p>• Nonmetals {'>'} Metals</p>
                </div>
              </div>
              
              <div>
                <h4 className="text-green-400 font-semibold mb-3">Electronegativity</h4>
                <div className="space-y-1 text-gray-300">
                  <p>• Highest: Fluorine (4.0)</p>
                  <p>• Lowest: Francium</p>
                  <p>• Halogens {'>'} Metals</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PeriodicTrendsPage;
