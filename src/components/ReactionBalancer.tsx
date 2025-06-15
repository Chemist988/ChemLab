import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ChevronsRight } from 'lucide-react';

const ReactionBalancer = () => {
  const [equation, setEquation] = useState('H2 + O2 -> H2O');
  const [balancedEquation, setBalancedEquation] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleBalance = () => {
    setError(null);
    setBalancedEquation(null);

    // Simple placeholder logic for demonstration
    const cleanedEquation = equation.replace(/\s/g, '').toLowerCase();
    
    const presets: { [key: string]: string } = {
      'h2+o2->h2o': '2H₂ + O₂ → 2H₂O',
      'na+cl2->nacl': '2Na + Cl₂ → 2NaCl',
      'fe+o2->fe2o3': '4Fe + 3O₂ → 2Fe₂O₃',
      'c_h_o_+_o_->_co_+_h_o': 'C₇H₆O₂ + O₂ → CO₂ + H₂O',
      'ch4+o2->co2+h2o': 'CH₄ + 2O₂ → CO₂ + 2H₂O',
    };

    if (presets[cleanedEquation]) {
      setBalancedEquation(presets[cleanedEquation]);
    } else {
      setError('Sorry, I cannot balance this equation yet. Try "H2 + O2 -> H2O".');
    }
  };

  return (
    <Card className="max-w-2xl mx-auto bg-card/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle>Chemical Equation Balancer</CardTitle>
        <CardDescription>Enter an unbalanced equation. For example: Na + Cl2 -> NaCl</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex gap-4 items-center">
          <Input 
            value={equation}
            onChange={(e) => setEquation(e.target.value)}
            placeholder="e.g., H2 + O2 -> H2O"
            className="text-lg"
            onKeyDown={(e) => e.key === 'Enter' && handleBalance()}
          />
          <Button onClick={handleBalance} size="lg">
            <>Balance <ChevronsRight className="w-4 h-4 ml-2" /></>
          </Button>
        </div>
        
        {balancedEquation && (
          <div className="mt-6 p-4 bg-green-500/10 border border-green-500/20 rounded-lg animate-fade-in">
            <h3 className="font-semibold text-green-300">Balanced Equation:</h3>
            <p className="text-2xl font-mono mt-2 text-primary">{balancedEquation}</p>
          </div>
        )}
        
        {error && (
          <div className="mt-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg animate-fade-in">
            <h3 className="font-semibold text-red-400">Error:</h3>
            <p className="text-lg mt-2 text-red-400">{error}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ReactionBalancer;
