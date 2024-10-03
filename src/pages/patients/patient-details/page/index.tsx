import React from 'react';
import { useParams } from 'react-router-dom';

import { Card } from '@/components';
import { useAppNavigation } from '@/hooks';
import { getPatientService } from '@/services';
import { useQuery } from '@tanstack/react-query';

import { Header } from '../../patient-form/components/header';
import {
  PatientHeader,
  PatientCompletionStatus,
  PatientInfoSections,
} from '../components';

const PatientDetails: React.FC = () => {
  const { goBack } = useAppNavigation();
  const { id } = useParams<{ id: string }>();

  const {
    data: patient,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ['patient'],
    queryFn: async () => await getPatientService(String(id)),
  });

  const loading = React.useMemo(
    () => isLoading || isFetching,
    [isFetching, isLoading],
  );

  return (
    <>
      <Header
        subtitle="voltar a lista de pacientes"
        title="Detalhes do Paciente"
        goBack={goBack}
      />

      <div className="max-w-[1440px] space-y-6">
        <Card>
          <div className="flex items-center justify-between">
            <PatientHeader patient={patient} loading={loading} />

            <PatientCompletionStatus patient={patient} loading={loading} />
          </div>
        </Card>

        <PatientInfoSections patient={patient} loading={loading} />
      </div>
    </>
  );
};

export default PatientDetails;
