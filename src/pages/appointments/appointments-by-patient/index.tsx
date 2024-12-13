import React from 'react';

import {
  CheckSquare,
  House,
  IdentificationBadge,
  List,
} from '@phosphor-icons/react';

import { CustomLoadingSkeleton } from '@/components/_ui';
import { HttpClient } from '@/infra/http/http-client';
import { getAppointmentsByPatientService, getPatientService } from '@/services';

import { useAppointmentsByPatientModel } from './appointments-by-patient.model';
import { AppointmentsByPatientView } from './appointments-by-patient.view';

const AppComponentByPatient: React.FC = () => {
  const http = new HttpClient();
  const methods = useAppointmentsByPatientModel({
    getAppointmentsByPatient: (patientId, filters) =>
      getAppointmentsByPatientService(http, patientId, filters),
    getPatient: (patientId) => getPatientService(http, patientId),
  });

  const breadcrumbsPathItems = React.useMemo(
    () => [
      {
        label: 'Início',
        path: '/',
        icon: <House className="size-4" />,
      },
      {
        label: 'Consultas',
        path: '/appointments',
        icon: <CheckSquare className="size-4" />,
      },
      {
        label: methods.isLoadingGetPatient ? (
          <CustomLoadingSkeleton className="h-5 w-40 rounded-lg" />
        ) : (
          methods?.patientResponse?.name
        ),
        path: `/patients/${methods?.patientResponse?.id}`,
        icon: <IdentificationBadge className="size-4" />,
      },
      {
        label: 'Lista',
        icon: <List className="size-4" />,
      },
    ],
    [
      methods.isLoadingGetPatient,
      methods?.patientResponse?.id,
      methods?.patientResponse?.name,
    ],
  );

  return (
    <AppointmentsByPatientView
      breadcrumbsPathItems={breadcrumbsPathItems}
      {...methods}
    />
  );
};

export default AppComponentByPatient;
