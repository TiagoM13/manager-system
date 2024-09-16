import React from 'react';

import { Pagination } from '@/components';
import { IPatient, IResponseMeta } from '@/interfaces';

import { PatientCard } from '../patient-item';

import { Container } from './styles';

type IPatientData = {
  patients: IPatient[];
  meta?: IResponseMeta;
};

type PatientCardProps = {
  data?: IPatientData;
  loading?: boolean;
  onEdit: (data: IPatient) => void;
};

export const PatientsCard: React.FC<PatientCardProps> = ({
  data,
  loading,
  onEdit,
}) => {
  return (
    <Container>
      {data?.patients.map((patient) => (
        <PatientCard key={patient.id} patient={patient} onEdit={onEdit} />
      ))}

      <div className="flex items-center justify-between p-4 border-t border-t-slate-400">
        <Pagination.Label
          currentPageData={data?.meta?.total_current_records! || 0}
          totalItems={data?.meta?.total_records || 0}
          paginationLabel={{ single: 'paciente', several: 'pacientes' }}
        />
        <Pagination.Actions totalPages={data?.meta?.total_pages || 1} />
      </div>
    </Container>
  );
};
