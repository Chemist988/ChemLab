
import React, { useState, useEffect } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useNavigate } from 'react-router-dom';
import PeriodicTable from '@/components/PeriodicTable';
import ReactionZone from '@/components/ReactionZone';
import ElementDetail from '@/components/ElementDetail';
import EduBotAssistant from '@/components/EduBotAssistant';
import { Element } from '@/data/elements';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from '@/components/ui/separator';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Atom, Beaker, BookOpen, Bot, Sparkles, ArrowRight, Zap, Trophy, Target, Clock, Star, Flame, Lightbulb } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Index = () => {
  const [selectedElement, setSelectedElement] = useState<Element | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);
  const [elementsExplored, setElementsExplored] = useState<string[]>([]);
  const [reactionsPerformed, setReactionsPerformed] = useState(0);
  const [streak, setStreak] = useState(0);
  const [achievements, setAchievements] = useState<string[]>([]);
  const [dailyProgress, setDailyProgress] = useState(0);
  const navigate = useNavigate();

  const handleElementClick = (element: Element) => {
    setSelectedElement(element);
    setDetailOpen(true);
    
    // Track exploration
    if (!elementsExplored.includes(element.symbol)) {
      setElementsExplored(prev => [...prev, element.symbol]);
      setStreak(prev => prev + 1);
      setDailyProgress(prev => Math.min(prev + 10, 100));
      
      // Check for achievements
      if (elementsExplored.length + 1 === 10 && !achievements.includes('first-10')) {
        setAchievements(prev => [...prev, 'first-10']);
      }
      if (elementsExplored.length + 1 === 50 && !achievements.includes('half-century')) {
        setAchievements(prev => [...prev, 'half-century']);
      }
    }
  };

  const handleReactionComplete = () => {
    setReactionsPerformed(prev => prev + 1);
    setDailyProgress(prev => Math.min(prev + 15, 100));
    
    if (reactionsPerformed + 1 === 5 && !achievements.includes('reaction-rookie')) {
      setAchievements(prev => [...prev, 'reaction-rookie']);
    }
  };

  const achievementList = [
    { id: 'first-10', name: 'Explorer', description: 'Discovered 10 elements', icon: Target },
    { id: 'half-century', name: 'Element Master', description: 'Explored 50 elements', icon: Trophy },
    { id: 'reaction-rookie', name: 'Reaction Rookie', description: 'Performed 5 reactions', icon: Flame },
  ];

  const innovativeFeatures = [
    {
      title: 'Smart Element Recommendations',
      description: 'AI suggests elements based on your interests',
      icon: Lightbulb,
      color: 'yellow'
    },
    {
      title: 'Real-time Chemistry Updates',
      description: 'Latest discoveries from the chemistry world',
      icon: Zap,
      color: 'blue'
    },
    {
      title: 'Interactive 3D Models',
      description: 'Visualize molecular structures in 3D',
      icon: Atom,
      color: 'purple'
    },
    {
      title: 'Collaborative Learning',
      description: 'Share discoveries with other chemists',
      icon: Star,
      color: 'green'
    }
  ];

  useEffect(() => {
    // Simulate daily progress reset
    const lastVisit = localStorage.getItem('lastVisit');
    const today = new Date().toDateString();
    
    if (lastVisit !== today) {
      setDailyProgress(0);
      localStorage.setItem('lastVisit', today);
    }
  }, []);

  return (
    <DndProvider backend={HTML5Backend}>
      <>
        <div className="container mx-auto py-8 px-4">
          {/* Enhanced Header with Stats */}
          <header className="mb-12 flex flex-col items-center relative">
            <div className="text-center space-y-6">
              <h1 className="text-6xl md:text-7xl font-bold tracking-tight text-white font-orbitron drop-shadow-2xl animate-fade-in">
                ChemLab Pro
              </h1>
              <p className="text-xl font-light text-gray-300 max-w-3xl mx-auto leading-relaxed">
                Your advanced chemistry playground with AI-powered insights, 
                real-time collaboration, and immersive 3D visualizations.
              </p>
              
              {/* Live Statistics */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
                <Card className="bg-gradient-to-br from-blue-700/20 to-blue-600/20 backdrop-blur-lg border-blue-400/30 p-3">
                  <div className="text-center">
                    <Target className="w-6 h-6 mx-auto text-blue-400 mb-1" />
                    <div className="text-lg font-bold text-white">{elementsExplored.length}</div>
                    <div className="text-xs text-blue-200">Explored</div>
                  </div>
                </Card>
                
                <Card className="bg-gradient-to-br from-green-700/20 to-green-600/20 backdrop-blur-lg border-green-400/30 p-3">
                  <div className="text-center">
                    <Flame className="w-6 h-6 mx-auto text-green-400 mb-1" />
                    <div className="text-lg font-bold text-white">{reactionsPerformed}</div>
                    <div className="text-xs text-green-200">Reactions</div>
                  </div>
                </Card>
                
                <Card className="bg-gradient-to-br from-purple-700/20 to-purple-600/20 backdrop-blur-lg border-purple-400/30 p-3">
                  <div className="text-center">
                    <Zap className="w-6 h-6 mx-auto text-purple-400 mb-1" />
                    <div className="text-lg font-bold text-white">{streak}</div>
                    <div className="text-xs text-purple-200">Streak</div>
                  </div>
                </Card>
                
                <Card className="bg-gradient-to-br from-orange-700/20 to-orange-600/20 backdrop-blur-lg border-orange-400/30 p-3">
                  <div className="text-center">
                    <Trophy className="w-6 h-6 mx-auto text-orange-400 mb-1" />
                    <div className="text-lg font-bold text-white">{achievements.length}</div>
                    <div className="text-xs text-orange-200">Achievements</div>
                  </div>
                </Card>
              </div>

              {/* Daily Progress */}
              <div className="max-w-md mx-auto">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-300">Daily Progress</span>
                  <span className="text-sm text-gray-300">{dailyProgress}%</span>
                </div>
                <Progress value={dailyProgress} className="h-2 bg-gray-700" />
              </div>
            </div>
          </header>

          {/* Innovative Features Showcase */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-6 text-center font-orbitron">
              ⚡ Innovative Features
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {innovativeFeatures.map((feature, index) => (
                <Card 
                  key={index}
                  className={`bg-gradient-to-br from-${feature.color}-700/20 to-${feature.color}-600/20 backdrop-blur-lg border-${feature.color}-400/30 hover:scale-105 transition-all duration-300 cursor-pointer animate-fade-in`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardContent className="p-4 text-center">
                    <feature.icon className={`w-8 h-8 mx-auto text-${feature.color}-400 mb-2`} />
                    <h3 className="text-white font-medium text-sm mb-1">{feature.title}</h3>
                    <p className="text-gray-300 text-xs">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* HeisenBot Section - Enhanced */}
          <section className="mb-12 relative overflow-hidden">
            <div className="bg-gradient-to-r from-green-700 via-green-600 to-teal-600 rounded-3xl p-8 relative">
              {/* Animated background pattern */}
              <div className="absolute inset-0 opacity-20">
                <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-10 right-10 w-24 h-24 bg-yellow-300 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }}></div>
                <div className="absolute top-1/2 left-1/3 w-20 h-20 bg-blue-300 rounded-full blur-xl animate-pulse" style={{ animationDelay: '2s' }}></div>
              </div>
              
              <div className="relative z-10 text-center">
                <div className="flex items-center justify-center mb-4">
                  <div className="p-3 bg-white/20 rounded-full backdrop-blur-sm animate-pulse">
                    <Bot className="w-10 h-10 text-white" />
                  </div>
                </div>
                
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-3 animate-fade-in">
                  Meet HeisenBot 2.0
                </h2>
                
                <p className="text-lg text-white/90 mb-1 font-medium animate-fade-in" style={{ animationDelay: '0.2s' }}>
                  Now with advanced AI and real-time chemistry insights.
                </p>
                
                <p className="text-base text-white/80 mb-6 max-w-2xl mx-auto leading-relaxed animate-fade-in" style={{ animationDelay: '0.4s' }}>
                  Get personalized learning paths, instant molecular analysis, 
                  and collaborative problem-solving with our upgraded AI companion.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in" style={{ animationDelay: '0.6s' }}>
                  <Button 
                    onClick={() => navigate('/analytics')}
                    size="lg"
                    className="bg-white text-green-600 hover:bg-gray-100 font-semibold px-8 py-3 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg neon-glow-primary"
                  >
                    <Sparkles className="w-5 h-5 mr-2" />
                    Chat with HeisenBot 2.0
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                  
                  <div className="flex items-center gap-4 text-white/80 text-sm">
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      <span>Enhanced AI</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                      <span>Real-time Updates</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
            {/* Enhanced Periodic Table */}
            <div className="xl:col-span-3 bg-white/80 dark:bg-gray-900/80 rounded-3xl shadow-xl backdrop-blur-xl border border-gray-200/50 dark:border-gray-700/50 p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl font-thin text-gray-900 dark:text-white font-orbitron">
                  Interactive Periodic Table
                </h2>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="bg-green-100 text-green-700 border-green-300">
                    <Atom className="w-3 h-3 mr-1" />
                    Smart Search
                  </Badge>
                  <Badge variant="outline" className="bg-blue-100 text-blue-700 border-blue-300">
                    <Zap className="w-3 h-3 mr-1" />
                    Live Data
                  </Badge>
                </div>
              </div>
              <PeriodicTable onElementClick={handleElementClick} />
            </div>

            {/* Enhanced Sidebar */}
            <div className="bg-white/80 dark:bg-gray-900/80 rounded-3xl shadow-xl backdrop-blur-xl border border-gray-200/50 dark:border-gray-700/50 p-6">
              <Tabs defaultValue="reaction" className="h-full">
                <TabsList className="w-full mb-6 bg-gray-100/50 dark:bg-gray-800/50 rounded-2xl p-1">
                  <TabsTrigger value="reaction" className="flex-1 rounded-xl data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700">
                    <Beaker className="w-4 h-4 mr-2" />
                    Lab
                  </TabsTrigger>
                  <TabsTrigger value="achievements" className="flex-1 rounded-xl data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700">
                    <Trophy className="w-4 h-4 mr-2" />
                    Progress
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="reaction" className="space-y-6 h-full">
                  <div>
                    <h3 className="text-xl font-medium mb-2 font-orbitron">Advanced Reaction Simulator</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                      Drag elements, adjust conditions, and witness realistic chemical reactions
                    </p>
                  </div>
                  <Separator />
                  <ReactionZone 
                    onElementClick={handleElementClick} 
                    onReactionComplete={handleReactionComplete}
                  />
                </TabsContent>
                
                <TabsContent value="achievements" className="space-y-6">
                  <div>
                    <h3 className="text-xl font-medium mb-4 font-orbitron">Your Achievements</h3>
                    <div className="space-y-3">
                      {achievementList.map((achievement) => {
                        const isUnlocked = achievements.includes(achievement.id);
                        return (
                          <div 
                            key={achievement.id}
                            className={`p-3 rounded-xl border transition-all duration-300 ${
                              isUnlocked 
                                ? 'bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 border-yellow-200/50 dark:border-yellow-700/50' 
                                : 'bg-gray-50 dark:bg-gray-800/50 border-gray-200/50 dark:border-gray-700/50 opacity-60'
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <achievement.icon className={`w-6 h-6 ${isUnlocked ? 'text-yellow-500' : 'text-gray-400'}`} />
                              <div>
                                <h4 className={`font-medium ${isUnlocked ? 'text-yellow-700 dark:text-yellow-300' : 'text-gray-500'}`}>
                                  {achievement.name}
                                </h4>
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                  {achievement.description}
                                </p>
                              </div>
                              {isUnlocked && (
                                <div className="ml-auto">
                                  <Badge className="bg-yellow-500 text-white animate-pulse">
                                    ✓
                                  </Badge>
                                </div>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
        
        <ElementDetail 
          element={selectedElement} 
          isOpen={detailOpen} 
          onClose={() => setDetailOpen(false)}
        />
        
        {/* Enhanced HeisenBot AI Assistant */}
        <EduBotAssistant />
        
      </>
    </DndProvider>
  );
};

export default Index;
