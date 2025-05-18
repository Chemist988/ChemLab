
import React, { useState, useRef, useEffect } from 'react';
import { Bot, SendHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

const ChemistryAIChat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hello! I\'m your chemistry AI assistant. Ask me anything about elements, reactions, or chemical concepts!',
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Chemistry knowledge base - expanded with more detailed information
  const chemistryKnowledge = {
    // Elements and periodic table
    element: "Elements are pure substances that cannot be broken down into simpler substances by chemical means. Each element has a unique atomic number (number of protons) and unique properties. The periodic table organizes all known elements based on their properties and atomic structure.",
    atom: "Atoms are the basic building blocks of matter, consisting of a nucleus (containing protons and neutrons) surrounded by electrons. The number of protons determines which element the atom is.",
    periodic: "The periodic table organizes elements by increasing atomic number and groups them by similar chemical properties. Elements in the same group (column) have similar properties because they have the same number of electrons in their outer shell. The periods (rows) represent the number of electron shells.",
    
    // Chemical bonding
    bond: "Chemical bonds are forces of attraction that hold atoms together. The three primary types are: ionic bonds (electron transfer between atoms), covalent bonds (electron sharing between atoms), and metallic bonds (electron sharing among a 'sea' of atoms).",
    ionic: "Ionic bonding occurs when electrons are completely transferred from one atom to another, creating oppositely charged ions that attract each other. Common in compounds between metals and non-metals, like NaCl (table salt).",
    covalent: "Covalent bonding occurs when atoms share electron pairs to achieve a more stable electron configuration. It's common between non-metal atoms like in H₂O, CO₂, and organic compounds.",
    metallic: "Metallic bonding involves a 'sea' of delocalized electrons surrounding a lattice of positive metal ions. This explains properties of metals such as electrical conductivity, malleability, and ductility.",
    
    // States of matter
    solid: "Solids have definite shape and volume because particles are closely packed in fixed positions, vibrating but not moving past each other. They have high density and are not easily compressed.",
    liquid: "Liquids have definite volume but take the shape of their container because particles are close together but can move past each other. They flow and can be poured.",
    gas: "Gases have neither definite shape nor volume; they expand to fill their container. Particles move quickly and are far apart, allowing gases to be compressed easily.",
    plasma: "Plasma is the fourth state of matter consisting of highly charged particles. It occurs at extremely high temperatures when electrons are stripped from atoms, creating a highly energetic and electrically conductive substance. Examples include lightning, stars, and fluorescent lights.",
    
    // Chemical reactions
    reaction: "Chemical reactions involve the transformation of substances (reactants) into different substances (products) by breaking and forming chemical bonds. They are represented by balanced chemical equations and may involve energy changes.",
    combustion: "Combustion is a type of oxidation reaction where a substance reacts rapidly with oxygen, producing heat and light. Example: CH₄ + 2O₂ → CO₂ + 2H₂O (methane combustion).",
    synthesis: "Synthesis (combination) reactions occur when two or more substances combine to form a new compound. Example: 2H₂ + O₂ → 2H₂O (hydrogen and oxygen forming water).",
    decomposition: "Decomposition reactions occur when a compound breaks down into simpler substances. Example: 2H₂O₂ → 2H₂O + O₂ (hydrogen peroxide breaking down).",
    replacement: "Single replacement reactions occur when one element replaces another in a compound. Example: Zn + 2HCl → ZnCl₂ + H₂.",
    
    // Acids and bases
    acid: "Acids are substances that donate hydrogen ions (H⁺) in solution. They taste sour, turn blue litmus paper red, and have a pH less than 7. Examples include HCl (hydrochloric acid), H₂SO₄ (sulfuric acid), and CH₃COOH (acetic acid).",
    base: "Bases are substances that accept hydrogen ions or donate hydroxide ions (OH⁻). They taste bitter, feel slippery, turn red litmus paper blue, and have a pH greater than 7. Examples include NaOH (sodium hydroxide) and NH₃ (ammonia).",
    ph: "pH is a scale from 0 to 14 that measures how acidic or basic a solution is. A pH of 7 is neutral, below 7 is acidic, and above 7 is basic. Each unit represents a tenfold change in hydrogen ion concentration.",
    neutralization: "Neutralization is a reaction between an acid and a base that produces water and a salt. Example: HCl + NaOH → NaCl + H₂O.",
    
    // Thermodynamics
    thermodynamics: "Thermodynamics is the study of energy and its transformations. The First Law states energy cannot be created or destroyed, only transformed. The Second Law states that entropy (disorder) of an isolated system always increases.",
    exothermic: "Exothermic reactions release energy (usually as heat) to the surroundings. Examples include combustion reactions and neutralization reactions.",
    endothermic: "Endothermic reactions absorb energy from the surroundings. Examples include photosynthesis and the dissolving of ammonium nitrate in water (used in cold packs).",
    
    // Organic chemistry
    organic: "Organic chemistry is the study of carbon-containing compounds. Carbon's ability to form four bonds and create chains leads to millions of possible compounds, including those essential for life.",
    hydrocarbon: "Hydrocarbons are organic compounds containing only carbon and hydrogen. They include alkanes (single bonds), alkenes (double bonds), alkynes (triple bonds), and aromatic compounds.",
    functional: "Functional groups are specific arrangements of atoms within organic molecules that give them characteristic chemical properties. Examples include alcohols (-OH), carboxylic acids (-COOH), and amines (-NH₂).",
    polymer: "Polymers are large molecules composed of repeating structural units called monomers. Natural polymers include proteins, cellulose, and DNA. Synthetic polymers include plastics like polyethylene and nylon.",
    
    // Common molecules and compounds
    h2o: "Water (H₂O) is a polar molecule with oxygen bonded to two hydrogen atoms. It has unique properties due to hydrogen bonding, including high surface tension, specific heat capacity, and being an excellent solvent for polar substances.",
    co2: "Carbon dioxide (CO₂) is a colorless gas formed by combustion and respiration. It's a greenhouse gas, used in photosynthesis, and dissolves in water to form carbonic acid, which gives carbonated beverages their fizz.",
    nacl: "Sodium chloride (NaCl), or table salt, is an ionic compound formed from the reaction between sodium (a highly reactive metal) and chlorine (a toxic gas). It's essential for life and used for food preservation.",
    
    // Nuclear chemistry
    nuclear: "Nuclear chemistry deals with the nuclei of atoms and nuclear reactions. It includes radioactivity, nuclear energy production, and applications in medicine and dating techniques.",
    radioactive: "Radioactive decay occurs when unstable atomic nuclei emit radiation. Types include alpha (helium nuclei), beta (electrons), and gamma (high-energy photons) radiation.",
    halflife: "Half-life is the time required for half of a radioactive sample to decay. It's a characteristic property of each radioisotope and ranges from fractions of a second to billions of years.",
    fusion: "Nuclear fusion combines light atomic nuclei to form heavier nuclei, releasing enormous energy. It powers the sun and other stars, and scientists are working to develop controlled fusion for clean energy production.",
    fission: "Nuclear fission is the splitting of heavy atomic nuclei into lighter nuclei, releasing energy. It's used in nuclear power plants and weapons. Example: uranium-235 splitting when bombarded with neutrons.",
    
    // Common chemicals and compounds
    salt: "Salt (in chemistry) refers to any compound formed by the reaction between an acid and a base. Common table salt (NaCl) is just one example. Salts are composed of cations (positive ions) and anions (negative ions).",
    alcohol: "Alcohols are organic compounds with a hydroxyl (-OH) group attached to a carbon atom. Ethanol (C₂H₅OH) is the type found in alcoholic beverages, while methanol and isopropyl alcohol are used as solvents and antiseptics.",
    metal: "Metals are elements characterized by their luster, malleability, conductivity, and tendency to form positive ions. They occupy the left and center of the periodic table, with varying properties based on their electron configuration.",
    nonmetal: "Non-metals are elements that generally lack metallic attributes. They're poor conductors of heat and electricity, not malleable, and tend to gain electrons in reactions. They occupy the upper right portion of the periodic table.",
    
    // Laboratory and analysis
    solution: "A solution is a homogeneous mixture where one substance (solute) is dissolved in another (solvent). Concentration can be expressed as molarity (moles of solute per liter of solution), percentage, or parts per million.",
    titration: "Titration is a laboratory technique to determine the concentration of a solution by adding a measured amount of a solution of known concentration until the reaction is complete, indicated by a color change or other signal.",
    chromatography: "Chromatography is a technique for separating mixtures based on different rates at which components move through a stationary phase under the influence of a mobile phase. Types include paper, thin-layer, gas, and high-performance liquid chromatography.",
    spectroscopy: "Spectroscopy studies the interaction between matter and electromagnetic radiation. It's used to identify and quantify substances based on the absorption, emission, or scattering of electromagnetic radiation.",
    
    // Famous chemists and discoveries
    nobel: "The Nobel Prize in Chemistry has recognized groundbreaking discoveries since 1901. Notable recipients include Marie Curie (radioactivity), Linus Pauling (chemical bonds), and Dorothy Hodgkin (protein crystallography).",
    curie: "Marie Curie (1867-1934) discovered the elements polonium and radium and pioneered research on radioactivity. She was the first person to win Nobel Prizes in two different scientific fields (Physics and Chemistry).",
    mendeleev: "Dmitri Mendeleev (1834-1907) created the first widely recognized periodic table of elements in 1869, organizing elements by atomic weight and chemical properties. He left spaces for undiscovered elements and predicted their properties accurately.",
    lavoisier: "Antoine Lavoisier (1743-1794) is considered the 'Father of Modern Chemistry.' He named oxygen and hydrogen, helped develop the metric system, and established the law of conservation of mass in chemical reactions.",
  };

  const generateResponse = async (userQuestion: string): Promise<string> => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay
    
    const lowercaseQuestion = userQuestion.toLowerCase();
    let response = "I don't have specific information about that chemistry topic. Could you try asking about elements, reactions, or other basic chemistry concepts?";
    
    // Extract keywords from the question
    const keywords = Object.keys(chemistryKnowledge);
    
    // Find matching keywords in the question
    const matchingKeywords = keywords.filter(keyword => 
      lowercaseQuestion.includes(keyword)
    );
    
    if (matchingKeywords.length > 0) {
      // Start with information from the most relevant keyword
      response = chemistryKnowledge[matchingKeywords[0] as keyof typeof chemistryKnowledge];
      
      // Add information from additional keywords if there are any
      if (matchingKeywords.length > 1) {
        response += "\n\nAdditionally: ";
        const additionalInfo = matchingKeywords.slice(1, 3).map(keyword => 
          chemistryKnowledge[keyword as keyof typeof chemistryKnowledge]
        ).join("\n\n");
        response += additionalInfo;
      }
    } else {
      // Handle common chemistry questions that might not contain specific keywords
      if (lowercaseQuestion.includes("what is chemistry")) {
        response = "Chemistry is the scientific study of matter, its properties, composition, structure, and the changes it undergoes during chemical reactions. It investigates how atoms, the basic building blocks of matter, combine to form molecules and how these molecules interact with each other.";
      } else if (lowercaseQuestion.includes("why") && lowercaseQuestion.includes("study") && lowercaseQuestion.includes("chemistry")) {
        response = "Studying chemistry is important because it helps us understand the world around us. Chemistry explains how food changes when cooked, how medications work, why leaves change color in fall, and countless other phenomena. It's essential for developing new materials, medicines, energy sources, and solutions to environmental challenges.";
      } else if (lowercaseQuestion.includes("hello") || lowercaseQuestion.includes("hi") || lowercaseQuestion.includes("hey")) {
        response = "Hello! I'm your chemistry AI assistant. How can I help you with chemistry today?";
      }
    }
    
    setIsLoading(false);
    return response;
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      isUser: true,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    
    // Get AI response
    const aiResponse = await generateResponse(inputMessage);
    
    // Add AI message
    const aiMessage: Message = {
      id: (Date.now() + 1).toString(),
      text: aiResponse,
      isUser: false,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, aiMessage]);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-2 mb-4">
        <Bot className="h-5 w-5 text-primary" />
        <h3 className="text-lg font-semibold">Chemistry AI Assistant</h3>
      </div>
      
      <ScrollArea className="flex-1 p-4 border rounded-md mb-4 bg-card/50">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                "flex gap-2 items-start",
                message.isUser ? "justify-end" : "justify-start"
              )}
            >
              <div
                className={cn(
                  "max-w-[80%] rounded-lg p-3",
                  message.isUser
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted"
                )}
              >
                <p className="text-sm whitespace-pre-line">{message.text}</p>
                <span className="text-[10px] opacity-70 block text-right mt-1">
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>
      
      {isLoading && (
        <div className="text-sm text-muted-foreground mb-2 flex items-center gap-2">
          <div className="animate-pulse">AI is thinking...</div>
        </div>
      )}
      
      <div className="flex gap-2">
        <Input
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              handleSendMessage();
            }
          }}
          placeholder="Ask about chemistry concepts..."
          className="flex-1"
          disabled={isLoading}
        />
        <Button onClick={handleSendMessage} disabled={isLoading || !inputMessage.trim()}>
          <SendHorizontal className="h-4 w-4" />
          <span className="sr-only">Send message</span>
        </Button>
      </div>
    </div>
  );
};

export default ChemistryAIChat;
