import React from 'react';

import { HttpClient } from '@/infra/http/http-client';
import {
  requestPasswordRecovery,
  authenticateUser,
} from '@/store/modules/auth/actions';

import { ForgotPasswodForm } from '../forms/forgot-pass';
import { SignInForm } from '../forms/sign-in';
import { useAuthModel } from '../model/auth.model';
import { AuthPageView } from '../view/auth.view';

const AuthPage: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const http = new HttpClient();

  const methods = useAuthModel({
    signIn: (data) => authenticateUser(http, data),
    forgotPassword: (data) => requestPasswordRecovery(http, data),
  });

  return <AuthPageView {...methods}>{children}</AuthPageView>;
};

export const SignInPage = () => {
  return (
    <AuthPage>
      <SignInForm />
    </AuthPage>
  );
};

export const ForgotPasswordPage = () => {
  return (
    <AuthPage>
      <ForgotPasswodForm />
    </AuthPage>
  );
};
