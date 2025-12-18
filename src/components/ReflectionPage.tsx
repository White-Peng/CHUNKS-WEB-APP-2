import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, ChevronDown } from 'lucide-react';

interface Story {
  id: number;
  title: string;
  description: string;
  image: string;
}

const REFLECTION_QUESTIONS = [
  "How does this topic connect to your personal experiences?",
  "What's the most surprising thing you learned from this?",
  "How might this information change your perspective?",
  "What questions does this raise for you?",
  "How could you apply this knowledge in your daily life?",
  "What emotions does this topic evoke for you?"
];

export function ReflectionPage() {
  const navigate = useNavigate();
  const [story, setStory] = useState<Story | null>(null);
  const [question, setQuestion] = useState('');
  const [showContinue, setShowContinue] = useState(false);

  useEffect(() => {
    const storedStory = localStorage.getItem('currentStory');
    if (storedStory) {
      const parsedStory = JSON.parse(storedStory);
      setStory(parsedStory);
      // Select a random reflection question
      const randomQuestion = REFLECTION_QUESTIONS[Math.floor(Math.random() * REFLECTION_QUESTIONS.length)];
      setQuestion(randomQuestion);
    } else {
      navigate('/stories');
    }

    // Show continue hint after 3 seconds
    const timer = setTimeout(() => setShowContinue(true), 3000);
    return () => clearTimeout(timer);
  }, [navigate]);

  const handleContinue = () => {
    navigate('/chunks');
  };

  if (!story) return null;

  return (
    <div className="fixed inset-0 bg-white overflow-hidden">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-4 py-4 bg-white border-b">
        <button 
          onClick={() => navigate('/stories')}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h2>Reflect</h2>
        <div className="w-10"></div>
      </div>

      {/* Content */}
      <div className="flex flex-col items-center justify-center min-h-screen px-8 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-8 max-w-lg"
        >
          {/* Topic Title */}
          <div className="space-y-2">
            <p className="text-gray-500 uppercase tracking-wider text-sm">
              Topic
            </p>
            <h2>{story.title}</h2>
          </div>

          {/* Reflection Question */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="p-8 bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl"
          >
            <h1 className="leading-tight">
              {question}
            </h1>
          </motion.div>

          {/* Instructions */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="text-gray-600"
          >
            Take a moment to think about this question. When you're ready, scroll down to continue.
          </motion.p>
        </motion.div>
      </div>

      {/* Continue Hint */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: showContinue ? 1 : 0, y: showContinue ? 0 : 20 }}
        transition={{ duration: 0.4 }}
        className="fixed bottom-8 left-0 right-0 flex flex-col items-center gap-2 pointer-events-none"
      >
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ChevronDown className="w-6 h-6 text-gray-400 rotate-180" />
        </motion.div>
        <p className="text-gray-400 text-sm">Swipe up to continue</p>
      </motion.div>

      {/* Swipe Area for Continue */}
      <motion.div
        className="fixed inset-0 cursor-pointer"
        drag="y"
        dragConstraints={{ top: 0, bottom: 0 }}
        dragElastic={0.2}
        onDragEnd={(event, info) => {
          if (info.offset.y < -100) {
            handleContinue();
          }
        }}
      />
    </div>
  );
}