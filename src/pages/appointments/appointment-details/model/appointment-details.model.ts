import React from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';

import dayjs from 'dayjs';

import { AppointmentStatus, Status } from '@/enums';
import { useAppNavigation } from '@/hooks';
import { IAppointment, IDoctor, IMSResponse, IPatient } from '@/interfaces';
import { formatDate, formatDateWithCurrentTime, toastSuccess } from '@/utils';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import {
  appointmentDetailsResolver,
  AppointmentDetailsType,
} from '../appointment-details.schema';

type StatusResponse = {
  success: boolean;
  status: string;
};

interface AppointmentDetailsModelProps {
  getPatient: (id: string) => Promise<IPatient | undefined>;
  getAppointment: (
    patientId: string,
    appointmentId: number,
  ) => Promise<IAppointment | undefined>;
  getAllDoctors: () => Promise<IDoctor[] | undefined>;
  updateAppointment: (
    patientId: string,
    appointmentId: number,
    data: IAppointment,
  ) => Promise<IMSResponse<IAppointment, 'appointment'> | undefined>;
  updateAppointmentStatus: (
    patientId: string,
    appointmentId: number,
    data: AppointmentStatus,
  ) => Promise<StatusResponse | undefined>;
}

export const useAppointmentDetailsModel = ({
  getPatient,
  getAppointment,
  getAllDoctors,
  updateAppointment,
  updateAppointmentStatus,
}: AppointmentDetailsModelProps) => {
  const queryClient = useQueryClient();
  const { goBack, navigateTo } = useAppNavigation();
  const { patientId, appointmentId } = useParams<{
    patientId: string;
    appointmentId: string;
  }>();

  const methods = useForm<AppointmentDetailsType>({
    resolver: appointmentDetailsResolver,
    shouldUnregister: false,
  });

  const {
    data: patientResponse,
    isLoading: isLoadingPatient,
    isFetching: isFetchingPatient,
  } = useQuery({
    queryKey: ['patient'],
    queryFn: async () => await getPatient(String(patientId)),
  });
  const {
    data: appointmentResponse,
    isLoading: isLoadingAppointment,
    isFetching: isFetchingAppointment,
  } = useQuery({
    queryKey: ['appointment'],
    queryFn: async () =>
      await getAppointment(String(patientId), Number(appointmentId)),
  });
  const {
    data: doctorResponse,
    isLoading: isLoadingDoctors,
    isFetching: isFetchingDoctors,
  } = useQuery({
    queryKey: ['doctors'],
    queryFn: async () => await getAllDoctors(),
  });
  const {
    mutateAsync: updateAppointmentMutation,
    isPending: isPendingUpdateAppointment,
  } = useMutation({
    mutationFn: async (values: IAppointment) =>
      await updateAppointment(String(patientId), Number(appointmentId), values),
    onSuccess: (data) => {
      if (data) {
        toastSuccess('Consulta finalizada com sucesso!');
        navigateTo({ route: '/appointments' });
        queryClient.invalidateQueries({
          queryKey: ['appointments', appointmentId],
        });
      }
    },
  });
  const {
    mutateAsync: updateAppointmentStatusMutation,
    isPending: isPendingUpdateAppointmentStatus,
  } = useMutation({
    mutationFn: async (status: AppointmentStatus) =>
      await updateAppointmentStatus(
        String(patientId),
        Number(appointmentId),
        status,
      ),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ['appointments', appointmentId],
      }),
  });

  const isAppointmentPending = React.useMemo(
    () =>
      appointmentResponse &&
      appointmentResponse.status === AppointmentStatus.PENDING,
    [appointmentResponse],
  );

  const doctorOptions = React.useMemo(
    () =>
      doctorResponse
        ?.filter((doctor) => doctor.status !== Status.INACTIVE)
        ?.map((doctor) => ({
          label: doctor.name,
          value: Number(doctor.id),
        })),
    [doctorResponse],
  );

  const isLoading = React.useMemo(
    () =>
      isLoadingPatient ||
      isFetchingPatient ||
      isLoadingDoctors ||
      isFetchingDoctors ||
      isLoadingAppointment ||
      isFetchingAppointment,
    [
      isFetchingAppointment,
      isFetchingDoctors,
      isFetchingPatient,
      isLoadingAppointment,
      isLoadingDoctors,
      isLoadingPatient,
    ],
  );

  const isPending = React.useMemo(
    () => isPendingUpdateAppointmentStatus || isPendingUpdateAppointment,
    [isPendingUpdateAppointment, isPendingUpdateAppointmentStatus],
  );

  const submit = React.useCallback(
    async (values: AppointmentDetailsType) => {
      const isDateChanged =
        formatDate(values.scheduled_date) !==
        formatDate(appointmentResponse?.scheduled_date as Date);

      const scheduledDate = isDateChanged
        ? formatDateWithCurrentTime(values.scheduled_date)
        : appointmentResponse?.scheduled_date;

      const payload: IAppointment = {
        ...values,
        scheduled_date: scheduledDate as Date,
      };

      await updateAppointmentMutation(payload);
      await updateAppointmentStatusMutation(AppointmentStatus.CONPLETED);
    },
    [
      appointmentResponse?.scheduled_date,
      updateAppointmentMutation,
      updateAppointmentStatusMutation,
    ],
  );

  const handleCancelAppointment = React.useCallback(
    async (values: AppointmentStatus) => {
      await updateAppointmentStatusMutation(values);
      toastSuccess('Consulta cancelada com sucesso!');
      navigateTo({ route: '/appointments' });
    },
    [navigateTo, updateAppointmentStatusMutation],
  );

  React.useEffect(() => {
    if (appointmentResponse)
      methods.reset({
        ...appointmentResponse,
        scheduled_date: dayjs
          .utc(appointmentResponse.scheduled_date)
          .format('YYYY-MM-DD') as any,
        diagnosis_summary:
          appointmentResponse.diagnosis_summary === null
            ? ''
            : appointmentResponse.diagnosis_summary,
      });
  }, [appointmentResponse, methods]);

  const showActions = !isLoading && isAppointmentPending;

  return {
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
    showActions,
    submit,
  };
};
