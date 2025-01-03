import React from 'react';

import { useAppointmentsByPatientFiltersModel } from './appointments-by-patient-filters.model';
import { AppointmentsByPatientFiltersView } from './appointments-by-patient-filters.view';

type AppointmentsByPatientFiltersProps = {
  loading?: boolean;
};

export const AppointmentsByPatientFilters: React.FC<
  AppointmentsByPatientFiltersProps
> = ({ loading }) => {
  const methods = useAppointmentsByPatientFiltersModel();

  return <AppointmentsByPatientFiltersView {...methods} loading={loading} />;
};
