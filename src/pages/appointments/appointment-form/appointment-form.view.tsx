import React from 'react';
import { FormProvider } from 'react-hook-form';

import { Check } from '@phosphor-icons/react';

import { Header, PatientHeader } from '@/components';
import { Card, Button } from '@/components/_ui';
import { BreadcrumbItem } from '@/interfaces';

import { useAppointmentFormModel } from './appointment-form.model';
import { PatientCardList } from './components/patient-card-list';
import {
  AppointmentForm,
  HealthInformationForm,
  PatientForm,
  PatientSearchForm,
} from './forms';

type AppointmentFormViewProps = ReturnType<typeof useAppointmentFormModel> & {
  breadcrumbsPathItems: BreadcrumbItem[];
};

export const AppointmentFormView: React.FC<AppointmentFormViewProps> = (
  props,
) => {
  const {
    hasValidQuery,
    goBack,
    navigateTo,
    isCreatingNewAppointment,
    formMethods,
    searchFormMethods,
    patientFormMethods,
    patientResponse,
    allPatientsResponse,
    doctorOptions,
    isLoading,
    isPending,
    breadcrumbsPathItems,
    handleSave,
  } = props;

  return (
    <>
      <Header
        title="Adicionar Consulta"
        breadcrumbItems={breadcrumbsPathItems}
        goBack={() => goBack('/appointments')}
      />

      <div className="mt-6 max-w-[1440px] space-y-6">
        {isCreatingNewAppointment && (
          <FormProvider {...searchFormMethods}>
            <PatientSearchForm loading={isLoading} />
          </FormProvider>
        )}

        {!!hasValidQuery && isCreatingNewAppointment && (
          <PatientCardList
            patients={allPatientsResponse?.patients}
            onNavigateToNotFound={() => navigateTo({ route: '/patients/new' })}
            loading={isLoading}
          />
        )}

        {!isCreatingNewAppointment && (
          <>
            <Card>
              <PatientHeader patient={patientResponse} loading={isLoading} />
            </Card>

            <FormProvider {...patientFormMethods}>
              <PatientForm loading={isLoading} />
              <HealthInformationForm loading={isLoading} />
            </FormProvider>
          </>
        )}

        {!isCreatingNewAppointment && (
          <FormProvider {...formMethods}>
            <div className="max-w-[1440px]">
              <Card bordered>
                <div className="flex gap-6 p-2">
                  <div className="flex w-full flex-col justify-between">
                    <AppointmentForm
                      loading={isLoading || isPending}
                      doctors={doctorOptions}
                    />

                    <div className="ml-auto flex gap-2 p-2">
                      <Button
                        type="button"
                        label="salvar consulta"
                        onClick={handleSave}
                        icon={<Check className="size-4" weight="bold" />}
                        className="min-w-28 justify-between px-4 disabled:cursor-not-allowed"
                        disabled={isPending || isLoading}
                        loading={isPending}
                      />
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </FormProvider>
        )}
      </div>
    </>
  );
};
