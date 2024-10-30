import React from 'react';
import { FormProvider } from 'react-hook-form';

import { Header, Card } from '@/components';

import { PatientFilters, PatientsCard, PatientsTable } from '../components';
import { usePatientListModel } from '../model/patient-list.model';

type PatientListViewProps = ReturnType<typeof usePatientListModel>;

export const PatientListView = (props: PatientListViewProps) => {
  const { data, loading, methods, handleNewRegister, handleEdit, isMobile } =
    props;

  return (
    <FormProvider {...methods}>
      <div className="flex flex-col">
        <Header
          title="Lista de Pacientes"
          actionLabel="adicionar paciente"
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
