import React from 'react';
import { FormProvider } from 'react-hook-form';

import { Header, Card } from '@/components';

import { PatientFilters, PatientsCard, PatientsTable } from '../components';
import { usePatientListModel } from '../model/patient-list.model';

type PatientListViewProps = ReturnType<typeof usePatientListModel>;

export const PatientListView = (props: PatientListViewProps) => {
  const {
    allPatientsResponse,
    isLoading,
    handleNewRegister,
    handleEditPatient,
    methods,
    isMobile,
  } = props;

  return (
    <FormProvider {...methods}>
      <div className="flex flex-col">
        <Header
          title="Lista de Pacientes"
          actionLabel="adicionar paciente"
          onRegister={handleNewRegister}
        />

        <Card className="mt-4">
          <PatientFilters loading={isLoading} />

          {isMobile ? (
            <PatientsCard
              data={allPatientsResponse}
              loading={isLoading}
              onEdit={handleEditPatient}
            />
          ) : (
            <PatientsTable data={allPatientsResponse} loading={isLoading} />
          )}
        </Card>
      </div>
    </FormProvider>
  );
};
