import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="text-center p-6 bg-slate-900/80 backdrop-blur-sm sticky top-0 z-20">
      <div className="flex items-center justify-center gap-4 mb-2">
        <svg xmlns="https://www.svgrepo.com/show/37804/headphone-symbol.svg" className="h-10 w-10 text-cyan-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 8a6 6 0 0 0-12 0v8a6 6 0 0 0 12 0v-2" />
            <path d="M18 8a6 6 0 0 0-12 0" />
            <path d="M12 18a2 2 0 0 0-2-2h-2a2 2 0 0 0 0 4h2a2 2 0 0 0 2-2Z" />
        </svg>
        <h1 className="text-4xl font-bold text-slate-100 tracking-tight">
          Hearo
        </h1>
      </div>
      <p className="text-lg text-slate-400">
        AI-powered recommendations for your perfect audio fit.
      </p>
    </header>
  );
};

export default Header;
