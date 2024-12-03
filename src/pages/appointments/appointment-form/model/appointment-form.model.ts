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

import {
  PatientSearchType,
  AppointmentFormType,
  appointmentFormResolver,
  patientSearchResolver,
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

  const { allPatients: allPatientsResponse, loading: isLoadingAllPatients } =
    useGetAllPatients({
      getAllPatients: getAllPatients,
      query,
      isEnabled: !!query.name,
    });
  const { patient: patientResponse, loading: isLoadingPatient } = useGetPatient(
    {
      getPatient: () => getPatient(String(patientId)),
      isEnabled: !isCreatingNewAppointment,
    },
  );
  const {
    doctors: doctorResponse,
    loading: isLoadingDoctors,
    doctorOptions,
  } = useGetAllDoctors({
    getAllDoctors,
    isEnabled: !isCreatingNewAppointment,
  });

  const { create, isPending } = useCreateAppointment({
    createAppointment,
    patientId: String(patientId),
  });

  const formMethods = useForm<AppointmentFormType>({
    resolver: appointmentFormResolver,
    shouldUnregister: false,
    defaultValues: {
      scheduled_date: dayjs().format('YYYY-MM-DD') as any,
    },
  });
  const searchFormMethods = useForm<PatientSearchType>({
    resolver: patientSearchResolver,
    shouldUnregister: false,
    defaultValues: query,
  });
  const patientFormMethods = useForm<IPatient>({
    resolver: schemaPatient,
    shouldUnregister: false,
  });

  const isLoading = React.useMemo(
    () => isLoadingDoctors || isLoadingPatient || isLoadingAllPatients,
    [isLoadingDoctors, isLoadingPatient, isLoadingAllPatients],
  );

  const handleCreateNewAppointment = React.useCallback(
    async (values: AppointmentFormType) => {
      const payload: IAppointment = {
        ...values,
        scheduled_date: formatDateWithCurrentTime(values.scheduled_date) as any,
      };

      await create(payload);
    },
    [create],
  );

  React.useEffect(() => {
    if (patientResponse)
      patientFormMethods.reset(formatPatientRequest(patientResponse));
  }, [isLoading, patientResponse, patientFormMethods]);

  return {
    query,
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
    doctorResponse,
    patientResponse,
    allPatientsResponse,
    doctorOptions,
  };
};
