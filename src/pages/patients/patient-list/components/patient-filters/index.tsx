import React from 'react';

import { usePatientFiltersModel } from './patient-filters.model';
import { PatientFiltersView } from './patient-filters.view';

type PatientFiltersProps = {
  loading?: boolean;
};

export const PatientFilters: React.FC<PatientFiltersProps> = ({ loading }) => {
  const methods = usePatientFiltersModel();

  return <PatientFiltersView {...methods} loading={loading} />;
};
