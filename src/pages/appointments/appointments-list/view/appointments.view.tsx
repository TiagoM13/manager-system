import React from 'react';
import { FormProvider } from 'react-hook-form';

import { Card, Header } from '@/components';

import { AppointmentFilters, AppointmentsTable } from '../components';
import { useAppointmentsListModel } from '../model/appointments-list.model';

type AppointmentsListViewProps = ReturnType<typeof useAppointmentsListModel>;

export const AppointmentsListView: React.FC<AppointmentsListViewProps> = (
  props,
) => {
  const { allAppointmentsResponse, isLoading, handleNewRegister, methods } =
    props;

  return (
    <FormProvider {...methods}>
      <div className="flex flex-col">
        <Header
          title="Lista de Consultas"
          actionLabel="adicionar consulta"
          onRegister={handleNewRegister}
        />

        <Card className="mt-4">
          <AppointmentFilters loading={isLoading} />

          <AppointmentsTable
            data={allAppointmentsResponse}
            loading={isLoading}
          />
        </Card>
      </div>
    </FormProvider>
  );
};
