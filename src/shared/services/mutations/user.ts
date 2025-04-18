import {
  ERROR_CREATING_USER,
  ERROR_UPDATING_USER,
  USER_CREATED_SUCCESSFULLY,
  USER_DELETE_ERROR,
  USER_DELETE_SUCCESS,
  USER_UPDATED_SUCCESSFULLY,
} from '@/shared/constants/messages';
import { useNotification } from '@/shared/hooks';
import { IMSResponse, IUser } from '@/shared/interfaces';
import { invalidateRelatedQueries } from '@/shared/utils/invalidate-queries';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { CacheKeys } from '../cache-keys';

type UserRequestResult = IMSResponse<IUser, 'user'> | undefined;

interface UseCreateUserProps {
  createUser: (data: IUser) => Promise<UserRequestResult>;
}

const USER_RELATED_KEYS = [CacheKeys.USERS, CacheKeys.USER];

export const useCreateUser = ({ createUser }: UseCreateUserProps) => {
  const notify = useNotification();
  const queryClient = useQueryClient();

  const { mutateAsync: createUserMutation, ...rest } = useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      invalidateRelatedQueries({ queryKeys: USER_RELATED_KEYS, queryClient });
      notify.success(USER_CREATED_SUCCESSFULLY);
    },
    onError: () => notify.error(ERROR_CREATING_USER),
  });

  return {
    createUserMutation,
    ...rest,
  };
};

interface UseUpdateUserProps {
  updateUser: (id: string, data: IUser) => Promise<UserRequestResult>;
  userId: string;
}

export const useUpdateUser = ({ updateUser, userId }: UseUpdateUserProps) => {
  const notify = useNotification();
  const queryClient = useQueryClient();

  const { mutateAsync: updateUserMutation, ...rest } = useMutation({
    mutationFn: (values: IUser) => updateUser(userId, values),
    onSuccess: () => {
      invalidateRelatedQueries({ queryKeys: USER_RELATED_KEYS, queryClient });
      notify.success(USER_UPDATED_SUCCESSFULLY);
    },
    onError: () => notify.error(ERROR_UPDATING_USER),
  });

  return {
    updateUserMutation,
    ...rest,
  };
};

interface UseUpdateUserStatusProps {
  updateUserStatus: (id: string, status: string) => Promise<string | undefined>;
}

export const useUpdateUserStatus = ({
  updateUserStatus,
}: UseUpdateUserStatusProps) => {
  const queryClient = useQueryClient();

  const { mutateAsync: updateUserStatusMutation, ...rest } = useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) =>
      updateUserStatus(id, status),
    onSuccess: invalidateRelatedQueries({
      queryKeys: USER_RELATED_KEYS,
      queryClient,
    }),
  });

  return {
    updateUserStatusMutation,
    ...rest,
  };
};

interface UseDeleteUserProps {
  deleteUser: (id: string) => Promise<IMSResponse<IUser, 'user'> | undefined>;
}

export const useDeleteUser = ({ deleteUser }: UseDeleteUserProps) => {
  const notify = useNotification();
  const queryClient = useQueryClient();

  const { mutateAsync: deleteUserMutation, ...rest } = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      invalidateRelatedQueries({ queryKeys: USER_RELATED_KEYS, queryClient });
      notify.success(USER_DELETE_SUCCESS);
    },
    onError: () => notify.error(USER_DELETE_ERROR),
  });

  return {
    deleteUserMutation,
    ...rest,
  };
};
