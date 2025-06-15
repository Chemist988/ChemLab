
import { Element } from './elements';

export interface RealWorldObject {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  elements: Element['symbol'][];
}

export const realWorldObjects: RealWorldObject[] = [
  {
    id: 'smartphone',
    name: 'Smartphone',
    description: 'A modern smartphone is a marvel of chemistry, containing dozens of elements. The battery often uses Lithium and Cobalt, while the screen and microchips are based on Silicon. The case is typically an Aluminum alloy.',
    imageUrl: 'https://images.unsplash.com/photo-1580910051074-3eb694886505?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
    elements: ['Li', 'Co', 'Si', 'O', 'Al', 'In', 'Sn', 'Ga'],
  },
  {
    id: 'car-battery',
    name: 'Car Battery (Lead-Acid)',
    description: 'The common car battery relies on a lead-acid chemical reaction. It consists of plates of Lead and Lead Oxide submerged in a Sulfuric Acid solution (made of Hydrogen, Sulfur, and Oxygen).',
    imageUrl: 'https://images.unsplash.com/photo-1615217938365-2746c1f196c3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
    elements: ['Pb', 'S', 'O', 'H'],
  },
  {
    id: 'table-salt',
    name: 'Table Salt',
    description: 'Common table salt is the ionic compound Sodium Chloride. It is essential for life and has been used for food preservation and seasoning for millennia.',
    imageUrl: 'https://images.unsplash.com/photo-1599599922250-934d75128646?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
    elements: ['Na', 'Cl'],
  },
    {
    id: 'pencil',
    name: 'Pencil "Lead"',
    description: `A pencil's core isn't lead, but a mixture of Graphite and clay. Graphite is a stable form of Carbon. This is a great example of an allotrope, where an element can exist in different forms with different properties.`,
    imageUrl: 'https://images.unsplash.com/photo-1547078351-4624c16b1297?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
    elements: ['C', 'H', 'O', 'Si'],
  }
];
