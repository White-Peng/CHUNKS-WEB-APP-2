import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export function ContentDetailPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-4 border-b">
        <button 
          onClick={() => navigate('/stories')}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h2>Content Detail</h2>
        <div className="w-10"></div>
      </div>

      {/* Placeholder Content */}
      <div className="flex items-center justify-center min-h-[80vh]">
        <div className="text-center px-6">
          <h1 className="mb-4">Content Detail Page</h1>
          <p className="text-gray-600">
            This page will show the full content of the selected story.
          </p>
        </div>
      </div>
    </div>
  );
}
