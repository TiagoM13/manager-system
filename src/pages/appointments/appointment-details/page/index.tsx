import React from 'react';

import { House, CheckSquare, IdentificationBadge } from '@phosphor-icons/react';

import { CustomLoadingSkeleton } from '@/components/_ui';
import { HttpClient } from '@/infra/http/http-client';
import {
  getAllDoctorsPaginatedService,
  getAppointmentService,
  getPatientService,
  updateAppointmentService,
  updateAppointmentStatusService,
} from '@/services';

import { useAppointmentDetailsModel } from '../model/appointment-details.model';
import { AppointmentDetailsView } from '../view/appointment-details.view';

const AppointmentDetails: React.FC = () => {
  const http = new HttpClient();

  const methods = useAppointmentDetailsModel({
    getPatient: (id) => getPatientService(http, id),
    getAppointment: (patientId, appointmentId) =>
      getAppointmentService(http, patientId, appointmentId),
    getAllDoctors: () => getAllDoctorsPaginatedService(http),
    updateAppointment: (patientId, appointmentId, values) =>
      updateAppointmentService(http, patientId, appointmentId, values),
    updateAppointmentStatus: (patientId, appointmentId, status) =>
      updateAppointmentStatusService(http, patientId, appointmentId, status),
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
        label: methods.isLoading ? (
          <CustomLoadingSkeleton className="h-5 w-40 rounded-lg" />
        ) : (
          `${methods.patientResponse?.name}`
        ),
        icon: <IdentificationBadge className="size-4" />,
      },
    ],
    [methods.isLoading, methods.patientResponse?.name],
  );

  const title = React.useMemo(() => {
    if (methods.isLoading) return 'Carregando...';

    if (methods.isAppointmentPending) return 'Atualizar consulta';

    return 'Detalhes da consulta';
  }, [methods.isAppointmentPending, methods.isLoading]);

  return (
    <AppointmentDetailsView
      title={title}
      breadcrumbsPathItems={breadcrumbsPathItems}
      {...methods}
    />
  );
};

export default AppointmentDetails;
