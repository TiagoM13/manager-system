import React from 'react';

import { usePatientSearchFormModel } from './patient-search-form.model';
import { PatientSearchFormView } from './patient-search-form.view';

interface PatientSearchFormProps {
  loading?: boolean;
}

export const PatientSearchForm: React.FC<PatientSearchFormProps> = ({
  loading,
}) => {
  const methods = usePatientSearchFormModel();

  return <PatientSearchFormView {...methods} loading={loading} />;
};
