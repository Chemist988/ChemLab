
import React, { useState } from 'react';
import { BookOpen, ChevronDown, ChevronRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

const StudyGuidePage = () => {
  const [openSections, setOpenSections] = useState<string[]>(['basics']);

  const studyGuide = [
    {
      id: 'basics',
      title: 'Chemistry Basics',
      topics: [
        {
          title: 'Atoms and Elements',
          content: 'Atoms are the basic building blocks of matter. Each element is made up of atoms with the same number of protons. The periodic table organizes elements by atomic number.'
        },
        {
          title: 'Chemical Bonds',
          content: 'Atoms bond together through ionic bonds (transfer of electrons), covalent bonds (sharing electrons), or metallic bonds (sea of electrons).'
        },
        {
          title: 'Molecules and Compounds',
          content: 'When atoms bond together, they form molecules. Compounds are substances made of two or more different elements chemically combined.'
        }
      ]
    },
    {
      id: 'periodic',
      title: 'Periodic Table',
      topics: [
        {
          title: 'Groups and Periods',
          content: 'Groups are vertical columns with similar properties. Periods are horizontal rows. Elements in the same group have similar electron configurations.'
        },
        {
          title: 'Trends',
          content: 'Atomic size decreases across a period and increases down a group. Ionization energy increases across a period and decreases down a group.'
        },
        {
          title: 'Metal, Nonmetal, Metalloid',
          content: 'Metals are on the left, nonmetals on the right, and metalloids form a diagonal line between them. Each has distinct properties.'
        }
      ]
    },
    {
      id: 'reactions',
      title: 'Chemical Reactions',
      topics: [
        {
          title: 'Types of Reactions',
          content: 'Synthesis (A + B → AB), Decomposition (AB → A + B), Single replacement (A + BC → AC + B), Double replacement (AB + CD → AD + CB)'
        },
        {
          title: 'Balancing Equations',
          content: 'Chemical equations must be balanced - the same number of each type of atom on both sides. Use coefficients to balance, never change subscripts.'
        },
        {
          title: 'Acids and Bases',
          content: 'Acids release H⁺ ions (pH < 7), bases release OH⁻ ions (pH > 7). They neutralize each other to form salt and water.'
        }
      ]
    },
    {
      id: 'states',
      title: 'States of Matter',
      topics: [
        {
          title: 'Solid, Liquid, Gas',
          content: 'Solids have fixed shape and volume. Liquids have fixed volume but take container shape. Gases expand to fill containers.'
        },
        {
          title: 'Phase Changes',
          content: 'Melting (solid→liquid), Freezing (liquid→solid), Vaporization (liquid→gas), Condensation (gas→liquid), Sublimation (solid→gas)'
        },
        {
          title: 'Kinetic Theory',
          content: 'Particles are in constant motion. Temperature is related to average kinetic energy. Higher temperature = faster particle motion.'
        }
      ]
    }
  ];

  const toggleSection = (sectionId: string) => {
    setOpenSections(prev => 
      prev.includes(sectionId) 
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4 font-orbitron">Study Guide</h1>
          <p className="text-gray-300">Master chemistry concepts with our comprehensive guide</p>
        </div>

        <div className="space-y-6">
          {studyGuide.map((section) => (
            <Card key={section.id} className="bg-white/10 backdrop-blur-lg border-white/20">
              <Collapsible
                open={openSections.includes(section.id)}
                onOpenChange={() => toggleSection(section.id)}
              >
                <CollapsibleTrigger asChild>
                  <CardHeader className="cursor-pointer hover:bg-white/5 transition-colors">
                    <CardTitle className="text-white flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <BookOpen className="w-5 h-5" />
                        {section.title}
                      </div>
                      {openSections.includes(section.id) ? (
                        <ChevronDown className="w-5 h-5" />
                      ) : (
                        <ChevronRight className="w-5 h-5" />
                      )}
                    </CardTitle>
                  </CardHeader>
                </CollapsibleTrigger>
                
                <CollapsibleContent>
                  <CardContent className="pt-0">
                    <div className="space-y-4">
                      {section.topics.map((topic, index) => (
                        <div key={index} className="p-4 bg-white/5 rounded-lg border border-white/10">
                          <h3 className="text-lg font-semibold text-white mb-2">{topic.title}</h3>
                          <p className="text-gray-300 leading-relaxed">{topic.content}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </CollapsibleContent>
              </Collapsible>
            </Card>
          ))}
        </div>

        {/* Quick Reference Card */}
        <Card className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 backdrop-blur-lg border-white/20 mt-8">
          <CardHeader>
            <CardTitle className="text-white">Quick Reference</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <h4 className="text-blue-400 font-semibold mb-2">Common Formulas</h4>
                <ul className="text-gray-300 space-y-1">
                  <li>Water: H₂O</li>
                  <li>Carbon Dioxide: CO₂</li>
                  <li>Salt: NaCl</li>
                  <li>Methane: CH₄</li>
                </ul>
              </div>
              <div>
                <h4 className="text-purple-400 font-semibold mb-2">pH Scale</h4>
                <ul className="text-gray-300 space-y-1">
                  <li>0-6: Acidic</li>
                  <li>7: Neutral</li>
                  <li>8-14: Basic</li>
                  <li>Battery acid: ~0, Water: 7, Soap: ~10</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StudyGuidePage;
