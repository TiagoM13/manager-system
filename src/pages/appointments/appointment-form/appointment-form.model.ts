import React from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';

import dayjs from 'dayjs';

import { schemaPatient } from '@/pages/patients/patient-form/patient-form.schema';
import { formatPatientProps } from '@/shared/helpers/format-patient-props';
import { formatPatientRequest } from '@/shared/helpers/format-patient-request';
import { useAppNavigation, useQueryParams } from '@/shared/hooks';
import {
  IAppointment,
  IDoctor,
  IMSResponse,
  IPatient,
} from '@/shared/interfaces';
import {
  useCreateAppointment,
  useUpdatePatient,
} from '@/shared/services/mutations';
import {
  useGetAllPatients,
  useGetPatient,
  useGetAllDoctors,
} from '@/shared/services/queries';
import {
  formatDateWithCurrentTime,
  getOnlyModifiedFields,
} from '@/shared/utils';
import { zodResolver } from '@hookform/resolvers/zod';

import {
  AppointmentFormType,
  appointmentFormSchema,
} from './appointment-form.schema';
import {
  patientSearchFormSchema,
  PatientSearchFormType,
} from './forms/patient-search-form/patient-search-form.schema';

interface AppointmentFormModelProps {
  getAllPatients: (
    values: PatientSearchFormType,
  ) => Promise<IMSResponse<IPatient[], 'patients'> | undefined>;
  getPatient: (id: string) => Promise<IPatient | undefined>;
  getAllDoctors: () => Promise<IDoctor[] | undefined>;
  createAppointment: (
    id: string,
    values: IAppointment,
  ) => Promise<IMSResponse<IAppointment, 'appointment'> | undefined>;
  updatePatient: (
    patientId: string,
    values: IPatient,
  ) => Promise<IMSResponse<IPatient, 'patient'> | undefined>;
}

export const useAppointmentFormModel = ({
  getAllPatients,
  getPatient,
  getAllDoctors,
  createAppointment,
  updatePatient,
}: AppointmentFormModelProps) => {
  const [query] = useQueryParams<PatientSearchFormType>();
  const { goBack, navigateTo } = useAppNavigation();
  const { patientId } = useParams<{ patientId: string }>();

  const isCreatingNewAppointment = React.useMemo(
    () => patientId === 'new',
    [patientId],
  );

  const hasValidQuery = React.useMemo(
    () => query.name || query.cns || query.cpf,
    [query.cns, query.cpf, query.name],
  );

  const {
    allPatientsResponse,
    isLoading: isLoadingAllPatients,
    isFetching: isFetchingAllPatients,
  } = useGetAllPatients({
    getAllPatients,
    query,
    isEnabled: !!hasValidQuery,
  });
  const {
    patientResponse,
    isLoading: isLoadingPatient,
    isFetching: isFetchingPatient,
  } = useGetPatient({
    getPatient,
    patientId: String(patientId),
    isEnabled: !isCreatingNewAppointment,
  });
  const {
    doctorsResponse,
    isLoading: isLoadingDoctors,
    isFetching: isFetchingDoctors,
    DOCTORS_SELECT_OPTIONS,
  } = useGetAllDoctors({
    getAllDoctors,
    isEnabled: !isCreatingNewAppointment,
  });
  const { createAppointmentMutation, isPending: isPendingCreateAppointment } =
    useCreateAppointment({
      createAppointment,
      patientId: String(patientId),
    });
  const { updatePatientMutation, isPending: isPedingUpdatePatient } =
    useUpdatePatient({
      updatePatient,
      patientId: String(patientId),
    });

  const formMethods = useForm<AppointmentFormType>({
    resolver: zodResolver(appointmentFormSchema),
    shouldUnregister: false,
    defaultValues: {
      scheduled_date: dayjs().format('YYYY-MM-DD') as any,
    },
  });
  const searchFormMethods = useForm<PatientSearchFormType>({
    resolver: zodResolver(patientSearchFormSchema),
    shouldUnregister: false,
    defaultValues: query,
  });
  const patientFormMethods = useForm<IPatient>({
    resolver: zodResolver(schemaPatient),
    shouldUnregister: false,
  });
  const {
    reset,
    formState: { dirtyFields },
  } = patientFormMethods;

  const isLoading = React.useMemo(
    () =>
      isLoadingDoctors ||
      isFetchingDoctors ||
      isLoadingPatient ||
      isFetchingPatient ||
      isLoadingAllPatients ||
      isFetchingAllPatients,
    [
      isLoadingDoctors,
      isFetchingDoctors,
      isLoadingPatient,
      isFetchingPatient,
      isLoadingAllPatients,
      isFetchingAllPatients,
    ],
  );
  const isPending = React.useMemo(
    () => isPendingCreateAppointment || isPedingUpdatePatient,
    [isPedingUpdatePatient, isPendingCreateAppointment],
  );

  const handleUpdatePatientIfChanged = patientFormMethods.handleSubmit(
    (values) => {
      const formattedValues = formatPatientProps(values);
      const payload = getOnlyModifiedFields(dirtyFields, formattedValues);

      if (!Object.keys(payload).length) {
        return reset();
      }

      updatePatientMutation(payload);
    },
  );

  const handleCreateNewAppointment = formMethods.handleSubmit((data) => {
    const payload = {
      ...data,
      scheduled_date: formatDateWithCurrentTime(data.scheduled_date) as any,
    } as IAppointment;
    createAppointmentMutation(payload);
  });

  const handleSave = React.useCallback(async () => {
    handleUpdatePatientIfChanged();
    handleCreateNewAppointment();
  }, [handleCreateNewAppointment, handleUpdatePatientIfChanged]);

  React.useEffect(() => {
    if (patientResponse)
      patientFormMethods.reset(formatPatientRequest(patientResponse));
  }, [isLoading, patientResponse, patientFormMethods]);

  return {
    query,
    hasValidQuery,
    goBack,
    navigateTo,
    isLoading,
    isPending,
    isLoadingDoctors,
    isLoadingPatient,
    isLoadingAllPatients,
    formMethods,
    searchFormMethods,
    patientFormMethods,
    isCreatingNewAppointment,
    doctorsResponse,
    patientResponse,
    allPatientsResponse,
    DOCTORS_SELECT_OPTIONS,
    handleSave,
  };
};
