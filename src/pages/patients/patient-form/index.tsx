import React from 'react';

import { House, UserPlus, UsersFour } from '@phosphor-icons/react';

import { HttpClient } from '@/infra/http/http-client';
import { createPatientService } from '@/services';

import { usePatientFormModel } from './patient-form.model';
import { PatientFormView } from './patient-form.view';

const PatientForm: React.FC = () => {
  const http = new HttpClient();
  const methods = usePatientFormModel({
    createPatient: (data) => createPatientService(http, data),
  });

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

  return (
    <PatientFormView breadcrumbsPathItems={breadcrumbsPathItems} {...methods} />
  );
};

export default PatientForm;
