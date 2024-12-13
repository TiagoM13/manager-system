import {
  PATIENT_CREATED_SUCCESSFULLY,
  ERROR_CREATING_PATIENT,
} from '@/constants/messages';
import { IMSResponse, IPatient } from '@/interfaces';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { useAppNavigation } from '../navigate';
import { useNotification } from '../notification';

interface UseCreatePatientProps {
  createPatient: (
    data: IPatient,
  ) => Promise<IMSResponse<IPatient, 'patient'> | undefined>;
}

export const useCreatePatient = ({ createPatient }: UseCreatePatientProps) => {
  const notify = useNotification();
  const queryClient = useQueryClient();
  const { navigateTo } = useAppNavigation();

  const { mutateAsync: createPatientMutation, isPending } = useMutation({
    mutationFn: async (values: IPatient) => await createPatient(values),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['patients'] });
      notify.success(PATIENT_CREATED_SUCCESSFULLY);
      navigateTo({ route: `/patients/${data?.patient.id}` });
    },
    onError: () => notify.error(ERROR_CREATING_PATIENT),
  });

  return {
    createPatientMutation,
    isPending,
  };
};
