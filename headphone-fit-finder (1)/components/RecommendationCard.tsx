
import React from 'react';
import type { Recommendation } from '../types';

interface RecommendationCardProps {
  recommendation: Recommendation;
}

const CheckIcon: React.FC = () => (
  <svg className="h-5 w-5 text-green-400 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
);

const CrossIcon: React.FC = () => (
  <svg className="h-5 w-5 text-red-400 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const FitScore: React.FC<{ score: number }> = ({ score }) => {
  const circumference = 2 * Math.PI * 20; // 2 * pi * r
  const offset = circumference - (score / 10) * circumference;
  let strokeColor = 'stroke-red-500';
  if (score >= 8) strokeColor = 'stroke-green-400';
  else if (score >= 6) strokeColor = 'stroke-yellow-400';

  return (
    <div className="relative h-24 w-24 flex-shrink-0">
      <svg className="w-full h-full" viewBox="0 0 44 44">
        <circle className="stroke-slate-600" strokeWidth="4" fill="transparent" r="20" cx="22" cy="22" />
        <circle
          className={`transform -rotate-90 origin-center transition-all duration-1000 ease-out ${strokeColor}`}
          strokeWidth="4"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          fill="transparent"
          r="20"
          cx="22"
          cy="22"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-2xl font-bold text-white">{score}</span>
        <span className="text-xs text-slate-400">/10</span>
      </div>
    </div>
  );
};


const RecommendationCard: React.FC<RecommendationCardProps> = ({ recommendation }) => {
  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 shadow-lg transform hover:scale-[1.02] hover:border-cyan-500 transition-all duration-300">
      <div className="flex flex-col sm:flex-row gap-6">
        <div className="flex-grow">
          <h3 className="text-2xl font-bold text-cyan-400">{recommendation.productName}</h3>
          <p className="text-sm font-medium text-slate-400 mb-4">{recommendation.type}</p>
          
          <div className="space-y-3 text-slate-300">
            <p><strong className="text-slate-100">Why it fits:</strong> {recommendation.fitReason}</p>
            <p><strong className="text-slate-100">Comfort Profile:</strong> {recommendation.comfort}</p>
            <p><strong className="text-slate-100">Sound Signature:</strong> {recommendation.sound}</p>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center">
            <p className="text-slate-200 font-semibold mb-2">Fit Confidence</p>
            <FitScore score={recommendation.fitConfidenceScore} />
        </div>
      </div>
      
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h4 className="font-semibold text-slate-200 mb-2">Pros</h4>
          <ul className="space-y-2">
            {recommendation.pros.map((pro, index) => (
              <li key={index} className="flex items-start gap-2 text-slate-300">
                <CheckIcon />
                <span>{pro}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-slate-200 mb-2">Cons</h4>
          <ul className="space-y-2">
            {recommendation.cons.map((con, index) => (
              <li key={index} className="flex items-start gap-2 text-slate-300">
                <CrossIcon />
                <span>{con}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {recommendation.productUrl && (
        <div className="mt-6 pt-6 border-t border-slate-700 text-center">
          <a
            href={recommendation.productUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-cyan-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-cyan-700 focus:outline-none focus:ring-4 focus:ring-cyan-500/50 transition-all duration-300"
          >
            View Product
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
          </a>
        </div>
      )}
    </div>
  );
};

export default RecommendationCard;