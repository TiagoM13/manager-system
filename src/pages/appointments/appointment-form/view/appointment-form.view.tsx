import React from 'react';
import { FormProvider } from 'react-hook-form';

import { Plus } from '@phosphor-icons/react';

import { Header, Card, Button, StatusIcon } from '@/components';
import { BreadcrumbItem } from '@/components/header/interfaces';
import { PatientHeader } from '@/pages/patients/patient-details/components';

import { PatientCard } from '../components/patient-card';
import { AppointmentCardForm } from '../forms/appointment-form';
import { PatientSearchForm } from '../forms/patient-search-form';
import { useAppointmentFormModel } from '../model/appointment-form.model';

type AppointmentFormViewProps = ReturnType<typeof useAppointmentFormModel> & {
  breadcrumbsPathItems: BreadcrumbItem[];
};

export const AppointmentFormView: React.FC<AppointmentFormViewProps> = (
  props,
) => {
  const {
    query,
    goBack,
    navigateTo,
    isCreatingNewAppointment,
    submit,
    formMethods,
    searchFormMethods,
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

        {query.name && allPatientsResponse && (
          <Card bordered>
            <div className="space-y-4 p-2">
              {allPatientsResponse.patients.length > 0 ? (
                <>
                  <h2 className="text-xl font-semibold">
                    Pacientes Encontrados
                  </h2>
                  {allPatientsResponse.patients.map((patient) => (
                    <PatientCard key={patient.id} patient={patient} />
                  ))}
                </>
              ) : (
                <div className="flex flex-col items-center justify-center gap-2 text-center">
                  <span className="text-sm">
                    Nenhum paciente corresponde à sua pesquisa.
                  </span>
                  <span className="text-sm">
                    Verifique as informações e tente novamente, ou adicione um
                    novo paciente.
                  </span>
                  <Button
                    type="button"
                    label="adicionar novo paciente"
                    icon={<Plus className="size-4" weight="bold" />}
                    onClick={() => navigateTo({ route: '/patients/new' })}
                  />
                </div>
              )}
            </div>
          </Card>
        )}

        {!isCreatingNewAppointment && (
          <Card>
            <PatientHeader patient={patientResponse} loading={isLoading} />
          </Card>
        )}

        {!isCreatingNewAppointment && (
          <FormProvider {...formMethods}>
            <div className="max-w-[1440px]">
              <Card bordered>
                <div className="flex gap-6 p-2">
                  <div className="w-full flex flex-col justify-between">
                    <AppointmentCardForm
                      loading={isLoading}
                      doctors={doctorOptions as any}
                    />

                    <div className="flex ml-auto gap-2 p-2">
                      <Button
                        type="button"
                        label="salvar consulta"
                        onClick={formMethods.handleSubmit(submit)}
                        icon={<StatusIcon loading={isPending} />}
                        className="min-w-28 justify-between px-4 disabled:cursor-not-allowed"
                        disabled={isPending || isLoading}
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
