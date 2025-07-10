import React, { useState, useRef, useEffect } from 'react';
import { Bot, SendHorizontal, Share, Copy, Bookmark, Heart, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { toast } from '@/hooks/use-toast';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
  isBookmarked?: boolean;
  isLiked?: boolean;
}

// Slang language mapping for common terms
const slangDictionary: Record<string, string> = {
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
      text: 'Hello! I\'m TheBlueMatterAI. "Say my name..." I\'m here to help you with chemistry, reactions, and all things science. What would you like to know?',
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

  // Add haptic feedback for iOS
  const hapticFeedback = (type: 'light' | 'medium' | 'heavy' = 'light') => {
    if ('vibrate' in navigator) {
      const patterns = {
        light: [10],
        medium: [20],
        heavy: [30]
      };
      navigator.vibrate(patterns[type]);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const knowledgeBase = {
    chemistry: "Chemistry is the scientific study of matter, its properties, and the changes it undergoes. It involves elements, compounds, atoms, molecules, and reactions between substances.",
    element: "In chemistry, an element is a substance that cannot be broken down into simpler substances by chemical means. Each element is made up of atoms with the same number of protons.",
    compound: "A compound is a substance formed when two or more elements are chemically joined. Water (H₂O) is a compound of hydrogen and oxygen.",
    molecule: "A molecule is a group of atoms bonded together, representing the smallest fundamental unit of a chemical compound that can take part in a chemical reaction.",
    acid: "Acids are substances that donate hydrogen ions (H⁺) and have a pH less than 7. They typically taste sour and can react with metals to form hydrogen gas.",
    base: "Bases are substances that accept hydrogen ions (or donate OH⁻ ions) and have a pH greater than 7. They typically taste bitter and feel slippery.",
    reaction: "A chemical reaction is a process where one or more substances are converted into different substances. It involves breaking and forming chemical bonds.",
    organic: "Organic chemistry is the study of carbon compounds, especially those found in living things. It's crucial for understanding life processes and developing medicines.",
    inorganic: "Inorganic chemistry is the study of non-carbon compounds, including metals and minerals. It's important for understanding materials, catalysis, and industrial processes.",
    periodic: "The periodic table is a tabular arrangement of chemical elements, organized by their atomic number, electron configuration, and chemical properties."
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
    await new Promise(resolve => setTimeout(resolve, 1000));

    const processedQuestion = processSlang(userQuestion);
    const lowercaseQuestion = processedQuestion.toLowerCase();
    
    let response = "";
    
    // Check for TheBlueMatterAI identity questions
    if (lowercaseQuestion.includes("who are you") || lowercaseQuestion.includes("your name") || lowercaseQuestion.includes("what are you")) {
      response = "I'm TheBlueMatterAI - your chemistry companion. Think of me as your personal Walter White for legitimate science! I specialize in chemistry, reactions, and helping you understand the molecular world. Say my name... it's TheBlueMatterAI!";
    } else if (lowercaseQuestion.includes("hello") || lowercaseQuestion.includes("hi") || lowercaseQuestion.includes("hey")) {
      response = "Hello! I'm TheBlueMatterAI, your chemistry expert. Ready to cook up some knowledge? What chemical mysteries shall we explore today?";
    } else if (lowercaseQuestion.includes("say my name") || lowercaseQuestion.includes("heisenberg")) {
      response = "You're TheBlueMatterAI! Wait, no... I'M TheBlueMatterAI! 😄 But seriously, I'm your AI chemistry assistant, ready to help you understand the science behind reactions, elements, and molecular structures.";
    } else {
      // Extract keywords from the question
      const keywords = Object.keys(knowledgeBase);
      const matchingKeywords = keywords.filter(keyword => 
        lowercaseQuestion.includes(keyword)
      );
      
      if (matchingKeywords.length > 0) {
        response = knowledgeBase[matchingKeywords[0] as keyof typeof knowledgeBase];
        
        if (matchingKeywords.length > 1) {
          response += "\n\nAdditionally: ";
          const additionalInfo = matchingKeywords.slice(1, 3).map(keyword => 
            knowledgeBase[keyword as keyof typeof knowledgeBase]
          ).join("\n\n");
          response += additionalInfo;
        }
      } else {
        response = "That's an interesting question! As TheBlueMatterAI, I specialize in chemistry and science. Feel free to ask me about elements, reactions, compounds, or any chemistry concepts you'd like to understand better!";
      }
    }
    
    setIsLoading(false);
    return response;
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;
    
    hapticFeedback('light');
    
    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      isUser: true,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    
    const aiResponse = await generateResponse(inputMessage);
    
    const aiMessage: Message = {
      id: (Date.now() + 1).toString(),
      text: aiResponse,
      isUser: false,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, aiMessage]);
    hapticFeedback('medium');
  };

  const shareMessage = async (message: Message) => {
    hapticFeedback('light');
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'TheBlueMatterAI Response',
          text: message.text,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      navigator.clipboard.writeText(message.text);
      toast({
        title: "Copied to clipboard",
        description: "Message copied successfully!",
      });
    }
  };

  const copyMessage = async (text: string) => {
    hapticFeedback('light');
    try {
      await navigator.clipboard.writeText(text);
      toast({
        title: "Copied!",
        description: "Message copied to clipboard",
      });
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  const toggleBookmark = (messageId: string) => {
    hapticFeedback('medium');
    setMessages(prev => prev.map(msg => 
      msg.id === messageId 
        ? { ...msg, isBookmarked: !msg.isBookmarked }
        : msg
    ));
  };

  const toggleLike = (messageId: string) => {
    hapticFeedback('light');
    setMessages(prev => prev.map(msg => 
      msg.id === messageId 
        ? { ...msg, isLiked: !msg.isLiked }
        : msg
    ));
  };

  return (
    <div className="flex flex-col h-full relative">
      {/* Enhanced Header */}
      <div className="flex items-center gap-3 mb-6 p-4 glass-effect rounded-xl border border-primary/30">
        <div className="w-10 h-10 bg-gradient-to-br from-primary/20 to-primary/10 rounded-full flex items-center justify-center border border-primary/30">
          <Bot className="h-5 w-5 text-primary" />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-bold text-primary font-orbitron">TheBlueMatterAI</h3>
          <p className="text-xs text-muted-foreground">"I am the one who knows chemistry"</p>
        </div>
        <div className="flex items-center gap-1">
          <Sparkles className="h-4 w-4 text-primary animate-pulse" />
          <span className="text-xs text-primary font-medium">99.1% Pure</span>
        </div>
      </div>
      
      <ScrollArea className="flex-1 p-4 border rounded-xl mb-4 glass-effect border-primary/30">
        <div className="space-y-6">
          {messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                "flex gap-3 items-start group",
                message.isUser ? "justify-end" : "justify-start"
              )}
            >
              {!message.isUser && (
                <div className="w-8 h-8 bg-gradient-to-br from-primary/20 to-primary/10 rounded-full flex items-center justify-center border border-primary/30 mt-1">
                  <Bot className="h-4 w-4 text-primary" />
                </div>
              )}
              
              <div
                className={cn(
                  "max-w-[80%] rounded-2xl p-4 relative backdrop-blur-sm",
                  message.isUser
                    ? "bg-gradient-to-br from-primary to-primary/80 text-primary-foreground ml-12"
                    : "bg-gradient-to-br from-card/80 to-card/60 border border-primary/20"
                )}
              >
                <p className="text-sm whitespace-pre-line leading-relaxed">{message.text}</p>
                <div className="flex items-center justify-between mt-3 pt-2 border-t border-current/10">
                  <span className="text-[10px] opacity-60 font-medium">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                  
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all duration-200">
                    <button
                      onClick={() => toggleLike(message.id)}
                      className={cn(
                        "p-1.5 rounded-full hover:bg-background/20 transition-all duration-200",
                        message.isLiked && "text-red-500 scale-110"
                      )}
                    >
                      <Heart className="h-3 w-3" fill={message.isLiked ? "currentColor" : "none"} />
                    </button>
                    
                    <button
                      onClick={() => toggleBookmark(message.id)}
                      className={cn(
                        "p-1.5 rounded-full hover:bg-background/20 transition-all duration-200",
                        message.isBookmarked && "text-yellow-500 scale-110"
                      )}
                    >
                      <Bookmark className="h-3 w-3" fill={message.isBookmarked ? "currentColor" : "none"} />
                    </button>
                    
                    <button
                      onClick={() => copyMessage(message.text)}
                      className="p-1.5 rounded-full hover:bg-background/20 transition-all duration-200"
                    >
                      <Copy className="h-3 w-3" />
                    </button>
                    
                    <button
                      onClick={() => shareMessage(message)}
                      className="p-1.5 rounded-full hover:bg-background/20 transition-all duration-200"
                    >
                      <Share className="h-3 w-3" />
                    </button>
                  </div>
                </div>
              </div>
              
              {message.isUser && (
                <div className="w-8 h-8 bg-gradient-to-br from-primary/20 to-primary/10 rounded-full flex items-center justify-center border border-primary/30 mt-1">
                  <div className="w-4 h-4 bg-primary rounded-full" />
                </div>
              )}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>
      
      {isLoading && (
        <div className="text-sm text-muted-foreground mb-3 flex items-center gap-2 px-2">
          <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
          <div className="animate-pulse">TheBlueMatterAI is thinking...</div>
        </div>
      )}
      
      <div className="flex gap-3 p-2 glass-effect rounded-xl border border-primary/30">
        <Input
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              handleSendMessage();
            }
          }}
          placeholder="Ask TheBlueMatterAI anything about chemistry..."
          className="flex-1 border-primary/20 bg-background/50 focus:border-primary/50"
          disabled={isLoading}
        />
        <Button 
          onClick={handleSendMessage} 
          disabled={isLoading || !inputMessage.trim()}
          className="bg-primary hover:bg-primary/90 px-4"
        >
          <SendHorizontal className="h-4 w-4" />
          <span className="sr-only">Send message</span>
        </Button>
      </div>
    </div>
  );
};

export default ChemistryAIChat;
