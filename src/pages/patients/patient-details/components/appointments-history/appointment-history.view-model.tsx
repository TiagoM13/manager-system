import React from 'react';

import { IAppointment } from '@/interfaces';

import { useAppointmentsHistoryModel } from './appointments-history.model';
import { AppointmentsHistoryView } from './appointments-history.view';

interface AppointmentsHistoryProps {
  appointments?: IAppointment[];
  loading?: boolean;
}

export const AppointmentsHistory: React.FC<AppointmentsHistoryProps> = ({
  appointments,
  loading,
}) => {
  const methods = useAppointmentsHistoryModel({
    appointments,
  });

  return (
    <AppointmentsHistoryView
      appointments={appointments}
      loading={loading}
      {...methods}
    />
  );
};
