
import React, { useState, useMemo } from 'react';
import { elements } from '@/data/elements';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ExternalLink, Search } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

const SourcesPage = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredElements = useMemo(() => {
    if (!searchTerm) {
      return elements;
    }
    return elements.filter(
      (element) =>
        element.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        element.symbol.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight">Sources & Resources</h1>
        <p className="text-lg text-muted-foreground mt-2">
          Explore external resources for each chemical element.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Element Database</CardTitle>
          <CardDescription>Links to Wikipedia articles for more information.</CardDescription>
          <div className="relative mt-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search for an element (e.g., Hydrogen or H)..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[600px]">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredElements.map((element) => (
                <a
                  key={element.id}
                  href={`https://en.wikipedia.org/wiki/${element.name}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group"
                >
                  <div className="p-4 rounded-lg border bg-card hover:bg-accent hover:text-accent-foreground transition-colors flex justify-between items-center">
                    <div>
                      <p className="font-bold text-lg">{element.name}</p>
                      <p className="text-sm text-muted-foreground">
                        Symbol: {element.symbol}, Atomic №: {element.atomicNumber}
                      </p>
                    </div>
                    <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-accent-foreground" />
                  </div>
                </a>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
};

export default SourcesPage;
