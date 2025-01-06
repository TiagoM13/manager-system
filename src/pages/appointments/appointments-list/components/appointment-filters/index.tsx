import React from 'react';

import { useAppointmentFiltersModel } from './appointment-filters.model';
import { AppointmentFiltersView } from './appointment-filters.view';

type AppointmentFiltersProps = {
  loading?: boolean;
};

export const AppointmentFilters: React.FC<AppointmentFiltersProps> = ({
  loading,
}) => {
  const methods = useAppointmentFiltersModel();

  return <AppointmentFiltersView {...methods} loading={loading} />;
};
