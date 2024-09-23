import React from 'react';

import { Step } from '../step';

interface FormProgressProps {
  currentStep: number;
  steps: { title: string; description: string }[];
}

export const FormProgress = ({ currentStep, steps }: FormProgressProps) => {
  return (
    <div className="w-full max-w-[300px] rounded-lg bg-slate-100 p-4">
      {steps.map((step, index) => (
        <Step
          key={index}
          title={step.title}
          description={step.description}
          stepNumber={index + 1}
          isActive={index === currentStep}
          isComplete={index < currentStep}
          showLine={index < steps.length - 1}
        />
      ))}
    </div>
  );
};
