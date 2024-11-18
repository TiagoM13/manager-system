import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';

import dayjs from 'dayjs';

import { Status } from '@/enums';
import { useAppNavigation, useQueryParams } from '@/hooks';
import { IAppointment, IDoctor, IMSResponse, IPatient } from '@/interfaces';
import { toastSuccess } from '@/utils';
import { useQueryClient, useQuery, useMutation } from '@tanstack/react-query';

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
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { goBack, navigateTo } = useAppNavigation();
  const { patientId } = useParams<{ patientId: string }>();
  const [query] = useQueryParams<PatientSearchType>();

  const isCreatingNewAppointment = React.useMemo(
    () => patientId === 'new',
    [patientId],
  );

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
  });

  // (queries)
  const { data: allPatientsResponse, isLoading: isLoadingAllPatients } =
    useQuery({
      queryKey: ['patients', query.name],
      queryFn: async () => {
        if (!query.name) return null;
        return await getAllPatients({ name: String(query.name) });
      },
      enabled: !!query.name,
    });
  const {
    data: patientResponse,
    isLoading: isLoadingPatient,
    isFetching: isFetchingPatient,
  } = useQuery({
    queryKey: ['patient'],
    queryFn: async () => await getPatient(String(patientId)),
    enabled: !isCreatingNewAppointment,
  });
  const {
    data: doctorResponse,
    isLoading: isLoadingDoctors,
    isFetching: isFetchingDoctors,
  } = useQuery({
    queryKey: ['doctors'],
    queryFn: async () => await getAllDoctors(),
    enabled: !isCreatingNewAppointment,
  });
  // create appointment
  const { mutateAsync: createAppointmentMutation, isPending } = useMutation({
    mutationFn: async (values: IAppointment) =>
      await createAppointment(String(patientId), values),
    onSuccess: (data) => {
      if (data) {
        toastSuccess('Nova consulta adicionada com sucesso!');
        queryClient.invalidateQueries({ queryKey: ['appointments'] });
        navigate('/appointments');
      }
    },
  });

  const doctorOptions = React.useMemo(
    () =>
      doctorResponse
        ?.filter((doctor) => doctor.status !== Status.INACTIVE)
        .map((doctor) => ({
          label: doctor.name,
          value: doctor.id,
        })),
    [doctorResponse],
  );

  const isLoading = React.useMemo(
    () =>
      isLoadingDoctors ||
      isFetchingDoctors ||
      isLoadingPatient ||
      isFetchingPatient ||
      isLoadingAllPatients,
    [
      isLoadingDoctors,
      isFetchingDoctors,
      isLoadingPatient,
      isFetchingPatient,
      isLoadingAllPatients,
    ],
  );

  const submit = React.useCallback(
    async (values: AppointmentFormType) => {
      const selectedDate = dayjs(values.scheduled_date)
        .utc()
        .hour(dayjs().hour())
        .minute(dayjs().minute())
        .second(dayjs().second())
        .millisecond(dayjs().millisecond())
        .toISOString();

      const payload: IAppointment = {
        ...values,
        scheduled_date: selectedDate as any,
      };

      await createAppointmentMutation(payload);
    },
    [createAppointmentMutation],
  );

  return {
    query,
    goBack,
    navigateTo,
    submit,
    isLoading,
    isPending,
    formMethods,
    searchFormMethods,
    isCreatingNewAppointment,
    doctorResponse,
    patientResponse,
    allPatientsResponse,
    doctorOptions,
  };
};
