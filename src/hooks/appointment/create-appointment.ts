import { IAppointment, IMSResponse } from '@/interfaces';
import {
  useQueryClient,
  useMutation,
  UseMutateAsyncFunction,
} from '@tanstack/react-query';

import { useAppNavigation } from '../navigate';
import { useNotification } from '../notification';

interface UseCreateAppointmentProps {
  createAppointment: (
    id: string,
    values: IAppointment,
  ) => Promise<IMSResponse<IAppointment, 'appointment'> | undefined>;
  patientId: string;
}

interface UseCreateAppointmentReturn {
  create: UseMutateAsyncFunction<
    IMSResponse<IAppointment, 'appointment'> | undefined,
    Error,
    IAppointment,
    void
  >;
  isPending: boolean;
}

export const useCreateAppointment = ({
  createAppointment,
  patientId,
}: UseCreateAppointmentProps): UseCreateAppointmentReturn => {
  const notify = useNotification();
  const queryClient = useQueryClient();
  const { navigateTo } = useAppNavigation();

  const { mutateAsync: createAppointmentMutation, isPending } = useMutation({
    mutationFn: async (values: IAppointment) =>
      await createAppointment(patientId, values),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['appointments'] });
      notify.success('Consulta adicionada com sucesso!');
      navigateTo({ route: '/appointments' });
    },
    onMutate: (newAppointment) => {
      queryClient.setQueryData(['appointments'], (old: any) => [
        ...(old || []),
        newAppointment,
      ]);
    },
  });

  return {
    create: createAppointmentMutation,
    isPending,
  };
};
