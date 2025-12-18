import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { WelcomePage } from './components/WelcomePage';
import { StoriesPage } from './components/StoriesPage';
import { ChunksPage } from './components/ChunksPage';
import { ContentDetailPage } from './components/ContentDetailPage';
import { ActionsPage } from './components/ActionsPage';
import { ChatbotPage } from './components/ChatbotPage';
import { FullArticlePage } from './components/FullArticlePage';

export default function App() {
  const [hasStarted, setHasStarted] = useState(false);

  // Check if user has started
  useEffect(() => {
    const started = localStorage.getItem('hasStarted');
    if (started === 'true') {
      setHasStarted(true);
    }
  }, []);

  useEffect(() => {
    if (hasStarted) {
      localStorage.setItem('hasStarted', 'true');
    }
  }, [hasStarted]);

  return (
    <Router>
      <div className="min-h-screen bg-white">
        <Routes>
          <Route path="/" element={
            hasStarted ? (
              <Navigate to="/stories" replace />
            ) : (
              <WelcomePage />
            )
          } />
          <Route path="/stories" element={<StoriesPage />} />
          <Route path="/chunks" element={<ChunksPage />} />
          <Route path="/content-detail" element={<ContentDetailPage />} />
          <Route path="/actions" element={<ActionsPage />} />
          <Route path="/chatbot" element={<ChatbotPage />} />
          <Route path="/full-article" element={<FullArticlePage />} />
        </Routes>
      </div>
    </Router>
  );
}