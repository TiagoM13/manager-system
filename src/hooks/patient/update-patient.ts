import {
  ERROR_UPDATING_PATIENT,
  PATIENT_UPDATED_SUCCESSFULLY,
} from '@/constants/messages';
import { IMSResponse, IPatient } from '@/interfaces';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { useNotification } from '../notification';

interface UseUpdatePatientProps {
  patientId: string;
  updatePatient: (
    id: string,
    data: IPatient,
  ) => Promise<IMSResponse<IPatient, 'patient'> | undefined>;
}

export const useUpdatePatient = ({
  updatePatient,
  patientId,
}: UseUpdatePatientProps) => {
  const queryClient = useQueryClient();
  const notify = useNotification();

  const { mutateAsync: updatePatientMutation, isPending } = useMutation({
    mutationFn: async (values: IPatient) =>
      await updatePatient(patientId, values),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['patient'] });
      notify.success(PATIENT_UPDATED_SUCCESSFULLY);
    },
    onError: () => notify.error(ERROR_UPDATING_PATIENT),
  });

  return {
    updatePatientMutation,
    isPending,
  };
};
