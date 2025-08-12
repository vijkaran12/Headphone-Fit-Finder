import React from 'react';

interface WelcomeProps {
    onStart: () => void;
}

const Welcome: React.FC<WelcomeProps> = ({ onStart }) => {
  return (
    <div className="text-center bg-slate-800/50 p-8 rounded-xl border border-slate-700 flex flex-col items-center animate-fade-in">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-cyan-400 mb-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 8a6 6 0 0 0-12 0v8a6 6 0 0 0 12 0v-2" />
            <path d="M18 8a6 6 0 0 0-12 0" />
            <path d="M12 18a2 2 0 0 0-2-2h-2a2 2 0 0 0 0 4h2a2 2 0 0 0 2-2Z" />
        </svg>
      <h2 className="text-4xl font-bold text-slate-100 tracking-tight mb-3">Find Your Perfect Fit</h2>
      <p className="text-lg text-slate-400 max-w-2xl mx-auto mb-8">
        Answer a few simple questions about your ears, listening habits, and preferences, and our AI will recommend the ideal headphones or earphones for you.
      </p>
      <button
        onClick={onStart}
        className="bg-cyan-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-cyan-700 focus:outline-none focus:ring-4 focus:ring-cyan-500/50 transition-all duration-300 transform hover:scale-105"
      >
        Get Started
      </button>
    </div>
  );
};

export default Welcome;