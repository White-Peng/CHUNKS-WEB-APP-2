import { useNavigate } from 'react-router-dom';

export function DailyGoalPage() {
  const navigate = useNavigate();

  const handleGoalSelection = (goal: string) => {
    localStorage.setItem('dailyGoal', goal);
    navigate('/stories');
  };

  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-white px-6 pt-24">
      <div className="w-full max-w-md space-y-8">
        {/* Title */}
        <h1 className="text-center leading-tight">
          How much do you want to Crunch today
        </h1>

        {/* Options */}
        <div className="space-y-4 pt-12">
          <button
            onClick={() => handleGoalSelection('deep-dive')}
            className="w-full py-6 px-8 border-2 border-black rounded-3xl hover:bg-gray-50 transition-colors text-center"
          >
            I am ready to deep dive
          </button>

          <button
            onClick={() => handleGoalSelection('chill')}
            className="w-full py-6 px-8 border-2 border-black rounded-3xl hover:bg-gray-50 transition-colors text-center"
          >
            I want to chill in bed
          </button>
        </div>
      </div>
    </div>
  );
}
