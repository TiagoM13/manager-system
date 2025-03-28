import React from 'react';

import { HttpClient } from '@/infra/http/http-client';
import {
  authenticateUser,
  requestPasswordRecovery,
} from '@/store/modules/auth/actions';

import { useAuthModel } from './auth.model';
import { AuthPageView } from './auth.view';
import { ForgotPasswodForm } from './forms/forgot-pass';
import { SignInForm } from './forms/sign-in';

const AuthPage: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const http = new HttpClient();

  const methods = useAuthModel({
    signInService: (data) => authenticateUser(http, data),
    forgotPasswordService: (data) => requestPasswordRecovery(http, data),
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
