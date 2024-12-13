import React from 'react';
import { useForm } from 'react-hook-form';
import { useLocation } from 'react-router-dom';

import { useAppNavigation, useNotification } from '@/hooks';
import { ISignInData, IRecoverPasswordData } from '@/interfaces';
import { useQueryClient, useMutation } from '@tanstack/react-query';

import { forgotPasswordSchema, loginSchema } from './auth.schema';
import { FormAuthProps } from './auth.types';

interface AuthModelProps {
  signIn: (data: ISignInData) => Promise<boolean>;
  forgotPassword: (values: IRecoverPasswordData) => Promise<boolean>;
}

export const useAuthModel = ({ signIn, forgotPassword }: AuthModelProps) => {
  const notify = useNotification();
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
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
      notify.success('Seja Bem-vindo!');
      navigateTo({ route: '/dashboard', state: location.state });
    },
  });
  const { mutateAsync: forgotPasswordMutation } = useMutation({
    mutationFn: async (values: IRecoverPasswordData) =>
      await forgotPassword(values),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
      notify.success('Uma nova senha foi enviada para seu endereço de e-mail.');
      navigateTo({ route: '/sign-in', state: location.state });
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
