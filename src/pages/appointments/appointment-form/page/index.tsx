import React from 'react';

import { House, CheckSquare, IdentificationBadge } from '@phosphor-icons/react';

import { CustomLoadingSkeleton } from '@/components';
import { HttpClient } from '@/infra/http/http-client';
import {
  createAppointmentService,
  getAllPatientsService,
  getPatientService,
} from '@/services';

import { useAppointmentFormModel } from '../model/appointment-form.model';
import { getAllDoctorsPaginatedService } from '../services/doctor';
import { AppointmentFormView } from '../view/appointment-form.view';

const AppointmentForm: React.FC = () => {
  const http = new HttpClient();

  const methodsModel = useAppointmentFormModel({
    getAllPatients: (values) => getAllPatientsService(http, values),
    getPatient: (id) => getPatientService(http, id),
    getAllDoctors: () => getAllDoctorsPaginatedService(http),
    createAppointment: (id, values) =>
      createAppointmentService(http, String(id), values),
  });

  const { isCreatingNewAppointment, isLoading, patientResponse } = methodsModel;

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
        label: isCreatingNewAppointment ? (
          'Cadastrar'
        ) : isLoading ? (
          <CustomLoadingSkeleton className="h-5 w-40 rounded-lg" />
        ) : (
          `${patientResponse?.name}`
        ),
        icon: <IdentificationBadge className="size-4" />,
      },
    ],
    [isCreatingNewAppointment, isLoading, patientResponse],
  );

  return (
    <AppointmentFormView
      breadcrumbsPathItems={breadcrumbsPathItems}
      {...methodsModel}
    />
  );
};

export default AppointmentForm;
