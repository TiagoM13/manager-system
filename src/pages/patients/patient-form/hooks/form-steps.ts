import React from 'react';

interface Step {
  title: string;
  description: string;
}

export const useFormSteps = (steps: Step[]) => {
  const [currentStep, setCurrentStep] = React.useState(0);

  const nextStep = React.useCallback(
    (isValid: boolean) => {
      if (isValid) {
        setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
      }
    },
    [steps.length],
  );

  const prevStep = React.useCallback(() => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  }, []);

  const isLastStep = currentStep === 2;

  return { currentStep, nextStep, prevStep, isLastStep };
};
