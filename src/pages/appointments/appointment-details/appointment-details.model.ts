import React from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';

import dayjs from 'dayjs';

import { AppointmentStatus } from '@/enums';
import {
  useAppNavigation,
  useGetAllDoctors,
  useGetAppointment,
  useGetPatient,
  useNotification,
  useUpdateAppointment,
  useUpdateAppointmentStatus,
} from '@/hooks';
import { IAppointment, IDoctor, IMSResponse, IPatient } from '@/interfaces';
import { formatDate, formatDateWithCurrentTime } from '@/utils';
import { zodResolver } from '@hookform/resolvers/zod';

import {
  appointmentDetailsSchema,
  AppointmentDetailsType,
} from './appointment-details.schema';

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
  const notify = useNotification();
  const { goBack, navigateTo } = useAppNavigation();
  const { patientId, appointmentId } = useParams<{
    patientId: string;
    appointmentId: string;
  }>();

  const {
    patientResponse,
    isLoading: isLoadingPatient,
    isFetching: isFetchingPatient,
  } = useGetPatient({
    getPatient,
    patientId: String(patientId),
  });
  const {
    appointmentResponse,
    isLoading: isLoadingAppointment,
    isFetching: isFetchingAppointment,
  } = useGetAppointment({
    getAppointment,
    patientId: String(patientId),
    appointmentId: Number(appointmentId),
  });
  const {
    isLoading: isLoadingDoctors,
    isFetching: isFetchingDoctors,
    doctorOptions,
  } = useGetAllDoctors({
    getAllDoctors,
  });
  const { updateAppointmentMutation, isPending: isPendingUpdateAppointment } =
    useUpdateAppointment({
      updateAppointment,
      patientId: String(patientId),
      appointmentId: Number(appointmentId),
    });
  const {
    updateAppointmentStatusMutation,
    isPending: isPendingUpdateAppointmentStatus,
  } = useUpdateAppointmentStatus({
    updateAppointmentStatus,
    patientId: String(patientId),
    appointmentId: Number(appointmentId),
  });

  const methods = useForm<AppointmentDetailsType>({
    resolver: zodResolver(appointmentDetailsSchema),
    shouldUnregister: false,
  });

  const isAppointmentPending = React.useMemo(
    () =>
      appointmentResponse &&
      appointmentResponse.status === AppointmentStatus.PENDING,
    [appointmentResponse],
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

  const validateScheduledDate = React.useCallback(
    (values: AppointmentDetailsType) => {
      const isDateChanged =
        formatDate(values.scheduled_date) !==
        formatDate(appointmentResponse?.scheduled_date as Date);

      if (isDateChanged)
        return formatDateWithCurrentTime(values.scheduled_date);

      return appointmentResponse?.scheduled_date;
    },
    [appointmentResponse?.scheduled_date],
  );

  const handleUpdateAppointment = React.useCallback(
    async (values: AppointmentDetailsType) => {
      const scheduledDate = validateScheduledDate(values);

      const payload: IAppointment = {
        ...values,
        scheduled_date: scheduledDate as Date,
      };

      await updateAppointmentMutation(payload);
      await updateAppointmentStatusMutation(AppointmentStatus.CONPLETED);
    },
    [
      updateAppointmentMutation,
      updateAppointmentStatusMutation,
      validateScheduledDate,
    ],
  );

  const handleCancelAppointment = React.useCallback(
    async (values: AppointmentStatus) => {
      await updateAppointmentStatusMutation(values);
      navigateTo({ route: '/appointments' });
      notify.success('Consulta cancelada com sucesso!');
    },
    [navigateTo, notify, updateAppointmentStatusMutation],
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
    handleUpdateAppointment,
  };
};
