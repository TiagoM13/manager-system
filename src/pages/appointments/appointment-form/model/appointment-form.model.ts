import React from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';

import dayjs from 'dayjs';

import { formatPatientRequest } from '@/helpers/format-patient-request';
import {
  useAppNavigation,
  useGetAllDoctors,
  useGetAllPatients,
  useGetPatient,
  useQueryParams,
  useCreateAppointment,
} from '@/hooks';
import { IAppointment, IDoctor, IMSResponse, IPatient } from '@/interfaces';
import { schemaPatient } from '@/pages/patients/patient-form/patient-form.schema';
import { formatDateWithCurrentTime } from '@/utils';
import { zodResolver } from '@hookform/resolvers/zod';

import {
  PatientSearchType,
  AppointmentFormType,
  appointmentFormSchema,
  patientSearchSchema,
} from '../appointment-form.schema';

interface AppointmentFormModelProps {
  getAllPatients: (
    values: PatientSearchType,
  ) => Promise<IMSResponse<IPatient[], 'patients'> | undefined>;
  getPatient: (id: string) => Promise<IPatient | undefined>;
  getAllDoctors: () => Promise<IDoctor[] | undefined>;
  createAppointment: (
    id: string,
    values: IAppointment,
  ) => Promise<IMSResponse<IAppointment, 'appointment'> | undefined>;
}

export const useAppointmentFormModel = ({
  getAllPatients,
  getPatient,
  getAllDoctors,
  createAppointment,
}: AppointmentFormModelProps) => {
  const [query] = useQueryParams<PatientSearchType>();
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
    getAllPatients: getAllPatients,
    query,
    isEnabled: !!query.name,
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
    doctorOptions,
  } = useGetAllDoctors({
    getAllDoctors,
    isEnabled: !isCreatingNewAppointment,
  });
  const { createAppointmentMutation, isPending } = useCreateAppointment({
    createAppointment,
    patientId: String(patientId),
  });

  const formMethods = useForm<AppointmentFormType>({
    resolver: zodResolver(appointmentFormSchema),
    shouldUnregister: false,
    defaultValues: {
      scheduled_date: dayjs().format('YYYY-MM-DD') as any,
    },
  });
  const searchFormMethods = useForm<PatientSearchType>({
    resolver: zodResolver(patientSearchSchema),
    shouldUnregister: false,
    defaultValues: query,
  });
  const patientFormMethods = useForm<IPatient>({
    resolver: zodResolver(schemaPatient),
    shouldUnregister: false,
  });

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

  const handleCreateNewAppointment = React.useCallback(
    async (values: AppointmentFormType) => {
      const payload: IAppointment = {
        ...values,
        scheduled_date: formatDateWithCurrentTime(values.scheduled_date) as any,
      };

      await createAppointmentMutation(payload);
    },
    [createAppointmentMutation],
  );

  React.useEffect(() => {
    if (patientResponse)
      patientFormMethods.reset(formatPatientRequest(patientResponse));
  }, [isLoading, patientResponse, patientFormMethods]);

  return {
    query,
    hasValidQuery,
    goBack,
    navigateTo,
    handleCreateNewAppointment,
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
    doctorOptions,
  };
};
