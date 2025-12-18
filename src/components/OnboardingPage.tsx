import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface OnboardingPageProps {
  onComplete: (interests: string[]) => void;
}

const INTERESTS = [
  'Travelling',
  'Books',
  'DIY',
  'Tech',
  'Food',
  'Arts',
  'News',
  'Music',
  'Sports'
];

export function OnboardingPage({ onComplete }: OnboardingPageProps) {
  const navigate = useNavigate();
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);

  const toggleInterest = (interest: string) => {
    setSelectedInterests(prev =>
      prev.includes(interest)
        ? prev.filter(i => i !== interest)
        : [...prev, interest]
    );
  };

  const handleSubmit = () => {
    if (selectedInterests.length > 0) {
      onComplete(selectedInterests);
      navigate('/home');
    }
  };

  return (
    <div className="flex flex-col h-screen bg-white">
      {/* Header - Fixed */}
      <div className="flex-shrink-0 pt-16 pb-6 px-6">
        <h1 className="text-center mb-2">Chunks Made for You</h1>
        <p className="text-center text-gray-600">Select Your Interests</p>
      </div>

      {/* Scrollable Interests Container with gradient overlay */}
      <div className="flex-1 relative px-6 overflow-hidden">
        <div className="absolute inset-0 overflow-y-auto pb-4">
          <div className="space-y-4">
            {INTERESTS.map((interest) => (
              <button
                key={interest}
                onClick={() => toggleInterest(interest)}
                className={`w-full py-6 px-6 border-2 rounded-3xl transition-all ${
                  selectedInterests.includes(interest)
                    ? 'border-black bg-gray-50'
                    : 'border-gray-300 bg-white hover:border-gray-400'
                }`}
              >
                {interest}
              </button>
            ))}
          </div>
        </div>
        {/* Gradient overlay at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent pointer-events-none"></div>
      </div>

      {/* Submit Button - Fixed at bottom */}
      <div className="flex-shrink-0 px-6 pb-8 pt-4 bg-white">
        <button
          onClick={handleSubmit}
          disabled={selectedInterests.length === 0}
          className={`w-full max-w-sm mx-auto block py-4 rounded-lg transition-all ${
            selectedInterests.length > 0
              ? 'bg-red-500 text-white hover:bg-red-600'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          SUBMIT
        </button>
      </div>
    </div>
  );
}
