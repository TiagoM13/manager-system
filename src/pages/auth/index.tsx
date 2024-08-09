import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';

import BgLogin from '@/assets/img/background-login.jpg';
import { FormContainer } from '@/components';
import { IRecoverPasswordData, ISignInData } from '@/interfaces';
import { forgotPasswordService } from '@/services';
import { signIn } from '@/store/modules/auth/actions';
import { toastSuccess } from '@/utils';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { ForgotPasswod } from './components/forgot-pass';
import { SignIn } from './components/sign-in';
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
  const { mutateAsync: login } = useMutation({
    mutationFn: async (values: ISignInData) => await signIn(values),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
  });
  const { mutateAsync: forgotPassword } = useMutation({
    mutationFn: async (values: IRecoverPasswordData) =>
      await forgotPasswordService(values),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
  });

  const submit = React.useCallback(
    async ({ email, password }: FormAuthProps) => {
      if (location.pathname === '/forgot-password') {
        forgotPassword(
          { email },
          {
            onSuccess: () => {
              toastSuccess('Código de acesso enviado com sucesso!');
              navigate('/sign-in', {
                state: location.state,
                replace: true,
              });
            },
          },
        );
      } else {
        const values = { email, password };

        login(values as ISignInData, {
          onSuccess: () => {
            toastSuccess('Bem-vindo! Acesso aprovado!');
            navigate('/dashboard', {
              state: location.state,
              replace: true,
            });
          },
        });
      }
    },
    [location.pathname, location.state, forgotPassword, navigate, login],
  );

  return (
    <FormProvider {...methods}>
      <FormContainer
        noValidate
        onSubmit={handleSubmit(submit)}
        className="overflow-auto"
      >
        <div className="flex h-screen items-center justify-between bg-slate-100 relative">
          <div className="w-[50%] flex justify-center items-center relative">
            {children}
          </div>

          <div className="h-full w-[50%]">
            <img
              src={BgLogin}
              alt="login"
              className="object-cover w-full h-full block border-0"
            />
          </div>
        </div>
      </FormContainer>
    </FormProvider>
  );
};

const SignInPage = () => {
  return (
    <AuthPage>
      <SignIn />
    </AuthPage>
  );
};

const ForgotPasswordPage = () => {
  return (
    <AuthPage>
      <ForgotPasswod />
    </AuthPage>
  );
};

export { SignInPage, ForgotPasswordPage };
