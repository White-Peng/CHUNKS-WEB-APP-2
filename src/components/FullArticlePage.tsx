import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, ExternalLink, Copy, Check } from 'lucide-react';

interface Article {
  title: string;
  url: string;
  source: string;
  date: string;
}

export function FullArticlePage() {
  const navigate = useNavigate();
  const [storyTitle, setStoryTitle] = useState('');
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    const storedStory = localStorage.getItem('currentStory');
    if (storedStory) {
      const parsedStory = JSON.parse(storedStory);
      setStoryTitle(parsedStory.title);
      
      // Generate mock articles based on the story
      setArticles([
        {
          title: `The Complete Guide to ${parsedStory.title}`,
          url: `https://example.com/articles/${parsedStory.title.toLowerCase().replace(/\s+/g, '-')}`,
          source: 'Tech Insights',
          date: 'November 28, 2024'
        },
        {
          title: `Understanding ${parsedStory.title}: Expert Analysis`,
          url: `https://medium.com/@expert/${parsedStory.title.toLowerCase().replace(/\s+/g, '-')}`,
          source: 'Medium',
          date: 'November 25, 2024'
        },
        {
          title: `${parsedStory.title} in Practice: Real-World Applications`,
          url: `https://research.org/papers/${parsedStory.title.toLowerCase().replace(/\s+/g, '-')}`,
          source: 'Research Institute',
          date: 'November 20, 2024'
        }
      ]);
    }
  }, []);

  const handleCopyUrl = (url: string, index: number) => {
    navigator.clipboard.writeText(url);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const handleOpenUrl = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
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
        <h2>Full Articles</h2>
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
            Source Material
          </p>
          <h1 className="mb-3">
            Original Articles
          </h1>
          <p className="text-gray-600">
            Explore the original sources that informed the content about {storyTitle}.
          </p>
        </motion.div>

        {/* Articles List */}
        <div className="space-y-4">
          {articles.map((article, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white border-2 border-gray-200 rounded-2xl p-5 hover:border-gray-300 transition-colors"
            >
              <div className="flex items-start gap-3 mb-4">
                <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                  <ExternalLink className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="mb-2 break-words">
                    {article.title}
                  </h3>
                  <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                    <span>{article.source}</span>
                    <span>•</span>
                    <span>{article.date}</span>
                  </div>
                </div>
              </div>

              {/* URL Display */}
              <div className="bg-gray-50 rounded-lg p-3 mb-3 flex items-center gap-2">
                <p className="text-sm text-gray-600 flex-1 truncate">
                  {article.url}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <button
                  onClick={() => handleOpenUrl(article.url)}
                  className="flex-1 py-3 bg-purple-500 text-white rounded-xl hover:bg-purple-600 transition-colors flex items-center justify-center gap-2"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Open Article</span>
                </button>
                <button
                  onClick={() => handleCopyUrl(article.url, index)}
                  className="px-4 py-3 border-2 border-gray-200 rounded-xl hover:border-gray-300 transition-colors"
                >
                  {copiedIndex === index ? (
                    <Check className="w-5 h-5 text-green-500" />
                  ) : (
                    <Copy className="w-5 h-5 text-gray-600" />
                  )}
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Info Box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-8 p-5 bg-blue-50 border-2 border-blue-200 rounded-2xl"
        >
          <p className="text-sm text-blue-900">
            <span className="inline-block mr-2">💡</span>
            These are the original articles and sources used to create your personalized chunks. 
            Reading the full articles will give you even more depth and context.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
