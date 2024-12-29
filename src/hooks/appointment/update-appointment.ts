import {
  APPOINTMENT_FINISHED_SUCCESSFULLY,
  ERROR_FINISHED_APPOINTMENT,
} from '@/constants/messages';
import { IAppointment, IMSResponse } from '@/interfaces';
import { useQueryClient, useMutation } from '@tanstack/react-query';

import { useAppNavigation } from '../navigate';
import { useNotification } from '../notification';

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

  const { mutateAsync: updateAppointmentMutation, isPending } = useMutation({
    mutationFn: async (values: IAppointment) =>
      await updateAppointment(patientId, appointmentId, values),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['appointments', appointmentId],
      });
      notify.success(APPOINTMENT_FINISHED_SUCCESSFULLY);
      navigateTo({ route: '/appointments' });
    },
    onError: () => notify.error(ERROR_FINISHED_APPOINTMENT),
  });

  return {
    updateAppointmentMutation,
    isPending,
  };
};
