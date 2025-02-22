import {
  PATIENT_CREATED_SUCCESSFULLY,
  ERROR_CREATING_PATIENT,
  ERROR_UPDATING_PATIENT,
  PATIENT_UPDATED_SUCCESSFULLY,
} from '@/shared/constants/messages';
import { useNotification } from '@/shared/hooks';
import { IMSResponse, IPatient } from '@/shared/interfaces';
import { invalidateRelatedQueries } from '@/shared/utils/invalidate-queries';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { CacheKeys } from '../cache-keys';

interface UseCreatePatientProps {
  createPatient: (
    data: IPatient,
  ) => Promise<IMSResponse<IPatient, 'patient'> | undefined>;
}

const PATIENT_RELATED_KEYS = [CacheKeys.PATIENTS, CacheKeys.PATIENT];

export const useCreatePatient = ({ createPatient }: UseCreatePatientProps) => {
  const notify = useNotification();
  const queryClient = useQueryClient();

  const { mutateAsync: createPatientMutation, ...rest } = useMutation({
    mutationFn: createPatient,
    onSuccess: () => {
      invalidateRelatedQueries({
        queryKeys: PATIENT_RELATED_KEYS,
        queryClient,
      });
      notify.success(PATIENT_CREATED_SUCCESSFULLY);
    },
    onError: () => notify.error(ERROR_CREATING_PATIENT),
  });

  return {
    createPatientMutation,
    ...rest,
  };
};

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

  const { mutateAsync: updatePatientMutation, ...rest } = useMutation({
    mutationFn: (values: IPatient) => updatePatient(patientId, values),
    onSuccess: () => {
      invalidateRelatedQueries({
        queryKeys: PATIENT_RELATED_KEYS,
        queryClient,
      });
      notify.success(PATIENT_UPDATED_SUCCESSFULLY);
    },
    onError: () => notify.error(ERROR_UPDATING_PATIENT),
  });

  return {
    updatePatientMutation,
    ...rest,
  };
};
