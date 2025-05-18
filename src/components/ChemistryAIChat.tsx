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

  // Knowledge base - expanded with more general knowledge
  const knowledgeBase = {
    // Chemistry knowledge from before
    // ... keep existing code (chemistry knowledge entries)
    
    // General knowledge topics
    science: "Science is the systematic study of the structure and behavior of the physical and natural world through observation, experimentation, and theoretical explanation. The major branches include physics, chemistry, biology, astronomy, and Earth sciences.",
    math: "Mathematics is the study of numbers, quantities, and shapes. It uses logic and abstraction to develop theories and solve problems in fields such as algebra, geometry, calculus, and statistics.",
    physics: "Physics is the study of matter, energy, and the interaction between them. It explores the fundamental forces of nature and the basic principles that govern the universe, from subatomic particles to galaxies.",
    biology: "Biology is the study of living organisms and their interactions with each other and the environment. It covers topics from molecular processes to ecosystems and evolution.",
    history: "History is the study of past events, particularly human affairs. Historical research uses primary sources, archaeology, and other evidence to understand how societies have changed over time.",
    geography: "Geography studies the lands, features, inhabitants, and phenomena of Earth. It examines both the physical properties of Earth's surface and the human societies spread across it.",
    literature: "Literature encompasses written works valued for their form, ideas, or emotional impact. It includes poetry, novels, plays, and essays from cultures around the world.",
    art: "Art is the expression of creative skill and imagination, typically in visual forms such as painting, sculpture, and photography, producing works appreciated primarily for their beauty or emotional power.",
    music: "Music is the art of arranging sounds in time. It is expressed through elements such as melody, harmony, rhythm, and timbre, and can be performed with voice or instruments.",
    technology: "Technology refers to methods, systems, and devices that are the result of scientific knowledge being used for practical purposes. It encompasses everything from simple tools to complex systems.",
    space: "Space, or outer space, refers to the void that exists between celestial bodies, including Earth. It includes planets, moons, stars, galaxies, and all other matter and energy in the universe.",
    earth: "Earth is the third planet from the Sun and the only astronomical object known to harbor life. It has a dynamic surface with continents and oceans, an atmosphere that supports life, and a variety of ecosystems.",
    climate: "Climate is the average weather conditions in a place over a long period. Climate change refers to significant changes in global temperature, precipitation, wind patterns, and other measures of climate that occur over several decades or longer.",
    health: "Health is a state of complete physical, mental, and social well-being, not merely the absence of disease or infirmity. It encompasses lifestyle, genetics, environment, and healthcare.",
    nutrition: "Nutrition is the process of providing or obtaining the food necessary for health and growth. It studies nutrients and other substances in foods, how the body uses them, and the relationship between diet, health, and disease.",
    sports: "Sports are physical activities governed by a set of rules or customs, often engaged in competitively. They provide exercise, develop skills, promote teamwork, and entertain spectators.",
    economy: "The economy is the system of production, distribution, and consumption of goods and services within a region. Economics studies how individuals, businesses, governments, and nations make choices about allocating resources.",
    politics: "Politics involves the activities associated with governance of a country or area, especially the debate or conflict among individuals or parties having or hoping to achieve power.",
    philosophy: "Philosophy is the study of fundamental questions about existence, knowledge, values, reason, mind, and language. It seeks wisdom through rational argument and critical discussion.",
    psychology: "Psychology is the scientific study of the mind and behavior. It explores concepts such as perception, cognition, attention, emotion, intelligence, motivation, brain functioning, and personality.",
    sociology: "Sociology is the study of society, patterns of social relationships, social interaction, and culture. It uses various methods of empirical investigation and critical analysis.",
    language: "Language is a system of communication consisting of sounds, words, and grammar used by humans. Linguistics studies language structure, acquisition, history, and use in society.",
    religion: "Religion involves belief in and worship of a superhuman controlling power, especially a personal God or gods. Religious studies examine belief systems, practices, texts, and institutions across cultures.",
    internet: "The Internet is a global network of interconnected computers that allows for the sharing of information through websites, email, messaging, and other services. It has revolutionized communication and access to information.",
    ai: "Artificial Intelligence (AI) is the simulation of human intelligence in machines programmed to think and learn like humans. It includes machine learning, natural language processing, computer vision, and robotics.",
    programming: "Programming involves writing computer code to create software that accomplishes specific tasks. Common programming languages include Python, JavaScript, Java, C++, and many others.",
  };

  const generateResponse = async (userQuestion: string): Promise<string> => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay

    const lowercaseQuestion = userQuestion.toLowerCase();
    let response = "I don't have specific information about that topic. Could you try asking something else? I'm knowledgeable about chemistry, science, history, and many other subjects.";
    
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
      } else {
        // Generic response for unrecognized topics
        response = "That's an interesting question! While I don't have specific information on that exact topic, I can try to help if you ask about chemistry, science, history, art, technology, or many other subjects.";
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

export default ChemistryAIChat;
