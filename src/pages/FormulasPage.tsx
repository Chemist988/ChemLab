
import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Beaker } from 'lucide-react';

interface ChemicalFormula {
  id: string;
  name: string;
  formula: string;
  type: 'acid' | 'base' | 'salt' | 'organic' | 'oxide';
  description: string;
}

const chemicalFormulas: ChemicalFormula[] = [
  { id: '1', name: 'Water', formula: 'H₂O', type: 'oxide', description: 'Essential for all life' },
  { id: '2', name: 'Sodium Chloride', formula: 'NaCl', type: 'salt', description: 'Common table salt' },
  { id: '3', name: 'Carbon Dioxide', formula: 'CO₂', type: 'oxide', description: 'Greenhouse gas' },
  { id: '4', name: 'Sulfuric Acid', formula: 'H₂SO₄', type: 'acid', description: 'Strong acid' },
  { id: '5', name: 'Sodium Hydroxide', formula: 'NaOH', type: 'base', description: 'Strong base' },
  { id: '6', name: 'Methane', formula: 'CH₄', type: 'organic', description: 'Natural gas' },
  { id: '7', name: 'Ammonia', formula: 'NH₃', type: 'base', description: 'Used in fertilizers' },
  { id: '8', name: 'Glucose', formula: 'C₆H₁₂O₆', type: 'organic', description: 'Simple sugar' },
  { id: '9', name: 'Calcium Carbonate', formula: 'CaCO₃', type: 'salt', description: 'Found in limestone' },
  { id: '10', name: 'Hydrochloric Acid', formula: 'HCl', type: 'acid', description: 'Stomach acid' },
  { id: '11', name: 'Ethanol', formula: 'C₂H₅OH', type: 'organic', description: 'Alcohol' },
  { id: '12', name: 'Iron Oxide', formula: 'Fe₂O₃', type: 'oxide', description: 'Rust' },
];

const typeColors = {
  acid: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
  base: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
  salt: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  organic: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
  oxide: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
};

const FormulasPage = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredFormulas = useMemo(() => {
    if (!searchTerm) {
      return chemicalFormulas;
    }
    return chemicalFormulas.filter(
      (formula) =>
        formula.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        formula.formula.toLowerCase().includes(searchTerm.toLowerCase()) ||
        formula.type.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight">Chemical Formulas</h1>
        <p className="text-lg text-muted-foreground mt-2">
          Explore common chemical compounds and their molecular formulas.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Formula Database</CardTitle>
          <CardDescription>Common chemical compounds organized by type.</CardDescription>
          <div className="relative mt-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search formulas (e.g., Water, H₂O, acid)..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[600px]">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredFormulas.map((compound) => (
                <div
                  key={compound.id}
                  className="p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-lg">{compound.name}</h3>
                    <Badge className={typeColors[compound.type]}>
                      {compound.type}
                    </Badge>
                  </div>
                  <div className="mb-2">
                    <span className="text-2xl font-mono font-bold text-primary">
                      {compound.formula}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {compound.description}
                  </p>
                </div>
              ))}
            </div>
            {filteredFormulas.length === 0 && (
              <div className="text-center py-16">
                <Beaker className="mx-auto h-12 w-12 text-muted-foreground" />
                <h3 className="mt-4 text-lg font-medium">No formulas found</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Try adjusting your search term.
                </p>
              </div>
            )}
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
};

export default FormulasPage;
