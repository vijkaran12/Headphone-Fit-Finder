import React from 'react';

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
  stepNames: string[];
}

const ProgressBar: React.FC<ProgressBarProps> = ({ currentStep, totalSteps, stepNames }) => {
  return (
    <div className="flex items-center justify-between mb-8">
      {stepNames.map((name, index) => {
        const step = index + 1;
        const isCompleted = step < currentStep;
        const isActive = step === currentStep;
        
        return (
          <React.Fragment key={step}>
            <div className="flex flex-col items-center text-center w-20">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg transition-all duration-300
                  ${isActive ? 'bg-cyan-500 text-white scale-110 shadow-lg shadow-cyan-500/30' : ''}
                  ${isCompleted ? 'bg-green-500 text-white' : ''}
                  ${!isActive && !isCompleted ? 'bg-slate-700 text-slate-400' : ''}
                `}
              >
                {isCompleted ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                ) : step}
              </div>
              <p className={`mt-2 text-xs font-semibold break-words ${isActive ? 'text-cyan-400' : 'text-slate-400'}`}>{name}</p>
            </div>
            {step < totalSteps && (
              <div className={`flex-1 h-1 mx-2 rounded-full transition-all duration-300 ${isCompleted ? 'bg-green-500' : 'bg-slate-700'}`}></div>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default ProgressBar;