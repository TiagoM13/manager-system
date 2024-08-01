import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import {
  Navigate,
  useLocation,
  useNavigate,
  useRoutes,
} from 'react-router-dom';

import BgLogin from '@/assets/img/background-login.jpg';
import { FormContainer } from '@/components';
import { toastSuccess } from '@/utils';

import { ForgotPasswod } from './components/forgot-pass';
import { SignIn } from './components/sign-in';
import { FormAuthProps } from './interfaces';
import { forgotPasswordSchema, loginSchema } from './schemas';

const authRoutes = [
  {
    path: '/',
    element: <Navigate to="/sign-in" />,
  },
  {
    path: '/sign-in',
    element: <SignIn />,
  },
  {
    path: '/forgot-password',
    element: <ForgotPasswod />,
  },
];

const AuthPage: React.FC = () => {
  const routes = useRoutes(authRoutes);
  const location = useLocation();
  const navigate = useNavigate();

  const methods = useForm<FormAuthProps>({
    resolver:
      location.pathname === '/forgot-password'
        ? forgotPasswordSchema
        : loginSchema,
  });

  const { handleSubmit } = methods;

  const submit = React.useCallback(
    async ({ email, password }: FormAuthProps) => {
      if (location.pathname === '/forgot-password') {
        console.log(email);
        toastSuccess('Código de acesso enviado com sucesso!');
        navigate('/sign-in');
      } else {
        console.log({ email, password });
        toastSuccess('Bem-vindo! Acesso aprovado!');
        navigate('/dashboard');
      }
    },
    [location.pathname, navigate],
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
            {routes}
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

export default AuthPage;
