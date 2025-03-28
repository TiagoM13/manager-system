import {
  APPOINTMENT_CREATED_SUCCESSFULLY,
  APPOINTMENT_FINISHED_SUCCESSFULLY,
  ERROR_CREATING_APPOINTMENT,
  ERROR_FINISHED_APPOINTMENT,
} from '@/shared/constants/messages';
import { AppointmentStatus } from '@/shared/enums';
import { useAppNavigation, useNotification } from '@/shared/hooks';
import { IAppointment, IMSResponse } from '@/shared/interfaces';
import { invalidateRelatedQueries } from '@/shared/utils/invalidate-queries';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { CacheKeys } from '../cache-keys';

interface UseCreateAppointmentProps {
  createAppointment: (
    id: string,
    values: IAppointment,
  ) => Promise<IMSResponse<IAppointment, 'appointment'> | undefined>;
  patientId: string;
}

const APPOINTMENT_RELATED_KEYS = [
  CacheKeys.APPOINTMENTS_BY_PATIENT,
  CacheKeys.APPOINTMENTS,
  CacheKeys.APPOINTMENT,
];

export const useCreateAppointment = ({
  createAppointment,
  patientId,
}: UseCreateAppointmentProps) => {
  const notify = useNotification();
  const queryClient = useQueryClient();
  const { navigateTo } = useAppNavigation();

  const { mutateAsync: createAppointmentMutation, ...rest } = useMutation({
    mutationFn: (values: IAppointment) => createAppointment(patientId, values),
    onSuccess: () => {
      invalidateRelatedQueries({
        queryKeys: APPOINTMENT_RELATED_KEYS,
        queryClient,
      });
      notify.success(APPOINTMENT_CREATED_SUCCESSFULLY);
      navigateTo({ route: '/appointments' });
    },
    onError: () => notify.error(ERROR_CREATING_APPOINTMENT),
    onMutate: (newAppointment) => {
      queryClient.setQueryData([CacheKeys.APPOINTMENTS], (old: any) => [
        ...(old || []),
        newAppointment,
      ]);
    },
  });

  return {
    createAppointmentMutation,
    ...rest,
  };
};

interface UseUpdateAppointmentProps {
  updateAppointment: (
    patientId: string,
    appointmentId: number,
    data: IAppointment,
  ) => Promise<IMSResponse<IAppointment, 'appointment'> | undefined>;
  patientId: string;
  appointmentId: number;
}

export const useUpdateAppointment = ({
  updateAppointment,
  appointmentId,
  patientId,
}: UseUpdateAppointmentProps) => {
  const notify = useNotification();
  const queryClient = useQueryClient();
  const { navigateTo } = useAppNavigation();

  const { mutateAsync: updateAppointmentMutation, ...rest } = useMutation({
    mutationFn: (values: IAppointment) =>
      updateAppointment(patientId, appointmentId, values),
    onSuccess: () => {
      invalidateRelatedQueries({
        queryKeys: APPOINTMENT_RELATED_KEYS,
        queryClient,
      });
      notify.success(APPOINTMENT_FINISHED_SUCCESSFULLY);
      navigateTo({ route: '/appointments' });
    },
    onError: () => notify.error(ERROR_FINISHED_APPOINTMENT),
  });

  return {
    updateAppointmentMutation,
    ...rest,
  };
};

type StatusResponse = {
  success: boolean;
  status: string;
};

interface UseUpdateAppointmentStatusProps {
  updateAppointmentStatus: (
    patientId: string,
    appointmentId: number,
    data: AppointmentStatus,
  ) => Promise<StatusResponse | undefined>;
  patientId: string;
  appointmentId: number;
}

export const useUpdateAppointmentStatus = ({
  updateAppointmentStatus,
  appointmentId,
  patientId,
}: UseUpdateAppointmentStatusProps) => {
  const queryClient = useQueryClient();

  const { mutateAsync: updateAppointmentStatusMutation, ...rest } = useMutation(
    {
      mutationFn: (status: AppointmentStatus) =>
        updateAppointmentStatus(patientId, appointmentId, status),
      onSuccess: invalidateRelatedQueries({
        queryKeys: APPOINTMENT_RELATED_KEYS,
        queryClient,
      }),
    },
  );

  return {
    updateAppointmentStatusMutation,
    ...rest,
  };
};
