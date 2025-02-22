import React from 'react';

import { HttpClient } from '@/infra/http/http-client';
import { getAllPatientsService } from '@/shared/api';

import { usePatientListModel } from './patient-list.model';
import { PatientListView } from './patient-list.view';

const Patients: React.FC = () => {
  const http = new HttpClient();

  const methods = usePatientListModel({
    getAllPatients: (filters) => getAllPatientsService(http, filters),
  });

  return <PatientListView {...methods} />;
};

export default Patients;
