
import React, { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import PeriodicTable from '@/components/PeriodicTable';
import ReactionZone from '@/components/ReactionZone';
import ElementDetail from '@/components/ElementDetail';
import ThemeSwitcher from '@/components/ThemeSwitcher';
import EduBotAssistant from '@/components/EduBotAssistant';
import { Element } from '@/data/elements';
import { Atom, FlaskConical, Sparkles } from 'lucide-react';

const Index = () => {
  const [selectedElement, setSelectedElement] = useState<Element | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);

  const handleElementClick = (element: Element) => {
    setSelectedElement(element);
    setDetailOpen(true);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        {/* Animated Background */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
          <div className="absolute top-40 right-20 w-1 h-1 bg-purple-400 rounded-full animate-bounce"></div>
          <div className="absolute bottom-32 left-1/4 w-1.5 h-1.5 bg-cyan-400 rounded-full animate-ping"></div>
          <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-pink-400 rounded-full animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-2 h-2 bg-indigo-400 rounded-full animate-bounce"></div>
        </div>

        {/* Header */}
        <header className="relative z-50 bg-black/20 backdrop-blur-xl border-b border-white/10">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <nav className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <Atom className="w-8 h-8 text-cyan-400 animate-spin" style={{ animationDuration: '3s' }} />
                  <div className="absolute inset-0 bg-cyan-400/20 rounded-full animate-ping"></div>
                </div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  ChemLab Pro
                </h1>
              </div>
              <div className="flex items-center space-x-4">
                <div className="hidden md:flex items-center space-x-6 text-white/80">
                  <span className="hover:text-cyan-400 transition-colors cursor-pointer">Elements</span>
                  <span className="hover:text-purple-400 transition-colors cursor-pointer">Reactions</span>
                  <span className="hover:text-pink-400 transition-colors cursor-pointer">Lab</span>
                </div>
                <ThemeSwitcher />
              </div>
            </nav>
          </div>
        </header>

        {/* Hero Section */}
        <section className="relative z-10 text-center py-12">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-5xl md:text-7xl font-extrabold mb-6">
              <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Chemistry
              </span>
              <br />
              <span className="text-white">Reimagined</span>
            </h2>
            <p className="text-xl text-white/70 mb-8 max-w-2xl mx-auto">
              Experience chemistry like never before. Mix elements, watch reactions explode, and discover the magic of molecular interactions.
            </p>
            <div className="flex items-center justify-center space-x-2 text-yellow-400">
              <Sparkles className="w-5 h-5 animate-pulse" />
              <span className="text-sm font-medium">Real-time Physics Simulation</span>
              <Sparkles className="w-5 h-5 animate-pulse" />
            </div>
          </div>
        </section>

        {/* Main Lab Interface */}
        <section className="relative z-10 max-w-7xl mx-auto px-4 pb-20">
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            
            {/* Periodic Table - Left Side */}
            <div className="xl:col-span-2">
              <div className="bg-black/30 backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl p-6">
                <div className="flex items-center space-x-3 mb-6">
                  <FlaskConical className="w-6 h-6 text-cyan-400" />
                  <h3 className="text-2xl font-bold text-white">Element Arsenal</h3>
                  <div className="flex-1 h-px bg-gradient-to-r from-cyan-400/50 to-transparent"></div>
                </div>
                <PeriodicTable onElementClick={handleElementClick} />
              </div>
            </div>

            {/* Reaction Lab - Right Side */}
            <div className="xl:col-span-1">
              <div className="bg-black/30 backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl p-6 h-full">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="relative">
                    <FlaskConical className="w-6 h-6 text-purple-400" />
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-pink-400 rounded-full animate-ping"></div>
                  </div>
                  <h3 className="text-2xl font-bold text-white">Reaction Chamber</h3>
                </div>
                <p className="text-white/60 text-sm mb-6">
                  Drag 2 elements to witness explosive chemistry!
                </p>
                <ReactionZone onElementClick={handleElementClick} />
              </div>
            </div>
          </div>
        </section>

        {/* Floating Action Elements */}
        <div className="fixed bottom-8 right-8 z-50 flex flex-col space-y-4">
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-full p-4 shadow-2xl hover:scale-110 transition-transform cursor-pointer">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
        </div>

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
