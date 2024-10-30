import React from 'react';

import { House, UserPlus, UsersFour } from '@phosphor-icons/react';

import { useFormSteps } from '@/hooks';
import { HttpClient } from '@/infra/http/http-client';
import { createPatientService } from '@/services';

import { steps } from '../../utils/constants';
import { usePatientFormModel } from '../model/patient-form.model';
import { PatientFormView } from '../view/patient-form.view';

const PatientForm: React.FC = () => {
  const http = new HttpClient();
  const methodsFormSteps = useFormSteps(steps);
  const methodsModel = usePatientFormModel({
    createPatient: (data) => createPatientService(http, data),
  });

  const { methods } = methodsModel;
  const { nextStep } = methodsFormSteps;

  // constants
  const breadcrumbsPathItems = [
    {
      label: 'Início',
      path: '/',
      icon: <House className="size-4" />,
    },
    {
      label: 'Pacientes',
      path: '/patients',
      icon: <UsersFour className="size-4" />,
    },
    {
      label: 'Novo Paciente',
      icon: <UserPlus className="size-4" />,
    },
  ];

  // callbacks
  const handleNextStep = React.useCallback(async () => {
    const isValid = await methods.trigger();
    nextStep(isValid);
  }, [methods, nextStep]);

  return (
    <PatientFormView
      breadcrumbsPathItems={breadcrumbsPathItems}
      handleNextStep={handleNextStep}
      {...methodsModel}
      {...methodsFormSteps}
    />
  );
};

export default PatientForm;
