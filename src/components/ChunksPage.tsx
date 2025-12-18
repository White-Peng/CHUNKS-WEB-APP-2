import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { X } from 'lucide-react';

interface Story {
  id: number;
  title: string;
  description: string;
  image: string;
}

interface Chunk {
  id: number;
  title: string;
  content: string;
  image: string;
}

// Generate 6 chunks based on the story topic
const generateChunks = (story: Story): Chunk[] => {
  return [
    {
      id: 1,
      title: `Key Insight #1`,
      content: `Discover the fundamental concepts behind ${story.title}. This chunk explores the basics and sets the foundation for deeper understanding.`,
      image: story.image
    },
    {
      id: 2,
      title: `Historical Context`,
      content: `Learn about the evolution and background of ${story.title}. Understanding the past helps illuminate the present.`,
      image: story.image
    },
    {
      id: 3,
      title: `Expert Perspective`,
      content: `Industry leaders share their insights on ${story.title}. Gain valuable knowledge from those at the forefront.`,
      image: story.image
    },
    {
      id: 4,
      title: `Real-World Application`,
      content: `See how ${story.title} manifests in everyday life. Practical examples that bring theory to reality.`,
      image: story.image
    },
    {
      id: 5,
      title: `Deep Dive`,
      content: `An in-depth exploration of the most fascinating aspects of ${story.title}. For those who want to go further.`,
      image: story.image
    }
  ];
};

export function ChunksPage() {
  const navigate = useNavigate();
  const [story, setStory] = useState<Story | null>(null);
  const [chunks, setChunks] = useState<Chunk[]>([]);
  const [currentChunkIndex, setCurrentChunkIndex] = useState(0);

  useEffect(() => {
    const storedStory = localStorage.getItem('currentStory');
    if (storedStory) {
      const parsedStory = JSON.parse(storedStory);
      setStory(parsedStory);
      const generatedChunks = generateChunks(parsedStory);
      setChunks(generatedChunks);
    } else {
      navigate('/stories');
    }
  }, [navigate]);

  const nextChunk = () => {
    if (currentChunkIndex < chunks.length - 1) {
      const nextIndex = currentChunkIndex + 1;
      setCurrentChunkIndex(nextIndex);
    } else {
      // All chunks viewed, navigate to chatbot page
      navigate('/chatbot');
    }
  };

  const currentChunk = chunks[currentChunkIndex];

  if (!story || !currentChunk) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-30 bg-black"
    >
      {/* Close Button */}
      <button
        onClick={() => navigate('/stories')}
        className="absolute top-4 right-4 z-40 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
      >
        <X className="w-6 h-6 text-white" />
      </button>

      {/* Chunk Content - Tappable */}
      <div className="relative h-full flex">
        {/* Left Tap Area - Previous Chunk */}
        <button
          onClick={() => {
            if (currentChunkIndex > 0) {
              const prevIndex = currentChunkIndex - 1;
              setCurrentChunkIndex(prevIndex);
            }
          }}
          className="absolute left-0 top-0 bottom-0 w-1/3 z-10"
          style={{ WebkitTapHighlightColor: 'transparent' }}
        />

        {/* Right Tap Area - Next Chunk */}
        <button
          onClick={nextChunk}
          className="absolute right-0 top-0 bottom-0 w-1/3 z-10"
          style={{ WebkitTapHighlightColor: 'transparent' }}
        />

        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${currentChunk.image})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black/80"></div>
        </div>

        {/* Content */}
        <div className="relative h-full flex flex-col justify-end p-8 pb-16 w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            key={currentChunkIndex}
            className="space-y-4"
          >
            <p className="text-white/70 uppercase tracking-wider text-sm">
              Chunk {currentChunkIndex + 1} of {chunks.length}
            </p>
            <h1 className="text-white">
              {currentChunk.title}
            </h1>
            <p className="text-white/90 text-lg">
              {currentChunk.content}
            </p>
            
            {/* Navigation Hint */}
            <div className="pt-8 flex justify-between text-white/40 text-sm">
              <span>{currentChunkIndex > 0 ? '← Tap left' : ''}</span>
              <span>
                {currentChunkIndex < chunks.length - 1 
                  ? 'Tap right →' 
                  : 'Tap right to finish →'}
              </span>
            </div>
          </motion.div>
        </div>

        {/* Progress Indicators */}
        <div className="absolute top-20 left-0 right-0 flex justify-center gap-2 px-4">
          {chunks.map((_, index) => (
            <div
              key={index}
              className={`h-1 flex-1 rounded-full transition-colors ${
                index === currentChunkIndex ? 'bg-white' : 'bg-white/30'
              }`}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}