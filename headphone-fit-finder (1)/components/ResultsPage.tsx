import React from 'react';
import type { AnalysisResponse } from '../types';
import RecommendationCard from './RecommendationCard';

interface ResultsPageProps {
  results: AnalysisResponse | null;
  error: string | null;
  onReset: () => void;
}

const ResultsPage: React.FC<ResultsPageProps> = ({ results, error, onReset }) => {
  const recommendations = results?.recommendations || [];

  return (
    <div className="w-full animate-fade-in">
        <div className="text-center mb-8">
            <button
              onClick={onReset}
              className="bg-slate-700 text-slate-300 font-bold py-2 px-6 rounded-lg hover:bg-slate-600 focus:outline-none focus:ring-4 focus:ring-slate-500/50 transition-all duration-300"
            >
              Start Over
            </button>
        </div>

      {error && (
        <div className="bg-red-900/50 border border-red-700 text-red-200 p-6 rounded-lg text-center">
          <h3 className="font-bold text-xl mb-2">Oops! Something went wrong.</h3>
          <p>{error}</p>
        </div>
      )}
      
      {!error && results && recommendations.length > 0 && (
        <>
            <h2 className="text-3xl font-bold text-slate-100 text-center mb-6">Here are your top recommendations:</h2>
            <div className="space-y-6">
                {recommendations.map((rec, index) => (
                    <RecommendationCard key={index} recommendation={rec} />
                ))}
            </div>
        </>
      )}

      {!error && recommendations.length === 0 && (
         <div className="bg-slate-800 text-slate-400 p-8 rounded-lg text-center border border-slate-700">
          <h3 className="font-bold text-lg text-slate-200">No Recommendations Found</h3>
          <p>The AI couldn't find a suitable match based on your criteria. Try adjusting your inputs for a different result.</p>
        </div>
      )}
    </div>
  );
};

export default ResultsPage;