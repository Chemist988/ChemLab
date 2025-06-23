
import React, { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Beaker, Trash2, Plus, ArrowRight, Atom, Zap, Activity } from 'lucide-react';
import { Element, elements } from '@/data/elements';
import { toast } from 'sonner';

interface ReactionElement {
  element: Element;
  count: number;
  id: string;
}

interface Reaction {
  reactants: ReactionElement[];
  products: ReactionElement[];
  name: string;
  type: string;
  balanced: boolean;
}

const ReactionSimulatorPage = () => {
  const [reactants, setReactants] = useState<ReactionElement[]>([]);
  const [products, setProducts] = useState<ReactionElement[]>([]);
  const [reactionName, setReactionName] = useState('');
  const [savedReactions, setSavedReactions] = useState<Reaction[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  const commonElements = elements.slice(0, 20);
  const filteredElements = elements.filter(el => 
    el.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    el.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const addToReactants = useCallback((element: Element) => {
    const existingIndex = reactants.findIndex(re => re.element.id === element.id);
    
    if (existingIndex >= 0) {
      setReactants(prev => prev.map((re, idx) => 
        idx === existingIndex ? { ...re, count: re.count + 1 } : re
      ));
    } else {
      setReactants(prev => [...prev, {
        element,
        count: 1,
        id: `reactant-${element.id}-${Date.now()}`
      }]);
    }
    toast(`Added ${element.symbol} to reactants`);
  }, [reactants]);

  const addToProducts = useCallback((element: Element) => {
    const existingIndex = products.findIndex(pe => pe.element.id === element.id);
    
    if (existingIndex >= 0) {
      setProducts(prev => prev.map((pe, idx) => 
        idx === existingIndex ? { ...pe, count: pe.count + 1 } : pe
      ));
    } else {
      setProducts(prev => [...prev, {
        element,
        count: 1,
        id: `product-${element.id}-${Date.now()}`
      }]);
    }
    toast(`Added ${element.symbol} to products`);
  }, [products]);

  const updateCount = useCallback((id: string, delta: number, isReactant: boolean) => {
    const setter = isReactant ? setReactants : setProducts;
    setter(prev => prev.map(item => {
      if (item.id === id) {
        const newCount = Math.max(1, item.count + delta);
        return { ...item, count: newCount };
      }
      return item;
    }));
  }, []);

  const removeElement = useCallback((id: string, isReactant: boolean) => {
    const setter = isReactant ? setReactants : setProducts;
    setter(prev => prev.filter(item => item.id !== id));
  }, []);

  const getReactionString = useCallback(() => {
    const reactantStr = reactants
      .map(re => `${re.count > 1 ? re.count : ''}${re.element.symbol}`)
      .join(' + ');
    const productStr = products
      .map(pe => `${pe.count > 1 ? pe.count : ''}${pe.element.symbol}`)
      .join(' + ');
    
    return `${reactantStr || '?'} → ${productStr || '?'}`;
  }, [reactants, products]);

  const checkBalance = useCallback(() => {
    const reactantAtoms: Record<string, number> = {};
    const productAtoms: Record<string, number> = {};

    reactants.forEach(re => {
      reactantAtoms[re.element.symbol] = (reactantAtoms[re.element.symbol] || 0) + re.count;
    });

    products.forEach(pe => {
      productAtoms[pe.element.symbol] = (productAtoms[pe.element.symbol] || 0) + pe.count;
    });

    const allElements = new Set([...Object.keys(reactantAtoms), ...Object.keys(productAtoms)]);
    
    for (const element of allElements) {
      if ((reactantAtoms[element] || 0) !== (productAtoms[element] || 0)) {
        return false;
      }
    }
    return true;
  }, [reactants, products]);

  const saveReaction = useCallback(() => {
    if (!reactionName.trim() || reactants.length === 0 || products.length === 0) {
      toast.error('Please enter a name and add both reactants and products');
      return;
    }

    const reaction: Reaction = {
      name: reactionName.trim(),
      reactants: [...reactants],
      products: [...products],
      type: 'Custom',
      balanced: checkBalance()
    };

    setSavedReactions(prev => [...prev, reaction]);
    setReactionName('');
    setReactants([]);
    setProducts([]);
    toast.success(`Saved reaction: ${reaction.name}`);
  }, [reactionName, reactants, products, checkBalance]);

  const clearReaction = useCallback(() => {
    setReactants([]);
    setProducts([]);
    setReactionName('');
    toast('Reaction cleared');
  }, []);

  const loadReaction = useCallback((reaction: Reaction) => {
    setReactants([...reaction.reactants]);
    setProducts([...reaction.products]);
    setReactionName(reaction.name);
    toast(`Loaded ${reaction.name}`);
  }, []);

  const isBalanced = checkBalance();

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold font-orbitron mb-4 bg-gradient-to-r from-orange-400 to-red-600 bg-clip-text text-transparent">
          Chemical Reaction Simulator
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Build and balance chemical equations, simulate reactions, and explore chemical transformations
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Reaction Builder */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="liquid-glass">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Beaker className="w-5 h-5" />
                Reaction Builder
              </CardTitle>
              <CardDescription>
                Build your chemical reaction by adding reactants and products
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex gap-2">
                  <Input
                    placeholder="Reaction name..."
                    value={reactionName}
                    onChange={(e) => setReactionName(e.target.value)}
                    className="flex-1"
                  />
                  <Button onClick={saveReaction} disabled={reactants.length === 0 || products.length === 0}>
                    Save
                  </Button>
                  <Button variant="outline" onClick={clearReaction}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>

                {/* Reaction Display */}
                <div className="p-6 bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-xl border">
                  <div className="text-center">
                    <div className="text-3xl font-mono font-bold mb-2">
                      {getReactionString()}
                    </div>
                    <div className="flex items-center justify-center gap-4 text-sm">
                      <Badge variant={isBalanced ? "default" : "destructive"}>
                        {isBalanced ? "Balanced" : "Unbalanced"}
                      </Badge>
                      <span className="text-muted-foreground">
                        {reactants.length} Reactants → {products.length} Products
                      </span>
                    </div>
                  </div>
                </div>

                {/* Reactants Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-medium flex items-center gap-2">
                      <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                      Reactants
                    </h4>
                    {reactants.length === 0 ? (
                      <div className="p-4 border-2 border-dashed border-blue-200 rounded-lg text-center text-muted-foreground">
                        No reactants added
                      </div>
                    ) : (
                      <div className="space-y-2">
                        {reactants.map((re) => (
                          <div key={re.id} className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                            <div className="flex items-center gap-3">
                              <Badge variant="secondary">{re.element.symbol}</Badge>
                              <span className="font-medium">{re.element.name}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Button size="sm" variant="outline" onClick={() => updateCount(re.id, -1, true)}>
                                <Plus className="w-3 h-3 rotate-45" />
                              </Button>
                              <span className="w-8 text-center font-mono">{re.count}</span>
                              <Button size="sm" variant="outline" onClick={() => updateCount(re.id, 1, true)}>
                                <Plus className="w-3 h-3" />
                              </Button>
                              <Button size="sm" variant="destructive" onClick={() => removeElement(re.id, true)}>
                                <Trash2 className="w-3 h-3" />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-medium flex items-center gap-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      Products
                    </h4>
                    {products.length === 0 ? (
                      <div className="p-4 border-2 border-dashed border-green-200 rounded-lg text-center text-muted-foreground">
                        No products added
                      </div>
                    ) : (
                      <div className="space-y-2">
                        {products.map((pe) => (
                          <div key={pe.id} className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                            <div className="flex items-center gap-3">
                              <Badge variant="secondary">{pe.element.symbol}</Badge>
                              <span className="font-medium">{pe.element.name}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Button size="sm" variant="outline" onClick={() => updateCount(pe.id, -1, false)}>
                                <Plus className="w-3 h-3 rotate-45" />
                              </Button>
                              <span className="w-8 text-center font-mono">{pe.count}</span>
                              <Button size="sm" variant="outline" onClick={() => updateCount(pe.id, 1, false)}>
                                <Plus className="w-3 h-3" />
                              </Button>
                              <Button size="sm" variant="destructive" onClick={() => removeElement(pe.id, false)}>
                                <Trash2 className="w-3 h-3" />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Element Palette */}
          <Card className="liquid-glass">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Atom className="w-5 h-5" />
                Element Palette
              </CardTitle>
              <CardDescription>
                Click elements to add to reactants, or hold Shift and click to add to products
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Input
                  placeholder="Search elements..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                
                <div className="grid grid-cols-6 sm:grid-cols-8 gap-2">
                  {(searchTerm ? filteredElements.slice(0, 48) : commonElements).map((element) => (
                    <Button
                      key={element.id}
                      variant="outline"
                      size="sm"
                      onClick={(e) => {
                        if (e.shiftKey) {
                          addToProducts(element);
                        } else {
                          addToReactants(element);
                        }
                      }}
                      className="liquid-glass-button p-2 h-auto flex flex-col items-center gap-1 hover:scale-105 transition-transform"
                    >
                      <span className="font-bold text-xs">{element.symbol}</span>
                      <span className="text-[0.6rem] opacity-70">{element.atomicNumber}</span>
                    </Button>
                  ))}
                </div>
                
                <div className="text-xs text-muted-foreground text-center">
                  Click to add to reactants • Shift+Click to add to products
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card className="liquid-glass">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="w-5 h-5" />
                Reaction Stats
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span>Reactants:</span>
                  <span>{reactants.length}</span>
                </div>
                <div className="flex justify-between">
                  <span>Products:</span>
                  <span>{products.length}</span>
                </div>
                <div className="flex justify-between">
                  <span>Total Atoms:</span>
                  <span>{reactants.reduce((sum, re) => sum + re.count, 0) + products.reduce((sum, pe) => sum + pe.count, 0)}</span>
                </div>
                <Separator />
                <div className="flex justify-between">
                  <span>Status:</span>
                  <Badge variant={isBalanced ? "default" : "destructive"}>
                    {isBalanced ? "Balanced" : "Unbalanced"}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="liquid-glass">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="w-5 h-5" />
                Saved Reactions
              </CardTitle>
              <CardDescription>
                Your saved chemical reactions
              </CardDescription>
            </CardHeader>
            <CardContent>
              {savedReactions.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-4">
                  No saved reactions yet
                </p>
              ) : (
                <div className="space-y-3">
                  {savedReactions.slice().reverse().slice(0, 10).map((reaction, index) => (
                    <div
                      key={index}
                      className="p-3 bg-white/50 dark:bg-gray-800/50 rounded-lg cursor-pointer hover:bg-white/70 dark:hover:bg-gray-800/70 transition-colors"
                      onClick={() => loadReaction(reaction)}
                    >
                      <div className="font-medium text-sm mb-1">{reaction.name}</div>
                      <div className="font-mono text-xs text-muted-foreground mb-1">
                        {reaction.reactants.map(re => `${re.count > 1 ? re.count : ''}${re.element.symbol}`).join(' + ')} →{' '}
                        {reaction.products.map(pe => `${pe.count > 1 ? pe.count : ''}${pe.element.symbol}`).join(' + ')}
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={reaction.balanced ? "default" : "destructive"} className="text-xs">
                          {reaction.balanced ? "Balanced" : "Unbalanced"}
                        </Badge>
                        <span className="text-xs text-muted-foreground">{reaction.type}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ReactionSimulatorPage;
