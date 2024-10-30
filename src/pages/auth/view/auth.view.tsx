import React from 'react';
import { FormProvider } from 'react-hook-form';

import BgLogin from '@/assets/img/background-login.jpg';
import { FormContainer } from '@/components';

import { useAuthModel } from '../model/auth.model';

type AuthPageViewProps = ReturnType<typeof useAuthModel> & {
  children: React.ReactNode;
};

export const AuthPageView: React.FC<AuthPageViewProps> = (props) => {
  const { methods, handleSubmit, submit, children } = props;

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
