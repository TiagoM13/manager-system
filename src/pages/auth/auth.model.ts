import React from 'react';
import { useForm } from 'react-hook-form';
import { useLocation } from 'react-router-dom';

import { useForgotPassword, useSignIn } from '@/hooks/auth/auth';
import { ISignInData, IRecoverPasswordData } from '@/interfaces';

import { forgotPasswordSchema, loginSchema } from './auth.schema';
import { FormAuthProps } from './auth.types';

interface AuthModelProps {
  signIn: (data: ISignInData) => Promise<boolean>;
  forgotPassword: (values: IRecoverPasswordData) => Promise<boolean>;
}

export const useAuthModel = ({ signIn, forgotPassword }: AuthModelProps) => {
  const location = useLocation();

  const methods = useForm<FormAuthProps>({
    resolver:
      location.pathname === '/forgot-password'
        ? forgotPasswordSchema
        : loginSchema,
  });

  const { handleSubmit } = methods;

  const { signInMutation } = useSignIn({ signIn });
  const { forgotPasswordMutation } = useForgotPassword({ forgotPassword });

  const handleAuthAction = React.useCallback(
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
    handleAuthAction,
    handleSubmit,
  };
};
