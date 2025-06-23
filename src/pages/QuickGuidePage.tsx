
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BookOpen, Atom, FlaskConical, Zap, Calculator, 
  ArrowRight, CheckCircle, Star, Lightbulb, Target 
} from 'lucide-react';

const QuickGuidePage = () => {
  const [completedTasks, setCompletedTasks] = useState<number[]>([]);

  const guides = [
    {
      id: 'basics',
      title: 'Chemistry Basics',
      icon: Atom,
      color: 'blue',
      items: [
        { id: 1, title: 'Atoms & Elements', description: 'Building blocks of matter', time: '2 min' },
        { id: 2, title: 'Periodic Table Layout', description: 'How elements are organized', time: '3 min' },
        { id: 3, title: 'Chemical Bonds', description: 'How atoms connect', time: '4 min' },
        { id: 4, title: 'States of Matter', description: 'Solid, liquid, gas, plasma', time: '3 min' }
      ]
    },
    {
      id: 'reactions',
      title: 'Chemical Reactions',
      icon: FlaskConical,
      color: 'green',
      items: [
        { id: 5, title: 'Types of Reactions', description: 'Synthesis, decomposition, etc.', time: '5 min' },
        { id: 6, title: 'Balancing Equations', description: 'Conservation of atoms', time: '4 min' },
        { id: 7, title: 'Reaction Rates', description: 'Fast vs slow reactions', time: '3 min' },
        { id: 8, title: 'Catalysts', description: 'Speeding up reactions', time: '3 min' }
      ]
    },
    {
      id: 'calculations',
      title: 'Essential Calculations',
      icon: Calculator,
      color: 'purple',
      items: [
        { id: 9, title: 'Molar Mass', description: 'Weight of molecules', time: '3 min' },
        { id: 10, title: 'Molarity', description: 'Concentration calculations', time: '4 min' },
        { id: 11, title: 'Stoichiometry', description: 'Reaction quantities', time: '5 min' },
        { id: 12, title: 'Gas Laws', description: 'Pressure, volume, temperature', time: '4 min' }
      ]
    }
  ];

  const quickTips = [
    { icon: Lightbulb, tip: 'Noble gases rarely form compounds because they have full electron shells' },
    { icon: Zap, tip: 'Metals lose electrons easily, non-metals gain them' },
    { icon: Target, tip: 'Electronegativity increases from left to right across periods' },
    { icon: Star, tip: 'Atomic size decreases from left to right, increases down groups' }
  ];

  const toggleTask = (taskId: number) => {
    if (completedTasks.includes(taskId)) {
      setCompletedTasks(prev => prev.filter(id => id !== taskId));
    } else {
      setCompletedTasks(prev => [...prev, taskId]);
    }
  };

  const getProgress = () => {
    const totalTasks = guides.reduce((sum, guide) => sum + guide.items.length, 0);
    return Math.round((completedTasks.length / totalTasks) * 100);
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4 font-orbitron">Quick Chemistry Guide</h1>
          <p className="text-gray-300 mb-4">Learn chemistry concepts in bite-sized chunks</p>
          
          <div className="flex justify-center gap-4">
            <Badge variant="outline" className="text-white border-white/30 px-4 py-2">
              <CheckCircle className="w-4 h-4 mr-2" />
              {completedTasks.length} completed
            </Badge>
            <Badge variant="outline" className="text-white border-white/30 px-4 py-2">
              <Target className="w-4 h-4 mr-2" />
              {getProgress()}% progress
            </Badge>
          </div>
        </div>

        <Tabs defaultValue="basics" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 bg-white/10 backdrop-blur-lg">
            {guides.map((guide) => (
              <TabsTrigger 
                key={guide.id} 
                value={guide.id}
                className="data-[state=active]:bg-white/20 text-white"
              >
                <guide.icon className="w-4 h-4 mr-2" />
                {guide.title}
              </TabsTrigger>
            ))}
          </TabsList>

          {guides.map((guide) => (
            <TabsContent key={guide.id} value={guide.id}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {guide.items.map((item) => {
                  const isCompleted = completedTasks.includes(item.id);
                  return (
                    <Card 
                      key={item.id}
                      className={`bg-white/10 backdrop-blur-lg border-white/20 cursor-pointer transition-all duration-300 hover:scale-105 ${
                        isCompleted ? 'ring-2 ring-green-400 bg-green-900/20' : ''
                      }`}
                      onClick={() => toggleTask(item.id)}
                    >
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-full bg-${guide.color}-500/20 flex items-center justify-center`}>
                              {isCompleted ? (
                                <CheckCircle className="w-5 h-5 text-green-400" />
                              ) : (
                                <span className="text-white font-bold">{item.id}</span>
                              )}
                            </div>
                            <div>
                              <CardTitle className="text-white text-lg">{item.title}</CardTitle>
                              <Badge variant="outline" className="text-xs mt-1 border-white/30 text-gray-300">
                                {item.time}
                              </Badge>
                            </div>
                          </div>
                          <ArrowRight className="w-5 h-5 text-gray-400" />
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-300 text-sm">{item.description}</p>
                        <div className="mt-3">
                          <Button 
                            size="sm" 
                            variant={isCompleted ? "default" : "outline"}
                            className={`w-full ${
                              isCompleted 
                                ? 'bg-green-600 hover:bg-green-700' 
                                : 'border-white/30 text-white hover:bg-white/10'
                            }`}
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleTask(item.id);
                            }}
                          >
                            {isCompleted ? 'Completed!' : 'Mark as Read'}
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </TabsContent>
          ))}
        </Tabs>

        {/* Quick Tips Section */}
        <Card className="mt-8 bg-gradient-to-br from-purple-700/20 to-blue-700/20 backdrop-blur-lg border-purple-400/30">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-yellow-400" />
              Quick Tips & Tricks
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {quickTips.map((tip, index) => (
                <div 
                  key={index}
                  className="flex items-start gap-3 p-3 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-colors animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <tip.icon className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                  <p className="text-gray-200 text-sm">{tip.tip}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Progress Summary */}
        <Card className="mt-6 bg-gradient-to-r from-green-700/20 to-blue-700/20 backdrop-blur-lg border-green-400/30">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-white font-semibold">Learning Progress</h3>
                <p className="text-gray-300 text-sm">Keep going! You're doing great.</p>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-green-400">{getProgress()}%</div>
                <div className="text-sm text-gray-300">{completedTasks.length} of {guides.reduce((sum, guide) => sum + guide.items.length, 0)} topics</div>
              </div>
            </div>
            <div className="mt-4 bg-gray-700 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-green-400 to-blue-400 h-2 rounded-full transition-all duration-500"
                style={{ width: `${getProgress()}%` }}
              ></div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default QuickGuidePage;
