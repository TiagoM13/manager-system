import { FormProvider } from 'react-hook-form';

import { Header } from '@/components';
import { Card } from '@/components/_ui';

import { PatientFilters, PatientsCard, PatientsTable } from './components';
import { usePatientListModel } from './patient-list.model';

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
          title="Pacientes"
          actionLabel="adicionar paciente"
          onRegister={handleNewRegister}
        />

        <Card className="mt-4">
          <PatientFilters loading={isLoading} />

          {isMobile ? (
            <PatientsCard
              data={allPatientsResponse}
              onEdit={handleEditPatient}
              loading={isLoading}
            />
          ) : (
            <PatientsTable
              data={allPatientsResponse}
              onEdit={handleEditPatient}
              loading={isLoading}
            />
          )}
        </Card>
      </div>
    </FormProvider>
  );
};
