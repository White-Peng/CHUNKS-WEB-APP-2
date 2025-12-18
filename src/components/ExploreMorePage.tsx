import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, TrendingUp, Clock, Bookmark } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface RelatedTopic {
  id: number;
  title: string;
  description: string;
  category: string;
  readTime: string;
  image: string;
  trending?: boolean;
}

export function ExploreMorePage() {
  const navigate = useNavigate();
  const [storyTitle, setStoryTitle] = useState('');
  const [relatedTopics, setRelatedTopics] = useState<RelatedTopic[]>([]);
  const [bookmarked, setBookmarked] = useState<Set<number>>(new Set());

  useEffect(() => {
    const storedStory = localStorage.getItem('currentStory');
    if (storedStory) {
      const parsedStory = JSON.parse(storedStory);
      setStoryTitle(parsedStory.title);
      
      // Generate related topics
      setRelatedTopics([
        {
          id: 1,
          title: `Advanced Concepts in ${parsedStory.title}`,
          description: 'Dive deeper into complex aspects and expert-level insights',
          category: 'Deep Dive',
          readTime: '12 min',
          image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80',
          trending: true
        },
        {
          id: 2,
          title: `The Future of ${parsedStory.title}`,
          description: 'Emerging trends and predictions shaping tomorrow',
          category: 'Trends',
          readTime: '8 min',
          image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&q=80',
          trending: true
        },
        {
          id: 3,
          title: 'Case Studies and Success Stories',
          description: 'Real-world examples of implementation and impact',
          category: 'Case Study',
          readTime: '10 min',
          image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80'
        },
        {
          id: 4,
          title: 'Common Misconceptions Explained',
          description: 'Debunking myths and clarifying confusion',
          category: 'Education',
          readTime: '6 min',
          image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&q=80'
        },
        {
          id: 5,
          title: 'Expert Interviews and Insights',
          description: 'Perspectives from industry leaders and pioneers',
          category: 'Interview',
          readTime: '15 min',
          image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&q=80'
        },
        {
          id: 6,
          title: 'Beginner\'s Guide to Related Topics',
          description: 'Start your journey with foundational knowledge',
          category: 'Guide',
          readTime: '9 min',
          image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80'
        }
      ]);
    }
  }, []);

  const toggleBookmark = (topicId: number) => {
    setBookmarked(prev => {
      const newSet = new Set(prev);
      if (newSet.has(topicId)) {
        newSet.delete(topicId);
      } else {
        newSet.add(topicId);
      }
      return newSet;
    });
  };

  const handleTopicClick = (topic: RelatedTopic) => {
    // Store the selected topic and navigate to stories
    localStorage.setItem('currentStory', JSON.stringify({
      id: topic.id,
      title: topic.title,
      description: topic.description,
      image: topic.image
    }));
    navigate('/stories');
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="sticky top-0 z-20 flex items-center justify-between px-4 py-4 bg-white border-b">
        <button 
          onClick={() => navigate('/actions')}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h2>Explore More</h2>
        <div className="w-10"></div>
      </div>

      {/* Content */}
      <div className="px-6 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <p className="text-gray-500 uppercase tracking-wider text-sm mb-2">
            Related to {storyTitle}
          </p>
          <h1 className="mb-3">
            Continue Learning
          </h1>
          <p className="text-gray-600">
            Explore more topics and deepen your understanding with related content.
          </p>
        </motion.div>

        {/* Topics Grid */}
        <div className="space-y-4">
          {relatedTopics.map((topic, index) => (
            <motion.div
              key={topic.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="relative bg-white border-2 border-gray-200 rounded-2xl overflow-hidden hover:border-gray-300 transition-colors group"
            >
              {/* Image Section */}
              <div className="relative h-48 overflow-hidden">
                <ImageWithFallback
                  src={topic.image}
                  alt={topic.title}
                  className="w-full h-full object-cover transition-transform group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60"></div>
                
                {/* Trending Badge */}
                {topic.trending && (
                  <div className="absolute top-3 left-3 px-3 py-1 bg-orange-500 text-white rounded-full flex items-center gap-1 text-sm">
                    <TrendingUp className="w-4 h-4" />
                    <span>Trending</span>
                  </div>
                )}

                {/* Bookmark Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleBookmark(topic.id);
                  }}
                  className="absolute top-3 right-3 p-2 bg-white/90 hover:bg-white rounded-full transition-colors"
                >
                  <Bookmark 
                    className={`w-5 h-5 ${
                      bookmarked.has(topic.id) ? 'fill-purple-500 text-purple-500' : 'text-gray-600'
                    }`}
                  />
                </button>

                {/* Category Badge */}
                <div className="absolute bottom-3 left-3 px-3 py-1 bg-white/90 rounded-full text-sm">
                  {topic.category}
                </div>
              </div>

              {/* Content Section */}
              <button
                onClick={() => handleTopicClick(topic)}
                className="w-full text-left p-5"
              >
                <h3 className="mb-2">
                  {topic.title}
                </h3>
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                  {topic.description}
                </p>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Clock className="w-4 h-4" />
                  <span>{topic.readTime} read</span>
                </div>
              </button>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mt-8 p-6 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl text-white text-center"
        >
          <h3 className="mb-2 text-white">
            Want More Personalized Content?
          </h3>
          <p className="text-white/90 text-sm mb-4">
            Adjust your interests to get even more relevant topics
          </p>
          <button
            onClick={() => navigate('/onboarding')}
            className="px-6 py-3 bg-white text-purple-500 rounded-full hover:bg-gray-100 transition-colors"
          >
            Update Interests
          </button>
        </motion.div>
      </div>
    </div>
  );
}
