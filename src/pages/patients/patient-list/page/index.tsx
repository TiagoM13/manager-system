import React from 'react';

import { HttpClient } from '@/infra/http/http-client';
import { getAllPatientsService } from '@/services';

import { usePatientListModel } from '../model/patient-list.model';
import { PatientListView } from '../view/patient-list.view';

const Patients: React.FC = () => {
  const http = new HttpClient();

  const methods = usePatientListModel({
    getAllPatients: (filters) => getAllPatientsService(http, filters),
  });

  return <PatientListView {...methods} />;
};

export default Patients;
