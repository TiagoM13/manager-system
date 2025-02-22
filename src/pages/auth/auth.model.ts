import React from 'react';
import { useForm } from 'react-hook-form';
import { useLocation } from 'react-router-dom';

import { useAppNavigation, useNotification } from '@/shared/hooks';
import { IRecoverPasswordData } from '@/shared/interfaces';
import { useSignIn, useForgotPassword } from '@/shared/services/mutations';
import { useQueryClient } from '@tanstack/react-query';

import { REQUEST_PASSWORD, WELCOME_MESSAGE } from './auth.messages';
import {
  forgotPasswordSchema,
  loginSchema,
  SchemaLoginType,
} from './auth.schema';
import { FormAuthProps } from './auth.types';

interface AuthModelProps {
  signInService: (data: SchemaLoginType) => Promise<boolean>;
  forgotPasswordService: (values: IRecoverPasswordData) => Promise<boolean>;
}

export const useAuthModel = ({
  signInService,
  forgotPasswordService,
}: AuthModelProps) => {
  const location = useLocation();
  const queryClient = useQueryClient();
  const notify = useNotification();
  const { navigateTo } = useAppNavigation();

  const methods = useForm<FormAuthProps>({
    resolver:
      location.pathname === '/forgot-password'
        ? forgotPasswordSchema
        : loginSchema,
  });

  const { handleSubmit } = methods;

  const { mutate: signInMutation } = useSignIn({
    service: signInService,
    onSuccess: (data) => {
      queryClient.setQueryData(['user'], data);
      navigateTo({ route: '/dashboard', state: location.state });
      notify.success(WELCOME_MESSAGE);
    },
  });
  const { mutate: forgotPasswordMutation } = useForgotPassword({
    service: forgotPasswordService,
    onSuccess: () => {
      notify.success(REQUEST_PASSWORD);
      navigateTo({ route: '/sign-in', state: location.state });
    },
  });

  const handleAuthAction = React.useCallback(
    async ({ email, password }: SchemaLoginType) => {
      if (location.pathname === '/forgot-password') {
        forgotPasswordMutation({ email });
      } else {
        signInMutation({ email, password });
      }
    },
    [location.pathname, forgotPasswordMutation, signInMutation],
  );

  return {
    methods,
    handleAuthAction,
    handleSubmit,
  };
};
