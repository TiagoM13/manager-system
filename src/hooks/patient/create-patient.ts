import {
  PATIENT_CREATED_SUCCESSFULLY,
  ERROR_CREATING_PATIENT,
} from '@/constants/messages';
import { IMSResponse, IPatient } from '@/interfaces';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { useNotification } from '../notification';

interface UseCreatePatientProps {
  createPatient: (
    data: IPatient,
  ) => Promise<IMSResponse<IPatient, 'patient'> | undefined>;
}

export const useCreatePatient = ({ createPatient }: UseCreatePatientProps) => {
  const notify = useNotification();
  const queryClient = useQueryClient();

  const { mutateAsync: createPatientMutation, isPending } = useMutation({
    mutationFn: async (values: IPatient) => await createPatient(values),
    onSuccess: (data) => {
      if (data) {
        queryClient.invalidateQueries({ queryKey: ['patients'] });
        notify.success(PATIENT_CREATED_SUCCESSFULLY);
      }
    },
    onError: () => notify.error(ERROR_CREATING_PATIENT),
  });

  return {
    createPatientMutation,
    isPending,
  };
};
