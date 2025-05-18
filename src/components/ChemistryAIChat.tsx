
import React, { useState, useRef, useEffect } from 'react';
import { Bot, SendHorizontal, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
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

  const generateResponse = async (userQuestion: string): Promise<string> => {
    // Simulating AI response with common chemistry topics
    setIsLoading(true);
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const responses = {
      default: "I'm not sure about that. Could you ask something about chemical elements, reactions, or periodic table concepts?",
      element: "Elements are the basic building blocks of matter. Each element has a unique atomic number and chemical properties.",
      periodic: "The periodic table organizes elements by atomic number and chemical properties. Groups share characteristics while periods show trends.",
      reaction: "Chemical reactions involve the transformation of substances (reactants) into new substances (products) through breaking and forming chemical bonds.",
      bond: "Chemical bonds are forces that hold atoms together in molecules. Common types include ionic, covalent, and metallic bonds.",
      electron: "Electrons are negatively charged particles that orbit the nucleus of an atom. Their arrangement determines chemical properties.",
      molecule: "Molecules are formed when two or more atoms join together through chemical bonds.",
      acid: "Acids are substances that donate hydrogen ions (H+) in solution. They typically taste sour and react with bases.",
      base: "Bases are substances that accept hydrogen ions (H+) or donate hydroxide ions (OH-). They typically taste bitter and feel slippery.",
      salt: "Salts are ionic compounds formed from the neutralization reaction between acids and bases.",
      h2o: "Water (H₂O) is a polar molecule consisting of two hydrogen atoms bonded to one oxygen atom. It's essential for life on Earth.",
    };
    
    const lowercaseQuestion = userQuestion.toLowerCase();
    
    let response = responses.default;
    
    // Check for keyword matches
    if (lowercaseQuestion.includes('element')) {
      response = responses.element;
    } else if (lowercaseQuestion.includes('periodic')) {
      response = responses.periodic;
    } else if (lowercaseQuestion.includes('reaction')) {
      response = responses.reaction;
    } else if (lowercaseQuestion.includes('bond')) {
      response = responses.bond;
    } else if (lowercaseQuestion.includes('electron')) {
      response = responses.electron;
    } else if (lowercaseQuestion.includes('molecule')) {
      response = responses.molecule;
    } else if (lowercaseQuestion.includes('acid')) {
      response = responses.acid;
    } else if (lowercaseQuestion.includes('base')) {
      response = responses.base;
    } else if (lowercaseQuestion.includes('salt')) {
      response = responses.salt;
    } else if (lowercaseQuestion.includes('h2o') || lowercaseQuestion.includes('water')) {
      response = responses.h2o;
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
                <p className="text-sm">{message.text}</p>
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
