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
          className={`flex h-16 w-16 items-center justify-center rounded-full p-2 ${isComplete ? 'bg-emerald-400' : 'bg-sky-600'}`}
        >
          {isComplete ? (
            <Check className="size-8 text-white" />
          ) : (
            <span className="text-3xl text-white">{stepNumber}</span>
          )}
        </div>
        {showLine && <div className="my-2 h-16 w-1 bg-slate-400" />}
      </div>
      <div>
        <span className="text-xs font-semibold text-slate-400">
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
