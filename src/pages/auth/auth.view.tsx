import React from 'react';
import { FormProvider } from 'react-hook-form';

import BgLogin from '@/assets/img/background-login.jpg';
import { FormContainer } from '@/components/_ui';

import { useAuthModel } from './auth.model';

type AuthPageViewProps = ReturnType<typeof useAuthModel> & {
  children: React.ReactNode;
};

export const AuthPageView: React.FC<AuthPageViewProps> = (props) => {
  const { methods, handleSubmit, handleAuthAction, children } = props;

  return (
    <FormProvider {...methods}>
      <FormContainer
        noValidate
        onSubmit={handleSubmit(handleAuthAction)}
        className="overflow-auto"
      >
        <div className="relative flex h-screen items-center justify-between bg-slate-100 max-lg:justify-center">
          <div className="relative flex w-full max-w-[50%] items-center justify-center max-lg:mx-8 max-lg:max-w-full">
            {children}
          </div>

          <div className="relative h-full w-full max-w-[50%] max-lg:hidden">
            <img
              src={BgLogin}
              alt="login"
              className="block h-full w-full border-0 object-cover"
            />
            <div className="absolute inset-0 z-10 h-full w-full bg-slate-700/10" />
          </div>
        </div>
      </FormContainer>
    </FormProvider>
  );
};
