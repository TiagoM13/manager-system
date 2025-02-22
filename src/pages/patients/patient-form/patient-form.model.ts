import React from 'react';
import { useForm } from 'react-hook-form';

import { formatPatientProps } from '@/shared/helpers/format-patient-props';
import { useAppNavigation, useFormSteps } from '@/shared/hooks';
import { IMSResponse, IPatient } from '@/shared/interfaces';
import { useCreatePatient } from '@/shared/services/mutations';
import { zodResolver } from '@hookform/resolvers/zod';

import { SchemaPatientType, schemaPatient } from './patient-form.schema';
import { steps } from './utils/steps';

interface PatientFormModelProps {
  createPatient: (
    data: IPatient,
  ) => Promise<IMSResponse<IPatient, 'patient'> | undefined>;
}

export const usePatientFormModel = ({
  createPatient,
}: PatientFormModelProps) => {
  const { currentStep, isLastStep, nextStep, prevStep } = useFormSteps(steps);
  const { goBack, navigateTo } = useAppNavigation();

  const { createPatientMutation, isPending } = useCreatePatient({
    createPatient,
  });

  const methods = useForm<SchemaPatientType>({
    mode: 'onChange',
    shouldUnregister: false,
    resolver: zodResolver(schemaPatient),
  });

  const { handleSubmit } = methods;

  const handleCreateNewPatient = handleSubmit(async (values) => {
    const response = await createPatientMutation(
      formatPatientProps(values as IPatient),
    );

    if (response) navigateTo({ route: `/patients/${response?.patient.id}` });
  });

  const handleNextStep = React.useCallback(async () => {
    const isValid = await methods.trigger();
    nextStep(isValid);
  }, [methods, nextStep]);

  return {
    methods,
    isPending,
    handleSubmit,
    handleCreateNewPatient,
    goBack,
    currentStep,
    isLastStep,
    prevStep,
    handleNextStep,
  };
};
