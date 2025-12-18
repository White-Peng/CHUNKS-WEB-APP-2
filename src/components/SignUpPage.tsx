import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface SignUpPageProps {
  onSignUp: (email: string, password: string, name: string) => void;
}

export function SignUpPage({ onSignUp }: SignUpPageProps) {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password && fullName) {
      onSignUp(email, password, fullName);
      navigate('/onboarding');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white px-6">
      <div className="w-full max-w-md mx-auto">
        <div className="flex flex-col">
          {/* Logo/Title */}
          <h1 className="text-center mb-8">Chunks</h1>

          {/* Form Card */}
          <div className="bg-white border border-gray-200 rounded-3xl p-8 shadow-sm">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block mb-2">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="Enter email..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200"
                  required
                />
              </div>

              {/* Password Field */}
              <div>
                <label htmlFor="password" className="block mb-2">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  placeholder="Enter password..."
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200"
                  required
                />
              </div>

              {/* Full Name Field */}
              <div>
                <label htmlFor="fullName" className="block mb-2">
                  Full Name
                </label>
                <input
                  id="fullName"
                  type="text"
                  placeholder="Enter full name..."
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200"
                  required
                />
              </div>

              {/* Sign Up Button */}
              <button
                type="submit"
                className="w-full py-4 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
              >
                SIGN UP
              </button>

              {/* Already Have Account Link */}
              <button
                type="button"
                onClick={() => navigate('/login')}
                className="w-full hover:opacity-70 transition-opacity"
              >
                ALREADY HAVE AN ACCOUNT?
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
