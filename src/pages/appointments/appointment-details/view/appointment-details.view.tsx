import React from 'react';
import { FormProvider } from 'react-hook-form';

import { CircleNotch } from '@phosphor-icons/react';

import { Header, Card } from '@/components';
import { BreadcrumbItem } from '@/components/header/interfaces';
import { PatientHeader } from '@/pages/patients/patient-details/components';

import {
  PatientDetailsCard,
  HealthInformationDetailsCard,
  AppointmentDetailsCard,
} from '../components';
import { AppointmentDetailsForm } from '../forms/appointment-details-form';
import { useAppointmentDetailsModel } from '../model/appointment-details.model';

type AppointmentDetailsViewProps = ReturnType<
  typeof useAppointmentDetailsModel
> & {
  breadcrumbsPathItems: BreadcrumbItem[];
};

export const AppointmentDetailsView: React.FC<AppointmentDetailsViewProps> = ({
  goBack,
  patientResponse,
  appointmentResponse,
  isLoading,
  methods,
  doctorOptions,
  isPending,
  isPendingUpdateAppointment,
  isPendingUpdateAppointmentStatus,
  handleCancelAppointment,
  isAppointmentPending,
  submit,
  breadcrumbsPathItems,
}) => {
  return (
    <div className="max-w-[1440px]">
      <Header
        title="Atualizar consulta"
        goBack={() => goBack('/appointments')}
        breadcrumbItems={breadcrumbsPathItems}
      />

      <div className="max-w-[1440px] mt-6 space-y-6">
        <Card>
          <PatientHeader patient={patientResponse} loading={isLoading} />
        </Card>

        <PatientDetailsCard patient={patientResponse} loading={isLoading} />
        <HealthInformationDetailsCard
          patient={patientResponse}
          loading={isLoading}
        />

        {isLoading && (
          <Card bordered>
            <div className="flex items-center justify-center min-h-[200px]">
              <CircleNotch
                weight="bold"
                className="text-sky-600 size-8 animate-spin"
              />
            </div>
          </Card>
        )}

        {!isLoading && isAppointmentPending && (
          <FormProvider {...methods}>
            <AppointmentDetailsForm
              isLoading={isLoading}
              isPending={isPending}
              isAppointmentPending={isAppointmentPending}
              isPendingUpdateAppointment={isPendingUpdateAppointment}
              isPendingUpdateAppointmentStatus={
                isPendingUpdateAppointmentStatus
              }
              doctorOptions={doctorOptions}
              handleCancelAppointment={handleCancelAppointment}
              methods={methods}
              submit={submit}
            />
          </FormProvider>
        )}

        {!isLoading && !isAppointmentPending && (
          <AppointmentDetailsCard
            appointment={appointmentResponse}
            loading={isLoading}
          />
        )}
      </div>
    </div>
  );
};
