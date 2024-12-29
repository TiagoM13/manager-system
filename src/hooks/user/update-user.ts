import {
  ERROR_UPDATING_USER,
  USER_UPDATED_SUCCESSFULLY,
} from '@/constants/messages';
import { IUser, IMSResponse } from '@/interfaces';
import { QueryKey, useMutation, useQueryClient } from '@tanstack/react-query';

import { useNotification } from '../notification';

type UserRequestResult = IMSResponse<IUser, 'user'> | undefined;

interface UseUpdateUserProps {
  updateUser: (id: number, data: IUser) => Promise<UserRequestResult>;
  userId: number;
  queryKeys?: QueryKey;
}

export const useUpdateUser = ({
  updateUser,
  userId,
  queryKeys,
}: UseUpdateUserProps) => {
  const notify = useNotification();
  const queryClient = useQueryClient();

  const { mutateAsync: updateUserMutation, isPending } = useMutation({
    mutationFn: async (values: IUser) => await updateUser(userId, values),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys });
      notify.success(USER_UPDATED_SUCCESSFULLY);
    },
    onError: () => notify.error(ERROR_UPDATING_USER),
  });

  return {
    updateUserMutation,
    isPending,
  };
};
