import React from 'react';
import { useForm } from 'react-hook-form';
import { useLocation } from 'react-router-dom';

import { useAppNavigation } from '@/hooks';
import { ISignInData, IRecoverPasswordData } from '@/interfaces';
import { toastSuccess } from '@/utils';
import { useQueryClient, useMutation } from '@tanstack/react-query';

import { forgotPasswordSchema, loginSchema } from '../auth.schema';
import { FormAuthProps } from '../types/auth.types';

interface AuthModelProps {
  signIn: (data: ISignInData) => Promise<boolean>;
  forgotPassword: (values: IRecoverPasswordData) => Promise<boolean>;
}

export const useAuthModel = ({ signIn, forgotPassword }: AuthModelProps) => {
  const location = useLocation();
  const queryClient = useQueryClient();
  const { navigateTo } = useAppNavigation();

  const methods = useForm<FormAuthProps>({
    resolver:
      location.pathname === '/forgot-password'
        ? forgotPasswordSchema
        : loginSchema,
  });

  const { handleSubmit } = methods;

  const { mutateAsync: signInMutation } = useMutation({
    mutationFn: async (values: ISignInData) => await signIn(values),
    onSuccess: (data) => {
      if (data) {
        queryClient.invalidateQueries({ queryKey: ['user'] });
        toastSuccess('Seja Bem-vindo!');
        navigateTo({ route: '/dashboard', state: location.state });
      }
    },
  });
  const { mutateAsync: forgotPasswordMutation } = useMutation({
    mutationFn: async (values: IRecoverPasswordData) =>
      await forgotPassword(values),
    onSuccess: (data) => {
      if (data) {
        queryClient.invalidateQueries({ queryKey: ['user'] });
        toastSuccess('Uma nova senha foi enviada para seu endereço de e-mail.');
        navigateTo({ route: '/sign-in', state: location.state });
      }
    },
  });

  const submit = React.useCallback(
    async ({ email, password }: FormAuthProps) => {
      if (location.pathname === '/forgot-password') {
        forgotPasswordMutation({ email });
      } else {
        signInMutation({ email, password } as ISignInData);
      }
    },
    [location.pathname, forgotPasswordMutation, signInMutation],
  );

  return {
    methods,
    submit,
    handleSubmit,
  };
};
