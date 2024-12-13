import React from 'react';

import { HttpClient } from '@/infra/http/http-client';
import { getAllAppointmentsService } from '@/services';

import { useAppointmentsListModel } from '../model/appointments-list.model';
import { AppointmentsListView } from '../view/appointments.view';

const AppointmentsList: React.FC = () => {
  const http = new HttpClient();

  const methods = useAppointmentsListModel({
    getAllAppointments: (filters) => getAllAppointmentsService(http, filters),
  });

  return <AppointmentsListView {...methods} />;
};

export default AppointmentsList;
