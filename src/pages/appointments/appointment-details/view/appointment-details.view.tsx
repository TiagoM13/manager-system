import React from 'react';
import { FormProvider } from 'react-hook-form';

import { Check, CircleNotch, X } from '@phosphor-icons/react';

import { Header, PatientHeader } from '@/components';
import { Card, Button } from '@/components/_ui';
import { AppointmentStatus } from '@/enums';
import { BreadcrumbItem } from '@/interfaces';

import { AppointmentForm } from '../../appointment-form/forms';
import {
  PatientDetailsCard,
  HealthInformationDetailsCard,
  AppointmentDetailsCard,
} from '../components';
import { useAppointmentDetailsModel } from '../model/appointment-details.model';

type AppointmentDetailsViewProps = ReturnType<
  typeof useAppointmentDetailsModel
> & {
  title: string;
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
  breadcrumbsPathItems,
  handleUpdateAppointment,
  title,
}) => {
  return (
    <div className="max-w-[1440px]">
      <Header
        title={title}
        goBack={() => goBack('/appointments')}
        breadcrumbItems={breadcrumbsPathItems}
      />

      <div className="mt-6 max-w-[1440px] space-y-6">
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
            <div className="flex min-h-[200px] items-center justify-center">
              <CircleNotch
                weight="bold"
                className="size-8 animate-spin text-sky-600"
              />
            </div>
          </Card>
        )}

        {!isLoading && isAppointmentPending && (
          <FormProvider {...methods}>
            <Card bordered>
              <div className="flex gap-6 p-2">
                <div className="flex w-full flex-col justify-between">
                  <AppointmentForm
                    loading={isLoading || isPending}
                    isUpdating={isAppointmentPending}
                    doctors={doctorOptions}
                  />

                  <div className="ml-auto flex gap-2 p-2">
                    <Button
                      type="button"
                      variable="danger"
                      label="encerrar consulta"
                      onClick={() =>
                        handleCancelAppointment(AppointmentStatus.CANCELLED)
                      }
                      icon={<X className="size-5" weight="bold" />}
                      className="min-w-28 justify-between px-4 disabled:cursor-not-allowed"
                      disabled={isLoading || isPending}
                      loading={isPendingUpdateAppointmentStatus}
                    />

                    <Button
                      type="button"
                      label="finalizar consulta"
                      onClick={methods.handleSubmit(handleUpdateAppointment)}
                      icon={<Check className="size-5" weight="bold" />}
                      className="min-w-28 justify-between px-4 disabled:cursor-not-allowed"
                      disabled={isLoading || isPending}
                      loading={isPendingUpdateAppointment}
                    />
                  </div>
                </div>
              </div>
            </Card>
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
