import React from 'react';

const Loader: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-4 p-8 text-center w-full h-full animate-fade-in">
      <div className="w-16 h-16 rounded-full animate-spin border-4 border-dashed border-cyan-400 border-t-transparent"></div>
      <p className="text-slate-300 font-medium text-lg mt-4">Analyzing your profile...</p>
      <p className="text-slate-400">Our AI is finding the best fits for you. This might take a moment.</p>
    </div>
  );
};

export default Loader;