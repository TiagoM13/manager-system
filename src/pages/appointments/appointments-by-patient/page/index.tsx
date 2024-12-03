import React from 'react';

import {
  CheckSquare,
  House,
  IdentificationBadge,
  List,
} from '@phosphor-icons/react';

import { CustomLoadingSkeleton } from '@/components';
import { HttpClient } from '@/infra/http/http-client';
import { getAppointmentsByPatientService, getPatientService } from '@/services';

import { useAppointmentsByPatientModel } from '../model/appointments-by-patient.model';
import { AppointmentsByPatientView } from '../view/appointments-by-patient.view';

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
          methods?.patient?.name
        ),
        path: `/patients/${methods?.patient?.id}`,
        icon: <IdentificationBadge className="size-4" />,
      },
      {
        label: 'Lista',
        icon: <List className="size-4" />,
      },
    ],
    [methods.isLoadingGetPatient, methods?.patient?.id, methods?.patient?.name],
  );

  return (
    <AppointmentsByPatientView
      breadcrumbsPathItems={breadcrumbsPathItems}
      {...methods}
    />
  );
};

export default AppComponentByPatient;
