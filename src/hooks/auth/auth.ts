import { useLocation } from 'react-router-dom';

import { AxiosResponse } from 'axios';

import { LOGIN_AGAIN } from '@/constants/messages';
import {
  IChangePasswordData,
  IRecoverPasswordData,
  ISignInData,
  IUser,
} from '@/interfaces';
import { useMenuProfile } from '@/store';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { useCurrentUser } from '.';
import { useAppNavigation } from '../navigate';
import { useNotification } from '../notification';

interface UseChangePasswordProps {
  changePassword: (
    userId: number,
    data: IChangePasswordData,
  ) => Promise<AxiosResponse<IUser> | undefined>;
}

interface IUseSignInProps {
  signIn: (data: ISignInData) => Promise<boolean>;
}

interface UseForgotPasswordProps {
  forgotPassword: (values: IRecoverPasswordData) => Promise<boolean>;
}

export const useSignIn = ({ signIn }: IUseSignInProps) => {
  const notify = useNotification();
  const location = useLocation();
  const queryClient = useQueryClient();
  const { navigateTo } = useAppNavigation();

  const { mutateAsync: signInMutation } = useMutation({
    mutationFn: async (values: ISignInData) => await signIn(values),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
      notify.success('Seja Bem-vindo!');
      navigateTo({ route: '/dashboard', state: location.state });
    },
  });

  return {
    signInMutation,
  };
};

export const useForgotPassword = ({
  forgotPassword,
}: UseForgotPasswordProps) => {
  const notify = useNotification();
  const location = useLocation();
  const queryClient = useQueryClient();
  const { navigateTo } = useAppNavigation();

  const { mutateAsync: forgotPasswordMutation } = useMutation({
    mutationFn: async (values: IRecoverPasswordData) =>
      await forgotPassword(values),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
      notify.success('Uma nova senha foi enviada para seu endereço de e-mail.');
      navigateTo({ route: '/sign-in', state: location.state });
    },
  });

  return {
    forgotPasswordMutation,
  };
};

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
