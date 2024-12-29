import React from 'react';
import { FormProvider } from 'react-hook-form';

import { Header } from '@/components';
import { Card } from '@/components/_ui';

import { useAppointmentsListModel } from './appointments-list.model';
import { AppointmentFilters, AppointmentsTable } from './components';

type AppointmentsListViewProps = ReturnType<typeof useAppointmentsListModel>;

export const AppointmentsListView: React.FC<AppointmentsListViewProps> = (
  props,
) => {
  const {
    isLoading,
    allAppointmentsResponse,
    handleNewRegister,
    handleEdiAppointment,
    methods,
  } = props;

  return (
    <FormProvider {...methods}>
      <div className="flex flex-col">
        <Header
          title="Consultas"
          actionLabel="adicionar consulta"
          onRegister={handleNewRegister}
        />

        <Card className="mt-4">
          <AppointmentFilters loading={isLoading} />

          <AppointmentsTable
            data={allAppointmentsResponse}
            onEdit={handleEdiAppointment}
            loading={isLoading}
          />
        </Card>
      </div>
    </FormProvider>
  );
};
