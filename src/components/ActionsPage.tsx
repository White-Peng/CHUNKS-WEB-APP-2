import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { MessageCircle, ExternalLink } from 'lucide-react';

export function ActionsPage() {
  const navigate = useNavigate();

  const actions = [
    {
      id: 'chatbot',
      icon: MessageCircle,
      title: 'Chatbot',
      description: 'Ask questions and reflect more on this topic',
      color: 'bg-purple-500',
      route: '/chatbot'
    },
    {
      id: 'article',
      icon: ExternalLink,
      title: 'Full Article',
      description: 'Read the original sources',
      color: 'bg-green-500',
      route: '/full-article'
    }
  ];

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header Section */}
      <div className="px-6 pt-12 pb-8 text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", duration: 0.6 }}
          className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center"
        >
          <span className="text-4xl">✨</span>
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-3"
        >
          Great Job!
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-gray-600"
        >
          You've completed all chunks. What would you like to do next?
        </motion.p>
      </div>

      {/* Action Buttons */}
      <div className="flex-1 px-6 pb-6 space-y-4">
        {actions.map((action, index) => {
          const Icon = action.icon;
          return (
            <motion.button
              key={action.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + index * 0.1 }}
              onClick={() => navigate(action.route)}
              className="w-full bg-white border-2 border-gray-200 rounded-2xl p-6 flex items-start gap-4 hover:border-gray-300 transition-all active:scale-95"
            >
              <div className={`${action.color} rounded-xl p-3 flex-shrink-0`}>
                <Icon className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1 text-left">
                <h3 className="mb-1">{action.title}</h3>
                <p className="text-gray-600 text-sm">{action.description}</p>
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Skip Button */}
      <div className="px-6 pb-8">
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          onClick={() => navigate('/stories')}
          className="w-full py-4 text-gray-500 hover:text-gray-700 transition-colors"
        >
          Skip for now
        </motion.button>
      </div>
    </div>
  );
}