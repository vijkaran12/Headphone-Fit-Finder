import React, { useState, useCallback } from 'react';
import type { UserInput, AnalysisResponse } from './types';
import { getHeadphoneRecommendations } from './services/geminiService';
import Header from './components/Header';
import Footer from './components/Footer';
import Welcome from './components/Welcome';
import FormWizard from './components/FormWizard';
import ResultsPage from './components/ResultsPage';
import Loader from './components/Loader';

type View = 'welcome' | 'form' | 'loading' | 'results';

const App: React.FC = () => {
 
  const [view, setView] = useState<View>('welcome');
  const [analysisResult, setAnalysisResult] = useState<AnalysisResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleStart = useCallback(() => {
    setView('form');
    setAnalysisResult(null);
    setError(null);
  }, []);

  const handleSubmit = useCallback(async (data: UserInput) => {
    setView('loading');
    setIsLoading(true);
    setError(null);
    setAnalysisResult(null);

    try {
      const result = await getHeadphoneRecommendations(data);
      if (result?.recommendations) {
        result.recommendations.sort((a, b) => b.fitConfidenceScore - a.fitConfidenceScore);
      }
      setAnalysisResult(result);
    } catch (e: unknown) {
      if (e instanceof Error) {
        setError(e.message);
      } else {
        setError("An unknown error occurred.");
      }
    } finally {
      setIsLoading(false);
      setView('results');
    }
  }, []);

  const handleReset = useCallback(() => {
    setView('welcome');
  }, []);
  
  const renderContent = () => {
    switch(view) {
      case 'welcome':
        return <Welcome onStart={handleStart} />;
      case 'form':
        return <FormWizard onSubmit={handleSubmit} />;
      case 'loading':
        return <Loader />;
      case 'results':
        return <ResultsPage results={analysisResult} error={error} onReset={handleReset} />;
      default:
        return <Welcome onStart={handleStart} />;
    }
  }

  return (
    <div className="min-h-screen bg-slate-900 text-slate-300 font-sans flex flex-col">
      <Header />
      <main className="container mx-auto max-w-4xl p-4 md:p-6 flex-grow flex flex-col justify-center">
        {renderContent()}
      </main>
      <Footer />
    </div>
  );
};

export default App;