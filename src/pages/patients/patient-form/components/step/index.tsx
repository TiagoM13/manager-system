import React from 'react';

import { Check } from '@phosphor-icons/react';

interface StepProps {
  stepNumber: number;
  title: string;
  description: string;
  isActive: boolean;
  isComplete: boolean;
  showLine: boolean;
}

export const Step: React.FC<StepProps> = ({
  title,
  description,
  stepNumber,
  isActive,
  isComplete,
  showLine,
}) => {
  return (
    <div className="flex gap-5">
      <div className="flex flex-col items-center">
        <div
          className={`w-16 h-16 rounded-full p-2 flex items-center justify-center ${isComplete ? 'bg-emerald-400' : 'bg-sky-600'}`}
        >
          {isComplete ? (
            <Check className="text-white size-8" />
          ) : (
            <span className="text-3xl text-white">{stepNumber}</span>
          )}
        </div>
        {showLine && <div className="w-1 h-16 bg-slate-400 my-2" />}
      </div>
      <div>
        <span className="text-xs text-slate-400 font-semibold">
          Step {stepNumber}
        </span>
        <h3 className="text-sm font-medium">{title}</h3>
        {isComplete ? (
          <span className="text-xs text-emerald-400">Completo</span>
        ) : isActive ? (
          <span className="text-xs text-sky-600">Em progresso</span>
        ) : (
          <span className="text-xs text-slate-400">{description}</span>
        )}
      </div>
    </div>
  );
};
