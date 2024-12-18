import { useLocation } from 'react-router-dom';

import { AxiosResponse } from 'axios';

import { LOGIN_AGAIN } from '@/constants/messages';
import { IChangePasswordData, IUser } from '@/interfaces';
import { useMenuProfile } from '@/store';
import { useMutation } from '@tanstack/react-query';

import { useCurrentUser } from '.';
import { useNotification } from '../notification';

interface UseChangePasswordProps {
  changePassword: (
    userId: number,
    data: IChangePasswordData,
  ) => Promise<AxiosResponse<IUser> | undefined>;
}

export const useChangePassword = ({
  changePassword,
}: UseChangePasswordProps) => {
  const notify = useNotification();
  const currentUser = useCurrentUser();
  const { toggle } = useMenuProfile();

  const { mutateAsync: changePasswordMutation, isPending } = useMutation({
    mutationFn: async (values: IChangePasswordData) =>
      changePassword(Number(currentUser.id), values),
    onSuccess: () => {
      notify.warning(LOGIN_AGAIN);
      toggle(false);
    },
  });

  return {
    changePasswordMutation,
    isPending,
  };
};
