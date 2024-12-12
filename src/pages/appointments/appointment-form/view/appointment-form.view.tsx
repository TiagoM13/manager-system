import React from 'react';
import { FormProvider } from 'react-hook-form';

import { Check } from '@phosphor-icons/react';

import { Header, Card, Button } from '@/components';
import { BreadcrumbItem } from '@/interfaces';
import { PatientHeader } from '@/pages/patients/patient-details/components';

import { NotFoundPatient, PatientCard } from '../components';
import {
  AppointmentForm,
  HealthInformationForm,
  PatientForm,
  PatientSearchForm,
} from '../forms';
import { useAppointmentFormModel } from '../model/appointment-form.model';

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
    handleCreateNewAppointment,
    formMethods,
    searchFormMethods,
    patientFormMethods,
    patientResponse,
    allPatientsResponse,
    doctorOptions,
    isLoading,
    isPending,
    breadcrumbsPathItems,
  } = props;

  return (
    <>
      <Header
        title="Adicionar Consulta"
        breadcrumbItems={breadcrumbsPathItems}
        goBack={() => goBack('/appointments')}
      />

      <div className="max-w-[1440px] mt-6 space-y-6">
        {isCreatingNewAppointment && (
          <FormProvider {...searchFormMethods}>
            <PatientSearchForm loading={isLoading} />
          </FormProvider>
        )}

        {!!hasValidQuery && isCreatingNewAppointment && (
          <Card bordered>
            <div className="space-y-4 p-2">
              {allPatientsResponse &&
                allPatientsResponse.patients.length > 0 ? (
                <>
                  <h2 className="text-xl font-semibold">
                    Pacientes Encontrados
                  </h2>
                  {allPatientsResponse.patients.map((patient) => (
                    <PatientCard key={patient.id} patient={patient} />
                  ))}
                </>
              ) : (
                <NotFoundPatient
                  onNavigate={() => navigateTo({ route: '/patients/new' })}
                />
              )}
            </div>
          </Card>
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
                  <div className="w-full flex flex-col justify-between">
                    <AppointmentForm
                      loading={isLoading || isPending}
                      doctors={doctorOptions}
                    />

                    <div className="flex ml-auto gap-2 p-2">
                      <Button
                        type="button"
                        label="salvar consulta"
                        onClick={formMethods.handleSubmit(
                          handleCreateNewAppointment,
                        )}
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
