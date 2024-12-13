import React from 'react';
import { useForm } from 'react-hook-form';

import { formatPatientProps } from '@/helpers/format-patient-props';
import { useAppNavigation, useCreatePatient, useFormSteps } from '@/hooks';
import { IMSResponse, IPatient, IPatientForm } from '@/interfaces';
import { zodResolver } from '@hookform/resolvers/zod';

import { steps } from '../../utils/constants';
import { SchemaPatientType, schemaPatient } from '../patient-form.schema';

interface PatientFormModelProps {
  createPatient: (
    data: IPatient,
  ) => Promise<IMSResponse<IPatient, 'patient'> | undefined>;
}

export const usePatientFormModel = ({
  createPatient,
}: PatientFormModelProps) => {
  const { currentStep, isLastStep, nextStep, prevStep } = useFormSteps(steps);
  const { goBack } = useAppNavigation();

  const { createPatientMutation, isPending } = useCreatePatient({
    createPatient,
  });

  const methods = useForm<SchemaPatientType>({
    mode: 'onChange',
    shouldUnregister: false,
    resolver: zodResolver(schemaPatient),
  });

  const { handleSubmit } = methods;

  const handleCreateNewPatient = React.useCallback(
    async (values: IPatientForm) => {
      if (values) await createPatientMutation(formatPatientProps(values));
    },
    [createPatientMutation],
  );

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
