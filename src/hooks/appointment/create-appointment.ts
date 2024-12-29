import {
  APPOINTMENT_CREATED_SUCCESSFULLY,
  ERROR_CREATING_APPOINTMENT,
} from '@/constants/messages';
import { IAppointment, IMSResponse } from '@/interfaces';
import { useQueryClient, useMutation } from '@tanstack/react-query';

import { useAppNavigation } from '../navigate';
import { useNotification } from '../notification';

interface UseCreateAppointmentProps {
  createAppointment: (
    id: string,
    values: IAppointment,
  ) => Promise<IMSResponse<IAppointment, 'appointment'> | undefined>;
  patientId: string;
}

export const useCreateAppointment = ({
  createAppointment,
  patientId,
}: UseCreateAppointmentProps) => {
  const notify = useNotification();
  const queryClient = useQueryClient();
  const { navigateTo } = useAppNavigation();

  const { mutateAsync: createAppointmentMutation, isPending } = useMutation({
    mutationFn: async (values: IAppointment) =>
      await createAppointment(patientId, values),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['appointments'] });
      notify.success(APPOINTMENT_CREATED_SUCCESSFULLY);
      navigateTo({ route: '/appointments' });
    },
    onError: () => notify.error(ERROR_CREATING_APPOINTMENT),
    onMutate: (newAppointment) => {
      queryClient.setQueryData(['appointments'], (old: any) => [
        ...(old || []),
        newAppointment,
      ]);
    },
  });

  return {
    createAppointmentMutation,
    isPending,
  };
};
