
import React from 'react';

export interface BreakingBadCharacter {
  name: string;
  alias: string;
  image: string;
  quote: string;
  expertise: string;
}

export const breakingBadCharacters: BreakingBadCharacter[] = [
  {
    name: "Walter White",
    alias: "Heisenberg",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
    quote: "I am the one who knocks!",
    expertise: "Chemical synthesis and reactions"
  },
  {
    name: "Jesse Pinkman",
    alias: "Cap'n Cook",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=300&q=80",
    quote: "Yeah, science!",
    expertise: "Street chemistry and distribution"
  },
  {
    name: "Gustavo Fring",
    alias: "The Chicken Man",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=300&q=80",
    quote: "A man provides for his family",
    expertise: "Industrial scale production"
  },
  {
    name: "Saul Goodman",
    alias: "Better Call Saul",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=300&q=80",
    quote: "Better call Saul!",
    expertise: "Legal chemistry consulting"
  }
];

const BreakingBadCharacters: React.FC = () => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {breakingBadCharacters.map((character, index) => (
        <div key={index} className="glass-effect rounded-xl p-4 border border-primary/30 text-center">
          <div 
            className="w-16 h-16 mx-auto mb-3 rounded-full bg-cover bg-center border-2 border-primary/50"
            style={{ backgroundImage: `url(${character.image})` }}
          />
          <h4 className="font-bold text-primary text-sm">{character.alias}</h4>
          <p className="text-xs text-muted-foreground mb-2">{character.name}</p>
          <p className="text-xs text-muted-foreground italic">"{character.quote}"</p>
          <p className="text-xs text-primary mt-1">{character.expertise}</p>
        </div>
      ))}
    </div>
  );
};

export default BreakingBadCharacters;
