import React from 'react';

import { House, User, UsersFour } from '@phosphor-icons/react';

import { CustomLoadingSkeleton } from '@/components/_ui';
import { HttpClient } from '@/infra/http/http-client';
import { getPatientService } from '@/services';

import { usePatientDetailsModel } from '../model/patient-details.model';
import { PatientDetailsView } from '../view/patient-details.view';

const PatientDetails: React.FC = () => {
  const http = new HttpClient();

  const methods = usePatientDetailsModel({
    getPatient: (id) => getPatientService(http, id),
  });

  const { patient, loading } = methods;

  const breadcrumbsPathItems = React.useMemo(
    () => [
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
        label: loading ? (
          <CustomLoadingSkeleton className="h-5 w-40 rounded-lg" />
        ) : (
          patient?.name
        ),
        icon: <User className="size-4" />,
      },
    ],
    [loading, patient?.name],
  );

  return (
    <PatientDetailsView
      breadcrumbsPathItems={breadcrumbsPathItems}
      {...methods}
    />
  );
};

export default PatientDetails;
