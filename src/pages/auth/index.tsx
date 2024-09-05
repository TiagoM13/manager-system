import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';

import BgLogin from '@/assets/img/background-login.jpg';
import { FormContainer } from '@/components';
import { IRecoverPasswordData, ISignInData } from '@/interfaces';
import { forgotPassword, signIn } from '@/store/modules/auth/actions';
import { toastSuccess } from '@/utils';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { ForgotPasswodForm } from './forms/forgot-pass';
import { SignInForm } from './forms/sign-in';
import { FormAuthProps } from './interfaces';
import { forgotPasswordSchema, loginSchema } from './schemas';

const AuthPage: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const methods = useForm<FormAuthProps>({
    resolver:
      location.pathname === '/forgot-password'
        ? forgotPasswordSchema
        : loginSchema,
  });

  const { handleSubmit } = methods;

  const queryClient = useQueryClient();
  const { mutateAsync: signInMutation } = useMutation({
    mutationFn: async (values: ISignInData) => await signIn(values),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
  });
  const { mutateAsync: forgotPasswordMutation } = useMutation({
    mutationFn: async (values: IRecoverPasswordData) =>
      await forgotPassword(values),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
  });

  const submit = React.useCallback(
    async ({ email, password }: FormAuthProps) => {
      if (location.pathname === '/forgot-password') {
        forgotPasswordMutation(
          { email },
          {
            onSuccess: () => {
              toastSuccess(
                'Uma nova senha foi enviada para seu endereço de e-mail.',
              );
              navigate('/sign-in', {
                state: location.state,
                replace: true,
              });
            },
          },
        );
      } else {
        signInMutation({ email, password } as ISignInData, {
          onSuccess: () => {
            toastSuccess('Seja Bem-vindo!');
            navigate('/dashboard', {
              state: location.state,
              replace: true,
            });
          },
        });
      }
    },
    [
      location.pathname,
      location.state,
      forgotPasswordMutation,
      navigate,
      signInMutation,
    ],
  );

  return (
    <FormProvider {...methods}>
      <FormContainer
        noValidate
        onSubmit={handleSubmit(submit)}
        className="overflow-auto"
      >
        <div className="flex h-screen items-center justify-between bg-slate-100 relative max-lg:justify-center">
          <div className="w-full max-w-[50%] flex justify-center items-center relative max-lg:max-w-full max-lg:mx-8">
            {children}
          </div>

          <div className="h-full w-full max-w-[50%] max-lg:hidden relative">
            <img
              src={BgLogin}
              alt="login"
              className="object-cover w-full h-full block border-0"
            />
            <div className="w-full h-full bg-slate-700/10 absolute z-10 inset-0" />
          </div>
        </div>
      </FormContainer>
    </FormProvider>
  );
};

const SignInPage = () => {
  return (
    <AuthPage>
      <SignInForm />
    </AuthPage>
  );
};

const ForgotPasswordPage = () => {
  return (
    <AuthPage>
      <ForgotPasswodForm />
    </AuthPage>
  );
};

export { SignInPage, ForgotPasswordPage };
