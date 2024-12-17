import {
  ERROR_CREATING_USER,
  USER_CREATED_SUCCESSFULLY,
} from '@/constants/messages';
import { IUser, IMSResponse } from '@/interfaces';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { useAppNavigation } from '../navigate';
import { useNotification } from '../notification';

type UserRequestResult = IMSResponse<IUser, 'user'> | undefined;

interface UseCreateUserProps {
  createUser: (data: IUser) => Promise<UserRequestResult>;
}

export const useCreateUser = ({ createUser }: UseCreateUserProps) => {
  const notify = useNotification();
  const queryClient = useQueryClient();
  const { navigateTo } = useAppNavigation();

  const { mutateAsync: createUserMutation, isPending } = useMutation({
    mutationFn: async (values: IUser) => await createUser(values),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      notify.success(USER_CREATED_SUCCESSFULLY);
      navigateTo({ route: '/users' });
    },
    onError: () => notify.error(ERROR_CREATING_USER),
  });

  return {
    createUserMutation,
    isPending,
  };
};
