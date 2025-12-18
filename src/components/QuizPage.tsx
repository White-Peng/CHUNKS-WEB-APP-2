import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, Check, X } from 'lucide-react';

interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export function QuizPage() {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [storyTitle, setStoryTitle] = useState('');
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);

  useEffect(() => {
    const storedStory = localStorage.getItem('currentStory');
    if (storedStory) {
      const parsedStory = JSON.parse(storedStory);
      setStoryTitle(parsedStory.title);
      
      // Generate quiz questions based on the story
      setQuestions([
        {
          id: 1,
          question: `What is a key fundamental concept behind ${parsedStory.title}?`,
          options: [
            'Understanding surface-level details only',
            'Exploring basics and setting foundation for deeper understanding',
            'Ignoring historical context',
            'Focusing only on future predictions'
          ],
          correctAnswer: 1,
          explanation: 'The first chunk emphasized understanding fundamental concepts as a foundation.'
        },
        {
          id: 2,
          question: `Why is historical context important for ${parsedStory.title}?`,
          options: [
            'It is not important at all',
            'It only matters for academic purposes',
            'Understanding the past helps illuminate the present',
            'History has no connection to current topics'
          ],
          correctAnswer: 2,
          explanation: 'Historical context provides valuable perspective on how the topic evolved.'
        },
        {
          id: 3,
          question: `What do expert perspectives provide regarding ${parsedStory.title}?`,
          options: [
            'Only theoretical knowledge',
            'Valuable insights from those at the forefront',
            'Outdated information',
            'Unverified opinions'
          ],
          correctAnswer: 1,
          explanation: 'Expert perspectives offer insights from industry leaders and pioneers in the field.'
        },
        {
          id: 4,
          question: 'How does real-world application enhance understanding?',
          options: [
            'It makes topics more confusing',
            'It is irrelevant to learning',
            'It brings theory to reality through practical examples',
            'It only applies to specific industries'
          ],
          correctAnswer: 2,
          explanation: 'Real-world applications demonstrate how concepts manifest in everyday life.'
        },
        {
          id: 5,
          question: `What is valuable about exploring future trends in ${parsedStory.title}?`,
          options: [
            'Nothing, only the past matters',
            'Understanding predictions and emerging patterns that shape tomorrow',
            'Future trends are always wrong',
            'It creates unnecessary speculation'
          ],
          correctAnswer: 1,
          explanation: 'Future trends help us anticipate and prepare for upcoming developments.'
        }
      ]);
    }
  }, []);

  const handleAnswerSelect = (answerIndex: number) => {
    if (answered) return;
    
    setSelectedAnswer(answerIndex);
    setAnswered(true);

    if (answerIndex === questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setAnswered(false);
    } else {
      setShowResult(true);
    }
  };

  const handleRetry = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setAnswered(false);
  };

  if (questions.length === 0) return null;

  if (showResult) {
    const percentage = Math.round((score / questions.length) * 100);
    return (
      <div className="min-h-screen bg-white flex flex-col">
        {/* Header */}
        <div className="sticky top-0 z-20 flex items-center justify-between px-4 py-4 bg-white border-b">
          <button 
            onClick={() => navigate('/actions')}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h2>Quiz Results</h2>
          <div className="w-10"></div>
        </div>

        {/* Results */}
        <div className="flex-1 flex items-center justify-center p-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center max-w-md"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className={`w-32 h-32 mx-auto mb-6 rounded-full flex items-center justify-center text-6xl ${
                percentage >= 80 ? 'bg-green-100' : percentage >= 60 ? 'bg-yellow-100' : 'bg-red-100'
              }`}
            >
              {percentage >= 80 ? '🎉' : percentage >= 60 ? '👍' : '💪'}
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mb-4"
            >
              {percentage >= 80 ? 'Excellent!' : percentage >= 60 ? 'Good Job!' : 'Keep Learning!'}
            </motion.h1>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mb-6"
            >
              <p className="text-5xl mb-2">{percentage}%</p>
              <p className="text-gray-600">
                You got {score} out of {questions.length} questions correct
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="space-y-3"
            >
              <button
                onClick={handleRetry}
                className="w-full py-4 bg-purple-500 text-white rounded-full hover:bg-purple-600 transition-colors"
              >
                Try Again
              </button>
              <button
                onClick={() => navigate('/actions')}
                className="w-full py-4 border-2 border-gray-200 rounded-full hover:border-gray-300 transition-colors"
              >
                Back to Actions
              </button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    );
  }

  const currentQ = questions[currentQuestion];
  const isCorrect = selectedAnswer === currentQ.correctAnswer;

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <div className="sticky top-0 z-20 flex items-center justify-between px-4 py-4 bg-white border-b">
        <button 
          onClick={() => navigate('/actions')}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <div className="flex-1 text-center">
          <h2>Quiz</h2>
          <p className="text-sm text-gray-500">Question {currentQuestion + 1} of {questions.length}</p>
        </div>
        <div className="w-10"></div>
      </div>

      {/* Progress Bar */}
      <div className="px-4 py-4">
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
            className="h-full bg-purple-500"
          />
        </div>
      </div>

      {/* Question */}
      <div className="flex-1 px-6 py-8">
        <motion.div
          key={currentQuestion}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <h1 className="mb-8">
            {currentQ.question}
          </h1>

          <div className="space-y-3">
            {currentQ.options.map((option, index) => {
              const isSelected = selectedAnswer === index;
              const isCorrectAnswer = index === currentQ.correctAnswer;
              const showCorrect = answered && isCorrectAnswer;
              const showIncorrect = answered && isSelected && !isCorrect;

              return (
                <motion.button
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => handleAnswerSelect(index)}
                  disabled={answered}
                  className={`w-full p-4 rounded-2xl border-2 text-left transition-all ${
                    showCorrect
                      ? 'border-green-500 bg-green-50'
                      : showIncorrect
                      ? 'border-red-500 bg-red-50'
                      : isSelected
                      ? 'border-purple-500 bg-purple-50'
                      : 'border-gray-200 hover:border-gray-300'
                  } ${answered ? 'cursor-default' : 'cursor-pointer active:scale-95'}`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                      showCorrect
                        ? 'border-green-500 bg-green-500'
                        : showIncorrect
                        ? 'border-red-500 bg-red-500'
                        : isSelected
                        ? 'border-purple-500'
                        : 'border-gray-300'
                    }`}>
                      {showCorrect && <Check className="w-4 h-4 text-white" />}
                      {showIncorrect && <X className="w-4 h-4 text-white" />}
                    </div>
                    <span className="flex-1">{option}</span>
                  </div>
                </motion.button>
              );
            })}
          </div>

          {/* Explanation */}
          {answered && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`mt-6 p-4 rounded-2xl ${
                isCorrect ? 'bg-green-50 border-2 border-green-200' : 'bg-red-50 border-2 border-red-200'
              }`}
            >
              <p className={`mb-2 ${isCorrect ? 'text-green-900' : 'text-red-900'}`}>
                {isCorrect ? '✓ Correct!' : '✗ Incorrect'}
              </p>
              <p className="text-gray-700 text-sm">{currentQ.explanation}</p>
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* Next Button */}
      {answered && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="px-6 pb-8"
        >
          <button
            onClick={handleNext}
            className="w-full py-4 bg-purple-500 text-white rounded-full hover:bg-purple-600 transition-colors"
          >
            {currentQuestion < questions.length - 1 ? 'Next Question' : 'See Results'}
          </button>
        </motion.div>
      )}
    </div>
  );
}
