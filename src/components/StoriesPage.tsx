import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, useMotionValue, useTransform, PanInfo } from 'motion/react';
import { ArrowLeft } from 'lucide-react';

interface Story {
  id: number;
  title: string;
  description: string;
  image: string;
}

const STORIES: Story[] = [
  {
    id: 1,
    title: 'The Future of AI',
    description: 'Explore the cutting-edge developments in artificial intelligence and how they are shaping our world. From machine learning to neural networks, discover what\'s next.',
    image: 'https://images.unsplash.com/photo-1568952433726-3896e3881c65?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNobm9sb2d5JTIwaW5ub3ZhdGlvbnxlbnwxfHx8fDE3NjM1NTQ4MzR8MA&ixlib=rb-4.1.0&q=80&w=1080'
  },
  {
    id: 2,
    title: 'Hidden Gems of Southeast Asia',
    description: 'Dive into the world of travel and adventure. Discover breathtaking destinations, local cultures, and unforgettable experiences across Southeast Asia.',
    image: 'https://images.unsplash.com/photo-1528543606781-2f6e6857f318?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmF2ZWwlMjBhZHZlbnR1cmV8ZW58MXx8fHwxNzYzNDc3NTQ4fDA&ixlib=rb-4.1.0&q=80&w=1080'
  },
  {
    id: 3,
    title: 'The Art of Modern Cuisine',
    description: 'Explore culinary innovations and food trends that are revolutionizing how we eat. From farm to table, discover the stories behind your favorite dishes.',
    image: 'https://images.unsplash.com/photo-1763256340688-cbd3614c9a56?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb29kJTIwY3Vpc2luZXxlbnwxfHx8fDE3NjM0NTE4NjZ8MA&ixlib=rb-4.1.0&q=80&w=1080'
  },
  {
    id: 4,
    title: 'Music That Moves Us',
    description: 'Dive into the world of music and performance. Learn about emerging artists, iconic concerts, and the sounds that define our generation.',
    image: 'https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNpYyUyMGNvbmNlcnR8ZW58MXx8fHwxNzYzNDg0NDY5fDA&ixlib=rb-4.1.0&q=80&w=1080'
  },
  {
    id: 5,
    title: 'Abstract Expressions',
    description: 'Discover the vibrant world of contemporary art. From abstract paintings to digital installations, explore the creative minds shaping visual culture.',
    image: 'https://images.unsplash.com/photo-1705254613735-1abb457f8a60?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMGFydCUyMGNvbG9yZnVsfGVufDF8fHx8MTc2MzQ3MjE5Nnww&ixlib=rb-4.1.0&q=80&w=1080'
  }
];

export function StoriesPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [stories] = useState(STORIES);
  
  const y = useMotionValue(0);
  const opacity = useTransform(y, [-300, 0, 300], [0.5, 1, 0.5]);

  // Set initial index based on consumed stories - recalculate when returning to this page
  useEffect(() => {
    const consumedStories = JSON.parse(localStorage.getItem('consumedStories') || '[]');
    // Find the first unconsumed story
    const firstUnconsumedIndex = stories.findIndex(story => !consumedStories.includes(story.id));
    if (firstUnconsumedIndex !== -1) {
      setCurrentIndex(firstUnconsumedIndex);
    } else {
      // All stories consumed, reset and start from beginning
      localStorage.setItem('consumedStories', JSON.stringify([]));
      setCurrentIndex(0);
    }
  }, [location]); // Re-run when location changes (when navigating to this page)

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const swipeThreshold = 100;
    
    // Vertical swipe
    if (Math.abs(info.offset.y) > Math.abs(info.offset.x)) {
      if (info.offset.y < -swipeThreshold) {
        // Swipe up (bottom to top) - Interested/Dive into topic
        navigateToChunks();
      }
    }
    // Horizontal swipe
    else if (Math.abs(info.offset.x) > swipeThreshold) {
      if (info.offset.x > 0 && currentIndex > 0) {
        // Swipe right - Previous story
        setCurrentIndex(currentIndex - 1);
      } else if (info.offset.x < 0 && currentIndex < stories.length - 1) {
        // Swipe left - Next story
        setCurrentIndex(currentIndex + 1);
      }
    }
  };

  const navigateToChunks = () => {
    // Store current story data for chunks pages
    localStorage.setItem('currentStory', JSON.stringify(currentStory));
    navigate('/chunks');
  };

  const currentStory = stories[currentIndex];

  if (!currentStory) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black overflow-hidden">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-4 py-4 bg-black/50">
        <button 
          onClick={() => navigate('/')}
          className="p-2 hover:bg-white/10 rounded-full transition-colors"
        >
          <ArrowLeft className="w-6 h-6 text-white" />
        </button>
        <h2 className="text-white">Stories</h2>
        <div className="w-10"></div>
      </div>

      {/* Story Card */}
      <motion.div
        className="absolute inset-0"
        drag
        dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
        dragElastic={0.7}
        onDragEnd={handleDragEnd}
        style={{ y, opacity }}
      >
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${currentStory.image})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/30 to-black/70"></div>
        </div>

        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-8 pb-16">
          <h1 className="text-white mb-4 drop-shadow-lg">
            {currentStory.title}
          </h1>
          <p className="text-white/90 drop-shadow-lg">
            {currentStory.description}
          </p>
        </div>

        {/* Progress Indicators */}
        <div className="absolute top-20 left-0 right-0 flex justify-center gap-2 px-4">
          {stories.map((_, index) => (
            <div
              key={index}
              className={`h-1 flex-1 rounded-full ${
                index === currentIndex ? 'bg-white' : 'bg-white/30'
              }`}
            />
          ))}
        </div>
      </motion.div>

      {/* Swipe Hints */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center text-white/50 text-sm pointer-events-none z-10">
        <div className="text-center">↑ Swipe up to dive in</div>
      </div>
    </div>
  );
}