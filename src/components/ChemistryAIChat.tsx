
import React, { useState, useRef, useEffect } from 'react';
import { Bot, SendHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

// Slang language mapping for common terms
const slangDictionary: Record<string, string> = {
  // Common texting abbreviations
  'lol': 'laugh out loud',
  'rofl': 'rolling on the floor laughing',
  'lmao': 'laughing my [posterior] off',
  'brb': 'be right back',
  'btw': 'by the way',
  'afaik': 'as far as I know',
  'imo': 'in my opinion',
  'imho': 'in my humble opinion',
  'tbh': 'to be honest',
  'fyi': 'for your information',
  'idk': 'I don\'t know',
  'idc': 'I don\'t care',
  'omg': 'oh my goodness',
  'ttyl': 'talk to you later',
  'smh': 'shaking my head',
  'wtf': 'what the [expletive]',
  'yolo': 'you only live once',
  'fomo': 'fear of missing out',
  'rn': 'right now',
  'tfw': 'that feeling when',
  'tbt': 'throwback thursday',
  'ngl': 'not gonna lie',
  'sus': 'suspicious',
  'gg': 'good game',
  'no cap': 'no lie',
  'lit': 'excellent or exciting',
  'slay': 'do something impressively well',
  'bet': 'affirmation/agreement',
  'fr': 'for real',
  'fax': 'facts',
  'wyd': 'what you doing',
  'ofc': 'of course',
  'tho': 'though',
  'u': 'you',
  'r': 'are',
  'ur': 'your',
  'y': 'why',
  'k': 'okay',
  'thx': 'thanks',
  'bc': 'because',
  'b4': 'before',
  'ppl': 'people',
  'srsly': 'seriously',
  'dm': 'direct message',
  'fb': 'Facebook',
  'ig': 'Instagram',
  'yt': 'YouTube'
};

const ChemistryAIChat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hello! I\'m your AI assistant. Ask me anything about chemistry, science, or any other topic!',
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

  // Expanded knowledge base - now with much more categories
  const knowledgeBase = {
    // Chemistry knowledge
    chemistry: "Chemistry is the scientific study of matter, its properties, and the changes it undergoes. It involves elements, compounds, atoms, molecules, and reactions between substances.",
    element: "In chemistry, an element is a substance that cannot be broken down into simpler substances by chemical means. Each element is made up of atoms with the same number of protons.",
    compound: "A compound is a substance formed when two or more elements are chemically joined. Water (H₂O) is a compound of hydrogen and oxygen.",
    molecule: "A molecule is a group of atoms bonded together, representing the smallest fundamental unit of a chemical compound that can take part in a chemical reaction.",
    acid: "Acids are substances that donate hydrogen ions (H⁺) and have a pH less than 7. They typically taste sour and can react with metals to form hydrogen gas.",
    base: "Bases are substances that accept hydrogen ions (or donate OH⁻ ions) and have a pH greater than 7. They typically taste bitter and feel slippery.",
    reaction: "A chemical reaction is a process where one or more substances are converted into different substances. It involves breaking and forming chemical bonds.",
    organic: "Organic chemistry is the study of carbon compounds, especially those found in living things. It's crucial for understanding life processes and developing medicines.",
    inorganic: "Inorganic chemistry is the study of non-carbon compounds, including metals and minerals. It's important for understanding materials, catalysis, and industrial processes.",
    periodic: "The periodic table is a tabular arrangement of chemical elements, organized by their atomic number, electron configuration, and chemical properties.",
    
    // Science categories
    science: "Science is the systematic study of the structure and behavior of the physical and natural world through observation, experimentation, and theoretical explanation.",
    physics: "Physics is the branch of science concerned with the nature and properties of matter and energy, including mechanics, heat, light, sound, electricity, magnetism, and atomic structure.",
    biology: "Biology is the study of living organisms, including their physical structure, chemical processes, molecular interactions, physiological mechanisms, development, and evolution.",
    astronomy: "Astronomy is the scientific study of celestial objects (such as stars, planets, comets, and galaxies), the physics, chemistry, and evolution of objects in the universe.",
    geology: "Geology is the science that deals with the Earth's physical structure and substance, its history, and the processes that act on it.",
    ecology: "Ecology is the study of how organisms interact with one another and with their physical environment.",
    
    // Technology and computers
    technology: "Technology refers to methods, systems, and devices which are the result of scientific knowledge being used for practical purposes.",
    computer: "A computer is an electronic device that manipulates information or data. It can store, retrieve, and process data according to instructions.",
    internet: "The Internet is a global network of billions of computers and other electronic devices that allows people to connect and share information.",
    software: "Software refers to programs and other operating information used by a computer to perform specific tasks.",
    hardware: "Hardware refers to the physical components of a computer system, including the monitor, keyboard, CPU, and storage devices.",
    programming: "Programming involves writing computer code to create software programs that perform specific tasks or solve particular problems.",
    ai: "Artificial Intelligence (AI) refers to the simulation of human intelligence in machines, particularly computer systems. AI involves problem solving, learning, reasoning, and self-correction.",
    
    // Mathematics
    math: "Mathematics is the science of numbers, quantities, and shapes and the relations between them. It's used in many fields including science, engineering, medicine, and economics.",
    algebra: "Algebra is a branch of mathematics dealing with symbols and the rules for manipulating those symbols to solve equations and study mathematical structures.",
    geometry: "Geometry is a branch of mathematics concerned with questions of shape, size, relative position of figures, and the properties of space.",
    calculus: "Calculus is the mathematical study of continuous change, dealing with derivatives (rates of change) and integrals (accumulations).",
    statistics: "Statistics is the discipline that concerns the collection, organization, analysis, interpretation, and presentation of data.",
    
    // History and social sciences
    history: "History is the study of past events, particularly human affairs. It helps us understand how societies and individuals have changed over time.",
    geography: "Geography is the study of places and the relationships between people and their environments, including physical features and human societies.",
    economics: "Economics is the social science that studies the production, distribution, and consumption of goods and services.",
    politics: "Politics refers to the activities associated with governance, especially the debate or conflict among groups or individuals having or hoping to achieve political power.",
    psychology: "Psychology is the scientific study of the mind and behavior. It explores concepts such as perception, cognition, emotion, intelligence, and personality.",
    sociology: "Sociology is the study of human social relationships and institutions, examining how social structures and cultural norms influence human behavior.",
    anthropology: "Anthropology is the scientific study of humans, human behavior, and societies in the past and present.",
    
    // Arts and humanities
    art: "Art is a diverse range of human activities in creating visual, auditory or performing artifacts expressing the author's imaginative or technical skill.",
    literature: "Literature refers to written works, especially those considered of superior or lasting artistic merit, including fiction, non-fiction, drama, and poetry.",
    musical: "Music is an art form and cultural activity whose medium is sound organized in time, generally produced with the intent to be heard.",
    philosophy: "Philosophy is the study of fundamental questions about existence, knowledge, values, reason, mind, and language.",
    religion: "Religion involves beliefs and practices related to supernatural or spiritual elements, often including sacred texts, rituals, and ethical guidelines.",
    language: "Language is a system of communication consisting of sounds, words, and grammar used by humans to express ideas and feelings.",
    
    // Health and medicine
    health: "Health refers to a state of complete physical, mental, and social well-being and not merely the absence of disease or infirmity.",
    medicine: "Medicine is the science and practice of establishing the diagnosis, prognosis, treatment, and prevention of disease.",
    disease: "A disease is an abnormal condition negatively affecting the structure or function of an organism, not due to external injury.",
    nutrition: "Nutrition is the study of nutrients in food and how the body uses them for growth, metabolism, and repair.",
    exercise: "Physical exercise is bodily activity that enhances or maintains physical fitness and overall health and wellness.",
    mental: "Mental health includes our emotional, psychological, and social well-being. It affects how we think, feel, and act.",
    
    // Current issues
    climate: "Climate change refers to long-term shifts in temperatures and weather patterns, largely caused by human activities, particularly burning fossil fuels.",
    environment: "Environmental science studies interactions among the physical, chemical, and biological components of the environment and human impacts on these systems.",
    energy: "Energy is the capacity for doing work. It exists in various forms such as heat, kinetic (motion), light, potential (stored), electrical, and chemical energy.",
    sustainability: "Sustainability focuses on meeting the needs of the present without compromising the ability of future generations to meet their needs.",
    
    // Popular culture
    movie: "Movies (or films) are visual arts that simulate experiences and tell stories through moving images, often with sound, providing entertainment and artistic expression.",
    music: "Popular music includes genres widely accessible to the general public, often distributed through the music industry via recordings and broadcasts.",
    game: "Video games are electronic games that involve interaction with a user interface to generate visual feedback on a display device, providing entertainment and challenges.",
    sport: "Sports involve physical activity and skill where individuals or teams compete against each other, following specific rules and objectives.",
    celebrity: "Celebrities are people who have gained fame and public attention, often due to achievements in entertainment, sports, politics, or other fields.",
    
    // General knowledge
    world: "The world refers to the Earth, especially as the habitat of human beings, with its countries, peoples, and natural features.",
    country: "A country is a nation with its own government, occupying a particular territory. There are approximately 195 countries in the world today.",
    ocean: "Oceans are large bodies of saltwater that cover approximately 70% of Earth's surface. The five major oceans are the Pacific, Atlantic, Indian, Southern, and Arctic.",
    animal: "Animals are multicellular eukaryotic organisms in the biological kingdom Animalia, ranging from simple organisms to complex mammals.",
    plant: "Plants are mainly multicellular organisms in the kingdom Plantae that use photosynthesis to make their own food using energy from the sun.",
    space: "Space, or outer space, refers to the relatively empty regions of the universe outside the atmospheres of celestial bodies, containing stars, planets, and galaxies."
  };

  // Process slang terms in user input
  const processSlang = (input: string): string => {
    let processedInput = input.toLowerCase();
    
    // Replace slang terms with their meanings
    Object.keys(slangDictionary).forEach(slang => {
      const regex = new RegExp(`\\b${slang}\\b`, 'gi');
      processedInput = processedInput.replace(regex, slangDictionary[slang]);
    });
    
    return processedInput;
  };

  const generateResponse = async (userQuestion: string): Promise<string> => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay

    // Process any slang in the question
    const processedQuestion = processSlang(userQuestion);
    const lowercaseQuestion = processedQuestion.toLowerCase();
    
    let response = "";
    
    // Extract keywords from the question
    const keywords = Object.keys(knowledgeBase);
    
    // Find matching keywords in the question
    const matchingKeywords = keywords.filter(keyword => 
      lowercaseQuestion.includes(keyword)
    );
    
    if (matchingKeywords.length > 0) {
      // Start with information from the most relevant keyword
      response = knowledgeBase[matchingKeywords[0] as keyof typeof knowledgeBase];
      
      // Add information from additional keywords if there are any
      if (matchingKeywords.length > 1) {
        response += "\n\nAdditionally: ";
        const additionalInfo = matchingKeywords.slice(1, 3).map(keyword => 
          knowledgeBase[keyword as keyof typeof knowledgeBase]
        ).join("\n\n");
        response += additionalInfo;
      }
    } else {
      // Handle common questions that might not contain specific keywords
      if (lowercaseQuestion.includes("hello") || lowercaseQuestion.includes("hi") || lowercaseQuestion.includes("hey")) {
        response = "Hello! I'm your AI assistant. How can I help you today?";
      } else if (lowercaseQuestion.includes("how are you")) {
        response = "I'm functioning well, thank you for asking! How can I assist you today?";
      } else if (lowercaseQuestion.includes("your name") || lowercaseQuestion.includes("who are you")) {
        response = "I'm an AI assistant designed to answer questions on a wide range of topics, with special knowledge in chemistry and science.";
      } else if (lowercaseQuestion.includes("thank")) {
        response = "You're welcome! Feel free to ask if you have any other questions.";
      } else if (lowercaseQuestion.includes("who made you") || lowercaseQuestion.includes("creator")) {
        response = "I was developed by a team of engineers and scientists focusing on natural language processing and knowledge retrieval.";
      } else if (lowercaseQuestion.includes("joke") || lowercaseQuestion.includes("funny")) {
        const jokes = [
          "Why don't scientists trust atoms? Because they make up everything!",
          "I told my chemistry joke, but there was no reaction.",
          "Why was the math book sad? Because it had too many problems!",
          "Why did the scarecrow win an award? Because he was outstanding in his field!",
          "What's the best way to organize a space party? You planet!"
        ];
        response = jokes[Math.floor(Math.random() * jokes.length)];
      } else {
        // General knowledge response for unrecognized topics
        response = "That's an interesting question! While I don't have specific information on that exact topic, I can try to help if you have other questions. I'm knowledgeable about science, history, technology, arts, health, and many other subjects.";
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
        <h3 className="text-lg font-semibold">AI Assistant</h3>
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
          placeholder="Ask me anything..."
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

export default BlueMatterAI;
