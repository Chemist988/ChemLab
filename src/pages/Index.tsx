
import React, { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import PeriodicTable from '@/components/PeriodicTable';
import ReactionZone from '@/components/ReactionZone';
import ElementDetail from '@/components/ElementDetail';
import ThemeSwitcher from '@/components/ThemeSwitcher';
import EduBotAssistant from '@/components/EduBotAssistant';
import { Element } from '@/data/elements';
import { Atom, FlaskConical, Bot, Sparkles, TestTube } from 'lucide-react';

const Index = () => {
  const [selectedElement, setSelectedElement] = useState<Element | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);

  const handleElementClick = (element: Element) => {
    setSelectedElement(element);
    setDetailOpen(true);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="min-h-screen bg-black text-foreground">
        {/* Header */}
        <header className="sticky top-0 z-50 bg-black/70 backdrop-blur-lg border-b border-border">
          <div className="max-w-screen-xl mx-auto px-6 py-4">
            <nav className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Atom className="w-8 h-8 text-primary" />
                <h1 className="text-2xl font-bold">
                  ChemLab Pro
                </h1>
              </div>
              <div className="flex items-center space-x-6">
                <nav className="hidden md:flex items-center space-x-6 text-muted-foreground">
                  <span className="hover:text-primary transition-colors cursor-pointer font-medium">Periodic Table</span>
                  <span className="hover:text-primary transition-colors cursor-pointer font-medium">Reaction Lab</span>
                  <span className="hover:text-primary transition-colors cursor-pointer font-medium">AI Assistant</span>
                </nav>
                <ThemeSwitcher />
              </div>
            </nav>
          </div>
        </header>

        {/* Hero Section */}
        <section className="relative py-32 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>
          <div className="max-w-4xl mx-auto px-6 text-center relative">
            <h2 className="text-5xl md:text-7xl font-bold mb-6 leading-tight bg-gradient-to-br from-white to-gray-400 bg-clip-text text-transparent">
              The Universe of Elements,
              <br />
              <span className="text-gradient">In Your Hands</span>
            </h2>
            <p className="text-xl text-muted-foreground mb-12 max-w-3xl mx-auto">
              An immersive chemistry experience. Drag, drop, and combine elements to witness breathtaking reactions in a futuristic digital laboratory.
            </p>
            <div className="flex items-center justify-center space-x-2">
                <button className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 rounded-lg font-semibold transition-colors">
                    Start Experimenting
                </button>
                 <button className="bg-secondary hover:bg-secondary/80 px-8 py-3 rounded-lg font-semibold transition-colors">
                    Meet Neutrino AI
                </button>
            </div>
          </div>
        </section>

        {/* Main Content Grid */}
        <section className="max-w-screen-xl mx-auto px-6 py-16 space-y-16">
          {/* Periodic Table Section */}
          <div className="glow-card">
            <div className="p-8 md:p-12">
              <div className="flex items-center space-x-4 mb-8">
                <div className="w-12 h-12 bg-secondary rounded-2xl flex items-center justify-center">
                  <Atom className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold">Periodic Table</h3>
                  <p className="text-muted-foreground">Select elements to start your experiments</p>
                </div>
              </div>
              <PeriodicTable onElementClick={handleElementClick} />
            </div>
          </div>

          {/* Reaction Lab Section */}
          <div className="glow-card">
            <div className="p-8 md:p-12">
              <div className="flex items-center space-x-4 mb-8">
                <div className="w-12 h-12 bg-secondary rounded-2xl flex items-center justify-center">
                  <FlaskConical className="w-6 h-6 text-green-400" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold">Reaction Lab</h3>
                  <p className="text-muted-foreground">Drag test tubes to create reactions</p>
                </div>
              </div>
              <ReactionZone onElementClick={handleElementClick} />
            </div>
          </div>
          
          {/* Neutrino AI Section */}
           <div className="glow-card">
            <div className="p-8 md:p-12 text-center">
              <div className="w-16 h-16 bg-secondary rounded-3xl flex items-center justify-center mx-auto mb-6">
                <Bot className="w-8 h-8 text-primary" />
              </div>
              <h2 className="text-4xl font-bold mb-6 text-gradient">Meet Neutrino AI</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-12">
                Your intelligent chemistry companion. Get instant explanations, step-by-step solutions, and personalized learning guidance powered by advanced AI.
              </p>
               <button className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 rounded-xl font-semibold transition-colors">
                Try Neutrino AI
              </button>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-border py-12">
          <div className="max-w-screen-xl mx-auto px-6 text-center">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <Atom className="w-7 h-7 text-primary" />
              <h3 className="text-xl font-bold">ChemLab Pro</h3>
            </div>
            <p className="text-muted-foreground mb-6">Revolutionizing chemistry education through technology</p>
            <div className="flex justify-center space-x-6 text-muted-foreground">
              <span className="hover:text-primary cursor-pointer">Privacy</span>
              <span className="hover:text-primary cursor-pointer">Terms</span>
              <span className="hover:text-primary cursor-pointer">Support</span>
            </div>
          </div>
        </footer>

        {/* Modals */}
        <ElementDetail 
          element={selectedElement} 
          isOpen={detailOpen} 
          onClose={() => setDetailOpen(false)}
        />
        
        <EduBotAssistant />
      </div>
    </DndProvider>
  );
};

export default Index;
