
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
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Atom, Beaker, BookOpen, Bot, Sparkles, ArrowRight, Activity, TrendingUp, Clock, Zap } from 'lucide-react';

const Index = () => {
  const [selectedElement, setSelectedElement] = useState<Element | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);
  const [reactionHistory, setReactionHistory] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Load reaction history from localStorage
    try {
      const history = JSON.parse(localStorage.getItem('reactionLog') || '[]');
      setReactionHistory(history.slice(0, 5)); // Get last 5 reactions
    } catch (error) {
      console.error('Failed to load reaction history', error);
    }
  }, []);

  const handleElementClick = (element: Element) => {
    setSelectedElement(element);
    setDetailOpen(true);
  };

  const getReactionStats = () => {
    const totalReactions = reactionHistory.length;
    const uniqueElements = new Set();
    reactionHistory.forEach(reaction => {
      reaction.reactants?.forEach((reactant: any) => uniqueElements.add(reactant.symbol));
    });
    return { totalReactions, uniqueElements: uniqueElements.size };
  };

  const stats = getReactionStats();

  return (
    <DndProvider backend={HTML5Backend}>
      <>
        <div className="container mx-auto py-12 px-8 max-w-7xl">
          {/* Apple-inspired Header with better spacing */}
          <header className="mb-20 flex flex-col items-center relative">
            <div className="text-center space-y-8 max-w-4xl mx-auto">
              <h1 className="text-6xl md:text-7xl font-bold tracking-tight text-white font-orbitron drop-shadow-2xl">
                ChemLab
              </h1>
              <p className="text-xl font-light text-gray-300 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed px-4">
                An interactive chemistry playground. Drag elements, simulate reactions, 
                and discover the building blocks of our world with stunning visualizations.
              </p>
              <div className="flex items-center justify-center gap-2 text-sm text-gray-400 dark:text-gray-400">
                <Atom className="w-4 h-4" />
                <span>118 Elements • Unlimited Possibilities</span>
              </div>
            </div>
          </header>

          {/* Neutrino AI Section - Better spacing */}
          <section className="mb-16 relative overflow-hidden max-w-5xl mx-auto">
            <div className="bg-gradient-to-r from-green-700 via-green-600 to-teal-600 rounded-3xl p-10 relative">
              {/* Background pattern */}
              <div className="absolute inset-0 opacity-20">
                <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full blur-3xl"></div>
                <div className="absolute bottom-10 right-10 w-24 h-24 bg-yellow-300 rounded-full blur-2xl"></div>
                <div className="absolute top-1/2 left-1/3 w-20 h-20 bg-blue-300 rounded-full blur-xl"></div>
              </div>
              
              <div className="relative z-10 text-center">
                <div className="flex items-center justify-center mb-6">
                  <div className="p-4 bg-white/20 rounded-full backdrop-blur-sm">
                    <Bot className="w-12 h-12 text-white" />
                  </div>
                </div>
                
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  Meet HeisenBot
                </h2>
                
                <p className="text-lg text-white/90 mb-2 font-medium">
                  Precision meets intuition.
                </p>
                
                <p className="text-base text-white/80 mb-8 max-w-2xl mx-auto leading-relaxed">
                  Your intelligent chemistry companion. Get instant help with reactions, 
                  molecular structures, and complex chemistry concepts through natural conversation.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                  <Button 
                    onClick={() => navigate('/analytics')}
                    size="lg"
                    className="bg-white text-green-600 hover:bg-gray-100 font-semibold px-8 py-3 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg neon-glow-primary"
                  >
                    <Sparkles className="w-5 h-5 mr-2" />
                    Chat with HeisenBot
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                  
                  <div className="flex items-center gap-4 text-white/80 text-sm">
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      <span>24/7 Available</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Innovative Reaction Analytics Section */}
          <section className="mb-16 max-w-6xl mx-auto">
            <div className="bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 rounded-3xl p-10 relative overflow-hidden">
              {/* Background effects */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.4"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div>
              </div>
              
              <div className="relative z-10">
                <div className="text-center mb-8">
                  <div className="flex items-center justify-center mb-4">
                    <div className="p-3 bg-white/20 rounded-full backdrop-blur-sm">
                      <Activity className="w-10 h-10 text-white" />
                    </div>
                  </div>
                  
                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
                    Lab Analytics
                  </h2>
                  
                  <p className="text-lg text-white/90 mb-6 max-w-2xl mx-auto">
                    Track your experiments and discover patterns in your chemical explorations
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  {/* Stats Cards */}
                  <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
                    <CardContent className="p-6 text-center">
                      <div className="flex items-center justify-center mb-2">
                        <TrendingUp className="w-8 h-8 text-white" />
                      </div>
                      <div className="text-2xl font-bold text-white">{stats.totalReactions}</div>
                      <div className="text-white/80 text-sm">Total Reactions</div>
                    </CardContent>
                  </Card>

                  <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
                    <CardContent className="p-6 text-center">
                      <div className="flex items-center justify-center mb-2">
                        <Atom className="w-8 h-8 text-white" />
                      </div>
                      <div className="text-2xl font-bold text-white">{stats.uniqueElements}</div>
                      <div className="text-white/80 text-sm">Elements Used</div>
                    </CardContent>
                  </Card>

                  <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
                    <CardContent className="p-6 text-center">
                      <div className="flex items-center justify-center mb-2">
                        <Zap className="w-8 h-8 text-white" />
                      </div>
                      <div className="text-2xl font-bold text-white">Live</div>
                      <div className="text-white/80 text-sm">Real-time Data</div>
                    </CardContent>
                  </Card>
                </div>

                {/* Recent Reactions */}
                {reactionHistory.length > 0 && (
                  <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
                    <CardHeader>
                      <CardTitle className="text-white flex items-center gap-2">
                        <Clock className="w-5 h-5" />
                        Recent Reactions
                      </CardTitle>
                      <CardDescription className="text-white/80">
                        Your latest chemical experiments
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {reactionHistory.map((reaction, index) => (
                          <div key={reaction.id || index} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                            <div className="flex items-center gap-3">
                              <div className="flex gap-1">
                                {reaction.reactants?.map((reactant: any, i: number) => (
                                  <Badge key={i} variant="secondary" className="bg-white/20 text-white">
                                    {reactant.symbol}
                                  </Badge>
                                ))}
                              </div>
                              <ArrowRight className="w-4 h-4 text-white/60" />
                              <span className="text-white/90 font-medium">{reaction.product}</span>
                            </div>
                            <div className="text-white/60 text-xs">
                              {new Date(reaction.timestamp).toLocaleTimeString()}
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </section>

          {/* Main Content Grid with better spacing */}
          <div className="grid grid-cols-1 xl:grid-cols-4 gap-12 max-w-7xl mx-auto">
            {/* Periodic Table - Better spacing and centering */}
            <div className="xl:col-span-3 bg-white/80 dark:bg-gray-900/80 rounded-3xl shadow-xl backdrop-blur-xl border border-gray-200/50 dark:border-gray-700/50 p-10">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-thin text-gray-900 dark:text-white font-orbitron">Periodic Table</h2>
                <div className="text-sm text-gray-500 dark:text-gray-400">Click any element to explore</div>
              </div>
              <div className="px-4">
                <PeriodicTable onElementClick={handleElementClick} />
              </div>
            </div>

            {/* Sidebar with better spacing */}
            <div className="bg-white/80 dark:bg-gray-900/80 rounded-3xl shadow-xl backdrop-blur-xl border border-gray-200/50 dark:border-gray-700/50 p-8">
              <Tabs defaultValue="reaction" className="h-full">
                <TabsList className="w-full mb-8 bg-gray-100/50 dark:bg-gray-800/50 rounded-2xl p-1">
                  <TabsTrigger value="reaction" className="flex-1 rounded-xl data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700">
                    <Beaker className="w-4 h-4 mr-2" />
                    Lab
                  </TabsTrigger>
                  <TabsTrigger value="info" className="flex-1 rounded-xl data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700">
                    <BookOpen className="w-4 h-4 mr-2" />
                    Guide
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="reaction" className="space-y-8 h-full">
                  <div>
                    <h3 className="text-xl font-medium mb-3 font-orbitron">Reaction Simulator</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-6">
                      Drag and drop elements to simulate chemical reactions
                    </p>
                  </div>
                  <Separator />
                  <div className="px-2">
                    <ReactionZone onElementClick={handleElementClick} />
                  </div>
                </TabsContent>
                
                <TabsContent value="info" className="space-y-8">
                  <div>
                    <h3 className="text-xl font-medium mb-6 font-orbitron">How to Use</h3>
                    <div className="space-y-6 text-sm">
                      <div className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl border border-blue-200/50 dark:border-blue-700/50">
                        <h4 className="font-medium text-blue-700 dark:text-blue-300 mb-3">Getting Started</h4>
                        <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                          <li>• Click any element for detailed information</li>
                          <li>• Drag elements to the reaction zone</li>
                          <li>• Watch chemical reactions come to life</li>
                        </ul>
                      </div>
                      
                      <div className="p-6 bg-gradient-to-r from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-green-900/20 rounded-xl border border-emerald-200/50 dark:border-emerald-700/50">
                        <h4 className="font-medium text-emerald-700 dark:text-emerald-300 mb-3">Popular Reactions</h4>
                        <ul className="space-y-2 text-gray-600 dark:text-gray-400 text-xs">
                          <li>• H + O → Water formation</li>
                          <li>• Na + Cl → Salt formation</li>
                          <li>• Fe + O → Rust formation</li>
                          <li>• Mg + O → Combustion</li>
                        </ul>
                      </div>
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
        
        <EduBotAssistant />
        
      </>
    </DndProvider>
  );
};

export default Index;
