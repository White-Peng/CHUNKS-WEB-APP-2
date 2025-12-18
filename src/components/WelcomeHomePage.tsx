import { useNavigate } from 'react-router-dom';

export function WelcomeHomePage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white px-6">
      <div className="flex flex-col items-center space-y-12">
        {/* Title */}
        <h1 className="text-center">Welcome</h1>

        {/* Diamond Shape */}
        <div className="relative w-64 h-64 my-8">
          <div 
            className="absolute inset-0 bg-gradient-to-br from-blue-400 to-blue-600 transform rotate-45"
            style={{
              borderRadius: '20%'
            }}
          ></div>
        </div>

        {/* Start Button */}
        <button
          onClick={() => navigate('/daily-goal')}
          className="px-8 py-4 border-2 border-black rounded-full hover:bg-gray-50 transition-colors uppercase tracking-wide"
        >
          START DIVING INTO YOUR CHUNKS
        </button>
      </div>
    </div>
  );
}
