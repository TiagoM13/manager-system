import { USER_DELETE_SUCCESS, USER_DELETE_ERROR } from '@/constants/messages';
import { IMSResponse, IUser } from '@/interfaces';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { useNotification } from '../notification';

interface UseDeleteUserProps {
  deleteUser: (id: number) => Promise<IMSResponse<IUser, 'user'> | undefined>;
}

export const useDeleteUser = ({ deleteUser }: UseDeleteUserProps) => {
  const notify = useNotification();
  const queryClient = useQueryClient();

  const { mutateAsync: deleteUserMutation, isPending } = useMutation({
    mutationFn: async (id: number) => deleteUser(id),
    onSuccess: () => {
      notify.success(USER_DELETE_SUCCESS);
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
    onError: () => notify.error(USER_DELETE_ERROR),
  });

  return {
    deleteUserMutation,
    isPending,
  };
};
