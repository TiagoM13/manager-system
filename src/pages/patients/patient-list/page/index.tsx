import React from 'react';
import { FormProvider } from 'react-hook-form';

import { Card } from '@/components';
import { useWindowSize } from '@/hooks';

import { Header } from '../../patient-form/components/header';
import { PatientFilters, PatientsTable, PatientsCard } from '../components';
import { usePatientList } from '../hooks/use-patient-list';

const Patients: React.FC = () => {
  const [, , isMobile] = useWindowSize();
  const { data, loading, methods, handleNewRegister, handleEdit } =
    usePatientList();

  return (
    <FormProvider {...methods}>
      <div className="flex flex-col">
        <Header
          title="Lista de Pacientes"
          labelRegister="adicionar paciente"
          onRegister={handleNewRegister}
        />

        <Card className="mt-4">
          <PatientFilters loading={loading} />

          {isMobile ? (
            <PatientsCard data={data} loading={loading} onEdit={handleEdit} />
          ) : (
            <PatientsTable data={data} loading={loading} />
          )}
        </Card>
      </div>
    </FormProvider>
  );
};

export default Patients;
