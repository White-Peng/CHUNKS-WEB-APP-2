import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Home, Send, BookOpen } from 'lucide-react';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

interface Reference {
  id: number;
  title: string;
  url: string;
  source: string;
}

export function ChatbotPage() {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [storyTitle, setStoryTitle] = useState('');
  const [showMotivation, setShowMotivation] = useState(true);
  const [showReferences, setShowReferences] = useState(false);

  // Mock references data
  const references: Reference[] = [
    {
      id: 1,
      title: "Understanding Modern Technology Trends",
      url: "https://example.com/article1",
      source: "Tech Journal"
    },
    {
      id: 2,
      title: "The Future of Innovation",
      url: "https://example.com/article2",
      source: "Innovation Quarterly"
    },
    {
      id: 3,
      title: "Expert Insights on Industry Changes",
      url: "https://example.com/article3",
      source: "Industry Review"
    },
    {
      id: 4,
      title: "Historical Perspectives and Context",
      url: "https://example.com/article4",
      source: "Academic Press"
    }
  ];

  useEffect(() => {
    const storedStory = localStorage.getItem('currentStory');
    if (storedStory) {
      const parsedStory = JSON.parse(storedStory);
      setStoryTitle(parsedStory.title);
      
      // Show motivation message for 2 seconds, then send first bot message
      setTimeout(() => {
        setShowMotivation(false);
        
        // After motivation fades, send bot's first message
        setTimeout(() => {
          setMessages([{
            id: 1,
            text: `Hi! I'm here to help you reflect on "${parsedStory.title}". Feel free to ask me any questions about what you've learned!`,
            sender: 'bot',
            timestamp: new Date()
          }]);
        }, 300); // Small delay after fade for smooth transition
      }, 2000);
    }
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const generateBotResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('summary') || lowerMessage.includes('summarize')) {
      return `Great question! The key takeaway from "${storyTitle}" is understanding how different perspectives shape our view of this topic. The chunks you read covered various aspects from historical context to future trends.`;
    }
    
    if (lowerMessage.includes('why') || lowerMessage.includes('reason')) {
      return `That's an insightful question! This topic is important because it impacts how we think about and approach related concepts. Each chunk revealed different layers of understanding.`;
    }
    
    if (lowerMessage.includes('how') || lowerMessage.includes('what')) {
      return `Excellent question! Based on the chunks you've read, there are multiple approaches to this. The real-world applications we covered show practical ways this manifests in everyday life.`;
    }
    
    if (lowerMessage.includes('example')) {
      return `From what you've learned, you can apply these insights in various scenarios. The expert perspectives shared some compelling examples of implementation.`;
    }

    if (lowerMessage.includes('more') || lowerMessage.includes('learn')) {
      return `I can see you're curious to learn more! The deep dive chunk touched on advanced aspects. Consider exploring related topics or revisiting the full article for additional details.`;
    }
    
    return `That's a thought-provoking question about "${storyTitle}". Based on the chunks you've read, this connects to the broader themes of understanding context, expert insights, and real-world applications. What specific aspect interests you most?`;
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      text: input,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate bot thinking time
    setTimeout(() => {
      const botResponse: Message = {
        id: messages.length + 2,
        text: generateBotResponse(input),
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="sticky top-0 z-20 flex items-center justify-between px-4 py-4 bg-white border-b">
        <button 
          onClick={() => navigate('/chunks')}
          className="hover:opacity-70 transition-opacity"
        >
          Chunks
        </button>
        <div className="flex-1"></div>
        <button 
          onClick={() => {
            // Mark current story as consumed and navigate to stories
            const storedStory = localStorage.getItem('currentStory');
            if (storedStory) {
              const parsedStory = JSON.parse(storedStory);
              const consumedStories = JSON.parse(localStorage.getItem('consumedStories') || '[]');
              if (!consumedStories.includes(parsedStory.id)) {
                consumedStories.push(parsedStory.id);
                localStorage.setItem('consumedStories', JSON.stringify(consumedStories));
              }
            }
            navigate('/stories');
          }}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <Home className="w-6 h-6" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4">
        {/* Motivation Message */}
        {showMotivation && (
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="flex justify-center items-center h-full"
          >
            <div className="text-center">
              <p className="text-gray-600">Great Job!</p>
              <p className="text-sm text-gray-500 mt-2">You've completed all chunks. Let's reflect together</p>
            </div>
          </motion.div>
        )}

        {!showMotivation && messages.map((message, index) => (
          <motion.div
            key={message.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                message.sender === 'user'
                  ? 'bg-purple-500 text-white'
                  : 'bg-white text-gray-900 border border-gray-200'
              }`}
            >
              <p className="text-sm">{message.text}</p>
            </div>
          </motion.div>
        ))}
        
        {isTyping && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-start"
          >
            <div className="bg-white border border-gray-200 rounded-2xl px-4 py-3">
              <div className="flex gap-1">
                <motion.span
                  animate={{ opacity: [0.4, 1, 0.4] }}
                  transition={{ duration: 1, repeat: Infinity, delay: 0 }}
                  className="w-2 h-2 bg-gray-400 rounded-full"
                />
                <motion.span
                  animate={{ opacity: [0.4, 1, 0.4] }}
                  transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
                  className="w-2 h-2 bg-gray-400 rounded-full"
                />
                <motion.span
                  animate={{ opacity: [0.4, 1, 0.4] }}
                  transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
                  className="w-2 h-2 bg-gray-400 rounded-full"
                />
              </div>
            </div>
          </motion.div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="sticky bottom-0 bg-white border-t px-4 py-4">
        {/* Book Icon Button - above input */}
        <div className="flex justify-center mb-3">
          <button
            onClick={() => setShowReferences(!showReferences)}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <BookOpen className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* References List */}
        <AnimatePresence>
          {showReferences && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="mb-4 overflow-hidden"
            >
              <div className="bg-gray-50 rounded-xl p-4 max-h-64 overflow-y-auto">
                <h3 className="text-sm mb-3 text-gray-700">References</h3>
                <div className="space-y-2">
                  {references.map((ref) => (
                    <a
                      key={ref.id}
                      href={ref.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block p-3 bg-white rounded-lg border border-gray-200 hover:border-purple-300 hover:bg-purple-50 transition-colors"
                    >
                      <p className="text-sm text-gray-900">{ref.title}</p>
                      <p className="text-xs text-gray-500 mt-1">{ref.source}</p>
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask a question..."
            className="flex-1 px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:border-purple-500 transition-colors"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim()}
            className="p-3 bg-purple-500 text-white rounded-full hover:bg-purple-600 disabled:opacity-50 disabled:hover:bg-purple-500 transition-colors"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}